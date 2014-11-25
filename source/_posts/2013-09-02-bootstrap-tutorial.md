---
layout: post
title: "Bootstrap Tutorial"
description: ""
category: JavaScript
tags: [javascript]
---

<link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/twitter-bootstrap/3.3.0/css/bootstrap.css">
<style type="text/css">
    [class^="col-"] {
        border: 1px solid #CCCCCC;
        background-color: #F8F8F8;
    }

</style>

## Tutorial

- [therebelrobot/awesome-bootstrap](https://github.com/therebelrobot/awesome-bootstrap)
- [Bootstrap 3 Tips and Tricks You Might Not Know](http://scotch.io/bar-talk/bootstrap-3-tips-and-tricks-you-might-not-know)
- [Bootstrap3.0 栅格系统背后的精妙魔法(Bootstrap3.0的栅格布局系统实现原理) - willian12345](http://www.cnblogs.com/willian/p/3558180.html)
- [bootstrap3栅格系统源码学习](http://www.pchou.info/open-source/2014/01/21/52de149d84a8f.html)
- [Responsive Web Design Tips from Bootstrap's CSS](http://www.sitepoint.com/responsive-web-design-tips-bootstrap-css)

<!-- more -->

## Set Up

修改页面，引入相关文件。以下通过 CDN 引用相关文件：

```html
<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">

<!-- 可选的Bootstrap主题文件（一般不用引入） -->
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap-theme.min.css">

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
```

也可以通过 bower 安装：

    $ bower install bootstrap

基本模板如下：

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>你好，世界！</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```


为了确保适当的绘制和触屏缩放，需要在 `<head>` 之中添加 `viewport` 元数据标签。

在移动设备浏览器上，通过为视口（viewport）设置 meta 属性为 `user-scalable=no` 可以禁用其缩放（zooming）功能。这样禁用缩放功能后，用户只能滚动屏幕，就能让你的网站看上去更像原生应用的感觉。注意，这种方式我们并不推荐所有网站使用，还是要看你自己的情况而定！

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

### Bootstrap 源码结构

```
bootstrap/
├── less/
├── js/
├── fonts/
├── dist/ 编译输出
│   ├── css/
│   ├── js/
│   └── fonts/
└── docs/
    └── examples/
```

### 编译 CSS 和 JavaScript 文件

Bootstrap 使用 Grunt 作为编译系统。提供以下 Grunt 任务：

- `grunt dist` 编译 CSS 和 JavaScript 文件到 dist 目录中。
- `grunt watch` 该任务有三个目标，监听 `less/`、`js/`、`test/` 下的文件。
- `grunt test` 运行测试用例。
- `grunt docs` 编译 `docs/` 中的资源文件。
- `grunt` 默认任务。编译 css 和 js，构建文档站点、对文档做 HTML5 校验、重新生成定制工具所需的资源文件。

## CSS 规范和样式重用

Bootstrap 选择器命名比较通用，如 `.btn`、`.input`，`.table`，这些类名都遵循对象化和语义化。为了适应不同的环境样式，应该限定类的上下文环境。如，针对 .btn 类型就定义了多个上下文环境，下面三个选择器分别适用于按钮、工具条、按钮组 3 种不同的组件环境：

- button.btn
- btn-toolbar > .btn + .btn
- btn-group > .btn

## 架构

Bootstrap 中的 HTML、CSS 和 JavaScript 适用于各类设备，如移动设备、平台电脑、PC 等，不过他们的功能可以概括成如下几个类别：

- 脚手架：全局性的样式文件。
- 基本 CSS 样式：常用的 HTML 元素样式，如排版、代码、表格、表单、按钮样式，还有一个非常棒的图表及 —— Glyphicons。
- Bootstrap 组件：常用的界面组件，如标签、导航、警告、页面标题的基本样式。
- JavaScript 插件：与 Bootstrap 组件类似，这些 JavaScript 插件用来实现工具提示（Tooltip）、弹出提示（Popover）、模态对话框（Modal）等具有交互性的组件。

## Normalize

为了增强跨浏览器表现的一致性，我们使用了 [Normalize.css](http://necolas.github.io/normalize.css/)，这是由 [Nicolas Gallagher](https://twitter.com/necolas) 和 [Jonathan Neal](https://twitter.com/jon_neal) 维护的一个CSS 重置样式库。虽然 `reset.less` 文件中使用了许多 Normalize 的代码，但是它移除了一些不适合 Bootstrap 的元素。

See [normalize.less](https://github.com/twbs/bootstrap/blob/master/less/normalize.less)

## 脚手架

See [bootstrap/scaffolding.less at master · twbs/bootstrap](https://github.com/twbs/bootstrap/blob/master/less/scaffolding.less)

1.  为 `body` 元素设置 `background-color: #fff;`
2.  使用 `@font-family-base`、`@font-size-base` 和 `@line-height-base` a变量作为排版的基本参数
3.  为所有链接设置了基本颜色 `@link-color` ，并且当链接处于 `:hover` 状态时才添加下划线

### `box-sizing`

```
* {
  .box-sizing(border-box);
}
*:before,
*:after {
  .box-sizing(border-box);
}
```

### HTML 和 BODY

```css
html {
  font-size: 10px;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

body {
  font-family: @font-family-base;
  font-size: @font-size-base;
  line-height: @line-height-base;
  color: @text-color;
  background-color: @body-bg;
}
```

所有变量都存在于 `variables.less` 文件中，其中: 

- `font-size`

        @font-family-base:        @font-family-sans-serif;
        @font-family-sans-serif:  "Helvetica Neue", Helvetica, Arial, sans-serif;

- `font-size`：

        @font-size-base:          14px;

- `color`

        @text-color:            @gray-dark;
        @gray-darker:           lighten(@gray-base, 13.5%); // #222
        @gray-base:              #000;

- `background-color`

        @body-bg:               #fff;

- `line-height`

        @line-height-base:        1.428571429; // 20/14

**variables.less** 文件中定义的两个 Less 变量决定了排版尺寸：`@font-size-base` 和 `@line-height-base`。第一个变量定义了全局 font-size 基准，第二个变量是 line-height 基准。我们使用这些变量和一些简单的公式计算出其它所有页面元素的 margin、 padding 和 line-height。自定义这些变量即可改变 Bootstrap 的默认样式。

### 表单元素

```css
// Reset fonts for relevant elements
input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
```

### 链接

```
a {
  color: @link-color;
  text-decoration: none;

  &:hover,
  &:focus {
    color: @link-hover-color;
    text-decoration: underline;
  }

  &:focus {
    .tab-focus();
  }
}
```

其中：

- `@link-color`

        @link-color:            @brand-primary;
        @brand-primary:         #428bca;

- `@link-hover-color`

        @link-hover-color:      darken(@link-color, 15%);

### 其他

```css
figure {
  margin: 0;
}

// Images
img {
  vertical-align: middle;
}

// Horizontal rules
hr {
  margin-top:    @line-height-computed;
  margin-bottom: @line-height-computed;
  border: 0;
  border-top: 1px solid @hr-border;
}
```

其中：

```
@line-height-computed:    floor((@font-size-base * @line-height-base)); // 14*1.428571429≈20px
@hr-border:                   @gray-lighter;
@gray-lighter:           lighten(@gray-base, 93.5%); // #eee
```

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

### Bootstrap 栅格系统

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

### container

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

### row

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

### make-grid-columns

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

### make-grid

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

### 列浮动

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

### 列宽

`.calc-grid-column(@index, @class, @type) ` 定义了 4 个 guard mixin，分别对应 4 个 `@type` 值，即 `width`, `push`, `pull`, `offset`。

当 `@type=width` 时，输出的 `width` 样式为：

```
.calc-grid-column(@index, @class, @type) when (@type = width) and (@index > 0) {
  .col-@{class}-@{index} {
    width: percentage((@index / @grid-columns));
  }
}
```

### 列排序

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

### 列偏移

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

### 嵌套列

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

### 自定义栅格系统

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

## 排版

See [type.less](https://github.com/twbs/bootstrap/blob/master/less/type.less)

### 标题

HTML 中的所有标题标签，`<h1>` 到 `<h6>` 均可使用。另外，还提供了 `.h1` 到 `.h6` 类，为的是给内联（inline）属性的文本赋予标题的样式。在标题内还可以包含 `<small>` 标签或赋予 `.small` 类的元素，可以用来标记副标题。

```html
<h1>h1. Bootstrap heading <small>Secondary text</small></h1>
<h2>h2. Bootstrap heading <small>Secondary text</small></h2>
<h3>h3. Bootstrap heading <small>Secondary text</small></h3>
<h4>h4. Bootstrap heading <small>Secondary text</small></h4>
<h5>h5. Bootstrap heading <small>Secondary text</small></h5>
<h6>h6. Bootstrap heading <small>Secondary text</small></h6>
```

### 页面主体

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

```html
<p class="lead">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.</p>
```

### 内联文本元素

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

### 对齐

通过文本对齐类，可以简单方便的将文字重新对齐。

```html
<p class="text-left">Left aligned text.</p>
<p class="text-center">Center aligned text.</p>
<p class="text-right">Right aligned text.</p>
<p class="text-justify">Justified text.</p>
<p class="text-nowrap">No wrap text.</p>
```

### 改变大小写

```html
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">Capitalized text.</p>
```

### 上下文颜色

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

### 上下文背景

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

### 地址

让联系信息以最接近日常使用的格式呈现。

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

### 引用

在你的文档中引用其他来源的内容。

```html
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>footer</footer>
</blockquote>
```

可以添加 `.blockquote-reverse` 或者 `.pull-right` 让引用的样式置于右边，如：

```html
<blockquote class="blockquote-reverse">
  ...
</blockquote>
```

`<blockquote>` 中的 `<foot>` 内容千会添加破折号，反向引用的破折号在内容之后，如：

```html
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
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

### 列表

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

```html
<ul class="list-inline">
  <li>Lorem ipsum</li>
  <li>Phasellus iaculis</li>
  <li>Nulla volutpat</li>
</ul>
```

### 描述列表

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

### 代码

See [code.less](https://github.com/twbs/bootstrap/blob/master/less/code.less)

元素 | 描述 | 示例
-----|-------|----
code | 内联代码 | For example, <code>&lt;section&gt;</code> should be ...
kbd | 用户输入 | To switch directories, type <kbd>cd</kbd>
pre | 代码块  | <pre>&lt;p&gt;Sample <code>text</code> here...&lt;/p&gt;</pre>
var | 变量 | <var>y</var> = <var>m</var><var>x</var> + <var>b</var>
samp | 程序输出 | This text is meant to be treated as <samp>sample output</samp>

可以使用 `.pre-scrollable` 类，为代码块设置 max-height 为 350px ，并在垂直方向展示滚动条。

```css
.pre-scrollable {
  max-height: @pre-scrollable-max-height;
  overflow-y: scroll;
}
```

## 表格

`table` 的默认样式：

```css
table {
  background-color: @table-bg;
}
caption {
  padding-top: @table-cell-padding;
  padding-bottom: @table-cell-padding;
  color: @text-muted;
  text-align: left;
}
th {
  text-align: left;
}
```

其中：

```
@table-bg:                      transparent;
@table-cell-padding:            8px;
@text-muted:                  @gray-light;
@gray-light:             lighten(@gray-base, 46.7%); // #777
```

为任意 `<table>` 标签添加 `.table` 类可以为其赋予基本的样式 — 少量的内补（padding）和水平方向的分隔线。这种方式看起来很多余！？但是我们觉得，表格元素使用的很广泛，如果我们为其赋予默认样式可能会影响例如日历和日期选择之类的插件，所以我们选择将此样式独立出来。

```css
// Baseline styles
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: @line-height-computed;

  // 表头, 表体, 表脚单元格：
  // padding 为 8px
  // line-height 为 1.4，top 对齐，
  // 上边框颜色为 #ddd
  > thead,
  > tbody,
  > tfoot {
    > tr {
      > th,
      > td {
        padding: @table-cell-padding;
        line-height: @line-height-base;
        vertical-align: top;
        border-top: 1px solid @table-border-color;
      }
    }
  }

  // 表头单元格的底部变宽
  > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 2px solid @table-border-color;
  }

  // 移除表头单元格的顶部边框
  > caption + thead, // 紧跟在 caption 后的 thead
  > colgroup + thead, // 紧跟在 colgroup 后的 thead
  > thead:first-child { //  第一个 thead 元素
    > tr:first-child { // 第一个 tr 元素
      > th,
      > td {
        border-top: 0;
      }
    }
  }

  // 多个表体时，添加后面的表体的顶部边框。
  > tbody + tbody {
    border-top: 2px solid @table-border-color;
  }

  // Nesting
  .table {
    background-color: @body-bg;
  }
}
```

其中：

```css
@table-border-color:            #ddd;
@body-bg:               #fff;
```

例：

<table class="table">
  <caption>Optional table caption.</caption>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

```html
<table class="table">
  <caption>Optional table caption.</caption>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    ...
  </tbody>
</table>
```

### 条纹状表格

通过 `.table-striped` 类可以给 `<tbody>` 之内的每一行增加斑马条纹样式。

条纹状表格是依赖 `:nth-child` CSS 选择器实现的，而这一功能不被 Internet Explorer 8 支持。

<table class="table table-striped">
  <caption>Optional table caption.</caption>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

```
<table class="table table-striped">
  ...
</table>
```

`table-striped`：

```css
.table-striped {
  > tbody > tr:nth-child(odd) {
    background-color: @table-bg-accent;
  }
}
```

其中：

```
@table-bg-accent:               #f9f9f9;
```

### 带边框的表格

添加 `.table-bordered` 类为表格和其中的每个单元格增加边框。

```html
<table class="table table-bordered">
  ...
</table>
```

`table-bordered`:

```css
// Bordered version
// Add borders all around the table and between all the columns.

.table-bordered {
  border: 1px solid @table-border-color;
  > thead,
  > tbody,
  > tfoot {
    > tr {
      > th,
      > td {
        border: 1px solid @table-border-color;
      }
    }
  }
  > thead > tr {
    > th,
    > td {
      border-bottom-width: 2px;
    }
  }
}
```

### 鼠标悬停

通过添加 `.table-hover` 类可以让 `<tbody>` 中的每一行对鼠标悬停状态作出响应。

```html
<table class="table table-hover">
  ...
</table>
```

`table-hover`:

```
// Hover effect
// Placed here since it has to come after the potential zebra striping

.table-hover {
  > tbody > tr:hover {
    background-color: @table-bg-hover;
  }
}
```

### 紧缩表格

通过添加 `.table-condensed` 类可以让表格更加紧凑，单元格中的内补（padding）均会减半，行高看上去会更小。

```html
<table class="table table-condensed">
  ...
</table>
```

`table-condensed`:

```css
// Condensed table w/ half padding
.table-condensed {
  > thead,
  > tbody,
  > tfoot {
    > tr {
      > th,
      > td {
        padding: @table-condensed-cell-padding;
      }
    }
  }
}
```

其中：

```css
@table-condensed-cell-padding:  5px;
```

### 状态类

通过这些状态类可以为行或单元格设置颜色。

Class      | 描述                
---------- | ------------------
`.active`  | 鼠标悬停在行或单元格上时所设置的颜色
`.success` | 标识成功或积极的动作        
`.info`    | 标识普通的提示信息或动作      
`.warning` | 标识警告或需要用户注意       
`.danger`  | 标识危险或潜在的带来负面影响的动作 

```html
<!-- On rows -->
<tr class="active">...</tr>
<tr class="success">...</tr>
<tr class="warning">...</tr>
<tr class="danger">...</tr>
<tr class="info">...</tr>

<!-- On cells (`td` or `th`) -->
<tr>
  <td class="active">...</td>
  <td class="success">...</td>
  <td class="warning">...</td>
  <td class="danger">...</td>
  <td class="info">...</td>
</tr>
```

<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Column heading</th>
      <th>Column heading</th>
      <th>Column heading</th>
    </tr>
  </thead>
  <tbody>
    <tr class="active">
      <td>1</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr class="success">
      <td>2</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr class="info">
      <td>3</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr class="warning">
      <td>4</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr class="danger">
      <td>5</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
  </tbody>
</table>

### 响应式表格

将任何 `.table` 元素包裹在 `.table-responsive` 元素内，即可创建响应式表格，其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于 768px 宽度时，水平滚动条消失。

```html
<div class="table-responsive">
  <table class="table">
    ...
  </table>
</div>
```

## 表单

单独的表单控件会被自动赋予一些全局样式。所有设置了 `.form-control` 类的 `<input>`、`<textarea>` 和 `<select>` 元素都将被默认设置宽度属性为 `width: 100%;`。 将 `label` 元素和前面提到的控件包裹在 `.form-group` 中可以获得最好的排列。

<form role="form">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputFile">File input</label>
    <input type="file" id="exampleInputFile">
    <p class="help-block">Example block-level help text here.</p>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>

```html
<form role="form">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputFile">File input</label>
    <input type="file" id="exampleInputFile">
    <p class="help-block">Example block-level help text here.</p>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
```

```css
label {
  display: inline-block;
  // Force IE8 to wrap long content (see https://github.com/twbs/bootstrap/issues/13141)
  max-width: 100%; 
  margin-bottom: 5px;
  font-weight: bold;
}

// Form groups
//
// Designed to help with the organization and spacing of vertical forms. For
// horizontal forms, use the predefined grid classes.
.form-group {
  margin-bottom: 15px;
}
```

### form-control

```css
.form-control {
  display: block;
  width: 100%;
  
  // Make inputs at least the height of their button counterpart (base line-height + padding + border)
  height: @input-height-base; 
  padding: @padding-base-vertical @padding-base-horizontal;
  font-size: @font-size-base;
  line-height: @line-height-base;
  color: @input-color;
  background-color: @input-bg;
  // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214
  background-image: none; 
  border: 1px solid @input-border;
  border-radius: @input-border-radius;
  
  .box-shadow(inset 0 1px 1px rgba(0,0,0,.075));
  .transition(~"border-color ease-in-out .15s, box-shadow ease-in-out .15s");

  // Customize the `:focus` state to imitate native WebKit styles.
  .form-control-focus();

  // Placeholder
  .placeholder();

  // Disabled and read-only inputs
  //
  // HTML5 says that controls under a fieldset > legend:first-child won't be
  // disabled if the fieldset is disabled. Due to implementation difficulty, we
  // don't honor that edge case; we style them as disabled anyway.
  &[disabled],
  &[readonly],
  fieldset[disabled] & {
    cursor: not-allowed;
    background-color: @input-bg-disabled;
    opacity: 1; // iOS fix for unreadable disabled content
  }

  // Reset height for `textarea`s
  textarea& {
    height: auto;
  }
}
```

其中：

```
@input-height-base: (@line-height-computed + (@padding-base-vertical * 2) + 2);
@line-height-computed: floor((@font-size-base * @line-height-base)); // ~20px
@padding-base-vertical:     6px;

@padding-base-horizontal:   12px;
@input-border:                   #ccc;

@input-border-radius:            @border-radius-base;
@border-radius-base:        4px;
```

编译后输出为：

```css
.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
```

## 优秀网站

- [乐窝](http://lewoer.com/) 留美找房第一站
- [杭州网站建设](http://www.yeahzan.com/) 提供网站设计和建设。
- [翁天信 · Dandy Weng](http://dandyweng.com/) 个人博客。
- [The World's Best Bootstrap Sites](http://lovebootstrap.com/)
- [More...](http://expo.bootcss.com/)

## Tools

- [Bootlint](https://github.com/twbs/bootlint) 是 Bootstrap 官方所支持的 HTML 检测工具，检测页面上 Bootstrap 组件是否符合 Bootstrap 的 HTML 结构规则。

### Designer

- [Layoutit!!! Bootstrap 可视化布局](http://www.bootcss.com/p/layoutit/)
- <http://w3cshare.com/15-best-design-tools-recommended-bootstrap>

## Theme

- [Bootstrap 3 templates, themes, examples, free premium bootstrap 3Bootstraptor.com](http://bootstraptor.com/bootstrap3/)
- [Start Bootstrap - Free Bootstrap Themes and Templates](http://startbootstrap.com/)
- [Bootstrap 3 Themes | WrapBootstrap - Bootstrap Themes & Templates](https://wrapbootstrap.com/themes?branch=3.x)
	- [Ace - Responsive Admin Template - Live Preview - WrapBootstrap](http://wrapbootstrap.com/preview/WB0B30DGR)
- [10套超漂亮的Bootstrap UI KIT(已转Html格式)](http://www.shejidaren.com/free-bootstrap-ui-kits.html)

### Admin

- [onokumus/Bootstrap-Admin-Template](https://github.com/onokumus/Bootstrap-Admin-Template)

## FAQ

### Centering

- [html - Twitter Bootstrap 3, vertically center content - Stack Overflow](http://stackoverflow.com/questions/20005278/twitter-bootstrap-3-vertically-center-content)
- [html - vertical-align with bootstrap 3 - Stack Overflow](http://stackoverflow.com/questions/20547819/vertical-align-with-bootstrap-3)
- [html - vertical-align with bootstrap 3 - Stack Overflow](http://stackoverflow.com/questions/20547819/vertical-align-with-bootstrap-3)
- [html - How to center align vertically the container in bootstrap - Stack Overflow](http://stackoverflow.com/questions/22196587/how-to-center-align-vertically-the-container-in-bootstrap)

## Font Awesome

- [给网页图标字体 Font Awesome 添加动画效果](http://www.shejidaren.com/font-awesome-animation.html)

## 工具

- [推荐15款最好的 Twitter Bootstrap 开发工具 - WEB开发者](http://www.admin10000.com/document/4353.html)
- [15个最好的Bootstrap设计工具推荐 - WEB开发者](http://www.admin10000.com/document/3889.html)

## Reference

- [起步 · Bootstrap 中文文档](http://v3.bootcss.com/getting-started/)

## Tutorial

- [Bootstrap(2013.5).Jake.Spurlock](http://pan.baidu.com/share/link?shareid=2071051253&uk=2214641459)
- [Bootstrap 中文网](http://www.bootcss.com/#)
- [Twitter Bootstrap 组件和工具](http://www.cnblogs.com/lhb25/archive/2012/09/11/resources-that-complement-twitter-bootstrap.html)
- [Twitter Bootstrap 模板](http://www.open-open.com/news/view/146bdda)

<script src="http://cdn.staticfile.org/twitter-bootstrap/3.3.0/js/bootstrap.js"></script>