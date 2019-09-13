const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const webpack = require('webpack');
const relativePath = require('./relative-path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: [relativePath('dist')],
    port: 3000,
    historyApiFallback: true,
    hot: true,
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
