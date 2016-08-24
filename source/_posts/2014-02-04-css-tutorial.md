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

<!-- more -->

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
- [filamentgroup/criticalCSS](https://github.com/filamentgroup/criticalcss) Finds the Above the Fold CSS for your page, and outputs it into a file.

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

## FAQ

### Change an element's CSS class with JavaScript

See [Change an element's CSS class with JavaScript - Stack Overflow](http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript)

The standard JavaScript way to select an element is using [`document.getElementById("Id")`](https://developer.mozilla.org/en-US/docs/DOM/document.getElementById), which is what the following examples use - you can of course obtain elements in other ways, and in the right situation may simply use `this` instead - however, going into detail on this is beyond the scope of the answer.

__To change all classes for an element:__

To replace all existing classes with one or more new classes, set the className attribute:

```js
document.getElementById("MyElement").className = "MyClass";
```

(You can use a space-delimited list to apply multiple classes.)

__To add an additional class to an element:__

To add a class to an element, without removing/affecting existing values, append a space and the new classname, like so:

```js
document.getElementById("MyElement").className += " MyClass";
```

__To remove a class from an element:__

To remove a single class to an element, without affecting other potential classes, a simple regex replace is required:

```js
document.getElementById("MyElement").className =
   document.getElementById("MyElement").className.replace
      ( /(?:^|\s)MyClass(?!\S)/g , '' )
/* code wrapped for readability - above is all one statement */
```

An explanation of this regex is as follows:

```
(?:^|\s) # match the start of the string, or any single whitespace character

MyClass  # the literal text for the classname to remove

(?!\S)   # negative lookahead to verify the above is the whole classname
         # ensures there is no non-space character following
         # (i.e. must be end of string or a space)
```

The `g` flag tells the replace to repeat as required, in case the class name has been added multiple times.

__To check if a class is already applied to an element:__

The same regex used above for removing a class can also be used as a check as to whether a particular class exists:

```js
if ( document.getElementById("MyElement").className.match(/(?:^|\s)MyClass(?!\S)/) )
```

__Assigning these actions to onclick events:__

Whilst it is possible to write JavaScript directly inside the HTML event attributes (such as `onclick="this.className+=' MyClass'"`) this is not recommended behaviour. Especially on larger applications, more maintainable code is achieved by separating HTML markup from JS interaction logic.

The first step to achieving this is by creating a function, and calling the function in the onclick attribute, for example:

```
<script type="text/javascript">
    function changeClass()
    {
        // code examples from above
    }
</script>
...
<button onclick="changeClass()">My Button</button>
```

<sub>_(It is not required to have this code in script tags, this is simply for brevity of example, and including the JS in a distinct file may be more appropriate.)_</sub>

The second step is to move the onclick event out of the HTML and into JavaScript, for example using [addEventListener](https://developer.mozilla.org/en-US/docs/DOM/element.addEventListener)

```
<script type="text/javascript">
    function changeClass()
    {
        // code examples from above
    }

    window.onload = function()
    {
        document.getElementById("MyElement").addEventListener( 'click' , changeClass );
    }
</script>
...
<button id="MyElement">My Button</button>
```

(Note that the window.onload part is required so that the contents of that function are executed _after_ the HTML has finished loading - without this, the MyElement might not exist when the JS is called, so that line would fail.)

__JavaScript Frameworks and Libraries__

The above code is all in standard JavaScript, however it is common practise to use either a framework or a library to simplify common tasks, as well as benefit from fixed bugs and edge cases that you might not think of when writing your code.

Whilst some people consider it overkill to add a ~50KB framework for simply changing a class, if you are doing any substantial amount of JavaScript work, or anything that might have unusual cross-browser behaviour, it is well worth considering.

_(Very roughly, a library is a set of tools designed for a specific task, whilst a framework generally contains multiple libraries and performs a complete set of duties.)_

The examples above have been reproduced below using [jQuery](http://jquery.com/), probably the most commonly used JavaScript library (though there are others worth investigating too).

(Note that `$` here is the jQuery object.)

__Changing Classes with jQuery__

```js
$('#MyElement').addClass('MyClass');

$('#MyElement').removeClass('MyClass');

if ( $('#MyElement').hasClass('MyClass') )
```

In addition, jQuery provides a shortcut for adding a class if it doesn't apply, or removing a class that does:

```js
$('#MyElement').toggleClass('MyClass');
```

__Assigning a function to a click event with jQuery:__

```js
$('#MyElement').click(changeClass);
```

or, without needing an id:

```js
$(':button:contains(My Button)').click(changeClass);
```

__HTML5 Techniques for changing classes__

Modern browsers have added [**classList**](https://developer.mozilla.org/en-US/docs/DOM/element.classList) which provides methods to make it easier to manipulate classes without needing a library:

```js
document.getElementById("MyElement").classList.add('class');

document.getElementById("MyElement").classList.remove('class');

if ( document.getElementById("MyElement").classList.contains('class') )

document.getElementById("MyElement").classList.toggle('class');
```

Unfortunately, these do not work in Internet Explorer prior to v10, though there is a [shim](http://en.wikipedia.org/wiki/Shim_%28computing%29) to add support for it to IE8 and IE9, available from [this page](https://developer.mozilla.org/en-US/docs/DOM/element.classList).

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
- [Clocks - CSS Animation](https://cssanimation.rocks/clocks)

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
- [Coding mobile-first emails — Campaign Monitor Engineering — Medium](https://medium.com/cm-engineering/coding-mobile-first-emails-1513ac4673e#.lsvaw9wh3)

## Guidelines

- [Vox Product Accessibility Guidelines](http://accessibility.voxmedia.com)
