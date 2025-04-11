import CategoryCard from '@/components/card/CategoryCard'
import FeaturedProduct from '@/components/FeatureProductDisplay'
import { CATEGORY } from '@/constants/category'
import useGetRacket from '@/hooks/useGetRacket'
import ChatIcon from '@/icons/ChatIcon'
import { Image } from '@heroui/image'
import { Skeleton } from '@heroui/skeleton'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const IndexPage = () => {
  const [filters, setFilters] = useState({})

  const { data, error, isLoading } = useGetRacket(filters)
  const { data: session } = useSession()

  const route = useRouter()
  const handleChatNavigate = () => {
    if (session) {
      route.push('/chat')
    } else {
      route.push('/login')
    }
  }

  if (error) return <div>Error fetching user data</div>

  return (
    <main>
      <div className="flex flex-col justify-center gap-5 px-3 items-center">
        <div className="flex flex-col justify-center items-center gap-5 px-4 h-full w-8/12">
          <Image
            alt="Banner"
            className="w-full h-full object-cover"
            src="https://static.vecteezy.com/system/resources/previews/035/277/450/non_2x/badminton-sport-banner-background-in-red-and-white-with-halftone-and-diagonal-stripes-vector.jpg"
          />
          <h2 className="xl:inline-block lg:inline-block md:inline-block sm:hidden hidden">
            Shop by categories
          </h2>
        </div>

        {/* <div className="hidden sm:flex lg:flex xl:flex flex-col sm:flex-row justify-center items-center gap-5 px-4 h-full">
          {CATEGORY.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div> */}
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <div className="hidden sm:flex lg:flex xl:flex flex-col sm:flex-row justify-center items-center gap-5 px-4 h-full">
            {CATEGORY.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}

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

        {isLoading ? (
          <div className="flex flex-col gap-5">
            <Skeleton className="w-full h-[300px] rounded-lg" />
            <Skeleton className="w-full h-[300px] rounded-lg" />
            <Skeleton className="w-full h-[300px] rounded-lg" />
          </div>
        ) : (
          <div className="flex flex-col gap-5 items-center">
            <FeaturedProduct title="Mega Sale" products={data} />
            <FeaturedProduct title="Best Seller Racket" products={data} />
            <FeaturedProduct title="Best Seller Shoes" products={data} />
          </div>
        )}
      </div>
    </main>
  )
}

export function IndexPageSkeleton() {
  return (
    <main>
      <div className="flex flex-col content-center gap-5 px-3">
        {/* Banner Skeleton */}
        <Skeleton className="w-full h-[200px] rounded-lg" />

        {/* Category Section */}
        <h2 className="xl:inline-block lg:inline-block md:inline-block sm:hidden hidden">
          Shop by categories
        </h2>
        <CategorySkeleton />

        {/* Chat AI Section */}
        <section className="flex flex-col items-center gap-10">
          <h2>TRY OUR BMB AI!</h2>
          <section className="bg-secondary w-[150px] h-[150px] rounded-full flex items-center justify-center cursor-pointer">
            <ChatIcon color="white" width="70" height="70" />
          </section>
          <h4 className="text-center">
            Chat with our AI and find out what equipment is most suitable for
            you!
          </h4>
        </section>

        {/* Featured Product Skeletons */}
        <Skeleton className="w-full h-[300px] rounded-lg" />
        <Skeleton className="w-full h-[300px] rounded-lg" />
        <Skeleton className="w-full h-[300px] rounded-lg" />
      </div>
    </main>
  )
}

const CategorySkeleton = () => (
  <div className="hidden sm:flex lg:flex xl:flex flex-col sm:flex-row justify-center items-center gap-5 px-4 h-full">
    {CATEGORY.map((category) => (
      <Skeleton key={category.id} className="w-[250px] h-[400px] rounded-lg" />
    ))}
  </div>
)

export default IndexPage
