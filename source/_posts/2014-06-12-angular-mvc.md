---
layout: post
title: "Angular MVC"
category : Angular
tags : [angular, tutorial]
--- 

本书为读 [AngularJS](http://www.salttiger.com/angularjs/) 的读书笔记，该书的例子在 [shyamseshadri/angularjs-book](https://github.com/shyamseshadri/angularjs-book)。

## Services

Services are singleton (single-instance) objects that carry out the tasks necessary to support your application’s functionality. Angular comes with many services like `$location`, for interacting with the browser’s location, `$route`, for switching views based on location (URL) changes, and` $http`, for communicating with servers.

With modules, and the dependency injection we get from them, we can write our controller much more simply, like this:

    function ShoppingController($scope, Items) {
      $scope.items = Items.query();
    }

简而言之，Service 就是 _单例对象_ 在AngluarJS 中的一个别名。这些小东西（指单例对象）会被经常传来传去，保证你每次访问到的都是同一个实例，这一点和工厂模式不同。基于这种思想，单例对象让我们可以 实现一些相当酷的功能，它可以让很多 controller 和 directive 访问内部的数值。

那么我们什么时候应该使用service呢？答案是：无论何时，当我们需要在不同的域中共享数据的时候。另外，多亏了Angular的依赖注入系统，实现这一点是很容易并且很清晰的。

通过 `$scope` 来维护数据是非常粗暴的一种方式。由于其它 `controller`、`directive`、`model` 的影响，`$scope` 很容易就会崩溃或者变脏。它很快就会变成一团乱麻。通过一种集中的途径（在这里就是 `service`）来管理数据，然后通过某种方式来请求修改它，这样不仅仅会更加清晰，同时当应用的体积不断增大的时候也更加容易管理。

You can, and should, create your own services to do all of the tasks unique to your application. Angular’s bundled services start with a `$`, so while you can name them anything you like, its a good idea to avoid starting them with `$` to avoid naming collisions.

As services themselves can have dependencies, the Module API lets you define dependencies for your dependencies.

__In most applications, it will work well enough to create a single module for all the code you create and put all of your dependencies in it.__ If you use services or directives from third-party libraries, they’ll come with their own modules. As your app depends on them, you’d refer to them as dependencies of your application’s module.

For instance, if you include the (fictitious) modules SnazzyUIWidgets and SuperDataSync, your application’s module declaration would look like this:

    var appMod = angular.module('app', ['SnazzyUIWidgets', 'SuperDataSync'];

### define

You define services with the module object’s API. There are three functions for creating generic services, with different levels of complexity and ability:

- `provider(name, Object OR constructor())` A configurable service with complex creation logic. If you pass an Object, it should have a function named `$get` that returns an instance of the service. Otherwise, Angular assumes you’ve passed a constructor that, when called, creates the instance.

- `factory(name, $getFunction())` A non-configurable service with complex creation logic. You specify a function that, when called, returns the service instance. You could think of this as `provider(name, { $get: $getFunction() } )`.

- `service(name, constructor())` A non-configurable service with simple creation logic. Like the constructor option with provider, Angular calls it to create the service instance.

We’ll look at the configuration option for `provider()` later, but let’s discuss an example with `factory()` for our preceding Items example. We can write the service like this:

```
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
```

```js
function ShoppingController($scope, Items) {...}
```

When Angular creates the `ShoppingController`, it will pass in `$scope` and the new Items service that we’ve just defined. This is done by parameter name matching. That is, Angular looks at the function signature for our `ShoppingController` class, and notices that it is asking for an `Items` object. Since we’ve defined Items as a service, it knows where to get it.

The result of looking up these dependencies as strings means that the arguments of injectable functions like controller constructors are order-independent. So instead of this:

we can write this:

    function ShoppingController(Items, $scope) {...}

## Controller

Controllers have three responsibilities in your app:

* Set up the initial state in your application’s model
* Expose model and functions to the view (UI template) through `$scope`
* Watch other parts of the model for changes and take action.

Controller 应该纯粹地用来把 service、依赖关系、以及其它对象串联到一起，然后通过 scope 把它们关联到 view 上。如果在你的视图里面需要处理复杂的业务逻辑，那么把它们放到 controller 里面也是一个非常不错的选择。

在 Angular 中，controller 自身并不会处理 "request"，除非它是用来处理路由(route)的（很多人把这种方式叫做创建 _route controller_ ，路由控制器）。

Though we express this as nested controllers, the actual nesting happens in scopes. The `$scope` passed to a nested controller prototypically inherits from its parent controller’s `$scope`. In this case, this means that the `$scope` passed to `ChildController` will have access to all the properties of the `$scope` passed to `ParentController`.

    <div ng-controller="ParentController">
      <div ng-controller="ChildController">...</div>
    </div>

You can think of scopes as a context that you use to make changes to your model observable.

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

<!--more-->

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

In this version, we told our `ng-app` element about the name of our module, myApp.

### Receipt Controllers

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

## Directives

Directives extend HTML syntax, and are the way to associate behavior and DOM transformations with custom elements and attributes. Through them, you can create reusable UI components, configure your application, and do almost anything else you can imagine wanting to do in your UI template.

You can write apps with the built-in directives that come with Angular, but you’ll likely run into situations where you want to write your own. You’ll know it’s time to break into directives when you want to deal with __browser events or modify the DOM__ in a way that isn’t already supported by the built-in directives. This code of yours belongs in a directive that you write, and not in a controller, service, or any other place in your app.

As with services, you define directives through the module object’s API by calling its `directive()` function, where directiveFunction is a factory function that defines your directive’s features.

    var appModule = angular.module('appModule', [...]);
    appModule.directive('directiveName', directiveFunction);

We can now move to the directives we will be using in our application. There will be two directives in the app:

- butterbar
  
    This directive will be shown and hidden when the routes change and while the page is still loading information. It will hook into the route-changing mechanism and automatically hide and show whatever is within its tag ,based on the state of the page.

- focus
  
    The focus directive is used to ensure that specific input fields (or elements) have the focus.

Let’s look at the code:

```js
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
```

Here, we’re returning the directive configuration object with its `link` function specified. The `link` function gets a reference to the enclosing scope, the DOM `element` it lives on, an array of any `attributes` passed to the directive, and the `controller` on the DOM element, if it exists. Here, we only need to get at the element and call its `focus()` method.

Directives go through a two-step process. 

1. In the first step (the compile phase), all directives attached to a DOM element are found, and then processed. Any DOM manipulation also happens during the compile step. At the end of this phase, a linking function is produced.
2. In the second step, the link phase (the phase we used previously), the preceding DOM template produced is linked to the scope. Also, any watchers or listeners are added as needed, resulting in a live binding between the scope and the element. Thus, anything related to the scope happens in the linking phase.

The `butterbar` directive can be used as follows:

    <div butterbar>My loading text...</div>

It basically hides the element right up front, then adds two watches on the root scope. Every time a route change begins, it shows the element (by changing its class), and every time the route has successfully finished changing, it hides the butterbar again.

The final thing of note is the API for working with the element. jQuery veterans will be glad to know that it follows a jQuery-like syntax (`addClass`, `removeClass`). AngularJS implements a subset of the calls of jQuery so that jQuery is an optional dependency for any AngularJS project. In case you do end up using the full jQuery library in your project, you should know that AngularJS uses that instead of the jQlite implementation it has built-in.

我们能否在控制器上实现上面的功能呢？当然可以，但是这样做会带来一个重大的问题。一旦其他的 Controller 需要实现相同的功能，可能需要拷贝代码。

### Library

- [voronianski/ngActivityIndicator](https://github.com/voronianski/ngActivityIndicator/) Angular provider for preloader animations 
<http://labs.voronianski.com/ngActivityIndicator.js>.
- [ngReactGrid by josebalius](http://josebalius.github.io/ngReactGrid) ngReactGrid is an Angular directive that can be used to render an enhanced HTML table or grid of data very fast using React as the rendering engine. It is based on ng-grid and jQuery DataTables. It uses HTML tables and supports fixed column headers by default.

## Templates

Templates in Angular applications are just HTML documents that we load from the server or define in a `<script>` tag like any other static resource.  You define your UI in the template, using standard HTML plus Angular directives where you need UI components.

Once in the web browser, Angular expands these templates into your full application by merging your template with data.

```html
<div ng-repeat="item in items">
  <span>{{item.title}}</span>
  ...
</div>
```

Most apps, however, will use some persistent data source on the server.  Your app in the browser connects to your server and requests whatever it needs for the page the user is on, and Angular merges it with your template.

The basic startup flow looks like this:

1.  A user requests the first page of your application.
2.  The user’s browser makes an HTTP connection to your server and loads the `index.html` page containing your template.
3.  Angular loads into the page, waits for the page to be fully loaded, and then looks for `ng-app` to define its template boundaries.
4.  Angular traverses the template and looks for directives and bindings. This results in registration of listeners and DOM manipulation, as well as fetching initial data from the server. The end result of this work is that the app is bootstrapped and the template is converted into view as a DOM.
5.  You connect to your server to load additional data you need to show the user as needed.

Steps 1 through 3 are standard for every Angular app. It’s in steps 4 and 5 that you have choices. These steps can happen synchronously or asynchronously. For performance, the data your app needs to display to the user on the first view can come down with the HTML template to avoid multiple requests.

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

Notice the usage of the `ng-href` tag instead of href. This is purely to avoid having a bad link during the time that AngularJS is loading up. The `ng-href` ensures that at no time is a malformed link presented to the user. Always use this whenever your URLs are dynamic instead of static.

Of course you might wonder: where is the controller? There is no `ng-controller` defined, and there really was no Main Controller defined. This is where route mapping comes into play. If you remember (or peek back a few pages), the / route redirected to the list template and had the List Controller associated with it. Thus, when any references are made to variables and the like, it is within the scope of the List Controller.

The directive states that the `edit()` function on the scope is called in case the form is submitted. The form submission happens when any button without an explicit function attached (in this case, the Edit button) is clicked.

## Reference

- [AngularJS：何时应该使用Directive、Controller、Service？](http://damoqiongqiu.iteye.com/blog/1971204)