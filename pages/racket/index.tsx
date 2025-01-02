import ProductCard from '@/components/card/ProductCard'
import Sidebar from '@/components/sidebar/siderbar'
import useGetRacket from '@/hooks/useGetRacket'
import { Racket } from '@/types/schema/schema'
import { Pagination } from '@nextui-org/pagination'
import { Flex, Grid } from '@radix-ui/themes'
import Head from 'next/head'
import { useRouter } from 'next/router'

const IndexPage = () => {
  const router = useRouter()
  const filters = router.query

  const { data, error, isLoading } = useGetRacket(filters)

  if (error) return <div>Error fetching rackets</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <main>
      <Head>
        <title>Racket</title>
      </Head>
      <Flex>
        <Sidebar />
        <Grid
          columns={{ xl: '5', lg: '4', md: '3', sm: '2', xs: '1' }}
          gap="5"
          px="4"
        >
          {data.length > 0 ? (
            data.map((data: Racket) => (
              <ProductCard key={data.product_id} data={data} />
            ))
          ) : (
            <div className="text-center text-lg font-medium text-red-500 w-full">
              No rackets found
            </div>
          )}
        </Grid>
      </Flex>
      <div className="flex self-center justify-center mt-4">
        <Pagination total={10} initialPage={1} />
      </div>
    </main>
  )
}

export default IndexPage
