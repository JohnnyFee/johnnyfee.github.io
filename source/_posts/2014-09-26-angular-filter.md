---
layout: post
title: "Angular Filter"
category : Angular
tags : [angular, tutorial]
--- 

过滤器（filter）正如其名，作用就是接收一个输入，通过某个规则进行处理，然后返回处理后的结果。主要用在数据的格式化上，例如获取一个数组中的子集，对数组中的元素进行排序等。ng内置了一些过滤器，它们是：currency(货币)、date(日期)、filter(子串匹配)、json(格式化json对象)、limitTo(限制个数)、lowercase(小写)、uppercase(大写)、number(数字)、orderBy(排序)。总共九种。除此之外还可以自定义过滤器，这个就强大了，可以满足任何要求的数据处理。

过滤器的内容非常简单，只要明白了内置的如何使用，自己如何定义一个filter就OK了~今天系统的学习了下，下面做个介绍。

<!--more-->

## filter的两种使用方法

### 在模板中使用filter

我们可以直接在 `{%raw%}{{ }}{%endraw%}` 中使用filter，跟在表达式后面用 | 分割，语法如下：

    {%raw%}{{ expression | filter }}{%endraw%}

也可以多个filter连用，上一个filter的输出将作为下一个filter的输入（怪不得这货长的跟管道一个样。。）
    {%raw%}
    {{ expression | filter1 | filter2 | ... }}
    // 如
    {{12.9 | currency | number:0 }} 
    {%endraw%}

> displays: $13

filter可以接收参数，参数用 : 进行分割，如下：

    {%raw%}{{ expression | filter:argument1:argument2:... }}{%endraw%}

除了对 `{%raw%}{{}}{%endraw%}` 中的数据进行格式化，我们还可以在指令中使用filter，例如先对数组array进行过滤处理，然后再循环输出：

    {%raw%}<span ng-repeat="a in array | filter ">{%endraw%}

### 在 JavaScript 中使用 filter

过滤器除了在模板中调用，还可以在 JavaScript 中调用，如 controllers, services, other filters 等。这样，我们就可以结合已存在的过滤器来提供新的功能。

过来周期可以注入到被 AngularJS DI 系统管理的任何对象，我们有两种方式来表示过滤器的依赖：

* `$filter` 服务
* `Filter` 后缀的过滤器名

`$filter` 服务是一个根据名字获取过滤器的查询函数。以下是一个类似 `limitTo` 的例子，当字符串的长度超过指定的长度时，超过的部分会被截取，并添加 "…" 后缀：

```js
angular.module('trimFilter', [])
  .filter('trim', function($filter){

    var limitToFilter =  $filter('limitTo');

    return function(input, limit) {
      if (input.length > limit) {
        return limitToFilter(input, limit-3) + '...';
      }
      return input;
    };
  });
```

其中，通过 `$filter('limitTo')` 就可以得到一个 `limitTo` 过滤器实例。

我们还可以通过一种更快而且易读的方式来得到 `limitTo` 服务：

```js
.filter('trim', function(limitToFilter){
    return function(input, limit) {
      if (input.length > limit) {
        return limitToFilter(input, limit-3) + '...';
      }
      return input;
    };
  });
```

其中，我们使用 `limitToFilter` 来获取过滤器，这种方式的命名规则为  `[filter name]Filter`，`[filter name]` 为过滤器名字。

使用 `Filter` 后缀的方式更简单自然，使用 `$filter` 服务的唯一场合是当我们想得到多个过滤器实例或者想根据变量来获取过滤器实例时，如 `$filter(filterName)`。

## ng的内置过滤器

ng内置了九种过滤器，使用方法都非常简单，看文档即懂。不过为了以后不去翻它的文档，我在这里还是做一个详细的记录。

### Formatting filters

#### currency (货币处理)

使用currency可以将数字格式化为货币，默认是美元符号，你可以自己传入所需的符号，例如我传入人民币：

    {%raw%}{{num | currency : '￥'}}{%endraw%}

#### date (日期格式化)

原生的js对日期的格式化能力有限，ng提供的date过滤器基本可以满足一般的格式化要求。Model can contain dates expressed as Date objects or as Strings (in this case Strings will be parsed to a Date object before formatting). 用法如下：

    {%raw%}{{date | date : 'yyyy-MM-dd hh:mm:ss EEEE'}}{%endraw%}

