import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import RegularPage from '../components/regular-page'
import { pages } from '../contentful-data/utils'

const InnerLink = styled.a`
  margin-right: 20px;
  color: black;
  text-decoration-line: none;
  text-transform: uppercase;
  :hover {
    color: #909090;
  }
`

const AllPages = () => (
  <RegularPage>
    <h1>Todas as Paginas</h1>
    <ul>
      { pages.map(page =>
        <li key={`/${page.fields.pageId}`}>
          <Link href={`/${page.fields.pageId}`} passHref prefetch>
            <InnerLink>{`${page.fields.title}`}</InnerLink>
          </Link>
        </li>
      )}
    </ul>
  </RegularPage>
)

export default AllPages
