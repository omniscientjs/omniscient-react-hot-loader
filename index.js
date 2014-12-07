module.exports = function (src) {
  if (this.cacheable) {
    this.cacheable();
  }

  var omniscientReloadablePath = require.resolve('./omniscient-reloadable').replace('.js', '');

  var reloadableComponentStr = ("(" + function () {
    var componentReloadable = require('%s');
    var args = [].slice.call(arguments);
    var c = componentReloadable.apply(null,
                [require('omniscient')].concat(args));
    if (module.hot) {
      module.hot.accept(function (err) {
        if (err) console.error(err);
      });
      module.hot.dispose(function () {
        setTimeout(c.reload, 0);
      });
    }
    return c;
  } + ")").replace('%s', omniscientReloadablePath);

  // e.g. var component = require('omniscient');
  var componentRegex = /([^\n\r ]+) = require\(['"]omniscient['"]\)/g;
  var match = componentRegex.exec(src);
  var componentFunction = (Array.isArray(match) && match[1]);
  if (!componentFunction.length) {
    return src;
  }

  var startOfComponentCall = new RegExp(componentFunction + "\\(", 'g');
  var reloadableComponentCall = reloadableComponentStr + "(";

  return src.replace(startOfComponentCall, reloadableComponentCall);
};
