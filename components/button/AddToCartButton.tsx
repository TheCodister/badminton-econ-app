import { useAddToCart } from '@/hooks/useAddToCart'
import CartIcon from '@/icons/CartIcon'
import { Button } from '@heroui/button'
import { addToast } from '@heroui/react'
import { useSession } from 'next-auth/react'

const AddToCartButton = ({ racketId }: { racketId: string }) => {
  const { data: session } = useSession()
  const addToCartMutation = useAddToCart()

  const handleAddToCart = () => {
    if (!session?.user?.id) {
      addToast({ title: 'You need to log in to add items to your cart.', color: 'warning' })
      return
    }
    addToCartMutation.mutate(
      { userId: session.user.id, productId: racketId },
      {
        onSuccess: () => addToast({ title: 'Added to cart successfully!', color: 'success' }),
        onError: () => addToast({ title: 'Failed to add item to cart', color: 'danger' }),
      },
    )
  }

  return (
    <Button
      size="lg"
      className="w-full"
      color="primary"
      radius="lg"
      onPress={handleAddToCart}
      startContent={<CartIcon />}
      disabled={addToCartMutation.status === 'pending'}
    >
      <h6>Add to cart</h6>
    </Button>
  )
}

export default AddToCartButton
