import CategoryCard from '@/components/categorycard/categorycard'
import { CATEGORY } from '@/constants/category'
import useGetRacket from '@/hooks/useGetRacket'
import ChatIcon from '@/icons/ChatIcon'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Flex } from '@radix-ui/themes'
import { useRouter } from 'next/router'
const IndexPage = () => {
  const { data, error, isLoading } = useGetRacket()
  const route = useRouter()
  const handleChatNavigate = () => {
    route.push('/chat')
  }

  if (error) return <div>Error fetching user data</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <main>
      <Flex direction="column" gap="5">
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none flex items-center"
        >
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height="full"
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-banner-template-design-f4b281ca556e3d500e78fc6260273284_screen.jpg?ts=1561497794"
          />
        </Card>
        <h2>Shop by categories</h2>
        <Flex gap="5" px="4" height="full">
          {CATEGORY.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Flex>
        {/* <Grid
          columns={{ xl: '5', lg: '4', md: '3', sm: '2', xs: '1' }}
          gap="5"
          px="4"
        >
          {data.map((data: Racket) => (
            <ProductCard key={data.product_id} data={data} />
          ))}
        </Grid> */}
        <section className="flex flex-col items-center gap-10">
          <h2>Try our BMW AI!</h2>
          <section
            className="bg-secondary w-[150px] h-[150px] rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => handleChatNavigate()}
          >
            <ChatIcon color="white" width="70" height="70" />
          </section>
          <h3>Chat with our AI</h3>
        </section>
      </Flex>
    </main>
  )
}

export default IndexPage
