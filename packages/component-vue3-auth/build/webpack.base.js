const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helperWebpackConfig = require('@adoc/helper-wepack-config')({
  hash: true
});

const config = {
  entry: path.join(__dirname, '..', 'src/index.js'),
  output: {
    clean: true,
    publicPath: '/',
    filename: '[name].[hash:5].js',
    path: path.join(__dirname, '..', 'dist.single'),
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'index.html'),
      favicon: path.join(__dirname, '..', 'favicon.ico'),
      date: new Date().toUTCString(),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
};

module.exports = merge(merge(commonConfig, helperWebpackConfig), config);
