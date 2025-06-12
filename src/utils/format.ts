/**
 * 연속된 공백(2개 이상)을 개행으로 변환하는 함수
 * @param text 변환할 텍스트
 * @returns 변환된 텍스트
 */
export const formatContents = (text: string): string => {
  if (!text) return "";

  // 2개 이상의 연속된 공백을 개행으로 변환
  return text.replace(/\s{2,}/g, "\n\n");
};
