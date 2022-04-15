const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackFilemanager } = require('filemanager-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const joinProjectRoot = (p = '/') => path.join(__dirname, '..', p);

module.exports = {
  entry: path.join(__dirname, '..', 'src/index.js'),
  output: {
    publicPath: '/',
    filename: '[name].[hash:5].js',
    path: joinProjectRoot('dist'),
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
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true
              }
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
    extensions: ['.js', '.json', '.vue']
  },
  plugins: [
    new ESLintPlugin({
      lintDirtyModulesOnly: false,
      extensions: ['js', 'json', 'vue'],
      context: joinProjectRoot()
    }),
    new WebpackFilemanager({
      events: {
        start: {
          del: {
            items: [joinProjectRoot('dist')]
          }
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: joinProjectRoot('index.html'),
      favicon: joinProjectRoot('favicon.ico'),
      date: new Date().toUTCString(),
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
