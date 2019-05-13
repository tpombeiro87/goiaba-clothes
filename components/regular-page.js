import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { pageContentFetcher } from '../contentful-data/utils'
import Layout from '../components/layout'

const RegularPage = ({ pageId, children }) => {
  const pageData = pageId ? pageContentFetcher(pageId) : { fields: {} }
  return (
    <Layout title={pageData.fields.title}>
      { children ||
        <Fragment>
          <h1>{pageData.fields.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: pageData.fields.body }}
          />
        </Fragment>
      }
    </Layout>
  )
}

RegularPage.propTypes = {
  children: PropTypes.node,
  pageId: PropTypes.string,
}

export default RegularPage
