import pages from '../contentful-data/.data-pages.json'
import products from '../contentful-data/.data-produtos.json'

const pageContentFetcher = (url) =>
  pages.find(page => page.fields.pageId === url)

const productContentFetcher = (slug) =>
  products.find(page => page.fields.slug === slug)

export {
  pages,
  products,
  pageContentFetcher,
  productContentFetcher,
}
