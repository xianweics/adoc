const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackFilemanager } = require('filemanager-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { clientDest, projectRoot, publicPath, clientSrc } = require('./config')
const { client: clientConfig } = require('../../config')
const ESLintPlugin = require('eslint-webpack-plugin')
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
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,
          'css-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: [require('autoprefixer')]
          //   }
          // },
          // 'resolve-url-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
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
              postcssOptions: {
                plugins: [require('autoprefixer')]
              }
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:5][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 200 * 1024
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash:5][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 200 * 1024
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.less', '.css', '.vue', '.jsx'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@root': projectRoot()
    }
  },
  plugins: [
    new ESLintPlugin({
      lintDirtyModulesOnly: false,
      extensions: ['js', 'json', 'jsx', 'vue'],
      context: projectRoot()
    }),
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
}
