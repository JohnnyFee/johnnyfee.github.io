layout: post
title: "JavaScript Tutorial"
description: ""
category: JavaScript
tags: [javascript]
---

See [JavaScript 秘密花园](https://bonsaiden.github.io/JavaScript-Garden/zh/)

## 类型

### 等于操作符

等于操作符由两个等号组成：`==`

JavaScript 是_弱类型_语言，这就意味着，等于操作符会为了比较两个值而进行**强制类型转换**。

```js
""           ==   "0"           // false
0            ==   ""            // true
0            ==   "0"           // true
false        ==   "false"       // false
false        ==   "0"           // true
false        ==   undefined     // false
false        ==   null          // false
null         ==   undefined     // true
" \t\r\n"    ==   0             // true
```

上面的表格展示了强制类型转换，这也是使用 `==` 被广泛认为是不好编程习惯的主要原因，
由于它的复杂转换规则，会导致难以跟踪的问题。

此外，强制类型转换也会带来性能消耗，比如一个字符串为了和一个数字进行比较，必须事先被强制转换为数字。

严格等于操作符由**三**个等号组成：`===`

不像普通的等于操作符，严格等于操作符**不会**进行强制类型转换。

```js
""           ===   "0"           // false
0            ===   ""            // false
0            ===   "0"           // false
false        ===   "false"       // false
false        ===   "0"           // false
false        ===   undefined     // false
false        ===   null          // false
null         ===   undefined     // false
" \t\r\n"    ===   0             // false
```

上面的结果更加清晰并有利于代码的分析。如果两个操作数类型不同就肯定不相等也有助于性能的提升。

### undefined 和 null

JavaScript 有两个表示‘空’的值，其中比较有用的是 `undefined`。

`undefined` 是一个值为 `undefined` 的类型。

这个语言也定义了一个全局变量，它的值是 `undefined`，这个变量也被称为 `undefined`。
但是这个变量**不是**一个常量，也不是一个关键字。这意味着它的_值_可以轻易被覆盖。

下面的情况会返回 `undefined` 值：

* 访问未修改的全局变量 `undefined`。
* 由于没有定义 `return` 表达式的函数隐式返回。
* `return` 表达式没有显式的返回任何内容。
* 访问不存在的属性。
* 函数参数没有被显式的传递值。
* 任何被设置为 `undefined` 值的变量。

__`null` 的用处__

JavaScript 中的 `undefined` 的使用场景类似于其它语言中的 _null_，实际上 JavaScript 中的 `null` 是另外一种数据类型。

它在 JavaScript 内部有一些使用场景（比如声明原型链的终结 `Foo.prototype = null`），但是大多数情况下都可以使用 `undefined` 来代替。

### typeof 操作符

`typeof` 操作符（和 [`instanceof`](https://bonsaiden.github.io/JavaScript-Garden/zh/#types.instanceof) 一起）或许是 JavaScript 中最大的设计缺陷，
因为几乎不可能从它们那里得到想要的结果。

尽管 `instanceof` 还有一些极少数的应用场景，`typeof` 只有一个实际的应用（**[译者注](http://cnblogs.com/sanshi/)：**这个实际应用是用来检测一个对象是否已经定义或者是否已经赋值），
而这个应用却**不是**用来检查对象的类型。

```
typeof foo !== 'undefined'
```

上面代码会检测 `foo` 是否已经定义；如果没有定义而直接使用会导致 `ReferenceError` 的异常。
这是 `typeof` 唯一有用的地方。

为了检测一个对象的类型，强烈推荐使用 `Object.prototype.toString` 方法；
因为这是唯一一个可依赖的方式。正如上面表格所示，`typeof` 的一些返回值在标准文档中并未定义，
因此不同的引擎实现可能不同。

除非为了检测一个变量是否已经定义，我们应尽量避免使用 `typeof` 操作符。

__JavaScript 类型表格__

Value              | Class    |  Type
-------------------|----------|--------
"foo"              | String   |  string
new String("foo")  | String   |  object
1.2                | Number   |  number
new Number(1.2)    | Number   |  object
true               | Boolean  |  boolean
new Boolean(true)  | Boolean  |  object
new Date()         | Date     |  object
new Error()        | Error    |  object
[1,2,3]            | Array    |  object
new Array(1, 2, 3) | Array    |  object
new Function("")   | Function |  function
/abc/g             | RegExp   |  object (function in Nitro/V8)
new RegExp("meow") | RegExp   |  object (function in Nitro/V8)
{}                 | Object   |  object
new Object()       | Object   |  object

上面表格中，_Type_ 一列表示 `typeof` 操作符的运算结果。可以看到，这个值在大多数情况下都返回 "object"。

_Class_ 一列表示对象的内部属性 `[[Class]]` 的值。

**JavaScript 标准文档中定义:**`[[Class]]` 的值只可能是下面字符串中的一个：`Arguments`, `Array`, `Boolean`, `Date`, `Error`, `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

为了获取对象的 `[[Class]]`，我们需要使用定义在 `Object.prototype` 上的方法 `toString`。

```
function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

is('String', 'test'); // true
is('String', new String('test')); // true
```

上面例子中，`Object.prototype.toString` 方法被调用，[this](https://bonsaiden.github.io/JavaScript-Garden/zh/#function.this) 被设置为了需要获取 `[[Class]]` 值的对象。

**[译者注](http://cnblogs.com/sanshi/)：**`Object.prototype.toString` 返回一种标准格式字符串，所以上例可以通过 `slice` 截取指定位置的字符串，如下所示：

```
Object.prototype.toString.call([])    // "[object Array]"
Object.prototype.toString.call({})    // "[object Object]"
Object.prototype.toString.call(2)    // "[object Number]"
```

**[译者注](http://cnblogs.com/sanshi/)：**这种变化可以从 IE8 和 Firefox 4 中看出区别，如下所示：

```
// IE8
Object.prototype.toString.call(null)    // "[object Object]"
Object.prototype.toString.call(undefined)    // "[object Object]"

// Firefox 4
Object.prototype.toString.call(null)    // "[object Null]"
Object.prototype.toString.call(undefined)    // "[object Undefined]"
```

### instanceof 操作符

`instanceof` 操作符用来比较两个操作数的构造函数。只有在比较自定义的对象时才有意义。
如果用来比较内置类型，将会和 [`typeof` 操作符](https://bonsaiden.github.io/JavaScript-Garden/zh/#types.typeof) 一样用处不大。

`instanceof` 操作符应该**仅仅**用来比较来自同一个 JavaScript 上下文的自定义对象。
正如 [`typeof`](https://bonsaiden.github.io/JavaScript-Garden/zh/#types.typeof) 操作符一样，任何其它的用法都应该是避免的。

比较自定义对象:

```
function Foo() {}
function Bar() {}
Bar.prototype = new Foo();

new Bar() instanceof Bar; // true
new Bar() instanceof Foo; // true

// 如果仅仅设置 Bar.prototype 为函数 Foo 本身，而不是 Foo 构造函数的一个实例
Bar.prototype = Foo;
new Bar() instanceof Foo; // false
```

`instanceof` 比较内置类型

```
new String('foo') instanceof String; // true
new String('foo') instanceof Object; // true

'foo' instanceof String; // false
'foo' instanceof Object; // false
```

有一点需要注意，`instanceof` 用来比较属于不同 JavaScript 上下文的对象（比如，浏览器中不同的文档结构）时将会出错，
因为它们的构造函数不会是同一个对象。

### 类型转换

JavaScript 是弱类型语言，所以会在任何可能的情况下应用强制类型转换。

```js
// 下面的比较结果是：true
new Number(10) == 10; // Number.toString() 返回的字符串被再次转换为数字

10 == '10';           // 字符串被转换为数字
10 == '+10 ';         // 同上
10 == '010';          // 同上 
isNaN(null) == false; // null 被转换为数字 0
                      // 0 当然不是一个 NaN（译者注：否定之否定）

// 下面的比较结果是：false
10 == 010;
10 == '-10';
```

为了避免上面复杂的强制类型转换，强烈推荐使用严格的等于操作符。 虽然这可以避免大部分的问题，但 JavaScript 的弱类型系统仍然会导致一些其它问题。

内置类型（比如 `Number` 和 `String`）的构造函数在被调用时，使用或者不使用 `new` 的结果完全不同。

```js
new Number(10) === 10;     // False, 对象与数字的比较
Number(10) === 10;         // True, 数字与数字的比较
new Number(10) + 0 === 10; // True, 由于隐式的类型转换
```

使用内置类型 `Number` 作为构造函数将会创建一个新的 `Number` 对象，
而在不使用 `new` 关键字的 `Number` 函数更像是一个数字转换器。

另外，在比较中引入对象的字面值将会导致更加复杂的强制类型转换。

最好的选择是把要比较的值**显式**的转换为三种可能的类型之一。

__转换为数字__

    +'10' === 10; // true

使用一元的加号操作符，可以把字符串转换为数字。

译者注：字符串转换为数字的常用方法：

```
+'010' === 10
Number('010') === 10
parseInt('010', 10) === 10  // 用来转换为整数

+'010.2' === 10.2
Number('010.2') === 10.2
parseInt('010.2', 10) === 10
```

__转换为布尔型__

通过使用 否 操作符两次，可以把一个值转换为布尔型。

```js
!!'foo';   // true
!!'';      // false
!!'0';     // true
!!'1';     // true
!!'-1'     // true
!!{};      // true
!!true;    // true
```

## 对象

JavaScript 中所有变量都是对象，除了两个例外 [`null`](https://bonsaiden.github.io/JavaScript-Garden/zh/#core.undefined) 和 [`undefined`](https://bonsaiden.github.io/JavaScript-Garden/zh/#core.undefined)。

```
false.toString(); // 'false'
[1, 2, 3].toString(); // '1,2,3'
function Foo(){}
Foo.bar = 1;
Foo.bar; // 1
```

一个常见的误解是数字的字面值（literal）不是对象。这是因为 JavaScript 解析器的一个错误，
它试图将_点操作符_解析为浮点数字面值的一部分。

```
2.toString(); // 出错：SyntaxError
```

有很多变通方法可以让数字的字面值看起来像对象。

```
2..toString(); // 第二个点号可以正常解析2 .toString(); // 注意点号前面的空格(2).toString(); // 2先被计算
```

### 属性

删除属性的唯一方法是使用 `delete` 操作符；设置属性为 `undefined` 或者 `null` 并不能真正的删除属性，
而**仅仅**是移除了属性和值的关联。

```
var test = {    'case': 'I am a keyword so I must be notated as a string',    delete: 'I am a keyword too so me' // 出错：SyntaxError};
```

对象的属性名可以使用字符串或者普通字符声明。但是由于 JavaScript 解析器的另一个错误设计，
上面的第二种声明方式在 ECMAScript 5 之前会抛出 `SyntaxError` 的错误。

这个错误的原因是 `delete` 是 JavaScript 语言的一个_关键词_；因此为了在更低版本的 JavaScript 引擎下也能正常运行，
必须使用_字符串字面值_声明方式。

## 函数

下面是将参数从一个函数传递到另一个函数的推荐做法。

```
function foo() {    
    bar.apply(null, arguments);
}

function bar(a, b, c) {    
    // 干活
}
```

另一个技巧是同时使用 `call` 和 `apply`，创建一个快速的解绑定包装器。

```
function Foo() {}

Foo.prototype.method = function(a, b, c) {
    console.log(this, a, b, c);
};

// 创建一个解绑定的 "method"
// 输入参数为: this, arg1, arg2...argN
Foo.method = function() {

    // 结果: Foo.prototype.method.call(this, arg1, arg2... argN)
    Function.call.apply(Foo.prototype.method, arguments);
};
```

**[译者注](http://cnblogs.com/sanshi/)**：上面的 `Foo.method` 函数和下面代码的效果是一样的:

```
Foo.method = function() {
    var args = Array.prototype.slice.call(arguments);
    Foo.prototype.method.apply(args[0], args.slice(1));
};
```

### 变量声明提升（Hoisting）

JavaScript 会**提升**变量声明。这意味着 `var` 表达式和 `function` 声明都将会被提升到当前作用域的顶部。

```
bar();
var bar = function() {};
var someValue = 42;

test();
function test(data) {
    if (false) {
        goo = 1;

    } else {
        var goo = 2;
    }
    for(var i = 0; i < 100; i++) {
        var e = data[i];
    }
}
```

上面代码在运行之前将会被转化。JavaScript 将会把 `var` 表达式和 `function` 声明提升到当前作用域的顶部。

```
// var 表达式被移动到这里
var bar, someValue; // 缺省值是 'undefined'

// 函数声明也会提升
function test(data) {
    var goo, i, e; // 没有块级作用域，这些变量被移动到函数顶部
    if (false) {
        goo = 1;

    } else {
        goo = 2;
    }
    for(i = 0; i < 100; i++) {
        e = data[i];
    }
}

bar(); // 出错：TypeError，因为 bar 依然是 'undefined'
someValue = 42; // 赋值语句不会被提升规则（hoisting）影响
bar = function() {};

test();
```

没有块级作用域不仅导致 `var` 表达式被从循环内移到外部，而且使一些 `if` 表达式更难看懂。

在原来代码中，`if` 表达式看起来修改了_全局变量_ `goo`，实际上在提升规则被应用后，却是在修改_局部变量_。

如果没有提升规则（hoisting）的知识，下面的代码看起来会抛出异常 `ReferenceError`。

```
// 检查 SomeImportantThing 是否已经被初始化
if (!SomeImportantThing) {
    var SomeImportantThing = {};
}
```

实际上，上面的代码正常运行，因为 `var` 表达式会被提升到_全局作用域_的顶部。

```
var SomeImportantThing;

// 其它一些代码，可能会初始化 SomeImportantThing，也可能不会

// 检查是否已经被初始化
if (!SomeImportantThing) {
    SomeImportantThing = {};
}
```

**[译者注](http://cnblogs.com/sanshi/)：**在 Nettuts+ 网站有一篇介绍 hoisting 的[文章](http://net.tutsplus.com/tutorials/javascript-ajax/quick-tip-javascript-hoisting-explained/)，其中的代码很有启发性。

```
// 译者注：来自 Nettuts+ 的一段代码，生动的阐述了 JavaScript 中变量声明提升规则
var myvar = 'my value';  

(function() {  
    alert(myvar); // undefined  
    var myvar = 'local value';  
})();  
```

