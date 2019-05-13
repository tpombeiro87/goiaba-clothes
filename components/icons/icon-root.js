import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const IconRootWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    display: block;
    fill: black;
  }
`

const IconRoot = ({ svg }) =>
  <IconRootWrapper>
    {svg}
  </IconRootWrapper>

IconRoot.propTypes = {
  svg: PropTypes.node,
}

export default IconRoot
