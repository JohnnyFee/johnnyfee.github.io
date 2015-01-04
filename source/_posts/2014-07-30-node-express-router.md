---
layout: post
title: "Learn to Use the New Router in ExpressJS 4.0"
category: Nodew
tags: [node, router, express]
--- 

原文：<http://scotch.io/tutorials/javascript/learn-to-use-the-new-router-in-expressjs-4>

源码: <https://github.com/scotch-io/express-router-experiments>

With the new ExpressJS 4.0 just being released last week, there are many changes that have come with it. These [changes](http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0) will affect how we build Node and MEAN stack apps in the future.

Since Express has a such a large presence in our Node applications, let’s take a look at how we can use the new features in our applications, specifically the Router.

## Overview

Express 4.0 comes with the new `Router`. Router is like a mini express application. It doesn’t bring in views or settings, but provides us with the routing APIs like `.use`, `.get`, `.param`, and `route`.

<!--more-->

Let’s look at how many of us route our applications and let’s see how we can recreate that with Router.

## Our Sample Application

Let’s create an application that has some routes and a few features. Let’s run through those now.

* **Basic Routes**: Home, About
* **Route Middleware** to log requests to the console
* **Route with Parameters**
* **Route Middleware for Parameters** to validate specific parameters
* **Login routes** Doing a GET and POST on /login
* Validates a parameter passed to a certain route

## Application Structure

We’ll only need two files for our application.

    
- package.json  // set up our node packages
- server.js     // set up our app and build routes

We will house our routes in the `server.js` file. In the future we’ll want to move these out into their own files to keep our application modular. We can even define different route files for different sections of our site.

## Starting Our Application

Let’s start up our Node application. We will need our `package.json` file to define our dependencies.

```json
{
    "name": "express-router-experiments",
    "main": "server.js",
    "dependencies": {
        "express": "~4.0.0"
    }
}
```

We’ll only need one dependency, Express! Pretty sweet to see that 4.0.0 after seeing 3.x.x for so long.

Go ahead and install our dependencies.

    
    $ npm install

Now we have Express. Let’s look at starting up our application and then we can handle our routing.

## Creating Our Server

We will use Express to start our application server. Since we defined `server.js` as the main file in `package.json`, that is the file that Node will use. Let’s define that file now.

```js
// server.js

// BASE SETUP
// ==============================================

var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;

// ROUTES
// ==============================================

// sample route with a route the way we're used to seeing it
app.get('/sample', function(req, res) {
    res.send('this is a sample!');  
});

// we'll create our routes here

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
```    

Now we can start our server. We’ve created a route using the normal `app.get` that we’ve used in our Express 3.0 applications. If we go into our browser and visit `http://localhost:8080/sample`, we will be able to see **this is a sample!**. Now we’ll move to creating routes using the Express 4.0 Router.

## Express Router

What exactly is the Express Router? It is a mini express application without all the bells and whistles of an express application, just the routing stuff. Let’s take a look at exactly what this means. We’ll go through each section of our site and use different features of the Router.

## Basic Routes express.Router()

Let’s call an instance of the Router for creating our frontend routes for our application. This will include the **Home** and **About** pages.

```js
// server.js

...

// we'll create our routes here

// get an instance of router
var router = express.Router();

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.send('im the home page!');  
});

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
    res.send('im the about page!'); 
});

// apply the routes to our application
app.use('/', router);

...
```   
    

We will call an instance of the `express.Router()`, apply routes to it, and then tell our application to use those routes. We can now access the home page at <http://localhost:8080> and the about page at <http://localhost:8080/about>.

Notice how we can set a default root for using these routes we just defined. If we had changed **line 21** to `app.use('/app', router)`, then our routes would be <http://localhost:8080/app> and <http://localhost:8080/app/about>.

This is very powerful because we can create multiple `express.Router()`s and then apply them to our application. We could have a Router for our basic routes, authenticated routes, and even API routes.

Using the Router, we are allowed to make our applications more modular and flexible than ever before by creating multiple instances of the Router and applying them accordingly. Now we’ll take a look at how we can use middleware to handle requests.

## Route Middleware router.use()

Route middleware in Express is a way to do something before a request is processed. This could be things like checking if a user is authenticated, logging data for analytics, or anything else we’d like to do before we actually spit out information to our user.

Here is some middleware to log a message to our console every time a request is made. This will be a demonstration of how to create middleware using the Express Router.

```js
// server.js

...

// we'll create our routes here

// get an instance of router
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.send('im the home page!');  
});

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
    res.send('im the about page!'); 
});

// apply the routes to our application
app.use('/', router);

...
```

