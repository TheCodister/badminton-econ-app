import { ProductItem } from '@/types/schema/schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SelectedItem {
  product: ProductItem
  quantity: number
}

interface SelectedCartStore {
  selectedItems: SelectedItem[]
  toggleItem: (product: ProductItem, quantity: number) => void
  clearItems: () => void
}

export const useSelectedCart = create(
  persist<SelectedCartStore>(
    (set, get) => ({
      selectedItems: [],
      toggleItem: (product, quantity) => {
        const { selectedItems } = get()
        const exists = selectedItems.find((i) => i.product.id === product.id)

        if (exists) {
          set({
            selectedItems: selectedItems.filter(
              (i) => i.product.id !== product.id,
            ),
          })
        } else {
          set({ selectedItems: [...selectedItems, { product, quantity }] })
        }
      },
      clearItems: () => set({ selectedItems: [] }),
    }),
    {
      name: 'selected-cart', // localStorage key
    },
  ),
)
