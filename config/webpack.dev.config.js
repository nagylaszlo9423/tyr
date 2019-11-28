const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const webpack = require('webpack');
const relativePath = require('./relative-path');
const HmrFilterPlugin = require('./hmr-filter-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: [relativePath('src')],
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    compress: true,
    watchOptions: {
      ignored: [relativePath('service_worker')]
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // TODO: Find better solution for excluding service worker of hmr.
    new HmrFilterPlugin()
  ]
});
