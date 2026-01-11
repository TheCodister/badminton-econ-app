import ErrorBoundary from '@/components/common/ErrorBoundary'
import Header from '@/components/header/header'
import Link from 'next/link'
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <main className="flex justify-center w-svw py-10 h-full overflow-auto">
        <section className="flex flex-col">
          <ErrorBoundary>{children}</ErrorBoundary>
        </section>
      </main>
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">BMB</h3>
              <p className="text-sm text-card/70">
                Premium badminton equipment for players of all levels.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-card/70">
                <li>
                  <Link href="/racket" className="hover:text-card transition">
                    Rackets
                  </Link>
                </li>
                <li>
                  <Link href="/shoes" className="hover:text-card transition">
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shuttlecocks"
                    className="hover:text-card transition"
                  >
                    Shuttlecocks
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accessories"
                    className="hover:text-card transition"
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-card/70">
                <li>
                  <Link href="/about" className="hover:text-card transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-card transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-card transition">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-card/70">
                <li>
                  <Link href="/privacy" className="hover:text-card transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-card transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-card transition">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-card/20 pt-8 text-center text-sm text-card/60">
            <p>&copy; 2026 BMB Badminton Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
