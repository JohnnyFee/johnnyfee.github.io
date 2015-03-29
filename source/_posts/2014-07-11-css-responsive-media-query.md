layout: post
title: "CSS Layout —— media"
category: CSS
tags: [web, css, layout]
--- 

现今每天都有更多的手机和平板电脑问市。消费者能够拥有可想象到的各种规格和形状的设备，但是网站开发人员却面临一个挑战：如何使他们的网站在传统浏览器、手机和平板电脑浏览器上有很好的效果，如何在各种大小的屏幕上提供一流的用户体验,答案是：采用响应式设计。响应式设计可以随所显示的屏幕大小而改变。实现响应式设计的主要方法是使用 CSS 媒体查询。

## 媒体查询

媒体查询包含媒体类型以及零或多个检查特定媒体特征条件的表达式。媒体类型包括：

- `all` 将样式用于所有设备（默认值）
- `aural` 将样式用于语音合成器
- `braille` 用于盲文设备
- `handheld` 手持设备
- `print` 打印预览和打印页面时
- `projection` 投影机
- `screen` 计算机显示器屏幕
- `tty` 电传打印机等等宽设备
- `tv` 电视机
- `embossed`

常用的为 `scrren`、`print` 以及表示所有媒体类型的 `all`。

    <!-- link元素中的CSS媒体查询 -->
    <link rel="stylesheet" media="(max-width: 800px)" href="example.css" />
    
    <!-- 样式表中的CSS媒体查询 -->
    <style>
    @media (max-width: 600px) {
      .facet_sidebar {
        display: none;
      }
    }
    </style>

<!--more-->

当媒体查询为真时，相关的样式表或样式规则就会按照正常的级联规则被应用。即使媒体查询返回假， `<link>` 标签上带有媒体查询的样式表仍将被下载，只不过不会被应用。

    <link rel="stylesheet" type="text/css" href="site.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="print.css" media="print" />

在上例 中，`media` 属性定义了应该用于指定每种媒体类型的样式表：

* `screen` 适用于计算机彩色屏幕。
* `print` 适用于打印预览模式下查看的内容或者打印机打印的内容。

最小水平屏幕宽度为 800 像素的屏幕（屏幕和打印等）都应使用如下 CSS 规则：

    @media all and (min-width: 800px) { ... }

* `@media all` 是媒体类型，也就是说，将此 CSS 应用于所有媒体类型。
* `(min-width:800px)` 是包含媒体查询的表达式，如果浏览器的最小宽度为 800 像素，则会告诉浏览器只运用下列 CSS。

以上媒体查询可以简写为：

    @media (min-width:800px) { ... }

在不使用 `not` 或 `only` 操作符的情况下，媒体类型是可选的，默认为 `all` 。 即：下列两句相同

    @media all and (min-width:500px) { … }
    @media (min-width:500px) { … }


## 逻辑操作符

操作符 `not`，`and` 和 `only` 可以用来 构建复杂的媒体查询 。   

