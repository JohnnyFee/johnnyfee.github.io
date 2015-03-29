layout: post
title: "Angular Core"
category : Angular
tags : [angular, tutorial]
---

This post is meant for beginners, for those that just started to learn Angular and want to know how data-binding works. If you already know how to use Angular properly, I highly suggest you go to the source code instead.

## The browser events-loop and the Angular.js extension

Our browser is waiting for events, for example the user interactions. If you click on a button or write into an input, the event’s callback will run inside Javascript and there you can do any DOM manipulation, so when the callback is done, the browser will make the appropiate changes in the DOM.

Angular extends this events-loop creating something called `angular context` (remember this, it is an important concept). To explain what this context is and how it works we will need to explain more concepts.

<!-- more -->

## The $watch list

Every time you bind something in the UI you insert a `$watch` in a `$watch list`. Imagine the `$watch` as something that is able to detect changes in the model it is watching (bear with me, this will be clear soon). Imagine you have this:

```html
User: <input type="text" ng-model="user" />
Password: <input type="password" ng-model="pass" />
```

Here we have `$scope.user`, which is bound to the first input, and we have `$scope.pass`, which is bound to the second one. Doing this we add two `$watch` to the `$watch list`.

```js
app.controller('MainCtrl', function($scope) {
  $scope.foo = "Foo";
  $scope.world = "World";
});
```

```html
Hello, {{ World }}
```

Here, even though we have two things attached to the `$scope`, only one is bound. So in this case we only created one `$watch`.

```js
app.controller('MainCtrl', function($scope) {
  $scope.people = [...];
});
```

```html
<ul>
  <li ng-repeat="person in people">
      {{person.name}} - {{person.age}}
  </li>
</ul>
```

How many `$watch` are created here? Two for each person (for name and age) in people plus one for the `ng-repeat`. If we have 10 people in the list it will be `(2 * 10) + 1`, AKA `21` `$watch`.

So, everything that is bound in our UI using directives creates a `$watch`. Right, but when are those `$watch` created?

When our template is loaded, AKA in the `linking phase`, the compiler will look for every directive and creates all the `$watch` that are needed. This sounds good, but… now what?

## $digest loop

Remember the extended `event-loop` I talked about? When the browser receives an event that can be managed by the `angular context` the `$digest` loop will be fired. This loop is made from two smaller loops. One processes the `$evalAsync` queue and the other one processes the `$watch` list, which is the subject of this article.

What is that process about? The `$digest` will loop through the list of `$watch` that we have, asking this:

1.  Hey `$watch`, what is your value?

    * It is `9`

2.  Alright, has it changed?

    * No, sir.

3.  (nothing happens with this one, so it moves to the next)
4.  You, what is your value?

    * It is `Foo`.

5.  Has it changed?

    * Yes, it was `Bar`.

6.  (good, we have a DOM to be updated)
7.  This continues until every `$watch` has been checked.

This is the `dirty-checking`. Now that all the `$watch` have been checked there is something else to ask: Is there any `$watch` that has been updated? If there is at least one of them that has changed, the loop will fire again until all of the `$watch` report no changes. This is to ensure that every model is clean. Have in mind that if the loop runs more than 10 times, it will throw an exception to prevent infinite loops.

When the `$digest loop` finishes, the DOM makes the changes.

Example:

```js
app.controller('MainCtrl', function() {
  $scope.name = "Foo";

  $scope.changeFoo = function() {
      $scope.name = "Bar";
  }
});
```

```html
{{ name }}
<button ng-click="changeFoo()">Change the name</button>
```

Here we have only one `$watch` because ng-click doesn’t create any watches (the function is not going to change :P).

* We press the button.
* The browser receives an event which will enter the `angular context` (I will explain why, later in this article).
* The `$digest loop` will run and will ask every `$watch` for changes.
* Since the `$watch` which was watching for changes in `$scope.name` reports a change, if will force another $digest loop.
* The new loop reports nothing.
* The browser gets the control back and it will update the DOM reflecting the new value of `$scope.name`

