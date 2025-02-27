import ProductCard from '@/components/card/ProductCard'
import Sidebar from '@/components/sidebar/SideBar'
import { PRICEOPTION } from '@/constants/priceoptions'
import useGetRacket from '@/hooks/useGetRacket'
import { Racket } from '@/types/schema/schema'
import { Divider } from '@heroui/divider'
import { Pagination } from '@heroui/pagination'
import { Select, SelectItem } from '@heroui/select'
import { Skeleton } from '@heroui/skeleton'
import { Flex, Grid } from '@radix-ui/themes'
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
      <Flex direction="column" gap="4">
        <Select className="max-w-xs self-end" label="Sort by" size="sm">
          {PRICEOPTION.map((option) => (
            <SelectItem className="text-black" key={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
        <Flex>
          <Sidebar />
          <Grid
            columns={{ xl: '5', lg: '4', md: '3', sm: '2', xs: '1' }}
            gap="5"
            px="4"
          >
            {data.length > 0 ? (
              data.map((data: Racket) => (
                <ProductCard key={data.id} data={data} />
              ))
            ) : (
              <div className="text-center text-lg font-medium text-red-500 w-full">
                No rackets found
              </div>
            )}
          </Grid>
        </Flex>
      </Flex>
      <div className="flex self-center justify-center mt-4">
        <Pagination total={10} initialPage={1} />
      </div>
    </main>
  )
}

export function RacketPageSkeleton() {
  return (
    <main>
      <Flex direction="column" gap="4">
        <Skeleton className="rounded-lg w-60 h-12 self-end" />
        <Flex>
          <Skeleton className="w-44 h-[500px] rounded-lg" />
          <Divider orientation="vertical" className="ml-2 h-[500px] w-[2px]" />
          <Grid
            columns={{ xl: '5', lg: '4', md: '3', sm: '2', xs: '1' }}
            gap="5"
            px="4"
          >
            <Skeleton className="w-56 h-[500px] rounded-lg" />
            <Skeleton className="w-56 h-[500px] rounded-lg" />
            <Skeleton className="w-56 h-[500px] rounded-lg" />
            <Skeleton className="w-56 h-[500px] rounded-lg" />
            <Skeleton className="w-56 h-[500px] rounded-lg" />
          </Grid>
        </Flex>
      </Flex>
    </main>
  )
}

export default IndexPage
