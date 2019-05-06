import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { pageContentFetcher } from '../contentful-data/utils'
import Layout from '../components/layout'

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
`
const InfoWrap = styled.div`
  width 50%;
`

const Title = styled.h1`
  font-family: Arial, sans-serif;
  color: black;
  line-height: 1;
  font-size: 55px;
  font-weight: normal;
  margin-top: 70px;
  margin-bottom: 83px;
  margin-left: -33%;
  letter-spacing: 15px;
  text-transform: uppercase;
`
const Info = styled.div`
    text-indent: 0;
    padding: 0;
    color: #000;
    margin-bottom: 0;
    padding-left: 80px;
    font-size: 13 px;
    color: #000000;
    letter-spacing: 2px;
    line-height: 23px;
    text-align: justify;
    padding: 0 20px;
`

const Img = styled.img`
  width: 525px;
  height: auto;
`

const RegularPage = ({ pageId, ImgSrc }) => {
  const pageData = pageContentFetcher(pageId)
  return (
    <Layout title={pageData.fields.title}>
      <Wrapper>
        <Img src={ImgSrc} />
        <InfoWrap>
          <Title>{pageData.fields.title}</Title>
          <Info dangerouslySetInnerHTML={{ __html: pageData.fields.body }} />
        </InfoWrap>
      </Wrapper>
    </Layout>
  )
}

RegularPage.propTypes = {
  ImgSrc: PropTypes.string,
  pageId: PropTypes.string,
}

export default RegularPage
