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
    return 'Balance' in data
  }
  console.log(data)
  return (
    <Card
      isHoverable
      isPressable
      className="w-[250px] h-full flex flex-col items-center justify-center cursor-pointer"
    >
      <CardHeader>
        <h6>{data.ProductName}</h6>
      </CardHeader>
      <CardBody className="gap-2">
        <Image
          src={data.ImageUrl}
          alt={data.ProductName}
          width="300"
          height="300"
        />

        {isRacket(data) && (
          <>
            {data.Balance && (
              <Progress
                label={`Balance: ${data.Balance}`}
                color="default"
                size="sm"
                value={70} // Placeholder value, customize as needed
              />
            )}
            {data.Stiffness && (
              <Progress
                label={`Stiffness: ${data.Stiffness}`}
                color="primary"
                size="sm"
                value={50} // Placeholder value, customize as needed
              />
            )}
            {data.Weight && (
              <Progress
                label={`Weight: ${data.Weight}`}
                color="secondary"
                size="sm"
                value={60} // Placeholder value, customize as needed
              />
            )}
          </>
        )}
      </CardBody>
      <CardFooter>
        <h6 className="text-blue-700">Price: ${data.Price}</h6>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
