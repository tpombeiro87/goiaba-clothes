import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NextLink from 'next/link'

import { compactVersionMediaQuery } from './utils/responsive-utils'

// This is not working because almatch media n bomba ao inticio ?
const BreadcrumbWrap = styled.div`
  ${props => props.isVisible
    ? `display: block;`
    : `display: none;`}
  white-space: nowrap;
  font-size: 11px;
  letter-spacing: 1px;

  margin-left: 0;
  line-height: 26px;
  text-transform: uppercase;

  @media ${compactVersionMediaQuery} {
    margin-bottom: 10px;
    margin-left: 35px;
  }
  ul {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    color: #000;
  }
`

const ProductBreadcrumb = ({ isVisible, product }) =>
  <BreadcrumbWrap isVisible={isVisible}>
    <ul>
      <li><NextLink href={`/products-list`} passHref prefetch><a>Inicio</a></NextLink> |&nbsp;</li>
      <li>{product.fields.title}</li>
    </ul>
  </BreadcrumbWrap>

ProductBreadcrumb.propTypes = {
  isVisible: PropTypes.bool,
  product: PropTypes.object,
}

export default ProductBreadcrumb
