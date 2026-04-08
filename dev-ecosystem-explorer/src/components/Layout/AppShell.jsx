import Header from './Header'

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        {children}
      </main>
      <style>{`
        .app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .app-main {
          flex: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-xl);
        }
        @media (max-width: 640px) {
          .app-main { padding: var(--space-lg); }
        }
      `}</style>
    </div>
  )
}
