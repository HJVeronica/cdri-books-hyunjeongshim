import Typography from "./Typography";
import ArrowDownIcon from "../../assets/icons/ic-arrow-down.svg?react";
import FavoriteIconEmpty from "../../assets/icons/ic-favorite-empty.svg?react";
import FavoriteIconFilled from "../../assets/icons/ic-favorite-filled.svg?react";
import { useFavorites } from "../../hooks/useFavorites";

interface BookListItemProps {
  isbn: string;
  title: string;
  author: string;
  thumbnail: string;
  price: number;
  url: string;
  onToggleExpand: () => void;
  onFavoriteClick: () => void;
  status: string;
}

const BookListItem = ({
  isbn,
  title,
  author,
  thumbnail,
  price,
  url,
  onToggleExpand,
  onFavoriteClick,
  status,
}: BookListItemProps) => {
  const { checkIsFavorite } = useFavorites();
  const isFaved = checkIsFavorite(isbn);

  const handlePurchase = () => {
    window.open(url, "_blank");
  };

  const isDisabled = status !== "정상판매";

  return (
    <div
      className={`flex items-center py-4 border-b-1 border-hr-gray pl-12 pr-4 ${
        isDisabled ? "bg-gray-200 opacity-60 pointer-events-none" : ""
      }`}
    >
      {/* 책 이미지 */}
      <div className="relative flex-shrink-0 mr-10">
        <img
          src={thumbnail}
          alt={title}
          className="w-12 h-17 object-cover rounded"
        />
        <button
          onClick={onFavoriteClick}
          className="absolute top-0.5 right-0.5 w-[13.33px] h-[12.33px] bg-transparent border-0 rounded-full flex items-center justify-center"
          disabled={isDisabled}
        >
          {isFaved ? <FavoriteIconFilled /> : <FavoriteIconEmpty />}
        </button>
      </div>

      {/* 책 정보 */}
      <div className="flex-1">
        <Typography variant="title3" className="text-t-primary mb-1 mr-5">
          {title}
        </Typography>
        <Typography variant="body2" className="text-t-secondary">
          {author}
        </Typography>
      </div>

      {/* 가격 */}
      <Typography variant="title3" className="text-t-primary mr-14">
        {price.toLocaleString()}원
      </Typography>

      {/* 구매하기 버튼 */}
      <button
        onClick={handlePurchase}
        className="px-7 py-4 bg-primary text-white text-caption rounded-lg mr-2"
        disabled={isDisabled}
      >
        구매하기
      </button>

      {/* 상세보기 버튼 */}
      <button
        onClick={onToggleExpand}
        className="pl-5 pr-4 py-4 bg-light-gray rounded-lg text-caption text-t-secondary flex items-center gap-[5px]"
        disabled={isDisabled}
      >
        상세보기
        <ArrowDownIcon className="w-[14px] h-2 text-t-secondary mt-0.5" />
      </button>
    </div>
  );
};

export default BookListItem;
