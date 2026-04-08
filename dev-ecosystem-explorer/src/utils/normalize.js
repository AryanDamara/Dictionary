/**
 * Normalizers — convert every API's raw response into the shared Result shape.
 *
 * Rule: null for fields that don't apply, NEVER undefined.
 */

// ─── GitHub ─────────────────────────────────────────────────────────
export function normalizeGitHub(repo) {
  return {
    id:          String(repo.id),
    name:        repo.full_name,
    description: repo.description  ?? 'No description provided',
    url:         repo.html_url,
    source:      'github',
    stars:       repo.stargazers_count ?? 0,
    downloads:   null,
    https:       null,
    auth:        null,
    language:    repo.language     ?? null,
    license:     repo.license?.spdx_id ?? null,
    category:    null,
    updatedAt:   repo.updated_at   ?? null,
    version:     null,
  }
}

// ─── NPM ────────────────────────────────────────────────────────────
export function normalizeNpm(pkg) {
  const p = pkg.package
  return {
    id:          p.name,
    name:        p.name,
    description: p.description    ?? 'No description provided',
    url:         p.links?.npm      ?? `https://www.npmjs.com/package/${p.name}`,
    source:      'npm',
    stars:       null,
    downloads:   null,
    https:       null,
    auth:        null,
    language:    'JavaScript',
    license:     p.license        ?? null,
    category:    null,
    updatedAt:   p.date           ?? null,
    version:     p.version        ?? null,
  }
}

// ─── Public APIs ────────────────────────────────────────────────────
export function normalizePublicApi(api) {
  return {
    id:          api.API,
    name:        api.API,
    description: api.Description  ?? 'No description provided',
    url:         api.Link,
    source:      'publicapi',
    stars:       null,
    downloads:   null,
    https:       api.HTTPS ?? null,
    auth:        api.Auth         || null,
    language:    null,
    license:     null,
    category:    api.Category     ?? null,
    updatedAt:   null,
    version:     null,
  }
}

// ─── PyPI ───────────────────────────────────────────────────────────
export function normalizePyPI(pkg) {
  const info = pkg.info ?? pkg
  return {
    id:          `pypi-${info.name}`,
    name:        info.name ?? 'Unknown',
    description: info.summary ?? info.description ?? 'No description provided',
    url:         info.project_url ?? info.package_url ?? `https://pypi.org/project/${info.name}`,
    source:      'pypi',
    stars:       null,
    downloads:   null,
    https:       null,
    auth:        null,
    language:    'Python',
    license:     info.license ?? null,
    category:    null,
    updatedAt:   null,
    version:     info.version ?? null,
  }
}

// ─── Docker Hub ─────────────────────────────────────────────────────
export function normalizeDocker(image) {
  return {
    id:          `docker-${image.repo_name ?? image.name}`,
    name:        image.repo_name ?? image.name,
    description: image.short_description ?? image.description ?? 'No description provided',
    url:         `https://hub.docker.com/r/${image.repo_name ?? image.name}`,
    source:      'docker',
    stars:       image.star_count ?? null,
    downloads:   image.pull_count ?? null,
    https:       null,
    auth:        null,
    language:    null,
    license:     null,
    category:    null,
    updatedAt:   null,
    version:     null,
    isOfficial:  image.is_official ?? false,
  }
}

// ─── Hacker News ────────────────────────────────────────────────────
export function normalizeHN(story) {
  return {
    id:          `hn-${story.id}`,
    name:        story.title ?? 'Untitled',
    description: `${story.score ?? 0} points · ${story.descendants ?? 0} comments`,
    url:         story.url ?? `https://news.ycombinator.com/item?id=${story.id}`,
    source:      'hackernews',
    stars:       null,
    downloads:   null,
    https:       null,
    auth:        null,
    language:    null,
    license:     null,
    category:    null,
    updatedAt:   story.time ? new Date(story.time * 1000).toISOString() : null,
    version:     null,
    hnScore:     story.score ?? 0,
  }
}

// ─── Crates.io ──────────────────────────────────────────────────────
export function normalizeCrate(crate) {
  return {
    id:          `crate-${crate.id ?? crate.name}`,
    name:        crate.name,
    description: crate.description ?? 'No description provided',
    url:         crate.homepage ?? `https://crates.io/crates/${crate.name}`,
    source:      'crates',
    stars:       null,
    downloads:   crate.downloads ?? null,
    https:       null,
    auth:        null,
    language:    'Rust',
    license:     null,
    category:    null,
    updatedAt:   crate.updated_at ?? null,
    version:     crate.max_stable_version ?? crate.newest_version ?? null,
  }
}

// ─── RubyGems ───────────────────────────────────────────────────────
export function normalizeRubyGem(gem) {
  return {
    id:          `gem-${gem.name}`,
    name:        gem.name,
    description: gem.info ?? 'No description provided',
    url:         gem.homepage_uri ?? gem.project_uri ?? `https://rubygems.org/gems/${gem.name}`,
    source:      'rubygems',
    stars:       null,
    downloads:   gem.downloads ?? null,
    https:       null,
    auth:        null,
    language:    'Ruby',
    license:     null,
    category:    null,
    updatedAt:   null,
    version:     gem.version ?? null,
  }
}
