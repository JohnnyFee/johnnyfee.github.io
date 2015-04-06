layout: post
title: "Angular Best Practice"
category : Angular
tags : [angular, tutorial]
---

> 原文：<http://www.infoq.com/cn/news/2013/02/angular-web-app>

## 1. 不要先设计页面，然后再使用DOM操作来改变它的展现

在jQuery中，你通常会设计一个页面，然后再给它动态效果。这是因为jQuery的设计就是为了扩充DOM并在这个简单的前提下疯狂的生长的。

但是在AngularJS里，必须从头开始就在头脑中思考架构。必须从你想要完成的功能开始，然后设计应用程序，最后来设计视图，而非“我有这么一个DOM片段，我想让他可以实现XXX效果”。

## 2. 不要用AngularJS来加强jQuery

类似的，不要以这样的思维开始：用jQuery来做X，Y和Z，然后只需要把AngularJS的models和controllers加在这上面。这在刚开始的时候显得非常诱人，这也是为什么我总是建议AngularJS的新手完全不使用jQuery，至少不要在习惯使用“Angular Way”开发之前这么做。

<!-- more -->

我在邮件列表里看到很多开发者使用150或200行代码的jQuery插件创造出这些复杂的解决方案，然后使用一堆callback函数以及$apply把它粘合到AngularJS里，看起来复杂难懂；但是他们最终还是把它搞定了！问题是在大多数情况下这些jQuery插件可以使用很少的AngularJS代码重写，而且所有的一切都很简单直接容易理解。

这里的底线是：当你选择解决方案时，首先“think in AngularJS”；如果想不出一个解决方案，去社区求助；如果还是没有简单的解决方案，再考虑使用jQuery。但是不要让jQuery成为你的拐杖，导致你永远无法真正掌握AngularJS。

## 3. 总是以架构的角度思考

首先要知道Single-page应用是应用，不是网页。所以我们除了像一个客户端开发者般思考外，还需要像一个服务器端开发者一样思考。我们必须考虑如何把我们的应用分割成独立的，可扩展且可测试的组件。

那么如何做到呢？如何“think in AngularJS”？这里有一些基本原则，对比jQuery。

__视图是“Official Record”__

在jQuery里，我们编程改变视图。我们会将一个下拉菜单定义为一个ul ：

```html
<ul class="main-menu">
    <li class="active"> <a href="#/home">Home</a> </li>
    <li> <a href="#/menu1">Menu 1</a> 
        <ul>
            <li><a href="#/sm1">Submenu 1</a></li> 
            <li><a href="#/sm2">Submenu 2</a></li>
            <li><a href="#/sm3">Submenu 3</a></li>
        </ul>
    </li>
    <li> <a href="#/home">Menu 2</a> </li>
</ul>
```

在jQuery里，我们会在应用逻辑里这样启用这个下拉菜单：

    $('.main-menu').dropdownMenu();

当我们只关注视图，这里不会立即明显的体现出任何（业务）功能。对于小型应用，这没什么不妥。但是在规模较大的应用中，事情就会变得难以理解且难以维护。

而在AngularJS里，视图是基于视图的功能。ul声明就会像这样：

    <ul class="main-menu" dropdown-menu> ... </ul>

这两种方式做了同样的东西，但是在AngularJS的版本里任何人看到这个模版都可以知道将会发生什么事。不论何时一个新成员加入开发团队，他看到这个就会知道有一个叫做dropdownMenu的directive作用在这个标签上；他不需要靠直觉去猜测代码的功能或者去看任何代码。视图本身告诉我们会发生什么事。清晰多了。

首次接触AngularJS的开发者通常会问这样一个问题：如何找到所有的某类元素然后给它们加上一个directive。但当我们告诉他：别这么做时，他总会显得非常的惊愕。而不这么做的原因是这是一种半jQuery半AngularJS的方式，这么做不好。这里的问题在于开发者尝试在 AngularJS的环境里“do jQuery”。这么做总会有一些问题。视图是official record（译者注：作者可能想表达视图是一等公民）。在一个directive外，绝不要改变DOM。所有的directive都应用在试图上，意图非常清晰。

记住：不要设计，然后写标签。你需要架构，然后设计。

### 数据绑定

这是到现在为止最酷的AngularJS特性。这个特性使得前面提到的很多DOM操作都显得不再需要。AngularJS会自动更新视图，所以你自己不用这么做！在jQuery里，我们响应事件然后更新内容，就像这样：

```js
$.ajax({ 
    url: '/myEndpoint.json', 
    success: function ( data, status ) { 
        $('ul#log').append('<li>Data Received!</li>'); 
    } 
});
```

对应的视图:

    <ul class="messages" id="log"> </ul>

除了要考虑多个方面，我们也会遇到前面视图中的问题。但是更重要的是，需要手动引用并更新一个DOM节点。如果我们想要删除一个log条目，也需要针对DOM编码。那么如何脱离DOM来测试这个逻辑？如果想要改变展现形式怎么办？

