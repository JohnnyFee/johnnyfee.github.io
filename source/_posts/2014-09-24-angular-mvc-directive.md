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

- `template`/`templateUrl` 这个属性规定了指令被Angular编译和链接（link）后生成的HTML标记。这个属性值不一定要是简单的字符串。template 可以非常复杂，而且经常包含其他的指令，以及表达式(`{{ }}`)等。`template` 只用于 templete 内容比较少的情况，更多的情况下你可能会见到 `templateUrl`。所以，理想情况下，你应该将模板放到一个特定的HTML文件中，然后将 templateUrl 属性指向它。
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

## Scope

默认情况下，指令获取它父节点的 controller 的 scope。但这并不适用于所有情况。如果将父controller的scope暴露给指令，那么他们可以随意地修改 scope 的属性。在某些情况下，你的指令希望能够添加一些仅限内部使用的属性和方法。如果我们在父的scope中添加，会污染父scope。 其实我们还有两种选择：

- 一个子scope – 这个 scope 原型继承父 scope。
- 一个隔离的scope – 一个孤立存在不继承自父scope的scope。

这样的scope可以通过指令定义对象中 scope 属性来配置。下面的代码片段是一个例子：

```js
app.directive('helloWorld', function() {
  return {
    scope: true,  // use a child scope that inherits from parent
    restrict: 'AE',
    replace: 'true',
    template: '<h3>Hello World!!</h3>'
  };
});
```

上面的代码，让Angular给指令创建一个继承自父socpe的新的子scope。
另外一个选择，隔离的scope：

```js
app.directive('helloWorld', function() {
  return {
    scope: {},  // use a new isolated scope
    restrict: 'AE',
    replace: 'true',
    template: '<h3>Hello World!!</h3>'
  };
});
```

这个指令使用了一个隔离的scope。隔离的scope在我们想要创建可重用的指令的时候是非常有好处的。通过使用隔离的scope，我们能够保证我们的指令是自包含的，可以被很容易的插入到HTML应用中。 它内部不能访问父的scope，所保证了父scope不被污染。 

在我们的 helloWorld 指令例子中，如果我们将 scope 设置成 `{}`，那么上面的代码将不会工作。 它会创建一个新的隔离的scope，那么相应的表达式 `{{color}}` 会指向到这个新的scope中，它的值将是 `undefined`.

使用隔离的scope并不意味着我们完全不能访问父scope的属性。其实有一些技术可以允许我们访问父scope的属性，甚至监视他们的变化。

## 隔离scope和父scope之间的数据绑定

