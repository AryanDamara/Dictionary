export default function ErrorBanner({ errors }) {
  if (!errors?.length) return null

  const nonRateLimitErrors = errors.filter((e) => e.error?.type !== 'RATE_LIMIT')
  if (!nonRateLimitErrors.length) return null

  return (
    <div className="error-banner">
      {nonRateLimitErrors.map((e) => (
        <div key={e.source} className="error-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <span>
            <strong>{e.source}</strong> — {e.error?.message ?? 'Unknown error'}
          </span>
        </div>
      ))}
      <style>{`
        .error-banner {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          padding: var(--space-md) var(--space-lg);
          background: var(--color-danger-light);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-lg);
          animation: fadeIn 0.2s ease;
        }
        .error-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: var(--text-sm);
          color: var(--color-danger);
        }
        .error-item strong {
          text-transform: capitalize;
        }
      `}</style>
    </div>
  )
}
