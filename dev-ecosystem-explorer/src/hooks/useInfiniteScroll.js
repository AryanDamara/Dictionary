// ===== useInfiniteScroll Hook =====

import { useEffect, useRef, useCallback } from 'react';

/**
 * Triggers `onLoadMore` when a sentinel element becomes visible.
 */
export function useInfiniteScroll(onLoadMore, { enabled = true, threshold = 0.1 } = {}) {
  const sentinelRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && enabled) {
        onLoadMore();
      }
    },
    [onLoadMore, enabled]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '200px',
      threshold,
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersect, threshold]);

  return sentinelRef;
}

export default useInfiniteScroll;
