import Typography from "./Typography";
import ArrowDownIcon from "../../assets/icons/ic-arrow-down.svg?react";
import FavoriteIconEmpty from "../../assets/icons/ic-favorite-empty.svg?react";
import FavoriteIconFilled from "../../assets/icons/ic-favorite-filled.svg?react";
import { formatContents } from "../../utils/format";
import { useFavorites } from "../../hooks/useFavorites";

interface BookListItemDetailProps {
  isbn: string;
  title: string;
  author: string;
  thumbnail: string;
  price: number;
  salePrice?: number;
  url: string;
  contents: string;
  onToggleExpand: () => void;
  onFavoriteClick: () => void;
  status: string;
}

const BookListItemDetail = ({
  isbn,
  title,
  author,
  thumbnail,
  price,
  salePrice,
  url,
  contents,
  onToggleExpand,
  onFavoriteClick,
  status,
}: BookListItemDetailProps) => {
  const { checkIsFavorite } = useFavorites();
  const isFaved = checkIsFavorite(isbn);

  const handlePurchase = () => {
    window.open(url, "_blank");
  };

  const isDisabled = status !== "정상판매";

  return (
    <div
      className={`pt-6 pb-10 pl-13 pr-4 border-b-1 border-hr-gray ${
        isDisabled ? "bg-gray-100 opacity-60 pointer-events-none" : ""
      }`}
    >
      {/* 상세 정보 영역 */}
      <div className="flex gap-8">
        {/* 1열 영역 */}
        <div className="relative flex-shrink-0">
          <img
            src={thumbnail}
            alt={title}
            className="w-[210px] h-[280px] object-cover rounded"
          />
          <button
            onClick={onFavoriteClick}
            className="absolute top-2 right-2 w-6 h-6 bg-transparent border-0 rounded-full flex items-center justify-center"
            disabled={isDisabled}
          >
            {isFaved ? (
              <FavoriteIconFilled className="w-6 h-6" />
            ) : (
              <FavoriteIconEmpty className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* 2열 영역 */}
        <div
          className={`flex flex-col ${
            contents ? "justify-end" : "justify-start"
          }`}
        >
          {/* 제목과 저자 */}
          <div className="flex items-center gap-4 mb-4 break-keep">
            <Typography variant="h3-bold" className="text-t-primary">
              {title}
            </Typography>

            <Typography variant="caption" className="text-t-subtitle">
              {author}
            </Typography>
          </div>

          {/* 책 소개 - contents가 있을 때만 표시 */}
          {contents && (
            <div className="">
              <Typography
                variant="book-detail-title"
                className="text-t-primary mb-3"
                as="div"
              >
                책 소개
              </Typography>

              {/* 책 설명 */}
              <Typography
                variant="body2"
                className="text-t-secondary whitespace-pre-line"
              >
                {formatContents(contents)}
              </Typography>
            </div>
          )}
        </div>

        {/* 3열 영역 */}
        <div className="flex-1 flex flex-col items-end justify-between">
          <button
            onClick={onToggleExpand}
            className="pl-5 pr-4 py-4 bg-light-gray rounded-lg text-caption text-t-secondary flex items-center gap-[5px]"
            disabled={isDisabled}
          >
            상세보기
            <ArrowDownIcon className="w-[14px] h-2 text-t-secondary mt-0.5 rotate-180" />
          </button>

          <div className="flex flex-col items-end gap-2 w-full">
            {/* 가격 정보 */}
            <div className="flex flex-col items-end gap-2 mb-7">
              {/* 원가 표시 - 항상 표시 */}
              <div className="flex items-center gap-2">
                <Typography
                  variant="book-detail-price-title"
                  className="text-t-subtitle"
                >
                  원가
                </Typography>
                <Typography
                  variant={
                    salePrice && salePrice !== price
                      ? "book-detail-strike-price"
                      : "book-detail-price-title"
                  }
                  className="text-t-primary"
                >
                  {price.toLocaleString()}원
                </Typography>
              </div>

              {/* 할인가 표시 - salePrice 값이 존재하고 원가와 다른 경우에만 */}
              {salePrice && salePrice !== price && (
                <div className="flex items-center gap-2">
                  <Typography
                    variant="book-detail-price-title"
                    className="text-t-subtitle"
                  >
                    할인가
                  </Typography>
                  <Typography variant="h3-bold" className="text-t-primary">
                    {salePrice.toLocaleString()}원
                  </Typography>
                </div>
              )}
            </div>

            {/* 구매하기 버튼 */}
            <button
              onClick={handlePurchase}
              className="w-[240px] py-4 bg-primary text-white text-book-detail-btn rounded-lg"
              disabled={isDisabled}
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookListItemDetail;
