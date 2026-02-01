import AddToCartButton from '@/components/button/AddToCartButton'
import useGetShoesbyId from '@/hooks/useGetShoesbyId'
import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Divider } from '@heroui/divider'
import { Image } from '@heroui/image'
import { addToast } from '@heroui/react'
import { Skeleton } from '@heroui/skeleton'
import { Heart, Share2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ProductDetail = () => {
  const router = useRouter()
  const { shoesid } = router.query

  if (!router.isReady) return <ProductDetailSkeleton /> // Ensure query params are available

  const { data, error, isFetching } = useGetShoesbyId(shoesid as string)

  const [isCopied, setIsCopied] = useState(false)

  const handleShare = () => {
    const link = `${window.location.origin}/shoes/${shoesid}`
    addToast({
      title: 'Link copied to clipboard!',
      color: 'success',
    })
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true)
    })
  }

  // Helper function to safely parse JSON arrays
  const parseJsonArray = (jsonData: any): string[] => {
    if (Array.isArray(jsonData)) {
      return jsonData
    }
    if (typeof jsonData === 'string') {
      try {
        const parsed = JSON.parse(jsonData)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return []
  }

  const colors = parseJsonArray(data?.color)
  const availableSizes = parseJsonArray(data?.available_size)
  const technologies = parseJsonArray(data?.technology)

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
              {colors.length > 0 && (
                <>
                  <h5>Available Colors</h5>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map((color: string) => (
                      <Chip key={color} variant="bordered" color="primary">
                        {color}
                      </Chip>
                    ))}
                  </div>
                </>
              )}
              {availableSizes.length > 0 && (
                <>
                  <h5>Available Sizes</h5>
                  <div className="flex gap-2 flex-wrap">
                    {availableSizes.map((size: string) => (
                      <Chip key={size} variant="bordered" color="secondary">
                        {size}
                      </Chip>
                    ))}
                  </div>
                </>
              )}
              <div className="flex gap-3 w-full mt-5 items-center">
                <AddToCartButton racketId={data.product.id} />
                <Button isIconOnly size="lg" variant="bordered">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  isIconOnly
                  size="lg"
                  variant="bordered"
                  onPress={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <h2>Feature & Specs</h2>
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 justify-between gap-8 mt-6">
            <div className="flex flex-col font-semibold w-full">
              {technologies.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-bold mb-2">Technology</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {technologies.map((tech: string, index: number) => (
                      <li key={index} className="text-sm">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <ul className="space-y-2">
              {colors.length > 0 && (
                <li>
                  <strong>Colors:</strong> {colors.join(', ')}
                </li>
              )}
              {availableSizes.length > 0 && (
                <li>
                  <strong>Available Sizes:</strong> {availableSizes.join(', ')}
                </li>
              )}
              <li>
                <strong>Available at</strong>{' '}
                {typeof data.product.available_location === 'object' &&
                data.product.available_location.locations
                  ? data.product.available_location.locations.join(', ')
                  : Array.isArray(data.product.available_location)
                    ? data.product.available_location.join(', ')
                    : 'Multiple locations'}
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
