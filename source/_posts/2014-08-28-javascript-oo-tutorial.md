layout: post
title: "JavaScript OO Tutorial"
category: JavaScript
tags: [javascript, oo]
---

## 私有化

### 属性方法私有化

实现私有成员的方法是将这些私有成员作为构造函数的局部变量。如：

```js
function Gadget(){
    // 私有属性
    var name = "iPod";

    // 公共方法
    this.getName = function(){
        return name;
    }
}
```

用来暴露私有成员的方法称为 __特权方法__，如 `getName`。

<!--more-->

### 字面量私有化

如果你想在对象字面量中封装私有属性，需要借助一个即时函数，如：

```js
var myobj = (function(){
    // 私有属性
    var name = "hello";

    return {
        // 公共方法
        getName: function(){
            return name;
        }
    }
}());
```

### 原型和私有化

如何实现实例共享（即 prototype 级别的属性和方法）的私有属性和方法呢？原理为封装 protopty，如：

```js
Gadget.prototype = (function(){
   var browser =  "Mobile Webkit";

   return {
        getBrowser : function(){
            return browser;
        }
   }
}());
```

### 私有静态成员

使用一个立即执行函数包装私有静态属性，并返回新的构造函数。该程序的功能可以实现对象的计数器。

```js
var Gadget = (function(){
    // 静态属性和方法
    var counter = 0,
        NewGadget;

    // 新的构造函数
    NewGadget = function(){
        counter += 1;
    };

    // 特权方法
    NewGadget.prototype.getLastId = function() {
        return counter;
    };

    return NewGadget;
}());
```

## 常量

一个常见的解决办法就是使用命名规范，让常量名称全部大写。如在 `Math` 内置对象中：

    Math.PI;
    Math.SQRT2;
    Number.MAX_VALUE;

自定义常量：

    // constructor
    var Widget = function () {
        // implementation...
    };
    // constants
    Widget.MAX_HEIGHT = 320;
    Widget.MAX_WIDTH = 480;    

如果你真的想要一个不可变的值，可以实现一个包含以下接口的对象：

- `set(name, value)` 定义一个常量
- `isDefined(name)` 检查常量是否存在
- `get(name)` 获取一个常量的值

```js
var constant = (function () {
    var constants = {},
        ownProp = Object.prototype.hasOwnProperty,
        allowed = {
            string: 1,
            number: 1,
            boolean: 1
        },
        prefix = (Math.random() + "_").slice(2);
    return {
        set: function (name, value) {
            if (this.isDefined(name)) {
                return false;
            }
            if (!ownProp.call(allowed, typeof value)) {
                return false;
            }
            constants[prefix + name] = value;
            return true;
        },
        isDefined: function (name) {
            return ownProp.call(constants, prefix + name);
        },
        get: function (name) {
            if (this.isDefined(name)) {
                return constants[prefix + name];
            }
            return null;
        }
    };
}());
```

使用方法：

```js
// check if defined
constant.isDefined("maxwidth"); // false
// define
constant.set("maxwidth", 480); // true
// check again
constant.isDefined("maxwidth"); // true
// attempt to redefine
constant.set("maxwidth", 320); // false
// is the value still intact?
constant.get("maxwidth"); // 480
```

## 命名空间模式

命名空间会帮助减少程序需要的全局变量的数量，同时也帮助我们防止命名冲突或者过多的命名前缀(加前缀为了防止命名冲突)。

命名空间的用法如：

```js
// 一个全局变量
var MYAPP = {}

// 构造函数
MYAPP.Parent = function(){}

// 对象容器
MYAPP.modules = {}

// 嵌套对象
MYAPP.moduels.module1 = {};
MTAPP.moduels.module1.data = {a:1, b:2}
```

### 通用的命名空间函数

```js
var MYAPP = MYAPP || {};
MYAPP.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = MYAPP,
        i;
    // strip redundant leading global
    if (parts[0] === "MYAPP") {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};
```

### 缺点

1. 需要更多的字符，每个变量和函数都要添加一个前缀，会增加需要下载的代码量。
2. 只有一个全局变量意味着任何地方的代码都可以修改这个全局变量，其它地方都会受到影响。
3. 很长的嵌套名称会降低属性查找速度。
4. 没有办法使同一个应用程序的两个版本运行在同一个页面中，因为它们需要同一个全局符号名。

