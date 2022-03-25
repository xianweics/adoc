const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.base');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { projectRoot, clientDest } = require('./config');
const { version, name } = require(projectRoot('package.json'));
const { sentry } = require('../config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  // devtool: 'source-map',
  plugins: [
    new CompressionPlugin()
  ],
  
  optimization: {
    runtimeChunk: true,
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};
if (sentry.send) {
  config.plugins.push(new SentryWebpackPlugin({
    include: clientDest(),
    release: `${name}@${version}`,
    configFile: projectRoot('sentry.properties'),
    environment: 'production'
  }));
}

if (process.env.analysis) {
  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    analyzerHost: 'localhost',
    analyzerPort: 8888,
    reportFilename: 'report.html',
    defaultSizes: 'gzip',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info'
  }));
}

module.exports = merge(webpackBase, config);
