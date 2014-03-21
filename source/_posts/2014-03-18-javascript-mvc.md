---
layout: post
title: "JavaScript MVC 框架比较"
category: JavaScript
tags: [javascript, mvc]
--- 
[TodoMVC](http://todomvc.com/)

## Riot.js

Riot is the most minimal approach to MV* world. It weighs 1kb and has only 3 public methods so it's extremely simple and easy to learn.

- [Building modular applications with Riot.js](https://moot.it/riotjs/docs/)

<!--more-->

## Backbone

* 官网：[http://backbonejs.org/](http://backbonejs.org/)
* Github [https://github.com/jashkenas/backbone/](https://github.com/jashkenas/backbone/)
* 带注释的源码 [http://backbonejs.org/docs/backbone.html](http://backbonejs.org/docs/backbone.html)
* Example [http://backbonejs.org/#examples](http://backbonejs.org/#examples)
* Tutorial [https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites](https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites)
* Wiki https://github.com/jashkenas/backbone/wiki
* 中文文档 http://www.csser.com/tools/backbone/backbone.js.html - 插件 - Backbone.localStorage https://github.com/jeromegn/abckbone.localstorage A localStorage adapter for Backbone.js

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

### Video

- [Ember.js - An Application Framework For The Future on Vimeo](http://vimeo.com/84212105)

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
* [Angular Best Practice for App Structure (Public)](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub?utm_source=javascriptweekly&utm_medium=email)
* [Cloud Spinners Development Blog: Angular JS localization with Require JS i18n module](http://dev-blog.cloud-spinners.com/2014/02/angular-js-localization-with-require-js.html)
* [Google's AngularJS Style Guide](https://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html)
* [AngularJS Scopes: An Introduction | The Carbon Emitter](http://blog.carbonfive.com/2014/02/11/angularjs-scopes-an-introduction/)
* [mgonto/angular-wizard · GitHub](https://github.com/mgonto/angular-wizard?utm_source=javascriptweekly&utm_medium=email)

可以参考的东西，链式编程，DI模式。

## 框架大小

框架名称/大小(k)  |   min+gzip |  min     |todo中是否使用jquery |是否依赖jQuery
------------------|----------|----------|-----------------------|--------------
jQuery2.0.3       |  27.9    |   81.6   |      N                |     N
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
