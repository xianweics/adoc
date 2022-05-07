const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    open: true,
    proxy: [
      {
        bypass: (req) => {
          const trimPaths = ['/vue3'];
          const item = trimPaths.find((p) => req.url.startsWith(p));

          if (item) {
            return req.url.replace(
              new RegExp(`${item}(/.+)`, 'ig'),
              ($1, $2) => $2
            );
          }
        }
      }
    ]
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
    })
  ]
};
