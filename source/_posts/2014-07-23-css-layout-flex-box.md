layout: post
title: "CSS 弹性盒布局"
category: CSS
tags: [web, css, layout]
---

CSS3 弹性盒，或者简称弹性盒，是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的[布局方式](https://developer.mozilla.org/zh-CN/docs/CSS/Layout_mode "/zh-CN/docs/CSS/Layout_mode")。对于很多应用来讲，弹性盒在两个方面相对于盒模型进行了提升，它既不使用浮动，也不会导致弹性盒容器的外边距与其内容的外边距之间发生塌陷。

弹性盒布局的定义中，它可以自动调整子元素的高和宽，来很好的填充任何显示设备中的可用显示空间，收缩内容防止内容溢出。

<!-- more -->

不同于盒布局的基于垂直方向以及行内布局的基于水平方向，弹性盒布局的算法是方向无关的。 虽然盒布局在页面中工作良好，但是其定义不足以支持那种需要根据用户代理从竖直切换成水平等变化而进行方向切换、大小调整、拉伸、收缩的引用组件。不同于将要出现的网格布局针对目标为大比例布局，弹性盒布局更适用于应用组件和小比例布局。这两种都是CSS工作组为了能与不同用户代理、不同书写模式和其他弹性需要进行协作而做出的努力。

虽然弹性盒布局的讨论中自由地使用了如水平轴、内联轴和垂直轴、块级轴的词汇，仍然需要一个新的词汇表来描述这种模型。参考下面的图形来学习后面的词汇。图形显示了弹性容器有一个值为row的属性flex-direction，其意义在于包含的子元素相互之间会根据书写模式和文本流方向在主轴上水平排列，即从左到右。

![flex_terms.png](https://developer.mozilla.org/files/3739/flex_terms.png)

- __弹性容器：__ 弹性子元素的父元素。 通过设置`display` 属性的值为`flex` 或 `inline-flex` 将其定义为弹性容器。
- __弹性子元素：__ 弹性容器的每一个子元素变为一个弹性子元素。弹性容器直接包含的文本变为匿名的弹性子元素。

- __轴：__ 每个弹性盒布局以两个轴来排列。弹性子元素沿着主轴依次相互排列。侧轴垂直于主轴。
    * 属性 `flex-direction` 定义主轴方向。
    * 属性 `justify-content` 定义了弹性子元素如何在当前线上沿着主轴排列。
    * 属性 `align-items` 定义了弹性子元素如何在当前线上沿着侧轴排列。
    * 属性 `align-self` 覆盖父元素的 `align-items` 属性，定义了单独的弹性子元素如何沿着侧轴排列。

- __方向：__ 弹性容器的主轴开始、主轴结束和侧轴开始、侧轴结束边缘代表了弹性子元素排列的起始和结束位置。它们具体取决于由 `writing-mode`（从左到右、从右到左等等）属性建立的向量中的主轴和侧轴位置。

    * 属性 `order` 将元素依次分组，并决定谁先出现。
    * 属性 `flex-flow` 是属性 `flex-direction` 和 `flex-wrap`的简写，用于排列弹性子元素。

- __线：__ 弹性子元素根据 `flex-wrap` 属性控制的侧轴方向（在这个方向上可以建立垂直的新线），既可以是单独一线也可以是多线排列。

- __尺寸__
    弹性子元素宽高可相应地等价于**主尺寸**和**侧尺寸**，它们都分别取决于弹性容器的主轴和侧轴。

    * 属性 `min-height` 和 `min-width` 属性的初始值为0。
    * 属性 `flex` 是 `flex-basis`，`flex-grow` 和 `flex-shrink` 的缩写，代表弹性子元素的伸缩性。

## 建立弹性盒子

使用CSS建立弹性盒子样式，为 display 指定下面的值：

    display : flex

或者

    display : inline-flex

这样做将元素定义为弹性容器，其子元素即弹性子元素。 `flex` 值表示弹性容器为块级。`inline-flex` 值表示弹性容器为原子行级元素 。

## 弹性容器的属性

![](http://cdn.css-tricks.com/wp-content/uploads/2014/05/flex-container.svg)

### display

This defines a flex container; inline or block depending on the given value. It enables a flex context for all its direct children.


```
.container {
  display: flex; /* or inline-flex */
}
```

Note that CSS columns have no effect on a flex container.

### flex-direction

![](http://cdn.css-tricks.com/wp-content/uploads/2014/05/flex-direction1.svg)

This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout concept. Think of flex items as primarily laying out either in horizontal rows or vertical columns.


```
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

* `row` (default): left to right in `ltr`; right to left in `rtl`
* `row-reverse`: right to left in `ltr`; left to right in `rtl`
* `column`: same as `row` but top to bottom
* `column-reverse`: same as `row-reverse` but bottom to top

### flex-wrap

By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property. Direction also plays a role here, determining the direction new lines are stacked in.

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

* `nowrap` (default): single-line / left to right in `ltr`; right to left in `rtl`
* `wrap`: multi-line / left to right in `ltr`; right to left in `rtl`
* `wrap-reverse`: multi-line / right to left in `ltr`; left to right in `rtl`

![](http://cdn.css-tricks.com/wp-content/uploads/2014/05/flex-wrap.svg)

There are some [visual demos of `flex-wrap` here](https://css-tricks.com/almanac/properties/f/flex-wrap/).

### flex-flow

This is a shorthand `flex-direction` and `flex-wrap` properties, which together define the flex container's main and cross axes. Default is `row nowrap`.

```
flex-flow: <‘flex-direction’> || <‘flex-wrap’>
```

### justify-content

This defines the alignment along the __main axis__. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.

```js
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

* `flex-start` (default): items are packed toward the start line
* `flex-end`: items are packed toward to end line
* `center`: items are centered along the line
* `space-between`: items are evenly distributed in the line; first item is on the start line, last item on the end line
* `space-around`: items are evenly distributed in the line with equal space around them.

![](http://johnnyimages.qiniudn.com/flex-flex-content.png)

See the [Demo](http://codepen.io/JohnnyFee/pen/IyDvA/)

### align-items

This defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the `justify-content` version for the cross-axis (perpendicular to the main-axis).

```css
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

* `flex-start`: cross-start margin edge of the items is placed on the cross-start line
* `flex-end`: cross-end margin edge of the items is placed on the cross-end line
* `center`: items are centered in the cross-axis
* `baseline`: items are aligned such as their baselines align
* `stretch` (default): stretch to fill the container (still respect min-width/max-width)

![](http://cdn.css-tricks.com/wp-content/uploads/2014/05/align-items.svg)

### align-content

This aligns a flex container's lines within when there is extra space in the cross-axis, similar to how `justify-content` aligns individual items within the main-axis.

**Note:** this property has no effect when there is only one line of flex items.

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

* `flex-start`: lines packed to the start of the container
* `flex-end`: lines packed to the end of the container
* `center`: lines packed to the center of the container
* `space-between`: lines evenly distributed; the first line is at the start of the container while the last one is at the end
* `space-around`: lines evenly distributed with equal space between them
* `stretch` (default): lines stretch to take up the remaining space

![](http://cdn.css-tricks.com/wp-content/uploads/2014/05/align-content.svg)

## 弹性子元素的属性

### order

By default, flex items are laid out in the source order. However, the `order` property controls the order in which they appear in the flex container.

```css
.item {
  order: <integer>;
}
```

![](http://cdn.css-tricks.com/wp-content/uploads/2014/05/order.svg)

### flex-grow

This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up.

If all items have `flex-grow` set to 1, every child will set to an equal size inside the container. If you were to give one of the children a value of 2, that child would take up twice as much space as the others.

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

Negative numbers are invalid.

![](http://cdn.css-tricks.com/wp-content/uploads/2014/05/flex-grow.svg)

### flex-shrink

This defines the ability for a flex item to shrink if necessary.

```
.item {
  flex-shrink: <number>; /* default 1 */
}
```

It specifies the "flex shrink factor", which determines how much the flex item will shrink relative to the rest of the flex items in the flex container when there isn't enough space on the row.

When omitted, it is set to `1` and the flex shrink factor is multiplied by the flex basis when distributing negative space.

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg)

__Demo:__

To see the full potential of this demo, you would have to be able to resize its width, so please have a look at it on CodePen directly.

<p data-height="130" data-theme-id="0" data-slug-hash="hpesF" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/hpesF/'>hpesF</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

In this demo:

* The first item has `flex: 1 1 20em` (shorthand for `flex-grow: 1`, `flex-shrink: 1`, `flex-basis: 20em`)
* The second item has `flex: 2 2 20em` (shorthand for `flex-grow: 2`, `flex-shrink: 2`, `flex-basis: 20em`)

Both flex items want to be 20em wide. Because of the flex-grow (first parameter), if the flex container is larger than 40em, the 2nd child will take twice as much leftover space as the first child. But if the parent element is less than 40em wide, then the 2nd child will have twice as much shaved off of it as the 1st child, making it look smaller (because of the 2nd parameter, flex-shrink).

Negative numbers are invalid.

### flex-basis

This defines the default size of an element before the remaining space is distributed.

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

<p data-height="130" data-theme-id="0" data-slug-hash="LEGIc" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/LEGIc/'>LEGIc</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

The first flex item want to be 400px, the second flex item want to be 100px. If the flex container is equal to 500px, the results in Chrome37:

### flex

This is the shorthand for `flex-grow,` `flex-shrink` and `flex-basis` combined. The second and third parameters (`flex-shrink` and `flex-basis`) are optional. Default is `0 1 auto`.

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

```
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

See [Chris Wright - Experiment: Flexbox Adventures](http://chriswrightdesign.com/experiments/flexbox-adventures)

### align-self

This allows the default alignment (or the one specified by `align-items`) to be overridden for individual flex items.

Please see the `align-items` explanation to understand the available values.

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![](http://cdn.css-tricks.com/wp-content/uploads/2014/05/align-self.svg)

Note that `float`, `clear` and `vertical-align` have no effect on a flex item.

### 不影响弹性盒子的属性

因为弹性盒子使用一种不同的布局逻辑，一些属性会在弹性容器上无效。

* [多列模块](https://developer.mozilla.org/zh-CN/CSS/Using_CSS_multi-column_layouts "Using CSS multi-column layouts") 中的 `column-*` 属性对弹性子元素无效。
* `float` 和 `clear` 对弹性子元素无效。使用 `float` 会导致 `display` 属性计算为 `block`.
* `vertical-align` 对弹性子元素的对齐无效。

## 弹性子元素的注意事项

包含在弹性容器内的文本自动成为匿名的弹性子元素。然而，只包含空白的弹性子元素不会被渲染，就好像它被设定为`display:none`一样。

弹性容器的绝对定位的子元素会被定位，因此其静态位置会根据它们的弹性容器的主起始内容盒的角落上开始。

目前由于一个已知的问题，在弹性子元素上指定`visibility:collapse`
会导致其好像被指定了 `display:none` 一样，但该操作的初衷是使元素具有好像被指定了`visibility:hidden`一样的效果。在该问题被解决之前建议使用`visibility:hidden` ，其效果在弹性子元素上等同于`visibility:collapse` 。

相邻的弹性子元素不会发生外边距合并。使用`auto` 的外边距会在垂直和水平方向上带来额外的空间，这种性质可用于对齐或分隔临近的弹性子元素。W3C弹性盒子布局模型的 [使用'auto'的外边距进行对齐](http://dev.w3.org/csswg/css3-flexbox/#auto-margins "http://dev.w3.org/csswg/css3-flexbox/#auto-margins") 部分有更多信息。

弹 性盒子的对齐会进行真正的居中，不像CSS的其他居中方法。这意味着即使弹性容器溢出，子元素仍然保持居中。有些时候这可能有问题，然而即使溢出了页面的 上沿，或左边沿（在从左到右的语言如英语；这个问题在从右到左的语言中发生在右边沿，如阿拉伯文），因为你不能滚动到那里，即使那里有内容！在将来的版本 中，对齐属性会被扩展为有一个“安全”选项。目前，如果关心这个问题，你可以使用外边距来达到居中的目的，这种方式比较“安全”，在溢出的情况下会停止居 中。在你想要居中的弹性子元素上应用自动外边距代替`align-`属性。在弹性容器的第一个和最后一个子元素的外侧应用自动外边距来代替`justify-`属性。自动外边距会伸缩并假定剩余空间，当有剩余空间时居中弹性子元素，没有剩余空间时切换会正常对齐模式。然而，如果你想要在多线弹性盒子中用基于外边距的居中替换`justify-content` 属性，你可能就没那么幸运了，因为你需要在每一线的第一个和最后一个元素上应用外边距。除非你能提前预测哪个元素是哪一线上的最后一个元素，否则你没法稳定地在主轴上用基于外边距的居中代替 `justify-content` 属性。

说起虽然元素的显示顺序与源代码中的顺序无关，这种无关仅对显示效果有效，不包括语音顺序和基于源代码的导航。即使是 `order` 也不影响语言和导航序列。因此开发者必须小心排列源代码中的元素以免破坏文档的可访问性。

## Library

- [kristoferjoseph/flexboxgrid](https://github.com/kristoferjoseph/flexboxgrid)

## Demo

- See also [Flexbox Nav Bar with Fixed, Variable, and Take-Up-The-Rest Elements
- ](http://css-tricks.com/flexbox-nav-bar-fixed-variable-take-rest-elements)
- [SitePoint's Tiles: A Case Study in Components, Theming and Flexbox](https://www.sitepoint.com/sitepoints-tiles-a-case-study)

### Centering

Let's start with a very very simple example, solving an almost daily problem: perfect centering. It couldn't be any simpler if you use flexbox.

```css
.parent {
  display: flex;
  height: 300px; /* Or whatever */
}

.child {
  width: 100px;  /* Or whatever */
  height: 100px; /* Or whatever */
  margin: auto;  /* Magic! */
}
```

This relies on the fact a margin set to `auto` in a flex container absorb extra space. So setting a vertical margin of `auto` will make the item perfectly centered in both axis.

### Fluid Layout

Now let's use some more properties. Consider a list of 6 items, all with a fixed dimensions in a matter of aesthetics but they could be auto-sized. We want them to be evenly and nicely distributed on the horizontal axis so that when we resize the browser, everything is fine (without media queries!).

```css
.flex-container {
  /* We first create a flex layout context */
  display: flex;

  /* Then we define the flow direction and if we allow the items to wrap
   * Remember this is the same as:
   * flex-direction: row;
   * flex-wrap: wrap;
   */
  flex-flow: row wrap;

  /* Then we define how is distributed the remaining space */
  justify-content: space-around;
}
```

Done. Everything else is just some styling concern. Below is a pen featuring this example. Be sure to go to CodePen and try resizing your windows to see what happen.

See the [Result](http://codepen.io/HugoGiraudel/pen/LklCv/').

### Responsive Menu

Let's try something else. Imagine we have a right-aligned navigation on the very top of our website, but we want it to be centered on medium-sized screens and single-columned on small devices. Easy enough.

```css
/* Large */
.navigation {
  display: flex;
  flex-flow: row wrap;
  /* This aligns items to the end line on main-axis */
  justify-content: flex-end;
}

/* Medium screens */
@media all and (max-width: 800px) {
  .navigation {
    /* When on medium sized screens, we center it by evenly distributing empty space around items */
    justify-content: space-around;
  }
}

/* Small screens */
@media all and (max-width: 500px) {
  .navigation {
    /* On small screens, we are no longer using row direction but column */
    flex-direction: column;
  }
}
```

See the [Result](http://codepen.io/HugoGiraudel/pen/pkwqH/).

### Responsive layout

Let's try something even better by playing with flex items flexibility! What about a mobile-first 3-columns layout with full-width header and footer. And independent from source order.

```css
.wrapper {
  display: flex;
  flex-flow: row wrap;
}

/* We tell all items to be 100% width */
.header, .main, .nav, .aside, .footer {
  flex: 1 100%;
}

/* We rely on source order for mobile-first approach
 * in this case:
 * 1. header
 * 2. nav
 * 3. main
 * 4. aside
 * 5. footer
 */

/* Medium screens */
@media all and (min-width: 600px) {
  /* We tell both sidebars to share a row */
  .aside { flex: 1 auto; }
}

/* Large screens */
@media all and (min-width: 800px) {
  /* We invert order of first sidebar and main
   * And tell the main element to take twice as much width as the other two sidebars
   */
  .main { flex: 2 0px; }

  .aside-1 { order: 1; }
  .main    { order: 2; }
  .aside-2 { order: 3; }
  .footer  { order: 4; }
}
```

See the [Result](http://codepen.io/HugoGiraudel/pen/qIAwr/).

## Tools

* [Flexplorer](http://bennettfeely.com/flexplorer/)
* [Flexbox Playground](http://demo.agektmr.com/flexbox/ "http://demo.agektmr.com/flexbox/")
* [Flexy Boxes](http://the-echoplex.net/flexyboxes "http://the-echoplex.net/flexyboxes")
## 始终要记得的一些事

## Reference

- [使用 CSS 弹性盒 - CSS](https://developer.mozilla.org/zh-CN/docs/CSS/Tutorials/Using_CSS_flexible_boxes#.E5.BC.B9.E6.80.A7.E7.9B.92.E6.A6.82.E5.BF.B5)
- [A Complete Guide to Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [A Visual Guide to CSS3 Flexbox Properties ― Scotch](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)
- [Flex 布局教程：语法篇 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

<script async src="//codepen.io/assets/embed/ei.js"></script>
