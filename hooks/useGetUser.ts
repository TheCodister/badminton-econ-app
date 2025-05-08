import { BACKEND_URL } from '@/constants/backend_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Custom hook to get user data
const useGetUser = () => {
  // Define the query to fetch user data
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/users`)
      return data
    },
  })
}

export default useGetUser
