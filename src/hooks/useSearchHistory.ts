import { useState, useEffect, useCallback } from "react";
import {
  getSearchHistory,
  addSearchHistory,
  removeSearchHistory,
} from "../utils/storage";

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  // 컴포넌트 마운트 시 localStorage에서 검색 기록 로드
  useEffect(() => {
    try {
      const history = getSearchHistory();
      setSearchHistory(history);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("검색 기록 로드 실패"));
    }
  }, []);

  // 검색 기록 추가
  const addToHistory = useCallback((keyword: string) => {
    try {
      addSearchHistory(keyword);
      const updatedHistory = getSearchHistory();
      setSearchHistory(updatedHistory);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("검색 기록 추가 실패"));
    }
  }, []);

  // 특정 검색 기록 삭제
  const removeFromHistory = useCallback((keyword: string) => {
    try {
      removeSearchHistory(keyword);
      const updatedHistory = getSearchHistory();
      setSearchHistory(updatedHistory);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("검색 기록 삭제 실패"));
    }
  }, []);

  return {
    searchHistory,
    addToHistory,
    removeFromHistory,
    error,
  };
}
