---
layout: post
title: "Bootstrap 栅格系统"
category: JavaScript
tags: [javascript]
---

<link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/twitter-bootstrap/3.3.0/css/bootstrap.css">

See [type.less](https://github.com/twbs/bootstrap/blob/master/less/type.less)

## 标题

HTML 中的所有标题标签，`<h1>` 到 `<h6>` 均可使用。另外，还提供了 `.h1` 到 `.h6` 类，为的是给内联（inline）属性的文本赋予标题的样式。在标题内还可以包含 `<small>` 标签或赋予 `.small` 类的元素，可以用来标记副标题。

```html
<h1>h1. Bootstrap heading <small>Secondary text</small></h1>
<h2>h2. Bootstrap heading <small>Secondary text</small></h2>
<h3>h3. Bootstrap heading <small>Secondary text</small></h3>
<h4>h4. Bootstrap heading <small>Secondary text</small></h4>
<h5>h5. Bootstrap heading <small>Secondary text</small></h5>
<h6>h6. Bootstrap heading <small>Secondary text</small></h6>
```

## 页面主体

Bootstrap 将全局 `font-size` 设置为 **14px**，`line-height` 设置为 **1.428**。这些属性直接赋予 `<body>` 元素和所有段落元素。另外，`<p>` （段落）元素还被设置了等于 1/2 行高（即 10px）的底部外边距（margin）。

通过添加 `.lead` 类可以让段落突出显示，

```css
.lead {
  margin-bottom: @line-height-computed;
  font-size: floor((@font-size-base * 1.15));
  font-weight: 300;
  line-height: 1.4;

  @media (min-width: @screen-sm-min) {
    font-size: (@font-size-base * 1.5);
  }
}
```

如：

<p class="lead">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.</p>

```html
<p class="lead">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.</p>
```

## 内联文本元素

标签 | 描述 | 实例
-----|------|----------
mark | 表示与另一段上下文相关而被突出显示的内容。| I would like a  <mark>pair</mark> of <mark>pears</mark>.
del | 被删除的文本 | <del>This line of text is meant to ...</del>
s | 无用文本 | <s>This line of text is meant to ... </s>
ins | 额外插入的文本 | <ins>This line of text is meant to ...</ins>
u | 为文本添加下划线 | <u>This line of text will render as underlined</u>
small | 小号文本 | <small>This line of text is meant ...</small>
em|用斜体强调一段文本。|<em>rendered as italicized text</em>
abbr |缩略语|<abbr title="attribute">attr</abbr>

在 HTML5 中可以放心使用 `<b>` 和 `<i>` 标签。`<b>` 用于高亮单词或短语，不带有任何着重的意味；而 `<i>` 标签主要用于发言、技术词汇等。

`<mark>`:

```css
mark,
.mark {
  background-color: @state-warning-bg;
  padding: .2em;
}

// Ex: (12px small font / 14px base font) * 100% = about 85%
small,
.small {
  font-size: floor((100% * @font-size-small / @font-size-base));
}

```

`<abbr>`:

```
// Abbreviations and acronyms
abbr[title],
// Add data-* attribute to help out our tooltip plugin, per https://github.com/twbs/bootstrap/issues/5257
abbr[data-original-title] {
  cursor: help;
  border-bottom: 1px dotted @abbr-border-color;
}

// 为缩略语添加 .initialism 类，可以让 font-size 变得稍微小些。
.initialism {
  font-size: 90%;
  text-transform: uppercase;
}
```

## 对齐

通过文本对齐类，可以简单方便的将文字重新对齐。

<div style="border: 1px solid #ccc;">
    <p class="text-left">Left aligned text.</p>
    <p class="text-center">Center aligned text.</p>
    <p class="text-right">Right aligned text.</p>
    <p class="text-justify">Justified text.</p>
    <p class="text-nowrap">No wrap text.</p>
</div>

```html
<p class="text-left">Left aligned text.</p>
<p class="text-center">Center aligned text.</p>
<p class="text-right">Right aligned text.</p>
<p class="text-justify">Justified text.</p>
<p class="text-nowrap">No wrap text.</p>
```

源码：

```
.text-left           { text-align: left; }
.text-right          { text-align: right; }
.text-center         { text-align: center; }
.text-justify        { text-align: justify; }
.text-nowrap         { white-space: nowrap; }
```

## 改变大小写

```html
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">Capitalized text.</p>
```

源码：

```
// Transformation
.text-lowercase      { text-transform: lowercase; }
.text-uppercase      { text-transform: uppercase; }
.text-capitalize     { text-transform: capitalize; }
```

## 上下文颜色

Convey meaning through color with a handful of emphasis utility classes. These may also be applied to links and will darken on hover just like our default link styles.

Sometimes emphasis classes cannot be applied due to the specificity of another selector. In most cases, a sufficient workaround is to wrap your text in a `<span>` with the class.

<p class="text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>
<p class="text-primary">Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
<p class="text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
<p class="text-info">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
<p class="text-warning">Etiam porta sem malesuada magna mollis euismod.</p>
<p class="text-danger">Donec ullamcorper nulla non metus auctor fringilla.</p>

```html
<p class="text-muted">...</p>
<p class="text-primary">...</p>
<p class="text-success">...</p>
<p class="text-info">...</p>
<p class="text-warning">...</p>
<p class="text-danger">...</p>
```

## 上下文背景

Similar to the contextual text color classes, easily set the background of an element to any contextual class. Anchor components will darken on hover, just like the text classes.

<p class="bg-primary">Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
<p class="bg-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
<p class="bg-info">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
<p class="bg-warning">Etiam porta sem malesuada magna mollis euismod.</p>
<p class="bg-danger">Donec ullamcorper nulla non metus auctor fringilla.</p>

```html
<p class="bg-primary">...</p>
<p class="bg-success">...</p>
<p class="bg-info">...</p>
<p class="bg-warning">...</p>
<p class="bg-danger">...</p>
```

Sometimes contextual background classes cannot be applied due to the specificity of another selector. In some cases, a sufficient workaround is to wrap your element's content in a `<div>` with the class.

## 地址

让联系信息以最接近日常使用的格式呈现。

<div style="border: 1px solid #ccc; padding:10px;">
<address>
  <strong>Twitter, Inc.</strong><br>
  795 Folsom Ave, Suite 600<br>
  San Francisco, CA 94107<br>
  <abbr title="Phone">P:</abbr> (123) 456-7890
</address>

<address>
  <strong>Full Name</strong><br>
  <a href="mailto:#">first.last@example.com</a>
</address>
</div>

```html
<address>
  <strong>Twitter, Inc.</strong><br>
  795 Folsom Ave, Suite 600<br>
  San Francisco, CA 94107<br>
  <abbr title="Phone">P:</abbr> (123) 456-7890
</address>

<address>
  <strong>Full Name</strong><br>
  <a href="mailto:#">first.last@example.com</a>
</address>
```

```
// Addresses
address {
  margin-bottom: @line-height-computed;
  font-style: normal;
  line-height: @line-height-base;
}
```

## 引用

在你的文档中引用其他来源的内容。

<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>footer</footer>
</blockquote>

```html
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>footer</footer>
</blockquote>
```

可以添加 `.blockquote-reverse` 或者 `.pull-right` 让引用的样式置于右边，如：

<blockquote class="blockquote-reverse">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>footer</footer>
</blockquote>

```html
<blockquote class="blockquote-reverse">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>footer</footer>
</blockquote>
```

源码：

```css
// Blockquotes
blockquote {
  padding: (@line-height-computed / 2) @line-height-computed;
  margin: 0 0 @line-height-computed;
  font-size: @blockquote-font-size;
  border-left: 5px solid @blockquote-border-color;

  p,
  ul,
  ol {
    &:last-child {
      margin-bottom: 0;
    }
  }

  // Note: Deprecated small and .small as of v3.1.0
  // Context: https://github.com/twbs/bootstrap/issues/11660
  footer,
  small,
  .small {
    display: block;
    font-size: 80%; // back to default font-size
    line-height: @line-height-base;
    color: @blockquote-small-color;

    &:before {
      content: '\2014 \00A0'; // em dash, nbsp
    }
  }
}

// Opposite alignment of blockquote
//
// Heads up: `blockquote.pull-right` has been deprecated as of v3.1.0.
.blockquote-reverse,
blockquote.pull-right {
  padding-right: 15px;
  padding-left: 0;
  border-right: 5px solid @blockquote-border-color;
  border-left: 0;
  text-align: right;

  // Account for citation
  footer,
  small,
  .small {
    &:before { content: ''; }
    &:after {
      content: '\00A0 \2014'; // nbsp, em dash
    }
  }
}

// Quotes
blockquote:before,
blockquote:after {
  content: "";
}
```

## 列表

`<ul>` 表示无序列表，`<ol>` 表示有序列表，Bootstrap 作了如下优化：

```css
// Lists
// -------------------------

// Unordered and Ordered lists
ul,
ol {
  margin-top: 0;
  margin-bottom: (@line-height-computed / 2);
  ul,
  ol {
    margin-bottom: 0;
  }
}
```

无样式列表移除了默认的 `list-style` 样式和左侧外边距的一组元素（只针对直接子元素）。**这是针对直接子元素的**，也就是说，你需要对所有嵌套的列表都添加这个类才能具有同样的样式。

```css
// Unstyled keeps list items block level, just removes default browser padding and list-style
.list-unstyled {
  padding-left: 0;
  list-style: none;
}
```

内联列表通过设置 `display: inline-block;` 并添加少量的内补（padding），将所有元素放置于同一行。

```css
// Inline turns list items into inline-block
.list-inline {
  .list-unstyled();
  margin-left: -5px;

  > li {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
  }
}
```

示例：

<ul class="list-inline">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>

```html
<ul class="list-inline">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
```

## 描述列表

带有描述的短语列表。

```
// Description Lists
dl {
  margin-top: 0; // Remove browser default
  margin-bottom: @line-height-computed;
}
dt,
dd {
  line-height: @line-height-base;
}
dt {
  font-weight: bold;
}
dd {
  margin-left: 0; // Undo browser default
}
```

如：

<div style="border: 1px solid #ccc; padding: 10px">
<dl>
  <dt>Description lists</dt>
  <dd>A description list is perfect for defining terms.</dd>
  <dt>Euismod</dt>
  <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec el</dd>
  <dt>Euismod</dt>
  <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec el</dd>
</dl>
</div>

```html
<dl>
  <dt>Description lists</dt>
  <dd>A description list is perfect for defining terms.</dd>
  <dt>Euismod</dt>
  <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec el</dd>
  <dt>Euismod</dt>
  <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec el</dd>
</dl>
```

可以添加 `.dl-horizontal` 让 `<dl>` 内的短语及其描述排在一行，变成 _水平排列的描述_。开始是像 `<dl>` 的默认样式堆叠在一起，随着导航条逐渐展开而排列在一行。

```css
// Horizontal description lists
//
// Defaults to being stacked without any of the below styles applied, until the
// grid breakpoint is reached (default of ~768px).

.dl-horizontal {
  dd {
    &:extend(.clearfix all); // Clear the floated `dt` if an empty `dd` is present
  }

  @media (min-width: @grid-float-breakpoint) {
    dt {
      float: left;
      width: (@dl-horizontal-offset - 20);
      clear: left;
      text-align: right;
      .text-overflow();
    }
    dd {
      margin-left: @dl-horizontal-offset;
    }
  }
}
```

## 图片

### 响应式图片

在 Bootstrap 版本 3 中，通过为图片添加 `.img-responsive` 类可以让图片支持响应式布局。其实质是为图片设置了 `max-width: 100%;` 和 `height: auto;` 属性，从而让图片在其父元素中更好的缩放。

    <img src="..." class="img-responsive" alt="Responsive image">

源码：

```
// Responsive images (ensure images don't scale beyond their parents)
.img-responsive {
  .img-responsive();
}

// Responsive image
//
// Keep images from scaling beyond the width of their parents.
.img-responsive(@display: block) {
  display: @display;
  max-width: 100%; // Part 1: Set a maximum relative to the parent
  height: auto; // Part 2: Scale the height according to the width, otherwise you get stretching
}
```

### 图片形状

通过为 `<img>` 元素添加以下相应的类，可以让图片呈现不同的形状。请时刻牢记：Internet Explorer 8 不支持 CSS3 中的圆角属性。

<img src="http://dummyimage.com/140x140/ccc/333.png" class="img-rounded" />
<img src="http://dummyimage.com/140x140/ccc/333.png" class="img-circle" />
<img src="http://dummyimage.com/140x140/ccc/333.png" class="img-thumbnail" />

```html
<img src="..." alt="..." class="img-rounded">
<img src="..." alt="..." class="img-circle">
<img src="..." alt="..." class="img-thumbnail">
```

## 图标

### 关闭按钮

通过使用一个象征关闭的图标，可以让模态框和警告框消失。

<button type="button" class="close" style="float:none">>&times;</button>

```html
<button type="button" class="close" style="float:none">>&times;</button>
```

### 三角符号

通过使用三角符号可以指示某个元素具有下拉菜单的功能。注意，[向上弹出式菜单](http://v3.bootcss.com/components/#btn-dropdowns-dropup)中的三角符号是反方向的。

<span class="caret"></span>

    <span class="caret"></span>
