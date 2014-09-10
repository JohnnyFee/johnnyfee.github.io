---
layout: post
title: "Html5 Tutorial"
category: Web
tags: [web, html, tutorial]
--- 

### 标签

没有结束标签，在其中放置任何内容都不符合 HTML 规范，这类元素称为虚元素，它是一种组织性元素，如 `<hr>`。虚元素有两种表示方法，`<hr>` 和 `<hr />`，建议使用后一种。

### 属性

对于布尔类型的属性，只需要将属性名称添加到元素中即可，如：

    <input disabled>

为布尔值指定一个空字符串或者属性名称字符串也可以达到同样的效果：

    <input disabled="">
    <input disabled="disabled">
    <input disabled="true">

### 自定义属性

用户可以使用自定义元素，自定义元素必须以 `data-` 开头。如：

    <input disabled="true" data-creator="adam">

### 元素类型

HTML5 规范将元素分为三大类： 

- 元数据元素 （matadata element）用来构建 HTML 的基本结构，以及就如何向浏览器提供信息和指示。
- 流元素（flow element）短语元素的超级。
- 短语元素（phrasing element）HTML 的基本成分。

## Tutorial

- [Learn to Code HTML & CSS - Beginner & Advanced](http://learn.shayhowe.com/)
- [diegocard/awesome-html5](https://github.com/diegocard/awesome-html5)
- [HTML5研究小组](http://www.mhtml5.com/)
- [WebHek](http://www.webhek.com/)
- [HTML5DevConf](https://www.youtube.com/watch?v=8J6EdpXdzqc)
- [HTML-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [Glyphs](http://css-tricks.com/snippets/html/glyphs/)


## Tools

- [Can I use... Support tables for HTML5, CSS3, etc](http://caniuse.com/)

## video

- [Adding captions and subtitles to HTML5 video ✩ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2014/07/adding-captions-and-subtitles-to-html5-video)
- [Google I/O 2014 - HTML5 everywhere: How and why YouTube uses the Web platform - YouTube](https://www.youtube.com/watch?v=2gLq4Ze0Jq4)

## File

- [Exploring the FileSystem APIs - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/file/filesystem/)
- [阅读以 JavaScript 编写的本地文件 - HTML5 Rocks](http://www.html5rocks.com/zh/tutorials/file/dndfiles/)

## Argument

- [HTML5 Vs. Native Apps for Mobile - Business Insider](http://www.businessinsider.com/html5-vs-native-apps-for-mobile-2013-6?op=1)

## HTML5 Test

- <http://html5test.com/>
- [Test the Web Forward](http://testthewebforward.org/) The [layoutTest coverage in WebKit](http://trac.webkit.org/browser/trunk/LayoutTests) is enormous (28,000 layoutTests at last count), not only for existing features but for any found regressions. In fact, whenever you’re exploring some new or esoteric DOM/CSS/HTML5-y feature, the layoutTests often have fantastic minimal demos of the entire web platform.

    In addition, the [W3C is ramping up its effort for conformance suite testing](http://www.w3.org/QA/2013/02/testing_the_open_web_platform.html). This means we can expect both different WebKit ports and all browsers to be testing against the same suite of tests, leading to fewer quirks and a more interoperable web. For all those who have assisted this effort by going to a [Test The Web Forward event](http://testthewebforward.org/)… thank you!

## Books

- [HTML5 Pocket Reference, 5th Edition](http://www.salttiger.com/html5-pocket-reference-5th-edition/)
- [HTML5 in Action](http://www.salttiger.com/html5-action/)
