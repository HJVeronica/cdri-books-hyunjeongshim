import { STORAGE_KEYS, type FavoriteBook } from "../types/storage";

// 검색 기록 조회 (최신순)
export function getSearchHistory(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("검색 기록 조회 실패:", error);
    return [];
  }
}

/**
 * 검색 기록 추가
 * - 최대 8개 제한
 * - 중복 시 최신으로 이동
 * - 빈 문자열 필터링
 */
export function addSearchHistory(keyword: string): void {
  try {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    const history = getSearchHistory();

    // 기존 항목 제거 후 맨 앞에 추가, 8개 제한
    const updated = [
      trimmed,
      ...history.filter((item) => item !== trimmed),
    ].slice(0, 8);

    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updated));
  } catch (error) {
    console.error("검색 기록 추가 실패:", error);
  }
}

// 특정 검색 기록 삭제
export function removeSearchHistory(keyword: string): void {
  try {
    const history = getSearchHistory();
    const updated = history.filter((item) => item !== keyword);
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updated));
  } catch (error) {
    console.error("검색 기록 삭제 실패:", error);
  }
}

// 찜 목록 조회
export function getFavorites(): FavoriteBook[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("찜 목록 조회 실패:", error);
    return [];
  }
}

// 찜 목록에 도서 추가
export function addToFavorites(book: FavoriteBook): void {
  try {
    const favorites = getFavorites();

    // 이미 찜한 책인지 확인 (ISBN으로 중복 체크)
    const exists = favorites.some((item) => item.isbn === book.isbn);
    if (exists) return;

    const updated = [book, ...favorites];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
  } catch (error) {
    console.error("찜 목록 추가 실패:", error);
  }
}

// 찜 목록에서 도서 삭제
export function removeFromFavorites(isbn: string): void {
  try {
    const favorites = getFavorites();
    const updated = favorites.filter((item) => item.isbn !== isbn);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
  } catch (error) {
    console.error("찜 목록 삭제 실패:", error);
  }
}

// 특정 도서가 찜 목록에 있는지 확인
export function isFavorite(isbn: string): boolean {
  try {
    const favorites = getFavorites();
    return favorites.some((item) => item.isbn === isbn);
  } catch (error) {
    console.error("찜 상태 확인 실패:", error);
    return false;
  }
}
