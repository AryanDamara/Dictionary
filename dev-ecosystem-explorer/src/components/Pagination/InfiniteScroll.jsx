// ===== InfiniteScroll Component =====
import React from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import Spinner from '../Feedback/Spinner';

export default function InfiniteScroll({ onLoadMore, hasMore, isLoading }) {
  const sentinelRef = useInfiniteScroll(onLoadMore, { enabled: hasMore && !isLoading });

  return (
    <div ref={sentinelRef} style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
      {isLoading && <Spinner size={28} text="Loading more..." />}
      {!hasMore && !isLoading && (
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          You've reached the end ✨
        </p>
      )}
    </div>
  );
}
