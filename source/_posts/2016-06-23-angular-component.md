layout: post
title: "Angular Component"
description: ""
category: Angular
tags: [angular, component, directive]
---

## Understanding Components

In Angular, a Component is a special kind of [directive](https://docs.angularjs.org/guide/directive) that uses a simpler configuration which is suitable for a component-based application structure.

This makes it easier to write an app in a way that's similar to using Web Components or using Angular 2's style of application architecture.

<!-- more -->

Advantages of Components:

* simpler configuration than plain directives
* promote sane defaults and best practices
* optimized for component-based architecture
* writing component directives will make it easier to upgrade to Angular 2

When not to use Components:

* for directives that rely on DOM manipulation, adding event listeners etc, because the compile and link functions are unavailable
* when you need advanced directive definition options like priority, terminal, multi-element 
* when you want a directive that is triggered by an attribute or CSS class, rather than an element

## Creating and configuring a Component

Components can be registered using the `.component()` method of an Angular module (returned by [`angular.module()`](https://docs.angularjs.org/guide/module)). The method takes two arguments:

* The name of the Component (as string).
* The Component config object. (Note that, unlike the `.directive()` method, this method does **not** take a factory function.)

```js
angular.module('heroApp', []).controller('mainCtrl', function() {
  this.hero = {
    name: 'Spawn'
  };
});
```

```js
function HeroDetailController() {

}

angular.module('heroApp').component('heroDetail', {
  templateUrl: 'heroDetail.html',
  controller: HeroDetailController,
  bindings: {
    hero: '='
  }
});
```

```html
<!-- components match only elements -->
<div ng-controller="mainCtrl as ctrl">
  <b>Hero</b><br>
  <hero-detail hero="ctrl.hero"></hero-detail>
</div>
```

It's also possible to add components via [`$compileProvider`](https://docs.angularjs.org/api/ng/provider/$compileProvider#component) in a module's config phase.

## Comparison between Directive definition and Component definition

&nbsp;            | Directive            | Component                       
----------------- | -------------------- | --------------------------------
bindings          | No                   | Yes (binds to controller)       
bindToController  | Yes (default: false) | No (use bindings instead)       
compile function  | Yes                  | No                              
controller        | Yes                  | Yes (default `function() {}`)   
controllerAs      | Yes (default: false) | Yes (default: `$ctrl`)          
link functions    | Yes                  | No                              
multiElement      | Yes                  | No                              
priority          | Yes                  | No                              
require           | Yes                  | Yes                             
restrict          | Yes                  | No (restricted to elements only)
scope             | Yes (default: false) | No (scope is always isolate)    
template          | Yes                  | Yes, injectable                 
templateNamespace | Yes                  | No                              
templateUrl       | Yes                  | Yes, injectable                 
terminal          | Yes                  | No                              
transclude        | Yes (default: false) | Yes (default: false)            

## Component-based application architecture

As already mentioned, the component helper makes it easier to structure your application with
a component-based architecture. But what makes a component beyond the options that
the component helper has?

* **Components only control their own View and Data:**
    Components should never modify any data or DOM that is out of their own scope. Normally, in Angular it is possible to modify data anywhere in the application through scope inheritance and watches. This is practical, but can also lead to problems when it is not clear which part of the application is responsible for modifying the data. That is why component directives use an isolate scope, so a whole class of scope manipulation is not possible.

    ![](https://docs.angularjs.org/img/tutorial/tutorial_03.png)

    See more [AngularJS: Tutorial: 3 - Components](https://docs.angularjs.org/tutorial/step_03)
* **Components have a well-defined public API - Inputs and Outputs:**
    However, scope isolation only goes so far, because Angular uses two-way binding. So if you pass
    an object to a component like this - `bindings: {item: '='}`, and modify one of its properties, the
    change will be reflected in the parent component. For components however, only the component that owns
    the data should modify it, to make it easy to reason about what data is changed, and when. For that reason,
    components should follow a few simple conventions:
    * Inputs should be using `<` and `@` bindings. The `<` symbol denotes [one-way bindings](https://docs.angularjs.org/api/ng/service/$compile#-scope-) which are
        available since 1.5. The difference to `=` is that the bound properties in the component scope are not watched, which means
        if you assign a new value to the property in the component scope, it will not update the parent scope. Note however, that both parent
        and component scope reference the same object, so if you are changing object properties or array elements in the
        component, the parent will still reflect that change.
        The general rule should therefore be to never change an object or array property in the component scope.
        `@` bindings can be used when the input is a string, especially when the value of the binding doesn't change.

        ```js
        bindings: {
          hero: '<',
          comment: '@'
        }
        ```

    * Outputs are realized with `&` bindings, which function as callbacks to component events.

        ```js
        bindings: {
          onDelete: '&',
          onUpdate: '&'
        }
        ```

    * Instead of manipulating Input Data, the component calls the correct Output Event with the changed data.
        For a deletion, that means the component doesn't delete the `hero` itself, but sends it back to
        the owner component via the correct event.

        ```html
        <!-- note that we use kebab-case for bindings in the template as usual -->
        <editable-field on-update="$ctrl.update('location', value)"></editable-field><br>
        <button ng-click="$ctrl.onDelete({hero: $ctrl.hero})">Delete</button>
        ```

    * That way, the parent component can decide what to do with the event (e.g. delete an item or update the properties)

        ```js
        ctrl.deleteHero(hero) {
          $http.delete(...).then(function() {
            var idx = ctrl.list.indexOf(hero);
            if (idx >= 0) {
              ctrl.list.splice(idx, 1);
            }
          });
        }
        ```

* **Components have a well-defined lifecycle**
    Each component can implement "lifecycle hooks". These are methods that will be called at certain points in the life
    of the component. The following hook methods can be implemented:
    * `$onInit()` - Called on each controller after all the controllers on an element have been constructed and
        had their bindings initialized (and before the pre & post linking functions for the directives on
        this element). This is a good place to put initialization code for your controller.
    * `$onChanges(changesObj)` - Called whenever one-way bindings are updated. The `changesObj` is a hash whose keys
        are the names of the bound properties that have changed, and the values are an object of the form
        `{ currentValue, previousValue, isFirstChange() }`. Use this hook to trigger updates within a component such as
        cloning the bound value to prevent accidental mutation of the outer value.
    * `$onDestroy()` - Called on a controller when its containing scope is destroyed. Use this hook for releasing
        external resources, watches and event handlers.
    * `$postLink()` - Called after this controller's element and its children have been linked. Similar to the post-link
        function this hook can be used to set up DOM event handlers and do direct DOM manipulation.
        Note that child elements that contain `templateUrl` directives will not have been compiled and linked since
        they are waiting for their template to load asynchronously and their own compilation and linking has been
        suspended until that occurs.
        This hook can be considered analogous to the `ngAfterViewInit` and `ngAfterContentInit` hooks in Angular 2.
        Since the compilation process is rather different in Angular 1 there is no direct mapping and care should
        be taken when upgrading.

By implementing these methods, your component can hook into its lifecycle.

* **An application is a tree of components:**
    Ideally, the whole application should be a tree of components that implement clearly defined inputs
    and outputs, and minimize two-way data binding. That way, it's easier to predict when data changes and what the state
    of a component is.

## Example of a component tree

The following example expands on the simple component example and incorporates the concepts we introduced
above:

Instead of an ngController, we now have a heroList component that holds the data of
different heroes, and creates a heroDetail for each of them.

The heroDetail component now contains new functionality:

* a delete button that calls the bound `onDelete` function of the heroList component
* an input to change the hero location, in the form of a reusable editableField component. Instead of manipulating the hero object itself, it sends a changeset upwards to the heroDetail, which sends it upwards to the heroList component, which updates the original data.

The following example expands on the simple component example and incorporates the concepts we introduced above:

Instead of an ngController, we now have a heroList component that holds the data of different heroes, and creates a heroDetail for each of them.

The heroDetail component now contains new functionality:

* a delete button that calls the bound `onDelete` function of the heroList component
* an input to change the hero location, in the form of a reusable editableField component. Instead of manipulating the hero object itself, it sends a changeset upwards to the heroDetail, which sends it upwards to the heroList component, which updates the original data.

<iframe style="width: 100%; height: 600px" src="https://embed.plnkr.co/23OVhJ7YuiBtCugD6CLl/" frameborder="0" allowfullscren="allowfullscren"></iframe>

## Components as route templates

Components are also useful as route templates (e.g. when using [ngRoute](https://docs.angularjs.org/api/ngRoute)). In a component-based
application, every view is a component:

```js
var myMod = angular.module('myMod', ['ngRoute']);
myMod.component('home', {
  template: '<h1>Home</h1><p>Hello, {{ $ctrl.user.name }} !</p>',
  controller: function() {
    this.user = {name: 'world'};
  }
});
myMod.config(function($routeProvider) {
  $routeProvider.when('/', {
    template: '<home></home>'
  });
});
```

When using [$routeProvider](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider), you can often avoid some
boilerplate, by passing the resolved route dependencies directly to the component. Since 1.5,
ngRoute automatically assigns the resolves to the route scope property `$resolve` (you can also
configure the property name via `resolveAs`). When using components, you can take advantage of this and pass resolves
directly into your component without creating an extra route controller:

```js
var myMod = angular.module('myMod', ['ngRoute']);
myMod.component('home', {
  template: '<h1>Home</h1><p>Hello, {{ $ctrl.user.name }} !</p>',
  bindings: {
    user: '<'
  }
});
myMod.config(function($routeProvider) {
  $routeProvider.when('/', {
    template: '<home user="$resolve.user"></home>',
    resolve: {
      user: function($http) { return $http.get('...'); }
    }
  });
});
```

## Intercomponent Communication

Directives can require the controllers of other directives to enable communication
between each other. This can be achieved in a component by providing an
object mapping for the `require` property. The object keys specify the property names under which
the required controllers (object values) will be bound to the requiring component's controller.

Note that the required controllers will not be available during the instantiation of the controller,
but they are guaranteed to be available just before the `$onInit` method is executed!

Here is a tab pane example built from components:

<iframe style="width: 100%; height: 600px" src="https://embed.plnkr.co/08gW1UJTnDyTFpyLjXki/" frameborder="0" allowfullscren="allowfullscren"></iframe>

## Unit-testing Component Controllers

The easiest way to unit-test a component controller is by using the [$componentController](https://docs.angularjs.org/api/ngMock/service/$componentController)
that is included in [`ngMock`](https://docs.angularjs.org/api/ngMock). The advantage of this method is that you do not have
to create any DOM elements. The following example shows how to do this for the `heroDetail` component
from above.

The examples use the [Jasmine](http://jasmine.github.io/) testing framework.

**Controller Test:**

```js
describe('component: heroDetail', function() {
  var component, scope, hero, $componentController;

  beforeEach(module('heroApp'));

  beforeEach(inject(function($rootScope, _$componentController_) {
    scope = $rootScope.$new();
    $componentController = _$componentController_;
    hero = {name: 'Wolverine'};
  }));

  it('should assign the name bindings to the hero object', function() {
    // Here we are passing actual bindings to the component
    component = $componentController('heroDetail',
      null,
      {hero: hero}
    );
    expect(component.hero.name).toBe('Wolverine');
  });

  it('should call the onDelete binding when a hero is deleted', function() {
    var deleteSpy = jasmine.createSpy('deleteSpy');
    component = $componentController('heroDetail',
      null,
      {hero: hero, onDelete: deleteSpy}
    );

    component.onDelete({hero: component.hero});
    expect(deleteSpy).toHaveBeenCalledWith({hero: component.hero});
  });

});
```