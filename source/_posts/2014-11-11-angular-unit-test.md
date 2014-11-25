---
layout: post
title: "Angular Unit Test"
category: Grunt
tags: [angular, test]
--- 

See 电子书 [AngularJS: Up and Running](http://www.salttiger.com/angularjs-up-and-running/)

AngularJS 采用 Jasmine 作为它的测试框架，而且 AngularJS 为 Jasmine 提供了几个有用的扩展，让测试更加简单。

测试 AngularJS 对象和测试其他普通的 JavaScript 类没有多大区别，特殊之处在于它的 DI 系统和应用到单元测试中的方式。

所有测试相关的扩展和模拟对象都发布在一个分离的文件 [`angular-mocks.js` ](https://github.com/angular/bower-angular-mocks) 中。在 test runner 中不要忘记包含这个脚本，同时，不要在应用的发布版本中不要包含这个脚本。

<!--more-->

## 测试服务

假设有如下服务：

```js
angular.module('archive', [])
  .factory('notificationsArchive', function () {

    var archivedNotifications = [];
    return {
      archive:function (notification) {
        archivedNotifications.push(notification);
      },
      getArchived:function () {
        return archivedNotifications;
      }};
  }); 
```

相应的测试代码为:

```js
describe('notifications archive tests', function () {

  var notificationsArchive;
  // Instantiate a new version of my module before each test
  beforeEach(module('archive'));
  beforeEach(inject(function (_notificationsArchive_) {
    notificationsArchive = _notificationsArchive_;
  }));

  it('should give access to the archived items', function () {
    var notification = {msg: 'Old message.'};
    notificationsArchive.archive(notification);

    expect(notificationsArchive.getArchived())
      .toContain(notification);
  });
});
```

除了多了两个新的函数，`module` and `inject`，其他和 Jasmine 测试的结构类似。

- `module` 用来初始化模块。这个方法的功能类似于 `ng-app`  指定，指示要为指定的模块创建好 `$injector`，模块中的服务应该准备好。
    你可以在一个测试用例中，调用多次 `module` 方法，之后，所有模块中的 service、value 和 constant 都可以通过 `$injector` 获取。

- `inject` 注入服务。

        var notificationsArchive;
        beforeEach(inject(function (_notificationsArchive_) {
          notificationsArchive = _notificationsArchive_;
        }));

    我们这里使用带有头尾下划线对的服务名称来注入相应的服务。这是因为 `$injector` 会先剥去收尾的下划线对，然后使用服务名来接受注入的服务。这是很有用的小窍门，因为我们可以保存没有下划线的服务变量。

### 模拟服务

我们了 AngularJS 模拟文件提供的 `$location` 和 `$window` 的模拟版本。让我们考虑以下例子：

```js
angular.module('notesApp1', [])
    .factory('ItemService', [function() {
        var items = [{
            id: 1,
            label: 'Item 0'
        }, {
            id: 2,
            label: 'Item 1'
        }];
        return {
            list: function() {
                return items;
            },
            add: function(item) {
                items.push(item);
            }
        };
    }])
    .controller('ItemCtrl', ['ItemService', function(ItemService) {
        var self = this;
        self.items = ItemService.list();
    }]);
```

我们有两种方法来覆盖 `ItemService` 的默认实现：

第一种方法是使用内联的模拟服务：

```js
describe('ItemCtrl with inline mock', function() {
    beforeEach(module('notesApp1'));
    var ctrl, mockService;
    beforeEach(module(function($provide) {
        mockService = {
            list: function() {
                return [{
                    id: 1,
                    label: 'Mock'
                }];
            }
        };
        $provide.value('ItemService', mockService);
    }));
    beforeEach(inject(function($controller) {
        ctrl = $controller('ItemCtrl');
    }));
    it('should load mocked out items', function() {
        expect(ctrl.items).toEqual([{
            id: 1,
            label: 'Mock'
        }]);
    });
});
```

我们这里调用 `module` 函数是，传入的不是模块名称，而是注入 `$provide` 服务的函数。这个 provider 和之前加载的模块共享命名空间，所以你可以创建我们的虚拟服务，然后通过 `$provide.value` 覆盖原来的 `ItemService` 定义。

第二种覆盖服务的方式是使用全局方式，而非单元测试级别。使用全局方式还是局部方式，取决于你是否想让这个虚拟服务被其他单元测试重用。

```js
angular.module('notesApp1Mocks', [])
    .factory('ItemService', [function() {
        return {
            list: function() {
                return [{
                    id: 1,
                    label: 'Mock'
                }];
            }
        };
    }]);
```

我们在另一个模块中编写了同名的服务，这个文件位于 test 文件夹下，并且包含在 `karma.conf.js` 文件中：

```js
describe('ItemCtrl With global mock', function() {
    var ctrl;
    beforeEach(module('notesApp1'));
    beforeEach(module('notesApp1Mocks'));
    beforeEach(inject(function($controller) {
        ctrl = $controller('ItemCtrl');
    }));
    it('should load mocked out items', function() {
        expect(ctrl.items).toEqual([{
            id: 1,
            label: 'Mock'
        }]);
    });
});
```

`notesApp1Mocks` 需要在 `notesApp1` 之后加载。

### Spies

如果你不想实现整个虚拟服务，而只想知道 `ItemService` 中 `list` 方法是否被调用了，不想知道 `list` 的返回值，只是，我们可以使用 Jasmine spies。Spies 让我们钩进某否函数，并检查函数是否被调用，调用了多少次，调用差数等。

以下是使用 Spies 的示例：

```js
describe('ItemCtrl with spies', function() {
    beforeEach(module('notesApp1'));
    var ctrl, itemService;
    beforeEach(inject(function($controller, ItemService) {
        spyOn(ItemService, 'list').andCallThrough();
        itemService = ItemService;
        ctrl = $controller('ItemCtrl');
    }));
    it('should load mocked out items', function() {
        expect(itemService.list).toHaveBeenCalled();
        expect(itemService.list.callCount).toEqual(1);
        expect(ctrl.items).toEqual([{
            id: 1,
            label: 'Item 0'
        }, {
            id: 2,
            label: 'Item 1'
        }]);
    });
});
```

我们通过调用 `andCallThrough` 让这个 Spy 继续调用实际的服务方法。这使 Jasmine 不仅可以检查方法是否被调用，还可以让它监视的函数运行。

假如你不想让已有的方法按照正常的方式执行呢？

```js
describe('ItemCtrl with SpyReturn', function() {
    beforeEach(module('notesApp1'));
    var ctrl, itemService;
    beforeEach(inject(function($controller, ItemService) {
        spyOn(ItemService, 'list')
            .andReturn([{
                id: 1,
                label: 'Mock'
            }]);
        itemService = ItemService;
        ctrl = $controller('ItemCtrl');
    }));
    it('should load mocked out items', function() {
        expect(itemService.list).toHaveBeenCalled();
        expect(itemService.list.callCount).toEqual(1);
        expect(ctrl.items).toEqual([{
            id: 1,
            label: 'Mock'
        }]);
    });
});
```

我们使用 Jasmine spy 替换了 `ItemService` 中的 `list` 方法，并且通过 `andReturn` 修改了 `list` 函数的返回值。

### 单元测试服务器调用

在 Angular 中，只要在 Karma 配置中包含了 _angular-mocks.js_ 文件，AngularJS 就让调用 `$httpservice` 时，并不真正发生服务器调用。所有的服务器调用都叫被拦截，让我们可以在单元测试上下文中测试，所有我们的单元测试也会更快更稳定。

让我们使用 `$http` 来编写服务器调用：

```js
angular.module('serverApp', [])
    .controller('MainCtrl', ['$http', function($http) {
        var self = this;
        self.items = [];
        self.errorMessage = '';
        $http.get('/api/note').then(function(response) {
            self.items = response.data;
        }, function(errResponse) {
            self.errorMessage = errResponse.data.msg;
        });
    }]);
```

测试代码如下：

```js
describe('MainCtrl Server Calls', function() {
    beforeEach(module('serverApp'));
    var ctrl, mockBackend;
    beforeEach(inject(function($controller, $httpBackend) {
        mockBackend = $httpBackend;
        mockBackend.expectGET('/api/note')
            .respond([{
                id: 1,
                label: 'Mock'
            }]);
        ctrl = $controller('MainCtrl');
        // At this point, a server request will have been made
    }));
    it('should load items from server', function() {
        // Initially, before the server responds,
        // the items should be empty
        expect(ctrl.items).toEqual([]);
        // Simulate a server response
        mockBackend.flush();
        expect(ctrl.items).toEqual([{
            id: 1,
            label: 'Mock'
        }]);
    });
    
    afterEach(function() {
        // Ensure that all expects set on the $httpBackend
        // were actually called
        mockBackend.verifyNoOutstandingExpectation();
        // Ensure that all requests to the server
        // have actually responded (using flush())
        mockBackend.verifyNoOutstandingRequest();
    });
});
```

To unit test our controller that makes XHR calls, we leverage a service called `$httpBack` end. The  `$httpservice` internally uses the  `$httpBackend` to make the actual XHR requests. The _angular-mocks.js_ file provides a mock `$httpBackend` service that prevents server calls, and gives us hooks to set expectations and trigger responses.

As part of `beforeEach`, we ask for the `$httpBackend` service to be injected into the test. Because our controller makes a server call as part of the loading behavior, it is important for us to set our expectations on what server calls will be made before the controller is instantiated.

There are two ways to set expectations on what server calls will be made on the `$httpBackend`:

- `expect` The `expect` function is used when we want to control exactly how many requests will be made and to what URLs, and then control the response. The  `expect`  function has a series of functions, one for each method of HTTP, such as  `expectGET`  or `expectPOST`. The first argument to the function is the URL and the second argument, if provided, acts as the POST data. So `expectGET('/api/notes')` in the previous example says that there will be a GET request to the given URL. Similarly, `expectPOST('/api/notes', {label: 'Hi'})` tells the service to expect a POST request, and that the POST data should exactly match what is passed as the second argument. 

- `when` Similar to `expect`,  `when` also takes a URL and potential POST data. The syntax is also exactly the same. The difference is that the `when` does not care about the order of requests or how many times the call was made. It simply sees a request and sends a response. With the `expect`, a test can fail if the expectation was not satisfied. With `when`, even if the test never makes the call, the test will pass.

The difference really comes down to the fact that `expect` is more fine-grained and sets expectations.  `when` stubs out the backend (a stub is something that returns the same response, regardless of the request), allowing it to respond in a consistent manner without any expectations for any and all requests. 

After we use either `expect`(like  `expectGET`) or  `when`, we can define the response for that particular server call by chaining the `respond` function on it. If `respond` is given one argument, it is treated as the server response. You can optionally give it two arguments, in which case the first argument will be the status code, and the second argument will be the body of the response (like `respond(404, {msg: 'Invalid'})`). In our example, we respond with a list of items from the server. 

Now, on to our actual unit test. When the controller loads, the `items` array is initialized to an empty array. Our first expectation in the test is whether the itemsarray is empty. If we consider a server request in a real live application, a request is made first, and then the response comes back at some later point in time. The server requests are asynchro‐ nous in nature. To simulate this, AngularJS gives a `flush` method on the backend service. So by default, when a server request happens, AngularJS tracks it against the expectations and holds on to the request without returning the response. Then, when you as a developer finally call `flush()` on the `$httpBackend`, AngularJS sends back the responses for all the requests that the client has received so far.

flush allows us to test asynchronous behavior without actually writing asynchronous tests. `$httpBackend.flush()` also takes an integer argument, which can tell the mock backend how many server requests it needs to return. This is useful if we want to check that the controller makes four server calls, but does some work only after at least three of them return. In such a case, we can flush the requests one at a time (using `$httpBackend.flush(1)`), or flush three of them (`$httpBackend.flush(3)`) at once. At this point, now we can check whether the data that the server responded with has been stored in the right variable in the controller (the `items` array). As a good practice, it is recommendedthat when you write tests using the  `$httpBackend` service, you add an `afterEach` block with the two function calls in the previous code snippet:

- The first function,  `verifyNoOutstandingExpectations()`, checks whether you specified any expects on the `$httpBackend` that were not satisfied as part of your test. So if you added another expectation but the controller never made that server call, your test fails. This adds a good check to ensure that everything that you ex‐ pected actually happened 
- The second function, `verifyNoOutstandingRequests()`, is to ensure that you fully tested all the cases. As mentioned earlier, AngularJS splits all server requests into a request and a response. And we trigger the responses using the `flush()` function. `verifyNoOutstandingRequests` ensures that for each server call made, the response has also been triggered using `flush(`). If not, the test fails.

### Integration-Level Unit Tests

What if we followed the best practices, and didn’t have our  `$http` calls right in our controller? Instead, we had our `$http` calls in a `NoteService`, and our controller delegated the `NoteService` to fetch the list of notes. In such a case, we have two options: 

- Option 1 is to write a focused unit test and mock out (or spy on) the  `NoteService`, and ensure that our controller delegates to the correct APIs on the `NoteService` and that the flow and arguments are correct. 
- Option 2 is to write an integration-level unit test that only focuses on mocking out the backend (using `$httpBackend`) and checking the entire flow.

Let’s try our hand at Option 2 with the following code snippet:

```js
angular.module('serverApp2', [])
    .controller('MainCtrl', ['NoteService', function(NoteService) {
        var self = this;
        self.items = [];
        self.errorMessage = '';
        NoteService.query().then(function(response) {
            self.items = response.data;
        }, function(errResponse) {
            self.errorMessage = errResponse.data.msg;
        });
    }])
    .factory('NoteService', ['$http', function($http) {
        return {
            query: function() {
                return $http.get('/api/note');
            }
        };
    }]);
```

This example is almost the same as the one in the previous section, except that the  `$http` call has been extracted into the  `NoteService` service. Functionally, it behaves exactly the same way. Now let’s look at how we might test this, while also getting an idea for the error condition test:

```js
describe('Server App Integration', function() {
    beforeEach(module('serverApp2'));
    var ctrl, mockBackend;
    beforeEach(inject(function($controller, $httpBackend) {
        mockBackend = $httpBackend;
        mockBackend.expectGET('/api/note')
            .respond(404, {
                msg: 'Not Found'
            });
        ctrl = $controller('MainCtrl');
        // At this point, a server request will have been made
    }));
    it('should handle error while loading items', function() {
        // Initially, before the server responds,
        // the items should be empty
        expect(ctrl.items).toEqual([]);
        // Simulate a server response
        mockBackend.flush();
        // No items from server, only an error
        // So items should still be empty
        expect(ctrl.items).toEqual([]);
        // and check the error message
        expect(ctrl.errorMessage).toEqual('Not Found');
    });
    afterEach(function() {
        // Ensure that all expects set on the $httpBackend
        // were actually called
        mockBackend.verifyNoOutstandingExpectation();
        // Ensure that all requests to the server
        // have actually responded (using flush())
        mockBackend.verifyNoOutstandingRequest();
    });
});
```

In this test, very little has changed even though our code has added a new service and extracted it out. For the unit test, we are only ensuring that when the controller loads, it makes a server call to _/api/notes_. We don’t care whether it is through NoteServiceor directly. This makes it much more of an integration test, where it is independent of the underlying implementation. 

Also, we are now changing the server to respond with a 404. Under such a condition, we expect the `items` array to still be empty, but now the `errorMessage` variable should be updated in the controller with the server’s response. We added an `expect` to make sure this happens. The `afterEach` blocks remains as it was.

## 测试控制器

A test for a controller follows similar a pattern to the one for a service. Let's have a look at the fragment of the `ProjectsEditCtrl` controller from the sample application. This controller in question is responsible for the editing projects in the administration part of the application. Here we are going to test methods of the controller responsible for adding and removing project's team members:

```js
angular.module('admin-projects', [])
  .controller('ProjectsEditCtrl', function($scope, project) {

    $scope.project = project;

    $scope.removeTeamMember = function(teamMember) {
      var idx = $scope.project.teamMembers.indexOf(teamMember);
      if(idx >= 0) {
        $scope.project.teamMembers.splice(idx, 1);
      }
    };

    //other methods of the controller
  });
```

The logic of the presented controllers is not complex and will let us to focus on the test itself:

```js
describe('ProjectsEditCtrl tests', function () {

  var $scope;
  beforeEach(module('admin-projects'));
  beforeEach(inject(function ($rootScope) {
    $scope = $rootScope.$new();
  }));

  it('should remove an existing team member', inject(function ($controller) {

    var teamMember = {};
    $controller('ProjectsEditCtrl', {
      $scope: $scope,
      project: {
        teamMembers: [teamMember]
      }
    });

    //verify the initial setup
    expect($scope.project.teamMembers).toEqual([teamMember]);

    //execute and verify results
    $scope.removeTeamMember(teamMember);
    expect($scope.project.teamMembers).toEqual([]);
  }));
});
```

The `removeTeamMember` method that we want to test here will be defined on a `$scope` and it is the `ProjectsEditCtrl` controller that defines this method. To effectively test the `removeTeamMember` method we need to create a new scope, a new instance of the `ProjectsEditCtrl` controller and link the two together. Essentially we need to manually do the job of the `ng-controller` directive.

Let's turn our attention to the `beforeEach` section for one more moment, as there are interesting things going on in there. Firstly we are getting access to the `$rootScope` service and creating a new `$scope` instance (`$scope.$new()`). We do so to simulate what would happen in a running application, where the `ng-controller` directive would create a new scope.

To create an instance of the controller we can use the `$controller` service (please notice how the `inject` function can be placed on the `beforeEach` section as well as on the `it` level).

Look how easy it is to specify controller's constructor arguments while invoking the `$controller` service. This is dependency injection at its best; we can provide both a fake scope and test data to exercise controller's implementation in complete isolation.

### Mock objects and asynchronous code testing

We can see how AngularJS provides a very nice integration of its dependency injection system with the Jasmine testing framework. But the good testability story continues as AngularJS provides some excellent mock objects as well.

Asynchronous programming is the bread and butter of JavaScript. Unfortunately asynchronous code tends to be hard to test. Asynchronous events are not very predictable, and can fire in any order and trigger actions after an unknown period of time. The good news is that the AngularJS team provides excellent mock objects that make testing asynchronous code really easy and what is important is that they are fast and predictable. How can this be? Let's have a look at the example test exercising the code using the `$timeout` service. First at the code itself:

```js
angular.module('async', [])
  .factory('asyncGreeter', function ($timeout, $log) {
    return {
      say:function (name, timeout) {
        $timeout(function(){
          $log.info("Hello, " + name + "!");
        })
      }
    };
  });
```

The `$timeout` service is a replacement for the JavaScript `setTimeout` function. Using `$timeout` is preferable for the purpose of deferring actions as it is tightly integrated with the AngularJS HTML compiler and will trigger the DOM refresh after the time is up. On top of this the resulting code is easy to test.

Here is the test:

```js
describe('Async Greeter test', function () {

  var asyncGreeter, $timeout, $log;
  beforeEach(module('async'));
  beforeEach(inject(function (_asyncGreeter_, _$timeout_, _$log_) {
    asyncGreeter = _asyncGreeter_;
    $timeout = _$timeout_;
    $log = _$log_;
  }));

  it('should greet the async World', function () {
    asyncGreeter.say('World', 9999999999999999999);
    //
    $timeout.flush();
    expect($log.info.logs).toContain(['Hello, World!']);
  });
});
```

Most of this code should be easy to follow but there are two very interesting bits that require more attention. Firstly we can see a call to the `$timeout.flush()` method. This one little call on the `$timeout` mock simulates an asynchronous event being triggered. The interesting part is that we've got full control over when this event is going to be triggered. We don't need to wait for the timeout to occur, nor are we on the mercy of external events. Please note that we've specified a very long timeout period, yet our test will execute immediately, since we don't depend on the JavaScript's `setTimeout`. Rather it is the `$timeout` mock that simulates the behavior of the asynchronous environment.

Excellent, predictable mocks for the asynchronous services are one of the reasons why AngularJS tests can run blazing fast.

On many platforms there are often fundamental, global services that are rather difficult to test. Logging and exception handling code are examples of such logic that causes testing headaches. Luckily, AngularJS has a remedy here; it provides services addressing those infrastructural concerns alongside with accompanying mock objects. You've probably noticed that the test example makes use of one more mock, namely, `$log`. The mock for the `$log` service will accumulate all the logging statements and store them for further assertions. Using a mock object assures that we are not invoking real platform services; especially the ones that are potentially expensive in terms of performance and could have side-effects (for example, one could imagine that the `$log` service sends logs to a server over HTTP, and it would be very bad idea to perform network calls while executing tests).

## 测试过滤器

有如下过滤器：

```js
angular.module('filtersApp', [])
    .filter('timeAgo', [function() {
        var ONE_MINUTE = 1000 * 60;
        var ONE_HOUR = ONE_MINUTE * 60;
        var ONE_DAY = ONE_HOUR * 24;
        var ONE_MONTH = ONE_DAY * 30;
        return function(ts, optShowSecondsMessage) {
            if (optShowSecondsMessage !== false) {
                optShowSecondsMessage = true;
            }
            var currentTime = new Date().getTime();
            var diff = currentTime - ts;
            if (diff < ONE_MINUTE && optShowSecondsMessage) {
                return 'seconds ago';
            } else if (diff < ONE_HOUR) {
                return 'minutes ago';
            } else if (diff < ONE_DAY) {
                return 'hours ago';
            } else if (diff < ONE_MONTH) {
                return 'days ago';
            } else {
                return 'months ago';
            }
        };
    }]);
```

One might use the above filter as follows:

    {%raw%}{{ myCtrl.ts | timeAgo }}{%endraw%}

If we decided to only show messages from minutes, we might use it as follows with the optional argument set to false:

    {%raw%}{{ myCtrl.ts | timeAgo:false }}{%endraw%}

测试代码如下：

```js
describe('timeAgo Filter', function() {
    beforeEach(module('filtersApp'));
    var filter;
    beforeEach(inject(function(timeAgoFilter) {
        filter = timeAgoFilter;
    }));
    it('should respond based on timestamp', function() {
        // The presence of new Date().getTime() makes it slightly
        // hard to unit test deterministicly.
        // Ideally, we would inject a dateProvider into the timeAgo
        // filter, but we are trying to keep it simple here.
        // So we will assume that our tests are fast enough to
        // execute in mere milliseconds.
        var currentTime = new Date().getTime();
        currentTime -= 10000;
        expect(filter(currentTime)).toEqual('seconds ago');
        var fewMinutesAgo = currentTime - 1000 * 60;
        expect(filter(fewMinutesAgo)).toEqual('minutes ago');
        var fewHoursAgo = currentTime - 1000 * 60 * 68;
        expect(filter(fewHoursAgo)).toEqual('hours ago');
        var fewDaysAgo = currentTime - 1000 * 60 * 60 * 26;
        expect(filter(fewDaysAgo)).toEqual('days ago');
        var fewMonthsAgo = currentTime - 1000 * 60 * 60 * 24 * 32;
        expect(filter(fewMonthsAgo)).toEqual('months ago');
    });
});
```

We can pass optional or other arguments to the filter as additional parameters to the filter function. In this case, we pass  `false` to tell the filter not to show the seconds message. Our test changes minutely, such that both the `currentTime` and the `fewMinutesAgo` conditions return the  "minutes ago"string as compared to "seconds ago"  and "minutes ago" previously.

## 测试指令

### Steps Involved in Testing a Directive

At its core, there are a few key steps (some of which parallel the unit tests for our controllers) that you can use as a checklist when writing unit tests for a directive:

1. Get the `$compile` service injected into the unit test.
2. Create the HTML element that will trigger the directive you have created.
3. Create the scopeagainst which you want the directive to be tested again.
4. Remember that there is no server in the unit test. If the directive loads a template using the `templateUrl` key, add an expectation on `$httpBackend`  for loading the `templateUrl` and designate the HTML that’s to be used instead of the template in the test.
5. Compile the HTML element using the  $compileservice with the scope you’ve created.
6. Write expectations on how the directive should be rendered and on the functions that are defined in the linkfunction.

The first five tests are going to be standard for any unit test we write for a directive. Only the last two—where we start testing the rendering and business logic encapsulated in a directive—change from one directive to another.

To quickly recap what our directive definition was, let’s look at our stock directive definition:

```js
angular.module('stockMarketApp', [])
    .directive('stockWidget', [function() {
        return {
            templateUrl: 'stock.html',
            restrict: 'A',
            scope: {
                stockData: '=',
                stockTitle: '@',
                whenSelect: '&'
            },
            link: function($scope, $element, $attrs) {
                $scope.getChange = function(stock) {
                    return Math.ceil(((stock.price - stock.previous) /
                        stock.previous) * 100);
                };
                $scope.onSelect = function() {
                    $scope.whenSelect({
                        stockName: $scope.stockData.name,
                        stockPrice: $scope.stockData.price,
                        stockPrevious: $scope.stockData.previous
                    });
                };
            }
        };
    }]);
```

Let’s take a look at our unit test setup:

```js
describe('Stock Widget Directive Rendering', function() {
    beforeEach(module('stockMarketApp'));
    var compile, mockBackend, rootScope;
    // Step 1
    beforeEach(inject(function($compile, $httpBackend, $rootScope) {
        compile = $compile;
        mockBackend = $httpBackend;
        rootScope = $rootScope;
    }));
    it('should render HTML based on scope correctly', function() {
        // Step 2
        var scope = rootScope.$new();
        scope.myStock = {
            name: 'Best Stock',
            price: 100,
            previous: 200
        };
        scope.title = 'the best';
        // Step 3
        mockBackend.expectGET('stock.html').respond(
            '<div ng-bind="stockTitle"></div>' +
            '<div ng-bind="stockData.price"></div>');
        // Step 4
        var element = compile('<div stock-widget' +
            ' stock-data="myStock"' +
            ' stock-title="This is {{title}}"></div>')(scope);
        // Step 5
        scope.$digest();
        mockBackend.flush();
        // Step 6
        expect(element.html()).toEqual(
            '<div ng-bind="stockTitle" class="ng-binding">' +
            'This is the best' +
            '</div>' +
            '<div ng-bind="stockData.price" class="ng-binding">' +
            '100' +
            '</div>');
    });
});
```

## Karma

Karma is the test runner that makes running tests painless and amazingly fast. It uses NodeJS and SocketIO to facilitate tests in multiple browsers at insanely fast speeds.

Karma, which is the test runner, is solely responsible for finding all the unit tests in our codebase, opening browsers, running the tests in them, and capturing results. It does not care what language or framework we use for writing the tests; it simply runs them.

### Setup

Install Karma CLI

    sudo npm install -g karma-cli

Karma has a concept called plugins, which allow you to choose only the components you need for your project. These plugins allow you to choose which framework you use for writing your unit tests (Karma is framework agnostic), which browsers to launch, and so on. To start off, we will install the Jasmine plugin to write our tests in Jasmine, and the Chrome launcher to start Google Chrome automatically. Install these two with the following command:

    npm install karma-jasmine karma-chrome-launcher

### Karma Plugins

We installed two plugins for Karma in the previous section. Let’s explore the concept of
Karma plugins a bit more. Karma plugins can be broadly split into the following
categories:

- Browser launchers
    
    The first type of plugins for Karma are ones that help Karma launch browsers automatically as part of a test run. We installed the Chrome browser launcher plugin, and there are similar ones for Firefox, IE, and many more.

- Testing frameworks

    We can also choose the type of framework we want to use when we write unit tests. We will be using Jasmine, which we installed again in the previous section, but if you prefer a different style of writing unit tests, like mocha or qunit, there are plugins available for those as well.

- Reporters

    Karma can give us the results of the tests in various forms as well. The default progress reporter comes built in, but you might decide that you need the test results as junit.xmlfiles. You can install a Karma plugin for that.

- Integrations

    One other major category of plugins allows us to integrate with existing JavaScript libraries or tools, like Google’s Closure or RequireJS. Most of these have plugins for Karma as well that you can install if you need them.

### Explaining the Karma Config

To use Karma, we need a configuration file that tells Karma how to operate.  We will see how easy it is to generate this configuration file in the next section.  The default name for this file is karma.conf.js, and unless you tell Karma otherwise, it will automatically look for a file with this name in the directory you run Karma from:

```js
// File: chapter3/karma.conf.js
// Karma configuration
module.exports = function(config) {
    config.set({
        // base path that will be used to resolve files and exclude
        basePath: '',
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'angular.min.js',
            'angular-mocks.js',
            'controller.js',
            'simpleSpec.js',
            'controllerSpec.js'
        ],
        // list of files / patterns to exclude
        exclude: [],
        // web server port
        port: 8080,
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR ||
        // LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests
        // whenever any file changes
        autoWatch: true,
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],
        // Continuous Integration mode
        // if true, it captures browsers, runs tests, and exits
        singleRun: false
    });
};
```

其中：

- basePath
The base path from which all files for testing and the tests themselves need to be loaded. This is set relative to the location of the Karma config file.
- frameworks
Which frameworks to load, as an array. In our example, we loaded Jasmine (which requires that the karma-jasmine plugin be installed). You can select mocha, qunit, or something else as well here.
- files
The list of files (or file paths) to load, listed as an array. In the case of AngularJS, we first load the AngularJS library, and then the  angular-mocks.js  file, which AngularJS provides as a helper for testing. Finally, we load the application source code followed by the actual unit tests.
- exclude
A list of files (or file paths) to exclude. Useful if you are using a lot of glob rules (wildcard statements to include a set of files, like **.js) for the files, and want to exclude certain files (like the karma.conf.js).
- port
This specifies which port the Karma test runner server runs on. By default, it is  8080. 
- logLevel
Which levels of log (console.log,  console.info) Karma needs to capture from the browser. 
- autoWatch
This is by far the coolest and most useful feature of Karma. This tells Karma to keep a watch on all the files included by the files config, and if any of them change, to run the affected unit tests. If this is set to  true, you don’t need to ever manually trigger a run of your unit tests; Karma will take care of that for you. 
- browsers The browsers Karma should open when it is initially started. Most of these require a  karma-launcherplugin (we installed the  chrome-launcher, so we specify Chrome in this).
- singleRun This is a Boolean value, and tells Karma to shut down the server after one single run of the unit tests. This should be set to  truefor continuous integration envi‐ ronments, and can be ignored otherwise.

you can of course copy and paste the contents of the config file from the previous section to get started, but Karma offers a much nicer way to get started with your own Karma config. Karma lets you autogenerate the config by running the following command: 

    karma init

This triggers an interactive shell, which prompts us with a series of questions. Each answer usually has a series of options that you can cycle through by using Tab on your keyboard. After we select all our options, the karma.conf.jsfile is generated for us.

### Running the Unit Test

    karma start

The command automatically looks for the  karma.conf.jsfile in the directory you are executing the command from, and picks up the config from it. In case your config file is not named karma.conf.js, or if it is in a different folder, you can optionally pass it in as an argument to the command. That is:

    karma start my.conf.js

## End-to-End Testing

As applications grow in size and complexity, it becomes unrealistic to rely on manual testing to verify the correctness of new features, catch bugs and notice regressions. Unit tests are the first line of defense for catching bugs, but sometimes issues come up with integration between components which can't be captured in a unit test. End to end tests are made to find these problems.

We have built [Protractor](https://github.com/angular/protractor), an end to end test runner which simulates user interactions that will help you verify the health of your Angular application.

Protractor is an end-to-end test framework for AngularJS applications. Protractor runs tests against your application running in a real browser, interacting with it as a user would.

### Set Up

See [Protractor - end to end testing for AngularJS](http://angular.github.io/protractor/#/tutorial)

Use npm to install Protractor globally with:

```
npm install -g protractor
```

This will install two command line tools, `protractor` and `webdriver-manager`. Try running `protractor --version` to make sure it's working.

The `webdriver-manager` is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:

```
webdriver-manager update
```

Now start up a server with:

```
webdriver-manager start
```

This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. Leave this server running throughout the tutorial. You can see information about the status of the server at `http://localhost:4444/wd/hub`.

### Protractor Configuration

The Protractor configuration file is a JavaScript file that basically holds all the configuration elements that Protractor needs to be able to run the end-to-end tests.  These include configuration options like: 

- Where is the server running?
- Where is the Selenium WebDriver on which to run the tests?
- What tests should be executed?
- What browsers should the tests be run on?

And much more. Let’s take a look at a sample configuration with the most commonly used options, which is what we will be using for the tests in this chapter:

```js
exports.config = {
    // The address of a running Selenium server
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // The URL where the server we are testing is running
    baseUrl: 'http://localhost:8000/',
    // Capabilities to be passed to the WebDriver instance
    capabilities: {
        'browserName': 'chrome'
    },
    // Spec patterns are relative to the location of the
    // spec file. They may include glob patterns.
    specs: ['*Spec*.js'],
    // Options to be passed to Jasmine-node
    jasmineNodeOpts: {
        showColors: true // Use colors in the command-line report
    }
};
```

This configuration file is the simplest Protractor configuration file we could use. It has the following things of note:

- Specifies that the Selenium server is running locally on port 4444.
- Specifies that the server is running at http://localhost:8000/.
- Specifies that the browser to automatically run is Chrome.
- Points out the spec.jsfile that holds the end-to-end test code.
- Some configuration options for Jasmine to show colors in the command line.

Now what do we need to do before we can run this test?

1. Start Selenium locally (this can be done with webdriver-manager start).
2. Start the server locally (node server.jsin our example).
3. Start Protractor (protractor test/e2e/protractor.conf.js).

### An End-to-End Test

Protractor tests use the same Jasmine scaffolding syntax we’ve been using for our unit tests, so we have the same describe  blocks for a set of tests, and individual itblocks for each test. In addition to these, Protractor exposes some global variables that are needed for writing end-to-end tests, namely: 

- `browser` This is a wrapper around WebDriver that allows us to interact with the browser directly. We use this object to navigate to different pages and page-level information. 

- `element` The element object is a helper function to find and interact with HTML elements. It takes a strategy to find the elements as the argument, and then gives you back an element that you can interact with by clicking and sending keystrokes to it. 

- `by` The  byis an object with a collection of element-finding strategies. We can find elements by  idor  CSSclasses, which are built-in strategies of WebDriver. Protractor adds a few strategies on top of that to find elements by  model,  binding, and  repeater as well, which are AngularJS-specific ways to find certain elements on the page.

Start the app by first installing the dependent packages using  npm in
stallfollowed by node server.js:

```js
describe('Routing Test', function() {
    it('should show teams on the first page', function() {
        // Open the list of teams page
        browser.get('/');
        // Check whether there are 5 rows in the repeater
        var rows = element.all(
            by.repeater('team in teamListCtrl.teams'));
        expect(rows.count()).toEqual(5);
        // Check the first row details
        var firstRowRank = element(
            by.repeater('team in teamListCtrl.teams')
            .row(0).column('team.rank'));
        var firstRowName = element(
            by.repeater('team in teamListCtrl.teams')
            .row(0).column('team.name'));
        expect(firstRowRank.getText()).toEqual('1');
        expect(firstRowName.getText()).toEqual('Spain');
        // Check the last row details
        var lastRowRank = element(
            by.repeater('team in teamListCtrl.teams')
            .row(4).column('team.rank'));
        var lastRowName = element(
            by.repeater('team in teamListCtrl.teams')
            .row(4).column('team.name'));
        expect(lastRowRank.getText()).toEqual('5');
        expect(lastRowName.getText()).toEqual('Uruguay');
        // Check that login link is shown and
        // logout link is hidden
        expect(element(by.css('.login-link')).isDisplayed())
            .toBe(true);
        expect(element(by.css('.logout-link')).isDisplayed())
            .toBe(false);
    });
    it('should allow logging in', function() {
        // Navigate to the login page
        browser.get('#/login');
        var username = element(
            by.model('loginCtrl.user.username'));
        var password = element(
            by.model('loginCtrl.user.password'));
        // Type in the username and password
        username.sendKeys('admin');
        password.sendKeys('admin');
        // Click on the login button
        element(by.css('.btn.btn-success')).click();
        // Ensure that the user was redirected
        expect(browser.getCurrentUrl())
            .toEqual('http://localhost:8000/#/');
        // Check that login link is hidden and
        // logout link is shown
        expect(element(by.css('.login-link')).isDisplayed())
            .toBe(false);
        expect(element(by.css('.logout-link')).isDisplayed())
            .toBe(true);
    });
});
```

We have two tests in this example. The first test:

- Opens up the main page of the teams application.
- Fetches all the rows by using the repeater, and then checks whether there are five rows present on the main page.
- Fetches the name and rank of the first row and asserts that they are as expected. 
- Fetches the name and rank of the last row and asserts that they are as expected.
- Checks that the login link is shown and the logout link is hidden. Thus, the first test purely deals with rendering and logic to ensure that the application is correctly hooked up to the server and is capable of fetching and displaying the content correctly.

The second test deals with user interaction by:

- Opening up the login page.
- Entering the username and password to the correct model.
- Clicking the login button by CSS selector.
- Ensuring that the login is successful by checking the URL of the redirected page. 
- Checking that the login link is hidden and the logout link is shown.

We will see Protractor open the Chrome browser through Selenium, navigate to the main page of our locally running application, and click through and run our tests as we have defined them. At the end, it should print out whether they were successful, or the reason for failure in case they failed.

### Considerations

There are a few things we have to keep in mind, as well as some best practices that should be followed, when working with and writing end-to-end tests in AngularJS. Let’s go over them one by one: 

- Location of ng-app: When you write a simple Protractor test for AngularJS, and point it at any URL that hosts an AngularJS application, Protractor’s default behavior is to look at the body element of the HTML to find  ng-app. It then kicks in and does its magic. But in case ng-app is not on the body tag, but on a subelement, we need to manually tell Protractor how to find it. This is done through the  rootElement  option of the Protractor configuration, which takes a CSS selector to the element using ng-app. For example, if ng-appwas on the following element inside our bodytag: 

        <div class="angular-app" ng-app="myApp"></div>

    then we’d have to specify the following line in our Protractor configuration file: 

        rootElement: ".angular-app"

    This would tell Protractor to find the element with the CSS class angular-app. This is not needed if you have the ng-appon the bodyelement. 

- Polling: If you have any kind of polling logic in your code, where you have to keep fetching some information or doing some calculations every few seconds, make sure you’re not using the `$timeout`  service AngularJS provides for that. Protractor has issues figuring out when AngularJS is done with its work. If you need polling, and need to write end-to-end tests for it, make sure you use the $intervalservice instead. Protractor understands and deals with the $intervalservice, and behaves like you would expect it to. 
- Manual bootstrapping: Protractor currently does not support working with AngularJS applications that are manually bootstrapped. Thus, if you need to write end-to-end tests for such an application, you might have to work with the underlying WebDriver (by using browser.driver.getinstead of  browser.get, and so on), and add wait conditions to ensure that all the things are loaded before proceeding with the test. You would not be able to leverage any of the benefits that Protractor offers. 
- Future execution: WebDriver commands that we write in our tests don’t return the actual values, but rather promises that will execute later in the browser (in various browsers even). Thus, console.log won’t actually print the values because it doesn’t have them at the point the code is executed. 
- Debugging: Protractor has great built-in support for debugging, because it leverages the WebDriver debugging. To debug any test, we can just add the following line at the point where we want to start debugging: 

        browser.debugger(); 
    This could be after any of the lines in the test. Then we run our tests using the following command: 

        protractor debug path/to/conf.js

    This opens up the Node debugger, which allows us to step through the various breakpoints in our test. We now need to type “c” and click Enter, to tell Protractor to continue running the tests. Protractor will run the tests like normal in the browser up until the point it hits the debugger statement. At that point, it stops and waits for further instructions to resume the test. This is a real, live application in the browser that you can interact with and debug to see exactly what the Protractor runner is seeing. You can actually click around and change the state of the test to make it fail as well. When you are done debugging, you can type “c” and click Enter to continue running the test until the next debug point or the end of the test, whichever comes first. 

The last thing to consider is how to organize your tests in such a way that makes them easy to maintain and reuse. In the test that we wrote in the previous section, we used elementand byto find elements in the page and interact with it by clicking, entering keys, and asserting the state of the UI. But when we write our tests, we want to create an API that allows us to easily understand the intent of the test. This is useful because it becomes easier to understand the test, as well as allow anyone to quickly build a set of larger, more encompassing tests using the same API. To accomplish this, we use the concept of PageObjects. Let’s rewrite the Teams List page test to use PageObjects instead of directly working with the WebDriver APIs at a test level:

```js
function TeamsListPage() {
    this.open = function() {
        browser.get('/');
    };
    this.getTeamsListRows = function() {
        return element.all(by.repeater('team in teamListCtrl.teams'));
    };
    this.getRankForRow = function(row) {
        return element(
            by.repeater('team in teamListCtrl.teams')
            .row(row).column('team.rank'));
    };
    this.getNameForRow = function(row) {
        return element(
            by.repeater('team in teamListCtrl.teams')
            .row(row).column('team.name'));
    };
    this.isLoginLinkVisible = function() {
        return element(by.css('.login-link')).isDisplayed();
    };
    this.isLogoutLinkVisible = function() {
        return element(by.css('.logout-link')).isDisplayed();
    };
}

describe('Routing Test With PageObjects', function() {
    it('should show teams on the first page', function() {
        var teamsListPage = new TeamsListPage();
        teamsListPage.open();
        expect(teamsListPage.getTeamsListRows().count()).toEqual(5);
        expect(teamsListPage.getRankForRow(0).getText())
            .toEqual('1');
        expect(teamsListPage.getNameForRow(0).getText())
            .toEqual('Spain');
        expect(teamsListPage.getRankForRow(4).getText())
            .toEqual('5');
        expect(teamsListPage.getNameForRow(4).getText())
            .toEqual('Uruguay');
        // Check that login link is shown and
        // logout link is hidden
        expect(teamsListPage.isLoginLinkVisible()).toBe(true);
        expect(teamsListPage.isLogoutLinkVisible()).toBe(false);
    });
});
```

We created a JavaScript class called TeamsListPage, which exposes some APIs to open the page, get all the rows, and get the individual name and rank for a given row. Then in our test, we can work with an instance of the  TeamsListPage  object, which makes the test much easier to read than before. We can do something similar for the Login Page test as well. PageObjects encapsulate abstractions on how to access certain elements and how to interact with them in a single place, thus allowing for simple reuse as well as handling change in a single place rather than making the change in multiple places.

## Library

- [Mocha - the fun, simple, flexible JavaScript test framework](http://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on node.js and the browser, making asynchronous testing simple and fun.
- [Home - Chai](http://chaijs.com/) Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
- [pivotal/jasmine](https://github.com/pivotal/jasmine) DOM-less simple JavaScript testing framework <http://jasmine.github.io/>.

## Reference

- [说说NG里的单元测试 - AngularJS Nice Things](http://www.ngnice.com/posts/dc4b032b537ae0)