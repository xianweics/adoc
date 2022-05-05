const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const joinProjectRoot = (p = '/') => path.join(__dirname, '..', p);
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');
const helperWebpackConfig = require('@adoc/helper-wepack-config')({
  hash: true
});
const config = {
  entry: path.join(__dirname, '..', 'src/index.js'),
  output: {
    clean: true,
    publicPath: '/',
    filename: '[name].[hash:5].js',
    path: joinProjectRoot('dist'),
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: joinProjectRoot('index.html'),
      favicon: joinProjectRoot('favicon.ico'),
      date: new Date().toUTCString(),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
};
module.exports = merge(merge(commonConfig, helperWebpackConfig), config);
