import { ROUTES } from '@/constants/routes'
import { useGetCart } from '@/hooks/useGetCart'
import AccessoryIcon from '@/icons/AccessoryIcon'
import CartIcon from '@/icons/CartIcon'
import ChatIcon from '@/icons/ChatIcon'
import HomeIcon from '@/icons/HomeIcon'
import PersonIcon from '@/icons/PersonIcon'
import RacketIcon from '@/icons/RacketIcon'
import RunIcon from '@/icons/RunIcon'
import ShuttleIcon from '@/icons/ShuttleIcon'
import { Badge } from '@heroui/badge'
import { Button } from '@heroui/button'
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
import MobileProductSearchBar from '../MobileSearchBar'
import ProductSearchBar from '../SearchBar'
const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const { data: cart } = useGetCart(session?.user.id || '')

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

  const handleNavigation = (href: string) => {
    router.push(href)
  }

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
              <Button
                startContent={<PersonIcon />}
                isIconOnly
                variant="solid"
                color="primary"
                className="font-semibold w-full"
                onPress={() => handleNavigation(ROUTES.LOGIN)} // Navigate programmatically
              >
                Login
              </Button>
            ) : (
              <Button
                startContent={<PersonIcon />}
                isIconOnly
                variant="solid"
                color="primary"
                className="font-semibold w-full"
                onPress={() => handleNavigation(ROUTES.PROFILE)} // Navigate programmatically
              >
                Profile
              </Button>
            )}
          </NavbarItem>
          <NavbarItem className="xl:hidden lg:hidden sm:block">
            <Button
              variant="solid"
              color="primary"
              isIconOnly
              onPress={() => handleNavigation(ROUTES.CART)}
            >
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
          </NavbarItem>
        </div>
      </NavbarContent>
      <NavbarContent className="gap-2 xl:flex lg:flex md:hidden min-[20px]:hidden sm:hidden">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Button
              startContent={<item.icon />}
              variant={router.pathname === item.href ? 'flat' : 'solid'}
              color={router.pathname === item.href ? 'default' : 'primary'}
              className="text-white font-semibold"
              onPress={() => handleNavigation(item.href)} // Use router.push here
            >
              {item.label}
            </Button>
          </NavbarItem>
        ))}

        <NavbarItem>
          <ProductSearchBar />
        </NavbarItem>
        <NavbarItem className="w-20">
          {!session ? (
            <Button
              startContent={<PersonIcon />}
              variant="solid"
              color="primary"
              className="font-semibold"
              isIconOnly
              onPress={() => handleNavigation(ROUTES.LOGIN)} // Navigate programmatically
            >
              Login
            </Button>
          ) : (
            <Button
              startContent={<PersonIcon />}
              variant="solid"
              color="primary"
              className="font-semibold"
              isIconOnly
              onPress={() => handleNavigation(ROUTES.PROFILE)} // Navigate programmatically
            >
              Profile
            </Button>
          )}
        </NavbarItem>
        <NavbarItem className="w-5">
          <Button
            variant="solid"
            color="primary"
            isIconOnly
            onPress={() => handleNavigation(ROUTES.CART)}
          >
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
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="mt-4">
        <NavbarMenuItem className="mb-4">
          <MobileProductSearchBar />
        </NavbarMenuItem>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Button
              className="text-white font-semibold w-full"
              startContent={item.icon && <item.icon />}
              variant={router.pathname === item.href ? 'shadow' : 'solid'}
              color={router.pathname === item.href ? 'default' : 'primary'}
              onPress={() => handleNavigation(item.href)} // Use router.push here
            >
              {item.label}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
