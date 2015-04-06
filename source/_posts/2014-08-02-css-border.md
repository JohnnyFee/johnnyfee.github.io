layout: post
title: "Css Border"
category: CSS
tags: [web, css]
---

## border

页面中的每个元素都是矩形盒子，达到根元素 `html`，小到 `i` 元素。你可以使用 `border` 属性对所有这些矩形盒子应用边框。比如：

```css
.box {
  width: 200px;
  height: 100px;
  border: 3px solid red;
  background: #eee;
}
```

<!-- more -->

以上使用的是简写语法, 格式为:

    border:  <border-width> || <border-style> || <color>

这也可以使用单个属性描述：

    .box {
      border-width: 3px;   /* defaults to medium */
      border-color: red;   /* defaults to color (literally, the color property) */
      border-style: solid; /* defaults to none */
    }

你可以使用 border-top[/bottom/left/right]-with[/color/style/radius] 来设置某一条边的样式。

## border-style

所有边框样式如表：

style    | demo    | description                   
--------| ---------------| -----
`none`   | <div style="margin: 0.5em; width: 3em; height: 3em; border-width: 3px; border-style: none; background-color: palegreen;"></div>   | Like for the `hidden` keyword, displays no border. In that case, except if a background image is set, the calculated values of [`border-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width) will be `0`, even if specified otherwise through the property. In case of table cell and border collapsing, the `none` value has the lowest priority: it means that if any other conflicting border is set, it will be displayed.  
`hidden` | <div style="margin: 0.5em; width: 3em; height: 3em; border-width: 3px; border-style: hidden; background-color: palegreen;"></div> | Like for the `none` keyword, displays no border. In that case, except if a background image is set, the calculated values of [`border-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width) will be `0`, even if specified otherwise through the property. In case of table cell and border collapsing, the `hidden` value has the highest priority: it means that if any other conflicting border is set, it won't be displayed.
`dotted` | <div style="margin: 0.5em; width: 3em; height: 3em; border-width: 3px; border-style: dotted; background-color: palegreen;"></div> | Displays a series of rounded dots. The spacing of the dots are not defined by the specification and are implementation-specific. The radius of the dots is half the calculated [`border-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width).
`dashed` | <div style="margin: 0.5em; width: 3em; height: 3em; border-width: 3px; border-style: dashed; background-color: palegreen;"></div> | Displays a series of short square-ended dashes or line segments. The exact size and length of the segments are not defined by the specification and are implementation-specific.
`solid`  | <div style="margin: 0.5em; width: 3em; height: 3em; border-width: 3px; border-style: solid; background-color: palegreen;"></div>  | Displays a single, straight, solid line.
`double` | <div style="margin: 0.5em; width: 3em; height: 3em; border-width: 3px; border-style: double; background-color: palegreen;"></div> | Displays two straight lines that add up to the pixel amount defined as [`border-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width).
`groove` | <div style="margin: 0.5em; width: 3em; height: 3em; border-width: 3px; border-style: groove; background-color: palegreen;"></div> | Displays a border leading to a carved effect. It is the opposite of `ridge`.
`ridge`  | <div style="margin: 0.5em; width: 3em; height: 3em; border-width: 3px; border-style: ridge; background-color: palegreen;"></div>  | Displays a border with a 3D effect, like if it is coming out of the page. It is the opposite of `groove`.
`inset`  | <div style="margin: 0.5em; width: 3em; height: 3em; border-width: 3px; border-style: inset; background-color: palegreen;"></div>  | Displays a border that makes the box appear embedded. It is the opposite of `outset`. When applied to a table cell with [`border-collapse`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse) set to `collapsed`, this value behaves like `groove`.
`outset` | <div style="margin: 0.5em; width: 3em; height: 3em; border-width: 3px; border-style: outset; background-color: palegreen;"></div> | Displays a border that makes the box appear in 3D, embossed. It is the opposite of `inset`. When applied to a table cell with [`border-collapse`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse) set to `collapsed`, this value behaves like `ridge`.

## border-radius

`border-radius` 属性用来描述元素边框的圆角半径。你只需要注意颜色是否有变化，比如，要注意让元素的背景色或者边框颜色和元素周围的颜色不一样。

<div data-height="326" data-theme-id="0" data-slug-hash="jmyco" data-default-tab="result" class='codepen'>
<p>See the Pen <a href='http://codepen.io/JohnnyFee/pen/jmyco/'>border-radius</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div>

如果元素有背景图片，背景图片也会拥有指定的圆角。

<p data-height="219" data-theme-id="0" data-slug-hash="nqsfF" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/nqsfF/'>nqsfF</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

