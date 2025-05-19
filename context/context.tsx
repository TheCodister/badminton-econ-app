// context/CheckoutContext.tsx
import { useSelectedCart } from '@/stores/useSelectedCart'
import { ProductItem } from '@/types/schema/schema'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface CheckoutItem {
  product: ProductItem
  quantity: number
}

interface CheckoutContextType {
  checkoutItems: CheckoutItem[]
  addCheckoutItem: (product: ProductItem, quantity: number) => void
  removeCheckoutItem: (productId: string) => void
  clearCheckoutItems: () => void
  getCheckoutTotal: () => number
  isInCheckout: (productId: string) => boolean
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
)

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([])
  const { selectedItems } = useSelectedCart()

  // Sync with selected items from the Zustand store
  useEffect(() => {
    setCheckoutItems(selectedItems)
  }, [selectedItems])

  const addCheckoutItem = (product: ProductItem, quantity: number) => {
    setCheckoutItems((prev) => {
      // Check if item already exists
      const exists = prev.find((item) => item.product.id === product.id)

      if (exists) {
        // Update quantity if it exists
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity } : item,
        )
      } else {
        // Add new item if it doesn't exist
        return [...prev, { product, quantity }]
      }
    })
  }

  const removeCheckoutItem = (productId: string) => {
    setCheckoutItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    )
  }

  const clearCheckoutItems = () => {
    setCheckoutItems([])
  }

  const getCheckoutTotal = () => {
    return checkoutItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    )
  }

  const isInCheckout = (productId: string) => {
    return checkoutItems.some((item) => item.product.id === productId)
  }

  return (
    <CheckoutContext.Provider
      value={{
        checkoutItems,
        addCheckoutItem,
        removeCheckoutItem,
        clearCheckoutItems,
        getCheckoutTotal,
        isInCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}
