import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

import Layout from '../components/layout'
import { compactVersionMediaQuery, wideVersionMediaQuery } from '../components/utils/responsive-utils'

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
const HomeIndentityTitle = styled.h3`
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

const Home = () => (
  <Layout title='Home'>
    <NextLink href='/products-list' passHref prefetch>
      <HeroWrapperLink>
        <a>
          <HeroTitle>Novidades</HeroTitle>
          <HeroImg src='/static/hero-wanted.jpg'/>
        </a>
      </HeroWrapperLink>
    </NextLink>
    <HomeIndentity>
      <LogoBigImg alt='logo' src='/static/logo/big.png' />
      <HomeIndentityTitle>A GOIABA é uma marca portuguesa criada em Dezembro 2018, dedicada à comercialização de roupa e acessórios femininos.</HomeIndentityTitle>
    </HomeIndentity>
  </Layout>
)

export default Home
