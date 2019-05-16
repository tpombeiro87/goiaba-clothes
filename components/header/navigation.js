import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

import { compactVersionMediaQuery } from '../utils/responsive-utils'

import NavLink from './nav-link'
import HamburguerMenuA from './hamburguer-menu'

const ANIMATION_DURATION = 250

const TRANSITIONS_STYLES = {
  entering: { transform: 'translate(730px, 0px)' },
  entered: { transform: 'translate(0px, 0px)' },
  exiting: { transform: 'translate(730px, 0px)' },
  exited: { display: 'none' },
}

const Nav = styled.nav`
  margin-left: 40px;
`

const LinksWrapper = styled.div`
  display: unset;
  @media ${compactVersionMediaQuery} {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0px;
    top: 76px;
    width: 100%;
    background: white;
    border-bottom: solid;
    border-width: 1px;
    border-color: #c6c6c6;
    transition: transform ${ANIMATION_DURATION}ms ease-out;
    ${props => TRANSITIONS_STYLES[props.elementState]};
    z-index: 1;
  }
`

const Navigation = ({ hamburguerMenuOpen, onToggleHamburguerMenu }) => (
  <Nav>
    <HamburguerMenuA isAcitve={hamburguerMenuOpen} onClick={onToggleHamburguerMenu} />

    <Transition in={hamburguerMenuOpen} timeout={ANIMATION_DURATION}>
      { elementState =>
        <LinksWrapper elementState={elementState} hamburguerMenuOpen={hamburguerMenuOpen}>
          <NavLink title='Colecção' url='/products-list' />
          <NavLink title='Informações' url='/about' />
          <NavLink title='Comprar' url='/contact' />
        </LinksWrapper>
      }
    </Transition>
  </Nav>
)

Navigation.propTypes = {
  onToggleHamburguerMenu: PropTypes.func,
  hamburguerMenuOpen: PropTypes.bool,
}

export default Navigation
