import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 400px;
`

const MainImage = styled.img`
  width: 390px;
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
      <MainImage alt={this.state.current} src={images[this.state.current]} />
      <button onClick={this.handlePreviousSlide}>&#60;</button>
      <button onClick={this.handleNextSlide}>&#62;</button>
    </Wrapper>
  }
}

export default Slider
