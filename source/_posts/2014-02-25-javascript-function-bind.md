---
layout: post
title: "理解JavaScript中的Function.prototype.bind"
description: ""
category: JavaScript
tags: [javascript]
--- 
>本文由 [伯乐在线](http://blog.jobbole.com/) - [陈 鑫伟](http://blog.jobbole.com/author/owenchen/) 翻译自 [Smashing Magazine](http://coding.smashingmagazine.com/2014/01/23/understanding-javascript-function-prototype-bind/)。
> 原文链接：<http://blog.jobbole.com/58032/>

<!--more-->

函数绑定(Function binding)很有可能是你在开始使用JavaScript时最少关注的一点，但是当你意识到你需要一个解决方案来解决如何在另一个函数中保持this上下文的时候，你真正需要的其实就是 Function.prototype.bind()，只是你有可能仍然没有意识到这点。

第一次遇到这个问题的时候，你可能倾向于将this设置到一个变量上，这样你可以在改变了上下文之后继续引用到它。很多人选择使用 `self`, `this` 或者 `context` 作为变量名称(也有人使用 that)。这些方式都是有用的，当然也没有什么问题。但是其实有更好、更专用的方式。

> [Jack Archibald 关于缓存 this 的微博](https://twitter.com/jaffathecake/status/304163675810439168)(twitter)：

> Jake Archibald: “我会为了作用域做任何事情，但是我不会使用 that = this”

> 我对这个问题更清晰的认识是在我看到[Sindre Sorhus更清楚的描述](https://twitter.com/sindresorhus/status/304917599484010496)之后：

> Sindre Sorhus：“在jQuery中使用$this，但是对于纯JS我不会，我会使用.bind()”

而我在一开始的几个月里却忽略了这个明智的建议。

## 我们真正需要解决的问题是什么？

在下面的例子代码中，我们可以名正言顺地将上下文缓存到一个变量中：

    var myObj = {
        specialFunction: function () {
        },

        anotherSpecialFunction: function () {
        },

        getAsyncData: function (cb) {
            cb();
        },
     
        render: function () {
            var that = this;
            this.getAsyncData(function () {
                that.specialFunction();
                that.anotherSpecialFunction();
            });
        }
    };
     
    myObj.render();

myObj.render();如果我们简单地使用 this.specialFunction() 来调用方法的话，会收到下面的错误：

> Uncaught TypeError:Object[object global] has no method'specialFunction'
 
我们需要为回调函数的执行保持对 myObj 对象上下文的引用。 调用 that.specialFunction()让我们能够维持作用域上下文并且正确执行我们的函数。 然而使用 Function.prototype.bind() 可以有更加简洁干净的方式：

    render:function() {
        this.getAsyncData(function() {
        this.specialFunction();
        this.anotherSpecialFunction();
        }.bind(this));
    }

## 我们刚才做了什么？

.bind()创建了一个函数，当这个函数在被调用的时候，它的 this 关键词会被设置成被传入的值（这里指调用bind()时传入的参数）。因此，我们传入想要的上下文，this(其实就是 myObj)，到.bind()函数中。然后，当回调函数被执行的时候， this 便指向 myObj 对象。

如果有兴趣想知道 Function.prototype.bind() 内部长什么样以及是如何工作的，这里有个非常简单的例子：


    Function.prototype.bind =function(scope) {
        varfn =this;
        returnfunction() {
            returnfn.apply(scope);
        };
    }

还有一个非常简单的用例：

    var foo = {
        x: 3
    }

    var bar = function(){
        console.log(this.x);
    }
     
    bar(); // undefined
    var boundFunc = bar.bind(foo);
    boundFunc(); // 3

我们创建了一个新的函数，当它被执行的时候，它的 this 会被设置成 foo —— 而不是像我们调用 bar() 时的全局作用域。

## [浏览器](http://blog.jobbole.com/12749/ "现代浏览器的工作原理") 支持

Browser| Version support
-------|----------------
Chrome | 7
Firefox|  (Gecko) 4.0 (2)
Internet Explorer|   9
Opera |   11.60
Safari | 5.1.4

正如你看到的，很不幸，Function.prototype.bind 在IE8及以下的版本中不被支持，所以如果你没有一个备用方案的话，可能在运行时会出现问题。

幸运的是，Mozilla Developer Network（很棒的资源库），为没有自身实现 .bind() 方法的浏览器[提供了一个绝对可靠的替代方案](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)：

    if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
          // closest thing possible to the ECMAScript 5 internal IsCallable function
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
     
        var aArgs = Array.prototype.slice.call(arguments, 1), 
            fToBind = this, 
            fNOP = function () {},
            fBound = function () {
              return fToBind.apply(this instanceof fNOP &amp;&amp; oThis
                                     ? this
                                     : oThis,
                                   aArgs.concat(Array.prototype.slice.call(arguments)));
            };
     
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
     
        return fBound;
      };
    }

## 适用的模式

在学习技术点的时候，我发现有用的不仅仅在于彻底学习和理解概念，更在于看看在手头的工作中有没有适用它的地方，或者比较接近它的的东西。我希望，下面的某些例子能够适用于你的代码或者解决你正在面对的问题。

#### CLICK HANDLERS（点击处理函数）

一个用途是记录点击事件（或者在点击之后执行一个操作），这可能需要我们在一个对象中存入一些信息，比如：

    var logger = {
        x: 0,       
        updateCount: function(){
            this.x++;
            console.log(this.x);
        }
    }

我们可能会以下面的方式来指定点击处理函数，随后调用 logger 对象中的 updateCount() 方法。

    document.querySelector('button').addEventListener('click', function(){
        logger.updateCount();
    });

但是我们必须要创建一个多余的匿名函数，来确保 updateCount()函数中的 this 关键字有正确的值。

我们可以使用如下更干净的方式：


    document.querySelector('button').addEventListener('click', 
        logger.updateCount.bind(logger));

我们巧妙地使用了方便的 .bind() 函数来创建一个新的函数，而将它的作用域绑定为 logger 对象。

#### SETTIMEOUT

如果你使用过模板引擎（比如Handlebars）或者尤其使用过某些`MV*`框架（从我的经验我只能谈论Backbone.js），那么你也许知道下面讨论的关于在渲染模板之后立即访问新的DOM节点时会遇到的问题。

假设我们想要实例化一个jQuery插件：

    var myView = {
        template: '/* 一个包含 <select /> 的模板字符串*/',
        $el: $('#content'),
        afterRender: function () {
            this.$el.find('select').myPlugin();
        },
        render: function () {
            this.$el.html(this.template());
            this.afterRender();
        }
    }
     
    myView.render();

myView.render();你或许发现它能正常工作——但并不是每次都行，因为里面存在着问题。这是一个竞争的问题：只有先到达的才能获胜。有时候是渲染先到，而有时候是插件的实例化先到。【译者注：如果渲染过程还没有完成（DOM Node还没有被添加到DOM树上），那么find(‘select’)将无法找到相应的节点来执行实例化。】

现在，或许并不被很多人知晓，我们可以使用基于 setTimeout() 的 [slight hack](http://benhowdle.im/2013/01/29/settimeout/)来解决问题。

我们稍微改写一下我们的代码，就在DOM节点加载后再安全的实例化我们的jQuery插件：
    
    afterRender: function () {
        this.$el.find('select').myPlugin();
    },
     
    render: function () {
        this.$el.html(this.template());
        setTimeout(this.afterRender, 0);        
    }

然而，我们获得的是 函数 .afterRender() 不能找到 的错误信息。

我们接下来要做的，就是将.bind()使用到我们的代码中：

    afterRender: function () {
        this.$el.find('select').myPlugin();
    },
    
    render: function () {
        this.$el.html(this.template());
        setTimeout(this.afterRender.bind(this), 0);        
    }

现在，我们的 afterRender() 函数就能够在正确的上下文环境中执行了。

#### 梳理基于 QUERYSELECTORALL的事件绑定

如今的DOM API引入了很多非常有用的方法，比如 querySelector, querySelectorAll 和 classList接口，这些方法给DOM API带来了非常显著的进步。

然而，迄今为止并没有一个真正的原生的为 NodeList 添加事件的方法。于是我们最终从 Array.prototype中剽窃了 forEach 方法来完成遍历，例如：

    Array.prototype.forEach.call(document.querySelectorAll('.klasses'), function(el){
        el.addEventListener('click', someFunction);
    });

仍然，我们可以做的更好，通过使用我们的好朋友 .bind()。

    var unboundForEach = Array.prototype.forEach,
        forEach = Function.prototype.call.bind(unboundForEach);
     
    forEach(document.querySelectorAll('.klasses'), function (el) {
        el.addEventListener('click', someFunction);
    });

现在，我们拥有了一个简洁的遍历DOM节点的函数。

#### 结论

正如你所看到的，.bind() 函数可以巧妙地运用于很多不同的用途，同时可以精简现有的代码。但愿这篇概述的内容，能够在你想在代码中使用.bind()（如果需要的话）时派上用场，并且帮助你更好地驾驭改变this值所带来的好处。