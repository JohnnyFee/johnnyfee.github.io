layout: post
title: "Bootstrap Tutorial"
description: ""
category: JavaScript
tags: [javascript]
---

<link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/twitter-bootstrap/3.3.0/css/bootstrap.css">

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

### box-sizing

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

## 字体图标

See [组件 · Bootstrap 中文文档](http://v3.bootcss.com/components/#glyphicons)

包括200个来自 Glyphicon Halflings 的字体图标。[Glyphicons](http://glyphicons.com/) Halflings 一般是收费的，但是他们的作者允许 Bootstrap 免费使用。为了表示感谢，希望你在使用时尽量为 [Glyphicons](http://glyphicons.com/) 添加一个友情链接。

出于性能的考虑，所有图标都需要一个基类和对应每个图标的类。把下面的代码放在任何地方都可以正常使用。注意，为了设置正确的内补（padding），务必在图标和文本之间添加一个空格。

图标类不能和其它组件直接联合使用。它们不能在同一个元素上与其他类共同存在。应该创建一个嵌套的 `<span>` 标签，并将图标类应用到这个 `<span>` 标签上。

图标类只能应用在不包含任何文本内容或子元素的元素上。

<span class="glyphicon glyphicon-search"></span>

```html
<span class="glyphicon glyphicon-search"></span>
```

可以把它们应用到按钮、工具条中的按钮组、导航或输入框等地方。

<button type="button" class="btn btn-default btn-lg">
  <span class="glyphicon glyphicon-star"></span> Star
</button>

```
<button type="button" class="btn btn-default btn-lg">
  <span class="glyphicon glyphicon-star"></span> Star
</button>
```

## 工具类

### 快速浮动

Float an element to the left or right with a class. !important is included to avoid specificity issues. Classes can also be used as mixins.

```html
<div class="pull-left">...</div>
<div class="pull-right">...</div>
```

```
// Classes
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}

// Usage as mixins
.element {
  .pull-left();
}
.another-element {
  .pull-right();
}
```

To align components in navbars with utility classes, use `.navbar-left` or `.navbar-right` instead.

### 水平居中

Set an element to `display: block` and center via `margin`. Available as a mixin and class.

```html
<div class="center-block">...</div>
```

```
// Classes
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

// Usage as mixins
.element {
  .center-block();
}
```

### 清除浮动

Easily clear `float`s by adding `.clearfix` **to the parent element**. Utilizes [the micro clearfix](http://nicolasgallagher.com/micro-clearfix-hack/) as popularized by Nicolas Gallagher. Can also be used as a mixin.

```html
<!-- Usage as a class -->
<div class="clearfix">...</div>
```

```
// Mixin itself
.clearfix() {
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
}
```

### 显示隐藏内容

Force an element to be shown or hidden (**including for screen readers**) with the use of `.show` and `.hidden` classes. These classes use `!important` to avoid specificity conflicts, just like the [quick floats](http://v3.bootcss.com/css/#helper-classes-floats). They are only available for block level toggling. They can also be used as mixins.

Furthermore, `.invisible` can be used to toggle only the visibility of an element, meaning its `display` is not modified and the element can still affect the flow of the document.

```html
<div class="show">...</div>
<div class="hidden">...</div>
```

```
// Classes
.show {
  display: block !important;
}
.hidden {
  display: none !important;
  visibility: hidden !important;
}
.invisible {
  visibility: hidden;
}

// Usage as mixins
.element {
  .show();
}
.another-element {
  .hidden();
}
```

### 内容替换

Utilize the `.text-hide` class or mixin to help replace an element's text content with a background image.

    <h1 class="text-hide" >Custom heading</h1>

```
// New mixin to use as of v3.0.1
.text-hide() {
  font: ~"0/0" a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
```

### Sizing helpers

Specify the dimensions of an object more easily.

```scss
// Mixins
.size(@width; @height) {
  width: @width;
  height: @height;
}
.square(@size) {
  .size(@size; @size);
}

// Usage
.image { .size(400px; 300px); }
.avatar { .square(48px); }
```

### Resizable textareas

Easily configure the resize options for any textarea, or any other element. Defaults to normal browser behavior (`both`).

```scss
.resizable(@direction: both) {
  // Options: horizontal, vertical, both
  resize: @direction;
  // Safari fix
  overflow: auto;
}
```

### Truncating text

Easily truncate text with an ellipsis with a single mixin. **Requires element to be `block` or `inline-block` level.**

```scss
// Mixin
.text-overflow() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Usage
.branch-name {
  display: inline-block;
  max-width: 200px;
  .text-overflow();
}
```

### Retina images

Specify two image paths and the @1x image dimensions, and Bootstrap will provide an @2x media query. **If you have many images to serve, consider writing your retina image CSS manually in a single media query.**

```scss
.img-retina(@file-1x; @file-2x; @width-1x; @height-1x) {
  background-image: url("@{file-1x}");

  @media
  only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (   min--moz-device-pixel-ratio: 2),
  only screen and (     -o-min-device-pixel-ratio: 2/1),
  only screen and (        min-device-pixel-ratio: 2),
  only screen and (                min-resolution: 192dpi),
  only screen and (                min-resolution: 2dppx) {
    background-image: url("@{file-2x}");
    background-size: @width-1x @height-1x;
  }
}

// Usage
.jumbotron {
  .img-retina("/img/bg-1x.png", "/img/bg-2x.png", 100px, 100px);
}
```

## 响应式工具

为了加快对移动设备友好的页面开发工作，利用媒体查询功能并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容。另外还包含了针对打印机显示或隐藏内容的工具类。

有针对性的使用这类工具类，从而避免为同一个网站创建完全不同的版本。相反，通过使用这些工具类可以在不同设备上提供不同的展现形式。

### 响应式显示和隐藏

通过单独或联合使用以下列出的类，可以针对不同屏幕尺寸隐藏或显示页面内容。

&nbsp;|超小屏幕 <small>手机 (&lt;768px)</small> |小屏幕 <small>平板 (≥768px)</small> |中等屏幕 <small>桌面 (≥992px)</small> |大屏幕 <small>桌面 (≥1200px)</small>
---------------| ---| ----| ----| ---
`.visible-xs-*` | **可见** | 隐藏| 隐藏 | 隐藏
`.visible-sm-*` | 隐藏 | **可见**| 隐藏 | 隐藏
`.visible-md-*` | 隐藏 | 隐藏| **可见** | 隐藏
`.visible-lg-*` | 隐藏 | 隐藏| 隐藏 | **可见**
`.hidden-xs`    | 隐藏 | **可见**| **可见** | **可见**
`.hidden-sm`    | **可见** | 隐藏| **可见** | **可见**
`.hidden-md`    | **可见** | **可见**| 隐藏 | **可见**
`.hidden-lg`    | **可见** | **可见**| **可见** | 隐藏

从 v3.2.0 版本起，形如 `.visible-*-*` 的类针对每种屏幕大小都有了三种变体，每个针对 CSS 中不同的 `display` 属性，列表如下：

类组                        | CSS `display`           
-------------------------| ------------------------
`.visible-*-block`        | `display: block;`       
`.visible-*-inline`       | `display: inline;`      
`.visible-*-inline-block` | `display: inline-block;`

因此，以超小屏幕（`xs`）为例，可用的 `.visible-*-*` 类是：`.visible-xs-block`、`.visible-xs-inline` 和 `.visible-xs-inline-block`。

`.visible-xs`、`.visible-sm`、`.visible-md` 和 `.visible-lg` 类也同时存在。但是**从 v3.2.0 版本开始不再建议使用**。除了 `<table>` 相关的元素的特殊情况外，它们与 `.visible-*-block` 大体相同。

<div class="container">
    <div class="row" style="border:1px solid #ccc;padding:10px;">
        <div class="col-xs-6">
          <span class="hidden-xs">超小屏幕</span>
          <span class="visible-xs-block">✔ 在超小屏幕上可见</span>
        </div>
        <div class="col-xs-6">
          <span class="hidden-sm">小屏幕</span>
          <span class="visible-sm-block">✔ 在小屏幕上可见</span>
        </div>
        <div class="clearfix visible-xs-block"></div>
        <div class="col-xs-6">
          <span class="hidden-md">中等屏幕</span>
          <span class="visible-md-block">✔ 在中等屏幕上可见</span>
        </div>
        <div class="col-xs-6">
          <span class="hidden-lg">大屏幕</span>
          <span class="visible-lg-block">✔ 在大屏幕上可见</span>
        </div>
    </div>
</div>

```html
<div class="container">
    <div class="row">
        <div class="col-xs-6">
          <span class="hidden-xs">超小屏幕</span>
          <span class="visible-xs-block">✔ 在超小屏幕上可见</span>
        </div>
        <div class="col-xs-6">
          <span class="hidden-sm">小屏幕</span>
          <span class="visible-sm-block">✔ 在小屏幕上可见</span>
        </div>
        <div class="clearfix visible-xs-block"></div>
        <div class="col-xs-6">
          <span class="hidden-md">中等屏幕</span>
          <span class="visible-md-block">✔ 在中等屏幕上可见</span>
        </div>
        <div class="col-xs-6">
          <span class="hidden-lg">大屏幕</span>
          <span class="visible-lg-block">✔ 在大屏幕上可见</span>
        </div>
    </div>
</div>
```

<div class="container">
<div class="row" style="border: 1px solid #ccc; padding: 10px;">
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-xs hidden-sm">超小屏幕和小屏幕</span>
      <span class="visible-xs-block visible-sm-block">✔ 在超小屏幕和小屏幕上可见</span>
    </div>
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-md hidden-lg">中等屏幕和大屏幕</span>
      <span class="visible-md-block visible-lg-block">✔ 在中等屏幕和大屏幕上可见</span>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-xs hidden-md">超小屏幕和中等屏幕</span>
      <span class="visible-xs-block visible-md-block">✔ 在超小屏幕和中等屏幕上可见</span>
    </div>
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-sm hidden-lg">小屏幕和大屏幕</span>
      <span class="visible-sm-block visible-lg-block">✔ 在小屏幕和大屏幕上可见</span>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-xs hidden-lg">超小屏幕和大屏幕</span>
      <span class="visible-xs-block visible-lg-block">✔ 在超小屏幕和大屏幕上可见</span>
    </div>
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-sm hidden-md">小屏幕和中等屏幕</span>
      <span class="visible-sm-block visible-md-block">✔ 在小屏幕和中等屏幕上可见</span>
    </div>
</div>
</div>

```html
<div class="container">
<div class="row">
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-xs hidden-sm">超小屏幕和小屏幕</span>
      <span class="visible-xs-block visible-sm-block">✔ 在超小屏幕和小屏幕上可见</span>
    </div>
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-md hidden-lg">中等屏幕和大屏幕</span>
      <span class="visible-md-block visible-lg-block">✔ 在中等屏幕和大屏幕上可见</span>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-xs hidden-md">超小屏幕和中等屏幕</span>
      <span class="visible-xs-block visible-md-block">✔ 在超小屏幕和中等屏幕上可见</span>
    </div>
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-sm hidden-lg">小屏幕和大屏幕</span>
      <span class="visible-sm-block visible-lg-block">✔ 在小屏幕和大屏幕上可见</span>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-xs hidden-lg">超小屏幕和大屏幕</span>
      <span class="visible-xs-block visible-lg-block">✔ 在超小屏幕和大屏幕上可见</span>
    </div>
    <div class="col-xs-6 col-sm-6">
      <span class="hidden-sm hidden-md">小屏幕和中等屏幕</span>
      <span class="visible-sm-block visible-md-block">✔ 在小屏幕和中等屏幕上可见</span>
    </div>
</div>
</div>
```

<div class="container">
<div class="row" style="border:1px solid #ccc; padding:10px">
    <div class="col-xs-6 col-sm-3">
      <span class="hidden-xs">超小屏幕</span>
      <span class="visible-xs-block">✔ 在超小屏幕上隐藏</span>
    </div>
    <div class="col-xs-6 col-sm-3">
      <span class="hidden-sm">小屏幕</span>
      <span class="visible-sm-block">✔ 在小屏幕上隐藏</span>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div class="col-xs-6 col-sm-3">
      <span class="hidden-md">中等屏幕</span>
      <span class="visible-md-block">✔ 在中等屏幕上隐藏</span>
    </div>
    <div class="col-xs-6 col-sm-3">
      <span class="hidden-lg">大屏幕</span>
      <span class="visible-lg-block">✔ 在大屏幕上隐藏</span>
    </div>
  </div>
</div>

```html
<div class="container">
<div class="row">
    <div class="col-xs-6 col-sm-3">
      <span class="hidden-xs">超小屏幕</span>
      <span class="visible-xs-block">✔ 在超小屏幕上隐藏</span>
    </div>
    <div class="col-xs-6 col-sm-3">
      <span class="hidden-sm">小屏幕</span>
      <span class="visible-sm-block">✔ 在小屏幕上隐藏</span>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div class="col-xs-6 col-sm-3">
      <span class="hidden-md">中等屏幕</span>
      <span class="visible-md-block">✔ 在中等屏幕上隐藏</span>
    </div>
    <div class="col-xs-6 col-sm-3">
      <span class="hidden-lg">大屏幕</span>
      <span class="visible-lg-block">✔ 在大屏幕上隐藏</span>
    </div>
  </div>
</div>
```

<div class="container">
<div class="row" style="border:1px solid #ccc; padding:10px">
    <div class="col-xs-6">
      <span class="hidden-xs hidden-sm">超小屏幕与小屏幕</span>
      <span class="visible-xs-block visible-sm-block">✔ 在超小屏幕和小屏幕上隐藏</span>
    </div>
    <div class="col-xs-6">
      <span class="hidden-md hidden-lg">中等屏幕和大屏幕</span>
      <span class="visible-md-block visible-lg-block">✔ 在 medium 和 large 上隐藏</span>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div class="col-xs-6">
      <span class="hidden-xs hidden-md">超小屏幕和中等屏幕</span>
      <span class="visible-xs-block visible-md-block">✔ 在超小屏幕和中等屏幕上隐藏</span>
    </div>
    <div class="col-xs-6">
      <span class="hidden-sm hidden-lg">小屏幕和大屏幕</span>
      <span class="visible-sm-block visible-lg-block">✔ 在小屏幕和大屏幕上隐藏</span>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div class="col-xs-6">
      <span class="hidden-xs hidden-lg">超小屏幕和大屏幕</span>
      <span class="visible-xs-block visible-lg-block">✔ 在超小屏幕和大屏幕上隐藏</span>
    </div>
    <div class="col-xs-6">
      <span class="hidden-sm hidden-md">小屏幕和中等屏幕</span>
      <span class="visible-sm-block visible-md-block">✔ 在小屏幕和中等屏幕上隐藏</span>
    </div>
  </div>
</div>

```html
<div class="container">
<div class="row">
    <div class="col-xs-6">
      <span class="hidden-xs hidden-sm">超小屏幕与小屏幕</span>
      <span class="visible-xs-block visible-sm-block">✔ 在超小屏幕和小屏幕上隐藏</span>
    </div>
    <div class="col-xs-6">
      <span class="hidden-md hidden-lg">中等屏幕和大屏幕</span>
      <span class="visible-md-block visible-lg-block">✔ 在 medium 和 large 上隐藏</span>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div class="col-xs-6">
      <span class="hidden-xs hidden-md">超小屏幕和中等屏幕</span>
      <span class="visible-xs-block visible-md-block">✔ 在超小屏幕和中等屏幕上隐藏</span>
    </div>
    <div class="col-xs-6">
      <span class="hidden-sm hidden-lg">小屏幕和大屏幕</span>
      <span class="visible-sm-block visible-lg-block">✔ 在小屏幕和大屏幕上隐藏</span>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div class="col-xs-6">
      <span class="hidden-xs hidden-lg">超小屏幕和大屏幕</span>
      <span class="visible-xs-block visible-lg-block">✔ 在超小屏幕和大屏幕上隐藏</span>
    </div>
    <div class="col-xs-6">
      <span class="hidden-sm hidden-md">小屏幕和中等屏幕</span>
      <span class="visible-sm-block visible-md-block">✔ 在小屏幕和中等屏幕上隐藏</span>
    </div>
  </div>
</div>
```

### 打印的响应式类

和常规的响应式类一样，使用下面的类可以针对打印机隐藏或显示某些内容。

class | 浏览器 | 打印机
----| ---| ---
<li>`.visible-print-block`<li>`.visible-print-inline`<li>`.visible-print-inline-block` | 隐藏  | 可见 
`.hidden-print`   | 可见  | 隐藏 

`.visible-print` 类也是存在的，但是从 v3.2.0 版本开始**不建议使用**。它与 `.visible-print-block` 类大致相同，除了 `<table>` 相关元素的特殊情况外。

## 个性化

- [定制并下载 Bootstrap · Bootstrap 中文文档](http://v3.bootcss.com/customize/)

### 颜色

Easily make use of two color schemes: grayscale and semantic. Grayscale colors provide quick access to commonly used shades of black while semantic include various colors assigned to meaningful contextual values.


<div style="overflow: hidden;">
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #222;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #333;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #555;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #999;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #eee;"></div>
</div>

```scss
@gray-darker:  lighten(#000, 13.5%); // #222
@gray-dark:    lighten(#000, 20%);   // #333
@gray:         lighten(#000, 33.5%); // #555
@gray-light:   lighten(#000, 46.7%); // #777
@gray-lighter: lighten(#000, 93.5%); // #eee
```

<div style="overflow: hidden;">
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #428bca;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #5cb85c;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #5bc0de;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #f0ad4e;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #d9534f;"></div>
</div>

```scss
gray-darker:  lighten(#000, 13.5%); // #222
@gray-dark:    lighten(#000, 20%);   // #333
@gray:         lighten(#000, 33.5%); // #555
@gray-light:   lighten(#000, 46.7%); // #777
@gray-lighter: lighten(#000, 93.5%); // #eee
```

Use any of these color variables as they are or reassign them to more meaningful variables for your project.

<div class="zero-clipboard"><span class="btn-clipboard">Copy</span></div>

```scss
// Use as-is
.masthead {
  background-color: @brand-primary;
}

// Reassigned variables in Less
@alert-message-background: @brand-info;
.alert {
  background-color: @alert-message-background;
}
```

### 变量

#### Scaffolding

A handful of variables for quickly customizing key elements of your site's skeleton.

```scss
// Scaffolding
@body-bg:    #fff;
@text-color: @black-50;
```

#### Links

Easily style your links with the right color with only one value.

```scss
// Variables
@link-color:       @brand-primary;
@link-hover-color: darken(@link-color, 15%);

// Usage
a {
  color: @link-color;
  text-decoration: none;

  &:hover {
    color: @link-hover-color;
    text-decoration: underline;
  }
}
```

Note that the `@link-hover-color` uses a function, another awesome tool from Less, to automagically create the right hover color. You can use `darken`, `lighten`, `saturate`, and `desaturate`.

#### Typography

Easily set your type face, text size, leading, and more with a few quick variables. Bootstrap makes use of these as well to provide easy typographic mixins.

```css
@font-family-sans-serif:  "Helvetica Neue", Helvetica, Arial, sans-serif;
@font-family-serif:       Georgia, "Times New Roman", Times, serif;
@font-family-monospace:   Menlo, Monaco, Consolas, "Courier New", monospace;
@font-family-base:        @font-family-sans-serif;

@font-size-base:          14px;
@font-size-large:         ceil((@font-size-base * 1.25)); // ~18px
@font-size-small:         ceil((@font-size-base * 0.85)); // ~12px

@font-size-h1:            floor((@font-size-base * 2.6)); // ~36px
@font-size-h2:            floor((@font-size-base * 2.15)); // ~30px
@font-size-h3:            ceil((@font-size-base * 1.7)); // ~24px
@font-size-h4:            ceil((@font-size-base * 1.25)); // ~18px
@font-size-h5:            @font-size-base;
@font-size-h6:            ceil((@font-size-base * 0.85)); // ~12px

@line-height-base:        1.428571429; // 20/14
@line-height-computed:    floor((@font-size-base * @line-height-base)); // ~20px

@headings-font-family:    inherit;
@headings-font-weight:    500;
@headings-line-height:    1.1;
@headings-color:          inherit;
```

#### Icons

Two quick variables for customizing the location and filename of your icons.


```css
@icon-font-path:          "../fonts/";
@icon-font-name:          "glyphicons-halflings-regular";
```

#### Components

Components throughout Bootstrap make use of some default variables for setting common values. Here are the most commonly used.

```css
@padding-base-vertical:          6px;
@padding-base-horizontal:        12px;

@padding-large-vertical:         10px;
@padding-large-horizontal:       16px;

@padding-small-vertical:         5px;
@padding-small-horizontal:       10px;

@padding-xs-vertical:            1px;
@padding-xs-horizontal:          5px;

@line-height-large:              1.33;
@line-height-small:              1.5;

@border-radius-base:             4px;
@border-radius-large:            6px;
@border-radius-small:            3px;

@component-active-color:         #fff;
@component-active-bg:            @brand-primary;

@caret-width-base:               4px;
@caret-width-large:              5px;
```

### 针对特定厂商的 mixin

Vendor mixins are mixins to help support multiple browsers by including all relevant vendor prefixes in your compiled CSS.

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

- [thomaspark/bootswatch](https://github.com/thomaspark/bootswatch) Themes for Bootstrap <http://bootswatch.com>.
- [Pixelkit/PixelKit-Bootstrap-UI-Kits](https://github.com/Pixelkit/PixelKit-Bootstrap-UI-Kits/)

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