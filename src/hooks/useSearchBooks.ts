import { useInfiniteQuery } from "@tanstack/react-query";
import { searchBooksInfinite } from "../utils/api";
import type { BookSearchParams } from "../types/api/book";

// 무한 스크롤 도서 검색 hook
export const useSearchBooksInfinite = (
  params: Omit<BookSearchParams, "page">,
  enabled = true
) => {
  return useInfiniteQuery({
    queryKey: ["books", "search-infinite", params],
    queryFn: ({ pageParam, queryKey }) =>
      searchBooksInfinite({
        pageParam,
        queryKey: queryKey as unknown as readonly [
          string,
          string,
          Omit<BookSearchParams, "page">
        ],
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.is_end) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
    enabled: enabled && !!params.query,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
