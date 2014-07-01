---
layout: post
title: "Angular Tutorial"
category : Angular
tags : [angular, tutorial]
--- 

本书为读 [AngularJS](http://www.salttiger.com/angularjs/) 的读书笔记，该书的例子在 [shyamseshadri/angularjs-book](https://github.com/shyamseshadri/angularjs-book)。

## Anatomy of an AngularJS Application

Loading the Script:

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
    

If you’re building an all-Angular application:

    <html ng-app>
    …
    </html>

Manage only a part of the page by placing it on some element like a <div>within the page:

    <html>
        …
        <div ng-app>
        …
        </div>
        …
    </html>

<!--more-->

### Templates and Data Binding

1. A user requests the first page of your application.
2. The user’s browser makes an HTTP connection to your server and loads the index.html page containing your template.
3. Angular loads into the page, waits for the page to be fully loaded, and then looks for ng-app to define its template boundaries.
4. Angular traverses the template and looks for directives and bindings. This results in registration of listeners and DOM manipulation, as well as fetching initial data from the server. The end result of this work is that the app is bootstrapped and the template is converted into view as a DOM.
5. You connect to your server to load additional data you need to show the user as needed.

Steps 1 through 3 are standard for every Angular app. It’s in steps 4 and 5 that you have choices. These steps can happen synchronously or asynchronously. For performance, the data your app needs to display to the user on the first view can come down with the HTML template to avoid multiple requests.

### Displaying Text

It has two equivalent forms. One we’ve seen with double-curly braces:

    <p>{{greeting}}</p>

Then there’s an attribute-based directive called ng-bind:

    <p ng-bind="greeting"></p>

如何使用这两种方式：

- With the double-curly syntax, on the very first page load of your application’s index.html, there’s a chance that your user will see the un-rendered template before Angular has a chance to replace the curlies with your data. Subsequent views won’t suffer from this. The reason is that the browser loads the HTML page, renders it, and only then does Angular get a chance to interpret it as you intended.

- The good news is that you can still use {%raw%}{{ }}{%endraw%} in the majority of your templates. For the data binding you do in your index.html page, however, use ng-bind instead. That way, your users will see nothing until the data has loaded.

### Form Inputs

you can use the ng-model attribute to bind elements to your model properties:

    <form ng-controller="SomeController">
      <input type="checkbox" ng-model="youCheckedIt">
    </form>

This means that:

- When the user checks the box, a property called youCheckedIt on the SomeController’s $scope will become true. Unchecking the box makes youCheckedIt false.
- If you set $scope.youCheckedIt to true in SomeController, the box becomes checked in the UI. Setting it to false unchecks the box.

you can call `$watch()` with an expression to observe and a callback that gets invoked whenever that expression changes:

    <form ng-controller="StartUpController">
        Starting: <input ng-model="funding.startingEstimate">
        Recommendation: {{funding.needed}}
    </form>


    function StartUpController($scope) {
      $scope.funding = { startingEstimate: 0 };

      computeNeeded = function() {
        $scope.funding.needed = $scope.funding.startingEstimate * 10;
      };

      $scope.$watch('funding.startingEstimate', computeNeeded);
    }

If you have a form that groups inputs, you can use the ng-submit directive on the form itself to specify a function to call when the form submits:

    <form ng-submit="requestFunding()" ng-controller="StartUpController">
      Starting: <input ng-change="computeNeeded()" ng-model="startingEstimate">
      Recommendation: {{needed}}
      <button>Fund my startup!</button>
    </form>

The ng-submit directive also automatically prevents the browser from doing its default POST action when it tries to submit the form.

### Lists, Tables, and Other Repeated Elements

`ng-repeat` creates a copy of a set of elements once for every item in a collection.

To display this list of students, we can do something like the following:

    <ul ng-controller=''>
      <li ng-repeat='student in students'>
        <a href='/student/view/{{student.id}}'>{{student.name}}</a>
      </li>
    </ul>

    var students = [{name:'Mary Contrary', id:'1'},
                    {name:'Jack Sprat', id:'2'},
                    {name:'Jill Hill', id:'3'}];

    function StudentListController($scope) {
      $scope.students = students;
    }

As we’ve seen before, changing the student’s array will automatically change the rendered list. If we were to do something like inserting a new student into the list:

    <ul ng-controller=''>
      <li ng-repeat='student in students'>
        <a href='/student/view/{{student.id}}'>{{student.name}}</a>
      </li>
    </ul>
    <button ng-click="insertTom()">Insert</button>

    var students = [{name:'Mary Contrary', id:'1'},
                {name:'Jack Sprat', id:'2'},
                {name:'Jill Hill', id:'3'}];

    function StudentListController($scope) {
      $scope.students = students;

      $scope.insertTom = function () {
        $scope.students.splice(1, 0, {name:'Tom Thumb', id:'4'});
      };
    }

The ng-repeat directive also gives you references to the index of the current element via $index, and booleans that tell you if you’re on the first element, somewhere in the middle, or the last element of the collection with $first, $middle, and $last.
You might imagine using the $index to label rows in a table. Given a template like this:

    <table ng-controller='AlbumController'>
      <tr ng-repeat='track in album'>
        <td>{{$index + 1}}</td>
        <td>{{track.name}}</td>
        <td>{{track.duration}}</td>
      </tr>
    </table>

and this controller:

    var album = [{name:'Southwest Serenade', duration: '2:34'},
             {name:'Northern Light Waltz', duration: '3:21'},
             {name:'Eastern Tango', duration: '17:45'}];

    function AlbumController($scope) {
      $scope.album = album;
    }

### Hiding and Showing

These directives work by setting the element styles to display:block to show and display:none to hide as appropriate. Let’s take a fictitious example where we’re building the control panel for a Death Ray.

    <div ng-controller='DeathrayMenuController'>
      <button ng-click='toggleMenu()'>Toggle Menu</button>
      <ul ng-show='menuState.show'>
        <li ng-click='stun()'>Stun</li>
        <li ng-click='disintegrate()'>Disintegrate</li>
        <li ng-click='erase()'>Erase from history</li>
      </ul>
    <div/>

    function DeathrayMenuController($scope) {
      $scope.menuState.show = false;

      $scope.toggleMenu = function() {
        $scope.menuState.show = !$scope.menuState.show;
      };

      // death ray functions left as exercise to reader
    }


### CSS Classes and Styles

Angular provides the ng-class and ng-style directives. Each of them takes an expression. The result of evaluating this expression can be one of the following:

* A string representing space-delimited class names
* An array of class names
* A map of class names to boolean values

Let’s imagine that you want to display errors and warnings to your users in a standard location in the application’s header. Using the ng-class directive, you could do something like this:

    .error {
      background-color: red;
    }

    .warning {
      background-color: yellow;
    }

    <div ng-controller='HeaderController'>
      ...
      <div ng-class='{error: isError, warning: isWarning}'>{{messageText}}</div>
      …
      <button ng-click='showError()'>Simulate Error</button>
      <button ng-click='showWarning()'>Simulate Warning</button>
    </div>

    function HeaderController($scope) {
      $scope.isError = false;
      $scope.isWarning = false;

      $scope.showError = function() {
        $scope.messageText = 'This is an error!';
        $scope.isError = true;
        $scope.isWarning = false;
      };

    $scope.showWarning = function() {
        $scope.messageText = 'Just a warning.  Please carry on.';
        $scope.isWarning = true;
        $scope.isError = false;
      };
    }

You can even do nifty things like highlighting a selected row in a table. Let’s say we’re building a restaurant directory and we want to highlight a row that the user clicks on.
In our CSS, we set up the style for a highlighted row:

    .selected {
      background-color: lightgreen;
    }

In the template, we set ng-class to {selected: $index==selectedRow}. This has the effect of setting the selected class when our model property called selectedRow matches the ng-repeat’s $index. We’ll also set up an ng-click to notify our controller as to which row the user clicks:

    <table ng-controller='RestaurantTableController'>
      <tr ng-repeat='restaurant in directory' ng-click='selectRestaurant($index)'
          ng-class='{selected: $index==selectedRow}'>
        <td>{{restaurant.name}}</td>
        <td>{{restaurant.cuisine}}</td>
      </tr>
    </table>

In our JavaScript, we just set up some dummy restaurants and create the selectRow function:

    function RestaurantTableController($scope) {
      $scope.directory = [{name:'The Handsome Heifer', cuisine:'BBQ'},
                          {name:'Green's Green Greens', cuisine:'Salads'},
                          {name:'House of Fine Fish', cuisine:'Seafood'}];

      $scope.selectRestaurant = function(row) {
        $scope.selectedRow = row;
      };
    }

### Considerations for src and href Attributes

When data binding to an `<img>` or `<a>` tag, the obvious path of using {%raw%}{{ }}{%endraw%} in the src or href attributes won’t work well. Because browsers are aggressive about loading images parallel to other content, Angular doesn’t get a chance to intercept data binding requests. While the obvious syntax for an `<img> `might be:

    <img src="/images/cats/{{favoriteCat}}">

Instead, you should use the `ng-src` attribute and write your template as:

    <img ng-src="/images/cats/{{favoriteCat}}">

Similarly, for the `<a>` tag, you should use `ng-href`:

    <a ng-href="/shop/category={{numberOfBalloons}}">some text</a>

### Expressions

The goal behind the expressions that you use in templates is to let you be as clever as you need to be to create hooks between your template, your application logic, and your data, but at the same time prevent application logic from sneaking into the template.

Until this point, we’ve been mostly using references to data primitives as the expressions passed to Angular directives. But these expressions can do much more. You can do simple math (+, -, /, *, %), make comparisons (==, !=, >, <, >=), perform boolean logic (&&, ||, !) and bitwise operations (\^, &, |). 

You can call functions you expose on $scope in your controller and you can reference arrays and object notation ([ ], { }, .).
All of these are valid examples of expressions:

    <div ng-controller='SomeController'>
      <div>{{recompute() / 10}}</div>
      <ul ng-repeat='thing in things'>
        <li ng-class='{highlight: $index % 4 >= threshold($index)}'>
          {{otherFunction($index)}}
        </li>
      </ul>
    </div>


The first expression here, recompute() / 10, while valid, is a good example of putting logic in the template, and should be avoided. Keeping a separation of responsibilities between your view and controllers ensures that they’re easy to reason and easy to test.

While you can do quite a lot with expressions, they are computed with a custom parser that’s part of Angular. They are not evaluated using JavaScript’s eval(), and are considerably more restrictive.

Instead, they are evaluated using a custom parser that comes with Angular. In it, you won’t find looping constructs (for, while, and so on), flow-of-control operators (if-else, throw) or operators that modify data (++, --). When you need these types of operations, do them in your controller or via a directive.

Though expressions are more restrictive than JavaScript in many ways, they are more forgiving to undefined and null. Instead of throwing a NullPointerException error, templates will simply render nothing. This allows you to safely use model values that haven’t been set yet, and have them appear in the UI as soon as they get populated.

### Observing Model Changes with $watch

The function’s signature is:

    $watch(watchFn, watchAction, deepWatch) 

The details of each parameter are as follows:

- watchFn

    This parameter is a string with an Angular expression or a function that returns the current value of the model that you want to watch. This expression will be evaluated multiple times, so you need to make sure that it has no side effects. That is, it can be called multiple times without changing state. For the same reason, watch expressions should be computationally cheap. If you’ve passed in an Angular expression in a string, it will be evaluated against objects available to the scope it’s called on.

- watchAction

    This is the function or expression to be called when the watchFn changes. In the function form, it receives the new and old values of watchFn as well as a reference to the scope. Its signature is function(newValue, oldValue, scope).

- deepWatch

    If set to true, this optional boolean parameter tells Angular to examine each property within the watched object for changes. You’d use this if you wanted to watch individual elements in an array or properties in an object instead of just a simple value. As Angular needs to walk the array or object, this can be computationally expensive if the collection is large.

The $watch function returns a function that will de-register the listener when you no longer want to receive change notifications.
If we wanted to watch a property and then later de-register it, we would use the following:

    ...
    var dereg = $scope.$watch('someModel.someProperty', callbackOnChange());
    …
    dereg();

Let’s say that we want to apply a $10 discount when the customer adds more than $100 worth of merchandise to her cart. For a template, we’ll use:

 {% raw %}
    <div ng-controller="CartController">
      <div ng-repeat="item in items">
        <span>{{item.title}}</span>
        <input ng-model="item.quantity">
        <span>{{item.price | currency}}</span>
        <span>{{item.price * item.quantity | currency}}</span>
      </div>
      <div>Total: {{totalCart() | currency}}</div>
      <div>Discount: {{bill.discount | currency}}</div>
      <div>Subtotal: {{subtotal() | currency}}</div>
    </div>
{% endraw %}

With a CartController, it would look like the following:

    function CartController($scope) {
      $scope.bill = {};

      $scope.items = [
        {title: 'Paint pots', quantity: 8, price: 3.95},
        {title: 'Polka dots', quantity: 17, price: 12.95},
        {title: 'Pebbles', quantity: 5, price: 6.95}
      ];

      $scope.totalCart = function() {
        var total = 0;
        for (var i = 0, len = $scope.items.length; i < len; i++) {
          total = total + $scope.items[i].price * $scope.items[i].quantity;
        }

        return total;
      }

      $scope.subtotal = function() {
        return $scope.totalCart() - $scope.discount;
      };

      function calculateDiscount(newValue, oldValue, scope) {
        $scope.bill.discount = newValue > 100 ? 10 : 0;
      }

      $scope.$watch($scope.totalCart, calculateDiscount);
    }

![angular-watch.png](http://johnnyimages.qiniudn.com/angular-watch.png)

__Watching multiple things__

What if you want to watch multiple properties or objects and execute a function whenever any of them change? You’d have two basic options:

* Put them into an array or object and pass in deepWatch as true.
* Watch a concatenated value of the properties.

In the first case, if you’ve got an object with two properties _a_ and _b_ in your scope, and want to execute the callMe() function on change, you could watch both of them, like so:

$scope.$watch('things.a + things.b', callMe(...)); Of course, _a_ and _b_ could be on different objects, and you could make the list as long as you like. If the list is long, you would likely write a function that returns the concatenated value rather than relying on an expression for the logic. In the second case, you might want to watch all the properties on the things object. In this case, you could do this:$scope.$watch('things', callMe(...), true);

__Performance Considerations in watch()__


The preceding example executes correctly, but there is a potential problem with performance. Though it isn’t obvious, if you put a debugger breakpoint in totalCart(), you’d see that it gets called six times to render this page. Though you’d never notice it in this application, in more complex apps, running it six times could be an issue.

Why six? Three of them we can trace pretty easily, as it runs one time each in:

* The template as {% raw %}{{totalCart() | currency}}{% endraw %}
* The subtotal() function
* The $watch() function

Then Angular runs all of these again, bringing us to six. Angular does this to verify that transitive changes in your model have fully propagated and your model has _settled_ . Angular does this checking by making a copy of all watched properties and comparing them to the current value to see if they’ve changed. In fact, Angular may run this up to ten times to ensure full propagation. If changes are still occurring after ten iterations, Angular exits with an error. If that occurs, you probably have a dependency loop that you’ll need to fix.

Though you currently need to worry about this, by the time you’ve finished this book it may be a non-issue. While Angular has had to implement data binding in JavaScript, we’ve been working with the TC39 folks on a low-level native implementation called[Object.observe()](http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe). With this in place, Angular will automatically use Object.observe() wherever present to give you native-speed data binding.

As you’ll see in the next chapter, Angular has a nice Chrome debugging extension called Batarang that will automatically highlight expensive data bindings for you.

Now that we know about this issue, there are a few ways we can solve it. One way would be to create a $watch on changes to the items array and just recalculate the total, discount, and subtotal as properties on the $scope.

To do this, we’d update the template to use these properties:

{% raw %}
    <div>Total: {{bill.total | currency}}</div>
    <div>Discount: {{bill.discount | currency}}</div>
    <div>Subtotal: {{bill.subtotal | currency}}</div>
{% endraw %}

Then, in JavaScript, we’d watch the items array, and call a function to calculate the totals on any change to that array, like so:

    function CartController($scope) {
      $scope.bill = {};

      $scope.items = [
        {title: 'Paint pots', quantity: 8, price: 3.95},
        {title: 'Polka dots', quantity: 17, price: 12.95},
        {title: 'Pebbles', quantity: 5, price: 6.95}
      ];

      var calculateTotals = function() {
        var total = 0;
        for (var i = 0, len = $scope.items.length; i < len; i++) {
          total = total + $scope.items[i].price * $scope.items[i].quantity;
        }
        $scope.bill.totalCart = total;
        $scope.bill.discount = total > 100 ? 10 : 0;
        $scope.bill.subtotal = total - $scope.bill.discount;
      };

      $scope.$watch('items', calculateTotals, true);
    }

Notice here that the $watch specified items as a string. This is possible because the $watch function can take either a function (as we did previously) or a string. If a string is passed to the $watch function, then it will be evaluated as an expression in the scope of the $scope it’s called on.

This strategy might work well for your app. However, since we’re watching the items array, Angular will have to make a copy of it to compare it for us. For a large list of items, it may perform better if we just recalculate the bill properties every time Angular evaluates the page. We can do this by creating a $watch with only a watchFn that will recalculate our properties like this:


    $scope.$watch(function() {
      var total = 0;
      for (var i = 0; i < $scope.items.length; i++) {
        total = total + $scope.items[i].price * $scope.items[i].quantity;
      }
      $scope.bill.totalCart = total;
      $scope.bill.discount = total > 100 ? 10 : 0;
      $scope.bill.subtotal = total - $scope.bill.discount;
    });

### Formatting Data with Filters

Filters allow you to declare how to transform data for display to the user within an interpolation in your template. The syntax for using filters is:

{% raw %}
    {{ expression | filterName : parameter1 : ...parameterN }} 
{% endraw %}

where expression is any Angular expression, filterName is the name of the filter you want to use, and the parameters to the filter are separated by colons. The parameters themselves can be any valid Angular expression.

Angular comes with several filters, like currency, which we’ve seen:

{% raw %}
    {{12.9 | currency}}
{% endraw %}

This bit of code will display the following: $12.90 We put this declaration in the view (rather than in the controller or model) because the dollar sign in front of the number is only important to humans, and not to the logic we use to process the number.

Other filters that come with Angular include date, number, uppercase, and more.

Filters can also be chained with additional pipe symbols in the binding. For example, we can format the previous example for no digits after the decimal by adding the number filter, which takes the number of decimals to round to as a parameter. So:

{% raw %}
    {{12.9 | currency | number:0 }} 
{% endraw %}

displays: $13

You’re not limited to the bundled filters, and it is simple to write your own. If we wanted to create a filter that title-cased strings for our headings, for example, we could do so as follows:

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
With a template like this:

{% raw %}
    <body ng-app='HomeModule' ng-controller="HomeController">
      <h1>{{pageHeading | titleCase}}</h1>
    </body>
{% endraw %}

and inserting the pageHeading as a model variable via a controller:

    function HomeController($scope) {
      $scope.pageHeading = 'behold the majesty of your page title';
    }

### Changing Views with Routes and $location

We’re building an email app that will easily win out over Gmail, Hotmail, and all the others. We’ll call it…A-Mail.

index.html

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

As our view templates will be inserted into the shell we just created, we can write them as partial HTML documents. For the email list, we’ll use ng-repeat to iterate through a list of messages and render them into a table.
list.html

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

To create this message detail view, we’ll create a template that displays properties from a single message object.

detail.html

    <div><strong>Subject:</strong> {{message.subject}}</div>
    <div><strong>Sender:</strong> {{message.sender}}</div>
    <div><strong>Date:</strong> {{message.date}}</div>
    <div>
        <strong>To:</strong>
        <span ng-repeat='recipient in message.recipients'>{{recipient}} </span>
    <div>{{message.message}}</div>
    <a href='#/'>Back to message list</a>

Now, to associate these templates with some controllers, we’ll configure the $routeProvider with the URLs that invoke our controllers and templates.

controllers.js

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

We’ve created the basic structure for an app with many views. We switch views by changing the URL. This means that the forward and back buttons just work for users. Users are able to bookmark and email links to views within the app, even though there is only one real HTML page.

### Talking to Servers

    function ShoppingController($scope, $http) {
      $http.get('/products').success(function(data, status, headers, config) {
        $scope.items = data;
      });
    }

### Validating User Input

    <h1>Sign Up</h1>
    <form name='addUserForm' ng-controller="AddUserController">
      <div ng-show='message'>{{message}}</div>
      <div>First name: <input name='firstName' ng-model='user.first' required></div>
      <div>Last name: <input ng-model='user.last' required></div>
      <div>Email: <input type='email' ng-model='user.email' required></div>
      <div>Age: <input type='number'
                       ng-model='user.age'
                       ng-maxlength='3'
                       ng-min='1'></div>
      <div><button ng-click='addUser()'
                   ng-disabled='!addUserForm.$valid'>Submit</button>
    </ng-form>

Notice that we’re using the required attribute and input types for email and number from HTML5 to do our validation on some of the fields. This works great with Angular, and in older non-HTML5 browsers, Angular will polyfill these with directives that perform the same jobs.

    function AddUserController($scope) {
      $scope.message = '';

      $scope.addUser = function () {
        // TODO for the reader: actually save user to database...
        $scope.message = 'Thanks, ' + $scope.user.first + ', we added you!';
      };
    }

Inside the controller, we can access the validation state of the form through a property called $valid. Angular will set this to true when all the inputs in the form are valid. We can use this $valid property to do nifty things such as disabling the Submit button when the form isn’t completed yet.

We can prevent form submission in an invalid state by adding ng-disabled to the Submit button:

    <button ng-disabled='!addUserForm.$valid'>Submit</button>

## Communicating with Servers

### Communicating Over $http

Angular’s core $http service would look something like the following:

    $http.get('api/user', {params: {id: '5'}
    }).success(function(data, status, headers, config) {
     // Do something successful.
    }).error(function(data, status, headers, config) {
     // Handle the error
    });

The $http.get method we used in the preceding example is just one of the many convenience methods that the core $http AngularJS service provides. Similarly, if you wanted to make a POST request using AngularJS with the same URL parameters and some POST data, you would do so as follows:

    var postData = {text: 'long blob of text'};
      // The next line gets appended to the URL as params
      // so it would become a post request to /api/user?id=5
      var config = {params: {id: '5'}};
      $http.post('api/user', postData, config
    ).success(function(data, status, headers, config) {
      // Do something successful
    }).error(function(data, status, headers, config) {
      // Handle the error
    });

Similar convenience methods are provided for most of the common request types, including:

* GET
* HEAD
* POST
* DELETE
* PUT
* JSONP

### Configuring Your Request Further

At times, the standard request options provided out of the box are not enough. This could be because you want to:

* Add some authorization headers for your request
* Change how caching is handled for the request
* Transform the request going out, or the response coming in, in certain set ways

The barebones method call would look something like:

    $http(config)

What follows is a basic pseudo-code template for calling this method:

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

The GET, POST, and other convenience methods set the method, so you don’t need to. 

### Setting HTTP Headers

These are set in the $httpProvider.defaults.headers configuration object. This step is usually done in the config part of setting up your app. So if you wanted to enable “DO NOT TRACK” for all your GET requests, while removing the Requested-With header for all your requests, you could simply do the following:

    angular.module('MyApp',[]).
      config(function($httpProvider) {
        // Remove the default AngularJS X-Request-With header
        delete $httpProvider.default.headers.common['X-Requested-With'];
        // Set DO NOT TRACK for all Get requests
        $httpProvider.default.headers.get['DNT'] = '1';
     });

If you want to set the headers for only certain requests, but not as a default, then you can pass the header in as part of the config object to $http service. The same custom header can be passed to a GET request as part of the second parameter, which also takes your URL parameters:

    $http.get('api/user', {
       // Set the Authorization header. In an actual app, you would get the auth
       // token from a service
       headers: {'Authorization': 'Basic Qzsda231231'},
       params: {id: 5}
    }).success(function() { // Handle success });

### Working with RESTful Resources

The ngResource is a separate, optional module. To use it, you need to:

* Include the _angular-resource.js_ in your script files that are sourced.
* Include ngResource in your module dependency declaration (such as, angular.module(‘myModule’, [‘ngResource’])).
* Use inject $resource where needed.

E.g.

    myAppModule.factory('CreditCard', ['$resource', function($resource) {
      return $resource('/user/:userId/card/:cardId',
            {userId: 123, cardId: '@id'},
            {charge: {method:'POST', params:{charge:true}, isArray:false});
    }]);

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

    // Let us assume that the CreditCard service is injected here

    // We can retrieve a collection from the server which makes the request
    // GET: /user/123/card
    var cards = CreditCard.query();

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

The second parameter takes care of the default parameters to be passed along with each request. In this case, we pass in the userId as a constant 123. The cardId parameter is more interesting. We say cardId is "@id.” This denotes that if I am using a returned object from the server, and I call any method on it (such as $save), then the cardId field is to be picked from the id property on the object.

The third argument to the $resource call is optional additional methods you want to expose on your resource.

In this case, we specify a method charge. This can be configured by passing in an object, with the key being the method name to be exposed. The configuration needs to specify the method type of the request (GET, POST, and so on), the parameters that need to be passed as part of that request (charge=true in this case), and if the returned result is an array or not (not, in this case). Once that is done, you are free to start calling CreditCard.charge() whenever you want (as long as the user has charged in real life, of course!).

You would be correct to worry about whether the code will work, but the code is actually correct and will work. What’s happening here is that AngularJS assigned a reference (an object or an array, depending on the expected return type), which will get populated at some point in the future when the server requests returns. In the meantime, the object will remain empty.

Since the most common flow with AngularJS apps is to fetch data from the server, assign it to a variable, and display it in the template, this shortcut is nice. In your controller code, all you have to do is make the server-side call, assign the return value to the right scope variable, and let the template worry about rendering it when it returns.

This approach will not work for you if you have some business logic you want executed on the return value. In such a case, you will have to depend on the callback, which is used in the CreditCard.get() call.

## Developing in AngularJS

### Server

__With Yeoman__

Yeoman makes it simple for you to start a web server and serve all your static and AngularJS-related files. Just execute the following command:

    yeoman server

and it will start up a server and open your browser with the main page of your AngularJS application. It will even refresh the browser whenever you make changes to your source code. How cool is that?

__Express__

    npm install -g express

// available at chapter3/sample-app/web-server.js

    var express = require("express"),
      app     = express(),
      port    = parseInt(process.env.PORT, 10) || 8080;

    app.configure(function(){
      app.use(express.methodOverride());
      app.use(express.bodyParser());
      app.use(express.static(__dirname + '/'));
      app.use(app.router);
    });

    app.listen(port);
    console.log('Now serving the app at http://localhost:' + port + '/app');

Run:

    node web-server.js

### Testing

#### Karma’s

Karma’s main reason for existence is to make your test-driven development (TDD) workflow simple, fast, and fun. It uses[NodeJS](http://www.nodejs.org/) and [SocketIO](http://www.socket.io/) (you don’t need to know what they are, just assume that they are awesome, cool libraries) to allow running your code, and tests in multiple browsers at insanely fast speeds. Go find out more at [https://github.com/vojtajina/karma/](https://github.com/vojtajina/karma/).

1. Set up Karma

        npm install -g karma

2. Getting your config file up

    If you used Yeoman to create your app skeleton, then you already have a ready-made Karma config file waiting for you to use. If not, just go ahead and execute the following command from the base folder of your application directory: 

        karma init

    in your terminal console, and it will generate a dummy config file ( _karma.conf.js_ ) for you to edit to your liking, with some pretty standard defaults. You can use that.

3. Starting the Karma server

    Just run the following command: 

        karma start [optionalPathToConfigFile]

    This will start the Karma server on port 9876 (the default, which you can change by editing the _karma.conf.js_ file from the previous step). While Karma should open up a browser and capture it automatically, it will print all the instructions needed to capture another browser in the console. If you are too lazy to do that, just go to [http://localhost:9876](http://localhost:9876/) in another browser or device, and you are good to start running tests in multiple browsers.

4. Running the tests

    Execute the following command: 

        karma run

    That’s it. You should get your results printed right in the console where you ran the command.


#### Unit Tests

AngularJS makes it easy to write your unit tests, and supports the Jasmine style of writing tests by default (as does Karma). Jasmine is what we call a behavior-driven development framework, which allows you to write specifications that denote how your code should behave. A sample test in Jasmine might look something like this.
describe("MyController:", function() {

    it("to work correctly", function() {
        var a = 12;
        var b = a;

        expect(a).toBe(b);
        expect(a).not.toBe(null);
      });
    });

AngularJS provides some nice mockups, as well as testing functions, to allow you to create services, controllers, and filters right in your unit tests, as well as mock out HttpRequests and the like.

Karma does not have plug-ins (yet!) for all the latest and greatest IDEs, but you don’t really need any. All you need to do is add a shortcut command to execute “karma start” and “karma run” from within your IDE. This can usually be done by adding a simple script to execute, or the actual shell command, depending on your choice of editor. You should see the results every time it finishes running, of course.

### Batarang

Batarang is a Chrome extension that adds AngularJS knowledge to the built-in Developer Tools suite in Google Chrome. 

### Yeoman: Optimizing Your Workflow

[Yeoman - Modern workflows for modern webapps](http://yeoman.io/)


1. Installing Yeoman

        npm install -g yo

2. Starting a Fresh AngularJS project

        yeoman init angular

3. Running Your Server
        
        yeoman server

4. Adding New Routes, Views, and Controllers

        yeoman init angular:route routeName

    So if you ended up running yeoman init angular:route home, it would:

    * Create a _home.js_ controller skeleton in the _app/scripts/controllers_ folder
    * Create a _home.js_ test spec skeleton in the _test/specs/controllers_ folder
    * Add the _home.html_ template to the _app/views_ folder
    * Hook up the home route in the main app module ( _app/scripts/app.js_ file)

5. Testing

    We’ve already seen how ridiculously easy it is to start and run tests using Karma. In the end, just two commands were needed to run all your unit tests.

    Yeoman makes it easier (if you can believe it). Anytime you generate a file using Yeoman, it also creates a testing stub for you to fill out. Once you’ve installed Karma, running tests with Yeoman is as simple as executing the following command:

        yeoman test

6. Building Your Project

    Building the production-ready version of your app can be a pain, or at least involve many steps. Yeoman alleviates some of this by allowing you to:

    * Concatenate all your JS Scripts into one file
    * Version your files
    * Optimize images
    * Generate Application Cache manifests

    All these benefits come from just one command:

        yeoman build

## UI

- <http://angular-ui.github.io/>
- [AngularJS Multi-Step Form Using UI Router ♥ Scotch](http://scotch.io/tutorials/javascript/angularjs-multi-step-form-using-ui-router?)
- [All Search and Social Media Meta Tags Starter Template ♥ Scotch](http://scotch.io/quick-tips/all-search-and-social-media-meta-tags-starter-template)
- [Thumbtack Engineering](http://www.thumbtack.com/engineering/introducing-smarty)

## Tutorial

- [AngularJS：何时应该使用Directive、Controller、Service](http://damoqiongqiu.iteye.com/blog/1971204)