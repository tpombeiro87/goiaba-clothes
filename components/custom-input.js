import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.div`
  width 100%;
  display: flex;
  flex-direction: column;
  ${props => props.margin
    ? `margin: 25px 0 15px 0;`
    : `margin: 0px 0 15px 0;`}
`

const InputElement = styled.input`
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-color: #d8d8d8;
  border-width: 1px;
  transition: all .2s ease-in;
  height: 25px;
  :hover {
    border-color: black;
  }
  :focus {
    outline: none;
  }
`
const LabelElement = styled.label`
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2px;
`

class CustomInput extends Component {
  render () {
    const { fieldId, label, value, onInputChange, required, type } = this.props
    return (
      <Wrap margin={label}>
        <LabelElement>{required ? `*${label}` : label}</LabelElement>
        <InputElement onChange={(event) => onInputChange(fieldId, event.target.value)} required={required} type={type} value={value} />
      </Wrap>
    )
  }
}

CustomInput.propTypes = {
  fieldId: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  onInputChange: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string,
}

export default CustomInput
