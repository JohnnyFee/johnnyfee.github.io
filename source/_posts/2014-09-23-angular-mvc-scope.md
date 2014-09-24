---
layout: post
title: "Angular MVC Scope"
category : Angular
tags : [angular, tutorial]
--- 

> 原文：[【译】《精通使用AngularJS开发Web App》（三）--- 深入scope，继承结构，事件系统和生命周期](http://segmentfault.com/blog/chao2/1190000000361245)
> 书名：[Mastering Web Application Development with AngularJS](http://www.amazon.com/Mastering-Web-Application-Development-AngularJS/dp/1782161821/)

每一个 `$scope` 都是类 `Scope` 的一个实例。类 `Scope` 拥有可以控制 `scope` 生命周期的方法，提供事件传播的能力，并支持模板渲染。

## 作用域的层次结构

让我们再来看看这个简单的 `HelloCtrl` 的例子：

```js
var HelloCtrl = function($scope){
    $scope.name = 'World';
}
```

`HelloCtrl` 看起来就跟普通的 JavaScript 构造函数没什么区别，事实上，除了 `$scope` 这个参数之外，确实没什么新奇之处。不过，这个参数究竟是从哪里来的呢？

这个新的作用域是由 `ng-controller`指令使用 `Scope.$new()` 方法生成的。等一下，这么说来我们必须至少拥有一个 `scope` 的实例才能创建新的 `scope`！没错，AngularJS其实有一个 `$rootScope`（这个是所有其他作用域的父级）。这个 `$rootScope` 实例是在一个新的应用启动的时候创建的。

<!--more-->

`ng-controller`指令就是 **`可以创建作用域`** 指令的其中一个。AngularJS 会在任何它在DOM树中碰到这种 **`可以创建作用域`** 指令的时候创建一个新的 `Scope`类的实例。这些新创建的作用域通过 `$parent` 属性指向它自身的父作用域。DOM树中会有很多 **`可以创建作用域`** 的指令，结果就是，很多作用域被创建了。

> 作用域的形式类似于父子、树状的关系，并且最根部的就是 `$rootScope` 实例。就像作用域是被DOM树驱动着创建的一样，作用域树也是在模仿 DOM 的结构。

现在你已经知道了，一些指令会创建新的子级的作用域，你可能会想，为什么会需要这些复杂的东西。要想理解这一点，我们来演示一个例子，其中使用了 `ng-repeat` 循环指令。

控制器如下：

```js
var WorldCtrl = function ($scope) {
    $scope.population = 7000;
    $scope.countries = [
        {name: 'France', population: 63.1},
        {name: 'United Kingdom', population: 61.8},
    ];
};
```

模版如下：

```html
<ul ng-controller="WorldCtrl">
    <li ng-repeat="country in countries">
        {{country.name}} has population of {{country.population}}
    </li>
    <hr>
    World's population: {{population}} millions
</ul>
```

这个 `ng-repeat` 指令可以迭代一个 countries 的集合，并且为集合中的每一项都创建新的DOM 元素。`ng-repeat` 指令的语法非常容易理解；其中每一项都需要一个新的变量 `country`，并把它挂到 `$scope` 上面，以便视图渲染使用。

但这里有一个问题，就是，每一个 `country` 都需要将一个新的变量挂载到一个 `$scope` 上去，而我们也不能就简单的覆盖掉前面被挂在上去的值。AngularJS 通过为集合中的每一个元素都创建一个新的作用域来解决这个问题。新创建的这些作用域跟相匹配的DOM树结构非常相像，我们也能通过之前提到的那个牛逼的 Chrome 扩展 Batarang 来可视化的看到这一点，下面是屏幕截图：  
![AngularJS作用域截图](http://www.peichao01.com/Mastering_AngularJS_book/ch1_p16.png)  
正如我们在截图中所看到的，每一个作用域（以矩形标注边界）维护属于她自己的一段数据模型。给不同的作用域增加同名的变量是完全没有问题的，不会发生命名冲突（不同的DOM元素会指向不同的作用域，并使用相对应的作用域的变量来渲染模板）。这样一来，每个元素又有自己的命名空间，在前面的例子中，每一个 `<li>` 元素都有自己的作用域，而 `country` 变量就定义在各自的作用域上面。

## Scope的层次结构和继承

定义在作用于上的属性对他的子级作用于来说是可见的，试想一下，子级作用域并不需要重复定义同名的属性！这在实践中是非常有用的，因为我们不必一遍又一遍的重复定义本来可以通过作用域链得到的那些属性。

再来看看前面的例子，假设我们想要显示给出的这些国家与世界总人口的百分比。要实现这个功能，我们可以在一个作用域上定义一个 `worldsPercentage` 的方法，并由 `WorldCtrl` 来管理，如下所以：

```js
$scope.worldsPercentage = function (countryPopulation) { 
    return (countryPopulation / $scope.population)*100;
}
```
然后被 `ng-repeat` 创建的每一个作用域实例都来调用这个方法，如下：

```html
<li ng-repeat="country in countries">
    {{country.name}} has population of {{country.population}},
    {{worldsPercentage(country.population)}} % of the World's
   population
</li>
```

AngularJS中作用域的继承规则跟 JavaScript 中原型的继承规则是相同的（在需要读取一个属性的时候，会一直向继承树的上方查询，直到找到了这个属性为止）。

## 贯穿作用域链的继承的风险

这种透过作用域层次关系的继承，在读数据的时候显得非常的直观、易于理解。但是在写数据的时候，就变的有点复杂了。

让我们来看看，如果我们在一个作用域上定义了一个变量，先不管是否在子级作用域上。JavaScript代码如下：

```js
var HelloCtrl = function ($scope) {
};
```

视图的代码如下：

```js
<body ng-app ng-init="name='World'"> 
    <h1>Hello, {{name}}</h1>
    <div ng-controller="HelloCtrl">
        Say hello to: <input type="text" ng-model="name">
        <h2>Hello, {{name}}!</h2> 
    </div>
</body>
```

运行一下这段代码，就可以发现，这个 `name` 变量尽管仅仅是定义在了最顶级的作用域上，但在整个应用中都是可见的！这说明变量是从作用域链上继承下来的。换句话说，变量是在父级作用域上定义的，然后在子级作用域中访问的。

现在，我们一起来看看，如果在 `<input>` 中写点字会发生什么，结果如下图所示：  
![截图](http://www.peichao01.com/Mastering_AngularJS_book/ch1_p18.png)  
你可能会感到吃惊，因为 `HelloCtrl` 控制器所初始化的作用域创建了一个新的变量，而不是直接去修改 `$rootScope` 实例中的值。不过当我们认识到作用域也只不过是在彼此间进行了原型继承，也就不会觉得那么吃惊了。所有可以用在 JavaScript 对象上的原型继承的规则，都可以同等的用在 作用域 的原型链继承上去。毕竟 `Scopes` 作用域就是 JavaScript 对象嘛。

在子级作用域中去改变父级作用域上面的属性有几种方法。第一种，我们就直接通过 `$parent` 属性来引用父级作用域，但我们要看到，这是一个非常不可靠的解决方案。麻烦之处就在于，`ng-model` 指令所使用的表达式非常严重的依赖于整个DOM结构。比如就在 `<input>` 标签上面的哪里插入另一个 `可创建作用域` 的指令，那 `$parent` 就会指向一个完全不同的作用域了。

> 就经验来讲，尽量避免使用 `$parent` 属性，因为它强制的把 AngularJS 表达式和你的模板所创建的 DOM 结构捆绑在了一起。这样一来，HTML结构的一个小小的改动，都可能会让整个应用崩溃。

另一个解决方案就是，不要直接把属性绑定到 作用域上，而是绑到一个对象上面，如下所示：

```html
<body ng-app ng-init="thing = {name : 'World'}"> 
    <h1>Hello, {{thing.name}}</h1>
    <div ng-controller="HelloCtrl">
        Say hello to: <input type="text" ng-model="thing.name">
        <h2>Hello, {{thing.name}}!</h2> 
    </div>
</body>
```

这个方案会更可靠，因为他并没有假设 DOM 树的结构是什么样子。

> 避免直接把数据绑定到 作用域的属性上。应优先选择把数据双向绑定到对象的属性上（然后再把对象挂到 scope 上）。  
> 就经验而言，在给 `ng-model` 指令的表达式中，你应该有一个点（例如， `ng-model="thing.name"`）。

## 作用域层级和事件系统

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

作用域需要提供相互隔离的命名空间，避免变量的命名冲突。作用域们都很小，而且被以层级的方式组织起来，对内存使用的管理来说很有帮助。当其中一个作用域不再需要 ，它就可以被销毁了。结果就是，这个作用域所暴露出来的模型和方法就符合的垃圾回收的标准。

新的作用域通常是被 `可创建作用域` 的指令所生成和销毁的。不过也可以使用 `$new()` 和 `$destroy()` 方法来手动的创建和销毁作用域。

## Tutorial

- [Understanding Scopes · angular/angular.js Wiki](https://github.com/angular/angular.js/wiki/Understanding-Scopes)