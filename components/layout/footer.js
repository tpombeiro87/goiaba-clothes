import React from 'react'
import styled from 'styled-components'

import { compactVersionMediaQuery, wideVersionMediaQuery } from '../utils/responsive-utils'
import Link from '../atomics/link'

const FooterContainer = styled.footer`
  width: 100%;
`

const Section = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 44px;
  margin-top: 40px;
  border-top: 1px solid #c6c6c6;

  @media ${compactVersionMediaQuery} {
    flex-direction: column;
    text-align: center;
  }
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  @media ${compactVersionMediaQuery} {
    margin-bottom: 30px;
  }
  span {
    padding-bottom: 10px;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
    font-family: Arial,sans-serif
  }
`

const Copyright = styled.section`
  @media ${wideVersionMediaQuery} {
    margin-top: 40px;
  }
  padding-top: 22px;
  border-top: 1px solid #c6c6c6;
  margin-bottom: 20px;
  text-align: center;
  span {
    font-family: Arial, sans-serif;
    font-weight: normal;
    color: #000;
    letter-spacing: 2px;
    font-size: 11px;
  }
`

const Footer = () => (
  <FooterContainer>
    <Section>
      <Col>
        <span>Apoio ao Cliente</span>
        <Link aria-label='Link para a pagina de Supporte' secondary title='Supporte' url='/user-support' />
        <Link aria-label='Link para a pagina de Size guide' secondary title='Size Guide' url='/size-guide' />
      </Col>
      <Col>
        <span>Informações</span>
        <Link aria-label='Link para a pagina de Politica de Privacidade' secondary title='Politica de Privacidade' url='/privacy-policy' />
        <Link aria-label='Link para a pagina de Termos e Condições' secondary title='Termos e Condições' url='/terms' />

      </Col>
      <Col>
        <span>Navegação</span>
        <Link aria-label='Link para a pagina com uma listagem de todas as paginas' secondary title='Todas as Paginas' url='/pages-index' />
      </Col>
    </Section>
    <Copyright>
      <span>2018 © GOIABA CLOSES - Todos os direitos reservados.</span>
    </Copyright>
  </FooterContainer>
)

export default Footer
