require('dotenv').config()
const fs = require('fs')

const contentful = require('contentful')
const chalk = require('chalk')

const client = contentful.createClient({
  space: process.env.SPACE_ID || 'his6ww2xbyvl',
  accessToken: process.env.ACCESS_TOKEN || '7266f65943b1b8c6278717f0a9005ca7c697539fb1fafd027cd91ffa4686eccb',
})

const fetchContentFulData = () => {
  console.log(chalk.green('Initiating fetch contenful data ...'))
  fetchContentTypes()
    .then(fetchEntries)
    .catch(error => {
      console.log(chalk.red('\nError occurred:'))
      if (error.stack) {
        console.error(error.stack)
        return
      }
      console.error(error)
    })
}

const fetchContentTypes = () => {
  console.log(chalk.green('Fetching Content Types ...'))
  return client.getContentTypes()
    .then(response => response.items)
}

const fetchEntries = (contentTypes) => {
  console.log(chalk.green('Fetching Entries ...'))
  return Promise.all(contentTypes.map((contentType) => {
    return fetchEntriesForContentType(contentType)
      .then(entries => {
        const fileName = `${__dirname}/.data-${contentType.name.toLowerCase()}.json`
        return new Promise((resolve, reject) =>
          fs.writeFile(fileName, JSON.stringify(entries, null, 2), (err) => {
            if (err) reject(err)
            console.log(`File ${fileName} Saved!`)
            resolve(err)
          })
        )
      })
  }))
}

const fetchEntriesForContentType = (contentType) =>
  client.getEntries({
    content_type: contentType.sys.id,
  })
    .then((response) => response.items)

fetchContentFulData()
