---
layout: post
title: "Node Express"
category: Node
tags: [node]
--- 
Node 的框架：<http://nodeframework.com/>。

其中比较流行的MVC框架是 Ruby's Sinatra 风格的 [visionmedia/express](https://github.com/visionmedia/express)，和 Ruby's Rack 风格的 [senchalabs/connect](https://github.com/senchalabs/connect) 。其中 Connect 的领导者为Sencha的[visionmedia (TJ Holowaychuk)](https://github.com/visionmedia)，Express的领导者为还是TJ Holowaychuk，可以看看这个的 Git 首页，无语的。Express 和 Connect 相互补充，而不是取代关系。Express v1.0.0 便是基于 Connect 开发的，时至今日，他们之间仍然维持着这样的关系：Express=Connect+基于Connect的额外功能。Connect的任何修改都会反映到Express。

其他MVC框架列表可参考：[Node.js MVC Frameworks](http://nodeframework.com/index.html#mvc)。

目前 Express 已发展到V4，<http://expressjs.com/4x/api.html>，另外一个大版本为V3 <http://expressjs.com/>。中文文档：[Express - 中文文档( node.js Web应用框架 )](http://expressjs.jser.us/)

关于Express V4 和 Express V3的区别请参考：

- [New features in 4.x · visionmedia/express Wiki](https://github.com/visionmedia/express/wiki/New-features-in-4.x)
- [ExpressJS 4.0: New Features and Upgrading from 3.0 ♥ Scotch](http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0)

另外，还有一个新的Web框架 [koajs/koa](https://github.com/koajs/koa)。Koa是由Express背后的团队开发的新Web框架，目的是为Web应用和Web API提供更小、更有表达力、更稳固的基础。通过生成器，Koa可以摆脱回调，极大地改进错误处理。Koa核心不绑定任何中间件，但提供了优雅的一组方法，可以快速和愉悦地编写服务器应用。

Koa号称为Node下一代的 Web 框架。但是在官方的FAQ中提到它不会取代Connect，但会不会取代Express，并没有正面回答，参考 [koa/docs/faq.md at master · koajs/koa](https://github.com/koajs/koa/blob/master/docs/faq.md)。

但不管怎么样，哥刚入门 Node，还是从 Express 入手。

## Quite Start

安装 Express ：

    npm install express -g

以上命令将以全局的方式安装express的最新版。如果你想安装指定版本，可以：

    npm install express@3.0.5 -g

查看 expres 的版本：

    express –V

##　Express 三大组件

###　application 对象

The application object is an instance of Express, conventionally represented by the 
variable named app. This is the main object of your Express app and the bulk of the 
functionality is built on it.

创建一个Express模块的实例：

    var express = require('express');
    var app = new express();

###  request 对象

The HTTP request object is created when a client makes a request to the Express app. The object is conventionally represented by a variable named req, which contains a number of properties and methods related to the current request.

### response 对象

The response object is created along with the request object, and is conventionally represented by a variable named res. While it may sound a little strange that both of them should be created together, it is a necessity to give all the middlewares a chance to work on the request and the response object, before passing the control to the next middleware.


## 几个核心概念

### Middlewares

A middleware is a JavaScript function to handle HTTP requests to an Express app. It can manipulate the request and the response objects or perform an isolated action, or terminate the request flow by sending a response to the client, or pass on the control to the next middleware. 

Middlewares are loaded in an Express app using the app.use()method.

Following is an example of a middleware. All it does is print the IP address of the client that made the request. Although it may seem like a trivial middleware, it gives you a very good overview of how middlewares work: 

    app.use(function(req, res, next) {
        console.log('Request from: ' + req.ip);
        next();
    });

- res is the request object
- res is the response object
- next is a reference to the next middleware in line. 

Any middleware can end a request by sending a response back to the client using one of the response methods on the resobject. Any middleware that does not call a response method must call the next middleware in line, else the request will be left hanging in there.

This is how a middleware would look like if it were defined first and then passed to the app.use()method:

define the middleware:

    var forbidder = function(forbidden_day) {
        var days = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return function(req, res, next) {
            // get the current day
            var day = new Date().getDay();
            // check if the current day is the forbidden day
            if (days[day] === forbidden_day) {
                res.send('No visitors allowed on ' + forbidden_day + 's!');
            }
            // call the next middleware
            else {
             next();
            }
        }
    };

use the forbidder middleware:

    app.use(forbidder('Wednesday'));
    // the router middleware goes here
    app.use(app.router);

If we were to rewrite the forbidder middleware as a Node module, we would need to first create the forbidder.jsmodule file with the following content:

    module.exports = function(forbidden_day) {
        var days = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'
        ];
        return function(req, res, next) {
            // get the current day
            var day = new Date().getDay();
            // check if the current day is the forbidden day
            if (days[day] === forbidden_day) {
                res.send('No visitors allowed on ' + forbidden_day + 's!');
            }
            // call the next middleware
            else {
                next();
            }
        }
    };

使用：

    var forbidder = require('./forbidder.js');
    app.use(forbidder('Wednesday'));

## Library

- [Express-di by luin](http://luin.github.io/express-di/) Bring dependency injection to the Express.