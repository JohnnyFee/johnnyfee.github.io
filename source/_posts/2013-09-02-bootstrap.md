---
layout: post
title: "Bootstrap"
description: ""
category: JavaScript
tags: [javascript]
---

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

<!--more-->	