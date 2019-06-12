require('dotenv').config()
const withOffline = require('next-offline')

const staticPagesExportMap = require('./scripts/pages-export')

const nextConfig = {
  exportPathMap () {
    const staticPagesExport = staticPagesExportMap()
    console.log('------exportPathMap------\n', staticPagesExport)
    return staticPagesExport
  },
}

module.exports = withOffline(nextConfig)
