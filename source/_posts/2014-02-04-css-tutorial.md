---
layout: post
title: "Css FAQ"
description: ""
category: Tool
tags: [markdown]
--- 

## CSS

### 优先级

CSS 应用样式的优先级（从高到低）：

1. 元素内嵌样式（用元素的全局属性 style 定义的样式）
2. 文档内嵌样式（定义在 style 元素中的样式）
3. 外部样式（用 link 元素导入的样式）
4. 用户样式（用户定义的样式）
5. 浏览器样式

可以使用 important 改变正常的层叠次序，如：

```html
<style type="text/css">
    a {
        color: black !important;
    }
</style>
```

在样式后附上 `!important` 即可将属性值标识为重要，浏览器会优先考虑。

### 继承

并非所有的元素都可以继承，与元素外观（文字颜色，字体等）相关的样式后被继承，与布局相关的样式不会被继承。在样式中，使用 inherit 可以强制实施继承，明确指示浏览器在该属性成使用父元素样式中的值。

```html
<style type="text/css">
    p {
        color: white;
        border: medum solid black;
    }
</style>
<body>
    <p>I like <span>Apple</span> and orange.</p>
</body>
```

span 会继承父元素 p 的 color 样式，但并没有继承 border 属性值。如果添加 span 样式：

```css
span {
    border: inherit;
}
```

则 span 和父元素 p 使用相同的 border 值。

### color

CSS 中表示颜色的方法有以下几种：

1. 十六进制，如#ffffff，即红黄绿三种颜色的分值。
2. 颜色名，如 red。完整颜色名列表请参考 <www.w3.org/TR/css3-color>
3. CSS 颜色函数：

    - rgb(r, g, b)
    - rgba(r, g, b, a) 如 `rgba(112, 128, 144, 0)`
    - hsl(h, s, l) 用 HSL 模型，（色相 hue， 饱和度 saturation， 亮度 lightness）。如：`hsl(120, 100%, 22%)`

### 长度单位

CSS 中可以使用绝对长度单位，也可以使用相对长度单位。绝对程度单位不常用，常见的有 in（英寸），cm（厘米），mm（毫米）等。相对长度单位有：

- em 相对字号大小。如字号是 16px，则 2em = 2 × 16px = 32px。
- ex 与元素字体的 _x 高度_ 相关，字体基线到中线的距离，一般和字母 x 的高度相当，通常 1ex ≈ 0.5 em。
- rem 与根元素的字号相关
- px CSS 像素
- % 另一属性的值得百分比

