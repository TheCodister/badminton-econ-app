import CategoryCard from '@/components/card/CategoryCard'
import { CATEGORY } from '@/constants/category'
import useGetRacket from '@/hooks/useGetRacket'
import ChatIcon from '@/icons/ChatIcon'
import FeaturedProduct from '@/layouts/FeaturedProductLayout'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Flex } from '@radix-ui/themes'
import { useRouter } from 'next/router'
import { useState } from 'react'

const IndexPage = () => {
  const [filters, setFilters] = useState({})
  const { data, error, isLoading } = useGetRacket(filters)
  const route = useRouter()
  const handleChatNavigate = () => {
    route.push('/chat')
  }

  if (error) return <div>Error fetching user data</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <main>
      <Flex direction="column" justify="center" gap="5" className="px-3">
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none flex items-stretch justify-center container"
        >
          <Image
            alt="Banner"
            className="object-cover"
            height="full"
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-banner-template-design-f4b281ca556e3d500e78fc6260273284_screen.jpg?ts=1561497794"
          />
        </Card>
        <h2 className="xl:inline-block lg:inline-block md:inline-block sm:hidden hidden">
          Shop by categories
        </h2>
        <Flex
          gap="5"
          px="4"
          height="full"
          justify="center"
          align="center"
          direction={{ initial: 'column', sm: 'row', lg: 'row', xl: 'row' }}
          display={{ initial: 'none', sm: 'flex', lg: 'flex', xl: 'flex' }}
        >
          {CATEGORY.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Flex>
        <section className="flex flex-col items-center gap-10">
          <h2>TRY OUR BMB AI!</h2>
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
