export default function OfficialBadge({ isOfficial }) {
  if (!isOfficial) return null
  return (
    <span className="official-badge">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
      Official
      <style>{`
        .official-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--color-docker);
          padding: 2px 8px;
          background: rgba(36, 150, 237, 0.12);
          border-radius: var(--radius-full);
        }
      `}</style>
    </span>
  )
}
