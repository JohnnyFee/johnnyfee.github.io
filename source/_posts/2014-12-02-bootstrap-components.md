---
layout: post
title: "Bootstrap 组件"
category: JavaScript
tags: [javascript]
---

<link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/twitter-bootstrap/3.3.0/css/bootstrap.css">

## 下拉菜单

用于显示链接列表的可切换、有上下文的菜单。[下拉菜单的 JavaScript 插件](http://v3.bootcss.com/javascript/#dropdowns)让它具有了交互性。

将下拉菜单触发器和下拉菜单都包裹在 `.dropdown` 里，或者另一个声明了 `position: relative;` 的元素。然后加入组成菜单的 HTML 代码。

<div class="dropdown clearfix">
  <ul class="dropdown-menu" role="menu" style="display: block; position:static">
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
  </ul>
</div>

```html
<div class="dropdown">
  <ul class="dropdown-menu" role="menu">
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
  </ul>
</div>
```

源码：

```
// The dropdown wrapper (div)
.dropdown {
  position: relative;
}
```

```
// The dropdown menu (ul)
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: @zindex-dropdown;
  display: none; // none by default, but block on "open" of the menu
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0; // override default ul
  list-style: none;
  font-size: @font-size-base;
  text-align: left; // Ensures proper alignment if parent has it changed (e.g., modal footer)
  background-color: @dropdown-bg;
  border: 1px solid @dropdown-fallback-border; // IE8 fallback
  border: 1px solid @dropdown-border;
  border-radius: @border-radius-base;
  .box-shadow(0 6px 12px rgba(0,0,0,.175));
  background-clip: padding-box;

  // Dividers (basically an hr) within the dropdown
  .divider {
    .nav-divider(@dropdown-divider-bg);
  }

  // Links within the dropdown menu
  > li > a {
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: normal;
    line-height: @line-height-base;
    color: @dropdown-link-color;
    white-space: nowrap; // prevent links from randomly breaking onto new lines
  }
}
```

编译后输出为：

```css
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
          box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}

.dropdown-menu .divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.dropdown-menu > li > a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333;
  white-space: nowrap;
}
```

### 对齐

默认情况下，下拉菜单自动沿着父元素的上沿和左侧被定位为 100% 宽度。 为 `.dropdown-menu` 添加 `.dropdown-menu-right` 类可以让菜单右对齐。

在正常的文档流中，通过 CSS 为下拉菜单进行定位。这就意味着下拉菜单可能会由于设置了 `overflow` 属性的父元素而被部分遮挡或超出视口（viewport）的显示范围。如果出现这种问题，请自行解决。

```html
<ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dLabel">
  ...
</ul>
```

源码：

```
// Menu positioning
//
// Add extra class to `.dropdown-menu` to flip the alignment of the dropdown
// menu with the parent.
.dropdown-menu-right {
  left: auto; // Reset the default from `.dropdown-menu`
  right: 0;
}
// With v3, we enabled auto-flipping if you have a dropdown within a right
// aligned nav component. To enable the undoing of that, we provide an override
// to restore the default dropdown menu alignment.
//
// This is only for left-aligning a dropdown menu within a `.navbar-right` or
// `.pull-right` nav component.
.dropdown-menu-left {
  left: 0;
  right: auto;
}
```

### 标题

在任何下拉菜单中均可通过添加标题来标明一组动作。

<div class="dropdown clearfix">
<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2" style="display: block;position: static">
        <li role="presentation" class="dropdown-header">Dropdown header</li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
        <li role="presentation" class="dropdown-header">Dropdown header</li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
      </ul>
</div>

```html
<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2">
  ...
  <li role="presentation" class="dropdown-header">Dropdown header</li>
  ...
</ul>
```

源码：

```
// Dropdown section headers
.dropdown-header {
  display: block;
  padding: 3px 20px;
  font-size: @font-size-small;
  line-height: @line-height-base;
  color: @dropdown-header-color;
  white-space: nowrap; // as with > li > a
}
```

### 分割线

为下拉菜单添加一条分割线，用于将多个链接分组。

<div class="dropdown clearfix">
<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2" style="display: block;position: static">
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
        <li role="presentation" class="divider"></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
      </ul>
</div>

```
<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuDivider">
  ...
  <li role="presentation" class="divider"></li>
  ...
</ul>
```

### 禁用的菜单项

为下拉菜单中的 `<li>` 元素添加 `.disabled` 类，从而禁用相应的菜单项。

```html
<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu3">
  <li role="presentation" class="disabled"><a role="menuitem" tabindex="-1" href="#">Disabled link</a></li>
</ul>
```

### 按钮式下拉菜单

把任意一个按钮放入 `.btn-group` 中，然后加入适当的菜单标签，就可以让按钮作为菜单的触发器了。

<!-- Single button -->
<div class="btn-group">
  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
    Action <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li class="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>

```
<!-- Single button -->
<div class="btn-group">
  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
    Action <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li class="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>
```

### 分裂式按钮下拉菜单

相似地，分裂式按钮下拉菜单也需要同样的改变一些标记，但只是多一个分开的按钮。

<div class="btn-group">
  <button type="button" class="btn btn-danger">Action</button>
  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
    <span class="caret"></span>
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu" role="menu">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li class="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>

```html
<div class="btn-group">
  <button type="button" class="btn btn-danger">Action</button>
  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
    <span class="caret"></span>
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu" role="menu">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li class="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>
```

### 尺寸

按钮式下拉菜单适用所有尺寸的按钮。

<!-- Large button group -->
<div class="btn-group">
  <button class="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown">
    Large button <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    ...
  </ul>
</div>

<!-- Small button group -->
<div class="btn-group">
  <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
    Small button <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    ...
  </ul>
</div>

<!-- Extra small button group -->
<div class="btn-group">
  <button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown">
    Extra small button <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    ...
  </ul>
</div>

```html
<!-- Large button group -->
<div class="btn-group">
  <button class="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown">
    Large button <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    ...
  </ul>
</div>

<!-- Small button group -->
<div class="btn-group">
  <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
    Small button <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    ...
  </ul>
</div>

<!-- Extra small button group -->
<div class="btn-group">
  <button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown">
    Extra small button <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    ...
  </ul>
</div>
```

### 向上弹出式菜单

<div class="btn-group dropup">
  <button type="button" class="btn btn-default">Dropup</button>
  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
    <span class="caret"></span>
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu" role="menu">
    <!-- Dropdown menu links -->
  </ul>
</div>

```
<div class="btn-group dropup">
  <button type="button" class="btn btn-default">Dropup</button>
  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
    <span class="caret"></span>
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu" role="menu">
    <!-- Dropdown menu links -->
  </ul>
</div>
```

## 标签页

Bootstrap 中的导航组件都依赖同一个 `.nav` 类，状态类也是共用的。改变修饰类可以改变样式。

```css
.nav {
  margin-bottom: 0;
  padding-left: 0; // Override default ul/ol
  list-style: none;
  &:extend(.clearfix all);

  > li {
    position: relative;
    display: block;

    > a {
      position: relative;
      display: block;
      padding: @nav-link-padding;
      &:hover,
      &:focus {
        text-decoration: none;
        background-color: @nav-link-hover-bg;
      }
    }

    // Disabled state sets text to gray and nukes hover/tab effects
    &.disabled > a {
      color: @nav-disabled-link-color;

      &:hover,
      &:focus {
        color: @nav-disabled-link-hover-color;
        text-decoration: none;
        background-color: transparent;
        cursor: not-allowed;
      }
    }
  }

  // Open dropdowns
  .open > a {
    &,
    &:hover,
    &:focus {
      background-color: @nav-link-hover-bg;
      border-color: @link-color;
    }
  }

  // Prevent IE8 from misplacing imgs
  //
  // See https://github.com/h5bp/html5-boilerplate/issues/984#issuecomment-3985989
  > li > a > img {
    max-width: none;
  }
}
```

### 标签页

注意 `.nav-tabs` 类依赖 `.nav` 基类。

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation"><a href="#">Profile</a></li>
  <li role="presentation"><a href="#">Messages</a></li>
</ul>

```html
<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation"><a href="#">Profile</a></li>
  <li role="presentation"><a href="#">Messages</a></li>
</ul>
```

对于带有可切换标签区域的标签页，必须使用 [标签页的 JavaScript 插件](http://v3.bootcss.com/javascript/#tabs)。

```css
// Tabs
// -------------------------

// Give the tabs something to sit on
.nav-tabs {
  border-bottom: 1px solid @nav-tabs-border-color;
  > li {
    float: left;
    // Make the list-items overlay the bottom border
    margin-bottom: -1px;

    // Actual tabs (as links)
    > a {
      margin-right: 2px;
      line-height: @line-height-base;
      border: 1px solid transparent;
      border-radius: @border-radius-base @border-radius-base 0 0;
      &:hover {
        border-color: @nav-tabs-link-hover-border-color @nav-tabs-link-hover-border-color @nav-tabs-border-color;
      }
    }

    // Active state, and its :hover to override normal :hover
    &.active > a {
      &,
      &:hover,
      &:focus {
        color: @nav-tabs-active-link-hover-color;
        background-color: @nav-tabs-active-link-hover-bg;
        border: 1px solid @nav-tabs-active-link-hover-border-color;
        border-bottom-color: transparent;
        cursor: default;
      }
    }
  }
  // pulling this in mainly for less shorthand
  &.nav-justified {
    .nav-justified();
    .nav-tabs-justified();
  }
}
```

```css
// Move borders to anchors instead of bottom of list
//
// Mixin for adding on top the shared `.nav-justified` styles for our tabs
.nav-tabs-justified {
  border-bottom: 0;

  > li > a {
    // Override margin from .nav-tabs
    margin-right: 0;
    border-radius: @border-radius-base;
  }

  > .active > a,
  > .active > a:hover,
  > .active > a:focus {
    border: 1px solid @nav-tabs-justified-link-border-color;
  }

  @media (min-width: @screen-sm-min) {
    > li > a {
      border-bottom: 1px solid @nav-tabs-justified-link-border-color;
      border-radius: @border-radius-base @border-radius-base 0 0;
    }
    > .active > a,
    > .active > a:hover,
    > .active > a:focus {
      border-bottom-color: @nav-tabs-justified-active-link-border-color;
    }
  }
}
```

### 胶囊式标签页

HTML 标记相同，但使用 `.nav-pills` 类：

<ul class="nav nav-pills" role="tablist">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation"><a href="#">Profile</a></li>
  <li role="presentation"><a href="#">Messages</a></li>
</ul>

```
<ul class="nav nav-pills" role="tablist">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation"><a href="#">Profile</a></li>
  <li role="presentation"><a href="#">Messages</a></li>
</ul>
```

胶囊是标签页也是可以垂直方向堆叠排列的。只需添加 `.nav-stacked` 类。

<ul class="nav nav-pills nav-stacked" role="tablist">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation"><a href="#">Profile</a></li>
  <li role="presentation"><a href="#">Messages</a></li>
</ul>

```
<ul class="nav nav-pills nav-stacked" role="tablist">
  ...
</ul>
```


```css
// Pills
// -------------------------
.nav-pills {
  > li {
    float: left;

    // Links rendered as pills
    > a {
      border-radius: @nav-pills-border-radius;
    }
    + li {
      margin-left: 2px;
    }

    // Active state
    &.active > a {
      &,
      &:hover,
      &:focus {
        color: @nav-pills-active-link-hover-color;
        background-color: @nav-pills-active-link-hover-bg;
      }
    }
  }
}
```

```
// Stacked pills
.nav-stacked {
  > li {
    float: none;
    + li {
      margin-top: 2px;
      margin-left: 0; // no need for this gap between nav items
    }
  }
}
```

### 两端对齐的标签页

从 v8.0 版本开始，Safari 有一个bug：对于两端对齐的导航，水平改变浏览器大小将引起绘制错误。此bug可以在[两端对齐的导航实例](http://v3.bootcss.com/examples/justified-nav/)中得到重现。

<ul class="nav nav-tabs nav-justified" role="tablist">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation"><a href="#">Profile</a></li>
  <li role="presentation"><a href="#">Messages</a></li>
</ul>

```html
<ul class="nav nav-tabs nav-justified" role="tablist">
  ...
</ul>
<ul class="nav nav-pills nav-justified" role="tablist">
  ...
</ul>
```

```
// Nav variations
// --------------------------------------------------

// Justified nav links
// -------------------------

.nav-justified {
  width: 100%;

  > li {
    float: none;
    > a {
      text-align: center;
      margin-bottom: 5px;
    }
  }

  > .dropdown .dropdown-menu {
    top: auto;
    left: auto;
  }

  @media (min-width: @screen-sm-min) {
    > li {
      display: table-cell;
      width: 1%;
      > a {
        margin-bottom: 0;
      }
    }
  }
}
```

### 禁用的链接

对任何导航组件（标签页、胶囊是标签页），都可以添加 `.disabled` 类，从而实现**链接为灰色且没有鼠标悬停效果**。

这个类只改变 `<a>` 的外观，不改变功能。可以自己写 JavaScript 禁用这里的链接。

<ul class="nav nav-tabs nav-justified" role="tablist">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation" class="disabled"><a href="#">Profile</a></li>
  <li role="presentation"><a href="#">Messages</a></li>
</ul>

```
<ul class="nav nav-pills" role="tablist">
  ...
  <li role="presentation" class="disabled"><a href="#">Disabled link</a></li>
  ...
</ul>
```

### 下拉菜单

用一点点额外 HTML 代码并加入[下拉菜单插件的 JavaScript 插件](http://v3.bootcss.com/javascript/#dropdowns)即可。

带下拉菜单的标签页：

<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation" class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
      Dropdown <span class="caret"></span>
    </a>
    <ul class="dropdown-menu" role="menu">
      ...
    </ul>
  </li>
</ul>

```html
<ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation" class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
      Dropdown <span class="caret"></span>
    </a>
    <ul class="dropdown-menu" role="menu">
      ...
    </ul>
  </li>
</ul>
```

带下拉菜单的胶囊式标签页：

<ul class="nav nav-pills" role="tablist">
  ...
  <li role="presentation" class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
      Dropdown <span class="caret"></span>
    </a>
    <ul class="dropdown-menu" role="menu">
      ...
    </ul>
  </li>
  ...
</ul>

```html
<ul class="nav nav-pills" role="tablist">
  ...
  <li role="presentation" class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
      Dropdown <span class="caret"></span>
    </a>
    <ul class="dropdown-menu" role="menu">
      ...
    </ul>
  </li>
  ...
</ul>
```

## 导航条

导航条是在您的应用或网站中作为导航页头的响应式基础组件。它们在移动设备上可以折叠（并且可开可关），且在视口（viewport）宽度增加时逐渐变为水平展开模式。

**两端对齐的导航条导航链接已经被弃用了。**

- 导航条内所包含元素溢出

    由于 Bootstrap 并不知道你在导航条内放置的元素需要占据多宽的空间，你可能会遇到导航条中的内容折行的情况（也就是导航条占据两行）。解决办法如下：

    1.  减少导航条内所有元素所占据的宽度。
    2.  在某些尺寸的屏幕上（利用 [响应式工具类](http://v3.bootcss.com/css/#responsive-utilities)）隐藏导航条内的一些元素。
    3.  修改导航条在水平排列和折叠排列互相转化时，触发这个转化的最小屏幕宽度值。可以通过修改 `@grid-float-breakpoint` 变量实现，或者自己重写相关的媒体查询代码，覆盖 Bootstrap 的默认值。

- 修改视口的阈值，从而影响导航条的排列模式

    当浏览器视口（viewport）的宽度小于  `@grid-float-breakpoint` 值时，导航条内部的元素变为折叠排列，也就是变现为移动设备展现模式；当浏览器视口（viewport）的宽度大于  `@grid-float-breakpoint` 值时，导航条内部的元素变为水平排列，也就是变现为非移动设备展现模式。通过调整源码中的这个值，就可以控制导航条何时堆叠排列，何时水平排列。默认值是 `768px` （小屏幕 -- 或者说是平板 --的最小值，或者说是平板）。

<nav class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link</a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>