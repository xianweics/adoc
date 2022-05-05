const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

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
    new VueLoaderPlugin()
  ]
};

module.exports = config;
