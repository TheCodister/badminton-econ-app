import { BACKEND_URL } from '@/constants/backend_url'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRemoveCart = () => {
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
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (!response.ok) throw new Error('Failed to remove item from cart')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] }) // Refresh cart data
    },
  })
}
