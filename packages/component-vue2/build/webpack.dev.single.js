const { merge } = require('webpack-merge');
const basicConfig = require('./webpack.base.single');

module.exports = merge(basicConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  cache: true,
  devServer: {
    historyApiFallback: true,
    https: false,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});
