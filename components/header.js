import React, { Fragment } from 'react'
import styled from 'styled-components'

import Link from './link'

const BIG_HEADER_HEIGHT = 120
const SMALL_HEADER_HEIGHT = 80

const Header = styled.header`
  ${props => props.hasScrooled
    ? `height: ${SMALL_HEADER_HEIGHT}px;
       position: fixed;
       top: 0;`
    : `height: ${BIG_HEADER_HEIGHT}px;`};

  width: 100%;
  background-color: #FFF;

  font-family: Helvetica;
  font-size: 14px;

  border-bottom: solid;
  border-width: 1px;
  border-color: #c6c6c6;
  padding-left: 20px;
  z-index: 100;
`

const Wrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 1045px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoSymbol = styled.img`
  width: 50px;
`

const LogoText = styled.img`
  width: 75px;
`

const Nav = styled.nav`
  margin-left: 40px;
`
const header = () => {
  const hasScrooled = true// window && window.scrollY > BIG_HEADER_HEIGHT

  return (
    <Header hasScrooled={hasScrooled}>
      <Wrapper>
        <Link url='/' >
          <Fragment>
            <LogoSymbol src='/static/logo/big.png' />
            <LogoText src='/static/logo/text.png' />
          </Fragment>
        </Link>

        <Nav>
          <Link title='Produtos' url='/products-list' />
          <Link title='Informações' url='/about' />
          <Link title='Comprar' url='/contact' />
        </Nav>
      </Wrapper>
    </Header>
  )
}

export default header
