---
layout: post
title: "Angular Tutorial"
category : Angular
tags : [angular, tutorial]
--- 

本书为读 [AngularJS](http://www.salttiger.com/angularjs/) 的读书笔记，该书的例子在 [shyamseshadri/angularjs-book](https://github.com/shyamseshadri/angularjs-book)。

Let us take a look at the project organization (similar to the skeletons previously described, with minor changes):

- **app** : This folder hosts all the app code that is displayed to the user. This includes HTML, JS, CSS, images, and dependent libraries. 

    - **/styles** : Contains all the CSS/LESS files
    - **/images** : Contains images for our project
    - **/scripts** : The main AngularJS codebase. This folder also includes our bootstrapping code, and the main integration with RequireJS 

        - **/controllers** : AngularJS controllers go here
        - **/directives** : AngularJS Directives go here
        - **/filters** : AngularJS filters go here
        - **/services** : AngularJS services go here
    
    - **/vendor** : The libraries we depend on (Bootstrap, RequireJS, jQuery)
    - **/views** : The HTML partials for the views and the components used in our project
- **config** : Contains Karma configs for unit and scenario tests
- **test** : Contains the unit and scenario (integration) tests for the app 
    
    - **/spec** : Contains the unit tests, mirroring the structure of the JS folder in the app directory
    - **/e2e** : Contains the end-to-end scenario specs

The first thing we need is the main.js file (in the app folder) that RequireJS loads, which then triggers loading of all the other dependencies. In this example, our JS project will depend on jQuery and Twitter Bootstrap in addition to our code.

<!--more-->

    // the app/scripts/main.js file, which defines our RequireJS config
    require.config({
      paths: {
        angular: 'vendor/angular.min',
        jquery: 'vendor/jquery',
        domReady: 'vendor/require/domReady',
        twitter: 'vendor/bootstrap',
        angularResource: 'vendor/angular-resource.min',
     },
     shim: {
       'twitter/js/bootstrap': {
          deps: ['jquery/jquery']
        },
       angular: {
         deps: [ 'jquery/jquery',
                 'twitter/js/bootstrap'],
         exports: 'angular'
       },
       angularResource: { deps:['angular'] }
     }
    });

    require([
         'app',
         // Note this is not Twitter Bootstrap
         // but our AngularJS bootstrap
         'bootstrap',
         'controllers/mainControllers',
         'services/searchServices',
         'directives/ngbkFocus'
        // Any individual controller, service, directive or filter file
        // that you add will need to be pulled in here.
        // This will have to be maintained by hand.
        ],
        function (angular, app) {
          'use strict';

          app.config(['$routeProvider',
            function($routeProvider) {
              // Define your Routes here
            }
          ]);
        }
    );

We then define an _app.js_ file. This defines our AngularJS app, and tells it that it depends on all the controllers, services, filters, and directives we define. We’ll look at the files that are mentioned in the RequireJS dependency list in just a bit.

You can think of the RequireJS dependency list as a blocking import statement for JavaScript. That is, the function within the block will not execute until all the dependencies listed are satisfied or loaded.

Also notice that we don’t individually tell RequireJS what directive, service, or filter to pull in, because that is not how this project is structured. There is one module each for controllers, services, filters, and directives, and thus it is sufficient to just define those as our dependencies.

    // The app/scripts/app.js file, which defines our AngularJS app
    define(['angular', 'angularResource', 'controllers/controllers',
            'services/services', 'filters/filters',
            'directives/directives'], function (angular) {
      return angular.module(‘MyApp’, ['ngResource', 'controllers', 'services',
                                      'filters', 'directives']);
    });

We also have a bootstrap.js file, which waits for the DOM to be ready (using RequireJS’s plug-in, domReady), and then tells AngularJS to go forth and be awesome.

    // The app/scripts/bootstrap.js file which tells AngularJS
    // to go ahead and bootstrap when the DOM is loaded
    define(['angular', 'domReady'], function(angular, domReady) {
       domReady(function() {
           angular.bootstrap(document, [‘MyApp’]);
       });
    });

There is another advantage to splitting the bootstrap from the app, which is that we could potentially replace our mainApp with a fake or a mockApp for the purpose of testing. For example, if the servers you depend on are flaky, you could just create a fakeApp that replaces all $http requests with fake data to allow you to develop in peace. That way, you can just slip in a fakeBootstrap and a fakeApp into your application.

Now, your main index.html (which is in the app folder) could look something like:

    <!DOCTYPE html>
    <html> <!-- Do not add ng-app here as we bootstrap AngularJS manually-->
    <head>
       <title>My AngularJS App</title>
       <meta charset="utf-8" />

       <link rel="stylesheet" type="text/css"
             href="styles/bootstrap.min.css">
       <link rel="stylesheet" type="text/css"
             href="styles/bootstrap-responsive.min.css">

       <link rel="stylesheet" type="text/css" href="styles/app.css">

    </head>
    <body class="home-page" ng-controller="RootController">
       <div ng-view ></div>

       <script data-main="scripts/main"
               src="lib/require/require.min.js"></script>
    </body>
    </html>

Now, we’ll take a look at the _js/controllers/controllers.js_ file, which will look almost exactly the same as _js/directives/directives.js_ , _js/filters/filters.js_ , and _js/services/services.js_ :

    define(['angular'], function(angular) {
       'use strict';
       return angular.module('controllers', []);
    });

Because of the way we have our RequireJS dependencies structured, all these are guaranteed to run only after the Angular dependency has been satisfied and loaded. Each of these files defines an AngularJS module, which will then be used by the individual controllers, directives, filters, and services to add on to the definition.

Let’s take a look at a directive definition

// File: ngbkFocus.js

    define(['directives/directives'], function(directives) {
     directives.directive(ngbkFocus, ['$rootScope', function($rootScope) {
       return {
         restrict: 'A',
         scope: true,
         link: function(scope, element, attrs) {
           element[0].focus();
         }
       };
     }]);
    });

The directive itself is quite trivial, but let us take a closer look at what’s happening. The RequireJS shim around the file says that my _ngbkFocus.js_ depends on the module declaration file _directives/directives.js_ . It then uses the injected directives module to add on its own directive declaration. You could choose to have multiple directives, or a single one per file. It is completely up to you.

One major note: if you have a controller that pulls in a service (say your RootController depends on your UserService, and gets the UserService injected in), then you have to make sure that you define the file dependency to RequireJS as well, like so:

    define(['controllers/controllers', 'services/userService'],
        function(controllers) {
     controllers.controller('RootController', ['$scope', 'UserService',
        function($scope, UserService) {
          // Do what's needed
       };
     }]);
    });

