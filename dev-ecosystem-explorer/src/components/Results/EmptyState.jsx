// ===== EmptyState Component =====
import React from 'react';

const css = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-16) var(--space-4)',
    textAlign: 'center',
    animation: 'fadeIn var(--transition-slow) ease-out',
  },
  icon: {
    fontSize: 64,
    marginBottom: 'var(--space-4)',
    opacity: 0.6,
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--space-2)',
  },
  message: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    maxWidth: 400,
    lineHeight: 'var(--line-height-relaxed)',
  },
};

export default function EmptyState({ type = 'no-results' }) {
  const states = {
    'no-results': {
      icon: '🔍',
      title: 'No results found',
      message: 'Try adjusting your search query or filters to find what you\'re looking for.',
    },
    'welcome': {
      icon: '🚀',
      title: 'Explore the Dev Ecosystem',
      message: 'Search across GitHub repositories, npm packages, and public APIs — all in one place.',
    },
    'error': {
      icon: '⚡',
      title: 'Something went wrong',
      message: 'We had trouble fetching results. Please try again in a moment.',
    },
  };

  const state = states[type] || states['no-results'];

  return (
    <div style={css.container}>
      <div style={css.icon}>{state.icon}</div>
      <h2 style={css.title}>{state.title}</h2>
      <p style={css.message}>{state.message}</p>
    </div>
  );
}
