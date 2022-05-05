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
    extensions: ['.js', '.json', '.jsx']
  },
  plugins: [
    new ESLintPlugin({
      lintDirtyModulesOnly: true,
      extensions: ['js', 'json', 'jsx'],
      context: path.join(__dirname, '..')
    })
  ]
};

module.exports = config;
