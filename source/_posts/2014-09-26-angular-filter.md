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

我们可以直接在{{}}中使用filter，跟在表达式后面用 | 分割，语法如下：

    {{ expression | filter }}

也可以多个filter连用，上一个filter的输出将作为下一个filter的输入（怪不得这货长的跟管道一个样。。）

    {{ expression | filter1 | filter2 | ... }}
    // 如
    {{12.9 | currency | number:0 }} 

> displays: $13

filter可以接收参数，参数用 : 进行分割，如下：

    {{ expression | filter:argument1:argument2:... }}

除了对{{}}中的数据进行格式化，我们还可以在指令中使用filter，例如先对数组array进行过滤处理，然后再循环输出：

    <span ng-repeat="a in array | filter ">

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

    {{num | currency : '￥'}}

#### date (日期格式化)

原生的js对日期的格式化能力有限，ng提供的date过滤器基本可以满足一般的格式化要求。Model can contain dates expressed as Date objects or as Strings (in this case Strings will be parsed to a Date object before formatting). 用法如下：

    {{date | date : 'yyyy-MM-dd hh:mm:ss EEEE'}}

参数用来指定所要的格式，y M d h m s E 分别表示 年 月 日 时 分 秒 星期，你可以自由组合它们。也可以使用不同的个数来限制格式化的位数。另外参数也可以使用特定的描述性字符串，例如“shortTime”将会把时间格式为12:05 pm这样的。ng提供了八种描述性的字符串，个人觉得这些有点多余，我完全可以根据自己的意愿组合出想要的格式，不愿意去记这么多单词~

#### json(格式化json对象)

json过滤器可以把一个js对象格式化为json字符串，没有参数。这东西有什么用呢，我一般也不会在页面上输出一个json串啊，官网说它可以用来进行调试，嗯，是个不错的选择。或者，也可以用在js中使用，作用就和我们熟悉的JSON.stringify()一样。用法超级简单：

    {{ jsonTest | json}}

This filter is mostly useful for debugging purposes as it can assure "pretty-print" for JavaScript objects. Typical usage looks like follows: `{{someObject | json}}`. It is mostly used for debugging purposes.

#### lowercase(小写)/uppercase(大写)

把数据转化为全部小写。太简单了，不多解释。同样是很鸡肋的一个filter，没有参数，只能把整个字符串变为小写，不能指定字母。怎么用我都懒得写了。

#### number(格式化数字)

number过滤器可以为一个数字加上千位分割，像这样，123,456,789。同时接收一个参数，可以指定float类型保留几位小数：

    {{ num | number : 2 }}

### Array-transforming filters

#### filter(匹配子串)

This is a general-purpose filtering utility. It is very flexible and supports many options to precisely select elements from a collection.

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


> {{ childrenArray | filter : 'a' }} //匹配属性值中含有a的
> 
> {{ childrenArray | filter : 4 }}  //匹配属性值中含有4的
> 
> {{ childrenArray | filter : {name : 'i'} }} //参数是对象，匹配name属性中含有i的
> 
> {{childrenArray | filter : func }}  //参数是函数，指定返回age>4的

#### orderBy(排序)

orderBy过滤器可以将一个数组中的元素进行排序，接收一个参数来指定排序规则，参数可以是一个字符串，表示以该属性名称进行排序。可以是一个函数，定义排序属性。还可以是一个数组，表示依次按数组中的属性值进行排序（若按第一项比较的值相等，再按第二项比较），还是拿上面的孩子数组举例：

    <div>{{ childrenArray | orderBy : 'age' }}</div>      //按age属性值进行排序，若是-age，则倒序
    <div>{{ childrenArray | orderBy : orderFunc }}</div>   //按照函数的返回值进行排序
    <div>{{ childrenArray | orderBy : ['age','name'] }}</div>  //如果age相同，按照name进行排序

内置的过滤器介绍完了，写的我都快睡着了。。。正如你所看到的，ng内置的过滤器也并不是万能的，事实上好多都比较鸡肋。更个性化的需求就需要我们来定义自己的过滤器了，下面来看看如何自定义过滤器。

#### limitTo(限制数组长度或字符串长度)

