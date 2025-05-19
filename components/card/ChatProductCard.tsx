import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { Image } from '@heroui/image'
import { Link } from '@heroui/link'
import { memo } from 'react'

interface ProductData {
  id: string
  product_name: string
  image_url: string
  price: number
}

interface ProductCardProps {
  data: ProductData
}

const ChatProductCard = memo(({ data }: ProductCardProps) => {
  return (
    <Card className="w-[250px] h-full flex flex-col items-center justify-center cursor-pointer">
      <CardHeader></CardHeader>
      <CardBody className="gap-2 pb-0 h-min">
        <div className="w-full h-[300px] flex justify-center items-center overflow-hidden">
          <Image
            src={data.image_url}
            alt={data.product_name}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-danger font-medium mt-2">${data.price}</h4>
        <h6 className="text-primary">{data.product_name}</h6>
      </CardBody>
      <CardFooter className="flex justify-center items-stretch flex-col gap-3">
        <Link isExternal href={`/${data.id}`} className="w-full pt-0">
          <Button
            className="w-full"
            color="primary"
            variant="bordered"
            radius="full"
          >
            View details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
})

export default ChatProductCard
