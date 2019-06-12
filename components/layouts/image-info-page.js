import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { pageContentFetcher } from '../../contentful-data/utils'
import Breadcrumb from '../breadcrumb'
import { compactVersionMediaQuery, wideVersionMediaQuery } from '../utils/responsive-utils'

import BaseLayout from './base'

const Spacer = styled.div`
  margin-top: 2em;
`

const Wrapper = styled.div`
  display: flex;
  position: relative;
  @media ${compactVersionMediaQuery} {
    flex-direction: column;
  }

  @media ${wideVersionMediaQuery} {
    margin-top: 30px;
  }
`
const InfoWrap = styled.div`
  @media ${wideVersionMediaQuery} {
    width 50%;
  }
`

const Title = styled.h2`
  font-family: Arial, sans-serif;
  color: black;
  line-height: 1;
  font-weight: normal;
  text-transform: uppercase;

  @media ${compactVersionMediaQuery} {
    font-size: 1.5em;
  }
  @media ${wideVersionMediaQuery} {
    letter-spacing: 15px;
    position: absolute;
    right: 15px;
    font-size: 55px;
  }
`
const Info = styled.div`
  @media ${wideVersionMediaQuery} {
    margin-top: 177px;
    margin-left: 20px;
  }
  letter-spacing: 2px;
  line-height: 22px;
  font-size: 13px;
  h2 {
    margin-block-start: 2em;
    margin-block-end: 1em;
    text-transform: uppercase;
  }
`

const Img = styled.img`
  background-color: #acc46e;
  @media ${wideVersionMediaQuery} {
    width 50%;
    min-width: 483px;
    max-height: 631px;
  }
  max-width:100%;
  max-height:100%;
`

const ImageInfoPage = ({ pageId, metaTags }) => {
  const pageData = pageContentFetcher(pageId)
  const ImgSrc = pageData.fields.heroImage
    ? pageData.fields.heroImage.fields.file.url
    : ''
  return (
    <BaseLayout
      metaTags={<Fragment>
        {metaTags}
        <meta content={pageData.fields.seo} name='description' />
      </Fragment>}
      title={pageData.fields.title}>
      <Spacer />
      <Breadcrumb currentTitle={pageData.fields.title} fatherLink='/' fatherTitle='Home' />
      <Wrapper>
        <Title>{pageData.fields.title}</Title>
        <Img alt='hero image' src={ImgSrc} />
        <InfoWrap>
          <Info dangerouslySetInnerHTML={{ __html: pageData.fields.body }} />
        </InfoWrap>
      </Wrapper>
    </BaseLayout>
  )
}

ImageInfoPage.propTypes = {
  metaTags: PropTypes.object,
  pageId: PropTypes.string,
}

export default ImageInfoPage
