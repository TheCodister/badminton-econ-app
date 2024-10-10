import ProductCard from '@/components/card/card'
import Sidebar from '@/components/sidebar/siderbar'
import useGetRacket from '@/hooks/useGetRacket'
import { Racket } from '@/types/schema/schema'
import { Pagination } from '@nextui-org/pagination'
import { Flex, Grid } from '@radix-ui/themes'

const IndexPage = () => {
  const { data, error, isLoading } = useGetRacket()

  if (error) return <div>Error fetching user data</div>
  if (isLoading) return <div>Loading...</div>

  console.log(data)

  return (
    <main>
      <Flex>
        <Sidebar />
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