The important thing here (which is seen as a pain-point by many people) is that EVERY event that enters the `angular context` will run a `$digest loop`. That means that every time we write a letter in an input, the loop will run checking every `$watch` in this page.

## $apply() and $digest()

`$apply()` and `$digest()` 是 AngularJS 的两个核心但不大好理解的两个概念。为了理解 AngularJS 的原理，你必须完全理解 `$apply()` and `$digest()` 的工作原理。

### `$apply` and `$digest` Explored

AngularJS 提供了一个极好的双向绑定功能，这意味着，当视图发生改变，`scope` 模型中会自动更新。同样的，`scope` 模型一旦发生变化，视图也会使用新的值更新。Angular 是如何实现的呢？当你编写了表达式 (`{{aModel}}`)，Angular 悄悄地为 `scope` 建立了一个监视器，一旦模型发生变化，视图将轮流被更新。这个 `watcher` 和你在 AngularJS 中建立的 watcher 并无区别：

    $scope.$watch('aModel', function(newValue, oldValue) {
      //update the DOM with newValue
    });

第二个参数一个监听函数，一旦 `aModel` 的值发生变化，这个函数便被调用，HTML 中的表达式也会被更新。但是，还有一个问题，Angular 如何断定合适调用这个监听函数呢？这涉及到 `$digest` 循环。

`$digest` 循环是监视器被触发的地方。当一个监视器被触发，AngularJS 计算 `scope` 模型，如果模型被改变，那么相应的监听函数会被调用。所以，我们下一个问题是 `$digest` 循环是何时并且如何开始的。

`$digest` 循环是调用 `$scope.$digest()` 的结果。假如你在 `ng-click` 指令的处理函数中改变了 `scope` 模型，AngularJS 会调用 `$digest()` 自动触发 `$digest` 循环。当 `$digest` 循环开始，它会触发每一个监视器。监视器比较 `scope` 模型的当前的值和上一次计算的值，如果不等，相应的监听函数被执行，视图中的表达式也会被更新。除了 `ng-click`，还有其他一些内置指令/服务(e.g. `ng-model`, `$timeout`, etc)，让你改变模型，并且触发 `$digest` 循环。

还有一点要明白，在上面的例子中，AngularJS 没有直接调用 `$digest()`， 而是调用 `$scope.$apply()`，`$scope.$apply()` 会调用 `$rootScope.$digest()`。这样，`$rootScope` 启动一个 digest 循环，随后，所有子作用域模型的修改都会触发相应的监听器。

现在，假设你将 `ng-click` 应用到一个按钮，让后传入一个函数。当按钮被点击，AngularJS 将函数封装到 `$scope.$apply()` 中调用。所以，你的函数照常执行，一旦改变模型，`$digest` 循环变回启动以保证你的修改被应用到视图。

__注意：__ `$scope.$apply()` 会自动调用 `$rootScope.$digest()`。`$apply()` 函数有两种风格。一种是携带一个函数作为参数，执行它，并且触发 `$digest` 循环。另一种不带任何参数，当调用的时候，只是启动一个 `$digest` 循环。我们等等会看到前者更好。

### 什么时候手动调用  `$apply()`？

Angular 只会负责在运行在 AngularJS 上下文的模型改变，比如 Angular 的内置指令已经具备了这些功能。如果你想在 Angular 上下文外改变模型，你需要告诉 Angular ，你要改变一些模型，需要触发监视器以便改变正确传播。

比如，如果你使用 JavaScript 的 `setTimeout()` 函数来更新 `scope` 模型，Angular 没有办法知道你要改变什么，在这种情况下，你有责任手动调用 `$apply()` 函数，这会触发一个 `$digest` 循环。同样，如果你在指令中设置了一个 DOM 事件监听器，并且在相应函数中改变了模型，那么你需要手动调用 `$apply()` 来该保证修改生效。 

