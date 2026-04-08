import { useRef, useEffect } from 'react'

export default function InfiniteScrollTrigger({ hasMore, onLoadMore, loading }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!hasMore || loading) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore()
      },
      { threshold: 0.1 }
    )

    const el = ref.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hasMore, onLoadMore, loading])

  if (!hasMore) return null

  return (
    <div ref={ref} className="infinite-trigger">
      <div className="mini-spinner" />
      <span>Loading more results…</span>
      <style>{`
        .infinite-trigger {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          padding: var(--space-2xl);
          color: var(--text-tertiary);
          font-size: var(--text-sm);
        }
        .mini-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid var(--border-primary);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  )
}
