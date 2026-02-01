import { BACKEND_URL } from '@/constants/backend_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Custom hook to get shoes data
const useGetShoes = (filters: any) => {
  const queryString = new URLSearchParams(filters).toString()

  return useQuery({
    queryKey: ['shoes', filters],
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/shoes?${queryString}`)
      return {
        data: data.data, // Paginated data
        total: data.total, // Total count of matching records
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  })
}

export default useGetShoes
