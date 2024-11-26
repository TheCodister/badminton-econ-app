import useGetRacketbyId from '@/hooks/useGetRacketbyId'
import {
  BalanceConverter,
  StiffnessConverter,
  WeightConverter,
} from '@/utils/Converter'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'
import { Progress } from '@nextui-org/progress'
import { Badge, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/router'

const ProductDetail = () => {
  const router = useRouter()
  const { racketid } = router.query
  const { data, error, isLoading } = useGetRacketbyId(racketid as string)

  return (
    <div className="p-6 min-h-screen">
      {isLoading && (
        <div className="text-center text-lg font-medium">Loading...</div>
      )}
      {error && (
        <div className="text-center text-lg font-medium text-red-500">
          Error fetching product data
        </div>
      )}
      {data && (
        <Flex gap="9">
          <Flex direction="column">
            <div className="w-[350px] h-full flex justify-center items-center overflow-hidden">
              <Image
                src={data.image_url}
                alt={data.product_name}
                className="w-full h-full object-cover"
              />
            </div>
            <Progress
              label={`Balance: ${data.balance}`}
              color="primary"
              size="md"
              value={BalanceConverter(data.balance)} // Placeholder value, customize as needed
            />
            <Progress
              label={`Stiffness: ${data.stiffness}`}
              color="success"
              size="md"
              value={StiffnessConverter(data.stiffness)} // Placeholder value, customize as needed
            />
            <Progress
              label={`Weight: ${data.weight}`}
              color="danger"
              size="md"
              value={WeightConverter(data.weight)} // Placeholder value, customize as needed
            />
          </Flex>
          <Divider orientation="vertical" className="h-auto" />
          <Flex direction="column" gap="2">
            <h1 className="text-2xl font-medium">{data.product_name}</h1>
            <Divider />
            <Flex gap="5">
              <h6>In stock: {data.stock}</h6>
              <h6>Brand: {data.brand}</h6>
              <h6>
                Status:{' '}
                <Badge color={data.status === 'available' ? 'green' : 'red'}>
                  {data.status.toUpperCase()}
                </Badge>
              </h6>
            </Flex>
            <h2 className="text-danger-500">${data.price}</h2>
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
                {data.available_location.join(', ')}
              </li>
            </ul>
            <h5>Desciption</h5>
            <h6>{data.description}</h6>
          </Flex>
        </Flex>
      )}
    </div>
  )
}

export default ProductDetail
