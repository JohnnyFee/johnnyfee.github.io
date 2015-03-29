layout: post
title: "Angular Template Loading"
category : Angular
tags : [angular, tutorial]
---

## 模板

在 Angular 中，templates 是包含 Angular 特殊元素和属性的 HTML。Angular 结合 template 和来自模型和控制器的信息，将动态视图显示在浏览器上。

<%raw%>
```html
<div ng-repeat="item in items">
  <span>{{item.title}}</span>
  ...
</div>
```
<%endraw%>

有以下几种 Angular 元素和属性会使用 Angular 模板：

* [Directive](https://docs.angularjs.org/guide/directive) — An attribute or element that
    augments an existing DOM element or represents a reusable DOM component.
* [Markup](https://docs.angularjs.org/api/ng/service/$interpolate) — The double curly brace notation {%raw%}{{ }}{%endraw%} to bind expressions to elements is built-in Angular markup.
* [Filter](https://docs.angularjs.org/guide/filter) — Formats data for display.
* [Form controls](https://docs.angularjs.org/guide/forms) — Validates user input.


## 模板加载

Angular 模板可以通过 `<script>` 或者 `$templateCache` 添加，通过这两种方式添加的模板存在于内存中，请求模板的时候不会发起 HTTP 请求。除了这种方式，可以通过 HTTP 直接请求单独的模板文件。

模板请求的循序优先级从高到低为：

`<script>` 方式 > `$templateCache` > 独立的模板文件

### 通过 `script` 标签引入 

```html
<script type="text/ng-template" id="templateId.html">
  <p>This is the content of the template</p>
</script>
```

其中，`type="text/ng-template"` 是指明这是 ng 模板。id 是模板标识。

<!--more-->

__Note:__ the `script` tag containing the template does not need to be included in the `head` of the document, but it must be below the `ng-app` definition.

### $templateCache 服务

通过 $templateCache 服务添加模板：

```js
var myApp = angular.module('myApp', []);
myApp.run(function($templateCache) {
  $templateCache.put('templateId.html', 'This is the content of the template');
});
```

可以在 HTML 中通过 `ng-include` 加载模板：

    <div ng-include=" 'templateId.html' "></div>

也可以通过 Javascript 加载:

    $templateCache.get('templateId.html')

`$templateCache` 服务 put 方法负责向内存写入模板内容。

`$templateCache`基于`cacheFactory`而来，接口保持一致，可以认为  
`$templateCache = $cacheFactory('template');`

方法        | 功能                    
---------| ----------------------
`put`       | 向内存写入模板内容             
`get`       | 从内存获取模板内容             
`remove`    | 传入key值，删除对应模板内容       
`removeAll` | 删除所有模板内容              
`destroy`   | 完全销毁缓存对象，从 `$cacheFactory` 集合中移除。
`info`      | 模板缓存对象的信息。     

### HTTP

当 NG 在内存中找不到对应模板时，就会发起 HTTP 请求，去拉取对应模板。

```html
<div ng-include="'lovestory.html'" class="well"></div>
```

内存中没有对应模板时，AJAX 根据模板的 URL 请求相应的模板， 请求成功后将对应内容写入 `$templateCache` 中，在页面不进行刷新，不手动删除的情况下，写入的内容不会丢失。

## 合并模板

在开发阶段，我们可以用远程模板，在发布的时候，我们可以将模板压缩到一个文件，以减少 AJAX 请求，提高性能。

可以通过 Grunt 插件 [grunt-angular-templates](https://www.npmjs.org/package/grunt-angular-templates) 将所有的单独的模板文件通过 `$templateCache` 整合到一个 JavaScript 文件中，这样，所有的模板请求无需发起 HTTP 请求，都在内存中加载。

```js
ngtemplates: {
  options: {
    // This should be the name of your apps angular module
    module: 'landi.argo',
    htmlmin: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    },
    usemin: 'app/app.js'
  },
  main: {
    cwd: '<%= yeoman.client %>',
    src: ['{app,components}/**/*.html'],
    dest: '.tmp/templates.js'
  },
  tmp: {
    cwd: '.tmp',
    src: ['{app,components}/**/*.html'],
    dest: '.tmp/tmp-templates.js'
  }
}
```

## Tutorial

- [AngularJS Dynamic Templates – Yes We Can! – One Hungry Mind](http://onehungrymind.com/angularjs-dynamic-templates/)

## Reference

- [AngularJS: API: $templateCache](https://docs.angularjs.org/api/ng/service/$templateCache)
- [angular模板加载 - SegmentFault](http://segmentfault.com/blog/bornkiller/1190000000437230)