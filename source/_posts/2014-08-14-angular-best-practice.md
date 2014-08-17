---
layout: post
title: "Angular Best Practice"
category : Angular
tags : [angular, tutorial]
---

> 原文：<http://damoqiongqiu.iteye.com/blog/1965173> 

### 不要预先设计页面，然后再用DOM操作去修改它

在jQuery里面，你会先设计好一个页面，然后再让它变成动态的。这是因为jQuery本身就是以混合使用的思路来设计的。基于这个简单的前提，jQuery目前已经变得臃肿不堪。

但是在AngularJS的世界中，你心中首先必须有整体架构，然后从零开始构建应用。而不是一开始的时候就去想：“我已经有了这样一块DOM结构，我想让它做×××”，你必须首先思考你到底要完成什么功能，然后再开始动手，然后再设计你的应用，最后再去设计你的视图。

### 不要混合使用 jQuery 和 AngularJS

类似地，不要一开始就抱有这样的想法：jQuery可以实现X、Y和Z，所以我只要在上面再覆盖一层AngularJS，把模型和控制器加上即可。当你刚开始使用AngularJS的时候，这种想法实在诱人，这也是为什么我总是建议 AngularJS 新手彻底抛弃 jQuery 的原因，直到他们习惯了以“Angular风格”去做事为止。

在这里，以及在邮件列表里面，我看到过很多这种精心设计的解决方案，其中包含150或者200行代码的 jQuery 插件，然后他们再用一大堆回调函数和 `$apply` 把这些插件粘到 AngularJS 上，这种做法非常复杂而且令人困惑不已；但是，他们最终居然能把这货弄跑起来了！这里的问题在于，在大多数情况下，只需要很少的 AngularJS 代码就可以把这些 jQuery 插件重写一遍，然后所有事情都会突然变得简洁明了起来。

### 保持以架构的角度思考

首先要明确一点，单页面应用是一种应用，它们不是 web 页面。所以，我们需要像服务端开发者那样去思考，而不是像客户端开发者那样思考。我们必须思考如何把我们的应用切分成独立的、可扩展的、可测试的组件。

那么，你怎么才能做到这一点呢？你应该如何以AngularJS的方式思考问题呢？下面是一些基本的原则，与jQuery做个对比。

#### 假设有一个叫做“官方记录”（official record）的视图

在jQuery里面，我们会用编程的方式来修改视图，我们会像下面这样用ul标签来定义一个下拉列表：

```html
<ul class="main-menu">
    <li class="active">
        <a href="#/home">Home</a>
    </li>
    <li>
        <a href="#/menu1">Menu 1</a>
        <ul>
            <li><a href="#/sm1">Submenu 1</a></li>
            <li><a href="#/sm2">Submenu 2</a></li>
            <li><a href="#/sm3">Submenu 3</a></li>
        </ul>
    </li>
    <li>
        <a href="#/home">Menu 2</a>
    </li>
</ul>
```

在jQuery里面，我们的应用逻辑中会像下面这行代码一样来创建这个下拉列表：

```js
$('.main-menu').dropdownMenu();
```

如果我们仅仅看视图代码，我们无法立刻发现它有什么功能。对于小型的应用来说，这样做还算可以。但是对于大型应用来说，很快就会变得混乱并难以维护。

然而，在AngularJS中，视图是一种功能，它是基于视图的“官方记录”。我们的ul声明看起来就像下面这样：

```html
<ul class="main-menu" dropdown-menu>
    ...
</ul>
```

两种实现方式的效果完全相同，但是在AngularJS的版本中，每一个看到模板的人都知道它在做什么。 不管什么时候开发团队有新人进来，她看到这种代码之后就会立即明白，存在一个叫做 dropdownMenu 的指令，这个指令负责操控这个视图。她凭直觉就可以知道答案，而没有必要查看任何代码。视图本身已经告诉了我们这里会发生什么。这样就更加清晰了。

