import { useState, useRef } from 'react'
import { useSearchStore } from '../../store/searchStore'
import AutocompleteDropdown from './AutocompleteDropdown'

export default function SearchBar() {
  const { query, setQuery } = useSearchStore()
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)

  function handleChange(e) {
    setQuery(e.target.value)
    setIsOpen(true)
  }

  function handleFocus() {
    setIsOpen(true)
  }

  function handleBlur() {
    // Timeout allows dropdown click events to fire before blur closes it
    setTimeout(() => setIsOpen(false), 180)
  }

  function handleSelect(value) {
    setQuery(value)
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className="search-bar-wrapper">
      <div className="search-input-container">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          id="search-input"
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search APIs, packages, repositories, crates, gems..."
          className="search-input"
          autoComplete="off"
          spellCheck="false"
        />
        {query && (
          <button
            className="search-clear"
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      <AutocompleteDropdown
        isOpen={isOpen}
        query={query}
        onSelect={handleSelect}
        inputRef={inputRef}
      />

      <style>{`
        .search-bar-wrapper {
          position: relative;
          width: 100%;
          margin-bottom: var(--space-xl);
        }
        .search-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: var(--space-lg);
          color: var(--text-tertiary);
          pointer-events: none;
          flex-shrink: 0;
        }
        .search-input {
          width: 100%;
          padding: var(--space-lg) var(--space-lg) var(--space-lg) 48px;
          border: 1.5px solid var(--input-border);
          border-radius: var(--radius-lg);
          background: var(--input-bg);
          color: var(--text-primary);
          font-size: var(--text-base);
          transition: all var(--transition-fast);
          outline: none;
        }
        .search-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px var(--color-primary-light);
        }
        .search-input::placeholder {
          color: var(--text-tertiary);
        }
        .search-clear {
          position: absolute;
          right: var(--space-md);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          color: var(--text-tertiary);
          transition: all var(--transition-fast);
        }
        .search-clear:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
      `}</style>
    </div>
  )
}
