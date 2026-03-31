// ===== SourceTabs Component =====
import React from 'react';
import { SOURCES, SOURCE_LABELS } from '../../utils/constants';

const css = {
  container: {
    display: 'flex',
    gap: 'var(--space-1)',
    padding: 'var(--space-1)',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    overflowX: 'auto',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: '8px 16px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap',
    color: 'var(--color-text-secondary)',
    background: 'transparent',
  },
  tabActive: {
    background: 'var(--gradient-accent)',
    color: '#ffffff',
    boxShadow: 'var(--shadow-md)',
  },
  count: {
    padding: '1px 7px',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-semibold)',
  },
  countActive: {
    background: 'rgba(255,255,255,0.2)',
    color: '#ffffff',
  },
  countInactive: {
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--color-text-muted)',
  },
};

const SOURCE_ICONS = {
  [SOURCES.ALL]: '🌐',
  [SOURCES.GITHUB]: '🐙',
  [SOURCES.NPM]: '📦',
  [SOURCES.PUBLIC_APIS]: '🔗',
};

const TAB_ORDER = [SOURCES.ALL, SOURCES.GITHUB, SOURCES.NPM, SOURCES.PUBLIC_APIS];

export default function SourceTabs({ activeSource, onSelect, counts = {} }) {
  return (
    <div style={css.container} role="tablist">
      {TAB_ORDER.map((source) => {
        const isActive = source === activeSource;
        const count = counts[source] ?? 0;
        return (
          <button
            key={source}
            role="tab"
            aria-selected={isActive}
            style={{
              ...css.tab,
              ...(isActive ? css.tabActive : {}),
            }}
            onClick={() => onSelect(source)}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = 'transparent';
            }}
          >
            <span>{SOURCE_ICONS[source]}</span>
            <span>{SOURCE_LABELS[source]}</span>
            {count > 0 && (
              <span style={{ ...css.count, ...(isActive ? css.countActive : css.countInactive) }}>
                {count > 999 ? `${(count / 1000).toFixed(1)}k` : count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
