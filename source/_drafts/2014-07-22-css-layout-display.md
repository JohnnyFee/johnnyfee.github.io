---
layout: post
title: "CSS Layout —— Display"
category: Web
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

## Inline Block

An element set to `inline-block` is very similar to inline in that it will set inline with the natural flow of text (on the "baseline"). The difference is that you are able to set a `width` and `height` which will be respected.

![inline-block.png ](http://johnnyimages.qiniudn.com/inline-block.png)

## none

另一个常用的display值是 `none` 。一些特殊元素的默认 `display` 值是它，例如 `script` 。 `display:none` 通常被 JavaScript 用来在不删除元素的情况下隐藏或显示元素。 

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