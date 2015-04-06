layout: post
title: "CSS 多栏布局"
category: CSS
tags: [web, css, layout]
---

## column-count

The `column-count` property in CSS controls how many vertical columns text in a particular element will be broken into. For instance:

`column-count` 属性用于控制元素垂直划分的列数，如：

<!-- more -->

```css
p.intro-text {
   column-count: 3;
}
```

`column-gap` 用于指定文本之间的空隙：

```css
p.intro-text {
  column-count:         3;
  column-gap:           20px;
}
```

<div style="column-count: 2; column-gap: 20px;-webkit-column-count: 2; -webkit-column-gap: 20px; -moz-column-count: 2; -moz-column-gap: 20px; border: 1px solid #ccc; padding: 0px 10px;">
<p style="margin-top: 0">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. </p>

<p>
Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
</p>

</div>

```css
column-count:         3;
column-gap:           20px;
```

## column-width

See [column-width](http://css-tricks.com/almanac/properties/c/column-width/)

The browser will calculate how many columns of _at least_ that width can fit in the space. Think of `column-width` as a minimum width suggestion for the browser.

`column-width` 可以设置为 `auto` 或者长度。

如果你使用 `column-count`，你可以将 `column-width` 设置为 `auto`。这时，布局以 `column-count` 为准。

## columns

See [columns](http://css-tricks.com/almanac/properties/c/columns/)

`columns` 是  `column-count` 和 `column-width` 的简写属性。当同时使用 `column-count` 和 `column-width` 时，`column-count` 是列数的最大值，`column-width` 指定每列的最小长度。使用这些属性，多列布局在小宽度的浏览器中会自动合并为一个单列，而无需借助媒体查询或者其他规则。

## column-span

See [column-span](http://css-tricks.com/almanac/properties/c/column-span/)

在多列布局中，你可以使用 `column-span` 来让元素实现跨列：

```css
h2 {
 -webkit-column-span: all;
         column-span: all;
}
```

`column-span` 的值可以是 `all` or `none`。设置 `column-span: all` 可以让它跨所有的列。`none` 值可以结束元素跨列，你可以结合媒体查询使用或者让跨列元素停止跨列。

<div style="-webkit-columns: 2 150px; -moz-columns: 2 150px; columns: 2 150px; -webkit-column-gap: 2em; -moz-column-gap: 2em; column-gap: 2em; border: 1px solid #ccc; padding: 0 10px">
  <h1 style="-webkit-column-span: all; -moz-column-span: all; column-span: all; font-size: 2em; margin-bottom: 0.5em; line-height: 1.2;">Sed dignissim lacinia nunc Sed dignissim lacinia nunc</h1>
  <p class="lead">Aenean quam. In scelerisque sem at dolor. Sed convallis tristique sem.</p>
  <p>Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. </p>
</div>

```css
.container {
  columns: 4 150px;
  column-gap: 2em; 
}

h1 {
  column-span: all;
  font-size: 2em;
  margin-bottom: 0.5em;
  line-height: 1.2;
}
```

## column-rule

See [column-rule](http://css-tricks.com/almanac/properties/c/column-rule/)

你可以在列之间添加垂直线来分隔，这条线位于类空隙中间。

```css
.container {
  -webkit-columns: 2 400px;
     -moz-columns: 2 400px;
          columns: 2 400px;
  -webkit-column-rule: 1px solid black;
     -moz-column-rule: 1px solid black;
          column-rule: 1px solid black;
}
```

这个属性是 `column-rule-width`, `column-rule-style`, and `column-rule-color` 的简写，这和 `border` 的值一样。

```css
-webkit-column-rule-width: 1px;
   -moz-column-rule-width: 1px;
        column-rule-width: 1px;
-webkit-column-rule-style: solid;
   -moz-column-rule-style: solid;
        column-rule-style: solid;
-webkit-column-rule-color: black;
   -moz-column-rule-color: black;
        column-rule-color: black;
```

`column-rule-width` 值可以是 `3px` 或者类似于 `thin` 的关键字。`column-rule-style` 可以是任意的 `border-style` 值，如 `solid`, `dotted`, and `dashed`。

<div style="-webkit-columns: 3 150px; -moz-columns: 3 150px; columns: 3 150px; -webkit-column-gap: 5em; -moz-column-gap: 5em; column-gap: 5em;-webkit-column-rule: 1px solid #ccc;-moz-column-rule: 1px solid #ccc;column-rule: 1px solid #ccc;">
  <p>This example uses <code>column-rule-style: dotted;</code>.</p>
  <p>Nunc a vulputate turpis. Duis ornare lacus magna, vitae tincidunt leo elementum et. Sed posuere metus a pellentesque mattis.</p>
</div>


```css
.container {
  columns: 3 150px;
  column-gap: 5em;
  column-rule: 1px solid #ccc;
}
```

## Tutorial

- [Create Columns Easily With The CSS3 Multi-Column Layout Module - Vanseo Design](http://www.vanseodesign.com/css/multi-columns/)
- [4 Methods For Creating Equal Height Columns In CSS - Vanseo Design](http://www.vanseodesign.com/css/equal-height-columns/)
