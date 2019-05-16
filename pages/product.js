import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import ErrorPage from 'next/error'

import RegularPage from '../components/regular-page'
import Slider from '../components/slider'
import { productContentFetcher } from '../contentful-data/utils'
import { CollapsibleContainer } from '../components/collapsible'
import { compactVersionMediaQuery, AllMatchMedia } from '../components/utils/responsive-utils'
import Breadcrumb from '../components/breadcrumb'
import Share from '../components/share'

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;

  @media ${compactVersionMediaQuery} {
    flex-direction: column;
  }
`

const Spacer = styled.div`
  margin-bottom: 10px;
  margin-left: 35px;
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

const ProductPage = ({ router }) => {
  const slug = router.query.slug
  const product = productContentFetcher(slug)
  if (!product) {
    return <ErrorPage />
  }
  const description = product.fields.description
    ? product.fields.description // .replace(/(?:\r\n|\r|\n)/g, '<br>')
    : 'Sem descrição'
  const characteristics = product.fields.characteristics
    ? product.fields.characteristics // .replace(/(?:\r\n|\r|\n)/g, '<br>')
    : 'Sem características'
  return (
    <AllMatchMedia>
      {
        ({ isCompactVersionViewport, isWideVersionViewport }) =>
          <RegularPage>
            <Wrapper>
              <Spacer>
                <Breadcrumb currentTitle={product.fields.title} fatherLink='/products-list' fatherTitle='Inicío' isVisible={isCompactVersionViewport} />
              </Spacer>
              <Slider images={product.fields.photos.map(photo => photo.fields.file.url)} isCompactVersionViewport={isCompactVersionViewport} />
              <InfoWrapper>
                <Breadcrumb currentTitle={product.fields.title} fatherLink='/products-list' fatherTitle='Inicío' isVisible={isWideVersionViewport} />
                <ProductTitle>{product.fields.title}</ProductTitle>
                <ProductPrice>
                  {product.fields.price
                    ? `${(product.fields.price).toFixed(2)} €`
                    : `N.D.`
                  }
                </ProductPrice>

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
                  <Share />
                </CollapsibleContainer>

              </InfoWrapper>
            </Wrapper>
          </RegularPage>
      }
    </AllMatchMedia>
  )
}

ProductPage.propTypes = {
  router: PropTypes.object,
}

export default withRouter(ProductPage)
