---
layout: post
title: "CSS 动画简介"
category: CSS
tags: [css, animation]
--- 

原文：<http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html>

## CSS Transition

### 1.1 基本用法

在CSS 3引入Transition（过渡）这个概念之前，CSS是没有时间轴的。也就是说，所有的状态变化，都是即时完成。

```css
img{
    height:15px;
    width:15px;
}
img:hover{
    height: 450px;
    width: 450px;
}
```

<!--more-->

transition的作用在于，指定状态变化所需要的时间。

```css
img{
    transition: 1s;
}
```

我们还可以指定transition适用的属性，比如只适用于height。

```
img{
    transition: 1s height;
}
```

这样一来，只有height的变化需要1秒实现，其他变化（主要是width）依然瞬间实现，效果如下。

<iframe width="100%" height="300" src="http://jsfiddle.net/feiqiang/qdo4mk5u/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 1.2 transition-delay

在同一行transition语句中，可以分别指定多个属性。

```
img{
    transition: 1s height, 1s width;
}
```

我们希望，让height先发生变化，等结束以后，再让width发生变化。实现这一点很容易，就是为width指定一个delay参数。

```
img{
    transition: 1s height, 1s 1s width;
}
```

上面代码指定，width在1秒之后，再开始变化，也就是延迟（delay）1秒，效果如下。

<iframe width="100%" height="300" src="http://jsfiddle.net/feiqiang/ntchuhs3/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

delay的真正意义在于，它指定了动画发生的顺序，使得多个不同的transition可以连在一起，形成复杂效果。

### 1.3 transition-timing-function

transition的状态变化速度（又称timing function），默认不是匀速的，而是逐渐放慢，这叫做ease。

```
img{
    transition: 1s ease;
}
```

除了ease以外，其他模式还包括

1. linear：匀速
1. ease-in：加速
1. ease-out：减速
1. cubic-bezier函数：自定义速度模式