通常，隔离指令的scope会带来很多的便利，尤其是在你要操作多个scope模型的时候。但有时为了使代码能够正确工作，你也需要从指令内部访问父scope的属性。好消息是Angular给了你足够的灵活性让你能够有选择性的通过绑定的方式传入父scope的属性。让我们重温一下我们的 [helloWorld](http://plnkr.co/edit/14q6WxHyhWuVxEIqwww1?p=preview) 指令，它的背景色会随着用户在输入框中输入的颜色名称而变化。还记得当我们对这个指令使用隔离scope的之后，它不能工作了吗？现在，我们来让它恢复正常。

假设我们已经初始化完成app这个变量所指向的Angular模块。那么我们的 helloWorld 指令如下面代码所示：

```js
app.directive('helloWorld', function() {
  return {
    scope: {},
    restrict: 'AE',
    replace: true,
    template: '<p style="background-color:{{color}}">Hello World</p>',
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        elem.css('background-color','white');
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

使用这个指令的HTML标签如下：

```html
<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color"/>
  <hello-world/>
</body>
```

上面的代码现在是不能工作的。因为我们用了一个隔离的scope，指令内部的 `{{color}}` 表达式被隔离在指令内部的scope中(不是父scope)。但是外面的输入框元素中的 ng-model 指令是指向父scope中的 color 属性的。所以，我们需要一种方式来绑定隔离scope和父scope中的这两个参数。让我们来细究一下建立数据绑定的几种方式。

### 使用 @ 实现单向文本绑定

在下面的指令定义中，我们指定了隔离scope中的属性 color 绑定到指令所在HTML元素上的参数 colorAttr。在HTML标记中，你可以看到 `{{color}}` 表达式被指定给了 color-attr 参数。当表达式的值发生改变时，color-attr 参数也跟着改变。隔离 scope 中的 color 属性的值也相应地被改变。

```js
app.directive('helloWorld', function() {
  return {
    scope: {
      color: '@colorAttr'
    },
    ....
    // the rest of the configurations
  };
});
```

更新后的HTML标记代码如下：

```js
<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color"/>
  <hello-world color-attr="{{color}}"/>
</body>
```

我们称这种方式为单项绑定，是因为在这种方式下，你只能将字符串(使用表达式{{}})传递给参数。当父scope的属性变化时，你的隔离scope模型中的属性值跟着变化。你甚至可以在指令内部监控这个scope属性的变化，并且触发一些任务。然而，反向的传递并不工作。你不能通过对隔离scope属性的操作来改变父scope的值。

__注意点：__

当隔离scope属性和指令元素参数的名字一样是，你可以更简单的方式设置scope绑定：

```js
app.directive('helloWorld', function() {
  return {
    scope: {
      color: '@'
    },
    ....
    // the rest of the configurations
  };
});
```

相应使用指令的HTML代码如下：

    <hello-world color="{{color}}"/>

### 使用 = 实现双向绑定

让我们将指令的定义改变成下面的样子：

```js
app.directive('helloWorld', function() {
  return {
    scope: {
      color: '=color' // 当 = 后的值和属性名相等时，可以省略 = 后边的值。
    },
    ....
    // the rest of the configurations
  };
});
```

相应的HTML修改如下：

```html
<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color"/>
  <hello-world color="color"/>
</body>
```

与 @ 不同，这种方式让你能够给属性指定一个真实的 scope 数据模型，而不是简单的字符串。这样你就可以传递简单的字符串、数组、甚至复杂的对象给隔离scope。同时，还支持双向的绑定。每当父scope属性变化时，相对应的隔离scope中的属性也跟着改变，反之亦然。和之前的一样，你也可以监视这个scope属性的变化。

### 使用 & 在父scope中执行函数

有时候从隔离scope中调用父scope中定义的函数是非常有必要的。为了能够访问外部scope中定义的函数，我们使用 `&`。比如我们想要从指令内部调用 sayHello() 方法。下面的代码告诉我们该怎么做：

```js
app.directive('sayHello', function() {
  return {
    scope: {
      sayHelloIsolated: '&'
    },
    ....
    // the rest of the configurations
  };
});
```

相应的HTML代码如下：

```html
<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color"/>
  <say-hello sayHelloIsolated="sayHello()"/>
</body>
```

这个 [Plunker](http://plnkr.co/edit/k4scWKwtGBJw7lfKGqVJ?p=preview) 例子对上面的概念做了很好的诠释。

### 父scope、子scope以及隔离scope的区别

作为一个Angular的新手，你可能会在选择正确的指令scope的时候感到困惑。默认情况下，指令不会创建一个新的scope，而是沿用父scope。但是在很多情况下，这并不是我们想要的。如果你的指令重度地使用父scope的属性，甚至创建新的时，会污染父scope。让所有的指令都使用同一个父scope不会是一个好主意，因为任何人都可能修改这个scope中的属性。因此，下面的这个原则也许可以帮助你为你的指令选择正确的scope。

1. 父scope(scope: false) – 这是默认情况。如果你的指令不操作父scoe的属性，你就不需要一个新的scope。这种情况下是可以使用父scope的。

2. 子scope(scope：true) – 这会为指令创建一个新的scope，并且原型继承自父scope。如果你的指令scope中的属性和方法与其他的指令以及父scope都没有关系的时候，你应该创建一个新scope。在这种方式下，你同样拥有父scope中所定义的属性和方法。

3. 隔离scope(scope:{}) – 这就像一个沙箱！当你创建的指令是自包含的并且可重用的，你就需要使用这种scope。你在指令中会创建很多scope属性和方法，它们仅在指令内部使用，永远不会被外部的世界所知晓。如果是这样的话，隔离的scope是更好的选择。隔离的scope不会继承父scope。

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

### Scope

如果你在指令定义中设置 `transclude:true`，一个新的嵌入的scope会被创建，它原型继承子父 scope。

Transclude makes the contents of a directive with this option have access to the scope outside of the directive rather than inside.

```js
// scripts.js
angular.module('docsTransclusionExample', [])
  .controller('Controller', ['$scope', function($scope) {
    $scope.name = 'Tobias';
  }])
  .directive('myDialog', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'my-dialog.html',
      link: function (scope, element) {
        scope.name = 'Jeff';
      }
    };
  });
```

```html
<!-- index.html -->
<div ng-controller="Controller">
  <my-dialog>Check out the contents, {{name}}!</my-dialog>
</div>
```

```html
<!-- my-dialog.html -->
<div class="alert" ng-transclude>
</div>
```

The output will be:

> Check out the contents, Tobias!

### `transclude: 'element'` 和 `transclude: true`

有时候我我们要嵌入指令元素本身，而不仅仅是它的内容。在这种情况下，我们需要使用 `transclude:'element'`。它和 `transclude:true` 不同，它将标记了 `ng-transclude`指令的元素一起包含到了指令模板中。

使用transclusion，你的link函数会获得一个名叫 transclude 的链接函数，这个函数绑定了正确的指令scope，并且传入了另一个拥有被嵌入DOM元素拷贝的函数。你可以在这个 transclude 函数中执行比如修改元素拷贝或者将它添加到DOM上等操作。 类似 ng-repeat 这样的指令使用这种方式来重复DOM元素。仔细研究一下这个[Plunker](http://plnkr.co/edit/yFLe7OXj2u8epHXe6a0s?p=preview)，它使用这种方式复制了DOM元素，并且改变了第二个实例的背景色。

同样需要注意的是，在使用 transclude:'element' 的时候，指令所在的元素会被转换成 HTML 注释。所以，如果你结合使用 transclude:'element' 和 replace:false，那么指令模板本质上是被添加到了注释的 innerHTML 中——也就是说其实什么都没有发生！相反，如果你选择使用 replace:true，指令模板会替换 HTML 注释，那么一切就会如果所愿的工作。使用 replade:false 和 transclue:'element' 有时候也是有用的，比如当你需要重复 DOM 元素但是并不想保留第一个元素实例（它会被转换成注释）的情况下。对这块还有疑惑的同学可以阅读stackoverflow上的[这篇讨论](http://stackoverflow.com/questions/18449743/when-to-use-transclude-true-and-transclude-element)，介绍的比较清晰。

See also：

- [Transclusion and scopes - Angular Tips](http://angular-tips.com/blog/2014/03/transclusion-and-scopes/)
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
