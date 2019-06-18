import React from 'react'

import RegularPage from '../components/layout/regular-page'
import { generateContactStructedData } from '../components/utils/google-structured-data'

const UserSupport = () =>
  <RegularPage metaTags={generateContactStructedData()} pageId='/user-support' />

export default UserSupport
