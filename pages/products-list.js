import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import RegularPage from '../components/regular-page'
import { sortingOptions, DropdownSorter } from '../components/dropdown-sorter'
import { products } from '../contentful-data/utils'

const DEFAULT_PRODUCT_IMAGE = '/static/no-product-image.png'

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
`

const Title = styled.h1`
  font-family: Arial, sans-serif;
  font-size: 15px;
  font-stretch: 100%;
  font-weight: 700;
  text-transform: uppercase;
`

const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ProductWrapper = styled.a`
  max-width: 320px;
  padding-right: 20px;
  text-align: center;
  text-decoration-line: none;
  color: black;
`

const ProductThumbnail = styled.img`
  width: 327px;
  height: 442px;
  background-repeat: no-repeat;
  background-size: 327px 442px;
  ${props => `
    content: url('${props.mainImage}');
    background-image: url('${props.mainImage}');
  `}
  :hover {
    ${props => props.hoverImage && `
    content: url('${props.hoverImage}');
    `};
  }
`
const ProductTitle = styled.h2`
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

class ProductList extends Component {
  constructor () {
    super()
    const sortingBy = 'highlight'
    this.state = {
      sortingBy,
      sortedProducts: this.sortProducts(sortingBy),
    }
  }

  sortProducts (sortingBy) {
    let sortedProducts = [...products]
      .sort(sortingOptions.find(sortingOption => sortingOption.value === sortingBy).sortFn)

    if (sortingBy.indexOf('desc') !== -1) {
      sortedProducts = sortedProducts.reverse()
    }
    return sortedProducts
  }

  handleSortingChange = (event) => {
    const sortingBy = event.target.value
    this.setState({
      sortingBy,
      sortedProducts: this.sortProducts(sortingBy),
    })
  }

  render () {
    const { sortedProducts, sortingBy } = this.state
    return (
      <RegularPage>
        <TopWrapper>
          <Title>Colecção</Title>
          <DropdownSorter onSortingChange={this.handleSortingChange} sortingBy={sortingBy} />
        </TopWrapper>
        <ProductListWrapper>
          { sortedProducts
            .map(product => {
              const photos = product.fields.photos
              const mainImage = photos.length > 0 ? photos[0].fields.file.url : DEFAULT_PRODUCT_IMAGE
              const hoverImage = photos.length > 1 ? photos[1].fields.file.url : null
              return (
                <Link href={`/product?slug=${product.fields.slug}`} key={product.fields.slug} passHref prefetch>
                  <ProductWrapper>
                    <ProductThumbnail
                      key={product.fields.slug}
                      hoverImage={hoverImage}
                      mainImage={mainImage} />
                    <ProductTitle>
                      {product.fields.highlight && <Fragment><img alt='Destacado' src='/static/star.png' />&nbsp;</Fragment> }
                      {product.fields.title}
                    </ProductTitle>
                    <ProductPrice>{product.fields.price} €</ProductPrice>
                  </ProductWrapper>
                </Link>
              )
            })}
        </ProductListWrapper>
      </RegularPage>
    )
  }
}

export default ProductList