That is basically how your entire source folder structure is set up.

But how does this affect my tests, you ask? We’re glad you asked that question, because you are going to get the answer now!

The good news is that Karma does support RequireJS. Just install the latest and greatest version of Karma (using npm install -g karma).

Once you have done that, the Karma config for the unit tests also changes slightly. The following is how we would set up the unit tests to run for the project structure we have previously defined:

    // This file is config/karma.conf.js.
    // Base path, that will be used to resolve files
    // (in this case is the root of the project)
    basePath = '../';

    // list files/patterns to load in the browser
    files = [
       JASMINE,
       JASMINE_ADAPTER,
       REQUIRE,
       REQUIRE_ADAPTER,

       // !! Put all libs in RequireJS 'paths' config here (included: false).
       // All these files are files that are needed for the tests to run,
       // but Karma is being told explicitly to avoid loading them, as they
       // will be loaded by RequireJS when the main module is loaded.
       {pattern: 'app/scripts/vendor/**/*.js', included: false},

       // all the sources, tests  // !! all src and test modules (included: false)
       {pattern: 'app/scripts/**/*.js', included: false},
       {pattern: 'app/scripts/*.js', included: false},
       {pattern: 'test/spec/*.js', included: false},
       {pattern: 'test/spec/**/*.js', included: false},

       // !! test main require module last
       'test/spec/main.js'
    ];

    // list of files to exclude
    exclude = [];

    // test results reporter to use
    // possible values: dots || progress
    reporter = 'progress';

    // web server port
    port = 8989;

    // cli runner port
    runnerPort = 9898;

    // enable/disable colors in the output (reporters and logs)
    colors = true;

    // level of logging
    logLevel = LOG_INFO;

    // enable/disable watching file and executing tests whenever any file changes
    autoWatch = true;

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari
    // - PhantomJS
    // - IE if you have a windows box
    browsers = ['Chrome'];

    // Continuous Integration mode
    // if true, it captures browsers, runs tests, and exits
    singleRun = false;

