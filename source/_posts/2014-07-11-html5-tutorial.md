---
layout: post
title: "Html5 Tutorial"
category: Web
tags: [web, html, tutorial]
--- 

## New in Html5

- [CS002: DOCTYPE 与浏览器模式分析 - W3Help](http://www.w3help.org/zh-cn/casestudies/002)

## Modernizr

- [Modernizr/Modernizr](https://github.com/Modernizr/Modernizr)
- [HTML5 Cross Browser Polyfills · Modernizr/Modernizr Wiki](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)

One of the main drawbacks to using HTML5’s new features is that browser support isn’t uniform. Thus, you need to find ways to allow those with the latest and greatest browsers to make use of HTML5 features while ensuring that those using slightly older versions aren’t left behind.

Enter Modernizr, a purpose-built JavaScript library for performing bulletproof feature detection and dynamic loading. When you include Modernizr in a web page, you can detect support for a feature using a much easier syntax. For example, to check to see if the user’s browser supports the Canvas element, you’d use the following:

<!--more-->

```js
if(Modernizr.canvas) {
    //Canvas is supported, fire one up!
} else {
    //Canvas is not supported, use a fallback
}
```

To detect Canvas support without Modernizr, you’d need to use the following:

```js
if(!!document.createElement('canvas').getContext) {
    //Canvas is supported, fire one up!
} else {
    //Canvas is not supported, use a fallback
}
```

It’s also simple to use Modernizr to dynamically load resources (either .js or .css files) based on a feature test. Consider this example, in which Modernizr will determine if the browser supports the localStorage API. If supported, it will load the localstorage.js file, which would likely contain code that interacts with this API. Otherwise, it will load the localstorage-polyfill.js file, which contains a fallback.

```js
Modernizr.load({
    test: Modernizr.localstorage,
    yep: 'localstorage.js',
    nope: 'localstorage-polyfill.js'
});
```

### Using polyfills and Modernizr to plug the gaps

The term polyfill was coined by Remy Sharp and refers to a piece of code (or shim) that aims to implement missing parts of an API specification. The origin of the term is from a product named Polyfilla, which builders use to fill gaps or cracks in walls. Likewise, we developers can use polyfills to fill the gaps or cracks in various web browsers’ support for HTML5.

aul Irish, one of the key contributors to the Modernizr library, edits and maintains a comprehensive list of polyfills, shims, and fallbacks for a wide variety of HTML5 features. This list is available on Modernizr’s GitHub wiki at: [http://mng.bz/cJhc](http://mng.bz/cJhc).

Let’s look at how to use Modernizr to load a month-picker polyfill into those browsers without a built-in month-picker. 

```js
Modernizr.load({
    test:Modernizr.inputtypes.month,
    nope: 'monthpicker.js' 
});
```

You can apply the same technique to most of the HTML5 form’s functionality. In fact, several projects are in the works that aim to polyfill the entire set of forms features in HTML5. These projects include 

* Webshims Lib by Alexander Farkas ([http://afarkas.github.com/webshim/demos/](http://afarkas.github.com/webshim/demos/))
* H5F by Ryan Seddon ([https://github.com/ryanseddon/H5F](https://github.com/ryanseddon/H5F))
* Webforms2 by Weston Ruter ([https://github.com/westonruter/webforms2](https://github.com/westonruter/webforms2))
* html5Widgets by Zoltan “Du Lac” Hawryluk ([https://github.com/zoltan-dulac/html5Forms.js](https://github.com/zoltan-dulac/html5Forms.js))

## Compatibility

- [Can I use... Support tables for HTML5, CSS3, etc](http://caniuse.com/)

## video

- [Adding captions and subtitles to HTML5 video ✩ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2014/07/adding-captions-and-subtitles-to-html5-video)
- [Google I/O 2014 - HTML5 everywhere: How and why YouTube uses the Web platform - YouTube](https://www.youtube.com/watch?v=2gLq4Ze0Jq4)

## Form

- [HTML5 Forms: JavaScript and the Constraint Validation API](http://www.sitepoint.com/html5-forms-javascript-constraint-validation-api)
- [The Difference Between Anchors, Inputs and Buttons](http://davidwalsh.name/html5-buttons?)

## File

- [Exploring the FileSystem APIs - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/file/filesystem/)
- [阅读以 JavaScript 编写的本地文件 - HTML5 Rocks](http://www.html5rocks.com/zh/tutorials/file/dndfiles/)

## Argument

- [HTML5 Vs. Native Apps for Mobile - Business Insider](http://www.businessinsider.com/html5-vs-native-apps-for-mobile-2013-6?op=1)

## HTML5 Test

- <http://html5test.com/>
- [Test the Web Forward](http://testthewebforward.org/) The [layoutTest coverage in WebKit](http://trac.webkit.org/browser/trunk/LayoutTests) is enormous (28,000 layoutTests at last count), not only for existing features but for any found regressions. In fact, whenever you’re exploring some new or esoteric DOM/CSS/HTML5-y feature, the layoutTests often have fantastic minimal demos of the entire web platform.

    In addition, the [W3C is ramping up its effort for conformance suite testing](http://www.w3.org/QA/2013/02/testing_the_open_web_platform.html). This means we can expect both different WebKit ports and all browsers to be testing against the same suite of tests, leading to fewer quirks and a more interoperable web. For all those who have assisted this effort by going to a [Test The Web Forward event](http://testthewebforward.org/)… thank you!


## Tutorial

- [HTML5研究小组](http://www.mhtml5.com/)
- [WebHek](http://www.webhek.com/)
- [HTML5DevConf](https://www.youtube.com/watch?v=8J6EdpXdzqc)
- [HTML-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [diegocard/awesome-html5](https://github.com/diegocard/awesome-html5)

## Books

- [HTML5 in Action](http://www.salttiger.com/html5-action/)