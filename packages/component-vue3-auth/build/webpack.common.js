const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const Webpack = require('webpack');

const config = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.vue']
  },
  plugins: [
    new ESLintPlugin({
      lintDirtyModulesOnly: true,
      extensions: ['js', 'json', 'vue'],
      context: path.join(__dirname, '..')
    }),
    new VueLoaderPlugin(),
    new Webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
};

module.exports = config;
