layout: post
title: "Jasmine—— JavaScript 单元测试框架"
description: ""
category: JavaScript
tags: [javascript]
---
对于JavaScript世界比较流行的测试框架的介绍及比较，请参考 [JavaScript 单元测试](/javascript/2014/02/14/javascript-unit-test/)。

## 源码结构

源码地址参考Reference，大致结构：

- src 源码。
- lib 这里放了运行测试案例所必须的文件。其中jasmine.js就是整个框架的核心代码，
jasmine-html.js用来展示测试结果，jasmine.css用来美化测试结果。
- dist/jasmine-standalone-2.0.0.zip/
    + spec/: 包含了就是这个测试案例所有的测试规则
        * PlayerSpec.js就是针对src文件夹下的Player.js所写的测试用例
        * SpecHelper.js用来添加自定义的检验规则的，
    + src/: 存放了我们需要测试的js文件对象
    + SpecRunner.html: 运行测试用例的环境

<!-- more -->

## 核心概念

### Suites

`describe (string, function)` 一个测试组开始于全局函数describe，一个describe是一个it的集合。describe包含n个it，一个it包含n个判断断言。string：测试组名称，function：测试组函数。An expectation in Jasmine is an assertion that is either true or false. If you name them well, your specs read as full sentences in traditional [BDD](http://en.wikipedia.org/wiki/Behavior-driven_development) style.

### Specs

`it(string, function)`   一个测试Spec。string：测试名称，function：测试函数。 JavaScript scoping rules apply, so variables declared in a `describe` are available to any `it` block inside the suite.

### Expectations

一个Expectation在jasmine中就是一个断言（`expect`语句），返回true或false。只有当一个spec中的expections全为ture时，这个spec显示通过，否则失败。

Expectation带有实际值，它和表示匹配规则的方法链接在一起，Matcher方法带期望值。

### Matchers

Matcher可以理解为断言，将Expectation传入的是实际值和Matcher传入的是期望值比较。任何Matcher都能通过在expect调用matcher前加上not来判断一个否定的断言。

beforeEach(function)   定义在一个describe的所有it执行前做的操作。

afterEach(function)   定义在一个describe的所有it执行后做的操作。

__Demo：__

    // Suites
    describe("A suite is just a function", function() {
      var a;
      
      // Specs
      it("and so is a spec", function() {
        // 访问describe的变量。
        a = true;
        
        // Expectation，toBe is a Matcher.
        expect(a).toBe(true);
      });
    });

### 内置的Matcher

- toBe 相当于===，处理简单字面值和变量。
- toNotBe 
- toEqual   处理简单字面值和变量，而且可以处理对象，数组。
- toNotEqual
- toMatch   按正则式匹配。
- toBeDefined   是否已声明且赋值
- toBeUndefined
- toBeNull   是否null
- toBeTruthy   如果转换为布尔值，是否为true
- toBeFalsy
- toContain   数组中是否包含元素（值）。只能用于数组，不能用于对象
- toBeLessThan   数值比较，小于
- toBeGreaterThan   数值比较，大于
- toBeCloseTo   数值比较时定义精度，先四舍五入后再比较
- toThrow    检验一个函数是否会抛出一个错误

你也可以通过 [custom_matcher.js](http://jasmine.github.io/2.0/custom_matcher.html) 来自定义Matcher。

__使用方法：__


    it("Some Rulers", function(){
        expect(a).not.toBe(null);
        expect(a).toEqual(12);
        expect(message).toMatch(/^f/);
    });

    it("toContain检验数组中是否包含元素(值)", function(){
        var a = ["foo", "bar", "baz"];
     
        expect(a).toContain("bar");
    });


    it("toBeCloseTo数值比较，指定精度，先四舍五入再比较", function() {
        var pi = 3.1415926, e = 2.78;
     
        // can have more than one expectation
        expect(pi).toBeCloseTo(e, 0);
        expect(pi).not.toBeCloseTo(e, 0.1);
    });

    it("toThrow检验一个函数是否会抛出一个错误", function() {
        var foo = function() {
          return 1 + 2;
        };
        var bar = function() {
          return a + 1;
        };
     
        expect(foo).not.toThrow();
        expect(bar).toThrow();
    });

## 基本用法

### Setup and Teardown

jasmine提供了全局的方法 beforeEach和afterEach，beforeEach在每个spec(it)前执行一次，afterEach在每个spec（it）后执行一次。

    describe("A spec (with setup and tear-down)", function() {
      var foo;

      beforeEach(function() {
        foo = 0;
        foo += 1;
      });

      afterEach(function() {
        foo = 0;
      });

      it("is just a function, so it can contain any code", function() {
        expect(foo).toEqual(1);
      });
    });

### this

除了在describe定义变量，用于各it共享数据外，还可以通过this关键字来共享数据。在在每一个Spec的声明周期（beforeEach->it->afterEach）的开始，都将有一个空对象this。

### describe嵌套

describe是可以嵌套的，并且specs可以定义在任何一层的describe中，jasmine允许用树状的方法来组成一个suite。在一个spec执行之前，jasmine从树的根节点依次执行（先序遍历）各个beforeEach,spec执行之后再以同样的方式执行afterEach（后序遍历）。

Demo请参考[Nesting describe Blocks](http://jasmine.github.io/2.0/introduction.html#section-Nesting_<code>describe</code>_Blocks).

### 禁用Suites

suites和specs是可以设为无效的，只需要将describe和it写成xdescribe,这样在运行时它们是被忽略的，它们的结果不会出现在总的结果里。

    xit("can be declared 'xit'", function() {
        expect(true).toBe(false);
    });

### 挂起Specs

挂起的Specs不运行，但是该Specs的名字将出现在结果中，并将结果设置为Pending。任何使用`xit`标志的Spec或者没有function body将将被标志位pending。

And if you call the function pending anywhere in the spec body, no matter the expectations, the spec will be marked pending.

    it("can be declared by calling 'pending' in the spec body", function() {
        expect(true).toBe(false);
        pending();
      });

## 高级用法

### Spies

在Jasmine中，我们使用Spi来跟踪函数被调用的情况，包括被方法调用的参数，Jasmine有专门的mather来跟这些Spi交互，如`toHaveBeenCalled`、`toHaveBeenCalledWith`等。

我们可以用如下方法为`foo`的`setBar`方法声明一个spi。

    spyOn(foo, 'setBar');

我们称`foo.setBar`为一个spi。之后我们便可以使用`expect(foo.setBar).toHaveBeenCalled();`等方法断言`foo.setBar`的调用情况。Spi的调用并不会影响真实的值，除非你使用下面介绍的如`and.callThrough`等方法。。

如果一个spy被调用过，则`toHaveBeenCalled`这个Mather将返回true。如果一个Spi被调用的参数列表和`toHaveBeenCalledWith`的参数相符，则`toHaveBeenCalledWith`将返回true。

完整例子如下：

    describe("A spy", function() {
      var foo, bar = null;

      beforeEach(function() {
        foo = {
          setBar: function(value) {
            bar = value;
          }
        };

        spyOn(foo, 'setBar');

        foo.setBar(123);
        foo.setBar(456, 'another param');
      });

      it("tracks that the spy was called", function() {
        expect(foo.setBar).toHaveBeenCalled();
      });

      it("tracks all the arguments of its calls", function() {
        expect(foo.setBar).toHaveBeenCalledWith(123);
        expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
      });

      it("stops all execution on a function", function() {
        // Spi的调用并不会影响真实的值，bar仍然是null。
        expect(bar).toBeNull();
      });
    });

以下例子中，均使用类似的结构，但值给出关键代码，详情请参考官方文档。

### Spies: and.callThrough

如果spi调用`and.callThrough`，那么spi除了跟踪所有的函数调用外，还会受实际实现的影响，即spi返回的值就是实际的值。

    spyOn(foo, 'getBar').and.callThrough();
    foo.setBar(123);
    fetchedBar = foo.getBar(); 

    it("should not effect other functions", function() {
      expect(bar).toEqual(123);
    });

    it("when called returns the requested value", function() {
      // 和实际的bar相等
      expect(fetchedBar).toEqual(123);
    });

### Spies: and.returnValue

如果spi调用`and.returnValue`，那么该spi返回的值为在`and.returnValue`中返回的值。

    spyOn(foo, "getBar").and.returnValue(745);

    foo.setBar(123);
    fetchedBar = foo.getBar();

    it("should not effect other functions", function() {
      expect(bar).toEqual(123);
    });

    it("when called returns the requested value", function() {
      // 和实际的bar不等，使用的是returnValue中定义的值。
      expect(fetchedBar).toEqual(745);
    });

### Spies: and.callFake

和`and.returnValue`类似，只不过是用function的形式指定spi的返回值。

    spyOn(foo, "getBar").and.callFake(function() {
        return 1001;
    });

    foo.setBar(123);
    fetchedBar = foo.getBar();

    it("when called returns the requested value", function() {
        // 实际的bar值为123，这里返回callFake中指定的值。
        expect(fetchedBar).toEqual(1001);
    });

### Spies: and.throwError

使用`and.throwError`来指定spi返回的异常。

    spyOn(foo, "setBar").and.throwError("quux");
    it("throws the value", function() {
        expect(function() {
          foo.setBar(123)
        }).toThrowError("quux");
    });

### Spies: and.stub

在调用`and.callThrough`后，如果你想阻止spi继续对实际值产生影响，你可以调用`and.stub`。也就是说，`and.stub`是将spi对实际实现的影响还原到最终的状态——不影响实际值。

    spyOn(foo, 'setBar').and.callThrough();

    foo.setBar(123);
    // 实际的bar=123
    expect(bar).toEqual(123);

    // 调用该代码后，之后调用foo.setBar将不会影响bar的值。
    foo.setBar.and.stub();
    bar = null;

    foo.setBar(123);
    expect(bar).toBe(null);

### calls

除了使用`toHaveBeenCalled`和`toHaveBeenCalledWith`来跟踪spi的调用情况外，我们还可以使用`calls`属性来跟踪更复杂的调用。

    spyOn(foo, 'setBar');

    // .calls.any() 只要调用一次则返回`true`，否则返回`false`。
    expect(foo.setBar.calls.any()).toEqual(true);

    // .calls.count() 返回调用次数。
    expect(foo.setBar.calls.count()).toEqual(2);

    // .calls.argsFor(index) 返回指定调用次数参数。
    // 其中1只的是第二次调用。
    expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);

    // calls.allArgs() 返回所有参数。
    foo.setBar(123);
    foo.setBar(456, "baz");
    expect(foo.setBar.calls.allArgs()).toEqual([[123],[456, "baz"]]);

    // .calls.all(): returns the context (the this) and arguments passed all calls
    expect(foo.setBar.calls.all()).toEqual([{object: foo, args: [123]}]);

    // .calls.mostRecent() 返回上下文和最近调用的参数。
    foo.setBar(123);
    foo.setBar(456, "baz");
    expect(foo.setBar.calls.mostRecent()).toEqual({object: foo, args: [456, "baz"]});

    // .calls.first()返回上下问和第一次调用的参数
    foo.setBar(123);
    foo.setBar(456, "baz");
    expect(foo.setBar.calls.first()).toEqual({object: foo, args: [123]});

    // .calls.reset() 清除所有追踪信息。
    foo.setBar(123);
    foo.setBar(456, "baz");
    expect(foo.setBar.calls.any()).toBe(true);
    foo.setBar.calls.reset();
    expect(foo.setBar.calls.any()).toBe(false);

### Spies: createSpy

使用`jasmine.createSpy`来创建一个虚拟spi，除了没有任何实现，具有其他spi相同的功能。

    var whatAmI = jasmine.createSpy('whatAmI');
    whatAmI("I", "am", "a", "spy");
    expect(whatAmI.and.identity()).toEqual('whatAmI');

### Spies: createSpyObj

定义一个具有spi数组的对象。

    var tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);
    tape.play();
    tape.pause();
    tape.rewind(0);

    expect(tape.play).toHaveBeenCalled();

### jasmine.any

`jasmine.any`的参数为一个构造函数或者“类”名，用于匹配所有构造函数为`jasmine.any`传入的构造函数的对象。

    expect({}).toEqual(jasmine.any(Object));
    expect(12).toEqual(jasmine.any(Number));
    expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));

