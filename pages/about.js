import React from 'react'

import ImageInfoPage from '../components/layouts/image-info-page'
import { generateContactStructedData } from '../components/utils/google-structured-data'

const About = () => {
  const metaTags = (
    <script dangerouslySetInnerHTML={{ __html: generateContactStructedData() }} type='application/ld+json' />
  )
  return (
    <ImageInfoPage metaTags={metaTags} pageId='/about' />
  )
}

export default About
