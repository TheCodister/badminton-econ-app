import { ContextProvider } from '@/context/context'
import DefaultLayout from '@/layouts/default'
import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/system'
import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import { useRouter } from 'next/router'

// Import Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat', // Define a CSS variable for easier usage
  display: 'swap', // Use swap for better UX during font loading
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <ContextProvider>
          <Theme>
            <NextUIProvider
              navigate={router.push}
              className={`${montserrat.variable} font-sans`}
            >
              <NextThemesProvider>
                <DefaultLayout>
                  <Component {...pageProps} />
                </DefaultLayout>
              </NextThemesProvider>
            </NextUIProvider>
          </Theme>
        </ContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
