---
layout: post
title: "两个 viewport 的故事（第一部分）"
category: CSS
tags: [web, css]
--- 

原文：<http://www.quirksmode.org/mobile/viewports.html>
翻译：<http://weizhifeng.net/viewports.html>

**在这个迷你系列的文章里边我将会解释viewport，以及许多重要元素的宽度是如何工作的，比如`<html>`元素，也包括窗口和屏幕。**

这篇文章是关于桌面浏览器的，其唯一的目的就是为移动浏览器中相似的讨论做个铺垫。大部分开发者凭直觉已经明白了大部分桌面浏览器中的概念。在移动端我们将会接触到相同的概念，但是会更加复杂，所以对大家已经知道的术语做个提前的讨论将会对你理解移动浏览器产生巨大的帮助。

## 概念：设备像素和CSS像素 ##

你需要明白的第一个概念是CSS像素，以及它和设备像素的区别。

设备像素是我们直觉上觉得「靠谱」的像素。这些像素为你所使用的各种设备都提供了正规的分辨率，并且其值可以（通常情况下）从`screen.width/height`属性中读出。

<!--more-->

如果你给一个元素设置了`width: 128px`的属性，并且你的显示器是1024px宽，当你最大化你的浏览器屏幕，这个元素将会在你的显示器上重复显示8次（大概是这样；我们先忽略那些微妙的地方）。

如果用户进行缩放，那么计算方式将会发生变化。如果用户放大到200%，那么你的那个拥有`width: 128px`属性的元素在1024px宽的显示器上只会重复显示4次。

现代浏览器中实现缩放的方式无怪乎都是「拉伸」像素。所以，元素的宽度并没有从128个像素被修改为256个像素；相反是**实际像素**被放大了两倍。形式上，元素仍然是128个CSS像素宽，即使它占据了256个设备像素的空间。

换句话说，放大到200%使一个CSS像素变成为一个设备像素的四倍。（宽度2倍，高度2倍，总共4倍）

一些配图可以解释清楚这个概念。这儿有四个100%缩放比的元素。这儿没有什么值得看的；CSS像素与设备像素完全重叠。

