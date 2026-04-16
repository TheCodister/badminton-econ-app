import { Divider } from '@heroui/divider'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'

const shopLinks = [
  { label: 'Rackets', href: '/racket' },
  { label: 'Shoes', href: '/shoes' },
  { label: 'Shuttlecocks', href: '/shuttlecock' },
  { label: 'Accessories', href: '/accessories' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Returns & Refunds', href: '/returns' },
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-content2 border-t border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-foreground tracking-tight">BMB</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Premium badminton equipment for players of all levels. Play hard,
              play smart.
            </p>
            <div className="flex gap-3 mt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-full bg-content3 hover:bg-primary hover:text-white text-foreground/70 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Shop
            </h4>
            <ul className="flex flex-col gap-2">
              {shopLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Legal
            </h4>
            <ul className="flex flex-col gap-2">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 text-xs text-foreground/50">
          <p>&copy; {new Date().getFullYear()} BMB Badminton Store. All rights reserved.</p>
          <p>Made with passion for the sport</p>
        </div>
      </div>
    </footer>
  )
}
