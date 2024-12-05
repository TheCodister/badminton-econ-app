import { Racket } from '@/types/schema/schema'
import {
  BalanceConverter,
  StiffnessConverter,
  WeightConverter,
} from '@/utils/Converter'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
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

  return (
    <Card className="w-[250px] h-full flex flex-col items-center justify-center cursor-pointer">
      <CardHeader>
        <h6 className="text-danger-600">{data.product_name}</h6>
      </CardHeader>
      <CardBody className="gap-2 pb-0 h-min">
        <div className="w-full h-[300px] flex justify-center items-center overflow-hidden">
          <Image
            src={data.image_url}
            alt={data.product_name}
            className="w-full h-full object-cover"
          />
        </div>
        <Dropdown type="listbox">
          <DropdownTrigger>
            <Button color="default" radius="full">
              Specs
            </Button>
          </DropdownTrigger>
          {isRacket(data) && (
            <DropdownMenu
              aria-label="Static Actions"
              autoFocus
              className="text-black"
            >
              <DropdownItem>
                {data.balance && (
                  <Progress
                    label={`Balance: ${data.balance}`}
                    color="primary"
                    size="sm"
                    value={BalanceConverter(data.balance)} // Placeholder value, customize as needed
                  />
                )}
              </DropdownItem>
              <DropdownItem>
                {data.stiffness && (
                  <Progress
                    label={`Stiffness: ${data.stiffness}`}
                    color="success"
                    size="sm"
                    value={StiffnessConverter(data.stiffness)} // Placeholder value, customize as needed
                  />
                )}
              </DropdownItem>
              <DropdownItem>
                {data.weight && (
                  <Progress
                    label={`Weight: ${data.weight}`}
                    color="danger"
                    size="sm"
                    value={WeightConverter(data.weight)} // Placeholder value, customize as needed
                  />
                )}
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
        <h4 className="text-primary font-medium mt-2">${data.price}</h4>
      </CardBody>
      <CardFooter className="flex justify-center w-full">
        <Link href={`/${data.product_id}`} className="w-full pt-0">
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
}

export default ProductCard
