layout: post
title: "JavaScript 继承"
category: JavaScript
tags: [javascript, oo]
---

> 这篇文章是根据 《JavaScript 模式》中关于继承的章节整理完成。整理之后脉络比较清晰，便于比较各种继承方式。

JavaScript 的继承的实现方式大体分为传统继承（或者称为类式继承、经典继承）和现代方式。区别为传统方式视图通过 _类_ 的方式来实现，而现代模式则撇开类的概念。

如果你有了 `inherit` 方法，可以如下使用：

```js
// the parent constructor
function Parent(name) {
    this.name = name || 'Adam';
}

// adding functionality to the prototype
Parent.prototype.say = function () {
    return this.name;
};
// empty child constructor
function Child(name) {}
// inheritance magic happens here

inherit(Child, Parent);
```

接下来，我们要做的是尝试各种方式来实现 `inherit` 方法，以追求最佳实践。

<!-- more -->

## 类式继承模式#1  —— 默认模式

最常用的一种默认方法是使用 `Parent()` 构造函数创建一个对象，并且将这个对象赋值给 Child() 构造函数的原型。

```js
function inherit(C, P) {
    C.prototype = new P();
}
```

__缺点：__

1. 同时继承了两个对象的属性，即添加给 父类 this 的属性和原型属性。而对于构造函数的一般经验法则是：应该将可复用的成员添加到原型中，即只添加原型属性。
1. 不能给 Child 构造函数传递参数，进而将参数传递给 Parent 构造函数。如：

        var s = new Child('Seth');
        s.say(); // "Adam"

    这个不是你所期望的。如果一定要实现这样的功能，则需要在构造函数中调用 `inherit` 函数，这是非常低效的做法。

## 类式继承模式#2 —— 借用构造函数

实现方式为在子类构造函数中调用父类的构造函数，让父类的非原型的公共属性拷贝到子类中：

```js
function Child(a, c, b, d) {
    Parent.apply(this, arguments);
}
```

使用借用构造函数模式，子对象将获得继承成员的拷贝，不像经典模式一获得的仅仅是引用。

```js
// 父类构造函数
function Article() {
    this.tags = ['js', 'css'];
}

var article = new Article();

// 继承 article 对象
// via the classical pattern #1
function BlogPost() {}
BlogPost.prototype = article;

var blog = new BlogPost();

// 通过借用构造函数继承 article
function StaticPage() {
    Article.call(this);
}
var page = new StaticPage();

// 测试
alert(article.hasOwnProperty('tags')); // true
alert(blog.hasOwnProperty('tags')); // false
alert(page.hasOwnProperty('tags')); // true
```

使用借用构造函数模式，可以实现多继承，如：

```js
function Cat() {  
    this.legs = 4;  
    this.say = function () {  
        return "meaowww";  
    }  
}  
function Bird() {  
    this.wings = 2;  
    this.fly = true;  
}  
function CatWings() {  
    Cat.apply(this);  
    Bird.apply(this);  
}  
var jane = new CatWings();  
console.dir(jane);
```

__优点：__

1. 解决了从子(child)构造函数向父(parent)构造函数传递参数的问题。
2. 子类得到的是父类成员的真实副本，不会意外覆盖父类的属性值。
2. 可以实现多继承。

__缺点：__

1. 原型上的属性都不会被继承。


## 类式继承模式#3 —— 借用并设置原型

为了解决借用构造函数的继承模式不能继承原型属性的缺点，可以借用构造函数的基础上设置原型。

```js
// the parent constructor
function Parent(name) {
    this.name = name || 'Adam';
}
// adding functionality to the prototype
Parent.prototype.say = function () {
    return this.name;
};
// child constructor
function Child(name) {
    Parent.apply(this, arguments);
}
Child.prototype = new Parent();
```

使用方法：

```js
var kid = new Child("Patrick");
kid.name; // "Patrick"
kid.say(); // "Patrick"
delete kid.name;
kid.say(); // "Adam"
```

__优点：__

1. 继承了父类中的一切东西，同时能够安全的修改自身的属性，不会意外修改父类的属性。
2. 借用构造函数继承方式的其他优点。

__缺点：__

1. 父类构造函数被调用两次，造成一定的性能开销。
2. 自身属性被继承两次，即普通成员中一份拷贝，原型中一次拷贝。

## 类式继承模式#4 —— 共享原型

经验法则：复用的成员应该添加到原型(prototype)而不是 this 中。以上的集成模式都有这个缺点，为了解决这个缺点，可以子类对象的原型这是为父类对象的原型，即子类共享父类的原型。

```js
function inherit(C, P) {
    C.prototype = P.prototype;
}
```

__优点：__

1. 因为子类和父类共享同一个原型，子类原型链的查找简短且迅速。

__缺点：__

1. 由于原型共享，如果某个子类修改了原型，则所有祖先类和其他子类对象的原型都会被改变。

## 类式继承模式#5 —— 临时构造函数

这种方法也被称为代理函数或代理构造函数的继承方式，这是因为临时构造函数实际上是一个用于获得父类的原型的代理。

