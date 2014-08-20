---
layout: post
title: "Angular Tutorial"
category : Angular
tags : [angular, tutorial]
--- 

本文为读 [AngularJS](http://www.salttiger.com/angularjs/) 的读书笔记，该书的例子在 [shyamseshadri/angularjs-book](https://github.com/shyamseshadri/angularjs-book)。

## Quick Start

### Yeoman: Optimizing Your Workflow

See [Yeoman - Modern workflows for modern webapps](http://yeoman.io/)

1. Installing Yeoman

        npm install -g yo

1. Installing generator-angular generator

        npm install -g generator-angular

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

    See: [yeoman/generator-angular](https://github.com/yeoman/generator-angular)

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

和其他框架的比较：

![](http://dl2.iteye.com/upload/attachment/0087/9762/1a69df8b-f592-323c-adb9-d732ef9b2c39.png)

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

### ng-bind

It has two equivalent forms. One we’ve seen with double-curly braces:

    <p>{{greeting}}</p>

Then there’s an attribute-based directive called ng-bind:

    <p ng-bind="greeting"></p>

如何使用这两种方式：

- With the double-curly syntax, on the very first page load of your application’s index.html, there’s a chance that your user will see the un-rendered template before Angular has a chance to replace the curlies with your data. Subsequent views won’t suffer from this. The reason is that the browser loads the HTML page, renders it, and only then does Angular get a chance to interpret it as you intended.

- The good news is that you can still use `{%raw%}{{ }}{%endraw%}` in the majority of your templates. For the data binding you do in your index.html page, however, use ng-bind instead. That way, your users will see nothing until the data has loaded.

### ng-model

you can use the `ng-model` attribute to bind elements to your model properties:

    <form ng-controller="SomeController">
      <input type="checkbox" ng-model="youCheckedIt">
    </form>

This means that:

- When the user checks the box, a property called youCheckedIt on the SomeController’s $scope will become true. Unchecking the box makes youCheckedIt false.
- If you set $scope.youCheckedIt to true in SomeController, the box becomes checked in the UI. Setting it to false unchecks the box.

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

If you have a form that groups inputs, you can use the ng-submit directive on the form itself to specify a function to call when the form submits:

    <form ng-submit="requestFunding()" ng-controller="StartUpController">
      Starting: <input ng-change="computeNeeded()" ng-model="startingEstimate">
      Recommendation: {{needed}}
      <button>Fund my startup!</button>
    </form>

The ng-submit directive also automatically prevents the browser from doing its default POST action when it tries to submit the form.

### ng-repeat

`ng-repeat` creates a copy of a set of elements once for every item in a collection.

To display this list of students, we can do something like the following:

    <ul ng-controller='StudentListController'>
      <li ng-repeat='student in students'>
        <a href='/student/view/{{student.id}}'>{{student.name}}</a>
      </li>
    </ul>

    var students = [{name:'Mary Contrary', id:'1'},
                    {name:'Jack Sprat', id:'2'},
                    {name:'Jill Hill', id:'3'}];

    function StudentListController($scope) {
      $scope.students = students;
    }

As we’ve seen before, changing the student’s array will automatically change the rendered list. If we were to do something like inserting a new student into the list:

    <ul ng-controller=''>
      <li ng-repeat='student in students'>
        <a href='/student/view/{{student.id}}'>{{student.name}}</a>
      </li>
    </ul>
    <button ng-click="insertTom()">Insert</button>

    var students = [{name:'Mary Contrary', id:'1'},
                {name:'Jack Sprat', id:'2'},
                {name:'Jill Hill', id:'3'}];

    function StudentListController($scope) {
      $scope.students = students;

      $scope.insertTom = function () {
        $scope.students.splice(1, 0, {name:'Tom Thumb', id:'4'});
      };
    }

The ng-repeat directive also gives you references to the index of the current element via `$index`, and booleans that tell you if you’re on the first element, somewhere in the middle, or the last element of the collection with `$first`, `$middle`, and `$last`.
You might imagine using the `$index` to label rows in a table. Given a template like this:

    <table ng-controller='AlbumController'>
      <tr ng-repeat='track in album'>
        <td>{{$index + 1}}</td>
        <td>{{track.name}}</td>
        <td>{{track.duration}}</td>
      </tr>
    </table>

and this controller:

    var album = [{name:'Southwest Serenade', duration: '2:34'},
             {name:'Northern Light Waltz', duration: '3:21'},
             {name:'Eastern Tango', duration: '17:45'}];

    function AlbumController($scope) {
      $scope.album = album;
    }

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

### Filters

Filters allow you to declare how to transform data for display to the user within an interpolation in your template. The syntax for using filters is:

    {% raw %}
    {{ expression | filterName : parameter1 : ...parameterN }} 
    {% endraw %}

where `expression` is any Angular expression, `filterName` is the name of the filter you want to use, and the `parameters` to the filter are separated by colons. The parameters themselves can be any valid Angular expression.

Angular comes with several filters, like `currency`, which we’ve seen:

    {% raw %}
    {{12.9 | currency}}
    {% endraw %}

This bit of code will display the following: $12.90 We put this declaration in the view (rather than in the controller or model) because the dollar sign in front of the number is only important to humans, and not to the logic we use to process the number.

Other filters that come with Angular include `date`, `number`, `uppercase`, and more.

Filters can also be chained with additional pipe symbols in the binding. For example, we can format the previous example for no digits after the decimal by adding the number filter, which takes the number of decimals to round to as a parameter. So:

    {% raw %}
    {{12.9 | currency | number:0 }} 
    {% endraw %}

> displays: $13

You’re not limited to the bundled filters, and it is simple to write your own. If we wanted to create a filter that title-cased strings for our headings, for example, we could do so as follows:

```js
var homeModule = angular.module('HomeModule', []);
homeModule.filter('titleCase', function() {
  var titleCaseFilter = function(input) {
    var words = input.split(' ');
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  };
  return titleCaseFilter;
});
```

With a template like this:

```html
{% raw %}
<body ng-app='HomeModule' ng-controller="HomeController">
  <h1>{{pageHeading | titleCase}}</h1>
</body>
{% endraw %}
```

and inserting the pageHeading as a model variable via a controller:

    function HomeController($scope) {
      $scope.pageHeading = 'behold the majesty of your page title';
    }

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

## Testing

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

## UI

- <http://angular-ui.github.io/>
 - [AngularStrap - AngularJS 1.2+ native directives for Twitter Bootstrap 3.](http://mgcrea.github.io/angular-strap)
- [AngularJS Multi-Step Form Using UI Router ♥ Scotch](http://scotch.io/tutorials/javascript/angularjs-multi-step-form-using-ui-router?)
- [All Search and Social Media Meta Tags Starter Template ♥ Scotch](http://scotch.io/quick-tips/all-search-and-social-media-meta-tags-starter-template)
- [Thumbtack Engineering](http://www.thumbtack.com/engineering/introducing-smarty)

## Tutorial

- [2013年度最强AngularJS资源合集-CSDN.NET](http://www.csdn.net/article/2014-01-03/2818005-AngularJS-Google-resource)
- [AngularJS and jQuery Dialogs - The UrBlog](http://jurberg.github.io/blog/2014/06/29/angularjs-jquery-dialog)
- [Best Practices for Building Angular.js Apps — Medium](https://medium.com/@dickeyxxx/best-practices-for-building-angular-js-apps-266c1a4a6917)
- [Requiring Versus Browserifying Angular -Telerik Developer Network](http://developer.telerik.com/featured/requiring-vs-browerifying-angular)
- [How I Setup Angular + Node Projects](http://start.jcolemorrison.com/how-i-setup-angular-node-projects/)
- [A modular way to create your Angular & Node web apps · CleverStack.io](http://cleverstack.io/developer/) A modular way to create your Angular & Node web apps.
- [Rethinking AngularJS Controllers](http://toddmotto.com/rethinking-angular-js-controllers)
- [David and Suzi](http://davidandsuzi.com/using-react-for-faster-renders-and-isomorphism-in-angular)

## Reference

- [AngularJS：何时应该使用Directive、Controller、Service](http://damoqiongqiu.iteye.com/blog/1971204)
- [对比Angular/jQueryUI/Extjs：没有一个框架是万能的](http://damoqiongqiu.iteye.com/blog/1922004)

<script async src="//codepen.io/assets/embed/ei.js"></script>
