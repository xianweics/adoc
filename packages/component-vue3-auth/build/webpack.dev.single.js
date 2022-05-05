const { merge } = require('webpack-merge');
const basicConfig = require('./webpack.base.single');

const config = {
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
};

module.exports = merge(basicConfig, config);
