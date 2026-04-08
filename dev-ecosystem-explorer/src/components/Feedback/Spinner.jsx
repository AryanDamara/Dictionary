export default function Spinner({ label = 'Searching…' }) {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <span className="spinner-label">{label}</span>
      <style>{`
        .spinner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-3xl);
          gap: var(--space-lg);
          animation: fadeIn 0.3s ease;
        }
        .spinner {
          width: 36px;
          height: 36px;
          border: 3px solid var(--border-primary);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .spinner-label {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}
