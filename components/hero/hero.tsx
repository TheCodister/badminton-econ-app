import { Button } from '@heroui/button'
import { Image } from '@heroui/image'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-12 items-center w-full py-20 md:py-30">
      <section className="flex flex-col gap-8 max-w-lg items-start">
        <p className="font-semibold text-base text-primary">
          BADMINTON EXCELLENCE
        </p>
        <h1 className="text-5xl md:text-6xl leading-tight font-bold">
          Play Your Perfect Game
        </h1>
        <h6 className="text-default-500">
          Discover premium badminton equipment designed for champions. From
          professional rackets to performance shoes.
        </h6>
        <Button
          color="primary"
          radius="full"
          size="lg"
          endContent={<ArrowRight />}
          className="font-semibold text-md"
        >
          Start Shopping
        </Button>
      </section>
      <section className="w-fit">
        <Image
          src="/main-banner.jpeg"
          alt="main-banner"
          width={800}
          className="w-full object-cover rounded-lg"
        />
      </section>
    </section>
  )
}

export default Hero
