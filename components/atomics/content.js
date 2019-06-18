
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const ContentElement = styled.main`
  letter-spacing: 2px;
  line-height: 22px;
  font-size: 13px;
  h2 {
    margin-block-end: 1em;
    text-transform: uppercase;
  }
`
const Content = ({ body, editorId = undefined }) =>
  <ContentElement dangerouslySetInnerHTML={{ __html: body }} data-csk-entry-id={editorId} />

Content.propTypes = {
  body: PropTypes.string,
  editorId: PropTypes.string,
}

export default Content
