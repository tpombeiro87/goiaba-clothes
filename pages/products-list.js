import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import RegularPage from '../components/layouts/regular-page'
import { sortingOptions, DropdownSorter } from '../components/dropdown-sorter'
import { products } from '../contentful-data/utils'
import Breadcrumb from '../components/breadcrumb'
import { DEFAULT_PRODUCT_IMAGE } from '../components/utils/constants'

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

const sortProducts = (sortingBy) => {
  let sortedProducts = products
    .slice()
    .sort(sortingOptions.find(sortingOption => sortingOption.value === sortingBy).sortFn)

  if (sortingBy.indexOf('desc') !== -1) {
    sortedProducts = sortedProducts.reverse()
  }
  return sortedProducts
}

/**
 * THE BUG
 * so wen the server dom is diferent from the generated at first's renders (render and even if we trigger on the did mount)
 * React does not update the img component even when explicitly the properties have changed
 * Does not happens to p elements
 *
 * Another curiosity is that the server generates a sorted list different than the browser for no evident reason
 */
class ProductList extends Component {
  static propTypes = {
    initialSortedProducts: PropTypes.array,
  }

  static getInitialProps () {
    return { initialSortedProducts: sortProducts('highlight') }
  }

  constructor (props) {
    super(props)
    const sortingBy = 'highlight'
    this.state = {
      sortingBy,
      sortedProducts: props.initialSortedProducts,
      // sortedProducts: sortProducts(sortingBy), // uncomemnt this line to generate bug
    }
  }

  handleSortingChange = (event) => {
    const sortingBy = event.target.value
    this.setState({
      sortingBy,
      sortedProducts: sortProducts(sortingBy),
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
              // const z = Math.random()
              return (
                <Link href={`/product/${product.fields.slug}`} key={product.fields.slug} passHref>
                  <ProductWrapper>
                    <ProductThumbnail
                      alt={product.fields.title}
                      hoverImage={hoverImage}
                      mainImage={mainImage}
                    />
                    { /* DEBUGING WIERD BEHAVIOUR THAT THE IMAGE DOES NOT UPDATE ON THE FIRST RENDER
                      <p
                        src={mainImage}
                        alt={product.fields.title + z + '-' + Math.random()}
                        hoverImage={hoverImage}
                        mainImage={mainImage}>{product.fields.title}</p>
                      <img alt={product.fields.title + z + '-' + Math.random()} />
                      */
                    }
                    <ProductTitle>
                      {product.fields.highlight && <Fragment><img alt='Destacado' src='/static/icons/star.png' />&nbsp;</Fragment> }
                      {/* product.fields.title + z + '-' + Math.random() */}
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
