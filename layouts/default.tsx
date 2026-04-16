import ErrorBoundary from '@/components/common/ErrorBoundary'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import { useRouter } from 'next/router'

const NO_FOOTER_ROUTES = ['/chat']

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const showFooter = !NO_FOOTER_ROUTES.includes(router.pathname)

  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <main className={`flex justify-center w-svw flex-1 overflow-auto ${showFooter ? 'py-10' : ''}`}>
        <section className="flex flex-col">
          <ErrorBoundary>{children}</ErrorBoundary>
        </section>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