## 模块模式

模块模式是命名空间、即时函数、私有和特权成员、声明依赖的组合，提供了一种自包含非耦合代码片段的工具，可以将它视为黑盒功能。

### 对象模块

创建一个对象模块的方式：

```js
MYAPP.utils.array = (function(){
    // 声明依赖
    var uobj = MYAPP.utils.object,
        ulang = MYAPP.utils.lang,
        
        // 私有属性和方法
        var name = "Hello World";

    // 可选的一次性初始化过程
    // ...
    
    // 共有 API
    return {
        inArray: function(){
            //...
        },

        isArray: function function_name (argument) {
            // body...
        }
    }
         
}());
```

__声明依赖的好处：__

1. 明确的依赖声明可以向你的代码的使用者表明这些特殊的脚本文件需要被确保包含进页面
2. 在函数头部的声明解，让发现和处理依赖关系更加简单
3. 使用局部变量(比如:dom)通常比使用全局变量(比如:YAHOO)快，比访问全局对象的属性(比如:YAHOO.util.Do)更快，可以得到更好的性能，全局符号只会在函数中出现一次，然后就可以使用局部变量，后者速度更快。
4. 高级压缩工具比如YUICompressor 和 Google Closure compiler会重命名局部变量，产生更小的体积的代码，但从来不会重命名全局变量，因为那样是不安全的

当然，你也可以公共方法的实现定义在即时函数中，然后使用类似下面的形式返回公共方法：

```
// ...
var inArray = function(){
    
};

var isArray = functiion(argument){
    
};

return {
    inArray : inArray,
    isArray : isArray    
};
// ...
```

以这种方式返回的方法成为就称为揭示方法，这种模式称为揭示模式。

### 构造函数的模块

创建构造函数的模块：

```js
MYAPP.utils.Array = (function(){
    // 声明依赖
    var uobj = MYAPP.utils.object,
        ulang = MYAPP.utils.lang,
        
        // 私有属性和方法
        var name = "Hello World",
        var Constr;

    // 可选的一次性初始化过程
    // ...
    
    // 共有API —— 构造函数
    Constr = function(o){
        // 公有属性
        this.element = this.toArray(o);

        // 共有方法
        this.hello = function(){

        };
    }

    // 共有方法 —— 原型
    Constr.prototype = {
        constructor : MYAPP.utils.Array,
        version: "2.0",
        toArray : function(){

        }
    };

    // 返回构造函数
    return Constr;
}());
```

## 沙箱模式

沙箱模式可以解决命名空间模式的缺点。沙箱模式给模块提供一个可用于模块运行的环境而不影响其它模块和它们私有沙箱。YUI 3 中大量使用了该模式。

在命名空间模式中，你有一个全局对象；在沙盒模式中，这个单一的全局对象是一个构造方法，我们称之为 Sandbox()。

### 使用方法

使用使用沙箱模式的方法如下：

```js
// 1. 创建对象
new Sandbox(function (box) {
    // your code here...
});

// 2. 使用强制 new 模式，使得我们可以省略 new 来创建一个对象。
Sandbox(function (box) {
    // console.log(box);
});

// 3. 使用 ajax 和 event 模块来创建对象
Sandbox('ajax', 'dom', function (box) {
    // console.log(box);
});

Sandbox(['ajax', 'event'], function (box) {
    // console.log(box);
});

// 4. 用通配符 * 或者省略表示"所有可用的模块"
Sandbox('*', function (box) {
    // console.log(box);
});
Sandbox(function (box) {
    // console.log(box);
});

// 5. 在一个沙箱中嵌套在另一个沙箱
Sandbox('dom', 'event', function (box) {
    // work with dom and event
    Sandbox('ajax', function (box) {
       // another sandboxed "box" object
       // this "box" is not the same as
       // the "box" outside this function
       //...
       // done with Ajax
    });
    // no trace of Ajax module here
});
```

当使用沙盒模式时，通过将你的代码包裹进回调函数从而保护全局的命名空间。

### 添加模块

在这个例子中，我们像 Sandbox 添加了 dom，event 和 ajax 模块。

