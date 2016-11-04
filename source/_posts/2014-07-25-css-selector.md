layout: post
title: "CSS Selector"
category: CSS
tags: [web, css, selector]
---

## 基本选择器

选择器名称 | 使用方法          | 含义                   | 示例
------------| ----------------|-----------|-----------
通用元素选择器| \* | 选择所有元素  | `* { margin:0; padding:0; }`
元素类型选择器 | element | 选择所有指定类型的元素 | `p { font-size:2em; }`
类选择器 | class 或 element.class | 选择指定类的元素 | <li>`p.info { background:#ff0; }` <li> `span.class1.class2`
ID 选择器 |\#<id值\>| 匹配所有 ID 属性等于 id 的元素 | `#info { background:#ff0; }`

<!-- more -->

### 属性选择器

使用方法为 [<条件>]或 element[<条件>]，用于匹配具有符合指定条件属性的所有元素。

选择器 | 含义     | 示例
-----| -------------| ---------
[attr] | 选择所有定义 attr 属性的元素，不考虑它的值。| `p[title] {}`
[attr="val"]  | 选择定义 attr 属性且值为 "val" 的元素 | `div[class=error] {}`
[attr^="val"] | 选择定义 attr 属性且属性值以 "val" 打头的元素。
[attr$="val"] | 选择定义 attr 属性且属性值以 "val" 结尾的元素。
[attr*="val"] | 选择定义 attr 属性且属性值包含 "val" 的元素。
[attr~="val"] |  选择定义 attr属性且具有多个值，其中一个等于 "val" 的元素 | `td[headers~=col1] { color:#f00; }` | 处理多个属性值，且不同值用空格分隔的属性会用到 ~= 条件。
[attr竖线="val"] | 选择定义 attr 属性且具有多个连字符分隔的多个值，其中第一个值为 "val" 开头的元素。|

实例：lang 属性可以跟包括子标记的语言说明符一起使用，例如 es-us 代表美国英语，en-gb 代表英国英语。以下代码选中所有标记为 en 的元素，而无需枚举不同的区域。

```css
[lang|="en"] {
    border: thin black solid;
}
```

## 复合选择器

选择器名称 |选择器    | 含义  | 实例
------| -------------|--------|--------------
并集选择器 | selector, selector, selector | 以逗号分隔的单个选择器匹配的所有元素的并集。| `.class1, p.class2`
后代选择器 | selector selector   | 匹配第一个选择器的后代中匹配匹配第二个选择器的元素。后代选择器匹配任意包含在匹配第一个选择器的元素中的元素，而不仅仅是直接子元素。| `div p`
子代选择器 | selector1 > selector2 | 匹配第一个选择器的直接后代中匹配第二个选择器的元素。| `body > * > span`
相邻兄弟选择器| selector1 + selector2 | 紧跟与第一个选择器匹配的元素，且匹配第二个选择器的元素 | `p + a`
普通兄弟选择器| selector1 ~ selector2 | 位于第一个选择器匹配的元素之后，且匹配第二个选择器的元素 | `p ~ a`

## 伪元素选择器

无选择器包括伪元素和伪类。

伪元素选择器的前缀是两个冒号(::)，但浏览器认为选择器只有一个冒号（也就是将::first-line 看做 :first-line）。这跟伪类选择器的格式一样，目的是为了向后兼容。

伪元素实际并不存在，它是 CSS 为了方便你选中文档的内容。

选择器        | 含义
-------------| --------------------
::first-line  |  匹配文本快的首行
::first-letter|  选择文本快的首字母。
::before      |  在选中元素之前插入生成的内容
::after       |  在选中元素之后插入生成的内容

示例：

```
a::before {
    content: "click here to"
}
a::after {
    content: '!'
}
```

"click here to" 会插入 a 元素的内容之前，感叹号会插入 a 元素的内容之后。

### CSS 计数器

`:before` 和 `:after` 选择器经常跟 CSS 计数器一起使用，用来生成计数值。

__创建计数器：__

    counter-reset: paracount;

paracount 的默认初始值为 1， 可以通过以下方式指定初始值：

    counter-reset: paracount 10;

指定多个计数器：

    counter-reset: paracount 10 othercount;

__使用计数器：__

```
:befor {
    content: count(paracount) ". "
}
```

