// ===== ResultCard Component =====
import React from 'react';
import { SOURCES, SOURCE_COLORS } from '../../utils/constants';

const css = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
    padding: 'var(--space-5)',
    background: 'var(--gradient-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    transition: 'all var(--transition-base)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeIn var(--transition-base) ease-out both',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 'var(--space-3)',
  },
  titleRow: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-text-primary)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    textDecoration: 'none',
    transition: 'color var(--transition-fast)',
  },
  description: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-relaxed)',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 'var(--space-3)',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-muted)',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: 'var(--radius-full)',
    fontSize: '11px',
    fontWeight: 'var(--font-weight-semibold)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  },
  tag: {
    padding: '2px 8px',
    borderRadius: 'var(--radius-full)',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--color-border)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
  },
  favBtn: {
    flexShrink: 0,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: '1px solid var(--color-border)',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all var(--transition-fast)',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'var(--gradient-shimmer)',
    transition: 'left 0.5s ease',
    pointerEvents: 'none',
  },
};

function getBadgeStyle(source) {
  const color = SOURCE_COLORS[source] || 'var(--color-accent)';
  return {
    ...css.badge,
    background: `${color}18`,
    color: color,
    border: `1px solid ${color}30`,
  };
}

const SOURCE_LABELS_SHORT = {
  [SOURCES.GITHUB]: 'GitHub',
  [SOURCES.NPM]: 'npm',
  [SOURCES.PUBLIC_APIS]: 'API',
};

export default function ResultCard({ item, isFavorite, onToggleFavorite, style = {} }) {
  return (
    <div
      style={{ ...css.card, ...style }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)';
        e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={css.header}>
        <div style={css.titleRow}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={css.title}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-light)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
          >
            {item.title}
          </a>
          <span style={getBadgeStyle(item.source)}>
            {SOURCE_LABELS_SHORT[item.source]}
          </span>
        </div>
        <button
          style={{
            ...css.favBtn,
            background: isFavorite ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            borderColor: isFavorite ? 'rgba(245, 158, 11, 0.3)' : 'var(--color-border)',
          }}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(item); }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isFavorite ? 'rgba(245, 158, 11, 0.15)' : 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <p style={css.description}>{item.description}</p>

      <div style={css.meta}>
        {item.stars > 0 && (
          <span style={css.metaItem}>
            ⭐ {item.stars.toLocaleString()}
          </span>
        )}
        {item.language && (
          <span style={css.metaItem}>
            <span style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--color-accent)',
              display: 'inline-block',
            }} />
            {item.language}
          </span>
        )}
        {item.owner?.name && (
          <span style={css.metaItem}>👤 {item.owner.name}</span>
        )}
        {item.forks > 0 && (
          <span style={css.metaItem}>🔀 {item.forks.toLocaleString()}</span>
        )}
        {item.version && (
          <span style={css.metaItem}>v{item.version}</span>
        )}
        {item.auth && item.source === SOURCES.PUBLIC_APIS && (
          <span style={css.metaItem}>🔑 {item.auth}</span>
        )}
      </div>

      {item.topics && item.topics.length > 0 && (
        <div style={css.tags}>
          {item.topics.slice(0, 5).map((tag) => (
            <span key={tag} style={css.tag}>{tag}</span>
          ))}
          {item.topics.length > 5 && (
            <span style={css.tag}>+{item.topics.length - 5}</span>
          )}
        </div>
      )}
    </div>
  );
}
