require('dotenv').config()

const staticPagesExportMap = require('./contentful-data/pages-export')

module.exports = {
  exportPathMap () {
    const staticPagesExport = staticPagesExportMap()
    console.log('exportPathMap----------', staticPagesExport)
    return staticPagesExport
  },
}

// webpack: config => {
//   config.node = {
//     fs: 'empty',
//   }
//   return config
// },
