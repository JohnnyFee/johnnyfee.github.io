layout: post
title: "变量对象（Variable object）"
category: JavaScript
tags: [javascript, kernel]
--- 
> 译文原文：[[JavaScript]ECMA-262-3 深入解析.第二章.变量对象 - Justin - 博客园](http://www.cnblogs.com/justinw/archive/2010/04/23/1718733.html)
> 
> 原文：[ECMA-262 » ECMA-262-3 in detail. Chapter 2. Variable object.](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/)
> 
> 另一个版本的翻译：[goddyzhao • 变量对象（Variable object）](http://zh.blog.goddyzhao.me/post/11141710441/variable-object)

<!--more-->

## 介绍

我们在创建应用程序的时候，总免不了要声明变量和函数。那么，当我们需要使用这些东西的时候，解释器(interpreter)是怎么样、从哪里找到我们的数据(函数，变量)的，这个过程究竟发生了什么呢？

大部分ECMAScript程序员应该都知道变量与 [执行上下文](http://www.cnblogs.com/justinw/archive/2010/04/16/1713086.html) 密切相关：

    var a = 10; // variable of the global context
     
    (function () {
      var b = 20; // local variable of the function context
    })();
     
    alert(a); // 10
    alert(b); // "b" is not defined
    

同样，很多程序员也知道，基于当前版本的规范，独立作用域只能通过“函数(function)”代码类型的执行上下文创建。那么，想对于C/C++举例来说，ECMAScript里， _for_ 循环并不能创建一个局部的上下文。(译者注：就是局部作用域)：

    for (var k in {a: 1, b: 2}) {
      alert(k);
    }
     
    alert(k); // variable "k" still in scope even the loop is finished
    

下面我们具体来看一看，当我们声明数据时候的内部细节。

## 数据声明

如果变量与执行上下文相关，那么它自己应该知道它的数据存储在哪里和如何访问。这种机制被称作 _变量对象(variable object)_.

_变量对象 (缩写为VO)_就是与执行上下文相关的对象(译者注：这个“对象”的意思就是指某个东西)，它存储下列内容： 

* 变量 (var, VariableDeclaration);
* 函数声明 (FunctionDeclaration, 缩写为FD);
* 以及函数的形参

以上均在上下文中声明。

简单举例如下，一个变量对象完全有可能用正常的ECMAScript对象的形式来表现：

    VO = {};
    

正如我们之前所说, VO就是执行上下文的属性(property)：

    activeExecutionContext = {
      VO: {
        // context data (var, FD, function arguments)
      }
    };
    

只有_全局上下文_的变量对象允许通过VO的属性名称间接访问(因为在全局上下文里，全局对象自身就是变量对象，稍后会详细介绍)。在其它上下文中是不可能直接访问到VO的，因为变量对象完全是实现机制内部的事情。

当我们声明一个变量或一个函数的时候，同时还用变量的名称和值，在VO里创建了一个新的属性。

例如：

    var a = 10;
    
    function test(x) {
      var b = 20;
    };
    
    test(30);
    

对应的变量对象是：

    // Variable object of the global context
    VO(globalContext) = {
      a: 10,
      test: 
    };
    
    // Variable object of the "test" function context
    VO(test functionContext) = {
      x: 30,
      b: 20
    };
    

在具体实现层面(和在规范中)变量对象只是一个抽象的事物。(译者注：这句话翻译的总感觉不太顺溜，欢迎您提供更好的译文。)从本质上说，在不同的具体执行上下文中，VO的名称和初始结构都不同。

## 不同执行上下文中的变量对象]

对于所有类型的执行上下文来说，变量对象的一些操作(如变量初始化)和行为都是共通的。从这个角度来看，把变量对象作为抽象的基本事物来理解更容易。而在函数上下文里同样可以通过变量对象定义一些相关的额外细节。

![](http://johnnyimages.qiniudn.com/w640.png)


下面，我们详细展开探讨；

### 全局上下文中的变量对象]

这里有必要先给_全局对象(Global object)_一个明确的定义：

_全局对象(Global object)_ 是在进入任何执行上下文之前就已经创建的对象；这个对象只存在一份，它的属性在程序中任何地方都可以访问，全局对象的生命周期终止于程序退出那一刻。

初始创建阶段，全局对象通过Math,String,Date,parseInt等属性初始化，同样也可以附加其它对象作为属性，其中包括可以引用全局对象自身的对象。例如，在DOM中，全局对象的window属性就是引用全局对象自身的属性(当然，并不是所有的具体实现都是这样)：

    global = {
      Math: <...>,
      String: <...>
      ...
      ...
      window: global
    };
    
    

因为全局对象是不能通过名称直接访问的，所以当访问全局对象的属性时，通常忽略前缀。尽管如此，通过[全局上下文的this](http://dmitrysoshnikov.com/ecmascript/chapter-3-this/#this-value-in-the-global-code)还是有可能直接访问到全局对象的，同样也可以通过引用自身的属性来访问，例如，DOM中的_window_。综上所述，代码可以简写为:

    String(10); // means global.String(10);
    
    // with prefixes
    window.a = 10; // === global.window.a = 10 === global.a = 10;
    this.b = 20; // global.b = 20;
    

因此，全局上下文中的变量对象就是_全局对象自身(global object itself)_:

    VO(globalContext) === global;
    

准确理解“全局上下文中的变量对象就是_全局对象自身_”是非常必要的，基于这个事实，在全局上下文中声明一个变量时，我们才能够通过全局对象的属性间接访问到这个变量(例如，当事先未知变量名时)：

    var a = new String('test');
    
    alert(a); // directly, is found in VO(globalContext): "test"
    
    alert(window['a']); // indirectly via global === VO(globalContext): "test"
    alert(a === this.a); // true
    
    var aKey = 'a';
    alert(window[aKey]); // indirectly, with dynamic property name: "test"
     
    

### 函数上下文中的变量对象]

在函数执行上下文中，VO是不能直接访问的，此时由_激活对象(activation object,缩写为AO)_扮演VO的角色。

    VO(functionContext) === AO;
    

_激活对象_ 是在进入函数上下文时刻被创建的，它通过函数的_arguments_属性初始化。grguments属性的值是_Arguments object_：

    AO = {
      arguments: <ArgO>
    };
    

_Arguments objects_ 是函数上下文里的激活对象中的内部对象，它包括下列属性：

* _callee_ — 指向当前函数的引用；
* _length_ — _真正传递_的参数的个数；
* _properties-indexes_ (字符串类型的整数) 属性的值就是函数的参数值(按参数列表从左到右排列)。 properties-indexes内部元素的个数等于_arguments.length_. properties-indexes 的值和实际传递进来的参数之间是_共享的_。(译者注：共享与不共享的区别可以对比理解为引用传递与值传递的区别)

例如：

    function foo(x, y, z) {
    
      alert(arguments.length); // 2 – quantity of passed arguments
      alert(arguments.callee === foo); // true
    
      alert(x === arguments[0]); // true
      alert(x); // 10
    
      arguments[0] = 20;
      alert(x); // 20
    
      x = 30;
      alert(arguments[0]); // 30
    
      // however, for not passed argument z,
      // related index-property of the arguments
      // object is not shared
    
      z = 40;
      alert(arguments[2]); // undefined
    
      arguments[2] = 50;
      alert(z); // 40
    
    }
    
    foo(10, 20);
     
    

最后一个例子的场景，在当前版本的Google Chrome浏览器里有一个bug — 即使没有传递参数z，`z`和`arguments[2]`仍然是共享的。(译者注：我试验了一下，在Chrome Ver4.1.249.1059版本，该bug仍然存在。)

## 分阶段处理上下文代码

现在我们终于触及到本文的核心内容。执行上下文的代码被分成两个基本的阶段来处理：

* 进入执行上下文；
* 执行代码；

变量对象的变化与这两个阶段紧密相关。

### 进入执行上下文

当进入执行上下文(代码执行之前)时，VO已被下列属性填充满(这些都已经在前文描述过)：

* 函数的所有_形式参数_(如果我们是在函数执行上下文中)
* — 变量对象的一个属性，这个属性由一个形式参数的名称和值组成；如果没有对应传递实际参数，那么这个属性就由形式参数的名称和undefined值组成；
* 所有_函数声明_(FunctionDeclaration, FD)
* —变量对象的一个属性，这个属性由一个函数对象(function-object)的名称和值组成；如果变量对象已经存在相同名称的属性，则完全替换这个属性。
* 所有_变量声明_(var, VariableDeclaration)
* —变量对象的一个属性，这个属性由变量名称和undefined值组成；如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

让我们看一个例子：

    function test(a, b) {
      var c = 10;
      function d() {}
      var e = function _e() {};
      (function x() {});
    }
    
    test(10); // call
     
    

当_进入_“test”函数的上下文时(传递参数10)，AO如下：

    AO(test) = {
      a: 10,
      b: undefined,
      c: undefined,
      d: <reference to FunctionDeclaration "d">
      e: undefined
    };
    

注意，AO里并不包含函数_“x”_。这是因为_“x”_ 是一个_函数表达式(FunctionExpression, 缩写为 FE)_ 而不是函数声明，函数表达式_不会影响_VO(译者注：这里的VO指的就是AO)。 不管怎样，函数_“_e”_ 同样也是函数表达式，但是就像我们下面将看到的那样，因为它分配给了变量 “e”，所以它变成可以通过名称“e”来访问。 _FunctionDeclaration_ 与 _FunctionExpression_ 的不同，将在 [Chapter 5. Functions](http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/)进行详细的探讨。

这之后，将进入处理上下文代码的第二个阶段 — 执行代码。

### 执行代码

这一刻，AO/VO 已经被属性(不过，并不是所有的属性都有值，大部分属性的值还是系统默认的初始值_undefined_ )填满。

还是前面那个例子, AO/VO 在代码解释期间被修改如下：

    AO['c'] = 10;
    AO['e'] = <reference to FunctionExpression "_e">;
    

再次注意，因为_FunctionExpression_`_e`保存到了已声明的变量“e”上，所以它仍然存在于内存中(译者注：就是还在AO/VO中的意思)。而_FunctionExpression_。未保存的函数表达式只有在它自己的定义或递归中才能被调用。 “x” 并不存在于AO/VO中。即，如果我们想尝试调用“x”函数，不管在函数定义之前还是之后，都会出现一个错误“_x is not defined_”

另一个经典例子：

    alert(x); // function
    
    var x = 10;
    alert(x); // 10
    
    x = 20;
    
    function x() {};
    
    alert(x); // 20
     
    

为什么第一个alert “x” 的返回值是function，而且它还是在“x” 声明之前访问的“x” 的？为什么不是10或20呢？因为，根据规范 — 当进入上下文时，往VO里填入函数声明；在相同的阶段，还有一个变量声明“x”，那么正如我们在上一个阶段所说，变量声明在顺序上跟在函数声明和形式参数声明之后，而且，在这个阶段(译者注：这个阶段是指进入执行上下文阶段)，变量声明不会干扰VO中已经存在的同名函数声明或形式参数声明，因此，在进入上下文时，VO的结构如下：

    VO = {};
     
    VO['x'] = <reference to FunctionDeclaration "x">
     
    // found var x = 10;
    // if function "x" would not be already defined
    // then "x" be undefined, but in our case
    // variable declaration does not disturb
    // the value of the function with the same name
     
    VO['x'] = <the value is not disturbed, still function>
    

随后在执行代码阶段，VO做如下修改：

    VO['x'] = 10;
    VO['x'] = 20;
     
    

我们可以在第二、三个alert看到这个效果。

在下面的例子里我们可以再次看到，变量是在进入上下文阶段放入VO中的。(因为，虽然else部分代码永远不会执行，但是不管怎样，变量“b”仍然存在于VO中。)(译者注：变量b虽然存在于VO中，但是变量b的值永远是undefined)

    if (true) {
      var a = 1;
    } else {
      var b = 2;
    }
    
    alert(a); // 1
    alert(b); // undefined, but not "b is not defined"
     
    

## 关于变量

通常，各类文章和JavaScript相关的书籍都声称：“不管是使用var关键字(在全局上下文)还是不使用var关键字(在任何地方)，都可以声明一个变量”。请记住，这绝对是谣传：

任何时候，变量只能通过使用var关键字才能声明。

那么像下面这样分配：

     a = 10; 
    

这仅是给全局对象创建了一个新属性(但是它不是变量)。“不是变量”的意思并不是说它不能被改变，而是指它不符合ECMAScript规范中的变量概念，所以它“不是变量”(它之所以能成为全局对象的属性，完全是因为VO(globalContext) === global，大家还记得这个吧？)。

让我们通过下面的实例看看具体的区别吧：

    alert(a); // undefined
    alert(b); // "b" is not defined
    
    b = 10;
    var a = 20;
     
    

所有根源仍然是VO和它的修改阶段(_进入上下文_ 阶段和_执行代码_ 阶段)：

进入上下文阶段：

    VO = {
      a: undefined
    };
     
    

我们可以看到，因为“b”不是一个变量，所以在这个阶段根本就没有“b”，“b”将只在执行代码阶段才会出现(但是在我们这个例子里，还没有到那就已经出错了)。

让我们改变一下例子代码：

    alert(a); // undefined, we know why
    
    b = 10;
    alert(b); // 10, created at code execution
    
    var a = 20;
    alert(a); // 20, modified at code execution
     
    

关于变量，还有一个重要的知识点。变量相对于简单属性来说，变量有一个特性(attribute)：_{DontDelete}_,这个特性的含义就是不同通过_delete_操作符直接删除变量属性。

    a = 10;
    alert(window.a); // 10
    
    alert(delete a); // true
    
    alert(window.a); // undefined
    
    var b = 20;
    alert(window.b); // 20
    
    alert(delete b); // false
    
    alert(window.b); // still 20
     
    

但是，在_eval_上下文，这个规则并不起作用，因为在这个上下文里，变量没有{DontDelete}特性。

    eval('var a = 10;');
    alert(window.a); // 10
    
    alert(delete a); // true
    
    alert(window.a); // undefined
    

使用一些调试工具(例如：Firebug)的控制台测试该实例时，请注意，Firebug同样是使用eval来执行控制台里你的代码。因此，变量属性同样没有_{DontDelete}_特性，可以被删除。

## 特殊实现: __parent__ 属性

前面已经提到过，按标准规范，激活对象是不可能被直接访问到的。但是，一些具体实现并没有完全遵守这个规定，例如SpiderMonkey和Rhino；在这些具体实现中，函数有一个特殊的属性 ___parent___，通过这个属性可以直接引用到函数已经创建的激活对象或全局变量对象。

例如 (SpiderMonkey, Rhino)：

    var global = this;
    var a = 10;
    
    function foo() {}
    
    alert(foo.__parent__); // global
    
    var VO = foo.__parent__;
    
    alert(VO.a); // 10
    alert(VO === global); // true
     
    

在上面的例子中我们可以看到，函数_foo_是在全局上下文中创建的，所以属性___parent___ 指向全局上下文的变量对象，即全局对象。(译者注：还记得这个吧：VO(globalContext) === global)

然而，在SpiderMonkey中用同样的方式访问激活对象是不可能的：在不同版本的SpiderMonkey中，内部函数的___parent___ 有时指向_null_ ，有时指向全局对象。

在Rhino中，用同样的方式访问激活对象是完全可以的。

例如 (Rhino)：

    var global = this;
    var x = 10;
    
    (function foo() {
    
      var y = 20;
    
      // the activation object of the "foo" context
      var AO = (function () {}).__parent__;
    
      print(AO.y); // 20
    
      // __parent__ of the current activation
      // object is already the global object,
      // i.e. the special chain of variable objects is formed,
      // so-called, a scope chain
      print(AO.__parent__ === global); // true
    
      print(AO.__parent__.x); // 10
    
    })();
     
    

## 结论

在这篇文章里，我们进一步深入学习了跟执行上下文相关的对象。我希望这些知识对您来说能有所帮助，能解决一些您曾经遇到的问题或困惑。按照计划，在后续的章节中，我们将探讨_Scope chain_, _Identifier resolution_ ,_Closures_。

## 其他参考

* 10.1.3 – [Variable Instantiation](http://bclary.com/2004/11/07/#a-10.1.3 "Variable Instantiation");
* 10.1.5 – [Global Object](http://bclary.com/2004/11/07/#a-10.1.5 "Global Object");
* 10.1.6 – [Activation Object](http://bclary.com/2004/11/07/#a-10.1.6 "Activation Object");
* 10.1.8 – [Arguments Object](http://bclary.com/2004/11/07/#a-10.1.8 "Arguments Object").





