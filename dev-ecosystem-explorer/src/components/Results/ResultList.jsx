// ===== ResultList Component =====
import React from 'react';
import ResultCard from './ResultCard';

const css = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  },
};

export default function ResultList({ items, isFavorite, onToggleFavorite }) {
  return (
    <div style={css.list}>
      {items.map((item, i) => (
        <ResultCard
          key={item.id}
          item={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={onToggleFavorite}
          style={{ animationDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}
