import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

import Layout from '../components/layout'
import { wideVersionMediaQuery } from '../components/utils/responsive-utils'

const HeroWrapperLink = styled.div`
  margin-top: 30px;
  cursor: pointer;
`

const HeroTitle = styled.h1`
  font-family: Arial, sans-serif;
  color: black;
  letter-spacing: 2px;
  font-size: 44px;
  line-height: 1;

  text-transform: uppercase;
  @media ${wideVersionMediaQuery} {
    position: absolute;
    top: 328px;
    right: -45px;
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
`
const HomeIndentityTitle = styled.h3`
  margin-left: 20px;
  @media ${wideVersionMediaQuery} {
    width: 430px;
  }
  font-family: Arial, sans-serif;
  color: black;
  letter-spacing: 2px;
`

const Home = () => (
  <Layout title='Home'>
    <NextLink href='/products-list' passHref prefetch>
      <HeroWrapperLink>
        <HeroTitle>Novidades</HeroTitle>
        <HeroImg src='/static/hero-wanted.jpg'/>
      </HeroWrapperLink>
    </NextLink>
    <HomeIndentity>
      <img alt='logo' src='/static/logo/big.png' />
      <HomeIndentityTitle>A GOIABA é uma marca portuguesa criada em Dezembro 2018, dedicada à comercialização de roupa e acessórios femininos.</HomeIndentityTitle>
    </HomeIndentity>
  </Layout>
)

export default Home
