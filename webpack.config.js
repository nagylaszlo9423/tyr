
module.exports = env => {
  if (env) {
    if (env.NODE_ENV === 'production') {
      console.info('Application build: production');
      return require('./config/webpack.prod.config');
    } else if (env.NODE_ENV === 'analyzer') {
      console.warn('Application build: analyzer');
      return require('./config/webpack.analyze.config');
    }
  }

  console.warn('Application build: development');
  return  require('./config/webpack.dev.config');
};
