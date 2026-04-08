import { useFilterStore } from '../../store/filterStore'

export default function ViewToggle() {
  const { viewMode, setViewMode } = useFilterStore()

  return (
    <div className="view-toggle" role="radiogroup" aria-label="View mode">
      <button
        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
        onClick={() => setViewMode('grid')}
        aria-label="Grid view"
        role="radio"
        aria-checked={viewMode === 'grid'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
      </button>
      <button
        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
        onClick={() => setViewMode('list')}
        aria-label="List view"
        role="radio"
        aria-checked={viewMode === 'list'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      </button>
      <style>{`
        .view-toggle {
          display: flex;
          gap: 2px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: 2px;
        }
        .view-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 30px;
          border-radius: var(--radius-sm);
          color: var(--text-tertiary);
          transition: all var(--transition-fast);
        }
        .view-btn:hover { color: var(--text-primary); }
        .view-btn.active {
          background: var(--bg-elevated);
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }
      `}</style>
    </div>
  )
}
