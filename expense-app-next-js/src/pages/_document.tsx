import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <link href="https://github.hubspot.com/odometer/themes/odometer-theme-default.css" rel="stylesheet" />
        <script src="https://github.hubspot.com/odometer/odometer.js"></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
