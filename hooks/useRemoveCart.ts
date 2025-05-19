// hooks/useRemoveCart.ts
import { BACKEND_URL } from '@/constants/backend_url'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

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
      const response = await axios.delete(
        `${BACKEND_URL}/shoppingcart/${userId}/${productId}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] }) // Invalidate all cart queries
      queryClient.refetchQueries({ queryKey: ['cart'] }) // Refresh cart data
      console.log('Item removed from cart successfully')
    },
    onError: (error) => {
      console.error('Failed to remove item from cart:', error)
    },
  })
}
