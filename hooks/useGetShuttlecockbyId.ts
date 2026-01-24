import { BACKEND_URL } from '@/constants/backend_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useGetShuttlecockbyId = (product_id: string) => {
  return useQuery({
    queryKey: ['shuttlecock', product_id], // 🔹 Unique key for each product
    queryFn: async () => {
      if (!product_id) return null // Prevent API calls with empty ID
      const { data } = await axios.get(`${BACKEND_URL}/shuttlecocks/${product_id}`)
      return data
    },
    enabled: !!product_id, // 🔹 Ensures query runs only when product_id exists
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  })
}

export default useGetShuttlecockbyId
