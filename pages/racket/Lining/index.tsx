import ProductCard from '@/components/card/card'
import Sidebar from '@/components/sidebar/siderbar'
import { Pagination } from '@nextui-org/react'
import { Flex, Grid } from '@radix-ui/themes'
export default function LiningRacketPage() {
  return (
    <main>
      <Flex>
        <Sidebar />
        <Grid
          columns={{ xl: '5', lg: '4', md: '3', sm: '2', xs: '1' }}
          gap="5"
          px="4"
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Grid>
      </Flex>
      <div className="flex self-center justify-center mt-4">
        <Pagination total={10} initialPage={1} />
      </div>
    </main>
  )
}
