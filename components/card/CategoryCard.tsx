import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'

interface Category {
  id: number
  name: string
  image: string
  description: string
  route: string
}

const CategoryCard = memo(({ category }: { category: Category }) => {
  const { name, image, description, route } = category
  const router = useRouter()

  const handleClick = () => {
    router.push(route)
  }

  useEffect(() => {
    router.prefetch(route)
  }, [route])

  return (
    <Card isHoverable radius="md" className="container max-w-[250px]">
      <CardBody className="flex items-center justify-center gap-2">
        <Image width={200} height={250} src={image} alt={`${name} Image`} />
        <h4 className="self-start">{name}</h4>
        <p>{description}</p>
      </CardBody>
      <CardFooter>
        <Button onClick={handleClick} color="primary">
          View {name}
        </Button>
      </CardFooter>
    </Card>
  )
})

export default CategoryCard
