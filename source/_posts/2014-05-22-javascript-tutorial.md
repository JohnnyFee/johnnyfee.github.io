---
layout: post
title: "JavaScript Tutorial"
description: ""
category: JavaScript
tags: [javascript]
---

## Tutorial

- [JavascriptOO](http://www.javascriptoo.com/)
- [JS: The Right Way](http://jstherightway.org/)
- [JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/)
- [getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)
- [A guide to 2ality’s posts on the JavaScript language](http://www.2ality.com/2012/08/guide-jslang.html)
- [重新介绍 JavaScript（JS教程） | MDN](https://developer.mozilla.org/zh-CN/docs/A_re-introduction_to_JavaScript#.E6.95.B0.E5.AD.97)
- [Introduction | Learn Javascript](http://gitbookio.github.io/javascript/)
- [Seven JavaScript Quirks I Wish I’d Known About | Telerik Developer Network](http://developer.telerik.com/featured/seven-javascript-quirks-i-wish-id-known-about/)
- [Mixins, Forwarding, and Delegation in JavaScript](http://raganwald.com/2014/04/10/mixins-forwarding-delegation.html)
- [nuysoft's blog](http://nuysoft.com/)
- [JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/#advanced)
- [A List of Foundational JavaScript Tools](https://www.codefellows.org/blogs/complete-list-of-javascript-tools)
- [web开发设计人员不可不用的在线web工具和应用](http://www.qianduan.net/web-development-and-design-staff-can-not-be-without-online-web-tools-and-applications.html)
- [深入理解JavaScript系列 - 汤姆大叔 - 博客园](http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html)
- [JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/)

<!--more-->

### Video

* [Video: Douglas Crockford, “Advanced JavaScript”](http://yuiblog.com/blog/2006/11/27/video-crockford-advjs/)  视频在 financeserver 上有。
* [视频 : Douglas_Crockford_Advanced_JavaScript](http://v.youku.com/v_show/id_XNjA2NDU2NzU2.html) YouKu 上的视频镜像。

## OO

- [Prototypes Are Not Classes](http://raganwald.com/2014/01/19/prototypes-are-not-classes.html)
- [Private properties in JavaScript](https://curiosity-driven.org/private-properties-in-javascript)

## Primitive Type

- [JavaScript原生对象属性和方法详解——Array对象](http://www.feeldesignstudio.com/2013/09/native-javascript-object-properties-and-methods-array)
- [JavaScript原生对象属性和方法详解——Date对象](http://www.feeldesignstudio.com/2013/09/native-javascript-object-properties-and-methods-date)
- [JavaScript原生对象属性和方法详解——Number对象](http://www.feeldesignstudio.com/2013/09/native-javascript-object-properties-and-methods-number)
    + [在JavaScript中判断整型的N种方法 - WEB开发者](http://www.admin10000.com/document/4491.html)
- [JavaScript原生对象属性和方法详解——String对象](http://www.feeldesignstudio.com/2013/09/native-javascript-object-properties-and-methods-string)
- [JavaScript原生对象属性和方法详解——Math对象](http://www.feeldesignstudio.com/2013/09/native-javascript-object-properties-and-methods-math)
- [The Curious Case of JavaScript NaN](http://ariya.ofilabs.com/2014/05/the-curious-case-of-javascript-nan.html?)
- [Dev.Opera — JavaScript Array “Extras” in Detail](http://dev.opera.com/articles/javascript-array-extras-in-detail/)
- [What Every JavaScript Developer Should Know About Floating Points | Flippin' Awesome](http://flippinawesome.org/2014/02/17/what-every-javascript-developer-should-know-about-floating-points/)
- [Enums for JavaScript](http://www.2ality.com/2011/10/enums.html)
    + [Enums in JavaScript? - Stack Overflow](http://stackoverflow.com/questions/287903/enums-in-javascript)
    + [rauschma/enums](https://github.com/rauschma/enums)
    + [simple-enum](https://www.npmjs.org/package/simple-enum)
    + [Enums in Javascript | Stijn de Witt's Blog](http://stijndewitt.wordpress.com/2014/01/26/enums-in-javascript/)
- [sindresorhus/multiline](https://github.com/sindresorhus/multiline) Multiline strings in JavaScript.
- [Functional JavaScript, Part 3: .apply(), .call(), and the arguments object Tech.Pro](http://tech.pro/tutorial/2010/functional-javascript-part-3-apply-call-and-the-arguments-object)

## AOP

- [Intro to Aspect Oriented Programming](http://know.cujojs.com/tutorials/aop/intro-to-aspect-oriented-programming)

## ES5

- [Working with ES5 JavaScript array functions in modern and legacy browsers - Tech.Pro](http://tech.pro/tutorial/1834/working-with-es5-javascript-array-functions-in-modern-and-legacy-browsers)
- [ECMAScript 5 compatibility table](http://kangax.github.io/es5-compat-table/)
- [jlongster/es6-macros](https://github.com/jlongster/es6-macros) A collection of sweet.js macros that implement ES6 features for ES5.

## ES6

- [lukehoban/es6features](https://github.com/lukehoban/es6features) Overview of ECMAScript 6 features.
- [ECMAScript 6: A Better JavaScript for the Ambient Computing Era](http://www.slideshare.net/allenwb/wdc14-allebwb?)

### Worker

- [Communicating Large Objects with Web Workers in javascript](http://developerblog.redhat.com/2014/05/20/communicating-large-objects-with-web-workers-in-javascript)

## Observer

- [Detect, Undo And Redo DOM Changes With Mutation Observers](http://addyosmani.com/blog/mutation-observers/)

## Tips

### 构造函数

在编写 JavaScript 模块时，经常会看着这样的代码：

    function Buffer (subject, encoding, noZero) {
      if (!(this instanceof Buffer)){
        return new Buffer(subject, encoding, noZero);
      }
      // ...
    }

这样可以保证用户忘记 `new` 的时候，也返回 JavaScript 对象。 

### intelligence

Can you explain why ++[[]][+[]]+[+[]] = “10”?
<http://stackoverflow.com/questions/7202157/can-you-explain-why-10>

## Books

- [You Don’t Know JS: Scope & Closures](http://www.salttiger.com/you-dont-know-js-scope-and-closures/)
- [JavaScript Programming: Pushing the Limits](http://www.salttiger.com/javascript-programming-pushing-the-limits/)
- [Data Structures and Algorithms with JavaScript](http://www.salttiger.com/data-structures-and-algorithms-with-javascript/)
- [Data Structures and Algorithms with JavaScript](http://www.salttiger.com/data-structures-and-algorithms-with-javascript/)
- [Speaking JavaScript](http://www.salttiger.com/speaking-javascript/)