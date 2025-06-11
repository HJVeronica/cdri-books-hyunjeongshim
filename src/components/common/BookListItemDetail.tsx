import Typography from "./Typography";
import ArrowDownIcon from "../../assets/icons/ic-arrow-down.svg?react";
import FavoriteIconEmpty from "../../assets/icons/ic-favorite-empty.svg?react";

interface BookListItemDetailProps {
  title: string;
  author: string;
  thumbnail: string;
  price: number;
  salePrice?: number;
  url: string;
  contents: string;
  onToggleExpand: () => void;
}

const BookListItemDetail = ({
  title,
  author,
  thumbnail,
  price,
  salePrice,
  url,
  contents,
  onToggleExpand,
}: BookListItemDetailProps) => {
  const handlePurchase = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="pt-6 pb-10 pl-13 pr-4 border-b-1 border-hr-gray">
      {/* 상세 정보 영역 */}
      <div className="flex gap-8">
        {/* 1열 영역 */}
        <div className="relative flex-shrink-0">
          <img
            src={thumbnail}
            alt={title}
            className="w-[210px] h-[280px] object-cover rounded"
          />
          <button className="absolute top-2 right-2 w-6 h-6 bg-transparent border-0 rounded-full flex items-center justify-center">
            <FavoriteIconEmpty className="w-6 h-6" />
          </button>
        </div>

        {/* 2열 영역 */}
        <div className="flex flex-col justify-end">
          {/* 제목과 저자 */}
          <div className="flex items-center gap-4 mb-4">
            <Typography variant="h3-bold" className="text-t-primary">
              {title}
            </Typography>

            <Typography variant="caption" className="text-t-subtitle">
              {author}
            </Typography>
          </div>

          {/* 책 소개 */}
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
              variant="book-detail-contents"
              className="text-t-primary"
              as="div"
            >
              {contents}
            </Typography>
          </div>
        </div>

        {/* 3열 영역 */}
        <div className="flex-1 flex flex-col items-end justify-between">
          <button
            onClick={onToggleExpand}
            className="pl-5 pr-4 py-4 bg-light-gray rounded-lg text-caption text-t-secondary flex items-center gap-[5px]"
          >
            상세보기
            <ArrowDownIcon className="w-[14px] h-2 text-t-secondary mt-0.5 rotate-180" />
          </button>

          <div className="flex flex-col items-end gap-2 w-full">
            {/* 가격 정보 */}
            <div className="flex flex-col items-end gap-2 mb-7">
              {salePrice && salePrice !== price && (
                <div className="flex items-center gap-2">
                  <Typography
                    variant="book-detail-price-title"
                    className="text-t-subtitle"
                  >
                    원가
                  </Typography>
                  <Typography
                    variant="book-detail-strike-price"
                    className="text-t-primary"
                  >
                    {price.toLocaleString()}원
                  </Typography>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Typography
                  variant="book-detail-price-title"
                  className="text-t-subtitle"
                >
                  할인가
                </Typography>
                <Typography variant="h3-bold" className="text-t-primary">
                  {(salePrice || price).toLocaleString()}원
                </Typography>
              </div>
            </div>

            {/* 구매하기 버튼 */}
            <button
              onClick={handlePurchase}
              className="w-[240px] py-4 bg-primary text-white text-book-detail-btn rounded-lg"
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
