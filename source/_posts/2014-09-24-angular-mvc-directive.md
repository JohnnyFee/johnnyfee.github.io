---
layout: post
title: "Angular Directive"
category : Angular
tags : [angular, tutorial]
--- 

## Directives

Directives extend HTML syntax, and are the way to associate behavior and DOM transformations with custom elements and attributes. Through them, you can create reusable UI components, configure your application, and do almost anything else you can imagine wanting to do in your UI template.

You can write apps with the built-in directives that come with Angular, but you’ll likely run into situations where you want to write your own. You’ll know it’s time to break into directives when you want to deal with __browser events or modify the DOM__ in a way that isn’t already supported by the built-in directives. This code of yours belongs in a directive that you write, and not in a controller, service, or any other place in your app.

相对 JQuery 实现控件的方式，Directives 更具语义性，从 HTML 便可知控件的含义。

<!--more-->

As with services, you define directives through the module object’s API by calling its `directive()` function, where directiveFunction is a factory function that defines your directive’s features.

    var appModule = angular.module('appModule', [...]);
    appModule.directive('directiveName', directiveFunction);

## Custom Directive

一个Angular指令可以有以下的四种表现形式：

1. 一个新的HTML元素（`<data-picker></data-picker>`）

2. 元素的属性（`<input type=”text” data-picker/>`）

3. CSS class（`<input type=”text” class=”data-picker”/>`）

4. 注释（`<!- directive:data-picker –>`）

指令注册的方式与 controller 一样，但是它返回的是一个拥有指令配置属性的简单对象(指令定义对象) 。下面的代码是一个简单的 Hello World 指令。

```js
var app = angular.module('myapp', []);
  
app.directive('helloWorld', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: '<h3>Hello World!!</h3>'
  };
});
```

在上面的代码中，`app.directive()` 方法在模块中注册了一个新的指令。这个方法的第一个参数是这个指令的名字。第二个参数是一个返回指令定义对象的函数。如果你的指令依赖于其他的对象或者服务，比如 `$rootScope`, `$http`, 或者 `$compile`，他们可以在这个时间被注入。

这个指令在HTML中以一个元素使用，如`<hello-world/>` 或者 `<hello:world/>`。

也可以以一个属性的方式使用，如 `<div hello-world></div>` 或者 `<div hello:world/>`。

如果你想要符合HTML5的规范，你可以在元素前面添加 x- 或者 data-的前缀。所以下面的标记也会匹配 helloWorld 指令，如 `<div data-hello-world></div>` 或者 `<div x-hello-world></div>`。

在匹配指令的时候，Angular会在元素或者属性的名字中剔除 x- 或者 data- 前缀。 然后将 – 或者 : 连接的字符串转换成驼峰(camelCase)表现形式，然后再与注册过的指令进行匹配。这是为什么，我们在HTML中以 hello-world 的方式使用 helloWorld 指令。其实，这跟HTML对标签和属性不区分大小写有关。

我们在指令定义过程中使用了三个属性来配置指令：

- `restrict` 这个属性用来指定指令在HTML中如何使用（还记得之前说的，指令的四种表示方式吗）。在上面的例子中，我们使用了 'AE'。所以这个指令可以被当作新的HTML元素或者属性来使用。如果要允许指令被当作class来使用，我们将 restrict 设置成 'AEC'。

    1.  `<span class="str">'A'</span>` - only matches attribute name
    2.  `<span class="str">'E'</span>` - only matches element name
    3.  `<span class="str">'C'</span>` - only matches class name

- `template`/`templateUrl` 这个属性规定了指令被Angular编译和链接（link）后生成的HTML标记。这个属性值不一定要是简单的字符串。template 可以非常复杂，而且经常包含其他的指令，以及表达式(`{%raw%}{{ }}{%raw%}`)等。`template` 只用于 templete 内容比较少的情况，更多的情况下你可能会见到 `templateUrl`。所以，理想情况下，你应该将模板放到一个特定的HTML文件中，然后将 templateUrl 属性指向它。
- `replace` 这个属性指明生成的HTML内容是否会替换掉定义此指令的HTML元素。在我们的例子中，我们用 `<hello-world></hello-world>` 的方式使用我们的指令，并且将 replace 设置成 true。所以，在指令被编译之后，生成的模板内容替换掉了 `<hello-world></hello-world>`。最终的输出是 `<h3>Hello World!!</h3>`。如果你将 replace 设置成 false，也就是默认值，那么生成的模板会被插入到定义指令的元素中。

