import { Image } from '@nextui-org/react'
const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <nav className="flex items-center gap-2">
        <Image
          width={100}
          height={50}
          src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          alt="logo"
        />
        <ul className="flex space-x-4">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">Racket</a>
          </li>
          <li>
            <a href="/contact">Shuttlecock</a>
          </li>
          <li>
            <a href="/contact">Shoes</a>
          </li>
          <li>
            <a href="/contact">Clothes</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
