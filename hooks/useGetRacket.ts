import { BASE_URL } from '@/constants/base_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Custom hook to get user data
const useGetRacket = () => {
  // Define the query to fetch user data
  return useQuery({
    queryKey: ['racket'],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/rackets`)
      return data
    },
  })
}

export default useGetRacket
