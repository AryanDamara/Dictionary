export default function HttpsBadge({ https }) {
  if (https === null || https === undefined) return null
  return (
    <span className={`https-badge ${https ? 'secure' : 'insecure'}`}>
      {https ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
        </svg>
      )}
      <span>{https ? 'HTTPS' : 'HTTP'}</span>
      <style>{`
        .https-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: var(--text-xs);
          font-weight: 600;
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }
        .https-badge.secure {
          color: var(--color-success);
          background: var(--color-success-light);
        }
        .https-badge.insecure {
          color: var(--color-danger);
          background: var(--color-danger-light);
        }
      `}</style>
    </span>
  )
}
