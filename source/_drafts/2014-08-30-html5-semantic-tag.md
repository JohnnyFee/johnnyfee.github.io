---
layout: post
title: "Html5 语义化标签"
category: Web
tags: [web, html, tutorial]
--- 

## form

一般来说，表单域要用 `<fieldset>` 包起来，并用 `<legent>` 说明表单的用途，`field` 默认有边框。如：

```html
<form action="" method="">
    <fieldset>
        <legend>登录表单</legend>
        <p><label for="name">账号：</label><input type="text" id="name"></p>
        <p><label for="pw">密码：</label><input type="password" id="pw"></p>
        <input type="submit" value="登陆">
    </fieldset>
</form>
```

## table

`<table>` 在 CSS 一般不用来布局，主要用来展示二维数据。`<table>` 常用的标签主要有：
- `capttion` 表格标题
- `thead` 表头
- `th` 表头列
- `tbody` 主体部分
- `tr` 主体行
- `td` 主体列
- `tfoot` 尾部

```html
<table>
    <caption>表头</caption>
    <thead>
        <tr>
            <th>列1</th>
            <th>列2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>数据1</td>
            <td>数据2</td>
        </tr>
        <tr>
            <td>数据3</td>
            <td>数据4</td>
        </tr>
    </tbody>
</table>
```


## 原则

- 尽可能少地使用无语义标签 `<div>` 和 `<span>`、
- 在语义不明显，既可以用 `<p>` 也可以用 `<div>` 的地方，尽量用 `<p>`，因为 `<p>` 默认情况下有上下间距，去掉样式后，可读性更好。
- 不要使用纯样式标签，例如 `<b>`，`<font>`，`<u>` 等，改用 CSS 设置。语义上需要强调的文本可以放在 `<strong>` 或 `<em>` 中。