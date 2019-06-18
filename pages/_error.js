import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BaseLayout from '../components/layout/base'
import Content from '../components/atomics/content'
import { compactVersionMediaQuery, wideVersionMediaQuery } from '../components/utils/responsive-utils'

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
  max-width: 415px;
  @media ${wideVersionMediaQuery} {
    max-height: 285px
  }
  filter: grayscale(100%);
`

class Error extends React.Component {
  static propTypes = {
    statusCode: PropTypes.number,
  }

  static getInitialProps ({ res, err }) {
    let statusCode
    if (res && res.statusCode) {
      statusCode = res.statusCode
    }
    if (err && err.statusCode) {
      statusCode = err.statusCode
    }

    return { statusCode }
  }

  render () {
    const { statusCode } = this.props
    let errorImg = '/static/500.jpeg'
    let errorMsg = 'Ocorreu um erro na pagina solicitada'
    if (statusCode === 404) {
      errorImg = '/static/404.jpeg'
      errorMsg = 'A pagina que solictou não existe'
    } else if (statusCode) {
      errorMsg = `Ocurreu um erro no servidor do tipo: ${statusCode}`
    }

    return (
      <BaseLayout title='Error Page'>
        <ColumnsWrapper>
          <Img alt='error image' src={errorImg} />
          <ContentColumn>
            <h2>{errorMsg}</h2>
            <p>Para qualquer questão por favor contacte os nosso serviços de apoio ao cliente através do email: <a aria-label='email para contactar goiagoiabaclothes' href='mailto:info.goiabaclothes@gmail.com'>info.goiabaclothes@gmail.com</a></p>
          </ContentColumn>
        </ColumnsWrapper>
      </BaseLayout>
    )
  }
}

export default Error
