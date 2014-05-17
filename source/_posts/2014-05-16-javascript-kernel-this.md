---
layout: post
title: "JavaScript 核心"
category: JavaScript
tags: [javascript]
--- 
本文由 [伯乐在线](http://blog.jobbole.com/) - [kmokidd](http://blog.jobbole.com/author/kmokidd/) 翻译自 [2ality](http://www.2ality.com/2014/05/this.html)。
  
在JavaScript中，`this`的概念比较复杂。除了在面向对象编程中，`this`还是随处可用的。这篇文章介绍了`this`的工作原理，它会造成什么样的问题以及`this`的相关例子。 要根据`this`所在的位置来理解它，情况大概可以分为3种：

1. **在函数中：**`this`通常是一个隐含的参数。
2. **在函数外（顶级作用域中）**：在浏览器中`this`指的是全局对象；在Node.js中指的是模块(module)的导出(exports)。
3. **传递到eval()中的字符串**：如果`eval()`是被直接调用的，`this`指的是当前对象；如果`eval()`是被间接调用的，`this`就是指全局对象。

对这几个分类，我们做了相应的测试：

## 1. 在函数中的 `this`

函数基本可以代表JS中所有可被调用的结构，所以这是也最常见的使用`this`的场景，而函数又能被子分为下列三种角色：

* 实函数
* 构造器
* 方法

### 1.1 在实函数中的 `this`

在实函数中，`this`的值是取决于它所处的上下文的[模式](http://speakingjs.com/es5/ch07.html#strict_mode)。


* Sloppy模式：`this`指的是全局对象（在浏览器中就是 `window`）。 


    function sloppyFunc() {
        console.log(this === window); // true
    }
    sloppyFunc();


* Strict模式：`this` 的值是 `undefined`。

        function strictFunc() {
            'use strict';
            console.log(this === undefined); // true
        }
        strictFunc();


    `this`是函数的隐含参数，所以它的值总是相同的。不过你是可以通过使用call()或者apply()的方法显示地定义好`this`的值的。

        function func(arg1, arg2) {
            console.log(this); // 1
            console.log(arg1); // 2
            console.log(arg2); // 3
        }
        func.call(1, 2, 3); // (this, arg1, arg2)
        func.apply(1, [2, 3]); // (this, arrayWithArgs)

### 1.2 构造器中的`this`

你可以通过`new`将一个函数当做一个构造器来使用。`new`操作创建了一个新的对象，并将这个对象通过`this`传入构造器中。

    var savedThis;
    function Constr() {
        savedThis = this;
    }
    var inst = new Constr();
    console.log(savedThis === inst); // true


JS中`new`操作的实现原理大概如下面的代码所示（更准确的实现请看[这里](http://speakingjs.com/es5/ch17.html#_the`new`operator_implemented_in_javascript)，这个实现也比较复杂一些）：

    function newOperator(Constr, arrayWithArgs) {
        var thisValue = Object.create(Constr.prototype);
        Constr.apply(thisValue, arrayWithArgs);
        return thisValue;
    }

### 1.3 方法中的`this`

在方法中`this`的用法更倾向于传统的面向对象语言：`this`指向的接收方，也就是包含有这个方法的对象。

    var obj = {
        method: function () {
            console.log(this === obj); // true
        }
    }
    obj.method();

## 2. 作用域中的`this`

在浏览器中，作用域就是全局作用域，`this`指的就是这个全局对象（就像`window`）：

    <script>
        console.log(this === window); // true
    </script>

在Node.js中，你通常都是在module中执行函数的。因此，顶级作用域是个很特别的模块作用域（module scope）：

    // `global` (not `window`) refers to global object:
    console.log(Math === global.Math); // true
     
    // `this` doesn’t refer to the global object:
    console.log(this !== global); // true
    // `this` refers to a module’s exports:
    console.log(this === module.exports); // true


## 3. `eval()` 中的`this`

eval()可以被直接（通过调用这个函数名’eval’）或者间接（通过别的方式调用，比如call()）地调用。要了解更多细节，请看[这里](http://speakingjs.com/es5/ch23.html#_indirect_eval_evaluates_in_global_scope)。

    // Real functions
    function sloppyFunc() {
        console.log(eval('this') === window); // true
    }
    sloppyFunc();
     
    function strictFunc() {
        'use strict';
        console.log(eval('this') === undefined); // true
    }
    strictFunc();
     
    // Constructors
    var savedThis;
    function Constr() {
        savedThis = eval('this');
    }
    var inst = new Constr();
    console.log(savedThis === inst); // true
     
    // Methods
    var obj = {
        method: function () {
            console.log(eval('this') === obj); // true
        }
    }
    obj.method();

## 4. 与`this`有关的陷阱

你要小心下面将介绍的3个和`this`有关的陷阱。要注意，在下面的例子中，使用[Strict模式(strict mode)](http://speakingjs.com/es5/ch07.html#strict_mode)都能提高代码的安全性。由于在实函数中，`this`的值是_undefined_，当出现问题的时候，你会得到警告。  

### 4.1 忘记使用`new`  

如果你不是使用new来调用构造器，那其实你就是在使用一个实函数。因此`this`就不会是你预期的值。在Sloppy模式中，`this`指向的就是`window`而你将会创建全局变量：

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    var p = Point(7, 5); // we forgot new!
    console.log(p === undefined); // true
     
    // Global variables have been created:
    console.log(x); // 7
    console.log(y); // 5

不过如果使用的是strict模式，那你还是会得到警告（this===undefined）：

    function Point(x, y) {
        'use strict';
        this.x = x;
        this.y = y;
    }
    var p = Point(7, 5);
    // TypeError: Cannot set property 'x' of undefined

###　4.2 不恰当地使用方法  

如果你直接取得一个方法的值（不是调用它），你就是把这个方法当做函数在用。当你要将一个方法当做一个参数传入一个函数或者一个调用方法中，你很可能会这么做。_setTimeout()_和注册事件句柄（event handlers）就是这种情况。我将会使用_callIt()_方法来模拟这个场景：

    /** Similar to setTimeout() and setImmediate() */
    function callIt(func) {
        func();
    }

如果你是在Sloppy模式下将一个方法当做函数来调用，*this*指向的就是全局对象，所以之后创建的都会是全局的变量。

    var counter = {
        count: 0,
        // Sloppy-mode method
        inc: function () {
            this.count++;
        }
    }
    callIt(counter.inc);
     
    // Didn’t work:
    console.log(counter.count); // 0
     
    // Instead, a global variable has been created
    // (NaN is result of applying ++ to undefined):
    console.log(count);  // NaN

如果你是在Strict模式下这么做的话，`this`是undefined的，你还是得不到想要的结果，不过至少你会得到一句警告：

    var counter = {
        count: 0,
        // Strict-mode method
        inc: function () {
            'use strict';
            this.count++;
        }
    }
    callIt(counter.inc);
     
    // TypeError: Cannot read property 'count' of undefined
    console.log(counter.count);

要想得到预期的结果，可以使用　`bind()`：

    var counter = {
        count: 0,
        inc: function () {
            this.count++;
        }
    }
    callIt(counter.inc.bind(counter));
    // It worked!
    console.log(counter.count); // 1

_bind()_又创建了一个总是能将`this`的值设置为_counter_的函数。

### 4.3 隐藏`this`  

当你在方法中使用函数的时候，常常会忽略了函数是有自己的`this`的。这个`this`又有别于方法，因此你不能把这两个`this`混在一起使用。具体的请看下面这段代码：

    var obj = {
        name: 'Jane',
        friends: [ 'Tarzan', 'Cheeta' ],
        loop: function () {
            'use strict';
            this.friends.forEach(
                function (friend) {
                    console.log(this.name+' knows '+friend);
                }
            );
        }
    };
    obj.loop();
    // TypeError: Cannot read property 'name' of undefined

上面的例子里函数中的_this.name_不能使用，因为函数的`this`的值是_undefined_，这和方法_loop()_中的`this`不一样。下面提供了三种思路来解决这个问题：

* **that=this**，将`this`赋值到一个变量上，这样就把`this`显性地表现出来了（除了_that_，_self_也是个很常见的用于存放`this`的变量名），之后就使用那个变量： 

        loop: function () {
            'use strict';
            var that = this;
            this.friends.forEach(function (friend) {
                console.log(that.name+' knows '+friend);
            });
        }

* _bind()_。使用_bind()_来创建一个函数，这个函数的`this`总是存有你想要传递的值（下面这个例子中，方法的`this`）： 

        loop: function () {
            'use strict';
            this.friends.forEach(function (friend) {
                console.log(this.name+' knows '+friend);
            }.bind(this));
        }

* 用forEach的第二个参数。forEach的第二个参数会被传入回调函数中，作为回调函数的`this`来使用。 

        loop: function () {
            'use strict';
            this.friends.forEach(function (friend) {
                console.log(this.name+' knows '+friend);
            }, this);
        }

## 5. 最佳实践

理论上，我认为实函数并没有属于自己的`this`，而上述的解决方案也是按照这个思想的。ECMAScript 6是用[箭头函数(arrow function)](http://www.2ality.com/2012/04/arrow-functions.html)来实现这个效果的，箭头函数就是没有自己的`this`的函数。在这样的函数中你可以随便使用`this`，也不用担心有没有隐式的存在。

    loop: function () {
        'use strict';
        // The parameter of forEach() is an arrow function
        this.friends.forEach(friend => {
            // `this` is loop’s `this`
            console.log(this.name+' knows '+friend);
        });
    }

我不喜欢有些API把`this`当做实函数的一个附加参数：

    beforeEach(function () {  
        this.addMatchers({  
            toBeInRange: function (start, end) {  
                ...
            }  
        });  
    });

把一个隐性参数写成显性地样子传入，代码会显得更好理解，而且这样和箭头函数的要求也很一致：

    beforeEach(api => {
        api.addMatchers({
            toBeInRange(start, end) {
                ...
            }
        });
    });