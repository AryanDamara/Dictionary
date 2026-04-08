import { useFilterStore } from '../../store/filterStore'

export default function ClearAllButton() {
  const { clearAll, hasActiveFilters } = useFilterStore()

  if (!hasActiveFilters()) return null

  return (
    <button className="clear-all-btn" onClick={clearAll}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      Clear all filters
      <style>{`
        .clear-all-btn {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--color-danger);
          background: var(--color-danger-light);
          border: 1px solid rgba(239, 68, 68, 0.2);
          transition: all var(--transition-fast);
        }
        .clear-all-btn:hover {
          background: var(--color-danger);
          color: white;
        }
      `}</style>
    </button>
  )
}
