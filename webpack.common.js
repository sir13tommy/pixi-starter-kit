const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageJSON = require('./package.json')

module.exports = {
  entry: {
    game: path.resolve(__dirname, 'src/game.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(packageJSON.version)
    }),
    new CopyWebpackPlugin([
      {from: './src/index.html', to: 'index.html'},
      {from: './src/assets/images/sprite/.dist/*.*', to: '[name].[ext]', toType: 'template'}
    ]),
    new webpack.ExtendedAPIPlugin()
  ],
  module: {
    rules: [
      { test: /game\.js$/, use: ['babel-loader'] },
      { test: /\.(gif|png|jpe?g|svg)$/i, use: [ 'file-loader?publicPath=&name=[name].[ext]']},
      { test: /\.(json|bmp|aac|ac3|caf|flac|m4a|mp3|mp4|ogg|wav|webm)$/, use: 'file-loader?publicPath=&name=[name].[ext]'},
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(woff|woff2)$/, use: ['base64-font-loader'] }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
