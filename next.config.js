require('dotenv').config()

const staticPagesExportMap = require('./scripts/pages-export')

module.exports = {
  exportPathMap () {
    const staticPagesExport = staticPagesExportMap()
    console.log('------exportPathMap------\n', staticPagesExport)
    return staticPagesExport
  },
}

// webpack: config => {
//   config.node = {
//     fs: 'empty',
//   }
//   return config
// },