AngularJS 新手经常会问这样的问题：我怎么才能找出某种类型的所有超链接，然后在上面加上指令呢？我们会这样回答他：你不应该这么做。然后，他总是一副惊呆了样子。你不应该这么做的原因是：这是一种半jQuery半AngularJs式的思维方式，这不科学。用这种方式思考问题永远得不到很好的结果。你看到的应该是“官方记录”。除了指令之外，你永远、永远、永远不应该去修改DOM。同时，指令会用在 _视图_ 上，这样一来思路就清晰了。

记住：不要先设计，然后编写标签。你必须先架构，然后去设计。

#### 数据绑定

到目前为止，这是AngularJS最赞的特性，利用这一特性可以省掉我在上一小节中提到的大量DOM操作代码。AngularJS会自动为你刷新视图，所以不需要你自己去做这件事！在jQuery中，我们会响应事件然后刷新页面内容。示例如下：

```js
$.ajax({
  url: '/myEndpoint.json',
  success: function ( data, status ) {
    $('ul#log').append('<li>Data Received!</li>');
  }
});
```

对应的视图代码如下：

```html
<ul class="messages" id="log">
</ul>
```

这种方式除了会把注意点混在一起之外，还有我在前面所提到的思维模式问题。但是，更加重要的一点是，这样做我们必须手动引用并更新DOM节点。同时，如果我们想删掉一个`log`对象，我们必须针对DOM重新进行编码。这样一来我们如何脱离DOM来测试这些逻辑呢？同时，如果我们要修改显示效果又应该怎么做呢？

这样有点儿乱，代码既琐碎又脆弱。但是在AngularJS中，我们可以这样做：

```js
$http( '/myEndpoint.json' ).then( function ( response ) {
    $scope.log.push( { msg: 'Data Received!' } );
});
```

然后我们的视图代码是这样的：

```html
<ul class="messages">
    <li ng-repeat="entry in log">{{ entry.msg }}</li>
</ul>
```

对于上面所提的删除log对象这个问题，我们可以把视图写成这样：

```html
<div class="messages">
    <div class="alert" ng-repeat="entry in log">
        {{ entry.msg }}
    </div>
</div>
```

这里我们用Bootstrap的alert块替换了无序列表。并且我们永远不需要修改控制器代码！同时更重要的是，无论何时或者何地更新了log对象，视图都会**自动**刷新。高贵优雅！

虽然我没有在这里展示，其实数据绑定操作是双向的。所以，在视图中也可以编辑log信息，只要这样做即可：`<input ng-model="entry.log"/>`。

#### 区分数据模型层

在jQuery中，DOM有类似数据模型的意味。但是在AngularJS中，我们有一个独立的数据模型层，我们可以按照自己的想法管理它，它和视图层完全独立。对于前面例子中的数据绑定操作来说，这一点很有用，并且保持了注意点分离的原则，同时还可以引入更强的测试功能。

#### 注意点分离

以上所有一切都是为了实现这样一个远大的目标：让你的注意点保持分离。你的视图的角色是展示“官方记录”所能进行的所有操作（绝大部分）；你的数据模型用来代表你的数据；你还有一个service层用来执行可复用的任务；你进行DOM操作并把指令混入到视图中；最后你再用controller把所有东西粘到一起。

#### 依赖注入

用来帮助我们实现注意点分离的特性就是依赖注入。如果你是从服务端语言转过来的（例如从Java或者PHP），你可能对这个概念已经相当熟悉，但是如果你是一个前端仔，从jQuery转过来的，你可能会觉得这种概念很愚蠢、很多余、而且很装逼。但事实并非如此。

从大的层面上讲，DI意味着你可以自由地声明组件，然后在其它组件中，你可以请求所声明组件的实例，然后你就可以获得它。你没有必要知道加载顺序、文件路径，以及诸如此类的东西。这种概念的强大能量可能不是那么显而易见，这里我只举一个（通用的）例子：测试。

