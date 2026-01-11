import { ROUTES } from '@/constants/routes'
import { useGetCart } from '@/hooks/useGetCart'
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
import { Avatar } from '@heroui/react'
import {
  Bandage,
  CircleUser,
  Footprints,
  House,
  Key,
  LogIn,
  MessageCircle,
  ShoppingCart,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
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
      { label: 'Home', href: ROUTES.HOME, icon: House },
      { label: 'Racket', href: ROUTES.RACKET, icon: Key },
      { label: 'Shuttlecock', href: ROUTES.SHUTTLECOCK, icon: ShuttleIcon },
      { label: 'Shoes', href: ROUTES.SHOES, icon: Footprints },
      { label: 'Accessories', href: ROUTES.ACCESORIES, icon: Bandage },
      ...(session
        ? [{ label: 'Chat', href: ROUTES.CHAT, icon: MessageCircle }]
        : []),
    ],
    [session],
  )

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <Navbar
      className="w-screen p-2 text-primary bg-white/20 backdrop-blur-md"
      isBordered
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="flex flex-col w-full">
        <div className="flex w-full h-full gap-4 items-center">
          <NavbarMenuToggle
            className="xl:hidden lg:hidden sm:block"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
          <NavbarBrand
            className="space-x-2 cursor-pointer"
            onClick={() => handleNavigation(ROUTES.HOME)}
          >
            {/* <Image
            src={LogoURL}
            alt="Logo"
            layout="intrinsic"
            width={200}
            height={200}
            className="rounded-full"
          /> */}
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                B
              </span>
            </div>
            <span className="font-semibold text-xl text-black hidden sm:inline">
              BMB
            </span>
          </NavbarBrand>
          <NavbarItem className="xl:hidden lg:hidden sm:block">
            <Button
              variant="light"
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
                <ShoppingCart width={15} height={15} />
              </Badge>
            </Button>
          </NavbarItem>
          <NavbarItem className="xl:hidden lg:hidden sm:block">
            {!session ? (
              <Button
                startContent={<CircleUser />}
                variant="light"
                color="primary"
                className="font-semibold w-full text-black"
                onPress={() => handleNavigation(ROUTES.LOGIN)} // Navigate programmatically
              >
                Login
              </Button>
            ) : (
              <section className="flex gap-2 items-center">
                <Avatar
                  name={session.user.name || 'User'}
                  alt="User Avatar"
                  color="primary"
                  size="sm"
                  className="cursor-pointer font-bold border-2"
                  onClick={() => handleNavigation(ROUTES.PROFILE)}
                />
                <Button
                  startContent={<LogIn />}
                  variant="light"
                  color="primary"
                  isIconOnly
                  className="font-semibold"
                  onPress={() => signOut({ callbackUrl: '/' })}
                ></Button>
              </section>
            )}
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarContent className="gap-2 xl:flex lg:flex md:hidden min-[20px]:hidden sm:hidden">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Button
              startContent={<item.icon width={20} height={20} />}
              variant={router.pathname === item.href ? 'flat' : 'light'}
              color={router.pathname === item.href ? 'default' : 'primary'}
              className="text-black font-semibold"
              onPress={() => handleNavigation(item.href)} // Use router.push here
            >
              {item.label}
            </Button>
          </NavbarItem>
        ))}

        <NavbarItem>
          <ProductSearchBar />
        </NavbarItem>

        <NavbarItem className="w-15">
          <Button
            variant="light"
            color="primary"
            isIconOnly
            onPress={() => handleNavigation(ROUTES.CART)}
          >
            <Badge
              content={
                cart?.cart_items.length > 0 ? cart?.cart_items.length : ''
              }
              size="md"
              color="primary"
            >
              <ShoppingCart width={20} height={20} />
            </Badge>
          </Button>
        </NavbarItem>
        <NavbarItem className="w-20">
          {!session ? (
            <Button
              startContent={<CircleUser />}
              variant="light"
              color="primary"
              className="font-semibold"
              onPress={() => handleNavigation(ROUTES.LOGIN)} // Navigate programmatically
            >
              Login
            </Button>
          ) : (
            <section className="flex gap-2 items-center">
              <Avatar
                name={session.user.name || 'User'}
                alt="User Avatar"
                color="primary"
                size="sm"
                className="cursor-pointer font-bold border-2"
                onClick={() => handleNavigation(ROUTES.PROFILE)}
              />
              <Button
                startContent={<LogIn />}
                variant="light"
                color="primary"
                isIconOnly
                className="font-semibold"
                onPress={() => signOut({ callbackUrl: '/' })}
              ></Button>
            </section>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="mt-4">
        <NavbarMenuItem className="mb-4">
          <MobileProductSearchBar />
        </NavbarMenuItem>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Button
              className="text-black font-semibold w-full"
              startContent={item.icon && <item.icon width={20} height={20} />}
              variant={router.pathname === item.href ? 'flat' : 'light'}
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
