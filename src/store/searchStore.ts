import { create } from "zustand";

interface SearchState {
  // 전체검색 상태
  searchValue: string;
  searchKeyword: string;

  // 상세검색 상태
  detailSearchValue: string;
  detailSearchKeyword: string;
  searchTarget: "title" | "publisher" | "person" | undefined;
  detailSearchType: string;

  // 액션
  setSearchValue: (value: string) => void;
  setSearchKeyword: (keyword: string) => void;
  setDetailSearchValue: (value: string) => void;
  setDetailSearchKeyword: (keyword: string) => void;
  setSearchTarget: (
    target: "title" | "publisher" | "person" | undefined
  ) => void;
  setDetailSearchType: (type: string) => void;

  // 검색 초기화
  resetSearch: () => void;
  resetDetailSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  // 전체검색 상태
  searchValue: "",
  searchKeyword: "",

  // 상세검색 상태
  detailSearchValue: "",
  detailSearchKeyword: "",
  searchTarget: undefined,
  detailSearchType: "제목",

  // 액션
  setSearchValue: (value) => set({ searchValue: value }),
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setDetailSearchValue: (value) => set({ detailSearchValue: value }),
  setDetailSearchKeyword: (keyword) => set({ detailSearchKeyword: keyword }),
  setSearchTarget: (target) => set({ searchTarget: target }),
  setDetailSearchType: (type) => set({ detailSearchType: type }),

  // 검색 초기화
  resetSearch: () =>
    set({
      searchValue: "",
      searchKeyword: "",
    }),
  resetDetailSearch: () =>
    set({
      detailSearchValue: "",
      detailSearchKeyword: "",
      searchTarget: undefined,
      detailSearchType: "제목",
    }),
}));
