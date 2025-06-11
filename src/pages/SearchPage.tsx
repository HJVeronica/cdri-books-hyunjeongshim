import { useState } from "react";
import EmptyResult from "../components/common/EmptyResult";
import Typography from "../components/common/Typography";
import ResultCount from "../components/common/ResultCount";
import BookListItem from "../components/common/BookListItem";
import BookListItemDetail from "../components/common/BookListItemDetail";
import SearchDetailModal from "../components/search/SearchDetailModal";
import SearchIcon from "../assets/icons/ic-search.svg?react";
import CloseIcon from "../assets/icons/ic-close.svg?react";

// 더미 데이터
const mockBooks = [
  {
    title: "고양이를 버리다",
    author: "무라카미 하루키",
    thumbnail:
      "https://image.aladin.co.kr/product/25427/78/cover500/e932537340_1.jpg",
    price: 13300,
    salePrice: 11970,
    url: "https://search.daum.net/search?w=bookpage&bookId=387102",
    contents: `“나를 언제까지나 잊지 마, 내가 여기 있었다는 걸 기억해 줘.”

하루키 월드의 빛나는 다이아몬드
무라카미 하루키를 만나기 위해 가장 먼저 읽어야 할 책!

페이지를 처음 펼치는 오늘의 젊음들에게, 그리고 오랜 기억 속에 책의 한 구절 을 간직하고 있는 어제의 젊음들에게, 한결같은 울림으로 예민하고 섬세한 청춘의 감성을 전하며 영원한 필독서로 사랑받고 있는 무라카미 하루키의 대표작 『노르웨이의 숲』. 1989년 『상실의 시대』라는 제명으로 처음 출간된 이래 우리 출판 사상 최장기 베스트셀러를 기록하며 하나의 사건으로 남은 소설, 『노르웨이의 숲』이 민음사 세계문학전집에 이어 단행본으로 출간되었다.`,
  },
  {
    title: "무라카미 T(양장본 HardCover)",
    author: "무라카미 하루키",
    thumbnail:
      "https://image.aladin.co.kr/product/27030/46/cover500/893498998x_1.jpg",
    price: 13300,
    url: "https://search.daum.net/search?w=bookpage&bookId=387102",
    contents: "책소개 내용",
  },
];

const SearchPage = () => {
  const hasResults = mockBooks.length > 0;
  const [searchValue, setSearchValue] = useState("");
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchHistory, setSearchHistory] = useState([
    "노르웨이 숲",
    "무라카미 하루키",
  ]);

  const handleRemoveSearchHistory = (index: number) => {
    setSearchHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputFocus = () => {
    setShowSearchHistory(true);
  };

  const handleInputBlur = () => {
    // 약간의 지연을 두어 클릭 이벤트가 처리될 수 있도록 함
    setTimeout(() => setShowSearchHistory(false), 150);
  };

  const handleDetailSearch = (searchType: string, keyword: string) => {
    console.log("상세검색:", searchType, keyword);
    // 여기에 실제 검색 로직 구현
  };

  const handleSelectSearchHistory = (item: string) => {
    setSearchValue(item);
    setShowSearchHistory(false);
  };

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
                      onClick={() => handleRemoveSearchHistory(index)}
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
        <div className="flex items-center gap-[16px] mb-10">
          <Typography variant="search-result" className="text-t-primary">
            도서 검색 결과
          </Typography>

          <ResultCount count={mockBooks.length} />
        </div>

        {/* 검색 결과 목록 또는 빈 결과 */}
        {hasResults ? (
          <div className="w-full">
            {mockBooks.map((book, index) => (
              <div key={index}>
                <BookListItem {...book} />
                {/* 확인용 BookListItemDetail */}
                <BookListItemDetail
                  {...book}
                  onToggleExpand={() => console.log("Toggle expand")}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full mt-[60px]">
            <EmptyResult />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
