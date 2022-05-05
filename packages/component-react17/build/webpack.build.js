const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.base');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  // devtool: 'source-map',
  plugins: [new CompressionPlugin()]
};
if (process.env.analysis) {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerHost: 'localhost',
      analyzerPort: 8800,
      reportFilename: 'report.html',
      defaultSizes: 'gzip',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    })
  );
}

module.exports = merge(webpackBase, config);
