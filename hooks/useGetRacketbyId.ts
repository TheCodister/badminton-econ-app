import { BACKEND_URL } from '@/constants/base_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useGetRacketbyId = (product_id: string) => {
  return useQuery({
    queryKey: ['racket', product_id], // 🔹 Unique key for each product
    queryFn: async () => {
      if (!product_id) return null // Prevent API calls with empty ID
      const { data } = await axios.get(`${BACKEND_URL}/rackets/${product_id}`)
      return data
    },
    enabled: !!product_id, // 🔹 Ensures query runs only when product_id exists
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  })
}

export default useGetRacketbyId
