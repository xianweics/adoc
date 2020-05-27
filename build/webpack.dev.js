const webpack = require('webpack');
const merge = require('webpack-merge');
const { middleware } = require('../config');
const webpackBaseConfig = require('./webpack.base');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    https: middleware.isHttps,
    port: 8080,
    hot: true,
    open: true,
    proxy: [
      {
        context: [],
        target: middleware.address + ':' + middleware.port,
        bypass: (req, res, opt) => {
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        }
      }
    ]
  }
});
