import clsx from 'clsx'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script defer async client-code="KA-1546817-01" src="https://static.katalon.com/libs/traffic-agent/v1/traffic-agent.min.js"></script>
      </Head>
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
