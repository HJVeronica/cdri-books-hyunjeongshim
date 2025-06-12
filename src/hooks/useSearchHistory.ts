import { useState, useEffect, useCallback } from "react";
import {
  getSearchHistory,
  addSearchHistory,
  removeSearchHistory,
  clearSearchHistory,
} from "../utils/storage";

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 컴포넌트 마운트 시 localStorage에서 검색 기록 로드
  useEffect(() => {
    const history = getSearchHistory();
    setSearchHistory(history);
  }, []);

  // 검색 기록 추가
  const addToHistory = useCallback((keyword: string) => {
    addSearchHistory(keyword);
    const updatedHistory = getSearchHistory();
    setSearchHistory(updatedHistory);
  }, []);

  // 특정 검색 기록 삭제
  const removeFromHistory = useCallback((keyword: string) => {
    removeSearchHistory(keyword);
    const updatedHistory = getSearchHistory();
    setSearchHistory(updatedHistory);
  }, []);

  // 전체 검색 기록 삭제
  const clearHistory = useCallback(() => {
    clearSearchHistory();
    setSearchHistory([]);
  }, []);

  return {
    searchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
