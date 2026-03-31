// ===== SortControls Component =====
import React from 'react';
import { SORT_OPTIONS } from '../../utils/constants';

const css = {
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
  },
  label: {
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    background: 'var(--color-bg-input)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontSize: 'var(--font-size-sm)',
    outline: 'none',
    cursor: 'pointer',
  },
};

export default function SortControls({ sortBy, onChange }) {
  return (
    <div style={css.group}>
      <div style={css.label}>Sort By</div>
      <select style={css.select} value={sortBy} onChange={(e) => onChange(e.target.value)}>
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
