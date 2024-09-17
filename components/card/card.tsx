import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Progress,
} from '@nextui-org/react'
const ProductCard = () => {
  return (
    <Card
      isHoverable
      isPressable
      className="w-[250px] h-[500px] flex flex-col items-center justify-center cursor-pointer"
    >
      <CardHeader>
        <h6>Lining Halbertec 8000</h6>
      </CardHeader>
      <CardBody className="gap-2">
        <Image
          src="https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-lining-halbertec-8000-chinh-hang..webp"
          alt="card"
          width="300"
          height="300"
        />
        <Progress
          label="Balance: Balanced"
          color="default"
          size="sm"
          aria-label="Loading..."
          value={70}
        />
        <Progress
          label="Stiffness: Hard"
          color="primary"
          size="sm"
          aria-label="Loading..."
          value={50}
        />
        <Progress
          label="Weight: 4U - 3U"
          color="secondary"
          size="sm"
          aria-label="Loading..."
          value={60}
        />
      </CardBody>
      <CardFooter>
        <h6 className="text-blue-700">Price: $399.99</h6>
      </CardFooter>
    </Card>
  )
}
export default ProductCard
