import { ROUTES } from '@/constants/routes'
import LogoURL from '@/icons/FullLogo.png'
import {
  Badge,
  Button,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
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
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: ROUTES.HOME, icon: HomeIcon },
    { label: 'Racket', href: ROUTES.RACKET, icon: StarFilledIcon },
    { label: 'Shuttlecock', href: ROUTES.SHUTTLECOCK, icon: RocketIcon },
    { label: 'Shoes', href: ROUTES.SHOES, icon: AllSidesIcon },
    { label: 'Clothes', href: ROUTES.CLOTHES, icon: MagicWandIcon },
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
        <NavbarBrand className="bg-white p-2 cursor-pointer rounded-full">
          <Image
            src={LogoURL}
            alt="Logo"
            layout="intrinsic"
            width={200}
            height={200}
            className="rounded-full"
          />
        </NavbarBrand>
        <NavbarItem className="xl:hidden lg:hidden md:block sm:block">
          <Input
            className="w-full"
            startContent={
              <MagnifyingGlassIcon width={20} height={20} color="black" />
            }
            placeholder="Search"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="gap-2 xl:flex lg:flex md:hidden min-[20px]:hidden sm:hidden">
        {navItems.map((item) => (
          <NavbarItem>
            <Link color="foreground" href={item.href}>
              <Button
                startContent={item.icon && <item.icon />}
                key={item.href}
                variant={router.pathname === item.href ? 'flat' : 'solid'} // Active page styling
                color={router.pathname === item.href ? 'default' : 'primary'}
                className="text-white"
              >
                {item.label}
              </Button>
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Input
            className="w-[10vw]"
            startContent={
              <MagnifyingGlassIcon width={20} height={20} color="black" />
            }
            placeholder="Search"
          />
        </NavbarItem>
        <NavbarItem className="w-20">
          <Button startContent={<PersonIcon />} variant="solid" color="primary">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className="w-5">
          <Button variant="solid" color="primary">
            <Badge content="1" size="sm" color="danger">
              <LockClosedIcon width={18} height={18} />
            </Badge>
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="mt-4">
        {navItems.map((item) => (
          <NavbarMenuItem>
            <Button
              className="w-full"
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
