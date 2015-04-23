layout: post
title: "JavaScript 技巧"
category: JavaScript
tags: [javascript,performance]
---

JavaScript 本身可以算是一门简单的语言，但我们也不断用智慧和灵活的模式来改进它。昨天我们将这些模式应用到了 JavaScript 框架中，今天这些框架又驱动了我们的 Web 应用程序。很多新手开发者被各种强大的 JavaScript 框架吸引进来，但他们却忽略了框架身后浩如星海的 JavaScript 实用技巧。

## Type

`undefined`, `null`, 0, `false`, `NaN`, `''` (empty string) are all falsy.

### 等于操作符

等于操作符由两个等号组成：`==`

JavaScript 是 _弱类型_ 语言，这就意味着，等于操作符会为了比较两个值而进行**强制类型转换**。

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

<!-- more -->

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

### How can I check whether a variable is defined in JavaScript

    if (typeof variable === 'undefined') {
        // variable is undefined
    }

### Be careful when using `typeof`, `instanceof` and `constructor`

* _typeof_ : a JavaScript unary operator used to return a string that represents the primitive type of a variable, don’t forget that `typeof null` will return “object”, and for the majority of object types (Array, Date, and others) will return also “object”.
* _constructor_ : is a property of the internal prototype property, which could be overridden by code.
* _instanceof_ : is another JavaScript operator that check in all the prototypes chain the constructor it returns true if it’s found and false if not.

```js
var arr = ["a", "b", "c"];
typeof arr;   // return "object" 
arr instanceof Array // true
arr.constructor();  //[]
```

### Use logical AND/ OR for conditions

```
var foo = 10;  
foo == 10 && doSomething(); // is the same thing as if (foo == 10) doSomething(); 
foo == 5 || doSomething(); // is the same thing as if (foo != 5) doSomething();
```

The logical OR could also be used to set a default value for function argument.

```
function doSomething(arg1){ 
    arg1 = arg1 || 10; // arg1 will have 10 as a default value if it’s not already set
}
```

### What does `void 0` mean?

