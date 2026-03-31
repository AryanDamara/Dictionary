// ===== TrendingQueries Component =====
import React from 'react';

const TRENDING = [
  'react', 'next.js', 'tailwindcss', 'typescript',
  'openai', 'langchain', 'supabase', 'bun',
];

const css = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-2)',
    marginTop: 'var(--space-3)',
    justifyContent: 'center',
  },
  chip: {
    padding: '6px 14px',
    borderRadius: 'var(--radius-full)',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    color: 'var(--color-accent-light)',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-medium)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap',
  },
  label: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 'var(--font-weight-semibold)',
    marginBottom: 'var(--space-2)',
    textAlign: 'center',
  },
};

export default function TrendingQueries({ onSelect }) {
  return (
    <div>
      <div style={css.label}>🔥 Trending</div>
      <div style={css.container}>
        {TRENDING.map((q) => (
          <button
            key={q}
            style={css.chip}
            onClick={() => onSelect(q)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
