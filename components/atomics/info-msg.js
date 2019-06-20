
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InfoMsgElement = styled.h3`
  font-size: 14px;
  color: #9E9E9E;
`

const InfoMsg = ({ msg }) =>
  <InfoMsgElement>{msg}</InfoMsgElement>

InfoMsg.propTypes = {
  msg: PropTypes.string,
}

export default InfoMsg
