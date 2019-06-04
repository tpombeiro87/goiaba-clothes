import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styleTags: [...initialProps.styles, ...sheet.getStyleElement()],
    }
  }

  render () {
    return (
      <html>
        <Head>
          <meta content='width=device-width, initial-scale=1' name='viewport' />
          <meta charSet='utf-8' />

          <link href='/static/favicon/apple-touch-icon.png' rel='apple-touch-icon' sizes='180x180' />
          <link href='/static/favicon/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png' />
          <link href='/static/favicon/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png' />
          <link href='/static/favicon/site.webmanifest' rel='manifest' />
          <link color='#5bbad5' href='/static/favicon/safari-pinned-tab.svg' rel='mask-icon' />
          <meta content='#da532c' name='msapplication-TileColor' />
          <meta content='#ffffff' name='theme-color' />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