[`void`<sup>[MDN]</sup>](https://developer.mozilla.org/en/JavaScript/Reference/Operators/Special_Operators/void_Operator) is a prefix keyword that takes one argument and always returns `undefined`.

**Examples**

```
void 0
void (0)
void "hello"
void (new Date())
//all will return undefined
```

__What's the point of that?__

It seems pretty useless, doesn't it? If it always returns `undefined`, what's wrong with just using `undefined` itself?

In a perfect world we would be able to safely just use `undefined`: it's much simpler and easier to understand than `void 0`. But in case you've never noticed before, _this isn't a perfect world_, especially when it comes to Javascript. 

The problem with using `undefined` is that `undefined` is not a reserved word ([and in some Javascript environments is actually a global variable <sup>[wtfjs]</sup>](http://wtfjs.com/2010/02/15/undefined-is-mutable)). That is, `undefined` is a permissible variable name, so you can assign a new value to it at your own caprice.

```
alert(undefined); //alerts "undefined"
var undefined = "new value";
alert(undefined) //alerts "new value"
```

Because of this, you cannot safely rely on `undefined` having the value that you expect.

`void`, on the other hand, cannot be overidden. `void 0` will _always_ return `undefined`. `undefined`, on the other hand, can be whatever Mr. Javascript decides he wants it to be.

__Why `void 0`, specifically?__

Why should we use `void 0`? What's so special about `0`? Couldn't we just as easily use `1`, or `42`, or `1000000` or `"Hello, world!"`?

And the answer is, yes, we could, and it would work just as well. The only benefit of passing in `0` instead of some other argument is that `0` is short and idiomatic.

See [javascript - What does `void 0` mean? - Stack Overflow](http://stackoverflow.com/questions/7452341/what-does-void-0-mean)

### Better way to get type of a Javascript variable?

Angus Croll recently wrote an interesting blog post about this -

http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/

He goes through the pros and cons of the various methods then defines a new method 'toType' -

```js
var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
```

See [Better way to get type of a Javascript variable? - Stack Overflow](http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable)

## Object

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

### Check the properties of an object when using a for-in loop

This code snippet could be useful in order to avoid iterating through the properties from the object’s prototype.

```js
for (var name in object) {  
    if (object.hasOwnProperty(name)) { 
        // do something with name                    
    }  
}
```

### Create an object whose prototype is a given object

It’s possible to write a function that creates an object whose prototype is the given argument like this…

```js
function clone(object) {  
    function OneShotConstructor(){}; 
    OneShotConstructor.prototype= object;  
    return new OneShotConstructor(); 
} 
clone(Array).prototype ;  // []
```

### 高效探测功能特性和对象属性

很多时候开发者们会像下面这样来探测浏览器的某个特性：

    if(navigator.geolocation) {
        // Do some stuff
        // 在这里干点事情
    }

当然这可以正常工作，但它并不一定有很好的效率。因为这个对象探测方法会在浏览器中初始化资源。在过去，上面的代码片断可能会在某些浏览器下导致内存泄露。更好、更快的方法是检查对象是否包含某个键名：

    if("geolocation" in navigator) {
        // Do some stuff
        // 在这里干点事情
    }

键名检查十分简单，而且可以避免内存泄露。另外请注意，如果这个属性的值是假值，那么前一种探测方式将会得到“否”的结果，并不能真正探测出这个键名是否存在。

See also [Retrieving Property Names with `Object.getOwnPropertyNames` and `Object.keys` · Design Pepper](http://designpepper.com/blog/drips/retrieving-property-names-with-object-getownpropertynames-and-object-keys.html)

### getter and setter

- [ __defineGetter__ 跟 __defineSetter__](http://www.cnblogs.com/sniper007/archive/2012/04/24/2468175.html)
- [Object.prototype.__defineGetter__() - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineGetter)
- [Object.prototype.__defineSetter__() - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineSetter)

IE 11+ 和其他主流浏览器均支持。

Getter是一种获取一个属性的值的方法，Setter是一种设置一个属性的值的方法。可以为任何预定义的核心对象或用户自定义对象定义getter和setter方法，从而为现有的对象添加新的属性。

有两种方法来定义Getter或Setter方法：

* 在对象初始化时定义。
* 在对象定义后通过Object的__defineGetter__、__defineSetter__方法来追加定义。

在使用对象初始化过程来定义Getter和Setter方法时唯一要做的事情就是在getter方法前面加上“get”，在setter方法前面加上“set”。  

还有一点要注意的就是getter方法没有参数，setter方法必须有一个参数，也就是要设置的属性的新值。  

例如：

```javascript
o = {  
    value:9,  
    get b() {return this.value;},  
    set setter(x) {this.value = x;}  
}  
```

在对象定义后给对象添加getter或setter方法要通过两个特殊的方法`__defineGetter__`和`__defineSetter__`。这两个函数要求第一个是getter或setter的名称，以string给出，第二个参数是作为getter或setter的函数。  

例如我们给Date对象添加一个year属性：  

```js
Date.prototype.__defineGetter__('year', function() {return this.getFullYear();});  
Date.prototype.__defineSetter__('year', function(y) {this.setFullYear(y)});  
  
var now = new Date;  
alert(now.year);  
now.year = 2006;  
alert(now);
```

至于采用哪种形式主要取决于个人的编程风格，采用第一种形式结构紧凑，更容易理解。但是假如你想在对象定义以后再添加Getter或Setter，或者这个对象的原型不是你写的或是内置对象，那么只好采用第二种方式了。  

下面是一个为Mozilla浏览器添加innerText属性的实现：

```javascript
HTMLElement.prototype.__defineGetter__(  
    "innerText",function()  
    //define a getter method to get the value of innerText,   
    //so you can read it now!   
    {  
      var textRange = this.ownerDocument.createRange();  
      //Using range to retrieve the content of the object  
      textRange.selectNodeContents(this);  
      //only get the content of the object node  
      return textRange.toString();  
      // give innerText the value of the node content  
    }  
    );
```

### 构造函数

在编写 JavaScript 模块时，经常会看着这样的代码：

    function Buffer (subject, encoding, noZero) {
      if (!(this instanceof Buffer)){
        return new Buffer(subject, encoding, noZero);
      }
      // ...
    }

这样可以保证用户忘记 `new` 的时候，也返回 JavaScript 对象。 

## JSON

### Serialization and deserialization (working with JSON)

```js
var person = {name :'Saad', age : 26, department : {ID : 15, name : "R&D"} }; 
var stringFromPerson = JSON.stringify(person); 
/* stringFromPerson is equal to "{"name":"Saad","age":26,"department":{"ID":15,"name":"R&D"}}"   */ 
var personFromString = JSON.parse(stringFromPerson);  
/* personFromString is equal to person object  */
```

## Number

### Get a random number in a specific range

This code snippet can be useful when trying to generate fake data for testing purposes, such as a salary between min and max.

```js
var x = Math.floor(Math.random() * (max - min + 1)) + min;
```

### Verify that a given argument is a number

```js
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}
```

### Rounding number to N decimal place

```js
var num =2.443242342;
num = num.toFixed(4);  // num will be equal to 2.4432
```

NOTE : the `toFixed()` function returns a string and not a number.

**Floating point problems**

```
0.1 + 0.2 === 0.3 // is false 
9007199254740992 + 1 // is equal to 9007199254740992  
9007199254740992 + 2 // is equal to 9007199254740994
```

Why does this happen? 0.1 +0.2 is equal to 0.30000000000000004. What you need to know is that all JavaScript numbers are floating points represented internally in 64 bit binary according to the IEEE 754 standard. For more explanation, take a look to [this blog post](http://www.2ality.com/2012/04/number-encoding.html).

You can use `toFixed()` and `toPrecision()` to resolve this problem.

### Verify the argument before passing it to `isFinite()`

```
isFinite(0/0) ; // false 
isFinite("foo"); // false 
isFinite("10"); // true 
isFinite(10);   // true 
isFinite(undefined);  // false 
isFinite();   // false 
isFinite(null);  // true  !!!
```

## String

### 在 String.prototype.replace 方法中使用 /g 和 /i 标志位

令很多 JavaScript 初学者意外的是，字符串的 replace 方法并不会 [替换所有匹配的子串](http://davidwalsh.name/javascript-replace)——而仅仅替换第一次匹配。当然 JavaScript 老手们都知道这里可以使用正则表达式，并且需要加上一个全局标志位（/g）：

```js
// Mistake
// 踩到坑了
var str = "David is an Arsenal fan, which means David is great";
str.replace("David", "Darren"); // "Darren is an Arsenal fan, which means David is great"

// Desired
// 符合预期
str.replace(/David/g, "Darren"); // "Darren is an Arsenal fan, which means Darren is great"
```

另一个基本的逻辑错误就是在大小写不敏感的校验场合（字母可大写可小写）没有忽略大小写，此时 /i 标志位就很实用：

```js
str.replace(/david/gi, "Darren"); // "Darren will always be an Arsenal fan, which means Darren will always be great"
```

（译注：上面这段例程我没有看懂用意，可能是注释有误吧……）

每个 JavaScript 开发者都曾踩过这两个标志位的坑——因此别忘了在适当的时候用上它们！

### String.replaceAll

```js
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}
```

Reference: [Replacing all occurrences of a string in javascript? - Stack Overflow](http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript)

### String.endsWith

```js
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
```

### toString

In JavaScript, when an object is passed to a function expecting a string (like [window.alert](https://developer.mozilla.org/en-US/docs/Web/API/window.alert) or [document.write](https://developer.mozilla.org/en-US/docs/Web/API/document.write)), the object's toString() method is called and the returned value is passed to the function. This can make the object appear to be a string when used with other functions when it is really an object with properties and methods.

    var selObj = window.getSelection(); 

In the above example, selObj.toString() is automatically called when it is passed to window.alert. However, attempting to use a JavaScript String property or method such as length or substr directly on a Selection object will result in an error if it does not have that property or method and may return unexpected results if it does. To use a Selection object as a string, call its toString method directly:

    var selectedText = selObj.toString();

Refrerence: [Window.getSelection](https://developer.mozilla.org/en-US/docs/Web/API/Window.getSelection)

### A string trim function

The classic trim function of Java, C#, PHP and many other language that remove whitespace from a string doesn’t exist in JavaScript, so we could add it to the `String` object.

```js
String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g, "");};
```

A native implementation of the trim() function is available in the recent JavaScript engines.

## Array

- [Working with ES5 JavaScript array functions in modern and legacy browsers - Tech.Pro](http://tech.pro/tutorial/1834/working-with-es5-javascript-array-functions-in-modern-and-legacy-br)

### 类数组对象和 Array.prototype.slice 方法

数组的 slice 方法通常用来从一个数组中抽取片断。但很多开发者不了解的是，这个方法还可以用来将“类数组”元素（比如 arguments 参数列表、节点列表和属性列表）转换成真正的数组：（译注：DOM 元素的属性列表通过 attributes 属性获取，比如 document.body.attributes。）

```js
var nodesArr = Array.prototype.slice.call(document.querySelectorAll("div"));
// "true" array of DIVs
// 得到一个由 div 元素组成的“真正的”数组

var argsArr = Array.prototype.slice.call(arguments);
// changes arguments to "true" array
// 把 arguments 转换成一个“真正的”数组
```

你还可以使用一次简单的 slice 调用来克隆一个数组：

```js
var clone = myArray.slice(0); // naive clone 浅克隆
```

（译注：这里的参数 0 也可以省略，我估计 undefined 被 slice 方法自动转换为 0 了吧。）

Array.prototype.slice 绝对是 JavaScript 世界中的一玫珍宝，但 JavaScript 初学者们显然还没有意识到它的全部潜力。

### Array.prototype.sort 方法

[数组的 sort 方法](http://davidwalsh.name/array-sort) 远远没有被充分利用，而且可能比开发者们想像的更加强大。很多开发者可能觉得 sort 方法可以用来做这种事情：

```js
[1, 3, 9, 2].sort();

// Returns: [1, 2, 3, 9]
// 返回 [1, 2, 3, 9]
```

……这没错，但它还有更强大的用法，比如这样：

```js
[
    { name: "Robin Van PurseStrings", age: 30 },
    { name: "Theo Walcott", age: 24 },
    { name: "Bacary Sagna", age: 28  }
].sort(function(obj1, obj2) {
    // Ascending: first age less than the previous
    // 实现增序排列：前者的 age 小于后者
    return obj1.age - obj2.age;
});
// Returns:  
// [
//    { name: "Theo Walcott", age: 24 },
//    { name: "Bacary Sagna", age: 28  },
//    { name: "Robin Van PurseStrings", age: 30 }
// ]
```

你不仅可以对简单类型的数组项进行排序，可以通过属性来排序对象。如果哪天服务器端发来一段 JSON 数据，而且其中的对象需要排序，你可别忘了这一招！

### 用 length 属性来截断数组

几乎所有开发者都踩过 JavaScript 的这个坑——“传对象只是传引用”。开发者们经常会试图 [把一个数组清空](http://davidwalsh.name/empty-array)，但实际上却错误地创建了一个新数组。

```js
var myArray = yourArray = [1, 2, 3];

// :(
// 囧
myArray = []; // `yourArray` is still [1, 2, 3]
              // `yourArray` 仍然是 [1, 2, 3]

// The right way, keeping reference
// 正确的方法是保持引用
myArray.length = 0; // `yourArray` and `myArray` both []
                    // `yourArray` 和 `myArray`（以及其它所有对这个数组的引用）都变成 [] 了
```

坑里的人们终于明白，原来传对象只是在传引用。因此当我把 myArray 重新赋值为 [] 时，确实会创建出一个新的空数组，但其它对老数组的引用仍然没变！大坑啊！还是换用截断的方法吧，少年。

### 使用 push 来合并数组

在上面的第 2 节里，我展示了数组的 slice 和 apply 方法所能组合出的几个小妙招，所以对于数组方法的其它技巧，你应该已经做好心理准备了吧。这次我们使用 push 方法来合并数组：

```js
var mergeTo = [4,5,6];
var mergeFrom = [7,8,9];

Array.prototype.push.apply(mergeTo, mergeFrom);
mergeTo; // is: [4, 5, 6, 7, 8, 9]
```

这是一项不为人知的小技巧，简单的原生方法就可以实现数组合并这样的常见任务。

See also [Combining JS Arrays](http://davidwalsh.name/combining-js-arrays)

### Verify that a given argument is an array

```js
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```

Note that if the toString() method is overridden, you will not get the expected result using this trick.

Or use…

```js
Array.isArray(obj); // its a new Array method
```

You could also use `instanceof` if you are not working with multiple frames. However, if you have many contexts, you will get a wrong result.

```js
var myFrame = document.createElement('iframe');
document.body.appendChild(myFrame);

var myArray = window.frames[window.frames.length-1].Array;
var arr = new myArray(a,b,10); // [a,b,10]  

// instanceof will not work correctly, myArray loses his constructor 
// constructor is not shared between frames
arr instanceof Array; // false
```

### Get a random item from an array

```js
var items = [12, 548 , 'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' , 2145 , 119];
var  randomItem = items[Math.floor(Math.random() * items.length)];
```

### Generate an array of numbers with numbers from 0 to max

```js
var numbersArray = [] , max = 100;
for( var i=1; numbersArray.push(i++) < max;);  // numbers = [1,2,3 ... 100]
```

### Generate a random set of alphanumeric characters

```js
function generateRandomAlphaNum(len) {
    var rdmString = "";
    for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
    return  rdmString.substr(0, len);

}
```

### Shuffle an array of numbers

```js
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
numbers = numbers.sort(function(){ return Math.random() - 0.5});
/* the array numbers will be equal for example to [120, 5, 228, -215, 400, 458, -85411, 122205]  */
```

A better option could be to implement a random sort order by code (e.g. : Fisher-Yates shuffle), than using the native sort JavaScript function. For more details take a look to [this discussion](http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling/962890#962890).

### Get the max or the min in an array of numbers

```js
var  numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]; 
var maxInNumbers = Math.max.apply(Math, numbers); 
var minInNumbers = Math.min.apply(Math, numbers);
```

### Empty an array

```js
var myArray = [12 , 222 , 1000 ];  
myArray.length = 0; // myArray will be equal to [].
```

### Don’t use delete to remove an item from array

Use `splice` instead of using `delete` to delete an item from an array. Using `delete` replaces the item with `undefined` instead of the removing it from the array.

Instead of…

```js
var items = [12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 ]; 
items.length; // return 11 
delete items[3]; // return true 
items.length; // return 11 
/* items will be equal to [12, 548, "a", undefined × 1, 5478, "foo", 8852, undefined × 1, "Doe", 2154,       119]   */
```

Use…

```js
var items = [12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 ]; 
items.length; // return 11 
items.splice(3,1) ; 
items.length; // return 10 
/* items will be equal to [12, 548, "a", 5478, "foo", 8852, undefined × 1, "Doe", 2154,       119]   */
```

The delete method should be used to delete an object property.

### Truncate an array using length

Like the previous example of emptying an array, we truncate it using the `length` property.

```js
var myArray = [12 , 222 , 1000 , 124 , 98 , 10 ];  
myArray.length = 4; // myArray will be equal to [12 , 222 , 1000 , 124].
```

As a bonus, if you set the array length to a higher value, the length will be changed and new items will be added with `undefined` as a value. The array length is not a read only property.

```js
myArray.length = 10; // the new array length is 10 
myArray[myArray.length - 1] ; // undefined
```

## Function

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

## Event

### 事件对象的 preventDefault 和 stopPropagation 方法

很多时候，当一个动作元素（比如链接）被点击时，会触发某个功能。显然我们并不希望点击链接时浏览器顺着这个链接跳转，于是我们会习惯性地使用 JavaScript 类库的 Event.stop 方法：

    $("a.trigger").on("click", function(e) {
        e.stop();
    
        // Do more stuff
        // 在这里干点事情
    });

（译注：不知道哪个类库有这个方法，估计其作用相当于 return false; 吧。语法看起来像 jQuery，但 jQuery 并没有这个方法，而且 jQuery 是支持 e.preventDefault 和 e.stopPropagation 方法的。）

这个懒方法有一个问题，它不仅阻止了浏览器的默认动作，同时也阻止了事件继续冒泡。这意味着元素上绑定的其它事件监听器将不会被触发，因为它们根本就不知道有事件发生。此时不妨使用 preventDefault 吧！

JavaScript 老鸟们看到这篇文章可能会说“我早知道了”，但说不定什么时候，他们就会在某一点上栽跟头。提醒大家留意 JavaScript 中的各种小细节，失之毫厘谬以千里啊！

## URL

js对文字进行编码涉及3个函数：escape,encodeURI,encodeURIComponent，相应3个解码函数：unescape,decodeURI,decodeURIComponent

1. 传递参数时需要使用 encodeURIComponent，这样组合的 url 才不会被#等特殊字符截断。

    例如：

        document.write(‘<a href=”http://passport.baidu.com/?logout&aid=7&u=’+encodeURIComponent(“http://cang.baidu.com/bruce42″)+’”>退出</a>’);

2. 进行 url 跳转时可以整体使用 encodeURI

    例如：

        Location.href=encodeURI(“http://cang.baidu.com/do/s?word=百度&ct=21″);

3. escape 对0-255以外的unicode值进行编码时输出%u****格式，其它情况下 escape，encodeURI，encodeURIComponent 编码结果相同。
最多使用的应为 encodeURIComponent，它是将中文、韩文等特殊字符转换成utf-8格式的url编码，所以如果给后台传递参数需要使用encodeURIComponent时需要后台解码对utf-8支持（form中的编码方式和当前页面编码方式相同）

4. escape 不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z

    encodeURI 不编码字符有82个：!，#，$，&，’，(，)，*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z

    encodeURIComponent 不编码字符有71个：!， ‘，(，)，*，-，.，_，~，0-9，a-z，A-Z

[javascript对url进行encode的两种方式 - baibaluo - 博客园](http://www.cnblogs.com/baibaluo/archive/2011/03/03/2071250.html)

## Util

- [Learning much javascript from one line of code - arqex](http://arqex.com/939/learning-much-javascript-one-line-code)

### An HTML escaper function

```js
function escapeHTML(text) {  
    var replacements= {"<": "&lt;", ">": "&gt;","&": "&amp;", "\"": "&quot;"};                      
    return text.replace(/[<>&"]/g, function(character) {  
        return replacements[character];  
    }); 
}
```

### obj.length === +obj.length

```js
if (obj.length === +obj.length){
    
}
```

It's another way of writing if (typeof obj.length == 'number'). Why they do it that way, it's anyone's guess. Probably trying to be clever at the expense of readability. Which is not too uncommon these days, unfortunately.

Although it might be so that it can be compressed more by minifiers ([YUI Compressor](http://developer.yahoo.com/yui/compressor/), [Closure Compiler](http://closure-compiler.appspot.com/home), [UglifyJS](https://github.com/mishoo/UglifyJS), etc):

(a.length===+a.length)**vs**(typeof a.length=='number')Doing it their way would save 5 bytes, each instance.

This tests if obj's length property is a number.

The [unary + operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus_%28.2B%29) converts its operand to a number, and the [strict equality operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity_.2F_strict_equality_%28.3D.3D.3D%29) compares the result with the original length property without performing type coercion.

Therefore, the expression will only be true if obj.length is an actual number (not e.g. a string that can be converted to a number).

—— [underscore.js - obj.length === +obj.length in javascript - Stack Overflow](http://stackoverflow.com/questions/9188998/obj-length-obj-length-in-javascript)

### Deal with WebSocket timeout

Generally when a WebSocket connection is established, a server could time out your connection after 30 seconds of inactivity. The firewall could also time out the connection after a period of inactivity.

To deal with the timeout issue you could send an empty message to the server periodically. To do this, add these two functions to your code: one to keep alive the connection and the other one to cancel the keep alive. Using this trick, you’ll control the timeout.

Add a `timerID`…

```js
var timerID = 0; 
function keepAlive() { 
    var timeout = 15000;  
    if (webSocket.readyState == webSocket.OPEN) {  
        webSocket.send('');  
    }  
    timerId = setTimeout(keepAlive, timeout);  
}  
function cancelKeepAlive() {  
    if (timerId) {  
        cancelTimeout(timerId);  
    }  
}
```

The `keepAlive()` function should be added at the end of the `onOpen()` method of the webSocket connection and the `cancelKeepAlive()` at the end of the `onClose()` method.

### intelligence

Can you explain why ++[[]][+[]]+[+[]] = “10”?
<http://stackoverflow.com/questions/7202157/can-you-explain-why-10>

## Ref

- [7 JavaScript Basics Many Developers Aren't Using (Properly)](http://tech.pro/tutorial/1453/7-javascript-basics-many-developers-aren-t-using-properly)
- [[译] JavaScript 开发者经常忽略或误用的七个基础知识点 · Issue #21 · cssmagic/blog · GitHub](https://github.com/cssmagic/blog/issues/21) 
- [45 Useful JavaScript Tips, Tricks and Best Practices - Modern Web](http://modernweb.com/2013/12/23/45-useful-javascript-tips-tricks-and-best-practices)
- [JavaScript 秘密花园](https://bonsaiden.github.io/JavaScript-Garden/zh/)