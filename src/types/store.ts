// 검색 관련 상태 타입
export interface SearchState {
  // 전체검색 상태
  searchValue: string;
  searchKeyword: string;

  // 상세검색 상태
  detailSearchValue: string;
  detailSearchKeyword: string;
  detailSearchType: string;
  searchTarget: "title" | "publisher" | "person" | undefined;
}

// 검색 관련 액션 타입
export interface SearchActions {
  // 액션
  setSearchValue: (value: string) => void;
  setSearchKeyword: (keyword: string) => void;
  setDetailSearchValue: (value: string) => void;
  setDetailSearchKeyword: (keyword: string) => void;
  setDetailSearchType: (type: string) => void;
  setSearchTarget: (
    target: "title" | "publisher" | "person" | undefined
  ) => void;

  // 검색 초기화
  resetSearch: () => void;
  resetDetailSearch: () => void;
}

// 검색 스토어 타입
export type SearchStore = SearchState & SearchActions;
