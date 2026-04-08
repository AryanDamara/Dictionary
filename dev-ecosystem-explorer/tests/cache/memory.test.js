import { describe, it, expect, beforeEach } from 'vitest'
import * as memoryCache from '../../src/cache/memoryCache'

describe('memoryCache', () => {
  beforeEach(() => {
    memoryCache.clear()
  })

  it('stores and retrieves data', () => {
    memoryCache.set('test-key', { value: 42 }, 60000)
    expect(memoryCache.get('test-key')).toEqual({ value: 42 })
  })

  it('returns null for missing keys', () => {
    expect(memoryCache.get('nonexistent')).toBeNull()
  })

  it('returns null for expired entries', () => {
    memoryCache.set('expired', { value: 1 }, -1) // TTL in the past
    expect(memoryCache.get('expired')).toBeNull()
  })

  it('has() returns false for expired entries', () => {
    memoryCache.set('expired', { value: 1 }, -1)
    expect(memoryCache.has('expired')).toBe(false)
  })

  it('has() returns true for valid entries', () => {
    memoryCache.set('valid', { value: 1 }, 60000)
    expect(memoryCache.has('valid')).toBe(true)
  })

  it('delete removes entries', () => {
    memoryCache.set('to-delete', { value: 1 }, 60000)
    memoryCache.del('to-delete')
    expect(memoryCache.get('to-delete')).toBeNull()
  })

  it('clear removes all entries', () => {
    memoryCache.set('a', 1, 60000)
    memoryCache.set('b', 2, 60000)
    memoryCache.clear()
    expect(memoryCache.size()).toBe(0)
  })

  it('size returns correct count', () => {
    memoryCache.set('a', 1, 60000)
    memoryCache.set('b', 2, 60000)
    expect(memoryCache.size()).toBe(2)
  })

  it('handles prototype-polluting keys safely (Map advantage)', () => {
    memoryCache.set('constructor', { safe: true }, 60000)
    memoryCache.set('__proto__', { safe: true }, 60000)
    expect(memoryCache.get('constructor')).toEqual({ safe: true })
    expect(memoryCache.get('__proto__')).toEqual({ safe: true })
  })
})
