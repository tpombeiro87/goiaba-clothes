import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import mailgun from 'mailgun.js'

import BaseLayout from '../components/layouts/base'
import Breadcrumb from '../components/breadcrumb'
import Title from '../components/title'
import CustomInput from '../components/custom-input'
import CustomButton from '../components/custom-button'
import CartSummary from '../components/cart-summary'
import { getCartItems, removeCartItem, addCartItem } from '../components/utils/local-storage'
import { productContentFetcher } from '../contentful-data/utils'
import { compactVersionMediaQuery, AllMatchMedia } from '../components/utils/responsive-utils'

const Spacer = styled.div`
  margin-bottom: 40px;
  margin-left: 35px;
`

const Root = styled.div`
  margin-top: 2em;
  display: flex;
`

const Section = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`


const PAGE_STATUS_FORM = 'PAGE_STATUS_FORM'
const PAGE_STATUS_SENDING = 'PAGE_STATUS_SENDING'
const PAGE_STATUS_SENT = 'PAGE_STATUS_SENT'
const PAGE_STATUS_ERROR = 'PAGE_STATUS_ERROR'

const FIELDS = {
  firstName: {
    label: 'Primeiro Nome',
    size: 'small',
    type: 'text',
    required: true,
  },
  lastName: {
    label: 'Ultimo Nome',
    size: 'small',
    type: 'text',
    required: true,
  },
  email: {
    label: 'Endereço Email',
    size: 'large',
    type: 'email',
    required: true,
  },
  address1: {
    label: 'Morada de Envio',
    size: 'large',
    type: 'text',
    required: true,
  },
  address3: {
    size: 'large',
    type: 'text',
  },
  city: {
    label: 'Cidade',
    size: 'small',
    type: 'text',
    required: true,
  },
  postalcode: {
    label: 'Codigo Postal',
    size: 'small',
    type: 'text',
    required: true,
  },
  country: {
    label: 'Pais',
    size: 'small',
    type: 'country',
    required: true,
  },
  phone: {
    label: 'Telefone',
    size: 'small',
    type: 'number',
    required: true,
  },
  notes1: {
    label: 'Notas',
    size: 'large',
    type: 'text',
  },
  notes2: {
    size: 'large',
    type: 'text',
  },
}

class Cart extends Component {
  constructor () {
    super()
    let state = {
      pageStatus: PAGE_STATUS_FORM,
    }
    Object.keys(FIELDS).map(fieldId => {
      state[fieldId] = ''
    })
    this.state = state
  }

  componentDidMount () {
    this.getCartItems()
  }

  getCartItems = () => {
    let cart = getCartItems()
    Object.keys(cart).map(cartItemSlug => {
      cart[cartItemSlug] = {
        ...cart[cartItemSlug],
        ...productContentFetcher(cartItemSlug),
      }
    })
    this.setState({ cart })
  }

  _generateEmailBody = () => {
    let clientDetails = 'Cliente: '
    Object.keys(FIELDS).map(fieldId => {
      clientDetails += `${fieldId}: ${this.state[fieldId]}  -  `
    })
    const { cart } = this.state
    let cartDetails = 'Pedido: '
    Object.keys(cart).map(productSlug => {
      cartDetails += `Slug: ${productSlug} / quantidade ${cart[productSlug].quantity}  -  `
    })

    return `Recebemos um pedido de compra. ${clientDetails} // ${cartDetails}`
  }

  handleSubmitRequest = () => {
    event.preventDefault()
    this.setState({ pageStatus: PAGE_STATUS_SENDING })
    let mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    })
    const data = {
      from: `Goiaba Clothes Site <${process.env.MAILGUN_DOMAIN}>`,
      to: [process.env.TECNICAL_EMAIL, process.env.SALES_EMAIL],
      subject: 'Goiaba Clothes Site - Pedido de compra',
      text: this._generateEmailBody(),
    }

    mg.messages.create(process.env.MAILGUN_DOMAIN, data)
      .then(msg => {
        console.log(msg)
        this.setState({ pageStatus: PAGE_STATUS_SENT })
      })
      .catch(err => {
        console.log(err)
        this.setState({ pageStatus: PAGE_STATUS_ERROR })
      })
  }

  handleRemoveCartItem = (slug) => {
    removeCartItem(slug)
    this.getCartItems()
  }

  handleAddCartItem = (slug) => {
    addCartItem(slug)
    this.getCartItems()
  }

  handleInputChange = (fieldId, newValue) => {
    let newState = {}
    newState[fieldId] = newValue
    this.setState({ ...newState })
  }

  render () {
    const { pageStatus, cart } = this.state
    const pageTitle = 'Comprar'
    return (
      <AllMatchMedia>
        {
          ({ isCompactVersionViewport, isWideVersionViewport }) =>
            <BaseLayout title={pageTitle}>
              <Root>
                <Spacer>
                  <Breadcrumb currentTitle={pageTitle} fatherLink='/' fatherTitle='Home' />
                  {(() => {
                    if (pageStatus === PAGE_STATUS_SENDING) {
                      return <p>Enviando...</p>
                    }
                    if (pageStatus === PAGE_STATUS_SENT) {
                      return <p>O pedido de compra foi enviado com sucesso. Será contactado em breve para dar continuidade à sua compra. Caso tenha que fazer alguma alteração por favor contacte: <a href={`mailto:${process.env.SALES_EMAIL}`}>{process.env.SALES_EMAIL}</a></p>
                    }
                    if (pageStatus === PAGE_STATUS_ERROR) {
                      return <p>Houve um erro a processar o seu pedido. Por favor contacte nos directamente <a href={`mailto:${process.env.SALES_EMAIL}`}>{process.env.SALES_EMAIL}</a></p>
                    }
                    if (pageStatus === PAGE_STATUS_FORM) {
                      return (
                        <Fragment>
                          <Section>
                            <CartSummary cart={cart} onAddCartItem={this.handleAddCartItem} onRemoveCartItem={this.handleRemoveCartItem} />
                          </Section>
                          <Section>
                            <Title title='Detalhes de Faturação' />
                            <form onSubmit={this.handleSubmitRequest}>
                              { Object.keys(FIELDS).map(fieldId =>
                                <CustomInput fieldId={fieldId} key={fieldId} {...FIELDS[fieldId]} onInputChange={this.handleInputChange} value={this.state[fieldId]} />
                              )}
                              <CustomButton type='submit'>Enviar Pedido</CustomButton>
                            </form>
                          </Section>
                        </Fragment>
                      )
                    }
                  })()}
                </Spacer>
              </Root>
            </BaseLayout>
        }
      </AllMatchMedia>
    )
  }
}

export default Cart
