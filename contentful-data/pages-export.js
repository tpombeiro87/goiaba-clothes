const pages = require('../contentful-data/.data-pages.json')
const products = require('../contentful-data/.data-produtos.json')

const formatExportMap = ({ path, page, query }) => {
  return {
    [path]: {
      page,
      query,
    },
  }
}

const staticPagesExportMap = async () => {
  let staticPages = {}
  let staticProducts = {}

  pages.forEach(page => {
    staticPages = {
      ...staticPages,
      ...formatExportMap({
        page: page.fields.pageId,
        path: page.fields.pageId,
        query: {
          __pageContent: page,
        },
      }),
    }
  })

  products.forEach(product => {
    staticProducts = {
      ...staticProducts,
      ...formatExportMap({
        page: '/product',
        path: `/product/${product.fields.slug}`,
        query: {
          slug: product.fields.slug,
          __pageContent: product,
        },
      }),
    }
  })

  return {
    ...staticPages,
    ...staticProducts,
  }
}

module.exports = staticPagesExportMap
