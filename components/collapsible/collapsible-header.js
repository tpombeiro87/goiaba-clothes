import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import IconRoot from '../icons/icon-root'
import PlusSvg from '../icons/plus-svg'
import MinusSvg from '../icons/minus-svg'

const CollapsibleHeaderWrapper = styled.div`
  cursor: pointer;
  min-height: 32px;
  display: flex;
  align-items: center;
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
      <IconRoot
        svg={isOpen
          ? <MinusSvg />
          : <PlusSvg />
        }
      />
      <Text>{label}</Text>
    </CollapsibleHeaderWrapper>
  )
}

CollapsibleHeader.propTypes = {
  isOpen: PropTypes.bool,
  label: PropTypes.node,
}

export default CollapsibleHeader
