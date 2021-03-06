import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import NextLink from 'next/link'
import styled from 'styled-components'

const InnerLink = styled.a`
  font-family: Arial, sans-serif;
  text-decoration-line: underline;

  ${props => props.secondary
    ? `
    color: #0000008f;
    letter-spacing: 2px;
    font-size: 12px;
    line-height: 1;

    padding-top: 18px;
    padding-bottom: 18px;

    :hover {
      color: #9D9D9C;
    }
    `
    : `
    margin-right: 20px;
    color: black;
    text-transform: uppercase;
    :hover {
      color: #909090;
    }
  `}
`
const PlainLink = styled.a`
  display: flex;
  align-items: center;
`

const Link = ({ url, router, title, children, secondary, ...rest }) => (
  <NextLink href={url} key={url} passHref prefetch>
    { children
      ? <PlainLink {...rest}>{children}</PlainLink>
      : <InnerLink active={url === router.pathname} secondary={secondary} {...rest}>{title}</InnerLink>
    }
  </NextLink>
)

Link.propTypes = {
  secondary: PropTypes.bool,
  children: PropTypes.node,
  url: PropTypes.string,
  router: PropTypes.object,
  title: PropTypes.string,
}

export default withRouter(Link)
