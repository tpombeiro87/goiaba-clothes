import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'next/router'

import BaseLayout from '../components/layouts/base'
import Slider from '../components/slider'
import { productContentFetcher } from '../contentful-data/utils'
import { CollapsibleContainer } from '../components/collapsible'
import { compactVersionMediaQuery, AllMatchMedia } from '../components/utils/responsive-utils'
import Breadcrumb from '../components/breadcrumb'
import Share from '../components/share'
import CustomButton from '../components/custom-button'
import { addCartItem } from '../components/utils/local-storage'
import { DOMAIN, DEFAULT_PRODUCT_IMAGE } from '../components/utils/constants'

import ErrorPage from './_error'

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;

  margin-left: -32px;
  @media ${compactVersionMediaQuery} {
    margin-left: -15px;
    flex-direction: column;
  }
`

const Spacer = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
`

const InfoWrapper = styled.div`
  margin-left: 60px;
  @media ${compactVersionMediaQuery} {
      margin-left: 40px;
  }
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

const InfoMessage = styled.h3`
  font-size: 14px;
  color: #9E9E9E;
`

class ProductPage extends Component {
  state = {
    showCartMsg: false,
  }

  handleAddToCart = () => {
    const { router } = this.props
    const slug = router.query.slug
    addCartItem(slug)
    this.setState({ showCartMsg: true })
  }

  render () {
    const { showCartMsg } = this.state
    const { router } = this.props

    const slug = router.query.slug
    const product = productContentFetcher(slug)
    if (!product) {
      return <ErrorPage statusCode={404} />
    }
    const title = product.fields.title
    const url = `${DOMAIN}${router.asPath}`
    const mainImage = product.fields.photos.length > 0
      ? `${product.fields.photos[0].fields.file.url}`
      : `${DOMAIN}/static/logo/big.png`

    const description = product.fields.description
      ? product.fields.description // .replace(/(?:\r\n|\r|\n)/g, '<br>')
      : 'Sem descrição'
    const characteristics = product.fields.characteristics
      ? product.fields.characteristics // .replace(/(?:\r\n|\r|\n)/g, '<br>')
      : 'Sem características'
    /* eslint-disable react/jsx-sort-props */
    const metaTags = (
      <Fragment>
        <meta property='og:url' content={url} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />

        <meta property='og:image:url' content={`http:${mainImage}`} />
        <meta property='og:image:secure_url' content={`https:${mainImage}`} />
        <meta property='og:image:width' content='251' />
        <meta property='og:image:height' content='334' />
        <meta property='og:image:type' content='image/jpeg' />
      </Fragment>
    )
    /* eslint-enable react/jsx-sort-props */
    return (
      <AllMatchMedia>
        {
          ({ isCompactVersionViewport }) =>
            <BaseLayout metaTags={metaTags} title={title}>
              <Spacer>
                <Breadcrumb currentTitle={title} fatherLink='/products-list' fatherTitle='Colecção' isVisible />
              </Spacer>
              <Wrapper>
                <Slider
                  images={product.fields.photos.length
                    ? product.fields.photos.map(photo => photo.fields.file.url)
                    : [DEFAULT_PRODUCT_IMAGE]
                  }
                  isCompactVersionViewport={isCompactVersionViewport}
                />
                <InfoWrapper>
                  <ProductTitle>
                    {product.fields.highlight && <Fragment><img alt='Destacado' src='/static/icons/star.png' />&nbsp;</Fragment> }
                    {title}
                  </ProductTitle>
                  <ProductPrice>
                    {product.fields.price
                      ? `${(product.fields.price).toFixed(2)} €`
                      : `N.D.`
                    }
                  </ProductPrice>
                  <CustomButton onClick={this.handleAddToCart}>Adicionar ao Carrinho</CustomButton>
                  { showCartMsg && <InfoMessage>O artigo foi adicionado ao seu carrinho.</InfoMessage> }
                  <CollapsibleContainer label='Descrição'>
                    <ProductDescription>
                      {description}
                    </ProductDescription>
                  </CollapsibleContainer>
                  <CollapsibleContainer label='Características'>
                    <ProductDescription>
                      {characteristics}
                    </ProductDescription>
                  </CollapsibleContainer>
                  <CollapsibleContainer label='Partilhar'>
                    <Share url={url} />
                  </CollapsibleContainer>

                </InfoWrapper>
              </Wrapper>
            </BaseLayout>
        }
      </AllMatchMedia>
    )
  }
}

ProductPage.propTypes = {
  router: PropTypes.object,
}

export default withRouter(ProductPage)
