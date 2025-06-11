import { useAddToCart } from '@/hooks/useAddToCart' // Adjust path if needed
import CartIcon from '@/icons/CartIcon'
import { Button } from '@heroui/button'
import { useSession } from 'next-auth/react'

const AddToCartButton = ({ racketId }: { racketId: string }) => {
  const { data: session } = useSession()
  const addToCartMutation = useAddToCart()

  const handleAddToCart = () => {
    if (!session?.user?.id) {
      alert('You need to log in to add items to your cart.')
      return
    }
    addToCartMutation.mutate(
      { userId: session.user.id, productId: racketId },
      {
        onSuccess: () => alert('Added to cart successfully!'),
        onError: () => alert('Failed to add item to cart'),
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
