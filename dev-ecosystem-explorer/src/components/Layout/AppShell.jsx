// ===== AppShell Component =====
import React from 'react';

const css = {
  shell: {
    display: 'flex',
    minHeight: 'calc(100vh - var(--header-height))',
    maxWidth: 'var(--max-content-width)',
    margin: '0 auto',
    width: '100%',
  },
  sidebar: {
    width: 'var(--sidebar-width)',
    flexShrink: 0,
    padding: 'var(--space-4)',
    borderRight: '1px solid var(--color-border)',
    overflowY: 'auto',
    position: 'sticky',
    top: 'var(--header-height)',
    height: 'calc(100vh - var(--header-height))',
  },
  main: {
    flex: 1,
    padding: 'var(--space-6)',
    overflowY: 'auto',
    minWidth: 0,
  },
};

export default function AppShell({ sidebar, children }) {
  return (
    <div style={css.shell}>
      {sidebar && (
        <aside style={css.sidebar}>
          {sidebar}
        </aside>
      )}
      <main style={css.main}>
        {children}
      </main>
    </div>
  );
}
