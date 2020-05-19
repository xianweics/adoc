const path = require('path');
const { WebpackFilemanager } = require('filemanager-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'single-spa.config': './single-spa.config.js'
  },
  output: {
    publicPath: './',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  plugins: [
    new WebpackFilemanager({
      events: {
        start: {
          del: ['./dist']
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new VueLoaderPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    open: true
  }
};
