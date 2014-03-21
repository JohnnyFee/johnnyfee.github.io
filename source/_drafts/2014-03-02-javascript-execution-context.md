---
layout: post
title: "执行上下文（Execution Context）"
category: JavaScript
tags: [javascript, kernel]
---
### 
> 译文原文：[[JavaScript]ECMA-262-3 深入解析.第一章.执行上下文 - Justin - 博客园](http://www.cnblogs.com/justinw/archive/2010/04/16/1713086.html)
> 
> 原文：[ECMA-262 » ECMA-262-3 in detail. Chapter 1. Execution Contexts.](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)
> 
> 另一个版本的翻译：[goddyzhao • 执行上下文（Execution Context）](http://zh.blog.goddyzhao.me/post/10020230352/execution-context)

<!--more-->

## 介绍

这篇文章我们主要探讨ECMAScript执行上下文和相关的ECMAScript可执行代码。

## 定义

每次当控制器转到ECMAScript可执行代码的时候，即会进入到一个_执行上下文_。

执行上下文(简称-EC)是一个抽象概念，ECMA-262标准用这个概念同可执行代码(executable code)概念进行区分。

标准规范没有从技术实现的角度准确定义EC的类型和结构;这应该是具体实现ECMAScript引擎时要考虑的问题。

活动的执行上下文在逻辑上组成一个堆栈。堆栈底部永远都是全局上下文(_global context_)，堆栈顶部是当前(活动的)执行上下文。堆栈在EC类型的变量(various kingds of EC)被推入或弹出的同时被修改。

## 可执行代码

可执行代码的概念与抽象的执行上下文的概念是相对的。在某些时刻，可执行代码与执行上下文是等价的。

例如，我们可以定义一个数组来模拟执行上下文堆栈：

    ECStack = [];
    

每次进入函数 (即使函数被递归调用或作为构造函数) 的时候或者内置的_eval_函数工作的时候，这个堆栈都会被推入。

### 全局代码

这种类型的代码是在"程序"级处理的：例如加载外部的js文件或者本地的在<script></script>标签内的代码。全局代码不包括任何函数体内的代码。

在初始化（程序启动）阶段，ECStack是这样的：

    ECStack = [
      globalContext
    ];

### 函数代码

当进入函数代码(所有类型的函数)，ECStack被推入新元素。要注意的是，具体的函数代码不包括内部函数(inner functions)代码。如下所示，我们使函数自己调自己的方式递归一次：

    (function  foo(bar) {
      if (bar) {
        return;
      }
      foo(true);
    })();

那么，ECStack以如下方式被改变：

    // first activation of foo
    ECStack = [
      <foo> functionContext
      globalContext
    ];
     
    // recursive activation of foo
    ECStack = [
      <foo> functionContext – recursively
      <foo> functionContext
      globalContext
    ];

每次返回存在的当前执行上下文和ECStack弹出相应的执行上下文的时候，栈指针会自动移动位置，这是一个典型的堆栈实现方式。一个被抛出但是没有被截获的异常，同样存在一个或多个执行上下文。当相关段代码执行完以后，直到整个应用程序结束，ECStack都只包括全局上下文(_global context_)。

### Eval 代码

_eval_ 代码有点儿意思。它有一个概念： _调用上下文(calling context)_, 这是一个当_eval_函数被调用的时候产生的上下文。_eval_(变量或函数声明)活动会影响_调用上下文(calling context)_。

    eval('var x = 10');
     
    (function foo() {
      eval('var y = 20');
    })();
     
    alert(x); // 10
    alert(y); // "y" is not defined

ECStack的变化过程：

    ECStack = [
      globalContext
    ];
     
    // eval('var x = 10');
    ECStack.push(
      evalContext,
      callingContext: globalContext
    );
     
    // eval exited context
    ECStack.pop();
     
    // foo funciton call
    ECStack.push(<foo> functionContext);
     
    // eval('var y = 20');
    ECStack.push(
      evalContext,
      callingContext: <foo> functionContext
    );
     
    // return from eval
    ECStack.pop();
     
    // return from foo
    ECStack.pop();
    

看到了吧，这是一个非常普通的逻辑调用堆栈

在版本号1.7以上的SpiderMonkey(内置于Firefox,Thunderbird)的实现中，可以把调用上下文作为第二个参数传递给eval。那么，如果这个上下文存在，就有可能影响“私有”(类似以private关键字命名的变量一样)变量。

    function foo() {
      var x = 1;
      return function () { alert(x); };
    };
     
    var bar = foo();
     
    bar(); // 1
     
    eval('x = 2', bar); // pass context, influence on internal var "x"
     
    bar(); // 2
    

## 结论

这篇文章的内容是未来分析其他跟执行上下文相关的主题(例如变量对象，作用域链，等等)的最起码的理论基础，这些主题将在后续章节中讲到。

## 其他参考

这篇文章的内容在ECMA-262-3 标准规范中对应的章节— [10. Execution Contexts](http://bclary.com/2004/11/07/#a-10).