We’ll use `router.use()` to define middleware. This will now be applied to all of the requests that come into our application for this instance of Router. Let’s go into our browser and go to **http://localhost:8080** and we’ll see the request in our console.

[![express-router-console-log-request](http://scotch.io/wp-content/uploads/2014/04/express-router-console-log-request.png)](http://scotch.io/wp-content/uploads/2014/04/express-router-console-log-request.png)

**The order you place your middleware and routes is very important**. Everything will happen in the order that they appear. This means that if you place your middleware after a route, then the route will happen before the middleware and the request will end there. Your middleware will not run at that point.

Keep in mind that you can use route middleware for many things. You can use it to check that a user is logged in in the session before letting them continue.

## Route with Parameters /hello/:name

Let’s say we wanted to have a route called `/hello/:name` where we could pass in a person’s name into the URL and the application would spit out **Hello *name*!**. Let’s create that route now.

```js
// server.js

...

// we'll create our routes here

// get an instance of router
var router = express.Router();

...

// route with parameters (http://localhost:8080/hello/:name)
router.get('/hello/:name', function(req, res) {
    res.send('hello ' + req.params.name + '!');
});

// apply the routes to our application
app.use('/', router);

...
```

Now we can visit `http://localhost:8080/hello/holly` and see our browser spit out **hello holly!** Easy cheese.

[![express-router-parameters](http://scotch.io/wp-content/uploads/2014/04/express-router-parameters.png)](http://scotch.io/wp-content/uploads/2014/04/express-router-parameters.png)

Now let’s say we wanted to validate this name somehow. Maybe we’d want to make sure it wasn’t a curse word. We would do that validation inside of route middleware. We’ll use a special middleware for this.

### Route Middleware for Parameters

We will use Express’s `.param()` middleware. This creates middleware that will run for a certain route parameter. In our case, we are using `:name` in our **hello** route. Here’s the param middleware.

```js
// server.js

...

// we'll create our routes here

// get an instance of router
var router = express.Router();

...

// route middleware to validate :name
router.param('name', function(req, res, next, name) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log('doing name validations on ' + name);

    // once validation is done save the new item in the req
    req.name = name;
    // go to the next thing
    next(); 
});

// route with parameters (http://localhost:8080/hello/:name)
router.get('/hello/:name', function(req, res) {
    res.send('hello ' + req.name + '!');
});

// apply the routes to our application
app.use('/', router);

...
```

Now when we hit the **/hello/:name** route, our route middleware will kick in and be used. We can run validations and then we’ll pass the new variable to our `.get` route by storing it in `req`. We then access it by changing **req.params.name** to **req.name**.

When we visit our browser at <http://localhost:8080/hello/sally> we’ll see our request logged to the console.

[![express-router-parameter-middleware](http://scotch.io/wp-content/uploads/2014/04/express-router-parameter-middleware.png)](http://scotch.io/wp-content/uploads/2014/04/express-router-parameter-middleware.png)

Route middleware for parameters can be used to validate data coming to your application. If you have created a RESTful API also, you can validate a token and make sure the user is able to access your information.

The last thing we’ll look at today is how to use `app.route()` to define multiple routes.

### Login Routes app.route

We can define our routes right on our `app`. This is similar to using `app.get`, but we will use `app.route`. app.route is basically a shortcut to call the Express Router. Instead of calling `express.Router()`, we can call `app.route` and start applying our routes there.

Using `app.route` lets us define multiple actions on a single login route. We’ll need a `GET` route to show the login form and a `POST` route to process the login form.

```js 
...

// ROUTES
// ==============================================

app.route('/login')

    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
        res.send('this is the login form');
    })

    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {
        console.log('processing');
        res.send('processing the login form!');
    });

...
```

Now we have defined our two different actions on our `/login` route. Simple and very clean.

## Conclusion

With the inclusion of the Express 4.0 Router, we are given more flexibility than ever before in defining our routes. To recap, we can:

* Use express.Router() multiple times to define groups of routes
* Apply the express.Router() to a section of our site using `app.use()`
* Use route middleware to process requests
* Use route middleware to validate parameters using `.param()`
* Use `app.route()` as a shortcut to the Router to define multiple requests on a route

With all the ways we can define routes, I’m sure that our applications will benefit going forward. Sound off in the comments if you have any questions or suggestions.

## Tutorial

- [Express Routing - The Beginners Guide](http://jilles.me/express-routing-the-beginners-guide)
- [Express.js 4, Node.js and MongoDB REST API Tutorial](http://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial)
- [Build a RESTful API Using Node and Express 4 ♥ Scotch](http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4)
- [URL Parameters and Routing in Express.js](http://webapplog.com/url-parameters-and-routing-in-express-js/)