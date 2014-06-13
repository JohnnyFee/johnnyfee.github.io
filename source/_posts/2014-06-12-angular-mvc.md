---
layout: post
title: "Angular Tutorial"
category : Angular
tags : [angular, tutorial]
--- 

本书为读 [AngularJS](http://www.salttiger.com/angularjs/) 的读书笔记，该书的例子在 [shyamseshadri/angularjs-book](https://github.com/shyamseshadri/angularjs-book)。

Use primitives as model：

    <html ng-app>
    <body ng-controller="TextController">
      <p>{{someText}}</p>

      <script
          src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.min.js">
      </script>

      <script>
        function TextController($scope) {
          $scope.someText = 'You have started your journey.';
        }
      </script>
    </body>
    </html>

Though this primitive-style model works in simple cases, for most applications you’ll want to create a model object to contain your data.

    <html ng-app='myApp'>
    <body ng-controller='TextController'>
      <p>{{someText.message}}</p>

    <script
        src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.min.js">
    </script>

    <script>
      var myAppModule = angular.module('myApp', []);

      myAppModule.controller('TextController',
          function($scope) {
        var someText = {};
        someText.message = 'You have started your journey.';
        $scope.someText = someText;
      });
    </script>
    </body>
    </html>

In this version, we told our ng-app element about the name of our module, myApp.

Controllers have three responsibilities in your app:

* Set up the initial state in your application’s model
* Expose model and functions to the view (UI template) through $scope
* Watch other parts of the model for changes and take action.

    <div ng-controller="ParentController">
      <div ng-controller="ChildController">...</div>
    </div>

Though we express this as nested controllers, the actual nesting happens in scopes. The $scope passed to a nested controller prototypically inherits from its parent controller’s $scope. In this case, this means that the $scope passed to ChildController will have access to all the properties of the $scope passed to ParentController.

You can think of scopes as a context that you use to make changes to your model observable.

## Services

Services are singleton (single-instance) objects that carry out the tasks necessary to support your application’s functionality. Angular comes with many services like $location, for interacting with the browser’s location, $route, for switching views based on location (URL) changes, and $http, for communicating with servers.

With modules, and the dependency injection we get from them, we can write our controller much more simply, like this:

    function ShoppingController($scope, Items) {
      $scope.items = Items.query();
    }

You can, and should, create your own services to do all of the tasks unique to your application. Services can be shared across any controllers that need them. As such, they’re a good mechanism to use when you need to communicate across controllers and share state. Angular’s bundled services start with a $, so while you can name them anything you like, its a good idea to avoid starting them with $ to avoid naming collisions.

You define services with the module object’s API. There are three functions for creating generic services, with different levels of complexity and ability:

- `provider(name, Object OR constructor())` A configurable service with complex creation logic. If you pass an Object, it should have a function named $get that returns an instance of the service. Otherwise, Angular assumes you’ve passed a constructor that, when called, creates the instance.

- `factory(name, $getFunction())` A non-configurable service with complex creation logic. You specify a function that, when called, returns the service instance. You could think of this as `provider(name, { $get: $getFunction() } )`.

- `service(name, constructor())` A non-configurable service with simple creation logic. Like the constructor option with provider, Angular calls it to 

We’ll look at the configuration option for provider() later, but let’s discuss an example with factory() for our preceding Items example. We can write the service like this:

    // Create a module to support our shopping views
    var shoppingModule = angular.module('ShoppingModule', []);

    // Set up the service factory to create our Items interface to the
    // server-side database
    shoppingModule.factory('Items', function() {
      var items = {};
      items.query = function() {
        // In real apps, we'd pull this data from the server...
        return [
          {title: 'Paint pots', description: 'Pots full of paint', price: 3.95},
          {title: 'Polka dots', description: 'Dots with polka, price: 2.95},
          {title: 'Pebbles', description: 'Just little rocks', price: 6.95}
        ];
      };
      return items;
    });

When Angular creates the ShoppingController, it will pass in $scope and the new Items service that we’ve just defined. This is done by parameter name matching. That is, Angular looks at the function signature for our ShoppingController class, and notices that it is asking for an Items object. Since we’ve defined Items as a service, it knows where to get it.

The result of looking up these dependencies as strings means that the arguments of injectable functions like controller constructors are order-independent. So instead of this:

    function ShoppingController($scope, Items) {...}

we can write this:

    function ShoppingController(Items, $scope) {...}

and it all still functions as we intended.
To get this to work with our template, we need to tell the ng-app directive the name of our module, like the following:

    <html ng-app='ShoppingModule'>

To complete the example, we could implement the rest of the template as:

{%raw%}
    <body ng-controller="ShoppingController">
      <h1>Shop!</h1>
      <table>
          <td>{{item.title}}</td>
          <td>{{item.description}}</td>
          <td>{{item.price | currency}}</td>
        </tr>
      </table>
    </div>
{%endraw%}

Let's look another example:

    // This file is app/scripts/services/services.js

    var services = angular.module('guthub.services', ['ngResource']);

    services.factory('Recipe', ['$resource',
        function($resource) {
      return $resource('/recipes/:id', {id: '@id'});
    }]);

There is a recipe service, which returns what we call an Angular Resource. With just that single line of code—return $resource—(and of course, a dependency on the guthub.services module), we can now put recipe as an argument in any of our controllers, and it will be injected into the controller. Furthermore, each recipe object has the following methods built in:

* Recipe.get()
* Recipe.save()
* Recipe.query()
* Recipe.remove()
* Recipe.delete()

> If you are going to use Recipe.delete, and want your application to work in IE, you will have to call it like so: Recipe[delete](). This is because delete is a keyword in IE.

The line of code that declares the resource—return $resource—also does a few more nice things for us:

1. Notice the :id in the URL specified for the RESTful resource. It basically says that when you make any query (say, Recipe.get()), if you pass in an object with an id field, then the value of that field will be added to the end of the URL.

  That is, calling Recipe.get({id: 15}) will make a call to _/recipe/15_ .

2. What about that second object? The {id: _@id_}? Well, as they say, a line of code is worth a thousand explanations, so let’s take a simple example.

    Say we have a recipe object, which has the necessary information already stored within it, including an id.

    Then, we can save it by simply doing the following:

          // Assuming existingRecipeObj has all the necessary fields,
          // including id (say 13)
          var recipe = new Recipe(existingRecipeObj);
          recipe.$save();

    This will make a POST request to _/recipe/13_ . The @id tells it to pick the id field from its object and use that as the id parameter. It’s an added convenience that can save a few lines of code.

As services themselves can have dependencies, the Module API lets you define dependencies for your dependencies.

In most applications, it will work well enough to create a single module for all the code you create and put all of your dependencies in it. If you use services or directives from third-party libraries, they’ll come with their own modules. As your app depends on them, you’d refer to them as dependencies of your application’s module.

For instance, if you include the (fictitious) modules SnazzyUIWidgets and SuperDataSync, your application’s module declaration would look like this:

    var appMod = angular.module('app', ['SnazzyUIWidgets', 'SuperDataSync'];

### $location

Let’s consider a small example of how you would use the $location service in a real-world application. Consider a case where we have a datepicker, and when a date is selected, the app navigates to a certain URL. Let us take a look at how that might look:

    // Assume that the datepicker calls $scope.dateSelected with the date
    $scope.dateSelected = function(dateTxt) {
      $location.path('/filteredResults?startDate=' + dateTxt);
      // If this were being done in the callback for
      // an external library, like jQuery, then we would have to
      $scope.$apply();
    };

Here are four quick tips about when (and how) to call $apply.

* **DO NOT** call it all the time. Calling $apply when AngularJS is happily ticking away (in its $digest cycle, as we call it) will cause an exception. So “better safe than sorry” is not the approach you want to use.
* **DO CALL** it when controls outside of AngularJS (DOM events, external callbacks such as jQuery UI controls, and so on) are calling AngularJS functions. At that point, you want to tell AngularJS to update itself (the models, the views, and so on), and $apply does just that.
* Whenever possible, execute your code or function by passing it to $apply, rather than executing the function and then calling $apply(). For example, execute the following code:

        $scope.$apply(function() {
          $scope.variable1 = 'some value';
          executeSomeAction();
        });

        instead of the following:

        $scope.variable1 = 'some value';
        executeSomeAction();
        $scope.$apply();

While both of these will have the same effect, they differ in one significant way.

The first will capture any errors that happen when executeSomeAction is called, while the latter will quietly ignore any such errors. You will get error notifications from AngularJS only when you do the first.

* Consider using something like[safeApply](https://coderwall.com/p/ngisma):

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

Let us take a look at how the $location service would behave, if the URL in the browser was http://www.host.com/base/index.html#!/path?param1=value1#hashValue.

Getter Function |Getter Value | Setter Function
----------------|--------------|--------------
absUrl()|http://www.host.com/base/index.html#!/path?param1=value1#hashValue |N/A
hash() |hashValue |hash('newHash') 
host()|www.host.com |N/A 
path() |/path path('/newPath')
protocol() |http |N/A 
search() |{'a’: ‘b'} |search({'c’: ‘def'})
url() |/path?param1=value1?hashValue |url('/newPath?p2=v2') ## Model

Note that the search() setter has a few modes of operation:

* Calling search(searchObj) with an object<string, string> basically denotes all the parameters and their values
* Calling search(string) will set the URL params as q=String directly in the URL
* Calling search(param, value) with a string and value sets (or calling with null removes) a particular search parameter in the URL.

### HTML5 Mode and Hashbang Mode

The $location service can be configured using the $locationProvider (which can be injected, just like everything else in AngularJS). Of particular interest are two properties on this provider, which are:

- html5Mode
A boolean value which dictates whether the $location service works in HTML5 mode or not- hashPrefix

A string value (actually a single character) that is used as the prefix for Hashbang URLs (in Hashbang mode or legacy browsers in HTML5 mode). By default it is empty, so Angular’s hash is just ‘’. If the hashPrefix is set to ‘!’, then Angular uses what we call Hashbang URLs (! followed by the url).

You might ask, just what are these modes? Well, pretend that you have this super awesome website at _www.superawesomewebsite.com_ that uses AngularJS.

Let’s say you have a particular route (with some parameters and a hash), such as _/foo?bar=123#baz_ .

In normal Hashbang mode (with the hashPrefix set to ‘!’), or in legacy browsers without HTML5 mode support, your URL would look something like:

    http://www.superawesomewebsite.com/#!/foo?bar=123#baz

While in HTML5 mode, the URL would simply look like this:

    http://www.superawesomewebsite.com/foo?bar=123#baz

In both cases, location.path() would be /foo, location.search() would be bar=123, and location.hash() would be baz. So if that is the case, why wouldn’t you want to use the HTML5 mode?

The Hashbang approach works seamlessly across all browsers, and requires the least amount of configuration. You just need to set the hashBang prefix (! by default) and you are good to go.

The HTML5 mode, on the other hand, talks to the browser URL through the use of HTML5 History API. The $location service is smart enough to figure out whether HTML5 mode is supported or not, and fall back to the Hashbang approach if necessary, so you don’t need to worry about additional work. But you do have to take care of the following.

__Server-side configuration__

Because HTML5 links look like any other URL on your application, you need to take care on the server side to route all links within your app to your main HTML (most likely, the _index.html_ ). For example, if your app is the landing page for _superawesomewebsite.com_ , and you have a route /amazing?who=me in your app, then the URL that the browser would show is _http://www.superawesomewebsite.com/amazing?who=me+_ .

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

Be sure to check all relative links, images, scripts, and so on. You must either specify the URL base in the head of your main HTML file (<base href="/my-base">), or you must use absolute URLs (starting with /) everywhere because relative URLs will be resolved to absolute URLs using the initial absolute URL of the document, which is often different from the root of the application.

Running Angular apps with the History API enabled from document root is strongly encouraged, as it takes care of all relative link issues.



## Directives

Directives extend HTML syntax, and are the way to associate behavior and DOM transformations with custom elements and attributes. Through them, you can create reusable UI components, configure your application, and do almost anything else you can imagine wanting to do in your UI template.

You can write apps with the built-in directives that come with Angular, but you’ll likely run into situations where you want to write your own. You’ll know it’s time to break into directives when you want to deal with browser events or modify the DOM in a way that isn’t already supported by the built-in directives. This code of yours belongs in a directive that you write, and not in a controller, service, or any other place in your app.

As with services, you define directives through the module object’s API by calling its directive() function, where directiveFunction is a factory function that defines your directive’s features.

    var appModule = angular.module('appModule', [...]);
    appModule.directive('directiveName', directiveFunction);

We can now move to the directives we will be using in our application. There will be two directives in the app:

- butterbar
  This directive will be shown and hidden when the routes change and while the page is still loading information. It will hook into the route-changing mechanism and automatically hide and show whatever is within its tag ,based on the state of the page.

- focus
  The focus directive is used to ensure that specific input fields (or elements) have the focus.

Let’s look at the code:

    // This file is app/scripts/directives/directives.js

    var directives = angular.module('guthub.directives', []);

    directives.directive('butterbar', ['$rootScope',
        function($rootScope) {
      return {
        link: function(scope, element, attrs) {
          element.addClass('hide');

          $rootScope.$on('$routeChangeStart', function() {
            element.removeClass('hide');
          });

          $rootScope.$on('$routeChangeSuccess', function() {
            element.addClass('hide');
          });
        }
      };
    }]);

    directives.directive('focus',
        function() {
      return {
        link: function(scope, element, attrs) {
          element[0].focus();
        }
      };
    });

Here, we’re returning the directive configuration object with its `link` function specified. The `link` function gets a reference to the enclosing scope, the DOM `element` it lives on, an array of any `attributes` passed to the directive, and the `controller` on the DOM element, if it exists. Here, we only need to get at the element and call its focus() method.

For now, all you need to know is the following:

1. Directives go through a two-step process. In the first step (the compile phase), all directives attached to a DOM element are found, and then processed. Any DOM manipulation also happens during the compile step. At the end of this phase, a linking function is produced.
2. In the second step, the link phase (the phase we used previously), the preceding DOM template produced is linked to the scope. Also, any watchers or listeners are added as needed, resulting in a live binding between the scope and the element. Thus, anything related to the scope happens in the linking phase.

The butterbar directive can be used as follows:

    <div butterbar>My loading text...</div>

It basically hides the element right up front, then adds two watches on the root scope. Every time a route change begins, it shows the element (by changing its class), and every time the route has successfully finished changing, it hides the butterbar again.

Another interesting thing to note is how we inject the $rootScope into the directive. All directives directly hook into the AngularJS dependency injection system, so you can inject your services and whatever else you need into them.

The final thing of note is the API for working with the element. jQuery veterans will be glad to know that it follows a jQuery-like syntax (addClass, removeClass). AngularJS implements a subset of the calls of jQuery so that jQuery is an optional dependency for any AngularJS project. In case you do end up using the full jQuery library in your project, you should know that AngularJS uses that instead of the jQlite implementation it has built-in.

## Controllers

Let’s go over the first controller, which is the List Controller, responsible for displaying the list of all recipes in the system.

    app.controller('ListCtrl', ['$scope', 'recipes',
        function($scope, recipes) {
      $scope.recipes = recipes;
    }]);

With the List Controller under our belts, the other controllers are pretty similar in nature, but we will still cover them one by one to point out the interesting aspects:

    app.controller('ViewCtrl', ['$scope', '$location', 'recipe',
        function($scope, $location, recipe) {
      $scope.recipe = recipe;

      $scope.edit = function() {
        $location.path('/edit/' + recipe.id);
      };
    }]);


Next, let’s take a look at the Edit Controller:

    app.controller('EditCtrl', ['$scope', '$location', 'recipe',
        function($scope, $location, recipe) {
      $scope.recipe = recipe;

      $scope.save = function() {
        $scope.recipe.$save(function(recipe) {
          $location.path('/view/' + recipe.id);
        });
      };

      $scope.remove = function() {
        delete $scope.recipe;
        $location.path('/');
      };
    }]);


Next, we have the New Controller:

    app.controller('NewCtrl', ['$scope', '$location', 'Recipe',
        function($scope, $location, Recipe) {
      $scope.recipe = new Recipe({
        ingredients: [ {} ]
      });

      $scope.save = function() {
        $scope.recipe.$save(function(recipe) {
          $location.path('/view/' + recipe.id);
        });
      };
    }]);


Finally, we have the Ingredients Controller. This is a special controller, but before we get into why or how, let’s take a look:

    app.controller('IngredientsCtrl', ['$scope', function($scope) {
      $scope.addIngredient = function() {
        var ingredients = $scope.recipe.ingredients;
        ingredients[ingredients.length] = {};
      };
      $scope.removeIngredient = function(index) {
        $scope.recipe.ingredients.splice(index, 1);
      };
    }]);

It is a child controller, it inherits the scope from the parent controller (the Edit/New controllers in this case). Thus, it has access to the $scope.recipe from the parent.

With that, we finish the last of the controllers. The only JavaScript piece that remains is how the routing is set up:
// This file is app/scripts/controllers/controllers.js

    var app = angular.module('guthub',
        ['guthub.directives', 'guthub.services']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
          when('/', {
            controller: 'ListCtrl',
            resolve: {
              recipes: function(MultiRecipeLoader) {
                return MultiRecipeLoader();
              }
            },
            templateUrl:'/views/list.html'
          }).when('/edit/:recipeId', {
            controller: 'EditCtrl',
            resolve: {
              recipe: function(RecipeLoader) {
                return RecipeLoader();
              }
            },
            templateUrl:'/views/recipeForm.html'
          }).when('/view/:recipeId', {
            controller: 'ViewCtrl',
            resolve: {
              recipe: function(RecipeLoader) {
                return RecipeLoader();
              }
            },
            templateUrl:'/views/viewRecipe.html'
          }).when('/new', {
            controller: 'NewCtrl',
            templateUrl:'/views/recipeForm.html'
          }).otherwise({redirectTo:'/'});
    }]);

For each route, we specify the URL, the controller that backs it up, the template to load, and finally (optionally), a resolve object.

This `resolve` object tells AngularJS that each of these resolve keys needs to be satisfied before the route can be displayed to the user. For us, we want to load all the recipes, or an individual recipe, and make sure we have the server response before we display the page. So we tell the route provider that we have recipes (or a recipe), and then tell it how to fetch it.

If the resolve function returns an AngularJS promise, then AngularJS is smart enough to wait for the promise to get resolved before it proceeds. That means that it will wait until the server responds.

## Templates

Let us start by taking a look at the outermost, main template, which is the index.html. This is the base of our single-page application, and all the other views are loaded within the context of this template:

    <!DOCTYPE html>
    <html   lang="en" ng-app="guthub">
    <head>
      <title>GutHub - Create and Share</title>
      <script src="scripts/vendor/angular.min.js"></script>
      <script src="scripts/vendor/angular-resource.min.js"></script>
      <script src="scripts/directives/directives.js"></script>
      <script src="scripts/services/services.js"></script>
      <script src="scripts/controllers/controllers.js"></script>
      <link href="styles/bootstrap.css" rel="stylesheet">
      <link href="styles/guthub.css" rel="stylesheet">
    </head>
    <body>
      <header>
        <h1>GutHub</h1>
      </header>

      <div butterbar>Loading...</div>

      <div class="container-fluid">
        <div class="row-fluid">
          <div class="span2">
            <!--Sidebar-->
            <div id="focus"><a href="/#/new">New Recipe</a></div>
            <div><a href="/#/">Recipe List</a></div>

          </div>
          <div class="span10">
            <div ng-view></div>
          </div>
        </div>
      </div>
    </body>
    </html>

__Link href Values__

The hrefs link to the various pages of our single-page application. Notice how they use the # character to ensure that the page doesn’t reload, and are relative to the current page. AngularJS watches the URL (as long as the page isn’t reloaded), and works it magic (or actually, the very boring route management we defined as part of our routes) when needed.

__ng-view__

This is where the last piece of magic happens. In our controllers section, we defined our routes. As part of that definition, we denoted the URL for each route, the controller associated with the route, and a template. When AngularJS detects a route change, it loads the template, attaches the controller to it, and replaces the ng-view with the contents of the template.

Now let’s look at the individual templates associated with each controller, starting with the “list of recipes” template:

    <!-- File is chapter4/guthub/app/views/list.html -->
    <h3>Recipe List</h3>
    <ul class="recipes">
      <li ng-repeat="recipe in recipes">
        <div><a href="/#/view/{{recipe.id}}">{{recipe.title}}</a></div>
      </li>
    </ul>

Notice the usage of the ng-href tag instead of href. This is purely to avoid having a bad link during the time that AngularJS is loading up. The ng-href ensures that at no time is a malformed link presented to the user. Always use this whenever your URLs are dynamic instead of static.

Of course you might wonder: where is the controller? There is no ng-controller defined, and there really was no Main Controller defined. This is where route mapping comes into play. If you remember (or peek back a few pages), the / route redirected to the list template and had the List Controller associated with it. Thus, when any references are made to variables and the like, it is within the scope of the List Controller.

The directive states that the edit() function on the scope is called in case the form is submitted. The form submission happens when any button without an explicit function attached (in this case, the Edit button) is clicked.