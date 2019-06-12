import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import NextLink from 'next/link'

import IconRoot from './icons/icon-root'
import PlusSvg from './icons/plus-svg'
import MinusSvg from './icons/minus-svg'
import Link from './link'
import Title from './title'

const Wrapper = styled.div`
  margin-top: 30px;
`

const ProductWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const MiniImg = styled.img`
  width: 40px;
  height: 55px;
`

const ControlsWrap = styled.div`
  display: flex;
`

const ControlWrap = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  cursor: pointer;
`
const Details = styled.div`
  flex-grow: 1;
  margin-left: 15px;
`

const Total = styled.p`
  text-align: right;
`

const NoProductsText = styled.p`
  a {
    color: #000;
  }
`

const CartSummary = ({ cart, onRemoveCartItem, onAddCartItem }) => {
  let total = 0
  if (!cart) {
    return null
  }

  return (
    <Fragment>
      <Title title='Resumo do Pedido' />
      {
        Object.keys(cart).length === 0
          ? <NoProductsText>Sem produtos no carrinho. Pode escolher algo na <NextLink href='/products-list' passHref><a aria-label='ir para a colecção'>colecção</a></NextLink>.</NoProductsText>
          : <Wrapper>
            {
              Object.keys(cart).map(productSlug => {
                const cartItem = cart[productSlug]
                const imageSrc = cartItem.fields.photos.length > 0
                  ? cartItem.fields.photos[0].fields.file.url
                  : '/static/no-product-image.png'
                total += cartItem.quantity * cartItem.fields.price
                return (
                  <ProductWrap key={productSlug}>
                    <Link aria-label={cartItem.fields.title} passHref url={`/product/${productSlug}`}>
                      <MiniImg alt={cartItem.fields.title} src={imageSrc} />
                    </Link>
                    <Details>{`${cartItem.fields.title} - #${cartItem.quantity}`}</Details>
                    <ControlsWrap>
                      <ControlWrap><IconRoot onClick={() => onRemoveCartItem(productSlug)} svg={<MinusSvg />} /></ControlWrap>
                      <ControlWrap><IconRoot onClick={() => onAddCartItem(productSlug)} svg={<PlusSvg />} /></ControlWrap>
                    </ControlsWrap>
                  </ProductWrap>
                )
              })
            }
            <Total><b>TOTAL</b> {total}€</Total>
          </Wrapper>
      }
    </Fragment>
  )
}
CartSummary.propTypes = {
  cart: PropTypes.object,
  onRemoveCartItem: PropTypes.func,
  onAddCartItem: PropTypes.func,
}

export default CartSummary
