import { BACKEND_URL } from '@/constants/backend_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Custom hook to get racket data
const useGetRacket = (filters: any) => {
  const queryString = new URLSearchParams(filters).toString()

  return useQuery({
    queryKey: ['racket', filters],
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/rackets?${queryString}`)
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  })
}

export default useGetRacket
