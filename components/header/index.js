import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { compactVersionMediaQuery, wideVersionMediaQuery } from '../utils/responsive-utils'

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
  @media ${wideVersionMediaQuery} {
    max-width: 985px;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
`

class Header extends Component {
  static propTypes = {
    innerRef: PropTypes.object,
  }

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
    const { innerRef } = this.props
    const { hamburguerMenuOpen } = this.state

    return (
      <Fragment>
        <a ref={innerRef} style={{ fontSize: '0px', color: 'transparent' }}>topo</a>
        <HeaderWrapper>
          <HeaderContent>
            <Logo />
            <Navigation hamburguerMenuOpen={hamburguerMenuOpen} onToggleHamburguerMenu={this.handleToggleHamburguerMenu} />
          </HeaderContent>
        </HeaderWrapper>

      </Fragment>
    )
  }
}

// eslint-disable-next-line react/display-name
export default React.forwardRef((props, ref) => <Header innerRef={ref} {...props} />)
