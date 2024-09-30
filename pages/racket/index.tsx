import ProductCard from '@/components/card/card'
import Sidebar from '@/components/sidebar/siderbar'
import { Pagination } from '@nextui-org/pagination'
import { Flex, Grid } from '@radix-ui/themes'

const productData = [
  {
    name: 'Lining Halbertec 8000',
    brand: 'Lining',
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-lining-halbertec-8000-chinh-hang..webp',
    weight: '4U',
    balance: 'Balanced',
    stiffness: 'Hard',
    price: 399.99,
  },
  {
    name: 'Lining Axforce 100',
    brand: 'Lining',
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-lining-axforce-100-black-golden-ma-jp_1724874380.jpg',
    weight: '3U',
    balance: 'Head Heavy',
    stiffness: 'Medium',
    price: 119.99,
  },
  {
    name: 'Yonex Astrox 99',
    brand: 'Yonex',
    image:
      'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-yonex-astrox-99-pro-do-chinh-hang-1.webp',
    weight: '3U',
    balance: 'Head Heavy',
    stiffness: 'Medium',
    price: 499.99,
  },
  {
    name: 'Victor Thruster K',
    brand: 'Victor',
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-victor-thruster-k2-noi-dia-trung-1.webp',
    weight: '4U',
    balance: 'Head Light',
    stiffness: 'Flexible',
    price: 350.99,
  },
  {
    name: 'Yonex Astrox 100 ZZ',
    brand: 'Yonex',
    image:
      'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-yonex-astrox-100zz-chinh-hang-1.webp',
    weight: '3U',
    balance: 'Head Heavy',
    stiffness: 'Medium',
    price: 149.99,
  },
]

export default function IndexPage() {
  return (
    <main>
      <Flex>
        <Sidebar />
        <Grid
          columns={{ xl: '5', lg: '4', md: '3', sm: '2', xs: '1' }}
          gap="5"
          px="4"
        >
          {productData.map((product, index) => (
            <ProductCard key={index} data={product} />
          ))}
        </Grid>
      </Flex>
      <div className="flex self-center justify-center mt-4">
        <Pagination total={10} initialPage={1} />
      </div>
    </main>
  )
}