这有一点凌乱琐碎。但是在AngularJS里，可以这样来实现：

```js
$http('/myEndpoint.json').then(function (response) {
    $scope.log.push({
        msg: 'Data Received!'
    });
});
```

视图看起来是这个样子的：

    <ul class="messages"> <li ng-repeat="entry in log"></li> </ul>

但是其实还可以这样来做：

    <div class="messages"> <div class="alert" ng-repeat="entry in log">  </div> </div>

现在如果我们想使用Bootstrap的alert boxes，而不是一个无序列表，根本不需要改变任何的controller代码！更重要的是，不论log在何处或如何被更新，视图便会随之更新。自动的。巧妙！

尽管我没有在这里展示，数据绑定其实是双向的。所以这些log信息在视图里也可以是可编辑的。只需要这么做：

    <input ng-model="entry.msg" />

简单快乐。

### 清晰的模型（Model）层

在jQuery里，DOM在一定程度上扮演了模型的角色。但在AngularJS中，我们有一个独立的模型层可以灵活的管理。完全与视图独立。这有助于上述的数据绑定，维护了关注点的分离（独立的考虑视图和模型），并且引入了更好的可测性。后面还会提到这点。

### 关注点分离

上面所有的内容都与这个愿景相关：保持你的关注点分离。视图负责展现将要发生的事情；模型表现数据；有一个service层来实现可复用的任务；在 directive里面进行DOM操作和扩展；使用controller来把上面的东西粘合起来。这在其他的答案里也有叙述，我在这里只增加关于可测试性的内容，在后面的一个段落里详述。

### 依赖注入

依赖注入帮我们实现了关注点分离。如果你来自一个服务器语言（java或php），可能对这个概念已经非常熟悉，但是如果你是一个来自jQuery的客户端开发者，这个概念可能看起来有点傻而多余。但其实不是的。。。

大体来讲，DI意味着可以非常自由的声明组件，然后在另一个组件里，只需要请求一个该组件的实例，就可以得到它。不需要知道（关心）加载顺序，或者文件位置，或类似的事情。这种强大可能不会立刻显现，但是我只提供一个（常见。。）的例子：测试。

就说在你的应用里，我们需要一个服务通过REST API来实现服务器端存储，并且根据不同的应用状态，也有可能使用（客户端）本地存储。当我们运行controller的测试时，不希望必须和服务器交互 —— 毕竟是在测试controller逻辑。我们可以只添加一个与本来使用的service同名的mock service，injector会确保controller自动得到假的那个service —— controller不会也不需要知道有什么不同。

说起测试……

## 4. 总是 —— 测试驱动开发

这其实是关于架构的第3节。但是它太重要了，所以我把它单独拿出来作为一个顶级段落。

在所有那些你见过，用过或写过的jQuery插件中，有多少是有测试集的？不多，因为jQuery经不起测试的考验。但是AngularJS可以。

在jQuery中，唯一的测试方式通常是独立地创建附带sample/demo页面的组件，然后我们的测试在这个页面上做DOM操作。所以我们必须独立的开发一个组件，然后集成到应用里。多不方便！在使用jQuery开发时，太多的时间，我们挑选迭代而非测试驱动开发。谁又能责怪我们呢？

但是因为有了关注点分离，我们可以在AngularJS中迭代地做测试驱动开发！例如，想要一个超级简单的directive来展现我们的当前路径。可以在视图里声明：

    <a href="/hello" when-active>Hello</a>

OK，现在可以写一个测试：

```js
it('should add "active" when the route changes', inject(function () {
    var elm = $compile('<a href="/hello" when-active>Hello</a>')($scope);
    $location.path('/not-matching');
    expect(elm.hasClass('active')).toBeFalsey();
    $location.path('/hello');
    expect(elm.hasClass('active')).toBeTruthy();
}));
```

执行这个测试来确认它是失败的。然后我们可以开始写这个directive了：

```js
.directive('whenActive', function ($location) {
    return {
        scope: true,
        link: function (scope, element, attrs) {
            scope.$on('$routeChangeSuccess', function () {
                if ($location.path() == element.attr('href')) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }
    };
});
```

测试现在通过了，然后我们的menu按照请求的方式执行。开发过程既是迭代的也是测试驱动的。太酷了。

## 5. 概念上，Directives并不是打包的jQuery

你经常会听到“只在directive里做DOM操作”。这是必需的。请给它应有的尊重！

但让我们再深入一点……

一些directive仅仅装饰了视图中已经存在的东西（想想ngClass）并且因此有时候仅仅直接做完DOM操作然后就完事了。但是如果一个 directive像一个“widget”并且有一个模版，那么它也要做到关注点分离。也就是说，模版本身也应该很大程度上与其link和 controller实现保持独立。

AngularJS拥有一整套工具使这个过程非常简单;有了ngClass我们可以动态地更新class；ngBind使得我们可以做双向数据绑定。ngShow和ngHide可编程地展示和隐藏一个元素；以及更多地 —— 包括那些我们自己写的。换句话说，我们可以做到任何DOM操作能实现的特性。DOM操作越少，directive就越容易测试，也越容易给它们添加样式，在未来也越容易拥抱变化，并且更加的可复用和发布。

