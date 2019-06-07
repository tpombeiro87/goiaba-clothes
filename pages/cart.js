import React, { Component } from 'react'
import styled from 'styled-components'
import uuidv4 from 'uuid/v4'

import BaseLayout from '../components/layouts/base'
import Breadcrumb from '../components/breadcrumb'
import Title from '../components/title'
import CustomInput from '../components/custom-input'
import CustomButton from '../components/custom-button'
import CartSummary from '../components/cart-summary'
import { getCartItems, removeCartItem, addCartItem } from '../components/utils/local-storage'
import { productContentFetcher } from '../contentful-data/utils'
import { compactVersionMediaQuery, wideVersionMediaQuery, AllMatchMedia } from '../components/utils/responsive-utils'
import { SALES_EMAIL } from '../components/utils/constants'

const Spacer = styled.div`
  margin-bottom: 40px;
  width: 100%;
`

const ContentForm = styled.form`
  display: flex;
  @media ${compactVersionMediaQuery} {
    flex-direction: column;
  }
`

const Root = styled.div`
  margin-top: 2em;
  display: flex;
  max-width: 985px;
  width: 100%;
`

const CartSection = styled.div`
  @media ${wideVersionMediaQuery} {
    width: 350px;
  }

  margin-top: 10px;
  margin-bottom: 30px;
  margin-right: 50px;
`
const InputsSection = styled.div`
  flex-grow: 1;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-right: 50px;
`

const PAGE_STATUS_FORM = 'PAGE_STATUS_FORM'
const PAGE_STATUS_SENDING = 'PAGE_STATUS_SENDING'
const PAGE_STATUS_SENT = 'PAGE_STATUS_SENT'
const PAGE_STATUS_ERROR = 'PAGE_STATUS_ERROR'

const FIELDS = {
  name: {
    label: 'Nome',
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

  handleSubmitRequest = () => {
    const uuid = uuidv4()
    event.preventDefault()
    this.setState({ pageStatus: PAGE_STATUS_SENDING })

    let clientDetails = {}
    Object.keys(FIELDS).map(fieldId => {
      clientDetails[fieldId] = this.state[fieldId]
    })
    const { cart } = this.state

    fetch('https://goiaba-clothes-be.tpombeiro.now.sh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uuid,
        clientDetails,
        cart,
      }),
    })
      .then(response => response.json())
      .then(msg => {
        console.log(uuid, msg)
        this.setState({ pageStatus: PAGE_STATUS_SENT })
      })
      .catch(err => {
        console.log(uuid, err)
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

  renderContactForm = (isCompactVersionViewport) => {
    const { cart } = this.state
    return (
      <ContentForm onSubmit={this.handleSubmitRequest}>
        { isCompactVersionViewport &&
          <CartSection>
            <CartSummary cart={cart} onAddCartItem={this.handleAddCartItem} onRemoveCartItem={this.handleRemoveCartItem} />
          </CartSection>
        }
        <InputsSection>
          <Title title='Detalhes de Faturação' />
          { Object.keys(FIELDS).map(fieldId =>
            <CustomInput fieldId={fieldId} key={fieldId} {...FIELDS[fieldId]} onInputChange={this.handleInputChange} value={this.state[fieldId]} />
          )}
          { isCompactVersionViewport &&
            <CustomButton fullWidth type='submit'>Enviar Pedido</CustomButton> }
        </InputsSection>
        { !isCompactVersionViewport &&
          <CartSection>
            <CartSummary cart={cart} onAddCartItem={this.handleAddCartItem} onRemoveCartItem={this.handleRemoveCartItem} />
            <CustomButton fullWidth type='submit'>Enviar Pedido</CustomButton>
          </CartSection>
        }
      </ContentForm>
    )
  }

  render () {
    const { pageStatus } = this.state
    const pageTitle = 'Comprar'
    return (
      <AllMatchMedia>
        {
          ({ isCompactVersionViewport }) =>
            <BaseLayout title={pageTitle}>
              <Root>
                <Spacer>
                  <Breadcrumb currentTitle={pageTitle} fatherLink='/' fatherTitle='Home' />
                  {(() => {
                    if (pageStatus === PAGE_STATUS_SENDING) {
                      return <p>Enviando...</p>
                    }
                    if (pageStatus === PAGE_STATUS_SENT) {
                      return <p>O pedido de compra foi enviado com sucesso. Será contactado em breve para dar continuidade à sua compra. Caso tenha que fazer alguma alteração por favor contacte: <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a></p>
                    }
                    if (pageStatus === PAGE_STATUS_ERROR) {
                      return <p>Houve um erro a processar o seu pedido. Por favor contacte nos directamente <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a></p>
                    }
                    if (pageStatus === PAGE_STATUS_FORM) {
                      return this.renderContactForm(isCompactVersionViewport)
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