比方说在我们的应用中，根据应用的状态，我们需要通过一个REST API请求一个服务端的存储实现，以及本地的存储实现。当对我们的controller进行测试的时候，我们并不想和服务端进行通讯，毕竟我们正在测试的是_controller_而不是其它东西。我们可以仅仅添加一个虚拟的同名service作为前面所说的自定义组件，然后注射器将会保证controller能够自动获得这个虚拟的服务，我们的controller不会知道它们之间有什么不同，也没有必要知道。

关于测试再多说一点...

### 测试驱动开发---永远

这里的内容是关于架构方面的，实际上应该属于第三小节，但是这块内容极其重要，所以我把它独立成了一个单独的小节。

在你所见过、用过，或者写过的所有jQuery插件中，它们有多少个带有完整的测试用例？不是很多，因为jQuery不是太鸟这个原则。但是AngularJS非常看重这一点。

在jQuery中，唯一能够进行测试的方式通常是在一个sample/demo页面上创建独立的组件，通过这个页面我们可以进行DOM操作相关的测 试。所以，这样一来我们必须独立开发一个组件，然后再把它集成到我们的应用中去。好麻烦！在使用jQuery进行开发的时候，消耗的时间太多了，这是因为 我们选择了迭代的方式，而不是选择测试驱动开发的方式。如此一来，谁又能责怪我们呢？

但是，在AngularJS中，由于我们分离了注意点，所以我们可以用迭代的方式进行测试驱动开发！例如，比方说我们需要一个超级简单的指令，用来在菜单中显示当前的路由是什么。我们可以这样在视图中声明所需要的东西：

```
<a href="/hello" when-active>Hello</a>
```

好，现在我们来编写一个单元测试：

```
it( 'should add "active" when the route changes', inject(function() {
    var elm = $compile( '<a href="/hello" when-active>Hello</a>' )( $scope );

    $location.path('/not-matching');
    expect( elm.hasClass('active') ).toBeFalsey();

    $location.path( '/hello' );
    expect( elm.hasClass('active') ).toBeTruthy();
}));
```

我们运行这个单元测试，确认它是否会失败。然后我们再来编写指令：

```
.directive( 'whenActive', function ( $location ) {
    return {
        scope: true,
        link: function ( scope, element, attrs ) {
            scope.$on( '$routeChangeSuccess', function () {
                if ( $location.path() == element.attr( 'href' ) ) {
                    element.addClass( 'active' );
                }
                else {
                    element.removeClass( 'active' );
                }
            });
        }
    };
});
```

现在，我们的测试运行通过了，_并且_菜单的行为符合了我们的预期。这样一来，我们的开发_既是可迭代的，也是测试驱动的_。碉堡了。

### 从概念上说，指令并非打包好的jQuery

你经常会听到“只能在指令中操作DOM”之类的言论。**这是必须的**。请慎重对待这一原则。

我们再来稍微深入一点...

有一些指令只是用来装饰一下视图里面已经存在的内容（想想ngClass），有时候也会直接进行一些DOM操作，然后就没有然后了。但是，像 “widget”（小组件）这样带有模板的指令，它同样需要遵守注意点分离的原则。也就是说，模板自身同样需要保持很强的独立性，独立于link和 controller函数的具体实现。

AngularJS内置了完整的工具，让实现这一点非常容易；我们可以使用ngClass指令来动态更新CSS样式类；ngBind可以用来做双向 数据绑定；ngShow和ngHide可以以编程的方式来显示或者隐藏元素；诸如此类还有很多。我们也可以导入我们自己所编写的指令。换句话说，我们可以 实现各种绚丽的效果而不需要进行DOM操作。进行的DOM操作越少，指令测试起来就越容易、设置样式就越容易、在未来修改起来也会越容易、并且可复用性和 可分发性也会更好。

