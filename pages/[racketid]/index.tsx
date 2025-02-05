import useGetRacketbyId from '@/hooks/useGetRacketbyId'
import {
  BalanceConverter,
  StiffnessConverter,
  WeightConverter,
} from '@/utils/Converter'
import { Button } from '@nextui-org/button'
import { Chip } from '@nextui-org/chip'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'
import { Progress } from '@nextui-org/progress'
import { Flex } from '@radix-ui/themes'
import { useRouter } from 'next/router'
import ProductDetailLayout from './layout'

const ProductDetail = () => {
  const router = useRouter()
  const { racketid } = router.query

  if (!router.isReady) return <ProductDetailLayout /> // Ensure query params are available

  const { data, error, isFetching } = useGetRacketbyId(racketid as string)

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      {error && (
        <div className="text-center text-lg font-medium text-red-500">
          Error fetching product data
        </div>
      )}
      {isFetching && <ProductDetailLayout />}
      {data && (
        <Flex gap="9">
          <Flex direction="column">
            <div className="w-[350px] h-full flex justify-center items-center overflow-hidden">
              <Image
                src={data.product.image_url}
                alt={data.product.product_name}
                className="w-full h-full object-cover"
              />
            </div>
            <Progress
              label={`Balance: ${data.balance}`}
              color="primary"
              size="md"
              value={BalanceConverter(data.balance)} // Customize as needed
            />
            <Progress
              label={`Stiffness: ${data.stiffness}`}
              color="success"
              size="md"
              value={StiffnessConverter(data.stiffness)} // Customize as needed
            />
            <Progress
              label={`Weight: ${data.weight}`}
              color="danger"
              size="md"
              value={WeightConverter(data.weight)} // Customize as needed
            />
          </Flex>
          <Divider orientation="vertical" className="h-auto" />
          <Flex direction="column" gap="2">
            <h1 className="text-2xl font-medium">
              {data.product.product_name}
            </h1>
            <Divider />
            <Flex gap="5">
              <h6>In stock: {data.product.stock}</h6>
              <h6>Brand: {data.product.brand}</h6>
              <h6>
                Status:{' '}
                <Chip
                  variant="flat"
                  color={
                    data.product.status === 'AVAILABLE' ? 'success' : 'danger'
                  }
                >
                  {data.product.status}
                </Chip>
              </h6>
            </Flex>
            <h2 className="text-danger-500">${data.product.price}</h2>
            <ul className="space-y-2">
              <li>
                <strong>Line:</strong> {data.line}
              </li>
              <li>
                <strong>Max Tension:</strong> {data.max_tension}
              </li>
              <li>
                <strong>Length:</strong> {data.length}mm
              </li>
              <li>
                <strong>Technology:</strong> {data.technology.join(', ')}
              </li>
              <li>
                <strong>Available at</strong>{' '}
                {data.product.available_location.join(', ')}
              </li>
            </ul>
            <h5>Description</h5>
            <h6>{data.product.description}</h6>
            <Flex gap="5" className="w-full mt-5">
              <Button
                size="lg"
                className="w-full"
                color="default"
                variant="bordered"
                radius="full"
              >
                Add to cart
              </Button>
              <Button
                size="lg"
                className="w-full"
                color="primary"
                radius="full"
              >
                Buy now
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </div>
  )
}

export default ProductDetail
