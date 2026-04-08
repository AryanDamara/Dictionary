import { useCompareStore } from '../../store/compareStore'

export default function CompareButton({ result }) {
  const { isComparing, toggleItem, items } = useCompareStore()
  const comparing = isComparing(result.id)
  const canAdd = items.length < 3

  if (!comparing && !canAdd) return null

  return (
    <button
      className={`compare-btn-card ${comparing ? 'active' : ''}`}
      onClick={() => toggleItem(result)}
    >
      {comparing ? 'Remove' : 'Compare'}
      <style>{`
        .compare-btn-card {
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 500;
          border: 1px solid var(--border-primary);
          color: var(--text-secondary);
          background: transparent;
          transition: all var(--transition-fast);
        }
        .compare-btn-card:hover {
          border-color: var(--color-primary-border);
          color: var(--color-primary);
        }
        .compare-btn-card.active {
          background: var(--color-primary-light);
          color: var(--color-primary);
          border-color: var(--color-primary-border);
        }
      `}</style>
    </button>
  )
}