See also [The Lengths of CSS](http://css-tricks.com/the-lengths-of-css/)。

另外，可以使用 CSS3 的 `calc` 函数动态计算长度值，如 `width: calc(80% - 20px)` 。

<!--more-->

### Cross Browser

- [Cross-Browser Development Tips: Part 1 - CSS](https://www.tinfoilsecurity.com/blog/cross-browser-development-tips-css)
- [Cross-Browser Development Tips: Part 2 - JavaScript](https://www.tinfoilsecurity.com/blog/cross-browser-development-tips-javascript)
- [15+ techniques and tools for cross browser CSS coding](http://www.catswhocode.com/blog/15-techniques-and-tools-for-cross-browser-css-coding)

## Properties

- [Keeping CSS short with currentColor — Osvaldas Valutis](http://osvaldas.info/keeping-css-short-with-currentcolor) 介绍 currentColor 的使用。

## 规范

- [W3Help - 标准 - W3C 标准](http://www.w3help.org/zh-cn/standards/)
- [W3Help - 标准 - 词汇表](http://www.w3help.org/zh-cn/home/glossary.html)

### Video

- [案例：如何实现“新手引导”效果](http://www.imooc.com/view/14?from=admin10000)
- [课程学习-案例：如何用CSS进行网页布局](http://www.imooc.com/learn/57)
- [案例：固定边栏滚动特效](http://www.imooc.com/view/52?from=admin10000)

## Ordering CSS3 Properties

When writing CSS3 properties, the modern wisdom is to list the "real" property last and the vendor prefixes first:

    .not-a-square {
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
    }

参考：[Ordering CSS3 Properties](http://css-tricks.com/ordering-css3-properties/)

## Performance

- [CSS Performance Tooling / Speaker Deck](https://speakerdeck.com/addyosmani/css-performance-tooling)
- [addyosmani/tmi](https://github.com/addyosmani/tmi) TMI (Too Many Images) - discover your image weight on the web.
- [Tools for image optimization](http://addyosmani.com/blog/image-optimization-tools)

## Tools

- [Can I use... Support tables for HTML5, CSS3, etc](http://caniuse.com/)
- [W3Help - 兼容性 - 根本原因](http://www.w3help.org/zh-cn/causes/index.html)
- [Autoprefixer](https://github.com/ai/autoprefixer)
- [Css在线解压缩/整理/格式化](http://tool.lu/css/)
- [katiefenn/parker](https://github.com/katiefenn/parker) Stylesheet analysis tool.
- [addyosmani/critical](https://github.com/addyosmani/critical) Extract & Inline Critical-path CSS from HTML (alpha).
- [Stylify Me - Online Style Guide Generator](http://stylifyme.com/?stylify=inching.org)
- [Clippy — CSS clip-path maker](http://bennettfeely.com/clippy)
- [CSS Stats](http://cssstats.com) 统计 CSS。
- [SC5 Styleguide](http://styleguide.sc5.io/) 生成 CSS 文档。
- [Favicon Generator - Generate favicon pictures and HTML](http://realfavicongenerator.net/)
- [lovell/sharp](https://github.com/lovell/sharp) 修改图片尺寸。
- [mobile-icon-resizer](https://www.npmjs.org/package/mobile-icon-resizer) 批量改变 Mobile 图标的尺寸。

### 预编译

- LESS
- SASS
- Stalus
- [Sass MQ](http://sass-mq.github.io/sass-mq)

### 预编译工具

- [Prepros App :: Dead Simple Design, Development and Testing](http://alphapixels.com/prepros/)
- [CSS Post-Processing With Pleeease](http://www.sitepoint.com/css-post-processing-pleeease/)

### Generator

- [CSS3 Generator](http://css3generator.com/)
- [css-triangle-generator](http://apps.eky.hk/css-triangle-generator/zh-hant)
- [css3lib](http://css3lib.alloyteam.com/)
- [Ultimate CSS Gradient Generator - ColorZilla.com](http://www.colorzilla.com/gradient-editor/)
- [Koala](http://koala-app.com/ "Koala")

## Test

- [Automating CSS Regression Testing](http://css-tricks.com/automating-css-regression-testing)

## Demo

- [CSS Diner - Where we feast on CSS Selectors!](http://flukeout.github.io/)
- [CSS: Should we change the default for overflow? - Bocoup](http://bocoup.com/weblog/new-overflow-default/)
- [CSS3文字阴影实现乳白文字效果](http://www.shejidaren.com/css3-milky-font-effect.html)
- [将鼠标事件绑定到非矩形区域](http://blog.youyo.name/archives/bind-click-event-in-non-rectangular-area.html?-click-event-in-non-rectangular-area)
- [Off Canvas Menus with CSS3 Transitions and Transforms ♥ Scotch](http://scotch.io/tutorials/off-canvas-menus-with-css3-transitions-and-transforms)
- [利用CSS固定背景交替实现视差滚动效果](http://www.shejidaren.com/css-fixed-scroll-background.html)
- [动起来！好玩的CSS抖动样式 – CSS Shake](http://www.shejidaren.com/css-shake-animation.html)
- [ace-subido/spaced-out](https://github.com/ace-subido/spaced-out)
- [Zero element loading animations · MadebyMike](http://madebymike.com.au/writing/zero-element-loading-animations/)

## Books

- [CSS3 Pushing the Limits](http://www.salttiger.com/css3-pushing-the-limits/)

## Tutorial

- [ikkou/awesome-css](https://github.com/ikkou/awesome-css)
- [开始学CSS - Web 开发者指南](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started)
- [CSS 开发者指南 - Web 开发者指南](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS)
- [CSS Almanac | CSS-Tricks](http://css-tricks.com/almanac/)
- [W3Help - 标准 - W3C 标准](http://www.w3help.org/zh-cn/standards/)
- [DIVCSS5 - DIV+CSS布局教程学习与CSS资源分享平台](http://www.divcss5.com/)
- [W3Help - 兼容性 - 知识库](http://www.w3help.org/zh-cn/kb/)
- [10 CSS3 Properties you Need to be Familiar with - Tuts+ Code Tutorial](http://code.tutsplus.com/tutorials/10-css3-properties-you-need-to-be-familiar-with--net-16417)