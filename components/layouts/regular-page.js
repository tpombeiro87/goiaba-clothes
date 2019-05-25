import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { pageContentFetcher } from '../../contentful-data/utils'
import Breadcrumb from '../breadcrumb'
import Title from '../title'

import BaseLayout from './base'

const Spacer = styled.div`
  margin-top: 2em;
`

const Text = styled.div`
  letter-spacing: 2px;
  line-height: 22px;
  font-size: 13px;
  h2 {
    margin-block-start: 2em;
    margin-block-end: 1em;
    text-transform: uppercase;
  }
`

const RegularPage = ({ pageId, children }) => {
  const pageData = pageId ? pageContentFetcher(pageId) : { fields: {} }
  return (
    <BaseLayout title={pageData.fields.title}>
      { children ||
        <Fragment>
          <Spacer />
          <Breadcrumb currentTitle={pageData.fields.title} fatherLink='/' fatherTitle='Home' />
          <Title>{pageData.fields.title}</Title>
          <Text
            dangerouslySetInnerHTML={{ __html: pageData.fields.body }}
          />
        </Fragment>
      }
    </BaseLayout>
  )
}

RegularPage.propTypes = {
  children: PropTypes.node,
  pageId: PropTypes.string,
}

export default RegularPage
