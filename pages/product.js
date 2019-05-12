import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'

import RegularPage from '../components/regular-page'
import Slider from '../components/slider'
import { productContentFetcher } from '../contentful-data/utils'
import { CollapsibleContainer } from '../components/collapsible'

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
`

const InfoWrapper = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
`

const ProductTitle = styled.h1`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 24px;
  letter-spacing: 3px;
  color: #000;
`

const ProductDescription = styled.h2`
  padding: 0px 20px 10px 10px;
  color: #000;
  font-size: 12px;
  letter-spacing: 2px;
  line-height: 23px;
  font-weight: 400;
`

const ProductPrice = styled.h3`
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-stretch: 100%;
  font-weight: 700;
  color: #000;
  line-height: 20px;
  letter-spacing: 3px;
`

const Breadcrumb = styled.div`
  white-space: nowrap;
  font-size: 11px;
  letter-spacing: 1px;

  margin-left: 0;
  line-height: 26px;
  text-transform: uppercase;

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

const ProductPage = ({ product = { fields: { photos: [], file: {} } } }) => (
  <RegularPage>
    <Wrapper>
      <Slider images={product.fields.photos.map(photo => photo.fields.file.url)} />
      <InfoWrapper>
        <Breadcrumb>
          <ul>
            <li><Link href={`/products-list`} passHref prefetch>Inicio</Link> |&nbsp;</li>
            <li>{product.fields.title}</li>
          </ul>
        </Breadcrumb>
        <ProductTitle>{product.fields.title}</ProductTitle>
        <ProductPrice>{(product.fields.price).toFixed(2)} €</ProductPrice>

        <CollapsibleContainer label='Descrição'>
          <ProductDescription>{product.fields.description || 'Sem descrição'}</ProductDescription>
        </CollapsibleContainer>
        <CollapsibleContainer label='Características'>
          <ProductDescription>{product.fields.characteristics || 'Sem características'}</ProductDescription>
        </CollapsibleContainer>
        <CollapsibleContainer label='Partilhar'>
          <p>facebook</p>
        </CollapsibleContainer>

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
