import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled, { injectGlobal } from 'styled-components'

import { tinyVersionMediaQuery, wideVersionMediaQuery } from '../utils/responsive-utils'

import Header from './header'
import ScrollToTopBtn from './scroll-to-top-btn'
import Footer from './footer'

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


  margin-bottom: 1em;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  @media ${wideVersionMediaQuery} {
    margin-top: 4.68em;
    min-width: 61.5em;
    max-width: 61.5em;
  }

  padding-left: 1em;
  padding-right: 1em;
  @media ${tinyVersionMediaQuery} {
    margin-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
  }
`

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    metaTags: PropTypes.node,
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
    this.headerRef.current
      .scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
  }

  render () {
    const { children, title = '', metaTags } = this.props
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
          { metaTags }
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
