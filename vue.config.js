const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    devServer: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://localhost:3001',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
                logLevel: 'debug'
            }
        }
    }
};
