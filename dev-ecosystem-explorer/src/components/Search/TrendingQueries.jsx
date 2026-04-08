import { useSearchStore } from '../../store/searchStore'
import { useTrending } from '../../hooks/useTrending'

export default function TrendingQueries() {
  const setQuery = useSearchStore((s) => s.setQuery)
  const trending = useTrending()

  return (
    <div className="trending-queries">
      <div className="trending-label">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
        <span>Trending</span>
      </div>
      <div className="trending-chips">
        {trending.map((q) => (
          <button
            key={q}
            className="trending-chip"
            onClick={() => setQuery(q)}
          >
            {q}
          </button>
        ))}
      </div>
      <style>{`
        .trending-queries {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          margin-bottom: var(--space-2xl);
          animation: fadeIn 0.3s ease;
        }
        .trending-label {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .trending-chips {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }
        .trending-chip {
          padding: var(--space-sm) var(--space-lg);
          border-radius: var(--radius-full);
          border: 1px solid var(--border-primary);
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          font-size: var(--text-sm);
          font-weight: 500;
          transition: all var(--transition-fast);
        }
        .trending-chip:hover {
          border-color: var(--color-primary-border);
          background: var(--color-primary-light);
          color: var(--color-primary);
        }
      `}</style>
    </div>
  )
}
