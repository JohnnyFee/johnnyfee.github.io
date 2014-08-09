---
layout: post
title: "CSS 弹性盒布局"
category: CSS
tags: [web, css, layout]
--- 

CSS3 弹性盒，或者简称弹性盒，是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的[布局方式](https://developer.mozilla.org/zh-CN/docs/CSS/Layout_mode "/zh-CN/docs/CSS/Layout_mode")。对于很多应用来讲，弹性盒在两个方面相对于盒模型进行了提升，它既不使用浮动，也不会导致弹性盒容器的外边距与其内容的外边距之间发生塌陷。

弹性盒布局的定义中，它可以自动调整子元素的高和宽，来很好的填充任何显示设备中的可用显示空间，收缩内容防止内容溢出。

<!--more-->

不同于盒布局的基于垂直方向以及行内布局的基于水平方向，弹性盒布局的算法是方向无关的。 虽然盒布局在页面中工作良好，但是其定义不足以支持那种需要根据用户代理从竖直切换成水平等变化而进行方向切换、大小调整、拉伸、收缩的引用组件。不同于将要出现的网格布局针对目标为大比例布局，弹性盒布局更适用于应用组件和小比例布局。这两种都是CSS工作组为了能与不同用户代理、不同书写模式和其他弹性需要进行协作而做出的努力。

虽然弹性盒布局的讨论中自由地使用了如水平轴、内联轴和垂直轴、块级轴的词汇，仍然需要一个新的词汇表来描述这种模型。参考下面的图形来学习后面的词汇。图形显示了弹性容器有一个值为row的属性flex-direction，其意义在于包含的子元素相互之间会根据书写模式和文本流方向在主轴上水平排列，即从左到右。

![flex_terms.png](https://developer.mozilla.org/files/3739/flex_terms.png)

- __弹性容器__
    弹性子元素的父元素。 通过设置[`display`](https://developer.mozilla.org/zh-CN/CSS/display "display") 属性的值为`flex` 或 `inline-flex` 将其 定义为弹性容器。 弹性子元素弹性容器的每一个子元素变为一个弹性子元素。弹性容器直接包含的文本变为匿名的弹性子元素。

- __轴__
    每个弹性盒布局以两个轴来排列。弹性子元素沿着**主轴**依次相互排列**。侧轴**垂直于主轴**。**

    * 属性 [`flex-direction`](https://developer.mozilla.org/zh-CN/CSS/flex-direction "flex-direction") 定义主轴方向。
    * 属性 [`justify-content`](https://developer.mozilla.org/zh-CN/CSS/justify-content "zh-CN/CSS/justify-content") 定义了弹性子元素如何在当前线上沿着主轴排列。
    * 属性 [`align-items`](https://developer.mozilla.org/zh-CN/CSS/align-items "zh-CN/CSS/align-items") 定义了弹性子元素如何在当前线上沿着侧轴排列。
    * 属性 [`align-self`](https://developer.mozilla.org/zh-CN/CSS/align-self "zh-CN/CSS/align-self") 覆盖父元素的 `align-items` 属性，定义了单独的弹性子元素如何沿着侧轴排列。

- __方向__
    弹性容器的**主轴开始**、**主轴结束**和**侧轴开始**、**侧轴结束**边缘代表了弹性子元素排列的起始和结束位置。它们具体取决于由`writing-mode`（从左到右、从右到左等等）属性建立的向量中的主轴和侧轴位置。

    * 属性 [`order`](https://developer.mozilla.org/zh-CN/CSS/order "zh-CN/CSS/order") 将元素依次分组，并决定谁先出现。
    * 属性 [`flex-flow`](https://developer.mozilla.org/zh-CN/CSS/flex-flow "flex-flow") 是属性 [`flex-direction`](https://developer.mozilla.org/zh-CN/CSS/flex-direction "flex-direction") 和 [`flex-wrap`](https://developer.mozilla.org/zh-CN/CSS/flex-wrap "flex-wrap") 的简写，用于排列弹性子元素。

- __线__
    弹性子元素根据 [`flex-wrap`](https://developer.mozilla.org/zh-CN/CSS/flex-wrap "flex-wrap") 属性控制的侧轴方向（在这个方向上可以建立垂直的新线），既可以是单独一线也可以是多线排列。

- __尺寸__
    弹性子元素宽高可相应地等价于**主尺寸**和**侧尺寸**，它们都分别取决于弹性容器的主轴和侧轴。

    * 属性 [`min-height`](https://developer.mozilla.org/zh-CN/CSS/min-height "/zh-CN/CSS/min-height") 和 [`min-width`](https://developer.mozilla.org/zh-CN/CSS/min-width "/zh-CN/CSS/min-width") 属性的初始值为0。
    * 属性 [`flex`](https://developer.mozilla.org/zh-CN/CSS/flex "zh-CN/CSS/flex") 是 [`flex-basis`](https://developer.mozilla.org/zh-CN/CSS/flex-basis "zh-CN/CSS/flex-basis")，[`flex-grow`](https://developer.mozilla.org/zh-CN/CSS/flex-grow "zh-CN/CSS/flex-grow") 和 [`flex-shrink`](https://developer.mozilla.org/zh-CN/CSS/flex-shrink "zh-CN/CSS/flex-shrink") 的缩写，代表弹性子元素的伸缩性。

## 建立弹性盒子

使用CSS建立弹性盒子样式，为 [display](https://developer.mozilla.org/zh-CN/CSS/display "/zh-CN/CSS/display") 指定下面的值：

    display : flex

或者

    display : inline-flex

这样做将元素定义为弹性容器，其子元素即弹性子元素。 `flex` 值表示弹性容器为块级。`inline-flex` 值表示弹性容器为原子行级元素 。

## 弹性子元素的注意事项

包含在弹性容器内的文本自动成为匿名的弹性子元素。然而，只包含空白的弹性子元素不会被渲染，就好像它被设定为`display:none`一样。

弹性容器的绝对定位的子元素会被定位，因此其静态位置会根据它们的弹性容器的主起始内容盒的角落上开始。

目前由于一个已知的问题，在弹性子元素上指定`visibility:collapse`  
会导致其好像被指定了 `display:none` 一样，但该操作的初衷是使元素具有好像被指定了`visibility:hidden`一样的效果。在该问题被解决之前建议使用`visibility:hidden` ，其效果在弹性子元素上等同于`visibility:collapse` 。

相邻的弹性子元素不会发生外边距合并。使用`auto` 的外边距会在垂直和水平方向上带来额外的空间，这种性质可用于对齐或分隔临近的弹性子元素。W3C弹性盒子布局模型的 [使用'auto'的外边距进行对齐](http://dev.w3.org/csswg/css3-flexbox/#auto-margins "http://dev.w3.org/csswg/css3-flexbox/#auto-margins") 部分有更多信息。

弹 性盒子的对齐会进行真正的居中，不像CSS的其他居中方法。这意味着即使弹性容器溢出，子元素仍然保持居中。有些时候这可能有问题，然而即使溢出了页面的 上沿，或左边沿（在从左到右的语言如英语；这个问题在从右到左的语言中发生在右边沿，如阿拉伯文），因为你不能滚动到那里，即使那里有内容！在将来的版本 中，对齐属性会被扩展为有一个“安全”选项。目前，如果关心这个问题，你可以使用外边距来达到居中的目的，这种方式比较“安全”，在溢出的情况下会停止居 中。在你想要居中的弹性子元素上应用自动外边距代替`align-`属性。在弹性容器的第一个和最后一个子元素的外侧应用自动外边距来代替`justify-`属性。自动外边距会伸缩并假定剩余空间，当有剩余空间时居中弹性子元素，没有剩余空间时切换会正常对齐模式。然而，如果你想要在多线弹性盒子中用基于外边距的居中替换`justify-content` 属性，你可能就没那么幸运了，因为你需要在每一线的第一个和最后一个元素上应用外边距。除非你能提前预测哪个元素是哪一线上的最后一个元素，否则你没法稳定地在主轴上用基于外边距的居中代替 `justify-content` 属性。

说起虽然元素的显示顺序与源代码中的顺序无关，这种无关仅对显示效果有效，不包括语音顺序和基于源代码的导航。即使是 [`order`](https://developer.mozilla.org/zh-CN/docs/CSS/order "") 也不影响语言和导航序列。因此开发者必须小心排列源代码中的元素以免破坏文档的可访问性。

## 弹性盒子的属性

Flexible-boxes-related properties: [`margin`](https://developer.mozilla.org/zh-CN/docs/CSS/margin ""), [`align-content`](https://developer.mozilla.org/zh-CN/docs/CSS/align-content ""), [`align-items`](https://developer.mozilla.org/zh-CN/docs/CSS/align-items ""), [`align-self`](https://developer.mozilla.org/zh-CN/docs/CSS/align-self ""), [`display`](https://developer.mozilla.org/zh-CN/docs/CSS/display ""), [`flex`](https://developer.mozilla.org/zh-CN/docs/CSS/flex ""), [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/CSS/flex-basis ""), [`flex-direction`](https://developer.mozilla.org/zh-CN/docs/CSS/flex-direction ""), [`flex-flow`](https://developer.mozilla.org/zh-CN/docs/CSS/flex-flow ""), [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/CSS/flex-grow ""), [`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/CSS/flex-shrink ""), [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/CSS/flex-wrap ""), [`justify-content`](https://developer.mozilla.org/zh-CN/docs/CSS/justify-content ""), [`min-height`](https://developer.mozilla.org/zh-CN/docs/CSS/min-height ""), [`min-width`](https://developer.mozilla.org/zh-CN/docs/CSS/min-width ""), [`order`](https://developer.mozilla.org/zh-CN/docs/CSS/order "")

### 不影响弹性盒子的属性

因为弹性盒子使用一种不同的布局逻辑，一些属性会在弹性容器上无效。

* [多列模块](https://developer.mozilla.org/zh-CN/CSS/Using_CSS_multi-column_layouts "Using CSS multi-column layouts") 中的 `column-*` 属性对弹性子元素无效。
* [`float`](https://developer.mozilla.org/zh-CN/docs/CSS/float "") 和 [`clear`](https://developer.mozilla.org/zh-CN/docs/CSS/clear "") 对弹性子元素无效。使用 `float` 会导致 `display` 属性计算为 `block`.
* [`vertical-align`](https://developer.mozilla.org/zh-CN/docs/CSS/vertical-align "") 对弹性子元素的对齐无效。

## 例子

### 基于弹性布局的例子

这个基本的例子展示了如何对元素应用弹性布局以及在弹性布局中子元素的行为。

    ​<!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
    
       .flex
       {
          /* basic styling */
          width: 350px;
          height: 200px;
          border: 1px solid #555;
          font: 14px Arial;
    
          /* flexbox setup */
          display: -webkit-flex;
          -webkit-flex-direction: row;
    
          display: flex;
          flex-direction: row;
       }
    
       .flex > div
       {
          -webkit-flex: 1 1 auto;
          flex: 1 1 auto;
    
          width: 30px; /* To make the transition work nicely.  (Transitions to/from
                          "width:auto" are buggy in Gecko and Webkit, at least.
                          See http://bugzil.la/731886 for more info.) */
    
          -webkit-transition: width 0.7s ease-out;
          transition: width 0.7s ease-out;
       }
    
       /* colors */
       .flex > div:nth-child(1){ background : #009246; }
       .flex > div:nth-child(2){ background : #F1F2F1; }
       .flex > div:nth-child(3){ background : #CE2B37; }
    
       .flex > div:hover
       {
            width: 200px;
       }
       
       </style>
        
     </head>
     <body>
      <p>Flexbox nuovo</p>
      <div class="flex">
        <div>uno</div>
        <div>due</div>
        <div>tre</div>
      </div>
     </body>
    </html>

效果：[点击我](/examples/css-layout-flex-basic.html)

### 绝妙的弹性布局例子

这个例子说明了弹性布局如何根据不同的屏幕分辨率提供动态改变布局的能力。下图展示了这种转换。

![HolyGrailLayout.png](https://developer.mozilla.org/files/3760/HolyGrailLayout.png)

这个例子正适用于桌面浏览器网页必须优化以适应于智能手机屏幕的场景。不仅仅需要元素减小尺寸，它们排列的顺序方式也必须改变。弹性布局很容易实现这种需求。

    ​
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
    
      body {
       font: 24px Helvetica;
       background: #999999;
      }
    
      #main {
       min-height: 800px;
       margin: 0px;
       padding: 0px;
       display: -webkit-flex;
       display:         flex;
       -webkit-flex-flow: row;
               flex-flow: row;
       }
     
      #main > article {
       margin: 4px;
       padding: 5px;
       border: 1px solid #cccc33;
       border-radius: 7pt;
       background: #dddd88;
       -webkit-flex: 3 1 60%;
               flex: 3 1 60%;
       -webkit-order: 2;
               order: 2;
       }
      
      #main > nav {
       margin: 4px;
       padding: 5px;
       border: 1px solid #8888bb;
       border-radius: 7pt;
       background: #ccccff;
       -webkit-flex: 1 6 20%;
               flex: 1 6 20%;
       -webkit-order: 1;
               order: 1;
       }
      
      #main > aside {
       margin: 4px;
       padding: 5px;
       border: 1px solid #8888bb;
       border-radius: 7pt;
       background: #ccccff;
       -webkit-flex: 1 6 20%;
               flex: 1 6 20%;
       -webkit-order: 3;
               order: 3;
       }
     
      header, footer {
       display: block;
       margin: 4px;
       padding: 5px;
       min-height: 100px;
       border: 1px solid #eebb55;
       border-radius: 7pt;
       background: #ffeebb;
       }
     
      /* Too narrow to support three columns */
      @media all and (max-width: 640px) {
      
       #main, #page {
        -webkit-flex-flow: column;
                flex-flow: column;
       }
    
       #main > article, #main > nav, #main > aside {
        /* Return them to document order */
        -webkit-order: 0;
                order: 0;
       }
      
       #main > nav, #main > aside, header, footer {
        min-height: 50px;
        max-height: 50px;
       }
      }
    
     </style>
      </head>
      <body>
     <header>header</header>
     <div id='main'>
        <article>article</article>
        <nav>nav</nav>
        <aside>aside</aside>
     </div>
     <footer>footer</footer>
      </body>
    </html>

## 操作

有几个在线的弹性盒子操作站点可用于实验：

* [Flexbox Playground](http://demo.agektmr.com/flexbox/ "http://demo.agektmr.com/flexbox/")
* [Flexy Boxes](http://the-echoplex.net/flexyboxes "http://the-echoplex.net/flexyboxes")
## 始终要记得的一些事

描述弹性子元素如何排列的逻辑有时候非常隐晦。这是一些在计划使用弹性盒子时应避免的一些事。

弹性盒子会根据[书写模式](https://developer.mozilla.org/zh-CN/docs/CSS/writing-mode "mode")的需要进行排列。这意味着**主起始点**和**主结束点**需要根据**开始**和**结束**点布局。

**侧起始点**和**侧结束点**取决于依赖[`direction`](https://developer.mozilla.org/zh-CN/CSS/direction "direction")属性值的**开始**和**结束**点的定义**。**

只要`break-` 属性允许，断页可能出现在弹性盒子布局中。CSS3的 `break-after`， `break-before` 和 `break-inside` a以及CSS2.1的 `page-break-before`，`page-break-after` 和 `page-break-inside` 属性可能出现在弹性容器，弹性子元素以及弹性子元素的内部元素上出现。

## 兼容性

<http://caniuse.com/#search=flexbo>

## Reference

- [使用 CSS 弹性盒 - CSS](https://developer.mozilla.org/zh-CN/docs/CSS/Tutorials/Using_CSS_flexible_boxes#.E5.BC.B9.E6.80.A7.E7.9B.92.E6.A6.82.E5.BF.B5)
- [A Complete Guide to Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Designing CSS Layouts With Flexbox Is As Easy As Pie](http://www.smashingmagazine.com/2013/05/22/centering-elements-with-flexbox/)
- [Are We Ready to Use Flexbox?](http://www.sitepoint.com/are-we-ready-to-use-flexbox/)
- [Using Flexbox: Mixing Old and New for the Best Browser Support](http://css-tricks.com/using-flexbox/)
- [CSS3 弹性盒布局说明（CSS3 Flexible Box Layout Explained）](http://xinyo.org/archives/63075/)
- [CSS之固定布局、流动布局、弹性布局优缺点分析（下） - 厚朴〖HOPE〗工作室 >> 唯美设计 >> 前端](http://ce.sysu.edu.cn/hope/Item/11239.aspx)
- [CSS box-flex属性，然后弹性盒子模型简介 « 张鑫旭-鑫空间-鑫生活](http://www.zhangxinxu.com/wordpress/2010/12/css-box-flex%E5%B1%9E%E6%80%A7%EF%BC%8C%E7%84%B6%E5%90%8E%E5%BC%B9%E6%80%A7%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B%E7%AE%80%E4%BB%8B/)
- [打造无懈可击的Web设计——流动布局和弹性布局](http://www.programmer.com.cn/11732/)