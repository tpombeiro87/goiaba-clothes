import React from 'react'

import RegularPage from '../components/layout/regular-page'
import { generateContactStructedData } from '../components/utils/google-structured-data'

const About = () => {
  return (
    <RegularPage metaTags={generateContactStructedData()} pageId='/about' />
  )
}

export default About
