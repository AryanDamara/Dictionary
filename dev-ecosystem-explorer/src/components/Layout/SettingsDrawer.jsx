import { useState, useEffect } from 'react'
import { GITHUB_TOKEN_KEY } from '../../utils/constants'

export default function SettingsDrawer({ isOpen, onClose }) {
  const [token, setToken] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(GITHUB_TOKEN_KEY)
      if (saved) setToken(saved)
    } catch {}
  }, [isOpen])

  function handleSave() {
    try {
      if (token.trim()) {
        localStorage.setItem(GITHUB_TOKEN_KEY, token.trim())
      } else {
        localStorage.removeItem(GITHUB_TOKEN_KEY)
      }
    } catch {}
    onClose()
  }

  const isAuthenticated = !!token.trim()

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}
      <aside className={`settings-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Settings</h2>
          <button className="drawer-close" onClick={onClose} aria-label="Close settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="drawer-content">
          <div className="settings-section">
            <label className="settings-label" htmlFor="github-token-input">
              GitHub Personal Access Token
            </label>
            <p className="settings-help">
              Add a token to increase your rate limit from 60 to 5,000 requests per hour.
            </p>
            <input
              id="github-token-input"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="settings-input"
            />
            <div className={`rate-limit-status ${isAuthenticated ? 'authenticated' : ''}`}>
              <div className="status-dot" />
              <span>
                {isAuthenticated
                  ? '5,000 req/hr (authenticated)'
                  : '60 req/hr (unauthenticated)'}
              </span>
            </div>
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Settings
          </button>
        </div>

        <style>{`
          .drawer-overlay {
            position: fixed;
            inset: 0;
            background: var(--bg-overlay);
            z-index: 200;
            animation: fadeIn 0.2s ease;
          }
          .settings-drawer {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 380px;
            max-width: 90vw;
            background: var(--bg-secondary);
            border-left: 1px solid var(--border-primary);
            z-index: 201;
            transform: translateX(100%);
            transition: transform var(--transition-slow);
            display: flex;
            flex-direction: column;
            box-shadow: var(--shadow-xl);
          }
          .settings-drawer.open {
            transform: translateX(0);
          }
          .drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--space-xl);
            border-bottom: 1px solid var(--border-primary);
          }
          .drawer-header h2 {
            font-size: var(--text-lg);
            font-weight: 600;
          }
          .drawer-close {
            color: var(--text-secondary);
            padding: var(--space-xs);
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast);
          }
          .drawer-close:hover { color: var(--text-primary); }
          .drawer-content {
            padding: var(--space-xl);
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: var(--space-xl);
          }
          .settings-section {
            display: flex;
            flex-direction: column;
            gap: var(--space-sm);
          }
          .settings-label {
            font-size: var(--text-sm);
            font-weight: 600;
            color: var(--text-primary);
          }
          .settings-help {
            font-size: var(--text-xs);
            color: var(--text-tertiary);
            line-height: 1.5;
          }
          .settings-input {
            padding: var(--space-md) var(--space-lg);
            border: 1px solid var(--input-border);
            border-radius: var(--radius-md);
            background: var(--input-bg);
            color: var(--text-primary);
            font-family: var(--font-mono);
            font-size: var(--text-sm);
            transition: border-color var(--transition-fast);
          }
          .settings-input:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px var(--color-primary-light);
          }
          .rate-limit-status {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            font-size: var(--text-xs);
            color: var(--color-warning);
            padding: var(--space-sm) var(--space-md);
            background: var(--color-warning-light);
            border-radius: var(--radius-sm);
          }
          .rate-limit-status.authenticated {
            color: var(--color-success);
            background: var(--color-success-light);
          }
          .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: currentColor;
            flex-shrink: 0;
          }
          .save-btn {
            padding: var(--space-md) var(--space-xl);
            background: var(--color-primary);
            color: white;
            border-radius: var(--radius-md);
            font-weight: 500;
            font-size: var(--text-sm);
            transition: background var(--transition-fast);
          }
          .save-btn:hover { background: var(--color-primary-hover); }
        `}</style>
      </aside>
    </>
  )
}
