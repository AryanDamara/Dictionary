// ===== FilterChip Component =====
import React from 'react';

const css = {
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    padding: '4px 10px',
    borderRadius: 'var(--radius-full)',
    background: 'rgba(99, 102, 241, 0.15)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: 'var(--color-accent-light)',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-medium)',
    transition: 'all var(--transition-fast)',
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    color: 'var(--color-accent-light)',
    cursor: 'pointer',
    fontSize: '10px',
    lineHeight: 1,
    padding: 0,
    transition: 'background var(--transition-fast)',
  },
};

export default function FilterChip({ label, onRemove }) {
  return (
    <span style={css.chip}>
      {label}
      <button
        style={css.closeBtn}
        onClick={onRemove}
        aria-label={`Remove filter: ${label}`}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
      >
        ✕
      </button>
    </span>
  );
}
