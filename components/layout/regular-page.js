import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'next/router'

import { pageContentFetcher } from '../../contentful-data/utils'
import Breadcrumb from '../breadcrumb'
import { compactVersionMediaQuery, wideVersionMediaQuery } from '../utils/responsive-utils'
import Content from '../atomics/content'

import BaseLayout from './base'

const ColumnsWrapper = styled.div`
  display: flex;

  @media ${compactVersionMediaQuery} {
    flex-direction: column;
  }
  @media ${wideVersionMediaQuery} {
    margin-top: 30px;
  }
`
const ContentColumn = styled.div`
  @media ${wideVersionMediaQuery} {
    margin-left: 20px;
    width 50%;
  }
`

const Img = styled.img`
  background-color: #acc46e;
  max-width: 500px;
  height: auto;
  @media ${wideVersionMediaQuery} {
    min-width: 483px;
    max-height: 483px;
  }
`

const RegularPage = ({ pageId, metaTags, router }) => {
  const pageData = pageId ? pageContentFetcher(pageId) : { fields: {} }
  const ImgSrc = pageData.fields.heroImage
    ? `${pageData.fields.heroImage.fields.file.url}?fm=jpg&fl=progressive`
    : null

  const editorEnabled = router.query.editor !== undefined
  const editorId = editorEnabled ? pageData.sys.id : undefined
  const AllMetaTags = <Fragment>
    {metaTags}
    <meta content={pageData.fields.seo} name='description' />
    { editorEnabled &&
      <Fragment>
        <meta content={process.env.SPACE_ID} name='contentful_space' />
        <meta content='master' name='contentful_environment' />
      </Fragment>
    }
  </Fragment>

  return (
    <BaseLayout
      metaTags={AllMetaTags}
      title={pageData.fields.title}>
      <Breadcrumb currentTitle={pageData.fields.title} fatherLink='/' fatherTitle='Home' />
      {
        ImgSrc
          ? <ColumnsWrapper>
            <Img alt='hero image' src={ImgSrc} />
            <ContentColumn>
              <Content body={pageData.fields.body} editorId={editorId} />
            </ContentColumn>
          </ColumnsWrapper>
          : <Content
            body={pageData.fields.body}
            editorId={editorId}
          />
      }

    </BaseLayout>
  )
}

RegularPage.propTypes = {
  pageId: PropTypes.string,
  metaTags: PropTypes.node,
  router: PropTypes.object,
}

export default withRouter(RegularPage)
