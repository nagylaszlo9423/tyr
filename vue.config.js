const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: () => {
    const options = {plugins: []};

    if (process.env.ANALYZE) {
      options.plugins.push(new BundleAnalyzerPlugin());
    }

    return options;
  },
  chainWebpack: config => {

  },
  devServer: {
    port: 3000,
    https: true,
    proxy: {
      '/api': {
        target: 'https://127.0.0.1:3001/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        },
        logLevel: 'debug'
      }
    }
  }
};
