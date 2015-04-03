layout: post
title: "Node Tutorial"
category: Node
tags: [node, tutorial]
---
## 环境

官网下载并安装 <http://www.nodejs.org/download/>.

安装好后系统默认的环境变量 path 是 `C:\Documents and Settings\Administrator\Application Data\npm`。

现已出现一个比较人们的 fork，[iojs/io.js](https://github.com/iojs/io.js)，See [Wesley IO — Node.js is forked, not f***ed.](http://wesleyio.tumblr.com/post/104637877991/node-js-is-forked-not-f-ed)

## Framework

- [sahat/hackathon-starter](https://github.com/sahat/hackathon-starter) 模块采用水平结构。
- [primus/primus](https://github.com/primus/primus) Primus, the creator god of transformers but now also known as universal wrapper for real-time frameworks.  Primus provides a common low level interface to communicate in real-time using various of real-time frameworks.
- [12 Web Application Frameworks for Node.js | CodeCondo](http://codecondo.com/10-web-application-frameworks-for-node-js/)
- [10个最好的Node.js MVC框架 - WEB开发者](http://www.admin10000.com/document/3931.html)
- [Sails.js](http://sailsjs.org/#/) It is designed to emulate the familiar MVC pattern of frameworks like Ruby on Rails, but with support for the requirements of modern apps: data-driven APIs with a scalable, service-oriented architecture. 
- [All About Sessions in Node.js - Stormpath User Management API](https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions)
- [DaftMonk/generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack)
- [LoopBack](http://loopback.io/)

## Security

- [Top Overlooked Security Threats to Node.js Web Applications](https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications)
- [Node.js Security in the Enterprise - YouTube](https://www.youtube.com/watch?v=Zc8QvuRbdoQ&list=UUXe1qKfGweMKTnmRrMw9yOg&feature=share&index=1)
- [Node Security](http://www.salttiger.com/node-security/)
- [Beer Locker: Building a RESTful API with Node - OAuth2 Server - Scott Smith](http://scottksmith.com/blog/2014/07/02/beer-locker-building-a-restful-api-with-node-oauth2-server)
- [helmetjs/helmet](https://github.com/helmetjs/helmet)
- [krakenjs/lusca](https://github.com/krakenjs/lusca) Application security for express apps.

## Library

- [felixge/node-formidable](https://github.com/felixge/node-formidable) A node.js module for parsing form data, especially file uploads.
- [MrSwitch/hello.js](https://github.com/MrSwitch/hello.js) A Javascript RESTFUL API library for connecting with OAuth2 services, such as Google+ API, Facebook Graph and Windows Live Connect. http://adodson.com/hello.js/
- [yahoo/gifshot](https://github.com/yahoo/gifshot) JavaScript library that can create animated GIFs from media streams, videos, or images <http://yahoo.github.io/gifshot/>
- [node-ffi/node-ffi](https://github.com/node-ffi/node-ffi) Node.js Foreign Function Interface

### Pattern

- [sergiolepore/Cation](https://github.com/sergiolepore/Cation) A fast and customizable Dependency Injection Container for Node.js/io.js

### Log

- [flatiron/winston](https://github.com/flatiron/winston)
- [trentm/node-bunyan](https://github.com/trentm/node-bunyan)
- [Comparing Winston and Bunyan Node.js Logging](http://npmawesome.com/posts/2014-06-24-comparing-winston-and-bunyan-node-js-logging) 以上两个日志模块的比较。
- [bpaquet/node-logstash](https://github.com/bpaquet/node-logstash) Log 收集，可以将日志发送到某个服务器。

### Email

- [Nodemailer](http://www.nodemailer.com/) 从 Node.js 发送邮件。
- [Flolagale/mailin](https://github.com/Flolagale/mailin) smtp 服务器。

### Console

- [commander](http://visionmedia.github.io/commander.js/) 
    - [Command-line utilities with Node.js](http://cruft.io/posts/node-command-line-utilities) 教程。
- [Omelette by f](http://f.github.io/omelette) 为 Node Console 提供自动补全功能。
- [substack/node-optimist](https://github.com/substack/node-optimist) Node 参数解析库。

### HTML/CSS

- [cheerio](http://matthewmueller.github.io/cheerio/) 把字符串构建成 DOM 结构，提供 jQuery 一样的查询器。
- [Neamar/document-highlighter](https://github.com/Neamar/document-highlighter/) 
- [t32k/stylestats](https://github.com/t32k/stylestats) StyleStats is Node.js library to collect css statistics! CSS 分析器。

### Config

- [flatiron/nconf](https://github.com/flatiron/nconf)
- [flesler/config-node · GitHub](https://github.com/flesler/config-node)
- [dominictarr/rc](https://github.com/dominictarr/rc) The non-configurable configuration loader for lazy people.

### Device

- [sandeepmistry/bleno](https://github.com/sandeepmistry/bleno) 实现 Bluetooth low energy，目前只支持 MAC OS 和 Linux。

### Auth

- [jaredhanson/passport](https://github.com/jaredhanson/passport) Simple, unobtrusive authentication for Node.js. <http://passportjs.org/>
    + [User Authentication with Passport and Express 4 - Michael Herman](http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.VNKnnfWsWIR)
- [jaredhanson/oauth2orize](https://github.com/jaredhanson/oauth2orize) OAuth 2.0 authorization server toolkit for Node.js.
- [vdemedes/cancan](https://github.com/vdemedes/cancan) Pleasant authorization library for Node.js (port of Ryan Bates' cancan).
- [carlos8f/node-relations](https://github.com/carlos8f/node-relations) Entity relationship, role, and permissions API for Node.js.

__Demo:__

- [eddywashere/node-stripe-membership-saas](https://github.com/eddywashere/node-stripe-membership-saas)

### Timer

- moment
- [later](http://blog.fens.me/nodejs-cron-later/)

### Algorithm

- ape-algorithm 快速排序
- ape-algorithm 桶排序

### Publish

- forever
- pm2
- Travis
- [Publishing your first Browserify/Node module](http://blog.risingstack.com/publishing-your-first-browserify-node-module)
- [shipitjs/shipit](https://github.com/shipitjs/shipit)

### Commander

- [jonschlinkert/generator-node-cli](https://github.com/jonschlinkert/generator-node-cli)
- [Hypercubed/generator-commander](https://github.com/Hypercubed/generator-commander)
- [chjj/blessed](https://github.com/chjj/blessed) 在控制台整图形。
- [nathanpeck/clui](https://github.com/nathanpeck/clui) Command Line UI toolkit for Node.js.
- [sindresorhus/chalk](https://github.com/sindresorhus/chalk) Terminal string styling done right.
- [tj/node-progress](https://github.com/tj/node-progress) Flexible ascii progress bar for nodejs.

### Code

- [highlights](https://www.npmjs.com/package/highlights)

## Source

- [nodejs代码初探 - CNode](http://cnodejs.org/topic/4f571a16a680d212781ccf9f)
- [rdio/jsfmt](https://github.com/rdio/jsfmt) For formatting, searching, and rewriting JavaScript.
- [详解Node.js API系列](http://blog.whattoc.com/categories/%E8%AF%A6%E8%A7%A3Node.js%20API%E7%B3%BB%E5%88%97/)
- [Node.js设计模式](http://blog.whattoc.com/categories/Node.js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/)

## Performance

- [StrongLoop](http://strongloop.com/strongblog/node-js-performance-tip-of-the-week-memory-leak-diagnosis)

## Discussion

- [图解Node.js流行趋势，Node在路上 - OurJS.com](http://ourjs.com/detail/5306b3ad3b73342e0300000a)
- [Node.js的核心与红利](http://www.programmer.com.cn/13844/)
- [The Business Case for Node - YouTube](https://www.youtube.com/watch?v=bqLXjNbMZpY&app=desktop)
- [我为什么向后端工程师推荐Node.js](http://www.infoq.com/cn/articles/why-recommend-nodejs)

## Thread

- [Philip Roberts: Help, I'm stuck in an event-loop. on Vimeo](http://vimeo.com/96425312)
- [JXcore · a Node.JS distribution with additional features](http://jxcore.com/home/)
- [Understanding the Node.js Event Loop](https://nodesource.com/blog/understanding-the-nodejs-event-loop)

## Toos

- [Introducing Tamper · Tamper](http://nytimes.github.io/tamper/) 序列化协议，用于节省流量。
- [zertosh/beautify-with-words · GitHub](https://github.com/zertosh/beautify-with-words) Beautifies javascript and replaces variable names with unique "long-ish words". 可用于反编译 `*-min.js`。
- [busterc/no-exif](https://github.com/busterc/no-exif) 移除图片的 拍摄信息和 GPS 信息。
* [bipio-server/bipio · GitHub](https://github.com/bipio-server/bipio) 类似 IFTT

### 静态服务器

- [leeluolee/puer](https://github.com/leeluolee/puer)
- [Superstatic - Static Web Server for HTML5 Applications](http://superstatic.org) 静态网页服务器。
- [Fenix Web Server](http://fenixwebserver.com) 静态 HTTP 服务器。
- [Harp, the static web server with built-in preprocessing](http://harpjs.com/) Harp是一款快速的、轻量级的Web服务器。Harp serves Jade，Markdown，EJS，CoffeeScript, Sass, LESS以及Stylus as HTML、CSS & JavaScrip均可轻松配置。

### 云平台

- Heroku 
    + [6 Easy Ways to Prevent Your Heroku Node App From Sleeping - Quick Left Boulder Colorado](http://quickleft.com/blog/6-easy-ways-to-prevent-your-heroku-node-app-from-sleeping)
    + [Deploying Node.js App to Heroku](https://www.youtube.com/watch?v=uLF_hmtxAsY) <sup>video</sup>
    + - [How to Deploy a Node.js App to Heroku ♥ Scotch](http://scotch.io/tutorials/hosting/how-to-deploy-a-node-js-app-to-heroku)
- [Nitrous.io](https://www.nitrous.io/join/jOTIMMPrQPY), 一个云Node.js, Go, - Ruby, Python平台，还有Web IDE。
- [百度BAE](http://developer.baidu.com/wiki/index.php?title=docs/cplat/rt/node.js- )
- [AppFog](https://www.appfog.com/)
- [Nodejitsu](https://www.nodejitsu.com/)
- 阿里云
- [Stormpath User Management API](https://stormpath.com/) 提供用户管理服务。

## FAQ

- [How to change value of process.env.PORT in node.js? - Stack Overflow](http://stackoverflow.com/questions/13333221/how-to-change-value-of-process-env-port-in-node-js)

### how can i fix webstorm warning (= unresolved function ) for “require” (firefox add-on-sdk)

See [javascript - how can i fix webstorm warning (= unresolved function ) for "require" (firefox add-on-sdk) - Stack Overflow](http://stackoverflow.com/questions/20136714/how-can-i-fix-webstorm-warning-unresolved-function-for-require-firefox-a)



## bin

- [Why did the startup stub get moved to bin/www ? · Issue #25 · expressjs/generator](https://github.com/expressjs/generator/issues/25)
- [javascript - What does "./bin/www" do in Express 4.x? - Stack Overflow](http://stackoverflow.com/questions/23169941/what-does-bin-www-do-in-express-4-x)
- [Executables in npm scripts](http://blog.ibangspacebar.com/npm-scripts)

## Reference

- [Node.JS 学习路线图 - WEB开发者](http://www.admin10000.com/document/4624.html)

## Package

目标，将 node 和多个 JavaScript  以单个 .exe 文件的形式分发。

问题贴，各个链接在里面：[Make exe files from node.js app](http://stackoverflow.com/questions/8173232/make-exe-files-from-node-js-app)

采用批处理 + 合并工具的方法：[Create a standalone EXE to run a Node.js application](http://www.alexjamesbrown.com/blog/development/create-a-standalone-exe-to-run-a-node-js-application/)

node2exe，采用 `copy /b` 的方式，将宿主和资源连接起来。See [areve/node2exe](
https://github.com/areve/node2exe)

## Tutorial

- [javascript - Make exe files from node.js app - Stack Overflow](http://stackoverflow.com/questions/8173232/make-exe-files-from-node-js-app) 打包。
- [JohnnyFee/awesome-nodejs](https://github.com/JohnnyFee/awesome-nodejs)
- [从零开始nodejs系列文章](http://blog.fens.me/series-nodejs/)
- [Node初学者入门，一本全面的NodeJS教程 - OurJS.com](http://ourjs.com/detail/529ca5950cb6498814000005#event-driven-callbacks)
- [《JavaScript 应用程序设计》总目录](https://github.com/cssmagic/blog/issues/16)
- [Writing cross-platform Node.js](http://shapeshed.com/writing-cross-platform-node/)
- [Node.js软肋之回调大坑](http://www.infoq.com/cn/articles/nodejs-callback-hell)
- [如何选择Node.js Web开发框架？ - WEB开发者](http://www.admin10000.com/document/5283.html)
- [Writing Modular Node.js Projects for Express and Beyond](http://strongloop.com/strongblog/modular-node-js-express/)
- [当IoC遇见了Node.js](http://www.infoq.com/cn/articles/ioc-meet-nodejs)

### Error Handling

- [Error Handling in Nodejs - Developer Center - Joyent](http://www.joyent.com/developers/node/design/errors)
- [Node.js下自定义错误类型 - CNode](http://cnodejs.org/topic/52090bc944e76d216af25f6f)
- [Node.js异常捕获的一些实践](http://www.alloyteam.com/2013/12/node-js-series-exception-caught/)
- [Massa Labs](http://massalabs.com/dev/2013/10/17/handling-errors-in-nodejs.html)
- [Error Handling in Nodejs - Developer Center - Joyent](http://www.joyent.com/developers/node/design/errors?)

## Books

- [Node Cookbook, 2nd Edition](http://www.salttiger.com/node-cookbook-2nd-edition/)
- [Node: HTTP, HTTPS - Mixu's Node book](http://book.mixu.net/node/ch10.html)

