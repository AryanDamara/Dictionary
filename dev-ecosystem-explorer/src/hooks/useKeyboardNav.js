/**
 * useKeyboardNav — arrow/enter/escape navigation for lists.
 *
 * Circular navigation: going past the last item wraps back to
 * the first, and going before the first wraps to the last.
 */

import { useState, useCallback } from 'react'

export function useKeyboardNav({ itemCount, onSelect, onClose }) {
  const [activeIndex, setActiveIndex] = useState(-1)

  const handleKeyDown = useCallback(
    (e) => {
      if (itemCount === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex((i) => (i + 1) % itemCount)
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex((i) => (i - 1 + itemCount) % itemCount)
          break
        case 'Enter':
          e.preventDefault()
          if (activeIndex >= 0) onSelect?.(activeIndex)
          break
        case 'Escape':
          e.preventDefault()
          onClose?.()
          setActiveIndex(-1)
          break
        case 'Home':
          e.preventDefault()
          setActiveIndex(0)
          break
        case 'End':
          e.preventDefault()
          setActiveIndex(itemCount - 1)
          break
        default:
          break
      }
    },
    [itemCount, activeIndex, onSelect, onClose]
  )

  const resetIndex = useCallback(() => setActiveIndex(-1), [])

  return { activeIndex, handleKeyDown, resetIndex }
}
