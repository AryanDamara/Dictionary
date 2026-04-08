/**
 * MSW (Mock Service Worker) handlers for testing.
 *
 * MSW intercepts fetch at the network level — it doesn't mock
 * the fetch function itself. This means our code runs exactly
 * as it would in production, just with controlled responses.
 */

import { http, HttpResponse } from 'msw'

// ─── Fixture data ───────────────────────────────────────────────────
export const GITHUB_FIXTURE = {
  items: [
    {
      id: 10270250,
      full_name: 'facebook/react',
      description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
      html_url: 'https://github.com/facebook/react',
      stargazers_count: 218000,
      language: 'JavaScript',
      license: { spdx_id: 'MIT' },
      updated_at: '2024-01-15T10:00:00Z',
    },
  ],
}

export const NPM_FIXTURE = {
  objects: [
    {
      package: {
        name: 'react',
        description: 'React is a JavaScript library for building user interfaces.',
        links: { npm: 'https://www.npmjs.com/package/react' },
        version: '18.2.0',
        date: '2024-01-10T00:00:00Z',
        license: 'MIT',
      },
    },
  ],
}

export const PUBLIC_API_FIXTURE = {
  entries: [
    {
      API: 'Cat Facts',
      Description: 'Daily cat facts',
      Link: 'https://catfact.ninja/',
      HTTPS: true,
      Auth: '',
      Category: 'Animals',
    },
  ],
}

// ─── Handlers ───────────────────────────────────────────────────────
export const handlers = [
  http.get('https://api.github.com/search/repositories', () => {
    return HttpResponse.json(GITHUB_FIXTURE)
  }),

  http.get('https://registry.npmjs.org/-/v1/search', () => {
    return HttpResponse.json(NPM_FIXTURE)
  }),

  http.get('https://api.publicapis.org/entries', () => {
    return HttpResponse.json(PUBLIC_API_FIXTURE)
  }),

  // PyPI — exact name lookup
  http.get('https://pypi.org/pypi/:name/json', ({ params }) => {
    if (params.name === 'requests') {
      return HttpResponse.json({
        info: {
          name: 'requests',
          summary: 'HTTP for Humans',
          version: '2.31.0',
          license: 'Apache-2.0',
          project_url: 'https://pypi.org/project/requests',
        },
      })
    }
    return new HttpResponse(null, { status: 404 })
  }),

  // Docker Hub
  http.get('https://hub.docker.com/v2/search/repositories/', () => {
    return HttpResponse.json({
      results: [
        {
          repo_name: 'library/nginx',
          short_description: 'Official nginx image',
          pull_count: 1000000,
          star_count: 500,
          is_official: true,
        },
      ],
    })
  }),

  // Hacker News
  http.get('https://hacker-news.firebaseio.com/v0/topstories.json', () => {
    return HttpResponse.json([1, 2, 3])
  }),

  http.get('https://hacker-news.firebaseio.com/v0/item/:id.json', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.id),
      title: `HN Story ${params.id}`,
      url: `https://example.com/${params.id}`,
      score: 100 + Number(params.id),
      descendants: 50,
      time: Math.floor(Date.now() / 1000),
    })
  }),

  // Crates.io
  http.get('https://crates.io/api/v1/crates', () => {
    return HttpResponse.json({
      crates: [
        {
          id: 'serde',
          name: 'serde',
          description: 'A serialization framework',
          downloads: 500000,
          max_stable_version: '1.0.193',
          updated_at: '2024-01-12T00:00:00Z',
        },
      ],
    })
  }),

  // RubyGems
  http.get('https://rubygems.org/api/v1/search.json', () => {
    return HttpResponse.json([
      {
        name: 'devise',
        info: 'Flexible authentication solution for Rails',
        homepage_uri: 'https://github.com/heartcombo/devise',
        version: '4.9.3',
        downloads: 200000,
      },
    ])
  }),
]
