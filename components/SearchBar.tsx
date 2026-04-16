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
    product_type: string
  }

  const { data: products }: { data: Product[] | undefined } =
    useSearchProduct(query)

  return (
    <div className="relative w-[10vw]">
      <Input
        className="w-full"
        endContent={<SearchIcon width={18} height={18} color="black" />}
        placeholder="Search"
        radius="full"
        color="default"
        variant="faded"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {products && products.length > 0 && (
        <ul className="absolute top-full mt-2 z-10 w-max bg-content1 shadow-lg rounded-md border border-default-200">
          {products.map((product) => (
            <li
              key={product.id}
              className="px-3 text-foreground py-2 hover:bg-content2 cursor-pointer text-sm flex gap-2"
            >
              <Link
                className="space-x-2"
                color="foreground"
                href={`/${product.product_type}/${product.id}`}
              >
                <Image
                  src={product.image_url}
                  alt={product.product_name}
                  width={50}
                  height={50}
                  className="inline-block mr-2"
                />
                <div className="space-y-2">
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
