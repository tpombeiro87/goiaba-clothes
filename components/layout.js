import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled, { injectGlobal } from 'styled-components'

import Header from './header'
import Footer from './footer'

injectGlobal`
  html, body, #root {
    height: 100%;
    margin: 0;
    width: 100%;
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
  padding-top: 85px;
  min-height: calc(100vh - 270px);
  padding-right: 10px;
  padding-left: 10px;
  margin-right: auto;
  margin-left: auto;
  width: 1045px;
`

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
  }

  render () {
    const { children, title = '' } = this.props

    return (
      <Root>
        {title &&
          <Head>
            <title>Goiaba - {title}</title>
          </Head>
        }

        <Header />

        <Main>
          {children}
        </Main>

        <Footer />
      </Root>
    )
  }
}
