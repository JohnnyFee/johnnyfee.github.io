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

The destinations of the HTTP request URIs are defined via routesin the app. Routes are how you tell your app "for this URI, execute this piece of JavaScript code". The corresponding JavaScript function for a route is called a route handler. It is the responsibility of the route handler to respond to an HTTP request, or pass it on to another handler function if it does not. Route handlers may be defined in the app.js file or loaded as a Node module.

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


## Library

- [Express-di by luin](http://luin.github.io/express-di/) Bring dependency injection to the Express.