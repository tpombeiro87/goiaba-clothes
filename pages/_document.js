import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const page = renderPage()
    return { ...page, pageData: 'tiago was here' }
  }

  render () {
    return (
      <html lang='pt'>
        <Head>
          <meta content='width=device-width, initial-scale=1' name='viewport' />
          <meta charSet='utf-8' />
          <title>Goiaba site</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
