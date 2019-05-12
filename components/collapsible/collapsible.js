import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CollapsibleHeader from './collapsible-header'

const CollapsibleContent = styled.div`
  min-height: 32px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

const Collapsible = ({
  children,
  isOpen,
  label,
  onClick,
  ...rest
}) => (
  <div>
    <CollapsibleHeader
      isOpen={isOpen}
      label={label}
      onClick={onClick}
      {...rest}
    />
    {isOpen ? <CollapsibleContent>{children}</CollapsibleContent> : null}
  </div>
)

Collapsible.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  label: PropTypes.node,
  onClick: PropTypes.func,
}

export default Collapsible
