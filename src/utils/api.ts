import type {
  KakaoBookSearchResponse,
  BookSearchParams,
  Book,
  KakaoBook,
} from "../types/book";

// 카카오 API 키 (환경변수에서 가져오기)
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

if (!KAKAO_REST_API_KEY) {
  console.warn("API 키가 설정되지 않았습니다.");
}

/**
 * 카카오 도서 검색 API 호출
 * @param params 검색 파라미터
 * @returns 검색 결과
 */
export const searchBooks = async (
  params: BookSearchParams
): Promise<KakaoBookSearchResponse> => {
  const { query, sort = "accuracy", page = 1, size = 10, target } = params;

  const url = new URL("https://dapi.kakao.com/v3/search/book");
  url.searchParams.append("query", query);
  url.searchParams.append("sort", sort);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());

  if (target) {
    url.searchParams.append("target", target);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `도서 검색 실패: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

/**
 * 카카오 도서 데이터를 앱 내부 Book 타입으로 변환
 * @param kakaoBook 카카오 도서 데이터
 * @returns 앱 내부 Book 타입
 */
export const transformKakaoBookToBook = (kakaoBook: KakaoBook): Book => {
  return {
    title: kakaoBook.title,
    authors: kakaoBook.authors,
    publisher: kakaoBook.publisher,
    thumbnail:
      kakaoBook.thumbnail ||
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F93783%3Ftimestamp%3D20250501131823", // 기본 이미지 처리
    price: kakaoBook.price,
    salePrice: kakaoBook.sale_price !== -1 ? kakaoBook.sale_price : undefined,
    url: kakaoBook.url,
    contents: kakaoBook.contents,
    status: kakaoBook.status,
  };
};

/**
 * 무한 스크롤을 위한 페이지네이션 함수
 * @param pageParam 페이지 번호
 * @param queryKey 검색 파라미터
 * @returns 검색 결과
 */
export const searchBooksInfinite = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: readonly [string, string, Omit<BookSearchParams, "page">];
}) => {
  const [, , searchParams] = queryKey;

  const response = await searchBooks({
    ...searchParams,
    page: pageParam,
  });

  const books = response.documents.map(transformKakaoBookToBook);

  return {
    ...response,
    currentPage: pageParam,
    books,
  };
};
