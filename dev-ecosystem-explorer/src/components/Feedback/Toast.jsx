// ===== Toast Component =====
import React, { useEffect, useState, useCallback } from 'react';

const css = {
  container: {
    position: 'fixed',
    bottom: 'var(--space-6)',
    right: 'var(--space-6)',
    zIndex: 'var(--z-toast)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
  },
  toast: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: 'var(--space-3) var(--space-5)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    boxShadow: 'var(--shadow-lg)',
    animation: 'slideUp var(--transition-base) ease-out',
    backdropFilter: 'blur(12px)',
    minWidth: 240,
    maxWidth: 380,
  },
  success: {
    background: 'rgba(16, 185, 129, 0.15)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    color: '#6ee7b7',
  },
  error: {
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#fca5a5',
  },
  info: {
    background: 'rgba(99, 102, 241, 0.15)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: '#a5b4fc',
  },
};

// Global toast state
let _toastCallback = null;

export function showToast(message, type = 'info', duration = 3000) {
  _toastCallback?.({ message, type, duration, id: Date.now() });
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, toast.duration);
  }, []);

  useEffect(() => {
    _toastCallback = addToast;
    return () => { _toastCallback = null; };
  }, [addToast]);

  return (
    <div style={css.container}>
      {toasts.map((toast) => (
        <div key={toast.id} style={{ ...css.toast, ...css[toast.type] }}>
          {toast.type === 'success' && '✓'}
          {toast.type === 'error' && '✕'}
          {toast.type === 'info' && 'ℹ'}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
