import { useCompareStore } from '../../store/compareStore'
import CompareTable from './CompareTable'

export default function CompareDrawer() {
  const { items, isOpen, closeDrawer, clearAll } = useCompareStore()

  return (
    <>
      {/* Floating compare bar (sticky bottom) */}
      {items.length > 0 && !isOpen && (
        <div className="compare-bar">
          <div className="compare-bar-content">
            <span className="compare-count">
              {items.length}/3 selected for comparison
            </span>
            <div className="compare-bar-actions">
              <button className="compare-open-btn" onClick={() => useCompareStore.getState().openDrawer()}>
                Open Compare
              </button>
              <button className="compare-clear-btn" onClick={clearAll}>Clear</button>
            </div>
          </div>
        </div>
      )}

      {/* Full compare drawer */}
      {isOpen && (
        <>
          <div className="compare-overlay" onClick={closeDrawer} />
          <div className="compare-drawer">
            <div className="compare-drawer-header">
              <h2>Compare Tools</h2>
              <div className="compare-drawer-actions">
                <button className="compare-clear-mini" onClick={clearAll}>Clear all</button>
                <button className="compare-close-btn" onClick={closeDrawer} aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="compare-drawer-body">
              {items.length >= 2 ? (
                <CompareTable items={items} />
              ) : (
                <p className="compare-hint">Select at least 2 items to compare</p>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        .compare-bar {
          position: sticky;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-primary);
          padding: var(--space-md) var(--space-xl);
          z-index: 90;
          animation: slideUp 0.3s ease;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
        }
        .compare-bar-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .compare-count {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-primary);
        }
        .compare-bar-actions {
          display: flex;
          gap: var(--space-sm);
        }
        .compare-open-btn {
          padding: var(--space-sm) var(--space-lg);
          background: var(--color-primary);
          color: white;
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          font-weight: 500;
          transition: background var(--transition-fast);
        }
        .compare-open-btn:hover { background: var(--color-primary-hover); }
        .compare-clear-btn {
          padding: var(--space-sm) var(--space-lg);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .compare-clear-btn:hover { border-color: var(--color-danger); color: var(--color-danger); }

        .compare-overlay {
          position: fixed;
          inset: 0;
          background: var(--bg-overlay);
          z-index: 200;
        }
        .compare-drawer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-height: 70vh;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-primary);
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          z-index: 201;
          display: flex;
          flex-direction: column;
          animation: slideInUp 0.3s ease;
          box-shadow: var(--shadow-xl);
        }
        .compare-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-xl);
          border-bottom: 1px solid var(--border-primary);
        }
        .compare-drawer-header h2 {
          font-size: var(--text-lg);
          font-weight: 600;
        }
        .compare-drawer-actions {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }
        .compare-clear-mini {
          font-size: var(--text-sm);
          color: var(--color-danger);
          transition: opacity var(--transition-fast);
        }
        .compare-clear-mini:hover { opacity: 0.7; }
        .compare-close-btn {
          color: var(--text-secondary);
          padding: var(--space-xs);
        }
        .compare-drawer-body {
          padding: var(--space-xl);
          overflow-y: auto;
          flex: 1;
        }
        .compare-hint {
          text-align: center;
          color: var(--text-tertiary);
          padding: var(--space-2xl);
        }
      `}</style>
    </>
  )
}
