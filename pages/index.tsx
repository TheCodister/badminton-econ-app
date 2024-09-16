import ProductCard from '@/components/card/card'
import DefaultLayout from '@/layouts/default'
import { Grid } from '@radix-ui/themes'
export default function IndexPage() {
  return (
    <DefaultLayout>
      <Grid
        columns={{ xl: '5', lg: '4', md: '3', sm: '2', xs: '1' }}
        gap="5"
        p="4"
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
    </DefaultLayout>
  )
}
