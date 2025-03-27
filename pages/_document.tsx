import clsx from 'clsx'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased light text-black',
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
