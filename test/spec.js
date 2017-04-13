import {equal, throws, notStrictEqual, deepEqual} from 'assert';
import autobind  from '../src';

describe('autobind()', function () {

  function withContext (fn, val = 10) {
    equal(fn(), val, `expected ${fn()} to equal ${val}`);
  }

  function withoutContext (fn, err = TypeError) {
    throws(() => fn(), TypeError, `expected ${fn} to throw ${err}`);
  }

  it('should throw if context is not specified', function () {
    throws(function () {
      autobind();
    }, Error);
  });

  it('should bind all methods', function () {
    class Test {
      constructor () {
        this.prop = 10;

        autobind(this);
      }

      do () {return this.prop;}
      skip () {return this.prop;}
    }
    const test = new Test;
    withContext(test.skip);
    withContext(test.do);
  });

  it('should skip methods provided with "skip" option', function () {
    class Test {
      constructor () {
        this.prop = 10;

        autobind(this, {skip: ['skip']});
      }

      do () {return this.prop;}
      skip () {return this.prop;}
    }
    const test = new Test;
    withContext(test.do);
    withoutContext(test.skip);
  });

  it('should bind only methods provided with "only" option', function () {
    class Test {
      constructor () {
        this.prop = 10;

        autobind(this, {only: ['do']});
      }

      do () {
        return this.prop;
      }

      skip () {
        return this.prop;
      }
    }
    const test = new Test;
    withContext(test.do);
    withoutContext(test.skip);
  });

  it('should bind only methods which match "pattern" option', function () {
    class Test {
      constructor () {
        this.prop = 10;

        autobind(this, {pattern: /^on/});
      }

      do () {return this.prop;}
      skip () {return this.prop;}
      onClick () {return this.prop;}
      onFocus () {return this.prop;}
    }
    const test = new Test;
    withoutContext(test.do);
    withoutContext(test.skip);
    withContext(test.onClick);
    withContext(test.onFocus);
  });

  it('should skip all React lifecycle methods', function () {
    class Test {
      constructor () {
        this.prop = 10;

        autobind(this, {pattern: /^on/});
      }

      componentWillMount () {return this.prop;}
      render () {return this.prop;}
      componentDidMount () {return this.prop;}
      componentWillReceiveProps () {return this.prop;}
      shouldComponentUpdate () {return this.prop;}
      componentWillUpdate () {return this.prop;}
      componentDidUpdate () {return this.prop;}
      componentWillUnmoun () {return this.prop;}
    }
    const test = new Test;
    withoutContext(test.componentWillMount);
    withoutContext(test.render);
    withoutContext(test.componentDidMount);
    withoutContext(test.componentWillReceiveProps);
    withoutContext(test.shouldComponentUpdate);
    withoutContext(test.componentWillUpdate);
    withoutContext(test.componentDidUpdate);
    withoutContext(test.componentWillUnmoun);
  });

  it('should not modify prototype methods', function () {
    class Test {
      constructor () {
        this.prop = 10;

        autobind(this);
      }

      do () {return this.prop;}
    }
    const test = new Test;
    notStrictEqual(test.do, Test.prototype.do);

    const test1 = new Test;
    const test2 = new Test;
    notStrictEqual(test1.do, test2.do);
  });

  it('should respect inheritance(super())', function () {
    class Test {
      constructor () {
        this.prop = 10;

        autobind(this);
      }

      do () {return this.prop;}
    }
    class Test2 extends Test {
      constructor () {
        super();

        autobind(this);
      }
      do () {
        return super.do() + 1;
      }
    }
    const test = new Test;
    const test2 = new Test2;
    withContext(test2.do, 11);
    withContext(test.do, 10);
  });

  it('should not add any enumerable properties to the instance', function () {
    class Test {
      constructor () {
        this.prop = 10;

        autobind(this, {skip: ['skip']});
      }

      do () {return this.prop;}
      skip () {return this.prop;}
    }
    const test = new Test;
    deepEqual(Object.keys(test), ['prop']);
  });
});
