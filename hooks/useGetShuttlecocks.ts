import { BACKEND_URL } from '@/constants/backend_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface ShuttlecockFilters {
  brand?: string | string[]
  shuttle_type?: string | string[]
  speed?: string | string[]
  weight?: string | string[]
  price?: string | string[]
  page?: number
  limit?: number
  [key: string]: string | string[] | number | undefined
}

const useGetShuttlecocks = (filters: ShuttlecockFilters) => {
  const queryString = new URLSearchParams(
    Object.entries(filters)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, Array.isArray(v) ? v.join(',') : String(v)]),
  ).toString()

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