如果你发现边框外边的背景色有毛边（See [Sneak — Fixing the background 'bleed'](http://tumble.sneak.co.nz/post/928998513/fixing-the-background-bleed)），可以使用 `background-clip` 属性来避免：

```css
.round {
  border-radius: 10px;

  /* Prevent background color leak outs */
  -webkit-background-clip: padding-box; 
  -moz-background-clip:    padding; 
  background-clip:         padding-box;
}
```

如果 `border-radius` 只有一个值，这个值将应用到所有的四个角，你也可以单独为每个角指定圆角：

```css
.round {
   border-radius: 5px 10px 15px 20px; /* top left, top right, bottom right, bottom left */
}
```

你还可以使用 2 个或 3 个值，The Mozilla Docs explains it best:

- If **one** value is set, this radius applies to**all 4 corners**.  
- If **two** values are set, the**first**applies to `top-left` and `bottom-right` corner, the **second** applies to `top-right` and `bottom-left` corner.
- **Three** values: The second value applies to `top-right` and also `bottom-left`.
- **Four** values apply to the `top-left`, `top-right`, `bottom-right`, `bottom-left` corner in that order.  

Like:

```css
#example-four {
  border-radius: 5px 20px 5px;
  background: #BADA55;
}
```

边框的圆角半径包含垂直半径和水平半径，你可是使用 "/" 来同时指定两个半径，如果两个值相等，则是圆角，否则为椭圆角。如果垂直半径和水平半径相等，则可以省略 "/"，只写一个值。

<p data-height="268" data-theme-id="0" data-slug-hash="zExoB" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/zExoB/'>zExoB</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

**Note:** Firefox only supported elliptical borders in 3.5+ and older WebKit browsers (e.g. Safari 4) incorrectly treat "40px 10px" as the same as "40px/10px". 

你可以使用百分比来指定 `border-radius`，这对你创建圆形、椭圆或其他[形状](http://css-tricks.com/examples/ShapesOfCSS/)时非常有用，不用每次因为元素的长宽发生变化而修改 `border-radius`。

<div data-height="268" data-theme-id="0" data-slug-hash="Igchn" data-default-tab="result" class='codepen'>
<p>See the Pen <a href='http://codepen.io/JohnnyFee/pen/Igchn/'>Igchn</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div>

**Note:** In Safari percentage values for border-radius only supported in 5.1+. In Opera, only supported in 11.5+.

你可是使用边框样式画出一些图形，如 [The Shapes of CSS](http://css-tricks.com/examples/ShapesOfCSS/)。

## border-image

`border-image` 使你可以用图片来绘制元素的边框。这不是简单地把图片置于背景区。`border-image` 会把你指定的图片按照你指定的切分方法划分成 9 块，成井子格，然后把井子格的四个角置于元素的四个角，中间的部分分别置于元素的四条边上，你可以指定图片的四边以拉伸或者重复的方式来填充元素的四边。

### The basic idea

`border-image` 的简写属性有 3 个部分:

    border-image: url(border-image.png) 25% repeat;

![](http://cdn.css-tricks.com/wp-content/uploads/2010/07/borderimagecss.png "borderimagecss")

实际上，三部分允许你指定：

1. 用于边框的图片。
2. 切割图片的位置，这个位置用于把图片划分为 9 块。
3. 浏览器如何将这些块应用到元素的边上。

也可以使用单独的属性，以下为是他们的默认属性:

```css
div {
  border-image-source: none;
  border-image-slice: 100%;
  border-image-width: 1;
  border-image-outset: 0;
  border-image-repeat: stretch;
}
```

使用简单语法的实例:

```css
div {
  border-image: url("image.png") 25 30 10 20 repeat stretch;
}
```

别忘了给元素指定边框来让图片得以应用。

### The pertinent details

Let's look at each part of the process in a little more detail. The first part is easy, and is familiar from the background-image property. For demonstration purposes I'll use this image, which is 100px x 100px:

![A border-image](http://www.norabrowndesign.com/css-experiments/images/border-image.png)

### Slicing your image

The second part can have from one to four values, much like the border-width property, and they are specified in the same order: top, right, bottom, left. You can use percentages or pixels. Strangely, the percentages require the "%", while pixels should be listed _without the "px"_:

    border-image: url(my-image.gif) 25% 30% 10% 20% repeat;
    border-image: url(my-image.gif) 25 30 10 20 repeat;

In this case, since my image is 100px x 100px, the two rules above are equivalent - they slice the image in the same places. I've added some dimensions on my image to demonstrate:

![A border-image](http://www.norabrowndesign.com/css-experiments/images/border-image-marked.png)

### Repeat, Round, Stretch

border-image will always place the corner sections of your image into the corresponding corners of your element box, but the third part of the shorthand rule tells the browser how to treat the middle sections of your image -- the ones that will go along the edges of your element. Repeat (repeat, or tile, the image) and stretch (stretch, or scale, the image) are pretty self-explanatory. Round means tile the image but only so that a whole number of tiles fit, and otherwise scale the image. Right now, Safari and Chrome interpret round as repeat. 

There can be up to two values: one for the top and bottom edges of the element, and one for the left and right. Here's an example with the top/bottom value set to repeat, and the left/right value set to stretch:

<div data-height="300" data-theme-id="0" data-slug-hash="defzL" data-default-tab="css" class='codepen'><pre><code>#example-one {
    border-width:25px 30px 10px 20px;
    -moz-border-image:url(&quot;border-image.png&quot;) 25 30 10 20 repeat stretch;
    -webkit-border-image:url(&quot;border-image.png&quot;) 25 30 10 20 repeat stretch;
    border-image:url(&quot;http://www.norabrowndesign.com/css-experiments/images/border-image-marked.png&quot;) 25 30 10 20 repeat stretch;
  
  height:200px
}</code></pre>
<p>See the Pen <a href='http://codepen.io/JohnnyFee/pen/defzL/'>defzL</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div>

Or you can specify each width individually (in this example I've specified widths such that the image slices aren't scaled at all):

    #example-three {
        border-color:orange;
        border-style:double;
        border-width:25px 30px 10px 20px;
        -moz-border-image:url("border-image.png") 25 30 10 20 repeat;
        -webkit-border-image:url("border-image.png") 25 30 10 20 repeat;
        border-image:url("border-image.png") 25 30 10 20 repeat;
    }

### Browser quirks

Predictably, IE doesn't understand anything of border-image. Browsers that _do_ support border-image only support the shorthand property, not all the individual properties that are [described in the spec](http://www.w3.org/TR/css3-background/#border-images). Some potentially useful properties aren't supported at all, especially border-image-outset, which would solve [this problem.](http://www.norabrowndesign.com/css-experiments/border-image-frame.html#one "Demonstration of border-image-outset issue")

Also, the default behavior is supposed to be to _discard_ the center section of the image, and use the 'fill' keyword on the border-image-slice property to preserve it:

> The ‘fill’ keyword, if present, causes the middle part of the border-image to be preserved. (By default it is discarded, i.e., treated as empty.) ([> Read the spec](http://www.w3.org/TR/css3-background/#border-image-slice)> )

But the current browser behavior is to preserve the middle, and there is no way to turn it off. Thus, if you don't want your element's content area to have a background, the center section of your image must be empty. However, you can use this filling behavior to your advantage, to create a [box with a fancy border and background](http://www.norabrowndesign.com/css-experiments/border-image-frame.html#two), with only one image.

### Example

- [CSS3 Border Image Experiments : Nora Brown Design](http://www.norabrowndesign.com/css-experiments/border-image-anim.html)


## outline

The `outline` property in CSS draws a line around the outside of an element. It's similar to [border](http://css-tricks.com/almanac/properties/b/border/) except that:

1. It always goes around all the sides, you can't specify particular sides
1. It's not a part of the box model, so it won't effect the position of the element or adjacent elements

Other minor facts include that it doesn't respect [border-radius](http://css-tricks.com/almanac/properties/b/border-radius/) (makes sense I suppose as it's not a border) and that it isn't always rectangular. If the outline goes around an inline element with different font-sizes, for instance, Opera will draw a staggered box around it all.

It is often used for accessibility reasons, to emphasize a link when tabbed to without affecting positioning and in a differnet way than hover.

    a:active {
      outline: 1px dashed red;
    }

The shorthand being:

    outline: [ <outline-width> || <outline-style> || <outline-color> ] | inherit

It takes the same properties as border, but with "outline-" instead.

The above shorthand could have been written:

    a:active {
      outline-width: 1px;
      outline-style: dashed;
      outline-color: red;
    }

## border-collapse

The `border-collapse` property is for use on `<table>` elements (or elements made to behave like a table through `display: table` or `display: inline-table`). There are two values:

* **separate** (default) - in which all table cells have their own independent borders and there may be space between those cells as well.
* **collapse** - in which both the space and the borders between table cells collapse so there is only one border and no space between cells.

```
table {
  border-collapse: separate; /* Or do nothing, this is default */
  border-spacing: 3px; /* Only works if border-collapse is separate */
}
```

<p data-height="268" data-theme-id="0" data-slug-hash="xFAyk" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/xFAyk/'>border-collapse</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

    table {
      border-collapse: collapse;
    } 

## border-shadow


### Demo

- [Squishy Toggle Buttons](http://codepen.io/soulwire/pen/bKens)

## tools

- [Quick tool for generating border radius code](http://border-radius.com/)
- [In search of the perfect radius](http://radesign.in/in-search-of-the-perfect-radius/)

## tutorial

- [How To Add Realism With CSS Box Shadow And Text Shadow - Vanseo Design](http://www.vanseodesign.com/css/shadows/)

## Reference

- [border](http://css-tricks.com/almanac/properties/b/border/)
- [border-radius](http://css-tricks.com/almanac/properties/b/border-radius/)
- [border-image](http://css-tricks.com/almanac/properties/b/border-image/)
- [border-collapse](http://css-tricks.com/almanac/properties/b/border-collapse/)
- [Understanding border-image](http://css-tricks.com/understanding-border-image/)
- [outline](http://css-tricks.com/almanac/properties/o/outline/)
- [#95: A Tale of Border Gradients](http://css-tricks.com/video-screencasts/95-a-tale-of-border-gradients/)
- [border-style - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style)

<script async src="//codepen.io/assets/embed/ei.js"></script>
