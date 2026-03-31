// ===== ResultGrid Component =====
import React from 'react';
import ResultCard from './ResultCard';

const css = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: 'var(--space-4)',
  },
};

export default function ResultGrid({ items, isFavorite, onToggleFavorite }) {
  return (
    <div style={css.grid}>
      {items.map((item, i) => (
        <ResultCard
          key={item.id}
          item={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={onToggleFavorite}
          style={{ animationDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
  );
}
