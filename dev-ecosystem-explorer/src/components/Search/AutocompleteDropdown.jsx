import { useMemo } from 'react'
import { getRecentSearches } from '../../cache/storageCache'
import { allKeys } from '../../cache'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'

export default function AutocompleteDropdown({ isOpen, query, onSelect, inputRef }) {
  const recents = useMemo(() => getRecentSearches(), [isOpen])

  const suggestions = useMemo(() => {
    if (!query || query.length < 1) return []
    const q = query.toLowerCase()
    return allKeys()
      .filter((k) => k.toLowerCase().includes(q) && k.toLowerCase() !== q)
      .slice(0, 8)
  }, [query, isOpen])

  const allItems = useMemo(() => {
    const items = []
    recents.forEach((r) => items.push({ type: 'recent', value: r }))
    suggestions.forEach((s) => items.push({ type: 'suggestion', value: s }))
    return items
  }, [recents, suggestions])

  const { activeIndex, handleKeyDown, resetIndex } = useKeyboardNav({
    itemCount: allItems.length,
    onSelect: (index) => {
      if (allItems[index]) onSelect(allItems[index].value)
      resetIndex()
    },
    onClose: () => {
      inputRef?.current?.focus()
    },
  })

  const shouldShow = isOpen && (allItems.length > 0)

  if (!shouldShow) return null

  return (
    <div
      className="autocomplete-dropdown"
      role="listbox"
      onKeyDown={handleKeyDown}
    >
      {recents.length > 0 && (
        <div className="dropdown-section">
          <div className="dropdown-section-title">Recent</div>
          {recents.map((r, i) => (
            <button
              key={`recent-${r}`}
              className={`dropdown-item ${activeIndex === i ? 'active' : ''}`}
              role="option"
              aria-selected={activeIndex === i}
              onMouseDown={(e) => { e.preventDefault(); onSelect(r) }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
              <span>{r}</span>
            </button>
          ))}
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="dropdown-section">
          <div className="dropdown-section-title">Suggestions</div>
          {suggestions.map((s, i) => {
            const idx = recents.length + i
            return (
              <button
                key={`sug-${s}`}
                className={`dropdown-item ${activeIndex === idx ? 'active' : ''}`}
                role="option"
                aria-selected={activeIndex === idx}
                onMouseDown={(e) => { e.preventDefault(); onSelect(s) }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <span>{s}</span>
              </button>
            )
          })}
        </div>
      )}
      <style>{`
        .autocomplete-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: var(--bg-elevated);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          z-index: 50;
          max-height: 320px;
          overflow-y: auto;
          animation: fadeIn 0.15s ease;
        }
        .dropdown-section {
          padding: var(--space-xs) 0;
        }
        .dropdown-section:not(:last-child) {
          border-bottom: 1px solid var(--border-secondary);
        }
        .dropdown-section-title {
          padding: var(--space-sm) var(--space-lg);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          width: 100%;
          padding: var(--space-sm) var(--space-lg);
          text-align: left;
          color: var(--text-secondary);
          font-size: var(--text-sm);
          transition: all var(--transition-fast);
        }
        .dropdown-item:hover,
        .dropdown-item.active {
          background: var(--color-primary-light);
          color: var(--text-primary);
        }
        .dropdown-item svg {
          flex-shrink: 0;
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}
