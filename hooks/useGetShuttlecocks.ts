import { BACKEND_URL } from '@/constants/backend_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Custom hook to get racket data
const useGetShuttlecocks = (filters: any) => {
  const queryString = new URLSearchParams(filters).toString()

  return useQuery({
    queryKey: ['shuttlecocks', filters],
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/shuttlecocks?${queryString}`)
      return {
        data: data.data, // Paginated data
        total: data.total, // Total count of matching records
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  })
}

export default useGetShuttlecocks
