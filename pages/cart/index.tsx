import CartCard from '@/components/CartProductCard'
import { Button } from '@heroui/button'
export default function ShoppingCart() {
  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <div className="flex flex-col justify-between gap-4 w-full 2xl:flex-row xl:flex-row lg:flex-row md:flex-col sm:flex-col">
        <div className="flex flex-col gap-4 w-">
          <h2>Cart content</h2>
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
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
            <h6>$0</h6>
          </div>
          <Button className="w-full" color="primary">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
