---
layout: post
title: "Angular UI Router"
category : Angular
tags : [angular, tutorial]
--- 

## What's UI Router

[ui-router](https://github.com/angular-ui/ui-router) is a 3rd-party module and is very powerful.  It supports everything the normal ngRoute can do as well as many extra functions.

Here are some common reason ui-router is chosen over ngRoute:

* ui-router allows for [nested views](https://github.com/angular-ui/ui-router/wiki/Nested-States-%26-Nested-Views) and [multiple named views](https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views).  This is very useful with larger app where you may have pages that inherit from other sections.

* ui-router allows for you to have strong-type linking between states based on state names.  Change the url in one place will update every link to that state when you build your links with [`ui-sref`](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref). Very useful for larger projects where URLs might change.

* There is also the concept of the [decorator](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateProvider#methods_decorator) which could be used to allow your routes to be dynamically created based on the URL that is trying to be accessed. This could mean that you will not need to specify all of your routes before hand.

* [states](https://github.com/angular-ui/ui-router/wiki#state-manager) allow you to map and access different information about different states and you can easily pass information between states via [`$statsParams`](https://github.com/angular-ui/ui-router/wiki/URL-Routing#stateparams-service).

* You can easily determine if you are in a state or parent of a state to adjust UI element (highlighting the navigation of the current state) within your templates via [`$state`](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state) provided by ui-router which you can expose via setting it in `$rootScope` on `run`.


In essence, ui-router is ngRouter with more features, under the sheets it is much different. These additional features are very useful for larger applications.

See [javascript - Difference between angular-route and angular-ui-router - Stack Overflow](http://stackoverflow.com/questions/21023763/difference-between-angular-route-and-angular-ui-router)

## Tutorial

- [angular-ui/ui-router](https://github.com/angular-ui/ui-router) GitHub 源码和快速入门。
- [UI Router: ui.router](http://angular-ui.github.io/ui-router/site/#/api/ui.router) 官方教程、API等、FAQ。
- [学习 ui-router 系列文章索引](http://bubkoo.com/2014/01/02/angular/ui-router/guide/index/) 对官方教程的中文翻译。
- [AngularJS Routing Using UI-Router ♥ Scotch](http://scotch.io/tutorials/javascript/angular-routing-using-ui-router) Scotch 教程。

## Demo

- [AngularJS Multi-Step Form Using UI Router ♥ Scotch](http://scotch.io/tutorials/javascript/angularjs-multi-step-form-using-ui-router) 
    
    翻译：[AngularJS 使用 UI Router 实现表单向导 - 技术翻译 - 开源中国社区](http://www.oschina.net/translate/angularjs-multi-step-form-using-ui-router)


