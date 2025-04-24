import { useRemoveCart } from '@/hooks/useRemoveCart'
import { useUpdateCartQuantity } from '@/hooks/useUpdateCartQuantity'
import { ProductItem } from '@/types/schema/schema'
import { Button } from '@heroui/button'
import { Checkbox } from '@heroui/checkbox'
import { Image } from '@heroui/image'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const CartCard = ({
  product,
  quantity,
}: {
  product: ProductItem
  quantity: number
}) => {
  // if (isLoading)
  //   return (
  //     <Skeleton className="min-w-fit xl:w-[700px] md:w-[500px] sm:w-96 h-32 rounded-lg" />
  //   )
  // if (error) return <p>Failed to load product</p>

  const { data: session } = useSession()
  const removeCartMutation = useRemoveCart()
  const [itemQuantity, setItemQuantity] = useState(quantity)

  const { mutate: updateQuantity } = useUpdateCartQuantity()
  const debouncedUpdate = debounce(updateQuantity, 300)

  const increaseQuantity = () => {
    const newQty = itemQuantity + 1
    setItemQuantity(newQty)
    debouncedUpdate({
      customerId: session?.user.id ?? '',
      productId: product.id,
      quantity: newQty,
    })
  }

  const decreaseQuantity = () => {
    if (itemQuantity > 1) {
      const newQty = itemQuantity - 1
      setItemQuantity(newQty)
      debouncedUpdate({
        customerId: session?.user.id ?? '',
        productId: product.id,
        quantity: newQty,
      })
    }
  }

  const handleRemoveFromCart = () => {
    if (!session?.user?.id) {
      alert('You need to log in to remove items from your cart.')
      return
    }
    removeCartMutation.mutate(
      { userId: session.user.id, productId: product.id },
      {
        onSuccess: () => alert('Removed from cart successfully!'),
        onError: () => alert('Failed to remove item from cart'),
      },
    )
  }

  return (
    <div className="flex items-center justify-center container w-fit border-2 p-4 rounded-md">
      <div className="flex items-center h-full">
        <Checkbox size="lg" />
      </div>
      <div className="flex items-center gap-4 min-w-fit xl:w-[700px] md:w-[500px] sm:w-96">
        <div>
          <Image
            src={product.image_url || '/fallback-image.png'}
            alt={product.product_name || 'Product'}
            width={120}
            height={120}
          />
        </div>
        <div>
          <h5>{product.product_name || 'Unknown Product'}</h5>
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
      <Button color="danger" onPress={() => handleRemoveFromCart()}>
        Remove
      </Button>
    </div>
  )
}

export default CartCard
