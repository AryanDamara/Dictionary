// ===== Header Component =====
import React, { useState } from 'react';
import SearchBar from '../Search/SearchBar';
import AutocompleteDropdown from '../Search/AutocompleteDropdown';

const css = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 'var(--z-sticky)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    padding: 'var(--space-3) var(--space-6)',
    background: 'rgba(15, 15, 35, 0.8)',
    backdropFilter: 'blur(16px) saturate(1.2)',
    borderBottom: '1px solid var(--color-border)',
    height: 'var(--header-height)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 'var(--radius-sm)',
    background: 'var(--gradient-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },
  logoText: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-bold)',
    background: 'var(--gradient-accent)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    whiteSpace: 'nowrap',
  },
  searchWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    flexShrink: 0,
  },
  themeBtn: {
    width: 36,
    height: 36,
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all var(--transition-fast)',
    color: 'var(--color-text-secondary)',
  },
  favCount: {
    padding: '2px 8px',
    borderRadius: 'var(--radius-full)',
    background: 'rgba(245, 158, 11, 0.15)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    color: 'var(--color-amber)',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-semibold)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
};

export default function Header({ query, onQueryChange, onClear, searchHistory, favoritesCount, onThemeToggle, darkMode }) {
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  return (
    <header style={css.header}>
      <div style={css.logo}>
        <div style={css.logoIcon}>⚡</div>
        <span style={css.logoText}>DevExplorer</span>
      </div>

      <div style={css.searchWrapper}>
        <SearchBar
          value={query}
          onChange={(val) => {
            onQueryChange(val);
            setShowAutocomplete(val.length === 0 && searchHistory.length > 0);
          }}
          onClear={() => { onClear(); setShowAutocomplete(false); }}
        />
        <AutocompleteDropdown
          items={searchHistory}
          visible={showAutocomplete}
          onSelect={(val) => {
            onQueryChange(val);
            setShowAutocomplete(false);
          }}
        />
      </div>

      <div style={css.actions}>
        {favoritesCount > 0 && (
          <span style={css.favCount}>★ {favoritesCount}</span>
        )}
        <button
          style={css.themeBtn}
          onClick={onThemeToggle}
          aria-label="Toggle theme"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
