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
