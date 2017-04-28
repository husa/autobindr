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

// throw error if @name argument wasn't provided
function throwArgErr (name) {
  throw Error(`Argument "${name}" not specified`);
}

export default function autobind (context = throwArgErr('context'), options = {}) {
  let {
    skip = [],
    only = [],
    pattern = /.*/
  } = options;

  skip = defaultSkip.concat(skip);

  const proto = Object.getPrototypeOf(context);

  const methods = only.length ? only : Object.getOwnPropertyNames(proto);

  methods
    .filter(m => skip.indexOf(m) === -1)
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
        value: fn.bind(context)
      });
    });
}
