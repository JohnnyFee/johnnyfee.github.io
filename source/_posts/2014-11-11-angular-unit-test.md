layout: post
title: "Angular Unit Test"
category: Grunt
tags: [angular, test]
---

See 电子书 [AngularJS: Up and Running](http://www.salttiger.com/angularjs-up-and-running/)

AngularJS 采用 Jasmine 作为它的测试框架，而且 AngularJS 为 Jasmine 提供了几个有用的扩展，让测试更加简单。

测试 AngularJS 对象和测试其他普通的 JavaScript 类没有多大区别，特殊之处在于它的 DI 系统和应用到单元测试中的方式。

所有测试相关的扩展和模拟对象都发布在一个分离的文件 [`angular-mocks.js` ](https://github.com/angular/bower-angular-mocks) 中。在 test runner 中不要忘记包含这个脚本，同时，不要在应用的发布版本中不要包含这个脚本。

<!-- more -->

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

我们为 AngularJS 模拟文件提供的 `$location` 和 `$window` 的模拟版本。让我们考虑以下例子：

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

我们有两种方法来覆盖 `ItemService` 的默认实现，第一种方法是使用内联的模拟服务：

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

在 Angular 中，只要在 Karma 配置中包含了 _angular-mocks.js_ 文件，AngularJS 就让调用 `$http` service 时，并不真正发生服务器调用。所有的服务器调用都叫被拦截，让我们可以在单元测试上下文中测试，所有我们的单元测试也会更快更稳定。

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

Karma 是能够让测试以惊人的速度无痛运行的 test runner。它使用 NodeJS 和 SocketIO 加快了在多种浏览器中的执行测试的速度。

Karma 作为 test runner，全权负责在我们的代码库中查找所有的单元测试、打开浏览器、在浏览器中执行这些单元测试，并且捕获结果。它不关心我们使用哪种语言或者框架来写的测试，它只管运行测试。

### Setup

安装 Karma CLI

    sudo npm install -g karma-cli

Karma 有个概念叫“插件”，这些插件允许你只选择你的工程需要的组件来用。通过这些插件，你可以选择使用哪个框架来写你的单元测试（Karma 是框架未知的），启动哪些浏览器，等等。开始之前，我们先安装 Jasmine 插件，以便我们可以使用 Jasmine 框架来写单元测试，以及 Chrome launcher 插件来自动启动 Google Chrome 浏览器。安装这两个插件的命令如下：

    npm install karma-jasmine karma-chrome-launcher

使用 [yeoman/generator-angular · GitHub](https://github.com/yeoman/generator-angular) 生成的脚手架默认使用 jasmine 测试框架，如果你想使用功能更加强大的 mocha，需要安装：

```shell
npm install karma-mocha --save-dev
npm install karma-chrome-launcher
bower install mocha --save-dev
bower install chai --save-dev
```

其中，chai 是 mocha 依赖的断言库，你也可以安装其他的断言库，如 [should.js](、https://github.com/visionmedia/should.js)、[expect.js](https://github.com/LearnBoost/expect.js)、[better-assert](https://github.com/visionmedia/better-assert) 等。使用 chai 作为断言库，可以自由选择 should、expect、asset 三种断言方式：

```js
chai.should();
var expect = chai.expect;
var assert = chai.assert;
```

另外把测试用例改成 mocha 的形态。

See [Setting up a project using karma with mocha and chai](http://attackofzach.com/setting-up-a-project-using-karma-with-mocha-and-chai/)。另外可以参考 demo [ludovicofischer/mocha-chai-browser-demo](https://github.com/ludovicofischer/mocha-chai-browser-demo)。

### Karma Plugins

Karma 的插件大体上可以分为以下几个类别：

- Browser launchers
    
    这些插件在测试运行的时候帮助 Karma 自动启动浏览器。我们之前安装了 Chrome 浏览器的 launcher 插件，对于其他浏览器如 Firefox 和 IE 等，也是有类似的 launcher 插件的。

- Testing frameworks

    我们也可以选择使用哪种框架来编写单元测试。因为前面我们安装了 Jasmine 插件，所以我们将使用 Jasmine 框架来编写单元测试。但是如果你更喜欢其他风格的单元测试，比如 mocha 或者 qunit，你也可以安装这些框架的插件。

- Reporters

    Karma 可以提供多种格式的测试结果。默认的 progress reporter 是内置的，但是如果你需要像 junit.xml 文件那样的测试结果，你可以安装一个相关的 Karma 插件。

- Integrations

    这类插件允许我们集成其他已经存在的 JavaScript 库或者工具，比如 Google’s Closure，或者 RequireJS。大多数这些插件你都可以在你需要的时候安装它们。


### Explaining the Karma Config

要使用 Karma，我们需要一个配置文件来告诉 Karma 怎么去操作。下面我们将会看到这个配置文件的生成是非常容易的。这个配置文件默认的名称是 karma.conf.js，除非你告诉 Karma 使用其他名字，否则 Karma 将自动在你运行它的目录底下寻找名为 karma.conf.js 的配置文件：

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
所有需要加载的测试及测试相关的文件的根路径。根路径是相对于 Karma 的配置文件的路径进行设置的。
- frameworks
需要加载的测试框架。在我们的例子中，加载了 Jasmine（这要求已经安装了 karma-jasmine 插件）。你也可以选择 mocha，qunit，或者其他框架。
- files
需要加载的文件列表(or file paths)，以数组的形式列出。就 AngularJS 来说，我们先加载了 AngularJS 库文件，然后加载了 AngularJS 提供的用来辅助测试的 angular-mock.js 文件，最后加载了应用程序以及单元测试。
- exclude
需要排除的文件列表(or file paths)。这在当你对文件使用很多 glob 规则（通配符语句来包含一组文件，如 **.js），但是又想排除掉某些特定文件（如 karma.conf.js）时非常有用。
- port
Karma 的 test runner 服务运行的端口。默认是 8080。
- logLevel
Karma 要从浏览器捕获哪些等级的日志（如 console.log， console.info）。
- autoWatch
这是 Karma 目前为止最为酷炫有用的功能。它让 Karma 对 `files` 配置项中包含的所有文件保持监视，一旦这些文件有任何改动，就会运行相关的单元测试。如果此项配置设为 true，你就再也不用手动去触发你的单元测试了，全部由 Karma 帮你代劳了。 
- browsers 
当 Karma 初始化启动时要打开的浏览器。大部分这些浏览器都是要安装一个相应的 karma launcher 插件的（因为我们已经安装了 chrome-launcher，所以在例子中此项配置我们可以设置 Chrome）。
- singleRun 
This is a Boolean value, and tells Karma to shut down the server after one single run of the unit tests. This should be set to  truefor continuous integration envi‐ ronments, and can be ignored otherwise.
此项配置为 Boolean 值，它让 Karma 在所有的单元测试运行完一次后关掉 server。此项配置在连续集成环境需要设置为 true，否则可以忽略。（不是很明白此项配置的作用-_-!）

你可以直接复制粘贴前面 config 文件来用，但是 Karma 有提供了一个更好的方式来创建 config 文件。运行以下命令： 

    karma init

这将触发一个交互界面，提示我们一些问题。通常每个问题的答案会有一系列的选项，你可以通过键盘上 Tab 键来进行选择。当我们完成所有的选项后，karma.conf.js 文件就生成好了。

### 运行单元测试

    karma start

该命令会自动在你运行此命令的目录下寻找 karma.conf.js 文件，并获取其中的配置。为了防止你的配置文件不是以 karma.conf.js 命名，或者 karma.conf.js 在另外一个目录下，你可以将你的配置文件作为一个参数传给此命令，如下：

    karma start my.conf.js

## End-to-End Testing

随着应用程序越来越庞大和复杂，靠人工测试来验证新功能的正确性、查出 bug等就会变得不现实。单元测试是查 bug 的第一防御线，但是有些时候问题是出现在组件之间的集成，无法在单元测试中查出。端到端测试就是为了找出这些问题。

我们建了个端到端的 test runner [Protractor](https://github.com/angular/protractor), 可以模拟用户的交互操作来帮助你验证你的 Angular 程序的健壮性。

Protractor 是一个 AngularJS 应用程序的端到端的测试框架。它是 在真实的浏览器中为你的应用程序运行测试，像用户那样与浏览器的进行交互。

### Set Up

参见 [Protractor - end to end testing for AngularJS](http://angular.github.io/protractor/#/tutorial)

使用 npm 来全局安装 Protractor:

```
npm install -g protractor
```

这将安装两个命令行工具：`protractor` 和 `webdriver-manager`。可运行 `protractor --version` 来检查 Protractor 是否已经可用。

The `webdriver-manager` is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with
`webdriver-manager` 可以很容易的获取一个正在运行的 Selenium Server 实例。使用它来下载必要的 binaries（这是啥？）：:

```
webdriver-manager update
```

现在启动一个服务器:

```
webdriver-manager start
```

这会启动一个 Selenium Server，并且输出一堆信息日志。你的 Protractor 测试将会发送请求到这个服务器来控制本地浏览器。你可以在 `http://localhost:4444/wd/hub` 上面看到服务器的状态信息。

### Protractor Configuration

Protractor 的配置文件是一个 JavaScript 文件，基本上包括了所有让 Protractor 可以运行端到端测试的配置元素。例如以下这些配置选项：

- 服务器运行在哪里？
- 用来运行测试的 Selenium WebDriver 在哪里？
- 哪些测试要被排除？
- 使用哪些浏览器来运行测试？

等等其他许多配置选项。
让我们来看一个最常用的几个选项的配置例子，我们将在这个章节的测试中使用这个配置文件：

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

这个配置文件是最简单的 Protractor 配置文件。它包括以下内容：

- 指定 Selenium server 运行在本地端口 4444。
- Specifies that the server is running at http://localhost:8000/.指定服务器运行在 `http://localhost:8000/`。(这是指哪个服务器？) 
- 指定自动启动的浏览器是 Chrome。
- 指定包含端到端测试的 spec.js 文件。
- 一些让 Jasmine 命令行彩色显示的选项。

Protractor 对 Jasmine 是完全支持的，但是对于其他测试框架，比如 Mocha、Cucumber 等只提供了有限的支持，如果你使用 Mocha，你还需要包含你自己的断言库（如 Chai）才可以。

在开始测试之前，我们需要做：

1. 启动本地 Selenium（这个我们通过 `webdriver-manager start` 完成）
2. 启动本地服务（在我们的例子中是 node server.js）
3. 启动 Protractor（protractor test/e2e/protractor.conf.js）

### An End-to-End Test

Protractor 测试使用和 Jasmine 脚手架一样的语法，所以我们使用同样的 describe 块来描述一组测试，使用独立的 it 块来描述每一个测试。除此之外，Protractor 暴露了一些编写端到端测试所需的全局变量，即： 

- `browser` 这是 WebDriver 的封装，可用来与浏览器进行直接交互。我们使用这个对象来导航到不同的页面以及页面级别的信息。 

- `element` 这个对象可帮助寻找 HTML 元素，以及与 HTML 元素进行交互。它接受一个策略参数来寻找，然后返回一个你可以通过点击和发送按键来交互的元素。

- `by` 这个对象拥有一个元素查找策略的集合。我们可以通过 id 或者 css 类来查找元素，这些都是 WebDriver 内置的策略。Protractor 在此基础上添加了一些通过 model、binding 和 repeater 来查找元素的策略，这些是 AngularJS 的在页面上寻找元素的特有方式。

`element` 接收一个 Locator 类型的参数用来寻找元素，`by` 则会创建 Locator 类型的对象。

开始之前先使用 npm 安装好依赖的包 in
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

在这个例子中我们有 2 个测试。第一个测试：

- 打开 teams 应用程序的主页面。
- 使用 repeater 来获取所有的 team，然后检查主页面上是不是有 5 个 team。
- 获取第一个 team 的名称和名次，并且判断它们是否如预期的。
- 获取最后一个 team 的名称和名次，并且判断它们是否如预期的。
- 检查登录链接是否在登出链接隐藏的时候显示。
这样，第一个测试纯粹只是检查了渲染，以及应用程序是否正确连接上服务器，是否能够正确地获取和显示内容。

第二个测试处理用户交互：

- 打开登录页面。
- 输入用户名和密码给相应的 model。
- 通过 CSS 选择器点击登录按钮。
- 通过检查重定向的页面地址来确保登录成功。
- 检查登录链接是否在登出链接显示的时候隐藏。

我们将会看到 Protractor 通过 Selenium 打开 Chrome 浏览器，导航到我们本地运行的应用程序主页面，按照我们已经定义好的来依次点击和运行我们的测试。最后，它将会输出测试是否运行成功，如果运行失败，则输出失败原因。

### Considerations

当我们在使用 AngularJS 并编写端到端测试的时候，就像那些我们应该要遵从的最佳实践一样，有几点需要牢记：

- ng-app 的位置：当你为 AngularJS 写一个简单的 Protractor 测试，并将它指向任何一个运行 AngularJS 应用程序的 URL 的时候，Protractor 默认是在 HTML 的 `body` 元素里面查找 `ng-app`。找到 `ng-app` 后 Protractor 就会介入发挥它的作用。但是为了防止 `ng-app` 不在 `body` 标签上而是在它的子元素上的情况，我们需要手动告诉 Protractor 如何去找到 `ng-app`。这个可以通过 Protractor 的 `rootElement` 配置项来完成，该配置项使用 CSS 选择器来寻找带有 `ng-app` 的元素。例如，当 `ng-app` 是在 `body` 标签下的以下元素里面： 

        <div class="angular-app" ng-app="myApp"></div>

    然后我们就要像下面这样在 Protractor 的配置文件里面设置： 

        rootElement: ".angular-app"

    这将会告诉 Protractor `ng-app` 是在带有 `angular-app` CSS 类的元素上。当然，如果你是在 `body` 元素上设置了 `ng-app`，就不需要这么做了。

- Polling: 如果在你的代码里有任何轮询的逻辑来不断的获取某些信息或者每隔几秒做一些运算，那么确保你不是使用 AngularJS 提供的 `$timeout` 服务。因为 Protractor 在判断 AngularJS 是否已经完成工作的时候有一些问题。如果你需要轮询，并且为此编写端到端测试，你应该使用 `$interval`服务。Protractor 能够很好地理解并且处理 `$interval` 服务。
- Manual bootstrapping: 目前 Protractor 还不支持手动 bootstrap 的 AngularJS 应用程序。所以，如果你需要为这样的应用程序编写端到端测试，你可能需要使用底层的 WebDriver（使用 browser.driver.get 取代 browser.get，等等），并且添加等待条件来确保在测试运行之前所有的东西都加载好了。你将无法利用任何 Protractor 提供的好处。
- Future execution: 我们在测试中写的 WebDriver 指令并不返回实际的值，而是承诺稍后将会在浏览器（甚至是多个浏览器）中执行。因此，当 `console.log`这句代码执行的时候，并不会真正的去打印内容，因为这些内容此时都还没有。
- Debugging: Protractor 内置了对 debugging 的很好支持，因为它利用了 WebDriver 的 debugging。要调试任何的测试，我们只需在希望开始调试的地方添加以下这行：

        browser.debugger(); 
    这可以加在测试中的任何一行代码之后。然后我们用以下命令来执行测试： 

        protractor debug path/to/conf.js

     这将会打开 Node 调试器，让我们可以单步调试测试中的各个断点。输入“c”，然后回车，可以让 Protractor 继续运行测试。Protractor 将会在浏览器中正常运行测试，直到它碰到 debugger 语句，它将停下来，等待进一步的指示来 resume 测试。Protractor 让你可以和一个在浏览器中真实运行的应用程序进行交互和调试，将它所掌握的信息提供给你。你也可以通过点击和修改测试的状态来让它失败。当你完成调试，你可以输入“c”然后回车来继续执行测试，直到遇到下一个断点或者测试结束。

最后一件需要考虑的事情就是如何组织你的测试，让它们比较容易维护和复用。在我们前面写的测试中，我们使用 element 和 by 在页面中查找元素，通过点击、输入按键以及判断 UI 的状态来进行交互。但是当我们编写测试的时候，我们希望创建一个 API 能够让我们很容易地明白测试的目的。这是很有用的，因为当测试变得更容易理解了，也就让任何人都可以使用这个 API 来快速地建立起一组更大、更全面的测试。为了实现这点，我们可以使用 PageObject。让我们使用 PageObject 取代直接操作 WebDriver API 来重写 Team 列表页面的测试：

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

我们创建了一个叫做 TeamsListPage 的 JavaScript 类，这个类暴露了一些 API 来打开页面、获取所有记录、获取指定记录的名称和名次。然后在我们的测试中，我们使用一个 TeamsListPage 对象让测试比之前更容易阅读了。我们也可以对登录页面的测试做类似的改造。

PageObjects encapsulate abstractions on how to access certain elements and how to interact with them in a single place, thus allowing for simple reuse as well as handling change in a single place rather than making the change in multiple places. PageObject 在如何访问元素、如何在一个单一的地方与元素进行交互上进行抽象封装，这样就允许简单的复用，在一个地方处理变化而不是在很多个地方产生变化（最后一句话可能翻译得不是很清楚。。。）

## PhantomJS

    set PHANTOMJS_CDNURL=https://npm.taobao.org/dist/phantomjs
    npm install phantomjs --registry=https://registry.npm.taobao.org --no-proxy


## Library

- [angular/protractor](https://github.com/angular/protractor)
    - [Practical End-to-End Testing with Protractor | ng-newsletter](http://www.ng-newsletter.com/posts/practical-protractor.html)

## Tools

- [SlimerJS](http://slimerjs.org)

## Reference

- [说说NG里的单元测试 - AngularJS Nice Things](http://www.ngnice.com/posts/dc4b032b537ae0)

## Tutorial

- [Testing Angular with Karma](https://www.airpair.com/angularjs/posts/testing-angular-with-karma)
- [A Journey Through Client-Side Testing with JavaScript -Telerik Developer Network](http://developer.telerik.com/featured/journey-client-side-testing-javascript)
