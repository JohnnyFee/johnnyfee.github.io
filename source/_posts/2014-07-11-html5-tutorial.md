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

## 结构文档

可以使用 base 标签来设置基准 URL，让 HTML 文档中的相对链接在此基础上进行解析。如：

```html
<head>
    <title></title>
    <base href="http://titan/listings" />
</head>
```

如果在页面中 `<a>` 的超链接为 page2.html，则浏览器会将 `<a>` 的完整路径解析为 "http://titan/listings/page2.html"。如果不指定 base，在 "http://myserver.com/app/page1.html" 页面中，对于 `<a href="page2.html"></a>` 完整路径为  "http://myserver.com/app/page2.html"。

### 元数据

#### 指定名/值元数据对

指定名值元数据对，如：

```html
<head>
    <meta name="author" content="Adam Freeman"/>
    <meta name="description" content="A simple example"/>
</head>
```

供 meta 元素使用的预定义的元数据有：

- application name 当前页所属 Web 应用系统的名称。
- author 当前页的作者名
- description 当前页的描述
- generator 用来成成 HTMl 的软件名称，如ASP.NET等。
- keywords 以逗号分隔的字符串，用来描述页面的内容。

#### 声明字符编码：

    <meta charset="utf-8">

#### 模拟 HTTP 表字段

如让浏览器每个 5 秒刷新 1 次：

    <meta http-equiv="refresh" content="5">

除了 `refresh` 属性中，另外一个常用的属性为 `content-tyle`，使用这个属性也可以指定 HTML 页面的编码： `<meta http-equiv="content-type" content="text/html charset=UTF-8">`

### DOCTYPE 元素

DOCTYPE 告诉浏览器两件事：第一，它处理的是 HTML 文档；第二，用来标志文档内容的 HTML 所属的版本。

XHTML的声明太长了，我相信很少会有前端开发人员能手写出这个Doctype声明。

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

HTML5的 Doctype 声明很短，看到这个声明相信你马上就能记住，不用浪费脑细胞去记那长的有点变态的 XHTML 的 Doctype 声明了。

    <!DOCTYPE html>

HTML5 的简短的 DOCTYPE 声明是让 Firefox、Chrome 等现代浏览器和 IE6/7/8 等浏览器都进入(准)标准模式，你可能会奇怪 IE6/7 居然也可以支持HTML5 Doctype，事实上，IE是只要doctype符合这种格式，都会进入标准模式。

### link

link 元素用来在 HTML 文档中引入外部资源，link 常用的属性为：

- href 指向的资源的 URL
- media 说明所关联的内容用于哪种设备。
- ref 所关联资源的类型。
- sizes 指定图标的大小。
- type 关联资源的 MINE 类型，如 text/css、image/x-icon

其中，ref 常用的属性有：

- author: 链接到文档的作者
- icon: 指定图标资源
- prefetch: 预先获取一个资源
- stylesheet: 外辱外部样式表

#### 载入外部样式

如：载入外部的 style.css 样式表：

    <link rel="stylesheet" type="text/css" href="style.css">

#### 为页面定义网站标志

    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

如果网站图标位于 /favicon.ico ，则可以省略该 link 元素。



<link rel="stylesheet" type="text/css" href="">>

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
