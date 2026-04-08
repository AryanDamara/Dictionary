import ResultCard from './ResultCard'

export default function ResultList({ results }) {
  return (
    <div className="result-list">
      {results.map((r) => (
        <ResultCard key={r.id} result={r} />
      ))}
      <style>{`
        .result-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </div>
  )
}
