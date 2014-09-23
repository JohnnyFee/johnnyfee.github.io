---
layout: post
title: "Node 最佳实践"
category: Node
tags: [node]
--- 

原文： <http://webapplog.com/seven-things-you-should-stop-doing-with-node-js/

Inspired by [5 Things You Should Stop Doing With jQuery](http://flippinawesome.org/2013/05/06/5-things-you-should-stop-doing-with-jquery/) by Burke Holland, I decided to open a discussion and highlight seven things you should immediately stop doing with Node.js.

## Stop Using Callbacks in Node.js

Callbacks are the bread and butter (or the meat and veggies for paleo lifestyle readers) of the JavaScript/Node.js language and the main pattern. However, you should stop using callbacks for nesting code of multiple methods unless you want to end up with the [Callback Hell](http://callbackhell.com/).

[Async](https://github.com/caolan/async) is for the win. Particularly its series() and waterfall() methods. 

To illustrate the drastic difference, here is an example in which we perform multiple operations **with callbacks** to find a user, then find posts that belong to the user:

    codeA(function(a){
      codeB(function(b){
        codeC(function(c){
          codeD(function(d){
            // Final callback code        
          })
        })
      })
    })
    

<!--more-->

The series example:

    async.series([
      function(callback){
        // code a
        callback(null, 'a')
      },
      function(callback){
        // code b
        callback(null, 'b')
      },
      function(callback){
        // code c
        callback(null, 'c')
      },
      function(callback){
        // code d
        callback(null, 'd')
      }],
      // optional callback
      function(err, results){
        // results is ['a', 'b', 'c', 'd']
        // final callback code
      }
    )
    

The waterfall example:

    async.waterfall([
      function(callback){
        // code a
        callback(null, 'a', 'b')
      },
      function(arg1, arg2, callback){
        // arg1 is equals 'a' and arg2 is 'b'
        // Code c
        callback(null, 'c')
      },
      function(arg1, callback){      
        // arg1 is 'c'
        // code d
        callback(null, 'd');
      }], function (err, result) {
       // result is 'd'    
      }
    )
    

## Stop Using WildCard * for Versions with Node.js

The wildcard * instead of the version number in package.json seems like a good idea — an automatic update in the near future. Wrong! You should use exact version numbers to prevent any third-party module changes from breaking your app and waking up you in the middle of the night wondering what went south. 

This is especially true if you don’t [commit your node_modules folder](http://www.futurealoof.com/posts/nodemodules-in-git.html) or don’t use [shrinkwrap](https://www.npmjs.org/doc/cli/npm-shrinkwrap.html). 

A bad example from [HackHall package.json](https://github.com/azat-co/hackhall/blob/master/package.json) circa summer 2013:

    {
        "name": "hackhall",
        "version": "0.0.1",
        "private": true,
        "main": "server",
        "scripts": {
            "start": "node server"
        },
        "dependencies": {
            "express": ">=2.2.0",
            "jade": "*",
            "mongodb": "*",
            "mongoose":"",
            "oauth":"*"
        },
        "devDependencies":{
            "mocha": "",
            "superagent":""
        },
        "engines": {
          "node": ">=0.6"
        }
    }
    

A good example from [the Practical Node.js book](http://amzn.to/NuQ0fM) [2014, Apress]:

    {
      "name": "blog-express",
      "version": "0.0.1",
      "private": true,
      "scripts": {
        "start": "node app.js",
        "test": "mocha test"
      },
      "dependencies": {
        "express": "3.4.5",
        "jade": "0.35.0",
        "mongoskin": "~0.6.1",
        "stylus": "~0.40.3",
        "mocha": "1.16.2",
        "superagent": "0.15.7",
        "expect.js": "0.2.0"
      }
    }
    

If you don’t want to go to [NPM website](http://npmjs.org/) every time to check the version, you can use $ npm install package_name --save which will save the version number in the package.json. 

If the module is installed already you can:

* Type $ npm ls
* Open the package folder and copy the version number form package.json

## Stop Using console.log for Debugging Node.js Apps

What is the best debugger? Right, it’s console.log! It’s fast, non-interrupting and gives us any information we ask for (like the value of a pesky variable). Then why should you stop using it? Because real debuggers like [Node Inspector](https://github.com/node-inspector/node-inspector) provide not only the value of a variable you just hard-coded, but also give you a dynamic ability to look around, inside the process. 

![](http://webapplog.com/wp-content/uploads/node-inspector-watch.png)

For example, I might have a condition (where resubmit is a boolean) that is not acting right:

    if (resubmit && post.published && user.plan.paid && post.isVisible) {
      // code A
    } else {
     // code B
    }
    

With console.log I can type only console.log(resubmit), or console.log(resubmit, ...) some other variables. But, with debugger, I can poke around and print anything I have access to in that scope. If that is not enough, I’ll step over or step in the Code A or B as show in the example.

## Stop Using GET and POST for Everything in Node.js servers

Stop using GET and POST for all of your incoming HTTP requests. [Representational state transfer](http://en.wikipedia.org/wiki/Representational_state_transfer) application programming interface methodology (RESTful API) has PUT and DELETE so **use them for updates and deletions** ([wiki](http://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services)). 

For example in this Express.js route, instead of using POST to update a record, you can use PUT:

    app.post('/comments/update/:id', routes.comments.update)
    

    app.put('/comments/:id', routes.comments.update)
    

For more information, take a look at [REST API Tutorial](http://www.restapitutorial.com/).

## Stop Using Semicolons with Node.js

Semicolons are actually optional, because ECMAScript (the standard for Node.js and browser JavaScript implementations) has an automatic semicolon-insertion feature (ASI). Here’s the draft of the [ECMAScript 6 (ES6) documentation](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-automatic-semicolon-insertion) about ASI.

The gist is that **semicolons are optional** and except for two cases: in front of the IIFE and inside of the for loop.

The problem with using semicolons:

* **Extra characters to type:** In a 1,000-line file there will be at least 1,000 extra symbols
* **Inconsistency:** When semicolons are missed due to neglect, the code base still works but becomes inconsistent (solvable by [linting](https://github.com/reid/node-jslint), but that’s an extra build step)

Some popular Node.js projects have been written with a semicolon-less style:

* [NPM](https://github.com/npm/npm/blob/master/lib/init.js): the Node.js package manager
* [Request](https://github.com/mikeal/request/blob/master/request.js): a module for making HTTP requests

Are you still doubtful because [Doug Crockford](http://www.crockford.com/) told you that you had to use semicolons? Then maybe you should read [An Open Letter to JavaScript Leaders Regarding Semicolons](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding).

## Stop Using Comma-First Style

Okay, this topic is very subjective and probably not that important, but I want to voice my dislike for the comma-first style. Please, stop the madness! 

The style in question is often seen when one might write arrays and objects with a comma at the beginning of lines instead of at the end. For example, we can define an array:

    var arr = [ 'nodejs'
      , 'python'
      , 'ruby'
      , 'php'
      , 'java'
    ]
    

Or in a more traditional style it would look like this:

    var arr = [ 'nodejs', 
      'python', 
      'ruby', 
      'php',
      'java'
    ]
    

Please, don’t do the former. I don’t care how much better it might be for catching missing commas. The comma-first style just look ridiculous, because we would never use this style in our normal language writing. Nobody writes like this:

    Paleo lifestyle is good for ,adult men ,adult women ,children ,and elderly people.
    

In my humble opinion, comma-first style is hard for the brain to adapt and just plain silly. 

## Stop Limiting Your Connections with Default MaxSockets Value

The default maxSockets value is 5 and it determines the limit on number of sockets per host ([official docs](http://nodejs.org/api/http.html#http_agent_maxsockets)).

To avoid bottlenecking your system just use something like this:

    var http = require('http')
    http.globalAgent.maxSockets = 10
    

Or, if you want to make it unlimited:

    require('http').globalAgent.maxSockets = Infinity
    

Here is a good comparison article [Node.js Connection Pooling](http://markdawson.tumblr.com/post/17525116003/node).

Another approach is to disable pooling all together (agent: false) like [LinkedIn did](http://engineering.linkedin.com/nodejs/blazing-fast-nodejs-10-performance-tips-linkedin-mobile) or [Substack recommends](http://markdawson.tumblr.com/post/17525116003/node) in his [hyperquest module](https://github.com/substack/hyperquest). 

## Conclusion About Things to Stop Doing with Node.js

Of course, this list of seven things you should immediately stop doing with Node.js is subjective, but it was born out of careful and ongoing observation, as well as some painful real-world experience (i.e., * in package.json). What is on your list of things not to do with Node.js?

## Tutorial

- [RisingStack/node-style-guide](https://github.com/RisingStack/node-style-guide)