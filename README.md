# autobindr

> Look ma, no `bind`!

[![Build Status](https://travis-ci.org/husa/autobindr.svg?branch=master)](https://travis-ci.org/husa/autobindr)
[![npm](https://img.shields.io/npm/v/autobindr.svg)](https://www.npmjs.com/package/autobindr)
[![Codecov branch](https://img.shields.io/codecov/c/github/husa/autobindr/master.svg)](https://codecov.io/gh/husa/autobindr)

**The fast, easy and convenient way to automatically bind "class" methods to the instance.**

_Go from this_
```jsx
<button onClick={this.onButtonClick.bind(this)}>click</button>
```

_to this_
```jsx
<button onClick={this.onButtonClick}>click</button>

```

_With simple_
```js
autobind(this);
```

`autobind` should be called from within the class constructor function, passing `this` as an argument.

> While this package was developed with React in mind, it works the same way with vanilla JS classes or any other JS framework utilizing classes.

> It will skip all React lifecycle methods


## Installation
```
npm install --save autobindr
```
This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) or [Browserify](http://browserify.org/) to consume [CommonJS modules](http://webpack.github.io/docs/commonjs.html).

If you don’t yet use [npm](http://npmjs.com/) or a modern module bundler, and would rather prefer a single-file [UMD](https://github.com/umdjs/umd) build that makes `autobind` function available as a global. You can grab the latest version from [unpkg](https://unpkg.com) CDN [here](https://unpkg.com/autobindr), or production-ready minified version(<1kb) - [here](https://unpkg.com/autobindr/dist/autobindr.min.js) and drop `script` tag right into your HTML, although I **don't recommend** you to do so.


### Importing
ES6 modules
```js
import autobind from 'autobindr';
```

CommonJS
```js
var autobind = require('autobindr');
```

UMD
```js
var autobind = window.autobind;
```
## API

### `autobind(context, [options])`

Automatically binds "class" methods to provided context(usually lexical `this`). To be called in `constructor`.

```js
constructor () {
  super();
  autobind(this);
}
```

#### `options: {only: Array<string>, skip: Array<string>, pattern: RegExp}`
* `only: Array<string>` - Array of method names, if provided, only this methods will be bound to the context
```js
// bind only "onButtonClick" and "onFormSubmit" methods
autobind(this, {only: ['onButtonClick', 'onFormSubmit']})
```

* `skip: Array<string>` - Array of method names, if provided, this methods will be skipped(not bound to the context)

```js
// do not bind "onFormSubmit" method
autobind(this, {skip: ['onFormSubmit']})
```
* `pattern: RegExp` - if provided, regex will be executed on each method name

```js
// bind all methods starting with "handle" (handleClick, handleFormSubmit, handleDelete, etc.)
autobind(this, {pattern: /^handle/})
```

## Example

```jsx
import autobind from 'autobindr';

class Counter extends React.Component {

  constructor () {
    super();
    this.state = {
      counter: 0
    };
    autobind(this);
  }

  onButtonClick () {
    this.setState(state => ({
      counter: state.counter + 1
    }));
  }

  render () {
    return (
      <div className="counter">
        {this.state.counter}
        <button onClick={this.onButtonClick}>Inc</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.body);
```

## License
[MIT](https://github.com/husa/autobindr/blob/master/LICENSE)
