const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const commonConfigs = require('./webpack.common.js')
const BabelWebpackPlugin = require('babel-webpack-plugin')

module.exports = merge(commonConfigs, {
  plugins: [
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify('true'),
      __DEV__: JSON.stringify('false')
    }),
    new BabelWebpackPlugin({
      test: /\.js$/,
      presets: ['es2015'],
      sourceMaps: false,
      compact: false
    }),
    new UglifyJSPlugin(),
  ]
})
