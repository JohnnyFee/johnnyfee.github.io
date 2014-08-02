---
layout: post
title: "CSS 盒模式"
category: CSS
tags: [web, css, layout]
--- 

## 盒模式

**网页设计中的每个元素都是长方形的盒子。**盒子的尺寸是怎样精确计算的，请看下图：

![css-layout-box-model.png](http://johnnyimages.qiniudn.com/css-layout-box-model0.png)

<!--more-->

在 Firebug 中：

![css-layout-box-model.png](http://johnnyimages.qiniudn.com/css-layout-box-model.png)

盒子有四个边界：外边距边界 margin edge, 边框边界 border edge, 内边距边界 padding edge 与 内容边界 content edge。

Margin 比较特别，它不会影响盒子本身的大小，但是它会
影响和盒子有关的其他内容，因此 margin 是盒模型的一个重要的组成部分。

盒子本身的大小是这样计算的：

    Width = width + padding-left + padding-right + border-left + border-right
    Height = height + padding-top + padding-bottom + border-top + border-bottom

- **内容区域 content area** 是真正包含元素内容的区域。位于内容边界的内部，它的大小为内容宽度 或 _content-box_ 宽及内容高度或 _content-box_ 高。

    如果 [`box-sizing`](https://developer.mozilla.org/zh-CN/docs/CSS/box-sizing "") 为默认值， [`width`](https://developer.mozilla.org/zh-CN/docs/CSS/width ""), [`min-width`](https://developer.mozilla.org/zh-CN/docs/CSS/min-width ""), [`max-width`](https://developer.mozilla.org/zh-CN/docs/CSS/max-width ""), [`height`](https://developer.mozilla.org/zh-CN/docs/CSS/height ""), [`min-height`](https://developer.mozilla.org/zh-CN/docs/CSS/min-height "") 与 [`max-height`](https://developer.mozilla.org/zh-CN/docs/CSS/max-height "") 控制内容大小。

- **内边距区域 padding area** 用内容及可能的边框之间的空白区域扩展内容区域。

    内边距与内容边界之间的空间可以由 [`padding-top`](https://developer.mozilla.org/zh-CN/docs/CSS/padding-top ""), [`padding-right`](https://developer.mozilla.org/zh-CN/docs/CSS/padding-right ""), [`padding-bottom`](https://developer.mozilla.org/zh-CN/docs/CSS/padding-bottom ""), [`padding-left`](https://developer.mozilla.org/zh-CN/docs/CSS/padding-left "") 和简写属性 [`padding`](https://developer.mozilla.org/zh-CN/docs/CSS/padding "") 控制。

- **边框区域 border area** 是包含边框的区域，扩展了内边距区域。它位于边框边界内部，大小为 _border-box_ 宽和 _border-box_ 高。由 [`border-width`](https://developer.mozilla.org/zh-CN/docs/CSS/border-width "") 及简写属性 [`border`](https://developer.mozilla.org/zh-CN/docs/CSS/border "")控制。

- **外边距区域 margin area** 用空白区域扩展边框区域，以分开相邻的元素。它的大小为 _margin-box_ 的高宽。

    外边距区域大小由 [`margin-top`](https://developer.mozilla.org/zh-CN/docs/CSS/margin-top ""), [`margin-right`](https://developer.mozilla.org/zh-CN/docs/CSS/margin-right ""), [`margin-bottom`](https://developer.mozilla.org/zh-CN/docs/CSS/margin-bottom ""), [`margin-left`](https://developer.mozilla.org/zh-CN/docs/CSS/margin-left "") 及简写属性 [`margin`](https://developer.mozilla.org/zh-CN/docs/CSS/margin "") 控制。

    在 [外边距合并](https://developer.mozilla.org/en/CSS/margin_collapsing "en/CSS/margin_collapsing") 的情况下，由于盒之间共享外边距，外边距不容易弄清楚。

    最后注意，对于行内非替换元素，其占用空间（行高）由 [`line-height`](https://developer.mozilla.org/zh-CN/docs/CSS/line-height "") 决定，即使有内边距与边框。

如果未声明 padding 或者 border，那他们或者值为零(使用 css reset 时)，或者为浏览器的默认值(很可能不是零，尤其是那些通常没有重置的表单元素)

在我们讨论宽度的时候，我们应该讲下与它相关的一个重点知识：盒模型。当你设置了元素的宽度，实际展现的元素却能够超出你的设置：因为元素的边框和内边距会撑开元素。看下面的例子，两个相同宽度的元素显示的实际宽度却不一样。

<div data-height="268" data-theme-id="0" data-slug-hash="AazLm" data-default-tab="html" class='codepen'><pre><code>&lt;div class=&quot;simple&quot;&gt;
    我小一些
&lt;/div&gt;

&lt;div class=&quot;fancy&quot;&gt;
    我大一些
&lt;/div&gt;</code></pre>
<p>See the Pen <a href='http://codepen.io/JohnnyFee/pen/AazLm/'>AazLm</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div><script async src="//codepen.io/assets/embed/ei.js"></script>

以前有一个代代相传的解决方案是数学。CSS开发者需要用比他们实际想要的宽度小一点的宽度，需要减去内边距和边框的宽度。

经过了一代又一代人们意识到数学不好玩，所以他们新增了一个叫做 `box-sizing` 的CSS属性。当你设置一个元素为 `box-sizing: border-box;` 时，此元素的内边距和边框不再会增加它的宽度。这里有一个与前一页相同的例子，唯一的区别是两个元素都设置了 `box-sizing: border-box;` ：

```css
.simple {
  width: 500px;
  margin: 20px auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}

.fancy {
  width: 500px;
  margin: 20px auto;
  padding: 50px;
  border: solid blue 10px;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
```

现在两个 div 的宽度相同了。

既然没有比这更好的方法，一些CSS开发者想要页面上所有的元素都有如此表现。所以开发者们把以下CSS代码放在他们页面上：

```css
* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
```

这样可以确保所有的元素都会用这种更直观的方式排版。 

既然 box-sizing 是个很新的属性，目前你还应该像我之前在例子中那样使用 -webkit- 和 -moz- 前缀。这可以启用特定浏览器实验中的特性。同时记住它支持[IE8+](http://caniuse.com/#search=box-sizing)。

## Reference

- [盒模型 - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box_model)
- [The CSS Box Model](http://css-tricks.com/the-css-box-model/)
- [视觉格式化模型 - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Visual_formatting_model)
- [KB006: CSS 框模型( Box module ) - W3Help](http://www.w3help.org/zh-cn/kb/006/)
- [* { box-sizing: border-box } FTW - Paul Irish](http://www.paulirish.com/2012/box-sizing-border-box-ftw/)