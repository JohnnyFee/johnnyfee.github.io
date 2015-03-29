layout: post
title: "AngularJS 异常处理"
category : Angular
tags : [angular, exception, tutorial]
--- 

In my recent work I’ve been using two approaches to handling errors and exceptions. The ultimate goal is to not let an error go unnoticed.

## $exceptionHandler

对于 Angular digest 中未捕获的异常，由 `$exceptionHandler` 处理。

Any uncaught exception in angular expressions is delegated to this service. The default implementation simply delegates to `$log.error` which logs it into the browser console.

<!-- more -->

In unit tests, if `angular-mocks.js` is loaded, this service is overridden by
[mock $exceptionHandler](https://docs.angularjs.org/api/ngMock/service/$exceptionHandler) which aids in testing.

See [AngularJS: API: $exceptionHandler](https://docs.angularjs.org/api/ng/service/$exceptionHandler)

Use a [decorator](https://docs.angularjs.org/api/auto/service/%24provide#decorator), at config time using the [`$provide`](https://docs.angularjs.org/api/auto/service/%24provide) service, on the [`$exceptionHandler`](https://docs.angularjs.org/api/ng/service/%24exceptionHandler) service to perform custom actions when exceptions occur.

_Why?_: Provides a consistent way to handle uncaught AngularJS exceptions for development-time or run-time.

Note: Another option is to override the service instead of using a decorator. This is a fine option, but if you want to keep the default behavior and extend it a decorator is recommended.

```js
/* recommended */
angular
    .module('blocks.exception')
    .config(exceptionConfig);

exceptionConfig.$inject = ['$provide'];

function exceptionConfig($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

extendExceptionHandler.$inject = ['$delegate', 'toastr'];

function extendExceptionHandler($delegate, toastr) {
    return function(exception, cause) {
        // 调用默认行为
        $delegate(exception, cause);

        var errorData = { 
            exception: exception, 
            cause: cause 
        };
        /**
         * 在这里自定义错误处理，如：
         * 
         * 1. add the error to a service's collection,
         * 2. add errors to $rootScope
         * 3. log errors to remote web server,or log locally. 
         * 4. throw hard.
         * 
         * It is entirely up to you.
         * 
         */
        toastr.error(exception.msg, errorData);
    };
}
```

如下代码将错误添加到 `$rootScope` 中：

```js
app.config(function($provide){
 
    $provide.decorator("$exceptionHandler", function($delegate, $injector){
        return function(exception, cause){
            var $rootScope = $injector.get("$rootScope");
            $rootScope.addError({message:"Exception", reason:exception});
            $delegate(exception, cause);
        };
    });
 
});
```

Notice the use of `$injector` in the above code. Using the `$injector` service directly is required to avoid a circular dependency error by advertising both $exceptionHandler and `$rootScope` as dependencies.

## try catch

## Exception Catchers

Create a factory that exposes an interface to catch and gracefully handle exceptions.

在需要显式处理异常时，可以使用 Exception Catchers。

_Why?_: Provides a consistent way to catch exceptions that may be thrown in your code (e.g. during XHR calls or promise failures).

Note: The exception catcher is good for catching and reacting to specific exceptions from calls that you know may throw one. For example, when making an XHR call to retrieve data from a remote web service and you want to catch any exceptions from that service and react uniquely.

```js
/* recommended */
angular
    .module('blocks.exception')
    .factory('exception', exception);

exception.$inject = ['logger'];

function exception(logger) {
    var service = {
        catcher: catcher
    };
    return service;

    function catcher(message) {
        return function(reason) {
            logger.error(message, reason);
        };
    }
}
```

Usage:

```js
function getAvengers() {
    return $http.get('/api/maa')
        .then(getAvengersComplete)
        .catch(function(message) {
            exception.catcher('XHR Failed for getAvengers')(message);
            $location.url('/');
        });

    function getAvengersComplete(response) {
        return response.data[0].data.results;
    }
}
```

See [Fix minor errors in code samples by anthonychu · Pull Request #41 · johnpapa/angularjs-styleguide](https://github.com/johnpapa/angularjs-styleguide/pull/41)

## Promising Errors

I’m a fan of using catch at the end of a chain of promises. One reason is that catch is the only sure fire way to process all possible errors. Let’s use the following code as an example. 

```js
someService
    .doWork()
    .then(workComplete, workError);
```

Even though an error handler (workError) is provided to the then method, the error handler doesn’t help if something goes wrong inside of workComplete itself . . .

```js
var workComplete = function(result){
    return  $q.reject("Feeling lazy");
};
```

because we are already inside a success handler for the previous promise. I like the catch approach because it handles this scenario and also makes it easier to see that an error handler is in place.

```js
someService
    .doWork()
    .then(workComplete)               
    .catch(errors.catch("Could not complete work!"));
```

Since so many catch handlers started to look alike, I made an errors service to encapsulate some of the common logic.

```js
app.factory("errors", function($rootScope){
    return {
        catch: function(message){
            return function(reason){
                $rootScope.addError({message: message, reason: reason})
            };
        }
    };
});
```

And now async related activities can present meaningful error messages to the user when an operation fails.

对于 Promise 异常，一般使用 `catch` 来捕获。在 `catch` 的异常处理中，可以使用上述 Exception Catcher 来处理。

注意：在 promise 的处理函数中抛出的异常，除了在 `catch` 或者错误回调中可以捕获，全局异常处理器也会捕获到这个以上。通过 `reject` 方法拒绝的 Promise 只有在 `catch` 或者错误回调才能捕获。

## Route Errors

Handle and log all routing errors using [`$routeChangeError`](https://docs.angularjs.org/api/ngRoute/service/%24route#%24routeChangeError).

_Why?_: Provides a consistent way handle all routing errors.

_Why?_: Potentially provides a better user experience if a routing error occurs and you route them to a friendly screen with more details or recovery options.

```js
/* recommended */
function handleRoutingErrors() {
    /**
     * Route cancellation:
     * On routing error, go to the dashboard.
     * Provide an exit clause if it tries to do it twice.
     */
     $rootScope.$on('$routeChangeError',
      function (event, current, previous, rejection) {
        var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
          'unknown target';

        var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');

        exception.catcher('Route Error')(msg);
      }
    );

    // 处理路由异常。
    $rootScope.$on('$stateNotFound',
      function (event, unfoundState) {
        var msg = 'Error routing to ' + unfoundState + '. The state is not found.';

        exception.catcher('Route Error')(msg);
      }
    );
}
```

注意： 只有当 go 函数中传入的 API 无效时，才会触发以下事件。直接在地址栏中路由，不会触发以下事件。

## See

- [johnpapa/angularjs-styleguide](https://github.com/johnpapa/angularjs-styleguide#exception-handling)
- [Better Error Handling In AngularJS](http://odetocode.com/blogs/scott/archive/2014/04/21/better-error-handling-in-angularjs.aspx)