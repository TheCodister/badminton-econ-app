import { ProductItem } from '@/types/schema/schema'
import { Button } from '@heroui/button'
import { Image } from '@heroui/image'

const CartCard = ({
  product,
  quantity,
}: {
  product: ProductItem
  quantity: number
}) => {
  // if (isLoading)
  //   return (
  //     <Skeleton className="min-w-fit xl:w-[700px] md:w-[500px] sm:w-96 h-32 rounded-lg" />
  //   )
  // if (error) return <p>Failed to load product</p>

  return (
    <div className="flex items-center container w-fit border-b-2 pb-4">
      <div className="flex items-center gap-4 min-w-fit xl:w-[700px] md:w-[500px] sm:w-96">
        <div>
          <Image
            src={product.image_url || '/fallback-image.png'}
            alt={product.product_name || 'Product'}
            width={120}
            height={120}
          />
        </div>
        <div>
          <h5>{product.product_name || 'Unknown Product'}</h5>
          <p>Price: ${product.price || 'N/A'}</p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
      <Button color="danger">Remove</Button>
    </div>
  )
}

export default CartCard
