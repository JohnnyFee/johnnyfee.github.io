layout: post
title: "Material Design Loading Spinner"
category: CSS
tags: [web, design, material, css]
---

在 [CodePen](http://codepen.io/) 看到一个 Material 风格的 Loading Spinner，甚是喜欢，于是研究一番。用到的技术主要有 SVG、CSS 动画以及 flex 弹性盒布局，下面是分析过程。

## 画一个圆圈

使用 SVG 画一个圆圈，并使用弹性盒布局使它居中。

<!-- more -->

<p data-height="268" data-theme-id="0" data-slug-hash="flpLc" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/flpLc/'>flpLc</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


```css
// 将 html 和 body 大小拉抻
html, body { height: 100%; }

// 将 body 的 display 设置为 flex，则 body 中的元素将使用弹性盒布局。
// align-items: center; 设置 body 中的 flex items 纵向居中对齐
// justify-content: center; 设置 body 中的 flex items 横向居中对齐
// 关于弹性盒布局请参考： <http://inching.org/2014/07/23/css-layout-flex-box/>
body {
   display: flex;
   align-items: center;
   justify-content: center;
}
```

## 添加伸缩动画

<p data-height="268" data-theme-id="0" data-slug-hash="aIFpy" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/aIFpy/'>aIFpy</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

圆的半径为 30px，周长为 188px。将 `stroke-dasharray` I设置为 ≥ 188px 均表示将圆周填满，且无分割，详细请参考 [SVG Stroke](http://inching.org/2014/08/23/svg-stroke/)。

`stroke-dashoffset: $offset;` 表示分割的起始位置，和 `stroke-dasharray` 相等，即初始状态为隐藏边框。

`animation: dash $duration ease-in-out infinite` 表示使用关键帧动画 `dash`，每次动画的持续时间为 `$duration`。`time-fucntion: ease-in-out` 表示动画状态变化速度方式为先慢入慢出，中间速度较快。

再看 `dash` 关键帧：

```css
@keyframes dash {
  0% { stroke-dashoffset: $offset; }
  50% {
    stroke-dashoffset: $offset/4;
  }
  100% {
    stroke-dashoffset: $offset;
  }
}
```

0% 不显示边框，50% 显示 3/4（隐藏开始部分的 1/4）, 100% 不显示边框。0% - 50% 和 50% - 100% 两个过程都是慢入慢出，因为 timing-function 是作用于每一帧的，而不是整个动画过程。动画总耗时时间为 `$duration`。

## 叠加旋转

<p data-height="268" data-theme-id="0" data-slug-hash="njLic" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/njLic/'>njLic</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

在 dash 动画的关键帧 50% 时，将圆旋转 135°，在 100% 时，旋转 450°。这样，在旋转到 50% 时，圆的 1/4 缺口停在 135°，这个过程就像一条蛇从蛇洞（90°）钻出，最后蛇头和蛇尾相距 1/4 的圆周。蛇头停在 270+90+135=135°，蛇尾停在 90+135=225° 处。

接下来是 100% 这个关键帧，如果没有 `transform:rotate(450deg);` 这个旋转过程，则蛇头和蛇尾最终都将收缩到蛇洞处（90°）。这是一个往回缩的过程，如：

<p data-height="268" data-theme-id="0" data-slug-hash="resbl" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/resbl/'>resbl</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

有了 `transform:rotate(450deg);`，蛇头从 135° 伸到 90+450=540=180°。蛇尾从 225° 伸到 180°。

这样，蛇洞从原来的 90° 移动到现在的 180°。如果此时重复动画的话，则会变得不连贯。所以，我们得想办法让蛇洞的位置不变。我们让这个 SVG 按蛇前进的方向再旋转 270°，蛇头和蛇尾总的旋转角度也会相应的增加。

    .spinner {
      animation: rotator $duration linear infinite;
    }

效果如：

<p data-height="268" data-theme-id="0" data-slug-hash="mhrgI" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/mhrgI/'>mhrgI</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## 叠加颜色渐变

```css
.path {
   animation: colors ($duration*4) ease-in-out infinite;
}

@keyframes colors {
  0% { stroke: #4285F4; }
  25% { stroke: #DE3E35; }
  50% { stroke: #F7C223; }
  75% { stroke: #1B9A59; }
  100% { stroke: #4285F4; }
}
```

每完成一次蛇头蛇头的变化对应两种颜色的渐变。

<p data-height="268" data-theme-id="0" data-slug-hash="znbLl" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/znbLl/'>znbLl</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<script async src="//codepen.io/assets/embed/ei.js"></script>