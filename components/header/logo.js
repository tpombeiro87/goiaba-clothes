import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

const LogoSymbol = styled.img`
  width: 50px;
`

const LogoText = styled.img`
  width: 75px;
`

const PlainLink = styled.a`
  display: flex;
  align-items: center;
`

const Logo = () => (
  <NextLink href='/' passHref prefetch>
    <PlainLink aria-label='Logo'>
      <LogoSymbol alt='logo' src='/static/logo/big.png' />
      <LogoText alt='logo' src='/static/logo/text.png' />
    </PlainLink>
  </NextLink>
)

export default Logo
