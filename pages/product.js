import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'next/router'

import BaseLayout from '../components/layout/base'
import Slider from '../components/slider'
import { productContentFetcher } from '../contentful-data/utils'
import { CollapsibleContainer } from '../components/collapsible'
import { compactVersionMediaQuery, AllMatchMedia } from '../components/utils/responsive-utils'
import Breadcrumb from '../components/breadcrumb'
import Share from '../components/share'
import CustomButton from '../components/atomics/custom-button'
import { addCartItem } from '../components/utils/local-storage'
import { DOMAIN, DEFAULT_PRODUCT_IMAGE } from '../components/utils/constants'
import { generateProductStructedData } from '../components/utils/google-structured-data'
import InfoMsg from '../components/atomics/info-msg'
import Title from '../components/atomics/title'
import Spacer from '../components/atomics/spacer'

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

const InfoWrapper = styled.div`
  margin-left: 60px;
  min-width: 442px;
  @media ${compactVersionMediaQuery} {
      margin-left: 40px;
  }
  display: flex;
  flex-direction: column;
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

  generateMetaTags = (url, product) => {
    const mainImage = product.fields.photos.length > 0
      ? `${product.fields.photos[0].fields.file.url}`
      : `${DOMAIN}/static/logo/big.png`

    /* eslint-disable react/jsx-sort-props */
    return (
      <Fragment>
        <meta property='og:url' content={url} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={product.fields.title} />
        <meta property='og:description' content={product.fields.description ? product.fields.description.replace(/(?:\r\n|\r|\n)/g, ' ') : ''} />
        <meta property='og:image:url' content={`http:${mainImage}`} />
        <meta property='og:image:secure_url' content={`https:${mainImage}`} />
        <meta property='og:image:width' content='251' />
        <meta property='og:image:height' content='334' />
        <meta property='og:image:type' content='image/jpeg' />
        { generateProductStructedData(product) }
        <meta content={`Pagina do produto ${product.fields.title}`} name='description' />
      </Fragment>
    )
    /* eslint-enable react/jsx-sort-props */
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

    const description = product.fields.description
      ? product.fields.description // .replace(/(?:\r\n|\r|\n)/g, '<br>')
      : 'Sem descrição'
    const characteristics = product.fields.characteristics
      ? product.fields.characteristics // .replace(/(?:\r\n|\r|\n)/g, '<br>')
      : 'Sem características'

    return (
      <AllMatchMedia>
        {
          ({ isCompactVersionViewport }) =>
            <BaseLayout metaTags={this.generateMetaTags(url, product)} title={title}>
              <Breadcrumb currentTitle={title} fatherLink='/products-list' fatherTitle='Colecção' isVisible />
              <Wrapper>
                <Slider
                  images={product.fields.photos.length
                    ? product.fields.photos.map(photo => `${photo.fields.file.url}?fm=jpg&fl=progressive`)
                    : [DEFAULT_PRODUCT_IMAGE]
                  }
                  isCompactVersionViewport={isCompactVersionViewport}
                />
                <InfoWrapper>
                  <Title bold='bold' size='midd'>
                    {product.fields.highlight && <Fragment><img alt='Destacado' src='/static/icons/star.png' />&nbsp;</Fragment> }
                    {title}
                  </Title>
                  <Title bold='700' size='small'>
                    {product.fields.price
                      ? `${(product.fields.price).toFixed(2)} €`
                      : `N.D.`
                    }
                  </Title>
                  <CustomButton aria-label='Adicionar artigo ao Carrinho' onClick={this.handleAddToCart}>Adicionar ao Carrinho</CustomButton>
                  { showCartMsg && <InfoMsg msg='O artigo foi adicionado ao seu carrinho.' /> }
                  <CollapsibleContainer label='Descrição'>
                    <Spacer bottom={1} left={1}>
                      <Title bold='400' size='small' uppercase={false}>
                        {description}
                      </Title>
                    </Spacer>
                  </CollapsibleContainer>
                  <CollapsibleContainer label='Características'>
                    <Spacer bottom={1} left={1}>
                      <Title bold='400' size='small' uppercase={false}>
                        {characteristics}
                      </Title>
                    </Spacer>
                  </CollapsibleContainer>
                  <CollapsibleContainer label='Partilhar'>
                    <Spacer bottom={1} left={1} top={1}>
                      <Share url={url} />
                    </Spacer>
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
