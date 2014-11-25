---
layout: post
title: "Angular Services"
category : Angular
tags : [angular, tutorial]
--- 

本书为读 [AngularJS](http://www.salttiger.com/angularjs/) 的读书笔记，该书的例子在 [shyamseshadri/angularjs-book](https://github.com/shyamseshadri/angularjs-book)。

[AngularJS: API: service components in ng](https://docs.angularjs.org/api/ng/service)

## Services

服务是用来实现应用功能的单例对象。Angular 本身提供了很多服务，如操作浏览器地址的 `$location`，根据地址的改变来切换视图的 `$route`，和服务器通信的 `$http`。 服务可以是注册的构造函数，也可以是被 AngularJS DI 系统创建和管理的单例对象。

AngularJS 的 DI 机制要求所有的服务具有唯一的服务名。

Angular 内置的服务都是以 `$` 开头，当你定义自己的服务时，请尽量避免使用 `$` 开头。

使用服务和依赖注入，我们可以更简单地编写 controller：

```js
function ShoppingController($scope, Items) {
  $scope.items = Items.query();
}
```

那么我们什么时候应该使用service呢？答案是：无论何时，当我们需要在不同的域中共享数据的时候。另外，多亏了Angular的依赖注入系统，实现这一点是很容易并且很清晰的。

通过 `$scope` 来维护数据是非常粗暴的一种方式。由于其它 `controller`、`directive`、`model` 的影响，`$scope` 很容易就会崩溃或者变脏。它很快就会变成一团乱麻。通过一种集中的途径（在这里就是 `service`）来管理数据，然后通过某种方式来请求修改它，这样不仅仅会更加清晰，同时当应用的体积不断增大的时候也更加容易管理。

### 定义服务

服务 module 对象的 API 来定义，可以通过以下几种方法来创建服务。

#### Constants

`constant` 用来为不会改变的基本类型和对象定义服务，该服务可以在 module 对象的 `config` 方法中使用。如：

```js
angular.module('logging').constant('logging_config', {
    traceLevel: {
    _LOG_TRACE_: '_LOG_TRACE_',
    _LOG_DEBUG_: '_LOG_DEBUG_',
    _LOG_INFO_: '_LOG_INFO_',
    _LOG_WARN_: '_LOG_WARN_',
    _LOG_ERROR_: '_LOG_ERROR_',
    _LOG_FATAL_: '_LOG_FATAL_',
    }
});
```

#### Values

让 Angular 管理一个对象的最简单方式是注册一个已经实例化的对象：

`value` 方法用来定义供用户组件使用的基本类型的值或者对象类型的值。和 `constant` 定义服务的不同之处是，使用 `value` 方法的值可以被修改，而使用 `constant` 定义的不能修改。另外，使用 `value` 方法创建的服务不能再 config 阶段使用，`constant` 方法可以。 

`value` 方法另一个用处是定义 model 对象和基于 model 对象的操作，这可以让你可以重用的代码从组件中解耦，并存在于单独的文件中。这个编码模式也可以让控制器的代码尽可能薄。

以下定义了 `Brewer` 模型，以及其中的两个方法：

```js
(function() {
    'use strict';
    var Brewer = function() {
        var self = this;
        self.userName = '';
        self.firstName = '';
        self.lastName = '';
        self.email = '';
        self.location = '';
        self.bio = '';
        self.webSite = '';
        self.avatar = '';
        self.photo = '';
        self.dateJoined = '';
        self.inventory = [];
    };

    Brewer.prototype = {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        hasItemInInventory: function(value) {
            var result = false;
            if (this.inventory && this.inventory.length > 0) {
                angular.forEach(this.inventory, function(item) {
                    if (item.name === value) {
                        result = true;
                    }
                });
            }
            return result;
        }
    }
    angular.module('brew-everywhere').value('brewer', Brewer);
})();
```

当你可以把它注入控制器或者指令，并且通过 `$inject` 服务获取模型的构造函数。

```js
var myMod = angular.module('myMod', []);
myMod.value('notificationsArchive', new NotificationsArchive());
```

这种方式非常简单，无法定义服务的依赖，所以仅适用于与注册已经实例化的对象。

#### Services

`service(name, constructor())` 适用于创建无配置，只有简单逻辑的服务。Angular 使用这个方法来创建服务实例。

它提供了一个注册构造函数的方法，这个构造函数会通过 `new` 来实例化。把通过这种方法注册的服务注入到其他服务时，得到的是通过 `new` 实例化的对象，而 `value` 得到的仍然是构造函数。

假设 `NotificationsService` 服务需要依赖一个 archive 服务，那么这就不能用 Value 方法定义了。最简单的方法是通过 `service` 方法注册一个构造函数。如：

    myMod.service('notificationsService', NotificationsService);

`NotificationsService` 构造函数依赖其他服务，如：

```js
var NotificationsService = function (notificationsArchive) {
    this.notificationsArchive = notificationsArchive;
};
```

通过使用依赖注入，我们可以从 `NoficiationsService`  构造函数中消除 `new` 关键字。现在这个服务不用关心依赖的实例化，并且可以接受任何 archiving 服务。

实际上，`service` 方法不常用，主要用于注册已经存在的构造函数，从而让 AngularJS 能够管理这些构造函数创建出来的对象。

#### Factories

`factory(name, $getFunction())` 适用于创建无配置，具有复杂逻辑的服务。如果你使用 type/class 定义服务，而且也不需要在模型的 `config` 方法中配置，这是你就可以使用 `factory` 方法。

`factory` 方法等效于 `provider(name, { $get: $getFunction() } )`，可以返回任意合法的 JavaScript 对象，包括 `function` 对象。

如：

```js
myMod.factory('notificationsService',function(notificationsArchive){

    var MAX_LEN = 10;
    var notifications = [];

    return {
      push:function (notification) {
        var notificationToArchive;
        var newLen = notifications.unshift(notification);

        //push method can rely on the closure scope now!
        if (newLen > MAX_LEN) {
          notificationToArchive = this.notifications.pop();
          notificationsArchive.archive(notificationToArchive);
        }
      }
      // other methods of the NotificationsService
    };
```

`factory` 方法是把对象注入到 AngularJS DI 系统最常用的方式。这种方式很灵活，并且可以包含复杂的逻辑。因为放到服务实例的工厂只是普通的函数，所以我们可以利用词法作用域来模拟私有变量。如上例中，`MAX_LEN` 和 `notifications` 都是私有变量。

#### Provider

以上所有的注册方法都是 `provider` 方法的特殊案例。 `provider(name, Object OR constructor())` 适用于创建可配置的具有复杂逻辑的服务。

首先，`provider` 是返回包含 `$get` 属性的对象的方法，`$get` 是返回 `service` 实例的方法。我们可以认为 providers 是把工厂方法嵌入在 `$get` 属性中的对象。

其次，`provider` 函数中返回的对象可以有其他方法和属性。这些方法和属性被暴露出去，所以可以在 `$get` 工厂方法调用之前设置配置选项。 

如：

```js
myMod.provider('notificationsService', function () {
    var config = {
      maxLen : 10
    };
    var notifications = [];

    return {
      setMaxLen : function(maxLen) {
        config.maxLen = maxLen || config.maxLen;
      },

      $get : function(notificationsArchive) {
        return {
          push:function (notification) {
            …
            if (newLen > config.maxLen) {
              …
            }
          },
          // other methods go here
        };
      }
    };
  });
```

在配置阶段，可以通过以下方式来调用 `setMaxLen` 等配置方法：

```js
myMode.config(function(notificationsServiceProvider){
     notificationsServiceProvider.setMaxLen(100);
});
```

### Service 跨模块可见性

定义在相邻模块的服务对彼此也是可见的。比如下例中，我们可以把 `car` 服务移动到单独的模块中，然后改变模块的依赖，使应用同时依赖 `engines` and `cars`： 

```js
angular.module('app', ['engines', 'cars'])

angular.module('cars', [])
  .factory('car', function ($log, dieselEngine) {
    return {
      start: function() {
        $log.info('Starting ' + dieselEngine.type);
      }
    };
  });

angular.module('engines', [])
  .factory('dieselEngine', function () {
    return {
      type: 'diesel'
    };
  });
```

在一个 AnuglarJS 应用中服务的名字都不能相同。靠近应用模块的服务将覆盖其他子模块的同名服务。

```js
angular.module('app', ['engines', 'cars'])
  .controller('AppCtrl', function ($scope, car) {
    car.start();
  });

angular.module('cars', [])
  .factory('car', function ($log, dieselEngine) {
    return {
      start: function() {
        $log.info('Starting ' + dieselEngine.type);
      };
    }
  })

  .factory('dieselEngine', function () {
    return {
      type: 'custom diesel'
    };
  });
```

在上例中，`car` 服务被注入 `dieselEngine` 服务，`dieselEngine` 服务和 `car` 服务在同一个模块中。`car` 模块中的 `dieselEngine` 服务将覆盖 `engines` 模块中 `dieselEngine` 服务。

## Modules lifecycle

对象创建的 `provider` 方法可以在创建对象实例之前可以进行一些配置。为了支持这个功能，AngularJS 可以把模块的生命周期划分为两个阶段，分别是配置阶段和运行阶段。

总结一下服务中创建对象的不同方法和这些方法对应模块的生命周期的阶段：

&nbsp; | 注册的内容 | 配置阶段可注入 | 运行阶段可注入
---------- | ------------------ | --------- | --------
Constant   | Constant's value  | Yes  | Yes
Variable   | Variable's value   | -  | Yes
Service  | A new object created by a constructor function      | -  | Yes
Factory  | A new object returned from a `factory` function     | -  | Yes
Provider | A new object created by the `$get` factory function | Yes| -  

## Controller

Controllers 在你的应用中有三个职责：

* 初始化应用的模型。
* 通过 `$scope` 暴露模型和方法到 views (UI template)。
* 监视模型的变化并作出响应。

千万不要在 AngularJS 控制器中操作 DOM 元素。在控制器中获取一个 DOM 的引用，并操作 DOM 的属性，是在用命令式的方式控制UI -- 这是跟 AugularJS 构建 UI 的思想相悖的。

Controller 应该纯粹地用来把 service、依赖关系、以及其它对象串联到一起，然后通过 scope 把它们关联到 view 上。如果在你的视图里面需要处理复杂的业务逻辑，那么把它们放到 controller 里面也是一个非常不错的选择。

在 Angular 中，controller 自身并不会处理 "request"，除非它是用来处理路由(route)的（很多人把这种方式叫做创建 _route controller_ ，路由控制器）。

通过 `ng-controller` 指令为 DOM 元素指定控制器时，控制器的实例个数和 `ng-controller` 相同。

## Common AngularJS Services

### $resource

Let's look another example:

    // This file is app/scripts/services/services.js
    var services = angular.module('guthub.services', ['ngResource']);

    services.factory('Recipe', ['$resource',
        function($resource) {
      return $resource('/recipes/:id', {id: '@id'});
    }]);

There is a recipe service, which returns what we call an Angular Resource. With just that single line of code—return `$resource`—(and of course, a dependency on the guthub.services module), we can now put recipe as an argument in any of our controllers, and it will be injected into the controller. Furthermore, each recipe object has the following methods built in:

<!--more-->

1. Recipe.get()
1. Recipe.save()
1. Recipe.query()
1. Recipe.remove()
1. Recipe.delete()

If you are going to use Recipe.delete, and want your application to work in IE, you will have to call it like so: `Recipe[delete]()`. This is because delete is a keyword in IE.

The line of code that declares the resource—return `$resource`—also does a few more nice things for us:

1. Notice the `:id` in the URL specified for the RESTful resource. It basically says that when you make any query (say, `Recipe.get()`), if you pass in an object with an id field, then the value of that field will be added to the end of the URL.

    That is, calling `Recipe.get({id: 15})` will make a call to _/recipe/15_ .

2. What about that second object? The `{id: @id}`? Well, as they say, a line of code is worth a thousand explanations, so let’s take a simple example.

    Say we have a recipe object, which has the necessary information already stored within it, including an id.

    Then, we can save it by simply doing the following:

          // Assuming existingRecipeObj has all the necessary fields,
          // including id (say 13)
          var recipe = new Recipe(existingRecipeObj);
          recipe.$save();

    This will make a POST request to _/recipe/13_ . The `@id` tells it to pick the `id` field from its object and use that as the `id` parameter. It’s an added convenience that can save a few lines of code.

#### Changing Views with Routes and $location

We’re building an email app that will easily win out over Gmail, Hotmail, and all the others. We’ll call it…A-Mail.

index.html

```html
<html ng-app="AMail">
  <head>
    <script src="src/angular.js"></script>
    <script src="src/controllers.js"></script>
  </head>
  <body>
    <h1>A-Mail</h1>
    <div ng-view></div>
  </body>
</html>
```

As our view templates will be inserted into the shell we just created, we can write them as partial HTML documents. For the email list, we’ll use `ng-repeat` to iterate through a list of messages and render them into a table.
list.html

```html
<table>
  <tr>
    <td><strong>Sender</strong></td>
    <td><strong>Subject</strong></td>
    <td><strong>Date</strong></td>
  </tr>
  <tr ng-repeat='message in messages'>
    <td>{{message.sender}}</td>
    <td><a href='#/view/{{message.id}}'>{{message.subject}}</td>
    <td>{{message.date}}</td>
  </tr>
</table>
```

To create this message detail view, we’ll create a template that displays properties from a single message object.

detail.html

```
<div><strong>Subject:</strong> {{message.subject}}</div>
<div><strong>Sender:</strong> {{message.sender}}</div>
<div><strong>Date:</strong> {{message.date}}</div>
<div>
    <strong>To:</strong>
    <span ng-repeat='recipient in message.recipients'>{{recipient}} </span>
<div>{{message.message}}</div>
<a href='#/'>Back to message list</a>
```

Now, to associate these templates with some controllers, we’ll configure the `$routeProvider` with the URLs that invoke our controllers and templates.

controllers.js

```js
// Create a module for our core AMail services
var aMailServices = angular.module('AMail', []);

// Set up our mappings between URLs, templates, and controllers
function emailRouteConfig($routeProvider) {
  $routeProvider.
  when('/', {
    controller: ListController,
    templateUrl: 'list.html'
  }).
  // Notice that for the detail view, we specify a parameterized URL component
  // by placing a colon in front of the id
  when('/view/:id', {
    controller: DetailController,
    templateUrl: 'detail.html'
  }).
  otherwise({
    redirectTo: '/'
  });
}

// Set up our route so the AMail service can find it
aMailServices.config(emailRouteConfig);

// Some fake emails
messages = [{
  id: 0, sender: 'jean@somecompany.com', subject: 'Hi there, old friend',
  date: 'Dec 7, 2013 12:32:00', recipients: ['greg@somecompany.com'],
  message: 'Hey, we should get together for lunch sometime and catch up.'
  +'There are many things we should collaborate on this year.'
}, ...];

// Publish our messages for the list template
function ListController($scope) {
  $scope.messages = messages;
}

// Get the message id from the route (parsed from the URL) and use it to
// find the right message object.
function DetailController($scope, $routeParams) {
  $scope.message = messages[$routeParams.id];
}
```

We’ve created the basic structure for an app with many views. We switch views by changing the URL. This means that the forward and back buttons just work for users. Users are able to bookmark and email links to views within the app, even though there is only one real HTML page.

### $location

Let’s consider a small example of how you would use the `$location` service in a real-world application. Consider a case where we have a datepicker, and when a date is selected, the app navigates to a certain URL. Let us take a look at how that might look:

    // Assume that the datepicker calls $scope.dateSelected with the date
    $scope.dateSelected = function(dateTxt) {
      $location.path('/filteredResults?startDate=' + dateTxt);
      // If this were being done in the callback for
      // an external library, like jQuery, then we would have to
      $scope.$apply();
    };

Let us take a look at how the `$location` service would behave, if the URL in the browser was `http://www.host.com/base/index.html#!/path?param1=value1#hashValue`.

Getter Function |Getter Value | Setter Function
----------------|--------------|--------------
absUrl()|http://www.host.com/base/index.html#!/path?param1=value1#hashValue |N/A
hash() |hashValue |hash('newHash') 
host()|www.host.com |N/A 
path() |/path path('/newPath')
protocol() |http |N/A 
search() |{'a’: ‘b'} |search({'c’: ‘def'})
url() |/path?param1=value1?hashValue |url('/newPath?p2=v2') ### Model

Note that the `search()` setter has a few modes of operation:

* Calling `search(searchObj)` with an object<string, string> basically denotes all the parameters and their values
* Calling `search(string)` will set the URL params as q=String directly in the URL
* Calling `search(param, value)` with a string and value sets (or calling with null removes) a particular search parameter in the URL.

Here are four quick tips about when (and how) to call `$apply`.

* **DO NOT** call it all the time. Calling `$apply` when AngularJS is happily ticking away (in its `$digest` cycle, as we call it) will cause an exception. So “better safe than sorry” is not the approach you want to use.
* **DO CALL** it when controls outside of AngularJS (DOM events, external callbacks such as jQuery UI controls, and so on) are calling AngularJS functions. At that point, you want to tell AngularJS to update itself (the models, the views, and so on), and `$apply` does just that.
* Whenever possible, execute your code or function by passing it to `$apply`, rather than executing the function and then calling `$apply()`. For example, execute the following code:

E.g

```js
$scope.$apply(function() {
  $scope.variable1 = 'some value';
  executeSomeAction();
});
```

instead of the following:

```js
$scope.variable1 = 'some value';
executeSomeAction();
$scope.$apply();
```

While both of these will have the same effect, they differ in one significant way.

The first will capture any errors that happen when `executeSomeAction` is called, while the latter will quietly ignore any such errors. You will get error notifications from AngularJS only when you do the first.

Consider using something like [safeApply](https://coderwall.com/p/ngisma):

```js
{%raw%}
$scope.safeApply = function(fn) {
  var phase = this.$root.$$phase;
  if(phase == '$apply' || phase == '$digest') {
    if(fn && (typeof(fn) === 'function')) {
      fn();
    }
  } else {
    this.$apply(fn);
  }
};
{%endraw%}
```

#### HTML5 Mode and Hashbang Mode

The `$location` service can be configured using the `$locationProvider` (which can be injected, just like everything else in AngularJS). Of particular interest are two properties on this provider, which are:

- html5Mode

    A boolean value which dictates whether the `$location` service works in HTML5 mode or not

- hashPrefix

    A string value (actually a single character) that is used as the prefix for Hashbang URLs (in Hashbang mode or legacy browsers in HTML5 mode). By default it is empty, so Angular’s hash is just `''`. If the hashPrefix is set to ‘!’, then Angular uses what we call Hashbang URLs (! followed by the url).

You might ask, just what are these modes? Well, pretend that you have this super awesome website at _www.superawesomewebsite.com_ that uses AngularJS.

Let’s say you have a particular route (with some parameters and a hash), such as _/foo?bar=123#baz_ .

In normal Hashbang mode (with the hashPrefix set to ‘!’), or in legacy browsers without HTML5 mode support, your URL would look something like:

    http://www.superawesomewebsite.com/#!/foo?bar=123#baz

While in HTML5 mode, the URL would simply look like this:

    http://www.superawesomewebsite.com/foo?bar=123#baz

In both cases, `location.path()` would be `/foo`, `location.search()` would be `bar=123`, and `location.hash()` would be `baz`. So if that is the case, why wouldn’t you want to use the HTML5 mode?

The Hashbang approach works seamlessly across all browsers, and requires the least amount of configuration. You just need to set the hashBang prefix (! by default) and you are good to go.

The HTML5 mode, on the other hand, talks to the browser URL through the use of HTML5 History API. The `$location` service is smart enough to figure out whether HTML5 mode is supported or not, and fall back to the Hashbang approach if necessary, so you don’t need to worry about additional work. But you do have to take care of the following.

#### Server-side configuration

Because HTML5 links look like any other URL on your application, you need to take care on the server side to route all links within your app to your main HTML (most likely, the _index.html_ ). For example, if your app is the landing page for _superawesomewebsite.com_ , and you have a route _/amazing?who=me_ in your app, then the URL that the browser would show is _http://www.superawesomewebsite.com/amazing?who=me+_ .

When you browse through your app, this will be fine, as the HTML5 History API kicks in and takes care of things. But if you try to browse directly to this URL, your server will look at you as if you have gone crazy, as there is no such known resource on its side. So you would have to ensure that all requests to _/amazing_ get redirected to _/index.html#!/amazing_ .

AngularJS will kick in from that point onward and take care of things. It will detect changes to the path and redirect to the correct AngularJS routes that were defined.

__Link rewriting__

You can easily specify URLs as follows:

    <a href="/some?foo=bar">link</a>

Depending on whether you are using HTML5 mode or not, AngularJS will take care to redirect to _/some?foo=bar_ or _index.html#!/some?foo=bar_ , respectively. No additional steps are required on your part. Awesome, isn’t it?

But the following types of links will not be rewritten, and the browser will perform a full reload on the page:

1. Links that contain a target element such as the following:

        <a href="/some/link" target="_self">link</a>

2. Absolute links going to a different domain:

        <a href="http://www.angularjs.org">link</a>

    This is different because it is an absolute URL, while the previous example used the existing base URL.

3. Links starting with a different base path when one is already defined:

        <a href="/some-other-base/link">link</a>

__Relative Links__

Be sure to check all relative links, images, scripts, and so on. You must either specify the URL base in the head of your main HTML file (`<base href="/my-base">`), or you must use absolute URLs (starting with `/`) everywhere because relative URLs will be resolved to absolute URLs using the initial absolute URL of the document, which is often different from the root of the application.

Running Angular apps with the History API enabled from document root is strongly encouraged, as it takes care of all relative link issues.

### $http

```js
function ShoppingController($scope, $http) {
  $http.get('/products').success(function(data, status, headers, config) {
    $scope.items = data;
  });
}
```

#### Communicating Over $http

Angular’s core `$http` service would look something like the following:

```js
$http.get('api/user', {params: {id: '5'}
}).success(function(data, status, headers, config) {
 // Do something successful.
}).error(function(data, status, headers, config) {
 // Handle the error
});
```

The `$http.get` method we used in the preceding example is just one of the many convenience methods that the core `$http` AngularJS service provides. Similarly, if you wanted to make a POST request using AngularJS with the same URL parameters and some POST data, you would do so as follows:

```js
var postData = {text: 'long blob of text'};
  // The next line gets appended to the URL as params
  // so it would become a post request to /api/user?id=5
var config = {params: {id: '5'}};
$http.post('api/user', postData, config)
    .success(function(data, status, headers, config) {
    // Do something successful
    }).error(function(data, status, headers, config) {
    // Handle the error
    });
```

Similar convenience methods are provided for most of the common request types, including:

* GET
* HEAD
* POST
* DELETE
* PUT
* JSONP

#### Configuring Your Request Further

At times, the standard request options provided out of the box are not enough. This could be because you want to:

* Add some authorization headers for your request
* Change how caching is handled for the request
* Transform the request going out, or the response coming in, in certain set ways

The barebones method call would look something like:

    $http(config)

What follows is a basic pseudo-code template for calling this method:

```js
$http({
  method: string,
  url: string,
  params: object,
  data: string or object,
  headers: object,
  transformRequest: function transform(data, headersGetter) or
                    an array of functions,
  transformResponse: function transform(data, headersGetter) or
                     an array of functions,
  cache: boolean or Cache object,
  timeout: number,
  withCredentials: boolean
});
```

The GET, POST, and other convenience methods set the method, so you don’t need to. 

#### Setting HTTP Headers

These are set in the $httpProvider.defaults.headers configuration object. This step is usually done in the config part of setting up your app. So if you wanted to enable “DO NOT TRACK” for all your GET requests, while removing the Requested-With header for all your requests, you could simply do the following:

    angular.module('MyApp',[]).
      config(function($httpProvider) {
        // Remove the default AngularJS X-Request-With header
        delete $httpProvider.default.headers.common['X-Requested-With'];
        // Set DO NOT TRACK for all Get requests
        $httpProvider.default.headers.get['DNT'] = '1';
     });

If you want to set the headers for only certain requests, but not as a default, then you can pass the `header` in as part of the config object to `$http` service. The same custom header can be passed to a GET request as part of the second parameter, which also takes your URL parameters:

    $http.get('api/user', {
       // Set the Authorization header. In an actual app, you would get the auth
       // token from a service
       headers: {'Authorization': 'Basic Qzsda231231'},
       params: {id: 5}
    }).success(function() { // Handle success });

#### Working with RESTful Resources

The `ngResource` is a separate, optional module. To use it, you need to:

* Include the _angular-resource.js_ in your script files that are sourced.
* Include `ngResource` in your module dependency declaration (such as, `angular.module(‘myModule’, [‘ngResource’])`).
* Use inject `$resource` where needed.

E.g.

    myAppModule.factory('CreditCard', ['$resource', function($resource) {
      return $resource('/user/:userId/card/:cardId',
            {userId: 123, cardId: '@id'},
            {charge: {method:'POST', params:{charge:true}, isArray:false});
    }]);

Declaring your own `$resource` is as simple as calling the injected `$resource` function (you know how to inject things by now, right?) with the right parameters.

The `$resource` function takes one required argument—the URL at which the resource is available—and two optional arguments: default parameters and additional actions you want to configure on the resource.

Notice that the URL parameter is parametrized (the `:` denotes a parameter. The `:userId` states that the `userId` parameter will replace the text there, and the `:cardId` will be replaced by the value of the `cardId` parameter). If the parameter is not passed, then it will be replaced by an empty string.

The second parameter takes care of the default parameters to be passed along with each request. In this case, we pass in the `userId` as a constant 123. The `cardId` parameter is more interesting. We say `cardId` is "@id.” This denotes that if I am using a returned object from the server, and I call any method on it (such as `$save`), then the `cardId` field is to be picked from the `id` property on the object.

The third argument to the `$resource` call is optional additional methods you want to expose on your resource.

In this case, we specify a method `charge`. This can be configured by passing in an object, with the key being the method name to be exposed. The configuration needs to specify the method type of the request (GET, POST, and so on), the `parameters` that need to be passed as part of that request (`charge=true` in this case), and if the returned result is an array or not (not, in this case). Once that is done, you are free to start calling CreditCard.charge() whenever you want (as long as the user has charged in real life, of course!).

Now, whenever we ask for a CreditCard from the AngularJS injector, we get an Angular resource, which by default gives us a few methods to start off with:

Resource Function  | Method | URL Expected |Return
-------------------|--------|--------------|------------
CreditCard.get({id: 11})   | GET| /user/123/card/11 |Single JSON
CreditCard.save({}, ccard) |POST |/user/123/card with post data “ccard” |Single JSON 
CreditCard.save({id: 11}, ccard) |POST| /user/123/card/11 with post data “ccard” |Single JSON 
CreditCard.query() |GET| /user/123/card |JSON Array
CreditCard.remove({id: 11})| DELETE |/user/123/card/11 |Single JSON
CreditCard.delete({id: 11}) |DELETE| /user/123/card/11 |Single JSON

Let’s take the example of a credit card, which should make things clearer.

```js
// Let us assume that the CreditCard service is injected here

// We can retrieve a collection from the server which makes the request
// GET: /user/123/card
var cards = CreditCard.query();
```

Take a look at the `CreditCard.query()` call again. You will see that instead of assigning the cards in a callback, we are directly assigning them to the card’s variable.

You would be correct to worry about whether the code will work, but the code is actually correct and will work. What’s happening here is that AngularJS assigned a reference (an object or an array, depending on the expected return type), which will get populated at some point in the future when the server requests returns. In the meantime, the object will remain empty.

Since the most common flow with AngularJS apps is to fetch data from the server, assign it to a variable, and display it in the template, this shortcut is nice. In your controller code, all you have to do is make the server-side call, assign the return value to the right scope variable, and let the template worry about rendering it when it returns.

This approach will not work for you if you have some business logic you want executed on the return value. In such a case, you will have to depend on the callback, which is used in the `CreditCard.get()` call.

```js
// We can get a single card, and work with it from the callback as well
CreditCard.get({cardId: 456}, function(card) {
 // each item is an instance of CreditCard
 expect(card instanceof CreditCard).toEqual(true);
 card.name = "J. Smith";
 // non-GET methods are mapped onto the instances
 card.$save();

 // our custom method is mapped as well.
 card.$charge({amount:9.99});
 // Makes a POST: /user/123/card/456?amount=9.99&charge=true
 // with data {id:456, number:'1234', name:'J. Smith'}
});
```

Regardless of whether you use the shortcut return type or the callback, there are some other points you should note about the returned object.

The return value is not a plain old JS object, but in fact a “resource” type object. This means that in addition to the value returned by the server, it has some additional behavior attached to it (the `$save()` and `$charge()` in this case). This allows you to perform server-side operations with ease, for example by fetching data, making some changes, and persisting the changes to the server (the most common behavior in any CRUD app).

## Library

- [mbertolacci/angular-service-utilities](https://github.com/mbertolacci/angular-service-utilities) AngularJS utilities for bringing two-way data binding into services, plus some other goodies.