import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PlusSvg from './plus-svg'
import MinusSvg from './minus-svg'

const CollapsibleHeaderWrapper = styled.div`
  cursor: pointer;
  min-height: 32px;
  display: flex;
  align-items: center;
`

const IconRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    display: block;
    fill: black;
  }
`

const Text = styled.span`
  display: block;
  font-size: 11px;
  padding-left: 12px;
  letter-spacing: 2px;
  font-weight: bold;
  text-transform: uppercase;
`

const CollapsibleHeader = ({ isOpen, label, ...rest }) => {
  return (
    <CollapsibleHeaderWrapper {...rest}>
      <IconRoot>
        {isOpen
          ? <MinusSvg />
          : <PlusSvg />
        }
      </IconRoot>
      <Text>{label}</Text>
    </CollapsibleHeaderWrapper>
  )
}

CollapsibleHeader.propTypes = {
  isOpen: PropTypes.bool,
  label: PropTypes.node,
}

export default CollapsibleHeader
