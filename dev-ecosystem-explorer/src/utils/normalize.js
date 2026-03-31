// ===== Normalize API Responses =====
// Each API returns different shapes. This normalizes them into a unified format.

import { SOURCES } from './constants';

/**
 * Normalize a GitHub repository result.
 */
export function normalizeGitHub(repo) {
  return {
    id: `github-${repo.id}`,
    source: SOURCES.GITHUB,
    title: repo.full_name,
    name: repo.name,
    description: repo.description || 'No description provided.',
    url: repo.html_url,
    stars: repo.stargazers_count ?? 0,
    language: repo.language || null,
    topics: repo.topics || [],
    owner: {
      name: repo.owner?.login || '',
      avatar: repo.owner?.avatar_url || '',
    },
    updatedAt: repo.updated_at,
    license: repo.license?.spdx_id || null,
    forks: repo.forks_count ?? 0,
    openIssues: repo.open_issues_count ?? 0,
  };
}

/**
 * Normalize an npm package result.
 */
export function normalizeNpm(pkg) {
  const p = pkg.package || pkg;
  return {
    id: `npm-${p.name}`,
    source: SOURCES.NPM,
    title: p.name,
    name: p.name,
    description: p.description || 'No description provided.',
    url: p.links?.npm || `https://www.npmjs.com/package/${p.name}`,
    stars: Math.round((pkg.score?.final ?? 0) * 100),
    language: null,
    topics: p.keywords || [],
    owner: {
      name: p.publisher?.username || p.author?.name || '',
      avatar: '',
    },
    updatedAt: p.date || null,
    license: null,
    version: p.version || '',
  };
}

/**
 * Normalize a Public APIs entry.
 */
export function normalizePublicApi(entry) {
  return {
    id: `publicapi-${entry.API?.replace(/\s+/g, '-').toLowerCase()}`,
    source: SOURCES.PUBLIC_APIS,
    title: entry.API,
    name: entry.API,
    description: entry.Description || 'No description provided.',
    url: entry.Link,
    stars: 0,
    language: null,
    topics: [entry.Category].filter(Boolean),
    owner: { name: '', avatar: '' },
    updatedAt: null,
    auth: entry.Auth || 'None',
    https: entry.HTTPS,
    cors: entry.Cors,
    category: entry.Category,
  };
}