最后那个cubic-bezier，可以使用[工具网站](http://cubic-bezier.com/)来定制。

```
img{
    transition: 1s height cubic-bezier(.83,.97,.05,1.44);
}
```

上面的代码会产生一个最后阶段放大过度、然后回缩的效果。

<iframe width="100%" height="300" src="http://jsfiddle.net/feiqiang/mWaM7/60/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 1.4 transition的各项属性

transition的完整写法如下。

```
img{
    transition: 1s 1s height ease;
}
```

这其实是一个简写形式，可以单独定义成各个属性。

```
img{
    transition-property: height;
    transition-duration: 1s;
    transition-delay: 1s;
    transition-timing-function: ease;
}
```

### 1.5 transition的使用注意

1. 目前，各大浏览器（包括IE 10）都已经支持无前缀的 `transition`，所以 `transition` 已经可以很安全地不加浏览器前缀。

2. 不是所有的CSS属性都支持 `transition`，完整的列表查看[这里](http://oli.jp/2010/css-animatable-properties/)，以及具体的[效果](http://leaverou.github.io/animatable/)。

3. `transition` 需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，`height` 从 `0px` 变化到 `100px`，`transition` 可以算出中间状态。但是，`transition` 没法算出 0px 到 `auto` 的中间状态，也就是说，如果开始或结束的设置是 `height: auto`，那么就不会产生动画效果。类似的情况还有，`display: none` 到 `block`，`background: url(foo.jpg)` 到 `url(bar.jpg)` 等等。

### 1.6 transition的局限

transition的优点在于简单易用，但是它有几个很大的局限。

1. transition需要事件触发，所以没法在网页加载时自动发生。
1. transition是一次性的，不能重复发生，除非一再触发。
1. transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

1. 一条transition规则，只能定义一个属性的变化，不能涉及多个属性。

__CSS Animation就是为了解决这些问题而提出的。__

## CSS Animation

### 2.1 基本用法

首先，CSS Animation需要指定动画一个周期持续的时间，以及动画效果的名称。

```
div:hover {
  animation: 1s rainbow;
}
```

上面代码表示，当鼠标悬停在div元素上时，会产生名为rainbow的动画效果，持续时间为1秒。为此，我们还需要用keyframes关键字，定义rainbow效果。

```
@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```

上面代码表示，rainbow效果一共有三个状态，分别为起始（0%）、中点（50%）和结束（100%）。如果有需要，完全可以插入更多状态。效果如下。

<iframe width="100%" height="300" src="http://jsfiddle.net/ruanyf/qcum7/3/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

默认情况下，动画只播放一次。加入 `infinite` 关键字，可以让动画无限次播放。

```
div:hover {
  animation: 1s rainbow infinite;
}
```

也可以指定动画具体播放的次数，比如3次。

```
div:hover {
  animation: 1s rainbow 3;
}
```


这里还有一个[心脏跳动](http://lea.verou.me/css-4d/#heart-demo)的例子，可供参考。

### 2.2 animation的各项属性

同transition一样，animation也是一个简写形式。

```
div:hover {
  animation: 1s 1s rainbow linear 3 forwards normal;
}
```

Just space-separate all the individual values. The order doesn't matter except when using both duration and delay, they need to be in that order. In the example below 1s = duration, 2s = delay, 3 = iterations.

这是一个简写形式，可以分解成各个单独的属性。

```
div:hover {
  animation-name: rainbow;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 1s;
  animation-fill-mode:forwards;
  animation-direction: normal;
  animation-iteration-count: 3;
}
```

Property            |可选值   | Description                                
------------------- | -----|-------
timing-function     | ease, ease-out, ease-in, ease-in-out, linear, cubic-bezier(x1, y1, x2, y2) (e.g. cubic-bezier(0.5, 0.2, 0.3, 1.0)) | 设置动画速度， 即通过建立加速度曲线，设置动画在关键帧之间是如何变化。
duration & delay    | Xs or Xms | 设置延时，即从元素加载完成之后到动画序列开始执行的这段时间。
duration-count      | X   
fill-mode           | forwards, backwards, both, none  |指定动画执行前后如何为目标元素应用样式。  
direction | normal, alternate | 设置动画在每次运行完后是反向运行还是重新回到开始位置重复运行。
iteration-count | X |设置动画重复次数， 可以指定 infinite 无限次重复动画

### 2.3 animation-fill-mode

动画结束以后，会立即从结束状态跳回到起始状态。如果想让动画保持在结束状态，需要使用animation-fill-mode属性。

```
div:hover {
  animation: 1s rainbow forwards;
}
```


forwards表示让动画停留在结束状态，效果如下。

<iframe width="100%" height="300" src="http://jsfiddle.net/ruanyf/qcum7/4/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

animation-fill-mode还可以使用下列值。

- none：默认值，回到动画没开始时的状态。
- backwards：让动画回到第一帧的状态。
- both: 根据animation-direction（见后）轮流应用forwards和backwards规则。

### 2.4 animation-direction

动画循环播放时，每次都是从结束状态跳回到起始状态，再开始播放。animation-direction属性，可以改变这种行为。

下面看一个例子，来说明如何使用animation-direction。假定有一个动画是这样定义的。

```
@keyframes rainbow {
  0% { background-color: yellow; }
  100% { background: blue; }
}
```


默认情况是，`animation-direction` 等于normal。

```
div:hover {
  animation: 1s rainbow 3 normal;
}
```

此外，还可以等于取 `alternate`、`reverse`、`alternate-reverse` 等值。它们的含义见下图（假定动画连续播放三次）。

![](http://image.beekka.com/blog/201402/bg2014021401.png)

<p data-height="268" data-theme-id="0" data-slug-hash="nyzpt" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/nyzpt/'>nyzpt</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

简单说，`animation-direction` 指定了动画播放的方向，最常用的值是 `normal` 和 `reverse`。浏览器对其他值的支持情况不佳，应该慎用。

### 2.5 keyframes的写法

keyframes关键字用来定义动画的各个状态，它的写法相当自由。

```
@keyframes rainbow {
  0% { background: #c00 }
  50% { background: orange }
  100% { background: yellowgreen }
}
```

0%可以用from代表，100%可以用to代表，因此上面的代码等同于下面的形式。

```
@keyframes rainbow {
  from { background: #c00 }
  50% { background: orange }
  to { background: yellowgreen }
}
```

如果省略某个状态，浏览器会自动推算中间状态，所以下面都是合法的写法。

```
@keyframes rainbow {
  50% { background: orange }
  to { background: yellowgreen }
}

@keyframes rainbow {
  to { background: yellowgreen }
}
```

甚至，可以把多个状态写在一行。

```
@keyframes pound {
  from，to { transform: none; }
  50% { transform: scale(1.2); }
}
```

另外一点需要注意的是，浏览器从一个状态向另一个状态过渡，是平滑过渡。steps函数可以实现分步过渡。

```
div:hover {
  animation: 1s rainbow infinite steps(10);
}
```

这里有一个非常神奇的[例子](http://dabblet.com/gist/1745856)，可以看到steps函数的用处。

### 2.6 animation-play-state

有时，动画播放过程中，会突然停止。这时，默认行为是跳回到动画的开始状态。

<iframe width="100%" height="300" src="http://jsfiddle.net/ruanyf/8t3Le/2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

上面动画中，如果鼠标移走，色块立刻回到动画开始状态。

如果想让动画保持突然终止时的状态，就要使用animation-play-state属性。

```
div {
    animation: spin 1s linear infinite;
    animation-play-state: paused;
}

div:hover {
  animation-play-state: running;
}
```

上面的代码指定，没有鼠标没有悬停时，动画状态是暂停；一旦悬停，动画状态改为继续播放。效果如下。

<iframe width="100%" height="300" src="http://jsfiddle.net/ruanyf/8t3Le/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 2.7 浏览器前缀

目前，IE 10和Firefox（>= 16）支持没有前缀的animation，而chrome不支持，所以必须使用webkit前缀。

也就是说，实际运用中，代码必须写成下面的样子。

```
div:hover {
  -webkit-animation: 1s rainbow;
  animation: 1s rainbow;  
}

@-webkit-keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}

@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```

## Library

- [h5bp/Effeckt.css](https://github.com/h5bp/Effeckt.css) A Performant Transitions and Animations Library: <http://h5bp.github.io/Effeckt.css>

## Tutorial

- [Animation With CSS: It's Easier Than You Think - Vanseo Design](http://www.vanseodesign.com/css/animation/)
- [CSS3 Transforms: Adding 2D and 3D Effects To Web Pages - Vanseo Design](http://www.vanseodesign.com/css/transforms/)
- [Using CSS animations - Web 开发者指南](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Using_CSS_animations)
- [animation](http://css-tricks.com/almanac/properties/a/animation/)

<script async src="//codepen.io/assets/embed/ei.js"></script>
