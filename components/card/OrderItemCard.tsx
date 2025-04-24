import { ProductItem } from '@/types/schema/schema'
import { Image } from '@heroui/image'

const OrderCard = ({
  product,
  quantity,
}: {
  product: ProductItem
  quantity: number
}) => {
  return (
    <div className="flex flex-col gap-4 bg-slate-200 h-fit p-4 rounded-xl">
      <div className="flex gap-4 items-center">
        <Image
          src={product.image_url}
          alt={product.product_name}
          width={100}
          height={100}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h4>{product.product_name}</h4>
          <p>Quantity: {quantity}</p>
          <p>Price: ${product.price}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
