import { CheckoutProvider } from '@/context/context'
import DefaultLayout from '@/layouts/default'
import { useSelectedCart } from '@/stores/useSelectedCart'
import '@/styles/globals.css'
import { HeroUIProvider } from '@heroui/system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// Import Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat', // Define a CSS variable for easier usage
  display: 'swap', // Use swap for better UX during font loading
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const queryClient = new QueryClient()

  const { clearItems, setLastVisitedRoute, lastVisitedRoute } =
    useSelectedCart()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Store current route before navigating
      setLastVisitedRoute(router.pathname)

      // Clear selected items if navigating away from checkout
      // and NOT coming from the cart page
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
      <HeroUIProvider
        navigate={router.push}
        className={`${montserrat.variable} font-sans`}
      >
        <NextThemesProvider>
          <SessionProvider session={pageProps.session}>
            <CheckoutProvider>
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            </CheckoutProvider>
          </SessionProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  )
}
