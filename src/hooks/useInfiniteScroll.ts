import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface UseInfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  rootMargin?: string;
  debounceMs?: number;
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  rootMargin = "0px",
  debounceMs = 200,
}: UseInfiniteScrollProps) => {
  // debounce를 위한 timeout ref
  const timeoutRef = useRef<number | null>(null);

  // intersection observer로 sentinel 감지
  const { ref, inView } = useInView({ rootMargin });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      // 기존 timeout이 있으면 제거
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // debounce 적용
      timeoutRef.current = setTimeout(() => {
        fetchNextPage();
      }, debounceMs);
    }

    // cleanup 함수
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    debounceMs,
  ]);

  return { ref };
};