其效果是将当前计数器的值呈现在选择器匹配的所有元素之前，并且，在相应的值后面追加". "。可以使用以下方法指定数值格式：

    content: counter(paracount, lower-alpha) ". "

counter-increment 属性专门用来设置计数器增量，该属性的第一个参数是计数器名称，第二个属性为增量值，如：

    counter-increment: paracount 2;


以下代码在所有 p 元素前显示计数值：

```css
body {
    counter-reset: paracount;
}

p:before {
    content: counter(paracount) ". ";
    counter-increment: paracount;
}
```

## 结构性伪类选择器

这类元素都是以一个冒号前置（`:`），如 `:empty`，可以单独使用，也可以跟其他选择器组合使用。

选择器                   | 含义  | 示例
---------------------| ----|----------------
:root  | 总是返回 html 元素。

### 子元素选择器

选择器                   | 含义 | 示例
---------------------| --------|------------
:first-child | 选择元素的第一个子元素。| p:first-child
:last-child         |  选择元素的最后一个元素。| p:last-child
:only-child | 选择元素的唯一子元素。等同于:first-child:last-child或 :nth-child(1):nth-last-child(1) | p:only-child
:only-of-type | 选择元素指定类型的唯一子元素。等同于:first-of-type:last-of-type或 :nth-of-type(1):nth-last-of-type(1) | p:only-of-type

注： 这里所说的子元素指的都是直接子元素。

### :nth-child 选择器

选择器                   | 含义 | 示例
---------------------| --------|------------
:nth-child(n)       | 选择父元素的第 n 个子元素 | <li>p:nth-child(3) <li>p:nth-child(odd) <li>p:nth-child(even) <li> p:nth-child(3n+0)
:nth-last-child(n) |  选择父元素的倒数第n个子元素 | tr:nth-last-child(2)
:nth-of-type(n)    |  选择父元素定义类型的第 n 个子元素 |
:nth-last-of-type(n) |  选择父元素定义类型的倒数第 n 个子元素
:first-of-type      |  匹配父元素下使用同种标签的第一个子元素，等同于:nth-of-type(1)
:last-of-type      |  匹配父元素下使用同种标签的最后一个子元素，等同于:nth-last-of-type(1)

Suppose we are building a CSS grid, and want to remove the margin on every fourth grid module:

```html
<section class="grid">
  <article class="module">One</article>
  <article class="module">Two</article>
  <article class="module">Three</article>
  <article class="module">Four</article>
  <article class="module">Five</article>
</section>
```

Rather than adding a class to every fourth item (e.g. .last), we can use :nth-child:

```css
.module:nth-child(4n) {
  margin-right: 0;
}
```

As you can see, `:nth-child` takes an argument: this can be a single integer, the keywords “even” or “odd”, or a formula. If an integer is specified only one element is selected—but the keywords or a formula will iterate through all the children of the parent element and select matching elements — similar to navigating items in a JavaScript array. Keywords “even” and “odd” are straightforward (2, 4, 6 etc or 1, 3, 5 respectively). The formula is constructed using the syntax `an+b`, where:

* “a” is an integer value
* “n” is the literal letter “n”
* “+” is an operator and may be either “+” or “-”
* “b” is an integer and is required if an operator is included in the formula

