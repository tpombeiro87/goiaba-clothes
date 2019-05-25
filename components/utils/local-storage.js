const CART_LOCAL_STORAGE_KEY = 'goiaba-cart'

export const getCartItems = () => {
  const cart = JSON.parse(window.localStorage.getItem(CART_LOCAL_STORAGE_KEY))
  if (!cart) {
    return {}
  }
  return cart
}

export const addCartItem = (slug) => {
  let cart = getCartItems()
  if (!cart[slug]) {
    cart[slug] = { quantity: 1 }
  } else {
    cart[slug].quantity += 1
  }
  window.localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart))
}

export const removeCartItem = (slug) => {
  let cart = getCartItems()
  if (cart[slug] && cart[slug].quantity > 1) {
    cart[slug].quantity -= 1
  } else if (cart[slug] && cart[slug].quantity === 1) {
    cart[slug] = undefined
  }
  window.localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart))
}

export const clearCart = () => {
  window.localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify({}))
}