```js
function inherit(C, P) {
    var F = function () {};
    F.prototype = P.prototype;
    C.prototype = new F();
}
```

在代码中，有一个空的函数F()，该函数充当了之类和父类之间的代理。F()的prototype属性指向父类的 prototype，子类的原型是这个空白函数的实现。

__优点：__

1. 解决了共享原型修改子类原型造成所有对象的原型都被改变的缺点。

__缺点：__

子类对象的构造函数的指针仍然指向父类。

可以通过下面的方法重置构造函数的指针：

```js
function inherit(C, P) {
    var F = function () {};
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
}
```

这种方法在 YUI 开源库中也是使用类似的方法来实现继承。

在此基础上，可以添加一个引用指向原始父类的引用，这个引用的名称为 uber：

```js
function inherit(C, P) {
    var F = function () {};
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
}
```

这种方式还有一个缺点：每次在需要继承时多需要创建一个临时构造函数，我们可以使用一个即时函数并且在闭包中存储代理函数的方式来解决这个问题：

```js
var inherit = (function () {
    var F = function () {};
    return function (C, P) {
        F.prototype = P.prototype;
        C.prototype = new F();
        C.uber = P.prototype;
        C.prototype.constructor = C;
}
}());
```

至此，这便是类式继承的__圣杯解决方案__。

不用闭包而使用 `Object.create` 方案如下：

    var inherits = function (C, P) {
        C.prototype = Object.create(P.prototype);
        C.prototype.constructor = C;
    };

