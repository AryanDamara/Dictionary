import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers, GITHUB_FIXTURE } from '../msw/handlers.js'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('fetchGitHub', () => {
  it('returns normalized results', async () => {
    // Dynamic import to ensure MSW is ready
    const { fetchGitHub } = await import('../../src/api/github.js')
    const results = await fetchGitHub('react')

    expect(results).toHaveLength(1)
    expect(results[0]).toMatchObject({
      id: String(GITHUB_FIXTURE.items[0].id),
      name: 'facebook/react',
      source: 'github',
      stars: 218000,
      downloads: null,
      https: null,
      language: 'JavaScript',
      license: 'MIT',
    })
  })

  it('has all 14 required fields', async () => {
    const { fetchGitHub } = await import('../../src/api/github.js')
    const results = await fetchGitHub('react')
    const result = results[0]

    const requiredFields = [
      'id', 'name', 'description', 'url', 'source',
      'stars', 'downloads', 'https', 'auth', 'language',
      'license', 'category', 'updatedAt', 'version',
    ]

    requiredFields.forEach((field) => {
      expect(result).toHaveProperty(field)
      expect(result[field]).not.toBeUndefined()
    })
  })
})
