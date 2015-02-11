---
layout: post
title: "Angular Scope"
category : Angular
tags : [angular, tutorial]
--- 

## 作用域

Angular 中作用域的继承使用的是原型继承，也就在说子作用域的 prototype 会指向父作用域。在子作用域中查找属性时，先查找子作用域中的属性，如果未找到，在去父作用域中查找，以此类推，直到找到跟作用域 $rootScope。

<!--more-->

Angular 中，总共有四种作用域：

1. 普通的原型继承作用域。创建一个原型继承于父作用域的作用域。

    - ng-include
    - ng-switch
    - ng-controller
    - directive with `scope: true`
    
2. 通过拷贝/复制的原型继承作用域。ng-repeat 的每个迭代都会创建一个子作用域，并且每个作用域总是得到一个新的属性。 

    - ng-repeat
    
3. 隔离作用域。不继承父作用域，但可以通过 '=', '@', and '&' 访问父作用域的属性。

    - directive with `scope: {...}`

4. transcluded 作用域。这个作用域也会原型继承与父作用域，可以和隔离作用域共存，是隔离作用域的兄弟。

    - directive with `transclude: true` 
    
以下情况都会创建新的作用域，并且继承于父作用域：

- ng-repeat
- ng-include
- ng-switch
- ng-view
- ng-controller
- directive with `scope: true`
- directive with `transclude: true`.

隔离作用域也会创建新的作用域，但不会从父作用域中继承：

- directive with scope: { ... }

这样的作用域，我们成为隔离作用域（isolate scope）。

其他情况不会自动创建作用域，即 `scope: false`。

### 原型继承

作用域继承通常比较简单，你甚至经常不需要知道它的存在。除非你使用双向绑定到父作用域的一个基本类型(e.g., number, string, boolean) 的值时，并不会像我们期望的那样运行。实际上，子作用域得到的是自己的属性，这会隐藏父作用域中的同名属性。 这个问题是有由 JavaScript 的原型继承导致的，跟 AngularJS 没有什么关系。新的 Angular 开发者可能不会意识到 repeat, ng-switch, ng-view and ng-include 对会创建新的作用域，所以使用的时候，这类问题时有发生。

## ng-include

假设我们有一个 Controller:

```js
$scope.myPrimitive = 50;
$scope.myObject    = {aNumber: 11};
```

HTML:

```html
<!-- 模板 tpl1.html -->
<script type="text/ng-template" id="/tpl1.html">
    <input ng-model="myPrimitive">
</script>

<div ng-include src="'/tpl1.html'"></div>

<!-- 模板 tpl2.html -->
<script type="text/ng-template" id="/tpl2.html">
    <input ng-model="myObject.aNumber">
</script>

<div ng-include src="'/tpl2.html'"></div>
```

每一个 ng-include 生成一个子作用域，该子作用域都通过原型继承于父作用域：

![ng-include](http://johnnyimages.qiniudn.com/scope.jpg)

第一个文本框的数据模型为 myPrimitive，为基本类型的数据。如果 在以第一个文本框中敲入数据 (如 "77") 将导致 ChildScope1 得到一个新的作用域属性（myPrimitive），这将覆盖父作用域中的同名属性。这可能不是你所期望的。

![ng-include primitive](https://camo.githubusercontent.com/f1c9d54bd5b13d1e479b41ca6062b4b9fecc8fe2/687474703a2f2f692e737461636b2e696d6775722e636f6d2f376c3864672e706e67)

第二个文本框的数据模型为 `myObject.aNumber`，是复杂对象的属性。如果我们在这个文本框中敲入内容不会导致子作用域添加新的属性。因为当 ngModel 查找属性时，可以在父作用域中找到。

修改父作用域上面的值会 影响到子作用域，反之，修改子作用域只会影响子作用域的值，不会影响父作用域上面的值。

![ng-include object](https://camo.githubusercontent.com/5a6ff2644b1b7a15621c2a20928abfce0a2018bb/687474703a2f2f692e696d6775722e636f6d2f6f764a6547706f2e706e67)

如果我们想让第一个文本框也达到同样的效果，我们可以使用 `$parent` 来重写，让它绑定父作用域的相应属性，如：

```
<input ng-model="$parent.myPrimitive">
```

这样也不会产生新的属性，而是查找带父作用域中的属性。当然，父作用域是什么总是不可预知的，我们一般不适用这种方式，一般会把简单属性改成复杂属性，也就是基本类型的数据放到一个 Object 类型的对象中。

![ng-include $parent](https://camo.githubusercontent.com/40767f9e9cc824e5c9ef178e385c9daa40ade6ba/687474703a2f2f692e737461636b2e696d6775722e636f6d2f6b6438706a2e706e67)

For scenarios where form elements are not involved, another solution is to define a function on the parent scope to modify the primitive. Then ensure the child always calls this function, which will be available to the child scope due to prototypal inheritance. E.g.,

另外一种方式可以使用方法来修改属性，在子作用于中通过方法来访问基本类型。

```
// in the parent scope
$scope.setMyPrimitive = function(value) {
    $scope.myPrimitive = value;
}
```

Here is a [sample fiddle](http://jsfiddle.net/mrajcok/jNxyE/) that uses this "parent function" approach.  (This was part of a [Stack Overflow post](http://stackoverflow.com/a/14104318/215945).)

See also:

- <http://stackoverflow.com/a/13782671/215945>
- <https://github.com/angular/angular.js/issues/1267>.

## ng-repeat

Ng-repeat works a little differently. Suppose we have in our controller:

```js
$scope.myArrayOfPrimitives = [ 11, 22 ];
$scope.myArrayOfObjects    = [{num: 101}, {num: 202}]
```

And in our HTML:

```html
<ul><li ng-repeat="num in myArrayOfPrimitives">
       <input ng-model="num"></input>
    </li>
</ul>
<ul><li ng-repeat="obj in myArrayOfObjects">
       <input ng-model="obj.num"></input>
    </li>
</ul>
```

ng-repeat 为每一项创建一个新的作用域，该作用域继承于父作用域，除此之外，它还将 item 的值赋值给这个子作用域的新属性（这个新的属性名为循环变量名，如这里的 `obj`）。

```js
childScope = scope.$new(); // child scope prototypically inherits from parent scope ...     
childScope[valueIdent] = value; // creates a new childScope property
```

如果 item 是基本类型（如 myArrayOfPrimitives 中的值），复制给子作用域的新属性的其实是这个基本类型的拷贝。所以修改 item 值并不会影响父作用域中的数组（`myArrayOfPrimitives`）。ng-repeat 为每个子作用域添加一个和 `myArrayOfPrimitives` 无关的 `num` 属性。在 Angular 1.0.3+，在文本框中输入值不会影响子作用域中的 `num` 值，See Artem's explanation as to why on [StackOverflow](http://stackoverflow.com/a/13723990/215945)。

![ng-repeat primitive](https://camo.githubusercontent.com/3254baf91afdd969e6f167eeeb59950a0399a8f1/687474703a2f2f692e737461636b2e696d6775722e636f6d2f6e4c6f69572e706e67)

如果 item 不是基本类型，而是一个对象，那么赋值给子作用域的是这个对象的引用，而非拷贝。改变子作用域中该属性的中，将对父作用域中的数组产生影响，如：

![ng-repeat object](https://camo.githubusercontent.com/881318ad2d70364cf61d50faf536a7ce08f39777/687474703a2f2f692e737461636b2e696d6775722e636f6d2f51536a544a2e706e67)

See also： 

- [Difficulty with ng-model, ng-repeat, and inputs](http://stackoverflow.com/questions/13714884/difficulty-with-ng-model-ng-repeat-and-inputs) 
- [ng-repeat and databinding](http://stackoverflow.com/a/13782671/215945)

## ng-switch & ng-view

类似于 ng-include。

## controller

子 controller 也会原型继承父 controller 的作用域，来生成一个新的作用域。但子 Controller 本身不是一个好的实践，如果你想要共享数据，可以考虑使用 Servcie。

## directive

定义指令值，我们可以使用以下三种方式的作用域：

1. 默认 (`scope: false`) 这是默认情况。指令不会创建新的作用域，使用的是父作用域。这可能会污染父作用域，不利于创建可复用的组件。

    如：

        app.directive('helloWorld', function() {
          return {
            scope: false,
            restrict: 'AE',
            replace: true,
            template: '<h3>Hello World!!</h3>'
          };
        });

2. `scope：true` 这会为指令创建一个新的scope，并且原型继承自父scope。如果多于一个指令（在同样的 DOM 元素长）要求新的作用域时，只有一个新的作用域会被创建。因为是原型继承，所以和父作用域的基本类型双向绑定时，也会有 ng-include 一样的问题。

    如：

        app.directive('helloWorld', function() {
          return {
            scope: true,
            restrict: 'AE',
            replace: true,
            template: '<h3>Hello World!!</h3>'
          };
        });

3. `scope:{...}` – 使用这种方式，指令会创建一个隔离作用域，没有原型继承。对于创建可复用的组件，这可能是最好的选择，这可以防止对父作用域的意外读写。

        app.directive('helloWorld', function() {
          return {
            scope: {},  // use a new isolated scope
            restrict: 'AE',
            replace: true,
            template: '<h3>Hello World!!</h3>'
          };
        });

    隔离作用域的 `__proto__` 引用的是  [Scope](http://docs.angularjs.org/api/ng.%24rootScope.Scope) 对象（如下图，图中橘色的 'Object' 应该修正为 'Scope'）。隔离作用局的 `$parent` 属性引用父作用域，既能它是隔离作用局而且没有从父作用域原型继承。

    假如指令为： 


        <my-directive interpolated="{{parentProp1}}" twowayBinding="parentProp2">
    
    指令的作用域为：

        scope: { 
            interpolatedProp: '@interpolated', 
            twowayBindingProp: '=twowayBinding' 
        }

    并且，在指令的 link 函数中，有以下代码：
    
        scope.someIsolateProp = "I'm isolated"

    那么形成的作用域的图为：

     ![isolate scope](https://camo.githubusercontent.com/c2e294392bfdcb48a6afcc328acb81d1ce4e9f18/687474703a2f2f692e737461636b2e696d6775722e636f6d2f4d557853342e706e67)  

     当 parentProp1 被修改为 11 时， `scope.interpolatedProp` 是 undefined，`scope.twowayBindingProp` 的值为 `Mark`，因为它使用的 `=`，进行双向绑定。

     最后应该注意的是，在 link 函数中可以使用 `attrs.$observe('attr_name', function(value) { ... })` 来监视隔离作用域中使用 `@` 的属性变化。举个例子，假如在 link 函数中有如下语句：

        attrs.$observe('interpolated', function(value) { ... })

    See also [AngularJS Sticky Notes Pt 2 – Isolated Scope – One Hungry Mind](http://onehungrymind.com/angularjs-sticky-notes-pt-2-isolated-scope/)。

4. `transclude: true` 指令将创建一个 "transcluded" 子作用域，该作用域也原型继承于父作用域。所以如果嵌入的内容（用来替换ng-transclude 的东西）需要和父作用域中的基本类型的属性建立双向绑定，可以使用　`$parent`，或者把模型修改父对象。这和 ng-include 中的情况一样。

    如果某个指令同时拥有隔离作用域和 transcluded 作用域，他们为兄弟关系，他们的 `$parent` 指向共同的父作用域。隔离作用域的 `$$nextSibling` 引用的是 transcluded 作用域。

    See [AngularJS two way binding not working in directive with transcluded scope](http://stackoverflow.com/a/14484903/215945)

    For the picture below, assume the same directive as above with this addition: `transclude: true`

    ![transcluded scope](https://camo.githubusercontent.com/34d8b831f665a8ff15f134bcc83a8a7e96822421/687474703a2f2f692e737461636b2e696d6775722e636f6d2f666b5748412e706e67)

    使用 transclusion 后，你也可以通过 link 函数的第 5 个参数来修改嵌入内容的默认作用域；

        app.directive('person', function() {
          return {
            restrict: 'EA',
            scope: {
              header: '='
            },
            transclude:true,
            link: function(scope, element, attrs, ctrl, transclude) {
              scope.person = {
                name: 'Directive Joe',
                profession: 'Scope guy'
              };

              scope.header = 'Directive\'s header';

              // scope.$parent。这是默认情况。
              // 如果改成 scope，则嵌入内容的作用域的指令的隔离作用域。
              transclude(scope.$parent, function(clone, scope) {
                element.append(clone);
              });
            }
          };
        });

    See [Transclusion and scopes - Angular Tips](http://angular-tips.com/blog/2014/03/transclusion-and-scopes/)

默认情况下，指令不会创建一个新的scope，而是沿用父scope。但是在很多情况下，这并不是我们想要的。如果你的指令重度地使用父scope的属性，甚至创建新的时，会污染父scope。让所有的指令都使用同一个父scope不会是一个好主意，因为任何人都可能修改这个scope中的属性。因此，下面的这个原则也许可以帮助你为你的指令选择正确的scope。

## 隔离作用域

在使用隔离作用域之后，如果要访问父作用域，需要显式地在父作用域和子作用域之间建立映射。有三种指定映射关系的方法，使用 `=` 进行数据绑定，使用 `@` 进行插值，使用 `&` 绑定到父作用域的表达式。这几种方法都会在子作用域中创建新的属性，这些属性来源于父作用域。

假设我们有以下指令，当用户在一个输入框中输入一种颜色的名称时，Hello World 文字的背景色自动发生变化。同时，当用户在 Hello World 文字上点击时，背景色变回白色。

```js
app.controller('MainCtrl', function($scope){
    
}).directive('helloWorld', function() {
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

上面的代码现在是不能工作的。因为 input 中的 ng-model 绑定的是 Controller 的作用域，而 hello-world 指令模板中使用的是隔离作用域，所以指令模板内的 color 中始终是 undefined。

### 插值

`@` 用来实现插值（interpolate），也即单向绑定。 

The `@` symbol indicates that AngularJS should interpolate the value of the specified attribute and update the isolated scope property when it changes. Interpolation is used with `{%raw%}{{}}{%endraw%}` curly braces to generate a string using values from the parent scope.

A common mistake is to expect an interpolated object to be the object itself. Interpolation always returns a string. So if you have an object, say user has a field called `userName`, then the interpolation of `{{user}}` will convert the `user` object to a string and you will not be able to access the `userName` property on the string.

This attribute interpolation is equivalent to manually `$observe` the attribute:

```js
attrs.$observe('attribute1', function(value) {
  isolatedScope.isolated1 = value;
});
attrs.$$observers['attribute1'].$$scope = parentScope;
```

在下面的指令定义中，我们通过 `color: '@colorAttr'` 将属性 color 以指令属性 colorAttr 暴露出去。在使用指令时，通过 `color-attr="{{color}}"` 和父作用域的 color 属性单向绑定。当表达式 `"{{color}}"` 的值发生改变时，隔离作用域的 color 属性跟着变化，指令模板中的值也发生变化。

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

我们也称这种方式为单项绑定，是因为在这种方式下，父作用域的属性发生变化，子作用域的值会随之发生变化，而子作用域的值发生变化，并不会影响父作用域的值。

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

### 数据绑定

The `=` symbol indicates that AngularJS should keep the expression in the specified attribute and the value on the isolated scope in sync with each other. This is a two-way data binding that allows objects and values to be mapped directly between the inside and outside of the widget.

Since this interface supports two way data binding, the expression given in the attribute should be assignable (that is, refers to a field on the scope or an object) and not an arbitrary computed expression.

This binding is a bit like setting up two `$watch` functions:

```js
var parentGet = $parse(attrs['attribute2']);
var parentSet = parentGet.assign;
parentScope.$watch(parentGet, function(value) {
  isolatedScope.isolated2 = value;
});
isolatedScope.$watch('isolated2', function(value) {
  parentSet(parentScope, value);
});
```

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

与 @ 不同，这种方式让你能够给属性指定一个真实的 scope 数据模型，而不是简单的字符串。这样你就可以传递简单的字符串、数组、甚至复杂的对象给隔离scope。同时，还支持双向的绑定。每当父scope属性变化时，相对应的隔离scope中的属性也跟着改变，反之亦然。

如果父作用域中用于双向绑定的属性不存在，则会抛出 `NON_ASSIGNABLE_MODEL_EXPRESSION` 异常，你可以使用 `=?` 或者 `=?attr` 避免抛出异常。

### 表达式

The `&` symbol indicates that the expression provided in the attribute on the element will be made available on the scope as a function that, when called, will execute the expression. This is useful for creating callbacks from the widget.

This binding is equivalent to `$parse` the expression in the attribute and exposing the parsed expression function on the isolated scope:

```js
parentGet = $parse(attrs['attribute3']);
scope.isolated3 = function(locals) {
  return parentGet(parentScope, locals);
};
```

指令可以使用 `&` 来触发父作用域的表达式，`&` 后边可以是任意合法的表达式。我们通常用 `&` 来为指令绑定事件的回调。

```html
<!-- index.html -->
<div ng-controller="Controller">
  <my-dialog ng-hide="dialogIsHidden" on-close="hideDialog()">
    Check out the contents, {{name}}!
  </my-dialog>
</div>
```

```js
// script.js
angular.module('docsIsoFnBindExample', [])
  .controller('Controller', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.name = 'Tobias';
    $scope.hideDialog = function () {
      $scope.dialogIsHidden = true;
      $timeout(function () {
        $scope.dialogIsHidden = false;
      }, 2000);
    };
  }])
  .directive('myDialog', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        'close': '&onClose'
      },
      templateUrl: 'my-dialog-close.html'
    };
  });
```

```html
<!-- my-dialog-close.html -->
<div class="alert">
  <a href class="close" ng-click="close()">&times;</a>
  <div ng-transclude></div>
</div>
```

> __Best Practice:__ use &attr in the scope option when you want your directive to expose an API for binding to behaviors.

### pagination demo

The following is the pagination directive definition object:

```js
myModule.directive('pagination', function() {
return {
  restrict: 'E',
  scope: {
    numPages: '=',
    currentPage: '='
  },
  template: ...,
  replace: true,
```

The directive is restricted to appear as an element. It creates an isolated scope with `numPages` and `currentPage` data, which is bound to attributes `num-pages` and `current-page`, respectively. The directive element will be replaced with the template shown earlier:

```js
link: function(scope) {
    scope.$watch('numPages', function(value) {
      scope.pages = [];
      for(var i=1;i<=value;i++) { scope.pages.push(i); }
      if ( scope.currentPage > value ) {
        scope.selectPage(value);
      }
    });

    ...

    scope.isActive = function(page) {
      return scope.currentPage === page;
    };

    scope.selectPage = function(page) {
      if ( ! scope.isActive(page) ) {
        scope.currentPage = page;
      }
    };

    ...

    scope.selectNext = function() {
      if ( !scope.noNext() ) {
        scope.selectPage(scope.currentPage+1);
      }
    };
}
```

The link function sets up a `$watch` property to create the pages array based on the value of `numPages`. It adds the various helper functions to the isolated scope that will be used in the directive's template.

It would be useful to provide a function or an expression that is evaluated when the page changes. We can do this by specifying a new attribute on the directive and mapping it to the isolated scope using `&`.

```html
<pagination
  num-pages="tasks.pageCount"
  current-page="tasks.currentPage"
  on-select-page="selectPage(page)">
</pagination>
```

What we are saying here is that whenever the selected page changes, the directive should call the `selectPage(page)` function passing it to the new page number as a parameter. Here is a test of this feature:

```js
it('executes the onSelectPage expression when the current page changes', inject(function($compile, $rootScope) {
    $rootScope.selectPageHandler =
      jasmine.createSpy('selectPageHandler');
    element = $compile(
      '<pagination num-pages="numPages" ' +
                 ' current-page="currentPage" ' +
                 ' on-select-page="selectPageHandler(page)">' +
      '</pagination>')($rootScope);
    $rootScope.$digest();
    var page2 = element.find('li').eq(2).find('a').eq(0);
    page2.click();
    $rootScope.$digest();
    expect($rootScope.selectPageHandler).toHaveBeenCalledWith(2);
```

We create a spy to handle the call-back and then the `it` function gets called when we click on a new page.

To implement this we add an extra field to our isolate scope definition:

```js
scope: {
  ...,
  onSelectPage: '&'
},
```

Now an `onSelectPage()` function will be available on the isolated scope. When called, it will execute the expression passed to the `on-select-page` attribute. We now change the `selectPage()` function on the isolated scope to call `onSelectPage()`:

```js
scope.selectPage = function(page) {
  if (!scope.isActive(page) ) {
    scope.currentPage = page;
    scope.onSelectPage({ page: page });
  }
};
```

Note that we pass the page variable to the expression in a map of variables. These variables are provided to the bound expression when it is executed, as though they were on the scope.

## 作用域和事件系统

层级关系中的作用域可以使用 `event bus`（一种事件系统）。AngularJS可以在作用域层级中传播具名的装备齐全的事件。事件可以从任何一个作用域中发出，然后向上（$emit）和向下（$broadcast）四处传播。  

![截图](http://www.peichao01.com/Mastering_AngularJS_book/ch1_p20.png)  

AngularJS核心服务和指令使用这种事件巴士来发出一些应用程序状态变化的重要事件。比如，我们可以监听 `$locationChangeSuccess` 事件（由 `$rootScope` 实例发出），然后在任何 location（浏览器中就是URL）变化的时候都会得到通知，如下所示：

```js
$scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl){ 
    //react on the location change here
    //for example, update breadcrumbs based on the newUrl
});
```

每一个作用域对象都会有这个 `$on` 方法，可以用来注册一个作用域事件的侦听器。这个函数所扮演的侦听器在被调用时会有一个 `event` 对象作为第一个参数。后面的参数会根据事件类型的不同与事件本身的配备一一对应。

类似于 DOM 事件，我们可以调用 `event` 对象的 `preventDefault()` 和 `stopPropagation()` 方法。`stopPropagation()` 方法将会阻止事件沿着作用域层级继续冒泡，并且只在事件向上层传播的时候（$emit）才有效。

> 尽管 AngularJS 的事件系统是模仿了 DOM 的，但两个事件传播系统是完全独立的，没有任何共同之处。

虽然在作用域层级中传播事件对一些问题来说是一种非常优雅方案（特别是对全局的，异步的状态变化来说），但还是要适度使用。通常情况下，可以依靠双向数据绑定来得到一个比较干净的方案。在整个 AngularJS 框架中，一共只发出（$emit）了三个事件（`$includeContentRequested`,`$includeContentLoaded`,`$viewContentLoaded`）和七个广播（$broadcast）（`$locationChangeStart`, `$locationChangeSuccess`, `$routeUpdate`, `$routeChangeStart`, `$routeChangeSuccess`, `$routeChangeError`, `$destroy`）。正如你所看到的，作用域事件使用的非常少，我们应该在发送自定义的事件之前认真的评估一下其他的可选方案（多数会是双向数据绑定）。

> 千万不要在 AngularJS 中模仿 DOM 的基于事件的编程方式。大多数情况下，你的应用会有更好的架构方式，你也可以在双向数据绑定这条路上深入探索。

## 作用域的生命周期

作用域需要提供相互隔离的命名空间，避免变量的命名冲突。作用域们都很小，而且被以层级的方式组织起来，对内存使用的管理来说很有帮助。当其中一个作用域不再需要 ，它就可以被销毁了，结果就是，这个作用域所暴露出来的模型和方法就符合的垃圾回收的标准。

新的作用域通常是被可创建作用域的指令所生成和销毁的。不过也可以使用 `$new()` 和 `$destroy()` 方法来手动的创建和销毁作用域。

## Reference

- [Understanding Scopes · angular/angular.js Wiki](https://github.com/angular/angular.js/wiki/Understanding-Scopes)
- [【译】《精通使用AngularJS开发Web App》（三）--- 深入scope，继承结构，事件系统和生命周期](http://segmentfault.com/blog/chao2/1190000000361245)