See [Simple inheritance with JavaScript](http://blogs.msdn.com/b/eternalcoding/archive/2014/08/20/simple-inheritance-with-javascript.aspx)

## 类式继承语法糖 —— Klass

许多JavaScript类库模仿类，引进了一些语法糖。这些类库的实现通常有以下共同特点：

1. 类的构造方法有一个命名规范，比如 `initialize`，`_init`，`constructor`， `__construct`等，在创建对象时这些方法将会被自动调用。
2. 从其它类继承。
3. 在子类中可以访问到父类。

假设我们已经实现了这样的类库（`klass`），那么我们可以这样使用：

```js
// 父类
var Man = klass(null, {
    __construct: function (what) {
        console.log("Man's constructor");
       this.name = what;
    },
    getName: function () {
        return this.name;
    }
});

// 子类
var SuperMan = klass(Man, {
        __construct: function (what) {
            console.log("SuperMan's constructor");
        },
        getName: function () {
            // 通过 uber 调用父类方法。
            var name = SuperMan.uber.getName.call(this);
            return "I am " + name;
        }
});
```

测试：

```js
// 测试父类
var first = new Man('Adam'); // logs "Man's constructor"
first.getName(); // "Adam"

// 测试子类
var clark = new SuperMan('Clark Kent');
clark.getName(); // "I am Clark Kent"

// 测试 instanceof
clark instanceof Man; // true
clark instanceof SuperMan; // true
```

kclass 的实现如下：

```js
var klass = function(Parent, props) {
    var Child, F, i;
    
    // 1. 新构造函数
    Child = function() {
        if (Child.uber && Child.uber.hasOwnProperty("__construct")) {
            Child.uber.__construct.apply(this, arguments);
        }
        if (Child.prototype.hasOwnProperty("__construct")) {
            Child.prototype.__construct.apply(this, arguments);
        }
    };
   
    // 2. 继承
    Parent = Parent || Object;
    F = function() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.uber = Parent.prototype;
    Child.prototype.constructor = Child;
   
    // 3. 添加实现方法
    for (i in props) {
        if (props.hasOwnProperty(i)) {
            Child.prototype[i] = props[i];
        }
    }
    
    // return the "class"
    return Child;
};
```

klass 的实现有三个令人关注的特点：

1. 创建了 Child 构造函数，并最终被返回。在该函数中，先调用父类的 ` __construct` 方法，在调用父类的 ` __construct` 方法。
2. 第二部分是类式继承的圣杯版本，只是多了一个新的语句，`Parent = Parent || Object;`。
3. 遍历实现方法并添加到 Child 的原型链中。

## 现代继承模式#1 —— 原型继承

实现思路：你有一个想复用的对象，并且你想创建的第二个对象需要从第一个对象获取其功能。

使用场景如下：

```js
// 要继承的对象
var parent = {
    name: "Papa"
};

// 新对象
var child = object(parent);
```

```js
alert(child.name); // "Papa"
```

`object` 的定义如下：

```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
```

如果 Parent 不是通过字面量的方式创建，而是通过构造函数创建的，那么子对象只继承父构造函数的原型对象。如：

```
// 父构造函数
function Person() {
    // an "own" property
    this.name = "Adam";
}

// 添加到原型链的属性
Person.prototype.getName = function() {
    return this.name;
};

// 继承
var kid = object(Person.prototype);
```

```js
// 测试
typeof kid.getName; // "function", because it was in the prototype
typeof kid.name; // "undefined", because only the prototype was inherited
```

在 ECMAScript 5 中，可以使用 `Object.create` 方法代替 `object()` 的实现。如：

```js
// 无额外扩展方法
var child = Object.create(parent);

// 有扩展方法
var child = Object.create(parent, {
    age: {
        value: 2
    } 
});
child.hasOwnProperty("age"); // true
```

在 YUI 3 中实现了了原型链继承的方法 `Y.Object()`。

## 现代继承模式#2—— 复制属性

通过复制属性继承不涉及任何原型，只是将一个对象的自身属性拷贝到另外一个对象。拷贝有浅拷贝和深拷贝两种实现。

以下是浅拷贝的实现：

```js
function extend(parent, child) {
    var i;
    child = child || {};
    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            child[i] = parent[i];
        }
    }
    return child;
}
```

在这个实现中，child是可选的；如果你不传递一个已经存在的对象去扩展，那么一个新对象被创建并被返回。

测试：

```js
var dad = {name: "Adam"};
var kid = extend(dad);
kid.name; // "Adam"
```

使用浅拷贝时，如果改变了子类对象中类型为复杂类型（如对象
数组、方法）时，这会改变父对象中的相应成员。这种改变适合于方法，但不适合与属性。

为了克服这个缺点，我们使用以下方法实现深度拷贝：

```js
function extendDeep(parent, child) {
    var i, toStr = Object.prototype.toString,
    astr = "[object Array]";
    child = child || {};
    
    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            // 复杂对象类型
            if (typeof parent[i] === "object") {
                // 初始化复杂类型的对象
                child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
                extendDeep(parent[i], child[i]);
            } else {
                child[i] = parent[i];
            }
        }
    }
    return child;
}
```

FireBug 中的 `extend()` 方法使用的是浅复制的方式，YUI 3 中提供的 `Y.clone()` 可以创建深度复制的副本。

### 混入

混入是基于属性复制的进一步扩展，思想是将多个对象组合成一个新对象。实现方法如下：

```js
function mix() {
    var arg, prop, child = {};
    for (arg = 0; arg < arguments.length; arg += 1) {
        for (prop in arguments[arg]) {
            if (arguments[arg].hasOwnProperty(prop)) {
                child[prop] = arguments[arg][prop];
            }
        }
    }
    return child;
}
```

注意，该实现使用的是浅拷贝的方式。

使用示例：

```js
var cake = mix({
    eggs: 2,
    large: true
},{
    butter: 1,
    salted: true
},{
    flour: "3 cups"
},{
    sugar: "sure!"
});
```


## 现代继承模式#3—— 借用方法

有时候你可能只需要现有对象的一两个方法，而不关心其他方法，这是我们便可以使用借用方法模式来实现。

借用方法模式是借助 `call()` 和 `apply()` 方法来改变函数的作用域的原理来实现的。如：

```
// call() example
notmyobj.doStuff.call(myobj, param1, p2, p3);

// apply() example
notmyobj.doStuff.apply(myobj, [param1, p2, p3]);
```

以下例子为从数组中借用一个 slice 方法：

```js
function f() {
    var args = [].slice.call(arguments, 1, 3);
    return args;
}
// example
f(1, 2, 3, 4, 5, 6); // returns [2,3]
```

这种方式输入起来有点长，但是你节省了创建空数组的工作。

借用方法中只是临时改变函数的作用域，如果你需要在某些场合（如回调）永久改变函数的作用域，可以使用 `bind` 方法。

```
// assigning to a variable
// `this` will point to the global object
var say = one.say;
say('hoho'); // "hoho, undefined"

// passing as a callback
var yetanother = {
    name: "Yet another object",
    method: function(callback) {
        return callback('Hola');
    }
};

yetanother.method(one.say); // "Holla, undefined"
```

掉用 `yetanother.method(one.say);` 输出 `"Holla, undefined"`。

我们可以使用像下面的简单函数：

```js
function bind(o, m) {
    return function() {
        return m.apply(o, [].slice.call(arguments));
    };
}
```

我们为此付出了一个额外的闭包。

ECMAScript 5 已经将 `bind()` 方法添加到了  Function.prototype，使得 `bind()` 方法和 `call()`、`apply()` 方法一样简单易用。如：

```js
var twosay2 = one.say.bind(two);
twosay2('Bonjour'); // "Bonjour, another object"
```

在 ES5 之前我们使用以下方法实现 Function.prototype.bind 方法：

```js
if (typeof Function.prototype.bind === "undefined") {
    Function.prototype.bind = function(thisArg) {
        var fn = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments, 1);
        return function() {
            return fn.apply(thisArg, args.concat(slice.call(arguments)));
        };
    };
}
```


## 结论

1. 尽量 __避免__使用类式继承，因为 JavaScript 语句中严格来说不存在类的概念。
2. 推荐使用现代继承方式，如借用方法、绑定、复制属性、混入等。因为代码重用才是最终目的，而继承只是实现这一目标的方法之一。
2. 关于继承已经被各种 JavaScript 类库以这样或那样的方式实现了，在开发过程中，我们可能不会直接面对继承的实现。