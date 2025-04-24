import OrderCard from '@/components/card/OrderItemCard'
import { useSelectedCart } from '@/stores/useSelectedCart'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { useSession } from 'next-auth/react'
const CheckOutPage = () => {
  const { data: session } = useSession()
  const { selectedItems } = useSelectedCart()
  const calcOrderPrice = () => {
    return selectedItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    )
  }
  const paymentMethods = [
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'cash-on-delivery', label: 'Cash on Delivery' },
  ]
  return (
    <div>
      <h1>Checkout</h1>
      <div className="flex flex-col justify-between gap-4 w-full 2xl:flex-row xl:flex-row lg:flex-row md:flex-col sm:flex-col">
        <div className="flex flex-col gap-4">
          <h3>Your Item</h3>
          {selectedItems.length > 0 ? (
            selectedItems.map((item) => (
              <OrderCard
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
          <h3>Shipping Information</h3>
          <div className="space-y-10">
            <Input
              className="xl:w-[30vw] lg:w-auto md:w-auto sm:w-auto"
              size="lg"
              placeholder={session?.user.name}
              label="Full Name"
              labelPlacement="outside"
              defaultValue={session?.user.name}
            />
            <Input
              className="xl:w-[30vw] lg:w-auto md:w-auto sm:w-auto"
              size="lg"
              placeholder="Email Address"
              label="Email Address"
              labelPlacement="outside"
              defaultValue={session?.user.email}
            />
            <Input
              className="xl:w-[30vw] lg:w-auto md:w-auto sm:w-auto"
              size="lg"
              placeholder="Phone Number"
              label="Phone Number"
              labelPlacement="outside"
            />
            <Input
              className="xl:w-[30vw] lg:w-auto md:w-auto sm:w-auto"
              size="lg"
              placeholder="Address"
              label="Address"
              labelPlacement="outside"
            />
          </div>
          <h3>Payment Method</h3>
          <Select
            items={paymentMethods}
            label="Payment Method"
            labelPlacement="outside"
            placeholder="Select a payment method"
          >
            {paymentMethods.map((method) => (
              <SelectItem key={method.value} value={method.value}>
                {method.label}
              </SelectItem>
            ))}
          </Select>
          <Button className="w-full" color="primary">
            Place Order
          </Button>
        </div>
        <div className="flex flex-col gap-4 bg-slate-200 h-fit p-4 rounded-xl">
          <h2>Order Summary</h2>
          <div className="flex justify-between">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between">
            <h6>Total:</h6>
            <h6 className="font-bold">
              {selectedItems.length > 0
                ? `$${calcOrderPrice().toFixed(2)}`
                : '$0.00'}
            </h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutPage
