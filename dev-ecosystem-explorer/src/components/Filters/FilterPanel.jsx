// ===== FilterPanel Component =====
import React from 'react';
import FilterChip from './FilterChip';
import SortControls from './SortControls';

const css = {
  panel: {
    padding: 'var(--space-4)',
    background: 'var(--gradient-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  },
  title: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
  },
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
  activeFilters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-1)',
  },
  clearBtn: {
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#fca5a5',
    fontSize: 'var(--font-size-xs)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    width: '100%',
    textAlign: 'center',
  },
};

const LANGUAGES = [
  '', 'JavaScript', 'TypeScript', 'Python', 'Go', 'Rust',
  'Java', 'C++', 'Ruby', 'PHP', 'Swift', 'Kotlin',
];

export default function FilterPanel({ filters, onFilter }) {
  const { language, sortBy, hasActiveFilters } = filters;

  return (
    <div style={css.panel}>
      <div style={css.title}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filters
      </div>

      <SortControls sortBy={sortBy} onChange={(v) => onFilter('sortBy', v)} />

      <div style={css.group}>
        <div style={css.label}>Language</div>
        <select
          style={css.select}
          value={language}
          onChange={(e) => onFilter('language', e.target.value)}
        >
          <option value="">All Languages</option>
          {LANGUAGES.filter(Boolean).map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <>
          <div style={css.group}>
            <div style={css.label}>Active Filters</div>
            <div style={css.activeFilters}>
              {language && (
                <FilterChip label={`Language: ${language}`} onRemove={() => onFilter('language', '')} />
              )}
            </div>
          </div>
          <button
            style={css.clearBtn}
            onClick={() => onFilter('reset')}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
          >
            Clear All Filters
          </button>
        </>
      )}
    </div>
  );
}
