import CategoryCard from '@/components/categorycard/categorycard'
import { CATEGORY } from '@/constants/category'
import useGetRacket from '@/hooks/useGetRacket'
import ChatIcon from '@/icons/ChatIcon'
import FeaturedProduct from '@/layouts/FeaturedProductLayout'
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
          className="border-none flex items-start"
        >
          <Image
            alt="Banner"
            className="object-cover"
            height="full"
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-banner-template-design-f4b281ca556e3d500e78fc6260273284_screen.jpg?ts=1561497794"
          />
        </Card>
        <h2>Shop by categories</h2>
        <Flex
          gap="5"
          px="4"
          height="full"
          justify="center"
          align="center"
          direction={{ initial: 'column', sm: 'row', lg: 'row', xl: 'row' }}
        >
          {CATEGORY.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Flex>
        <section className="flex flex-col items-center gap-10">
          <h2>Try our BMB AI!</h2>
          <section
            className="bg-secondary w-[150px] h-[150px] rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => handleChatNavigate()}
          >
            <ChatIcon color="white" width="70" height="70" />
          </section>
          <h4 className="text-center">
            Chat with our AI and find out what equipment is most suitable for
            you!
          </h4>
        </section>

        <FeaturedProduct title="Mega Sale" products={data} />

        <FeaturedProduct title="Best Seller Racket" products={data} />

        <FeaturedProduct title="Best Seller Shoes" products={data} />
      </Flex>
    </main>
  )
}

export default IndexPage
