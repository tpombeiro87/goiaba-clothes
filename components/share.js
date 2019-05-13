import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'next/router'

import IconRoot from '../components/icons/icon-root'
import FacebookSvg from '../components/icons/facebook-svg'
import LinkSvg from '../components/icons/link-svg'
import PintrestSvg from '../components/icons/pintrest-svg'

const COPY_NOT_STARTED = 'COPY_NOT_STARTED'
const COPY_ONGOING = 'COPY_ONGOING'
const COPY_SUCCESS = 'COPY_SUCCESS'

const Wrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px 10px 10px;

  > * {
    margin-right: 15px;
  }
`

const CopyInput = styled.input`
  border: none;
  color: transparent;
`

const Anchor = styled.a`
  cursor: pointer;
`

class Share extends Component {
  textArea = React.createRef()
  state = { copy: COPY_NOT_STARTED }

  handleCopyToClipboard = () => {
    this.setState(
      { copy: COPY_ONGOING },
      this.executeCopy
    )
  }

  executeCopy = () => {
    this.textArea.current.select()
    document.execCommand('copy')
    this.setState({ copy: COPY_SUCCESS })
  }

  render () {
    const { copy } = this.state
    const { router } = this.props
    const url = `https://www.goiabaclothes.pt${router.asPath}`
    return (
      <Wrap>
        <Anchor href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} rel='noopener noreferrer' target='_blank'>
          <IconRoot svg={<FacebookSvg />} />
        </Anchor>
        <Anchor onClick={this.handleCopyToClipboard}>
          <IconRoot svg={<LinkSvg />} />
        </Anchor>
        <Anchor href={`https://www.pinterest.pt/pin/create/button/?url=${url}&autologin=true`} rel='noopener noreferrer' target='_blank'>
          <IconRoot svg={<PintrestSvg />} />
        </Anchor>
        { copy === COPY_ONGOING &&
          <CopyInput innerRef={this.textArea} value={url} />
        }
      </Wrap>
    )
  }
}

Share.propTypes = {
  router: PropTypes.object,
}

export default withRouter(Share)
