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

- [Should You Use Inline-Blocks As A Substitute For Floats? - Vanseo Design](http://www.vanseodesign.com/css/inline-blocks/)

An element set to `inline-block` is very similar to `inline` in that it will set inline with the natural flow of text (on the "baseline"). The difference is that you are able to set a `width` and `height` which will be respected.

![inline-block.png ](http://johnnyimages.qiniudn.com/inline-block.png)

你可以创建很多网格来铺满浏览器。在过去很长的一段时间内使用 float 是一种选择，但是使用 inline-block 会更简单。让我们看下使用这两种方法的例子：

<p data-height="268" data-theme-id="0" data-slug-hash="bnEtH" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/bnEtH/'>float-column</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

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

<p data-height="268" data-theme-id="0" data-slug-hash="tcoGy" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/tcoGy/'>inline-block-layout</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

### the Space Between Inline Block Elements

真正意义上的inline-block水平呈现的元素间，换行显示或空格分隔的情况下会有间距。

```
<nav>
  <a href="#">One</a>
  <a href="#">Two</a>
  <a href="#">Three</a>
</nav>
```

```
nav a {
  display: inline-block;
  padding: 5px;
  background: red;
}
```

Will result in:

![](http://cdn.css-tricks.com/wp-content/uploads/2012/04/spaces.png "spaces")  

__移除空隙的方法：__

- [Fighting the Space Between Inline Block Elements](http://css-tricks.com/fighting-the-space-between-inline-block-elements/)
- [去除inline-block元素间间距的N种方法](http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/)

<p data-height="400" data-theme-id="0" data-slug-hash="hmlqF" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/chriscoyier/pen/hmlqF/'>Ways to handle space between inline-block elements</a> by Chris Coyier (<a href='http://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## none

另一个常用的 `display` 值是 `none` 。一些特殊元素的默认 `display` 值是它，例如 `script` 。 `display:none` 通常被 JavaScript 用来在不删除元素的情况下隐藏或显示元素。 

它和 `visibility` 属性不一样。把 `display` 设置成 `none` 不会保留元素本该显示的空间，但是 `visibility: hidden`; 还会保留。

## table

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

See [我所知道的几种display:table-cell的应用 « 张鑫旭-鑫空间-鑫生活](http://www.zhangxinxu.com/wordpress/2010/10/%E6%88%91%E6%89%80%E7%9F%A5%E9%81%93%E7%9A%84%E5%87%A0%E7%A7%8Ddisplaytable-cell%E7%9A%84%E5%BA%94%E7%94%A8/)

## other

- list-item : 为元素内容生成一个块型盒，随后再生成一个列表型的行内盒。
- compact : 取决于上下文，display 属性的这个值可能会创建一个行内盒，也可能会创建一个块状盒。不同的情况下会对紧凑（compact）元素应用不同的 CSS 属性。在块型盒中，compact 元素显示在块型元素的左边距（margin）或右边距中。compact 元素会影响所在行的行高计算，其“vertical-align”属性的值是与块型元素的相对值。
- run-in : Depending on context, this value for the display property creates either an in-line or block level rendering box. In each case different CSS properties may apply to the run-in element. Properties for the run-in element are inherited from its parent element in the document tree, not from the block element box it participates in.

## Reference

- [display](http://css-tricks.com/almanac/properties/d/display/)
- [display - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [display](http://css-tricks.com/almanac/properties/d/display/)
- [学习CSS布局](http://zh.learnlayout.com/)

<script async src="//codepen.io/assets/embed/ei.js"></script>
