import React from 'react'

import RegularPage from '../components/layouts/regular-page'
import { generateContactStructedData } from '../components/utils/google-structured-data'

const Contacts = () => {
  const metaTags = (
    <script type='application/ld+json'>{JSON.stringify(generateContactStructedData())}</script>
  )
  return (
    <RegularPage metaTags={metaTags} pageId='/contacts' />
  )
}

export default Contacts
