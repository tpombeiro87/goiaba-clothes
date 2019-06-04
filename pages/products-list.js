import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import RegularPage from '../components/layouts/regular-page'
import { sortingOptions, DropdownSorter } from '../components/dropdown-sorter'
import { products } from '../contentful-data/utils'
import Breadcrumb from '../components/breadcrumb'

const DEFAULT_PRODUCT_IMAGE = '/static/no-product-image.png'

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 10px;
`

const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const ProductWrapper = styled.a`
  max-width: 300px;
  padding-right: 20px;
  text-align: center;
  text-decoration-line: none;
  color: black;
`

const ProductThumbnail = styled.img`
  height: 400px;
  width: 300px;
  background-repeat: no-repeat;
  background-size: 327px 442px;
  background-color: #abaaaa8c;
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
  padding-left: 6px;
  padding-right: 6px;
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
          <Breadcrumb currentTitle='Colecção' fatherLink='/' fatherTitle='Home' />
          <DropdownSorter onSortingChange={this.handleSortingChange} sortingBy={sortingBy} />
        </TopWrapper>
        <ProductListWrapper>
          { sortedProducts
            .map(product => {
              const photos = product.fields.photos
              const mainImage = photos.length > 0 ? photos[0].fields.file.url : DEFAULT_PRODUCT_IMAGE
              const hoverImage = photos.length > 1 ? photos[1].fields.file.url : null
              return (
                <Link href={`/product/${product.fields.slug}`} key={product.fields.slug} passHref>
                  <ProductWrapper>
                    <ProductThumbnail
                      hoverImage={hoverImage}
                      key={product.fields.slug}
                      mainImage={mainImage} />
                    <ProductTitle>
                      {product.fields.highlight && <Fragment><img alt='Destacado' src='/static/icons/star.png' />&nbsp;</Fragment> }
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
