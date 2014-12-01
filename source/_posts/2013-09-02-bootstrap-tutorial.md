---
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