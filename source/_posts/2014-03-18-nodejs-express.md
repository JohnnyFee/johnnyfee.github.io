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

<!--more-->

关于Express V4 和 Express V3的区别请参考：

- [New features in 4.x · visionmedia/express Wiki](https://github.com/visionmedia/express/wiki/New-features-in-4.x)
- [ExpressJS 4.0: New Features and Upgrading from 3.0 ♥ Scotch](http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0)

另外，还有一个新的Web框架 [koajs/koa](https://github.com/koajs/koa)。Koa是由Express背后的团队开发的新Web框架，目的是为Web应用和Web API提供更小、更有表达力、更稳固的基础。通过生成器，Koa可以摆脱回调，极大地改进错误处理。Koa核心不绑定任何中间件，但提供了优雅的一组方法，可以快速和愉悦地编写服务器应用。

Koa号称为Node下一代的 Web 框架。但是在官方的FAQ中提到它不会取代Connect，但会不会取代Express，并没有正面回答，参考 [koa/docs/faq.md at master · koajs/koa](https://github.com/koajs/koa/blob/master/docs/faq.md)。

但不管怎么样，哥刚入门 Node，还是从 Express 入手。

本文一下部分是 <<[Express Web Application Development](http://www.salttiger.com/express-web-application-development/)>> 的读书笔记，基本都是英文，都是从原文中拷贝下来的。

## Install

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


### Router

The destinations of the HTTP request URIs are defined via routes in the app. Routes are how you tell your app " for this URI, execute this piece of JavaScript code". The corresponding JavaScript function for a route is called a route handler. It is the responsibility of the route handler to respond to an HTTP request, or pass it on to another handler function if it does not. Route handlers may be defined in the app.js file or loaded as a Node module.

Here is a working example of some routes and their handlers defined right in the app.jsfile:

    var http = require('http');
    var express = require('express');
    var app = express();

    app.get('/', function(req, res) {
        res.send('Welcome!');
    });

    app.get('/hello.text', function(req, res) {
        res.send('Hola!');
    });
    app.get('/contact', function(req, res) {
        res.render('contact');
    });

    http.createServer(app).listen(3000, function(){
        console.log('Express server listening on port ' + 3000);
    });

Defining the routes and their handlers in the app.js file may work fine if the number of routes is relatively few. It becomes messy if the number of routes starts growing. That's where defining the routes and their handlers in a Node module comes in handy. If we were to modularize the routes we defined earlier, here is how it would look like.

The following is the content of the `routes.js` Node module:

    module.exports = function(app) {
        app.get('/', function(req, res) {
            // Send a plain text response
            res.send('Welcome!');
        });

        app.get('/hello.text', function(req, res) {
            // Send a plain text response
            res.send('Hola!');
        });
        
        app.get('/contact', function(req, res) {
            // Render a view
            res.render('contact');
        });
    };

The modified `app.js` file would look like the following now:

    var http = require('http');
    var express = require('express');
    var app = express();
    var routes = require('./routes')(app);
    http.createServer(app).listen(3000, function(){
        console.log('Express server listening on port ' + 3000);
    });

The act of sending a response effectively terminates the request flow to any other route handler.

## Quick Start

    $ cd ~
    $ mkdir express-app
    $ cd express-app

### create `package.json`

What is Express?, we learned that Express apps are actually Node modules, which means our app also would need a manifest file. So, create a file named `package.json` in the app directory.

    {
        "name": "test-app",
        "version": "0.0.1",
        "private": true,
        "scripts": {
            "start": "node app"
        },
        "dependencies": {
            "express": "3.2.6",
            "jade": "*"
        }
    }

参数：

- `private` Indicates whether this module is meant to be published on the 
npmregistry or not.
- `scripts` npm commands for the module. In our case, we will support only 
the startcommand. npm startwill call the node app.

在`package.json`所在的文件夹中执行：

    $ npm install

You will find a new directory named node_modulesin the directory; that's where all the dependencies are installed.

### create app.js

Create a file called app.js and put the following code in it:

    // Include the Node HTTP library
    var http = require('http');

    // Include the Express module
    var express = require('express');

    // Create an instance of Express
    var app = express();

    // Start the app
    http.createServer(app).listen(3000, function() {
        console.log('Express app started');
    });

    // A route for the home page
    app.get('/', function(req, res) {
        res.send('Welcome!');
    });

You might have noticed that the route in the app is defined after the code for starting the server, but it works anyway. The reason it works is because routes are defined on the appobject, which is passed to the HTTP API as a reference—any time you make a change on the appobject, it is reflected on the server.

### start & stop

Since Express apps are Node programs, starting an Express app is similar to executing a Node program. In our case, the program resides in a file named app.js, so this is how you will start the server:

    $ node app
    $ node app

> Express app started

To stop the server, press Ctrl+ C.

To send HTML response, just change `res.send('Welcome!')` to `res.send('<h1>Welcome!</h1>')`, and restart the server. 

For the changes made in application files to reflect, you need to restart the server. This can be a tedious process; you can make it easier for yourself by using __supervisor__, a Node module that will watch the application files and restart the server when any one of them changes. You can learn more about supervisor at <https://github.com/ isaacs/node-supervisor>.

### views

Any changes made in the views will be reflected in the HTML output without requiring the server to be restarted. 

Let go ahead and create a directory for our views, named views:

    $ mkdir views

Now create two view files in the `views` directory: one named `index.jade` for the home page, another named `hello.jade` for the hello web page.

Note that Jade is just one of the many templating languages that is supported by Express.

Here is the content for index.jade:

    html
        head
            title Welcome
        body Welcome!

And here is the content for hello.jade:

    html
    head
        title Hello
    body
        b Hello!

Make sure to consistently use spaces or tabs for indentation, or else Jade will throw an error.

Let's update app.jsto use our newly created views: 

    var http = require('http');
    var express = require('express');
    var app = express();
    
    // Set the view engine
    app.set('view engine', 'jade');

    // Where to find the view files
    app.set('views', './views');

    // A route for the home page - will render a view
    app.get('/', function(req, res) {
        res.render('index');
    });

    // A route for /say-hello - will render a view
    app.get('/say-hello', function(req, res) {
        res.render('hello');
    });

    app.get('/test', function(req, res) {
        res.send('this is a test');
    });

    http.createServer(app).listen(3000, function() {
        console.log('App started');
    });

For a matched route, `res.render()` will look for the view in the `views` directory and render it accordingly

### public directory for the app

Express has a middleware called _static_, using which we can mark a directory in the filesystem for serving static files for the app. Any file kept in these directories can be directly accessed via the browser.

This is how you use the _static_ middleware to set a directory for static resources:

    app.use(express.static('./public'));

Let's create a static directory named publicand use it for our static content:

    $ mkdir public
    $ mkdir public/images
    $ mkdir public/javascripts
    $ mkdir public/stylesheets

Create a file named `main.js` in the javascriptsdirectory with the following content:

    window.onload = function() {
        document.getElementById('smile').innerHTML = ':)';
    };

Create a file named `style.css` in the `styles` heetsdirectory with the following content:

    #content {
        width: 220px;
        margin: 0 auto;
        text-align: center;
        border: 1px solid #ccc;
        box-shadow: 0 3px 4px #ccc;
        padding: 5px;
    }

Update `index.jade` to include the newly added files:

    html
        head
            title Welcome
            script(src='javascripts/main.js')
            link(rel='stylesheet', href='stylesheets/style.css')
        body
            #content
                img(src='images/logo.png')
                p WELCOME
                #smile

Update `app.js` to set a static directory:

    // ...
    app.set('view engine', 'jade');
    app.set('views', './views');
    
    // Mark the public dir as a static dir
    app.use(express.static('./public'));

    // ...

    
![effective](http://johnnyimages.qiniudn.com/express-public.png)

### auto generate experss app skeleton

Using its help option (-h), let's ask express how it works and what its options are:

    $ express –h

Let's create a new app using our newfound knowledge of express:

    $ express --sessions ~/auto-express

run the app:
    
    $ node app

Take a look at the content of the directory auto generated:

    ![express-skeleton](http://johnnyimages.qiniudn.com/express-skeleton.png)


### Empowering Express with middlewares

For your reference, the following is the list of the middlewares that are available in Express, by default:

Middleware             | Description
-----------------------|-------------
router                 | The app's routing system
logger                 | Log requests to the server
compress gzip/deflate  | support on the server
basicAuth              | Basic HTTP authentication
json                   | Parse application/json
urlencoded             | Parse application/x-www-formurlencoded
multipart              | Parse multipart/form-data
bodyParser             | Parse request body. Bundles json, urlencoded, and multipart middlewares together
timeout                | Request timeout
cookieParser           | Cookie parser
session                | Session support
cookieSession          | Cookie-based sessions
methodOverride         | HTTP method support
responseTime           | Show server response time
static                 | Static assets directory for the website
staticCache            | Cache for the static middleware
directory              | Directory listing
vhost                  | Enable vhost
favicon                | Favicon for the website
limit                  | Limit the size of request body
query                  | The GET query parser
error                  | Handler Generate HTML-formatted stack trace of errors in the server

For this example, we will use the `responseTime` middleware.

Modify `app.js` to use this middleware:

    var http = require('http');
    var express = require('express');
    var app = express();
    app.set('view engine', 'jade');
    app.set('views', './views');
    app.use(express.static('./public'));

    // Add the responseTime middleware
    app.use(express.responseTime());
    app.get('/', function(req, res) {
        res.render('index');
    });

    http.createServer(app).listen(3000, function() {
        console.log('App started');
    });


When we enable the _responseTime_ middleware, Express sends the time taken to process a request in the HTTP response header (__X-Response-Time__). You can see it highlighted in the preceding screenshot.

![express-response-time.png](http://johnnyimages.qiniudn.com/express-response-time.png)

Now let's try using the _errorHandler_ middleware.

Edit app.jsto include the middleware and generate the error:

    var http = require('http');
    var express = require('express');
    var app = express();
    app.set('view engine', 'jade');
    app.set('views', './views');
    app.use(express.static('./public'));
    app.use(express.responseTime());

    // Add the errorHander middleware
    app.use(express.errorHandler());
    app.get('/', function(req, res) {
        // Call an undefined function to generate an error
        fail();
    });

    http.createServer(app).listen(3000, function() {
        console.log('App started');
    });

Restart the server and load the home page, you'll get an error message, as shown in the following screenshot:


![express-response-time.png](http://johnnyimages.qiniudn.com/express-error-handle.png)

In fact, you can confirm it is not HTML by looking at the source code. Why is the errorHandlermiddleware not working?  The most important requirement of errorHandler is that it should be added after the routermiddleware. No wonder it didn't work as expected.

so let's modify app.jsto include the `router` middleware explicitly:

    // ...
    app.use(express.static('./public'));
    app.use(express.responseTime());

    // Explicitly add the router middleware
    app.use(app.router);

    // Add the errorHander middleware
    app.use(express.errorHandler());
    // ...

Now restart the server, refresh the home page, and see the output:

![express-response-time.png](http://johnnyimages.qiniudn.com/express-error-handler-rooter.png)

### Empowering Express with Node modules

You can find a huge list of Node modules at <https://github.com/ joyent/node/wiki/Modules>. From the command line, you can use the `npm search` command or use a module such as `npm-searchor` `npm-research` to search for modules of your interest.

We will install a .inifile parsing module named iniparserand use it in our app:

    $ npm install iniparser

Create config.iniin the app directory with the following content:

    title = My Awesome App
    port = 3000
    message = You are awesome!

Now edit `app.js` to include the module and use it in our app:

    // ...
    var app = express();

    // Load the iniparser module
    var iniparser = require('iniparser');

    // Read the ini file and populate the content on the config object
    var config = iniparser.parseSync('./config.ini');

    // ...

    app.get('/', function(req, res) {
        // Pass two config variables to the view
        res.render('index', {title:config.title, message:config.message});
    });

    http.createServer(app).listen(config.port, function() {
        console.log('App started on port ' + config.port);
    });

Go ahead and edit `index.jade` too:

    html
    head
        title #{title}
        script(src='javascripts/main.js')
        link(rel='stylesheet', href='stylesheets/style.css')
    body
        #content
        img(src='images/logo.png')
        p WELCOME
        p #{message}
        #smile

We actually don't need to use an .ini file for configuring our apps, as shown in a previous example. The purpose of the example was just to show you how to use a Node module, not the recommended practice. We will use configuration file below instead.

### logger

Express comes with a built-in logging module called logger, it can be a very useful tool while you are developing the app. You enable it like any other Express module:

    app.use(express.logger());

Without any options, the loggermiddleware will log a detailed log. You can customize the details with the following tokens in the formatoption of the loggermiddleware:

Token           | Content
----------------|---------
:req[header]    | The specific HTTP header of the request
:res[header]    | The specific HTTP header of the response
:http-version   | The HTTP version
:response-time  | How long it took to generate the response
:remote-addr    | The user agent's IP address
:date           | Date and time of request
:method         | The HTTP method used for making the request
:url            | The requested URL
:referrer       | The URL that referred the current URL
:user-agent     | The user-agent signature
:status         | The HTTP status

And this is how you specify the log format using the tokens:

    app.use(express.logger({ format: ':remote-addr :method :url' }));

After adding the loggermiddleware, you can see the log details in the console, when requests are made to the app:

    127.0.0.1 GET /
    127.0.0.1 GET /favicon.ico

By default the logger outputs the log to the console. We can make it log to a file by specifying the streamoption, as shown here:

    var http = require('http');
    var express = require('express');
    var fs = require('fs');
    var app = express();
    app.use(express.logger({
        format: 'tiny',
        stream: fs.createWriteStream('app.log', {'flags': 'w'})
    }));

The logger middleware supports four predefined log formats: default, short, tiny, and dev. You can specify one of them this way:

    app.use(express.logger('dev'));

### configuration

As a side effect of how require() works, Node supports JSON-based configuration files by default. Create a file with a JSON object describing the configurations, save it with a .json extension, and then load it in the app file using require().

Here is an example of a JSON-based config file:

    {
        "development": {
            "db_host": "localhost",
            "db_user": "root",
            "db_pass": "root"
        },
        "production": {
            "db_host": "192.168.1.9",
            "db_user": "myappdb",
            "db_pass": "!p4ssw0rd#"
        }
    }

This is how you would load it:

    var config = require('./config.json')[app.get('env')];

Usage:

    console.log(config.db_host); // 192.168.1.9
    console.log(config.db_user); // myappdb
    console.log(config.db_pass); // !p4ssw0rd#

## Router

Routes are defined using an HTTP verb and a path pattern. Any request to the server that matches a route definition is routed to the associated route handler. Route handlers are middleware functions, which can send the HTTP response or pass on the request to the next middleware in line. They may be defined in the app file or loaded via a Node module.

Even though a total of 13 HTTP verbs are supported by Express, you need not use all of them in your app. In fact, for a basic website, only GETand POSTare likely to be used.

While other Express middlewares are inherited from Connect, _router_ is implemented by Express itself. Connect-inherited middlewares are referred to in Express from the expressobject (express.favicon(), express.bodyParser(), and so on). The routermiddleware is referred to from the instance of the Express app (app.router).

There is a method called `app.all()` that is not based on an HTTP verb. It is an Express-specific method for listening to requests to a route using any request method:

    app.all('/', function(req, res, next) {
        res.set('X-Catch-All', 'true');
        next();
    });

Routes are defined only for the request path. GET query parameters are not and cannot be included in route definitions. Route identifiers can be string or regular expression objects.

You will mostly be using string-based routes in a general web app. Use regular expression-based routes only when absolutely necessary; while being powerful, they can often be hard to debug and maintain.

### String-based routes

String-based routes are created by passing a string pattern as the first argument of the routing method. They support a limited pattern matching capability. The following example demonstrates how to create string-based routes:

    // Will match /abcd
    app.get('/abcd', function(req, res) {
        res.send('abcd');
    });
    // Will match /acd
    app.get('/ab?cd', function(req, res) {
        res.send('ab?cd');
    });

    // Will match /abbcd
    app.get('/ab+cd', function(req, res) {
        res.send('ab+cd');
    });
    // Will match /abxyzcd
    app.get('/ab*cd', function(req, res) {
        res.send('ab*cd');
    });
    // Will match /abe and /abcde
    app.get('/ab(cd)?e', function(req, res) {
        res.send('ab(cd)?e');
    });

The characters ?, +, *, and () are subsets of their Regular Expression counterparts. The hyphen (-) and the dot (.) are interpreted literally by string-based route identifiers.

There is another set of string-based route identifiers, which is used to specify named placeholders in the request path. Take a look at the following example:
 
    app.get('/user/:id', function(req, res) {
        res.send('user id: ' + req.params.id);
    });
    app.get('/country/:country/state/:state', function(req, res) {
            res.send(req.params.country + ', ' + req.params.state);
    }

The value of the named placeholder is available in the req.params object in a property with a similar name. Named placeholders can also be used with special characters for interesting and useful effects, as shown here:
    
    app.get('/route/:from-:to', function(req, res) {
        res.send(req.params.from + ' to ' + req.params.to);
    });

The pattern-matching capability of routes can also be used with named placeholders. In the following example, we define a route that makes the _format_ parameter optional:

    app.get('/feed/:format?', function(req, res) {
        if (req.params.format) { res.send('format: ' + req.params.format); }
        else { res.send('default format'); }
    });


### regular-expression router

The following route will match pineapple, redapple, redaple, aaple, but not apple, and apples:

    app.get(/.+app?le$/, function(req, res) {
        res.send('/.+ap?le$/');
    });

The following route will match anything with an ain the route name:

    app.get(/a/, function(req, res) {
        res.send('/a/');
    });

### order of router precedence

Like in any middleware system, the route that is defined first takes precedence over other matching routes. So the ordering of routes is crucial to the behavior of an app.

In the following case, http://localhost:3000/abcdwill always print "abc*"

    app.get('/abcd', function(req, res) {
        res.send('abcd');
    });

    app.get('/abc*', function(req, res) {
        res.send('abc*');
    });

Route handler functions accept a third parameter, commonly named next, which refers to the next middleware in line.

    app.get('/abc*', function(req, res, next) {
        // If the request path is /abcd, don't handle it
        if (req.path == '/abcd') { 
            next(); }
        else { 
            res.send('abc*'); 
        }
    });

    app.get('/abcd', function(req, res) {
        res.send('abcd');
    });

### handle routers

So far, we have been dealing with a single callback function for a route, but a route can have more than one callback function.

    app.get('/',
        function(req, res, next) {
            res.set('X-One', 'hey!');
            next();
        },
        function(req, res, next) {
            res.set('X-Two', 'ho!');
            next();
        },
        function(req, res) {
            res.send("Let's go!");
        }
    );

This route handler stack is composed of three callbacks. The first two add two additional HTTP headers. You can see that the two functions have successfully added the HTTP headers, and the third is printed to the browser:

The callback functions can be passed in an array too.

    var one = function(req, res, next) {
        res.set('X-One', 'hey!');
        next();
    };

    var two = function(req, res, next) {
        res.set('X-Two', 'ho!');
        next();
    };

    app.get('/', [one, two], function(req, res) {
        res.send("Let's go!");
    });

You can achieve the same thing again by defining multiple routes for a route path. This is not really recommended, but it will help you to better understand how routes work:

    app.get('/', function(req, res, next) {
        res.set('X-One', 'hey!');
        next();
    });
    app.get('/', function(req, res, next) {
        res.set('X-Two', 'ho!');
        next();
    });
    app.get('/', function(req, res) {
        res.send('three');
    });


Showing the various ways of assigning callbacks to a route is not a recommendation in any manner; it is just to show you the possibilities.

### organize routes

So far, our routes and their handlers have been written right in the app file. It might work for small apps, but is not practical for bigger projects. There are three popular ways of organizing routes in an Express app; let's explore them.

#### Using Node modules

Create a directory named `handlers` to keep our route handlers. In the directory, create two basic Node modules: `index.js` and `users.js`.

Here is the content for index.js:

    exports.index = function(req, res){
        res.send('welcome');
    };

And, here is the content for users.js:

    exports.list = function(req, res){
        res.send('Amar, Akbar, Anthony');
    };

Create a new file called routes.jsin the app directory. This file will be responsible for loading the route handlers and defining the routes. Here is the content for the file:

    // Load the route handlers
    var routes = require('./handlers');
    var user = require('./handlers/users');
    module.exports = function(app) {
        // Define the routes
        app.get('/', routes.index);
        app.get('/users', user.list);
    };

Now modify the app.jsfile to incorporate the new changes we have made:

    var http = require('http');
    var express = require('express');
    var app = express();

    // Explicitly add the router middleware
    app.use(app.router);

    // Pass the Express instance to the routes module
    var routes = require('./routes')(app);
    http.createServer(app).listen(3000, function() {
        console.log('App started');
    });

#### Namespaced routing

Express does not support namespaced routing by default, but it is very easy to enable support by installing a Node module called express-namespace:

    $ npm install express-namespace

Now, edit app.jsto include express-namespaceand redefine the routes using namespaces:

    var http = require('http');
    var express = require('express');
    // express-namespace should be loaded before app is instantiated
    var namespace = require('express-namespace');
    var app = express();
    app.use(app.router);
    app.namespace('/articles', function() {
        app.get('/', function(req, res) {
            res.send('index of articles');
        });
        app.get('/new', function(req, res) {
            res.send('new article');
        });
        app.get('/edit/:id', function(req, res) {
            res.send('edit article ' + req.params.id);
        });
        app.get('/delete/:id', function(req, res) {
            res.send('delete article ' + req.params.id);
        });
        app.get('/2013', function(req, res) {
            res.send('articles from 2013');
        });

        // Namespaces can be nested
        app.namespace('/2013/jan', function() {
            app.get('/', function(req, res) {
                res.send('articles from jan 2013');
            });
            app.get('/nodejs', function(req, res) {
                res.send('articles about Node from jan 2013');
            });
        });
    });

    http.createServer(app).listen(3000, function() {
        console.log('App started');
    });

Restart the app and load the following URLs in your browser to see namespaced routing in action:

- http://localhost:3000/articles/
- http://localhost:3000/articles/edit/4
- http://localhost:3000/articles/delete/4
- http://localhost:3000/articles/2013
- http://localhost:3000/articles/2013/jan
- http://localhost:3000/articles/2013/jan/nodejs

Namespaces support all the pattern matching and regular expression support we read earlier, so the flexibility and power of defining routes is not compromised by using namespaced routing.

Although we used `app.get()` for defining all the routes for the sake of simplicity, it is not recommended to actually do so in production. Doing so can leave the resources of your app open to deletion via the most basic and unexpected actions, even by web spiders. Use app. `delete()` instead, with authentication.

#### Resourceful routing

The idea behind resourceful routing is to create routes based on actions available on objects called resources on the server. Resources are entities such as users, photos, forums, and so on on the server.

Resourceful routes are defined using a recommended combination of HTTP verbs and path patterns. Corresponding methods are defined in the route handling Node module to perform the necessary actions in the server.

The following table illustrates resourceful routing for a resource called users in the server:

HTTP Verb |  Path        | Module Method    |   Description
----------|--------------|------------------|---------------
GET       |  /users      | index            |   Lists users
GET       |  /users/new  | new              |   The form to create a new user
POST      |  /users      | create           |   Processes new user form submission
GET       |  /users/:id  | show             |   Shows user with ID :id
GET       |  /users/:id/ | edit             |   Edit Form to edit user with ID :id
PUT       |  /users/:id  | update           |   Processes user edit form submission
DELETE    |  /users/:id  | destroy          |   Deletes user with ID :id

Resourceful routing is not supported by Express by default. However, enabling it is as easy as installing a Node module named __express-resource__:

    $ npm install express-resource

Next, we need to create a Node module to handle the resourceful routes. Create a file called `users.js` and implement the resourceful methods in it:

    exports.index = function(req, res) {
        res.send('index of users');
    };
    exports.new = function(req, res) {
        res.send('form for new user');
    };
    exports.create = function(req, res) {
        res.send('handle form for new user');
    };
    exports.show = function(req, res) {
        res.send('show user ' + req.params.user);
    };
    exports.edit = function(req, res) {
        res.send('form to edit user ' + req.params.user);
    };
    exports.update = function(req, res) {
        res.send('handle form to edit user ' + req.params.user);
    };
    exports.destroy = function(req, res) {
        res.send('delete user ' + req.params.user);
    };

Now modify app.jsto use the express-resourcemodule and load the 
route-handling Node module:

    var http = require('http');
    var express = require('express');

    // Load express-resource BEFORE app is instantiated
    var resource = require('express-resource');
    var app = express();
    app.use(app.router);

    // Load the resourceful route handler
    app.resource('users', require('./users.js'));
    http.createServer(app).listen(3000, function() {
        console.log('App started');
    });

Start the app and load the following URLs in your browser to see the resourceful route handlers print the assigned messages:

- http://localhost:3000/users
- http://localhost:3000/users/new
- http://localhost:3000/users/7
- http://localhost:3000/users/7/edit

## Response From the Server


Express can send an HTTP response using one of its response methods: `res.send()`, `res.json()`, `res.jsonp()`, `res.sendfile()`, `res. download()`, `res.render()`, or `res.redirect()`. If none of them is called, the request will be left hanging till the connection times out. If more than one response methods are specified in a route handler, only the first method will take effect, the rest will generate non-fatal, run-time errors.


### http response

The data sent by an HTTP server in response to a request is called an __HTTP response message__. It is composed of a status code, headers, and optional associated data, which is technically referred to as the body of the message.

![http-response.png](http://johnnyimages.qiniudn.com/http-response.png)

The body is presented to the user as plain text, rendered HTML, image, file download, and so on. The status code and the headers are hidden from a regular user, but the browser requires them to process the body appropriately.

#### HTTP status codes

Following is a list of all the HTTP status codes for your information and general knowledge:

- 1xx The 1xx series of status codes is classified as __Informational__, and is used for conveying provisional response from the server. 

    The available codes in this series are: 100, 101, and 102.

- 2xx The 2xx series of status codes is classified as __Success__, and is used for conveying a 
successful request for a resource on the server.

    The available codes in this series are: __200__, 201, 202, 303, 204, 205, 206, 207, 208, 250, 
and 226.

- 3xx The 3xx series of status codes is classified as __Redirection__, and is used for information 
by the user agent about taking additional action to retrieve the requested resource.

    The available codes in this series are: 300, 301, 302, 303, 304, 305, 306, 307, and 308.

- 4xx The 4xx series of status codes is classified as __Client Error__, and is used for informing the user agent of its erroneous requests to the server.

    The available codes in this series are: __400__, 401, 402, 403, 404, 405, 406, 407, 408, 409, 
410, 411, 412, 413, 414, 415, 416, 417, 422, 423, 424, 425, 426, 428, 429, 431, 444, 449, 
450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 494, 495, 496, 497, and 499.

- 5xx The 5xx series of status codes is classified as Server Error, and is used for informing the user agent that the server has encountered an error because of which the request was not fulfilled. 

    The available codes in this series are: 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 551, 598, and 599.

#### HTTP response headers

HTTP response headers (often referred to as just headers) are key-value pairs sent after the HTTP status code in a HTTP message. These headers are used for conveying various important pieces of information from the server to the user agent.

The following is an example of headers sent by a web server:

    X-Powered-By: Express
    Accept-Ranges: bytes
    ETag: "819254-1356021445000"
    Date: Mon, 11 Mar 2013 21:19:05 GMT
    Cache-Control: public, max-age=0
    Last-Modified: Thu, 20 Dec 2012 16:37:25 GMT
    Content-Type: image/gif
    Content-Length: 819254
    Connection: keep-alive

#### Media types

Media type describes the kind of data that is being transferred over the Internet protocol; in our case it would be the HTTP protocol. Media Type is also commonly referred to as MIME Typeor Content Type. You can read more about them at <http://www. iana.org/assignments/media-types>.

Whenever an HTTP server sends a response, it also specifies what kind of data it is sending via the Content-Typeheader, which is shown in the following screenshot:

![http-content-type.png](http://johnnyimages.qiniudn.com/http-content-type.png)

The Content-Typeheader can have an optional parameter, which specifies the encoding for the data being transferred. On the Web, this parameter is most commonly applicable to string data, such as plain text, HTML, and JSON:

    Content-Type: text/html; charset=iso-8859-1

UTF-8 is the most popular encoding format on the Web, and is the default in JavaScript, Node, and Express.


### Setting the HTTP status code

In the following example, we send a status code of 404 even though the home page route actually exists. If we hadn't specified 404, Express would have sent a status code of 200:

    app.get('/', function(req, res) {
        // Set the status
        res.status(404);

        // Specify the body
        res.send('forced 404');
    });

`res.status()` is a chainable method, meaning we can do things like the following:

    app.get('/', function(req, res) {
        // Status and body in one line
        res.status(404).send('not found');
    });

When a status code is not specified, a default of 200 is assigned.

When a number alone is passed to res.send(), it is assumed to be the intended status code. The server will just send the status code and the basic headers, with no body:

    app.get('/', function(req, res) {
        res.send(404);
    });

And of course, you can set the status code and the body at the same time, like so:

    app.get('/', function(req, res) {
        res.send(404, 'not found');
    });

It is important to note that res.render(), res.sendfile(), and res.download() do not accept a single numeric parameter and send a response with just the status code.

### Setting HTTP headers

In the following example, we set a standard HTTP header along with two 
custom headers:

    app.get('/', function(req, res) {
        // status is optional, it defaults to 200
        res.status(200);
        res.set('Content-Type', 'text/plain; charset=us-ascii');
        res.set('X-Secret-Message', 'not really secret');
        res.set('X-Test', 'OK');
        res.send('welcome');
    });

Note that HTTP header key names are case-insensitive from the browser's context—Content-Typeand content-typeare both interpreted as the same thing.

If the process of individually setting the headers seems tedious to you, you can use the alternative approach of passing an object to res.set()instead. The key-value pair in the object will be assigned as the header and its value in the HTTP response message:

    app.get('/', function(req, res) {
        res.set({
            'Content-Type': 'text/plain; charset=us-ascii',
            'X-Secret-Message': 'not really secret',
            'X-Test': 'OK'
        });
        res.send('welcome');
    });

Very related to setting HTTP headers, Express provides a res.charsetproperty, which can be used to set the value of the optional Content-Typeheader. This property is best used when you just want to change the charset of the default Content-Typeof text/html.

The following code will set the Content-Typeheader to text/html; charset=us-ascii:

    app.get('/', function(req, res) {
        res.charset = 'us-ascii';
        res.send('welcome');
    });

### Sending data

The component of an HTTP response message, which users can generally see and interact with, is called the body of the message. The body can come in many different forms—as HTML, plain text, images, binary files, CSS files and so on—and the Content-Typeheader is exclusively used to convey to the user agent what sort of data it is dealing with.

#### Plain text

Let's create a very simple route handler for the home page route. Our intention is to see the HTML tags as is in the browser:

    app.get('/', function(req, res) {
        res.send('<h1>welcome</h1>');
    });

The browser actually rendered the output as HTML. Maybe you expected it, or maybe you did not; but we need to get to the root of this behavior. The browser interpreted the output as HTML and rendered it accordingly, because the default value of the Content-Typeheader in Express is text/html.

However, we wanted the browser to treat the output as plain text and not bother rendering it as HTML.

Using our newfound knowledge of HTTP headers and Express' res.set()method, we can set the Content-Typeheader to text/plain. Update the code accordingly to confirm our assumption:

    app.get('/', function(req, res) {
        res.set('Content-Type', 'text/plain');
        res.send('<h1>welcome</h1>');
    });

This time the content was really treated as plain text, like how we wanted. When the Content-Typeis set to text/plain, the browser will render the body as plain text—this is the case even for binary files.

#### HTML

Being an HTTP server, sending the content as HTML is the default behavior of Express. Anything you send via `res.send()` or `res.render()` is sent as HTML by setting the Content-Typeheader to text/html.

    app.use(express.static('./public'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    // HTML should be prettified
    app.locals.pretty = true;
    app.get('/', function(req, res) {
        res.render('index', {
            title: 'Express'
        });
    });

The generated HTML will now be pretty-printed. However, in a production environment it is best not to prettify HTML to save some processing power and reduce the download size of the HTML page.

#### JSON

Express provides the res.json()method for serving JSON content. You just have to pass an object to it, and it will take care of setting the up right headers and formatting the JSON string according to the JSON specifications.

Create this route for the home page:

    app.get('/', function(req, res) {
        res.json({message: 'welcome'});
    });

`res.json()` has successfully transformed the JavaScript object to a valid JSON string and set the appropriate HTTP headers for the message.

Like other response methods, `res.json()` sets a default of 200 when no status code is explicitly set. You can customize the status code by passing a number as the first parameter of res.json(), followed by the object to be sent:

    res.json(404, {error: 'not found'});

#### JSONP

JSON with Padding(JSONP) is a JavaScript technique to allow cross-domain scripts to execute callbacks from JSON requests made to an external domain.

A JSONP request comes with a GETrequest parameter, conventionally named callback, which is the callback function available at the website making the request, which will be executed by passing the JSON result from the external domain.

Let's define the route of the home page to respond with res.jsonp():

    app.get('/', function(req, res) {
        res.jsonp({message: 'welcome'});
    });

Start the server, load `http://localhost:3000/?callback=json_callback` in your browser, and examine the result:

![express-json-callback.png](http://johnnyimages.qiniudn.com/express-json-callback.png)

Not only did `res.jsonp()` wrap the JSON result with the callback function, it also added a quick check for the existence of the callback on the client machine before executing the callback. Also, it set the Content-Typeheader to the appropriate `text/javascript` content type so that the browser interprets the result as JavaScript.

By default, res.jsonp()expects the name of the callback parameter to be named callback, but it can be renamed to anything you like using the app.set()method, as shown here:

    app.set('jsonp callback name', 'cb');

Now the callback name will be expected to be found in the GETparameter named cb. If the callback name is not found in the expected GETparameter, only the JSON object will be sent, without the callback padding.

#### Serving static files

Create a directory named filesin the app directory, keep the files in the directory, and add the following to the app file:

    // Use the static middleware to set up a static files directory
    app.use(express.static('./public'));

Now you can access all the files in the directory from the root of the website. This is how static files for the app, such as CSS, JavaScript, and image files are served in Express.

If you have a file named logo.pngin the filesdirectory, you can access it at <http://localhost:3000/logo.png>. Any file or subdirectory you create in the filesdirectory will also be correspondingly accessible from the app.

In a web server context, public files and directories can be accessed via a URL, whereas private files and directories are those that are not exposed to the general public via a URL.

There is another category of files that can be served by a web server—those that are served dynamically—the requests to which you can apply programming logic. Express provides two methods of handling such requests: `res.sendfile()` and `res.download()`. Let's examine them one after another.

Using `res.sendfile()`, you can send files to the browser in the same manner as how regular files are sent to it. The Content-Type header is automatically set based on the file extension, and depending on the file type and browser settings, the file may be shown in the browser, displayed by a plugin, prompted for download, and so on.

The following is a very simple example of using res.sendfile():

    app.get('/file', function(req, res) {
        res.sendfile('./secret-file.png', function(err) {
            if (err) { 
                condole.log(err); 
            }
            else { 
                console.log('file sent'); 
            }
        });
    });

On loading <http://localhost:3000/file>, and examining the HTTP headers, we will find that no information about the actual name or location of the file was sent to the browser.

There are times when you want the user to actually download the file, and not let the browser try to render it. This can be achieved using the res.download()method. `res.download()` requires the target file path, and accepts the optional desired filename and callback function for the download:

app.get('/download', function(req, res) {
    res.download('./secret-file.png', 'open-secret.png', function(err) {
        if (err) { condole.log(err); }
        else { console.log('file downloaded'); }
    });
});

If you examine the HTTP headers for this response, you will find that the ContentDispositionheader has been set to attachment, because of which the file is being 
prompted for download or being downloaded:

![express-download.png](http://johnnyimages.qiniudn.com/express-download.png)

#### Serving error pages

The routermiddleware comes with a default 404 error handler, but its output may not be what you would want for your app. Let's find out how to create a custom 404 error handler.

A 404 error handler is technically a generic route handler that handles a request that all other middleware before it has failed to handle. It is implemented by adding a custom middleware at the end of the Express middleware stack.

Add the following middleware code after the routermiddleware:

    app.use(function(req, res) {
        res.status(400);
        res.render('404.jade', {
            title: '404',
            message: 'File Not Found'
        });
    });

When the in-built 404 error handler detects that there is a route handler even beyond it, it will pass on the request to the next handler, which would be our custom 404 error handler.

In the viewsdirectory, create a file named `404.jade` with the following content:

    doctype 5
    html
        head
            title #{title}
        body
            h1 #{title}
            p #{message}


Express also comes with a default 500 error handler that will pass on the control to the next error handler, if there is one beyond it. The 500 error is handled by adding a middleware with an arity of four. Since we want to override the default 500 error handler provided by the routermiddleware, we would need to add our handler after the routermiddleware.

Add the following middleware after the routermiddleware:

    app.use(function(error, req, res, next) {
        res.status(500);
        res.render('500.jade',{
            title: '500',
            error: error
            }
        );
    });

Now create the corresponding 500.jadeview file in the viewsdirectory:

    doctype 5
    html
        head
            title #{title}
        body
            h1 #{title}
            p #{error}

#### Content negotiation

Content negotiation is the mechanism of specifying the data types a user agent is capable of consuming and prefers, and the server fulfilling the request when it can, and informing when it cannot.

User agents send their preferred content type for a resource using the AcceptHTTP request header. Express supports content negotiation using the `res.format()`method. 

This is a useful feature if you want to send different types of content based on the capability of the user agent. `res.format()` accepts an object whose keys are the canonical content type name (text/plain, text/html, and so on), and whose values are functions that will be used as the handler for the route, for the matching content type. Let's implement content negotiation in the home page route handler to find out how it works:

    app.get('/', function(req, res) {
        res.format({
            'text/plain': function() {
                res.send('welcome');
            },
            'text/html': function() {
                res.send('<b>welcome</b>');
            },
            'application/json': function() {
                res.json({
                    message: 'welcome'
                });
            },
            'default': function() {
                res.send(406, 'Not Acceptable');
            }
        });
    });

The server will respond with the appropriate data type based on the Accept header. This fact can be verified by sending an Acceptheader of text/sgml, application/json.

If a user agent does not support any of thespecified formats in the handler, the server will return a status of 406 Not Acceptable.

The previous code can be re-written in a less verbose manner by using just the subtype of the content type as the key:

    res.format({
        text: function() {
            res.send('welcome');
        },
        html: function() {
            res.send('<b>welcome</b>');
        },
        json: function() {
            res.json({
                message: 'welcome'
            });
        },
        default: function() {
            res.send(406, 'Not Acceptable');
        }
    });

#### Redirecting a request

Sometimes you may want to redirect the request to a different URL, instead of responding with data. This is made possible in Express using the res.redirect() method. This method takes an optional redirection code that defaults to 302, and the URL to redirect to. The URLparameter can be an absolute URL or relative to the current URL. 

The following are some examples of redirecting requests from an Express app:

Code                                     |   Description
-----------------------------------------|--------------------
res.redirect('/notice');                 |   302 redirection to / noticerelative to the requested URL
res.redirect(301, '/help-docs');         |   301 redirection to / help-docsrelative to the requested URL
res.redirect('http://nodejs.org/api/');  |   301 redirection to an absolute URL
res.redirect('../images');               |   302 redirection to / noticerelative to the requested URL

## Forms, Cookies, and Sessions

The HTML form provides two methods for submitting data to the backend using the GET and the POST methods. In this section, we will find out how to read data submitted via these methods.

GET forms are submitted using the GET HTTP method and the form data is sent in the query string of the URL specified in the actionattribute of the form. POST forms are submitted using the POST HTTP method and the form data is sent in the body of the HTTP request. POST forms come in two varieties: application/x-www-form-urlencodedand multipart/form-data. The former uses urlencodedstring for sending data to the server; it is a lot like the GET query string, except the data is sent in the HTTP body. The latter uses a deliminator to send large chunks of data in the HTTP body, and is the version that is used for uploading files.

### Handling GET submissions

Let's create a route and view for a search form. We will set this form to be submitted 
via the GET method by specifying it in its method attribute:

    !!! 5
    html
    head
        title #{title}
        link(rel='stylesheet', href='/stylesheets/style.css')
    body
        h1 #{title}
        p Enter the name to search for.
        form(action='/search-result', method='get')
            label Name
            input(type='text', name='name')
            input(type='hidden', name='source', value='web')
            input(type='submit', value='Search')

Create an appropriate CSS file for the view. The rendered HTML of the Jade view is shown in the following screenshot:

![express-form-get.png](http://johnnyimages.qiniudn.com/express-form-get.png)

When the form is submitted, the browser will be redirected to its action URL with the query string, which might look like <http://localhost:3000/searchresult?name=Captain&source=web>.

__Reading form data__

All form data submitted via the GET method is available in the queryproperty of the request object (req.query), at their corresponding keys. For example, if the form had a parameter named color, its value will be available at req.query.color, and so on.

Trying to read a non-existent key will return undefined, because we are dealing with regular JavaScript objects, and that's the expected behavior. Let's create a route to handle our form submission. We won't render a view or do anything fancy, let's just read the values and print them:

    app.get('/search-result', function(req, res) {
        var name = req.query.name;
        var source = req.query.source;
        console.log('Searching for: ' + name);
        console.log('From: ' + source);
        res.send(name + ' : ' + source);
    });

In case, a GET parameter contains characters that cannot be used as a JavaScript identifier name, you can use a subscript notation to read the value: 

    var firstname = req.query['first name'];

When it comes to data, GET form submissions are nothing more than URLs with query strings constructed out of the form parameters.

Here is an example of a manually-crafted query string:

    http://localhost:3000/search-result?q=JavaScript&l=CA&e=10

And here is the route and the handler, which reads the data from the previous query string:

    app.get('/search-result', function(req, res) {
        var q = req.query.q;
        var l = req.query.l;
        var e = req.query.e;
        console.log('Query:' + q);
        console.log('Location:' + l);
        console.log('Experience:' + e);
        res.json(req.query);
    });

__Handling multiple options__

Let's create a view with multiple checkboxes. Notice how all of them share a common value for the nameattribute. The form will be submitted to <http:// localhost:3000/skills-search-result>.

    !!! 5
    html
    head
        title #{title}
        link(rel='stylesheet', href='/stylesheets/style.css')
    body
        h1 #{title}
        p Select the skills to search for.
            form(action='/skills-search-result', method='get')
            h3 Skills
            ul
                li
                    input(type='checkbox', name='skills', value='Nunchucks')
                    label Nunchucks
                li
                    input(type='checkbox', name='skills', value='Hacking')
                    label Hacking
                li
                    input(type='checkbox', name='skills', value='Dancing')
                    label Dancing
                li
                    input(type='checkbox', name='skills', value='Shooting')
                    label Shooting
            input(type='submit', value='Search')

And here is the rendered HTML:

![express-form-get.png](http://johnnyimages.qiniudn.com/express-form-muilti-checkbox.png)

Now, let's create the route for handling the form submission. The skillsparameter will be available as expected at req.query.skills:

    app.get('/skills-search-result', function(req, res) {
        var skills = req.query.skills;
        console.log('Skills: ');
        skills.forEach(function(skill, i) {
            console.log((i + 1) + '. ' + skill);
        });
        res.json(req.query.skills);
    });

Submitting multiple options is all about setting a common value for the name attribute for the set of checkboxes.

### Handling POST submissions

Unlike GET submissions, which can be processed right out of the box, we need to enable a built-in middleware named bodyParserbefore we can process POST submissions.

Load the bodyParser middleware before the routermiddleware to enable POST data handling:

    app.use(express.bodyParser());

Although, the bodyParsermiddleware can be initialized without any parameters, it accepts an optional object with two options that can be used to configure file uploads:

- keepExtensions Whether to include the file extension in temporary files. Defaults to false, so as not to overwrite a file with the same name.
- uploadDir The location where temporary files should be uploaded.

Here is an example of enabling both the options:

    app.use(express.bodyParser({
        keepExtensions: true,
        uploadDir: './uploads'
    }));

With the bodyParsermiddleware enabled, we are ready to parse the data submitted by POST forms.

__Reading form data__

The `bodyParser` middleware will add two new properties: bodyand fileson the request object and populate them with the key-value pairs of the parameters submitted via the POST request. 

Text data from the form is populated in the `req.body` object and files from the form are populated in the req.filesobject.

#### Handling text-only forms

When you don't specify the encytype attribute of a form, it is sent to the server with the default Content-Type of `application/x-www-form-urlencoded`.

Create a route and the view for a sign-up form:

    !!! 5
    html
        head
        title #{title}
        link(rel='stylesheet', href='/stylesheets/style.css')
    body
        h1 #{title}
        p Enter your name and email address to become a member.
        form(action='/signup', method='post')
            div
                label Name
                input(type='text', name='name')
            div
                label Email
                input(type='text', name='email')
            div
                input(type='submit')

Notice that we have omitted the enctypeattribute in the form. Here is the rendered view:

![express-form-submit.png](http://johnnyimages.qiniudn.com/express-form-submit.png)

Let's create the request-handling route for the form. The text data submitted via the form will be available in the `req.body` object:

    app.post('/signup', function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        console.log('Name: ' + name);
        console.log('Email: ' + email);
        res.json(req.body);
    });


#### Handling file uploads

To upload files using HTML forms, we need to set the `enctype` attribute of the form to multipart/form-data, and of course, include an input element of the type file.

Let's update the previous sign-up view to set the enctypeattribute and include a file input:

    // ...
    form(action='/signup', method='post', enctype='multipart/formdata')
    // ...
    div
        label Profile Image
        input(type='file', name='profile_image')
    // ...

When the form is submitted, the uploaded image will be found in the `req.files` object.

    app.post('/signup', function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        console.log(req.files);
        res.json(req.files);
    });

In the console and the browser, you will see an object with a single property named profile_image, which was the name of our image, with a number of properties.

The following are must-knows to be able to work with file uploads in Express:

Property    |    Description
------------|--------------------
size        |    Size of the file in kilobytes
path        |    Temporary location of the uploaded file
name        |    Name of the file as uploaded
type        |    Media type of the file

Express does nothing apart from giving it random names and moving it to a temporary location. It is the developer's responsibility to actually move the uploaded files to the right location, rename if necessary, resize, and so on.

look like /tmp/4e552b0243d20a171f287a687d744b45and so on, with no extensions. If you want to preserve the extension, set the keepExtension property to true.

    app.use(express.bodyParser({keepExtensions: true}));

Since we will need to perform filesystem actions, we will need to include the fsmodule:

    var fs = require('fs');

Next, we will modify the route handler. Make sure to include the callback function (next), because we need it for handling any errors that might be encountered:

    app.post('/signup', function(req, res, next) {
        var name = req.body.name;
        var email = req.body.email;

        // Reference to the profile_image object
        var profile_image = req.files.profile_image;
        
        // Temporary location of the uploaded file
        var tmp_path = profile_image.path;
        
        // New location of the file
        var target_path = './public/images/' + profile_image.name;
        
        // Move the file from the new location
        // fs.rename() will create the necessary directory
        fs.rename(tmp_path, target_path, function(err) {
            // If an error is encountered, pass it to the next handler
            if (err) {
                next(err);
            }
        
            // Delete the temporary file
            fs.unlink(tmp_path, function() {
                // If an error is encountered, pass it to the next handler
                if (err) {
                    next(err);
                }
        
                console.log('File uploaded to: ' + target_path + ' - ' +
                    profile_image.size + ' bytes');
                res.redirect('/images/' + profile_image.name);
            });
        });
    });

__Note：__The updated route handler will print some details about the file on the console and redirect the browser to the uploaded file, if everything goes successfully.

A reference is created in the req.filesobject for each uploaded file. If you upload multiple files in a form, all of them will have a reference in this object. You can process them all by looping through the req.filesobject: 

    req.files.forEach(function(file) {
        // Code to handle the file
        ...
    });

Although files are uploaded to the system's temporary directory, we can change the default behavior by setting the value of uploadDirto any location of our choice:

    app.use(express.bodyParser({uploadDir:'./uploads'}));

Express won't create the upload directory for you if it does not exist already, instead, it will throw an error. So make sure you create the directory before uploading files, when you set the uploadDiroption.

Here is the code snippet for setting the uploadDiroption and creating the upload directory, if it does not exist already:

    var upload_dir = './uploads';
    var exists = fs.existsSync(upload_dir);
    if (!exists) {
        fs.mkdirSync(upload_dir);
    }

    app.use(express.bodyParser({uploadDir: upload_dir}));

It is important to note that the files uploaded to the temporary directory would eventually be cleared by the OS, but when using a custom upload directory, it is the developer's responsibility to clear the temporary files.

### Using cookies to store data

Cookies can be created by the server backend or the frontend JavaScript. They can then be read or updated by either one of them.

Express provides a cookie API using the `cookieParse` rmiddleware. To enable the cookie functionality in Express, load it before the routermiddleware:

    app.use(express.cookieParser());

The `cookieParser` middleware must be loaded before the router middleware; else cookie functionality will not be enabled.

With this middleware enabled, you can find the cookies sent by the browser in the `req.cookies` object, and set cookies using the `res.cookie()` method.

#### Creating cookies

Cookies are created using the `res.cookie()` method. You pass it the name of the cookie, its value, and an optional object with the cookie options. Let's create a route named counterand use the `res.cookie()` method to create a cookie if it is not there already, and increment its value if it exists already.

    app.get('/counter', function(req, res) {
        var count = req.cookies.count || 0;
        count++;
        res.cookie('count', count);
        res.send('Count: ' + count);
    });

Load `http://localhost:3000/counter` in your browser and keep refreshing it to see the cookie created and its value being incremented:

![express-cookie.png](http://johnnyimages.qiniudn.com/express-cookie.png)

The `res.cookie()` method accepts an optional cookie options object. The following table displays a list of possible options that can be specified:

Option   |   Description
---------|-------------------
domain   |   Domain name for the cookie. Defaults to the domain name loaded.
path     |   Path for the cookie. Defaults to "/".
secure   |   Marks the cookie to be used with HTTPS only.
expires  |   Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
maxAge   |   Convenient option for setting the expiry time relative to the current time in milliseconds.
httpOnly |   Flags the cookie to be accessible only to the web server. It helps 
prevent  |   XSS attacks by disallowing client-side JavaScript access to it.
signed   |   Indicates if the cookie should be signed. Signed cookies cannot be tampered with without invalidating them.

Here is an example of setting a cookie with some options:

    res.cookie('count', count, {
        path: '/counter',
        maxAge: 2000
    });

#### Other operation on cookies

All cookies valid for the domain and path are available on the `cookies` property of the request object: `req.cookies`. For example, if you created a cookie called `count`, its value will be available on `req.cookies.count`.

Updating a cookie is just about re-creating it with a new set of properties. Assuming we already created a cookie named counter, this is how we would update it:

    res.cookie('counter', new_value);

We can use `res.clearCookie()` method to delete cookies any time.

Here are some examples of creating cookies and the corresponding methods of deleting them:

Create                                        |  Delete
----------------------------------------------|-------------
res.cookie('count', 99);                      |  res.clearCookie('count');
res.cookie('count', 99, {path: '/ counter'}); |  res.clearCookie('count', {path: '/counter'});
res.cookie('count', 99, {sign: true});        |  res.clearCookie('count');

#### Session cookies

Session cookies are those that last for a browsing session and are discarded after the browser is closed. Session cookies are deleted when the browser is closed; other cookies are deleted when the expiry date is reached.

If you have set your browser to remember the tabs that were open when you re-launch it, session cookies may not be deleted on closing the browser.

When the `expires` option is not specified, Express creates a session cookie:

    res.cookie('name', 'Napoleon');

Setting the `expires` option to 0 also creates a session cookie:

    res.cookie('name', 'Napoleon', {expires: 0});

#### Signed cookies

Signed cookies are those that come with a signature attached to its value. The signature is generated using a secret string, which you can specify in the `cookieParser` middleware. When such cookies are manually tampered with, it is detected and they are invalidated. To create a signed cookie, pass a string to the `cookieParser` middleware while instantiating it. Signed cookies are not encrypted or hidden from the user's view. They just have a signature associated with the value that can be used to ensure the cookie values are not tampered with. The secret passed to the cookieParsermiddleware is used to generate a signature for the original cookie value and the value submitted back by the browser; if the values don't match, it is understood that the value has been tampered with.

    app.use(express.cookieParser('S3CRE7'));

Signed cookies are located in a special object called `signedCookieson` the request object. Don't make the mistake of looking for them in the cookiesproperty of the request object.

Here is an example of signing and retrieving a signed cookie:

    app.get('/counter', function(req, res) {
        var count = req.signedCookies.count || 0;
        count++;
        res.cookie('count', count, { signed: true });
        res.send('Count: ' + count);
    });

Start the app and load <http://localhost:3000/counter> to see the signed cookie getting created, read, and updated. To test the fact that it can detect tampering, use a cookie-editing browser extension and try editing its value:

![express-signed-cookie.png](http://johnnyimages.qiniudn.com/express-signed-cookie.png)

### Using sessions to store data

There are two broad ways of implementing sessions in Express: using cookies and using a session store at the backend. Both of them add a new object in the request object named session, which contains the session variables.

No matter which method you use, Express provides a consistent interface for interacting with the session data.

#### Cookie-based sessions

Using the fact that cookies can store data in the user's browser, a session API can be implemented using cookies. Express comes with a built-in middleware called `cookieSession` that does just that.

Load the `cookieParser` middleware with a secret, followed by the `cookieSession` middleware, before the router middleware. The `cookieSession` middleware is dependent on the `cookieParser` middleware because it uses a cookie for storing the session data.

The `cookieParser` middleware should be initialized with a secret, because `cookieSession` needs to generate a signed `HttpOnly` cookie for storing the session data. If you don't specify a secret for cookieParser, you will need to specify the secret option of cookieSsession.

The following is a code for enabling sessions in Express using the cookieSession middleware:

    app.use(express.cookieParser('S3CRE7'));
    app.use(express.cookieSession());
    app.use(app.router);

Once the session API is enabled, session variables can be accessed on the session object on the request object: req.session.

Cookie-based sessions work great for simple session data. However, it doesn't work well with large, complicated, and sensitive data because the session data is visible to the user. There is a limit on the size of cookies a browser can store, and multiple large size cookies can affect the performance of the website.

#### Session store-based sessions

The `session` middleware provides a way of creating sessions using session stores. Like cookieSession, the `session` middleware is dependent on the cookieParser middleware for creating a signed HttpOnlycookie.

Initializing the sessionmiddleware is a lot like initializing cookieSession—we first load cookieParserwith a secret, and load the session middleware before the router middleware:

    app.use(express.cookieParser('S3CRE7'));
    app.use(express.session());
    app.use(app.router);

The sessionmiddleware accepts an options object that can be used for defining the options of the middleware. The following are the supported options:

Option    |  Description
----------|--------------------
key       |  Name of the cookie. Defaults to connect.sid.
store     |  Instance of a session store. Defaults to MemoryStore. The session 
store     |  may support options of its own.
secret    |  Secret for signing session cookie. Required if not passed to cookieParser().
cookie    |  Session cookie settings. Regular cookie defaults apply.
proxy     |  To trust the reverse proxy or not. Defaults to false.

Here is an example of initializing the session middleware with some options:

    app.use(express.session({
        key: 'app.sess',
        store: new RedisStore,
        secret: 'SEKR37'
    }));

The interface for accessing and working with the session variables remain the same: `req.session`, except now the session values reside on the backend.

Let's explore three popular session stores for Express.

__MemoryStore__

Express comes with a built-in session store called MemoryStore, which is the default 
when you don't specify one explicitly.

MemoryStoreuses the application RAM for storing session data and works right out of the box, without the need for any database. Seeing how easily it is to set up, you might be tempted to make it the session store of your choice, but it is not recommended to do so because of the following reasons:

- Memory consumption will keep growing with each new session
- In case the app is restarted for any reason, all session data will be lost
- Session data cannot be shared by other instances of the app in a cluster

__RedisStore__

RedisStoreis a popular third-party module that uses Redis for storing session data.

Install RedisStore in the application directory:

    $ npm install connect-redis

Load the RedisStore module in the app and pass the instance of the Express object to it:

    var express = require('express');
    var RedisStore = require('connect-redis')(express);

With that, we are ready to use RedisStoreas our session store—load the session middleware with its storeoption set to an instance of RedisStore:

    app.use(express.session({ store: new RedisStore }));

RedisStoreaccepts a configuration object that can be used for specifying various aspects of the session store:

    app.use(express.session({ store: new RedisStore({
        host:'127.0.0.1',
        port:6380,
        prefix:'sess'
    }), secret: 'SEKR37' }));

Once you have set up RedisStore successfully, you can continue to work on the req.sessionobject to create, read, update, and delete session variables as usual; only this time, the data is stored on a Redis server, accessible by multiple instances of your app and persisting if your app is restarted. You can get more information about RedisStoreat <https://github.com/ visionmedia/connect-redis>.

__MongoStore__

Another popular session store uses MongoDB for storing the data and is called MongoStore. The usage pattern is very similar to RedisStore.

MongoDB is a very popular NoSQL database that uses a binary version of JSON, BSON, to store data. Known for its speed and easy of use, it is a popular choice of database for many modern web projects. For MongoStore to work with your app, you will need to have an instance of MongoDB running on your local system or on a remote server. You can learn more about MongoDB at <http://www.mongodb.org/>.

Install MongoStorein the application directory:

    $ npm install connect-mongo

Load the MongoStore module in the app and set an instance of it as the session store for the sessionmiddleware:

    var express = require('express');
    var MongoStore = require('connect-mongo')(express);
    …
    app.use(express.session({
        store: new MongoStore({
        db: 'myapp',
        host: '127.0.0.1',
        port: 3355
        })
    }));

You can read more about MongoStore at <https://github.com/kcbanner/> connect-mongo.

__Setting session variables__

To set a session variable, attach it to the req.session object:

    req.session.name = 'Napoleon';

In case the session variable contains illegal characters, use a substring notation to create it:

    req.session['primary skill'] = 'Dancing';

__Reading session variables__

Session variables can be read from the res.sessionobject using either the dot notation or the substring notation:

    var name = req.session.name;
    var primary_skill = req.session['primary skill'];

If you try to read an undefined property, you will get undefined as expected.

__Updating session variables__

Updating a session variable is just about updating the property in the req.session object or overwriting the existing property with a new value:

    // Assuming req.session.skills and req.session.name were already 
    defined
    req.session.skills.push('Baking');
    req.session.name = 'Pedro';

__Deleting session variables__

To delete a session variable, just delete the property from the req.sessionobject: 

    delete req.session.name
    delete req.session['primary skill'];

### Deleting a session

__Deleting a session store-based session__

To delete a cookie-based session, just delete the sessionobject from the request object, or set it to null: `delete req.session`; or `req.session = null`;

Once the session object is deleted, the session cookie is also deleted from the browser, effectively destroying the session.

__Deleting a session store-based session__

Session store-based sessions do not interpret a missing session object on the request object as the end of a session. If we delete the session object from the request object, it will be recreated from the session store, because the session store decides the state of the session, not JavaScript variables. This also the reason why these sessions are intact even after the app restarts.

Session store-based sessions have a method called `destroy()` that is used for destroying sessions from the session store—the proper way of tearing down a session store-based session:

    req.session.destroy();

The `destroy()` method accepts an optional callback function to be executed after the session is cleared from the store:
    
    req.session.destroy(function() {
        res.send('Session deleted');
    });

## Express in Production

TODO

## Library

- [Express-di by luin](http://luin.github.io/express-di/) Bring dependency injection to the Express.