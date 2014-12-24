---
layout: post
title: "Polymer Tutorial"
category: CSS
tags: [web, css]
---

## What is Polymer?

Polymer is a library for creating [Web Components](http://css-tricks.com/modular-future-web-components/), which&nbsp;are a set of W3C standards and upcoming browser APIs for defining your own custom HTML elements. With the help of polyfills and sugar, it can create these custom elements and bring Web Component support to browsers that don’t play nice with the standard just yet.

Polymer.js places a hefty set of requirements on the browser, relying on a number of technologies that are in still in the process of standardization (by W3C) and are not yet present in today’s browsers.  Examples include the [shadow dom](http://www.w3.org/TR/shadow-dom/), [template elements](http://www.w3.org/TR/html5/scripting-1.html#the-template-element), [custom elements](http://www.w3.org/TR/custom-elements/), [HTML imports](http://www.w3.org/TR/html-imports/), [mutation observers](http://www.w3.org/TR/dom/#mutation-observers), [model-driven views](http://mdv.googlecode.com/svn/trunk/docs/design_intro.html), [pointer events](http://www.w3.org/TR/pointerevents/), and [web animations](http://www.w3.org/TR/web-animations/).  These are marvelous technologies, but at least as of now,  that are yet-to-come to modern browsers.

Custom elements? Huh? They look like this:

    <google-map lat="37.790" long="-122.390"></google-map>

## Polymer Architecture

See [Is Polymer.js Ready for Prime Time?](http://www.toptal.com/front-end/polymer-js-the-future-of-web-application-development).

Polymer.js is architecturally divided into four layers:

Native:  Needed features currently available natively in all major browsers.
Foundation:  Polyfills that implement needed browser features not yet natively available in the browsers themselves.  (The intention is for this layer to disappear over time as the capabilities it provides become available natively in the browser.).
Core:  The necessary infrastructure for Polymer elements to exploit the capabilities provided by the Native and Foundation layers..
Elements:  A basic set of elements, intended to serve as building blocks that can help you create your application.  Includes elements that provide:
Basic functionality like ajax, animation, flex layout, and gestures.
Encapsulation of complicated browser APIs and CSS layouts.
UI component renderers such as accordions, cards, and sidebars.

![](http://www.toptal.com/uploads/blog/image/393/toptal-blog-image-1399907631482.png)

## Creating a Polymer Application

## Angular Polymer

## How does Polymer differ from Angular?

Angular has high-level APIs for things like services, routing, server communication and the like. Polymer, on the other hand, doesn’t provide these things except as separate web components from their core library. Instead, it focuses on allowing you to create rich, powerful, reusable web components, which could be used to build webapps like those built with Angular. 

Polymer (more specifically [Shadow DOM](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)) provides the ability to compose encapsulated JS, CSS, and HTML as [Custom Elements](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/), much like Angular element directives.

Angular directives are conceptually similar to Custom Elements but they are implemented without the use of the Web Components APIs. Angular directives are a way to build custom elements, but Polymer and the Web Components specification are the standards-based way to do it.

Similar to Angular, Polymer elements provide templating and bi-directional data binding. However, they also provide new functionality such as the Shadow DOM, which enables [encapsulation of CSS](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/). Angular directives don’t have any notion of style encapsulation, but Angular is expected incorporate that functionality eventually.

See [Here's the difference between Polymer and Angular - Binpress](http://www.binpress.com/blog/2014/06/26/polymer-vs-angular/)

### Angular Material

See [Material Design](https://material.angularjs.org/#/) 

[Material Design](http://www.google.com/design/spec/material-design/) is a specification for a unified system of visual, motion, and interaction design that adapts across different devices.

The material design project for Angular is a complementary effort to the [Polymer](http://www.polymer-project.org/) project's [paper elements](http://www.polymer-project.org/docs/elements/paper-elements.html) collection. Our goal is to provide a set of AngularJS-native UI elements that implement the material design system. This demo is a work in progress.

For more, see our repository on [GitHub](https://github.com/angular/material)

## Example

- [ebidel/material-playground](https://github.com/ebidel/material-playground) Polymer material design playground <http://ebidel.github.io/material-playground/>.
- [Single page app using web components](http://polymer-change.appspot.com/demos/spa.html#one)

## Tutorial

- [Web Fundamentals — Google Developers](https://developers.google.com/web/fundamentals/)
- [Welcome - Polymer](http://www.polymer-project.org/)
- [Join the Web Components revolution with Polymer](http://www.ibm.com/developerworks/library/wa-polymer)
- [Building Web Apps With Yeoman And Polymer: Scaffold your webapps with modern tooling - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/yeoman/)
- [Building single page apps using web components - Polymer](https://www.polymer-project.org/articles/spa.html)
- [Web Components - Divshot Blog](https://divshot.com/blog/categories/web-components/)

### Video

- [Google IO: Polymer and the Web Components revolution](https://www.youtube.com/watch?v=yRbOSdAe_JU)
- [Polymer and Web Components change everything you know about web development](https://www.youtube.com/watch?v=8OJ7ih8EE7s)
- [Using Polymer to Build Mobile Web Apps](https://www.youtube.com/watch?v=rZ9fhOPooN4)

<iframe src="//www.youtube.com/embed/HKrYfrAzqFA" width="660" height="371" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

## Tutorial

- [Unit Testing Polymer Elements - Polymer](https://www.polymer-project.org/articles/unit-testing-elements.html)