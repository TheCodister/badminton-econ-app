import AddToCartButton from '@/components/button/AddToCartButton'
import useGetRacketbyId from '@/hooks/useGetRacketbyId'
import {
  BalanceConverter,
  StiffnessConverter,
  WeightConverter,
} from '@/utils/Converter'
import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Divider } from '@heroui/divider'
import { Image } from '@heroui/image'
import { Progress } from '@heroui/progress'
import { addToast } from '@heroui/react'
import { Skeleton } from '@heroui/skeleton'
import { Heart, Share2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ProductDetail = () => {
  const router = useRouter()
  const { racketid } = router.query

  if (!router.isReady) return <ProductDetailSkeleton /> // Ensure query params are available

  const { data, error, isFetching } = useGetRacketbyId(racketid as string)

  const [isCopied, setIsCopied] = useState(false)

  const handleShare = () => {
    const link = `${window.location.origin}/racket/${racketid}`
    addToast({
      title: 'Link copied to clipboard!',
      color: 'success',
    })
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true)
    })
  }
  return (
    <div className="p-6 bg-gray-100 rounded-lg xl:w-11/12 lg:w-11/12 md:w-full sm:w-full mx-auto">
      {error && (
        <div className="text-center text-lg font-medium text-red-500">
          Error fetching product data
        </div>
      )}
      {isFetching && <ProductDetailSkeleton />}
      {data && (
        <div>
          <div className="flex flex-col xl:flex-row lg:flex-row md:flex-col sm:flex-col gap-9">
            <div className="flex flex-col items-center gap-1">
              <div className="w-[350px] h-full flex justify-center items-center overflow-hidden">
                <Image
                  src={data.product.image_url}
                  alt={data.product.product_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <Divider orientation="vertical" className="h-auto" />
            <div className="flex flex-col gap-2">
              <h1 className="font-medium">{data.product.product_name}</h1>
              <div className="flex gap-5">
                <h6>In stock: {data.product.stock}</h6>
                <Divider orientation="vertical" />
                <h6>Brand: {data.product.brand}</h6>
                <Divider orientation="vertical" />
                <h6>
                  Status:{' '}
                  <Chip
                    variant="flat"
                    color={
                      data.product.status === 'AVAILABLE' ? 'success' : 'danger'
                    }
                  >
                    {data.product.status}
                  </Chip>
                </h6>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-xl">★★★★★</span>
                <span>(5.0)</span>
              </div>
              <h2 className="text-danger-500">${data.product.price}</h2>
              <h6>{data.product.description}</h6>
              <h5>Playing Style</h5>
              <div className="flex gap-2">
                {['Jack of all Trades', 'Counter, Defense', 'Attack'].map(
                  (style) => (
                    <Chip
                      key={style}
                      color={
                        data.playing_style === style
                          ? style === 'Jack of all Trades'
                            ? 'secondary'
                            : style === 'Counter, Defense'
                              ? 'primary'
                              : style === 'Attack'
                                ? 'danger'
                                : 'default'
                          : undefined // No color for chips that don't match
                      }
                      variant={
                        data.playing_style === style ? 'solid' : 'bordered'
                      } // Solid for matching chips, bordered for others
                    >
                      {style}
                    </Chip>
                  ),
                )}
              </div>
              <h5>Suitable for</h5>
              <div className="flex gap-2">
                {['Newbie', 'Medium', 'Good'].map((level) => (
                  <Chip
                    key={level}
                    color={
                      data.player_level === level
                        ? level === 'Newbie'
                          ? 'success'
                          : level === 'Medium'
                            ? 'secondary'
                            : level === 'Good'
                              ? 'danger'
                              : 'default'
                        : undefined // No color for chips that don't match
                    }
                    variant={data.player_level === level ? 'solid' : 'bordered'} // Solid for matching chips, bordered for others
                  >
                    {level}
                  </Chip>
                ))}
              </div>
              <div className="flex gap-3 w-full mt-5 items-center">
                <AddToCartButton racketId={data.product.id} />
                <Button isIconOnly size="lg" variant="bordered">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  isIconOnly
                  size="lg"
                  variant="bordered"
                  onPress={() => handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <h2>Feature & Specs</h2>
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 justify-between gap-8 mt-6">
            <div className="flex flex-col font-semibold w-full">
              <Progress
                label={`Balance: ${data.balance}`}
                color="primary"
                size="md"
                value={BalanceConverter(data.balance)} // Customize as needed
              />
              <Progress
                label={`Stiffness: ${data.stiffness}`}
                color="success"
                size="md"
                value={StiffnessConverter(data.stiffness)} // Customize as needed
              />
              <Progress
                label={`Weight: ${data.weight}`}
                color="danger"
                size="md"
                value={WeightConverter(data.weight)} // Customize as needed
              />
            </div>
            <ul className="space-y-2">
              <li>
                <strong>Line:</strong> {data.line}
              </li>
              <li>
                <strong>Max Tension:</strong> {data.max_tension}
              </li>
              <li>
                <strong>Length:</strong> {data.length}mm
              </li>
              <li>
                <strong>Technology:</strong> {data.technology.join(', ')}
              </li>
              <li>
                <strong>Available at</strong>{' '}
                {data.product.available_location.join(', ')}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="flex gap-9">
      {/* Image Skeleton */}
      <div className="flex flex-col gap-5">
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
      </div>

      <Divider orientation="vertical" className="h-auto" />

      <div className="flex flex-col gap-2 w-full">
        {/* Title Skeleton */}
        <Skeleton className="rounded-lg w-full">
          <div className="w-[250px] h-14 bg-default-300"></div>
        </Skeleton>

        <Divider />

        {/* Metadata Skeleton */}
        <div className="flex gap-5">
          <Skeleton className="w-2/4 rounded-lg">
            <div className="h-6 bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-2/4 rounded-lg">
            <div className="h-6 bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-6 bg-default-300"></div>
          </Skeleton>
        </div>

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
      </div>
    </div>
  )
}

export default ProductDetail
