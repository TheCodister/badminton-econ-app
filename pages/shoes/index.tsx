import ShoesCard from '@/components/card/ShoesCard'
import Sidebar from '@/components/sidebar/SideBar'
import { PRICEOPTION } from '@/constants/priceoptions'
import useGetShoes from '@/hooks/useGetShoes'
import { Shoes } from '@/types/schema/schema'
import { Button } from '@heroui/button'
import { Divider } from '@heroui/divider'
import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from '@heroui/drawer'
import { Pagination } from '@heroui/pagination'
import { useDisclosure } from '@heroui/react'
import { Select, SelectItem } from '@heroui/select'
import { Skeleton } from '@heroui/skeleton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const IndexPage = () => {
  const router = useRouter()
  const currentPageFromUrl = parseInt(router.query.page as string, 10) || 1 // Get current page from URL
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl) // Initialize state from URL
  const limit = 20 // Number of items per page

  const filters = { ...router.query, limit, page: currentPage } // Add limit and page to filters
  const [priceFilter, setPriceFilter] = useState<string | undefined>(
    router.query.price as string,
  ) // State for price filter

  const { data, error, isLoading } = useGetShoes(filters)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const dataItems = data?.data

  const handlePageChange = (page: number) => {
    setCurrentPage(page) // Update current page state
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page }, // Update the page query parameter
      },
      undefined,
      { shallow: true }, // Avoid full page reload
    )
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top
  }

  const handlePriceChange = (value: string) => {
    setPriceFilter(value)
    setCurrentPage(1)
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: 1, price: value }, // Update the price and reset page to 1
      },
      undefined,
      { shallow: true }, // Avoid full page reload
    )
  }

  if (error) return <div>Error fetching shoes</div>
  if (isLoading) return <ShoesPageSkeleton />

  return (
    <main>
      <Head>
        <title>Shoes - Badminton</title>
      </Head>
      <Button
        onPress={onOpen}
        className="fixed z-50 bottom-4 right-4 xl:hidden lg:hidden md:hidden sm:block bg-primary text-white p-3 rounded-full shadow-lg"
      >
        Filter
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader>
                <h2 className="text-lg font-semibold">Filter</h2>
              </DrawerHeader>
              <DrawerBody>
                <Sidebar />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-bold">Badminton Shoes</h1>
          <h6 className="text-default-500">
            Browse our collection of professional badminton shoes
          </h6>
        </div>
        <Select
          className="max-w-xs xl:self-end lg:self-end md:self-end sm:self-center self-center"
          label="Sort by"
          labelPlacement="outside-left"
          size="sm"
          placeholder="Most Popular"
          value={priceFilter} // Bind the selected value
          onChange={(e) => handlePriceChange(e.target.value)} // Handle price filter change
        >
          {PRICEOPTION.map((option) => (
            <SelectItem
              className="text-black"
              key={option.key}
              value={option.key}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
        <div className="flex">
          <div className="hidden xl:block lg:block md:block sm:hidden">
            <Sidebar />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 px-4">
            {dataItems && dataItems.length > 0 ? (
              dataItems.map((shoe: Shoes) => (
                <ShoesCard key={shoe.id} data={shoe} />
              ))
            ) : (
              <div className="text-center text-lg font-medium text-red-500 w-full">
                No shoes found
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex self-center justify-center mt-4">
        <Pagination
          total={Math.ceil((data?.total || 0) / limit)}
          initialPage={1}
          page={currentPage}
          onChange={handlePageChange} // Handle page change
          size="md"
        />
      </div>
    </main>
  )
}

export function ShoesPageSkeleton() {
  return (
    <main>
      <div className="flex flex-col gap-4">
        <Skeleton className="rounded-lg w-60 h-12 self-end" />
        <div className="flex">
          <Skeleton className="w-44 h-[500px] rounded-lg" />
          <Divider orientation="vertical" className="ml-2 h-[500px] w-[2px]" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-4">
            <Skeleton className="w-56 h-[500px] rounded-lg" />
            <Skeleton className="w-56 h-[500px] rounded-lg" />
            <Skeleton className="w-56 h-[500px] rounded-lg" />
            <Skeleton className="w-56 h-[500px] rounded-lg" />
            <Skeleton className="w-56 h-[500px] rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default IndexPage
