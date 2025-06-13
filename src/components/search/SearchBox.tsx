import { useState } from "react";
import Typography from "../common/Typography";
import SearchDetailModal from "./SearchDetailModal";
import SearchIcon from "../../assets/icons/ic-search.svg?react";
import CloseIcon from "../../assets/icons/ic-close.svg?react";
import { useSearchStore } from "../../store/searchStore";
import { useSearchHistory } from "../../hooks/useSearchHistory";
import { getSearchTarget } from "../../utils/searchUtils";

const SearchBox = () => {
  const {
    searchValue,
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

  return (
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
  );
};

export default SearchBox;
