---
layout: post
title: "CSS Layout"
category: CSS
tags: [web, css, layout]
--- 

## margin

设置块级元素的 `width` 可以阻止它从左到右撑满容器，然后你就可以设置左右外边距为 `auto` 来使其水平居中。元素会占据你所指定的宽度，然后剩余的宽度会一分为二成为左右外边距。

```css
#main {
  width: 600px;
  margin: 0 auto; 
}
```

唯一的问题是，当浏览器窗口比元素的宽度还要窄时，浏览器会显示一个水平滚动条来容纳页面。让我们再来改进下这个方案：

<!--more-->

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

## column

The `column-count` property in CSS controls how many vertical columns text in a particular element will be broken into. For instance:

    p.intro-text {
       column-count: 3;
    }

It is meant to be paired with column-gap, where you can specify how wide the gutter is between the text. You'll also need to prefix the properties to get the best browser support.

    p.intro-text {
      -webkit-column-count: 3;
      -webkit-column-gap:   20px;  
      -moz-column-count:    3;
      -moz-column-gap:      20px;
      column-count:         3;
      column-gap:           20px;
    }

<style type="text/css">
  p.intro-text {
      border: 1px solid red;
      -webkit-column-count: 3;
      -webkit-column-gap:   20px;  
      -moz-column-count:    3;
      -moz-column-gap:      20px;
      column-count:         3;
      column-gap:           20px;
  }
</style>

Of which you would apply to a block of text like so:

    <p class="intro-text">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.</p>

<p class="intro-text">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.</p>

### All Related Properties

    .three-col {
      column-count: 3;
      column-gap: 20px;
      column-rule-color: #ccc;
      column-rule-style:solid;
      column-rule-width: 1px;
    }

You can also set the `column-width` (with prefixes) but it generally makes more sense to let it auto calculate that.

The rule ("rule", as in, a line) will split the gap down the middle. You can use the same values as you would a `border`. 

Take care not to have your text blocks be so enormously tall that they are taller than a (fairly small) browser window, otherwise it's the same problem as text being wider than the browser window (scrolling back and forth to read = sucks). Also consider `text-align: justify;`

### Browser Support

Chrome | Safari | Firefox  |Opera  |IE  |Android | iOS 
-------|--------|----------|-------|----|--------|-------
Any    | 3+     | 1.5+     | 11.1+ |10+ |TBD     |TBD

## css 框架

[![blueprint](http://zh.learnlayout.com/images/blueprint.jpg)](http://www.blueprintcss.org/)[![unsemantic](http://zh.learnlayout.com/images/unsemantic.png)](http://www.unsemantic.com/)[![bluetrip](http://zh.learnlayout.com/images/bluetrip.jpg)](http://bluetrip.org/)[![elasticss](http://zh.learnlayout.com/images/elasticss.jpg)](http://elasticss.com/)[![bootstrap](http://zh.learnlayout.com/images/bootstrap.jpg)](http://twitter.github.com/bootstrap/)[![gumby](http://zh.learnlayout.com/images/gumby.jpg)](http://gumbyframework.com/)[![susy](http://zh.learnlayout.com/images/susy.jpg)](http://susy.oddbird.net/)[![foundation](http://zh.learnlayout.com/images/foundation.png)](http://foundation.zurb.com/)[![kube](http://zh.learnlayout.com/images/kube.png)](http://imperavi.com/kube/)[![groundwork](http://zh.learnlayout.com/images/groundwork.gif)](http://groundworkcss.github.com/)

## Reference

- [学习CSS布局](http://zh.learnlayout.com/)
- [column-count](http://css-tricks.com/almanac/properties/c/columns/)
- [CSS 布局:40个教程、技巧、例子和最佳实践](http://coolshell.cn/articles/6840.html)