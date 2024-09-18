import { ROUTES } from '@/constants/routes'
import {
  Button,
  Input,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import {
  AllSidesIcon,
  HomeIcon,
  LockClosedIcon,
  MagicWandIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  RocketIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  const navItems = [
    { label: 'Home', href: ROUTES.HOME, icon: HomeIcon },
    { label: 'Racket', href: ROUTES.RACKET, icon: StarFilledIcon },
    { label: 'Shuttlecock', href: ROUTES.SHUTTLECOCK, icon: RocketIcon },
    { label: 'Shoes', href: ROUTES.SHOES, icon: AllSidesIcon },
    { label: 'Clothes', href: ROUTES.CLOTHES, icon: MagicWandIcon },
  ]

  return (
    <Navbar className="w-full flex justify-center p-2 bg-primary text-white">
      <Flex>
        <NavbarContent>
          <NavbarItem>
            {/* <Image
              isBlurred
              width={20}
              src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
              alt="NextUI Album Cover"
              className="rounded-lg"
            /> */}
            <h3 className="text-stone-50 font-extrabold">BMB</h3>
          </NavbarItem>
          {navItems.map((item) => (
            <NavbarItem>
              <Button
                startContent={item.icon && <item.icon />}
                key={item.href}
                variant={router.pathname === item.href ? 'flat' : 'solid'} // Active page styling
                color={router.pathname === item.href ? 'default' : 'primary'}
                href={item.href}
              >
                {item.label}
              </Button>
            </NavbarItem>
          ))}
          <NavbarItem className="w-full">
            <Input
              startContent={
                <MagnifyingGlassIcon width={20} height={20} color="black" />
              }
              className="w-[300px]"
              placeholder="Search"
            />
          </NavbarItem>
          <NavbarItem>
            <Button
              startContent={<LockClosedIcon />}
              variant="flat"
              color="default"
            >
              Cart
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              startContent={<PersonIcon />}
              variant="flat"
              color="default"
            >
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Flex>
    </Navbar>
  )
}

export default Header
