---
layout: post
title: "CSS Layout —— Display"
category: CSS
tags: [web, css, layout]
--- 

## display

Every element on a web page is a rectangular box. The display property in CSS determines just how that rectangular box behaves. There are only a handful of values that are commonly used:

```css
div {
  display: inline;        /* Default of all elements, unless UA stylesheet overrides */
  display: inline-block;  /* Characteristics of block, but sits on a line */
  display: block;         /* UA stylesheet makes things like <div> and <section> block */
  display: run-in;        /* Not particularly well supported or common */
  display: none;          /* Hide */
}
```

<!--more-->

The default value for all elements is inline. Most "User Agent stylesheets" (the default styles the browser applies to all sites) reset many elements to "block". Let's go through each of these, and then cover some of the other less common values.

经过浏览器的 UA 处理后，每个元素都有一个默认的 `display` 值，这与元素的类型有关。对于大多数元素它们的默认值通常是 `block` 或 `inline` 。一个 `block` 元素通常被叫做块级元素。一个 `inline` 元素通常被叫做行内元素。

虽然每个元素都有一个默认的 `display` 类型，不过你可以随时随地的重写它。常见的例子是：把 `li` 元素修改成 `inline`，制作成水平菜单。

## block

`div` 是一个标准的块级元素。一个块级元素会新开始一行并且尽可能撑满容器。其他常用的块级元素包括 `p` 、 `form` 和HTML5中的新元素： `header` 、 `footer` 、 `section` 等等。

## inline

`span` 是一个标准的行内元素。一个行内元素可以在段落中 `<span>` <span style="border:1px solid #FFCCD1">像这样</span> `</span>`包裹一些文字而不会打乱段落的布局。 其他常见的行内元素如：`<em>`, `<b>` 等。

An inline element will accept margin and padding, but the element still sits inline as you might expect. Margin and padding will only push other elements horizontally away, not vertically.

![css-layout-inlinepadding.png](http://johnnyimages.qiniudn.com/css-layout-inlinepadding.png)

An inline element will not accept height and width. It will just ignore it.

## inline-block

An element set to `inline-block` is very similar to `inline` in that it will set inline with the natural flow of text (on the "baseline"). The difference is that you are able to set a `width` and `height` which will be respected.

![inline-block.png ](http://johnnyimages.qiniudn.com/inline-block.png)

你可以创建很多网格来铺满浏览器。在过去很长的一段时间内使用 float 是一种选择，但是使用 inline-block 会更简单。让我们看下使用这两种方法的例子：

```cs
.box {
  float: left;
  width: 200px;
  height: 100px;
  margin: 1em;
}
.after-box {
  clear: left;
}
```

<style type="text/css">
.box {
  float: left;
  width: 200px;
  height: 100px;
  margin: 10px;
  border: 1px solid red;
}
.after-box {
  border: 1px solid green;
  clear: left;
}
.container1 {
  border: 1px solid yellow;
}
</style>

<div class="container1" style="">
  <div class="box">我在浮动！</div>
  <div class="box">我在浮动！</div>
  <div class="box">我在浮动！</div>
  <div class="box">我在浮动！</div>

  <div class="after-box">没有浮动</div>
</div>

你可以用 `display` 属性的值 `inline-block` 来实现相同效果。

```css
.box2 {
  display: inline-block;
  width: 200px;
  height: 100px;
  margin: 1em;
}
```

你得做些额外工作来让[IE6和IE7支持](http://blog.mozilla.org/webdev/2009/02/20/cross-browser-inline-block/)`inline-block` 。有些时候人们谈到 `inline-block` 会触发叫做 `hasLayout` 的东西，你只需要知道那是用来支持旧浏览器的。如果你对此很感兴趣，可以在前面那个链接中找到更详细的信息。否则我们就继续下去吧。

你可以使用 `inline-block` 来布局。有一些事情需要你牢记： 

* `vertical-align` 属性会影响到 `inline-block` 元素，你可能会把它的值设置为 `top` 。
* 你需要设置每一列的宽度
* 如果HTML源代码中元素之间有空格，那么列与列之间会产生空隙。

```css
nav {
  display: inline-block;
  vertical-align: top;
  width: 25%;
}
.column {
  display: inline-block;
  vertical-align: top;
  width: 75%; <!-- 由于HTML之间的空隙，设置为 75% 可能会错行，< 75% 可以。-->
}
```

<style type="text/css">
  nav {
    display: inline-block;
    vertical-align: top;
    width: 25%;
    border: 1px solid red;
  }
  .column {
    border: 1px solid green;
    display: inline-block;
    vertical-align: top;
    width: 74%;
  }
</style>

<div class="container1">
  <nav>
    <ul>
      <li>1. H</li>
      <li>2. E</li>
    </ul>
  </nav>
  <div class="column">
      <section>S1</section>
      <section>S2</section>
  </div>
</div>

## none

另一个常用的 `display` 值是 `none` 。一些特殊元素的默认 `display` 值是它，例如 `script` 。 `display:none` 通常被 JavaScript 用来在不删除元素的情况下隐藏或显示元素。 

它和 `visibility` 属性不一样。把 `display` 设置成 `none` 不会保留元素本该显示的空间，但是 `visibility: hidden`; 还会保留。

## Table Values

There is a whole set of display values the force non-table elements to behave like table-elements, if you need that to happen. It's rare-ish, but it sometimes allows you to be "more semantic" with your code while utilizing the unique positioning powers of tables.

```css
div {
  display: table;
  display: table-cell;
  display: table-column;
  display: table-colgroup;
  display: table-header-group;
  display: table-row-group;
  display: table-footer-group;
  display: table-row;
  display: table-caption;
}
```

To use, just mimic normal table structure. Simple example:

```html
<div style="display: table;">
  <div style="display: table-row;">
    <div style="display: table-cell;">
      Gross but sometimes useful.
    </div>
  </div>
</div>
```

## Reference

- [display](http://css-tricks.com/almanac/properties/d/display/)
- [display - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [display](http://css-tricks.com/almanac/properties/d/display/)
- [学习CSS布局](http://zh.learnlayout.com/)