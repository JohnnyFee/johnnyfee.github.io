---
layout: post
title: "Angular MVC"
category : Angular
tags : [angular, tutorial]
--- 

本书为读 [AngularJS](http://www.salttiger.com/angularjs/) 的读书笔记，该书的例子在 [shyamseshadri/angularjs-book](https://github.com/shyamseshadri/angularjs-book)。

## module

`module` 扮演一个其他的AngularJS需要管理的对象（控制器、服务等）的容器。要定义一个新的模块，我们需要给 `module` 方法的第一个参数提供模块的名字，第二个参数指定所需要依赖的模块。

    var appModule = angular.module('app', ['module1', 'module2']);

`angular.module` 方法的调用会返回一个新创建的模块的实例。一旦我们是用这个实例，就可以开始定义新的控制器了。

    var appModule = angular.module('app');

如果只给 `angular.module` 传入第一个参数，即模块名，那么该方法将返回指定名字的模块。

在大多数应用中，一般创建一个 module， 并申明所有的依赖就足够了。

See [AngularJS: Developer Guide: Modules](https://docs.angularjs.org/guide/module) / 翻译 [AngularJs学习笔记--Modules - Lcllao - 博客园](http://www.cnblogs.com/lcllao/archive/2012/09/22/2698208.html)

<!--more-->

## Services

服务是用来实现应用功能的单例对象。Angular 本身提供了很多服务，如操作浏览器地址的 `$location`，根据地址的改变来切换视图的 `$route`，和服务器通信的 `$http`。 服务可以是注册的构造函数，也可以是被 AngularJS DI 系统创建和管理的单例对象。

AngularJS 的 DI 机制要求所有的服务具有唯一的服务名。

Angular 内置的服务都是以 `$` 开头，当你定义自己的服务时，请尽量避免使用 `$` 开头。

使用服务和依赖注入，我们可以更简单地编写 controller：

```js
function ShoppingController($scope, Items) {
  $scope.items = Items.query();
}
```

那么我们什么时候应该使用service呢？答案是：无论何时，当我们需要在不同的域中共享数据的时候。另外，多亏了Angular的依赖注入系统，实现这一点是很容易并且很清晰的。

通过 `$scope` 来维护数据是非常粗暴的一种方式。由于其它 `controller`、`directive`、`model` 的影响，`$scope` 很容易就会崩溃或者变脏。它很快就会变成一团乱麻。通过一种集中的途径（在这里就是 `service`）来管理数据，然后通过某种方式来请求修改它，这样不仅仅会更加清晰，同时当应用的体积不断增大的时候也更加容易管理。

### 定义服务

服务 module 对象的 API 来定义，可以通过以下几种方法来创建服务。

#### Values

让 Angular 管理一个对象的最简单方式是注册一个已经实例化的对象：

```js
var myMod = angular.module('myMod', []);
myMod.value('notificationsArchive', new NotificationsArchive());
```

这种方式非常简单，无法定义服务的依赖，所以仅适用于与注册已经实例化的对象。

#### Services

`service(name, constructor())` 适用于创建无配置，只有简单逻辑的服务。Angular 使用这个方法来创建服务实例。

假设 `NotificationsService` 服务需要依赖一个 archive 服务，那么这就不能用 Value 方法定义了。最简单的方法是通过 `service` 方法注册一个构造函数。如：

    myMod.service('notificationsService', NotificationsService);

`NotificationsService` 构造函数依赖其他服务，如：

```js
var NotificationsService = function (notificationsArchive) {
    this.notificationsArchive = notificationsArchive;
};
```

通过使用依赖注入，我们可以从 `NoficiationsService`  构造函数中消除 `new` 关键字。现在这个服务不用关心依赖的实例化，并且可以接受任何 archiving 服务。

实际上，`service` 方法不常用，主要用于注册已经存在的构造函数，从而让 AngularJS 能够管理这些构造函数创建出来的对象。

#### Factories

`factory(name, $getFunction())` 适用于创建无配置，具有复杂逻辑的服务。

相对 `service` 方法，这种方式更灵活，因为我们注册的是一个可以创建任意对象的函数。这个函数可以放回任意合法的 JavaScript 对象，包括 `function` 对象。

`factory` 方法等效于 `provider(name, { $get: $getFunction() } )`。

如：

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

`factory` 方法是把对象注入到 AngularJS DI 系统最常用的方式。这种方式很灵活，并且可以包含复杂的逻辑。因为放回服务实例的工厂只是普通的函数，所以我们可以利用词法作用域来模拟私有变量。如上例中，我们可以 `MAX_LEN` 和 `notifications` 都是私有变量。

#### Constants

`NotificationsService` 仍然一个缺陷，它有一个硬编码的 `MAX_LEN` 常量。可以使用 `constant` 方法定义一个表示常量的服务，如：

    myMod.constant('MAX_LEN', 10);

然后，把该常量服务作为 `NotificationsService` 服务的依赖：

```js
myMod.factory('notificationsService', 

function (notificationsArchive, MAX_LEN) {
  …
  //creation logic doesn't change
});
```

Constants 适用于可以在多个应用中使用的常量服务，不同应用可以配置这些常量。

#### Provider

以上所有的注册方法都是 `provider` 方法的特殊案例。 `provider(name, Object OR constructor())` 适用于创建可配置的具有复杂逻辑的服务。

首先，`provider` 是方法，该方法返回一个包含 `$get` 属性的对象，`$get` 是一个方法，该方法返回 `service` 实例。我们可以认为 providers 是把工程方法嵌入在 `$get` 属性中的对象。

其次，`provider` 函数中返回的对象可以有其他方法和属性。这些方法和属性被暴露出去，所以可以在 `$get` 工厂方法调用之前设置配置选项。 Indeed, we can still set the `maxLen` configuration property, but we are no longer obliged to do so. Furthermore, it is possible to have more complex configuration logic, as our services can expose configuration methods and not only simple configuration values.

Here is the example of registering the `notificationsService` service as a provider:

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

### Service 跨模块可见性

定义在相邻模块的服务对彼此也是可见的。比如下例中，我们可以把 `car` 服务移动到单独的模块中，让后改变模块的依赖，使应用同时依赖 `engines` and `cars`： 

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

在一个 AnuglarJS 应用中服务的名字都不能相同。靠近应用模块的服务将覆盖其他子模块的同名服务。

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

在上例中，`car` 服务被注入 `dieselEngine` 服务，`dieselEngine` 服务和 `car` 服务在同一个模块中。`car` 模块中的 `dieselEngine` 服务将覆盖 `engines` 模块中 `dieselEngine` 服务。

## Modules lifecycle

对象创建的 `provider` 方法可以在创建对象实例之前可以进行一些配置。为了支持这个功能，AngularJS 可以把模块的生命周期划分为两个阶段，分别是配置阶段和运行阶段。

- __配置阶段：__ It is the phase where all the recipes are collected and configured
- __运行阶段:__ It is the phase where we can execute any post-instantiation logic

### 配置阶段

Providers 可以在配置阶段配置，如：

```js
myMod.config(function(notificationsServiceProvider){
    notificationsServiceProvider.setMaxLen(5);
});
```

这里依赖的是 `notificationsServiceProvider` 对象，`Provider` 后缀表示方法已经准备好执行了。配置阶段是我们能够在对象创建前做的最后一次调整。

### 运行阶段

运行阶段允许我们注册在应用启动的时候需要执行的任何任务。可以把运行阶段等价为其他语言中的 main 函数。不同之处在于 AngularJS 模块可以用多个配置块和运行块。

为了证明运行阶段是有用的，加入我们需要显示应用的启动时间（或者运行时间），我们可以把应用启动时间设置在 `$rootScope` 实例中：

```js
angular.module('upTimeApp', []).run(function($rootScope) {
    $rootScope.appStarted = new Date();
});
```

And then retrieve it any template, as given in the following code:

    Application started at: {appStarted}

总结一下服务中创建对象的不同方法和这些方法对应模块的生命周期的阶段：

&nbsp; | 注册的内容 | 配置阶段可注入 | 运行阶段可注入
---------- | ------------------ | --------- | --------
Constant   | Constant's value  | Yes  | Yes
Variable   | Variable's value   | -  | Yes
Service  | A new object created by a constructor function      | -  | Yes
Factory  | A new object returned from a `factory` function     | -  | Yes
Provider | A new object created by the `$get` factory function | Yes| -  

## Controller

Controllers 在你的应用中有三个职责：

* 初始化应用的模型
* 通过 `$scope` 暴露模型和方法到 views (UI template)
* 监视模型的变化并作出响应。

千万不要在 AngularJS控制器中操作 DOM 元素。在控制器中获取一个 DOM 的引用，并操作DOM的属性，是在用命令式的方式控制UI -- 这是跟 AugularJS 构建 UI 的思想相悖的。

Controller 应该纯粹地用来把 service、依赖关系、以及其它对象串联到一起，然后通过 scope 把它们关联到 view 上。如果在你的视图里面需要处理复杂的业务逻辑，那么把它们放到 controller 里面也是一个非常不错的选择。

在 Angular 中，controller 自身并不会处理 "request"，除非它是用来处理路由(route)的（很多人把这种方式叫做创建 _route controller_ ，路由控制器）。

### 全局控制器

我们可以向下面这样定义一个全局控制器：

```js
function TextController($scope) {
  $scope.someText = 'You have started your journey.';
}
```

全局定义的控制器构造函数只适用于快速示例和原型开发。永远不要在大型的、真实的应用中使用全局定义的控制器。

### 嵌套控制器

```html
<div ng-controller="ParentController">
  <div ng-controller="ChildController">...</div>
</div>
```

尽管我们把它叫做嵌套控制器，但实际上嵌套发生在作用域中。嵌 套控制器中的 `$scope` 原型继承于父控制器的 `scope`。

### Controller 间通信机制

Controller 之间的通信可以使用以下几种方式：

- 如果有父子关系，那么子 Controller 共享父 Controller 的属性。
- 使用 Angular 服务的方式。在ng中服务是一个单例，所以在服务中生成一个对象，该对象就可以利用依赖注入的方式在所有的控制器中共享。参照以下例子，在一个控制器修改了服务对象的值，在另一个控制器中获取到修改后的值。
- 基于事件方式。以下详细说明。

Angularjs为在scope中为我们提供了冒泡和隧道机制，$broadcast会把事件广播给所有子controller，而$emit则会将事件冒泡传递给父controller，$on则是angularjs的事件注册函数，有了这一些我们就能很快的以angularjs的方式去解决angularjs controller之间的通信，代码如下：

在一般情况下基于继承的方式已经足够满足大部分情况了，但是这种方式没有实现兄弟控制器之间的通信方式，所以引出了事件的方式 。基于事件的方式中我们可以里面作用的 `$on`, `$emit`, `$boardcast` 这几个方式来实现，其中 `$on` 表示事件监听，$emit表示向父级以上的 作用域触发事件，`$boardcast` 表示向子级以下的作用域广播事件。参照以下代码：


```js
function Sandcrawler($scope) {
    // 监听子 Controller 发送的事件。
    $scope.$on('requestDroidRecall', function(e) {
        // 向下广播事件。
        $scope.$broadcast('executeDroidRecall');
    });
}
function Droid($scope) {
    $scope.location = "Owen Farm";
    $scope.recallAllDroids = function() {
        // 向上传播事件
        $scope.$emit('requestDroidRecall');
    }

    // 监听父 Controller 发送的事件。
    $scope.$on('executeDroidRecall', function() { 
        $scope.location = "Sandcrawler"
    });
}
```

```html
<div ng-controller="Sandcrawler">
    <div ng-controller="Droid">
        <h2>R2-D2</h2>
        <p>Droid Location: {{location}}</p>
        <button ng-click="recallAddDroids()">Recall All Droids</button>
    </div>
    <div ng-controller="Droid">
        <h2>C-3PO</h2>
        <p>Droid Location: {{status}}</p>
        <button ng-click="recallAddDroids()">Recall All Droids</button>
    </div>
</div>
```

从这个用法我们可以引申出一种用于兄弟控制间进行通信的方法，首先我们一个兄弟控制中向父作用域触发一个事件，然后在父作用域 中监听事件，再广播给子作用域，这样通过事件携带的参数，实现了数据经过父作用域，在兄弟作用域之间传播。这里要注意的是，通过父元素作为中介进行传递的话，兄弟元素用的事件名不能一样，否则会进入死循环。

See: 

- [Angularjs Controller 间通信机制 - 破狼 - 博客园](http://www.cnblogs.com/whitewolf/archive/2013/04/16/3024843.html)
- [angular开发 控制器之间的通信 - 专栏 - 前端乱炖](http://www.html-js.com/article/1560)

## Model

AngularJS 的模型就是那些普通的 JavaScript 对象。使用任何现有的，纯JavaScript类或对象，就跟在模型层一样的去使用它们也是可以的。要把模型暴露给 AngularJS，你只需把它赋值给 `$scope` 的属性即可。

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

在 Angular 中，templates 是包含 Angular 特殊元素和属性的 HTML。Angular 结合 template 和来自模型和控制器的信息，将动态视图显示在浏览器上。

```html
<div ng-repeat="item in items">
  <span>{{item.title}}</span>
  ...
</div>
```

Angular 模板可以通过内存加载、AJAX 两种方式加载，See [Angular Template Loading](http://inching.org/2014/09/23/angular-template/).

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
