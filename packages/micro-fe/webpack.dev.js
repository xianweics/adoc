const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackFilemanager } = require('filemanager-plugin');

module.exports = {
  entry: './index.js',
  output: {
    clean: true,
    path: join(__dirname, 'dist'),
    filename: '[name].[hash:5].js',
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  cache: true,
  devServer: {
    historyApiFallback: true,
    https: false,
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'favicon.ico',
      date: new Date().toUTCString(),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new WebpackFilemanager({
      events: {
        end: {
          copy: {
            items: [
              {
                source: './import-map.json',
                destination: './dist'
              }
            ]
          }
        }
      }
    })
  ]
};
