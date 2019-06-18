import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BaseLayout from '../components/layout/base'
import Breadcrumb from '../components/breadcrumb'
import Link from '../components/atomics/link'
import Spacer from '../components/atomics/spacer'
import Title from '../components/atomics/title'
import staticPagesExportMap from '../scripts/pages-export'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const LinkComponent = ({ path, extra }) => {
  let title
  if (extra.query && extra.query.__pageContent) {
    title = extra.query.__pageContent.fields.title
  } else if (extra.query && extra.query.title) {
    title = extra.query.title
  } else {
    title = path
  }
  return (
    <Spacer top={1}>
      <Link aria-label={`Link para a pagina ${title}`} title={title} url={path} />
    </Spacer>
  )
}

LinkComponent.propTypes = {
  path: PropTypes.string,
  extra: PropTypes.object,
}

const AllPages = () => {
  const pageTitle = 'Todas as paginas'
  const allPages = Object.entries(staticPagesExportMap())

  return (
    <BaseLayout title={pageTitle}>
      <Breadcrumb currentTitle={pageTitle} fatherLink='/' fatherTitle='Home' />
      <Wrapper>
        <Title title='Paginas Gerais' />
        { allPages
          .filter(([path, extra]) => path.indexOf('/product/') === -1 && (extra.query && extra.query.order !== -1))
          .map(([path, extra]) => <LinkComponent extra={extra} key={path} path={path} />)
        }
        <Spacer top={2} />
        <Title title='Todos os Produtos' />
        {
          allPages
            .filter(page => page[0].indexOf('/product/') !== -1)
            .map(([path, extra]) => <LinkComponent extra={extra} key={path} path={path} />)
        }
      </Wrapper>
    </BaseLayout>
  )
}

export default AllPages
