const path = require('path')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config.dev')
const port = 8080

const compiler = Webpack(webpackConfig)
const server = new WebpackDevServer(compiler, {
  hot: false,
  contentBase: path.resolve(__dirname, '../dist'),
  publicPath: '/',
  stats: {
    colors: true
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:' + port)
})