我见过很多AngularJS新手，把一堆jQuery扔到directive里。换句话说，他们认为“因为不能在controller里做DOM操作，就把那些代码弄到directive里好了”。虽然这么做确实好一些，但是依然是错误的。

回想一下我们在第3节里写的那个logger。即使要把它放在一个directive里，我们依然希望用“Angular Way”来做。它依然没有任何DOM操作！有很多时候DOM操作是必要的，但其实比你想的要少得多！在应用里的任何地方做DOM操作之前，问问你自己是不是真的需要这么做。有可能有更好的方式。

这里有一个示例，展示出了我见过最多的一种模式。我们想做一个可以toggle的按钮。（注意：这个例子有一点牵强、啰嗦，这是为了表达出使用同样方式处理问题的更复杂的情况。）

```js
.directive('myDirective', function () {
    return {
        template: '<a class="btn">Toggle me!</a>',
        link: function (scope, element, attrs) {
            var on = false;
            $(element).click(function () {
                if (on) {
                    $(element).removeClass('active');
                } else {
                    $(element).addClass('active');
                }
                on = !on;
            });
        }
    };
});
```

这里有一些错误的地方。首先，jQeury根本没必要出现。我们在这里做的事情都根本用不着jQuery！其次，即使已经将jQuery用在了页面上，也没有理由用在这里。第三，即使假设这个directive依赖jQuery来工作，jqLite(angular.element)在加载后总会使用jQuery！所以我们没必要使用$ —— 用angular.element就够了。第四，和第三条紧密关联，jqLite元素不需要被$封装 —— 传到link里的元素本来就会是一个jQuery元素！第五，我们在前面段落中说过，为什么要把模版的东西混到逻辑里？

这个directive可以（即使是更复杂的情况下！）写得更简单：

```js
.directive('myDirective', function () {
    return {
        scope: true,
        template: '<a class="btn" ng-class="{active: on}" ng-click="toggle()">Toggle me!</a>',
        link: function (scope, element, attrs) {
            scope.on = false;
            scope.toggle = function () {
                scope.on = !$scope.on;
            };
        }
    };
});
```

再一次地，模版就在模版里，当有样式需求时，你（或你的用户）可以轻松的换掉它，不用去碰逻辑。重用性 —— boom！

当然还有其他的好处，像测试 —— 很简单！不论模版中有什么，directive的内部API从来不会被碰到，所以重构也很容易。可以不碰directive就做到任意改变模版。不论你怎么改，测试总是通过的。

所以如果directive不仅仅是一组类似jQuery的函数，那他们是什么？Directive实际是HTML的扩展。如果HTML没有做你需要它做的事情，你就写一个directive来实现，然后就像使用HTML一样使用它。

换句话说，如果AngularJS库没有做的一些事情，想想开发团队会如何完成它来配合ngClick，ngClass等。

## 总结

不要用jQuery。连include也不要。它会让你停滞不前。如果遇到一个你认为已经知道如何使用jQuery来解决的问题，在使用$之前，试试想想如何在AngularJS的限制下解决它。如果你不知道，问！20次中的19次，最好的方式不需要jQuery。如果尝试使用jQuery会增加你的工作量。

---

这是我目前最长的Stack Overflow回答。事实上，这个答案太长了，我都要填一个Captcha了。但是就如我常说的：能说多时候说的少其实就是懒。

希望这个答案对你有用。

**原文英文地址：** <http://stackoverflow.com/questions/14994391/how-do-i-think-in-angularjs-if-i-have-a-jquery-background>

## Style Guide

- [johnpapa/angularjs-styleguide](https://github.com/johnpapa/angularjs-styleguide)
- [mgechev/angularjs-style-guide](https://github.com/mgechev/angularjs-style-guide#services)
- [Google's AngularJS Style Guide](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html)
- [angularjs style guide](https://github.com/mgechev/angularjs-style-guide/blob/master/README-zh-cn.md)

## Best Practice

- [turingou/Angular-Best-Practices](https://github.com/turingou/Angular-Best-Practices) 由支付宝前端开发工程师 @莫登（新浪微博@郭宇）维护，部分案例包括Angular在 支付宝某些系统上的使用经验。
- [AngularJS移动开发中的坑汇总](http://blog.csdn.net/offbye/article/details/38490821)
- [AngularJS 最佳实践 – 尘埃落定](http://www.lovelucy.info/angularjs-best-practices.html)

## Tutorial

- [10 Top Mistakes Angular.js Developers Make](http://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make)
- [Angularjs开发一些经验总结 - 破狼 - 博客园](http://www.cnblogs.com/whitewolf/archive/2013/03/24/2979344.html)
- [Best Practices · angular/angular.js Wiki](https://github.com/angular/angular.js/wiki/Best-Practices)