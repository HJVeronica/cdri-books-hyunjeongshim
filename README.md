# CDRI 프론트엔드 채용 과제

## 프로젝트 개요

이 프로젝트는 React를 기반으로 한 도서 검색 및 찜 목록을 관리하는 웹 서비스입니다.

### 구현 기능 (요구사항)

1. 도서 검색 페이지
   <img src="https://github.com/user-attachments/assets/013d811a-a1d8-4d73-b801-d558ecb15e01" width="700" />

   - 도서 전체 검색 및 상세 검색
   - 전체 검색 또는 상세 검색 시, 둘 중 하나의 검색창 초기화 (동시 검색 불가)
   - 검색 기록 추가/삭제 (`localStorage`)
   - 페이지 당 10개의 결과 표시 + 무한 스크롤
   - 구매하기 버튼 클릭 시 API 응답 데이터 내 URL로 이동
   - 검색 결과 내 찜 버튼 클릭 시, 찜 목록 추가/삭제 (`localStorage`)

2. 찜 목록 페이지
   <img src="https://github.com/user-attachments/assets/fe36d806-71cb-4841-a59d-ad7d8c6cdbd2" width="700" />

   - 찜 목록의 데이터 화면에 표시
   - 찜 버튼 클릭 시, 찜 목록 추가/삭제 (`localStorage`)
   - 페이지 당 10개의 결과 표시 + 무한 스크롤
   - 구매하기 버튼 클릭 시 API 응답 데이터 내 URL로 이동

### 요구사항 외 구현 기능

- "정상판매" `status`가 아닌 도서는 목록에서 비활성화
- 검색 기록에 이미 존재하는 키워드로 검색 시, 해당 키워드 최신화
- API 응답 데이터 내 `thumbnail` 이미지가 없을 경우, 기본 이미지로 대체
- API 응답 데이터 내 `contents`가 없을 경우, 책 소개 컴포넌트 숨김

### 기술 스택

- React + Vite
- TypeScript
- TailwindCSS
- React Query
- Zustand

## 실행 방법 및 환경 설정

```bash
# 의존성 설치
yarn install

# 실행
yarn dev
```

## 폴더 구조 및 주요 코드 설명

### 폴더 구조

```
src/
├── assets/               # 아이콘, 이미지, 폰트 등 정적 리소스
├── components/           # 재사용/도메인별 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   │   ├── BookListItem.tsx        # 도서 목록 아이템 컴포넌트 (기본/상세 뷰 토글)
│   │   ├── BookListItemDetail.tsx  # 도서 상세 정보 표시 컴포넌트
│   │   ├── EmptyResult.tsx         # 데이터 없음 표시 컴포넌트
│   │   ├── NavigationBar.tsx       # 상단 네비게이션 바 (검색/찜 목록 메뉴)
│   │   ├── ResultCount.tsx         # 데이터 개수 표시 컴포넌트
│   │   └── Typography.tsx          # 공통 타이포그래피 스타일 컴포넌트
│   └── search/           # 검색 페이지 전용 컴포넌트
│   │   ├── SearchBox.tsx           # 검색 입력창 및 검색 기록 표시 컴포넌트
│   │   └── SearchDetailModal.tsx   # 상세 검색 모달
├── constants/            # 상수 정의 (PAGINATION 등)
├── hooks/                # 커스텀 hook
│   ├── useFavorites.ts           # 찜 목록 관리 hook (localStorage 기반)
│   ├── useInfiniteScroll.ts      # 무한 스크롤 구현 hook
│   ├── useSearchBooks.ts         # 도서 검색 API 연동 hook
│   └── useSearchHistory.ts       # 검색 기록 관리 hook (localStorage 기반)
├── layouts/              # 레이아웃 컴포넌트
├── pages/                # 각 페이지
│   ├── FavoritePage.tsx           # 찜 목록 페이지
│   └── SearchPage.tsx             # 도서 검색 페이지
├── store/                # Zustand store (전역 상태 관리)
├── types/                # 타입 정의
│   ├── api/
│   │   ├── book.ts                # 앱 내부에서 사용하는 도서 및 검색 파라미터 타입
│   │   └── kakao.ts               # 카카오 API 관련 타입
│   ├── common.ts                  # 공통 타입
│   ├── components.ts              # 컴포넌트 Props 타입
│   ├── storage.ts                 # localStorage 관련 타입
│   └── store.ts                   # 검색 관련 상태 관리 타입
├── utils/                # 유틸 함수
│   ├── api.ts                     # Kakao Book Search API 연동 함수
│   ├── format.ts                  # 데이터 포맷팅 유틸리티
│   ├── searchUtils.ts             # 검색 관련 유틸리티 함수
│   ├── storage.ts                 # localStorage 관리 유틸리티
├── index.css             # 글로벌 CSS (TailwindCSS 설정)
└── main.tsx              # 루트 컴포넌트 및 라우터 설정
.env                      # 환경 변수 (API 키)
```

