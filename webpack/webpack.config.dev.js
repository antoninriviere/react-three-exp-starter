const webpack = require('webpack')
const path = require('path')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')

module.exports = {
  context: path.resolve(__dirname, '../src/scripts'),
  entry: [
    'whatwg-fetch',
    'react-hot-loader/patch',
    // 'webpack/hot/dev-server',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './index.js'
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '../static'),
    publicPath: '/'
  },
  module: {
    rules: [
      // linters
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            parser: 'babel-eslint',
            formatter: eslintFriendlyFormatter
          }
        }]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
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
        test: /\.(png|svg|jpg)$/,
        use: 'file-loader?name=image/[name].[ext]'
      },
      {
        test: /node_modules/,
        loader: 'ify-loader'
      },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      WebGL: path.resolve(__dirname, '../src/scripts/webgl/'),
      WebGLConfig: path.resolve(__dirname, '../src/scripts/webgl/config/'),
      WebGLCore: path.resolve(__dirname, '../src/scripts/webgl/core/'),
      Shaders: path.resolve(__dirname, '../src/scripts/webgl/shaders/'),
      UI: path.resolve(__dirname, '../src/scripts/components/ui/'),
      Vendors: path.resolve(__dirname, '../src/scripts/vendors/'),
      PostProcessing: path.resolve(__dirname, '../src/scripts/webgl/postProcessing/'),
      Stores: path.resolve(__dirname, '../src/scripts/stores/'),
      Utils: path.resolve(__dirname, '../src/scripts/utils/'),
      Signals: path.resolve(__dirname, '../src/scripts/signals/'),
      Styles: path.resolve(__dirname, '../src/styles/'),
      UI: path.resolve(__dirname, '../src/scripts/components/ui')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
