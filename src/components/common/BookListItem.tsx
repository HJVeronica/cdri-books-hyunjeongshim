import Typography from "./Typography";
import ArrowDownIcon from "../../assets/icons/ic-arrow-down.svg?react";

interface BookListItemProps {
  title: string;
  author: string;
  publisher: string;
  thumbnail: string;
  price: number;
  url: string;
  onToggleExpand: () => void;
  status: string;
}

const BookListItem = ({
  title,
  author,
  thumbnail,
  price,
  url,
  onToggleExpand,
  status,
}: BookListItemProps) => {
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
      <img
        src={thumbnail}
        alt={title}
        className="w-12 h-17 object-cover rounded flex-shrink-0 mr-10"
      />

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
