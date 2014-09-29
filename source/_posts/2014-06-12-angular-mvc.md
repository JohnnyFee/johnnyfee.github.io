---
layout: post
title: "Angular MVC"
category : Angular
tags : [angular, tutorial]
--- 

本书为读 [AngularJS](http://www.salttiger.com/angularjs/) 的读书笔记，该书的例子在 [shyamseshadri/angularjs-book](https://github.com/shyamseshadri/angularjs-book)。

## module

`module` 扮演一个其他的AngularJS需要管理的对象（控制器、服务等）的容器。要定义一个新的模块，我们需要给 `module` 方法的第一个参数提供模块的名字。第二个参数指定所需要依赖的模块（在之前的模块中，我们没有依赖与任何其他模块）。

`angular.module` 方法的调用会返回一个新创建的模块的实例。一旦我们是用这个实例，就可以开始定义新的控制器了。

See [AngularJS: Developer Guide: Modules](https://docs.angularjs.org/guide/module) / 翻译 [AngularJs学习笔记--Modules - Lcllao - 博客园](http://www.cnblogs.com/lcllao/archive/2012/09/22/2698208.html)

<!--more-->

## Services

Services are singleton (single-instance) objects that carry out the tasks necessary to support your application’s functionality. Angular comes with many services like `$location`, for interacting with the browser’s location, `$route`, for switching views based on location (URL) changes, and` $http`, for communicating with servers.

In AngularJS the word service can refer to either the method of registering constructor functions (as shown in the previous example) or any singleton object that is created and managed by AngularJS DI system, regardless of the method of registering used (this is what most people mean by using the word service in the context of AngularJS modules).


With modules, and the dependency injection we get from them, we can write our controller much more simply, like this:

    function ShoppingController($scope, Items) {
      $scope.items = Items.query();
    }

简而言之，Service 就是 _单例对象_ 在AngluarJS 中的一个别名。这些小东西（指单例对象）会被经常传来传去，保证你每次访问到的都是同一个实例，这一点和工厂模式不同。基于这种思想，单例对象让我们可以 实现一些相当酷的功能，它可以让很多 controller 和 directive 访问内部的数值。

那么我们什么时候应该使用service呢？答案是：无论何时，当我们需要在不同的域中共享数据的时候。另外，多亏了Angular的依赖注入系统，实现这一点是很容易并且很清晰的。

通过 `$scope` 来维护数据是非常粗暴的一种方式。由于其它 `controller`、`directive`、`model` 的影响，`$scope` 很容易就会崩溃或者变脏。它很快就会变成一团乱麻。通过一种集中的途径（在这里就是 `service`）来管理数据，然后通过某种方式来请求修改它，这样不仅仅会更加清晰，同时当应用的体积不断增大的时候也更加容易管理。

You can, and should, create your own services to do all of the tasks unique to your application. Angular’s bundled services start with a `$`, so while you can name them anything you like, its a good idea to avoid starting them with `$` to avoid naming collisions.

As services themselves can have dependencies, the Module API lets you define dependencies for your dependencies.

__In most applications, it will work well enough to create a single module for all the code you create and put all of your dependencies in it.__ If you use services or directives from third-party libraries, they’ll come with their own modules. As your app depends on them, you’d refer to them as dependencies of your application’s module.

For instance, if you include the (fictitious) modules SnazzyUIWidgets and SuperDataSync, your application’s module declaration would look like this:

    var appMod = angular.module('app', ['SnazzyUIWidgets', 'SuperDataSync'];

### Registering services

You define services with the module object’s API. There are three functions for creating generic services, with different levels of complexity and ability:

#### Values

The easiest way of having AngularJS to manage an object is to register a pre-instantiated one as follows:

```js
var myMod = angular.module('myMod', []);
myMod.value('notificationsArchive', new NotificationsArchive());
```

Any service managed by AngularJS' DI mechanism needs to have a unique name (for example, `notificationsArchive` in the preceding example). What follows is a recipe for creating new instances.

Value objects are not particularly interesting, since object registered via this method can't depend on other objects. This is not much of the problem for the `NotificationArchive` instance, since it doesn't have any dependencies. In practice, this method of registration only works for very simple objects usually expressed as instances of built-in objects or object literals).

#### Services

`service(name, constructor())` A non-configurable service with simple creation logic. Like the constructor option with provider, Angular calls it to create the service instance.

We can't register the NotificationsService service as a value object, since we need to express a dependency on an archive service. The simplest way of registering a recipe for objects, depending on other objects, is to register a constructor function. We can do this using the `service` method as follows:

    myMod.service('notificationsService', NotificationsService);

where the `NotificationsService` constructor function can now be written as follows:

```js
var NotificationsService = function (notificationsArchive) {
    this.notificationsArchive = notificationsArchive;
};
```

By using AngularJS dependency injection we could eliminate the `new` keyword from the `NoficiationsService` constructor function. Now this service is not concerned with dependencies instantiation and can accept any archiving service. Our simple application is much more flexible now!

In practice the `service` method is not commonly used but might come in handy for registering pre-existing constructor functions, and thus make AngularJS manage objects created by those constructors.

#### Factories

`factory(name, $getFunction())` A non-configurable service with complex creation logic. You specify a function that, when called, returns the service instance. You could think of this as `provider(name, { $get: $getFunction() } )`.


It is more flexible as compared to the `service` method, since we can register any arbitrary object-creating function. An example is shown in the following code

```js
myMod.factory('notificationsService',function(notificationsArchive){

    var MAX_LEN = 10;
    var notifications = [];

    return {
      push:function (notification) {
        var notificationToArchive;
        var newLen = notifications.unshift(notification);

        //push method can rely on the closure scope now!
        if (newLen > MAX_LEN) {
          notificationToArchive = this.notifications.pop();
          notificationsArchive.archive(notificationToArchive);
        }
      },
      // other methods of the NotificationsService
    };
```

AngularJS will use a supplied `factory` function to register an object returned. It can be any valid JavaScript object, including `function` objects!

The `factory` method is the most common way of getting objects into AngularJS dependency injection system. It is very flexible and can contain sophisticated creation logic. Since factories are regular functions, we can also take advantage of a new lexical scope to simulate "private" variables. This is very useful as we can hide implementation details of a given service. Indeed, in the preceding example we can keep the `notificationToArchive` service, all the configuration parameters (`MAX_LEN`) and internal state (`notifications`) as "private".

#### Constants

Our `NotificationsService` is getting better and better, it is decoupled from its collaborators and hides its private state. ]()[Unfortunately, it still has a hard-coded configuration `MAX_LEN` constant. AngularJS has a remedy for this, that is, constants can be defined on a module level and injected as any other collaborating object.

Ideally, we would like to have our `NotificationsService` service to be provided with a configuration value in the following manner:

```js
myMod.factory('notificationsService', 

function (notificationsArchive, MAX_LEN) {
  …
  //creation logic doesn't change
});
```

And then supply configuration values outside of `NotificationsService`, on a module level as shown in the following code:

    myMod.constant('MAX_LEN', 10);

Constants are very useful for creating services that can be re-used across many different applications (as clients of a service can configure it at their will). There is only one disadvantage of using constants, that is, as soon as a service expresses a dependency on a constant, a value for this constant must be supplied. Sometimes it would be good to have default configuration values and allow clients to change them only when needed.

#### Provider

`provider(name, Object OR constructor())` A configurable service with complex creation logic. If you pass an Object, it should have a function named `$get` that returns an instance of the service. Otherwise, Angular assumes you’ve passed a constructor that, when called, creates the instance.

All the registration methods described so far are just special cases of the most generic, ultimate version of all of them, `provider`. Here is the example of registering the `notificationsService` service as a provider:

```js
myMod.provider('notificationsService', function () {

    var config = {
      maxLen : 10
    };
    var notifications = [];

    return {
      setMaxLen : function(maxLen) {
        config.maxLen = maxLen || config.maxLen;
      },

      $get : function(notificationsArchive) {
        return {
          push:function (notification) {
            …
            if (newLen > config.maxLen) {
              …
            }
          },
          // other methods go here
        };
      }
    };
  });
```

Firstly a `provider` is a function that must return an object containing the `$get` property. The mentioned `$get` property is a factory function, that when invoked should return a `service` instance. We can think of providers as objects that embed factory functions in their `$get` property.

Next, an object returned from a `provider` function can have additional methods and properties. Those are exposed, so it is possible to set configuration options before the `$get` (factory) method gets invoked. Indeed, we can still set the `maxLen` configuration property, but we are no longer obliged to do so. Furthermore, it is possible to have more complex configuration logic, as our services can expose configuration methods and not only simple configuration values.

### Services and their visibility across module

[Services defined on sibling modules are also visible to each other. We could move a `car` service ]()[into a separate module, and then change module dependencies, so that an application depends on both the `engines` and `cars` modules as follows:]()

```js
angular.module('app', ['engines', 'cars'])

angular.module('cars', [])
  .factory('car', function ($log, dieselEngine) {
    return {
      start: function() {
        $log.info('Starting ' + dieselEngine.type);
      }
    };
  });

angular.module('engines', [])
  .factory('dieselEngine', function () {
    return {
      type: 'diesel'
    };
  });
```

[In the preceding case an `engine` can still be injected into a `car` without any problem.]()

[Since AngularJS combines all the services from all the modules into one big, application-level set of services there can be one and only one service with a given name. We can use this to our advantage in cases where we want to depend on a module, but at the same time override some of the services from this module. To illustrate this, we can redefine the `dieselEngine` service directly in the `cars` module in the following manner:]()

```js
angular.module('app', ['engines', 'cars'])
  .controller('AppCtrl', function ($scope, car) {
    car.start();
  });

angular.module('cars', [])
  .factory('car', function ($log, dieselEngine) {
    return {
      start: function() {
        $log.info('Starting ' + dieselEngine.type);
      };
    }
  })

  .factory('dieselEngine', function () {
    return {
      type: 'custom diesel'
    };
  });
```

[In this case, the `car` service will be injected with the `dieselEngine` service defined in the same module as that of the `car` service. The `car` module level, `dieselEngine`, will override (shadow) the `dieselEngine` ]()[service defined under the `engines` module.]()

__Note:__ There can be one and only one service with a given name in an AngularJS application. Services defined in the modules closer to the root of modules hierarchy will override those defined in child modules.

## Modules lifecycle

In the previous paragraphs, we could see that AngularJS supports various recipes for object's creation. A `provider` is a special kind of recipe, since it can be further configured before it produces any object instances. To effectively support providers, AngularJS splits module's lifecycle into two phases, which are as follows:

- __The configuration phase:__ It is the phase where all the recipes are collected and configured
- __The run phase:__ It is the phase where we can execute any post-instantiation logic

### The configuration phase

Providers can be configured only during the configuration (first) phase. Surely, it doesn't make sense to change a recipe after objects are baked, right? Providers can be configured as shown in the following code:

```js
myMod.config(function(notificationsServiceProvider){
    notificationsServiceProvider.setMaxLen(5);
});
```

The important thing to notice here is a dependency on the `notificationsServiceProvider` objects with the `Provider` suffix representing the recipes that are ready to be executed. The configuration phase allows us to do the last-moment tweaks to the objects' creation formula.

### The run phase

The run phase allows us to register any work that should be executed upon the application's bootstrap. One could think of the run phase as an equivalent of the main method in other programming languages. The biggest difference is that AngularJS modules can have multiple configure and run blocks. In this sense, there is not even a single entry point (a running application is truly a collection of collaborating objects).

To illustrate how the run phase could be useful, let's imagine that we need to display application's start time (or uptime) to the users. To support this requirement, we could set application's start time as a property of the `$rootScope` instance as follows:

```js
angular.module('upTimeApp', []).run(function($rootScope) {
    $rootScope.appStarted = new Date();
});
```

And then retrieve it any template, as given in the following code:

    Application started at: {appStarted}


#### Different phases and different registration methods

Let's summarize different methods of creating objects and how those methods correspond to module's lifecycle phases:


&nbsp; | What gets registered?| Injectable during the configuration phase? | Injectable during the run phase?
---------- | ------------------ | --------- | --------
Constant   | Constant's value  | Yes  | Yes
Variable   | Variable's value   | -  | Yes
`Service`  | A new object created by a constructor function      | -  | Yes
`Factory`  | A new object returned from a `factory` function     | -  | Yes
`Provider` | A new object created by the `$get` factory function | Yes| -  

## Controller

Controllers have three responsibilities in your app:

* Set up the initial state in your application’s model
* Expose model and functions to the view (UI template) through `$scope`
* Watch other parts of the model for changes and take action.

Controller 应该纯粹地用来把 service、依赖关系、以及其它对象串联到一起，然后通过 scope 把它们关联到 view 上。如果在你的视图里面需要处理复杂的业务逻辑，那么把它们放到 controller 里面也是一个非常不错的选择。

在 Angular 中，controller 自身并不会处理 "request"，除非它是用来处理路由(route)的（很多人把这种方式叫做创建 _route controller_ ，路由控制器）。

> 就经验而言，千万不要在 AngularJS控制器中操作 DOM 元素。在控制器中获取一个DOM的引用，并操作DOM的属性，是在用命令式的方式控制UI -- 这是跟 AugularJS 构建 UI 的思想相悖的。
> —— [【译】《精通使用AngularJS开发Web App》（四）--- 深入视图，模板系统，模块和依赖注入](http://segmentfault.com/blog/chao2/1190000000361964)

### 全局控制器

我们可以向下面这样定义一个全局控制器：

```js
function TextController($scope) {
  $scope.someText = 'You have started your journey.';
}
```

You can think of scopes as a context that you use to make changes to your model observable.

全局定义的控制器构造函数只适用于快速示例和原型开发。永远不要在大型的、真实的应用中使用全局定义的控制器。

### 嵌套控制器

```html
<div ng-controller="ParentController">
  <div ng-controller="ChildController">...</div>
</div>
```

Though we express this as nested controllers, the actual nesting happens in scopes. The `$scope` passed to a nested controller prototypically inherits from its parent controller’s `$scope`. In this case, this means that the `$scope` passed to `ChildController` will have access to all the properties of the `$scope` passed to `ParentController`.

### Scope

AngularJS中的 `$scope` 对象在这里就是要将 域模型 暴露给视图（模板）。只需把属性设置给 scope 实例，就可以在模板渲染时得到这个值。

`$scope`对象让我们可以非常精确的控制这个域内的模型的哪一部分，以及哪些操作在视图层是可用的。理论上来讲，AngularJS的 scopes 非常类似于 MVVM 模式的 ViewModel。

See Also [Angular MVC Scope](http://inching.org/2014/09/23/angular-mvc-scope/)

## Model

AngularJS 的模型就是那些普通的 JavaScript 对象。使用任何现有的，纯JavaScript类或对象，就跟在模型层一样的去使用它们也是可以的。要把模型暴露给 AngularJS，你只需把它赋值给 $scope 的属性即可。

See [AngularJS 数据建模 / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-data-modeling/)

## View

导航到其他模板使用 `/#/` 开头的链接路径，如 `<a href="/#/new">New Recipe</a>`，这样可以防止主页面被重新加载。

`<div ng-view></div>` 用于定义模板容器。当路由发生变化时，路由对应的模板将替换这个 div 的内容。

如食谱列表的 template 定义如下：

```html
    <!-- app/views/list.html -->
    <h3>Recipe List</h3>
    <ul class="recipes">
      <li ng-repeat="recipe in recipes">
        <div><a href="/#/view/{{recipe.id}}">{{recipe.title}}</a></div>
      </li>
    </ul>
```

### Templates

In Angular, templates are written with HTML that contains Angular-specific elements and attributes. Angular combines the template with information from the model and controller to render the dynamic view that a user sees in the browser.

Once in the web browser, Angular expands these templates into your full application by merging your template with data.

```html
<div ng-repeat="item in items">
  <span>{{item.title}}</span>
  ...
</div>
```

Angular 模板可以通过内存加载、AJAX 两种方式加载，See [Angular Template Loading](http://inching.org/2014/09/23/angular-mvc-template/).

## Demo

一个完整的使用 Angular MVC 的例子：[angularjs-book/chapter4/guthub](https://github.com/shyamseshadri/angularjs-book/tree/master/chapter4/guthub)

在定义 router 时，我们使用了 resolve 对象：

```js
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'ListCtrl',
        resolve: {
          recipes: function(MultiRecipeLoader) {
            return MultiRecipeLoader();
          }
        },
        templateUrl:'/views/list.html'
      })
      ...
}
```

This `resolve` object tells AngularJS that each of these resolve keys needs to be satisfied before the route can be displayed to the user. For us, we want to load all the recipes, or an individual recipe, and make sure we have the server response before we display the page. So we tell the route provider that we have recipes (or a recipe), and then tell it how to fetch it.

If the resolve function returns an AngularJS promise, then AngularJS is smart enough to wait for the promise to get resolved before it proceeds. That means that it will wait until the server responds.

## Reference

- [AngularJS：何时应该使用Directive、Controller、Service？](http://damoqiongqiu.iteye.com/blog/1971204)
- [【译】《精通使用AngularJS开发Web App》（二） --- 框架概览，双向数据绑定，MVC，scope，控制器，模型](http://segmentfault.com/blog/chao2/1190000000360976)

## Tutorial

- [Angular 2.0 / Owen Chen](http://owenchen.duapp.com/index.php/angular-2-0/)
- [AngularJS 数据建模 / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-data-modeling/)
