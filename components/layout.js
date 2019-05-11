import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled, { injectGlobal } from 'styled-components'

import { wideVersionMediaQuery } from './utils/responsive-utils'
import Header from './header/index.js'
import Footer from './footer'
import ScrollToTopBtn from './scroll-to-top-btn'

injectGlobal`
  html, body, #root {
    height: 100%;
    margin: 0;
    width: 100%;
    font-family: Arial, sans-serif;
    min-width: 320px;
  }
`

const Root = styled.div`
  height: 100%;
  width: 100vw;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-wrap: wrap;
`

const Main = styled.main`
  min-width: 320px;
  min-height: calc(100vh - 270px);
  padding-left: 20px;
  padding-right: 20px;
  margin-right: auto;
  margin-left: auto;
  @media ${wideVersionMediaQuery} {
    margin-top: 85px;
    width: 985px;
  }
`

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
  }

  constructor (props) {
    super(props)

    this.headerRef = React.createRef()

    this.state = {
      hasScrooled: false,
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setState({ hasScrooled: window.scrollY > 80 })
  }

  handleScrollToTop = () => {
    console.log(this.headerRef.current)
    this.headerRef.current
      .scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
  }

  render () {
    const { children, title = '' } = this.props
    const { hasScrooled } = this.state

    return (
      <Root>
        <Head>
          <title>
            {
              title
                ? `Goiaba - ${title}`
                : `Goiaba - site`
            }
          </title>
        </Head>

        <Header ref={this.headerRef} />
        <Main>
          {children}
        </Main>
        <ScrollToTopBtn onClick={this.handleScrollToTop} show={hasScrooled} />
        <Footer />
      </Root>
    )
  }
}
