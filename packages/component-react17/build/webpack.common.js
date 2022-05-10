const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [
    new ESLintPlugin({
      lintDirtyModulesOnly: true,
      extensions: ['js', 'json', 'jsx'],
      context: path.join(__dirname, '..')
    })
  ]
};
