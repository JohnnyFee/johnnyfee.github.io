---
layout: post
title: "Angular UI"
category: Angular
tags: [angular, ui]
--- 

## Tutorial

- [jtyjty99999/mobileTech](https://github.com/jtyjty99999/mobileTech)
- [手机网页开发 - Web 开发者指南](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Mobile)
- [Building Apps that Run Everywhere with jQuery Mobile and PhoneGap - YouTube](https://www.youtube.com/watch?v=h8ylWSbn7gU)
- [HTML5、Web引擎与跨平台移动App开发 - WEB开发者](http://www.admin10000.com/document/4920.html)
- [优化移动体验的HTML5技巧 - 技术翻译 - 开源中国社区](http://www.oschina.net/translate/mobile-app-optimization-and-performance)
- [The State of Hybrid Mobile Development - Telerik Developer NetworkTelerik Developer Network](http://developer.telerik.com/featured/the-state-of-hybrid-mobile-development/)

<!--more-->

## Framework

- [Ionic](http://ionicframework.com/) The beautiful, open source front-end framework for developing hybrid mobile apps with HTML5. See also in GitHub [driftyco/ionic](https://github.com/driftyco/ionic) 
    Ionic is focused mainly on the look and feel, and UI interaction of your app. That means we aren't a replacement for PhoneGap or your favorite Javascript framework. Instead, Ionic simply fits in well with these projects in order to simplify one big part of your app: the front end.

    **Ionic currently requires AngularJS** in order to work at its full potential.

    Ionic uses Cordova proper at the core.

    See [Ionic Framework Review](http://moduscreate.com/5-best-mobile-web-app-frameworks-ionic-angulalrjs/)

- [famo.us](http://famo.us/) Famo.us is a JavaScript framework for everyone who wants to build beautiful experiences on any device. [http://famo.us](http://famo.us/)
- [jQuery Mobile](http://jquerymobile.com/) jQuery Mobile is a HTML5-based user interface system designed to make responsive web sites and apps that are accessible on all smartphone, tablet and desktop devices.
- [Titanium Mobile Application Development](http://www.appcelerator.com/titanium/) Create bold, beautiful and transformative mobile experiences
- [Sencha Touch](http://docs.sencha.com/touch/2.4.0/) 
- [React](http://facebook.github.io/react/) A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES. See [React Review](http://moduscreate.com/5-best-mobile-web-app-frameworks-reactjs/)
- [Kendo UI](http://www.telerik.com/kendo-ui)
- [Foundation](http://foundation.zurb.com/) The most advanced responsive 
front-end framework in the world.

## Pros & Cons

See [Top 7 Mobile application HTML5 frameworks](http://www.gajotres.net/top-7-mobile-application-html5-frameworks/)

### jQuery Mobile

See Also [Query Mobile + Backbone Review](http://moduscreate.com/5-best-mobile-web-app-frameworks-jquery-mobile-backbone-part4/)

This is most commonly used mobile application HTML5 framework. But don’t let this fool you. It doesn’t mean it is the best solution, most of its publicity comes from it older brother jQuery.

**Pro**

* Most commonly use, which means a lot of 3rd party information
* Extremely easy to use, HTML bases, just like App Framework
* Good official documentation, it could be better, according to some information jQM developers are working on making it better.
* Support every HTML5 browser you can think which makes it good for a desktop and mobile use
* Excellent theme support
* Large number of 3rd party plugins  

<div style="width:100%height: 0.35em;"></div>

**Con**

* Sluggish on mobile devices, it is not optimized like App Framework or Sencha Touch
* Average UI, as time passes I hate it more and more, but it can be easily fixed with custom CSS. Without customization every app looks like an clone. iOS GUI look which don’t look good on non iOS platforms.
* Official documentation is lacking some information, mainly how jQuery Mobile architecture works. While every single component is described in details you will need to brake you head to understood how all of that works together.
* No out of box MVC support. At the same time is supports Backbone.js and Knockout.js, with some limitations.
* Sluggish even more when combined with a Phonegap, you really need to have a good understanding of **[jQuery Mobile architecture](http://www.gajotres.net/secrets-of-a-good-jquery-mobile-page-architecture/)** to make it work correctly and fast. But if developers don’t change anything soon it will never be fast as App Framework or Sencha Touch.

__Author notes__

Currently my favorite framework, mostly because I am a sucker for a jQuery. 

### Kendo UI

I already wrote a detail Kendo UI review + examples, it can be found here: <http://www.gajotres.net/html5-frameworks-kendo-ui-from-a-jquery-mobile-perspective/>

Another jQuery based framework. Unlike previous 3 this one is beautiful, supports MVVM and has its own support for server side communication (.NET, PHP and JAVA). Unfortunately Kendo UI will cost you a few hundred dollars if you want to create a commercial application, it is free in any other case. Excellent template support, every and each template looks and feels like native OS.

**Pro**

* Complete package, framework, UI and MVC all in one.
* Fast with SVG support, plus fallback support for older browsers
* HTML based
* Great documentation (there’s room for the improvement)
* Native look depending on mobile platform
* Great template system, themes are native like, depending on platform (iOS, Android …)  


**Con**

* Commercial license and support
* Lack of 3rd party support, mainly due commercial license, but you would still be surprised how many developers use this framework

__Author notes__

Money is the only reason why I am not using this framework. It is not that I am not willing to pay for it, I just don’t want to use 2 commercial frameworks. What ever happen this is going to be my third framework of choice.

### Sencha Touch

See Also [Sencha Touch Review](http://moduscreate.com/5-best-mobile-web-app-frameworks-sencha-touch/)

This framework is almost an alien in this jQuery based frameworks sea. It is fast, good looking, supports MVC and has probably best documentation among frameworks mentioned here. Again, like Kendo UI, it has a commercial license + commercial IDE. Unlike jQuery based frameworks (like jQUery Mobile, Kendo UI and PhoneJS) this framework is pure javascript.

**Pro**

* Complete package, framework, UI and MVC all in one.
* Subjectively fastest mobile application framework there is
* Best SVG support you can find, usable for game development
* Perfect documentation
* Native look depending on mobile platform
* Excellent in-house native app wrapping / packaging system  

**Con**

* Commercial license and support
* Commercial IDE, you can’t believe how bad it feels to develop in anything else then its IDE
* Hard to master, unlike previously mentioned frameworks this one is purely javascript based
* Lack of 3rd party support, mainly due commercial license  

__Author notes__

My second framework of choice. It is complex but that is why I like it. It requires a lot of time to master, it has a steep learning curve. I wrote a much comprehensive **[ARTICLE](http://www.gajotres.net/sencha-touch-vs-jquery-mobile/)** on an topic: jQuery Mobile or Sencha Touch so feel free and take a look if you need more information.

### Titanium Appcelerator

Another alien here, also this one is not HTML5 framework. It uses similar pure javascript approach like Sencha Touch, but unlike Sencha Touch this one converts javascript to native code. 

**Pro**

* Final native code makes it natively fast
* Can be used for fast prototyping
* Cross-platform, one code can be used to create iOS, Android and other mobile platform applications  

**Con**

* Not that good documentation, can be confusing sometimes
* Not that much flexible
* It requires knowledge of native Android / iOS development if you want to get most of it
* Cross-platform is also has a negative side, complex GUI will require different code for Android, iOS …

__Author notes__
 
Excellent framework made for fast application prototyping. It can become problematic if you need to create a complex cross-platform application. Not to mention it require some knowledge of native Android / iOS development.

## Scaffold

- [Mobile Boilerplate: A best practice baseline for your mobile web app](http://html5boilerplate.com/mobile/)

## Library

- [Device.js](https://github.com/matthewhudson/device.js) Device.js makes it easy to write conditional CSS _and/or_ JavaScript based on device operating system (iOS, Android, Blackberry, Windows, Firefox OS, MeeGo), orientation (Portrait vs. Landscape), and type (Tablet vs. Mobile). <http://matthewhudson.me/projects/device.js/>
- [GestureKit](http://www.gesturekit.com/) GestureKit (requires registration) is a development kit that allows the creation of gestures across device platforms.

## Performance

- [Is jQuery Too Big For Mobile?](http://flippinawesome.org/2014/03/10/is-jquery-too-big-for-mobile/)
- [Google I/O 2014 - Mobile Web performance auditing - YouTube](https://www.youtube.com/watch?v=WrA85a4ZIaM)
- [BlendUI，让webapp的体验和交互得到质的提升](http://www.infoq.com/cn/articles/blendul-improve-webapp-experience-and-interactive)

## Debug

- [jieyou/remote_inspect_web_on_real_device](https://github.com/jieyou/remote_inspect_web_on_real_device) 各种真机远程调试方法汇总。
- [A Concise Guide to Remote Debugging on iOS, Android, and Windows Phone](http://developer.telerik.com/featured/a-concise-guide-to-remote-debugging-on-ios-android-and-windows-phone/)
- [Bringing F5 (or Command+R) to Hybrid Mobile Apps](http://developer.telerik.com/featured/bringing-f5-or-commandr-to-hybrid-mobile-apps/)
- [使用weinre远程调试手机网页](http://www.2fz1.com/?p=396)

## Test

- [Techniques for mobile and responsive cross-browser testing: An Envato case study. - We build Envato](http://webuild.envato.com/blog/techniques-for-mobile-and-responsive-cross-browser-testing)

## Library

- [hammerjs/hammer.js](https://github.com/hammerjs/hammer.js/) A javascript library for multi-touch gestures :// You can touch this <http://hammerjs.github.io>
- [ftlabs/fastclick](https://github.com/ftlabs/fastclick) Polyfill to remove click delays on browsers with touch UIs.
- [Leaflet/Leaflet](https://github.com/Leaflet/Leaflet) JavaScript library for mobile-friendly interactive maps. [http://leafletjs.com](http://leafletjs.com/)

## Books

- [Mobile JavaScript Application Development](http://www.salttiger.com/mobile-javascript-application-development/)
- [Programming the Mobile Web, 2nd Edition](http://www.salttiger.com/programming-the-mobile-web-2nd-edition/)
- [Mobile Design Pattern Gallery, 2nd Edition](http://www.salttiger.com/mobile-design-pattern-gallery-2nd-edition/)