### 주요 코드

## 주요 코드 설명

1. 도서 검색 기능

```typescript
// hooks/useSearchBooks.ts
export const useSearchBooksInfinite = (
  params: Omit<BookSearchParams, "page">,
  enabled = true
) => {
  return useInfiniteQuery({
    queryKey: ["books", "search-infinite", params],
    queryFn: ({ pageParam, queryKey }) =>
      searchBooksInfinite({
        pageParam,
        queryKey: queryKey as unknown as readonly [
          string,
          string,
          Omit<BookSearchParams, "page">
        ],
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.is_end) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
    enabled: enabled && !!params.query,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
```

- React Query의 `useInfiniteQuery`를 사용하여 무한 스크롤 구현
- `queryKey`에 검색어를 포함시켜 검색어 변경 시 자동으로 데이터 갱신
- 페이지네이션 처리 및 다음 페이지 데이터 로딩

2. 검색 기록 관리

```typescript
// hooks/useSearchHistory.ts
export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  // 컴포넌트 마운트 시 localStorage에서 검색 기록 로드
  useEffect(() => {
    try {
      const history = getSearchHistory();
      setSearchHistory(history);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("검색 기록 로드 실패"));
    }
  }, []);

  // 검색 기록 추가
  const addToHistory = useCallback((keyword: string) => {
    try {
      addSearchHistory(keyword);
      const updatedHistory = getSearchHistory();
      setSearchHistory(updatedHistory);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("검색 기록 추가 실패"));
    }
  }, []);

  // 특정 검색 기록 삭제
  const removeFromHistory = useCallback((keyword: string) => {
    try {
      removeSearchHistory(keyword);
      const updatedHistory = getSearchHistory();
      setSearchHistory(updatedHistory);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("검색 기록 삭제 실패"));
    }
  }, []);

  return {
    searchHistory,
    addToHistory,
    removeFromHistory,
    error,
  };
}
```

- localStorage를 활용한 검색 기록 저장
- 에러 처리 및 상태 관리
- 검색 기록 추가/삭제 기능

3. 찜 목록 관리

```typescript
// hooks/useFavorites.ts
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteBook[]>([]);
  const [error, setError] = useState<Error | null>(null);

  // 컴포넌트 마운트 시 localStorage에서 찜 목록 로드
  useEffect(() => {
    try {
      const savedFavorites = getFavorites();
      setFavorites(savedFavorites);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("찜 목록을 불러오는데 실패했습니다.")
      );
    }
  }, []);

  // 찜 목록에 추가
  const addToFavoritesList = useCallback((book: FavoriteBook) => {
    try {
      addToFavorites(book);
      const updatedFavorites = getFavorites();
      setFavorites(updatedFavorites);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("찜 목록 추가에 실패했습니다.")
      );
    }
  }, []);

  // 찜 목록에서 삭제
  const removeFromFavoritesList = useCallback((isbn: string) => {
    try {
      removeFromFavorites(isbn);
      const updatedFavorites = getFavorites();
      setFavorites(updatedFavorites);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("찜 목록 삭제에 실패했습니다.")
      );
    }
  }, []);

  // 찜 상태 토글
  const toggleFavorite = useCallback(
    (book: FavoriteBook) => {
      try {
        if (isFavorite(book.isbn)) {
          removeFromFavoritesList(book.isbn);
        } else {
          addToFavoritesList(book);
        }
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("찜 상태 변경에 실패했습니다.")
        );
      }
    },
    [addToFavoritesList, removeFromFavoritesList]
  );

  // 찜 상태 확인
  const checkIsFavorite = useCallback((isbn: string) => {
    try {
      return isFavorite(isbn);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("찜 상태 확인에 실패했습니다.")
      );
      return false;
    }
  }, []);

  return {
    favorites,
    addToFavoritesList,
    removeFromFavoritesList,
    toggleFavorite,
    checkIsFavorite,
    error,
  };
}
```

