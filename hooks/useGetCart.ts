// hooks/useGetCart.ts
import { BACKEND_URL } from '@/constants/backend_url'
import { useQuery } from '@tanstack/react-query'

export const useGetCart = (customerId: string) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      // if (!customerId) return { cart_items: [] }

      const response = await fetch(`${BACKEND_URL}/shoppingcart/${customerId}`)
      if (!response.ok) throw new Error('Failed to fetch cart')
      return response.json()
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    staleTime: 0, // Consider data always stale
  })
}
