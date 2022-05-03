const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base');
const config = {
  port: 8080,
  targetPort: 2000,
  targetAddress: '127.0.0.1',
  isHttps: false
};

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  cache: true,
  devServer: {
    historyApiFallback: true,
    https: config.isHttps,
    port: config.port,
    hot: true,
    open: true,
    proxy: [
      {
        context: [],
        target: config.targetAddress + ':' + config.targetPort,
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        }
      }
    ]
  }
});
