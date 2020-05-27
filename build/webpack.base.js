const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { WebpackFilemanager } = require('filemanager-plugin');

const { clientDest, projectRoot, publicPath, clientSrc } = require('./config');
const { client: clientConfig } = require('../config');

module.exports = {
  entry: {
    'single-spa-config': projectRoot('single-spa.config.js')
  },
  output: {
    publicPath: publicPath,
    filename: '[name].[hash:5].js',
    path: clientDest(),
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
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.less', '.css'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@project': projectRoot()
    }
  },
  plugins: [
    new WebpackFilemanager({
      events: {
        start: {
          del: {
            items: [clientDest()]
          }
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: clientSrc(clientConfig.entryHome),
      favicon: clientSrc('favicon.ico'),
      date: new Date().toUTCString(),
      filename: clientConfig.outputHome,
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
