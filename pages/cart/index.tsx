import CartCard from '@/components/CartProductCard'
import { useCheckout } from '@/context/context'
import { useGetCart } from '@/hooks/useGetCart'
import { ProductItem } from '@/types/schema/schema'
import { Button } from '@heroui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

interface CartItem {
  item_id: string
  product: ProductItem
  quantity: number
  price: number
}

export default function ShoppingCart() {
  const { data: session } = useSession()
  const { data: cart, error } = useGetCart()
  const { checkoutItems, getCheckoutTotal } = useCheckout()
  const router = useRouter()

  if (error) return <p>Failed to load cart</p>

  const handleCheckout = () => {
    if (checkoutItems.length === 0) {
      alert('Please select at least one product before proceeding to checkout')
      return
    }

    router.push('/checkout')
  }

  return (
    <div className="p-3">
      <h1>Your Shopping Cart</h1>
      <div className="flex flex-col justify-between gap-4 w-full 2xl:flex-row xl:flex-row lg:flex-row md:flex-col sm:flex-col">
        <div className="flex flex-col gap-4">
          <h2>Cart content</h2>
          {cart?.cart_items.length > 0 ? (
            cart.cart_items.map((item: CartItem) => (
              <CartCard
                key={item.item_id}
                product={item.product}
                quantity={item.quantity}
              />
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="flex flex-col gap-4 bg-slate-200 h-fit p-4 rounded-xl">
          <h2>Order Summary</h2>
          <div className="flex justify-between">
            <p>Discount:</p>
            <p>0%</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between">
            <h6>Total:</h6>
            <h6 className="font-bold">
              {checkoutItems.length > 0
                ? `$${getCheckoutTotal().toFixed(2)}`
                : '$0.00'}
            </h6>
          </div>
          <Button className="w-full" color="primary" onPress={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
