// Skip Reaсt lifecycle methods
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
    .forEach(name => {
      const {value: fn} = Object.getOwnPropertyDescriptor(proto, name);
      if (typeof fn !== 'function') return;

      Object.defineProperty(context, name, {
        configurable: true,
        enumerable: false,
        value: fn.bind(context)
      });
    });
}
