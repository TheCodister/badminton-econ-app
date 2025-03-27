import ProductCard from '@/components/card/ProductCard'
import Sidebar from '@/components/sidebar/SideBar'
import { PRICEOPTION } from '@/constants/priceoptions'
import useGetRacket from '@/hooks/useGetRacket'
import { Racket } from '@/types/schema/schema'
import { Divider } from '@heroui/divider'
import { Pagination } from '@heroui/pagination'
import { Select, SelectItem } from '@heroui/select'
import { Skeleton } from '@heroui/skeleton'
import Head from 'next/head'
import { useRouter } from 'next/router'

const IndexPage = () => {
  const router = useRouter()
  const filters = router.query

  const { data, error, isLoading } = useGetRacket(filters)

  if (error) return <div>Error fetching rackets</div>
  if (isLoading) return <RacketPageSkeleton />

  return (
    <main>
      <Head>
        <title>Racket</title>
      </Head>
      <div className="flex flex-col gap-4">
        <Select className="max-w-xs self-end" label="Sort by" size="sm">
          {PRICEOPTION.map((option) => (
            <SelectItem className="text-black" key={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
        <div className="flex">
          <Sidebar />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-4">
            {data.length > 0 ? (
              data.map((racket: Racket) => (
                <ProductCard key={racket.id} data={racket} />
              ))
            ) : (
              <div className="text-center text-lg font-medium text-red-500 w-full">
                No rackets found
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex self-center justify-center mt-4">
        <Pagination total={10} initialPage={1} />
      </div>
    </main>
  )
}

export function RacketPageSkeleton() {
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
