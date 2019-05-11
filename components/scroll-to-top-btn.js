import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ScrollToTopBtnWrapper = styled.button`
  z-index: 999;
  text-decoration: none;
  position: fixed;
  bottom: 30px;
  right: 10px;
  overflow: hidden;
  width: 36px;
  height: 36px;
  border: none;
  background-color: #7f7f7f;
  font-size: 0;
  border-radius: 36px;
  -moz-border-radius: 36px;
  cursor: pointer;
  transition: all .3s linear;

  :hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.35);
  }
  :focus {
    outline: none;
  }
`

const Triangle = styled.span`
  width: 0;
  height: 0;
  display: block;
  overflow: hidden;
  float: left;
  opacity: 1!important;
  font-size: 0;
  -moz-opacity: 1!important;
  filter: alpha(opacity=100)!important;
  border-left: solid 7px transparent;
  border-right: solid 7px transparent;
  border-bottom: solid 12px #fff;
  margin: 5px 5px 6px 5px;
`
const ScrollToTopBtn = ({ onClick }) =>
  <ScrollToTopBtnWrapper onClick={onClick}>
    <Triangle />
  </ScrollToTopBtnWrapper>

ScrollToTopBtn.propTypes = {
  onClick: PropTypes.func,
}

export default ScrollToTopBtn
