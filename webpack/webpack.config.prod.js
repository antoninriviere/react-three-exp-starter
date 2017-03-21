const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: path.resolve(__dirname, '../src/scripts'),
  entry: {
    app: './index.js',
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
        exclude: [/node_modules/],
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract('css-loader!stylus-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.bundle.css'
    })
  ],
  /*devServer: {
    contentBase: path.resolve(__dirname),
  },*/
};