import { BACKEND_URL } from '@/constants/base_url'
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
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] }) // Refresh cart data
    },
  })
}
