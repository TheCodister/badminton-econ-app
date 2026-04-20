import { BACKEND_URL } from '@/constants/backend_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface RacketFilters {
  brand?: string | string[]
  balance?: string | string[]
  weight?: string | string[]
  stiffness?: string | string[]
  price?: string | string[]
  page?: number
  limit?: number
  [key: string]: string | string[] | number | undefined
}

const useGetRacket = (filters: RacketFilters) => {
  const queryString = new URLSearchParams(
    Object.entries(filters)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, Array.isArray(v) ? v.join(',') : String(v)]),
  ).toString()

  return useQuery({
    queryKey: ['racket', filters],
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/rackets?${queryString}`)
      return {
        data: data.data, // Paginated data
        total: data.total, // Total count of matching records
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  })
}

export default useGetRacket
