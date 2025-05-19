import { BACKEND_URL } from '@/constants/backend_url'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      userId,
      productId,
    }: {
      userId: string
      productId: string
    }) => {
      const response = await fetch(
        `${BACKEND_URL}/shoppingcart/${userId}/${productId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: 1 }),
        },
      )

      if (!response.ok) throw new Error('Failed to add item to cart')
      // console.log('Item added to cart successfully')
      // queryClient.invalidateQueries({ queryKey: ['cart'] }) // Refresh cart data
      return response.json()
    },
    onSuccess: () => {
      console.log('Item added to cart successfully')
      queryClient.refetchQueries({ queryKey: ['cart'] }) // Refresh cart data
      console.log('Refetching cart for userId')
    },
  })
}
