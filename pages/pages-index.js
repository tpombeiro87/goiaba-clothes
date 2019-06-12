import React from 'react'
import styled from 'styled-components'

import BaseLayout from '../components/layouts/base'
import Breadcrumb from '../components/breadcrumb'
import Link from '../components/link'
import { pages } from '../contentful-data/utils'

const Root = styled.div`
  margin-top: 2em;
  display: flex;
  max-width: 985px;
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Spacer = styled.div`
  margin-top: 15px;
`

const AllPages = () => {
  const pageTitle = 'Todas as paginas'
  return (
    <BaseLayout title={pageTitle}>
      <Root>
        <Breadcrumb currentTitle={pageTitle} fatherLink='/' fatherTitle='Home' />
        { pages.map(page =>
          <Spacer key={page.fields.pageId}>
            <Link aria-label={`Link para a pagina ${page.fields.title}`} title={page.fields.title} url={page.fields.pageId} />
          </Spacer>
        )}
      </Root>
    </BaseLayout>
  )
}

export default AllPages