我看到很多AngularJS新手把指令当成容纳各种jQuery代码的场所。换句话说，他们的想法是：“既然我不能在控制器里面做DOM操作，那我就把DOM操作相关的代码放到指令里面好了”。这种做法确实是好一些了，但是通常还是是_错误的_。

思考一下我们在第三小节里面所编写的logger应用。即使我们把相关的操作放到了指令里面，我们还是用一种“AngularJS的方式”来实现了 它。它仍然没有做任何DOM操作！在很多情况下DOM操作是必须的，但是这种情况比你想象的要少得多！当你在应用里面的任何地方进行DOM操作之前，请问 问自己，是不是真的必须要这样做。很有可能存在更好的实现方式。

下面是一个小例子，用来说明我经常看到的一种模式。我们需要一个开关型的按钮。（注意：这个例子的代码有点装逼，并且有点冗长，只是为了用来代表更加复杂一些的例子，这些例子通常是以与此相同的方式来解决的。）

```js
.directive( 'myDirective', function () {
    return {
        template: '<a class="btn">Toggle me!</a>',
        link: function ( scope, element, attrs ) {
            var on = false;

            $(element).click( function () {
                if ( on ) {
                    $(element).removeClass( 'active' );
                }
                else {
                    $(element).addClass( 'active' );
                }

                on = !on;
            });
        }
    };
});
```

这段代码里面有很多错误的地方。

第一，jQuery从来就不是必须的。我们这里要实现的东西实际上完全不需要jQuery！

第二，即使我们已经在页面上引入了jQuery，也没有必要在这里去使用；对于没有使用jQuery的项目，我们可以简单地使用angular.element，这样一来我们的组件同样能够很好地运行。

第三，假设这里必须使用jQuery我们的指令才能运行，jqLite(angular.element)总是会自动使用jQuery，如果jQuery已经加载了话！所以我们不需要使用$，我们只要使用angular.element就可以了。

第四，与第三点类似，jqLite元素没有必要使用$来进行包装，传递给link函数的element已经是一个jQuery元素了！

还有第五点，这一点我们在前面的小节中没有提到，那就是我们为什么要把模板相关的内容混合在我们的代码逻辑里面？

以上指令可以重写成下面这样（即使对于非常复杂的情况同样可以改写！），改写之后代码极其简单：

```
.directive( 'myDirective', function () {
    return {
        scope: true,
        template: '<a class="btn" ng-class="{active: on}" ng-click="toggle()">Toggle me!</a>',
        link: function ( scope, element, attrs ) {
            scope.on = false;

            scope.toggle = function () {
                scope.on = !$scope.on;
            };
        }
    };
});
```

再说一次，模板相关的内容位于template中，所以你（或者你的用户）可以简单地切换它，从而可以满足任何必要的样式要求，同时永远不需要去修改**代码逻辑**。可复用性---嘭！

这样改写之后还会带来其它好处，比如测试---这是必须的！不管模板里面是什么内容，指令内部的API永远不需要修改，这样一来重构就非常简单了。你可以随意修改模板的内容而没有必要去理睬指令。同时无论你修改了什么内容，你的测试依然能够运行通过。

w00t!

好吧，如果指令并非jQuery函数之类的集合，那么它们是什么呢？实际上指令是**HTML扩展**。如果HTML无法做到你想实现的某件事情，你就自己编写一个指令，然后再去使用这个指令，好像它就是HTML的一部分一样。

换句话说，如果AngularJS没有内置支持某件事情，请思考一下你的团队应该怎么样去实现它，参照ngClick,ngClass等指令的做法。

### 小结

不要使用jQuery。最好不要引入它。它只会拖你的后腿。当你遇到一个问题，而这个问题你知道如何使用jQuery去解决，那么在你使用$之前， 请思考一下如何以AngularJS的方式去解决它。如果你不知道，去问别人！最好的解决方式十有八九不需要使用jQuery，如果你用jQuery的方 式来解决，最终会给你带来更多工作量。