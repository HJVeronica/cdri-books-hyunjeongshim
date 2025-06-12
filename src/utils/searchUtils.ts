/**
 * 검색 타입에 따라 검색 타겟을 반환하는 함수
 * @param searchType 검색 타입
 * @returns 검색 타겟
 */
export const getSearchTarget = (
  searchType: string
): "title" | "publisher" | "person" => {
  const targetMap: Record<string, "title" | "publisher" | "person"> = {
    title: "title",
    person: "person",
    publisher: "publisher",
  };

  return targetMap[searchType] || "title";
};
