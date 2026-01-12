import { CheckoutProvider } from '@/context/context'
import DefaultLayout from '@/layouts/default'
import { useSelectedCart } from '@/stores/useSelectedCart'
import '@/styles/globals.css'
import { ToastProvider } from '@heroui/react'
import { HeroUIProvider } from '@heroui/system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { Geist, Geist_Mono, Montserrat } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// Import Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})
const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
// Create QueryClient outside component
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const { clearItems, setLastVisitedRoute, lastVisitedRoute } =
    useSelectedCart()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setLastVisitedRoute(router.pathname)

      if (
        !url.includes('/checkout') &&
        !url.includes('/cart') &&
        (lastVisitedRoute === '/checkout' || lastVisitedRoute === '/cart')
      ) {
        clearItems()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router, clearItems, setLastVisitedRoute, lastVisitedRoute])

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider>
          <SessionProvider session={pageProps.session}>
            <CheckoutProvider>
              <DefaultLayout>
                <ToastProvider />
                <Component {...pageProps} className={_geist.className} />
              </DefaultLayout>
            </CheckoutProvider>
          </SessionProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  )
}
