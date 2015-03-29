---
layout: post
title: "Mobile Web Tutorial"
category: Angular
tags: [angular, ui]
--- 

## Tutorial

- [Web Starter Kit — Web Fundamentals](https://developers.google.com/web/starter-kit/)
- [jtyjty99999/mobileTech](https://github.com/jtyjty99999/mobileTech)
- [手机网页开发 - Web 开发者指南](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Mobile)
- [Building Apps that Run Everywhere with jQuery Mobile and PhoneGap - YouTube](https://www.youtube.com/watch?v=h8ylWSbn7gU)
- [HTML5、Web引擎与跨平台移动App开发 - WEB开发者](http://www.admin10000.com/document/4920.html)
- [优化移动体验的HTML5技巧 - 技术翻译 - 开源中国社区](http://www.oschina.net/translate/mobile-app-optimization-and-performance)
- [The State of Hybrid Mobile Development - Telerik Developer NetworkTelerik Developer Network](http://developer.telerik.com/featured/the-state-of-hybrid-mobile-development/)
- [Adding Native Touches to Your Hybrid App -Telerik Developer Network](http://developer.telerik.com/featured/adding-native-touches-hybrid-app)
- [Popular ICEs for mobile hybrid app development - Developer Economics](http://www.developereconomics.com/popular-ices-mobile-hybrid-app-development)
- [12 HTML5 tricks for mobile](http://www.creativebloq.com/html5/12-html5-tricks-mobile-81412803)


### Vedio

- [Angelina Fabbro: CSS In Your Pocket - Mobile CSS Tips From The Trenches [CSSConfUS2014] - YouTube](https://www.youtube.com/watch?v=vBHt61yDO9U)

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
- [Ratchet](http://goratchet.com/) Build mobile apps with simple HTML‚ CSS‚ and JS components.
- [Meteor](https://www.meteor.com/) 提供完整解决方案。暂不支持 Windows。

## 开发方案

随着HTML5标准定稿，一切纷争将告一段落，现在，属于HTML5的时代到来了。

我们先谈谈HTML5原来不如原生应用的地方，业内俗称HTML5有“性工能”障碍。即HTML5**性**能不如原生、开发**工**具不如原生、**能**力调用不如原生。

![](http://cms.csdnimg.cn/article/201411/06/545ad8faa2704.jpg)

这几个问题导致开发者无法使用HTML5做出与原生一样的App。然而，不管是硬件升级还是OS厂商策略变化，以及相关软件技术的成熟，已解决了HTML5的“性工能”障碍。

1. 硬件升级

    2011年，iPhone 4s的CPU是A5，现在iPhone 6是A8，按苹果的历次发布会的说法，速度共提升了7.5倍。这3年间7.5倍的速度提升，抹平了太多HTML5的性能问题。

2. 苹果、Google的策略变化

    Google在2013年底发布的Android 4.4，内置的Webview不再是蹩脚的Android WebKit浏览器，而是Chromium，性能大幅提升。从最新的Android 5.0开始，Webview可以通过Google Play Store实时更新，和Chrome的升级保持一致，用户就可以不刷机享受到最新的浏览器引擎；再看Apple方面，2012年iPhone 5发布后，HTML5在iOS上的表现已令人满意，Safari独家的JavaScript加速引擎Nitro不再那么重要，不过在iOS 8发布后，苹果还是很识趣地取消了三方程序调用Nitro的限制，现在任意浏览器或应用调用iOS的UIWebview都可以利用Nitro加速，这样在前端使用JS做大型运算也成为可能。两大手机操作系统霸主和浏览器巨头的态度发生了变化，使得HTML5在手机上的发展不再受限，而且这个变化不可逆只能继续向前，这种变化势必会产生深远的影响。

3. 软件技术的成熟

    PhoneGap的发展虽然放缓了，但其他产品技术却成熟了。2014年的iWeb大会上，众多厂商的产品提供了面向开发者免费或开源的HTML5性工能障碍的解决方案。

    _（注：作者作为从业人员，也会在分析各种方案时提到我们公司的方案，但作者会客观不夸张的陈述方案，而且该方案是纯免费的，没有商业销售嫌疑。）_

    DCloud公司在iWeb大会上发布了系统的HTML5“性工能缺失”的解决方案，包括：

    1. 性能：提升HTML5性能的手机端引擎，让侧滑菜单、下拉刷新等动态交互卡顿的问题得以解　决；
    2. 工具：HTML5开发IDE产品HBuilder, 超快的编程利器；
    3. 能力：把40万原生API封装成JavaScript对象，以解决HTML5能力不足问题的Native.js技术；
    4. 最接近原生体验的高性能框架：MUI框架，体积只有几十K，加载、运行远快于一般框架。基于该方案开发的HTML5应用完全可以达到原生App的功能和体验。

    英特尔公司发布了Crosswalk引擎，可以让Android 4.0 - 4.3的手机上的应用打包Chromium引擎而不是Android WebKit。毕竟目前市场上存在大量Android 4.0 - 4.3的手机，同时统一的WebView也避免了兼容性的烦恼。

    在专业方向上很多公司也做出了不错的成绩。触控的Cocos2d-html5、Egret runtime和Ludei CocoonJS强化了Canvas的表现，让HTML5游戏体验更好；UC、猎豹等手机浏览器都强化了音视频播放的表现。

不管是硬件升级、软件成熟，还是操作系统厂商策略变化，都在强力推动HTML5的爆发。

不过要注意，我说的HTML5爆发，不是指手机浏览器会替代桌面成为应用入口。有人说HTML5不好，因为用户讨厌打开浏览器输入URL的过程。我想说这种想法是对HTML5的片面理解。HTML5!=传统浏览器，虽然编程语言还是HTML、Javascript、CSS，但发行方式绝不是传统网站那么简单。HTML5应用的入口，反而很少是启动浏览器输入URL，它可以是存在于手机桌面的图标、也可以来自超级App（如微信朋友圈）、以及搜索引擎、应用市场、广告联盟。。。到处都是它的入口。它的入口，比原生App更多。

See [HTML5定稿了，为什么原生App世界将被颠覆-CSDN.NET](http://www.csdn.net/article/2014-11-06/2822513-how-html5-changes/1)

HTML5的“性工能”障碍得到解决，可以接近原生App的效果，所以它就可以替代原生App吗？很多人认为，即使HTML5会发展的比现在好，也将是与原生App各占一部分市场的格局，要求不高的长尾应用会使用HTML5，而主流应用仍是原生App的天下。

## Design

- [Wayfinding For The Mobile Web](http://www.smashingmagazine.com/2014/10/13/wayfinding-for-the-mobile-web)
- [Stephen Meszaros](http://stephenmeszaros.com/posts/prototyping-tools.html) 原型设计的几种方法。

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
- [HTML5 Mobile - Optimising for older or slower devices](http://www.scottlogic.com/blog/2014/12/12/html5-android-optimisation.html)

## Debug

- [jieyou/remote_inspect_web_on_real_device](https://github.com/jieyou/remote_inspect_web_on_real_device) 各种真机远程调试方法汇总。
- [A Concise Guide to Remote Debugging on iOS, Android, and Windows Phone](http://developer.telerik.com/featured/a-concise-guide-to-remote-debugging-on-ios-android-and-windows-phone/)
- [Bringing F5 (or Command+R) to Hybrid Mobile Apps](http://developer.telerik.com/featured/bringing-f5-or-commandr-to-hybrid-mobile-apps/)
- [使用weinre远程调试手机网页](http://www.2fz1.com/?p=396)
- [Web应用调试：现在是Weinre和JSConsole，最终会是WebKit的远程调试协议](http://www.infoq.com/cn/news/2011/08/mobile-web-debugging)
- [目前为止找到最好的移动端调试工具-debugGap - CNode](https://cnodejs.org/topic/54ff176fc1749396754897e5)

## Test

- [Techniques for mobile and responsive cross-browser testing: An Envato case study. - We build Envato](http://webuild.envato.com/blog/techniques-for-mobile-and-responsive-cross-browser-testing)

## Tools

- [Mobile-Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly)

## FAQ

### jquery mobile+phonegap页面切换闪屏问题

当jquery mobile在页面切换时出现闪屏，可以使用如下代码解决：

```js
$(document).bind("mobileinit", function () {
    $.extend($.mobile, {
        defaultPageTransition : 'none'
    });

    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
});
```

## Library

- [hammerjs/hammer.js](https://github.com/hammerjs/hammer.js/) A javascript library for multi-touch gestures :// You can touch this <http://hammerjs.github.io>
- [ftlabs/fastclick](https://github.com/ftlabs/fastclick) Polyfill to remove click delays on browsers with touch UIs.
- [Leaflet/Leaflet](https://github.com/Leaflet/Leaflet) JavaScript library for mobile-friendly interactive maps. [http://leafletjs.com](http://leafletjs.com/)

## Books

- [Mobile JavaScript Application Development](http://www.salttiger.com/mobile-javascript-application-development/)
- [Programming the Mobile Web, 2nd Edition](http://www.salttiger.com/programming-the-mobile-web-2nd-edition/)
- [Mobile Design Pattern Gallery, 2nd Edition](http://www.salttiger.com/mobile-design-pattern-gallery-2nd-edition/)