![csspixels_100](http://johnnyimages.qiniudn.com/csspixels_100.gifundefined)

现在让我们缩小。CSS像素开始收缩，这意味着现在一个设备像素覆盖了多个CSS像素。

![csspixels_out](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/csspixels_out.gif)

如果你进行放大，相反的行为会发生。CSS像素开始变大，现在一个CSS像素覆盖了多个设备像素。

![csspixels_in](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/csspixels_in.gif)

这儿的要点是你只对CSS像素感兴趣。这些就是那些控制你的样式表如何被渲染的像素。

设备像素对你（译者：指的是开发者）来说基本上没用。但是对于用户不一样；用户将会放大或者缩小页面直到他能舒服的阅读为止。无论怎样，缩放比例对你不会产生影响。浏览器将会自动的使你的CSS布局被拉伸或者被压缩。

## 100%缩放 ##

我是以假设缩放比例为100%来开始这个例子的。是时候需要更加严格的来定义一下这个100%了：

    在缩放比例100%的情况下一个CSS像素完全等于一个设备像素。

100%缩放的概念在接下来的解释中会非常有用，但是在你的日常工作中你不用过分的担心它。在桌面环境上你将会在100%缩放比例的情况下测试你的站点，但即使用户放大或者缩小，CSS像素的魔力将会保证你的布局保持相同的比率。

## 屏幕尺寸 ##

_screen.width/height_

* _意义：用户屏幕的整体大小。_
* _度量单位：设备像素。_
* _浏览器错误：IE8以CSS像素对其进行度量，IE7和IE8模式下都有这个问题。_

让我们看一些实用的度量。我们将会以`screen.width`和`screen.height`做为开始。它们包括用户屏幕的整个宽度和高度。它们的尺寸是以设备像素来进行度量的，因为它们永远不会变：它们是显示器的属性，而不是浏览器的。

![desktop_screen](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_screen.jpg)

Fun! 但是这些信息跟对我们有什么用呢？

基本上没用。用户的显示器尺寸对于我们来说不重要－好吧，除非你想度量它来丰富你的web统计数据库。

## 窗口尺寸 ##

_window.innerWidth/Height_

* _意义：浏览器窗口的整体大小，包括滚动条。_
* _度量单位：CSS像素。_
* _浏览器错误：IE7不支持。Opera以设备像素进行度量。_

相反，你想知道的是浏览器窗口的内部尺寸。它告诉了你用户到底有多少空间可以用来做CSS布局。你可以通过`window.innerWidth`和`window.innerHeight`来获取这些尺寸。

![desktop_inner](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_inner.jpg)

很显然，窗口的内部宽度是以CSS像素进行度量的。你需要知道你的布局空间中有多少可以挤进浏览器窗口，当用户放大的时候这个数值会减少。所以如果用户进行放大操作，那么在窗口中你能获取的空间将会变少，`window.innerWidth/Height`的值也变小了。
（这儿的例外是Opera，当用户放大的时候`window.innerWidth/Height`并没有减少：它们是以设备像素进行度量的。这个问题在桌面上是比较烦人的，但是就像我们将要看到的，这在移动设备上却是非常严重的。）

![desktop_inner_zoomed](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_inner_zoomed.jpg)

注意度量的宽度和高度是包括滚动条的。它们也被视为内部窗口的一部分。（这大部分是因为历史原因造成的。）

## 滚动距离 ##

_window.pageX/YOffset_

* _意义：页面滚动的距离。_
* _度量单位：CSS像素。_
* _浏览器错误：无。_

`window.pageXOffset`和`window.pageYOffset`，包含了文档水平和垂直方向的滚动距离。所以你可以知道用户已经滚动了多少距离。

![desktop_page](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_page.jpg)

这些属性也是以CSS像素进行度量的。你想知道的是文档已经被滚动了多长距离，不管它是放大还是缩小的状态。

理论上，如果用户向上滚动，然后放大，`window.pageX/YOffset`将会发生变化。但是，浏览器为了想保持web页面的连贯，会在用户缩放的时候保持相同的元素位于可见页面的顶部。这个机制并不能一直很完美的执行，但是它意味着在实际情况下`window.pageX/YOffset`并没有真正的更改：被滚动出窗口的CSS像素的数量仍然（大概）是相同的。

![desktop_page_zoomed](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_page_zoomed.jpg)

## 概念：viewport ##

在我们继续介绍更多的JavaScript属性之前，我们必须介绍另一个概念：viewport。

viewport的功能是用来约束你网站中最顶级包含块元素（containing block）`<html>`的。

这听起来有一点模糊，所以看一个实际的例子。假设你有一个流式布局，并且你众多边栏中的一个具有`width: 10%`属性。现在这个边栏会随着浏览器窗口大小的调整而恰好的放大和收缩。但是这到底是如何工作的呢？

从技术上来说，发生的事情是边栏获取了它父元素宽度的10%。比方说是`<body>`元素（并且你还没有给它设置过`宽度`）。所以问题就变成了`<body>`的宽度是哪个？

普通情况下，所有块级元素使用它们父元素宽度的100%（这儿有一些例外，但是让我们现在先忽略它）。所以`<body>`元素和它的父元素`<html>`一样宽。

那么`<html>`元素的宽度是多少？它的宽度和浏览器窗口宽度一样。这就是为什么你的那个拥有`width: 10%`属性的侧边栏会占据整个浏览器窗口的10%。所有web开发者都很直观的知道并且在使用它。

你可能不知道的是这个行为在理论上是如何工作的。理论上，`<html>`元素的宽度是被viewport的宽度所限制的。`<html>`元素使用viewport宽度的100%。

__viewport，实际上等于浏览器窗口：它就是那么定义的。__viewport不是一个HTML结构，所以你不能用CSS来改变它。它在桌面环境下只是拥有浏览器窗口的宽度和高度。在移动环境下它会有一些复杂。

## 后果　Consequences ##

这个状况会有产生一些异样的后果。你可以在这个站点看到这些后果中的一个。滚动到顶部，然后放大两次或者三次，之后这个站点的内容就从浏览器窗口溢出了。

现在滚动到右边，然后你将会看见站点顶部的蓝色边栏不再覆盖一整行了。

![desktop_htmlbehaviour](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_htmlbehaviour.jpg)

这个行为是由于viewport的定义方式而产生的一个后果。我之前给顶部的蓝色边栏设置了`width: 100%`。什么的100%？`<html>`元素的100%，它的宽度和viewport是一样的，viewport的宽度是和浏览器窗口一样的。

问题是：在100%缩放的情况下这个工作的很好，现在我们进行了放大操作，viewport变得比我的站点的总体宽度要小。这对于viewport它本身来说没什么影响，内容现在从`<html>`元素中溢出了，但是那个元素拥有`overflow: visible`，这意味着溢出的内容在任何情况下都将会被显示出来。

但是蓝色边栏并没有溢出。我之前给它设置了`width: 100%`，并且浏览器把viewport的宽度赋给了它。它们根本就不在乎现在宽度实在是太窄了。

![desktop_100percent](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_100percent.jpg)

## 文档宽度？ ##

我真正需要知道的是页面中全部内容的宽度是多少，包括那些「伸出」的部分。据我所知得到这个值是不可能的（好吧，除非你去计算页面上所有元素的宽度和边距，但是委婉的说，这是容易出错的）。

我开始相信我们需要一个我称其为「文档宽度」(document width，很显然用CSS像素进行度量)的JavaScript属性对。

![desktop_documentwidth](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_documentwidth.jpg)

并且如果我们真的如此时髦，为什么不把这个值引入到CSS中？我将会给我的蓝色边栏设置`width: 100%`，此值基于文档宽度，而不是`<html>`元素的宽度。（但是这个很复杂，并且如果不能实现我也不会感到惊讶。）

浏览器厂商们，你们怎么认为的？

## 度量viewport ##

_document.documentElement.clientWidth/Height_

* _意义：Viewport尺寸。_
* _度量单位：CSS像素。_
* _浏览器错误：无。_

你可能想知道viewport的尺寸。它们可以通过`document.documentElement.clientWidth`和`-Height`得到。

![desktop_client](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_client.jpg)

如果你了解DOM，你应该知道`document.documentElement`实际上指的是`<html>`元素：即任何HTML文档的根元素。可以说，viewport要比它更高一层；它是包含`<html>`元素的元素。如果你给`<html>`元素设置`width`属性，那么这将会产生影响。（我不推荐这么做，但是那是可行的。）

在那种情况下`document.documentElement.clientWidth`和`-Height`给出的仍然是viewport的尺寸，而不是`<html>`元素的。（这是一个特殊的规则，只对这个元素的这个属性对产生作用。在任何其他的情况下，使用的是元素的实际宽度。）

![desktop_client_smallpage](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_client_smallpage.jpg)

所以`document.documentElement.clientWidth`和`-Height`一直代表的是viewport的尺寸，不管`<html>`元素的尺寸是多少。

## 两个属性对 ##

但是难道viewport宽度的尺寸也可以通过`window.innerWidth/Height`来提供吗？怎么说呢，模棱两可。

两个属性对之间存在着正式区别：`document.documentElement.clientWidth`和`-Height`并不包含滚动条，但是`window.innerWidth/Height`包含。这像是鸡蛋里挑骨头。

事实上两个属性对的存在是浏览器战争的产物。当时Netscape只支持`window.innerWidth/Height`，IE只支持`document.documentElement.clientWidth`和`Height`。从那时起所有其他浏览器开始支持`clientWidth/Height`，但是IE没有支持`window.innerWidth/Height`。

在桌面环境上拥有两个属性对是有一些累赘的　－　但是就像我们将要看到的，在移动端这将会得到祝福。

## 度量\<html>元素 ##

_document.documentElement.offsetWidth/Height_

* _意义：元素（也就是页面）的尺寸。_
* _度量单位：CSS像素。_
* _浏览器错误：IE度量的是viewport，而不是元素。_

所以`clientWidth/Height`在所有情况下都提供viewport的尺寸。但是我们去哪里获取`<html>`元素本身的尺寸呢？它们存储在`document.documentElement.offsetWidth`和`-Height`之中。

![desktop_offset](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_offset.jpg)

这些属性可以使你以块级元素的形式访问`<html>`元素；如果你设置`width`，那么`offsetWidth`将会表示它。

![desktop_offset_smallpage](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_offset_smallpage.jpg)

## 事件中的坐标 ##

_pageX/Y, clientX/Y, screenX/Y_

* _意义：见正文。_
* _度量单位：见正文。_
* _浏览器错误：IE不支持pageX/Y。IE和Opera以CSS像素为单位计算screenX/Y。_

然后是事件中的坐标。当一个鼠标事件发生时，有不少于五种属性对可以给你提供关于事件位置的信息。对于我们当前的讨论来说它们当中的三种是重要的：

* `pageX/Y`提供了相对于`<html>`元素的以CSS像素度量的坐标。

![desktop_pageXY](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_pageXY.jpg)

* `clientX/Y`提供了相对于viewport的以CSS像素度量的坐标。

![desktop_clientXY](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_clientXY.jpg)

* `screenX/Y`提供了相对于屏幕的以设备像素进行度量的坐标。

![desktop_screenXY](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_screenXY.jpg)

90%的时间你将会使用`pageX/Y`；通常情况下你想知道的是相对于文档的事件坐标。其他的10%时间你将会使用`clientX/Y`。你永远不需要知道事件相对于屏幕的坐标。

## 媒体查询 ##

_媒体查询_

* 意义：见正文。
* 度量单位：见正文。
* 浏览器错误：IE不支持它们。

    * 如果 `device-width/height`是以CSS像素进行度量的，那么Firefox将会使用`screen.width/height`的值。
    * 如果`width/height`是以设备像素进行度量的，那么Safari和Chrome将会使用`documentElement.clientWidth/Height`的值。

最后，说说关于媒体查询的事。原理很简单：你可以声明「只在页面宽度大于，等于或者小于一个特定尺寸的时候才会被执行」的特殊的CSS规则。比如：

    div.sidebar {
        width: 300px;
    }

    @media all and (max-width: 400px) {
        // styles assigned when width is smaller than 400px;
        div.sidebar {
            width: 100px;
        }

    }

当前sidebar是300px宽，除了当宽度小于400px的时候，在那种情况下sidebar变得100px宽。

问题很显然：我们这儿度量的是哪个宽度？

这儿有两个对应的媒体查询：`width/height`和`device-width/device-height`。

1.  `width/height`使用和`documentElement .clientWidth/Height`（换句话说就是viewport宽高）一样的值。它是工作在CSS像素下的。

2.  `device-width/device-height`使用和`screen.width/height`（换句话说就是屏幕的宽高）一样的值。它工作在设备像素下面。

![desktop_mediaqueries](http://s0-weizhifeng-net.b0.upaiyun.com/images/viewport/desktop_mediaqueries.jpg)

你应该使用哪个？这还用想？当然是`width`。Web开发者对设备宽度不感兴趣；这个是浏览器窗口的宽度。

所以在桌面环境下去使用`width`而去忘记`device-width`吧。我们即将看到这个情况在移动端会更加麻烦。

## 总结 ##

本文总结了我们对桌面浏览器行为的探寻。[这个系列的第二部分](http://weizhifeng.net/viewports2.html)把这些概念指向了移动端，并显示的指出了与桌面环境上的一些重要区别。

## Reference

- [在移动浏览器中使用viewport元标签控制布局 - Mobile](https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport _meta_ tag)
- [@viewport - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@viewport)
- [两个viewport的故事（第一部分）](http://weizhifeng.net/viewports.html)