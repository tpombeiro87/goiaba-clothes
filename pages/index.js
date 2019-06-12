import React, { Fragment } from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

import BaseLayout from '../components/layouts/base'
import {
  compactVersionMediaQuery,
  wideVersionMediaQuery,
} from '../components/utils/responsive-utils'
import { pageContentFetcher } from '../contentful-data/utils'
import { generateContactStructedData } from '../components/utils/google-structured-data'

const HeroWrapperLink = styled.div`
  position: relative;
  margin-top: 30px;
  cursor: pointer;
`

const HeroTitle = styled.h1`
  font-family: Arial, sans-serif;
  color: black;
  letter-spacing: 2px;
  line-height: 1;

  text-transform: uppercase;
  font-size: 33px;
  @media ${wideVersionMediaQuery} {
    position: absolute;
    font-size: 44px;
    top: 41%;
    right: -70px;
    transform: rotate(-90deg);
  }
  text-align: center;
  margin: 15px;
`

const HeroImg = styled.img`
  width: 100%;
  width: 100%;
  background: #f6f5fd;
`
const HomeIndentity = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${compactVersionMediaQuery} {
    flex-direction: column;
  }
`
const HomeIndentityTitle = styled.div`
  margin-left: 20px;
  @media ${wideVersionMediaQuery} {
    width: 430px;
  }
  font-family: Arial, sans-serif;
  color: black;
  letter-spacing: 2px;
  @media ${compactVersionMediaQuery} {
    text-align: center;
  }
`
const LogoBigImg = styled.img`
  @media ${compactVersionMediaQuery} {
    width: 95px;
  }
`

const Home = () => {
  const pageData = pageContentFetcher('/')
  const heroImg = pageData.fields.heroImage
    ? pageData.fields.heroImage.fields.file.url
    : ''
  const metaTags = (
    <Fragment>
      <script dangerouslySetInnerHTML={{ __html: generateContactStructedData() }} type='application/ld+json' />
      <meta content={pageData.fields.seo} name='description' />
    </Fragment>
  )
  return (
    <BaseLayout metaTags={metaTags} title='Home Page'>
      <NextLink href='/products-list' passHref prefetch>
        <HeroWrapperLink>
          <a>
            <HeroTitle>Novidades</HeroTitle>
            <HeroImg alt='Novidades imagem' src={heroImg} />
          </a>
        </HeroWrapperLink>
      </NextLink>
      <HomeIndentity>
        <LogoBigImg alt='logo' src='/static/logo/big.png' />
        <HomeIndentityTitle dangerouslySetInnerHTML={{ __html: pageData.fields.body }} />
      </HomeIndentity>
    </BaseLayout>
  )
}

export default Home
