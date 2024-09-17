import ProductCard from '@/components/card/card'
import DefaultLayout from '@/layouts/default'
import { Grid } from '@radix-ui/themes'
import { Pagination, PaginationItem } from '@nextui-org/react'
export default function IndexPage() {
  return (
    <DefaultLayout>
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
      <div>
        <Pagination className="ml-2 mt-4" total={10} initialPage={1} />
      </div>
    </DefaultLayout>
  )
}
