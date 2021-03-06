import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonElement = styled.button`
    ${props => props.fullWidth
    ? 'width: 100%;'
    : 'max-width: 300px;'}

    margin: 15px 0 15px 0;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 3px;

    padding: 15px 38px;
    background-color: black;
    color: white;
    cursor: pointer;
    transition: all .2s ease-in;

    :hover {
      background-color: #ffffff;
      border: 1px solid #000000;
      color: #000000;
    }
`

const Button = ({ children, onClick, ...rest }) => (
  <ButtonElement onClick={onClick} {...rest}>
    {children}
  </ButtonElement>
)

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
}

export default Button
