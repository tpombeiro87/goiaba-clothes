import { SALES_EMAIL, DOMAIN, DEFAULT_PRODUCT_IMAGE } from '../utils/constants'

export const generateProductStructedData = (product) => ({
  '@context': 'https://schema.org/',
  '@type': 'Product',
  'name': product.fields.title,
  'image': product.fields.photos.length
    ? product.fields.photos.map(photo => photo.fields.file.url)
    : [DEFAULT_PRODUCT_IMAGE],
  'description': product.fields.description.replace(/(?:\r\n|\r|\n)/g, ' '),
  'sku': product.fields.slug,
  'mpn': '925872',
  'offers': {
    '@type': 'Offer',
    'url': `${DOMAIN}/product/${product.fields.slug}`,
    'priceCurrency': 'EUR',
    'price': `${product.fields.price}`,
    'priceValidUntil': `${new Date().getFullYear() + 1}-01-01`,
    'itemCondition': 'https://schema.org/NewCondition',
    'availability': 'https://schema.org/InStock',
    'seller': {
      '@type': 'Organization',
      'name': 'Goiaba Clothes',
    },
  },
})

export const generateContactStructedData = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'url': DOMAIN,
  'name': 'Goiaba Clothes',
  'contactPoint': {
    '@type': 'ContactPoint',
    'email': SALES_EMAIL,
    'contactType': 'Sales contact',
  },
})
