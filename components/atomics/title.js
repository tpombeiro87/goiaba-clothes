
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const sizes = {
  'small': '12',
  'midd': '18',
  'big': '19.5',
}

const TitleElement = styled.h1`
  letter-spacing: 3px;
  line-height: 23px;
  text-transform: ${props => props.uppercase ? 'uppercase' : ''};
  margin-block-start: 1em;
  margin-block-end: 1em;
  color: #000;

  ${props => props.bold && `
    font-weight: ${props.bold};
  `}

  ${props => props.size && `
    font-size: ${sizes[props.size]}px;
  `}
`

const Title = ({ bold = 'normal', title, uppercase = true, size = 'big', children }) =>
  <TitleElement bold={bold} size={size} uppercase={uppercase}>
    {children || title}
  </TitleElement>

Title.propTypes = {
  children: PropTypes.node,
  bold: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  uppercase: PropTypes.bool,
}

export default Title
