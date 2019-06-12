const fs = require('fs')

const chalk = require('chalk')

const staticPagesExportMap = require('./pages-export')
const manifestJson = require('./manifest.json')

const DOMAIN = 'https://www.goiabaclothes.pt/'

const formatDate = (date) => {
  let d = new Date(date)
  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  let year = `${d.getFullYear()}`

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('-')
}

const generateFile = (fileName, fileContent) =>
  new Promise((resolve, reject) =>
    fs.writeFile(fileName, fileContent, (error) => {
      if (error) reject(error)
      console.log(`File ${fileName} Saved!`)
      resolve()
    })
  )

const generateSiteMap = () =>
  staticPagesExportMap()
    .then(staticPages => {
      console.log(staticPages)
      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${Object.keys(staticPages).map(path => `<url>
            <loc>${DOMAIN}${path}</loc>
            <lastmod>${formatDate(new Date())}</lastmod>
          </url>`).join('')}
      </urlset>`
      const fileName = 'out/sitemap.xml'
      return generateFile(fileName, sitemapXml)
    })
    .catch(error => {
      console.log(chalk.red('\nError occurred:'))
      if (error.stack) {
        console.error(error.stack)
        return
      }
      console.error(error)
    })

const generateRobotTxt = () => {
  const fileName = 'out/robots.txt'
  const robotsTxt = `User-agent: *
  Sitemap: ${DOMAIN}/sitemap_local.xml
  Disallow:`

  return generateFile(fileName, robotsTxt)
}

const generateManifest = () => {
  const fileName = 'out/manifest.json'
  const manifestText = JSON.stringify(manifestJson, null, 2)

  return generateFile(fileName, manifestText)
}

generateSiteMap()
  .then(generateRobotTxt)
  .then(generateManifest)
