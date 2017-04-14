(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.autobind = factory());
}(this, (function () { 'use strict';

// Skip Reaсt lifecycle methods
var defaultSkip = ['constructor', 'componentWillMount', 'render', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'];

// throw error if @name argument wasn't provided
function throwArgErr(name) {
  throw Error('Argument "' + name + '" not specified');
}

function autobind() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : throwArgErr('context');
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$skip = options.skip,
      skip = _options$skip === undefined ? [] : _options$skip,
      _options$only = options.only,
      only = _options$only === undefined ? [] : _options$only,
      _options$pattern = options.pattern,
      pattern = _options$pattern === undefined ? /.*/ : _options$pattern;


  skip = defaultSkip.concat(skip);

  var proto = Object.getPrototypeOf(context);

  var methods = only.length ? only : Object.getOwnPropertyNames(proto);

  methods.filter(function (m) {
    return skip.indexOf(m) === -1;
  }).filter(function (m) {
    return pattern.test(m);
  }).forEach(function (name) {
    var _Object$getOwnPropert = Object.getOwnPropertyDescriptor(proto, name),
        fn = _Object$getOwnPropert.value;

    Object.defineProperty(context, name, {
      configurable: true,
      enumerable: false,
      value: fn.bind(context)
    });
  });
}

return autobind;

})));
