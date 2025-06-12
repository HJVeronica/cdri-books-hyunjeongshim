import { useState } from "react";
import ModalCloseIcon from "../../assets/icons/ic-modal-close.svg?react";
import ArrowDownIcon from "../../assets/icons/ic-arrow-down.svg?react";
import { useSearchStore } from "../../store/searchStore";

interface SearchDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchType: string, keyword: string) => void;
}

const SearchDetailModal = ({
  isOpen,
  onClose,
  onSearch,
}: SearchDetailModalProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    detailSearchType,
    setDetailSearchType,
    detailSearchValue,
    setDetailSearchValue,
  } = useSearchStore();

  const searchOptions = [
    { label: "제목", value: "title" },
    { label: "저자명", value: "person" },
    { label: "출판사", value: "publisher" },
  ];

  const handleSearch = () => {
    const selectedOption = searchOptions.find(
      (option) => option.label === detailSearchType
    );
    onSearch(selectedOption?.value || "title", detailSearchValue);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSelectOption = (option: { label: string; value: string }) => {
    setDetailSearchType(option.label);
    setIsDropdownOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-90 h-40 bg-white rounded-lg shadow-modal z-20 transition-all duration-200 ease-out ${
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 cursor-pointer"
      >
        <ModalCloseIcon className="w-5 h-5 text-t-secondary" />
      </button>

      <div className="py-9 px-6 h-full flex flex-col">
        <div className="flex gap-2 mb-4">
          {/* 커스텀 드롭다운 */}
          <div className="relative w-25">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-10 px-2 border-b border-hr-gray bg-white text-t-primary text-[14px] font-bold text-left outline-none focus:border-primary flex items-center justify-between"
            >
              {detailSearchType}
              <ArrowDownIcon className="w-3[10.5px] h-[6px]" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border border-hr-gray shadow-select z-30 mt-[6px]">
                {searchOptions
                  .filter((option) => option.label !== detailSearchType)
                  .map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelectOption(option)}
                      className="w-full px-2 py-1 text-left text-[14px] leading-[22px] font-medium text-t-subtitle"
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* 검색창 */}
          <input
            type="text"
            placeholder="검색어 입력"
            value={detailSearchValue}
            onChange={(e) => setDetailSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 h-10 px-3 border-b border-hr-gray bg-white text-t-primary text-[14px] leading-[22px] placeholder:text-t-subtitle outline-none focus:border-primary"
          />
        </div>

        {/* 검색하기 버튼 */}
        <div className="flex-1 flex items-end">
          <button
            onClick={handleSearch}
            className="w-full h-10 bg-primary text-white rounded-lg text-[14px] leading-[22px] font-medium transition-colors"
          >
            검색하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchDetailModal;
