import { fontMono, fontSans } from '@/config/fonts'
import DefaultLayout from '@/layouts/default'
import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/system'
import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </NextThemesProvider>
        </NextUIProvider>
      </Theme>
    </QueryClientProvider>
  )
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
}
