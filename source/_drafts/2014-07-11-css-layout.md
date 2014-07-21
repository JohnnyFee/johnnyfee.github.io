---
layout: post
title: "CSS Layout"
category: Web
tags: [web, css, layout]
--- 

- [CSS - position](http://zh.learnlayout.com/position.html)
- [CSS 布局:40个教程、技巧、例子和最佳实践](http://coolshell.cn/articles/6840.html)
- [使用 CSS 弹性盒 - CSS](https://developer.mozilla.org/zh-CN/docs/CSS/Tutorials/Using_CSS_flexible_boxes)
- [学习CSS布局](http://zh.learnlayout.com/)
- [Are We Ready to Use Flexbox?](http://www.sitepoint.com/are-we-ready-to-use-flexbox)

## display

Every element on a web page is a rectangular box. The display property in CSS determines just how that rectangular box behaves. There are only a handful of values that are commonly used:

```css
div {
  display: inline;        /* Default of all elements, unless UA stylesheet overrides */
  display: inline-block;  /* Characteristics of block, but sits on a line */
  display: block;         /* UA stylesheet makes things like <div> and <section> block */
  display: run-in;        /* Not particularly well supported or common */
  display: none;          /* Hide */
}
```

The default value for all elements is inline. Most "User Agent stylesheets" (the default styles the browser applies to all sites) reset many elements to "block". Let's go through each of these, and then cover some of the other less common values.

经过浏览器的 UA 处理后，每个元素都有一个默认的 `display` 值，这与元素的类型有关。对于大多数元素它们的默认值通常是 `block` 或 `inline` 。一个 `block` 元素通常被叫做块级元素。一个 `inline` 元素通常被叫做行内元素。

虽然每个元素都有一个默认的 `display` 类型，不过你可以随时随地的重写它。常见的例子是：把 `li` 元素修改成 `inline`，制作成水平菜单。

### block

`div` 是一个标准的块级元素。一个块级元素会新开始一行并且尽可能撑满容器。其他常用的块级元素包括 `p` 、 `form` 和HTML5中的新元素： `header` 、 `footer` 、 `section` 等等。

### inline

`span` 是一个标准的行内元素。一个行内元素可以在段落中 `<span>` <span style="border:1px solid #FFCCD1">像这样</span> `</span>`包裹一些文字而不会打乱段落的布局。 其他常见的行内元素如：`<em>`, `<b>` 等。

An inline element will accept margin and padding, but the element still sits inline as you might expect. Margin and padding will only push other elements horizontally away, not vertically.

![css-layout-inlinepadding.png](http://johnnyimages.qiniudn.com/css-layout-inlinepadding.png)

An inline element will not accept height and width. It will just ignore it.

### Inline Block

An element set to `inline-block` is very similar to inline in that it will set inline with the natural flow of text (on the "baseline"). The difference is that you are able to set a `width` and `height` which will be respected.

![inline-block.png ](http://johnnyimages.qiniudn.com/inline-block.png)

### none

另一个常用的display值是 `none` 。一些特殊元素的默认 `display` 值是它，例如 `script` 。 `display:none` 通常被 JavaScript 用来在不删除元素的情况下隐藏或显示元素。 

它和 `visibility` 属性不一样。把 `display` 设置成 `none` 不会保留元素本该显示的空间，但是 `visibility: hidden`; 还会保留。

### Table Values

There is a whole set of display values the force non-table elements to behave like table-elements, if you need that to happen. It's rare-ish, but it sometimes allows you to be "more semantic" with your code while utilizing the unique positioning powers of tables.

```css
div {
  display: table;
  display: table-cell;
  display: table-column;
  display: table-colgroup;
  display: table-header-group;
  display: table-row-group;
  display: table-footer-group;
  display: table-row;
  display: table-caption;
}
```

To use, just mimic normal table structure. Simple example:

```html
<div style="display: table;">
  <div style="display: table-row;">
    <div style="display: table-cell;">
      Gross but sometimes useful.
    </div>
  </div>
</div>
```

### more

- [display](http://css-tricks.com/almanac/properties/d/display/)
- [display - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/display)

## margin

设置块级元素的 `width` 可以阻止它从左到右撑满容器，然后你就可以设置左右外边距为 `auto` 来使其水平居中。元素会占据你所指定的宽度，然后剩余的宽度会一分为二成为左右外边距。

```css
#main {
  width: 600px;
  margin: 0 auto; 
}
```

唯一的问题是，当浏览器窗口比元素的宽度还要窄时，浏览器会显示一个水平滚动条来容纳页面。让我们再来改进下这个方案：

```css
#main {
  max-width: 600px;
  margin: 0 auto; 
}
```

在这种情况下使用 `max-width` 替代 `width` 可以使浏览器更好地处理小窗口的情况。这点在移动设备上显得尤为重要。

<div style="max-width:600px; margin: 0 auto; border: 1px solid #9979D1">
    所有的结局都已写好<br/>
    所有的泪水也都已启程<br/>
    却忽然忘了是怎么样的一个开始<br/>
    在那个古老的不再回来的夏日<br/>
</div>

顺便提下， 所有的主流浏览器包括IE7+在内都支持 max-width ，所以放心大胆的用吧。

## float

Floated elements _remain a part of the flow of the web page_.  There are four valid values for the float property. The values `left` and `right` float elements those directions respectively. The value `none` (default) tells the element not to float either direction and `inherit` which will assume the float value from that elements parent element.

**Note:** 

1. An element that is floated is automatically `display: block;`
2. float 只有横向浮动，没有纵向浮动。
3. 容器如果没有明确设定高度，会依照普通流内元素高度设置，这样就会导致脱离普通流的浮动元素溢出容器。

    ![](http://css-tricks.com/wp-content/csstricks-uploads/collapse.png)

4. 浮动元素的后一个元素会围绕着浮动元素（典型运用是文字围绕图片），浮动元素的前一个元素不会受到任何影响，如果你想让两个块状元素并排显示，必须让两个块状元素都应用float。

Floats are also helpful for layout in smaller instances. Take for example this little area of a web page. If we use float for our little avatar image, when that image changes size the text in the box will reflow to accommodate:

![](http://css-tricks.com/wp-content/csstricks-uploads/reflow-example-1.png)

This same layout could be accomplished using relative positioning on container and absolute positioning on the avatar as well. In doing it this way, the text would be unaffected by the avatar and not be able to reflow on a size change.

![](http://css-tricks.com/wp-content/csstricks-uploads/reflow-example-2.png)

另一个布局中常用的CSS属性是 `float` 。Float 可用于实现文字环绕图片，如下：

```
img {
  float: right;
  margin: 0 0 1em 1em;
}
```

__参考:__

- [float](http://css-tricks.com/almanac/properties/f/float/)

### clear

Float's sister property is `clear`. An element that has the clear property set on it will not move up adjacent to the float like the float desires, but will move itself down past the float. Again an illustration is more helpful than words:

![](http://css-tricks.com/wp-content/csstricks-uploads/unclearedfooter.png)

In the above example, the sidebar is floated to the right and is shorter than the main content area. The footer then is required to jump up into that available space as is required by the float. To fix this problem, the footer can be cleared to ensure it stays beneath both floated columns.

    #footer {
       clear: both;     
    }

![](http://css-tricks.com/wp-content/csstricks-uploads/clearedfooter.png)

Clear has four valid values as well. The value `both` is most commonly used, which clears floats coming from either direction. The values `Left` and `Right` can be used to only clear the float from one direction respectively. The value `none` (default), which is typically unnecessary unless explicitly removing a clear value that has been set. The value **inherit** would be the fifth, but is strangely not supported in Internet Explorer. Clearing only the `left` or `right` float, while less commonly seen in the wild, definitely has its uses.

![](http://css-tricks.com/wp-content/csstricks-uploads/directionalclearing.png)

Collapsing almost always needs to be dealt with to prevent strange layout and cross-browser problems. We fix it by clearing the float **after** the floated elements in the container but **before** the close of the container.

### Techniques for Clearing Floats

* **The Empty Div Method** is, quite literally, an empty div. `<div style="clear: both;"></div>`. Sometimes you'll see a `<br />` element or some other random element used, but div is the most common because it has no brower default styling, doesn't have any special function, and is unlikely to be generically styled with CSS. This method is scorned by semantic purists since its presence has no contexual meaning at all to the page and is there purely for presentation. Of course in the strictest sense they are right, but it gets the job done right and doesn't hurt anybody.

        <div> 
            <div style="float:left">left浮动</div> 
            <div style="float:right">right浮动</div> 
            <div style="clear: both;"></div> 
        </div>

* **The Overflow Method** relies on setting the overflow CSS property on a parent element. 
    If this property is set to auto or hidden on the parent element, the parent will expand to contain the floats, effectively clearing it for succeeding elements. This method can be beautifully semantic as it may not require an additional elements. However if you find yourself adding a new div just to apply this, it is equally as unsemantic as the empty div method and less adaptable. Also bear in mind that the overflow property isn't specifically for clearing floats. Be careful not to hide content or trigger unwanted scrollbars.

        <div style="overflow: hidden"> 
            <div style="float:left">left浮动</div> 
            <div style="float:right">right浮动</div> 
        </div>

* **The Easy Clearing Method** (otherwise known as "clearfix") uses a clever CSS pseudo selector (`:after`) to clear floats. Rather than setting the overflow on the parent, you apply an additional class like "clearfix" to it. Then apply this CSS: 

        .clearfix:after { 
           content: ""; 
           visibility: hidden; 
           display: block; 
           height: 0; 
           clear: both;
        }

        <div class="clearfix"> 
            <div style="float:left">left浮动</div> 
            <div style="float:right">right浮动</div> 
        </div>

This will apply a small bit of content, hidden from view, after the parent element which clears the float. This isn't quite the [whole story](http://www.positioniseverything.net/easyclearing.html), as additional code needs to be used to accomodate for older browsers. **Note:** Also see [this snippet](http://css-tricks.com/snippets/css/clear-fix/) which keeps track of the latest and greatest in clearfixes, including the newer "micro clearfix."

Different scenarios call for different float clearning methods. Take for example a grid of blocks, each of different types.

![](http://css-tricks.com/wp-content/csstricks-uploads/grid-blocks.png)

To better visually connect the similar blocks, we want to start a new row as we please, in this case when the color changes. We could use either the overflow or easy clearing method if each of the color groups had a parent element. Or, we use the empty div method in between each group. Three wrapping divs that didn't previously exist or three after divs that didn't previously exist. I'll let you decide which is better.

![](http://css-tricks.com/wp-content/csstricks-uploads/grid-blocks-cleared.png)

### 与position的兼容性问题

1. 元素同时应用了position: relative、float、（top / left / bottom / right）属性后，则元素先浮动到相应的位置，然后再根据（top / left / bottom / right）所设置的距离来发生偏移。
2. 元素同时应用了position: absolute及float属性，则float失效。

### Problems with Floats

Floats often get beat on for being _fragile_. The majority of this fragility comes from IE 6 and the slew of float-related bugs it has. As more and more designers are dropping support for IE 6, you may not care, but for the folks that do care here is a quick rundown.

* **Pushdown** is a symptom of an element inside a floated item being _wider than the float itself_ (typically an image). Most browsers will render the image outside the float, but not have the part sticking out affect other layout. IE will expand the float to contain the image, often drastically affecting layout. A common example is an image sticking out of the main content push the sidebar down below. 

![](http://css-tricks.com/wp-content/csstricks-uploads/pushdown2.png)

_Quick fix:_ Make sure you don't have any images that do this, use overflow: hidden to cut off excess.
* **Double Margin Bug** - Another thing to remember when dealing with IE 6 is that if you apply a margin in the same direction as the float, it will [double the margin](http://www.cssnewbie.com/double-margin-float-bug/). _Quick fix:_ set `display: inline` on the float, and don't worry it will remain a block-level element.
* The **3px Jog** is when text that is up next to a floated element is mysteriously kicked away by 3px like a weird forcefield around the float. _Quick fix:_ set a width or height on the affected text.
* In IE 7, the **Bottom Margin Bug** is when if a floated parent has floated children inside it, bottom margin on those children is ignored by the parent. _Quick fix:_ using bottom padding on the parent instead.


## Box Model

在我们讨论宽度的时候，我们应该讲下与它相关的一个重点知识：盒模型。当你设置了元素的宽度，实际展现的元素却能够超出你的设置：因为元素的边框和内边距会撑开元素。看下面的例子，两个相同宽度的元素显示的实际宽度却不一样。

```css
.simple {
  width: 500px;
  margin: 20px auto;
}

.fancy {
  width: 500px;
  margin: 20px auto;
  padding: 50px;
  border-width: 10px;
}
```

<div style="border: 1px solid #BFAEFC;width: 500px;margin: 20px auto;">
    我小一些
</div>

<div style="border: 1px solid #87ACF2;
  width: 500px;
  margin: 20px auto;
  padding: 50px;
  border-width: 10px;">
    我大一些
</div>

以前有一个代代相传的解决方案是数学。CSS开发者需要用比他们实际想要的宽度小一点的宽度，需要减去内边距和边框的宽度。

经过了一代又一代人们意识到数学不好玩，所以他们新增了一个叫做 `box-sizing` 的CSS属性。当你设置一个元素为 `box-sizing: border-box;` 时，此元素的内边距和边框不再会增加它的宽度。这里有一个与前一页相同的例子，唯一的区别是两个元素都设置了 `box-sizing: border-box;` ：

```css
.simple {
  width: 500px;
  margin: 20px auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}

.fancy {
  width: 500px;
  margin: 20px auto;
  padding: 50px;
  border: solid blue 10px;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
```

现在两个 div 的宽度相同了。

既然没有比这更好的方法，一些CSS开发者想要页面上所有的元素都有如此表现。所以开发者们把以下CSS代码放在他们页面上：

```css
* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
```

这样可以确保所有的元素都会用这种更直观的方式排版。 

既然 box-sizing 是个很新的属性，目前你还应该像我之前在例子中那样使用 -webkit- 和 -moz- 前缀。这可以启用特定浏览器实验中的特性。同时记住它支持[IE8+](http://caniuse.com/#search=box-sizing)。

## position

### static

```css
.static {
  position: static;
}
```

static 是默认值。任意 position: static; 的元素不会被特殊的定位。一个 static 元素表示它不会被 `positioned`，一个 position 属性被设置为其他值的元素表示它会被`positioned`。此时，设置 left/right/top/bottom/z-index 等属性无效。

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

        <div id="a" style="background: #fff; width: 200px;">A
          <div id="b" style="background: #81b6ff; width: 150px; position: relative; padding-top: 100px;">A - 1
              <div id="c" style="background: #b6ff00; position: absolute; left: 0; top: 0">A - 2
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

### demo

```css
.container {
  position: relative;
}
nav {
  position: absolute;
  left: 0px;
  width: 200px;
}
section {
  /* position is static by default */
  margin-left: 200px;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 70px;
  background-color: white;
  width: 100%;
}
body {
  margin-bottom: 120px;
}
```

效果如：

![css-layout-position-demo.png](http://johnnyimages.qiniudn.com/css-layout-position-demo.png)

## Flexbox

There are some older versions of flexbox syntax, so please [consult this article](http://css-tricks.com/using-flexbox/) for the syntax in using flexbox with the best browser support. Be sure to see this [complete guide to Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Reference

- [float](http://css-tricks.com/almanac/properties/f/float/)
- [Force Element To Self-Clear its Children](http://css-tricks.com/snippets/css/clear-fix/)
- [position](http://css-tricks.com/almanac/properties/p/position/)
- [display](http://css-tricks.com/almanac/properties/d/display/)
- [学习CSS布局](http://zh.learnlayout.com/)
- [对CSS中的Position、Float属性的一些深入探讨](http://www.cnblogs.com/coffeedeveloper/p/3145790.html)
- [CS001: 清理浮动的几种方法以及对应规范说明 - W3Help](http://www.w3help.org/zh-cn/casestudies/001)