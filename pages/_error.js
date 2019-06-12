import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BaseLayout from '../components/layouts/base'
import Title from '../components/title'
import { compactVersionMediaQuery, wideVersionMediaQuery, AllMatchMedia } from '../components/utils/responsive-utils'

const Root = styled.div`
  margin-top: 2em;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;

  @media ${compactVersionMediaQuery} {
    text-align: center;
    align-items: center;
  }

  @media ${wideVersionMediaQuery} {
    flex-direction: row;
  }

  max-width: 985px;
  width: 100%;
`
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  @media ${wideVersionMediaQuery} {
    margin-left: 60px;
  }
`

const Img = styled.img`
  max-width: 415px;
  @media ${wideVersionMediaQuery} {
    max-height: 285px
  }
  filter: grayscale(100%);
`

const Text = styled.p`
  letter-spacing: 2px;
  line-height: 22px;
  font-size: 13px;
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
      <AllMatchMedia>
        {
          ({ isCompactVersionViewport }) =>
            <BaseLayout title='Error Page'>
              <Root>
                { isCompactVersionViewport && <Title title={ errorMsg } /> }
                <Img alt='error image' src={errorImg} />
                <Wrap>
                  { !isCompactVersionViewport && <Title title={ errorMsg } /> }
                  <Text>Para qualquer questão por favor contacte os nosso serviços de apoio ao cliente através do email: <a aria-label='email para contactar goiagoiabaclothes' href='mailto:info.goiabaclothes@gmail.com'>info.goiabaclothes@gmail.com</a></Text>
                </Wrap>
              </Root>
            </BaseLayout>
        }
      </AllMatchMedia>
    )
  }
}

export default Error
