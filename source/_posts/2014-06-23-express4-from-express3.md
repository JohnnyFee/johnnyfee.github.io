layout: post
title: "express4.x新特性以及如何从3.x升级到4.x"
category: Node
tags: [node, express]
---

> 原文：[ExpressJS 4.0: New Features and Upgrading from 3.0 ♥ Scotch](http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0)
> 翻译: [express4.x新特性以及如何从3.x升级到4.x](http://jser.me/2014/03/18/express4.x%E6%96%B0%E7%89%B9%E6%80%A7%E4%BB%A5%E5%8F%8A%E5%A6%82%E4%BD%95%E4%BB%8E3.x%E5%8D%87%E7%BA%A7%E5%88%B04.x.html)

距离我写[expressx2.x升级3.x](http://jser.me/2012/12/10/Express2.X%E8%BF%81%E7%A7%BB%E8%87%B33.X%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9.html)已经过去一年多的时间了，这期间express发展很迅速，已经是nodejs社区事实上的web框架之王。最近express发布了[4.0.0-rc3](https://github.com/visionmedia/express/blob/master/package.json#L4)，其中又有了一些改变，下面我们来看看有哪些改变，以及如何从3.x升级到4.x。

<!--more-->

## 移除内置中间件 ##

4.x版本不再依赖Connect，之前内置的所有中间件除了`static`都被分离为单独的模块了，也就是如果你的3.x的代码是：

```
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});
```

在4.x各个模块需要单独安装，然后`require`，可以使用`npm install --save xxxx`，这样可以自动把模块保存到你的`package.json`里，4.x的代码示例：

```
var app = express();
var express  = require('express');
var morgan = require('morgan'); //logger模块的这个新名字真是神奇
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
```

下面是3.x的内置模块和4.x模块的对照表，你可以发现，模块名有点混乱，有的是把驼峰改成了连字符，有的是反过来的，有的前缀express，有的是没有，真不知道怎么命名的，这个应该好好跟grunt或者gulp学习一下。

3.x             | 4.x                                                            
---------------| ---------------
bodyParser      | [body-parser](https://github.com/expressjs/body-parser)        
compress        | [compression](https://github.com/expressjs/compression)        
cookieSession   | [cookie-session](https://github.com/expressjs/cookie-session)  
logger          | [morgan](https://github.com/expressjs/morgan)                  
cookieParser    | [cookie-parser](https://github.com/expressjs/cookie-parser)    
session         | [express-session](https://github.com/expressjs/session)        
favicon         | [serve-favicon](https://github.com/expressjs/favicon)          
response-time   | [response-time](https://github.com/expressjs/response-time)    
error-handler   | [errorhandler](https://github.com/expressjs/errorhandler)      
method-override | [method-override](https://github.com/expressjs/method-override)
timeout         | [connect-timeout](https://github.com/expressjs/connect-timeout)
vhost           | [vhost](https://github.com/expressjs/vhost)                    
csrf            | [csurf](https://github.com/expressjs/csurf)                    
directory       | [serve-index](https://github.com/expressjs/serve-index)        
static          | [serve-static](https://github.com/expressjs/serve-static)      

## 强化的路由功能 ##

4.x提供了一个更棒的`Router`对象和`route`接口，可以更方便的把路由分解成单独的文件

不要再手动执行`app.use(app.routers)`, app.use和app[get|post]混用的时候，将会按照它们调用的顺序执行

例如有一个3.x的代码

```
app.use(cookieParser());
app.use(bodyParser());
app.use(app.router); // 这行要干掉

// 在路由之后执行
app.use(function(req, res, next);
// 错误处理的中间件
app.use(function(err, req, res, next) {});

//正常的路由挂载
app.get('/' ...);
app.post(...);
```

换成了4.x的：

```js
app.use(cookieParser());
app.use(bodyParser());

//正常的路由挂载, 这里和app.use混用的时候
//如果需要中间件调用之前处理就必须use之前挂载
app.get('/' ...);
app.post(...);

// 错误处理的中间件
app.use(function(err, req, res, next) {});
```

4.x更方便的路由, app.route方法会返回一个Route实例，它可以继续使用所有的HTTP方法，并且它还有一个`all`方法，可以在所有的HTTP方法上生效

```
app.route('/users')
  .get(function(req, res, next) {})
  .post(function(req, res, next) {})
```

## Router 对象 ##

这是4.x里新增加的一个对象，它有点像迷你版的`app`对象，它没有`views`和`setting`，但是包含所有的路由接口，比如
`.use`, `.route`, `.param`, `.get`。

它可以帮助我们更好组织代码，假如项目里有个`routes/people.js`

```
var people = express.Router();
people.use(function(req, res, next) {
});
people.get('/', function(req, res, next) {
});
```

可以把它挂在 `/people`下，所有的`/people/*`处理都会由`people.js`里的`Router`来处理了

```
app.use('/people', require('./routes/people').people);
```

更多关于`Router`的内容可以看[文档](http://expressjs.jser.us/4x_zh-cn/api.html#router)

## 删除app.configure方法 ##

这个方法使用还是比较多的，如果你用来判断环境的代码，比如3.x下的

```
app.configure('development', function() {
   // configure stuff here
});
```

在4.x下，这个方法完全没有了，你需要换成

```
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
}
```

## 删除express.createServer() ##

这个在3.x的时代就已经废弃了，直接使用 `express()`就行了

## 删除res.charset ##

使用`res.set('content-type')`或者`res.type()`来设置默认的charset，使用`res.setHeader`时不会再默认加charset了

## req.accepted改为req.accepts ##

有几个相关的方法都改名了

* `req.accepts()`
* `req.acceptsEncodings()`
* `req.acceptsCharsets()`
* `req.acceptsLanguages()`  

## req.params的改变 ##

这个属性现在是一个对象，不再是一个数组

## res.locals ##

不再是一个方法，现在它就是一个纯对象。

## req.is ##

去掉了，可以使用[type-is](https://github.com/expressjs/type-is)模块

## 总结 ##

总的来说，改动还是挺大的，如果你想升级，最好留有足够的时间来把你的代码调整为4.x的。

如果发现这篇文章里有什么错误，欢迎留言反馈。

## Reference

- [Tom's Blog](http://blog.tompawlak.org/new-features-node-express-4)
* [Migrating from 3.x to 4.x](https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x)
* [Migrating from 3.x to 4.x · strongloop/express Wiki](https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x)
* [New features in 4.x](https://github.com/visionmedia/express/wiki/New-features-in-4.x)
* [New features in 4.x · strongloop/express Wiki](https://github.com/strongloop/express/wiki/New-features-in-4.x)
* [Express.js 4, Node.js and MongoDB REST API Tutorial](http://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial/)

## Tutorial

- [Session Management In Your ExpressJS Web Application](https://blog.nraboy.com/2015/01/session-management-expressjs-web-application)