- localStorage 기반 찜 목록 관리
- 찜 추가/삭제/토글 기능
- 에러 처리 및 상태 관리

4. 무한 스크롤 구현

```typescript
// hooks/useInfiniteScroll.ts
export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  rootMargin = "0px",
  debounceMs = 200,
}: UseInfiniteScrollProps) => {
  // debounce를 위한 timeout ref
  const timeoutRef = useRef<number | null>(null);

  // intersection observer로 sentinel 감지
  const { ref, inView } = useInView({ rootMargin });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      // 기존 timeout이 있으면 제거
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // debounce 적용
      timeoutRef.current = setTimeout(() => {
        fetchNextPage();
      }, debounceMs);
    }

    // cleanup 함수
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    debounceMs,
  ]);

  return { ref };
};
```

- `react-intersection-observer`를 사용한 스크롤 감지
- 디바운스 처리로 불필요한 API 호출 방지
- 메모리 누수 방지를 위한 cleanup 함수 구현

## 라이브러리 선택 이유

| 라이브러리                      | 선택 이유                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------ |
| **TailwindCSS**                 | - Utility-first 스타일링<br/>- 빠른 UI 개발<br/>- 일관된 디자인 구축 가능      |
| **React Router**                | - SPA 라우팅 구현<br/>- 간단한 페이지 전환                                     |
| **react-intersection-observer** | - 무한 스크롤 구현<br/>- 간단한 API (구현 용이)                                |
| **Zustand**                     | - 클라이언트 상태 관리<br/>- 가벼운 번들 사이즈<br/>- 직관적인 API (구현 용이) |

## 강조 하고 싶은 기능

**1. 컴포넌트 재사용성**

- `Typography` 컴포넌트를 통한 일관된 타이포그래피 시스템 구축
- `EmptyResult` 를 컴포넌트로 분리하여 `도서 검색` 및 `내가 찜한 책` 페이지에서 모두 활용
- `BookListItem`과 `BookListItemDetail` 컴포넌트를 분리하여 `도서 검색` 및 `내가 찜한 책` 페이지에서 모두 활용
- `SearchBox`와 `SearchDetailModal`을 분리하여 검색 관련 로직과 UI를 모듈화
- `ResultCount`를 독립 컴포넌트로 분리하여 검색 결과 개수 표시 로직 재사용
- `NavigationBar`를 레이아웃 컴포넌트로 분리하여 페이지 간 일관된 네비게이션 제공

**2. 사용자 경험 개선**

- "정상판매" `status`가 아닌 도서는 목록에서 비활성화
- 검색 기록에 이미 존재하는 키워드로 검색 시, 해당 키워드 최신화
- API 응답 데이터 내 `thumbnail` 이미지가 없을 경우, 기본 이미지로 대체
- API 응답 데이터 내 `contents`가 없을 경우, 책 소개 컴포넌트 숨김

**3. 효율적인 상태 관리**

- React Query를 활용한 서버 상태 관리 및 캐싱
- Zustand를 통한 클라이언트 상태 관리
- localStorage를 활용한 영구 데이터 저장

**3. 성능 최적화**

- **무한 스크롤 최적화**

  - `react-intersection-observer`를 활용한 효율적인 스크롤 감지
  - 디바운스 처리로 불필요한 API 호출 방지

- **이미지 최적화**
  - 썸네일 이미지가 없는 경우 기본 이미지로 대체하여 UI 깨짐 방지
