layout: post
title: "Angular Bootstrap"
description: ""
category: Angular
tags: [angular, bootstrap, npapp]
---

See [AngularJS: Developer Guide: Bootstrap](https://docs.angularjs.org/guide/bootstrap)

## Bootstrapping Angular Applications

Bootstrapping Angular applications automatically using the `ngApp` directive is very easy and
suitable for most cases. In advanced cases, such as when using script loaders, you can use the
[imperative/manual way](https://docs.angularjs.org/guide/bootstrap#manual-initialization) to bootstrap the application.

There are 3 important things that happen during the bootstrap phase:

1.  The [injector](https://docs.angularjs.org/api/auto/service/$injector) that will be used for dependency injection is created.

2.  The injector will then create the [root scope](https://docs.angularjs.org/api/ng/service/$rootScope) that will become the context
    for the model of our application.

3.  Angular will then "compile" the DOM starting at the `ngApp` root element, processing any
    directives and bindings found along the way.

Once an application is bootstrapped, it will then wait for incoming browser events (such as mouse
clicks, key presses or incoming HTTP responses) that might change the model. Once such an event
occurs, Angular detects if it caused any model changes and if changes are found, Angular will
reflect them in the view by updating all of the affected bindings.

The structure of our application is currently very simple. The template contains just one directive
and one static binding, and our model is empty. That will soon change!

![](https://docs.angularjs.org/img/tutorial/tutorial_00.png)

## ng-app

```
<!doctype html>
<html xmlns:ng="http://angularjs.org" ng-app>
  <body>
    ...
    <script src="https://code.angularjs.org/1.5.7/angular.js"></script>
  </body>
</html>
```

<!-- more -->

1.  Place the `script` tag at the bottom of the page. Placing script tags at the end of the page improves app load time because the HTML loading is not blocked by loading of the `angular.js` script. You can get the latest bits from http://code.angularjs.org. Please don't link your production code to this URL, as it will expose a security hole on your site. For experimental development linking to our site is fine. 
    
    * Choose: `angular-[version].js` for a human-readable file, suitable for development and debugging.
    * Choose: `angular-[version].min.js` for a compressed and obfuscated file, suitable for use in production.

2.  Place `ng-app` to the root of your application, typically on the `<html>` tag if you want angular to auto-bootstrap your application.

3.  If you choose to use the old style directive syntax `ng:` then include xml-namespace in `html` to make IE happy. (This is here for historical reasons, and we no longer recommend use of `ng:`.)

If you’re building an all-Angular application:

    <html ng-app>
    …
    </html>

Manage only a part of the page by placing it on some element like a `<div>`within the page:

    <html>
        …
        <div ng-app>
        …
        </div>
        …
    </html>

## Automatic Initialization

This code downloads the `angular.js` script which registers a callback that will be executed by the browser when the containing HTML page is fully downloaded. When the callback is executed, Angular looks for the [ngApp](https://docs.angularjs.org/api/ng/directive/ngApp) directive. If Angular finds the directive, it will bootstrap the application with the root of the application DOM being the element on which the `ngApp` directive was defined.

1.  load the [module](https://docs.angularjs.org/guide/module) associated with the directive.
2.  create the application [injector](https://docs.angularjs.org/api/auto/service/$injector)
3.  compile the DOM treating the [`ngApp`](https://docs.angularjs.org/api/ng/directive/ngApp) directive as the root of the compilation. This allows you to tell it to treat only a portion of the DOM as an Angular application.

![](https://docs.angularjs.org/img/guide/concepts-startup.png)

As a best practice, consider adding an `ng-strict-di` directive on the same element as `ng-app`:

```html
<!doctype html>
<html ng-app="optionalModuleName" ng-strict-di>
  <body>
    I can add: {{ 1+2 }}.
    <script src="angular.js"></script>
  </body>
</html>
```

This will ensure that all services in your application are properly annotated. See the [dependency injection strict mode](https://docs.angularjs.org/guide/di#using-strict-dependency-injection) docs for more.

## Manual Initialization

If you need to have more control over the initialization process, you can use a manual bootstrapping method instead. Examples of when you'd need to do this include using script loaders or the need to perform an operation before Angular compiles a page.

Here is an example of manually initializing Angular:

```html
<!doctype html>
<html>
<body>
  <div ng-controller="MyController">
    Hello {{greetMe}}!
  </div>
  <script src="http://code.angularjs.org/snapshot/angular.js"></script>

  <script>
    angular.module('myApp', [])
      .controller('MyController', ['$scope', function ($scope) {
        $scope.greetMe = 'World';
      }]);

    angular.element(document).ready(function() {
      angular.bootstrap(document, ['myApp']);
    });
  </script>
</body>
</html>
```

You should call `angular.bootstrap()` _after_ you've loaded or defined your modules. You cannot add controllers, services, directives, etc after an application bootstraps.

**Note:** You should not use the ng-app directive when manually bootstrapping your app.

This is the sequence that your code should follow:

1.  After the page and all of the code is loaded, find the root element of your AngularJS application, which is typically the root of the document.

2.  Call [`angular.bootstrap`](api/ng/function/angular.bootstrap) to [compile](https://docs.angularjs.org/guide/compiler) the element into an executable, bi-directionally bound application.

## Things to keep in mind

There a few things to keep in mind regardless of automatic or manual bootstrapping:

* While it's possible to bootstrap more than one AngularJS application per page, we don't actively test against this scenario. It's possible that you'll run into problems, especially with complex apps, so caution is advised.
* Do not bootstrap your app on an element with a directive that uses [transclusion](https://docs.angularjs.org/api/ng/service/$compile#transclusion), such as [`ngIf`](https://docs.angularjs.org/api/ng/directive/ngIf), [`ngInclude`](https://docs.angularjs.org/api/ng/directive/ngInclude) and [`ngView`](https://docs.angularjs.org/api/ngRoute/directive/ngView). Doing this misplaces the app [`$rootElement`](https://docs.angularjs.org/api/ng/service/$rootElement) and the app's [injector](https://docs.angularjs.org/api/auto/service/$injector), causing animations to stop working and making the injector inaccessible from outside the app.

## Deferred Bootstrap

This feature enables tools like [Batarang](https://github.com/angular/angularjs-batarang) and test runners to hook into angular's bootstrap process and sneak in more modules into the DI registry which can replace or augment DI services for the purpose of instrumentation or mocking out heavy dependencies.

If `window.name` contains prefix `NG_DEFER_BOOTSTRAP!` when [`angular.bootstrap`](https://docs.angularjs.org/api/ng/function/angular.bootstrap) is called, the bootstrap process will be paused until `angular.resumeBootstrap()` is called.

`angular.resumeBootstrap()` takes an optional array of modules that should be added to the original list of modules that the app was about to be bootstrapped with.

