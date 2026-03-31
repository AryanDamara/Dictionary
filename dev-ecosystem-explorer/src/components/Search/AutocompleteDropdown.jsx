// ===== AutocompleteDropdown Component =====
import React from 'react';

const css = {
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    left: 0,
    right: 0,
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 'var(--z-dropdown)',
    overflow: 'hidden',
    animation: 'fadeIn var(--transition-fast) ease-out',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-3) var(--space-4)',
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    transition: 'background var(--transition-fast)',
    borderBottom: '1px solid var(--color-border)',
  },
  itemHover: {
    background: 'rgba(99, 102, 241, 0.08)',
    color: 'var(--color-text-primary)',
  },
  icon: {
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    flexShrink: 0,
  },
  label: {
    paddingTop: 'var(--space-2)',
    paddingBottom: 'var(--space-1)',
    paddingLeft: 'var(--space-4)',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 'var(--font-weight-semibold)',
  },
};

export default function AutocompleteDropdown({ items = [], onSelect, visible = false }) {
  if (!visible || items.length === 0) return null;

  return (
    <div style={css.dropdown}>
      <div style={css.label}>Recent Searches</div>
      {items.slice(0, 8).map((item, i) => (
        <div
          key={i}
          style={css.item}
          onClick={() => onSelect(item)}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, css.itemHover)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--color-text-secondary)';
          }}
        >
          <span style={css.icon}>🕐</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
