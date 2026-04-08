export default function StarsBadge({ count }) {
  if (count === null || count === undefined) return null
  return (
    <span className="stars-badge">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      <span>{count.toLocaleString()}</span>
      <style>{`
        .stars-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--color-warning);
          padding: 2px 8px;
          background: var(--color-warning-light);
          border-radius: var(--radius-full);
        }
      `}</style>
    </span>
  )
}
