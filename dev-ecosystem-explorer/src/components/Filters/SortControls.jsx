import { useFilterStore } from '../../store/filterStore'

export default function SortControls() {
  const { sort, setSort, activeSource } = useFilterStore()

  const disableStars     = activeSource === 'npm' || activeSource === 'publicapi'
  const disableDownloads = activeSource !== 'npm' && activeSource !== 'all' &&
                           activeSource !== 'docker' && activeSource !== 'crates' &&
                           activeSource !== 'rubygems'

  return (
    <div className="sort-controls">
      <select
        className="sort-select"
        value={sort.field}
        onChange={(e) => setSort({ field: e.target.value })}
        aria-label="Sort by"
      >
        <option value="name">Name (A-Z)</option>
        <option value="stars" disabled={disableStars}>Stars</option>
        <option value="downloads" disabled={disableDownloads}>Downloads</option>
        <option value="updatedAt">Last Updated</option>
      </select>
      <button
        className="sort-direction"
        onClick={() => setSort({ direction: sort.direction === 'asc' ? 'desc' : 'asc' })}
        aria-label={`Sort ${sort.direction === 'asc' ? 'descending' : 'ascending'}`}
        title={sort.direction === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sort.direction === 'asc' ? '↑' : '↓'}
      </button>
      <style>{`
        .sort-controls {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }
        .sort-select {
          padding: var(--space-sm) var(--space-md);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-md);
          background: var(--input-bg);
          color: var(--text-primary);
          font-size: var(--text-sm);
          outline: none;
          cursor: pointer;
        }
        .sort-select:focus {
          border-color: var(--color-primary);
        }
        .sort-direction {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-primary);
          background: var(--input-bg);
          color: var(--text-secondary);
          font-size: var(--text-lg);
          transition: all var(--transition-fast);
        }
        .sort-direction:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  )
}
