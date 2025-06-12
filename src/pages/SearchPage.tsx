import { useState } from "react";
import EmptyResult from "../components/common/EmptyResult";
import Typography from "../components/common/Typography";
import ResultCount from "../components/common/ResultCount";
import BookListItem from "../components/common/BookListItem";
import BookListItemDetail from "../components/common/BookListItemDetail";
import SearchDetailModal from "../components/search/SearchDetailModal";
import SearchIcon from "../assets/icons/ic-search.svg?react";
import CloseIcon from "../assets/icons/ic-close.svg?react";
import { useSearchBooksInfinite } from "../hooks/useSearchBooks";
import { useSearchStore } from "../store/searchStore";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useSearchHistory } from "../hooks/useSearchHistory";
import { getSearchTarget } from "../utils/searchUtils";

const SearchPage = () => {
  // Zustand store에서 상태와 액션 가져오기
  const {
    searchValue,
    searchKeyword,
    detailSearchKeyword,
    searchTarget,
    setSearchValue,
    setSearchKeyword,
    setDetailSearchValue,
    setDetailSearchKeyword,
    setSearchTarget,
    resetSearch,
    resetDetailSearch,
  } = useSearchStore();

  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [expandedBookIndex, setExpandedBookIndex] = useState<number | null>(
    null
  );

  // 검색 기록 hook 사용
  const { searchHistory, addToHistory, removeFromHistory } = useSearchHistory();

  // 검색 기록 삭제
  const handleRemoveSearchHistory = (index: number) => {
    const keyword = searchHistory[index];
    removeFromHistory(keyword);
  };

  // 검색 input 포커스/블러
  const handleInputFocus = () => setShowSearchHistory(true);
  const handleInputBlur = () =>
    setTimeout(() => setShowSearchHistory(false), 150);

  // 상세검색 모달
  const handleDetailSearch = (searchType: string, keyword: string) => {
    // 상세검색 시 전체검색 초기화
    resetSearch();

    setDetailSearchValue(keyword);
    setDetailSearchKeyword(keyword);
    setShowSearchHistory(false);

    // 검색 타입에 따른 target 값 설정
    setSearchTarget(getSearchTarget(searchType));

    // 상세검색도 검색 기록에 추가
    addToHistory(keyword);
  };

  // 검색 기록 클릭
  const handleSelectSearchHistory = (item: string) => {
    resetDetailSearch();
    setSearchValue(item);
    setSearchKeyword(item);
    setShowSearchHistory(false);

    // 검색 기록 최신으로 업데이트 (기존 항목이면 맨 앞으로 이동)
    addToHistory(item);
  };

  // 엔터로 검색 트리거
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      // 전체검색 시 상세검색 초기화
      resetDetailSearch();

      const keyword = searchValue.trim();
      setSearchKeyword(keyword);
      setShowSearchHistory(false);

      // 검색 기록에 추가
      addToHistory(keyword);
    }
  };

  // 상세보기 토글
  const handleToggleExpand = (index: number) => {
    setExpandedBookIndex(expandedBookIndex === index ? null : index);
  };

  // 무한 스크롤 도서 검색
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
    isError,
  } = useSearchBooksInfinite(
    {
      query: searchKeyword || detailSearchKeyword,
      size: 10,
      target: searchTarget,
    },
    !!(searchKeyword || detailSearchKeyword)
  );

  // 무한스크롤 hook 사용
  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  });

  // 모든 페이지의 도서 합치기
  const pageSize = 10;
  const fetchedPageCount = data?.pages.length ?? 0;
  const books = data?.pages.flatMap((page) => page.books) || [];
  const visibleBooks = books.slice(0, fetchedPageCount * pageSize);

  return (
    <div className="flex flex-col w-full bg-white max-w-[960px] mx-auto">
      <div className="w-full mt-15 flex flex-col items-start">
        {/* 도서 검색 타이틀 */}
        <Typography variant="title2" className="mb-6">
          도서 검색
        </Typography>

        {/* 검색 input + 상세검색 버튼 + 검색 기록 - SearchBox */}
        <div className="flex w-full items-center mb-6 max-w-[600px]">
          <div className="flex-1 relative">
            {/* 검색 입력창 */}
            <div
              className={`flex items-center bg-light-gray px-4 h-[50px] ${
                showSearchHistory && searchHistory.length > 0
                  ? "rounded-t-[25px]"
                  : "rounded-full"
              }`}
            >
              <SearchIcon className="w-5 h-5 text-t-secondary mr-2" />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                className="flex-1 bg-transparent outline-none text-t-primary placeholder:text-t-caption text-[16px] leading-[16px]"
              />
            </div>

            {/* 검색 기록 드롭다운 */}
            {showSearchHistory && searchHistory.length > 0 && (
              <div className="absolute top-[50px] left-0 right-0 bg-light-gray rounded-b-[25px] border-hr-gray z-10">
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pl-11 pr-4 py-3 first:pt-4 last:pb-4"
                  >
                    <button
                      onClick={() => handleSelectSearchHistory(item)}
                      className="flex-1 text-left"
                    >
                      <Typography variant="body2" className="text-t-primary">
                        {item}
                      </Typography>
                    </button>
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleRemoveSearchHistory(index);
                      }}
                      className="p-1 rounded-full"
                    >
                      <CloseIcon className="w-6 h-6 text-t-secondary" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative ml-3 flex-shrink-0">
            <button
              onClick={() => setShowDetailModal(!showDetailModal)}
              className="h-[35.27px] px-[10px] border border-t-subtitle rounded-lg bg-white text-t-subtitle text-body2"
              type="button"
            >
              상세검색
            </button>

            <SearchDetailModal
              isOpen={showDetailModal}
              onClose={() => setShowDetailModal(false)}
              onSearch={handleDetailSearch}
            />
          </div>
        </div>

        {/* 도서 검색 결과/총 건수 - SearchCountText */}
        {(searchKeyword || detailSearchKeyword) && (
          <div className="flex items-center gap-[16px] mb-10">
            <Typography variant="search-result" className="text-t-primary">
              도서 검색 결과
            </Typography>
            <ResultCount count={data?.pages[0]?.meta?.total_count ?? 0} />
          </div>
        )}

        {/* 검색 결과 목록 또는 빈 결과 */}
        {!searchKeyword && !detailSearchKeyword ? (
          <div className="flex items-center justify-center w-full h-full mt-[60px]">
            <EmptyResult />
          </div>
        ) : isPending ? (
          <div className="flex items-center justify-center w-full h-full mt-[60px]">
            <Typography variant="body2" className="text-t-secondary">
              로딩 중...
            </Typography>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center w-full h-full mt-[60px]">
            <EmptyResult message="검색 중 오류가 발생했습니다." />
          </div>
        ) : visibleBooks.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full mt-[60px]">
            <EmptyResult />
          </div>
        ) : (
          <div className="w-full">
            {visibleBooks.map((book, index) => {
              return (
                <div key={index}>
                  {expandedBookIndex === index ? (
                    <BookListItemDetail
                      {...book}
                      author={book.authors.join(", ")}
                      onToggleExpand={() => handleToggleExpand(index)}
                      status={book.status}
                    />
                  ) : (
                    <BookListItem
                      {...book}
                      author={book.authors.join(", ")}
                      onToggleExpand={() => handleToggleExpand(index)}
                      status={book.status}
                    />
                  )}
                </div>
              );
            })}
            {/* 무한스크롤 - sentinel div */}
            <div ref={ref} />
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Typography variant="body2" className="text-t-secondary">
                  불러오는 중...
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
