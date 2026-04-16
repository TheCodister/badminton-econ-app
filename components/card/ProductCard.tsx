import { Racket } from '@/types/schema/schema'
import {
  BalanceConverter,
  StiffnessConverter,
  WeightConverter,
} from '@/utils/Converter'
import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Chip } from '@heroui/chip'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown'
import { Image } from '@heroui/image'
import { Progress } from '@heroui/progress'
import { useRouter } from 'next/router'
import { memo } from 'react'

type ProductData = Racket

interface ProductCardProps {
  data: Racket
}

const ProductCard = memo(({ data }: ProductCardProps) => {
  const isRacket = (data: ProductData): data is Racket => {
    return 'balance' in data
  }
  const router = useRouter()
  const handleViewDetails = () => {
    router.push(`/racket/${data.id}`)
  }

  return (
    <Card
      shadow="lg"
      className="xl:w-[250px] lg:w-[250px] md:w-[250px] sm:w-auto w-auto h-full flex flex-col items-center justify-center cursor-pointer"
    >
      <CardBody className="gap-2 pb-0 h-min">
        <Chip size="sm" color="danger">
          <p className="font-semibold ">Popular</p>
        </Chip>
        <div className="w-full h-[300px] flex justify-center items-center overflow-hidden">
          <Image
            src={data.product.image_url}
            alt={data.product.product_name}
            className="w-full h-full object-cover"
            onClick={handleViewDetails}
          />
        </div>
        <Chip size="sm" variant="bordered" className="font-bold">
          <p className="font-semibold">
            {isRacket(data) ? 'Racket' : 'Accessory'}
          </p>
        </Chip>
        <h6
          className="text-ellipsis overflow-hidden whitespace-nowrap"
          title={data.product.product_name} // Add a tooltip to show the full name on hover
        >
          {data.product.product_name}
        </h6>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">★★★★★</span>
          <span>(5.0)</span>
        </div>
        <h4 className="text-primary font-medium mt-2">${data.product.price}</h4>
      </CardBody>
      <CardFooter className="flex justify-center items-stretch flex-col gap-3">
        <Dropdown type="listbox">
          <DropdownTrigger>
            <Button color="primary" radius="lg">
              <h6>Specs</h6>
            </Button>
          </DropdownTrigger>
          {isRacket(data) && (
            <DropdownMenu
              aria-label="Static Actions"
              autoFocus
              className="text-foreground"
            >
              <DropdownItem key="balance">
                {data.balance && (
                  <Progress
                    label={`Balance: ${data.balance}`}
                    color="primary"
                    size="sm"
                    value={BalanceConverter(data.balance)} // Placeholder value, customize as needed
                  />
                )}
              </DropdownItem>
              <DropdownItem key="stiffness">
                {data.stiffness && (
                  <Progress
                    label={`Stiffness: ${data.stiffness}`}
                    color="success"
                    size="sm"
                    value={StiffnessConverter(data.stiffness)} // Placeholder value, customize as needed
                  />
                )}
              </DropdownItem>
              <DropdownItem key="weight">
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
        {/* <Button
          className="w-full"
          color="primary"
          variant="bordered"
          radius="full"
          onPress={handleViewDetails}
        >
          <h6>View details</h6>
        </Button> */}
      </CardFooter>
    </Card>
  )
})

export default ProductCard
