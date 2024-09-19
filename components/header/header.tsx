import { ROUTES } from '@/constants/routes'
import {
  Button,
  Input,
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
  Badge,
  NavbarBrand,
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
    <Navbar className="justify-center p-2 bg-primary text-white">
      <NavbarMenuToggle className="xl:hidden sm:block" />
      <NavbarBrand>
        {/* <Image
              isBlurred
              width={20}
              src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
              alt="NextUI Album Cover"
              className="rounded-lg"
            /> */}
        <h3 className="text-stone-50 font-extrabold">BMB</h3>
      </NavbarBrand>
      <NavbarContent className="xl:flex gap-2 md:hidden sm:hidden">
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
        <NavbarItem>
          <Input
            startContent={
              <MagnifyingGlassIcon width={20} height={20} color="black" />
            }
            placeholder="Search"
          />
        </NavbarItem>
        <NavbarItem>
          <Button startContent={<PersonIcon />} variant="solid" color="primary">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="solid" color="primary">
            <Badge content="1" size="sm" color="danger">
              <LockClosedIcon width={18} height={18} />
            </Badge>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
