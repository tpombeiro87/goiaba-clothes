import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { compactVersionMediaQuery } from '../utils/responsive-utils'

const HamburguerWrapper = styled.button`
  display: none;
  @media ${compactVersionMediaQuery} {
    display: inline-block;
  }
  background: white;
  border: none;
  color: black;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  padding: 15px 0 15px 15px;
  font-size: 0.875em;
  :focus {
    outline: none;
  }
`

const Svg = styled.svg`
  display: inline-block;
  height: 1em;
  width: 1em;
  vertical-align: middle;
  position: relative;
  top: -0.0625em;

  width: 2em;
  height: 2em;
  top: 0;
`

const Line = styled.path`
  opacity: 1;
  transform: rotate(0) translateY(0) translateX(0);
  transform-origin: 1em 1em;
  transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
`

const Line1 = styled(Line)`
  transform-origin: 1em 2.5em;
  ${props => props.isAcitve && `
    transform: rotate(45deg) translateY(0) translateX(0);
  `}
`

const Line2 = styled(Line)`
  transform-origin: 1em 2.5em;
  ${props => props.isAcitve && `
    opacity: 0;
  `}
`

const Line3 = styled(Line)`
  transform-origin: 1em 4.5em;
  ${props => props.isAcitve && `
    transform: rotate(-45deg) translateY(0em) translateX(0em);
  `}
`

const HamburguerMenu = ({ isAcitve, onClick }) =>
  <HamburguerWrapper aria-label='Menu de navegação' onClick={onClick}>
    <Svg ariaHidden version='1.1' viewBox='0 0 100 100' x='0px' xmlns='http://www.w3.org/2000/svg' y='0px'>
      <g>
        <Line1 d='M5 13h90v14H5z' isAcitve={isAcitve} />
        <Line2 d='M5 43h90v14H5z' isAcitve={isAcitve} />
        <Line3 d='M5 73h90v14H5z' isAcitve={isAcitve} />
      </g>
    </Svg>
  </HamburguerWrapper>

HamburguerMenu.propTypes = {
  onClick: PropTypes.func,
  isAcitve: PropTypes.bool,
}

export default HamburguerMenu
