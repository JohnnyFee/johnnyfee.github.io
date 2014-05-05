---
layout: post
title: "JavaScript 的变量与 delete 操作符"
description: ""
category: JavaScript
tags: [javascript, operator]
--- 

## 理论

delete操作符通常用来删除对象的属性：

	var o = { x: 1 };
	delete o.x; // true
	o.x; // undefined

而不是一般的变量：

	var x = 1;
	delete x; // false
	x; // 1

或者是函数：

	function x(){}
	delete x; // false
	typeof x; // "function"

注意delete只有在无法删除的情况下才会返回false。为了理解这一点，我们必须解释一下变量初始化以及变量属性的一些基本概念--不幸的是很少有Javascript的书能讲到这些。如果你只想知其然而不是知其所以然的话，你完全可以跳过这一节。

### 代码的类型

在ECMAScript中，有三种可执行代码类型：全局代码、函数代码、eval代码。

1. 当一段代码被当做程序段运行的时候，它是在全局作用域下执行的，也就是全局代码。在浏览器环境下，通常`<SCRIPT>`元素就是一段全局代码。
2. 所有在function中声明的代码即是函数代码，最常见的是HTML元素的响应事件(`<p onclick="...">`)。
3. 传入内建的eval函数中的代码段称为eval代码，稍后我们会看到这种类型的特别性。

### 执行上下文(Execution Context)

在ECMAScript代码执行的时候，总是会有一个执行的上下文。这是一个比较抽象的概念，但可以帮助我们理解作用域以及变量初始化的相关过程。对于以上三种代码段类型，都有一个相应的执行上下文，比如函数代码有函数上下文，全局代码有全局上下文，等等。
 
逻辑上执行上下文相互间可以形成堆栈，在全局代码执行的最开始会有一个全局上下文，当调用一个函数的时候会进入相应函数的上下文，之后又可以再继续调用其他的函数亦或是递归调用自己，这时执行上下文的嵌套类似于函数调用栈。

### Activation object / Variable object

每个执行上下文都和一个Variable object（变量对象）相关联 ，这也是一个抽象的概念，便于我们理解变量实例化机制：在源代码中声明的变量和方法实际上都是作为属性被加入到与当前上下文相关联的这个对象当中 。
 
当执行全局代码的时候，Variable object就是一个全局对象，也就是说所有全局变量和函数都是作为这个变量的属性存在。

	/* 全局环境下，this所指向的就是这个全局对象 */  
	var GLOBAL_OBJECT = this;  
	  
	var foo = 1;  
	GLOBAL_OBJECT.foo; // 1  
	foo === GLOBAL_OBJECT.foo; // true  
	  
	function bar(){}  
	typeof GLOBAL_OBJECT.bar; // "function"  
	GLOBAL_OBJECT.bar === bar; // true

那么对于在函数中声明的变量呢？情况是类似的，函数中声明的变量也是被当做相应上下文对象的属性，唯一的区别是在函数代码段中，这个对象被称为Activation object（活动对象）。每次进入一个函数调用都会新建一个新的活动对象。
 
在函数段中，并不是只有显式声明的变量和函数会成为活动对象的属性，对于每个函数中隐式存在的arguments对象（函数的参数列表）也是一样的。注意活动对象其实是一种内部机制，程序代码是无法访问到的。

	(function(foo){  
	  
	  var bar = 2;  
	  function baz(){}  
	  
	  /* 
	  可以把活动对象作为一个抽象的存在，在每进入一个函数的时候，默认的arguments对象以及传入的参数都会自动被设为活动对象的属性:  
	    ACTIVATION_OBJECT.arguments; // arguments变量 
	 
	  传入参数foo: 
	    ACTIVATION_OBJECT.foo; // 1 
	 
	    函数内声明的变量bar: 
	    ACTIVATION_OBJECT.bar; // 2 
	 
	    以及函数内定义的baz函数: 
	    typeof ACTIVATION_OBJECT.baz; // "function" 
	  */  
	  
	})(1);

