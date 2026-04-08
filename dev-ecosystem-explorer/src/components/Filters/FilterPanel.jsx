import { useMemo } from 'react'
import FilterChip from './FilterChip'

export default function FilterPanel({ results }) {
  const languages = useMemo(
    () => [...new Set(results.filter((r) => r.language).map((r) => r.language))].sort(),
    [results]
  )
  const licenses = useMemo(
    () => [...new Set(results.filter((r) => r.license).map((r) => r.license))].sort(),
    [results]
  )
  const categories = useMemo(
    () => [...new Set(results.filter((r) => r.category).map((r) => r.category))].sort(),
    [results]
  )

  const hasGitHub    = results.some((r) => r.source === 'github')
  const hasNpm       = results.some((r) => r.source === 'npm')
  const hasPublicApi = results.some((r) => r.source === 'publicapi')
  const hasDocker    = results.some((r) => r.source === 'docker')

  const showAny = languages.length > 0 || licenses.length > 0 || categories.length > 0 || hasPublicApi || hasDocker

  if (!showAny) return null

  return (
    <div className="filter-panel">
      {languages.length > 0 && (hasGitHub || hasNpm) && (
        <div className="filter-group">
          <span className="filter-group-title">Language</span>
          <div className="filter-chips">
            {languages.map((l) => <FilterChip key={l} field="language" value={l} />)}
          </div>
        </div>
      )}

      {licenses.length > 0 && (
        <div className="filter-group">
          <span className="filter-group-title">License</span>
          <div className="filter-chips">
            {licenses.map((l) => <FilterChip key={l} field="license" value={l} />)}
          </div>
        </div>
      )}

      {categories.length > 0 && hasPublicApi && (
        <div className="filter-group">
          <span className="filter-group-title">Category</span>
          <div className="filter-chips">
            {categories.map((c) => <FilterChip key={c} field="category" value={c} />)}
          </div>
        </div>
      )}

      {hasPublicApi && (
        <div className="filter-group">
          <span className="filter-group-title">Security</span>
          <div className="filter-chips">
            <FilterChip field="https" value={true} label="HTTPS Only" />
          </div>
        </div>
      )}

      {hasPublicApi && (
        <div className="filter-group">
          <span className="filter-group-title">Auth</span>
          <div className="filter-chips">
            <FilterChip field="auth" value="" label="No Auth" />
            <FilterChip field="auth" value="apiKey" label="API Key" />
            <FilterChip field="auth" value="OAuth" label="OAuth" />
          </div>
        </div>
      )}

      {hasDocker && (
        <div className="filter-group">
          <span className="filter-group-title">Docker</span>
          <div className="filter-chips">
            <FilterChip field="official" value={true} label="Official Only" />
          </div>
        </div>
      )}

      <style>{`
        .filter-panel {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-lg);
          padding: var(--space-lg);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-lg);
          animation: fadeIn 0.2s ease;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .filter-group-title {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .filter-chips {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-xs);
        }
      `}</style>
    </div>
  )
}
