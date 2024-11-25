import ProductCard from '@/components/card/ProductCard'
import NavButton from '@/components/navbutton/navbutton'
import { Racket } from '@/types/schema/schema'
import { Flex, Grid } from '@radix-ui/themes'
import { useState } from 'react'

interface FeaturedProductProps {
  title: string
  products: Racket[]
}

const FeaturedProduct = ({ title, products }: FeaturedProductProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4 // Set maximum items to show per page

  const paginatedProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  )

  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage)
    }
  }

  const handlePrevious = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage)
    }
  }

  return (
    <Flex direction="column" gap="5" className="bg-gray-300 rounded-xl pb-5">
      <section className="bg-primary w-fit ml-16 text-white px-5 py-3 rounded-b-xl">
        <h4>{title}</h4>
      </section>
      <Flex gap="5" px="4" height="full" align="center">
        <NavButton onClick={handlePrevious} disabled={currentIndex === 0} />
        <Grid
          columns={{ initial: '1', sm: '3', lg: '4' }}
          gap="4"
          className="w-full"
        >
          {paginatedProducts.map((product) => (
            <ProductCard key={product.product_id} data={product} />
          ))}
        </Grid>
        <NavButton
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= products.length}
          reverse
        />
      </Flex>
    </Flex>
  )
}

export default FeaturedProduct
