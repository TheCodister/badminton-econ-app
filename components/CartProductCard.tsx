import { Button } from '@heroui/button'
import { Image } from '@heroui/image'
const CartCard = () => {
  return (
    <div className="flex items-center container w-fit border-b-2 pb-4">
      <div className="flex items-center gap-4 min-w-fit xl:w-[700px] md:w-[500px] sm:w-96">
        <div className="">
          <Image
            src="https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-yonex-astrox-lt-27i-chinh-hang-1.webp"
            alt="product"
            width={120}
            height={120}
          />
        </div>
        <div className="">
          <h5>Yonex Astrox LT-27i</h5>
          <p>Price: $99.99</p>
          <p>Quantity: 1</p>
        </div>
      </div>
      <Button color="danger">Remove</Button>
    </div>
  )
}

export default CartCard
