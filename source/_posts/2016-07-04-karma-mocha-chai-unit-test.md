layout: post
title: "Mocha Test Frameowrk Tutorial"
description: ""
category: JavaScript
tags: [javascript, unit test, mocha, karma]
---

## Mocha

- [Mocha - the fun, simple, flexible JavaScript test framework](https://mochajs.org/#asynchronous-code)
- [Home · mochajs/mocha Wiki](https://github.com/mochajs/mocha/wiki)

基于 Mocha 测试框架，使用断言库 [Chai](http://chaijs.com/)，允许我们同时使用 `should`、`expect`、`assert` 三种风格的断言。

By default, `mocha` looks for the glob `./test/*.js` and `./test/*.coffee`, so you may want to put your tests in `test/` folder.

<!-- more -->

## Asynchronous Code

基本用法和 Jasmine 一样。

```js
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        if (err) throw err;
        done();
      });
    });
  });
});
```

通常要在 `beforeEach` 后，调用异步接口，回调中调用 `done` 表示异步接口运行完毕；在接下来的 `it` 中断言异步返回的结果。

```js
describe("Asynchronous specs", function () {
    var value;
    beforeEach(function (done) {
        setTimeout(function () {
            value = 0;
            done();
        }, 1);
    });

    it("should support async execution of test preparation and expectations", function () {
        value++;
        expect(value).to.be.at.least(0);
    });
});
```

也可以直接在回调中断言、`throw` 异常，调用 `done(error)`，确保异步执行完成，一定要掉 `done` 方法。

```js
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        // 1. throw error
        if (err) throw err;
        done();

        // 2. done(error)
        // done('error message')

        // 3. expect
        // expect(1).to.be(2);
        // done();
      });
    });
  });
});
```

## Promise

可以在 `beforeEach`，`it` 中直接返回 `Promise` 对象，无需借助 `done`。

```js
beforeEach(function() {
  return db.clear()
    .then(function() {
      return db.save([tobi, loki, jane]);
    });
});

describe('#find()', function() {
  it('respond with matching records', function() {
    return db.find({ type: 'User' }).should.eventually.have.length(3);
  });
});
```

在断言 `Promise` 时， 可以使用 [Chai as Promised](https://www.npmjs.com/package/chai-as-promised)，无需再 `then` 中断言，如上面代码中的最后一个 `it`。

## Hooks

Mocha provides the hooks `before()`, `after()`, `beforeEach()`, and `afterEach()`, which can be used to set up preconditions and clean up after your tests.

```js
describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  // test cases
});
```

可以借助函数名称、或者可选的描述来定位错误。

```js
beforeEach(function() {
  // beforeEach hook
});

beforeEach(function namedFun() {
  // beforeEach:namedFun
});

beforeEach('some description', function() {
  // beforeEach:some description
});
```

## Manage Test

### Pending Tests

只有描述，没有回调的 `it` 将归为 Pending 状态。

```js
describe('Array', function() {
  describe('#indexOf()', function() {
    // pending test below
    it('should return -1 when the value is not present');
  });
});
```

### Exclusive Tests

通过 `only` 方法只运行指定的 `descibe` 或者 `it`。

```js
describe('Array', function() {
  describe.only('#indexOf()', function() {
    // ...
  });
});
```

### Inclusive Tests

通过 `skip` 方法跳过指定的 `descibe` 或者 `it`。

```js
describe('Array', function() {
  describe('#indexOf()', function() {
    it.skip('should return -1 unless present', function() {
      // ...
    });

    it('should return the index when present', function() {
      // ...
    });
  });
});
```

## Timeout

在 `describe` 或者 `it` 中调用 `this.timeout()` 设置超时时间。

```js
it('should take less than 500ms', function(done){
  this.timeout(500);
  setTimeout(done, 300);
});
```

`this.timeout(0)` can disable timeout.

__如果继续使用 Jasmine，则 按照以下方法设置延时：__

```
it("takes a long time", function(done) {
      setTimeout(function() {
        done();
      }, 9000);
    }, 10000);
```

If the entire suite should have a different timeout, `jasmine.DEFAULT_TIMEOUT_INTERVAL` can be set globally, outside of any given `describe`.

The `done.fail` function fails the spec and indicates that it has completed.

```
it("should not call the second callBack", function(done) {
      foo(true,
        done,
        function() {
          done.fail("Second callback has been called");
        }
      );
```

### Test duration

延时。

```js
describe('something slow', function() {
  this.slow(10000);

  it('should take long enough for me to go make a sandwich', function() {
    // ...
  });
});
```

## Examples

Real live example code:

* [Express](https://github.com/visionmedia/express/tree/master/test)
* [Connect](https://github.com/senchalabs/connect/tree/master/test)
* [SuperAgent](https://github.com/visionmedia/superagent/tree/master/test/node)
* [WebSocket.io](https://github.com/LearnBoost/websocket.io/tree/master/test)
* [Mocha](https://github.com/mochajs/mocha/tree/master/test)