import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'

import RegularPage from '../components/regular-page'
import Slider from '../components/slider'
import { productContentFetcher } from '../contentful-data/utils'

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductTitle = styled.h2`
  font-family: Arial, sans-serif;
  font-size: 13px;
  font-stretch: 100%;
  font-weight: 400;
  text-transform: uppercase;
`

const ProductDescription = styled.h2`
  font-family: Arial, sans-serif;
  font-size: 13px;
  font-stretch: 100%;
  font-weight: 400;
  text-transform: uppercase;
`

const ProductPrice = styled.h3`
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-stretch: 100%;
  font-weight: 700;
`

const ProductPage = ({ product }) => (
  <RegularPage>
    <Link href={`/products-list`} passHref prefetch>&#60; Voltar a todos os produtos</Link>
    <Wrapper>
      <Slider images={product.fields.photos.map(photo => photo.fields.file.url)} />
      <InfoWrapper>
        <ProductTitle>{product.fields.title}</ProductTitle>
        <ProductDescription>{product.fields.description || 'Sem descrição'}</ProductDescription>
        <ProductPrice>{product.fields.price}</ProductPrice>
      </InfoWrapper>
    </Wrapper>
  </RegularPage>
)

ProductPage.getInitialProps = ({ query: { slug } }) => ({
  product: productContentFetcher(slug),
})

ProductPage.propTypes = {
  product: PropTypes.object,
}

export default ProductPage