We use a slightly different format to define our dependencies (the included: false is quite important). We also add the dependency on REQUIRE_JS and its adapter. The final thing to get all this working is main.js, which triggers our tests.

    // This file is test/spec/main.js

    require.config({
       // !! Karma serves files from '/base'
       // (in this case, it is the root of the project /your-project/app/js)
       baseUrl: '/base/app/scripts',
       paths: {
           angular: 'vendor/angular/angular.min',
           jquery: 'vendor/jquery',
           domReady: 'vendor/require/domReady',
           twitter: 'vendor/bootstrap',
           angularMocks: 'vendor/angular-mocks',
           angularResource: 'vendor/angular-resource.min',
           unitTest: '../../../base/test/spec'
       },
       // example of using shim, to load non-AMD libraries
       // (such as Backbone, jQuery)
       shim: {
           angular: {
               exports: 'angular'
           },
           angularResource: { deps:['angular']},
           angularMocks: { deps:['angularResource']}
       }
    });

    // Start karma once the dom is ready.
    require([
     'domReady',
     // Each individual test file will have to be added to this list to ensure
     // that it gets run. Again, this will have to be maintained manually.
     'unitTest/controllers/mainControllersSpec',
     'unitTest/directives/ngbkFocusSpec',
     'unitTest/services/userServiceSpec'
     ], function(domReady) {
     domReady(function() {
         window.__karma__.start();
     });
    });

So with this setup, we can run the following:

    karma start config/karma.conf.js

Then we can run the tests.

Of course there is a slight change when it comes to writing your unit tests. They need to be RequireJS-supported modules as well, so let’s take a look at a sample test:

    // This is test/spec/directives/ngbkFocus.js

    define(['angularMocks', 'directives/directives', 'directives/ngbkFocus'],
        function() {
     describe('ngbkFocus Directive', function() {
       beforeEach(module('directives'));

       // These will be initialized before each spec (each it(), that is),
       // and reused
       var elem;
       beforeEach(inject(function($rootScope, $compile) {
         elem = $compile('<input type=”text” ngbk-focus>')($rootScope);
       }));

       it('should have focus immediately', function() {
         expect(elem.hasClass('focus')).toBeTruthy();
       });
     });
    });

Every test of ours will do the following: 1. Pull in angularMocks, which gets us angular, angularResource, and of course, angularMocks. 1. Pull in the high-level module (directives for directives, controllers for controllers, and so on), then the individual file it is actually testing (the loadingIndicator). 1. If your test depends on some other service or controller, make sure you also define the RequireJS dependency, in addition to telling AngularJS about it.

This kind of approach can be used with any test, and you should be good to go.

Thankfully, the RequireJS approach doesn’t affect our end-to-end tests at all, so they can simply be done the way we have seen so far. A sample config follows, assuming that the server that runs your app is running on[http://localhost:8000](http://localhost:8000/).

    // base path, that will be used to resolve files
    // (in this case is the root of the project
    basePath = '../';

    // list of files / patterns to load in the browser
    files = [
       ANGULAR_SCENARIO,
       ANGULAR_SCENARIO_ADAPTER,
       'test/e2e/*.js'
    ];

    // list of files to exclude
    exclude = [];

    // test results reporter to use
    // possible values: dots || progress
    reporter = 'progress';

    // web server port
    port = 8989;

    // cli runner port
    runnerPort = 9898;

    // enable / disable colors in the output (reporters and logs)
    colors = true;

    // level of logging
    logLevel = LOG_INFO;

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch = true;

    urlRoot = '/_karma_/';

    proxies = {
     '/': 'http://localhost:8000/'
    };

    // Start these browsers, currently available:
    browsers = ['Chrome'];

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun = false;