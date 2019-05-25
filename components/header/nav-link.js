import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import NextLink from 'next/link'
import styled from 'styled-components'

import IconRoot from '../icons/icon-root'
import { AllMatchMedia, compactVersionMediaQuery, wideVersionMediaQuery } from '../utils/responsive-utils'

const InnerLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  width: 100%;
  text-decoration-line: none;

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

const Spacer = styled.div`
  margin-bottom: 5px;
  @media ${compactVersionMediaQuery} {
    margin-right: 12px;
  }
`
const Icon = ({ icon, title }) =>
  <AllMatchMedia>
    {
      ({ isCompactVersionViewport }) =>
        <Fragment>
          <Spacer>
            <IconRoot align='start' svg={icon} />
          </Spacer>
          { isCompactVersionViewport && title }
        </Fragment>
    }
  </AllMatchMedia>

Icon.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
}

const NavLink = ({ url, router, title, icon, onClick }) => (
  <NextLink href={url} key={url} passHref prefetch>
    <InnerLink active={url === router.pathname} onClick={onClick}>
      {icon
        ? <Icon icon={icon} title={title} />
        : title
      }
    </InnerLink>
  </NextLink>
)

NavLink.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  url: PropTypes.string,
  router: PropTypes.object,
  title: PropTypes.string,
}

export default withRouter(NavLink)
