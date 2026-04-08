/**
 * Compare store — holds up to 3 items for side-by-side comparison.
 */

import { create } from 'zustand'

export const useCompareStore = create((set, get) => ({
  items:  [],
  isOpen: false,

  addItem: (result) => {
    const current = get().items
    if (current.length >= 3) return
    if (current.some((i) => i.id === result.id)) return
    set({ items: [...current, result] })
  },

  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) })
  },

  isComparing: (id) => get().items.some((i) => i.id === id),

  toggleItem: (result) => {
    if (get().isComparing(result.id)) {
      get().removeItem(result.id)
    } else {
      get().addItem(result)
    }
  },

  openDrawer:  () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),

  clearAll: () => set({ items: [], isOpen: false }),
}))