最后，在evel代码段中定义的变量都是被加入到当前执行eval的上下文环境对象中，也就是说进入eval代码时并不会新建新的变量对象，而是沿用当前的环境。

	var GLOBAL_OBJECT = this;  
	  
	/* foo被加入到当前变量对象中，也就是全局对象。 */  
	  
	eval('var foo = 1;');  
	GLOBAL_OBJECT.foo; // 1  
	  
	(function(){  
	  
	  /* bar被加入到当前这个函数的活动对象中。 */  
	  
	  eval('var bar = 1;');  
	  
	  /*  
	    可以抽象地表示为:  
	    ACTIVATION_OBJECT.bar; // 1 
	  */  
	  
	})();

### 变量属性的标记

我们已经知道声明变量时发生了什么（他们都变成了当前上下文对象的属性），接下来我们就要看一下属性究竟是怎么样一回事。每一个变量属性都可以有以下任意多个属性: ReadOnly, DontEnum, DontDelete, Internal。你可以把这些当做标记，标明了变量属性可以持有的某种特性。这里我们最感兴趣的就是DontDelete标记。
 
在声明变量或者函数时，他们都变成了当前上下文对象的属性--对于函数代码来说是活动对象，对于全局代码来说则是变量对象，而值得注意的是这些属性在创建时都带有DontDelete标记，但是显式或者隐式的赋值语句所产生的属性并不会带有这个标记！这就是为什么有一些属性我们可以删除，但另一些却不可以：

	var GLOBAL_OBJECT = this;  
	  
	/*  foo是被正常声明的，所以带有DontDelete标记，从而不能被删除！ */  
	  
	var foo = 1;  
	delete foo; // false  
	typeof foo; // "number"  
	  
	/* bar是作为函数被声明，一样带有DontDelete，不能被删除。 */  
	  
	function bar(){}  
	delete bar; // false  
	typeof bar; // "function"  
	  
	/*  baz是直接通过一个赋值而没有声明，不会持有DontDelete标记，才可以被删除！ */  
	  
	GLOBAL_OBJECT.baz = 'blah';  
	delete GLOBAL_OBJECT.baz; // true  
	typeof GLOBAL_OBJECT.baz; // "undefined"

### 内建对象与DontDelete

DontDelete就是一个特殊的标记，用来表明某一个属性能否被删除。需要注意的是一些内建的对象是自动持有这个标记的，从而不能被删除，比如函数内的arguments，以及函数的length属性。

	(function(){  
	  
	  /*arguments对象默认持有DontDelete标记，不能被删除。 */  
	  
	  delete arguments; // false  
	  typeof arguments; // "object"  
	  
	  /* 函数的length属性也一样 */  
	  
	  function f(){}  
	  delete f.length; // false  
	  typeof f.length; // "number"  
	  
	})();

函数的传入参数也是一样的:

	(function(foo, bar){  
	  
	  delete foo; // false  
	  foo; // 1  
	  
	  delete bar; // false  
	  bar; // 'blah'  
	  
	})(1, 'blah'); 

prototype中声明的属性无法被delete：

    function C() { this.x = 42; }
    C.prototype.x = 12;
    
    var o = new C();
    o.x;     // 42, 构造函数中定义的o.x
    
    delete o.x;
    o.x;     // 12,  prototype中定义的o.x，即使再次执行delete o.x也不会被删除
    

对象的预定义属性也无法删除。 可以认为这类属性带有DontDelete的特性。

    var re = /abc/i;
    delete re.ignoreCase;
    re.ignoreCase; // true, ignoreCase无法删除

### 非声明性赋值

你可能知道，非声明性的赋值语句会产生全局变量，进而变成全局变量对象的属性。所以根据上面的解释，非声明性的赋值所产生的对象是可以被删除的：

	var GLOBAL_OBJECT = this;  
	  
	/* 通过声明的全局变量会持有DontDelete，无法被删除。 */  
	var foo = 1;  
	  
	/* 没有经过声明的变量赋值不会带DontDelete，可以被删除。 */  
	bar = 2;  
	  
	delete foo; // false  
	typeof foo; // "number"  
	  
	delete bar; // true  
	typeof bar; // "undefined"

需要注意的是属性标记诸如DontDelete是在这个属性被创建的时候 产生的，之后对该属性的任何赋值都不会改变此属性的标记！

	/* foo被声明时会带有DontDelete标记 */  
	function foo(){}  
	  
	/* 之后对foo的赋值无法改变他所带的标记！ */  
	foo = 1;  
	delete foo; // false  
	typeof foo; // "number"  
	  
	/* 当给一个还不存在的属性赋值的时候会创建一个不带任何标记的属性（包括DontDelete），进而可以被删除！ */  
	  
	this.bar = 1;  
	delete bar; // true  
	typeof bar; // "undefined"

