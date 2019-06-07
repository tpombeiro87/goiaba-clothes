import React from 'react'

import ImageInfoPage from '../components/layouts/image-info-page'
import { generateContactStructedData } from '../components/utils/google-structured-data'

const About = () => {
  const metaTags = (
    <script type='application/ld+json'>{JSON.stringify(generateContactStructedData())}</script>
  )
  return (
    <ImageInfoPage metaTags={metaTags} pageId='/about' />
  )
}

export default About
