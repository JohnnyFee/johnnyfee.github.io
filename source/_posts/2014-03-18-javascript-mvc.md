---
layout: post
title: "JavaScript MVC 框架比较"
category: JavaScript
tags: [javascript, mvc]
--- 
[TodoMVC](http://todomvc.com/)

## 概念

参考 <[JavaScript MVC Style Guide](http://blog.sourcing.io/mvc-style-guide)>

### 控制层

* 控制层是模型层和视图层的粘合剂。处理大部分逻辑问题甚至管理问题。保持瘦控制器
* 任务父子控制器之间的通信均应使用事件（不要通过父控制器的实例来传递）
* 应该只知道其子控制器
* 应该限制单个元素，不要访问或修改DOM的其它部分
* 应该有唯一的类名且所有与控制器有关的CSS均应由这个类名来命名空间。
* 即使元素没有被附加到DOM树上，控制器也应该要工作。对于测试和验证控制器是否在正确的范围内，这个方法非常有效。
* 在对子元素发射事件时，应该是可测试的。
* 在没有不良反应的任何时候都应该有能力被重新调用
* 不要用DOM来存储状态——将所有视图的指定状态以实例属性的方式存储在控制器

<!--more-->

### 视图层

* 除了流控制和辅助功能外，应该减少逻辑性
* 当需要直接渲染时，应该让所有数据都通过。在当前的域内，所有的数据都应该有效。

### 模型层

* 应该纯粹地与数据、操作数据和装饰数据关联
* 绝不访问控制层或视图层
* 绝对访问或返回DOM结点
* 在运行时，应该只能访问或请求其它的模型
* 应该将XHR连接与程序的其余部分抽象开来
* 应该包含所有数据验证

### Router实例

* 尽可能的减少逻辑性
* 不应该知道或访问DOM

### 全局状态

* 你应该使用一个模块系统，不管是CommonJS、AMD、ES6模块,或其它相同的模块
* 永远不要设置或访问全局变量

### 模块

* 你应该使用一个模块系统，不管是CommonJS、AMD、ES6模块,或其它相同的模块
* 永远不要设置或访问全局变量


## Backbone

* 官网：[http://backbonejs.org/](http://backbonejs.org/)
* Github [https://github.com/jashkenas/backbone/](https://github.com/jashkenas/backbone/)
* 带注释的源码 [http://backbonejs.org/docs/backbone.html](http://backbonejs.org/docs/backbone.html)
* Example [http://backbonejs.org/#examples](http://backbonejs.org/#examples)
* Tutorial [https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites](https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites)
* Wiki https://github.com/jashkenas/backbone/wiki
* 中文文档 <http://www.csser.com/tools/backbone/backbone.js.html> 
* [From Backbone Views To React – Leonardo Garcia Crespo](http://leoasis.github.io/posts/2014/03/22/from_backbone_views_to_react/)
* 插件 
	- [Backbone.localStorage](https://github.com/jeromegn/abckbone.localstorage) A localStorage adapter for Backbone.js
- [Ampersand.js - Home](http://ampersandjs.com) A highly modular, loosely coupled, non-frameworky framework for building advanced JavaScript apps. 
- [Single Page ToDo Application With Backbone.js - Tuts+ Code Tutorial](http://code.tutsplus.com/tutorials/single-page-todo-application-with-backbonejs--cms-21417)

### Tutorial

- [lets build a backbone based framework!! - console.blog( this.thought )](http://blog.peterdecroos.com/blog/2014/01/06/lets-build-a-backbone-based-framework/)

## vue

Intuitive, fast & composable MVVM for building interactive interfaces. 

- [yyx990803/vue](https://github.com/yyx990803/vue)
- [vue.js](http://vuejs.org/?utm_source=javascriptweekly&utm_medium=email)

## Meteor

* 官网 [http://www.meteor.com](http://www.meteor.com)
* Meteor 不支持 Microsoft® Windows®。 [http://www.ibm.com/developerworks/cn/web/wa-meteor/](http://www.ibm.com/developerworks/cn/web/wa-meteor/)

## Ember.js

* [tastejs / todomvc](https://github.com/tastejs/todomvc/tree/gh-pages/architecture-examples/emberjs)
* 中文 [http://www.emberjs.cn](http://www.emberjs.cn)
* [Ember.JS – What it is and why we need to care about it](https://hacks.mozilla.org/2014/02/ember-js-what-it-is-and-why-we-need-to-care-about-it/)
* [A Step-by-Step Guide to Your First Ember.js App | Toptal](http://www.toptal.com/javascript/a-step-by-step-guide-to-building-your-first-ember-js-app)
* [Building a mobile-friendly web app using Ember.js and jQuery Mobile](http://blog.mist.io/post/78757774060/building-a-mobile-friendly-web-app-using-ember-js-and)
* [From Backbone Views To React – Leonardo Garcia Crespo](http://leoasis.github.io/posts/2014/03/22/from_backbone_views_to_react/)
- [Fixture Adapters - Ember.js With No Server](http://www.sitepoint.com/fixture-adapters-ember-js-server)
- [Things I wish someone had told me when I was learning Ember.js](http://landongn.com/ember/things-i-wish-someone-had-told-me-when-i-was-learning-ember-js)
- [Vic Ramon's Ember Tutorial](http://ember.vicramon.com)

### Video

- [Ember.js - An Application Framework For The Future on Vimeo](http://vimeo.com/84212105)

## Riot.js

Riot is the most minimal approach to MV* world. It weighs 1kb and has only 3 public methods so it's extremely simple and easy to learn.

- [Building modular applications with Riot.js](https://moot.it/riotjs/docs/)

## Mithril

- [Mithril](http://lhorie.github.io/mithril)

## Angular

* [http://angularjs.org](http://angularjs.org)
* [中文开发指南](http://angularjs.cn/T008?p=1)
* [get-stared](http://docs.angularjs.org/misc/started)
* [Guide](http://docs.angularjs.org/guide/)
* [angular/angular-seed](https://github.com/angular/angular-seed)
* [angular-ui](http://angular-ui.github.io/)
* [angular-project](https://github.com/angular/angular.js/wiki/Projects-using-AngularJS)
* <http://builtwith.angularjs.org/>
* [AngularJS Example Applications](http://blog.angularjs.org/2012/11/angularjs-example-applications.html)
* [Angle Brackets, Rifle Scopes - Pony Foo](http://blog.ponyfoo.com/2014/02/14/angle-brackets-rifle-scopes)
* [Angular Best Practice for App Structure (Public)](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)
* [Cloud Spinners Development Blog: Angular JS localization with Require JS i18n module](http://dev-blog.cloud-spinners.com/2014/02/angular-js-localization-with-require-js.html)
* [Google's AngularJS Style Guide](https://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html)
* [AngularJS Scopes: An Introduction | The Carbon Emitter](http://blog.carbonfive.com/2014/02/11/angularjs-scopes-an-introduction/)
* [mgonto/angular-wizard · GitHub](https://github.com/mgonto/angular-wizard?utm_source=javascriptweekly)
* [13 Steps to AngularJS Modularization | Safari Books Online's Official Blog](http://blog.safaribooksonline.com/2014/03/27/13-step-guide-angularjs-modularization/)
* [Data-binding Revolutions with Object.observe() - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/es7/observe/)
- [Crafting the Perfect AngularJS Model and Making it Real Time - YouTube](https://www.youtube.com/watch?v=lHbWRFpbma4)
- [How to Learn AngularJS - Your AngularJS Sherpa](http://www.ng-newsletter.com/posts/how-to-learn-angular.html)

可以参考的东西，链式编程，DI模式。

### Tutorial

- [OutlawAndy/relativeDate](https://github.com/outlawandy/relativeDate)
- [Convention Based Routing In JavaScript Apps](http://flippinawesome.org/2014/05/19/convention-based-routing-in-javascript-apps)

## 框架大小

框架名称/大小(k)  | min+gzip |  min     |todo中是否使用jquery 	|是否依赖jQuery
------------------|----------|----------|-----------------------|--------------
jQuery2.0.3       |  27.9    |   81.6   |      N                |     N
Zepto	    	  |  9.2     |   24.0   |      N                |     N
Ender             |          |          |      N                |     N
jScroll2.1.1      |  1.5     |   3.4    |      N                |     N
backbone          |  6.3     |   19     |      Y                |     N
underscore.js     |  4.9     |   14     |      N                |     N 
angular           |  34.6    |   96.6   |      N                |     N
ember             |  65.5    |   242.9  |      Y                |     N
handlerbars.js    |  4.7     |   15.6   |      N                |     N
canjs             |  20.8    |   63.8   |      Y                |     Y
knockoutjs        |  16.3    |   45.0   |      N                |     N
sammy             |  5.2     |   16     |      N                |     N 

## 框架比较

* [Rich JavaScript Applications – the Seven Frameworks](http://blog.stevensanderson.com/2012/08/01/rich-javascript-applications-the-seven-frameworks-throne-of-js-2012/) 翻译 [JavaScript宝座：七大框架论剑](http://blog.stevensanderson.com/2012/08/01/rich-javascript-applications-the-seven-frameworks-throne-of-js-2012/)
* [Angular.js VS. Ember.js：谁将成为Web开发的新宠](http://www.csdn.net/article/2013-09-09/2816880-Angular-Ember-Javascript-Frameworks)
* [Backbone与Angular的比较](http://www.infoq.com/cn/articles/backbone-vs-angular)
* [12种JavaScript MVC框架之比较](http://www.infoq.com/cn/news/2012/05/js-mvc-framework)
* [The Top 10 Javascript MVC Frameworks Reviewed](http://codebrief.com/2012/01/the-top-10-javascript-mvc-frameworks-reviewed/)
* [JavaScript MVC框架PK：Angular、Backbone、CanJS与Ember](http://www.csdn.net/article/2013-04-25/2815032-A-Comparison-of-Angular-Backbone-CanJS-and-Ember)
* [Backbone与Angular的比较](http://www.infoq.com/cn/articles/backbone-vs-angular)
* [Performance Comparisons - vue.js](http://vuejs.org/perf/) 性能比较。
* [Angular, Ember, And Backbone: Which JavaScript Framework Is Right For You? – ReadWrite](http://readwrite.com/2014/02/06/angular-backbone-ember-best-javascript-framework-for-you)
* [When to use React.js and when to use Angular?： javascript](http://www.reddit.com/r/javascript/comments/25n7id/when_to_use_reactjs_and_when_to_use_angular)
* [对比Angular/jQueryUI/Extjs：没有一个框架是万能的](http://damoqiongqiu.iteye.com/blog/1922004)
* [Opinionated Rundown of JS Frameworks](http://blog.andyet.com/2014/08/13/opinionated-rundown-of-js-frameworks)
* [AngularJS vs. Backbone.js vs. Ember.js - Choosing Your JS Framework](http://www.airpair.com/js/javascript-framework-comparison)
* [Overview of Popular JavaScript Frameworks' Internal Mechanics - Frontend Masters](https://frontendmasters.com/courses/javascript-frameworks-showdown/overview)
* [Anatomy of a JavaScript MV* Framework](http://www.sitepoint.com/anatomy-javascript-mv-framework)