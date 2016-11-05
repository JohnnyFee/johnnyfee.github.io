layout: post
title: "JavaScript Async.js"
description: ""
category: JavaScript
tags: [javascript]
---

## Async programming

Managing asynchronous operations is a necessity when working in JavaScript, and it can be messy business, especially when it comes to error handling.

This lesson covers asynchronous error handling pitfalls, and shows how promises can provide familiar synchronous programming patterns for asynchronous operations.

- [Async Programming is Messy](http://know.cujojs.com/tutorials/async/async-programming-is-messy)
- [Simplifying Async with Promises](/tutorials/async/simplifying-async-with-promises)
- [Mastering Async Error Handling with Promises](/tutorials/async/mastering-async-error-handling-with-promises)

## Async

### how to breaking a waterfall chain

- [Add support for breaking a waterfall chain by jnordberg · Pull Request #85 · caolan/async](https://github.com/caolan/async/pull/85)
- [breaking the waterfall chain without throwing an error · Issue #11 · caolan/async](https://github.com/caolan/async/issues/11)

We can skip to the final function by passing 'error' = true like this:

```js
async.waterfall([function (callback) {
	callback(null); // <---go to next fn
},
function (callback) {
	callback(true); // <---skip to the last fn
},
function (callback) {
	callback(null); // <---this fn will not be called
}
], callback);
```

但是如果我们既想跳出 waterfall，又想得到一个结果：

```js
var async = require('async');

async.waterfall( [
  function( callback ){
    console.log('one');
    callback( null );
  },

  function( callback ){
    console.log('two');
    callback( true, 'more info' );
  },

  function( callback ){
    console.log('three');
    callback( null );
  }
], function(err, result){
  console.log( err, result );
});
```

```
// RESULT
// one
// two
// true undefined
```

很可惜，得到的是 `undefined`，作者给出的解决方法：

I think in this circumstance you could use a closure and async.whilst or async.until, or just use a named function for the final callback and call that instead of the task callback passed into the successful task function.

## Library

- [kessler/if-async](https://github.com/kessler/if-async)

## Debug

- [Debugging Asynchronous JavaScript with Chrome DevTools - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
