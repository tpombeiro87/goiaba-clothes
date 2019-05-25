import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import IconRoot from './icons/icon-root'
import PlusSvg from './icons/plus-svg'
import MinusSvg from './icons/minus-svg'
import Link from './link'
import Title from './title'

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
  width: 25px;
  height: 25px;
  display: flex;
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
          ? <p>No items on your cart.</p>
          : <div>
            {
              Object.keys(cart).map(productSlug => {
                const cartItem = cart[productSlug]
                const imageSrc = cartItem.fields.photos.length > 0
                  ? cartItem.fields.photos[0].fields.file.url
                  : '/static/no-product-image.png'
                total += cartItem.quantity * cartItem.fields.price
                return (
                  <ProductWrap key={productSlug}>
                    <Link passHref url={`/product?slug=${productSlug}`}>
                      <MiniImg src={imageSrc} />
                    </Link>
                    {`${productSlug} - #${cartItem.quantity}`}
                    <ControlsWrap><IconRoot onClick={() => onRemoveCartItem(productSlug)} svg={<MinusSvg />} /></ControlsWrap>
                    <ControlsWrap><IconRoot onClick={() => onAddCartItem(productSlug)} svg={<PlusSvg />} /></ControlsWrap>
                  </ProductWrap>
                )
              })
            }
            <p><b>TOTAL</b> {total}€</p>
          </div>
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
