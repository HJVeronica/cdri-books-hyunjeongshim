import { create } from "zustand";
import type { SearchStore } from "../types/store";

export const useSearchStore = create<SearchStore>((set) => ({
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
