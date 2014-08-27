---
layout: post
title: "CSS Layout —— Float"
category: CSS
tags: [web, css, layout]
--- 
## float

Floated elements _remain a part of the flow of the web page_.  There are four valid values for the float property. The values `left` and `right` float elements those directions respectively. The value `none` (default) tells the element not to float either direction and `inherit` which will assume the float value from that elements parent element.

**Note:** 

1. An element that is floated is automatically `display: block;`
2. float 只有横向浮动，没有纵向浮动。
3. 容器如果没有明确设定高度，会依照普通流内元素高度设置，这样就会导致脱离普通流的浮动元素溢出容器。
    
    ![](http://css-tricks.com/wp-content/csstricks-uploads/collapse.png)

4. 浮动元素的后一个元素会围绕着浮动元素（典型运用是文字围绕图片），浮动元素的前一个元素不会受到任何影响，如果你想让两个块状元素并排显示，必须让两个块状元素都应用float。

<!--more-->

Floats are also helpful for layout in smaller instances. Take for example this little area of a web page. If we use float for our little avatar image, when that image changes size the text in the box will reflow to accommodate:

![](http://css-tricks.com/wp-content/csstricks-uploads/reflow-example-1.png)

```
img {
  float: right;
  margin: 0 0 1em 1em;
}
```

This same layout could be accomplished using relative positioning on container and absolute positioning on the avatar as well. In doing it this way, the text would be unaffected by the avatar and not be able to reflow on a size change.

![](http://css-tricks.com/wp-content/csstricks-uploads/reflow-example-2.png)

例子：

<p data-height="268" data-theme-id="0" data-slug-hash="Jiedf" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/Jiedf/'>float</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

如果我们想让 `section` 显示在浮动元素之后呢？

```css
.box {
  float: left;
  width: 200px;
  height: 100px;
  margin: 1em;
}
.after-box {
  clear: left;
}
```

使用 `float` 实现网站布局请参考 [CSS - 浮动布局例子](http://zh.learnlayout.com/float-layout.html)。

See Also [float](http://css-tricks.com/almanac/properties/f/float/)

## The Great Collapse

One of the more bewildering things about working with floats is how they can affect the element that contains them (their "parent" element). If this parent element contained nothing but floated elements, the height of it would literally collapse to nothing. This isn't always obvious if the parent doesn't contain any visually noticeable background, but it is important to be aware of.

![](http://css-tricks.com/wp-content/csstricks-uploads/collapse.png)

浮动的原理和清除浮动的原因：浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘。浮动框不属于(或脱离了)文档中的普通流，当一个元素浮动之后，不会影响到块级框的布局而只会影响行内元素(如span、a、em)的排列，即行内元素浮动后就会表现得像块级元素一样。当浮动框高度超出包含框的时候，也就会出现包含框不会自动伸高来闭合浮动元素（或者可以称为“高度塌陷”现象）。在实际布局中，往往这并不是我们所希望的，所以需要闭合浮动元素，使其包含框表现出正常的高度。

As anti-intuitive as collapsing seems to be, the alternative is worse. Consider this scenario:

![](http://css-tricks.com/wp-content/csstricks-uploads/whywecollapse.png)

If the block element on top where to have automatically expanded to accomodate the floated element, we would have an unnatural spacing break in the flow of text between paragraphs, with no practical way of fixing it. If this were the case, us designers would be complaining much harder about this behavior than we do about collapsing.

Collapsing almost always needs to be dealt with to prevent strange layout and cross-browser problems. We fix it by clearing the float **after** the floated elements in the container but **before** the close of the container.

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

## Techniques for Clearing Floats

* **The Empty Div Method** is, quite literally, an empty div. `<div style="clear: both;"></div>`. Sometimes you'll see a `<br />` element or some other random element used, but div is the most common because it has no brower default styling, doesn't have any special function, and is unlikely to be generically styled with CSS. This method is scorned by semantic purists since its presence has no contexual meaning at all to the page and is there purely for presentation. Of course in the strictest sense they are right, but it gets the job done right and doesn't hurt anybody.

        <div class="box">
          <img src="http://zh.learnlayout.com/images/ilta.png" style="float:right">
          <section>文字坏绕</section>
          <div style="clear:both"></div>
        </div>

* **The Overflow Method** relies on setting the overflow CSS property on a parent element. 
    If this property is set to `auto` or `hidden` on the parent element, the parent will expand to contain the floats, effectively clearing it for succeeding elements. This method can be beautifully semantic as it may not require an additional elements. However if you find yourself adding a new div just to apply this, it is equally as unsemantic as the empty div method and less adaptable. Also bear in mind that the overflow property isn't specifically for clearing floats. Be careful not to hide content or trigger unwanted scrollbars.

        <div class="box" style="overflow: hidden">
          <img src="http://zh.learnlayout.com/images/ilta.png" style="float:right">
          <section>文字坏绕</section>
        </div>

    如果你想要支持IE6，你就需要再加入如下样式：

        .clearfix {
          overflow: auto;
          zoom: 1;
        }

* **The Easy Clearing Method** (otherwise known as "clearfix") uses a clever CSS pseudo selector (`:after`) to clear floats. Rather than setting the overflow on the parent, you apply an additional class like "clearfix" to it. Then apply this CSS: 

        .clearfix:after { 
           content: ""; 
           visibility: hidden; 
           display: block; 
           height: 0; 
           clear: both;
        }

        <div class="clearfix">
          <img src="http://zh.learnlayout.com/images/ilta.png" style="float:right">
          <section>文字坏绕</section>
        </div>

This will apply a small bit of content, hidden from view, after the parent element which clears the float. This isn't quite the [whole story](http://www.positioniseverything.net/easyclearing.html), as additional code needs to be used to accomodate for older browsers. **Note:** Also see [this snippet](http://css-tricks.com/snippets/css/clear-fix/) which keeps track of the latest and greatest in clearfixes, including the newer "micro clearfix."

Different scenarios call for different float clearning methods. Take for example a grid of blocks, each of different types.

![](http://css-tricks.com/wp-content/csstricks-uploads/grid-blocks.png)

To better visually connect the similar blocks, we want to start a new row as we please, in this case when the color changes. We could use either the overflow or easy clearing method if each of the color groups had a parent element. Or, we use the empty div method in between each group. Three wrapping divs that didn't previously exist or three after divs that didn't previously exist. I'll let you decide which is better.

![](http://css-tricks.com/wp-content/csstricks-uploads/grid-blocks-cleared.png)

<p data-height="268" data-theme-id="0" data-slug-hash="AxmBK" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/HugoGiraudel/pen/AxmBK/'>Float: down with Sass</a> by Hugo Giraudel (<a href='http://codepen.io/HugoGiraudel'>@HugoGiraudel</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## 与position的兼容性问题

1. 元素同时应用了position: relative、float、（top / left / bottom / right）属性后，则元素先浮动到相应的位置，然后再根据（top / left / bottom / right）所设置的距离来发生偏移。
2. 元素同时应用了position: absolute及float属性，则float失效。

## Problems with Floats

Floats often get beat on for being _fragile_. The majority of this fragility comes from IE 6 and the slew of float-related bugs it has. As more and more designers are dropping support for IE 6, you may not care, but for the folks that do care here is a quick rundown.

* **Pushdown** is a symptom of an element inside a floated item being _wider than the float itself_ (typically an image). Most browsers will render the image outside the float, but not have the part sticking out affect other layout. IE will expand the float to contain the image, often drastically affecting layout. A common example is an image sticking out of the main content push the sidebar down below. 

![](http://css-tricks.com/wp-content/csstricks-uploads/pushdown2.png)

_Quick fix:_ Make sure you don't have any images that do this, use overflow: hidden to cut off excess.
* **Double Margin Bug** - Another thing to remember when dealing with IE 6 is that if you apply a margin in the same direction as the float, it will [double the margin](http://www.cssnewbie.com/double-margin-float-bug/). _Quick fix:_ set `display: inline` on the float, and don't worry it will remain a block-level element.
* The **3px Jog** is when text that is up next to a floated element is mysteriously kicked away by 3px like a weird forcefield around the float. _Quick fix:_ set a width or height on the affected text.
* In IE 7, the **Bottom Margin Bug** is when if a floated parent has floated children inside it, bottom margin on those children is ignored by the parent. _Quick fix:_ using bottom padding on the parent instead.

### Alternatives

If you need text wrapping around images, there really aren't any alternatives for float. Speaking of which, check out this [rather clever technique](http://www.ideashower.com/ideas/active/css-text-wrapper/) for wrapping text around irregular shapes. But for page layout, there definitely are choices. Eric Sol right here on A List Apart has an article on  [Faux Absolute Positioning](http://alistapart.com/articles/fauxabsolutepositioning), which is a very interesting technique that in many ways combines the flexibility of floats with the strength of absolute positioning. 

CSS3 tackles page layout a couple of ways:

* [Flexbox](http://dev.w3.org/csswg/css3-flexbox/)
* [Multi-column Layout](http://dev.w3.org/csswg/css3-multicol/)
* [Grid Layout](http://dev.w3.org/csswg/css3-grid-align/)
* [Template Layout](http://dev.w3.org/csswg/css3-layout/)

Absolutely positioned floats (e.g. you absolutely position as normal, but the element is still able to affect other elements, like have text wrap around it) were discussed but I _think_ it was shelved due to similarities to other more robust layout ideas.

## Reference

- [float](http://css-tricks.com/almanac/properties/f/float/)
- [Force Element To Self-Clear its Children](http://css-tricks.com/snippets/css/clear-fix/)
- [学习CSS布局](http://zh.learnlayout.com/)
- [对CSS中的Position、Float属性的一些深入探讨](http://www.cnblogs.com/coffeedeveloper/p/3145790.html)
- [CS001: 清理浮动的几种方法以及对应规范说明 - W3Help](http://www.w3help.org/zh-cn/casestudies/001)

<script async src="//codepen.io/assets/embed/ei.js"></script>