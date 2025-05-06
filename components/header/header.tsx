import { ROUTES } from '@/constants/routes'
import { useGetCart } from '@/hooks/useGetCart'
import AccessoryIcon from '@/icons/AccessoryIcon'
import CartIcon from '@/icons/CartIcon'
import ChatIcon from '@/icons/ChatIcon'
import HomeIcon from '@/icons/HomeIcon'
import PersonIcon from '@/icons/PersonIcon'
import RacketIcon from '@/icons/RacketIcon'
import RunIcon from '@/icons/RunIcon'
import SearchIcon from '@/icons/SearchIcon'
import ShuttleIcon from '@/icons/ShuttleIcon'
import { Badge } from '@heroui/badge'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Link } from '@heroui/link'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/navbar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import ProductSearchBar from '../SearchBar'
const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const { data: cart } = useGetCart(session?.user?.id || '')

  const navItems = useMemo(
    () => [
      { label: 'Home', href: ROUTES.HOME, icon: HomeIcon },
      { label: 'Racket', href: ROUTES.RACKET, icon: RacketIcon },
      { label: 'Shuttlecock', href: ROUTES.SHUTTLECOCK, icon: ShuttleIcon },
      { label: 'Shoes', href: ROUTES.SHOES, icon: RunIcon },
      { label: 'Accessories', href: ROUTES.ACCESORIES, icon: AccessoryIcon },
      ...(session
        ? [{ label: 'Chat', href: ROUTES.CHAT, icon: ChatIcon }]
        : []),
    ],
    [session],
  )

  return (
    <Navbar
      className="w-screen p-2 bg-primary text-white"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="flex flex-col w-full">
        <div className="flex w-full h-full gap-4 items-center">
          <NavbarMenuToggle
            className="xl:hidden lg:hidden sm:block"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
          <NavbarBrand className="self-center">
            {/* <Image
            src={LogoURL}
            alt="Logo"
            layout="intrinsic"
            width={200}
            height={200}
            className="rounded-full"
          /> */}
            <h1>BMB</h1>
          </NavbarBrand>
          <NavbarItem className="xl:hidden lg:hidden sm:block">
            {!session ? (
              <Link href={ROUTES.LOGIN}>
                <Button
                  startContent={<PersonIcon />}
                  isIconOnly
                  variant="solid"
                  color="primary"
                  className="font-semibold w-full"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Link href={ROUTES.PROFILE}>
                <Button
                  startContent={<PersonIcon />}
                  isIconOnly
                  variant="solid"
                  color="primary"
                  className="font-semibold w-full"
                ></Button>
              </Link>
            )}
          </NavbarItem>
          <NavbarItem className="xl:hidden lg:hidden sm:block">
            <Link href={ROUTES.CART}>
              <Button variant="solid" color="primary" isIconOnly>
                <Badge
                  content={
                    cart?.cart_items.length > 0 ? cart?.cart_items.length : ''
                  }
                  size="sm"
                  color="danger"
                >
                  <CartIcon stroke="white" fill="white" />
                </Badge>
              </Button>
            </Link>
          </NavbarItem>
        </div>
      </NavbarContent>
      <NavbarContent className="gap-2 xl:flex lg:flex md:hidden min-[20px]:hidden sm:hidden">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link color="foreground" href={item.href}>
              <Button
                startContent={<item.icon />}
                variant={router.pathname === item.href ? 'flat' : 'solid'}
                color={router.pathname === item.href ? 'default' : 'primary'}
                className="text-white font-semibold"
              >
                {item.label}
              </Button>
            </Link>
          </NavbarItem>
        ))}

        <NavbarItem>
          <ProductSearchBar />
        </NavbarItem>
        <NavbarItem className="w-20">
          {!session ? (
            <Link href={ROUTES.LOGIN}>
              <Button
                startContent={<PersonIcon />}
                variant="solid"
                color="primary"
                className="font-semibold"
              >
                Login
              </Button>
            </Link>
          ) : (
            <Link href={ROUTES.PROFILE}>
              <Button
                startContent={<PersonIcon />}
                variant="solid"
                color="primary"
                className="font-semibold"
              >
                Profile
              </Button>
            </Link>
          )}
        </NavbarItem>
        <NavbarItem className="w-5">
          <Link href={ROUTES.CART}>
            <Button variant="solid" color="primary">
              <Badge
                content={
                  cart?.cart_items.length > 0 ? cart?.cart_items.length : ''
                }
                size="sm"
                color="danger"
              >
                <CartIcon stroke="white" fill="white" />
              </Badge>
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="mt-4">
        <NavbarMenuItem className="mb-4">
          <Input
            className="w-full"
            startContent={<SearchIcon width={20} height={20} color="black" />}
            placeholder="Search"
          />
        </NavbarMenuItem>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link className="w-full" color="foreground" href={item.href}>
              <Button
                className="text-white font-semibold w-full"
                startContent={item.icon && <item.icon />}
                variant={router.pathname === item.href ? 'shadow' : 'solid'} // Active page styling
                color={router.pathname === item.href ? 'default' : 'primary'}
              >
                {item.label}
              </Button>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
