const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.base');

module.exports = merge(webpackBase, {
  mode: 'production'
});
