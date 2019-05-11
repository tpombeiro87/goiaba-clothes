import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled, { injectGlobal } from 'styled-components'

import { wideVersionMediaQuery } from './utils/responsive-utils'
import Header from './header/index.js'
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
  min-height: calc(100vh - 270px);
  padding-left: 20px;
  padding-right: 20px;
  margin-right: auto;
  margin-left: auto;
  @media ${wideVersionMediaQuery} {
    padding-top: 85px;
    width: 1045px;
  }
`

const ScrollToTopBtn = styled.button`
  z-index: 999;
  text-decoration: none;
  position: fixed;
  bottom: 30px;
  right: 10px;
  overflow: hidden;
  width: 36px;
  height: 36px;
  border: none;
  background-color: #7f7f7f;
  font-size: 0;
  border-radius: 36px;
  -moz-border-radius: 36px;
  cursor: pointer;
  transition: all .3s linear;

  :hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.35);
  }
  :focus {
    outline: none;
  }
`

const Triangle = styled.span`
  width: 0;
  height: 0;
  display: block;
  overflow: hidden;
  float: left;
  opacity: 1!important;
  font-size: 0;
  -moz-opacity: 1!important;
  filter: alpha(opacity=100)!important;
  border-left: solid 6px transparent;
  border-right: solid 6px transparent;
  border-bottom: solid 10px #fff;
  margin: 5px 6px 6px 6px;
`

export default class Layout extends Component {
  header = React.createRef()

  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
  }

  state = {
    hasScrooled: false,
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setState({ hasScrooled: window.scrollY > 80 })
  }

  handleScrollToTop = () => {
    // console.log(this.header)
    // this.header.current.scrollTo(0, 0)
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

        <Header ref={this.header} />

        <Main>
          {children}
        </Main>
        {hasScrooled &&
          <ScrollToTopBtn onClick={this.handleScrollToTop}>
            <Triangle />
          </ScrollToTopBtn>
        }
        <Footer />
      </Root>
    )
  }
}
