import React from 'react'

import RegularPage from '../components/layouts/regular-page'
import { generateContactStructedData } from '../components/utils/google-structured-data'

const UserSupport = () => {
  const metaTags = (
    <script dangerouslySetInnerHTML={{ __html: generateContactStructedData() }} type='application/ld+json' />
  )
  return (
    <RegularPage metaTags={metaTags} pageId='/user-support' />
  )
}

export default UserSupport