```
Sandbox.modules = {};
Sandbox.modules.dom = function (box) {
    box.getElement = function () {};
    box.getStyle = function () {};
    box.foo = "bar";
};
Sandbox.modules.event = function (box) {
    // access to the Sandbox prototype if needed:
    // box.constructor.prototype.m = "mmm";
    box.attachEvent = function () {};
    box.dettachEvent = function () {};
};
Sandbox.modules.ajax = function (box) {
    box.makeRequest = function () {};
    box.getResponse = function () {};
};
```

### Sandbox 构造函数的实现

```js
function Sandbox() {
    // turning arguments into an array
    var args = Array.prototype.slice.call(arguments),
        // the last argument is the callback
        callback = args.pop(),
        // modules can be passed as an array or as individual parameters
        modules = (args[0] && typeof args[0] === "string") ? args : args[0],
        i;
    
    // make sure the function is called
    // as a constructor
    if (!(this instanceof Sandbox)) {
        return new Sandbox(modules, callback);
    }
    
    // add properties to `this` as needed:
    this.a = 1;
    this.b = 2;
   
    // now add modules to the core `this` object
    // no modules or "*" both mean "use all modules"
    if (!modules || modules === '*') {
        modules = [];
        for (i in Sandbox.modules) {
            if (Sandbox.modules.hasOwnProperty(i)) {
                modules.push(i);
            }
        }
    }
    
    // initialize the required modules
    for (i = 0; i < modules.length; i += 1) {
        Sandbox.modules[modules[i]](this);
    }
    // call the callback
    callback(this);
}

// any prototype properties as needed
Sandbox.prototype = {
    name: "My Application",
    version: "1.0",
    getName: function() {
        return this.name;
    }
};
```

## 链式模式

链式模式可以让你调用一个对象的方法一个接着一个，不需要将前一个操作的返回值赋值给变量并且也不需要将你的调用分成多行。这种方法在 jQuery 中得到广泛应用，并且在 DOM 操作中你也可以见到链式模式的应用：

    document.getElementsByTagName('head')[0].appendChild(newnode);

实现方法为当方法的返回值没有意义时，让他们返回 `this`，如：

```js
var obj = {
    value: 1,
    add: function (v) {
        this.value += v;
        return this;
    },
    shout: function () {
        alert(this.value);
    }
};
```

使用方法：

    // chain method calls
    obj.add(3).shout(); // 5

可以将该模式应用到构造函数中，如：

```js
var Person = function (name) {
    this.name = name;
}

Person.prototype.getName = function(){
    return this;
}

Person.prototype.setName = function(name){
    this.name = name;
    return this;
}
```

可以使用 Douglas 引入的 `method()` 方法隐藏 prototype 的访问。向内置对象添加便利的功能称为语法糖，像 `method()` 这样的方法称为 _糖方法_。

使用 `method()` 后，Person 的定义为：

    var Person = function (name) {
        this.name = name;
    }.method('getName', function () {
        return this.name;
    }).method('setName', function (name) {
        this.name = name;
        return this;
    });

`method()` 方法的实现为：

```js
if (typeof Function.prototype.method !== "function") {
    Function.prototype.method = function (name, implementation) {
        this.prototype[name] = implementation;
        return this;
    };
}
```

__缺点:__

会让代码很难调试，你可以知道一个错误发生在具体哪一行，但是没办法直观定义到具体哪个方法。

## Tutorial

- [拥抱原型面向对象编程 - WEB开发者](http://www.admin10000.com/document/1242.html)
- [JavaScript中的原型和继承 - WEB开发者](http://www.admin10000.com/document/4343.html)
- [Prototypes Are Not Classes](http://raganwald.com/2014/01/19/prototypes-are-not-classes.html)
- [Private properties in JavaScript](https://curiosity-driven.org/private-properties-in-javascript)
- [Objects and classes by example - Mixu's Node book](http://book.mixu.net/node/ch6.html)
- [TremayneChrist/ProtectJS](https://github.com/TremayneChrist/ProtectJS)
- [A JavaScript Constructor Problem, and Three Solutions](http://raganwald.com/2014/07/09/javascript-constructor-problem.html)
- [Simple Currying in javascript - The Thinking Alien](http://blog.zakhour.me/post/javascript/simple-currying-in-javascript)