layout: post
title: "模板引擎"
category : Node
tags : [node, web, template]
---

## 综述

在 <http://ectjs.com/> 底部有个性能对照列表，里面有比较完整的模板框架列表。

[consolidate.js](https://github.com/visionmedia/consolidate.js/) 各个模板的抽象层，里面也有支持的模板框架列表。

See:

- [《Node 大神们，你们喜欢用 ejs 的模板还是 jade 的模板呢？》](http://www.v2ex.com/t/116438)
-  [WEB模板jade、ejs、handlebars 万行代码解释效率比较，jade完败](http://cnodejs.org/topic/50e70edfa7e6c6171a1d70fa)
-  [Javascript模板引擎性能对比及几点优化](http://cnodejs.org/topic/4f16442ccae1f4aa27001109)
-  [让 ejs 更加快 | Let ejs faster with options._with = false](http://cnodejs.org/topic/51c2c2e373c638f3703f4929)
-  [EJS快速入门教程](http://www.csser.com/board/4fddc4f0b28ed7d857001674)

## ECT

最快，coffeescript 语法

```
{% raw %}
<% extend 'layout' %>
<div id="<%- @id %>">
    <h1><%- @upperHelper @title %></h1>
    <% include 'list' %>
</div>

<% block 'footer-info' : %>
    <div class="right">page: main</div>
<% end %>
{% endraw %}
```

## EJS
类似 PHP 或 ASP.NET MVC 语法（ASPX 引擎）<%..%>，比较常用，《Node.js 实战》用的是EJS。适合新手用，上手快，理解快。

```
{% raw %}
<ul>
<% for(var i=0; i<supplies.length; i++) {%>
   <li><%= supplies[i] %></li>
<% } %>
</ul>
{% endraw %}
```

## Underscore

模板只是这个库中的一部分功能

## Handlebars

双花括号语法 

    {% raw %}{{变量}}、{{#each comments}}、{{#if condition}}{% endraw %}

前后端都能用。

```
{% raw %}
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
{% endraw %}
```

## Jade

haml（emmet / Zen Coding） 风格。express 默认引擎。HTML 要重写，用缩进控制，跟别的都不一样。结构最优雅，性能最差。适合写小项目。
可以用这个在线服务 html->jade，需要翻墙 <http://html2jade.aaron-powell.com/>

doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5)
  body
    h1 Jade - node template engine
    #container.col
      if youAreUsingJade
        p You are amazing
      else
        p Get on it!
      p.
        Jade is a terse and simple templating language with a
        strong focus on performance and powerful features.
