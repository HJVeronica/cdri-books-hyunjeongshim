import { useState, useEffect } from "react";
import EmptyResult from "../components/common/EmptyResult";
import Typography from "../components/common/Typography";
import ResultCount from "../components/common/ResultCount";
import BookListItem from "../components/common/BookListItem";
import BookListItemDetail from "../components/common/BookListItemDetail";
import SearchBox from "../components/search/SearchBox";
import { useSearchBooksInfinite } from "../hooks/useSearchBooks";
import { useSearchStore } from "../store/searchStore";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useFavorites } from "../hooks/useFavorites";
import type { FavoriteBook } from "../types/storage";
import type { Book } from "../types/api/book";
import { PAGINATION } from "../constants/book";

const SearchPage = () => {
  // Zustand store에서 상태와 액션 가져오기
  const {
    searchKeyword,
    detailSearchKeyword,
    searchTarget,
    resetSearch,
    resetDetailSearch,
  } = useSearchStore();

  const [expandedBookIndex, setExpandedBookIndex] = useState<number | null>(
    null
  );

  // 찜 목록 hook 사용
  const { toggleFavorite } = useFavorites();

  // 도서 검색 페이지로 진입할 때마다 검색 기록 초기화
  useEffect(() => {
    resetSearch();
    resetDetailSearch();
  }, [resetSearch, resetDetailSearch]);

  // 상세보기 토글
  const handleToggleExpand = (index: number) => {
    setExpandedBookIndex(expandedBookIndex === index ? null : index);
  };

  // 찜하기 핸들러 - ISBN으로만 토글
  const handleFavoriteClick = (book: Book) => {
    const favoriteBook: FavoriteBook = {
      isbn: book.isbn,
      title: book.title,
      authors: book.authors,
      thumbnail: book.thumbnail,
      publisher: book.publisher,
      price: book.price,
      sale_price: book.salePrice || book.price,
      url: book.url,
      contents: book.contents,
    };

    toggleFavorite(favoriteBook);
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
      size: PAGINATION.ITEMS_PER_PAGE,
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
  const pageSize = PAGINATION.ITEMS_PER_PAGE;
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
        <SearchBox />

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
                      onFavoriteClick={() => handleFavoriteClick(book)}
                      status={book.status}
                    />
                  ) : (
                    <BookListItem
                      {...book}
                      author={book.authors.join(", ")}
                      onToggleExpand={() => handleToggleExpand(index)}
                      onFavoriteClick={() => handleFavoriteClick(book)}
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