打开这个 [plunker](http://plnkr.co/edit/GKI339z2VDdZTOE2bGFP)，在”Hello World!!”右键检查元素内容，来更形象地明白这些。

## Link

指令生成出的模板其实没有太多意义，除非它在特定的scope下编译。默认情况下，指令并不会创建新的子scope。更多的，它使用父scope。也就是说，如果指令存在于一个controller下，它就会使用这个controller的scope。

如何运用scope，我们要用到一个叫做 link 的函数。它由指令定义对象中的link属性配置。让我们来改变一下我们的 helloWorld 指令，当用户在一个输入框中输入一种颜色的名称时，Hello World 文字的背景色自动发生变化。同时，当用户在 Hello World 文字上点击时，背景色变回白色。 相应的HTML标记如下：

```html
<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color" />
  <hello-world/>
</body>
```

修改后的 helloWorld 指令如下：

```js
app.directive('helloWorld', function() {
  return {
    restrict: 'AE',
    replace: true,
    template: '<p style="background-color:{{color}}">Hello World',
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        elem.css('background-color', 'white');
        scope.$apply(function() {
          scope.color = "white";
        });
      });
      elem.bind('mouseover', function() {
        elem.css('cursor', 'pointer');
      });
    }
  };
});
```

我们注意到指令定义中的 link 函数。 它有三个参数：

- `scope` 指令的scope。在我们的例子中，指令的scope就是父controller的scope。
- `elem` 指令的jQLite(jQuery的子集)包装DOM元素。如果你在引入AngularJS之前引入了jQuery，那么这个元素就是jQuery元素，而不是jQLite元素。由于这个元素已经被jQuery/jQLite包装了，所以我们就在进行DOM操作的时候就不需要再使用 $()来进行包装。
- `attr` 一个包含了指令所在元素的属性的标准化的参数对象。举个例子，你给一个HTML元素添加了一些属性：`<hello-world some-attribute=""></hello-world>`，那么可以在 link 函数中通过 `attrs.someAttribute` 来使用它。

link 函数主要用来为DOM元素添加事件监听、监视模型属性变化、以及更新DOM。在上面的指令代码片段中，我们添加了两个事件，click 和 mouseover。click 处理函数用来重置 `<p>` 的背景色，而 mouseover 处理函数改变鼠标为 pointer。在模板中有一个表达式 `{{color}}`，当父 scope 中的 color 发生变化时，它用来改变 Hello World 文字的背景色。 这个 [plunker](http://plnkr.co/edit/14q6WxHyhWuVxEIqwww1) 演示了这些概念。

## Compile

compile 函数在 link 函数被执行之前用来做一些DOM改造。它接收下面的参数：

- tElement – 指令所在的元素
- attrs – 元素上赋予的参数的标准化列表

要注意的是 compile 函数不能访问 scope，并且必须返回一个 link 函数。但是如果没有设置 compile 函数，你可以正常地配置 link 函数，（有了compile，就不能用link，link函数由compile返回）。compile函数可以写成如下的形式：

```js
app.directive('test', function() {
  return {
    compile: function(tElem,attrs) {
      //do optional DOM transformation here
      return function(scope,elem,attrs) {
        //linking function here
      };
    }
  };
});
```

大多数的情况下，你只需要使用 link 函数。这是因为大部分的指令只需要考虑注册事件监听、监视模型、以及更新DOM等，这些都可以在 link 函数中完成。 但是对于像 ng-repeat 之类的指令，需要克隆和重复 DOM 元素多次，在 link 函数执行之前由 compile 函数来完成。这就带来了一个问题，为什么我们需要两个分开的函数来完成生成过程，为什么不能只使用一个？要回答好这个问题，我们需要理解指令在Angular中是如何被编译的！

## 指令是如何被编译的

当应用引导启动的时候，Angular开始使用 $compile 服务遍历DOM元素。这个服务基于注册过的指令在标记文本中搜索指令。一旦所有的指令都被识别后，Angular执行他们的 compile 方法。如前面所讲的，compile 方法返回一个 link 函数，被添加到稍后执行的 link 函数列表中。这被称为编译阶段。如果一个指令需要被克隆很多次（比如 ng-repeat），compile函数只在编译阶段被执行一次，复制这些模板，但是link 函数会针对每个被复制的实例被执行。所以分开处理，让我们在性能上有一定的提高。这也说明了为什么在 compile 函数中不能访问到scope对象。

在编译阶段之后，就开始了链接（linking）阶段。在这个阶段，所有收集的 link 函数将被一一执行。指令创造出来的模板会在正确的scope下被解析和处理，然后返回具有事件响应的真实的DOM节点。

## Transclusion（嵌入）

`ng-transclude` 指明插入的位置，带有 `ng-transclude` 指令标签的元素会被删除，然后被替换为指令的内容。

假设我们注册一个如下的指令：

```js
<div ng-controller="Ctrl">
      <input ng-model="title"><br>
      <textarea ng-model="text"></textarea> <br/>
      <pane title="{{title}}">{{text}}</pane>
</div>
```

pane是一个自定义derective，标签里还有一个表达式，这个指令的目的是显示 input中输入的title，和textarea中输入的text，当然是按照一定的dom结构显示。看下pane是如何实现：

```js
app.directive('pane', function(){
    return {
      restrict: 'E',
      transclude: true,
      scope: { title:'@' },
      template: '<div style="border: 1px solid black;">' +
                  '<div style="background-color: gray">{{title}}</div>' +
                  '<div ng-transclude></div>' +
                '</div>'
    };
});
```

我们想把 `<pane title="{{title}}">{{text}}</pane>` 中 `{{title}}` 和 `{{text}}` 变量的内容封装到我们的 dom 结构中，`{{title}}` 可以通过结构 `scope: { title:'@' }` 取得，`<panel></panel>` 标签之间的内容将替换模板中的 `<div ng-transclude></div>`。

生成的 DOM 为：

```html
<pane title="Tobias" class="ng-isolate-scope">
    <div style="border: 1px solid black;">
        <div style="background-color: gray" class="ng-binding">Tobias</div>
        <div ng-transclude="">
            <span class="ng-scope ng-binding">12121212</span>
        </div>
    </div>
</pane>
```

也可以直接使用父scope中定义的 `{{title}}` 而非子scope。你可以在这个[Plunker](http://plnkr.co/edit/YQBPB9cvGgJiYMuIjzTw?p=preview)。如果你想要学习更多关于scope的知识，可以阅读[这篇文章](https://github.com/angular/angular.js/wiki/Understanding-Scopes)。

另外，transclude 可以在 compile 函数和 controller 函数中使用，See [angular 的 Transclude](http://www.angularjs.cn/A0pU)。

transclude 有两个值可选，分别为 `element` 和 `true`。

使用 `transclude: true` 会将嵌入的内容插入指令标签内部，而 `transclude: 'element'` 会替换指令标签。

See also：

- [angularjs - when to use transclude 'true' and transclude 'element' - Stack Overflow](http://stackoverflow.com/questions/18449743/when-to-use-transclude-true-and-transclude-element)
- [In the trenches: Transclude in AngularJS](http://blog.omkarpatil.com/2012/11/transclude-in-angularjs.html)

## controller 函数和 require

如果你想要允许其他的指令和你的指令发生交互时，你需要使用 controller 函数。比如有些情况下，你需要通过组合两个指令来实现一个UI组件。那么你可以通过如下的方式来给指令添加一个 controller 函数。

```js
app.directive('outerDirective', function() {
  return {
    scope: {},
    restrict: 'AE',
    controller: function($scope, $compile, $http) {
      // $scope is the appropriate scope for the directive
      this.addChild = function(nestedDirective) { // this refers to the controller
        console.log('Got the message from nested directive:' + nestedDirective.message);
      };
    }
  };
});
```

这个代码为指令添加了一个名叫 outerDirective 的controller。当另一个指令想要交互时，它需要声明它需要引用(require)你的指令的 controller 实例。可以通过如下的方式实现：

```js
app.directive('innerDirective', function() {
  return {
    scope: {},
    restrict: 'AE',
    require: '^outerDirective',
    link: function(scope, elem, attrs, controllerInstance) {
      //the fourth argument is the controller instance you require
      scope.message = "Hi, Parent directive";
      controllerInstance.addChild(scope);
    }
  };
});
```

相应的HTML代码如下：

```html
<outer-directive>
  <inner-directive></inner-directive>
</outer-directive>
```

require: '^outerDirective' 告诉Angular在元素以及它的父元素中搜索controller。这样被找到的 controller 实例会作为第四个参数被传入到 link 函数中。在我们的例子中，我们将嵌入的指令的scope发送给父亲指令。如果你想尝试这个代码的话，请在开启浏览器控制台的情况下打开这个[Plunker](http://plnkr.co/edit/NMWGE6l9p1tBZh3jCfKn?p=preview)。同时，[这篇Angular官方文档](http://docs.angularjs.org/guide/directive)上的最后部分给了一个非常好的关于指令交互的例子，是非常值得一读的。

## Demo

### Notepad

See [AngularJS 指令（Directives）实践指南（三） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide-c/)

### butterbar & focus

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

### Clock

In this example we will build a directive that displays the current time. Once a second, it updates the DOM to reflect the current time.

In our link function, we want to update the displayed time once a second, or whenever a user changes the time formatting string that our directive binds to. We will use the `$interval` service to call a handler on a regular basis. This is easier than using `$timeout` but also works better with end-to-end testing, where we want to ensure that all `$timeouts` have completed before completing the test. We also want to remove the `$interval` if the directive is deleted so we don't introduce a memory leak.

```js
// script.js
angular.module('docsTimeDirective', [])
  .controller('Controller', ['$scope', function($scope) {
    $scope.format = 'M/d/yy h:mm:ss a';
  }])
  .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

    function link(scope, element, attrs) {
      var format,
          timeoutId;

      function updateTime() {
        element.text(dateFilter(new Date(), format));
      }

      scope.$watch(attrs.myCurrentTime, function(value) {
        format = value;
        updateTime();
      });

      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });

      // start the UI update process; save the timeoutId for canceling
      timeoutId = $interval(function() {
        updateTime(); // update DOM
      }, 1000);
    }

    return {
      link: link
    };
  }]);
```

```html
<div ng-controller="Controller">
  Date format: <input ng-model="format"> <hr/>
  Current time is: <span my-current-time="format"></span>
</div>
```

There are a couple of things to note here. Just like the `module.controller` API, the function argument in `module.directive` is dependency injected. Because of this, we can use `$interval` and dateFilter inside our directive's link function.

We register an event `element.on('$destroy', ...)`. What fires this `$destroy` event?

There are a few special events that AngularJS emits. When a DOM node that has been compiled with Angular's compiler is destroyed, it emits a $destroy event. Similarly, when an AngularJS scope is destroyed, it broadcasts a $destroy event to listening scopes.

By listening to this event, you can remove event listeners that might cause memory leaks. Listeners registered to scopes and elements are automatically cleaned up when they are destroyed, but if you registered a listener on a service, or registered a listener on a DOM node that isn't being deleted, you'll have to clean it up yourself or you risk introducing a memory leak.

__Best Practice:__ Directives should clean up after themselves. You can use element.on('$destroy', ...) or scope.$on('$destroy', ...) to run a clean-up function when the directive is removed.

## Library

- [voronianski/ngActivityIndicator](https://github.com/voronianski/ngActivityIndicator/) Angular provider for preloader animations 
<http://labs.voronianski.com/ngActivityIndicator.js>.
- [ngReactGrid by josebalius](http://josebalius.github.io/ngReactGrid) ngReactGrid is an Angular directive that can be used to render an enhanced HTML table or grid of data very fast using React as the rendering engine. It is based on ng-grid and jQuery DataTables. It uses HTML tables and supports fixed column headers by default.

## Tutorial

- [AngularJS: Developer Guide: Directives](https://docs.angularjs.org/guide/directive)
- [AngularJS 指令（Directives）实践指南（一） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide/)
- [AngularJS 指令（Directives）实践指南（二） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide-b/)
- [AngularJS 指令（Directives）实践指南（三） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide-c/)
- [AngularJS Directives – Basics – One Hungry Mind](http://onehungrymind.com/angularjs-directives-basics/)
- [AngularJS Sticky Notes Pt 2 – Isolated Scope – One Hungry Mind](http://onehungrymind.com/angularjs-sticky-notes-pt-2-isolated-scope/)
