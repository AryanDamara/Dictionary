// ===== Spinner Component =====
import React from 'react';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-8)',
  },
  spinner: {
    width: 40,
    height: 40,
    border: '3px solid var(--color-border)',
    borderTopColor: 'var(--color-accent)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  text: {
    marginLeft: 'var(--space-3)',
    color: 'var(--color-text-secondary)',
    fontSize: 'var(--font-size-sm)',
  },
};

export default function Spinner({ size = 40, text = '' }) {
  return (
    <div style={styles.container} role="status" aria-label="Loading">
      <div
        style={{
          ...styles.spinner,
          width: size,
          height: size,
        }}
      />
      {text && <span style={styles.text}>{text}</span>}
    </div>
  );
}
