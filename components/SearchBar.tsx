import useSearchProduct from '@/hooks/useSearchProduct'
import SearchIcon from '@/icons/SearchIcon'
import { Image } from '@heroui/image'
import { Input } from '@heroui/input'
import { Link } from '@heroui/link'
import { useState } from 'react'

const ProductSearchBar = () => {
  const [query, setQuery] = useState('')
  interface Product {
    id: string
    product_name: string
    image_url: string
    price: number
  }

  const { data: products }: { data: Product[] | undefined } =
    useSearchProduct(query)

  return (
    <div className="relative w-[10vw]">
      <Input
        className="w-full"
        startContent={<SearchIcon width={20} height={20} color="black" />}
        placeholder="Search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {products && products.length > 0 && (
        <ul className="absolute top-full mt-2 z-10 w-max bg-white shadow-lg rounded-md border">
          {products.map((product) => (
            <li
              key={product.id}
              className="px-3 text-black py-2 hover:bg-gray-400 cursor-pointer text-sm flex gap-2"
            >
              <Link color="foreground" href={`/${product.id}`}>
                <Image
                  src={product.image_url}
                  alt={product.product_name}
                  width={50}
                  height={50}
                  className="inline-block mr-2"
                />
                <div className="space-y-1">
                  <p>{product.product_name}</p>
                  <p className="font-semibold">${product.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductSearchBar
