---
layout: post
title: "Angular Tutorial"
category : Angular
tags : [angular, tutorial]
--- 

本文为读 [AngularJS](http://www.salttiger.com/angularjs/) 的读书笔记，该书的例子在 [shyamseshadri/angularjs-book](https://github.com/shyamseshadri/angularjs-book)。

## Quick Start

[Single Page Apps with AngularJS Routing and Templating ♥ Scotch](http://scotch.io/tutorials/javascript/single-page-apps-with-angularjs-routing-and-templating) 利用 AngularJS 创建一个单页面工程。

对于正式工程可以使用 yo 创建脚手架：

1. Installing Yeoman

        npm install -g yo

1. Installing generator-angular generator

        npm install -g generator-angular

    <!--more-->

1. Starting a Fresh AngularJS project
        
        mkdir my-new-project && cd my-new-project
        yo angular [app-name]

1. Running Your Server
        
        grunt or grunt serve

1. Adding New Routes, Views, and Controllers

        yo angular:route myroute

    Produces `app/scripts/controllers/myroute.js`:

        angular.module('myMod').controller('MyrouteCtrl', function ($scope) {
          // ...
        });

    Produces `app/views/myroute.html`:

        <p>This is the myroute view</p>

    **Explicitly provide route URI**

    Example:

        yo angular:route myRoute --uri=my/route

    Produces controller and view as above and adds a route to `app/scripts/app.js` with URI `my/route`

    Available generators:

    - angular (aka angular:app)
    - angular:controller
    - angular:directive
    - angular:filter
    - angular:route
    - angular:service
    - angular:provider
    - angular:factory
    - angular:value
    - angular:constant
    - angular:decorator
    - angular:view

1. Testing

    We’ve already seen how ridiculously easy it is to start and run tests using Karma. In the end, just two commands were needed to run all your unit tests.

    Yeoman makes it easier (if you can believe it). Anytime you generate a file using Yeoman, it also creates a testing stub for you to fill out. Once you’ve installed Karma, running tests with Yeoman is as simple as executing the following command:

        grunt test

1. Building Your Project

    Building the production-ready version of your app can be a pain, or at least involve many steps. Yeoman alleviates some of this by allowing you to:

    * Concatenate all your JS Scripts into one file
    * Version your files
    * Optimize images
    * Generate Application Cache manifests

    All these benefits come from just one command:

        grunt build

See:

- [Yeoman - Modern workflows for modern webapps](http://yeoman.io/)
- [angular/angular-seed](https://github.com/angular/angular-seed).
- [yeoman/generator-angular](https://github.com/yeoman/generator-angular)
- [使用Yeoman快速启动AngularJS项目开发 / Owen Chen](http://owenchen.duapp.com/index.php/yeo-angular/)

## Principle

![](http://dl2.iteye.com/upload/attachment/0091/3055/5f89a8fd-bbe6-3d15-85c1-4881ac26075d.png)

**Angular没有提供完善的UI，没有提供CSS样式套件，也没有对移动平台进行直接支持。**所以，如果你使用Angular，你一定需要其它东西来配合。例如，如果需要UI，你需要使用jQueryUI，或者自己封装UI组件；如果需要CSS样式，你可以选择bootstrap或者LESS；如果需要支持移动平台，还是需要你自己 去开发。

### Angular能做什么？

1. 自动化的数据双向绑定；
2. MVC；
3. 依赖注入---DI系统；
4. 指令系统（可以自定义语义化标签）---Directive机制；
5. 模块化---Module机制；
6. 路由机制---Route机制；
7. 服务---Service机制；
8. 内嵌表达式---Expression机制；
9. 前端代码单元测试和集成测试的自动化（借助于Yeoman等工具）；
10. 模板；
11. 动态加载；


这么多机制里面，核心的核心是指令系统，实际上其它所有特性都是建立在指令系统之上的。本质上说，Angular写了一个JS版的编译器，一切都构 建在这款编译器之上。对于使用者来说，可以把解析器看成一个JS虚拟机，有兴趣的人可以自己阅读Angular的Parser（HTML解析器）源码。

HTML解析器机制是其它所有框架所不具备也不敢这样做的，它是Angular的灵魂。

很显然，Angular并没有打算做一个高大全的所谓【框架】，它的核心价值在于，把一堆后台框架的概念带到了前端框架中，比如依 赖注入（来自Spring）；同时又从其它地方抄了一些概念，比如数据自动双向绑定（貌似来自Flex）、模板、MVC、动态加载（来自 RequireJS等），等等。当然，这些理念都挺好。基于这些理念和工具，你可以把前端应用组织得非常良好。

但是，有一点请特别注意（尤其那些负责技术选型的所谓“架构尸”，请瞪大你的钛合金狗眼看好下面的内容）：对于界面非常复杂的业务 型系统，必须要要有完备的UI支持（Form、DataGrid、Tree、Tab、Window等）。如果你的团队整体JS水平很烂，或者压根没打算自 己去做很多东西，请慎用AngularJS！尤其是那些只有两三条破枪，连美工都没有的小公司，您请靠边儿凉快，这儿没您什么事儿。

## Anatomy of an AngularJS Application

### ng-app

Loading the Script:

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
    

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

<!--more-->

AngularJS会在`DOMContentLoaded`事件触发时执行，并通过`ng-app`指令 寻找你的应用根作用域。如果 `ng-app`指令找到了，那么AngularJS将会：

* 载入和 指令 内容相关的模块。
* 创建一个应用的“注入器(injector)”。
* 已拥有 `ng-app` 指令 的标签为根节点来编译其中的DOM。这使得你可以只指定DOM中的一部分作为你的AngularJS应用。

如果你需要主动控制一下初始化的过程，你可以使用手动执行引导程序的方法。比如当你使用“脚本加载器(script loader)”，或者需要在AngularJS编译页面之前做一些操作，你就会用到它了。

下面的例子演示了手动初始化AngularJS的方法。它的效果等同于使用`ng-app`指令 。

```
<!doctype html>
<html xmlns:ng="http://angularjs.org">
    <body>
        Hello {{'World'}}!
        <script src="http://code.angularjs.org/angular.js"></script>
        <script>
            angular.element(document).ready(function() {
            angular.bootstrap(document);
            });
        </script>
    </body>
</html>
```

下面是一些你的代码必须遵守的顺序：

1.  等页面和所有的脚本加载完之后，找到HTML模板的根节点——通常就是文档的根节点。
2.  调用 api/angular.bootstrap将模板编译成可执行的、数据双向绑定的应用程序。

### ng-init

我们可以使用 `ng-init` 在模板被渲染之前来初始化模型。

```js
<body ng-app ng-init="name='World'">
    <h1>Hello, {{name}}</h1>
</body>
```

请注意，控制器在设置模型的初始值时是跟 `ng-init`指令所做的任务一样的。有了控制器，才使得使用 JavaScript 来表达初始化的逻辑成为可能，而不必拿代码把HTML模版搞的一团糟。

### ng-bind

The `ngBind` attribute tells Angular to replace the text content of the specified HTML element with the value of a given expression, and to update the text content when the value of that expression changes.

`ngBind` 用于单向绑定($scope --> view)。

Typically, you don't use `ngBind` directly, but instead you use the double curly markup like `{{ expression }}` which is similar but less verbose.

It is preferable to use `ngBind` instead of `{{ expression }}` if a template is momentarily displayed by the browser in its raw state before Angular compiles it. Since `ngBind` is an element attribute, it makes the bindings invisible to the user while the page is loading.

An alternative solution to this problem would be using the [ngCloak](https://docs.angularjs.org/api/ng/directive/ngCloak) directive.

It has two equivalent forms. One we’ve seen with double-curly braces:

    <p>{{greeting}}</p>

Then there’s an attribute-based directive called ng-bind:

    <p ng-bind="greeting"></p>

如何使用这两种方式：

- With the double-curly syntax, on the very first page load of your application’s index.html, there’s a chance that your user will see the un-rendered template before Angular has a chance to replace the curlies with your data. Subsequent views won’t suffer from this. The reason is that the browser loads the HTML page, renders it, and only then does Angular get a chance to interpret it as you intended.

- The good news is that you can still use `{%raw%}{{ }}{%endraw%}` in the majority of your templates. For the data binding you do in your index.html page, however, use ng-bind instead. That way, your users will see nothing until the data has loaded.

### HTML content in AngularJS expressions

By default AngularJS will escape any HTML markup that made it into an expression (model) evaluated by the interpolation directive. For example, given the model:

    $scope.msg = 'Hello, <b>World</b>!';

And the markup fragment:

    <p>{{msg}}</p>

The rendering process will escape the `<b>` tags, so they will appear as plain text and not as markup:

    <p>Hello, &lt;b&gt;World&lt;/b&gt;!</p>

The interpolation directive will do the escaping of any HTML content found in the model in order to prevent HTML injection attacks.

If, for any reason, your model contains HTML markup that needs to be evaluated and rendered by a browser you can use the `ng-bind-html-unsafe` directive to switch off default HTML tags escaping:

    <p ng-bind-html-unsafe="msg"></p>

Using the `ng-bind-html-unsafe` directive we will get the HTML fragment with the `<b>` tags interpreted by a browser.

Extreme care should be taken when using the `ng-bind-html-unsafe` directive. Its usage should be limited to cases where you fully trust or can control the expression being evaluated. Otherwise malicious users might inject any arbitrary HTML on your page.

AngularJS has one more directive that will selectively sanitize certain HTML tags while allowing others to be interpreted by a browser: `ng-bind-html`. Its usage is similar to the unsafe equivalent:

    <p ng-bind-html="msg"></p>

In terms of escaping the `ng-bind-html` directive is a compromise between behavior of the `ng-bind-html-unsafe` (allow all HTML tags) and the `interpolation` directive (allow no HTML tags at all). It might be a good alternative for cases where we want to allow some HTML tags entered by users.

__Note:__The ng-bind-html directive resides in a separate module (ngSanitize) and requires inclusion of an additional source file: angular-sanitize.js.

Don't forget to declare dependency on the `ngSanitize` module if you plan to use the `ng-bind-html` directive:

```js
angular.module('expressionsEscaping', ['ngSanitize'])
  .controller('ExpressionsEscapingCtrl', function ($scope) {
    $scope.msg = 'Hello, <b>World</b>!';
  });
```

__Tip:__

Unless you are working with existing legacy systems (CMS, back-ends sending HTML, and so on.), markup in the model should be avoided. Such markup can't contain AngularJS directives and requires the `ng-bind-html-unsafe` or `ng-bind-html` directive to obtain desired results.

### ng-model

`ngModel` 用于 form 元素的双向绑定。 `ngModel` 负责:

- Binding the view into the model, which other directives such as `input`, `textarea` or select `require`.
- Providing validation behavior (i.e. required, number, email, url).
- Keeping the state of the control (valid/invalid, dirty/pristine, touched/untouched, validation errors).
- Setting related css classes on the element (`ng-valid`, `ng-invalid`, `ng-dirty`, `ng-pristine`, `ng-touched`, `ng-untouched`) including animations.
- Registering the control with its parent form.

__Note:__ `ngModel` will try to bind to the property given by evaluating the expression on the current scope. If the property doesn't already exist on this scope, it will be created implicitly and added to the scope.

you can use the `ng-model` attribute to bind elements to your model properties:

```html
<form ng-controller="SomeController">
  <input type="checkbox" ng-model="youCheckedIt">
</form>
```

This means that:

- When the user checks the box, a property called youCheckedIt on the SomeController’s `$scope` will become true. Unchecking the box makes youCheckedIt false.
- If you set `$scope.youCheckedIt` to true in SomeController, the box becomes checked in the UI. Setting it to false unchecks the box.

you can call `$watch()` with an expression to observe and a callback that gets invoked whenever that expression changes:

```html
<form ng-controller="StartUpController">
    Starting: <input ng-model="funding.startingEstimate">
    Recommendation: {{funding.needed}}
</form>
```

```js
function StartUpController($scope) {
  $scope.funding = { startingEstimate: 0 };

  computeNeeded = function() {
    $scope.funding.needed = $scope.funding.startingEstimate * 10;
  };

  $scope.$watch('funding.startingEstimate', computeNeeded);
}
```

### ng-repeat

The `ng-repeat` directive is probably one of the most used and the most powerful directives. It will iterate over a collection of items stamping out a new DOM element for each entry in a collection. But the `ng-repeat` directive will do much more than simply assuring the initial rendering of a collection. It will constantly monitor the source of data to re-render a template in response to changes.

Internally the `ng-repeat` might choose to move DOM nodes around (if you move an element in array), delete a DOM node if an element is removed from the array and insert new nodes if additional elements end up in the array. Regardless of the strategy chosen by a repeater behind the scenes it is crucial to realize that it is not a simple `for` loop that will run once. The `ng-repeat` directive behaves more like an observer of a data that tries to map entries in a collection to DOM nodes. The process of data-observing is continuous.

`ng-repeat` creates a copy of a set of elements once for every item in a collection.

By using the `ng-repeat-start` and the `ng-repeat-end` attributes it will be possible to indicate a group of sibling DOM elements to be iterated over.

The basic usage and syntax is very simple:

```html
<table class="table table-bordered">
  <tr ng-repeat="user in users">
    <td>{{user.name}}</td>
    <td>{{user.email}}</td>
  </tr>
</table>
```

Here the `users` array is defined on a scope and contains typical user objects with properties like: `name`, `email`, and so on. The `ng-repeat` directive will iterate over users' collection and create a `<tr>` DOM element for each entry in a collection.

#### Special variables

The ng-repeat directive also gives you references to the index of the current element via `$index`, and booleans that tell you if you’re on the first element, somewhere in the middle, or the last element of the collection with `$first`, `$middle`, and `$last`.
You might imagine using the `$index` to label rows in a table. Given a template like this:

```html
<li ng-repeat="breadcrumb in breadcrumbs.getAll()">
  <span class="divider">/</span>
  <ng-switch on="$last">
    <span ng-switch-when="true">{{breadcrumb.name}}</span>
    <span ng-switch-default>
      <a href="{{breadcrumb.path}}">{{breadcrumb.name}}</a>
    </span>
  </ng-switch>
</li>
```

#### Iterating over an object's properties

Usually the `ng-repeat` directive is used to display entries from a JavaScript array. Alternatively it can be used to iterate over properties of an object. In this case the syntax is slightly different:

```js
<li ng-repeat="(name, value) in user">
    Property {{$index}} with {{name}} has value {{value}}
</li>
```

In the preceding example, we can display all the properties of a user object as an unordered list. Please note that we must specify variable names for both a property name and its value using a bracket notation (`name`, `value`).

The `ng-repeat` directive will, before outputting results, sort property names alphabetically. This behavior can't be changed so there is no way of controlling the iteration order while using `ng-repeat` with objects.

Iterating over objects' properties, while being supported, has limitations. The main issue is that we can't control iteration order.

#### ngRepeat patterns

This section will walk us through some of the commonly used presentation patterns and ways of implementing them with AngularJS. In particular we are going to look into lists with details and altering classes on elements being part of a list.

__Lists and details__

It is a common use case to display a list whose items expand to show additional details, when they are clicked. There are two variants of this pattern: either only one element can be expanded or alternatively several expended elements are allowed. Here is the screenshot illustrating this particular UI design:

![](http://johnnyimages.qiniudn.com/angular-ng-repeat.jpg)

__Displaying only one row with details__

The requirement of having only one element expanded can be easily covered with the following code:

```html
<table class="table table-bordered" ng-controller="ListAndOneDetailCtrl">
  <tbody ng-repeat="user in users" ng-click="selectUser(user)" ng-switch on="isSelected(user)">
    <tr>
      <td>{{user.name}}</td>
      <td>{{user.email}}</td>
</tr>
<tr ng-switch-when="true">
      <td colspan="2">{{user.desc}}</td>
    </tr>
  </tbody>
</table>
```

In the preceding example an additional row, containing user details, is only rendered if a given user was selected. A selection process is very simple and is covered by the selectUser and isSelected functions:

```js
.controller('ListAndOneDetailCtrl', function ($scope, users) {
  $scope.users = users;

  $scope.selectUser = function (user) {
    $scope.selectedUser = user;
  };

  $scope.isSelected = function (user) {
    return $scope.selectedUser === user;
  };
})
```

Assuming that we would like to allow multiple rows with additional details we need to change a strategy. This time selection details need to be stored on each and every element level. As you remember the `ng-repeat` directive is creating a new scope for each and every element of a collection it iterates over. We can take advantage of this new scope to store "selected" state for each item:

```html
<table class="table table-bordered">
  <tbody ng-repeat="user in users" ng-controller="UserCtrl"
    ng-click="toggleSelected()" ng-switch on="isSelected()">
    <tr>
      <td>{{user.name}}</td>
      <td>{{user.email}}</td>
    </tr>
    <tr ng-switch-when="true">
      <td colspan="2">{{user.desc}}</td>
    </tr>
  </tbody>
</table>
```

This example is interesting since we are using the `ng-controller` directive for each item. A provided controller can augment scope with functions and variables to control selection state:

```js
.controller('UserCtrl', function ($scope) {

  $scope.toggleSelected = function () {
    $scope.selected = !$scope.selected;
  };

  $scope.isSelected = function () {
    return $scope.selected;
  };
});
```

It is important to understand that specifying a controller on the same DOM element as the `ng-repeat` directive means that the controller will be managing a new scope created by a repeater. In practice it means that we can have a controller dedicated to managing individual items of a collection. It is a powerful pattern that allows us to neatly encapsulate item-specific variables and behavior (functions).

__Altering tables, rows, and classes__

Zebra-striping is often added to lists in order to improve their readability. AngularJS has a pair of directives (`ngClassEven` and `ngClassOdd`) that make this task trivial:

```html
<tr ng-repeat="user in users" 
ng-class-even="'light-gray'" ng-class-odd="'dark-gray'">
  . . . 
</tr>
```

The `ngClassEven` and `ngClassOdd` directives are just specialization of the more generic `ngClass` directive. The `ngClass` is very versatile and can be applied in many different situations. To demonstrate its power we could rewrite the preceding example like follows:

```html
<tr ng-repeat="user in users" 
ng-class="{'dark-gray' : !$index%2, 'light-gray' : $index%2}">
```

Here the `ngClass` directive is used with an object argument. Keys of this object are class names and values; conditional expressions. A class specified as a key will be added or removed from an element based on result of a corresponding expression evaluation.

The `ng-class` directive can also accept arguments of type string or array. Both arguments can contain a list of CSS classes (coma-separated in case of string) to be added to a given element.

### ng-click

AngularJS has the built-in support for the different events with the following directives:

* <span class="strong">**Click events**</span>: `ngClick` and `ngDblClick`
* <span class="strong">**Mouse events**</span>: `ngMousedown`, `ngMouseup`, `ngMouseenter`, `ngMouseleave`, `ngMousemove` and `ngMouseover`
* <span class="strong">**Keyboard events**</span>: `ngKeydown`, `ngKeyup` and `ngKeypress`
* <span class="strong">**Input change event**</span> (`ngChange)`: The `ngChange` directive cooperates with the `ngModel` one, and let us to react on model changes initiated by user input.

Mentioned DOM event handlers can accept a special argument `$event` in their expression, which represents the raw DOM event. This allows us to get access to lower-level properties of an event, prevent it default action, stop its propagation, and so on. As an example we can see how to read the position of a clicked element:

```html
<li ng-repeat="item in items" ng-click="logPosition(item, $event)">
    {{item}}
</li>
```

Where the `logPosition` function is defined on a scope like follows:

```js
$scope.readPosition = function (item, $event) {
  console.log(item + ' was clicked at: ' + $event.clientX + ',' + $event.clientY);
};
```

While the `$event` special variable is exposed to event handlers it shouldn't be abused to do extensive DOM manipulations. _Angular Zen_ AngularJS is all about declarative UI and DOM manipulation should be restricted to directives. This is why the `$event` argument is mostly used inside directive's code.

### ng-submit

```html
<form ng-submit="edit()" class="form-horizontal">
    <div class="form-actions">
        <button class="btn btn-primary">Edit</button>
    </div>
</form>
```

The directive states that the `edit()` function on the `scope` is called in case the form is submitted. The form submission happens when any button without an explicit function attached (in this case, the Edit button) is clicked.

If you have a form that groups inputs, you can use the `ng-submit` directive on the form itself to specify a function to call when the form submits:

```html
<form ng-submit="requestFunding()" ng-controller="StartUpController">
  Starting: <input ng-change="computeNeeded()" ng-model="startingEstimate">
  Recommendation: {{needed}}
  <button>Fund my startup!</button>
</form>
```

The `ng-submit` directive also automatically prevents the browser from doing its default POST action when it tries to submit the form.

### ng-show & ng-hide

These directives work by setting the element styles to `display:block` to show and `display:none` to hide as appropriate. Let’s take a fictitious example where we’re building the control panel for a Death Ray.

```html
<div ng-controller='DeathrayMenuController'>
  <button ng-click='toggleMenu()'>Toggle Menu</button>
  <ul ng-show='menuState.show'>
    <li ng-click='stun()'>Stun</li>
    <li ng-click='disintegrate()'>Disintegrate</li>
    <li ng-click='erase()'>Erase from history</li>
  </ul>
<div/>
```

```js
function DeathrayMenuController($scope) {
  $scope.menuState.show = false;

  $scope.toggleMenu = function() {
    $scope.menuState.show = !$scope.menuState.show;
  };

  // death ray functions left as exercise to reader
}
```

### ng-switch

If we want to physically remove or add DOM nodes conditionally the family of `ng-switch` directives (`ng-switch`, `ng-switch-when`, `ng-switch-default`) will come handy:

```html
<div ng-switch on="showSecret">
  <div ng-switch-when="true">Secret</div>
  <div ng-switch-default>Won't show you my secrets!</div>
</div>
```

The `ng-switch` directive is really close to the JavaScript switch statement as we may have several `ng-switch-when` occurrences inside for one `ng-switch`.

The main difference between the `ng-show`/`ng-hide` and the `ng-switch` directives is the way the DOM elements are treated. The `ng-switch` directive will add/remove DOM elements from the DOM tree while the `ng-show`/`ng-hide` will simply apply `style="display: none;"` to hide elements. The `ng-switch` directive is creating a new scope.

The `ng-show`/`ng-hide` directives are easy to use but might have unpleasant performance consequences if applied to large number of DOM nodes. If you spot performance issues related to the size of DOM tree you should lean towards using more verbose `ng-switch` family of directives.

### ng-if

The problem with the `ng-switch` family of directives is that the syntax can get quite verbose for simple use-case. Fortunately AngularJS has one more directive in its arsenal: `ng-if`. It behaves similarly to the `ng-switch` directive (in the sense that it adds / removes elements from the DOM tree) but has very simple syntax:

    <div ng-if="showSecret">Secret</div>

### ng-include

The `ng-include` directive, while not directly acting as the `if`/`else` statement, can be used to conditionally display blocks of dynamic, AngularJS-powered markup. The discussed directive has a very nice property. It can load and conditionally display partials based on a result of expression evaluation. This allows us to easily create highly dynamic pages. For example, we could include different user edit forms depending on the user's role. In the following code snippet we load a different partial for users that have administrator role:

```html
<div ng-include="user.admin && 'edit.admin.html' || 'edit.user.html'">
</div>
```

The `ng-include` directive accepts an expression as its argument, so you need to pass a quoted string if you plan to use a fixed value pointing to a partial, for example, `<div ng-include="'header.tpl.html'"></div>`.

### ng-class & ng-style

Angular provides the `ng-class` and `ng-style` directives. Each of them takes an expression. The result of evaluating this expression can be one of the following:

* A string representing space-delimited class names
* An array of class names
* A map of class names to boolean values

Let’s imagine that you want to display errors and warnings to your users in a standard location in the application’s header. Using the `ng-class` directive, you could do something like this:

```css
.error {
  background-color: red;
}

.warning {
  background-color: yellow;
}
```

```html
<div ng-controller='HeaderController'>
  ...
  <div ng-class='{error: isError, warning: isWarning}'>{{messageText}}</div>
  …
  <button ng-click='showError()'>Simulate Error</button>
  <button ng-click='showWarning()'>Simulate Warning</button>
</div>
```

```js
function HeaderController($scope) {
  $scope.isError = false;
  $scope.isWarning = false;

  $scope.showError = function() {
    $scope.messageText = 'This is an error!';
    $scope.isError = true;
    $scope.isWarning = false;
  };

$scope.showWarning = function() {
    $scope.messageText = 'Just a warning.  Please carry on.';
    $scope.isWarning = true;
    $scope.isError = false;
  };
}
```

You can even do nifty things like highlighting a selected row in a table. Let’s say we’re building a restaurant directory and we want to highlight a row that the user clicks on.
In our CSS, we set up the style for a highlighted row:

```css
.selected {
  background-color: lightgreen;
}
```

In the template, we set `ng-class` to `{selected: $index==selectedRow}`. This has the effect of setting the selected class when our model property called selectedRow matches the ng-repeat’s `$index`. We’ll also set up an `ng-click` to notify our controller as to which row the user clicks:

```html
<table ng-controller='RestaurantTableController'>
  <tr ng-repeat='restaurant in directory' ng-click='selectRestaurant($index)'
      ng-class='{selected: $index==selectedRow}'>
    <td>{{restaurant.name}}</td>
    <td>{{restaurant.cuisine}}</td>
  </tr>
</table>
```

In our JavaScript, we just set up some dummy restaurants and create the selectRow function:

```
function RestaurantTableController($scope) {
  $scope.directory = [{name:'The Handsome Heifer', cuisine:'BBQ'},
                      {name:'Green's Green Greens', cuisine:'Salads'},
                      {name:'House of Fine Fish', cuisine:'Seafood'}];

  $scope.selectRestaurant = function(row) {
    $scope.selectedRow = row;
  };
}
```

### ng-src and ng-href

When data binding to an `<img>` or `<a>` tag, the obvious path of using {%raw%}{{ }}{%endraw%} in the src or href attributes won’t work well. Because browsers are aggressive about loading images parallel to other content, Angular doesn’t get a chance to intercept data binding requests. While the obvious syntax for an `<img> `might be:

    <img src="/images/cats/{{favoriteCat}}">

Instead, you should use the `ng-src` attribute and write your template as:

    <img ng-src="/images/cats/{{favoriteCat}}">

Similarly, for the `<a>` tag, you should use `ng-href`:

    <a ng-href="/shop/category={{numberOfBalloons}}">some text</a>

### Expressions

The goal behind the expressions that you use in templates is to let you be as clever as you need to be to create hooks between your template, your application logic, and your data, but at the same time prevent application logic from sneaking into the template.

Until this point, we’ve been mostly using references to data primitives as the expressions passed to Angular directives. But these expressions can do much more. You can do simple math (+, -, /, *, %), make comparisons (==, !=, >, <, >=), perform boolean logic (&&, ||, !) and bitwise operations (\^, &, |). 

You can call functions you expose on `$scope` in your controller and you can reference arrays and object notation ([ ], { }, .).
All of these are valid examples of expressions:

```html
<div ng-controller='SomeController'>
  <div>{{recompute() / 10}}</div>
  <ul ng-repeat='thing in things'>
    <li ng-class='{highlight: $index % 4 >= threshold($index)}'>
      {{otherFunction($index)}}
    </li>
  </ul>
</div>
```


The first expression here, `recompute() / 10`, while valid, is a good example of putting logic in the template, and should be avoided. Keeping a separation of responsibilities between your view and controllers ensures that they’re easy to reason and easy to test.

While you can do quite a lot with expressions, they are computed with a custom parser that’s part of Angular. They are not evaluated using JavaScript’s `eval()`, and are considerably more restrictive.

Instead, they are evaluated using a custom parser that comes with Angular. In it, you won’t find looping constructs (for, while, and so on), flow-of-control operators (if-else, throw) or operators that modify data (++, --). When you need these types of operations, do them in your controller or via a directive.

Though expressions are more restrictive than JavaScript in many ways, they are more forgiving to undefined and null. Instead of throwing a NullPointerException error, templates will simply render nothing. This allows you to safely use model values that haven’t been set yet, and have them appear in the UI as soon as they get populated.

### $watch

The function’s signature is:

    $watch(watchFn, watchAction, deepWatch) 

The details of each parameter are as follows:

- `watchFn`

    This parameter is a string with an Angular expression or a function that returns the current value of the model that you want to watch. This expression will be evaluated multiple times, so you need to make sure that it has no side effects. __That is, it can be called multiple times without changing state.__ For the same reason, watch expressions should be computationally cheap. If you’ve passed in an Angular expression in a string, it will be evaluated against objects available to the scope it’s called on.

- `watchAction`

    This is the function or expression to be called when the `watchFn` changes. In the function form, it receives the new and old values of watchFn as well as a reference to the scope. Its signature is `function(newValue, oldValue, scope)`.

- `deepWatch`

    If set to true, this optional boolean parameter tells Angular to examine each property within the watched object for changes. You’d use this if you wanted to watch individual elements in an array or properties in an object instead of just a simple value. As Angular needs to walk the array or object, this can be computationally expensive if the collection is large.

The `$watch` function returns a function that will de-register the listener when you no longer want to receive change notifications.
If we wanted to watch a property and then later de-register it, we would use the following:

    ...
    var dereg = $scope.$watch('someModel.someProperty', callbackOnChange());
    …
    dereg();

Let’s say that we want to apply a $10 discount when the customer adds more than $100 worth of merchandise to her cart. For a template, we’ll use:

```js
{% raw %}
<div ng-controller="CartController">
  <div ng-repeat="item in items">
    <span>{{item.title}}</span>
    <input ng-model="item.quantity">
    <span>{{item.price | currency}}</span>
    <span>{{item.price * item.quantity | currency}}</span>
  </div>
  <div>Total: {{totalCart() | currency}}</div>
  <div>Discount: {{bill.discount | currency}}</div>
  <div>Subtotal: {{subtotal() | currency}}</div>
</div>
{% endraw %}
```

With a CartController, it would look like the following:

```js
function CartController($scope) {
  $scope.bill = {};

  $scope.items = [
    {title: 'Paint pots', quantity: 8, price: 3.95},
    {title: 'Polka dots', quantity: 17, price: 12.95},
    {title: 'Pebbles', quantity: 5, price: 6.95}
  ];

  $scope.totalCart = function() {
    var total = 0;
    for (var i = 0, len = $scope.items.length; i < len; i++) {
      total = total + $scope.items[i].price * $scope.items[i].quantity;
    }

    return total;
  }

  $scope.subtotal = function() {
    return $scope.totalCart() - $scope.bill.discount;
  };

  function calculateDiscount(newValue, oldValue, scope) {
    $scope.bill.discount = newValue > 100 ? 10 : 0;
  }

  $scope.$watch($scope.totalCart, calculateDiscount);
}
```

<p data-height="268" data-theme-id="0" data-slug-hash="sEymG" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/sEymG/'>sEymG</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

__Watching multiple things__

What if you want to watch multiple properties or objects and execute a function whenever any of them change? You’d have two basic options:

* Put them into an array or object and pass in deepWatch as true.
* Watch a concatenated value of the properties.

In the first case, if you’ve got an object with two properties _a_ and _b_ in your scope, and want to execute the `callMe()` function on change, you could watch both of them, like so:

    $scope.$watch('things.a + things.b', callMe(...)); 

Of course, _a_ and _b_ could be on different objects, and you could make the list as long as you like. If the list is long, you would likely write a function that returns the concatenated value rather than relying on an expression for the logic. In the second case, you might want to watch all the properties on the things object. In this case, you could do this:

    $scope.$watch('things', callMe(...), true);

__Performance Considerations in watch()__


The preceding example executes correctly, but there is a potential problem with performance. Though it isn’t obvious, if you put a debugger breakpoint in `totalCart()`, you’d see that it gets called six times to render this page. Though you’d never notice it in this application, in more complex apps, running it six times could be an issue.

Why six? Three of them we can trace pretty easily, as it runs one time each in:

* The template as `{% raw %}{{totalCart() | currency}}{% endraw %}`
* The `subtotal()` function
* The `$watch()` function

Then Angular runs all of these again, bringing us to six. Angular does this to verify that transitive changes in your model have fully propagated and your model has _settled_ . Angular does this checking by making a copy of all watched properties and comparing them to the current value to see if they’ve changed. In fact, Angular may run this up to ten times to ensure full propagation. If changes are still occurring after ten iterations, Angular exits with an error. If that occurs, you probably have a dependency loop that you’ll need to fix.

Though you currently need to worry about this, by the time you’ve finished this book it may be a non-issue. While Angular has had to implement data binding in JavaScript, we’ve been working with the TC39 folks on a low-level native implementation called [Object.observe()](http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe). With this in place, Angular will automatically use `Object.observe()` wherever present to give you native-speed data binding.

As you’ll see in the next chapter, Angular has a nice Chrome debugging extension called Batarang that will automatically highlight expensive data bindings for you.

Now that we know about this issue, there are a few ways we can solve it. One way would be to create a `$watch` on changes to the items array and just recalculate the total, discount, and subtotal as properties on the `$scope`.

To do this, we’d update the template to use these properties:

```html
{% raw %}
<div>Total: {{bill.total | currency}}</div>
<div>Discount: {{bill.discount | currency}}</div>
<div>Subtotal: {{bill.subtotal | currency}}</div>
{% endraw %}
```

Then, in JavaScript, we’d watch the items array, and call a function to calculate the totals on any change to that array, like so:

```js
function CartController($scope) {
  $scope.bill = {};

  $scope.items = [
    {title: 'Paint pots', quantity: 8, price: 3.95},
    {title: 'Polka dots', quantity: 17, price: 12.95},
    {title: 'Pebbles', quantity: 5, price: 6.95}
  ];

  var calculateTotals = function() {
    var total = 0;
    for (var i = 0, len = $scope.items.length; i < len; i++) {
      total = total + $scope.items[i].price * $scope.items[i].quantity;
    }
    $scope.bill.totalCart = total;
    $scope.bill.discount = total > 100 ? 10 : 0;
    $scope.bill.subtotal = total - $scope.bill.discount;
  };

  $scope.$watch('items', calculateTotals, true);
}
```

Notice here that the `$watch` specified items as a string. This is possible because the `$watch` function can take either a function (as we did previously) or a string. If a string is passed to the `$watch` function, then it will be evaluated as an expression in the scope of the `$scope` it’s called on.

This strategy might work well for your app. However, since we’re watching the items array, Angular will have to make a copy of it to compare it for us. For a large list of items, it may perform better if we just recalculate the bill properties every time Angular evaluates the page. We can do this by creating a `$watch` with only a `watchFn` that will recalculate our properties like this:

```js
$scope.$watch(function() {
  var total = 0;
  for (var i = 0; i < $scope.items.length; i++) {
    total = total + $scope.items[i].price * $scope.items[i].quantity;
  }
  $scope.bill.totalCart = total;
  $scope.bill.discount = total > 100 ? 10 : 0;
  $scope.bill.subtotal = total - $scope.bill.discount;
});
```

### $valid

```html
<h1>Sign Up</h1>
<form name='addUserForm' ng-controller="AddUserController">
  <div ng-show='message'>{{message}}</div>
  <div>First name: <input name='firstName' ng-model='user.first' required></div>
  <div>Last name: <input ng-model='user.last' required></div>
  <div>Email: <input type='email' ng-model='user.email' required></div>
  <div>Age: <input type='number'
                   ng-model='user.age'
                   ng-maxlength='3'
                   ng-min='1'></div>
  <div><button ng-click='addUser()'
               ng-disabled='!addUserForm.$valid'>Submit</button>
</ng-form>
```

Notice that we’re using the `required` attribute and input types for email and number from HTML5 to do our validation on some of the fields. This works great with Angular, and in older non-HTML5 browsers, Angular will polyfill these with directives that perform the same jobs.

```js
function AddUserController($scope) {
  $scope.message = '';

  $scope.addUser = function () {
    // TODO for the reader: actually save user to database...
    $scope.message = 'Thanks, ' + $scope.user.first + ', we added you!';
  };
}
```

Inside the controller, we can access the validation state of the form through a property called `$valid`. Angular will set this to true when all the inputs in the form are valid. We can use this `$valid` property to do nifty things such as disabling the Submit button when the form isn’t completed yet.

We can prevent form submission in an invalid state by adding ng-disabled to the Submit button:

    <button ng-disabled='!addUserForm.$valid'>Submit</button>

See:

- [Form validation with AngularJS](http://www.ng-newsletter.com/posts/validations.html)

## ng-3-part

- [mgonto/angular-wizard](https://github.com/mgonto/angular-wizard) 向导。

## Testing

- [基于Karma和Jasmine的AngularJS测试 / Owen Chen](http://owenchen.duapp.com/index.php/jasmine-and-karma-test-angularjs/)

### Karma’s

Karma’s main reason for existence is to make your test-driven development (TDD) workflow simple, fast, and fun. It uses[NodeJS](http://www.nodejs.org/) and [SocketIO](http://www.socket.io/) (you don’t need to know what they are, just assume that they are awesome, cool libraries) to allow running your code, and tests in multiple browsers at insanely fast speeds. Go find out more at [https://github.com/vojtajina/karma/](https://github.com/vojtajina/karma/).

1. Set up Karma

        npm install -g karma

2. Getting your config file up

    If you used Yeoman to create your app skeleton, then you already have a ready-made Karma config file waiting for you to use. If not, just go ahead and execute the following command from the base folder of your application directory: 

        karma init

    in your terminal console, and it will generate a dummy config file ( _karma.conf.js_ ) for you to edit to your liking, with some pretty standard defaults. You can use that.

3. Starting the Karma server

    Just run the following command: 

        karma start [optionalPathToConfigFile]

    This will start the Karma server on port 9876 (the default, which you can change by editing the _karma.conf.js_ file from the previous step). While Karma should open up a browser and capture it automatically, it will print all the instructions needed to capture another browser in the console. If you are too lazy to do that, just go to [http://localhost:9876](http://localhost:9876/) in another browser or device, and you are good to start running tests in multiple browsers.

4. Running the tests

    Execute the following command: 

        karma run

    That’s it. You should get your results printed right in the console where you ran the command.


### Unit Tests

- [An Introduction To Unit Testing In AngularJS Applications](http://www.smashingmagazine.com/2014/10/07/introduction-to-unit-testing-in-angularjs)

AngularJS makes it easy to write your unit tests, and supports the Jasmine style of writing tests by default (as does Karma). Jasmine is what we call a behavior-driven development framework, which allows you to write specifications that denote how your code should behave. A sample test in Jasmine might look something like this.
describe("MyController:", function() {

    it("to work correctly", function() {
        var a = 12;
        var b = a;

        expect(a).toBe(b);
        expect(a).not.toBe(null);
      });
    });

AngularJS provides some nice mockups, as well as testing functions, to allow you to create services, controllers, and filters right in your unit tests, as well as mock out HttpRequests and the like.

Karma does not have plug-ins (yet!) for all the latest and greatest IDEs, but you don’t really need any. All you need to do is add a shortcut command to execute “karma start” and “karma run” from within your IDE. This can usually be done by adding a simple script to execute, or the actual shell command, depending on your choice of editor. You should see the results every time it finishes running, of course.


## Tools

- Batarang 
    Batarang is a Chrome extension that adds AngularJS knowledge to the built-in Developer Tools suite in Google Chrome. 
- [ng-inspector for AngularJS](http://ng-inspector.org/) The AngularJS inspector pane for your browser.

## Library

- [Popular Modules - AngularJS Modules, Plugins and Directives](http://ngmodules.org/)
- [angular-data: Home](http://angular-data.pseudobry.com) Give your data the treatment it deserves with a data store built for Angular.js.
- [AngularJS Datatype Editors (ADE)](http://toodledo.github.io/ADE/) ADE is a bunch of directives and filters for displaying and editing various types of data, using AngularJS.

## FAQ

### How do I switch views in AngularJS from a controller function?

In order to switch between different views, you could directly change the window.location (using the $location service!) in
index.html file

```html
<!-- index.html -->
<div ng-controller="Cntrl">
        <div ng-click="changeView('edit')">
            edit
        </div>
        <div ng-click="changeView('preview')">
            preview
        </div>
</div>
```


```js
// Controller.js
function Cntrl ($scope,$location) {
        $scope.changeView = function(view){
            $location.path(view); // path not hash
        }
    }
```

and configure the router to switch to different partials based on the location. This would have the benefit of history as well as using ng-view.

Alternatively, you use ng-include with different partials and then use a ng-switch as shown in here ( https://github.com/ganarajpr/Angular-UI-Components/blob/master/index.html )

```js
 <div ng-switch on="component" >
    <div ng-switch-when="flash" ng-include="'partial/flash.html'"></div>
    <div ng-switch-when="tabs" ng-include="'partial/tabs.html'"></div>
    <div ng-switch-when="cm"></div>
    <div ng-switch-default></div>
</div>
```

也可以使用内置模板如：

```html
<div class="module" ng-controller="FruitCtrl">
    <h1>Fruit Module</h1>
    <div ng-switch="moduleState">
        <div ng-switch-when="list">
            <ul>
                <li ng-repeat="fruit in fruits"><a href="#" ng-click="showDetail(fruit)">{{fruit}}</a></li>
            </ul>
        </div>
        <div ng-switch-when="details">
            <p>Details for {{ selectedFruit }}</p>
            <a href="#" ng-click="showList()">Back to list</a>
        </div>
    </div>
</div>
```

The extra variable called `moduleState` defines the current state of the widget. Thanks to the `ng-switch` directive the content of the outer `div` automatically switches between inner elements based on the values passed to their `ng-switch-when` attributes.

```js
// Controller
function FruitCtrl($scope)
{
    $scope.moduleState = 'list';

    $scope.fruits = ['Banana', 'Orange', 'Apple'];

    $scope.showDetail = function(fruit)
    {
        $scope.selectedFruit = fruit;

        $scope.moduleState = 'details';
    };

    $scope.showList = function()
    {
        $scope.moduleState = 'list';
    };
}
```

All you have to do here is to modify the value of the `moduleState` variable, which automatically shows the desired widget view. Additionally, the introduced `selectedFruit` variable holds the reference of the item to act on in the details view.

The advantage of using the `ng-switch` directive is that you can easily add any number of states to your widget in a consistent manner.

See: 

- [javascript - How do I switch views in AngularJS from a controller function? - Stack Overflow](http://stackoverflow.com/questions/11003916/how-do-i-switch-views-in-angularjs-from-a-controller-function)
- [javascript - AngularJS change partial in controller on click - Stack Overflow](http://stackoverflow.com/questions/16649617/angularjs-change-partial-in-controller-on-click)

### Multiple directives [ngSwitchWhen, ngInclude] asking for transclusion

See [Ng-Include inside ng-switch should be allowed · Issue #4731 · angular/angular.js](https://github.com/angular/angular.js/issues/4731)

### how to access the angular $scope variable in browsers console

Pick an element in the HTML panel of the developer tools and type this in the console

```
angular.element($0).scope()
```

In webkit `$0` is a reference to the selected DOM node in the elements tab, so by doing this you get the selected DOM node scope printed out in the console

**Addons/Extensions**

There are some very useful Chrome Extensions that you might want to checkout:

* [Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk). This has been around for a while.

* [ng-inspector](http://ng-inspector.org/). This is the newest one, and as the name suggests, it allows you to inspect your application's scopes.

**Playing with JS Fiddle**

When working with jsfiddle you can open the fiddle in _show_ mode by adding `/show` at the end of the url. When running like this you have access to the `angular` global. You can try it here

http://jsfiddle.net/jaimem/Yatbt/show

**jQuery Lite**

If you load jQuery before angular, `angular.element` can be passed a jQuery selector. So you could inspect the scope of a controller with

```
angular.element('[ng-controller=ctrl]').scope()
```

Of a button

```
angular.element('button:eq(1)').scope()
```

... and so on.

You might actually want to use a global function to make it easier

```
window.SC = function(selector){
    return angular.element(selector).scope();
};
```

Now you could do this

```
SC('button:eq(10)')
SC('button:eq(10)').row   // -> value of scope.row
```

check here: http://jsfiddle.net/jaimem/DvRaR/1/show/

See [angularjs - how to access the angular $scope variable in browsers console - Stack Overflow](http://stackoverflow.com/questions/13743058/how-to-access-the-angular-scope-variable-in-browsers-console)

### $apply() and $digest()

See:

- [Understanding Angular's $apply() and $digest()](http://www.sitepoint.com/understanding-angulars-apply-digest/) 
- [AngularJS and scope.$apply — Jim Hoskins](http://jimhoskins.com/2012/12/17/angularjs-and-apply.html)

`$apply()` and `$digest()` are two core, and sometimes confusing, aspects of AngularJS. To understand how AngularJS works one needs to fully understand how `$apply()` and `$digest()` work. This article aims to explain what `$apply()` and `$digest()` really are, and how they can be useful in your day-to-day AngularJS programming. 

#### `$apply` and `$digest` Explored

AngularJS offers an incredibly awesome feature known as two way data binding which greatly simplifies our lives. Data binding means that when you change something in the view, the `scope` model _automagically_ updates. Similarly, whenever the `scope` model changes, the view updates itself with the new value. How does does AngularJS do that? When you write an expression (`{{aModel}}`), behind the scenes Angular sets up a watcher on the `scope` model, which in turn updates the view whenever the model changes. This `watcher` is just like any watcher you set up in AngularJS:

    $scope.$watch('aModel', function(newValue, oldValue) {
      //update the DOM with newValue
    });

The second argument passed to `$watch()` is known as a listener function, and is called whenever the value of `aModel` changes. It is easy for us to grasp that when the value of `aModel` changes this listener is called, updating the expression in HTML. But, there is still one big question! How does Angular figure out when to call this listener function? In other words, how does AngularJS know when `aModel` changes so it can call the corresponding listener? Does it run a function periodically to check whether the value of the `scope` model has changed? Well, this is where the `$digest` cycle steps in.

It’s the `$digest` cycle where the watchers are fired. When a watcher is fired, AngularJS evaluates the `scope` model, and if it has changed then the corresponding listener function is called. So, our next question is when and how this `$digest` cycle starts.

The `$digest` cycle starts as a result of a call to `$scope.$digest()`. Assume that you change a `scope` model in a handler function through the `ng-click` directive. In that case AngularJS automatically triggers a `$digest` cycle by calling `$digest()`. When the `$digest` cycle starts, it fires each of the watchers. These watchers check if the current value of the `scope` model is different from last calculated value. If yes, then the corresponding listener function executes. As a result if you have any expressions in the view they will be updated. In addition to `ng-click`, there are several other built-in directives/services that let you change models (e.g. `ng-model`, `$timeout`, etc) and automatically trigger a `$digest` cycle.

So far, so good! But, there is a small gotcha. In the above cases, Angular doesn’t directly call `$digest()`. Instead, it calls `$scope.$apply()`, which in turn calls `$rootScope.$digest()`. As a result of this, a digest cycle starts at the `$rootScope`, and subsequently visits all the child scopes calling the watchers along the way.

Now, let’s assume you attach an `ng-click` directive to a button and pass a function name to it. When the button is clicked, AngularJS wraps the function call within `$scope.$apply()`. So, your function executes as usual, change models (if any), and a `$digest` cycle starts to ensure your changes are reflected in the view.

**Note**: `$scope.$apply()` automatically calls `$rootScope.$digest()`. The `$apply()` function comes in two flavors. The first one takes a function as an argument, evaluates it, and triggers a `$digest` cycle. The second version does not take any arguments and just starts a `$digest` cycle when called. We will see why the former one is the preferred approach shortly.

#### When Do You Call `$apply()` Manually?

If AngularJS usually wraps our code in `$apply()` and starts a `$digest` cycle, then when do you need to do call `$apply()` manually? Actually, AngularJS makes one thing pretty clear. It will account for only those model changes which are done inside AngularJS’ context (i.e. the code that changes models is wrapped inside `$apply()`). Angular’s built-in directives already do this so that any model changes you make are reflected in the view. However, if you change any model outside of the Angular context, then you need to inform Angular of the changes by calling `$apply()` manually. It’s like telling Angular that you are changing some models and it should fire the `watchers` so that your changes propagate properly.

For example, if you use JavaScript’s `setTimeout()` function to update a `scope` model, Angular has no way of knowing what you might change. In this case it’s your responsibility to call `$apply()` manually, which triggers a `$digest` cycle. Similarly, if you have a directive that sets up a DOM event listener and changes some models inside the handler function, you need to call `$apply()` to ensure the changes take effect.

Let’s look at an example. Suppose you have a page, and once the page loads you want to display a message after a two second delay. Your implementation might look something like the JavaScript and HTML shown in the following listing.

<p data-height="268" data-theme-id="0" data-slug-hash="fukyn" data-default-tab="result" data-user="Sandeep92" class='codepen'>See the Pen <a href='http://codepen.io/Sandeep92/pen/fukyn/'>fukyn</a> by Sandeep Panda (<a href='http://codepen.io/Sandeep92'>@Sandeep92</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

By running the example, you will see that the delayed function runs after a two second interval, and updates the `scope` model `message`. Still, the view doesn’t update. The reason, as you may have guessed, is that we forgot to call `$apply()` manually. Therefore, we need to update our `getMessage()` function as shown below.

<p data-height="268" data-theme-id="0" data-slug-hash="bEmBn" data-default-tab="result" data-user="Sandeep92" class='codepen'>See the Pen <a href='http://codepen.io/Sandeep92/pen/bEmBn/'>bEmBn</a> by Sandeep Panda (<a href='http://codepen.io/Sandeep92'>@Sandeep92</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

If you run this updated example, you can see the view update after two seconds. The only change is that we wrapped our code inside `$scope.$apply()` which automatically triggers `$rootScope.$digest()`. As a result the watchers are fired as usual and the view updates.

**Note**: By the way, you should use `$timeout` service whenever possible which is `setTimeout()` with automatic `$apply()` so that you don’t have to call `$apply()` manually.

Also, note that in the above code you could have done the model changes as usual and placed a call to `$apply()` (the no-arg version) in the end. Have a look at the following snippet:

```js
$scope.getMessage = function() {
  setTimeout(function() {
    $scope.message = 'Fetched after two seconds';
    console.log('message:' + $scope.message);
    $scope.$apply(); //this triggers a $digest
  }, 2000);
};
```

The above code uses the no-arg version of `$apply()` and works. Keep in mind that you should always use the version of `$apply()` that accepts a function argument. This is because when you pass a function to `$apply()`, the function call is wrapped inside a `try...catch` block, and any exceptions that occur will be passed to the `$exceptionHandler` service.

#### How Many Times Does the `$digest` Loop Run?

When a `$digest` cycle runs, the watchers are executed to see if the `scope` models have changed. If they have, then the corresponding listener functions are called. This leads to an important question. What if a listener function itself changed a `scope` model? How would AngularJS account for that change? 

The answer is that the `$digest` loop doesn’t run just once. At the end of the current loop, it starts all over again to check if any of the models have changed. This is basically dirty checking, and is done to account for any model changes that might have been done by listener functions. So, the `$digest` cycle keeps looping until there are no more model changes, or it hits the max loop count of 10. It’s always good to stay idempotent and try to minimize model changes inside the listener functions.

**Note**: At a minimum, `$digest` will run twice even if your listener functions don’t change any models. As discussed above, it runs once more to make sure the models are stable and there are no changes.

#### Conclusion

I hope this article has clarified what `$apply` and `$digest` are all about. The most important thing to keep in mind is whether or not Angular **can** detect your changes. If it cannot, then you must call `$apply()` manually.

## Reference

- [AngularJS：何时应该使用Directive、Controller、Service](http://damoqiongqiu.iteye.com/blog/1971204)
- [对比Angular/jQueryUI/Extjs：没有一个框架是万能的](http://damoqiongqiu.iteye.com/blog/1922004)
- [Angular 中文](http://www.ngnice.com/docs/guide)

## Tutorial

- [AngularJS: API: ng](https://docs.angularjs.org/api/ng)
- [angular/angular.js Wiki](https://github.com/angular/angular.js/wiki/FAQ)
- [2013年度最强AngularJS资源合集-CSDN.NET](http://www.csdn.net/article/2014-01-03/2818005-AngularJS-Google-resource)
- [AngularJS：2013年好文精选 / Owen Chen](http://owenchen.duapp.com/index.php/angularjs2013-good-article-review/)
- [AngularJS and jQuery Dialogs - The UrBlog](http://jurberg.github.io/blog/2014/06/29/angularjs-jquery-dialog)
- [Best Practices for Building Angular.js Apps — Medium](https://medium.com/@dickeyxxx/best-practices-for-building-angular-js-apps-266c1a4a6917)
- [Requiring Versus Browserifying Angular -Telerik Developer Network](http://developer.telerik.com/featured/requiring-vs-browerifying-angular)
- [How I Setup Angular + Node Projects](http://start.jcolemorrison.com/how-i-setup-angular-node-projects/)
- [A modular way to create your Angular & Node web apps · CleverStack.io](http://cleverstack.io/developer/) A modular way to create your Angular & Node web apps.
- [Rethinking AngularJS Controllers](http://toddmotto.com/rethinking-angular-js-controllers)
- [David and Suzi](http://davidandsuzi.com/using-react-for-faster-renders-and-isomorphism-in-angular)
- [Adding Auth to your Ionic app in 5 mins with Auth0](http://ionicframework.com/blog/authentication-in-ionic)
- [sahat/satellizer](https://github.com/sahat/satellizer) Token-based AngularJS Authentication <https://satellizer.herokuapp.com>
- [Debugging AngularJS Apps from the Console - Modern Web](http://modernweb.com/2014/08/21/debugging-angularjs-apps-console)

### Chart

- [angular-chart.js - beautiful, reactive, responsive charts for Angular.JS using Chart.js](http://jtblin.github.io/angular-chart.js)

### Style Guide

- [angularjs style guide](https://github.com/mgechev/angularjs-style-guide/blob/master/README-zh-cn.md)
- [Google's AngularJS Style Guide](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html)

<script async src="//codepen.io/assets/embed/ei.js"></script>
