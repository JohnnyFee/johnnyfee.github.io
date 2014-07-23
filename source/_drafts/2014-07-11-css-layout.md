---
layout: post
title: "CSS Layout"
category: Web
tags: [web, css, layout]
--- 

- [CSS - layout](http://zh.learnlayout.com/)
- [CSS 布局:40个教程、技巧、例子和最佳实践](http://coolshell.cn/articles/6840.html)
- [使用 CSS 弹性盒 - CSS](https://developer.mozilla.org/zh-CN/docs/CSS/Tutorials/Using_CSS_flexible_boxes)
- [学习CSS布局](http://zh.learnlayout.com/)
- [Are We Ready to Use Flexbox?](http://www.sitepoint.com/are-we-ready-to-use-flexbox)

## margin

设置块级元素的 `width` 可以阻止它从左到右撑满容器，然后你就可以设置左右外边距为 `auto` 来使其水平居中。元素会占据你所指定的宽度，然后剩余的宽度会一分为二成为左右外边距。

```css
#main {
  width: 600px;
  margin: 0 auto; 
}
```

唯一的问题是，当浏览器窗口比元素的宽度还要窄时，浏览器会显示一个水平滚动条来容纳页面。让我们再来改进下这个方案：

```css
#main {
  max-width: 600px;
  margin: 0 auto; 
}
```

在这种情况下使用 `max-width` 替代 `width` 可以使浏览器更好地处理小窗口的情况。这点在移动设备上显得尤为重要。

<div style="max-width:600px; margin: 0 auto; border: 1px solid #9979D1">
    所有的结局都已写好<br/>
    所有的泪水也都已启程<br/>
    却忽然忘了是怎么样的一个开始<br/>
    在那个古老的不再回来的夏日<br/>
</div>

顺便提下， 所有的主流浏览器包括IE7+在内都支持 max-width ，所以放心大胆的用吧。

## Box Model

在我们讨论宽度的时候，我们应该讲下与它相关的一个重点知识：盒模型。当你设置了元素的宽度，实际展现的元素却能够超出你的设置：因为元素的边框和内边距会撑开元素。看下面的例子，两个相同宽度的元素显示的实际宽度却不一样。

```css
.simple {
  width: 500px;
  margin: 20px auto;
}

.fancy {
  width: 500px;
  margin: 20px auto;
  padding: 50px;
  border-width: 10px;
}
```

<div style="border: 1px solid #BFAEFC;width: 500px;margin: 20px auto;">
    我小一些
</div>

<div style="border: 1px solid #87ACF2;
  width: 500px;
  margin: 20px auto;
  padding: 50px;
  border-width: 10px;">
    我大一些
</div>

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

## Flexbox

There are some older versions of flexbox syntax, so please [consult this article](http://css-tricks.com/using-flexbox/) for the syntax in using flexbox with the best browser support. Be sure to see this [complete guide to Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Reference

- [float](http://css-tricks.com/almanac/properties/f/float/)
- [Force Element To Self-Clear its Children](http://css-tricks.com/snippets/css/clear-fix/)
- [position](http://css-tricks.com/almanac/properties/p/position/)
- [display](http://css-tricks.com/almanac/properties/d/display/)
- [学习CSS布局](http://zh.learnlayout.com/)
- [对CSS中的Position、Float属性的一些深入探讨](http://www.cnblogs.com/coffeedeveloper/p/3145790.html)
- [CS001: 清理浮动的几种方法以及对应规范说明 - W3Help](http://www.w3help.org/zh-cn/casestudies/001)