It is important to note that this formula is an equation, and iterates through each sibling element, determining which will be selected. The “n” part of the formula, if included, represents a set of increasing positive integers (just like iterating through an array). In our above example, we selected every fourth element with the formula `4n`, which worked because every time an element was checked, “n” increased by one (4×0, 4×1, 4×2, 4×3, etc). If an element’s order matches the result of the equation, it gets selected (4, 8, 12, etc). For a more in-depth explanation of the math involved, please read [this article](http://css-tricks.com/how-nth-child-works/).

__Points of Interest__

* `:nth-child` iterates through elements starting from the top of the source order. The only difference between it and [`:nth-last-child`](http://css-tricks.com/almanac/selectors/n/nth-last-child) is that the latter iterates through elements _starting from the bottom of the source order_.
* The `:nth-child` selector is very similar to [`:nth-of-type`](http://css-tricks.com/almanac/selectors/n/nth-of-type) but with one **critical difference:** it is [less specific](http://css-tricks.com/the-difference-between-nth-child-and-nth-of-type/). In our example above they would produce the same result because we are iterating over only `.module` elements, but if we were iterating over a more complex group of siblings, `:nth-child` would try to match all siblings, not only siblings of the same element type. This reveals the power of `:nth-child`—it can select any sibling element in an arrangement, _not only elements that are specified before the colon_.

See another demo: [CSS-Tricks: :nth-child](http://codepen.io/zakkain/pen/ALiBx)

```css
/*select <li> elements that are the first child of their parent*/
.one li:nth-child(1) {
  background: lightsteelblue;
}

/*select the third child element of the second element*/
.two :nth-child(2) :nth-child(3) {
  background: lightsteelblue;
}

/*select the first three <li> elements inside of every odd element*/
.three :nth-child(odd) li:nth-child(-n+3) {
  background: lightsteelblue;
}
```

See:

- [:nth-child](http://css-tricks.com/almanac/selectors/n/nth-child/).
- [How nth-child Works](http://css-tricks.com/how-nth-child-works/)

## UI 伪类选择器

选择器        | 含义
--------------| --------------------------------
:enabled/:disabled |   选择启用/禁用状态的元素。
:checked     |   选择被选中的 input 元素（只用于单选按钮和复选框）。
:default | 选择默认元素。如提交按钮总是表单的默认按钮。
:valid/:invalid |选择符合或者不符合输入验证的 input 元素。
:in-range/out-of-range | 选择在指定范围之内或者之外的 input 元素。
:required/:optional | 选择必须和可选的 input 元素。

```css
:checked + span{
    border: 1px solid red;
}
```

```html
<p>
    <label>
        Do you like apps:
        <input type="checkbox">
        <span>This will go red when checked</span>
    </label>
</p>
```

```css
:valid {
    outline: medium solid red;
}

:invalid {
    outline: medium solid green;
}
```


    input[type="text"]:disabled { background:#ddd; }

## 动态伪类选择器

选择器        | 含义
--------------| --------------------------------
::link        |  匹配所有未访问的链接
::visited     |  匹配所有已访问的链接
::active      |  匹配鼠标已经其上按下、还没有释放的E元素
::hover       |  匹配鼠标悬停其上的元素
::focus       |  匹配获得当前焦点的元素

实例：

```css
p:first-child { font-style:italic; }

input[type=text]:focus { color:#000; background:#ffe; }

input[type=text]:focus:hover { background:#fff; }

q:lang(sv) { quotes: "\201D" "\201D" "\2019" "\2019"; }
p:first-line { font-weight:bold; color;#600; }

.preamble:first-letter { font-size:1.5em; font-weight:bold; }

.cbb:before { content:""; display:block; height:17px; width:18px; background:url(top.png) no-repeat 0 0; margin:0 0 0 -18px; }

a:link:after { content: " (" attr(href) ") "; }
```


## 其他选择器

选择器        | 含义    | 示例
----------| ---------------
:not(s) |  匹配不符合当前选择器的任何元素。| a:not([href*="apress"])
:lang(<目标语言>) | 选择基于 lang 全局属性的元素。| :lang(en) 选择采用英语表达的元素
:target |  URL 片段标识符指向的元素。| 如 URL为 example.html#myElement 时，id 为 myElement 的元素被选中。
:empty | 匹配一个不包含任何子元素的元素，注意，文本节点也被看作子元素 | p:empty { background:#ff0; }
:selection   |  匹配用户当前选中的元素

## Referece

- [CSS选择器笔记 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)
- 《HTML5 和 CSS3 权威指南》

## Library

- [eqcss/eqcss](https://github.com/eqcss/eqcss)
    + [The Search For The Holy Grail: How I Ended Up With Element Queries, And How You Can Use Them Today – Smashing Magazine](https://www.smashingmagazine.com/2016/07/how-i-ended-up-with-element-queries-and-how-you-can-use-them-today)
- [Exploring the Physical Web (Without Buying Beacons) — Medium](https://medium.com/@urish/exploring-the-physical-web-without-buying-beacons-efae51e36c2e#.9bn78t1xd)


## Tutorial

- [选择器 - Web 开发者指南](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_Started/Selectors)
- [Selectors](http://css-tricks.com/almanac/selectors/)
- [A Whole Bunch of Amazing Stuff Pseudo Elements Can Do](http://css-tricks.com/pseudo-element-roundup/)
- [CSS Selectors: Should You Optimize Them To Perform Better? - Vanseo Design](http://www.vanseodesign.com/css/css-selector-performance/)
