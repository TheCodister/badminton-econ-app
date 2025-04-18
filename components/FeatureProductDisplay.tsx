import ProductCard from '@/components/card/ProductCard'
import NavButton from '@/components/navbutton/navbutton'
import { SCREEN_WIDTH } from '@/constants/screen-width'
import { Racket } from '@/types/schema/schema'
import { useEffect, useState } from 'react'

interface FeaturedProductProps {
  title: string
  products: Racket[]
}

const FeaturedProduct = ({ title, products }: FeaturedProductProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(4) // Default value for 2xl or xl screens

  // Adjust items per page based on screen width
  const handleResize = () => {
    const width = window.innerWidth
    if (width >= SCREEN_WIDTH.xxl)
      setItemsPerPage(4) // 2xl
    else if (width >= SCREEN_WIDTH.xl)
      setItemsPerPage(4) // xl
    else if (width >= SCREEN_WIDTH.lg)
      setItemsPerPage(3) // lg
    else if (width >= SCREEN_WIDTH.md)
      setItemsPerPage(1) // md
    else setItemsPerPage(1) // sm
  }

  useEffect(() => {
    // Initial setup
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    <div className="bg-gray-300 rounded-xl pb-5 flex flex-col gap-5">
      <section className="bg-primary w-fit ml-16 text-white px-5 py-3 rounded-b-xl">
        <h4>{title}</h4>
      </section>
      <div className="flex items-center gap-5 px-4 h-full">
        <NavButton onClick={handlePrevious} disabled={currentIndex === 0} />
        <div className="grid w-full gap-4 grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 items-center">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
        <NavButton
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= products.length}
          reverse
        />
      </div>
    </div>
  )
}

export default FeaturedProduct
