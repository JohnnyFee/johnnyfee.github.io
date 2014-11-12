---
layout: post
title: "Angular Unit Test"
category: Grunt
tags: [angular, test]
--- 

## Jasmine: Spec Style of Testing

AngularJS adopted Jasmine as its testing framework: unit tests for the framework itself are written using Jasmine and all the examples in the documentation are using Jasmine syntax as well. Moreover AngularJS extended the original Jasmine library with few useful add-ons that make testing even easier.

### Testing AngularJS objects

Testing AngularJS objects is not much different from testing any other, regular JavaScript class. Specific to AngularJS is its dependency injection system and the way it can be leveraged in unit tests. To learn how to write tests leveraging the DI machinery we are going to focus on testing services and controllers.

All the tests-related extensions and mock objects are distributed in a separate AngularJS file named `angular-mocks.js`. Don't forget to include this script in your test runner. At the same time it is important not to include this script in the deployed version of an application.

<!--more-->

## 测试服务

Writing tests for objects registered in AngularJS modules is easy but requires a bit of initial setup. More specifically, we need to ensure that a proper AngularJS module is initialized and the whole DI machinery brought to life. Fortunately AngularJS provides a set of methods that make Jasmine tests and the dependency injection system play together really nicely.

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

Here is the corresponding test:

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

At this point you should be able to recognize the familiar structure of the Jasmine test plus spot some new function calls: `module` and `inject`.

- Instantiating a module. The `module` function is used in Jasmine tests to indicate that services from a given module should be prepared for the test. The role of this method is similar to the one played by the `ng-app` directive. It indicated that AngularJS `$injector` should be created for a given module (and all the dependent modules). This  modulefunction is one of the helper methods that the angular-mocks.js AngularJS library file provides, as well as many others.

    Don't confuse the `module` function used in the test with the `angular.module` method. While both have the same name their roles are quite different. The `angular.module` method is used to declare new modules while the `module` function allows us to specify modules to be used in a test.

    In reality it is possible to have multiple `module` function calls in one test. In this case all the services, values and constants from the specified modules will be available through the `$injector`.

- Injecting services. The `inject` function has one simple responsibility, that is it injects the services into our tests.

The last part that might be confusing is the presence of the mysterious underscores in the inject function call:

```js
var notificationsArchive;
beforeEach(inject(function (_notificationsArchive_) {
  notificationsArchive = _notificationsArchive_;
}));
```

What is happening here is that `$injector` will strip any a pair leading and trailing underscores when inspecting the function's arguments to retrieve dependencies. This is a useful trick since we can save variable names without underscores for the test itself.

### Mocking Out Services

We saw mocked-out versions of $locationand $window that the AngularJS mock file
provides. Let’s consider the very simple `ItemService`

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

Now for the purpose of our unit test, we want to mock out ItemServiceso that we can override the default implementation for our unit test. There are two ways to accomplish this.

The first way is to override the service during the unit test, as an inline mock:

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

In this unit test, the start of the test is similar, where we instantiate our module, the `notesApp1`. After that, we have another `beforeEach`, which is where we override the `ItemService` with our own mock. We use the `module` function, but instead of giving it the name of the module, we give it a function that gets injected with a `$provide`. This provider shares its namespace with the modules loaded before. So now we create our mock Service  and tell the provider that when any controller or service asks for `ItemService`, give it our value. Because we do this  after the  `notesApp1` module is loaded, it overwrites the original `ItemService` definition.

The second option to override services would be at a global level instead of a unit test level. To decide whether to create the mocks as we did in the previous example using a local variable and the  `$provide.value`  function, or whether to do it globally like An‐ gularJS does it, the question we need to answer is whether or not other tests could reuse the mock.

The mock we created before would only be usable within this particular  describe  block. To change the preceding to be a more reusable, general-purpose mock of the ItemSer vice, we could do the following:

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

What we had hardcoded in the `mockService` has been extracted out into a service with the same name, but in a different module named `notesApp1Mocks`. This file will reside in the test folder, and be included by `karma.conf.js`, but not in our live application. Our tests would now change as follows:

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

This ensures that after `notesApp1` is loaded, we load the  `notesApp1Mocks`  module, which overrides the `ItemService`. After that, when our test loads the controller, which then calls the service, it defers to the mocked-out `ItemService` that we created. We can use this approach when we need a global reusable mock, and defer to the describe-level mock when we need to mock just one particular test.

### Spies

But what if we didn’t want to implement an entire mocked-out service? What if we just wanted to know in the case of `ItemService` whether or not the `list` function was called, and not worry about the actual value from it? For those kinds of cases, we have Jasmine spies. Spies allow us to hook into certain functions, and check whether they were called, how many times they were called, what arguments they were called with, and so on. 

So let’s see how to change our mock to use spies instead:

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

We call the `spyOn` function with an object as the first argument, and a string with the function name that we want to hook on to as the second argument. In this example, we tell Jasmine to spy on the `list` function of the `ItemService`. We also tell it to continue calling the actual service underneath by calling  `andCallThrough` on the spy. This means we can use Jasmine to check whether or not the function was called, and have the function work as it used to underneath.

What if we wanted to not have the existing method execute as normal?

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

In this example, we override the listmethod in the ItemService, and replace it with our Jasmine spy. The  spyOnfunction returns a spy that’s called with the  andReturn function on the spy created by createSpy, and gives it the value to return.

### Unit Testing Server Calls

With AngularJS, as long as we include the _angular-mocks.js_ file as part of the Karma configuration, AngularJS takes care of ensuring that when we use the $httpservice, it doesn’t actually make server calls. All server calls are intercepted, and we can test them all within the context of a unit test. Because they are intercepted and mocked out, our unit tests remain fast and stable.

Let’s take a sample controller that makes server calls using `$http`, and see how we might unit test it:

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

In this code snippet, we have a very simple controller, which makes a GET request to `/api/notewhen` it loads, and saves the response into the `items` array on the controller.

In case of an error, it saves the error message on the controller’s instance. Now, let’s see how we might test this:

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

## Testing controllers

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

## Karma

Karma is the test runner that makes running tests painless and amazingly fast. It uses NodeJS and SocketIO to facilitate tests in multiple browsers at insanely fast speeds.

Karma, which is the test runner, is solely responsible for finding all the unit tests in our codebase, opening browsers, running the tests in them, and capturing results. It does not care what language or framework we use for writing the tests; it sim‐
ply runs them.

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

