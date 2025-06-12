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

  // 컴포넌트 마운트 시 localStorage에서 찜 목록 로드
  useEffect(() => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  }, []);

  // 찜 목록에 추가
  const addToFavoritesList = useCallback((book: FavoriteBook) => {
    addToFavorites(book);
    const updatedFavorites = getFavorites();
    setFavorites(updatedFavorites);
  }, []);

  // 찜 목록에서 삭제
  const removeFromFavoritesList = useCallback((isbn: string) => {
    removeFromFavorites(isbn);
    const updatedFavorites = getFavorites();
    setFavorites(updatedFavorites);
  }, []);

  // 찜 상태 토글
  const toggleFavorite = useCallback(
    (book: FavoriteBook) => {
      if (isFavorite(book.isbn)) {
        removeFromFavoritesList(book.isbn);
      } else {
        addToFavoritesList(book);
      }
    },
    [addToFavoritesList, removeFromFavoritesList]
  );

  // 찜 상태 확인
  const checkIsFavorite = useCallback((isbn: string) => {
    return isFavorite(isbn);
  }, []);

  return {
    favorites,
    addToFavoritesList,
    removeFromFavoritesList,
    toggleFavorite,
    checkIsFavorite,
  };
}
