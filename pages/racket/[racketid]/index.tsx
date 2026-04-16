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
    <div className="p-6 bg-content1 rounded-lg xl:w-11/12 lg:w-11/12 md:w-full sm:w-full mx-auto min-h-[600px]">
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
    <div className="p-6 bg-content1 rounded-lg xl:w-11/12 lg:w-11/12 md:w-full sm:w-full mx-auto min-h-[600px]">
      <div className="flex flex-col xl:flex-row lg:flex-row md:flex-col sm:flex-col gap-9">
        {/* Image */}
        <div className="flex flex-col items-center shrink-0">
          <Skeleton className="rounded-lg w-[350px] h-[420px]" />
        </div>

        <Divider orientation="vertical" className="h-auto hidden xl:block lg:block" />

        {/* Info column */}
        <div className="flex flex-col gap-3 flex-1">
          {/* Product name — h1 */}
          <Skeleton className="rounded-lg w-3/4 h-10" />

          {/* Stock / Brand / Status row */}
          <div className="flex gap-5 items-center">
            <Skeleton className="rounded-lg w-24 h-5" />
            <Skeleton className="rounded-lg w-24 h-5" />
            <Skeleton className="rounded-full w-28 h-7" />
          </div>

          {/* Star rating */}
          <Skeleton className="rounded-lg w-36 h-5" />

          {/* Price — h2 */}
          <Skeleton className="rounded-lg w-28 h-9" />

          {/* Description — 2 lines */}
          <Skeleton className="rounded-lg w-full h-4" />
          <Skeleton className="rounded-lg w-4/5 h-4" />

          {/* Playing Style label + chips */}
          <Skeleton className="rounded-lg w-32 h-6" />
          <div className="flex gap-2">
            <Skeleton className="rounded-full w-36 h-7" />
            <Skeleton className="rounded-full w-36 h-7" />
            <Skeleton className="rounded-full w-20 h-7" />
          </div>

          {/* Suitable for label + chips */}
          <Skeleton className="rounded-lg w-28 h-6" />
          <div className="flex gap-2">
            <Skeleton className="rounded-full w-20 h-7" />
            <Skeleton className="rounded-full w-20 h-7" />
            <Skeleton className="rounded-full w-20 h-7" />
          </div>

          {/* Action buttons: Add to Cart (flex-1) + 2 icon buttons */}
          <div className="flex gap-3 mt-5 items-center">
            <Skeleton className="rounded-xl flex-1 h-12" />
            <Skeleton className="rounded-xl w-12 h-12 shrink-0" />
            <Skeleton className="rounded-xl w-12 h-12 shrink-0" />
          </div>
        </div>
      </div>

      {/* Feature & Specs heading */}
      <Skeleton className="rounded-lg w-48 h-9 mt-8 mb-2" />

      {/* Specs grid */}
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-8 mt-6">
        {/* Progress bars */}
        <div className="flex flex-col gap-5">
          {(['w-24', 'w-28', 'w-20'] as const).map((labelW, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className={`rounded-lg ${labelW} h-4`} />
              <Skeleton className="rounded-full w-full h-3" />
            </div>
          ))}
        </div>

        {/* Spec list */}
        <ul className="space-y-3">
          {(['w-2/5', 'w-3/5', 'w-2/5', 'w-4/5', 'w-3/5'] as const).map((w, i) => (
            <Skeleton key={i} className={`rounded-lg ${w} h-5`} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProductDetail
