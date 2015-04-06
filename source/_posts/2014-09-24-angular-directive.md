layout: post
title: "Angular Directive"
category : Angular
tags : [angular, tutorial]
---

本文为读 [AngularJS](http://www.salttiger.com/angularjs/) 和  [Mastering Web Application Development with AngularJS](http://www.salttiger.com/mastering-web-application-development-angularjs/) 的读书笔记。

## Directives

指令继承 HTML 语法，是一种为自定义元素和属性与 DOM 变换和行为关联的方式。你可以使用指令来创建可复用的 UI 组件，配置应用和其他所有你想在 UI 模板中做的事情。

你可以使用 Angular 内置的指令，也可以自定义指令。处理浏览器事件和修改 DOM 时，当内置指令在方面无法满足时，你可以自定义指令。

相对 JQuery 实现控件的方式，Directives 更具语义性，从 HTML 便可知控件的含义。

<!-- more -->

## 定义指令

我们使用 module 对象的 `directive()` 方法定义指令：

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

在上面的代码中，`app.directive()` 方法在模块中注册了一个新的指令。这个方法的第一个参数是这个指令的名字。第二个参数是一个返回指令定义对象的函数。如果你的指令依赖于其他的对象或者服务，比如 `$rootScope`, `$http`, 或者 `$compile`，他们可以在这里注入。

__使用方法：__

- 以一个元素使用，如`<hello-world/>` 或者 `<hello:world/>`。
- 以一个属性使用，如 `<div hello-world></div>` 或者 `<div hello:world/>`。
- 如果你想要符合 HTML5 的规范，你可以在元素前面添加 `x-` 或者 `data-`的前缀，如 `<div data-hello-world></div>` 或者 `<div x-hello-world></div>`。
 
    在匹配指令的时候，Angular会在元素或者属性的名字中剔除 `x-` 或者 `data-` 前缀。 然后将 `–` 或者 `:` 连接的字符串转换成驼峰(camelCase)表现形式，然后再与注册过的指令进行匹配。这跟HTML对标签和属性不区分大小写有关。

### `restrict`

这个属性用来指定指令在 HTML 中的使用方法。一个 Angular 指令有以下的四种表现形式：

指令形式 | `restrict` 属性值 |示例
---------|------------|-----------
新的HTML元素 | 'E' | `<data-picker></data-picker>`
元素的属性 | 'A' | `<input type="text" data-picker/>`
CSS 类 | 'C' | `<input type="text" class="data-picker"/>`
注释 | 'M' |`<!- directive:data-picker –>`

### `template`/`templateUrl` 

指定模板或者模板文件。`template` 用于 templete 内容比较少的情况，更多的情况下你可能会见到 `templateUrl`。所以，理想情况下，你应该将模板放到一个特定的 HTML 文件中，然后将 templateUrl 属性指向它。

### `replace`

`replace` 为 `true` 表示 compiler 将用 `template` 指定的模板内容替换原指令元素，原指令中的所有属性都将被拷贝到模板元素中。`replace` 为 `false` 时，表示 template 内容作为指令的子元素添加到指令元素中。`replace` 默认为 `false`。

在上例中，我们将 `replace` 设置成 `true`，在指令被编译之后，生成的模板内容替换掉了 `<hello-world></hello-world>`，最终的输出是 `<h3>Hello World!!</h3>`。如果你将 replace 设置成 `false`，那么生成的的内容为 `<hello-world><h3>Hello World!!</h3></hello-world>`。

### 属性列表

属性         | 描述 
-------------| --------
`name`        | The name of the directive.
`restrict`    | In what kind of mark-up this directive can appear.
`priority`    | Hint to the compiler of the order that directives should be executed.  
`terminal`    | Whether the compiler should continue compiling directives below this.                                                             
`link`        | The link function that will link the directive to the scope.
`template`    | A string that will be used to generate mark-up for this directive.
`templateUrl` | A URL where the template for this directive may be found.
`replace`     | Whether to replace this directive's element with what is in the template.
`transclude`  | Whether to provide the contents of this directive's element for use in the template and compile function.
`scope`       | Whether to create a new child scope or isolated scope for this directive.                
`controller`  | A function that will act as a directive controller for this directive.                                                         
`require`     | Requires a directive controller from another directive to be injected into this directive's link function.
`compile`     | The compile function that can manipulate the source DOM and will create the link function and is only used if a link has not been provided above.

## 生命周期

当应用启动时，Angular 开始使用 `$compile` 服务遍历 DOM 元素，试图使用注册过的指令列表来匹配每个元素、属性、注释、CSS 类，一旦匹配成功，AngularJS 调用相应指令的 compile 函数，这个 compile 函数返回一个 link 函数，被添加到稍后执行的 link 函数列表中。作用域在编译阶段还没有准备好，在编译阶段还不能使用作用域中数据。

一旦所有的指令编译完成便进入链接阶段。在这个阶段，作用域已准备就绪，所有收集的 link 函数将被一一执行。指令创造出来的模板会在正确的 scope 下被解析和处理，然后返回具有事件响应的真实的 DOM 节点。

link 函数几乎可以做所以的事情，除了一些高级用法如访问 `transclusion` 函数。

### Compile

`compile` 函数在 `link` 函数被执行之前用来做一些 DOM 改造。它接收下面的参数：

- `element` – 指令所在的元素
- `attributes` – 元素上赋予的参数的标准化列表

要注意的是 compile 函数不能访问 scope，并且必须返回一个 link 函数。只能在链接函数中使用 DOM，因为在编译函数中可能移除或复制元素。如果没有设置 compile 函数，你可以正常地配置 link 函数，有了compile，就不能有 link，link 函数由 compile 函数返回。

编译阶段主要用于优化。以 ng-repeat 为例，compile 函数用来复制模板，只执行一次，但是 在 repeater 每次迭代的时候，link 函数都会被调用。

compile 函数可以写成如下的形式：

```js
myApp.directive('directiveName', function(){
  // 注入函数
  // 每个 app 最多运行一遍。这对启动和全局配置的时候有用。
  return {
    compile: function($templateElement, $templateAttributes) {

      // 编译函数
      // 1. 每个 jq 实例（在未被渲染的模板中）只运行一次。
      // 2. 你可以检查 DOM 和变量或者表达式的信息，但是你还不能计算出它们的值。
      // 3. Angular 缓存了模板，现在可以修改模板，如添加子元素或者添加兄弟元素。

      return function($scope, $linkElement, $linkAttributes) {

        // 链接函数
        // 1. 每个已经渲染的实例只执行一次。
        // 2. ng-repeat 的行创建的时候，每行运行一次。
        // 3. 执行的时候，ng-if 或者 ng-switch 可能会受影响。
        // 4. 作用域可以使用，因为控制器逻辑已经执行完成。
        // 5. 所有变量和表达式的值已经确定。
        // 6. Angular 正在显示缓存的模板。这时添加模板已经太晚，如果是必须这样做，你需要手动编译。
      };
    }
  };
})
```

如下面的例子，我们定义一个 button 指令，当 button 的类型为 submit 时，自动添加 `btn-primary` 类，根据 size 属性，添加改变大小的 CSS 类。我们这个例子是基于 Bootstrap 的。

```js
myModule.directive('button', function() {
  return {
    restrict: 'E',
    compile: function(element, attributes) {
      element.addClass('btn');
      if (attributes.type === 'submit' ) {
        element.addClass('btn-primary');
      }
      if (attributes.size ) {
        element.addClass('btn-' + attributes.size);
      }
    }
  };
});
```

我们可以这样使用：

    <button type="submit" size="large">Submit</button>

如果没用 Angular，我们的代码可能是这样的：

    <button type="submit"
        class="btn btn-primary btn-large">Click Me!</button>

如果你有不依赖作用域数据的复杂功能，那么这些应该出现在编译函数中，以便这些代码只运行一次。假如我们把上例中改用 link 函数实现，那么当 button 出现在 `ng-repeat` 循环中时，`addClass()` 函数在每次迭代中都将会被调用。而用 compile 函数来实现，`addClass()` 只会被调用一次，button 只是被 `ng-repeat` 简单的复制。

在处理比较复杂的 DOM 操作时，这样的优化是比较可观的，特别是当你要迭代一个大集合的时候。

### Link

指令的 link 函数主要用来为 DOM 元素添加事件监听、监视模型属性变化、以及更新 DOM。我们可以在 link 函数中访问指令的 scope。

大多数的情况下，你只需要使用 link 函数。这是因为大部分的指令只需要考虑注册事件监听、监视模型、以及更新 DOM 等，这些都可以在 link 函数中完成。 

link 函数有三个参数：

- `$scope` 指令的 scope。在我们的例子中，指令的 scope 就是父 controller 的 scope。
- `$elem` 用 jQLite(jQuery的子集)包装的 DOM 元素。如果你在引入 AngularJS 之前引入了 jQuery，那么这个元素就是 jQuery 元素，而不是 jQLite 元素。由于这个元素已经被 jQuery/jQLite 包装了，所以我们就在进行 DOM 操作的时候就不需要再使用 `$()` 来进行包装。`$element === angular.element() === jQuery() === $()`。
- `$attr` 包含了指令所在元素的属性对象。举个例子，你给一个 HTML 元素添加了一些属性：`<hello-world some-attribute=""></hello-world>`，那么可以在 link 函数中通过 `$attrs.someAttribute` 来使用它。

    如果你也有一个包含 `{%raw%}{{ }}{%endraw%}` 的属性，这个属性需要计算，并且可能改变多次。你可以使用 `$attributes.$observe('myOtherAttribute', function(newValue))` 来监听属性的改变，而不是 `$scope.$watch()`。`$observe` 第一个参数为属性名，回调函数只有一个参数 `newValue`，表示经过计算的新值。和 `$watch` 的区别为当表达式的值改变时，`$observe` 仅且仅被触发一次，而 `$watch` 可能被触发多次。

让我们来改变一下我们的 `helloWorld` 指令，当用户在一个输入框中输入一种颜色的名称时，Hello World 文字的背景色自动发生变化。同时，当用户在 Hello World 文字上点击时，背景色变回白色。 

相应的HTML标记如下：

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
    link: function($scope, $elem, $attrs) {
      $elem.bind('click', function() {
        $elem.css('background-color', 'white');
        $scope.$apply(function() {
          scope.color = "white";
        });
      });
      $elem.bind('mouseover', function() {
        $elem.css('cursor', 'pointer');
      });
    }
  };
});
```

在上面的指令代码片段中，我们添加了两个事件，`click` 和 `mouseover`。`click` 处理函数用来重置 `<p>` 的背景色，而 `mouseover` 处理函数改变鼠标为 pointer。在模板中有一个表达式 `{{color}}`，当父 scope 中的 color 发生变化时，它用来改变 Hello World 文字的背景色。

#### Pre vs Post Linking Functions

凡是你使用 link 函数的地方，你都可以使用一个 pre 和 post 属性组成的对象，这两个属性分别表示前处理链接链接函数和后处理链接链接函数。默然情况下，链接函数指的是后处理链接函数，See [Oddly enough](https://github.com/angular/angular.js/issues/2592)。

```js
link: function LinkingFunction($scope, $element, $attributes) { ... }
//...
link: {
  pre: function PreLinkingFunction($scope, $element, $attributes) { ... },
  post: function PostLinkingFunction($scope, $element, $attributes) { ... },
}
```

前处理链接函数先在父元素上触发，然后在子元素上触发，后处理链接函数相反，先在子元素上触发，然后在父元素上触发。See a demo: <http://plnkr.co/edit/qrDMJBlnwdNlfBqEEXL2?p=preview>。

Pre-linking 和 post-linking 都是被 compiler 执行的。Pre-linking 是在所有子元素被链接之前执行，而 post-ling 是在所有子元素链接之后。只有在 post-link 函数中做 DOM 变换才是安全的。

See [Understanding Directives · angular/angular.js Wiki](https://github.com/angular/angular.js/wiki/Understanding-Directives)。

## Transclusion

当你想用模板内容替换指令内容，但又想用指令内容时，Transclusion 就能派上用场了。在模板中使用 `ng-transclude` 指明插入的位置，作为原元素内容的占位符。

我们通过一个 `alert` 元素指令来说明，`alert` 指令的效果如下：

![](http://johnnyimages.qiniudn.com/angular-directive-alert.jpg)

`alert` 元素包含要显示在 alert 中的消息，这需要把消息移动到指令的模板中。`alert` 列表可以使用 `ng-repeat` 来显示：

```html
<alert type="alert.type" close="closeAlert($index)"
       ng-repeat="alert in alerts">
  {{alert.msg}}
</alert>
```

当用户关闭 alert 时，`close` 函数被调用。实现该指令的代码如下：

```js
myModule.directive('alert', function () {
  return {
    restrict:'E',
    replace: true,
    transclude: true,
    template:
      '<div class="alert alert-{{type}}">' +
        '<button type="button" class="close"' +
                'ng-click="close()">&times;' +
        '</button>' +
        '<div ng-transclude></div>' +
      '</div>',
    scope: { type:'=', close:'&' }
  };
});
```

这里我们使用隔离作用域来保证内外作用域的组件不会互相污染。这意味着指令模板中的表达式无法访问父作用域。

### `transclude`

`transclude` 属性的可选值为 `true` 和 `'element'`。

* 使用 `transclude: true` 意味着指令元素的子元素会被移动内嵌到模板中。
* 使用 `transclude: 'element'` 意味着这个元素会被移动内嵌到模板中，包括元素的所有未被编译的属性指令。在这种情况下，只有当 `repalce` 属性为 `true` 时才有意义，

### `ng-transclude`

`ng-transclude` 指定需要移动的指令内容在模板中的占位符。

### transclusion 函数

当一个指令要求移动内嵌时，AnguarJS 将从 DOM 中提取内嵌内容并编译。以下是 `transclude: true` 时大致做的事情：

```js
var elementsToTransclude = directiveElement.contents();
directiveElement.html('');
var transcludeFunction = $compile(elementsToTransclude);
```

The first line gets the contents of the element containing the directive that requested the transclusion. The second line clears this element. The third line compiles the transcluded contents to produce the **transclusion** function, which will be passed back to the directive, for it to use.

#### 使用 $compile 服务创建 transclude 函数

`$compile` 函数的返回结果为一个链接函数：

```js
var linkingFn = $compile(
  '<div some-directive>Some {{"interpola-ted"}} values</div>');
```

为 `linkingFn` 函数传入 scope，是编译后的 DOM 元素指定的 scope 绑定：

    var compiledElement = linkingFn(someScope);

Transclusion 函数只是 link 函数的特殊例子。

如果你为链接函数传入回调函数，该回调函数的参数是原始元素的拷贝，而非原始函数本身。

```js
var clone = linkingFn(scope, function callback(clone) {
  element.append(clone);
});
```

这在想拷贝原始元素的场合非常有用，在 `ng-repeat` 就是这么干的。

#### 在指令中访问 transclusion 函数

你可以在两个地方获得 transclusion 函数：compile 函数和指令的 controller：

```js
myModule.directive('myDirective', function() {
  return {
    transclude: true,
    compile: function(element, attrs, transcludeFn) { ... };
    controller: function($scope, $transclude) { ... },
  };
});
```

__在编译函数中获取 transclusion 函数:__

compile 函数的第三个参数为 transclusion 函数。在编译阶段，作用域式不可用的，所以 transclusion 函数没用绑定到任何作用域。

作用域在链接阶段是可用的，所以链接函数才是调用 transclusion 函数的地方。

```js
compile: function(element, attrs, transcludeFn) {
  return function postLink(scope, element, attrs, controller) {
    var newScope = scope.$parent.$new();
    element.find('p').first().append(transcludeFn(newScope));
  };
}
```

我们把移动内嵌的元素追加到指令元素内的 `<p>` 元素中。这里，我们创建乐意个新的作用域，该作用域是指令作用域的兄弟，也就是指令作用域的 `$parent` 的一个子作用域。


这在指令有一个隔离作用域时特别需要，因为传入 link 函数的作用域是隔离作用域，并不继承于父作用域，而 transcluded 元素的作用域需要继承与作用域。

__在指令的 controller 中获取 transclusion 函数：__

我们在指令的 controller 中通过 `$transclude` 访问 transclusion 函数。在这种情况下，`$transclude` 是一个提前绑定到继承与父作用域的子作用域的函数，所以你无需提供作用域。

```js
controller: function($scope, $element, $transclude) {
  $element.find('p').first().append($transclude());
}
```

#### 使用 transclusion 创建 if 指令

让我们看一个简单的例子，来显示调用 transclusion 函数，而不依赖 `ng-transclude` 指令。尽管 AngularJS 提供了 `ng-show` and `ng-switch` 指令，但 `ng-show` 不会从 DOM 中移除元素，而 `ng-switch` 对于简单场景用起来又显得有点啰嗦。

如果我们让元素不需要的时候，将它从 DOM 中移除，我们可以创建 `if` 指令，它用起来类似于 `ng-show`：

```html
<body ng-init="model= {show: true, count: 0}">
  <button ng-click="model.show = !model.show">
    Toggle Div
  </button>
  <div if="model.show" ng-init="model.count=model.count+1">
    Shown {{model.count}} times
  </div>
</body>
```

每次点击按钮的时候，`model.show` 在 `true` and `false` 之间切换。我们使用 `model.count` 统计移除和插入的总次数。

在测试用例中，我们测试 DOM 元素是否真的被添加和删除：

```js
it('creates or removes the element as the if condition changes', function () {
    element = $compile(
      '<div><div if="someVar"></div></div>')(scope);
  scope.$apply('someVar = true');
  expect(element.children().length).toBe(1);
  scope.$apply('someVar = false');
  expect(element.children().length).toBe(0);
  scope.$apply('someVar = true');
  expect(element.children().length).toBe(1);
});
```

注意我们需要将 `if` 指令包含在 div 中，因为我们的指定会使用 `jqLite.after()` 将元素插入到 DOM 中，这要求这个元素有父元素。

这个指令的具体实现为:

```
myModule.directive('if', function () {
  return {
    transclude: 'element',
    priority: 500,
    compile: function (element, attr, transclude) {
      return function postLink(scope, element, attr) {
        var childElement, childScope;

        scope.$watch(attr['if'], function (newValue) {
          if (childElement) {
            childElement.remove();
            childScope.$destroy();
            childElement = undefined;
            childScope = undefined;
          }
          if (newValue) {
            childScope = scope.$new();
            childElement = transclude(childScope, function(clone){
              element.after(clone);
            });
          }
        });
    ...
```

指定 transcludes 整个元素  (`transclude: 'element'`)。我们提供 compile 函数，这允许我们访问 transclusion 函数。我们在 compile 函数返回 link 函数中，`$watch` 该 `if` 属性表达式。 

我们使用 `$watch` 而非 `$observe`，因为 `if` 属性包含的是表达式而不是插值字符串。

表达式改变的时候，我们会相应地处理子元素。这可以保证不会造成内存泄露。如果为 `true`，我们创建一个子作用域，然后使用这个作用域在 **transclusion** 函数中拷贝一份 transcluded 元素。我们把这些元素插入到包含指定的元素后。

__在指令中使用 priority 属性：__

当在同一个 DOM 元素上定义了多个指令的时候，有时需要指定指定应用的顺序。`priority` 用于在调用编译函数前对指令排序。`priority` 值大的先编译。Pre-link 函数也是按照 `priority` 的顺序执行，但 post-link 按照相反的顺序执行。相同优先级的指令顺序是未定义的。`priority` 的默认值为 0。你可以参考这个例子 [HG2D - Priority in Directive - JSFiddle](http://jsfiddle.net/codef0rmer/7REAr/)。

我们 `if` 指令的优先级为 `500`， 比 `ng-repeat` 的优先级低。这意味着，如果你把它放在 `ng-repeat` 相同的元素上，`if` 表达式会引用 `ng-repeat` 每次迭代产生的作用域。

在这个指令中，transclusion 让我们获取指令的内容，并且绑定到正确的作用域，然后插入到 DOM 中。

## 指令控制器

我们见过不少使用 `ng-controller` 实例化的 controller，这些 controller 不应该直接操作 DOM，而只是用来处理当前作用域的。

指令控制器是 controller 的一种特殊形式，这样的控制器由指令定义，指令在 DOM 中每出现一次指令控制器实例化一次。

### 定义指令控制器

我们通过指令定义对象中的 `controller` 属性来定义指令控制器。`controller` 属性值可以是一个定义在 module 中的控制器：

```js
myModule.directive('myDirective', function() {
  return {
    controller: 'MyDirectiveController'
  };
});
myModule.controller('MyDirectiveController', function($scope) {
  ...
});
```

也可是用来实例化控制器的构造函数：

```js
myModule.directive('myDirective', function() {
  return {
    controller: function($scope, ...) { ... }
  };
});
```

如果指令 controller 定义在 module 中，好处是方便测试，坏处是对整个应用可见。使用内联的方式定义，好处是使控制器成为指令的私有控制器，坏处是不利于测试。

指令控制器的依赖注入和其他控制器一样，如所有的控制器可以注入 `$scope`、`$timeout`、`$rootScope` 等。指令控制器还可以注入一下几个特殊服务：

* `$element`: 这是对指令的 DOM 元素的引用，使用 jQLite/jQuery 包装。
* `$attrs`: 这里指令 DOM 元素中的属性列表。
* `$transclude`: This is a **transclusion** function that is already bound to the correct scope. This function is described in the **transclusion** functions.

### 指令控制器和  link 函数的不同

指令控制器和 link 函数在功能上有很多重叠的地方。在使用  link 函数的地方我们经常也可以使用控制器。

directive controllers 和 link functions 的不同之处主要体现在以下两个方面。

#### 依赖注入

指令控制器必须使用依赖注入来指定所需要的服务，如 `$scope`, `$element`, and `$attrs`。link 函数传入的总是这四个参数， `scope`, `element`, `attrs`, and `controller`，它使用的不是依赖注入，所以参数名可以任意。

#### 编译过程

指令控制器在编译过程的不同时间调用。加入有以下 DOM 结构和指令：

![](http://johnnyimages.qiniudn.com/angular-directive-controller.jpg)

指令控制器和 link 函数按以下顺序被调用：

* parent (controller)
* [parent (pre-link)
    * child 1 (controller)
    * child 1 (pre-link)
        * child 1 a (controller)
        * child 1 a (pre-link)
        * child 1 a (post-link)
        * child 1 b (controller)
        * child 1 b (pre-link)
        * child 1 b (post-link)
    * child 1 (post-link)
* parent (post-link)

如果一个元素包含多个指令，那么对于这个元素来说：

* 如果需要，创建作用域
* 实例化每个指令的指令控制器
* 每个指令的 pre-link 函数被调用
* 链接每个子元素
* 每个指令的 post-link 函数被调用

这意味着当一个指令控制器被实例化的时候，指令元素和它的子元素还没有完全被链接。但是当 link 函数(pre 或者 post)被调用的时候，元素所有的指令控制器已经实例化了。这是指令控制器可以被传到链接函数的原因。

post-link 函数是在当前元素极其子元素编译和链接完成后被调用。这意味着这个阶段 DOM 的任何修改都不会被 AngularJS 编译器意识到。这在把第三方库（如 JQeury 插件）关联到元素的时候非常有用，因为这个过程可能在修改 DOM 的时候造成 Angular 编译器混乱。

[Angular Scope](http://inching.org/2014/09/23/angular-scope) 中的 pagination demo 是用 link 函数实现的，我们可以把它改成 directive controller 的版本：

```
myModule.directive('pagination', function() {
  return {
    restrict: 'E',
    scope: { numPages: '=', currentPage: '=', onSelectPage: '&' },
    templateUrl: 'template/pagination.html',
    replace: true,
    controller: ['$scope, '$element', '$attrs',
                   function($scope, $element, $attrs) {
      $scope.$watch('numPages', function(value) {
        $scope.pages = [];
        for(var i=1;i<=value;i++) {
           $scope.pages.push(i);
        }
        if($scope.currentPage > value ) {
          $scope.selectPage(value);
        }
      });
      $scope.noPrevious = function() {
        return $scope.currentPage === 1;
      };
      ...
    }]
...
});
```

### 访问其他控制器

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

require: '^outerDirective' 告诉Angular在元素以及它的父元素中搜索controller。这样被找到的 controller 实例会作为第四个参数被传入到 link 函数中。在我们的例子中，我们将嵌入的指令的scope发送给父亲指令。

#### `require`

`require` 让其他指令的控制器关联到 compile/linking 函数。默认情况下，你必须在当前元素指令 require 的指令，你才可以在 compile/link 函数中使用 require 指令的控制器。

```html
<input color-picker ng-model="project.color">
```

```js
app.directive('colorPicker', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      element.colorPicker({
        // initialize the color to the color on the scope
        pickerDefault: scope.color,
        // update the ngModel whenever we pick a new color
        onColorChange: function(id, newValue) {
          scope.$apply(function() {
            ngModel.$setViewValue(newValue);
          });
        }
      });

      // update the color picker whenever the value on the scope changes
      ngModel.$render = function() {
        element.val(ngModel.$modelValue);
        element.change();                
      };
    }
  }
});
```

如果当前元素没有包含 require 的指令，那么 compiler 会抛出错误。你可以通过在 require 的指令前加 `?` 让 require 的指令变得可选，如 `require: '?ngModel'`。如果 require 的指令没有提供，那么指令控制器的第四个参数将为 `null`。如果 require 多个指令，则指令控制器的四个参数为数组，require 对应的数组元素为 `null`。

如果你 require 的指令可以出现在当前元素的祖先元素上，你可以在 require 的指令名前加 `^`，如 `require: '^ngModel'`。编译器将从当前元素开始向父元素查找，直到找到第一个匹配的指令控制器。

你可以结合使用祖先前缀和可选前缀，如 `require: '^?form'`。

当你想 require 多个指令的时候，可以把 `require` 属性设置成一个数组，link 函数的第四个参数为相应指令控制器的数组，如：

```js
app.directive('myDirective', function () {
  return{
    restrict: "A",
    require:['^parentDirective', '^ngModel'], 
    link: function ($scope, $element, $attrs, controllersArr) {

      // parentDirective controller
      controllersArr[0].someMethodCall(); 

      // ngModel controller         
      controllersArr[1].$setViewValue(); 
    }
  }
});
```

Here is an example of it in action: 
[Example](https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js#L1206)

## 扩展指令

假如你想使用第三方指令，但又不想修改它，我们一下这些方法来达到这个目标。

### Global Configurations

一些好的指令（AngularUI）可以做一些全局配置，这要你就不需要在每个实例中传入你的配置项了。

### Require Directives

你可以通过在指令中 require 第三方指令，这样你就可以使用第三方指令的 Controller 了。

```js
// <div a b></div>
ui.directive('a', function(){
  return {
    controller: function(){
      this.data = {}
      this.changeData = function( ... ) { ... }
    },
    link: ($scope, $element, $attributes, controller) {
      controller.data = { ... }
    }
  }
})

myApp.directive('b', function(){
  return {
    require: 'a',
    link: ($scope, $element, $attributes, aController) {
      aController.changeData()
      aController.data = { ... }
    }
  }
})
```

### Stacking Directives

你可以创建一个和第三方指令名称相同的指令。两个指令都将运行，你可以通过 `priority` 属性来控制指令的执行循序。如果第三方指令没有设置 `priority` 属性，可能需要 PR。

```js
// <div a></div>
ui.directive('a', {
    priority: 1,
    //...
});
myApp.directive('a', {
    priority: 0,
    // ...
});
```

### Templating

You can leverage `<ng-include>` or simply create a directive that generates the HTML with the primary directive attached.

你可是使用 `<ng-include>` 或者简单创建生成第三方指令的模板。

```js
// <div b></div>
ui.directive('a', ... )
myApp.directive('b', function(){
  return {
    template: '<div a="someOptions"></div>'
  }
})
```

## Unit Test

Directives have low level access to the DOM and can be complex. This makes them prone to errors and hard to debug. Therefore, more than the other areas of your application, it is important that directives have a comprehensive range of tests.

Writing unit tests for directives can seem daunting at first but AngularJS provides some nice features to make it as painless as possible and you will reap the benefits when your directives are reliable and maintainable.

The general strategy when testing directives is as follows:

* Load the module containing the directive
* Compile  a string of mark-up containing the directive to get linking function
* Run the linking function to link it to the `$rootScope`
* Check that the element has the properties that you expect

Here is a common skeleton unit test for a directive:

```js
describe('myDir directive', function () {
  var element, scope;

  beforeEach(module('myDirModule'));

  beforeEach(inject(function ($compile, $rootScope) {
    var linkingFn = $compile('<my-dir></my-dir>');
    scope = $rootScope;
    element = linkingFn(scope);
  }));

  it('has some properties', function() {
    expect(element.someMethod()).toBe(XXX);
  });

  it('does something to the scope', function() {
    expect(scope.someField).toBe(XXX);
  });

  ...
});
```

Load the module that contains the directive into the test, then create an element containing this directive, using the `$compile` and `$rootScope` functions. Keep a reference of `element` and `$scope` so that it is available in all the tests later.

Depending upon the kind of tests you are writing you may want to compile a different element in each `it` clause. In this case you should keep a reference to the `$compile` function too.

Finally, test whether the directive performs as expected by interacting with it through jQuery/jqLite functions and through modifying scope.

In cases where your directive is using `$watch`, `$observe`, or `$q`, you will need to trigger a `$digest` before checking your expectations. For example:

```js
it("updates the scope via a $watch", function() {
  scope.someField = 'something';
  scope.$digest();
  expect(scope.someOtherField).toBe('something');
});
```

In the rest of this chapter we will introduce our custom directives through their unit tests, in keeping with the concept of Test Driven Development (TDD).

## Demo

### Notepad

See [AngularJS 指令（Directives）实践指南（三） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide-c/)

### butterbar & focus

- butterbar 这个指令用来实现一个自动显示/隐藏的 loading。当路由发成变化，并且在页面加载的时候显示，当加载完成时隐藏。
- focus 这个指令用来保证指定的 input 输入框（或者元素）有焦点。
  
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

先隐藏 loading 元素，让后在 root scope 上添加两个监听器。一旦路由改变的时候，便显示元素，一旦路由完场，便隐藏元素。

我们可以这样使用 `butterbar` 指令:

    <div butterbar>My loading text...</div>

### Clock

这是 AngularJS 官方的一个例子，用来显示当前的事件，每隔一秒在 DOM 上更新事件。

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

在 link 函数中，每隔一秒或者一旦事件格式发成改变，我们将在更新 DOM 上的事件。我们使用 `$interval` 服务定义调用一个处理函数。如果指令被删除，我们也应该移除 `$interval`，以避免内存泄露。

我们在此注册了一个事件 `element.on('$destroy', ...)`，这个事件是被谁触发的？当使用 Angular 编译器编译后的 DOM 节点被删除时，它会触发一个 `$destroy` 事件。同样，AngularJS 作用域被删除时，它会广播一个 `$destroy` 事件。

通过监听这个事件，你可以移除可能引发内存泄露的事件监听器。当作用域和元素移除的时候，注册到他们的监听器会自动删除。但是，如果注册在服务上或者 DOM 元素节点上的监听器不会被删除，你必须自己清除他们，否则就有可能引起内存泄露。

```html
<div ng-controller="Controller">
  Date format: <input ng-model="format"> <hr/>
  Current time is: <span my-current-time="format">
</div>
```

__Best Practice:__ Directives should clean up after themselves. You can use `element.on('$destroy', ...)` or `scope.$on('$destroy', ...)` to run a clean-up function when the directive is removed.

### Wrapping the jQueryUI datepicker directive

Sometimes there is a third party widget that is complex enough and it is not worth writing a pure AngularJS version of it in the short term. You can accelerate your development by wrapping such as widget in an AngularJS directive but you have to be careful about how the two libraries would interact.

Here we will look at making a `datepicker` input directive that wraps the jQueryUI `datepicker` widget. The widget exposes the following API that we will use to integrate into AngularJS, where element is the jQuery wrapper around the element on which the widget is to be attached.

Function   | Description
-------------------------------------| --------------
`element.datepicker(options)`         | Create a new widget using the given options and attach it to the element.
`element.datepicker("setDate", date)` | Set the date on the widget.                                              
`element.datepicker("getDate")`       | Get the date on the widget.                                              
`element.datepicker("destroy")`       | Destroy and remove the widget from the element.                          

We want to be informed when the user selects a new date with the picker. The `options` that we pass to create a new widget can provide an `onSelect` callback that will be called when the user selects a date:

    element.datepicker({onSelect: function(value, picker) { ... });

To keep things simple, we will specify that the `datepicker` directive can only be linked to a JavaScript Date object in the model.

The general pattern for wrapping JQuery input widgets is similar, again, to building a validation directive. You require `ngModel` and place functions on the `$parsers` and `$formatters` pipeline to transform the values between the model and the view.

Also, we need to put data into the widget when the model changes and get data into the model when the widget changes. We override `ngModel.$render()` to update the widget. This function is called after all the `$formatters` have been executed successfully. To get the data out, we use the `onSelect` callback to call `ngModel.$setViewValue()`, which updates the view value and triggers the `$parsers` pipeline.

![angular-directive-datepicker.jpg](http://johnnyimages.qiniudn.com/angular-directive-datepicker.jpg)

#### Writing tests for directives that wrap libraries

In a pure unit test we would create a mock jQueryUI `datepicker` widget that exposes the same interface. In this case we are going to take a more pragmatic approach and use a real `datepicker` widget in the tests.

The advantage of this is that we do not have to rely on the widget's interface being documented accurately. By calling the actual methods and checking that the user interface is updated correctly, we can be very sure that our directive is working. The disadvantages are that the DOM manipulation in the widget can slow down the test runs and there must be a way to interact with the widget to ensure that it is behaving correctly.

In this case, the jQueryUI `datepicker` widget exposes another function that allows us to simulate a user selecting a date:

    $.datepicker._selectDate(element);

We create a helper function `selectDate()`, which we will use to simulate date selection on the widget:

```js
var selectDate = function(element, date) {
  element.datepicker('setDate', date);
  $.datepicker._selectDate(element);
};
```

The tests themselves make use of the widget's API and this helper function. For example:

```js
describe('simple use on input element', function() {
  var aDate, element;
  beforeEach(function() {
    aDate = new Date(2010, 12, 1);
    element = $compile(
      "<input date-picker ng-model='x'/>")($rootScope);
  });
  it('should get the date from the model', function() {
    $rootScope.x = aDate;
    $rootScope.$digest();
    expect(element.datepicker('getDate')).toEqual(aDate);
  });

  it('should put the date in the model', function() {
    $rootScope.$digest();
    selectDate(element, aDate);
    expect($rootScope.x).toEqual(aDate);
  });
});
```

Here, we check that model changes get forwarded to the widget and widget changes get passed back to the model. Notice that we do not call $digest() after selectDate(), since it is the directive's job to ensure that the digest occurs after a user interaction.

There are more tests for all different scenarios for this directive. They can be found in the sample code.

#### Implementing the jQuery datepicker directive

The directive implementation is again making use of the functionality provided by the `ngModelController`. In particular, we add a function to the `$formatters` pipeline that ensures that the model is a `Date` object, we add our `onSelect` callback to the `options`, and we override the `$render` function to update the widget when the model changes.

```js
myModule.directive('datePicker', function () {
  return {
    require:'ngModel',
    link:function (scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$formatters.push(function(date) {
        if ( angular.isDefined(date) &&
             date !== null &&
             !angular.isDate(date) ) {
          throw new Error('ng-Model value must be a Date object');
        }
        return date;
      });

      var updateModel = function () {
        scope.$apply(function () {
          var date = element.datepicker("getDate");
          element.datepicker("setDate", element.val());
          ngModelCtrl.$setViewValue(date);
        });
      };
      var onSelectHandler = function(userHandler) {
        if ( userHandler ) {
          return function(value, picker) {
            updateModel();
            return userHandler(value, picker);
          };
        } else {
          return updateModel;
        }
      };
```

The `onSelect()` handler calls our `updateModel()` function, which passes the new date value into the `$parsers` pipeline via `$setViewValue()`:

```js
var setUpDatePicker = function () {
    var options = scope.$eval(attrs.datePicker) || {};
    options.onSelect = onSelectHandler(options.onSelect);
    element.bind('change', updateModel);
    element.datepicker('destroy');
    element.datepicker(options);
    ngModelCtrl.$render();
  };

  ngModelCtrl.$render = function () {
    element.datepicker("setDate", ngModelCtrl.$viewValue);
  };

  scope.$watch(attrs.datePicker, setUpDatePicker, true);
  }
};
});
```

### Creating a custom validation directive

We need to check that the password and confirm password field are identical. We will create a custom validation directive that we can apply to an input element that checks whether the model of the input element matches another model value. In use, it will look like this:

```html
<form name="passwordForm">
  <input type="password" name="password" ng-model="user.password">
  <input type="password" name="confirmPassword" ng-model="confirmPassword" validate-equals="user.password">
</form>
```

This custom model validator directive must integrate with `ngModelController` to provide a consistent validation experience for the user.

We can expose the `ngModelController` on the scope by providing a name for the `form` and a name for the `input` element. This allows us to access model validity in the controller. Our validation directive will set the `confirmPassword` input to valid if its model value is the same as the `user.password` model.

Validation directives require access to the `ngModelController`, which is the directive controller for the `ng-model` directive. We specify this in our directive definition using the `require` field. This field takes a string or an array of strings. Each string must be the canonical name of the directive whose controller we require.

When the required directive is found, its directive controller is injected into the linking function as the fourth parameter. For example:

```js
require: 'ngModel',
link: function(scope, element, attrs, ngModelController) { … }
```

The pattern for testing validation directives is to compile a form containing an input that uses `ng-model` and our validation directive. For example:

```html
<form name="testForm">
  <input name="testInput"
         ng-model="model.value"
         validate-equals="model.compareTo">
</form>
```

This directive is an attribute on the input element. The value of the attribute is an expression that must evaluate to the value on the model. The directive will compare this value with the input's value.

We specify the model bound to this input using the `ng-model` directive. This will create `ngModelController`, which will be exposed on the scope as `$scope.testForm.testInput` and the model value itself will be exposed on the scope as `$scope.value`.

We then make changes to the input value and the model value and check the `ngModelController` for changes to `$valid` and `$error`.

Now we have our tests in place, so we can implement the functionality of the directive:

```js
myModule.directive('validateEquals', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ngModelCtrl) {
      function validateEqual(myValue) {
        var valid = (myValue === scope.$eval(attrs.validateEquals));
        ngModelCtrl.$setValidity('equal', valid);
        return valid ? myValue : undefined;
      }

      ngModelCtrl.$parsers.push(validateEqual);
      ngModelCtrl.$formatters.push(validateEqual);

      scope.$watch(attrs.validateEquals, function() {
        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
      });
    }
  };
});
```

We create a function called `validateEqual(value)`, which compares the passed in value with the value of the expression. We push this into the `$parsers` and `$formatters` pipelines, so that the validation function gets called each time either the model or the view changes.

In this directive we also have to take into account the model we are comparing against changing. We do this by setting up a watch on the expression, which we retrieve from the `attrs` parameter of the linking function. When it does change, we artificially trigger the `$parsers` pipeline to run by calling `$setViewValue()`. This ensures that all potential `$parsers` are run in case any of them modify the model value before it gets to our validator.

## Library

- [voronianski/ngActivityIndicator](https://github.com/voronianski/ngActivityIndicator/) Angular provider for preloader animations 
<http://labs.voronianski.com/ngActivityIndicator.js>.
- [ngReactGrid by josebalius](http://josebalius.github.io/ngReactGrid) ngReactGrid is an Angular directive that can be used to render an enhanced HTML table or grid of data very fast using React as the rendering engine. It is based on ng-grid and jQuery DataTables. It uses HTML tables and supports fixed column headers by default.
- [AlexDisler/ng-special-offer](https://github.com/AlexDisler/ng-special-offer) Prompt users to rate your cordova app in the app store.
- [mgonto/angular-wizard](https://github.com/mgonto/angular-wizard) 向导。
- [jirikavi/AngularJS-Toaster](https://github.com/jirikavi/AngularJS-Toaster)

## Reference

- [A Practical Guide to AngularJS Directives - SitePoint](http://www.sitepoint.com/practical-guide-angularjs-directives/) / 翻译 [AngularJS 指令（Directives）实践指南（一） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide/)
- [A Practical Guide to AngularJS Directives (Part Two) - SitePoint](http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/) / 翻译 [AngularJS 指令（Directives）实践指南（二） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide-b/)
- [AngularJS: Developer Guide: Directives](https://docs.angularjs.org/guide/directive)

## Tutorial

- [AngularJS 指令（Directives）实践指南（三） / Owen Chen](http://owenchen.duapp.com/index.php/angularjs-directives-directives-a-practical-guide-c/)
- [AngularJS Directives – Basics – One Hungry Mind](http://onehungrymind.com/angularjs-directives-basics/)
- [AngularJS Sticky Notes Pt 2 – Isolated Scope – One Hungry Mind](http://onehungrymind.com/angularjs-sticky-notes-pt-2-isolated-scope/)
- [HTML5 Mobile - Long-press to re-order scrollable lists](http://www.scottlogic.com/blog/2014/11/25/ionic-sorter.html)
