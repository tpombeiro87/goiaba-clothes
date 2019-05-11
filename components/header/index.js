import React, { Component } from 'react'
import styled from 'styled-components'

import { compactVersionMediaQuery } from '../utils/responsive-utils'

import Logo from './logo'
import Navigation from './navigation'

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: #FFF;

  position: fixed;
  @media ${compactVersionMediaQuery} {
    position: relative;
  }

  border-bottom: solid;
  border-width: 1px;
  border-color: #c6c6c6;
  z-index: 100;
`

const HeaderContent = styled.div`
  padding-left: 20px;
  padding-right: 20px;

  margin-right: auto;
  margin-left: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

class Header extends Component {
  state = {
    hamburguerMenuOpen: false,
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleToggleHamburguerMenu = () => {
    this.setState((state) => ({
      hamburguerMenuOpen: !state.hamburguerMenuOpen,
    }))
  }

  render () {
    const { hamburguerMenuOpen } = this.state

    return (
      <HeaderWrapper>
        <HeaderContent>
          <Logo />
          <Navigation hamburguerMenuOpen={hamburguerMenuOpen} onToggleHamburguerMenu={this.handleToggleHamburguerMenu} />
        </HeaderContent>
      </HeaderWrapper>
    )
  }
}

export default Header
