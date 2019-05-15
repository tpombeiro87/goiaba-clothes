import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactImageMagnify from 'react-image-magnify'

import IconRoot from '../icons/icon-root'
import LeftArrowSvg from '../icons/left-arrow-svg'
import RightArrowSvg from '../icons/right-arrow-svg'

const Wrapper = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
`

const WrapperImage = styled.div`
  height: 442px;
  width: 380px;
  background-color: #abaaaa8c;
`

const Button = styled.button`
  border: none;
  background: none;
  width: 35px;
  cursor: pointer;
`

class Slider extends Component {
  static propTypes = {
    images: PropTypes.array,
    isCompactVersionViewport: PropTypes.bool,
  }

  state = {
    current: 0,
  }

  handleNextSlide = () => {
    const current = this.state.current + 1
    this.setState({
      current: current >= this.props.images.length ? 0 : current,
    })
  }

  handlePreviousSlide = () => {
    const current = this.state.current - 1
    this.setState({
      current: current < 0 ? this.props.images.length - 1 : current,
    })
  }

  render () {
    const { current } = this.state
    const { images, isCompactVersionViewport } = this.props

    return <Wrapper>
      <Button onClick={this.handlePreviousSlide}><IconRoot svg={<LeftArrowSvg />} /></Button>
      <WrapperImage>
        <ReactImageMagnify {...{
          enlargedImagePosition: isCompactVersionViewport ? 'over' : 'beside',
          isEnlargedImagePortalEnabledForTouch: true,
          smallImage: {
            alt: `image: ${current}`,
            isFluidWidth: true,
            src: images[current],
          },
          largeImage: {
            src: images[current],
            width: 1200,
            height: 1800,
          },
        }} />
      </WrapperImage>
      <Button onClick={this.handleNextSlide}><IconRoot svg={<RightArrowSvg />} /></Button>
    </Wrapper>
  }
}

export default Slider
