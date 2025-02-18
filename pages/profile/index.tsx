import HistoryIcon from '@/icons/HistoryIcon'
import ListIcon from '@/icons/ListIcon'
import OrderIcon from '@/icons/OrderIcon'
import { Button } from '@heroui/button'
import { Form } from '@heroui/form'
import { Input } from '@heroui/input'
import { signOut } from 'next-auth/react'

const formStyles =
  'border-2 p-5 space-y-6 xl:w-[900px] lg:w-[700px] md:w-full sm:w-full max-w-[1000px] min-w-0'
const buttonStyles = 'justify-center w-full lg:justify-start sm:justify-center'
// const handleSignOut = () => {
//   const navigate = useRouter()
//   signOut()
//   navigate.push('/')
// }

const AccountActions = () => (
  <div className="border-2 p-5 flex flex-col gap-4">
    <h2>Account Actions</h2>
    <Button
      className={buttonStyles}
      startContent={<HistoryIcon />}
      variant="bordered"
    >
      View Order History
    </Button>
    <Button
      className={buttonStyles}
      startContent={<OrderIcon />}
      variant="bordered"
    >
      Current Orders
    </Button>
    <Button
      className={buttonStyles}
      startContent={<ListIcon />}
      variant="bordered"
    >
      My Wishlist
    </Button>
    <Button className={buttonStyles} color="danger" onPress={() => signOut()}>
      Log Out
    </Button>
  </div>
)

const UserProfile = () => (
  <>
    <h1 className="text-left">My Account</h1>
    <div className="flex flex-col lg:flex-row sm:flex-col justify-center gap-5 container">
      <Form className={formStyles}>
        <h2>Personal Information</h2>
        <Input
          label="Full Name"
          labelPlacement="outside"
          name="fullname"
          placeholder="Enter your full name"
          type="text"
        />
        <Input
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
        />
        <Input
          label="Phone Number"
          labelPlacement="outside"
          name="phonenumber"
          placeholder="Enter your phone number"
          type="number"
        />
        <Input
          label="Address"
          labelPlacement="outside"
          name="address"
          placeholder="Enter your address"
        />
        <Button className="w-full" color="primary">
          Update Information
        </Button>
      </Form>
      <AccountActions />
    </div>
  </>
)

export default UserProfile
