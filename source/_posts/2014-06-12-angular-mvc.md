layout: post
title: "Angular MVC"
category : Angular
tags : [angular, tutorial]
--- 

本文为读 [AngularJS](http://www.salttiger.com/angularjs/) 和  [Mastering Web Application Development with AngularJS](http://www.salttiger.com/mastering-web-application-development-angularjs/) 的读书笔记。

## module

`module` 扮演一个其他的AngularJS需要管理的对象（控制器、服务等）的容器。要定义一个新的模块，我们需要给 `module` 方法的第一个参数提供模块的名字，第二个参数指定所需要依赖的模块。

    var appModule = angular.module('app', ['module1', 'module2']);

`angular.module` 方法的调用会返回一个新创建的模块的实例。一旦我们是用这个实例，就可以开始定义新的控制器了。

    var appModule = angular.module('app');

如果只给 `angular.module` 传入第一个参数，即模块名，那么该方法将返回指定名字的模块。

在大多数应用中，一般创建一个 module， 并申明所有的依赖就足够了。

See: 

- [AngularJS: Developer Guide: Modules](https://docs.angularjs.org/guide/module) / 翻译 [AngularJs学习笔记--Modules - Lcllao - 博客园](http://www.cnblogs.com/lcllao/archive/2012/09/22/2698208.html)
- [Jorgen’s Weblog: The AngularJS Module System](http://blog.jorgenschaefer.de/2014/04/the-angularjs-module-system.html)

<!--more-->

### 生命周期

AngularJS 可以把模块的生命周期划分为两个阶段，分别是配置阶段和运行阶段。

- __配置阶段：__ get executed during the provider registrations and configuration phase. Only providers and constants can be injected into configuration blocks. This is to prevent accidental instantiation of services before they have been fully configured.

- __运行阶段:__ get executed after the injector is created and are used to kickstart the application. Only instances and constants can be injected into run blocks. This is to prevent further system configuration during application run time.

调用顺序：

1.  `app.config()`
2.  `app.run()`
3.  _directive's compile functions (if they are found in the dom)_
4.  `app.controller()`
5.  _directive's link functions (again if found)_

Here's a [simple demo](http://jsfiddle.net/ysq3m/) where you can watch each execute (and experiment if you'd like).

See [breeze - AngularJS app.run() documentation? - Stack Overflow](http://stackoverflow.com/questions/20663076/angularjs-app-run-documentation)

#### 配置阶段

There are some convenience methods on the module which are equivalent to the `config` block. For
example:

```js
angular.module('myModule', []).
  value('a', 123).
  factory('a', function() { return 123; }).
  directive('directiveName', ...).
  filter('filterName', ...);

// is same as

angular.module('myModule', []).
  config(function($provide, $compileProvider, $filterProvider) {
    $provide.value('a', 123);
    $provide.factory('a', function() { return 123; });
    $compileProvider.directive('directiveName', ...);
    $filterProvider.register('filterName', ...);
  });
```

When bootstrapping, first Angular applies all constant definitions. Then Angular applies configuration blocks in the same order they were registered.

我们可以在定义模块的时候配置模块：

```js
angular.module('admin-projects', [], function() {
  //configuration logic goes here
});
```

这种方法只能配置一个配置块，最常用的是通过 `module` 实例的 `config` 方法：

```js
angular.module('admin-projects', [])
  .config(function() {
    //configuration block 1
  })

  .config(function() {
    //configuration block 2
  });
```

#### 运行阶段

Run blocks are the closest thing in Angular to the main method. A run block is the code which needs to run to kickstart the application. It is executed after all of the service have been configured and the injector has been created. Run blocks typically contain code which is hard to unit-test, and for this reason should be declared in isolated modules, so that they can be ignored in the unit-tests.

运行阶段允许我们注册在应用启动的时候需要执行的任何任务。可以把运行阶段等价为其他语言中的 main 函数。不同之处在于 AngularJS 模块可以用多个配置块和运行块。

为了证明运行阶段是有用的，加入我们需要显示应用的启动时间（或者运行时间），我们可以把应用启动时间设置在 `$rootScope` 实例中：

```js
angular.module('upTimeApp', []).run(function($rootScope) {
    $rootScope.appStarted = new Date();
});
```

## Controller

Controllers 在你的应用中有三个职责：

* 初始化应用的模型。
* 通过 `$scope` 暴露模型和方法到 views (UI template)。
* 监视模型的变化并作出响应。

千万不要在 AngularJS 控制器中操作 DOM 元素。在控制器中获取一个 DOM 的引用，并操作 DOM 的属性，是在用命令式的方式控制UI -- 这是跟 AugularJS 构建 UI 的思想相悖的。

Controller 应该纯粹地用来把 service、依赖关系、以及其它对象串联到一起，然后通过 scope 把它们关联到 view 上。如果在你的视图里面需要处理复杂的业务逻辑，那么把它们放到 controller 里面也是一个非常不错的选择。

在 Angular 中，controller 自身并不会处理 "request"，除非它是用来处理路由(route)的（很多人把这种方式叫做创建 _route controller_ ，路由控制器）。

通过 `ng-controller` 指令为 DOM 元素指定控制器时，控制器的实例个数和 `ng-controller` 相同。

### 生命周期

See [javascript - What is the lifecycle of an AngularJS Controller? - Stack Overflow](http://stackoverflow.com/questions/16094940/what-is-the-lifecycle-of-an-angularjs-controller)

Controllers are not singletons. Anyone can create a new controller and they are never auto-destroyed. The fact is that it's generally bound to the life cycle of its underlying scope. The controller is not automatically destroyed whenever its scope is destroyed. However, after destroying an underlying scope, its controller is useless (at least, by design, it should be).

Answering your specific question, a `ngView` directive (as well for `ngController` directive) will always [create a new controller and a new scope](https://github.com/angular/angular.js/blob/master/src/ng/directive/ngView.js#L201-L206) every time a navigation happens. And the [last scope is going to be destroyed](https://github.com/angular/angular.js/blob/65f5e856a161e7c91b9ebde1360242dc704d0510/src/ngRoute/directive/ngView.js#L179) as well.

The life cycle "events" are quite simple. Your **"creation event"** is the construction of your controller itself. Just run your code. To know when it gets useless (**"destruction event"**), listen to scope `$destroy` event: 

```
$scope.$on('$destroy', function iVeBeenDismissed() {
  // say goodbye to your controller here
  // release resources, cancel request...
})
```

For `ngView` specifically, you are able to know when the content gets loaded through the scope event `$viewContentLoaded`:

```js
$scope.$on('$viewContentLoaded', function readyToTrick() {
  // say hello to your new content here
  // BUT NEVER TOUCHES THE DOM FROM A CONTROLLER
});
```

[Here is a Plunker](http://plnkr.co/edit/ZddQ5W?p=preview) with a concept proof (open your console window).

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

### ControllerAs

有两种为申明控制器的方式：

- one binds methods and properties directly onto the controller using this: n`g-controller="SettingsController1 as settings"`
- one injects $scope into the controller: `ng-controller="SettingsController2"`

The second option is more common in the Angular community, and is generally used in boilerplates and in this guide. However, there are advantages to binding properties directly to the controller and avoiding scope.

- Using `controller as` makes it obvious which controller you are accessing in the template when multiple controllers apply to an element.
- If you are writing your controllers as classes you have easier access to the properties and methods, which will appear on the scope, from inside the controller code.
- Since there is always a `.` in the bindings, you don't have to worry about prototypal inheritance masking primitives.

See:

- [AngularJS: API: ngController](https://docs.angularjs.org/api/ng/directive/ngController)
- [AngularJS’s Controller As and the vm Variable](http://www.johnpapa.net/angularjss-controller-as-and-the-vm-variable/)

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
