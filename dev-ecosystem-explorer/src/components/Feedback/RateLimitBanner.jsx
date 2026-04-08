export default function RateLimitBanner({ errors }) {
  if (!errors?.length) return null

  const rateLimitErrors = errors.filter((e) => e.error?.type === 'RATE_LIMIT')
  if (!rateLimitErrors.length) return null

  return (
    <div className="rate-limit-banner">
      <div className="rate-limit-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <div className="rate-limit-content">
        <strong>Rate limit reached</strong>
        {rateLimitErrors.map((e) => {
          const resetAt = e.error?.resetAt
          const timeStr = resetAt
            ? new Date(resetAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : 'unknown'
          return (
            <p key={e.source}>
              {e.source} resets at {timeStr}
            </p>
          )
        })}
        <p className="rate-limit-hint">
          Add a GitHub token in Settings to raise your limit to 5,000/hr.
        </p>
      </div>
      <style>{`
        .rate-limit-banner {
          display: flex;
          gap: var(--space-md);
          padding: var(--space-md) var(--space-lg);
          background: var(--color-warning-light);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-lg);
          animation: fadeIn 0.2s ease;
        }
        .rate-limit-icon {
          color: var(--color-warning);
          flex-shrink: 0;
          padding-top: 2px;
        }
        .rate-limit-content {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }
        .rate-limit-content strong {
          color: var(--color-warning);
          display: block;
          margin-bottom: var(--space-xs);
        }
        .rate-limit-content p {
          margin-bottom: var(--space-xs);
        }
        .rate-limit-hint {
          color: var(--text-tertiary);
          font-size: var(--text-xs);
          font-style: italic;
        }
      `}</style>
    </div>
  )
}
