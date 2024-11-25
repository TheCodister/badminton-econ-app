import useGetRacketbyId from '@/hooks/useGetRacketbyId'
import { Image } from '@nextui-org/image'
import { Badge, Flex, Grid } from '@radix-ui/themes'
import { useRouter } from 'next/router'

const ProductDetail = () => {
  const router = useRouter()
  const { racketid } = router.query
  const { data, error, isLoading } = useGetRacketbyId(racketid as string)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {isLoading && (
        <div className="text-center text-lg font-medium">Loading...</div>
      )}
      {error && (
        <div className="text-center text-lg font-medium text-red-500">
          Error fetching product data
        </div>
      )}
      {data && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <Flex direction="column" gap="6">
            {/* Header Section */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                {data.product_name}
              </h1>
              <p className="text-sm text-gray-600">
                Brand: <span className="font-semibold">{data.brand}</span>
              </p>
            </div>

            {/* Image and Details */}
            <Grid columns="2" gap="6" className="items-start">
              {/* Product Image */}
              <div className="rounded-lg overflow-hidden">
                <Image
                  alt="Product Image"
                  src={data.image_url}
                  width="100%"
                  height="auto"
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col gap-4">
                <p className="text-lg text-gray-700">
                  <strong>Price:</strong> ${data.price}
                </p>
                <p className="text-gray-600">
                  <strong>Description:</strong> {data.description}
                </p>
                <p className="text-gray-600">
                  <strong>Stock:</strong> {data.stock}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong>{' '}
                  <Badge color={data.status === 'available' ? 'green' : 'red'}>
                    {data.status.toUpperCase()}
                  </Badge>
                </p>
                <p className="text-gray-600">
                  <strong>Sales:</strong> {data.sales ? 'Yes' : 'No'}
                </p>
                <p className="text-gray-600">
                  <strong>Available Locations:</strong>{' '}
                  {data.available_location.join(', ')}
                </p>
              </div>
            </Grid>

            {/* Additional Specs */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-800">
                Specifications
              </h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>
                  <strong>Line:</strong> {data.line}
                </li>
                <li>
                  <strong>Stiffness:</strong> {data.stiffness}
                </li>
                <li>
                  <strong>Weight:</strong> {data.weight}
                </li>
                <li>
                  <strong>Balance:</strong> {data.balance}
                </li>
                <li>
                  <strong>Max Tension:</strong> {data.max_tension}
                </li>
                <li>
                  <strong>Length:</strong> {data.length} mm
                </li>
                <li>
                  <strong>Technology:</strong> {data.technology.join(', ')}
                </li>
              </ul>
            </div>
          </Flex>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
