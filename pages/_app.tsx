import { ContextProvider } from '@/context/context'
import DefaultLayout from '@/layouts/default'
import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/system'
import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <ContextProvider>
          <Theme>
            <NextUIProvider navigate={router.push}>
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
