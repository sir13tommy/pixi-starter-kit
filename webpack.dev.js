const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfigs = require('./webpack.common.js')

module.exports = merge(commonConfigs, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify('false'),
      __DEV__: JSON.stringify('true')
    })
  ]
})
