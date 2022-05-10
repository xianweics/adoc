const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');
const helperWebpackConfig = require('@adoc/helper-wepack-config')({
  hash: false
});

module.exports = merge(merge(commonConfig, helperWebpackConfig), {
  entry: path.join(__dirname, '..', 'single.entry.js'),
  output: {
    clean: true,
    filename: 'demo.react17.[name].js',
    library: 'demoReact17',
    libraryTarget: 'umd',
    path: path.join(__dirname, '..', 'dist.single')
  }
});
