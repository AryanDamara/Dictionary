// ===== Error Banner Component =====
import React, { useState } from 'react';

const css = {
  banner: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: 'var(--space-3) var(--space-4)',
    background: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: 'var(--radius-md)',
    color: '#fca5a5',
    fontSize: 'var(--font-size-sm)',
    animation: 'fadeIn var(--transition-base) ease-out',
  },
  icon: {
    flexShrink: 0,
    fontSize: '18px',
  },
  message: {
    flex: 1,
  },
  close: {
    padding: 'var(--space-1)',
    color: '#fca5a5',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    lineHeight: 1,
    opacity: 0.7,
    transition: 'opacity var(--transition-fast)',
  },
};

export default function ErrorBanner({ message, onDismiss }) {
  const [visible, setVisible] = useState(true);

  if (!visible || !message) return null;

  const handleClose = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div style={css.banner} role="alert">
      <span style={css.icon}>⚠️</span>
      <span style={css.message}>{message}</span>
      <button style={css.close} onClick={handleClose} aria-label="Dismiss error">
        ✕
      </button>
    </div>
  );
}
