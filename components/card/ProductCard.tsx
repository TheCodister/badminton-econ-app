import { Racket } from '@/types/schema/schema'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'
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
    <Link href={`/${data.product_id}`}>
      <Card
        isHoverable
        isPressable
        className="w-[250px] h-full flex flex-col items-center justify-center cursor-pointer"
      >
        <CardHeader>
          <h6>{data.product_name}</h6>
        </CardHeader>
        <CardBody className="gap-2">
          <div className="w-full h-[300px] flex justify-center items-center overflow-hidden">
            <Image
              src={data.image_url}
              alt={data.product_name}
              className="w-full h-full object-cover"
            />
          </div>

          {isRacket(data) && (
            <>
              {data.balance && (
                <Progress
                  label={`Balance: ${data.balance}`}
                  color="primary"
                  size="sm"
                  value={70} // Placeholder value, customize as needed
                />
              )}
              {data.stiffness && (
                <Progress
                  label={`Stiffness: ${data.stiffness}`}
                  color="success"
                  size="sm"
                  value={50} // Placeholder value, customize as needed
                />
              )}
              {data.weight && (
                <Progress
                  label={`Weight: ${data.weight}`}
                  color="danger"
                  size="sm"
                  value={60} // Placeholder value, customize as needed
                />
              )}
            </>
          )}
          <h4 className="text-primary font-medium mt-2">${data.price}</h4>
        </CardBody>
        <CardFooter className="flex justify-center gap-5">
          <Button color="default" variant="bordered" radius="full">
            Add to cart
          </Button>
          <Button color="primary" radius="full">
            Buy now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard
