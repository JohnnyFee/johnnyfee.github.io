---
layout: post
title: "JavaScript Tutorial"
description: ""
category: JavaScript
tags: [javascript]
--- 

## IO

- [The PourOver Book](http://newsdev.github.io/pourover/) A library for simple, fast filtering and sorting of large collections in the browser.
- [Fuse.js](http://github.com/krisk/fuse) Lightweight fuzzy-search, in JavaScript.

## Performance

- [视频访谈： Stoyan Stefanov 谈JavaScript性能 - 推酷](http://www.tuicool.com/articles/vEn6zm)
- [User Timing API: Understanding your Web App - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webperformance/usertiming/)
- [lodash/lodash](https://github.com/lodash/lodash) A utility library delivering consistency, customization, performance, & extras. <http://lodash.com/>
- [Announcing JS Error Reporting and AJAX Timing - New Relic blog](http://blog.newrelic.com/2014/03/13/javascript-error-reporting-ajax-timing-new-relic/)
- [JavaScript Memory Management Masterclass // Speaker Deck](https://speakerdeck.com/addyosmani/javascript-memory-management-masterclass)

<!--more-->

### Test Tools

- [Kraken JavaScript Benchmark](http://kraken-mirror.googlecode.com/svn/trunk/kraken/hosted/kraken-1.1/driver.html)
- [SunSpider 1.0.2 JavaScript Benchmark](http://www.webkit.org/perf/sunspider/sunspider.html) 
- [**dromaeo**](http://dromaeo.com/)

## Tool

- Grunt
- bower
- [component/component](https://github.com/component/component) client package management for building better web applications <http://component.io>.

### wankada

- [wakanda](http://www.wakanda.org/)
- [Creating Custom Widgets with JavaScript in Wakanda](http://flippinawesome.org/2014/06/05/creating-custom-widgets-with-javascript-in-wakanda/?-custom-widgets-with-javascript-in-wakanda)

## Storage

### localForage

- [localForage: Offline Storage](https://hacks.mozilla.org/2014/02/localforage-offline-storage-improved/)

    localForage is a JavaScript library that uses the very simple [localStorage API](https://hacks.mozilla.org/2009/06/localstorage/). localStorage gives you, essentially, the features of get, set, remove, clear, and length, but adds:

    * an asynchronous API with callbacks
    * IndexedDB, WebSQL, and localStorage drivers (managed automatically; the best driver is loaded for you)
    * Blob and arbitrary type support, so you can store images, files, etc.
    * support for ES6 Promises
    * localForage supports all modern browsers. 

            // Save our users.
            var users = [ {id: 1, fullName: 'Matt'}, {id: 2, fullName: 'Bob'} ];
            localForage.setItem('users', users, function(result) {
                console.log(result);
            });

应用：

- [mozilla/around](https://github.com/mozilla/around)

### IndexedDB

- [Dev.Opera — An Introduction to IndexedDB](http://dev.opera.com/articles/introduction-to-indexeddb)

## Catch

- [mortzdk/jsCache](https://github.com/mortzdk/jsCache) jsCache 是一个 JavaScript 库，它使用 localStorage 技术来缓存 JS，CSS 和图像。这对于移动网站特别有用，因为它节省了 HTTP 请求，并且所有的文件载入都是异步的。

## File

- [通过javascript把图片转化为字符画 - OurJS.com](http://ourjs.com/detail/5268746af3aad32a72000001)
- [FSO.js - Client-side File Storage in JavaScript](http://fsojs.com/) FSO.js is a JavaScript library for temporary and permanent client-side file storage.

## Other Library

- [sindresorhus/screenfull.js](https://github.com/sindresorhus/screenfull.js) Simple wrapper for cross-browser usage of the JavaScript Fullscreen API.
- [mrdoob/three.js](https://github.com/mrdoob/three.js) JavaScript 3D library. <http://threejs.org/>

## 开发工具

- [Chrome开发者工具和console对象](http://javascript.ruanyifeng.com/tool/console.html)
- [PhantomJS](thttp://javascript.ruanyifeng.com/tool/phantomjs.html) 
- [Bower：客户端库管理工具](http://javascript.ruanyifeng.com/tool/bower.html)
- [Grunt：任务自动管理工具](http://javascript.ruanyifeng.com/tool/grunt.html)
- [Browserify：浏览器加载Node.js模块](http://javascript.ruanyifeng.com/tool/browserify.html)
- [RequireJS和AMD规范](http://javascript.ruanyifeng.com/tool/requirejs.html)
- [Source map](http://javascript.ruanyifeng.com/tool/sourcemap.html)

### Debug

- [Amjad Masad: Lesser known Debugging Techniques - YouTube](https://www.youtube.com/watch?v=rcjUR4icvoQ)
- [谷歌Chrome Developer Tools浅析 – 成为更高效的 Developer_开发工具_酷勤网](http://www.kuqin.com/developtool/20120625/321085.html)

### 代码工具

- http://jsbin.com/
    + [JavaScript Tools of the Trade: JSBin - Tuts+ Code Tutorial](http://code.tutsplus.com/tutorials/javascript-tools-of-the-trade-jsbin--net-36843)
- [JSCritic](http://jscritic.com/)

## Test

- [browser testing](https://ci.testling.com/)

## FAQ

- [Improving Browser Detection](http://flippinawesome.org/2014/04/07/improving-browser-detection/?-browser-detection)

## Tutorial

- [JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/#advanced)
- [A List of Foundational JavaScript Tools](https://www.codefellows.org/blogs/complete-list-of-javascript-tools)
- [web开发设计人员不可不用的在线web工具和应用](http://www.qianduan.net/web-development-and-design-staff-can-not-be-without-online-web-tools-and-applications.html)

## Books

- [You Don’t Know JS: Scope & Closures](http://www.salttiger.com/you-dont-know-js-scope-and-closures/)
- [转载：前端开发经验分享（书籍介绍：javascript） - 徐涛的笔记 - 前端网（W3Cfuns）](http://www.w3cfuns.com/blog-5431260-5398544.html)
- [45本免费的JavaScript书籍资源 - WEB开发者](http://www.admin10000.com/document/3672.html)