---
layout: post
title: "CSS Layout —— Position"
category: CSS
tags: [web, css, layout]
--- 

## position

The `position` value in CSS deals with layout and manipulating elements to be in your desired visual place. There are only the five values shown above, and really only three since static and inherit are fairly rarely needed for this property.

### static

```css
.static {
  position: static;
}
```

static 是默认值。任意 position: static; 的元素不会被特殊的定位。一个 static 元素表示它不会被 `positioned`，一个 position 属性被设置为其他值的元素表示它会被`positioned`。此时，设置 left/right/top/bottom/z-index 等属性无效。

<!--more-->

### relative

```css
.relative1 {
  position: relative;
}
.relative2 {
  position: relative;
  top: -20px;
  left: 20px;
  background-color: white;
  width: 500px;
}
```

在一个相对定位（position属性的值为relative）的元素上设置 top 、 right 、 bottom 和 left 属性会使其偏离其 _原始位置_（original position）。其他的元素不会调整位置来弥补它偏离后剩下的空隙。如果不设置这些属性，`relative` 表现的和 `static` 一样，除非你添加了一些额外的属性。元素的原始位置像 static 一样，仍然在 _文档流_ 中。

![relativeposition.png](http://johnnyimages.qiniudn.com/relativeposition.png)

### fixed

position 标志为 fixed 的元素将从文档流中删除，换句话说，对于其他元素来说，它是不存在的。一个固定定位（position 属性的值为 fixed）元素总是相对于视窗来定位，位置不受滚动条的影响。和 relative 一样， top 、 right 、 bottom 和 left 属性都可用。

如，可以使用以下 CSS 把一个 div 定在右下角：

```css
.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 200px;
  background-color: white;
}
```

令人惊讶地是移动浏览器对 fixed 的支持很差。[这里有相应的解决方案](http://bradfrostweb.com/blog/mobile/fixed-position/)。

### absolute

absolute 与 fixed 的表现类似，除了它不是相对于视窗而是相对于最近的 __positioned 祖先元素__，并且它会随着页面滚动而移动。如果绝对定位（absolute）的元素没有 positioned 祖先元素，那么它是相对于文档的 body 元素。记住一个 `positioned` 元素是指 position 值不是 static 的元素。

`posistion` 值为 `absolute` 时，也会从文档流中删除。

这里有一个简单的例子：

Note that:

1. without a width set, the element will stretch only as wide as the content it contains.
2. you can set, for instance, both a left and right value and the element will stretch to touch both points. So you can fill a screen by setting `top: 0; left: 0; bottom: 0; right: 0;`

![css-layout-positionabsolute.png](http://johnnyimages.qiniudn.com/css-layout-positionabsolute.png)

例：

```html
<body style="background: yellow;">
    <div style="background: #fff">
        A
        <div style="background: #81b6ff">
            A - 1
            <div style="background: #b6ff00;">
                A - 2
            </div>
        </div>
    </div>
</body>
```

没有设置任何元素的 `position` 属性：

![css-layout-no-position.png ](http://johnnyimages.qiniudn.com/css-layout-no-position.png )

现在我们对A-2这个div设置绝对定位(Top: 0, Left: 0)，而没有对它的父元素（A、A-1）设置任何的position值:

```html
...
<div style="background: #b6ff00; position: absolute; top: 0; left: 0;">
  A - 2
</div>
...
```

![css-layout-absolute.png](http://johnnyimages.qiniudn.com/css-layout-absolute.png)

可以看到（A-2）最终是根据body来产生了位移，让我们对比分别设置一下父元素position。

![css-layout-aboluste-parent.png](http://johnnyimages.qiniudn.com/css-layout-aboluste-parent.png)

__几个结论：__

1. 块状元素在 `position(relative/static)`的情况下 `width` 为100%，但是设置了 `position: absolute` 之后，会将 `width` 变成 `auto`（会受到父元素的宽度影响）。

1. 元素设置了 `position: absolute` 之后，如果没有设置 `top`、`bottom`、`left`、`right` 属性的话，浏览器会默认设置成auto，而auto的值则是该元素的“默认位置”。即设置 `position: absolute` 前后的 `offsetTop` 和 `offsetLeft` 属性值不变。  
特殊情况：

    * Firefox的话会直接将 `top`、`left` 设置成 `offsetTop` 和 `offsetLeft` 的值而非 `auto。`
    * IE7下的表现更类似于 `float`，会附加到父元素的末尾。

    ![css-layout-absolute-position.png](http://johnnyimages.qiniudn.com/css-layout-absolute-position.png)

1. 应用了position: relative/absolute的元素，margin属性仍然有效，以position:relative来举例。如果设置了left、top、bottom、right的属性，建议大家不要设置margin数据，因为很难精确元素的定位，尽量减少干扰因素。

    ![css-layout-postion-margin.png](http://johnnyimages.qiniudn.com/css-layout-postion-margin.png)

1. position: absolute忽略根元素的padding。

        <div style="background: #fff; width: 200px;">A
          <div style="background: #81b6ff; width: 150px; position: relative; padding-top: 100px;">A - 1
              <div style="background: #b6ff00; position: absolute; left: 0; top: 0">A - 2
              </div>
          </div>
        </div>

     ![css-layout-position-padding.png](http://johnnyimages.qiniudn.com/css-layout-position-padding.png)

1. 在IE6/7中设置position属性后会导致z-index属性失效。

        <!-- 解决方案，父元素设置一个更大的z-index值即可 -->
        <div style="z-index: 2;">
          a
            <div style="position: relative; z-index: 1;">
              b
            </div>
        </div>

1. 行内元素在应用了position：absolute之后会改变display。

        <span style="position: absolute; width: 100px; height: 100px; top: 10px; left: 10px; background: #fff;">
                我的display属性由inline变成了block
        </span>

    因此，要注意到relative是并没有改变行内元素的呈现模式，而absolute是会改变行内元素的呈现模式，如果设置了absolute并不需要显式的的将元素display改成block

1. 应用了position: absolute / relative之后，会覆盖其他非定位元素（即position为static的元素），如果你不想覆盖到其他元素，也可以将z-index设置成-1。

    ![css-layout-absolute-z-index.png](http://johnnyimages.qiniudn.com/css-layout-absolute-z-index.png)

### Inherit

The position value doesn't cascade, so this can be used to specifically force it to, and inherit the positioning value from its parent.

## Tutorial

- [How Does Auto Positioning Work In CSS? - Vanseo Design](http://www.vanseodesign.com/css/auto-positioning/)

## 应用

### 100% 宽高

```css
.pane, .view {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

## Demo

<p data-height="600" data-theme-id="0" data-slug-hash="Kcgpj" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/Kcgpj/'>position-layout</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Library

- [HubSpot/drop](https://github.com/HubSpot/drop/) 用于创建下拉和浮动元素。 <http://github.hubspot.com/drop/docs/welcome>
- [HubSpot/tether](https://github.com/HubSpot/tether) A positioning engine to make overlays, tooltips and dropdowns faster #hubspot-open-source. <http://tether.io>

## Reference

- [position](http://css-tricks.com/almanac/properties/p/position/)
- [学习CSS布局](http://zh.learnlayout.com/)

<script async src="//codepen.io/assets/embed/ei.js"></script>
