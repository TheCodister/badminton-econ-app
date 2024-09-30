import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Progress } from '@nextui-org/progress'

interface RacketData {
  name: string
  brand: string
  image: string
  weight?: string
  balance?: string
  stiffness?: string
  price: number
}

interface ShoeShuttlecockData {
  name: string
  brand: string
  image: string
  price: number
}

type ProductData = RacketData | ShoeShuttlecockData

interface ProductCardProps {
  data: ProductData
}

const ProductCard = ({ data }: ProductCardProps) => {
  const isRacket = (product: ProductData): product is RacketData => {
    return (product as RacketData).balance !== undefined
  }

  return (
    <Card
      isHoverable
      isPressable
      className="w-[250px] h-full flex flex-col items-center justify-center cursor-pointer"
    >
      <CardHeader>
        <h6>{data.name}</h6>
      </CardHeader>
      <CardBody className="gap-2">
        <Image src={data.image} alt={data.name} width="300" height="300" />

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
