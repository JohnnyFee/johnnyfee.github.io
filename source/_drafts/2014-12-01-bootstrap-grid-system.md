layout: post
title: "Bootstrap 栅格系统"
category: JavaScript
tags: [javascript]
---

<link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/twitter-bootstrap/3.3.0/css/bootstrap.css">

## 栅格系统

栅格系统，也成为网格系统，是一种平面设计的方法和设计风格，它运用固定的格子设计版面布局。

将流线的（Flowline）的总宽度记为 W，列（Column）的宽度记为 c，槽（Gutter）的宽度记为 g，外边距的宽度记为 m，列的个数记为 N，可以得出下面的公式：

    W = cN + g(N-1) + 2m

一般来说，槽的宽度时外边距的两倍，上面的公式可以简化为：

    W = cN + g(N-1) + g=(c + g)N

将 c+g 记为 C，公式可进一步简化为：

    W = CN

上面的公式是上个系统的基础。

当 W 为 960 时，分割成 6 列时，左右外边距各位 5px。N 越大，灵活度越高。

__栅格系统的优势：__

- 提高网页的规范性。在栅格系统下，页面中的所有组件的尺寸都是有规律的。
- 让整个网站各个页面的布局保持一致。

以下场景适合使用栅格系统：

- 总体宽度布局，比如两栏、三栏等布局。
- 一些固定区块的尺寸，如广告图片的尺寸。
- 区块之间的间距，可以参考栅格系统的槽宽。

See also:

- [960 Grid System](http://960.gs/)
- [Unsemantic CSS Framework](http://unsemantic.com/)

Bootstrap 默认的栅格系统为 12 列，宽度为 940px，比标准的 960 栅格系统少 20px，因为它少了一个外边距，一个外边距默认为 20px。因此，虽然宽度仅为 940px，但是网页实际宽度与 960 栅格系统相同。

Bootstrap 栅格系统分为两种，一种是固定式的（Fix），一种是流式的（Fluid）。固定式栅格系统每列的宽度及列与列之间的间距都是固定的，列宽为 60px，列间距为 20px。

## Bootstrap 栅格系统

Bootstrap 栅格系统将宽度划分为 12 列。

* .col-xs   对应手机设备  
* .col-sm  对应平板设备  
* .col-md  对应普通桌面设备  
* .col-lg    对应宽屏设备  

See

- [grid.less](https://github.com/twbs/bootstrap/blob/master/less/grid.less)
- [mixins/grid.less](https://github.com/twbs/bootstrap/blob/master/less/grid.less)
- [mixins/grid-framework.less](https://github.com/twbs/bootstrap/blob/master/less/mixins/grid-framework.less) 定义表格系统的 mixin。

`grid.less` 中定义表格系统的源码如下：

```
// 定义固定大小的 container
.container {
  .container-fixed();

  @media (min-width: @screen-sm-min) {
    width: @container-sm;
  }
  @media (min-width: @screen-md-min) {
    width: @container-md;
  }
  @media (min-width: @screen-lg-min) {
    width: @container-lg;
  }
}

// 定义流式 container
.container-fluid {
  .container-fixed();
}


// 定义表格行样式
.row {
  .make-row();
}

// 为 `col-xs-*`, `.col-sm-*`, `.col-md-*`, `.col-lg-*` 生成公共的 css
.make-grid-columns();

// 生成极小屏幕(xs，也即手机)的表格系统。由此可见 bootstrap 的移动优先特性。
.make-grid(xs);

// 小屏幕表格
@media (min-width: @screen-sm-min) {
  .make-grid(sm);
}

// 中等屏幕
@media (min-width: @screen-md-min) {
  .make-grid(md);
}

// 大屏幕
@media (min-width: @screen-lg-min) {
  .make-grid(lg);
}
```

## container

Bootstrap 需要为页面内容和栅格系统包裹一个容器类。Bootstrap 提供两个容器类，分别为 `.container` 和 `.container-fluid`。由于 `padding` 等属性的原因，这两种容器类不能互相嵌套。

container 有 2 个目的:

1. 提供响应式宽度。因为行(rows)和列(columns)都是基于百分比的，所以它们不需要做任何改变。
2. 提供 padding 使内容不紧贴浏览器边缘。

`.container` 类用于固定宽度并支持响应式布局的容器。

```html
<div class="container">
  ...
</div>
```

`.container-fluid` 类用于 100% 宽度，占据全部视口（viewport）的容器。

```html
<div class="container-fluid">
  ...
</div>
```

以下为 `container` 的 less 源码(grid.less)：

```css
// Container widths
// Set the container width, and override it for fixed navbars in media queries.

.container {
  .container-fixed();
  
  /* 超小屏幕（手机，小于 768px） */
  /* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的 */

  /* 小屏幕（平板，大于等于 768px） */
  @media (min-width: @screen-sm-min) {
    width: @container-sm;
  }

  /* 中等屏幕（桌面显示器，大于等于 992px） */
  @media (min-width: @screen-md-min) {
    width: @container-md;
  }

  /* 大屏幕（大桌面显示器，大于等于 1200px） */
  @media (min-width: @screen-lg-min) {
    width: @container-lg;
  }
}
```

`.container-fixed`():

```
.container-fixed(@gutter: @grid-gutter-width) {
  margin-right: auto;
  margin-left: auto;
  padding-left:  (@gutter / 2);
  padding-right: (@gutter / 2);
  &:extend(.clearfix all);
}
```

`margin-left: auto;` 和 `margin-right: auto;` 使 `container` 内的元素水平居中。

`container-fluid()`:

```
// Utilizes the mixin meant for fixed width containers, but without any defined
// width for fluid, full width layouts.
.container-fluid {
  .container-fixed();
}
```

其中的变量为：

```css
@screen-sm-min: 768px;
@screen-md-min: 992px;
@screen-lg-min:1200px;

@container-tablet:             ((720px + @grid-gutter-width));
@container-sm:                 @container-tablet;

@container-desktop:            ((940px + @grid-gutter-width));
@container-md:                 @container-desktop;

@container-large-desktop:      ((1140px + @grid-gutter-width));
@container-lg:                 @container-large-desktop;

@grid-gutter-width: 30px;
```


`container` 编译后输出为：

```css
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
```

`container-fluid` 编译后输出为：

```css
.container-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
```

__固定列宽的栅格参数为：__

&nbsp;|超小屏幕 手机 (&lt;768px) |小屏幕 平板 (≥768px) |中等屏幕 桌面显示器 (≥992px) |大屏幕 大桌面显示器 (≥1200px)
----------------- | --- | --------- | ----- | -------------
栅格系统行为            | 总是水平排列 | 开始是堆叠在一起的，当大于这些阈值时将变为水平排列 | 同平板| 同平板
`.container` 最大宽度 | None （自动）| 750px| 970px    | 1170px   
类前缀               | `.col-xs-` | `.col-sm-` | `.col-md-` | `.col-lg-`

如果在一个 .row 内包含的列（column）大于12个，包含多余列（column）的元素将作为一个整体单元被另起一行排列。

## row

`.make-row()` 的定义如下，用于定义 `.row` 样式：

```
// Creates a wrapper for a series of columns
.make-row(@gutter: @grid-gutter-width) {
  margin-left:  (@gutter / -2);
  margin-right: (@gutter / -2);
  &:extend(.clearfix all);
}
```

其中用到了 `extend` 语法（See [Language Features](http://lesscss.org/features/#extend-feature)），用于继承指定选择器的样式。上例中，`&:extend(.clearfix all)` 继承 `clearfix` 样式，`all` 的含义参考 [extend-feature-extend-all](http://lesscss.org/features/#extend-feature-extend-all-)。`clearfix` 定义如下：

```css
.clearfix() {
  &:before,
  &:after {
    content: " "; // 1
    display: table; // 2
  }
  &:after {
    clear: both;
  }
}
```

## make-grid-columns

`.make-grid-columns();` 为 `col-xs-*`, `.col-sm-*`, `.col-md-*`, `.col-lg-*` 生成公共的 css：

```
.make-grid-columns() {
  // Common styles for all sizes of grid columns, widths 1-12
  .col(@index) when (@index = 1) { // initial
    @item: ~".col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
    .col((@index + 1), @item);
  }
  .col(@index, @list) when (@index =< @grid-columns) {
    @item: ~".col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
    .col((@index + 1), ~"@{list}, @{item}");
  }
  .col(@index, @list) when (@index > @grid-columns) { // terminal
    @{list} {
      position: relative;
      // Prevent columns from collapsing when empty
      min-height: 1px;
      // Inner gutter via padding
      padding-left:  (@grid-gutter-width / 2);
      padding-right: (@grid-gutter-width / 2);
    }
  }
  .col(1); // kickstart it
}
```

.col 的三个 guarded mixins 是为了实现循环，依次输出 `col-xs-1` `.col-sm-1` ... `.col-lg-12` 样式。`.col(@index) when (@index = 1)` 为循环的起点，`.col(@index, @list) when (@index > @grid-columns)` 为循环的终点。编译后的结果为：

```css
.col-xs-1, .col-sm-1, ..., .col-md-12, .col-lg-12 {
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
```

## make-grid

使用循环分别定义 `.make-grid` 混合，用于输出 `@class` 的 `float` `width` `pull` `push` `offset` 属性。 

- `.col-@{class}-1`, ..., `.col-@{class}-12` 的 `float:left` 属性。
- `.col-@{class}-0`, ..., `.col-@{class}-12` 的 `width` 属性。
- `.col-@{class}-push-0`, ..., `.col-@{class}-push-12` 的 `left` 属性。
- `.col-@{class}-pull-0`, ..., `.col-@{class}-pull-12` 的 `right` 属性。
- `.col-@{class}-offset-0`, ..., `.col-@{class}-offset-12` 的 `margin-left` 属性。

```
// Create grid for specific class
.make-grid(@class) {
  .float-grid-columns(@class);
  .loop-grid-columns(@grid-columns, @class, width);
  .loop-grid-columns(@grid-columns, @class, pull);
  .loop-grid-columns(@grid-columns, @class, push);
  .loop-grid-columns(@grid-columns, @class, offset);
}
```

`make-grid(xs)` 编译输出为：

```css
/* float */
.col-xs-1, .col-xs-2, ..., .col-xs-12 {
  float: left;
}

/* width */
.col-xs-12 {
  width: 100%;
}

.col-xs-11 {
  width: 91.66666667%;
}

...

.col-xs-1 {
  width: 8.33333333%;
}

/* pull */
.col-xs-pull-12 {
  right: 100%;
}
...

.col-xs-pull-1 {
  right: 8.33333333%;
}
.col-xs-pull-0 {
  right: auto;
}

/* push */
.col-xs-push-12 {
  left: 100%;
}

...

.col-xs-push-1 {
  left: 8.33333333%;
}
.col-xs-push-0 {
  left: auto;
}

/* offset */
.col-xs-offset-12 {
  margin-left: 100%;
}

.col-xs-offset-1 {
  margin-left: 8.33333333%;
}
.col-xs-offset-0 {
  margin-left: 0;
}
```

## 列浮动

`.float-grid-columns` 根据 `@class` 输出 `.col-@{class}-1`, ..., `.col-@{class}-12` 的 float 样式。

```
.float-grid-columns(@class) {
  .col(@index) when (@index = 1) { // initial
    @item: ~".col-@{class}-@{index}";
    .col((@index + 1), @item);
  }
  .col(@index, @list) when (@index =< @grid-columns) { // general
    @item: ~".col-@{class}-@{index}";
    .col((@index + 1), ~"@{list}, @{item}");
  }
  .col(@index, @list) when (@index > @grid-columns) { // terminal
    @{list} {
      float: left;
    }
  }
  .col(1); // kickstart it
}
```

当 `@class=xs`时，编译结果为:

```css
.col-xs-1, .col-xs-2, ..., .col-xs-12 {
  float: left;
}
```

`.loop-grid-columns` 用于循环输出 12+1 列的样式，即 calc-grid-column(1, @class, @type), ... , calc-grid-column(12, @class, @type):

```
.loop-grid-columns(@index, @class, @type) when (@index >= 0) {
  .calc-grid-column(@index, @class, @type);
  // next iteration
  .loop-grid-columns((@index - 1), @class, @type);
}
```

多余的列（column）将另起一行，如：

```html
<div class="row">
  <div class="col-xs-9">.col-xs-9</div>
  <div class="col-xs-4">.col-xs-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</div>
  <div class="col-xs-6">.col-xs-6<br>Subsequent columns continue along the new line.</div>
</div>
```

## 列宽

`.calc-grid-column(@index, @class, @type) ` 定义了 4 个 guard mixin，分别对应 4 个 `@type` 值，即 `width`, `push`, `pull`, `offset`。

当 `@type=width` 时，输出的 `width` 样式为：

```
.calc-grid-column(@index, @class, @type) when (@type = width) and (@index > 0) {
  .col-@{class}-@{index} {
    width: percentage((@index / @grid-columns));
  }
}
```

## 列排序

当 `@type=push` 时，输出 `left` 样式:

```
.calc-grid-column(@index, @class, @type) when (@type = push) and (@index > 0) {
  .col-@{class}-push-@{index} {
    left: percentage((@index / @grid-columns));
  }
}
.calc-grid-column(@index, @class, @type) when (@type = push) and (@index = 0) {
  .col-@{class}-push-0 {
    left: auto;
  }
}
```

当 `@type=pull` 时，输出 `right` 样式:

```
.calc-grid-column(@index, @class, @type) when (@type = pull) and (@index > 0) {
  .col-@{class}-pull-@{index} {
    right: percentage((@index / @grid-columns));
  }
}
.calc-grid-column(@index, @class, @type) when (@type = pull) and (@index = 0) {
  .col-@{class}-pull-0 {
    right: auto;
  }
}
```

通过使用 `.col-md-push-*` 和 `.col-md-pull-*` 类就可以很容易的改变列（column）的顺序。

<div class="container">
    <div class="row">
      <div class="col-md-9 col-md-push-3">.col-md-9 .col-md-push-3</div>
      <div class="col-md-3 col-md-pull-9">.col-md-3 .col-md-pull-9</div>
    </div>
</div>

```html
<div class="row">
  <div class="col-md-9 col-md-push-3">.col-md-9 .col-md-push-3</div>
  <div class="col-md-3 col-md-pull-9">.col-md-3 .col-md-pull-9</div>
</div>
```

## 列偏移

当 `@type=offset` 时，输出 `margin-left` 样式:

```
.calc-grid-column(@index, @class, @type) when (@type = offset) {
  .col-@{class}-offset-@{index} {
    margin-left: percentage((@index / @grid-columns));
  }
}
```

使用 `.col-md-offset-*` 类可以将列向右侧偏移。这些类实际是通过使用 `*` 选择器为当前元素增加了左侧的边距（margin）。例如，`.col-md-offset-4` 类将 `.col-md-4` 元素向右侧偏移了4个列（column）的宽度。

```html
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
</div>
<div class="row">
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
</div>
<div class="row">
  <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
</div>
```

## 嵌套列

为了使用内置的栅格系统将内容再次嵌套，可以通过添加一个新的 `.row` 元素和一系列 `.col-sm-*` 元素到已经存在的 `.col-sm-*` 元素内。被嵌套的行（row）所包含的列（column）的个数不能超过 12。

```html
<div class="row">
  <div class="col-sm-9">
    Level 1: .col-sm-9
    <div class="row">
      <div class="col-xs-8 col-sm-6">
        Level 2: .col-xs-8 .col-sm-6
      </div>
      <div class="col-xs-4 col-sm-6">
        Level 2: .col-xs-4 .col-sm-6
      </div>
    </div>
  </div>
</div>
```

## 自定义栅格系统

除了用于快速布局的预定义栅格类，Bootstrap 还包含了一组 Less 变量和 mixin 用于帮你生成简单、语义化的布局。

__变量：__

通过变量来定义列数、槽（gutter）宽、媒体查询阈值（用于确定合适让列浮动）。我们使用这些变量生成预定义的栅格类，如上所示，还有如下所示的定制 mixin。

```css
@grid-columns:              12;
@grid-gutter-width:         30px;
@grid-float-breakpoint:     768px;
```

__mixin:__

可以从以下几个方面通过重定义表格系统：

- .make-row
- .make-xs-column
- .make-sm-column
- .make-sm-column-offset
- .make-sm-column-push
- .make-sm-column-pull
- .make-md-column
- .make-md-column-offset
- .make-md-column-pull
- .make-lg-column
- .make-lg-column-offset
- .make-lg-column-pull

如你可以重新修改这些变量的值，或者用默认值调用这些 mixin。下面就是一个利用默认设置生成两列布局（列之间有间隔）的案例。

```css
.wrapper {
  .make-row();
}
.content-main {
  .make-lg-column(8);
}
.content-secondary {
  .make-lg-column(3);
  .make-lg-column-offset(1);
}
```