### jasmine.objectContaining

`jasmine.objectContaining`接收一个Object类型的参数，用于匹配所有包含传入对象的所有对象。

    var foo = {
      a: 1,
      b: 2,
      bar: "baz"
    };

    expect(foo).toEqual(jasmine.objectContaining({
      bar: "baz"
    }));
    expect(foo).not.toEqual(jasmine.objectContaining({
      c: 37
    }));

## 虚拟Timer

Jasmine Clock 用于`setTimeout`和`setInterval`的回调控制，它使timer的回调函数同步化，一旦到达指定的时间，注册的毁掉函数便立即调用，这将是timer相关的代码更容易测试。也就是说，`setTimeout`和`setInterval`的回调是异步执行的，且时间是不精确的，使用 Jasmine Clock 可使它同步化，且精确计算时间。

__安装：__

在Spec或者Suite中安装Jasmine Clock。

    beforeEach(function() {
        timerCallback = jasmine.createSpy("timerCallback");
        jasmine.clock().install();
    });

__卸载：__

保证使用完成后，切记要关闭Jasmine Clock。

    afterEach(function() {
      jasmine.clock().uninstall();
    });

__计时：__

使用`jasmine.clock().tick`来计时，一旦累计的时间达到`setTimeout`或者`setInterval`中指定的延时时间，则触发回调函数。

    it("causes an interval to be called synchronously", function() {
      setInterval(function() {
        timerCallback();
      }, 100);

      expect(timerCallback).not.toHaveBeenCalled();

      jasmine.clock().tick(101);
      expect(timerCallback.calls.count()).toEqual(1);

      jasmine.clock().tick(50);
      expect(timerCallback.calls.count()).toEqual(1);

      jasmine.clock().tick(50);
      expect(timerCallback.calls.count()).toEqual(2);
    });