看个例子，假如你有一个页面，页面载入后，延时两秒，显示一个消息。你可能会用如下代码来实现：

<p data-height="268" data-theme-id="0" data-slug-hash="fukyn" data-default-tab="result" data-user="Sandeep92" class='codepen'>See the Pen <a href='http://codepen.io/Sandeep92/pen/fukyn/'>fukyn</a> by Sandeep Panda (<a href='http://codepen.io/Sandeep92'>@Sandeep92</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

你会发现，延时函数会在 2 秒后运行，并且更新 `scope` model `message`。但是，视图并没有更新。原因是你忘记手动调用 `$apply()`，修改如下：

<p data-height="268" data-theme-id="0" data-slug-hash="bEmBn" data-default-tab="result" data-user="Sandeep92" class='codepen'>See the Pen <a href='http://codepen.io/Sandeep92/pen/bEmBn/'>bEmBn</a> by Sandeep Panda (<a href='http://codepen.io/Sandeep92'>@Sandeep92</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

If you run this updated example, you can see the view update after two seconds. The only change is that we wrapped our code inside `$scope.$apply()` which automatically triggers `$rootScope.$digest()`. As a result the watchers are fired as usual and the view updates.

**Note**: 在你想使用 `setTimeout()` 的地方，你应该首先考虑 `$timeout` 服务，这样可以不需要调用 `$apply()`。

你也可以像下面这样，照常修改模型数据，最后调用使用无参的 `$apply()` 函数：

```js
$scope.getMessage = function() {
  setTimeout(function() {
    $scope.message = 'Fetched after two seconds';
    console.log('message:' + $scope.message);
    $scope.$apply(); //this triggers a $digest
  }, 2000);
};
```

上面的代码也可以运行。但是，你总是应该使用带参的版本，因为当你向 `$apply()` 传入的函数会被封装在 `try...catch` 块中调用，任何异常都会被传递到 `$exceptionHandler` 服务。

### `$digest` 循环运行多少次

当一个 `$digest` 循环运行时，监听器被执行，查看 `scope` 模型是否改变，如果改变，对应的监听函数会被调用。这会引出一个很重要的问题。如果在监听函数中改变了 `scope` 模型呢？AngularJS 如何应对这个改变？


答案是 `$digest`  循环不仅运行一次。在当前循环的最后，它会重新启动一次来检查模型是否发生了变化。这是基本的脏检查，这用来处理监听函数中对模型可能的修改。所以，`$digest` 循环保持运行，直到不再有更多的模型修改，或者达到了最大的循环次数 10。 你应该尽可能减少在 listener 函数中对模型的修改。

__注意：__ 即使监听函数没有改变模型，`$digest` 至少也会运行两遍，再运行一次是为了确保模型是稳定的，没有其他修改。

最重要的是要记住 Angular 能否发现你的修改，你过不能，你应该手动调用 `$apply()`。

## Difference between the $observe and $watch methods

See [javascript - Difference between the $observe and $watch methods - Stack Overflow](http://stackoverflow.com/questions/14876112/difference-between-the-observe-and-watch-methods)

**[$observe()](https://docs.angularjs.org/api/ng.$compile.directive.Attributes#$observe)** is a method on the [Attributes](http://docs.angularjs.org/api/ng.$compile.directive.Attributes) object, and as such, it can only be used to observe/watch the value change of a DOM attribute.  It is only used/called inside directives.  Use $observe when you need to observe/watch a DOM attribute that contains interpolation (i.e., {%raw%}{{}}{%endraw%}'s). 
E.g., `attr1="Name: {{name}}"`, then in a directive: `attrs.$observe('attr1', ...)`. 
(If you try `scope.$watch(attrs.attr1, ...)` it won't work because of the {%raw%}{{}}{%endraw%}s -- you'll get `undefined`.)  Use $watch for everything else.

**[$watch()](http://docs.angularjs.org/api/ng.$rootScope.Scope#$watch)** is more complicated.  It can observe/watch an "expression", where the expression can be either a function or a string.  If the expression is a string, it is [$parse](http://docs.angularjs.org/api/ng.$parse)'d (i.e., evaluated as an [Angular expression](http://docs.angularjs.org/guide/expression)) into a function.  (It is this function that is called every digest cycle.)  The string expression can not contain {%raw%}{{}}{%endraw%}'s.  $watch is a method on the [Scope](http://docs.angularjs.org/api/ng.$rootScope.Scope) object, so it can be used/called wherever you have access to a scope object, hence in 

* a controller -- any controller -- one created via ng-view, ng-controller, or a directive controller
* a linking function in a directive, since this has access to a scope as well

Because strings are evaluated as Angular expressions, $watch is often used when you want to observe/watch a model/scope property.  E.g., `attr1="myModel.some_prop"`, then in a controller or link function: `scope.$watch('myModel.some_prop', ...)` or `scope.$watch(attrs.attr1, ...)` (or `scope.$watch(attrs['attr1'], ...)`).
(If you try `attrs.$observe('attr1')` you'll get the string `myModel.some_prop`, which is probably not what you want.)

As discussed in comments on @PrimosK's answer, all $observes and $watches are checked every [digest cycle](http://docs.angularjs.org/guide/concepts).

Directives with isolate scopes are more complicated.  If the '@' syntax is used, you can $observe _or $watch_ a DOM attribute that contains interpolation (i.e., {%raw%}{{}}{%endraw%}'s).  (The reason it works with $watch is because the '@' syntax does the [interpolation](http://docs.angularjs.org/api/ng.$interpolate) for us, hence $watch sees a string without {%raw%}{{}}{%endraw%}'s.)  To make it easier to remember which to use when, I suggest using $observe for this case also.

To help test all of this, I wrote a [Plunker](http://plnkr.co/edit/HBha8sVdeCqhJtQghGxw?p=preview) that defines two directives.  One (`d1`) does not create a new scope, the other (`d2`) creates an isolate scope.  Each directive has the same six attributes.  Each attribute is both $observe'd and $watch'ed.

```
<div d1 attr1="{{prop1}}-test" attr2="prop2" attr3="33" attr4="'a_string'"
        attr5="a_string" attr6="{{1+aNumber}}"></div>
```

Look at the console log to see the differences between $observe and $watch in the linking function.  Then click the link and see which $observes and $watches are triggered by the property changes made by the click handler.

Notice that when the link function runs, any attributes that contain {%raw%}{{}}{%endraw%}'s are not evaluated yet (so if you try to examine the attributes, you'll get `undefined`).  The only way to see the interpolated values is to use $observe (or $watch if using an isolate scope with '@').  Therefore, getting the values of these attributes is an _asynchronous_ operation.  (And this is why we need the $observe and $watch functions.)

Sometimes you don't need $observe or $watch.  E.g., if your attribute contains a number or a boolean (not a string), just evaluate it once: `attr1="22"`, then in, say, your linking function: `var count = scope.$eval(attrs.attr1)`.  If it is just a constant string – `attr1="my string"` – then just use `attrs.attr1` in your directive (no need for $eval()).

See also [Vojta's google group post](https://groups.google.com/d/msg/angular/TbRQhG-G14I/bYcipV1OYwcJ) about $watch expressions.

## Reference

- [Understanding Angular's $apply() and $digest()](http://www.sitepoint.com/understanding-angulars-apply-digest/) 
- [$watch how the $apply runs a $digest - Angular Tips](http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/)
- [AngularJS and scope.$apply — Jim Hoskins](http://jimhoskins.com/2012/12/17/angularjs-and-apply.html)

## Tutorial

-[AngularJS' Internals In Depth - Smashing Magazine](http://www.smashingmagazine.com/2015/01/22/angularjs-internals-in-depth)

<script async src="//codepen.io/assets/embed/ei.js"></script>