// ===== SearchBar Component =====
import React, { useRef, useEffect } from 'react';

const css = {
  wrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: 600,
  },
  input: {
    width: '100%',
    padding: '12px 48px 12px 44px',
    background: 'var(--color-bg-input)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-full)',
    color: 'var(--color-text-primary)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-medium)',
    outline: 'none',
    transition: 'all var(--transition-base)',
  },
  inputFocused: {
    borderColor: 'var(--color-accent)',
    boxShadow: 'var(--shadow-glow)',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-text-muted)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  clearBtn: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    color: 'var(--color-text-secondary)',
    width: 24,
    height: 24,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all var(--transition-fast)',
  },
  kbd: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '2px 8px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-muted)',
    fontSize: '11px',
    fontFamily: 'var(--font-family)',
    pointerEvents: 'none',
  },
};

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search packages, repos, APIs...' }) {
  const inputRef = useRef(null);
  const [focused, setFocused] = React.useState(false);

  // Cmd+K / Ctrl+K to focus
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div style={css.wrapper}>
      <span style={css.searchIcon}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        ref={inputRef}
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          ...css.input,
          ...(focused ? css.inputFocused : {}),
        }}
        aria-label="Search"
        autoComplete="off"
      />
      {value ? (
        <button style={css.clearBtn} onClick={onClear} aria-label="Clear search">
          ✕
        </button>
      ) : (
        <kbd style={css.kbd}>⌘K</kbd>
      )}
    </div>
  );
}
