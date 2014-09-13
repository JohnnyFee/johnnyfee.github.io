---
layout: post
title: "Html5 Modernizr"
category: Web
tags: [web, html, tutorial]
--- 

## IE对HTML5的支持

IE浏览器目前对HTML5的支持并不好，也是阻碍HTML5的更快普及的一大绊脚石，不过，IE9对HTML5的支持度还是很不错的。

IE把HTML5新增的标签都解析成内联元素，而实际上它们是块级元素，所以有必要为它们定义一个样式：

```html
header, footer, article, section, nav, menu, hgroup {
   display: block;
}
```

尽管如此，IE还是不能解析这些新增的HTML5标签，这个时候就需要借助Javascript来解决这个问题：

<!--more-->

```js
document.createElement("article");
document.createElement("footer");
document.createElement("header");
document.createElement("hgroup");
document.createElement("nav");
document.createElement("menu");
```

你可以借助这一段Javascript代码来修复IE更好的解析HTML5

```html
 
<!--[if IE]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
 <![endif]-->
```

## Modernizr

- [Modernizr/Modernizr](https://github.com/Modernizr/Modernizr)
- [HTML5 Cross Browser Polyfills · Modernizr/Modernizr Wiki](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)

One of the main drawbacks to using HTML5’s new features is that browser support isn’t uniform. Thus, you need to find ways to allow those with the latest and greatest browsers to make use of HTML5 features while ensuring that those using slightly older versions aren’t left behind.

Enter Modernizr, a purpose-built JavaScript library for performing bulletproof feature detection and dynamic loading. When you include Modernizr in a web page, you can detect support for a feature using a much easier syntax. For example, to check to see if the user’s browser supports the Canvas element, you’d use the following:


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

### Use Modular IE Fixes

You can use conditional comments to target Internet Explorer if you are having issues with your web pages.

#### IE 7 Example

<pre>
<!--[if IE 7]>
<link rel="stylesheet" href="css/ie-7.css" media="all">
<![endif]-->
</pre>

#### IE 6 Example

<pre>
<!--[if IE 6]>
<link rel="stylesheet" href="css/ie-6.css" media="all">
<script type="text/javascript" src="js/DD_belatedPNG_0.0.8a-min.js"></script>
<script type="text/javascript">
                        DD_belatedPNG.fix('#logo');
                </script>
<![endif]-->
</pre>

However, try to make your fixes modular to future-proof your work such that when older versions of IE don’t need to be supported anymore, you just have to update your site in one place (i.e. take out the reference to the ie-6.css stylesheet).

By the way, for pixing PNG transparencies in IE6, I recommend the [DD_belated PNG script](http://www.dillerdesign.com/experiment/DD_belatedPNG/) (the JavaScript method referenced above).