limitTo过滤器用来截取数组或字符串，接收一个参数用来指定截取的长度，如果参数是负值，则从数组尾部开始截取。个人觉得这个filter有点鸡肋，首先只能从数组或字符串的开头/尾部进行截取，其次，js原生的函数就可以代替它了，看看怎么用吧：

    {{ childrenArray | limitTo : 2 }}  //将会显示数组中的前两项

The listed filters work on arrays only (`limitTo` being an exception, it can cope with strings as well).When applied to an object other that an array those filters have no effect and will simply return a source object.

The array-related filters are often used with the `ng-repeat` directive to render filtered results. In the following sections we are going to build a full example of a table that can be sorted, filtered and paginated. Examples are built around SCRUM backlog list from the sample application, and will illustrate how to combine filters and the repeater directive.

The array-related filters are often used with the `ng-repeat` directive to render filtered results. In the following sections we are going to build a full example of a table that can be sorted, filtered and paginated. Examples are built around SCRUM backlog list from the sample application, and will illustrate how to combine filters and the repeater directive.

## Filtering with the "filter" filter

First we need to clarify that AngularJS has a filter named `filter`. The name is a bit unfortunate since the word "filter" might refer to any filter in general (a transforming function) or this specific filter named "filter".

The **"filter" filter** is a general-purpose filtering function that can be used to select a subset of an array (or put differently exclude some elements). There are number of parameter formats that can be supplied to this filter in order to drive element selection process. In the simplest form we can provide a string in the case all fields of all elements in a collection will be checked for a presence of a given substring.

As an example let's consider a product backlog list that we would like to filter based on search criteria. Users would be presented with an input box where they could type-in search criteria. The resulting list should have only elements where any field of a given element contains a provided substring. The following screenshot illustrates finished UI:

