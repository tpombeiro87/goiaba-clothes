import React from 'react'
import PropTypes from 'prop-types'

import Collapsible from '.'

class CollapsibleContainer extends React.Component {
  constructor (props) {
    super()

    this.state = { isOpen: props.isOpen || false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  render () {
    const { isOpen } = this.state

    return (
      <Collapsible
        isOpen={isOpen}
        onClick={this.handleClick}
        {...this.props}
      />
    )
  }
}

CollapsibleContainer.propTypes = {
  isOpen: PropTypes.bool,
}

export default CollapsibleContainer
