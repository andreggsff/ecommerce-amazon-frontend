import { create } from "zustand"

const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product) => {
    const items = get().items
    const existing = items.find((i) => i.id === product.id)
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] })
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) })
  },

  increaseQuantity: (id) => {
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })
  },

  decreaseQuantity: (id) => {
    const items = get().items
    const item = items.find((i) => i.id === id)
    if (item.quantity === 1) {
      set({ items: items.filter((i) => i.id !== id) })
    } else {
      set({
        items: items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      })
    }
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
}))

export default useCartStore