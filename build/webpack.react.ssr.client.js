const { WebpackFilemanager } = require('filemanager-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const { pathSrc, publicPath } = require('./config');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    client: pathSrc('react-ssr/client/index.js'),
    server: pathSrc('react-ssr/server/index.js'),
  },
  output: {
    publicPath: publicPath,
    filename: '[name].js',
    path: pathSrc('react-ssr/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new WebpackFilemanager({
      events: {
        start: {
          del: {
            items: [pathSrc('react-ssr/dist')]
          }
        }
      }
    })
  ],
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};
