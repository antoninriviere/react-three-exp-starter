const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      // linters
      {
        test: /\.json$/,
        loader: 'json'
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
        /*use: ExtractTextPlugin.extract({
          use: 'css-loader!stylus-loader'
        })*/
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
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
      Shaders: path.resolve(__dirname, '../src/scripts/webgl/shaders/'),
      PostProcessing: path.resolve(__dirname, '../src/scripts/webgl/postProcessing/'),
      Utils: path.resolve(__dirname, '../src/scripts/utils/'),
      Styles: path.resolve(__dirname, '../src/styles/')
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.bundle.css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static/**/*'),
        to: path.resolve(__dirname, '../dist/')
      }
    ]
    , {
      debug: true,
      ignore: ['index.html']
    })
  ]
  /*devServer: {
    contentBase: path.resolve(__dirname),
  },*/
};