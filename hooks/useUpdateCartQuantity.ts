// hooks/useUpdateCartQuantity.ts
import { BACKEND_URL } from '@/constants/backend_url'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      customerId,
      productId,
      quantity,
    }: {
      customerId: string
      productId: string
      quantity: number
    }) => {
      return axios.post(
        `${BACKEND_URL}/shoppingcart/${customerId}/${productId}/${quantity}`,
      )
    },
    onSuccess: (data, variables) => {
      // Invalidate all cart queries
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      // Also invalidate the specific user's cart
      queryClient.invalidateQueries({
        queryKey: ['cart', variables.customerId],
      })
    },
  })
}