参数用来指定所要的格式，y M d h m s E 分别表示 年 月 日 时 分 秒 星期，你可以自由组合它们。也可以使用不同的个数来限制格式化的位数。另外参数也可以使用特定的描述性字符串，例如“shortTime”将会把时间格式为12:05 pm这样的。ng提供了八种描述性的字符串，个人觉得这些有点多余，我完全可以根据自己的意愿组合出想要的格式，不愿意去记这么多单词~

#### json(格式化json对象)

json过滤器可以把一个js对象格式化为json字符串，没有参数。这东西有什么用呢，我一般也不会在页面上输出一个json串啊，官网说它可以用来进行调试，嗯，是个不错的选择。或者，也可以用在js中使用，作用就和我们熟悉的JSON.stringify()一样。用法超级简单：

    {%raw%}{{ jsonTest | json}}{%endraw%}

This filter is mostly useful for debugging purposes as it can assure "pretty-print" for JavaScript objects. Typical usage looks like follows: `{%raw%}{{someObject | json}}{%endraw%}`. It is mostly used for debugging purposes.

#### lowercase(小写)/uppercase(大写)

把数据转化为全部小写。太简单了，不多解释。同样是很鸡肋的一个filter，没有参数，只能把整个字符串变为小写，不能指定字母。怎么用我都懒得写了。

#### number(格式化数字)

number过滤器可以为一个数字加上千位分割，像这样，123,456,789。同时接收一个参数，可以指定float类型保留几位小数：

    {%raw%}{{ num | number : 2 }}{%endraw%}

### Array-transforming filters

#### filter(匹配子串)

这是一个多功能的过滤工具，它很灵活能够支持多个选项以从集合中精确选择元素。

这个名叫filter的filter（不得不说这名字起的，真让人容易混淆——！）用来处理一个数组，然后可以过滤出含有某个子串的元素，作为一个子数组来返回。可以是字符串数组，也可以是对象数组。如果是对象数组，可以匹配属性的值。它接收一个参数，用来定义子串的匹配规则。下面举个例子说明一下参数的用法，我用现在特别火的几个孩子定义了一个数组：

```js
$scope.childrenArray = [
    {name:'kimi',age:3},
    {name:'cindy',age:4},
    {name:'anglar',age:4},
    {name:'shitou',age:6},
    {name:'tiantian',age:5}
];

$scope.func = function(e){return e.age>4;}
```


> {%raw%}
> {{ childrenArray | filter : 'a' }} //匹配属性值中含有a的
> 
> {{ childrenArray | filter : 4 }}  //匹配属性值中含有4的
> 
> {{ childrenArray | filter : {name : 'i'} }} //参数是对象，匹配name属性中含有i的
> 
> {{childrenArray | filter : func }}  //参数是函数，指定返回age>4的
> {%endraw%}

#### orderBy(排序)

orderBy过滤器可以将一个数组中的元素进行排序，接收一个参数来指定排序规则，参数可以是一个字符串，表示以该属性名称进行排序。可以是一个函数，定义排序属性。还可以是一个数组，表示依次按数组中的属性值进行排序（若按第一项比较的值相等，再按第二项比较），还是拿上面的孩子数组举例：

    {%raw%}
    <div>{{ childrenArray | orderBy : 'age' }}</div>      //按age属性值进行排序，若是-age，则倒序
    <div>{{ childrenArray | orderBy : orderFunc }}</div>   //按照函数的返回值进行排序
    <div>{{ childrenArray | orderBy : ['age','name'] }}</div>  //如果age相同，按照name进行排序
    {%endraw%}

内置的过滤器介绍完了，写的我都快睡着了。。。正如你所看到的，ng内置的过滤器也并不是万能的，事实上好多都比较鸡肋。更个性化的需求就需要我们来定义自己的过滤器了，下面来看看如何自定义过滤器。

#### limitTo(限制数组长度或字符串长度)

