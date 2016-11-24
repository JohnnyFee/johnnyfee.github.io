---
layout: "post"
title: "JavaScript Unit Test Sinonjs"
date: "2016-11-23 22:25"
categories:
---

[sinonjs/sinon: Test spies, stubs and mocks for JavaScript.](https://github.com/sinonjs/sinon)

## Sinonjs

事实上[Sinonjs](http://sinonjs.org/docs/#stubs)提供了三种测试桩：Spies, Stubs, Mocks。
以及一些虚拟环境：Timers、JSONP、XHR等。
本文着重介绍如何利用Spies和Stubs的使用。

文档：

* http://sinonjs.org/docs/

安装：

```
npm install --save-dev sinon
```

<!--more-->

## Spies

Spy 是Sinonjs提供的特殊函数，它会记录被调用时的参数、`this`，调用次数，
以及返回值、异常等等。用来测试一个函数是否被正确地调用。

> A test spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls. A test spy can be an anonymous function or it can wrap an existing function.

Spy共有三种构建方式：

* 匿名函数：`var spy = sinon.spy();`
* 包装一个既有函数：`var spy = sinon.spy(myFunc);`
* 替代一个对象方法：`var spy = sinon.spy(object, "method");`

现在我们测试`PubSub`能否正确地调用监听函数：

```
it('should be called correctly', function () {
    var spy = sinon.spy();
    PubSub.subscribe('message', spy);
    PubSub.publishSync('message', 'start');
    PubSub.publishSync('message', 'stop');
    expect(spy.calledTwice).to.equal(true);
});
```

> 现将`spy`作为监听函数注册到`'message'`事件上，然后发布两条事件。
> 我们希望`spy`被`PubSub`调用了两次。

Sinonjs提供的API远不仅仅这些，比如还可以测试被调用时参数是否正确：

```
expect(spy.calledWith('message', 'start')).to.equal(true);
expect(spy.calledWith('message', 'stop')).to.equal(true);
```

Sinonjs Spies 文档：http://sinonjs.org/docs/#spies

### When to Use Spies

As the name might suggest, spies are used to get information about function
calls. For example, a spy can tell us how many times a function was called, what
arguments each call had, what values were returned, what errors were thrown,
etc.

As such, a spy is a good choice whenever the goal of a test is to verify
something happened. Combined with Sinon's assertions, we can check many
different results by using a simple spy.

The most common scenarios with spies involve...

* Checking how many times a function was called
* Checking what arguments were passed to a function

**We can check how many times a function was called** using
`sinon.assert.callCount`, `sinon.assert.calledOnce`, `sinon.assert.notCalled`,
and similar. For example, here's how to verify the save function was being
called:

<pre>
it('should call save once', function() {
  var save = sinon.spy(Database, 'save');

  setupNewUser({ name: 'test' }, function() { });

  save.restore();
  sinon.assert.calledOnce(save);
});
</pre>

**We can check what arguments were passed to a function** using
`sinon.assert.calledWith`, or by accessing the call directly using
`spy.lastCall` or `spy.getCall()`. For example, if we wanted to verify the
aforementioned save function receives the correct parameters, we would use the
following spec:

<pre>
it('should pass object with correct values to save', function() {
  var save = sinon.spy(Database, 'save');
  var info = { name: 'test' };
  var expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  setupNewUser(info, function() { });

  save.restore();
  sinon.assert.calledWith(save, expectedUser);
});
</pre>

These are not the only things you can check with spies though — Sinon provides
[many other assertions](http://sinonjs.org/docs/#assertions) you can use to
check a variety of different things. The same assertions can also be used with
stubs.

If you spy on a function, the function's behavior is not affected. If you want
to change how a function behaves, you need a stub.

### 创建Spy

```
var spy = sinon.spy()：创建一个默认的 spy。
var spy = sinon.spy(myFunc)：为一个指定的方法创建 spy。
var spy = sinon.spy(object, "method")：为一个对象的方法创建 spy。
```

### 监视方法被执行的次数

- spy.callCount：被监视方法执行的次数。
- spy.called：被监视方法至少执行过一次。
- spy.calledOnce：被监视方法只执行一次。
- spy.calledTwice：被监视方法只执行二次。
- spy.calledThrice：被监视方法只执行三次。

### 监视方法是否按照指定的参数执行

- spy.withArgs(arg1[, arg2, ...])：
- spy.calledWith(arg1, arg2, ...)：被监视方法至少一次按照指定的参数执行。注意：使用此 spy 的时候，Sinon 只检查被监视方法执行的时候参数是否有包含spy中指定的所有参数，如果被监视方法在执行的时候参数不仅包含spy中指定的所有参数，还有其他参数，测试也是会通过的。
- spy.alwaysCalledWith(arg1, arg2, ...)：被监视方法每次都是按照指定的参数执行。注意点同上。
- spy.calledWithExactly(arg1, arg2, ...)：被监视方法至少一次严格按照指定的参数执行，不包含其他参数。
- spy.alwaysCalledWithExactly(arg1, arg2, ...)：被监视方法每次都是严格按照指定的参数执行，不包含其他参数。
- spy.calledWithMatch(arg1, arg2, ...)：被监视方法至少一次按照匹配的参数执行。效果类似于：spy.calledWith(sinon.match(arg1), sinon.match(arg2), ...)。
- spy.alwaysCalledWithMatch(arg1, arg2, ...)：被监视方法每次都按照匹配的参数执行。效果类似于：spy.alwaysCalledWith(sinon.match(arg1), sinon.match(arg2), ...)。
- spy.neverCalledWith(arg1, arg2, ...)：被监视方法从未按照指定的参数执行。
- spy.neverCalledWithMatch(arg1, arg2, ...)：被监视方法从未按照匹配的参数执行。

### 获取被监视方法每次的调用

- spy.firstCall：获取被监视方法第一次的调用。
- spy.secondCall：获取被监视方法第二次的调用。
- spy.thirdCall：获取被监视方法第三次的调用。
- spy.lastCall：获取被监视方法最后一次的调用。
- var spyCall = spy.getCall(n)：获取被监视方法第 n 次的调用。

获取具体的某次调用以后，可针对该次调用进行以下检查测试：

- spyCall.calledOn(obj)：该次调用 this 指向 obj。
- spyCall.calledWith(arg1, arg2, ...)：该次调用按照指定的参数执行。注意点同spy.calledWith(arg1, arg2, ...)。
- spyCall.calledWithExactly(arg1, arg2, ...)：该次调用严格按照指定的参数执行。
- spyCall.calledWithMatch(arg1, arg2, ...)：该次调用按照匹配的参数执行。
- spyCall.notCalledWith(arg1, arg2, ...)：该次调用不按照指定的参数执行。
- spyCall.notCalledWithMatch(arg1, arg2, ...)：该次调用不按照匹配的参数执行。
- spyCall.threw()：该次调用有抛出异常。
- spyCall.threw(TypeError")：该次调用抛出指定类型的异常。
- spyCall.threw(obj)：该次调用抛出 obj 异常。
- spyCall.thisValue：该次调用的 this 对象。
- spyCall.args：该次调用的参数列表。
- spyCall.exception：该次调用抛出的异常。
- spyCall.returnValue：该次调用的返回值。

### 监视方法执行的顺序

- spy.calledBefore(anotherSpy)：在指定的另一个监视方法之前执行。
- spy.calledAfter(anotherSpy)：在指定的另一个监视方法之后执行。

### 监视方法是否按照指定的对象执行

- spy.calledOn(obj)：被监视方法至少一次在执行的时候，this 指向 obj。
- spy.alwaysCalledOn(obj)：被监视方法每次执行的时候，this 都指向 obj。

### 监视方法是否用 new 操作符执行

    spy.calledWithNew()

### 监视方法拋异常

- spy.threw()：被监视方法至少一次抛出异常。
- spy.threw("TypeError")：被监视方法至少一次抛出执行类型的异常。
- spy.threw(obj)：被监视方法至少一次抛出 obj 异常。
- spy.alwaysThrew()：被监视方法每次执行都抛出异常。
- spy.alwaysThrew("TypeError")：被监视方法每次都抛出指定类型的异常。
- spy.alwaysThrew(obj)：被监视方法每次都抛出 obj 异常。

### 监视方法的返回值

- spy.returned(obj)：被监视方法至少一次返回 obj。
- spy.alwaysReturned(obj)：被监视方法每次执行都返回 obj。

### 监视相关的值

- spy.thisValues：被监视方法每次调用的 this 对象列表。例如 spy.thisValues[0] 是被监视方法第一次调用的 this 对象。
- spy.args：被监视方法每次调用的参数列表。例如 spy.args[0] 是被监视方法第一次调用的参数列表。
- spy.exceptions：被监视方法每次调用抛出的异常对象列表。例如 spy.exceptions[0] 是被监视方法第一次调用抛出的异常。如果某次调用没有抛出异常，则该次调用的异常在 exceptions 中的值为 undefined，即 spy.exceptions[n] === undefined。
- spy.returnValues：被监视方法每次调用的返回值列表。例如 spy.returnValues[0] 是被监视方法第一次调用的返回值。如果某次调用没有返回值，则该次调用的返回值在 exceptions 中的值为 undefined，即 spy.returnValues[n] === undefined。

### 其他

- spy.reset()：重置某个 spy 的状态。
- spy.printf("format string", [arg1, arg2, ...])：返回格式化后的字符串。
- %n: spy 的名称 (默认为"spy")
- %c: spy 被调用的次数，既 ("once", "twice", 等等。)
- %C: 一个表示 spy 的调用的列表，每个调用都以一个新行和四个空格为前缀。
- %t: 用逗号分隔的 spy 被调用时的 this 对象列表。
- %i: 传递给 printf 的第 i 个要格式化的值。

%*: 逗号分隔的传递给 printf 的（未格式化的字符串）参数列表。

## Stubs

Stub（测试桩）是有着预定义好的行为的函数，用来强制软件按照某个路径去执行。
在软件工程中，Stub一般用于给定模块的边界条件。

Stub 提供了一些行为操作，当用 Stub 来包装一个方法时，原始方法将不会被执行，取而代之的是按照 Stub 指定的行为来执行。

> Test stubs are functions (spies) with pre-programmed behavior. They support the full test spy API in addition to methods which can be used to alter the stub’s behavior.

Stub（测试桩）有4种构建方式：

* 匿名Stub：`var stub = sinon.stub();`
* 替换对象属性：`var stub = sinon.stub(object, "method");`
* 使用预定义函数替换对象属性：`var stub = sinon.stub(object, "method", func);`
* 替换对象的所有方法：`var stub = sinon.stub(obj);`

例如我们实现了一个`Calculator`，现在我们要测试`Calculator.multiply`。
它会调用`Calculator.plus`来实现，所以开始测试前我们需要一个可正确运行的
`Calculator.plus`，这便是测试桩。

```
it('should calculate multiply', function () {
    var plus = sinon.stub(Calculator, 'plus', function(a, b){
        return a + b;
    });

    var res = Calculator.multiply(123, 3);

    expect(res).to.equal(369);
    expect(plus.calledThrice).to.equal(true);
});
```

如果Stub（测试桩）具有确定的返回值，可以使用`yields`语法。例如：

```
sinon.stub(jQuery, 'ajax').yieldsTo('success', 1, 2);
jQuery.ajax({
    url: 'http://harttle.com',
    success: function(arg1, arg2){
        assert(arg1 === 1);
        assert(arg2 === 2);
    }
});
jQuery.ajax.restore();
```

Sinonjs Stubs 文档：http://sinonjs.org/docs/#stubs

### When to Use Stubs

Stubs are like spies, except in that they replace the target function. They can
also contain custom behavior, such as returning values or throwing exceptions.
They can even automatically call any callback functions provided as parameters.

Stubs have a few common uses:

* You can use them to replace problematic pieces of code
* You can use them to trigger code paths that wouldn't otherwise trigger - such
    as error handling
* You can use them to help test asynchronous code more easily

**Stubs can be used to replace problematic code**, i.e. the code that makes
writing tests difficult. This is often caused by something external - a network
connection, a database, or some other non-JavaScript system. The problem with
these is that they often require manual setup. For example, we would need to
fill a database with test data before running our tests, which makes running
and writing them more complicated.

If we _stub out_ a problematic piece of code instead, we can avoid these issues
entirely. Our earlier example uses `Database.save` which could prove to be a
problem if we don't set up the database before running our tests. Therefore, it
might be a good idea to use a stub on it, instead of a spy.

```js
it('should pass object with correct values to save', function() {
  var save = sinon.stub(Database, 'save');
  var info = { name: 'test' };
  var expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  setupNewUser(info, function() { });

  save.restore();
  sinon.assert.calledWith(save, expectedUser);
});
```

By replacing the database-related function with a stub, we no longer need an
actual database for our test. A similar approach can be used in nearly any
situation involving code that is otherwise hard to test.

**Stubs can also be used to trigger different code paths**. If the code we're
testing calls another function, we sometimes need to test how it would behave
under unusual conditions — most commonly if there's an error. We can make use of
a stub to trigger an error from the code:

```js
it('should pass the error into the callback if save fails', function() {
  var expectedError = new Error('oops');
  var save = sinon.stub(Database, 'save');
  save.throws(expectedError);
  var callback = sinon.spy();

  setupNewUser({ name: 'foo' }, callback);

  save.restore();
  sinon.assert.calledWith(callback, expectedError);
});
```

**Thirdly, stubs can be used to simplify testing asynchronous code**. If we
stub out an asynchronous function, we can force it to call a callback right
away, making the test synchronous and removing the need of asynchronous test
handling.

```js
it('should pass the database result into the callback', function(){var expectedResult = { success: true };
  var save = sinon.stub(Database, 'save');
  save.yields(null, expectedResult);
  var callback = sinon.spy();

  setupNewUser({ name: 'foo' }, callback);

  save.restore();
  sinon.assert.calledWith(callback, null, expectedResult);
});
```

Stubs are highly configurable, and can do
[a lot more](http://sinonjs.org/docs/#stubs) than this, but most follow these basic ideas.

### 创建 Stub

- var stub = sinon.stub()：创建一个 Sinon 默认行为的 stub。
- var stub = sinon.stub(object, "method")：为一个对象的方法创建一个 Sinon 默认行为的 stub。
- var stub = sinon.stub(object, "method", func)：为一个对象的方法创建一个指定行为的 stub。
- var stub = sinon.stub(obj)：为一个对象创建一个 stub。此种方式不推荐使用，因为针对单个方法的测试目标会更明确些，更能定位到问题的所在。

### 获取某次调用

- stub.onFirstCall()：获取第一次调用。
- stub.onSecondCall()：获取第二次调用。
- stub.onThirdCall()：获取第三次调用。

### 返回指定的值

- stub.returns(obj)：返回 obj。
- stub.returnsArg(index)：返回指定 index 的参数。例如 stub.returnsArg(0) 将第一个参数作为返回值返回。
- stub.returnsThis()：返回 this 对象。

### 拋异常

- stub.throws()：抛出一个 Error 类型的异常。
- stub.throws("TypeError")：抛出一个执行类型的异常。
- stub.throws(obj)：抛出 obj 对象异常。

### 调用回调函数

- stub.callsArg(index)：将索引号为 index 的参数作为回调函数进行调用。
- stub.callsArgOn(index, context)：将索引号为 index 的参数作为回调函数进行调用，context 作为回调函数运行时的 this 对象。
- stub.callsArgWith(index, arg1, arg2, ...)：将索引号为 index 的参数作为回调函数，并使用指定的参数来执行回调。
- stub.callsArgOnWith(index, context, arg1, arg2, ...)：将索引号为 index 的参数作为回调函数，context 作为回调函数运行时的 this 对象，并使用指定的参数来执行回调。
- stub.yields([arg1, arg2, ...])：使用指定的参数来执行被监视方法的第一个回调函数。与 callsArg 的区别在于：当被监视方法的参数中有多个回调函数时，可以用 callArg 来执行指定参数索引的回调函数，而 yields 始终只是执行第一个回调函数。
- stub.yieldsOn(context, [arg1, arg2, ...])：使用指定的参数来执行被监视方法的第一个回调函数，context 作为回调函数运行时的 this 对象，并使用指定的参数来执行回调。
- stub.yieldsTo(property, [arg1, arg2, ...])：当被监视方法的参数是一个对象时，将该对象的指定属性作为函数，使用指定的参数进行调用。
- stub.yieldsToOn(property, context, [arg1, arg2, ...])：当被监视方法的参数是一个对象时，将该对象的指定属性作为函数，使用指定的参数进行调用，context 作为函数运行时的 this 对象。
- 异步的 stub 类似对应的同步 stub，区别在于回调函数的调用被推迟了（没有立即执行，而是通过一个短暂的 timeout 在另一个线程中执行）。

    - stub.callsArgAsync(index)
    - stub.callsArgOnAsync(index, context)
    - stub.callsArgWithAsync(index, arg1, arg2, ...)
    - stub.callsArgOnWithAsync(index, context, arg1, arg2, ...)
    - stub.yieldsAsync([arg1, arg2, ...])
    - stub.yieldsOnAsync(context, [arg1, arg2, ...])
    - stub.yieldsToAsync(property, [arg1, arg2, ...])
    - stub.yieldsToOnAsync(property, context, [arg1, arg2, ...])

- 以下四个有些不明白与 stub.yields 和 stub.callsArg 有什么区别：

    - spy.yield([arg1, arg2, ...])
    - spy.yieldTo(callback, [arg1, arg2, ...])
    - spy.callArg(argNum)
    - spy.callArgWith(argNum, [arg1, arg2, ...])

## Mock

### When to Use Mocks

You should take care when using mocks - it's easy to overlook spies and stubs
when mocks can do everything they can, but mocks also easily make your tests
overly specific, which leads to brittle tests that break easily. A brittle test
is a test that easily breaks unintentionally when changing your code.

Mocks should be used primarily when you would use a stub, but need to verify
multiple more specific behaviors on it.

For example, here's how we could verify a more specific database saving scenario
using a mock:

```js
it('should pass object with correct values to save only once', function() {
  var info = { name: 'test' };
  var expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };
  var database = sinon.mock(Database);
  database.expects('save').once().withArgs(expectedUser);

  setupNewUser(info, function() { });

  database.verify();
  database.restore();
});
```

Note that, with a mock, we define our expectations up front. Normally, the
expectations would come last in the form of an assert function call. With a
mock, we define it directly on the mocked function, and then only call `verify`
in the end.

In this test, we're using `once` and `withArgs` to define a mock which checks
both the number of calls _and_ the arguments given. If we use a stub, checking
multiple conditions require multiple assertions, which can be a code smell.

Because of this convenience in declaring multiple conditions for the mock, it's
easy to go overboard. We can easily make the conditions for the mock more
specific than is needed, which can make the test harder to understand and easy
to break. This is also one of the reasons to avoid multiple assertions, so keep
this in mind when using mocks.

### Expectations

- var expectation = sinon.expectation.create([methodName])
- var expectation = sinon.mock()
- expectation.atLeast(number)
- expectation.atMost(number)
- expectation.never()
- expectation.once()
- expectation.twice()
- expectation.thrice()
- expectation.exactly(number)
- expectation.withArgs(arg1, arg2, ...)
- expectation.withExactArgs(arg1, arg2, ...)
- expectation.on(obj)：期望以 obj 为 this 对象来执行方法。
- expectation.verify()：检查此期望是否通过。

### Sandboxes

Sandboxes simplify working with fakes that need to be restored and/or verified. If you’re using fake timers, fake XHR, or you are stubbing/spying on globally accessible properties you should use a sandbox to ease cleanup. By default the spy, stub and mock properties of the sandbox is bound to whatever object the function is run on, so if you don’t want to manually restore(), you have to use this.spy() instead of sinon.spy() (and stub, mock).

```js
"test using sinon.test sandbox": sinon.test(function () {
    var myAPI = { method: function () {} };
    this.mock(myAPI).expects("method").once();

    PubSub.subscribe("message", myAPI.method);
    PubSub.publishSync("message", undefined);
})
```

1.  [sinon.sandbox](http://sinonjs.org/docs/#sinon-sandbox)
2.  [sinon.test](http://sinonjs.org/docs/#sinon-test)
3.  [sinon.testCase](http://sinonjs.org/docs/#sinon-testCase)

## Matchers

Matchers用于辅助`spy.calledWith`，`spy.returned`等断言，用来进一步指定期望的值，
比如正则匹配、类型检查等。

> Matchers can be passed as arguments to spy.calledWith, spy.returned and the corresponding sinon.assert functions as well as spy.withArgs. Matchers allow to be either more fuzzy or more specific about the expected value.

```
var book = {
    pages: 42,
    author: "harttle"
};

var spy = sinon.spy();
spy(book);

expect(spy.calledWith(sinon.match({ author: "harttle" }))).to.equal(true);
expect(spy.calledWith(sinon.match.has("pages", 42))).to.equal(true);
```

上述断言有更方便的写法：`spy.calledWithMatch(arg1, arg2, ...);`，
相当于：`spy.calledWith(sinon.match(arg1), sinon.match(arg2), ...)`。

Sinonjs Matchers 文档：http://sinonjs.org/docs/#matchers

## Best Practices and Tips

Follow these best practices to avoid common problems with spies, stubs and
mocks.

### Use sinon.test Whenever Possible

When you use spies, stubs or mocks, wrap your test function in `sinon.test`.
This allows you to use Sinon's automatic clean-up functionality. Without it, if
your test fails before your test-doubles are cleaned up, it can cause a
_cascading failure_ - more test failures resulting from the initial failure.
Cascading failures can easily mask the real source of the problem, so we want to
avoid them where possible.

Using `sinon.test` eliminates this case of cascading failures. Here's one of the
tests we wrote earlier:

<pre>
it('should call save once', function() {
  var save = sinon.spy(Database, 'save');

  setupNewUser({ name: 'test' }, function() { });

  save.restore();
  sinon.assert.calledOnce(save);
});
</pre>

If `setupNewUser` threw an exception in this test, that would mean the spy would
never get cleaned up, which would wreak havoc in any following tests.

We can avoid this by using `sinon.test` as follows:

<pre>
it('should call save once', sinon.test(function() {
  var save = this.spy(Database, 'save');

  setupNewUser({ name: 'test' }, function() { });

  sinon.assert.calledOnce(save);
}));
</pre>

Note the three differences: in the first line, we wrap the test function with
`sinon.test`. In the second line, we use `this.spy` instead of `sinon.spy`. And
lastly, we removed the `save.restore` call, as it's now being cleaned up
automatically.

You can make use of this mechanism with all three test doubles:

* `sinon.spy` becomes `this.spy`
* `sinon.stub` becomes `this.stub`
* `sinon.mock` becomes `this.mock`

### Async Tests with sinon.test

You may need to disable fake timers for async tests when using `sinon.test`.
This is a potential source of confusion when using Mocha's asynchronous tests
together with `sinon.test`.

To make a test asynchronous with Mocha, you can add an extra parameter into the
test function:

<pre>
it('should do something async', function(done) {
</pre>

This can break when combined with `sinon.test`:

<pre>
it('should do something async', sinon.test(function(done) {
</pre>

Combining these can cause the test to fail for no apparent reason, displaying a
message about the test timing out. This is caused by Sinon's fake timers which
are enabled by default for tests wrapped with `sinon.test`, so you'll need to
disable them.

This can be fixed by changing `sinon.config` somewhere in your test code or in
a configuration file loaded with your tests:

<pre>
sinon.config = {
  useFakeTimers: false
};
</pre>

`sinon.config` controls the default behavior of some functions like
`sinon.test`. It also has some [other available options](http://sinonjs.org/docs/#sinon-config).

### Create Shared Stubs in beforeEach

If you need to replace a certain function with a stub in all of your tests,
consider stubbing it out in a `beforeEach` hook. For example, all of our tests
were using a test-double for `Database.save`, so we could do the following:

<pre>
describe('Something', function() {
  var save;
  beforeEach(function() {
    save = sinon.stub(Database, 'save');
  });

  afterEach(function() {
    save.restore();
  });

  it('should do something', function() {
    //you can use the stub in tests by accessing the variable
    save.yields('something');
  });
});
</pre>

Make sure to also add an `afterEach` and clean up the stub. Without it, the stub
may be left in place and it may cause problems in other tests.

### Checking the Order of Function Calls or Values Being Set

If you need to check that certain functions are called in order, you can use
spies or stubs together with `sinon.assert.callOrder`:

<pre>
var a = sinon.spy();
var b = sinon.spy();

a();
b();

sinon.assert.callOrder(a, b);
</pre>

If you need to check that a certain value is set before a function is called,
you can use the third parameter of `stub` to insert an assertion into the stub:

<pre>
varobject={ };
var expectedValue = 'something';
var func = sinon.stub(example, 'func', function() {
  assert.equal(object.value, expectedValue);
});

doSomethingWithObject(object);

sinon.assert.calledOnce(func);
</pre>

The assertion within the stub ensures the value is set correctly before the
stubbed function is called. Remember to also include a `sinon.assert.calledOnce`
check to ensure the stub gets called. Without it, your test will not fail when
the stub is not called.

## Conclusion

Sinon is a powerful tool, and, by following the practices laid out in this
tutorial, you can avoid the most common problems developers run into when using
it. The most important thing to remember is to make use of `sinon.test` —
otherwise, cascading failures can be a big source of frustration.

## Tutorial

- [利用 Sinonjs 构建测试桩：Spies and Stubs - Harttle Land](http://harttle.com/2016/07/27/sinon-stub.html)
- [Best Practices for Spies, Stubs and Mocks in Sinon.js - Semaphore](https://semaphoreci.com/community/tutorials/best-practices-for-spies-stubs-and-mocks-in-sinon-js)

## Library

- [domenic/sinon-chai: Extends Chai with assertions for the Sinon.JS mocking framework.](https://github.com/domenic/sinon-chai)
