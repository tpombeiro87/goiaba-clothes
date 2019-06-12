const { join } = require('path')

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // this is not working
    server.get('/service-worker.js', (req, res) => {
      const filePath = join(__dirname, '.next', '/service-worker.js')
      console.log('get service-worker.js - ', filePath)
      return app.serveStatic(req, res, filePath)
    })
    // this is not working
    server.get('/manifest.json', (req, res) => {
      const filePath = join(__dirname, '/../scripts/manifest.json')
      console.log('get manifest.json - ', filePath)
      return app.serveStatic(req, res, filePath)
    })

    server.get('/product/:id', (req, res) => {
      const actualPage = '/product'
      const queryParams = { slug: req.params.id }
      return app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