limitTo 过滤器用来截取数组或字符串，接收一个参数用来指定截取的长度，如果参数是负值，则从数组尾部开始截取。个人觉得这个filter有点鸡肋，首先只能从数组或字符串的开头/尾部进行截取，其次，js原生的函数就可以代替它了，看看怎么用吧：

    {%raw%}{{ childrenArray | limitTo : 2 }}{%endraw%}  //将会显示数组中的前两项

列出来的过滤器只能用于数组（`limitTo` 是个例外，他能处理字符串）。当这类过滤器应用到对象而不是数组时，无效果，只是简单地返回原对象。

数组相关的过滤器经常和 `ng-repeat` 指令来显示果过滤结果。

## filter 过滤器

AngularJS 有一个名为 filter 的过滤器。filter 过滤器是个过功能的过滤函数，可以用于选择数组的子集。有很多参数格式可以用于这些过滤器以便驱动元素选择过程。最简单的例子，我们可以通过一个子字符串，集合中的所有元素都将被检查是否包含指定的子字符串。

下面是一个基于查询条件过滤的产品订单的例子。有一个用户输入查询条件的输入框，查询结果是只包含提供的子字符串的元素，如图：

![](http://johnnyimages.qiniudn.com/angular-filter.jpg)

假设我们的数据模型包含以下属性：`name`, `desc`, `priority`, `estimation` and `done`，下面是 UI 模板：

```html
{%raw%}
<div class="well">
<label>
  Search for:<input type="text" ng-model="criteria">
</label>
</div>
<table class="table table-bordered">
  <thead>
    <th>Name</th>
    <th>Description</th>
    ...
  </thead>
  <tbody>
    <tr ng-repeat="backlogItem in backlog | filter:criteria">
      <td>{{backlogItem.name}}</td>
      <td>{{backlogItem.desc}}</td>
      ...
    </tr>
  </tbody>
</table>
{%endraw%}
```

正如你所见，基于用户输入来添加过滤器异常简单，我们只需要把输入框的值作为阐述传给过滤器。匹配条件也可以使用 `!` 操作符否定。

如果你想更精确地控制匹配条件，我们可以为过滤器提供一个对象作为参数，集合中的项会匹配对象中的所有属性，也就是所这些属性使用的是 AND 逻辑操作符。下例中，我们只匹配 name 属性且只包含还没有完成的项：

    {%raw%}ng-repeat="item in backlog | filter:{name: criteria, done: false}"{%endraw%}

另外，AngularJS 提供了一个名为 `$` 的 catch-all 属性，它可以将 AND 和 OR 逻辑操作符结合使用。假如我们要搜索源对象中所有属性都和字符串匹配，并且没有完成的项，这样的表达式为：

    {%raw%}ng-repeat="item in backlog | filter:{$: criteria, done: false}"{%endraw%}

当对象不足以表达过滤条件时，我们可以为过滤器提供函数（也就是所谓的“断言”）。这样的函数在源集合的每次迭代的时候都会被调用，过滤结果为所有让过滤函数返回 `true`的项。 

以下例子返回所有已经完成并且 estimation 超过 20的项：

```js
$scope.doneAndBigEffort = function (backlogItem) {
  return backlogItem.done && backlogItem.estimation > 20;
};
```

And use:

    {%raw%}ng-repeat="item in backlog | filter:doneAndBigEffort"{%endraw%}

### 计算过滤结果

我们有时候需要显示过滤集合的项数，我们可能在 repeater 和 计算表达式中同时使用 filter 来达到这一目标，如：

    {%raw%}<tr ng-repeat="item in backlog | filter:{$: criteria, done: false}">{%endraw%}

总结行:

    {%raw%}Total: {{(backlog | filter:{$: criteria, done: false}).length}}{%endraw%}

这有几个明显的缺点，不仅代码冗余，而且 filter 在两个地方都要运行。

我们可以通过为过滤后的数组创建一个临时变量来避免这样的缺点：

    {%raw%}ng-repeat="item in filteredBacklog = (backlog | filter:{$: criteria, done: false})"{%endraw%}

然后，计算过滤结果就归结为显示数组的长度：

    Total: {%raw%}{{filteredBacklog.length}}{%endraw%}

这种方法不是很直观，过滤逻辑只能放在一个地方。

另一中方法是把过滤的逻辑移到控制器中，让后只把过滤结果暴露出来。这种方法还有一个好处，就是便于测试。

### 使用 orderBy 过滤器排序

扁平的数据可以用来自由排序，通常通过点击以下某一列的表头，再点一下则反方向排序。我们接下来实现这个例子。

![](http://johnnyimages.qiniudn.com/angular-fileter-sort.jpg)

用来排序的 HTML 部分：

```html
{%raw%}
<thead>
  <th ng-click="sort('name')">Name</th>
  <th ng-click="sort('desc')">Description</th>
   . . .
</thead>
<tbody>
  <tr ng-repeat="item in filteredBacklog = (backlog | 
    filter:criteria | orderBy:sortField:reverse)">
    <td>{{item.name}}</td>
    <td>{{item.desc}}</td>
    ... 
  </tr>
</tbody>
{%endraw%}
```

`orderBy` 带有两个参数：

* `sortField`: 用于排序断言的属性名
* sort order (`reverse`): 排序方向

通过单元格的点击事件触发的 `sort` 函数负责选择排序属性和切换排序方向：

```js
$scope.sortField = undefined;
$scope.reverse = false;

$scope.sort = function (fieldName) {
  if ($scope.sortField === fieldName) {
    $scope.reverse = !$scope.reverse;
  } else {
    $scope.sortField = fieldName;
    $scope.reverse = false;
  }
};
```

AngularJS 可以结合过滤器和排序来创建交互式表格。`orderBy` 过滤器应该置于 `filter` 过滤器之后，这是出于性能的考虑，因为相对过滤，排序更耗时，所以最好让排序算法运行在尽可能少的数据集合上。

我们需要添加图标以指示排序的域以及排列的顺序，为此我们会用到 `ng-class`。下例为 name 列的例子：

```html
<th ng-click="sort('name')">Name
<i ng-class="{'icon-chevron-up': isSortUp('name'), 'icon-chevron-down': isSortDown('name')}"></i>
</th>
```

The `isSortUp` and `isSortDown` functions are very simple and look like:

```js
$scope.isSortUp = function (fieldName) {
  return $scope.sortField === fieldName && !$scope.reverse;
};

$scope.isSortDown = function (fieldName) {
  return $scope.sortField === fieldName && $scope.reverse;
};
```

## 自定义过滤器

除了使用内置的过滤器，我们也可以自定义过滤器。以下一个让单词首字母大写的例子：

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

在模板中使用:

```html
{% raw %}
<body ng-app='HomeModule' ng-controller="HomeController">
  <h1>{{pageHeading | titleCase}}</h1>
</body>
{% endraw %}
```

`pageHeading` 为控制器中的模型变量：

```js
function HomeController($scope) {
  $scope.pageHeading = 'behold the majesty of your page title';
}
```

### 分页的例子

我们将创建一个名为 `pagination` 的过滤器用来分页，以下是使用分页过滤器的例子：

```html
{%raw%}
<tr ng-repeat="item in filteredBacklog = (backlog | 
  pagination:pageNo:pageSize">
  <td>{{item.name}}</td>
  . . .
</tr>
{%endraw%}
```

`pagination` 过滤器需要携带两个参数：当前页索引和页大小。

以下是简单的实现（忽略了错误处理）：

```js
angular.module('arrayFilters', [])

  .filter('pagination', function(){
      return function(inputArray, selectedPage, pageSize) {
           var start = selectedPage*pageSize;
           return inputArray.slice(start, start + pageSize);
         };
  });
```

想其他的 provider 一样，过滤器需要在一个 module 实例上注册。需要为 `filter` 指定一个过滤器名和一个工厂方法，这个工厂方法必须返回实际的过滤器函数。

`pagination` 过滤函数的第一个参数是要过滤的内容，接下来的参数为过滤函数的选项。

过滤器易于单元测试，如：

```js
describe('pagination filter', function () {
  var paginationFilter;

  beforeEach(module('arrayFilters'));
  beforeEach(inject(function (_paginationFilter_) {
    paginationFilter = _paginationFilter_;
  }));

  it('should return a slice of the input array', function () {
    var input = [1, 2, 3, 4, 5, 6];

    expect(paginationFilter(input, 0, 2)).toEqual([1, 2]);
    expect(paginationFilter(input, 2, 2)).toEqual([5, 6]);
  });

  it('should return empty array for out-of bounds', function () {
    var input = [1, 2];
   
    expect(paginationFilter(input, 2, 2)).toEqual([]);
  });
});
```

## Filters dos and don'ts

过滤器在模板中为格式化和数据转换提供了简洁便利的语法。但如果使用不当可能引起错误，以下讲述了过滤器适合和不适合的使用场景。

### 过滤器和 DOM 操作

你有时可能试图在过滤器函数中返回 HTML 标签，实际上，AngularJS 包含了一个这么做的的过滤器（在分离的 `ngSanitize` 模块中）。

实际上，过滤器输出 HTMl 不是最佳实践，最主要的原因是为了显示过滤器输出的 HTML，我们需要 `ngBindUnsafeHtml` 或者 `ngBindHtml` 这样的绑定插件。这不仅让绑定语法便得更复杂（相对 `{{expression}}`），也让网页更容易受到 HTML 注入攻击。

我们看下 `highlight` 过滤器：

```js
angular.module('highlight', [])

  .filter('highlight', function(){

    return function(input, search) {
      if (search) {
        return input.replace(new RegExp(search, 'gi'),
           '<strong>$&</strong>');
      } else {
        return input;
      }
    };
  });
```

这个过滤器包含硬编码的 HTML 标签，结果是，我们不能使用插值指令，而需要像这样写模板：

```html
{%raw%}
<input ng-model="search">
<span ng-bind-html="phrase | highlight:search"></span>
{%endraw%}
```

过滤器输出的 HTML 标签中不能包含任何 AngularJS 指令，因为这些指令不会执行。

### 过滤器中耗时的数据转换

在模板中使用过滤器时，过滤器变成了 AngularJS 表达式的一部分，表达式会被频繁执行。实际上，这样的过滤器函数在每个 digest 周期中被调用多次。我们可以通过下面的例子验证：

```js
angular.module('filtersPerf', [])
  .filter('logUppercase', function(uppercaseFilter){
    return function(input) {
      console.log('Calling uppercase on: '+input);
      return uppercaseFilter(input);
    };
  });
```

在标签上这样使用：

    {%raw%}<input ng-model="name"> {{name | logUppercase}}{%endraw%}

每敲一个键盘，至少输出一次 log（经常两次）。正因为过滤器不仅执行一次，所以过滤器要尽可能高效执行的。过滤器执行多次是因为 Angular 的脏检查在工作。

### 不稳定的过滤器

过滤器会被调用多次，当输入没有发生变化时，过滤器放回的结果应该是一样的。如果过滤器没有这个特点就很容易失控。让我们编写一个恶意的随机数过滤器，这个过滤器从一个数组中随机选择一个元素：

```js
angular.module('filtersStability', [])

  .filter('random', function () {

    return function (inputArray) {
      var idx =  Math.floor(Math.random() * inputArray.length);
      return inputArray[idx];
    };
  })
```

这个随删出售过滤器可以这样使用：

    {%raw%}{{items | random}}{%endraw%}

这在界面上回看了一个随机数，这看上去是正确的。但查看控制台是，我们可以发现有错误输出：

    Uncaught Error: 10 $digest() iterations reached. Aborting!

错误的意思是，每次计算会产生不同的值。AngularJS 观察模型的变化，然后计算表达式，期望这是一个稳定的过程。

像这样的场景，解决办法是在模板显示前，在控制器中计算随机数。

```js
.controller('RandomCtrl', function ($scope) {

  $scope.items = new Array(1000);
  for (var i=0; i<$scope.items.length; i++) {
    $scope.items[i] = i;
  }

$scope.randomValue = Math.floor(Math.random() * $scope.items.length);
});
```

## Tutorial

- [走进AngularJs(七) 过滤器（filter） - 吕大豹 - 博客园](http://www.cnblogs.com/lvdabao/p/3475426.html)
- [AngularJS: API: filter components in ng](https://docs.angularjs.org/api/ng/filter)
- [All About the Built-In AngularJS Filters ♥ Scotch](http://scotch.io/tutorials/javascript/all-about-the-built-in-angularjs-filters)