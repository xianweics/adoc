// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackBase = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CompressionPlugin()
  ],
  optimization: {
    runtimeChunk: true,
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};

if (process.env.npmConfigReport) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin({
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

module.exports = merge(webpackBase, prodConfig);
