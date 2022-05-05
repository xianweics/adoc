const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.base.single');

module.exports = merge(webpackBase, {
  mode: 'production',
  plugins: [new CompressionPlugin()]
});
