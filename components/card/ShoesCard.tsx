import { Shoes } from '@/types/schema/schema'
import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Chip } from '@heroui/chip'
import { Image } from '@heroui/image'
import { useRouter } from 'next/router'
import { memo } from 'react'

interface ProductCardProps {
  data: Shoes
}

const ShoesCard = memo(({ data }: ProductCardProps) => {
  const router = useRouter()
  const handleViewDetails = () => {
    router.push(`/shoes/${data.id}`)
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
          <p className="font-semibold">Shoes</p>
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
        <Button
          className="w-full"
          color="primary"
          variant="bordered"
          radius="full"
          onPress={handleViewDetails}
        >
          <h6>View details</h6>
        </Button>
      </CardFooter>
    </Card>
  )
})

export default ShoesCard
