import { useState, useMemo } from "react";
import EmptyResult from "../components/common/EmptyResult";
import Typography from "../components/common/Typography";
import ResultCount from "../components/common/ResultCount";
import BookListItem from "../components/common/BookListItem";
import BookListItemDetail from "../components/common/BookListItemDetail";
import { useFavorites } from "../hooks/useFavorites";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import type { FavoriteBook } from "../types/storage";

const FavoritePage = () => {
  const [expandedBookIndex, setExpandedBookIndex] = useState<number | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(10);
  const { favorites, toggleFavorite } = useFavorites();

  // 상세보기 토글
  const handleToggleExpand = (index: number) => {
    setExpandedBookIndex(expandedBookIndex === index ? null : index);
  };

  // 찜하기 핸들러
  const handleFavoriteClick = (book: FavoriteBook) => {
    toggleFavorite(book);
  };

  // 페이지네이션용 계산
  const visibleBooks = useMemo(() => {
    return favorites.slice(0, visibleCount);
  }, [favorites, visibleCount]);

  const hasNextPage = visibleCount < favorites.length;

  // 다음 페이지 로드
  const fetchNextPage = () => {
    if (hasNextPage) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  // 무한스크롤 hook 사용
  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: false,
    isFetching: false,
  });

  return (
    <div className="flex flex-col w-full bg-white max-w-[960px] mx-auto">
      <div className="w-full mt-15 flex flex-col items-start">
        <Typography variant="title2" className="mb-6">
          내가 찜한 책
        </Typography>

        <div className="flex items-center gap-[16px] mb-10">
          <Typography variant="search-result" className="text-t-primary">
            찜한 책
          </Typography>

          {/* 찜한 책 권수 */}
          <ResultCount count={favorites.length} />
        </div>

        {/* 찜한 책 목록 */}
        {favorites.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full mt-15">
            <EmptyResult message="찜한 책이 없습니다." />
          </div>
        ) : (
          <div className="w-full">
            {visibleBooks.map((book, index) => {
              return (
                <div key={book.isbn}>
                  {expandedBookIndex === index ? (
                    <BookListItemDetail
                      isbn={book.isbn}
                      title={book.title}
                      author={book.authors.join(", ")}
                      thumbnail={book.thumbnail}
                      price={book.price}
                      salePrice={book.sale_price}
                      url={book.url}
                      contents={book.contents}
                      onToggleExpand={() => handleToggleExpand(index)}
                      onFavoriteClick={() => handleFavoriteClick(book)}
                      status="정상판매"
                    />
                  ) : (
                    <BookListItem
                      isbn={book.isbn}
                      title={book.title}
                      author={book.authors.join(", ")}
                      thumbnail={book.thumbnail}
                      price={book.price}
                      url={book.url}
                      onToggleExpand={() => handleToggleExpand(index)}
                      onFavoriteClick={() => handleFavoriteClick(book)}
                      status="정상판매"
                    />
                  )}
                </div>
              );
            })}
            {/* 무한스크롤 - sentinel div */}
            <div ref={ref} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
