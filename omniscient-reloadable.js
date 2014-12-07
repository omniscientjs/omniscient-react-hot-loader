var updaters = [];

module.exports = function (component, key) {
  if (typeof key !== 'string') {
    console.error("reloadable component()'s need a key as their first argument");
  }

  var args = [].slice.call(arguments).slice(1);
  var updater = updaters[key];
  if (updater) {
    return updater.update.apply(this, args);
  }

  updater = updaters[key] = createUpdater(key, component);
  return updater.create.apply(this, args);
};

function createUpdater (key, component) {

  var instances = [];

  var TrackInstancesMixin = {
    componentDidMount: function () {
      instances.push(this);
    },
    componentWillUnmount: function () {
      instances.splice(instances.indexOf(this), 1);
    }
  };

  var Component;

  function create () {
    Component = createComponent.apply(null, arguments);
    Component.reload = function reload () {
      instances.forEach(function (instance) {
        instance._bindAutoBindMethods();
        instance.forceUpdate();
      });
    };
    return Component;
  }

  function update () {
    createComponent.apply(null, arguments);
    return Component;
  }

  function createComponent () {
    var args = findComponentArgs(arguments);
    args.mixins.unshift(TrackInstancesMixin);
    var Component = component.call(null, args.key, args.mixins, args.render);
    patchExistingProtos(Component.jsx.type.prototype);
    return Component;
  }

  var protos = [];
  function patchExistingProtos (replacement) {
    protos.forEach(function (proto) {
      Object.keys(replacement)
            .forEach(function (key) { patchProtoProperty(proto, key, replacement); });
    });
    protos.push(replacement);
  }

  function patchProtoProperty (proto, key, replacement) {
    proto[key] = replacement[key];

    if (typeof proto[key] !== 'function' || key === 'type' || key === 'constructor') {
      return;
    }

    proto[key] = function () {
      if (replacement[key]) {
        return replacement[key].apply(this, arguments);
      }
    };

    if (proto.__reactAutoBindMap[key]) {
      proto.__reactAutoBindMap[key] = proto[key];
    }
  }

  return { create: create, update: update };
}

function findComponentArgs (args) {
  args = [].slice.call(args);

  mixinArrayOrSingle = args.filter(function(m) {
    return Array.isArray(m) || typeof m === 'object';
  })[0] || [];

  return {
    mixins: Array.isArray(mixinArrayOrSingle) ? mixinArrayOrSingle : [mixinArrayOrSingle],
    key:    args.filter(function (a) { return typeof a === 'string'; })[0],
    render: args.filter(function (f) { return typeof f === 'function'; })[0]
  };
}
