const webpack = require('webpack')
const path = require('path')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')

module.exports = {
  context: path.resolve(__dirname, '../src/scripts'),
  entry: [
    'react-hot-loader/patch',
    // 'webpack/hot/dev-server',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './index.js'
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      // linters
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          parser: 'babel-eslint',
          formatter: eslintFriendlyFormatter
        }
      },

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
      },
      {
        test: /node_modules/,
        loader: 'ify-loader'
      },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        loader: 'raw!glslify'
      }
    ]
  },
  resolve: {
    alias: {
      WebGL: path.resolve(__dirname, '../src/scripts/webgl/'),
      WebGLConfig: path.resolve(__dirname, '../src/scripts/webgl/config/'),
      Styles: path.resolve(__dirname, '../src/styles/')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
