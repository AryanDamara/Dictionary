import { useMemo } from 'react'
import { fuzzyMatch } from '../../utils/fuzzy'
import { useSearchStore } from '../../store/searchStore'
import { allKeys } from '../../cache'

const POPULAR_STARTERS = ['react', 'express', 'tensorflow', 'docker']

export default function EmptyState({ query }) {
  const setQuery = useSearchStore((s) => s.setQuery)

  const suggestions = useMemo(() => {
    if (!query) return []
    const candidates = allKeys()
    return fuzzyMatch(query, candidates, 3)
  }, [query])

  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>
      <h3 className="empty-title">
        {query ? `No results for "${query}"` : 'Start exploring'}
      </h3>
      <p className="empty-subtitle">
        {query
          ? 'Try a different search term or check the suggestions below'
          : 'Search across GitHub, NPM, PyPI, Docker, Crates.io, and more'}
      </p>

      {suggestions.length > 0 && (
        <div className="empty-suggestions">
          <span className="suggestions-label">Did you mean:</span>
          <div className="suggestions-chips">
            {suggestions.map((s) => (
              <button key={s} className="suggestion-chip" onClick={() => setQuery(s)}>{s}</button>
            ))}
          </div>
        </div>
      )}

      <div className="empty-popular">
        <span className="suggestions-label">Popular searches:</span>
        <div className="suggestions-chips">
          {POPULAR_STARTERS.map((s) => (
            <button key={s} className="suggestion-chip popular" onClick={() => setQuery(s)}>{s}</button>
          ))}
        </div>
      </div>

      <style>{`
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--space-3xl) var(--space-xl);
          animation: fadeIn 0.4s ease;
        }
        .empty-icon {
          color: var(--text-tertiary);
          opacity: 0.4;
          margin-bottom: var(--space-lg);
        }
        .empty-title {
          font-size: var(--text-xl);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }
        .empty-subtitle {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          margin-bottom: var(--space-2xl);
          max-width: 400px;
        }
        .empty-suggestions, .empty-popular {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
        }
        .suggestions-label {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .suggestions-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-sm);
        }
        .suggestion-chip {
          padding: var(--space-sm) var(--space-lg);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-primary);
          background: var(--color-primary-light);
          border: 1px solid var(--color-primary-border);
          transition: all var(--transition-fast);
        }
        .suggestion-chip:hover {
          background: var(--color-primary);
          color: white;
        }
        .suggestion-chip.popular {
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          border-color: var(--border-primary);
        }
        .suggestion-chip.popular:hover {
          background: var(--color-primary-light);
          color: var(--color-primary);
          border-color: var(--color-primary-border);
        }
      `}</style>
    </div>
  )
}
