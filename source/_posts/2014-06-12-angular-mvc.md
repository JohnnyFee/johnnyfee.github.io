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

## Services

Services are singleton (single-instance) objects that carry out the tasks necessary to support your application’s functionality. Angular comes with many services like `$location`, for interacting with the browser’s location, `$route`, for switching views based on location (URL) changes, and` $http`, for communicating with servers.

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

### define

You define services with the module object’s API. There are three functions for creating generic services, with different levels of complexity and ability:

- `provider(name, Object OR constructor())` A configurable service with complex creation logic. If you pass an Object, it should have a function named `$get` that returns an instance of the service. Otherwise, Angular assumes you’ve passed a constructor that, when called, creates the instance.

- `factory(name, $getFunction())` A non-configurable service with complex creation logic. You specify a function that, when called, returns the service instance. You could think of this as `provider(name, { $get: $getFunction() } )`.

- `service(name, constructor())` A non-configurable service with simple creation logic. Like the constructor option with provider, Angular calls it to create the service instance.

We’ll look at the configuration option for `provider()` later, but let’s discuss an example with `factory()` for our preceding Items example. We can write the service like this:

```
// Create a module to support our shopping views
var shoppingModule = angular.module('ShoppingModule', []);

// Set up the service factory to create our Items interface to the
// server-side database
shoppingModule.factory('Items', function() {
  var items = {};
  items.query = function() {
    // In real apps, we'd pull this data from the server...
    return [
      {title: 'Paint pots', description: 'Pots full of paint', price: 3.95},
      {title: 'Polka dots', description: 'Dots with polka, price: 2.95},
      {title: 'Pebbles', description: 'Just little rocks', price: 6.95}
    ];
  };
  return items;
});
```

```js
function ShoppingController($scope, Items) {...}
```

When Angular creates the `ShoppingController`, it will pass in `$scope` and the new Items service that we’ve just defined. This is done by parameter name matching. That is, Angular looks at the function signature for our `ShoppingController` class, and notices that it is asking for an `Items` object. Since we’ve defined Items as a service, it knows where to get it.

The result of looking up these dependencies as strings means that the arguments of injectable functions like controller constructors are order-independent. So instead of this:

we can write this:

    function ShoppingController(Items, $scope) {...}

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

## Directives

Directives extend HTML syntax, and are the way to associate behavior and DOM transformations with custom elements and attributes. Through them, you can create reusable UI components, configure your application, and do almost anything else you can imagine wanting to do in your UI template.

You can write apps with the built-in directives that come with Angular, but you’ll likely run into situations where you want to write your own. You’ll know it’s time to break into directives when you want to deal with __browser events or modify the DOM__ in a way that isn’t already supported by the built-in directives. This code of yours belongs in a directive that you write, and not in a controller, service, or any other place in your app.

As with services, you define directives through the module object’s API by calling its `directive()` function, where directiveFunction is a factory function that defines your directive’s features.

    var appModule = angular.module('appModule', [...]);
    appModule.directive('directiveName', directiveFunction);

We can now move to the directives we will be using in our application. There will be two directives in the app:

- butterbar
  
    This directive will be shown and hidden when the routes change and while the page is still loading information. It will hook into the route-changing mechanism and automatically hide and show whatever is within its tag ,based on the state of the page.

- focus
  
    The focus directive is used to ensure that specific input fields (or elements) have the focus.

Let’s look at the code:

```js
// app/scripts/directives/directives.js
var directives = angular.module('guthub.directives', []);

directives.directive('butterbar', ['$rootScope',
    function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      element.addClass('hide');

      $rootScope.$on('$routeChangeStart', function() {
        element.removeClass('hide');
      });

      $rootScope.$on('$routeChangeSuccess', function() {
        element.addClass('hide');
      });
    }
  };
}]);

directives.directive('focus',
    function() {
  return {
    link: function(scope, element, attrs) {
      element[0].focus();
    }
  };
});
```

Here, we’re returning the directive configuration object with its `link` function specified. The `link` function gets a reference to the enclosing scope, the DOM `element` it lives on, an array of any `attributes` passed to the directive, and the `controller` on the DOM element, if it exists. Here, we only need to get at the element and call its `focus()` method.

Directives go through a two-step process. 

1. In the first step (the compile phase), all directives attached to a DOM element are found, and then processed. Any DOM manipulation also happens during the compile step. At the end of this phase, a linking function is produced.
2. In the second step, the link phase (the phase we used previously), the preceding DOM template produced is linked to the scope. Also, any watchers or listeners are added as needed, resulting in a live binding between the scope and the element. Thus, anything related to the scope happens in the linking phase.

The `butterbar` directive can be used as follows:

    <div butterbar>My loading text...</div>

It basically hides the element right up front, then adds two watches on the root scope. Every time a route change begins, it shows the element (by changing its class), and every time the route has successfully finished changing, it hides the butterbar again.

The final thing of note is the API for working with the element. jQuery veterans will be glad to know that it follows a jQuery-like syntax (`addClass`, `removeClass`). AngularJS implements a subset of the calls of jQuery so that jQuery is an optional dependency for any AngularJS project. In case you do end up using the full jQuery library in your project, you should know that AngularJS uses that instead of the jQlite implementation it has built-in.

我们能否在控制器上实现上面的功能呢？当然可以，但是这样做会带来一个重大的问题。一旦其他的 Controller 需要实现相同的功能，可能需要拷贝代码。

See:

- [AngularJS 指令（Directives）实践指南（一） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide/)
- [AngularJS 指令（Directives）实践指南（二） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide-b/)
- [AngularJS 指令（Directives）实践指南（三） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide-c/)

### Library

- [voronianski/ngActivityIndicator](https://github.com/voronianski/ngActivityIndicator/) Angular provider for preloader animations 
<http://labs.voronianski.com/ngActivityIndicator.js>.
- [ngReactGrid by josebalius](http://josebalius.github.io/ngReactGrid) ngReactGrid is an Angular directive that can be used to render an enhanced HTML table or grid of data very fast using React as the rendering engine. It is based on ng-grid and jQuery DataTables. It uses HTML tables and supports fixed column headers by default.

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
