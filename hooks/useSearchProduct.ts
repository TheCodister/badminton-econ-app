import { BACKEND_URL } from '@/constants/base_url'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Custom hook to get user data
const useSearchProduct = (product_name: string) => {
  return useQuery({
    queryKey: ['products', product_name],
    queryFn: async () => {
      if (!product_name) return []
      const { data } = await axios.get(
        `${BACKEND_URL}/products?search=${product_name}&limit=5`,
      )
      return data
    },
    enabled: !!product_name, // only fetch when input is not empty
  })
}

export default useSearchProduct
