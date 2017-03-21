const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../src/scripts'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react'] }
        }],
        exclude: [/node_modules/]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
            }
          }]
      }
    ]
  },
  resolve: {
    alias: {
      WebGL: path.resolve(__dirname, '../src/scripts/webgl/'),
      Styles: path.resolve(__dirname, '../src/styles/')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
