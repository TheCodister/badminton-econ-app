import { ROUTES } from '@/constants/routes'
import { Badge } from '@heroui/badge'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Link } from '@heroui/link'

import { useAuth } from '@/context/context'
import AccessoryIcon from '@/icons/AccessoryIcon'
import CartIcon from '@/icons/CartIcon'
import ChatIcon from '@/icons/ChatIcon'
import HomeIcon from '@/icons/HomeIcon'
import PersonIcon from '@/icons/PersonIcon'
import RacketIcon from '@/icons/RacketIcon'
import RunIcon from '@/icons/RunIcon'
import SearchIcon from '@/icons/SearchIcon'
import ShuttleIcon from '@/icons/ShuttleIcon'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/navbar'
import { useRouter } from 'next/router'
import { useState } from 'react'
const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn } = useAuth()

  const navItems = [
    { label: 'Home', href: ROUTES.HOME, icon: HomeIcon },
    { label: 'Racket', href: ROUTES.RACKET, icon: RacketIcon },
    { label: 'Shuttlecock', href: ROUTES.SHUTTLECOCK, icon: ShuttleIcon },
    { label: 'Shoes', href: ROUTES.SHOES, icon: RunIcon },
    { label: 'Accesories', href: ROUTES.ACCESORIES, icon: AccessoryIcon },
    ...(isLoggedIn
      ? [
          {
            label: 'Chat',
            href: ROUTES.CHAT,
            icon: ChatIcon,
          },
        ]
      : []),
  ]

  return (
    <Navbar
      className="w-screen justify-center p-2 bg-primary text-white"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          className="xl:hidden lg:hidden sm:block"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
        <NavbarBrand>
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
        <NavbarItem className="xl:hidden lg:hidden md:block sm:block">
          <Input
            className="w-full"
            startContent={<SearchIcon width={20} height={20} color="black" />}
            placeholder="Search"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="gap-2 xl:flex lg:flex md:hidden min-[20px]:hidden sm:hidden">
        {navItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link color="foreground" href={item.href}>
              <Button
                startContent={item.icon && <item.icon />}
                key={item.href}
                variant={router.pathname === item.href ? 'flat' : 'solid'} // Active page styling
                color={router.pathname === item.href ? 'default' : 'primary'}
                className="text-white font-semibold"
              >
                {item.label}
              </Button>
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Input
            className="w-[10vw]"
            startContent={<SearchIcon width={20} height={20} color="black" />}
            placeholder="Search"
            type="text"
          />
        </NavbarItem>
        <NavbarItem className="w-20">
          {!isLoggedIn ? (
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
          <Button variant="solid" color="primary">
            <Badge content="1" size="sm" color="danger">
              <CartIcon stroke="white" fill="white" />
            </Badge>
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="mt-4">
        {navItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Button
              className="text-white font-semibold w-full"
              startContent={item.icon && <item.icon />}
              key={item.href}
              variant={router.pathname === item.href ? 'shadow' : 'solid'} // Active page styling
              color={router.pathname === item.href ? 'default' : 'primary'}
              href={item.href}
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
