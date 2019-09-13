
if (process.env.NODE_ENV === 'production') {
  module.exports = require("./config/webpack.prod.config");
} else {
  console.warn("Application starting in development mode");
  module.exports = require("./config/webpack.dev.config");
}
