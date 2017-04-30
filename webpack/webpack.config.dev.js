const webpack = require('webpack');
const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

module.exports = {
  context: path.resolve(__dirname, '../src/scripts'),
  entry: {
    app: './index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/static/'
  },
  module: {
    rules: [
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
          }],
      },
    ],
  },
  /*plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true,
    }),
  ],*/
  /*devServer: {
    contentBase: path.resolve(__dirname),
  },*/
};