import React from 'react'
import styled from 'styled-components'

import BaseLayout from '../components/layout/base'
import Breadcrumb from '../components/breadcrumb'
import Link from '../components/atomics/link'
import Spacer from '../components/atomics/spacer'
import { pages } from '../contentful-data/utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const AllPages = () => {
  const pageTitle = 'Todas as paginas'
  return (
    <BaseLayout title={pageTitle}>
      <Breadcrumb currentTitle={pageTitle} fatherLink='/' fatherTitle='Home' />
      <Wrapper>
        { pages.map(page =>
          <Spacer key={page.fields.pageId} top={1}>
            <Link aria-label={`Link para a pagina ${page.fields.title}`} title={page.fields.title} url={page.fields.pageId} />
          </Spacer>
        )}
      </Wrapper>
´    </BaseLayout>
  )
}

export default AllPages
