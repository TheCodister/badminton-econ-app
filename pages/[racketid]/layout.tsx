import { Divider } from '@nextui-org/divider'
import { Skeleton } from '@nextui-org/skeleton'
import { Flex } from '@radix-ui/themes'
export default function ProductDetailLayout() {
  return (
    <Flex gap="9">
      {/* Image Skeleton */}
      <Flex direction="column" gap="5">
        <Skeleton className="rounded-lg">
          <div className="w-[300px] h-[400px] bg-default-300 object-cover"></div>
        </Skeleton>
        <Skeleton>
          <div className="w-[300px] h-6 bg-default-300"></div>
        </Skeleton>
        <Skeleton>
          <div className="w-[300px] h-6 bg-default-300"></div>
        </Skeleton>
        <Skeleton>
          <div className="w-[300px] h-6 bg-default-300"></div>
        </Skeleton>
      </Flex>

      <Divider orientation="vertical" className="h-auto" />

      <Flex direction="column" gap="2" className="w-full">
        {/* Title Skeleton */}
        <Skeleton className="rounded-lg w-full">
          <div className="w-[250px] h-14 bg-default-300"></div>
        </Skeleton>

        <Divider />

        {/* Metadata Skeleton */}
        <Flex gap="5">
          <Skeleton className="w-2/4 rounded-lg">
            <div className="h-6 bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-2/4 rounded-lg">
            <div className="h-6 bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-6 bg-default-300"></div>
          </Skeleton>
        </Flex>

        {/* Price Skeleton */}
        <Skeleton className="w-2/4 rounded-lg">
          <div className="h-12 bg-default-300"></div>
        </Skeleton>

        {/* Details Skeleton */}
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-4/5 rounded-lg">
              <div className="h-6 bg-default-300"></div>
            </Skeleton>
          ))}
        </ul>

        {/* Description Skeleton */}
        <Skeleton className="rounded-lg">
          <div className="w-96 h-16 bg-default-300"></div>
        </Skeleton>
      </Flex>
    </Flex>
  )
}