- `and` 操作符用来把多个 [媒体属性](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries#Media_features "#Media_features") 组合起来，合并到同一条媒体查询中。只有当每个属性都为真时，这条查询的结果才为真。 

    如果你只想在横屏时应用这个，你可以使用 `and` 操作符合并媒体属性：

        @media (min-width: 700px) and (orientation: landscape) { ... }

- 媒体特征表达式没有 `or` 操作符，与之功能相当的是逗号分隔的媒体查询列表。如果逗号分隔的列表中的一或多个媒体查询为真，则整个列表为真，否则为假。

    如果你想在最小宽度为 700 像素或是横屏的手持设备上应用一组样式，你可以这样写：

        @media (min-width: 700px), handheld and (orientation: landscape) { ... }

- `not` 操作符用来对一条媒体查询的结果进行取反。

        @media not all and (monochrome) { ... }

    等价于：

        @media not (all and (monochrome)) { ... }

    而不是：

        @media (not all) and (monochrome) { ... }

- `only` 操作符表示仅在媒体查询匹配成功的情况下应用指定样式。可以通过它让选中的样式在老式浏览器中不被应用。
    `only` 关键字防止老旧的浏览器不支持带媒体属性的查询而应用到给定的样式：

        <link rel="stylesheet" media="only screen and (color)" href="example.css" />

    用户代理在处理由“only”起始的媒体查询时必须按照“only”关键字不存在进行处理。

- 若使用了 `not` 或 `only` 操作符，必须明确指定一个媒体类型。
- 你也可以将多个媒体查询以逗号分隔放在一起；只要其中任何一个为真，整个媒体语句就返回真。相当于 `or` 操作符。

## 媒体查询表达式语法

    media_query_list: <media_query> [, <media_query> ]*
    media_query: [[only | not]? <media_type> [ and <expression> ]*]
      | <expression> [ and <expression> ]*
    expression: ( <media_feature> [: <value>]? )
    media_type: all | aural | braille | handheld | print |
      projection | screen | tty | tv | embossed
    media_feature: width | min-width | max-width
      | height | min-height | max-height
      | device-width | min-device-width | max-device-width
      | device-height | min-device-height | max-device-height
      | aspect-ratio | min-aspect-ratio | max-aspect-ratio
      | device-aspect-ratio | min-device-aspect-ratio | max-device-aspect-ratio
      | color | min-color | max-color
      | color-index | min-color-index | max-color-index
      | monochrome | min-monochrome | max-monochrome
      | resolution | min-resolution | max-resolution
      | scan | grid

媒体查询是大小写不敏感的。包含未知媒体类型的查询通常返回假。

## 媒体特性

媒体特性与CSS属性类似，它们拥有名字并且接受某些值。大多数媒体特性接受可选的“min-”或“max-”前缀，用于表达“大于等于”和“小于等于”的限制。

媒体很多特性，比如宽度、颜色和网格，您可以在媒体查询中使用它们。要设计响应式网站，只需要了解一些媒体特性：方向、宽度和高度。作为一个简单媒体特性，方向的值可以是 portrait 或 landscape。这些值适用于持有手机或平板电脑的用户，使您可以根据两个形状因素来优化内容。当高度大于长度时，则认为屏幕是纵向模式，当宽度大于高度时，则认为屏幕是横向模式。清单 8 显示了一个使用 orientation 媒体模式查询的示例。

`orientation` 媒体查询：

    @media (orientation:portrait) { ... }

高度和宽度行为十分相似，都支持以 `min-` 和 `max-` 为前缀。清单 9 展示了一个有效的媒体查询。 

高度和宽度媒体查询：

    @media (min-width:800px) and (min-height:400px) { ... }

如果没有 `min-` 或 `max-` 前缀，您还可以使用 `width` 和 `height` 媒体特性，如清单 10 所示。

不带 `min-` 和 `max-` 前缀：

    @media (width:800px) and (height:400px) { ... }

当屏幕正好是 800 像素宽、400 像素高时，可以使用清单 10 中的媒体查询。现实中，像这样的媒体查询可能过于具体而不太有用。检测精确维度是大多数网站访问者都不可能遇到的一个场景。通常情况下，响应式设计会使用范围来执行屏幕检测。 

作为媒体查询大小范围的后续内容，下一节将讨论一些常见的媒体查询，在设计一个响应式网站时，您可能会发现它们非常有用。

完整的媒体属性可参考：

- [CSS媒体查询 - Web 开发者指南](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries#.E5.AA.92.E4.BD.93.E5.B1.9E.E6.80.A7)
- [CSS3媒体查询 - HTML5 Chinese Interest Group Wiki](http://www.w3.org/html/ig/zh/wiki/CSS3%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2#.E5.AA.92.E4.BD.93.E7.89.B9.E6.80.A7)

## 常见媒体查询

- [Media Queries for Standard Devices](http://css-tricks.com/snippets/css/media-queries-for-standard-devices/)
- [判断 iPad 和 iPhone 的版本和状态的 CSS 媒体查询代码](http://yujiangshui.com/document/css-media-queries-for-ipads-and-iphones-chinese-version/)

## 浏览器支持

到现在为止，您可能已经相信 CSS 媒体查询是一个强大的工具，而且想知道哪些浏览器支持 CSS 媒体查询。以下是这方面的好消息和坏消息。

* 好消息是：大多数现代浏览器（包括智能手机上的浏览器）都支持 CSS 媒体查询。
* 坏消息是：最近，来自 Redmond 的 Windows® Internet Explorer® 8 浏览器不支持媒体查询。 

对于大多数专业 Web 开发人员来说，这意味着您需要提供一个解决方案，以便在 Internet Explorer 中支持媒体查询。

下列解决方案是一个名为 respond.js 的 JavaScript polyfill。

浏览器对 `media` 的支持请参考：[Can I use CSS3 Media Queries](http://caniuse.com/css-mediaqueries)

### 带有 respond.js 的 Polyfill 

Respond.js 是一个极小的增强 Web 浏览器的 JavaScript 库，使得原本不支持 CSS 媒体查询的浏览器能够支持它们。该脚本循环遍历页面上的所有 CSS 引用，并使用媒体查询分析 CSS 规则。然后，该脚本会监控浏览器宽度变化，添加或删除与 CSS 中媒体查询匹配的样式。最终结果是，能够在原本不支持的浏览器上运行媒体查询。 

由于这是一个基于 JavaScript 的解决方案，所以浏览器需要支持 JavaScript，以便运行脚本。该脚本只支持创建响应式设计所需的最小和最大 `width` 媒体查询。这并不是适用于所有可能 CSS 媒体查询的一个替代。在 [参考资料](http://www.ibm.com/developerworks/cn/web/wa-cssqueries/#resources) 部分，可以阅读关于该脚本特性和局限性的更多信息。

Respond.js 是您可以选择的诸多可用开源媒体查询 polyfills 之一。如果您觉得 respond.js 无法满足您的需求，在进行一个小小的研究之后，您就会发现几个替代方案。

## Tutorial

- [CSS Media Queries & Using Available Space](http://css-tricks.com/css-media-queries/)
- [Different Stylesheets for Differently Sized Browser Windows](http://css-tricks.com/resolution-specific-stylesheets/)
- [使用 CSS 媒体查询创建响应式网站](http://www.ibm.com/developerworks/cn/web/wa-cssqueries/)
- [CSS3媒体查询 - HTML5 Chinese Interest Group Wiki](http://www.w3.org/html/ig/zh/wiki/CSS3%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2#device-aspect-ratio)
- [CSS媒体查询 - Web 开发者指南](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)
- [[CSS] 彈性化的 Media Query - HINA::工程幼稚園](http://blog.hinablue.me/entry/css-media-query-use-pixel-or-not/)
- [Boilerplate CSS Media Queries](http://www.paulund.co.uk/boilerplate-css-media-queries)
- [CSS3 Media Queries](http://www.w3cplus.com/content/css3-media-queries)
- [CSS3 Media Queries模板](http://www.w3cplus.com/css3/css3-media-queries-for-different-devices)
- [Responsive设计和CSS3 Media Queries的结合](http://www.w3cplus.com/css3/responsive-design-with-css3-media-queries)
- [Using Media Queries in JavaScript](http://flippinawesome.org/2014/03/24/using-media-queries-in-javascript/)
- [Using media queries in JavaScript (AbsurdJS edition) - Tech.pro](http://tech.pro/tutorial/1919/using-media-queries-in-javascript-absurdjs-edition)