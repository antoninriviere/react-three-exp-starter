const express = require('express')
const Webpack = require('webpack')
// const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const webpackConfig = require('./webpack.config.dev')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const compiler = Webpack(webpackConfig)

const port = 8080
const ip = '0.0.0.0'

const app = express()

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}))

app.use(webpackHotMiddleware(compiler))
app.use(express.static(path.join(__dirname, '../dist')))

app.listen(port, ip, error => {
  if (error) throw error
  console.info('Starting server on http://localhost:' + port)
})

// Serve pure static assets


/* const server = new WebpackDevServer(compiler, {
  hot: false,
  contentBase: path.resolve(__dirname, '../dist'),
  publicPath: '/',
  stats: {
    colors: true
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:' + port)
}) */


