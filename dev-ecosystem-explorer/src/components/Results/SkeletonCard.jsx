export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skel-badge" />
      <div className="skel-title" />
      <div className="skel-desc" />
      <div className="skel-desc short" />
      <div className="skel-meta">
        <div className="skel-chip" />
        <div className="skel-chip" />
        <div className="skel-chip" />
      </div>
      <style>{`
        .skeleton-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .skel-badge {
          width: 60px;
          height: 18px;
          border-radius: var(--radius-full);
          background: linear-gradient(90deg, var(--skeleton-from), var(--skeleton-to), var(--skeleton-from));
          background-size: 200% 100%;
          animation: shimmer 1.4s ease infinite;
        }
        .skel-title {
          width: 70%;
          height: 20px;
          border-radius: var(--radius-sm);
          background: linear-gradient(90deg, var(--skeleton-from), var(--skeleton-to), var(--skeleton-from));
          background-size: 200% 100%;
          animation: shimmer 1.4s ease infinite;
        }
        .skel-desc {
          width: 100%;
          height: 14px;
          border-radius: var(--radius-sm);
          background: linear-gradient(90deg, var(--skeleton-from), var(--skeleton-to), var(--skeleton-from));
          background-size: 200% 100%;
          animation: shimmer 1.4s ease infinite;
        }
        .skel-desc.short { width: 60%; }
        .skel-meta {
          display: flex;
          gap: var(--space-sm);
          margin-top: var(--space-xs);
        }
        .skel-chip {
          width: 48px;
          height: 20px;
          border-radius: var(--radius-full);
          background: linear-gradient(90deg, var(--skeleton-from), var(--skeleton-to), var(--skeleton-from));
          background-size: 200% 100%;
          animation: shimmer 1.4s ease infinite;
        }
      `}</style>
    </div>
  )
}
