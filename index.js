const loaderUtils = require('loader-utils')
const path = require('path')
const schema = require('./options.json')

module.exports = function (content) {
  const loaderOptions = this.getOptions(schema) || {}
  const from = loaderOptions.from || '.'

  const name = loaderUtils.interpolateName(
    this,
    typeof loaderOptions.name !== 'undefined' ? loaderOptions.name : '[name].[ext]',
    {
      context: this.rootContext,
      content,
    }
  );

  let requirePath = path.posix.relative(from, name)
  if (requirePath[0] !== '.') {
    requirePath = './' + requirePath
  }

  if (typeof this.emitFile === 'function') {
    this.emitFile(name, content, false);
    this.addDependency(this.resourcePath);
  } else {
    throw new Error('emitFile function is not available');
  }
  return `process.dlopen(module, ${JSON.stringify(this.utils.contextify(this.context || this.rootContext, requirePath))});`
}

module.exports.raw = true
