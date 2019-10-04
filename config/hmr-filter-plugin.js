module.exports = class HmrFilterPlugin {
  apply(compiler) {
    compiler.options.output.globalObject = '(typeof self !== "undefined" ? self : this)';
  }
};
