import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from '../msw/handlers.js'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('fetchNpm', () => {
  it('returns normalized results', async () => {
    const { fetchNpm } = await import('../../src/api/npm.js')
    const results = await fetchNpm('react')

    expect(results).toHaveLength(1)
    expect(results[0]).toMatchObject({
      id: 'react',
      name: 'react',
      source: 'npm',
      stars: null,
      language: 'JavaScript',
      version: '18.2.0',
    })
  })

  it('handles null objects array', async () => {
    const { http, HttpResponse } = await import('msw')
    server.use(
      http.get('https://registry.npmjs.org/-/v1/search', () => {
        return HttpResponse.json({ objects: null })
      })
    )

    const { fetchNpm } = await import('../../src/api/npm.js')
    const results = await fetchNpm('nonexistent')
    expect(results).toEqual([])
  })
})
