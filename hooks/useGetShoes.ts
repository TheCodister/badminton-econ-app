import { BACKEND_URL } from '@/constants/backend_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface ShoesFilters {
  brand?: string | string[]
  size?: string | string[]
  weight?: string | string[]
  color?: string | string[]
  price?: string | string[]
  page?: number
  limit?: number
  [key: string]: string | string[] | number | undefined
}

const useGetShoes = (filters: ShoesFilters) => {
  const queryString = new URLSearchParams(
    Object.entries(filters)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, Array.isArray(v) ? v.join(',') : String(v)]),
  ).toString()

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