## Firebug的困扰

现在再让我们回到最开始的问题，为什么在Firebug控制台里声明的变量可以被删除呢？这就要牵涉到eval代码段的特殊行为，也就是在eval中声明的变量创建时都不会带有DontDelete标记！

	eval('var foo = 1;');  
	foo; // 1  
	delete foo; // true  
	typeof foo; // "undefined"  
	 在函数内部也是一样的:
	Js代码      收藏代码
	(function(){  
	  
	  eval('var foo = 1;');  
	  foo; // 1  
	  delete foo; // true  
	  typeof foo; // "undefined"  
	  
	})();  

这就是导致Firebug"诡异"行为的罪魁祸首: 在Firebug控制台中的代码最终将通过eval执行，而不是作为全局代码或函数代码。显然地，这样声明出来的变量都不会带DontDelete标记，所以才能被删除！(译者:也不能太信任Firebug啊。)

## delete与宿主对象(host objects)

delete的大致算法如下:

1. 如果操作对象不是一个引用，返回true
2. 如果当前上下文对象没有此名字的一个直接属性，返回true（上下文对象可以是全局对象或者函数内的活动对象）
3. 如果存在这样一个属性但是有DontDelete标记，返回false
4. 其他情况则删除该属性并返回true
 
然而有一个例外，即对于宿主对象而言，delete操作的结果是不可预料的。这并不奇怪，因为宿主对象根据不同浏览器的实现允许有不同的行为，这其中包括了delete。所以当处理宿主对象时，其结果是不可信的，比如在FF下:

	/* "alert" 是window对象的一个属性 */  
	window.hasOwnProperty('alert'); // true  
	  
	delete window.alert; // true  
	typeof window.alert; // "function"，表明实际上并没有真正删除  

总而言之，任何时候都不要相信宿主对象。

## ES5 strict mode

为了能更早地发现一些应该被发现的问题，ECMAScript 5th edition 提出了strict mode的概念。下面是一个例子:

	(function(foo){  
	  
	  "use strict"; // enable strict mode within this function  
	  
	  var bar;  
	  function baz(){}  
	  
	  delete foo; // SyntaxError (when deleting argument)  
	  delete bar; // SyntaxError (when deleting variable)  
	  delete baz; // SyntaxError (when deleting variable created with function declaration)  
	  
	  /* `length` of function instances has { [[Configurable]] : false } */  
	  
	  delete (function(){}).length; // TypeError  
	  
	})();  

删除不存在的变量:

	"use strict";  
	delete i_dont_exist; // SyntaxError  

对未声明的变量赋值:

	"use strict";  
	i_dont_exist = 1; // ReferenceError  

可以看出，strict mode采用了更主动并且描述性的方法，而不是简单的忽略无效的删除操作。

## IE bugs

是的，你没有看错，整个这一节都是在讲IE的bug! 在IE6-8中，下面的代码会抛出错误（全局代码）:

	this.x = 1;  
	delete x; // TypeError: Object doesn't support this action  
  
	var x = 1;  
	delete this.x; // TypeError: Cannot delete 'this.x'  

看起来似乎在IE里变量声明并不会在全局变量对象里产生相应的属性。还有更有趣的，对于显式赋值的属性总是会在删除时出错，并不是真正抛出错误，而是这些属性似乎都带有DontDelete标记，和我们的设想相反。

	this.x = 1;  
	  
	delete this.x; // TypeError: Object doesn't support this action  
	typeof x; // "number" (没有被删除！)  
	  
	delete x; // TypeError: Object doesn't support this action  
	typeof x; // "number" (还是没有被删除！)  
 
但下面的代码表明，非声明性的赋值产生的属性确实是可以删除的:

	x = 1;  
	delete x; // true  
	typeof x; // "undefined"  

不过当你试图通过全局变量对象this来访问x的时候，错误又来了:

	x = 1;  
	delete this.x; // TypeError: Cannot delete 'this.x'  

总而言之，通过全局this变量去删除属性(delete this.x)总会出错，而直接删除该属性(delete x)时：如果x是通过全局this赋值产生会(this.x=1)导致错误；如果x通过显式声明创建(var x=1)则delete会像我们预料的那样无法删除并返回false；如果x通过非声明式赋值创建(x=1)则delete可以正常删除。

