const CompressionPlugin = require('compression-webpack-plugin');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
module.exports = {
  entry: './index.js',
  output: {
    clean: true,
    filename: 'entry.js',
    path: join(__dirname, 'dist')
  },
  mode: 'production',
  plugins: [
    new Webpack.ProvidePlugin({
      SystemJS: 'systemjs/dist/system.js'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'favicon.ico',
      date: new Date().toUTCString(),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CompressionPlugin()
  ]
};
