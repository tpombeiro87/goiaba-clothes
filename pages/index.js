import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'

const HeroWrapper = styled.div`
  margin-top: 30px;
`

const HeroTitle = styled.h1`
  font-family: Arial, sans-serif;
  color: black;
  letter-spacing: 2px;
  font-size: 44px;
  line-height: 1;

  text-transform: uppercase;
  position: absolute;
  text-align: center;
  top: 45%;
  right: 5%;
  transform: rotate(-90deg);
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
  width: 430px;
  font-family: Arial, sans-serif;
  color: black;
  letter-spacing: 2px;
`

const Home = () => (
  <Layout title='Home'>
    <HeroWrapper>
      <HeroTitle>Novidades</HeroTitle>
      <HeroImg src='/static/hero-wanted.jpg'/>
    </HeroWrapper>
    <HomeIndentity>
      <img alt='logo' src='/static/logo/big.png' />
      <HomeIndentityTitle>A GOIABA é uma marca portuguesa criada em Dezembro 2018, dedicada à comercialização de roupa e acessórios femininos.</HomeIndentityTitle>
    </HomeIndentity>
  </Layout>
)

export default Home
