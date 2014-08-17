---
layout: post
title: "Angular Services"
category : Angular
tags : [angular, tutorial]
--- 

本书为读 [AngularJS](http://www.salttiger.com/angularjs/) 的读书笔记，该书的例子在 [shyamseshadri/angularjs-book](https://github.com/shyamseshadri/angularjs-book)。

## $resource

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

### Changing Views with Routes and $location

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

## $location

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
url() |/path?param1=value1?hashValue |url('/newPath?p2=v2') ## Model

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

### HTML5 Mode and Hashbang Mode

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

### Server-side configuration

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

## $http

```js
function ShoppingController($scope, $http) {
  $http.get('/products').success(function(data, status, headers, config) {
    $scope.items = data;
  });
}
```

### Communicating Over $http

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

### Configuring Your Request Further

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

### Setting HTTP Headers

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

### Working with RESTful Resources

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

[Declaring your own `$resource` is as simple as calling the injected `$resource` function (you know how to inject things by now, right?) with the right parameters.]()

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