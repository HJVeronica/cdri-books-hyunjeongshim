import EmptyResult from "../components/common/EmptyResult";
import Typography from "../components/common/Typography";
import ResultCount from "../components/common/ResultCount";
import SearchIcon from "../assets/icons/ic-search.svg?react";

const SearchPage = () => {
  return (
    <div className="flex flex-col w-full bg-white max-w-[600px] mx-auto">
      <div className="w-full mt-[60px] flex flex-col items-start">
        {/* 도서 검색 타이틀 */}
        <Typography variant="title2" className="mb-6">
          도서 검색
        </Typography>

        {/* 검색 input + 상세검색 버튼 */}
        <div className="flex w-full items-center mb-6">
          <div className="flex items-center flex-1 bg-light-gray rounded-full px-4 h-[50px]">
            <SearchIcon className="w-[20px] h-[20px] text-t-secondary mr-2" />
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="flex-1 bg-transparent outline-none text-t-primary placeholder:text-t-caption text-[16px] leading-[16px]"
            />
          </div>
          <button
            className="ml-3 h-[35.27px] px-[10px] border border-t-subtitle rounded-[8px] bg-white text-t-subtitle text-body2"
            type="button"
          >
            상세검색
          </button>
        </div>

        {/* 도서 검색 결과/총 건수 */}
        <div className="flex items-center gap-[16px] mb-10">
          <Typography variant="search-result" className="text-t-primary">
            도서 검색 결과
          </Typography>

          <ResultCount count={0} />
        </div>
      </div>

      {/* 검색 결과 없음 */}
      <div className="flex items-center justify-center w-full h-full mt-[60px]">
        <EmptyResult />
      </div>
    </div>
  );
};

export default SearchPage;
