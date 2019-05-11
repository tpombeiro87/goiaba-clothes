import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { compactVersionMediaQuery } from '../utils/responsive-utils'

import NavLink from './nav-link'
import HamburguerMenuA from './hamburguer-menu'

const Nav = styled.nav`
  margin-left: 40px;
`

const LinksWrapper = styled.div`
  display: unset;
  @media ${compactVersionMediaQuery} {
    ${props => !props.hamburguerMenuOpen
    ? 'display: none'
    : `transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
       transform-origin: 1em 2.5em;
       display: flex;
       flex-direction: column;
       position: absolute;
       right: 0px;
       top: 76px;
       width: 100%;
       background: white;
       border-bottom: solid;
       border-width: 1px;
       border-color: #c6c6c6;`};
  }
`

const Navigation = ({ hamburguerMenuOpen, onToggleHamburguerMenu }) => (
  <Nav>
    <HamburguerMenuA isAcitve={hamburguerMenuOpen} onClick={onToggleHamburguerMenu} />

    <LinksWrapper hamburguerMenuOpen={hamburguerMenuOpen}>
      <NavLink title='Produtos' url='/products-list' />
      <NavLink title='Informações' url='/about' />
      <NavLink title='Comprar' url='/contact' />
    </LinksWrapper>
  </Nav>
)

Navigation.propTypes = {
  onToggleHamburguerMenu: PropTypes.func,
  hamburguerMenuOpen: PropTypes.bool,
}

export default Navigation
