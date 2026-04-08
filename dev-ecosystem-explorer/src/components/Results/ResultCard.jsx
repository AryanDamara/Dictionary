import StarsBadge from './StarsBadge'
import HttpsBadge from './HttpsBadge'
import OfficialBadge from './OfficialBadge'
import { useFavorites } from '../../hooks/useFavorites'
import { useCompareStore } from '../../store/compareStore'
import { formatRelative } from '../../utils/constants'

const SOURCE_LABELS = {
  github: 'GitHub', npm: 'NPM', publicapi: 'Public API',
  pypi: 'PyPI', docker: 'Docker', hackernews: 'HN',
  crates: 'Crates.io', rubygems: 'RubyGems',
}

const SOURCE_COLORS = {
  github: 'var(--color-github)', npm: 'var(--color-npm)',
  publicapi: 'var(--color-publicapi)', pypi: 'var(--color-pypi)',
  docker: 'var(--color-docker)', hackernews: 'var(--color-hackernews)',
  crates: 'var(--color-crates)', rubygems: 'var(--color-rubygems)',
}

export default function ResultCard({ result }) {
  const { isFavorite, toggle } = useFavorites()
  const { isComparing, toggleItem, items } = useCompareStore()
  const fav = isFavorite(result.id)
  const comparing = isComparing(result.id)
  const canCompare = items.length < 3 || comparing

  return (
    <article className="result-card">
      <div className="card-header">
        <span className="source-badge" style={{ '--src-color': SOURCE_COLORS[result.source] }}>
          {SOURCE_LABELS[result.source] ?? result.source}
        </span>
        <div className="card-actions">
          <button
            className={`fav-btn ${fav ? 'active' : ''}`}
            onClick={() => toggle(result)}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            title={fav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          {canCompare && (
            <button
              className={`compare-btn ${comparing ? 'active' : ''}`}
              onClick={() => toggleItem(result)}
              aria-label={comparing ? 'Remove from comparison' : 'Compare'}
              title={comparing ? 'Remove from comparison' : 'Compare'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <a href={result.url} target="_blank" rel="noopener noreferrer" className="card-name">
        {result.name}
      </a>

      <p className="card-description">{result.description}</p>

      <div className="card-meta">
        {result.stars !== null && <StarsBadge count={result.stars} />}
        {result.https !== null && <HttpsBadge https={result.https} />}
        {result.isOfficial && <OfficialBadge isOfficial />}

        {result.downloads !== null && (
          <span className="meta-item downloads">
            ↓ {result.downloads.toLocaleString()}
          </span>
        )}
        {result.language && (
          <span className="meta-item language">{result.language}</span>
        )}
        {result.version && (
          <span className="meta-item version">v{result.version}</span>
        )}
        {result.license && (
          <span className="meta-item license">{result.license}</span>
        )}
        {result.category && (
          <span className="meta-item category">{result.category}</span>
        )}
        {result.auth && (
          <span className="meta-item auth">{result.auth}</span>
        )}
        {result.updatedAt && (
          <span className="meta-item updated">{formatRelative(result.updatedAt)}</span>
        )}
      </div>

      <style>{`
        .result-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          transition: all var(--transition-fast);
          animation: fadeIn 0.3s ease;
        }
        .result-card:hover {
          border-color: var(--color-primary-border);
          box-shadow: var(--shadow-md);
          transform: translateY(-1px);
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .source-badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          color: var(--src-color);
          background: color-mix(in srgb, var(--src-color) 12%, transparent);
        }
        .card-actions {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }
        .fav-btn, .compare-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          color: var(--text-tertiary);
          transition: all var(--transition-fast);
        }
        .fav-btn:hover { color: #ef4444; }
        .fav-btn.active { color: #ef4444; }
        .compare-btn:hover { color: var(--color-primary); }
        .compare-btn.active {
          color: var(--color-primary);
          background: var(--color-primary-light);
        }
        .card-name {
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          word-break: break-word;
        }
        .card-name:hover { color: var(--color-primary); }
        .card-description {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-top: var(--space-xs);
          align-items: center;
        }
        .meta-item {
          font-size: var(--text-xs);
          color: var(--text-tertiary);
          padding: 2px 8px;
          background: var(--badge-bg);
          border-radius: var(--radius-full);
          font-weight: 500;
        }
        .meta-item.downloads {
          color: var(--color-success);
          background: var(--color-success-light);
        }
      `}</style>
    </article>
  )
}
