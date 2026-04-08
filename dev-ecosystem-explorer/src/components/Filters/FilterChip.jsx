import { useFilterStore } from '../../store/filterStore'

export default function FilterChip({ field, value, label }) {
  const { activeFilters, toggleFilter } = useFilterStore()

  const isActive = field === 'https' || field === 'auth' || field === 'official'
    ? activeFilters[field] === value
    : (activeFilters[field] ?? []).includes(value)

  return (
    <button
      className={`filter-chip ${isActive ? 'active' : ''}`}
      onClick={() => toggleFilter(field, value)}
    >
      {label ?? value}
      <style>{`
        .filter-chip {
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 500;
          border: 1px solid var(--border-primary);
          color: var(--text-secondary);
          background: transparent;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }
        .filter-chip:hover {
          border-color: var(--color-primary-border);
          color: var(--color-primary);
        }
        .filter-chip.active {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }
      `}</style>
    </button>
  )
}
