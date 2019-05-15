import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import IconRoot from '../icons/icon-root'
import LeftArrowSvg from '../icons/left-arrow-svg'
import RightArrowSvg from '../icons/right-arrow-svg'

const Wrapper = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
`

const WrapperImage = styled.div`
  position: relative;
  width: 380px;
`
const MainImage = styled.img`
  height: 507px;
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
    const { images } = this.props
    return <Wrapper>
      <Button onClick={this.handlePreviousSlide}><IconRoot svg={<LeftArrowSvg />} /></Button>
      <WrapperImage>
        <MainImage alt={this.state.current} src={images[this.state.current]} />
      </WrapperImage>
      <Button onClick={this.handleNextSlide}><IconRoot svg={<RightArrowSvg />} /></Button>
    </Wrapper>
  }
}

export default Slider
