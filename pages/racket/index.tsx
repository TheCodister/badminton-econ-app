import ProductCard from '@/components/card/ProductCard'
import Sidebar from '@/components/sidebar/siderbar'
import useGetRacket from '@/hooks/useGetRacket'
import { Racket } from '@/types/schema/schema'
import { Pagination } from '@nextui-org/pagination'
import { Flex, Grid } from '@radix-ui/themes'
import { useState } from 'react'

const IndexPage = () => {
  const [filters, setFilters] = useState({})
  const { data, error, isLoading } = useGetRacket(filters)

  if (error) return <div>Error fetching user data</div>
  if (isLoading) return <div>Loading...</div>

  const handleFilterChange = (updatedFilters: any) => {
    setFilters(updatedFilters)
  }

  return (
    <main>
      <Flex>
        <Sidebar onFilterChange={handleFilterChange} />
        <Grid
          columns={{ xl: '5', lg: '4', md: '3', sm: '2', xs: '1' }}
          gap="5"
          px="4"
        >
          {data.map((data: Racket) => (
            <ProductCard key={data.product_id} data={data} />
          ))}
        </Grid>
      </Flex>
      <div className="flex self-center justify-center mt-4">
        <Pagination total={10} initialPage={1} />
      </div>
    </main>
  )
}

export default IndexPage
