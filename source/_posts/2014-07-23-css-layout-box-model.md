layout: post
title: "CSS 盒模式"
category: CSS
tags: [web, css, layout]
---

## 盒模式

**网页设计中的每个元素都是长方形的盒子。**盒子的尺寸是怎样精确计算的，请看下图：

![css-layout-box-model.png](http://johnnyimages.qiniudn.com/css-layout-box-model0.png)

<!--more-->

在 Firebug 中：

![css-layout-box-model.png](http://johnnyimages.qiniudn.com/css-layout-box-model.png)

盒子有四个边界：外边距边界 margin edge, 边框边界 border edge, 内边距边界 padding edge 与 内容边界 content edge。

Margin 比较特别，它不会影响盒子本身的大小，但是它会
影响和盒子有关的其他内容，因此 margin 是盒模型的一个重要的组成部分。

盒子本身的大小是这样计算的：

    Width = width + padding-left + padding-right + border-left + border-right
    Height = height + padding-top + padding-bottom + border-top + border-bottom

- **内容区域 content area** 是真正包含元素内容的区域。位于内容边界的内部，它的大小为内容宽度 或 _content-box_ 宽及内容高度或 _content-box_ 高。

    如果 [`box-sizing`](https://developer.mozilla.org/zh-CN/docs/CSS/box-sizing "") 为默认值， [`width`](https://developer.mozilla.org/zh-CN/docs/CSS/width ""), [`min-width`](https://developer.mozilla.org/zh-CN/docs/CSS/min-width ""), [`max-width`](https://developer.mozilla.org/zh-CN/docs/CSS/max-width ""), [`height`](https://developer.mozilla.org/zh-CN/docs/CSS/height ""), [`min-height`](https://developer.mozilla.org/zh-CN/docs/CSS/min-height "") 与 [`max-height`](https://developer.mozilla.org/zh-CN/docs/CSS/max-height "") 控制内容大小。

- **内边距区域 padding area** 用内容及可能的边框之间的空白区域扩展内容区域。

    内边距与内容边界之间的空间可以由 [`padding-top`](https://developer.mozilla.org/zh-CN/docs/CSS/padding-top ""), [`padding-right`](https://developer.mozilla.org/zh-CN/docs/CSS/padding-right ""), [`padding-bottom`](https://developer.mozilla.org/zh-CN/docs/CSS/padding-bottom ""), [`padding-left`](https://developer.mozilla.org/zh-CN/docs/CSS/padding-left "") 和简写属性 [`padding`](https://developer.mozilla.org/zh-CN/docs/CSS/padding "") 控制。

- **边框区域 border area** 是包含边框的区域，扩展了内边距区域。它位于边框边界内部，大小为 _border-box_ 宽和 _border-box_ 高。由 [`border-width`](https://developer.mozilla.org/zh-CN/docs/CSS/border-width "") 及简写属性 [`border`](https://developer.mozilla.org/zh-CN/docs/CSS/border "")控制。

- **外边距区域 margin area** 用空白区域扩展边框区域，以分开相邻的元素。它的大小为 _margin-box_ 的高宽。

    外边距区域大小由 [`margin-top`](https://developer.mozilla.org/zh-CN/docs/CSS/margin-top ""), [`margin-right`](https://developer.mozilla.org/zh-CN/docs/CSS/margin-right ""), [`margin-bottom`](https://developer.mozilla.org/zh-CN/docs/CSS/margin-bottom ""), [`margin-left`](https://developer.mozilla.org/zh-CN/docs/CSS/margin-left "") 及简写属性 [`margin`](https://developer.mozilla.org/zh-CN/docs/CSS/margin "") 控制。

    在 [外边距合并](https://developer.mozilla.org/en/CSS/margin_collapsing "en/CSS/margin_collapsing") 的情况下，由于盒之间共享外边距，外边距不容易弄清楚。

    最后注意，对于行内非替换元素，其占用空间（行高）由 [`line-height`](https://developer.mozilla.org/zh-CN/docs/CSS/line-height "") 决定，即使有内边距与边框。

当你设置了元素的宽度，实际展现的元素却能够超出你的设置：因为元素的边框和内边距会撑开元素。看下面的例子，两个相同宽度的元素显示的实际宽度却不一样。

<div data-height="268" data-theme-id="0" data-slug-hash="AazLm" data-default-tab="html" class='codepen'><pre><code>&lt;div class=&quot;simple&quot;&gt;
    我小一些
&lt;/div&gt;

&lt;div class=&quot;fancy&quot;&gt;
    我大一些
&lt;/div&gt;</code></pre>
<p>See the Pen <a href='http://codepen.io/JohnnyFee/pen/AazLm/'>AazLm</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div>

以前有一个代代相传的解决方案是数学。CSS开发者需要用比他们实际想要的宽度小一点的宽度，需要减去内边距和边框的宽度。

## box-sizing

经过了一代又一代人们意识到数学不好玩，所以他们新增了一个叫做 `box-sizing` 的CSS属性。当你设置一个元素为 `box-sizing: border-box;` 时，此元素的内边距和边框不再会增加它的宽度。

The box-sizing property in CSS controls how the "box model" is handled in regards to page layout. For instance, if you set an element to `width: 100px; padding: 20px; border: 5px solid black;` the resulting box is 150px wide. That is because the default box-sizing model is `content-box`, which behaves that way. Through the box-sizing property we can change that to `padding-box` (in which case the box would be 110px wide with 20px of padding on the inside), or `border-box` (in which case the box would be 100px wide with 10px of border and 20px of padding on the inside).

This is particularly useful on things like `<textarea>` which you need to explicitly set to 100% width if you want it to fill a parent container, but is also likely you want padding on. Without box-sizing, you would an elaborate faking strategy involving extra wrapper elements.

    textarea { 
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box;    /* Firefox, other Gecko */
        box-sizing: border-box;         /* Opera/IE 8+ */
    }

参考：[Box Sizing and Textarea](http://css-tricks.com/examples/BoxSizing/)

This also makes fluid/float/grid layouts a lot easier where you want to use percentages for the grids but with fixed pixel padding.

### Min / Max

Box-sizing should and does work with `min-width` / `max-width` / `min-height` / `max-height`.

## box-shadow

Used in casting shadows (often called "Drop Shadows", like in Photoshop) from elements. Here is an example with the deepest possible browser support:

    .shadow {
      -webkit-box-shadow: 3px 3px 5px 6px #ccc;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
      -moz-box-shadow:    3px 3px 5px 6px #ccc;  /* Firefox 3.5 - 3.6 */
      box-shadow:         3px 3px 5px 6px #ccc;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
    }

Thats:

    box-shadow: [horizontal offset] [vertical offset] [blur radius] [optional spread radius] [color];

1. **The horizontal offset** (required) of the shadow, positive means the shadow will be on the right of the box, a negative offset will put the shadow on the left of the box.
1. **The vertical offset** (required) of the shadow, a negative one means the box-shadow will be above the box, a positive one means the shadow will be below the box.
1. **The blur radius** (required), if set to 0 the shadow will be sharp, the higher the number, the more blurred it will be, and the further out the shadow will extend. For instance a shadow with 5px of horizontal offset that also has a 5px blur radius will be 10px of total shadow.
1. **The spread radius** (optional), positive values increase the size of the shadow, negative values decrease the size. Default is 0 (the shadow is same size as blur).
1. **Color** (required) - takes any color value, like hex, named, [rgba](http://css-tricks.com/rgba-browser-support/) or [hsla](http://css-tricks.com/yay-for-hsla/). If the color value is omitted, box shadows are drawn in the foreground color (text `color`). But be aware, older WebKit browsers (pre Chrome 20 and Safari 6) ignore the rule when color is omitted.

Using a semi-transparent color like `rgba(0, 0, 0, 0.4)` is most common, and a nice effect, as it doesn't completely/opaquely cover what it's over, but allows what's underneath to show through a bit, like a real shadow.

<p data-height="268" data-theme-id="0" data-slug-hash="mFrDt" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/mFrDt/'>box-shadow</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

### Inner Shadow

    .shadow {
       -moz-box-shadow:    inset 0 0 10px #000000;
       -webkit-box-shadow: inset 0 0 10px #000000;
       box-shadow:         inset 0 0 10px #000000;
    }

### One-Side Only

Using a negative spread radius, you can get squeeze in a box shadow and only push it off one edge of a box.

    .one-edge-shadow {
      -webkit-box-shadow: 0 8px 6px -6px black;
         -moz-box-shadow: 0 8px 6px -6px black;
              box-shadow: 0 8px 6px -6px black;
    }

<p data-height="268" data-theme-id="0" data-slug-hash="xzAEK" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/xzAEK/'>xzAEK</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

### Internet Explorer (8 and down) Box Shadow

You need an extra element, but it's do-able with `filter`.

    <div class="shadow1">
      <div class="content">
        Box-shadowed element
      </div>
    </div>

    .shadow1 {
      margin: 40px;
      background-color: rgb(68,68,68); /* Needed for IEs */
    
      -moz-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
      -webkit-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
      box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
    
      filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30);
      -ms-filter: "progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)";
      zoom: 1;
    }
    .shadow1 .content {
      position: relative; /* This protects the inner element from being blurred */
      padding: 100px;
      background-color: #DDD;
    }

## Reference

- [盒模型 - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box_model)
- [The CSS Box Model](http://css-tricks.com/the-css-box-model/)
- [视觉格式化模型 - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Visual_formatting_model)
- [KB006: CSS 框模型( Box module ) - W3Help](http://www.w3help.org/zh-cn/kb/006/)
- [box-sizing](http://css-tricks.com/almanac/properties/b/box-sizing/)
- [Box Sizing](http://css-tricks.com/box-sizing/)
- [box-shadow](http://css-tricks.com/almanac/properties/b/box-shadow/)

<script async src="//codepen.io/assets/embed/ei.js"></script>
