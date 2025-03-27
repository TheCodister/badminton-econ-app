import { BACKEND_URL } from '@/constants/base_url'
import { useQuery } from '@tanstack/react-query'

export const useGetCart = (customerId: string) => {
  return useQuery({
    queryKey: ['cart', customerId],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/shoppingcart/${customerId}`)
      if (!response.ok) throw new Error('Failed to fetch cart')
      return response.json()
    },
    enabled: !!customerId, // Only fetch if customerId exists
  })
}
