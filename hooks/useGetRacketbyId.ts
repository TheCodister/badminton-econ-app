import { BASE_URL } from '@/constants/base_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useGetRacketbyId = (product_id: string) => {
  return useQuery({
    queryKey: ['racket'],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/rackets/${product_id}`)
      return data
    },
  })
}

export default useGetRacketbyId
