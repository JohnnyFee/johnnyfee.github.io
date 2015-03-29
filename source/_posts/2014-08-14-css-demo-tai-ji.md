layout: post
title: "如何使用 CSS 绘制太极图"
category : CSS
tags : [css, form]
---

## 画个圆

首先画一下太极图最外层的圆圈，并且左右两个半圆的背景设置成不同的颜色，分别代表阴阳两鱼。

    .yin-yang {
        width: 200px;
        height: 200px;

        border-radius: 50%;
        border: 1px solid red;

        background-color: linear-gradient(to right, #222 50%, #eee 50%); 
    }

<!--more-->

`border-radius: 50%` 是将边框由直角变成圆角，而且是最平滑的圆角。因为 `50%` 已经使圆角变得最平滑，所以即使 `border-radius: >50%` 也仍然还是圆角。

`background-color: linear-gradient(to right, #222 50%, #eee 50%);` 使用线性渐变为左右两个半圆设置不同的颜色。`to right` 渐变方向为从左到右，`0-50%` 的背景颜色为 `#222`，`50%-100%` 的背景颜色为 `#eee`。

<p data-height="268" data-theme-id="0" data-slug-hash="hBkzr" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/hBkzr/'>hBkzr</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## 阴阳鱼

阴阳两极的鱼环的头部其实都包含一个圆圈，半径为大圆半径的一半。我们使用伪类 `before` 和 `after` 来实现。

```css
.yin-yang {
    <!-- ...  --> 
    position: absolute;
}

.yin-yang:before, .yin-yang:after {
    content: '';

    width: 50%;
    height:50%;
    border-radius: 50%;
    border: 1px solid red;

    position: absolute;
    left:0; right:0;
    margin: auto;
}

.yin-yang:before{
  background-color: #222;
  top:0;
}

.yin-yang:after{
  background-color: #eee;
  bottom:0;
}
```

我们通过 `before` 和 `after` 伪类分别在 `.yin-yang` 内加了两个 `div`，一个在前，一个在后，实际上并没有严格的前后关系，可以简单理解为一个在堆栈前，一个在栈后。通过伪选择器加进去的两个 `div` 并不存在于文档流中，而是脱离于文档流的。所以我们使用 `absolute` 来定位这两个 `div`。使用 `left: 0; right:0; margin: auto 0;` 让两个小圆的圆心处于大圆垂直直径上，也就是处于大圆的中线位置。分别使用 `top: 0;` 和 `bottom: 0;` 分别让两个鱼环出于上面和下面。

为了让伪类中的 `position: absolute` 生效，需要设置父容器的 `position` 的值为非 `static`，也就是非默认值，使用哪个，视您的布局而定。

<p data-height="268" data-theme-id="0" data-slug-hash="hFlJn" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/hFlJn/'>hFlJn</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


我们看到，两个小圆环有些交集，那是因为 div 默认的和模型为 `content-box`，在这种模型下内边距和边框都会使盒的宽高变大。我们使用 `border-sizing: border-box;` 将和模型修改为 `border-box`，这样，内边距和边框不会让盒变大。

    *, *:before, *:after{
      box-sizing: border-box;
    }

## 添加两鱼的圆心

其中是将两鱼的边框变大，剩下的自然是圆心，边框大小为小圆半径的 <sup>2</sup>/<sub>3<sub>，也就是大圆直径的 <sup>1</sup>/<sub>6</sub>。

    .yin-yang:before, .yin-yang:after {
      border-radius: 50%;
      border-style: solid;
      border-width: 33.33333px;
    }

    .yin-yang:before{
      background-color: #eee;
      border-color: #222;
    }

    .yin-yang:after{
      background-color: #222;
      border-color:#eee;
    }

<p data-height="268" data-theme-id="0" data-slug-hash="Bbuji" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/Bbuji/'>Bbuji</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## 添加动画

使用 `animation` 和 `@keyframes` 定义动画，让太极图顺时针方向匀速转动。

```css
.yin-yang {
    animation: spin 2s infinite linear;
}

@keyframes spin{
  to {
    transform: rotate(360deg)
  }
}
```

请注意处理浏览器的前缀支持。

<p data-height="268" data-theme-id="0" data-slug-hash="GrgCA" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/GrgCA/'>GrgCA</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Reference

- [yin-yang](http://codepen.io/WhiteWolfWizard/pen/Lxirc)

<script async src="//codepen.io/assets/embed/ei.js"></script>
