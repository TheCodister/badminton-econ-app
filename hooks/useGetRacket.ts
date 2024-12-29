import { BASE_URL } from '@/constants/base_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Custom hook to get racket data
const useGetRacket = (filters: any) => {
  const queryString = new URLSearchParams(filters).toString()

  return useQuery({
    queryKey: ['racket', filters],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/rackets?${queryString}`)
      return data
    },
  })
}

export default useGetRacket
