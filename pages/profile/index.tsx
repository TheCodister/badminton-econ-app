import HistoryIcon from '@/icons/HistoryIcon'
import ListIcon from '@/icons/ListIcon'
import OrderIcon from '@/icons/OrderIcon'
import { Button } from '@heroui/button'
import { Form } from '@heroui/form'
import { Input } from '@heroui/input'

const UserComponent = () => {
  return (
    <div>
      <h1 className="text-left">My Account</h1>
      <div className="flex justify-center gap-5 container">
        <Form className="xl:w-[900px] lg:w-[700px] md:w-full sm:w-full max-w-[1000px] min-w-0 border-solid border-2 p-5 space-y-8">
          <h2>Personal Information</h2>
          <Input
            label="Full Name"
            labelPlacement="outside"
            name="fullname"
            placeholder="Enter your full name"
            type="text"
          ></Input>
          <Input
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <Input
            label="Phone Number"
            labelPlacement="outside"
            name="phonenumber"
            placeholder="Enter your phone number"
            type="number"
          ></Input>
          <Input
            label="Address"
            labelPlacement="outside"
            type="text"
            placeholder="Enter your address"
            name="address"
          ></Input>
          <Button className="w-full" color="primary">
            Update Information
          </Button>
        </Form>
        <div className="border-solid border-2 p-5 flex flex-col gap-5">
          <h2>Account Actions</h2>
          <Button
            className="justify-start"
            startContent={<HistoryIcon />}
            variant="bordered"
            fullWidth
          >
            View Order History
          </Button>
          <Button
            className="justify-start"
            startContent={<OrderIcon />}
            variant="bordered"
            fullWidth
          >
            Current Orders
          </Button>
          <Button
            className="justify-start"
            startContent={<ListIcon />}
            variant="bordered"
            fullWidth
          >
            My Wishlist
          </Button>
          <Button className="justify-start" fullWidth color="danger">
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserComponent
