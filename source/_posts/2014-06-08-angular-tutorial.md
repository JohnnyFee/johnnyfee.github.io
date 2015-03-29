layout: post
title: "Angular Tutorial"
category : Angular
tags : [angular, tutorial]
---

本文为读 [AngularJS](http://www.salttiger.com/angularjs/) 和  [Mastering Web Application Development with AngularJS](http://www.salttiger.com/mastering-web-application-development-angularjs/) 的读书笔记。

## Angular 学习路线导航

- [Angular Tutorial](http://inching.org/2014/06/08/angular-tutorial/) 本文作为 Angular 学习的入口点。
- [Angular Form](http://inching.org/2014/12/22/angular-form/) 在 Angular 世界中如何如理表单。
- [Angular Filter](http://inching.org/2014/09/26/angular-filter/) Angular 过滤器，可以用来格式化用户输入等。
- [Angular Directive](http://inching.org/2014/09/24/angular-directive/) Angular 指令。
- [Angular MVC](http://inching.org/2014/06/12/angular-mvc/) Angular MVC 中的一些概念。
- [Angular Services](http://inching.org/2014/08/12/angular-service/) Angular 服务。如何定义和使用 Service、Service 的声明周期，以及 Angular 提供的常用的 Service 服务。
- [Using AngularJS Promises](http://inching.org/2014/12/30/angular-promise/) 当 Angular 遇上 Promise。关于 JavaScript 的 Promise，请参考 [JavaScript Promise](http://inching.org/2014/02/17/javascript-promise/)。
- [Angular UI Router](http://inching.org/2014/10/10/angular-ui-router/) Angular ui-router 路由。

### Core

- [Angular Scope](http://inching.org/2014/09/23/angular-scope/) 作用域。
- [Angular Core](http://inching.org/2014/10/22/angular-core/) 数据绑定的核心，apply、digest、watcher。

### UI

- [Angular UI Router](http://inching.org/2014/10/10/angular-ui-router/) Angular ui-router 路由。
- [Angular Mobile Tutorial](http://inching.org/2014/09/10/mobile-angular/) Angular 
- [Angular Mobile Tutorial](http://inching.org/2014/09/10/mobile-angular/) Angular 

### Other

- [Angular RequireJS](http://inching.org/2014/06/08/angular-requirejs/)
- [Angular Unit Test](http://inching.org/2014/11/11/angular-unit-test/) Angular 单元测试。
- [Angular Best Practice](http://inching.org/2014/08/14/angular-best-practice/) Angular 最佳实践。

## Quick Start

对于非正式工程，你可以按照 [Single Page Apps with AngularJS Routing and Templating ♥ Scotch](http://scotch.io/tutorials/javascript/single-page-apps-with-angularjs-routing-and-templating) 创建一个单页面工程。

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

__根目录下的一些配置文件的说明：__

- __.bowerrc__ Bower 配置文件。
- __.csslintrc__ CSSLint 配置文件。[CSS Lint](http://csslint.net/)。
- __.editconfig__ EditorConfig 配置文件, 用来在不同的编辑器和 IDE 之间配置统一的编码风格，参考 [EditorConfig](http://editorconfig.org/)。WebStorm 默认提供并安装了这个插件。
- __.gitignore__ Git ignore file。
- __.jshintrc__ JSHint 配置文件。
- __.travis.yml__ Travis 配置文件，用来告诉 Travis 如何构建。[Travis CI](https://travis-ci.org/) 为开源社区提供免费的持续集成的平台。

## Principle

![](http://johnnyimages.qiniudn.com/5f89a8fd-bbe6-3d15-85c1-4881ac26075d.png)

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

`ngBind` 属性告诉 Angular 用指定的表达式的值替换文本内容，并且当表达式的值发生变化时，自动更新文本内容。

    <p ng-bind="greeting"></p>

`ngBind` 用于单向绑定($scope --> view)。

除了 `ngBind`，还有一个更简洁的双大括号表示法，如 `{{ expression }}`。

    <p>{{greeting}}</p>

在应用首页 `idnex.html` 中，建议使用 `ng-bind`，在子视图中，建议使用 `{%raw%}{{ }}{%endraw%}`。因为当首页加载时，在 AngularJS 有机会替换模板中的双大括号表达式前，未渲染的模板可能被用户看见，而子视图不会受这个影响。       

如果模板在 Angular 编译之前就会显示，那么最好使用 `ngBind`，因为 `ngBind` 是元素属性，页面加载的时候，绑定表达式对用于来说是不可见的。

另一个可选的先解决方案是使用 [ngCloak](https://docs.angularjs.org/api/ng/directive/ngCloak) 指令。

`ngCloak` 指令用于应用加载时，阻止未编译的 html 模板短暂显示。也可以用这个指令避免由 html 模板显示引起的闪烁效果。

The directive can be applied to the `<body>` element, but the preferred usage is to apply multiple `ngCloak` directives to small portions of the page to permit progressive rendering of the browser view.

ngCloak works in cooperation with the following css rule embedded within angular.js and angular.min.js. For CSP mode please add angular-csp.css to your html file (see ngCsp).

```css
[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
display: none !important;
}
```

When this css rule is loaded by the browser, all html elements (including their children) that are tagged with the `ngCloak` directive are hidden. When Angular encounters this directive during the compilation of the template it deletes the `ngCloak` element attribute, making the compiled element visible.

For the best result, the angular.js script must be loaded in the head section of the html document; alternatively, the css rule above must be included in the external stylesheet of the application.

Legacy browsers, like IE7, do not provide attribute selector support (added in CSS 2.1) so they cannot match the `[ng\:cloak]` selector. To work around this limitation, you must add the css class ng-cloak in addition to the `ngCloak` directive as shown in the example below.

See also [javascript - Angularjs - ng-cloak/ng-show elements blink - Stack Overflow](http://stackoverflow.com/questions/11249768/angularjs-ng-cloak-ng-show-elements-blink).

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

- 提供验证行为 (i.e. required, number, email, url)。
- 维持控制状态 (`valid`/`invalid`, `dirty`/`pristine`, `touched`/`untouched`, validation errors)。
- 设置动画元素相关的 css 类(`ng-valid`, `ng-invalid`, `ng-dirty`, `ng-pristine`, `ng-touched`, `ng-untouched`)
- Registering the control with its parent [form](https://docs.angularjs.org/api/ng/directive/form).

`ngModel` 会试图绑定当前作用域中的属性，如果属性在作用域中不存在，它会隐式地添加同名属性到作用域中。

使用 `ng-model` 绑定元素到模型属性：

```html
<form ng-controller="SomeController">
  <input type="checkbox" ng-model="youCheckedIt">
</form>
```

这意味着：

- 一旦用户勾选，SomeController’s 作用域中的 `youCheckedIt` 被设置成 true，反勾选则为 false。
- 如果在 SomeController 设置 `$scope.youCheckedIt` 为 true，UI 中勾选框被勾选，设置为 false，则取消勾选。

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

* **Click events**: `ngClick` and `ngDblClick`
* **Mouse events**: `ngMousedown`, `ngMouseup`, `ngMouseenter`, `ngMouseleave`, `ngMousemove` and `ngMouseover`
* **Keyboard events**: `ngKeydown`, `ngKeyup` and `ngKeypress`
* **Input change event** (`ngChange)`: The `ngChange` directive cooperates with the `ngModel` one, and let us to react on model changes initiated by user input.

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

或者：

```html
<ng-include
  src=""
  [onload=""]
  [autoscroll=""]>
...
</ng-include>
```

The `ng-include` directive accepts an expression as its argument, so you need to pass a quoted string if you plan to use a fixed value pointing to a partial, for example, `<div ng-include="'header.tpl.html'"></div>`.

See [AngularJS: API: ngInclude](https://docs.angularjs.org/api/ng/directive/ngInclude)

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

See [The Many Ways To Use ngClass ♥ Scotch](https://scotch.io/tutorials/the-many-ways-to-use-ngclass)

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

你可以使用 `$watch()` 来监测表达式，一旦表达式的值发生变化，回调将会被调用：

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

`$watch` 的方法签名为:

    $watch(watchExpression, listener, objectEquality) 

参数描述为：

- `watchExpression` 每次调用 `$digest()` 的时候，`watchExpression` 都会被调用，并且返回被监测的值。由于检测到表达式的值发生改变时，`$digest()` 才返回，所以每次 `$digest()` 的时候，`watchExpression` 可能会执行多次并且应该是幂等的。

- `listener` 当 `watchExpression` 的值和前一次不等时，`listener` 被调用（除了首次运行）。比较取决于引用相等，严格比较（通过 `!==`），直到对象相等（`==`，取决于 `objectEquality` 参数的设置）。listener 函数的签名为 `function(newValue, oldValue, scope)`.

- `objectEquality` 当 `objectEquality == true` 时，`watchExpression` 表达式的比较使用 `angular.equals()`。为了保存将要比较的对象值，用 `angular.copy` 来拷贝一个副本。因此，监视复杂对象可能会有内存和性能问题。

watcher 注册之后，`listener` 将会被异步调用一次 (via `$evalAsync`) 来初始化 watcher。在某些场合，这可能是不良的，因为即使 `watchExpression` 没有改变，`listener` 也会被调用。为了在 `listener` 函数中发现这个，我们可以比较 newVal and oldVal，如果全等(===)，那么说明 `listener` 是首次调用。

```js
// let's assume that scope was dependency injected as the $rootScope
var scope = $rootScope;
scope.name = 'misko';
scope.counter = 0;

expect(scope.counter).toEqual(0);
scope.$watch('name', function(newValue, oldValue) {
  scope.counter = scope.counter + 1;
});
expect(scope.counter).toEqual(0);

scope.$digest();
// the listener is always called during the first $digest loop after it was registered
expect(scope.counter).toEqual(1);

scope.$digest();
// but now it will not be called unless the value changes
expect(scope.counter).toEqual(1);

scope.name = 'adam';
scope.$digest();
expect(scope.counter).toEqual(2);



// Using a function as a watchExpression
var food;
scope.foodCounter = 0;
expect(scope.foodCounter).toEqual(0);
scope.$watch(
  // This function returns the value being watched. It is called for each turn of the $digest loop
  function() { return food; },
  // This is the change listener, called when the value returned from the above function changes
  function(newValue, oldValue) {
    if ( newValue !== oldValue ) {
      // Only increment the counter if the value changed
      scope.foodCounter = scope.foodCounter + 1;
    }
  }
);
// No digest has been run so the counter will be zero
expect(scope.foodCounter).toEqual(0);

// Run the digest but since food has not changed count will still be zero
scope.$digest();
expect(scope.foodCounter).toEqual(0);

// Update food and run digest.  Now the counter will increment
food = 'cheeseburger';
scope.$digest();
expect(scope.foodCounter).toEqual(1);
```

`$watch` 返回一个反注册监听器的函数，如果不在需要监听属性，你可以调用这个函数：

```js
...
var dereg = $scope.$watch('someModel.someProperty', callbackOnChange);
…
dereg();
```

#### 监听多个属性

如果你想监听多个属性或者一个对象，你可以有两个选择：

* 使用 `$watchGroup` 同时监听多个属性

        $scope.$watchGroup(['foo', 'bar'], function(newValues, oldValues, scope) {
          // newValues array contains the current values of the watch expressions
          // with the indexes matching those of the watchExpression array
          // i.e.
          // newValues[0] -> $scope.foo 
          // and 
          // newValues[1] -> $scope.bar 
        });

* 把它们放在一个数组或者对象中，然后调用 `$watchGroup` 函数。

        $scope.$watchCollection('[foo, bar]', function(newValues, oldValues){
            // do stuff here
            // newValues and oldValues contain the new and respectively old value
            // of the observed collection array
        });

See [javascript - Watch multiple $scope attributes - Stack Overflow](http://stackoverflow.com/questions/11952579/watch-multiple-scope-attributes)

#### watch() 的性能问题

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

The preceding example executes correctly, but there is a potential problem with performance. Though it isn’t obvious, if you put a debugger breakpoint in `totalCart()`, you’d see that it gets called six times to render this page. Though you’d never notice it in this application, in more complex apps, running it six times could be an issue.

上面的例子可以正确执行，当有一个潜在的性能问题。虽让不是很明显，如果你在 `totalCart()` 中下个断点，你可以看到它被调用了 8 次。这在大型应用中，可能会有性能问题。

其中：

* The template as `{% raw %}{{totalCart() | currency}}{% endraw %}` 3 次
* The `subtotal()` function 3 次
* The `$watch()` function 2 次

我们有几个方式可以解决这个问题。一个是在 items 数组上创建 `$watch`，让后重新计算 `$scope` 中的 total, discount, and subtotal 属性。

首先，更新使用这些属性的模板：

```html
{% raw %}
<div>Total: {{bill.total | currency}}</div>
<div>Discount: {{bill.discount | currency}}</div>
<div>Subtotal: {{bill.subtotal | currency}}</div>
{% endraw %}
```

在 JavaScript 中，监视 items 数组，在数据变化时重新计算总值：

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

然而，由于我们监视的是 item 数组，Angular 为了比较必须拷贝一个副本，对于 items 大列表，如果可能只计算 bill 属性，可能更好。我们可以创建一个只有监听表达式函数的的 `$watch`：

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

See Also [Improving Angular Dirty Checking Performance](http://opensourceconnections.com/blog/2014/04/24/improving-angular-dirty-checking-performance/)

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

在 Controller 中，我们通过 `$valid` 访问验证表单的状态。当表单的所有 inputs 合法时，`$valid` 的值为 true。在表单还没有完成时，我们可以根据 `$valid` 的值来禁用或者启用提交按钮。

    <button ng-disabled='!addUserForm.$valid'>Submit</button>

See:

- [Form validation with AngularJS](http://www.ng-newsletter.com/posts/validations.html)

## Performance

- [angular性能优化心得](http://atian25.github.io/2014/05/09/angular-performace/)
- [AngularJS Performance in Large Applications](https://www.airpair.com/angularjs/posts/angularjs-performance-large-applications)

## Web Components

- [Integrating Web Components with AngularJS · Pascal Precht](http://pascalprecht.github.io/2014/10/25/integrating-web-components-with-angularjs/)
- [Component-Based Directives in AngularJS](https://www.airpair.com/angularjs/posts/component-based-angularjs-directives)

## Tools

* [Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk). This has been around for a while.
* [ng-inspector](http://ng-inspector.org/). This is the newest one, and as the name suggests, it allows you to inspect your application's scopes.

## Library

- [AngularJS Datatype Editors (ADE)](http://toodledo.github.io/ADE/) ADE is a bunch of directives and filters for displaying and editing various types of data, using AngularJS.
- [angular-cn/ng-showcase](https://github.com/angular-cn/ng-showcase/)Angular 范例程序。
- [Pasvaz/bindonce](https://github.com/Pasvaz/bindonce) Zero watches binding for AngularJs
- [AngularCSS - Routes Demo](http://door3.github.io/angular-css/#/) 动态注入 CSS。
    - [Introducing AngularCSS: CSS On-Demand for AngularJS](http://door3.com/insights/introducing-angularcss-css-demand-angularjs)

### Storage

- [tymondesigns/angular-locker](https://github.com/tymondesigns/angular-locker) A simple & configurable abstraction for local/session storage in angular projects.
- [angular-data: Home](http://angular-data.pseudobry.com) Give your data the treatment it deserves with a data store built for Angular.js.

### Multi-Media

- [nehz/ngWebAudio](https://github.com/nehz/ngWebAudio)

### Auth

- [sahat/satellizer](https://github.com/sahat/satellizer) Token-based AngularJS Authentication <https://satellizer.herokuapp.com>

### Modules

- [Popular Modules - AngularJS Modules, Plugins and Directives](http://ngmodules.org/)

### Auth

* [Narzerus/angular-permission](https://github.com/Narzerus/angular-permission) Simple route authorization via roles/permissions.
* [mrgamer/angular-login-example](https://github.com/mrgamer/angular-login-example)
 
### Shortcut

- [AngularHotkeys.js](http://chieffancypants.github.io/angular-hotkeys/) 建议使用。
- [bfanger/angular-keyboard](https://github.com/bfanger/angular-keyboard) 仅供参考。
- [alisabzevari/NgHotkey](https://github.com/alisabzevari/NgHotkey) 仅供参考。


## FAQ

### 如何在 controller 中切换视图

#### 使用路由

为了在不同视图中间切换视图，你可以在 `index.html` 中使用 `$location` 服务直接改变直接改变 window.location。

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

然后配置 router 来导航到不同的视图。

#### 使用 ng-switch

除此之外，你也可以使用 `ng-include` 和 `ng-switch` 来根据条件包含不同的视图：

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

你要做的事情只有修改 `moduleState` 变量的值，它会自动显示对应的组件视图。另外，`selectedFruit` 变量保存了当前操作的 item 引用。

使用 `ng-switch` 指令的好处是你可以轻易添加任意多的状态。

See: 

- [javascript - How do I switch views in AngularJS from a controller function? - Stack Overflow](http://stackoverflow.com/questions/11003916/how-do-i-switch-views-in-angularjs-from-a-controller-function)
- [javascript - AngularJS change partial in controller on click - Stack Overflow](http://stackoverflow.com/questions/16649617/angularjs-change-partial-in-controller-on-click)

### Multiple directives [ngSwitchWhen, ngInclude] asking for transclusion

See [Ng-Include inside ng-switch should be allowed · Issue #4731 · angular/angular.js](https://github.com/angular/angular.js/issues/4731)

### how to access the angular $scope variable in browsers console

在开发者工具的 HTML 面板中选择一个元素并且在控制台敲入：

```
angular.element($0).scope()
```

其中，WebKit 中 `$0` 引用的是选中的元素。

**Playing with JS Fiddle**

When working with jsfiddle you can open the fiddle in _show_ mode by adding `/show` at the end of the url. When running like this you have access to the `angular` global. You can try it here

http://jsfiddle.net/jaimem/Yatbt/show

**jQuery Lite**

如果你在 Angular 前加载 jQuery，`angular.element` 可以传入一个 jQuery 选择器。所以你可以用下面的方法检查指定 controller 的作用域：

```
angular.element('[ng-controller=ctrl]').scope()
```

检查一个 button 的：

```
angular.element('button:eq(1)').scope()
```

你可以使用一个全局函数让它更简洁：

```
window.SC = function(selector){
    return angular.element(selector).scope();
};
```

现在你可以：

```
SC('button:eq(10)')
SC('button:eq(10)').row   // -> value of scope.row
```

check here: http://jsfiddle.net/jaimem/DvRaR/1/show/

See [angularjs - how to access the angular $scope variable in browsers console - Stack Overflow](http://stackoverflow.com/questions/13743058/how-to-access-the-angular-scope-variable-in-browsers-console)

## Reference

- [AngularJS：何时应该使用Directive、Controller、Service](http://damoqiongqiu.iteye.com/blog/1971204)
- [对比Angular/jQueryUI/Extjs：没有一个框架是万能的](http://damoqiongqiu.iteye.com/blog/1922004)
- [Angular 中文](http://www.ngnice.com/docs/guide)

## Tutorial

- [AngularJS 中文资料+工具+库+Demo 大搜集 - friskfly - 博客园](http://www.cnblogs.com/friskfly/p/3176735.html)
- [AngularJS-Learning/ZH-CN.md at master · jmcunningham/AngularJS-Learning](https://github.com/jmcunningham/AngularJS-Learning/blob/master/ZH-CN.md)
- [jmcunningham/AngularJS-Learning](https://github.com/jmcunningham/AngularJS-Learning)
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
- [sahat/satellizer](https://github.com/sahat/satellizer) Token-based AngularJS Authentication <https://satellizer.herokuapp.com>
- [Debugging AngularJS Apps from the Console - Modern Web](http://modernweb.com/2014/08/21/debugging-angularjs-apps-console)
- [All About Angular 2.0](http://eisenbergeffect.bluespire.com/all-about-angular-2-0/)
- [Preparing for the future of AngularJS](https://www.airpair.com/angularjs/posts/preparing-for-the-future-of-angularjs)

### Chart

- [angular-chart.js - beautiful, reactive, responsive charts for Angular.JS using Chart.js](http://jtblin.github.io/angular-chart.js)

<script async src="//codepen.io/assets/embed/ei.js"></script>