对于以上的问题，[Garrett Smith](http://dhtmlkitchen.com/) 的一个解释是"IE的全局变量对象是通过JScript实现，而一般的全局变量是由host实现的。"(ref: [Eric Lippert’s blog entry](http://blogs.msdn.com/ericlippert/archive/2005/05/04/414684.aspx))

我们可以自己验证一下这个解释，注意this和window看上去是指向同一个对象，但是函数所返回的当前环境的变量对象却和this不同。

	/* in Global code */  
	function getBase(){ return this; }  
	  
	getBase() === this.getBase(); // false  
	this.getBase() === this.getBase(); // true  
	window.getBase() === this.getBase(); // true  
	window.getBase() === getBase(); // false  

## delete操作符删除的对象

C++中也有delete操作符，它删除的是指针所指向的对象。例如：

    // C++
    class Object {
    public:
      Object *x;
    }
    
    Object o;
    o.x = new Object();
    delete o.x;     // 上一行new的Object对象将被释放
    

但Javascript的delete与C++不同，**它不会删除o.x指向的对象，而是删除o.x属性本身**。

    // Javascript
    var o = {};
    o.x = new Object();
    delete o.x;     // 上一行new的Object对象依然存在
    o.x;            // undefined，o的名为x的属性被删除了
    

在实际的Javascript中，delete o.x之后，Object对象会由于失去了引用而被垃圾回收， 所以delete o.x也就“相当于”删除了o.x所指向的对象，但这个动作并不是ECMAScript标准， 也就是说，即使某个实现完全不删除Object对象，也不算是违反ECMAScript标准。

“删除属性而不是删除对象”这一点，可以通过以下的代码来确认。

    var o = {};
    var a = { x: 10 };
    o.a = a;
    delete o.a;    // o.a属性被删除
    o.a;           // undefined
    a.x;           // 10, 因为{ x: 10 } 对象依然被 a 引用，所以不会被回收
    

另外，delete o.x 也可以写作 delete o["x"]，两者效果相同。

## delete的返回值

delete是普通运算符，会返回true或false。规则为：当被delete的对象的属性存在并且拥有DontDelete时   
返回false，否则返回true。 这里的一个特点就是，对象属性不存在时也返回true，所以返回值并非完全等同于删除成功与否。

    function C() { this.x = 42; }
    C.prototype.y = 12;
    var o = new C();
    
    delete o.x; // true
    o.x;        // undefined
    "x" in o;   // false
    // o.x存在并且没有DontDelete，返回true
    
    delete o.y; // true
    o.y;        // 12
    // o自身没有o.y属性，所以返回true
    // 从这里也可以看到prototype链的存在，对象自身属性和prototype属性是不同的
    
    delete o;   // false
    // Global.o拥有DontDelete特性所以返回false
    
    delete undefinedProperty;  // true
    // Global没有名为undefinedProperty的属性因此返回true
    
    delete 42;  // true
    // 42不是属性所以返回true。有的实现会抛出异常（违反ECMAScript标准）
    
    var x = 24;
    delete x++;  // true
    x;           // 25
    // 被删除的是x++的返回值(24)，不是属性，所以返回true

## 总结

- 变量和函数的声明实际上都会成为全局对象或者当前函数活动对象的属性。
- 属性都有一个DontDelete标记，用于表明该属性是否能被delete。
- 变量和函数的声明创建的属性都会带有DontDelete标记。
- 函数内建的arguments对象作为该函数活动对象的默认属性，创建时总会带有DontDelete标记。
- 在eval代码块中声明的变量和方法都不带有DontDelete标记。
- 对还不存在的变量或属性的直接赋值产生的对象不会带有任何标记，包括DontDelete。
- 对于宿主对象而言，delete操作的结果有可能是不可预料的。

如果你希望对以上这些有更进一步的了解，请参考ECMA规范:[ECMA-262 3rd edition specification](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf)

## Reference

- [深入详解javascript之delete操作符](http://m.oschina.net/blog/28926)
	- [Understanding delete — Perfection Kills](http://perfectionkills.com/understanding-delete/)
- [delete - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)
- http://blog.charlee.li/javascript-variables-and-delete-operator/
