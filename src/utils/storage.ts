import { STORAGE_KEYS } from "../types/storage";

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

// 전체 검색 기록 삭제
export function clearSearchHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
  } catch (error) {
    console.error("검색 기록 전체 삭제 실패:", error);
  }
}
