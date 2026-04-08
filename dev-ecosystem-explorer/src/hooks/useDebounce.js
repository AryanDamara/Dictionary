/**
 * useDebounce — delays a value by N milliseconds after the last change.
 *
 * Like a secretary who waits until you stop talking before typing
 * up your dictation. If you keep talking (typing), she keeps resetting
 * her timer.
 *
 * Keystroke timeline (80ms apart, 300ms debounce):
 *   0ms   → user types "r"     → timer set for 300ms
 *   80ms  → user types "e"     → cancel old timer, set new 300ms
 *   160ms → user types "a"     → cancel old timer, set new 300ms
 *   240ms → user types "c"     → cancel old timer, set new 300ms
 *   320ms → user types "t"     → cancel old timer, set new 300ms
 *   620ms → timer fires!       → debouncedValue = "react" → 1 API call
 */

import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
