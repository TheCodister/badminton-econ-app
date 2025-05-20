import { useCheckout } from '@/context/context'
import { useRemoveCart } from '@/hooks/useRemoveCart'
import { useUpdateCartQuantity } from '@/hooks/useUpdateCartQuantity'
import { ProductItem } from '@/types/schema/schema'
import { Button } from '@heroui/button'
import { Checkbox } from '@heroui/checkbox'
import { Image } from '@heroui/image'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export const dynamic = 'force-dynamic'

const CartCard = ({
  product,
  quantity,
}: {
  product: ProductItem
  quantity: number
}) => {
  const { data: session } = useSession()
  const { mutate: removeCartMutation } = useRemoveCart()
  const [itemQuantity, setItemQuantity] = useState(quantity)
  const { mutate: updateQuantity } = useUpdateCartQuantity()

  // Use the checkout context
  const { addCheckoutItem, removeCheckoutItem, isInCheckout } = useCheckout()
  const isChecked = isInCheckout(product.id)

  const handleCheckboxChange = () => {
    if (isChecked) {
      removeCheckoutItem(product.id)
    } else {
      addCheckoutItem(product, itemQuantity)
    }
  }

  const increaseQuantity = () => {
    const newQty = itemQuantity + 1
    setItemQuantity(newQty)

    // Update quantity in cart
    updateQuantity({
      customerId: session?.user.id ?? '',
      productId: product.id,
      quantity: newQty,
    })

    // Also update in checkout context if item is selected
    if (isChecked) {
      addCheckoutItem(product, newQty)
    }
  }

  const decreaseQuantity = () => {
    if (itemQuantity > 1) {
      const newQty = itemQuantity - 1
      setItemQuantity(newQty)

      // Update quantity in cart
      updateQuantity({
        customerId: session?.user.id ?? '',
        productId: product.id,
        quantity: newQty,
      })

      // Also update in checkout context if item is selected
      if (isChecked) {
        addCheckoutItem(product, newQty)
      }
    }
  }

  const handleRemoveFromCart = () => {
    if (!session?.user?.id) {
      alert('You need to log in to remove items from your cart.')
      return
    }

    // Remove from checkout context if it's there
    if (isChecked) {
      removeCheckoutItem(product.id)
    }

    removeCartMutation(
      { userId: session.user.id, productId: product.id },
      {
        onSuccess: () => {
          alert('Removed from cart successfully!')
          // Refresh the page after successful removal
          // window.location.reload()
        },
        onError: () => alert('Failed to remove item from cart'),
      },
    )
  }

  return (
    <div
      id={`cart-item-${product.id}`}
      className="flex flex-col xl:flex-row lg:flex-row md:flex-row items-center justify-center container w-full border-2 p-4 rounded-lg h-max"
    >
      <div className="flex items-center justify-center min-w-fit">
        <div className="ml-2">
          <Checkbox
            size="lg"
            isSelected={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="flex items-center gap-0 xl:gap-4 lg:gap-4 md:gap-2 min-w-fit xl:w-[700px] md:w-[500px] sm:w-96 container">
          <div>
            <Image
              src={product.image_url || '/fallback-image.png'}
              alt={product.product_name || 'Product'}
              width={120}
              height={120}
            />
          </div>
          <div className="overflow-hidden">
            <h5
              className="text-ellipsis overflow-hidden whitespace-nowrap"
              title={product.product_name || 'Unknown Product'} // Add a tooltip to show the full name on hover
            >
              {product.product_name || 'Unknown Product'}
            </h5>
            <p>Price: ${product.price || 'N/A'}</p>
            <section className="flex items-center gap-1 border-2 rounded-md w-fit">
              <Button
                variant="light"
                onPress={() => increaseQuantity()}
                isIconOnly
                size="sm"
                className="text-lg"
              >
                +
              </Button>
              <h6 className="bg-slate-300 w-10 text-center rounded-md">
                {itemQuantity}
              </h6>
              <Button
                variant="light"
                onPress={() => decreaseQuantity()}
                isIconOnly
                size="sm"
                className="text-lg"
              >
                -
              </Button>
            </section>
          </div>
        </div>
      </div>
      <Button color="danger" onPress={handleRemoveFromCart}>
        Remove
      </Button>
    </div>
  )
}

export default CartCard
