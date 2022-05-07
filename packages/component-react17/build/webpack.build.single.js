const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.base.single');

module.exports = merge(webpackBase, {
  mode: 'production'
});
