import React from 'react'

import RegularPage from '../components/layout/regular-page'
import { generateContactStructedData } from '../components/utils/google-structured-data'

const Contacts = () => {
  return (
    <RegularPage metaTags={generateContactStructedData()} pageId='/contacts' />
  )
}

export default Contacts
