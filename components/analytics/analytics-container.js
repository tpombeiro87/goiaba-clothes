import React from 'react'
import Head from 'next/head'

const setGTM = () => ({
  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5KPH82B');`,
})

const TagManagerContainer = () => (
  <noscript>
    <iframe
      src='https://www.googletagmanager.com/ns.html?id=GTM-5KPH82B'
      height='0'
      width='0'
      style={{ display: 'none', visibility: 'hidden' }}
    />
  </noscript>
)

class AxeptioContainer extends React.Component {
  componentDidMount () {
    var el = document.createElement('script')
    el.setAttribute('src', 'https://static.axept.io/sdk.js')
    el.setAttribute('type', 'application/javascript')
    el.setAttribute('async', true)
    el.setAttribute('data-id', '5cd97d6217a4e71c45db16a8')
    document.body.appendChild(el)
  }

  render () {
    return null
  }
}

const AnalyticsContainer = () => (
  <>
    <Head>
      <script dangerouslySetInnerHTML={setGTM()} />
    </Head>
    <TagManagerContainer />
    <AxeptioContainer />
  </>
)

export default AnalyticsContainer
