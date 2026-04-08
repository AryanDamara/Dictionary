import ResultCard from './ResultCard'

export default function ResultGrid({ results }) {
  return (
    <div className="result-grid">
      {results.map((r) => (
        <ResultCard key={r.id} result={r} />
      ))}
      <style>{`
        .result-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-lg);
          animation: fadeIn 0.3s ease;
        }
        @media (max-width: 640px) {
          .result-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
