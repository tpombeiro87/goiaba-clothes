require('dotenv').config()
const request = require('request')
const chalk = require('chalk')

const options = {
  method: 'POST',
  url: 'https://api.cloudflare.com/client/v4/zones/84c7a5058d94ea258eac740ce59c611f/purge_cache',
  headers: {
    'X-Auth-Key': process.env.CLOUDFLARE_API_KEY,
    'Content-Type': 'application/json',
    'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
  },
  body: { purge_everything: true },
  json: true,
}

const invalidateCache = () => new Promise((resolve, reject) =>
  request(options, function (error, response, body) {
    if (error) {
      console.log(chalk.red('invalidateCache error: '))
      console.log(error)
      return reject(error)
    }
    if (!body || body.success !== true) {
      console.log(chalk.red('invalidateCache error: '))
      console.log(body)
      return reject(body)
    }
    console.log('invalidateCache ok')
    return resolve(body)
  })
)

module.exports = invalidateCache
