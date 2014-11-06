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

## 架构

Bootstrap 中的 HTML、CSS 和 JavaScript 适用于各类设备，如移动设备、平台电脑、PC 等，不过他们的功能可以概括成如下几个类别：

- 脚手架：全局性的样式文件，
- 基本 CSS 样式：常用的 HTML 元素样式，如排版、代码、表格、表单、按钮样式，还有一个非常棒的图表及 —— Glyphicons。
- Bootstrap 组件：常用的界面组件，如标签、导航、警告、页面标题的基本样式。
- JavaScript 插件：与 Bootstrap 组件类似，这些 JavaScript 插件用来实现工具提示（Tooltip）、弹出提示（Popover）、模态对话框（Modal）等具有交互性的组件。

### 脚手架

Bootstrap 只重置了可能产生问题的样式（如 body、form 的默认 margin 等），不留部分浏览器的基础样式，解决部分潜在的问题。如：

#### 重置 `box-sizing`

```
* {
  .box-sizing(border-box);
}
*:before,
*:after {
  .box-sizing(border-box);
}
```

#### 重置 HTML 和 BODY

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

#### 重置表单元素

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

#### 重置链接

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

#### 其他

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

## Normalize

为了增强跨浏览器表现的一致性，我们使用了 [Normalize.css](http://necolas.github.io/normalize.css/)，这是由 [Nicolas Gallagher](https://twitter.com/necolas) 和 [Jonathan Neal](https://twitter.com/jon_neal) 维护的一个CSS 重置样式库。虽然 `reset.less` 文件中使用了许多 Normalize 的代码，但是它移除了一些不适合 Bootstrap 的元素。

## CSS 规范和样式重用

Bootstrap 选择器命名比较通用，如 `.btn`、`.input`，`.table`，这些类名都遵循对象化和语义化。为了适应不同的环境样式，应该限定类的上下文环境。如，针对 .btn 类型就定义了多个上下文环境，下面三个选择器分别适用于按钮、工具条、按钮组 3 种不同的组件环境：

- button.btn
- btn-toolbar > .btn + .btn
- btn-group > .btn

Bootstrap 样式类通过连字符后缀对一级类进行细化。如，针对 .btn 类样式，可以细分出很多子类样式。

样式 | 实例
-----|-------------
.btn-default | <button type="button" class="btn btn-default">Default</button>
.btn-primary | <button type="button" class="btn btn-primary">Primary</button>
.btn-success | <button type="button" class="btn btn-success">Success</button>
.btn-info| <button type="button" class="btn btn-info">Info</button>
.btn-warning| <button type="button" class="btn btn-warning">Warning</button>
.btn-danger| <button type="button" class="btn btn-danger">Danger</button>

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

## 优秀网站

- [乐窝](http://lewoer.com/) 留美找房第一站
- [杭州网站建设](http://www.yeahzan.com/) 提供网站设计和建设。
- [翁天信 · Dandy Weng](http://dandyweng.com/) 个人博客。
- [The World's Best Bootstrap Sites](http://lovebootstrap.com/)
- [More...](http://expo.bootcss.com/)

## Tools

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

## 参考

- [Bootstrap(2013.5).Jake.Spurlock](http://pan.baidu.com/share/link?shareid=2071051253&uk=2214641459)
- [Bootstrap 中文网](http://www.bootcss.com/#)
- [Twitter Bootstrap 组件和工具](http://www.cnblogs.com/lhb25/archive/2012/09/11/resources-that-complement-twitter-bootstrap.html)
- [Twitter Bootstrap 模板](http://www.open-open.com/news/view/146bdda)

<script src="http://cdn.staticfile.org/twitter-bootstrap/3.3.0/js/bootstrap.js"></script>