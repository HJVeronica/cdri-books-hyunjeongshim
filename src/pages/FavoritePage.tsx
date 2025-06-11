import EmptyResult from "../components/common/EmptyResult";
import Typography from "../components/common/Typography";
import ResultCount from "../components/common/ResultCount";

const FavoritePage = () => {
  return (
    <div className="flex flex-col w-full bg-white max-w-[600px] mx-auto">
      <div className="w-full mt-[60px] flex flex-col items-start">
        {/* 내가 찜한 책 타이틀 */}
        <Typography variant="title2" className="mb-6">
          내가 찜한 책
        </Typography>

        {/* 찜한 책 총 건수 */}
        <div className="flex items-center gap-[16px] mb-10">
          <Typography variant="search-result" className="text-t-primary">
            찜한 책
          </Typography>

          <ResultCount count={0} />
        </div>
      </div>

      {/* 찜한 책 없음 */}
      <div className="flex items-center justify-center w-full h-full mt-[60px]">
        <EmptyResult message="찜한 책이 없습니다." />
      </div>
    </div>
  );
};

export default FavoritePage;
