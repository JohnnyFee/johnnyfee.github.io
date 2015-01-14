---
layout: post
title: "Bootstrap 表格"
category: JavaScript
tags: [javascript]
---

<link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/twitter-bootstrap/3.3.0/css/bootstrap.css">

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

## 条纹状表格

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

## 带边框的表格

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

## 鼠标悬停

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

## 紧缩表格

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

## 状态类

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

## 响应式表格

将任何 `.table` 元素包裹在 `.table-responsive` 元素内，即可创建响应式表格，其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于 768px 宽度时，水平滚动条消失。

```html
<div class="table-responsive">
  <table class="table">
    ...
  </table>
</div>
```

## Tutorial

- [Grid System Comparison: Bootstrap 3 vs. Foundation 5](http://www.sitepoint.com/grid-system-comparison-bootstrap-vs-foundation)