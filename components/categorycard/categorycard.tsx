import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { useRouter } from 'next/router'

// Adjusted CategoryCard to accept props
interface Category {
  id: number
  name: string
  image: string
  description: string
  route: string
}

const CategoryCard = ({ category }: { category: Category }) => {
  const { name, image, description, route } = category
  const router = useRouter()
  const handleClick = () => {
    router.push(route)
  }
  return (
    <Card isHoverable radius="md" className="w-[250px]">
      <CardBody className="flex items-center justify-center">
        <Image width={200} height={250} src={image} alt={`${name} Image`} />
        <Accordion fullWidth defaultSelectedKeys="all">
          <AccordionItem title={name}>
            <p>{description}</p>
          </AccordionItem>
        </Accordion>
      </CardBody>
      <CardFooter>
        <Button onClick={() => handleClick()} color="primary">
          View {name}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CategoryCard
