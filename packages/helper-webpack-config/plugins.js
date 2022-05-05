const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = ({ hash }) => [
  new MiniCssExtractPlugin({
    filename: hash ? 'css/[name].[hash:5].css' : 'css/[name].css',
    chunkFilename: hash ? 'css/[name].[hash:5].css' : 'css/[name].css'
  })
];
module.exports = plugins;