## 异步支持

`beforeEach`, `it`, 或者 `afterEach`添加一个可选参数（Function类型），我们假设该参数为`done`，当异步操作的回调，就调用`done`，表示异步操作的回调函数调用成功，否则如果没有调用`done`，则该Spec会因为超时退出，超时时间通过`jasmine.DEFAULT_TIMEOUT_INTERVAL`指定。

    var value;

    // setTimeout代表一个异步操作。
    beforeEach(function(done) {
      setTimeout(function() {
        value = 0;
        // 调用done表示回调成功，否则超时。
        done();
      }, 1);
    });

    // 如果在beforeEach中的setTimeout的回调中没有调用done，最终导致下面的it因超时而失败。
    it("should support async execution of test preparation and expectations", function(done) {
      value++;
      expect(value).toBeGreaterThan(0);
      done();
    });

## Reference

### 官方

- 源码：[pivotal/jasmine](https://github.com/pivotal/jasmine)
- 文档：[introduction.js](http://jasmine.github.io/2.0/introduction.html)
 
### 第三方

- [javaScript测试框架jasmine介绍（一）](http://www.taobaotest.com/blogs/2175)
- [javaScript测试框架jasmine介绍（二）](http://www.taobaotest.com/blogs/2267)

###　Other

- [Headless Javascript testing with Jasmine 2.0](http://lorenzoplanas.com/blog/20140302-headless-javascript-testing-with-jasmine-20) 结合PhantomJS使用的解决方案。
- [Cleaning up DOM selectors in Jasmine specs](http://lorenzoplanas.com/blog/20140305-cleaning-up-selectors-from-jasmine-specs)
- [Testing event binding and unbinding with Jasmine](http://lorenzoplanas.com/blog/20140312-testing-event-binding-and-unbinding-with-jasmine)
