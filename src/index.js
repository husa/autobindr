// Skip React lifecycle methods
const defaultSkip = [
  'constructor',
  'componentWillMount',
  'render',
  'componentDidMount',

  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',

  'componentWillUnmount'
];

// throw error if context argument wasn't provided
function throwArgErr () {
  throw Error('autobindr: "context" argument not specified');
}

export default function autobind (context = throwArgErr(), options = {}) {
  const {
    skip = [],
    only = [],
    pattern = /.*/
  } = options;

  const exclude = defaultSkip.concat(skip);

  const proto = Object.getPrototypeOf(context);

  const methods = only.length ? only : Object.getOwnPropertyNames(proto);

  methods
    .filter(m => exclude.indexOf(m) === -1)
    .filter(m => pattern.test(m))
    .map(name => ({
      name,
      fn: Object.getOwnPropertyDescriptor(proto, name).value
    }))
    .filter(({fn}) => typeof fn === 'function')
    .forEach(({name, fn}) => {
      Object.defineProperty(context, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: fn.bind(context)
      });
    });
}