![](http://johnnyimages.qiniudn.com/angular-filter.jpg)

If we assume that our data model has the following properties: `name`, `desc`, `priority`, `estimation` and `done`, we could write a template for the discussed UI as follows:

```html
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
```

As you can see it is extremely easy to add a filter based on user's input; we just need to wire up value of an input field as an argument to the filter. The rest will be taken care of by AngularJS automatic data binding and refresh mechanism. The matching criteria can be negated by prefixing with the ! operator.

In the previous example all the properties of source objects are searched for a substring match. If we want to have a more precise control over properties matching we can do so by providing an object argument to a filter. Such an object will act as a "query be example". Here we want to limit matching to the name property and include only items that are not done yet:

    ng-repeat="item in backlog | filter:{name: criteria, done: false}"

In this code snippet all properties of an object specified as an argument must match. We could say that conditions expressed by the individual properties are combined using the AND logical operator.

Additionally AngularJS provides a catch-all property name: `$`. Using this wildcard as a property name we can combine AND and OR logical operators. Let's say that we want to search for a string match in all properties of a source object, but take into account only not completed items. In this case a filtering expression could be re-written as follows:

    ng-repeat="item in backlog | filter:{$: criteria, done: false}"

It might happen that the combination of required search criteria is so complex that it is not possible to express it using object's syntax. In this case a function can be provided as an argument to the filter (so called `predicate` function). Such a function will be invoked for each and every individual element of a source collection. The resulting array will contain only elements for which the filtering function returns `true`. As a slightly contrived example we could imagine that we want to see only backlog items that are already completed and required over 20 units of effort. The filtering function for this example is both easy to write:

```js
$scope.doneAndBigEffort = function (backlogItem) {
  return backlogItem.done && backlogItem.estimation > 20;
};
```

And use:

    ng-repeat="item in backlog | filter:doneAndBigEffort"

### Counting filtered results

Often at times, we would like to display a number of items in a collection. Normally it is as simple as using the `{{myArray.length}}` expression. Things get a bit more complicated while using filters as we would like to show the size of a filtered array. A naive approach could consist of duplicating filters in both a repeater and a counting-expression. Taking our last example of filtering in a repeater:

    <tr ng-repeat="item in backlog | filter:{$: criteria, done: false}">

We could try to create a summary row like:

    Total: {{(backlog | filter:{$: criteria, done: false}).length}}

This has obviously several drawbacks; not only code is duplicated but also the same filters need to be executed several times in two different places, not ideal from the performance standpoint.

To remedy this situation we can create an intermediate variable (`filteredBacklog`) that would hold a filtered array:

    ng-repeat="item in filteredBacklog = (backlog | filter:{$: criteria, done: false})"

Then, counting filtered results boils down to displaying the length of a saved array:

    Total: {{filteredBacklog.length}}

The preceding pattern for counting filtering objects, while not very intuitive, allows us to have filtering logic in one place only.

The other possibility is to move the whole filtering logic to a controller and only expose filtered results on a scope. This method has one more advantage: it moves filtering code to a controller where it is very easy to unit test. To use this solution you will need to learn how to access filters from the JavaScript; something that is covered later on in this chapter.

### Sorting with the orderBy filter

Quite often a tabular data can be sorted freely by users. Usually clicking on a header of an individual column selects a given field as sort criteria, while clicking again reverses the sort order. In this section, we are going to implement this common pattern with AngularJS.

The `orderBy` filter will be our primary tool for this job. When finished, our sample table holding list of backlog items will get fully functional sorting icons shown as follows:

![](http://johnnyimages.qiniudn.com/angular-fileter-sort.jpg)

The `orderBy` filter is easy and intuitive to use so we can immediately dive into the code example, without spending too much time on theoretical introductions. Firstly we will make sorting work and then add sorting indicators. Here is relevant part of markup taking part in sorting:

```html
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
```

The actual sorting is taken care of by the `orderBy` filter, which in our example takes two arguments:

* `sortField`: a property name to be used as a sorting predicate
* sort order (`reverse`): this argument indicates if a sorted array should be reversed

The `sort` function, triggered by a click event on a cell header, is responsible for selecting the sort field as well as toggling sort direction. Here are relevant bits of the controller's code:

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

Our sorting example builds on top of the previous, filtering one, so now our backlog list can be both filtered and sorted. With AngularJS it is surprisingly easy to combine both filters to create interactive tables.

The `orderBy` filter was deliberately placed after the `filter` filter. The reason for this is performance: sorting is more costly as compared to filtering so it is better to execute ordering algorithm on a minimal data set.

Now that the sorting works we just need to add icons indicating which field we are sorting and whether it is ascending or descending. Once again the `ng-class` directive will prove very useful. Here is the example of visual indicators for the "name" column:

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

Of course there are many ways of displaying sort indicators, and the one just presented strives to keep CSS classes out of JavaScript code. This way presentation can be easily changed just be tweaking a template.

## Custom Filter

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

```js
function HomeController($scope) {
  $scope.pageHeading = 'behold the majesty of your page title';
}
```

### a pagination example

So far we've managed to display backlog items in a dynamic table that support sorting and filtering. Pagination is another UI pattern that is often used with larger data sets.

AngularJS doesn't provide any filter that would help us to precisely select a subset of an array based on start and end indexes. To support pagination we need to create a new filter, and this is a good occasion to get familiar with the process of writing custom filters.

To get the idea of an interface for the new filter; let's call it `pagination` we will write a sketch of markup first:

```html
<tr ng-repeat="item in filteredBacklog = (backlog | 
  pagination:pageNo:pageSize">
  <td>{{item.name}}</td>
  . . .
</tr>
```

The new `pagination` filter needs to take two parameters: page to be displayed (its index) and its size (number of items per page).

What follows is the very first, naive implementation of the filter (error handling was deliberately omitted to focus on filter writing mechanics):

```js
angular.module('arrayFilters', [])

  .filter('pagination', function(){

  return function(inputArray, selectedPage, pageSize) {
       var start = selectedPage*pageSize;
       return inputArray.slice(start, start + pageSize);
     };
  });
```

A filter, as any other provider, needs to be registered on an instance of a module. The `filter` method should be called with a filter name and a factory function that will create an instance of a new filter. The registered factory function must return the actual filter function.

The first argument of `pagination` filtering function represents input to be filtered while subsequent parameters can be declared to support filter options.

Filters are very easy to unit test; they work on a supplied input, and when done properly they shouldn't have any side effects. Here is an example test for our custom `pagination` filter:

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

Testing a filter is as simple as testing a single function, and most of the time is really straightforward. The structure of the sample test just presented should be easy to follow as there are almost no new constructs here. The only thing that requires explanation is the way of accessing instances of a filter from the JavaScript code.

## Filters dos and don'ts

Filters do a marvelous job when used to format and transform data invoked from a template offering nice and concise syntax. But filters are just a tool for a specific job and can as any other tools cause damage if used incorrectly. This section describes situations where filters should be avoided and an alternative solution would be a better fit.

### Filters and DOM manipulation

At times it might be tempting to return HTML markup as a result of filter's execution. In fact AngularJS contains one filter that does exactly that: `linky` (in the separate `ngSanitize` module).

It turns out, in practice, that filters outputting HTML are not the best idea. The main problem is that to render output of such a filter we need to use one of the binding directives described earlier on `ngBindUnsafeHtml` or `ngBindHtml`. Not only does it make the binding syntax more verbose (as compared to simply using `{{expression}}`) but potentially makes a web page vulnerable to HTML injection attacks.

To see some issues involving filters outputting HTML we can examine a simple `highlight` filter:

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

You can immediately see that this filter contains hardcoded HTML markup. As a result we can't use it with the interpolation directive but need to write a template like:

```html
<input ng-model="search">
<span ng-bind-html="phrase | highlight:search"></span>
```

On top of this the HTML markup outputted from a filter can't contain any AngularJS directives as those wouldn't be evaluated.

### Costly data transformations in filters

Filters, when used in a template, become integral part of the AngularJS expression, and as such are frequently evaluated. In fact, such filter functions are called multiple times on each digest cycle. We can easily see this in practice by creating a logging wrapper around the uppercase filter:

```js
angular.module('filtersPerf', [])
  .filter('logUppercase', function(uppercaseFilter){
    return function(input) {
      console.log('Calling uppercase on: '+input);
      return uppercaseFilter(input);
    };
  });
```

Upon using this newly defined filter in a markup like:

    <input ng-model="name"> {{name | logUppercase}}

We will see that the log statement is written at least once (usually twice) for each keystroke! This experiment alone should convince you that filters are executed often so it is highly preferable that they execute fast.

Don't be surprised to see that a filter is called multiple times in a row; this is AngularJS dirty checking at work. Strive to write your filters so they do light, fast processing.

### Unstable filters

Since filters are called multiple times it is reasonable to expect that a filter responds with the same return value if the input doesn't change. Such functions are called stable with respect to their parameters.

Things can get easily out of hand if a filter doesn't have this property. To see the disastrous effects of unstable filters let's write a malicious random filter that selects a random element from an input array (it is unstable):

```js
angular.module('filtersStability', [])

  .filter('random', function () {

    return function (inputArray) {
      var idx =  Math.floor(Math.random() * inputArray.length);
      return inputArray[idx];
    };
  })
```

Given an array of different items stored in the items variable on a scope, the random filter could be used in a template like:

    {{items | random}}

The preceding code, upon execution, will print out a random value so it might seem that it behaves correctly. It is only upon expecting browser's console we can realize that in fact an error is logged:

    Uncaught Error: 10 $digest() iterations reached. Aborting!

This error means that an expression is yielding different results each time it is being evaluated. AngularJS sees a constantly changing model and re-evaluates an expression, hoping that it will stabilize. 

In situations like those the solution is to calculate a random value in a controller, before a template is rendered:

```js
.controller('RandomCtrl', function ($scope) {

  $scope.items = new Array(1000);
  for (var i=0; i<$scope.items.length; i++) {
    $scope.items[i] = i;
  }

$scope.randomValue = Math.floor(Math.random() * $scope.items.length);
});
```

Like this a random value will be calculated before template processing and we can safely use the {{randomValue}} expression to output the prepared value.

If your function can generate different results for the same input it is not a good candidate for a filter. Invoke this function from a controller instead and leave AngularJS to render pre-calculated value.

## Tutorial

- [走进AngularJs(七) 过滤器（filter） - 吕大豹 - 博客园](http://www.cnblogs.com/lvdabao/p/3475426.html)
- [AngularJS: API: filter components in ng](https://docs.angularjs.org/api/ng/filter)