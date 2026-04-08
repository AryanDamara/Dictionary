import ThemeToggle from './ThemeToggle'
import { useState } from 'react'
import SettingsDrawer from './SettingsDrawer'

export default function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <div className="header-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            <h1 className="header-title">Dev Ecosystem Explorer</h1>
          </div>
        </div>
        <div className="header-actions">
          <ThemeToggle />
          <button
            id="settings-btn"
            className="settings-btn"
            onClick={() => setSettingsOpen(true)}
            aria-label="Open settings"
            title="Settings"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
        <style>{`
          .app-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--space-lg) var(--space-xl);
            border-bottom: 1px solid var(--border-primary);
            background: var(--bg-secondary);
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(12px);
          }
          .header-left {
            display: flex;
            align-items: center;
            gap: var(--space-md);
          }
          .header-logo {
            display: flex;
            align-items: center;
            gap: var(--space-md);
          }
          .header-title {
            font-size: var(--text-lg);
            font-weight: 600;
            color: var(--text-primary);
            letter-spacing: -0.02em;
          }
          .header-actions {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
          }
          .settings-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: var(--radius-md);
            color: var(--text-secondary);
            transition: all var(--transition-fast);
            background: var(--bg-tertiary);
          }
          .settings-btn:hover {
            color: var(--text-primary);
            background: var(--border-primary);
          }
          @media (max-width: 640px) {
            .header-title { font-size: var(--text-base); }
            .app-header { padding: var(--space-md) var(--space-lg); }
          }
        `}</style>
      </header>
      <SettingsDrawer isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  )
}
