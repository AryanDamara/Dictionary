// ===== PageControls Component =====
import React from 'react';

const css = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-3)',
    padding: 'var(--space-4) 0',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    padding: '8px 18px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    background: 'var(--color-bg-card)',
    color: 'var(--color-text-secondary)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
  btnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
  },
};

export default function PageControls({ page, hasMore, onPrev, onNext, isLoading }) {
  return (
    <div style={css.container}>
      <button
        style={{ ...css.btn, ...(page <= 1 ? css.btnDisabled : {}) }}
        onClick={onPrev}
        disabled={page <= 1 || isLoading}
        onMouseEnter={(e) => {
          if (page > 1) e.currentTarget.style.borderColor = 'var(--color-accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }}
      >
        ← Prev
      </button>
      <span style={css.pageInfo}>Page {page}</span>
      <button
        style={{ ...css.btn, ...(!hasMore ? css.btnDisabled : {}) }}
        onClick={onNext}
        disabled={!hasMore || isLoading}
        onMouseEnter={(e) => {
          if (hasMore) e.currentTarget.style.borderColor = 'var(--color-accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }}
      >
        Next →
      </button>
    </div>
  );
}
