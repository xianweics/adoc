const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { WebpackFilemanager } = require('filemanager-plugin');

const { pathSrc, pathDest, publicPath } = require('./config');

module.exports = {
  entry: {
    'single-spa.config': pathSrc('../single-spa.config.js')
  },
  output: {
    publicPath: publicPath,
    filename: '[name].[hash:5].js',
    path: pathDest(),
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'resolve-url-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:5].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[hash:5].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.less', '.css'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@root': pathSrc(),
      '@public': pathSrc('public')
    }
  },
  plugins: [
    new WebpackFilemanager({
      events: {
        start: {
          del: {
            items: [pathDest()]
          }
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: pathSrc('../index.html'),
      favicon: pathSrc('favicon.ico'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:5].css',
      chunkFilename: 'css/[name].[chunkhash:5].css'
    })
  ]
};
