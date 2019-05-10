import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import NextLink from 'next/link'
import styled from 'styled-components'

import { compactVersionMediaQuery, wideVersionMediaQuery } from '../utils/responsive-utils'

const InnerLink = styled.a`
  ${props => !props.active
    ? `text-decoration-line: none;`
    : `text-decoration-line: underline;`}

  @media ${wideVersionMediaQuery} {
    margin-left: 20px;
    :hover {
      color: #909090;
    }
  }
  @media ${compactVersionMediaQuery} {
    padding: 40px;
    :hover {
      background-color: #80808017;
    }
  }

  font-family: Arial, sans-serif;
  color: black;
  text-transform: uppercase;
`

const NavLink = ({ url, router, title }) => (
  <NextLink href={url} key={url} passHref prefetch>
    <InnerLink active={url === router.pathname}>{title}</InnerLink>
  </NextLink>
)

NavLink.propTypes = {
  url: PropTypes.string,
  router: PropTypes.object,
  title: PropTypes.string,
}

export default withRouter(NavLink)
