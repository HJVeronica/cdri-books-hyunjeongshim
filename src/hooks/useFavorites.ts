import { useState, useEffect, useCallback } from "react";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../utils/storage";
import type { FavoriteBook } from "../types/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteBook[]>([]);
  const [error, setError] = useState<Error | null>(null);

  // 컴포넌트 마운트 시 localStorage에서 찜 목록 로드
  useEffect(() => {
    try {
      const savedFavorites = getFavorites();
      setFavorites(savedFavorites);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("찜 목록을 불러오는데 실패했습니다.")
      );
    }
  }, []);

  // 찜 목록에 추가
  const addToFavoritesList = useCallback((book: FavoriteBook) => {
    try {
      addToFavorites(book);
      const updatedFavorites = getFavorites();
      setFavorites(updatedFavorites);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("찜 목록 추가에 실패했습니다.")
      );
    }
  }, []);

  // 찜 목록에서 삭제
  const removeFromFavoritesList = useCallback((isbn: string) => {
    try {
      removeFromFavorites(isbn);
      const updatedFavorites = getFavorites();
      setFavorites(updatedFavorites);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("찜 목록 삭제에 실패했습니다.")
      );
    }
  }, []);

  // 찜 상태 토글
  const toggleFavorite = useCallback(
    (book: FavoriteBook) => {
      try {
        if (isFavorite(book.isbn)) {
          removeFromFavoritesList(book.isbn);
        } else {
          addToFavoritesList(book);
        }
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("찜 상태 변경에 실패했습니다.")
        );
      }
    },
    [addToFavoritesList, removeFromFavoritesList]
  );

  // 찜 상태 확인
  const checkIsFavorite = useCallback((isbn: string) => {
    try {
      return isFavorite(isbn);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("찜 상태 확인에 실패했습니다.")
      );
      return false;
    }
  }, []);

  return {
    favorites,
    addToFavoritesList,
    removeFromFavoritesList,
    toggleFavorite,
    checkIsFavorite,
    error,
  };
}
