import { useMemo } from 'react'
import { useFilterStore } from '../../store/filterStore'

const SOURCE_CONFIG = [
  { key: 'all',        label: 'All' },
  { key: 'github',     label: 'GitHub',     color: 'var(--color-github)' },
  { key: 'npm',        label: 'NPM',        color: 'var(--color-npm)' },
  { key: 'publicapi',  label: 'Public APIs', color: 'var(--color-publicapi)' },
  { key: 'pypi',       label: 'PyPI',       color: 'var(--color-pypi)' },
  { key: 'docker',     label: 'Docker',     color: 'var(--color-docker)' },
  { key: 'crates',     label: 'Crates',     color: 'var(--color-crates)' },
  { key: 'rubygems',   label: 'RubyGems',   color: 'var(--color-rubygems)' },
  { key: 'hackernews', label: 'News',       color: 'var(--color-hackernews)' },
  { key: 'favorites',  label: 'Favorites',  color: 'var(--color-primary)' },
]

export default function SourceTabs({ results, news, favoritesCount }) {
  const { activeSource, setSource } = useFilterStore()

  const counts = useMemo(() => {
    const c = {}
    results.forEach((r) => { c[r.source] = (c[r.source] || 0) + 1 })
    c.all = results.length
    c.hackernews = (news ?? []).length
    c.favorites = favoritesCount ?? 0
    return c
  }, [results, news, favoritesCount])

  return (
    <div className="source-tabs" role="tablist" aria-label="Filter by source">
      {SOURCE_CONFIG.map(({ key, label, color }) => {
        const count = counts[key] ?? 0
        const isActive = activeSource === key
        if (key !== 'all' && key !== 'favorites' && key !== 'hackernews' && count === 0) return null

        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            className={`source-tab ${isActive ? 'active' : ''}`}
            style={isActive && color ? { '--tab-color': color } : {}}
            onClick={() => setSource(key)}
          >
            <span className="tab-label">{label}</span>
            {count > 0 && (
              <span className="tab-count" style={isActive && color ? { background: color } : {}}>
                {count}
              </span>
            )}
          </button>
        )
      })}
      <style>{`
        .source-tabs {
          display: flex;
          gap: var(--space-xs);
          padding: var(--space-sm) 0;
          margin-bottom: var(--space-lg);
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .source-tabs::-webkit-scrollbar { display: none; }
        .source-tab {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-lg);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid transparent;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }
        .source-tab:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .source-tab.active {
          background: var(--color-primary-light);
          color: var(--tab-color, var(--color-primary));
          border-color: var(--color-primary-border);
        }
        .tab-count {
          font-size: var(--text-xs);
          padding: 1px 7px;
          border-radius: var(--radius-full);
          background: var(--badge-bg);
          color: var(--badge-text);
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }
        .source-tab.active .tab-count {
          color: white;
        }
      `}</style>
    </div>
  )
}
