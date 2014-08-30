---
layout: post
title: "Material Design Loading Spinner"
category: CSS
tags: [web, design, material, css]
--- 

在 [CodePen](http://codepen.io/) 看到一个 Material 风格的 Loading Spinner，甚是喜欢，于是研究一番。用到的技术主要有 SVG、CSS 动画以及 flex 弹性盒布局，下面是分析过程。

## 画一个圆圈

使用 SVG 画一个圆圈，并使用弹性盒布局使它居中。

<p data-height="268" data-theme-id="0" data-slug-hash="flpLc" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/flpLc/'>flpLc</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


```css
// 将 html 和 body 大小拉抻
html, body { height: 100%; }

// 将 body 的 display 设置为 flex，则 body 中的元素将使用弹性盒布局。
// align-items: center; 设置 body 中的 flex items 纵向对齐
// justify-content: center; 设置 body 中的 flex items 横向对齐
// 关于弹性盒布局请参考： <http://inching.org/2014/07/23/css-layout-flex-box/>
body {
   display: flex;
   align-items: center;
   justify-content: center;
}
```

## 添加伸缩动画

<p data-height="268" data-theme-id="0" data-slug-hash="aIFpy" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/aIFpy/'>aIFpy</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

原的半径我们设置为 30px，周长为 188px。将 `stroke-dasharray` I设置为 ≥ 188px 均表示将圆周填满，详细请参考 [SVG Stroke](http://inching.org/2014/08/23/svg-stroke/)。

<script async src="//codepen.io/assets/embed/ei.js"></script>