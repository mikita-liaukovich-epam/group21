/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PUBLIC_DIR = 'public';

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './' + PUBLIC_DIR,
    port: 9000,
  },
  plugins: [
    new CleanWebpackPlugin([PUBLIC_DIR]),
    new ExtractTextPlugin({
      filename: './style.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: './src/assets', to: './assets' }
    ]),
  ],
  output: {
    path: path.resolve(__dirname, PUBLIC_DIR)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]',
          },
        }],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: true,
                url: false
              }
            }
          ]
        })
      }
  ]
  }
};