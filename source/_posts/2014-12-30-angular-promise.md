layout: post
title: "Using AngularJS Promises"
category : Angular
tags : [angular, promise]
---

>origin: [Using AngularJS Promises - Liam Kaufman](http://liamkaufman.com/blog/2013/09/09/using-angularjs-promises/)

In my previous article I discussed the [benefits of using dependency injection](http://liamkaufman.com/blog/2013/08/06/how-angularjs-made-me-a-better-nodejs-developer/) to make code more testable and modular. In this article I’ll focus on using promises within an AngularJS application. This article assume some prior knowledge of promises ([a good intro on promises](http://wildermuth.com/2013/8/3/JavaScript_Promises) and [AngularJS’ official documentation](http://docs.angularjs.org/api/ng.$q)).

<!-- more -->

Promises can be used to unnest asynchronous functions and allows one to chain multiple functions together - increasing readability and making individual functions, within the chain, more reusable.

```js
function fetchData(id, cb){
  getDataFromServer(id, function(err, result){
    if(err){
      cb(err, null);
    }else{
      transformData(result, function(err, transformedResult){
        if(err){
          cb(err, null);
        }else{
          saveToIndexDB(result, function(err, savedData){
            cb(err, savedData);
          });
        }
      });
    }
  });
}
```

Once `getDataFromServer()`, `transformData()` and `saveToIndexDB()` are converted to returning promises we can refactor the above code to:

```js
function fetchData(id){
  return getDataFromServer(id)
          .then(transformData)
          .then(saveToIndexDB);
}
```

In addition to increasing readability promises can help with error handling, progress updates, and AngularJS templates.

## Handling Errors

If `fetchData` is called and an exception is raised in `transformData()` or `saveToIndexDB()`, it will trigger the final error callback.

```js
fetchData(1)
  .then(function(result){

  }, function(error){
    // exceptions in transformData, or saveToIndexDB
    // will result in this error callback being called.
  });
```

Unfortunately, if an exception is raised in `getDataFromServer()` it will not trigger the final error callback. This happens because `transformData()` and `saveToIndexDB()` are called within the context of `.then()`, which uses try-catch, and automatically calls `.reject()` on an exception. To bring this behaviour to the first function we can introduce a try-catch block like:

```js
function getDataFromServer(id){
  var deferred = $q.defer();

  try{
    // asynchronous function, which calls
    // deferred.resolve() on sucess
  }catch(e){
    deferred.reject(e);
  }

  return deferred.promise;
}
```

While adding try-catch made `getDataFromServer()` less elegant, it makes it more robust and easier to use as the first in a chain of promises.

## Using Notify for Progress Updates

A promise can only be resolved, or rejected, once. To provide progress updates, which may happen zero or more times, a promise also includes a notify callback (introduced in AngularJS 1.2+). Notify could be used to provide incremental progress updates on a long running asynchronous task. Below is an example of a long running function, `processLotsOfData()`, that uses `notify` to provide progress updates.

```js
function processLotsOfData(data){
  var output = [],
      deferred = $q.defer(),
      percentComplete = 0;

  for(var i = 0; i < data.length; i++){
    output.push(processDataItem(data[i]));
    percentComplete = (i+1)/data.length * 100;
    deferred.notify(percentComplete);
  }

  deferred.resolve(output);

  return deferred.promise;
};


processLotsOfData(data)
  .then(function(result){
    // success
  }, function(error){
    // error
  }, function(percentComplete){
    $scope.progress = percentComplete;
  });
```

Using the notify function, we can make many updates to the $scope’s progress variable before processLotsOfData is resolved (finished), making notify ideal for progress bars.

Unfortunately, using notify in a chain or promises is cumbersome since calls to notify do not bubble up. Every function in the chain would have to manually bubble up notifications, making code a little more difficult to read.

## Templates

<span style="text-decoration: line-through;">AngularJS templates understand promises and delays their rendering until they’re resolved, or rejected</span>. AngularJS templates no longer resolve promises - they must be resolved in the controller
before they’re assigned to the scope. For instance let’s say our template looks like:

```html
<p>{{bio}}</p>
```

We could do the following in our controller:

```js
function getBio(){
  var deferred = $q.defer();
  // async call, resolved after ajax request completes
  return deferred.promise;
};

getBio().then(function(bio){
  $scope.bio = bio;
});
```

The view renders normally, and when the promise is resolved AngularJS automatically updates the view to include the value resolved in getBio.

## Limitations of Promises in AngularJS

When a promise is resolved asynchronously, “in a future turn of the event loop”, the .resolve() function must be wrapped in a promise. In the contrived example below, a user would click a button triggering `goodbye()`, which should update the `$scope`’s greeting attribute. 

```js
app.controller('AppCtrl',
[   '$scope',
    '$q',
    function AppCtrl($scope, $q){
      $scope.greeting = "hello";

       var updateGreeting = function(message){
          var deferred = $q.defer();

          setTimeout(function(){
              deferred.resolve(message);
          }, 5);

          return deferred.promise;
       };
      $scope.goodbye = function(){
          $scope.greeting = updateGreeting('goodbye');
      }
    }
]);
```
Unfortunately, it doesn’t work as expected, since the asynchronous event works outside of AngularJS’ event loop. The fix for this (besides using AngularJS’ setTimemout function), is to wrap the deferred’s resolve in `$scope.$apply` to trigger the digest cycle and update the `$scope` accordingly:

```js
setTimeout(function(){
  $scope.$apply(function(){
    deferred.resolve(message);
  });
}, 5)
```

Jim Hoskins goes into more detail on using `$apply`: http://jimhoskins.com/2012/12/17/angularjs-and-apply.html

## Conclusions

Using promises is an important part of writing an AngularJS app idiomatically and should help make your code more readable. Understanding their shortcomings, and their strengths make them much easier to work with.

## See also

- [Using Promises in AngularJS Views - Mark Dalgleish](http://markdalgleish.com/2013/06/using-promises-in-angularjs-views/)