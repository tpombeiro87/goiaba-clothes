
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TitleElement = styled.h1`
  letter-spacing: 2px;
  line-height: 22px;
  font-size: 13px;
  text-transform: uppercase;
  font-size: 19.5px;
  margin-block-start: 1em;
  margin-block-end: 1em;
`

const Title = ({ title }) =>
  <TitleElement>{title}</TitleElement>

Title.propTypes = {
  title: PropTypes.string,
}

export default Title
