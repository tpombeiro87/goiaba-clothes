import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const IconRootWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.align === 'start'
    ? 'flex-start;' : 'center;'}

  svg {
    width: 20px;
    display: block;
    fill: black;
  }
`

const IconRoot = ({ onClick, align, svg }) =>
  <IconRootWrapper align={align} onClick={onClick}>
    {svg}
  </IconRootWrapper>

IconRoot.propTypes = {
  align: PropTypes.string,
  svg: PropTypes.node,
  onClick: PropTypes.func,
}

export default IconRoot
