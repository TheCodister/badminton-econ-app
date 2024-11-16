import { Racket } from '@/types/schema/schema'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Progress } from '@nextui-org/progress'

type ProductData = Racket

interface ProductCardProps {
  data: Racket
}

const ProductCard = ({ data }: ProductCardProps) => {
  const isRacket = (data: ProductData): data is Racket => {
    return 'balance' in data
  }
  console.log(data)
  return (
    <Card
      isHoverable
      isPressable
      className="w-[250px] h-full flex flex-col items-center justify-center cursor-pointer"
    >
      <CardHeader>
        <h6>{data.product_name}</h6>
      </CardHeader>
      <CardBody className="gap-2">
        <Image
          src={data.image_url}
          alt={data.product_name}
          width="300"
          height="300"
        />

        {isRacket(data) && (
          <>
            {data.balance && (
              <Progress
                label={`Balance: ${data.balance}`}
                color="default"
                size="sm"
                value={70} // Placeholder value, customize as needed
              />
            )}
            {data.stiffness && (
              <Progress
                label={`Stiffness: ${data.stiffness}`}
                color="primary"
                size="sm"
                value={50} // Placeholder value, customize as needed
              />
            )}
            {data.weight && (
              <Progress
                label={`Weight: ${data.weight}`}
                color="secondary"
                size="sm"
                value={60} // Placeholder value, customize as needed
              />
            )}
          </>
        )}
      </CardBody>
      <CardFooter>
        <h6 className="text-blue-700">Price: ${data.price}</h6>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
