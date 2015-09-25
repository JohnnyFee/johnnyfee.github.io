layout: post
title: "Vertical Centering With CSS"
category: CSS
tags: [css]
---

Let’s start by first talking about something that doesn’t work as many expect. Understanding why vertical-align doesn’t always work will help us better understand vertical centering in general.

## Vertical-Align

[使用 CSS 水平居中](http://www.vanseodesign.com/css/centering-with-css/) 很简单。当元素是一个内联元素时，我们使用 `text-align` 在居中于父元素中。当元素时块元素时，我们为它指定一个宽度，然后设置左右边距为 `auto `。

<!-- more -->

`vertical-align` 可以用于表格的单元格和对一些内联元素，不能应用到块元素的垂直居中。

* 对于内联元素，和 `line-height` 相关。
* 对于单元格，和 [表格的高度算法](http://www.w3.org/TR/CSS2/tables.html#height-layout) 有关，通常是指行高。

```
<div style="border: 1px solid green;display:table-cell; height: 100px; vertical-align: middle">
<span>hello world</span>
</div>
```

See [我所知道的几种display:table-cell的应用 « 张鑫旭-鑫空间-鑫生活](http://www.zhangxinxu.com/wordpress/2010/10/%E6%88%91%E6%89%80%E7%9F%A5%E9%81%93%E7%9A%84%E5%87%A0%E7%A7%8Ddisplaytable-cell%E7%9A%84%E5%BA%94%E7%94%A8/)

## Line-Height Method

__This method will work when you want to vertically center a single line of text. __ All we need to do is set a line-height on the element containing the text larger than its font-size.

By default equal space will be given above and below the text and so the text will sit in the vertical center.

Most tutorials will also set the height on the element with the same value given to the [line-height](http://www.vanseodesign.com/css/thoughts-on-building-a-typographic-stylesheet/). I don’t think setting the height is necessary, but if line-height alone doesn’t work for you setting the height of the element will likely be the solution.

<p data-height="300" data-theme-id="0" data-slug-hash="jFazH" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/jFazH/'>vertical-line-height</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

The above works in all browsers, however it will only work for a single line of text. If your text could wrap to a 2nd line you need to use a different method. The value of 200px above is arbitrary. You can use any value you want as long as its larger than the font-size that’s been set.

**Added:** As Jeff pointed out in the comments below, there’s one small got’cha with this method in that you have to be careful when using the shortcut for the font property. This method relies on you setting the line-height as a value greater than the font-size. When you use the font shortcut any property you don’t specifically set gets set to its default value. With line-height that default is 1. If you use the font shortcut, just make sure to explicitly set the line-height inside.

__Centering an Image with Line-Height:__

What if the content you want centered is an image? Will this method work? The answer is yes with one additional line of css.

html:

    <div id="parent">
        <img src="image.png" alt="" />
    </div>

css:

    #parent {
        line-height: 200px;
    }

    #parent img {
        vertical-align: middle;
    }

You set the line-height as we did above (It’ll need to be greater than the height of the image) and then set vertical-align: middle on the image.

## CSS Table Method

Above I mentioned that vertical-align applies to table cells which leads us to this method. We’ll display our elements as table and table cell and then use the vertical-align property to center the content.

**Note:** CSS tables are not the same as [html tables](http://www.vanseodesign.com/css/css-divs-vs-tables/).

<p data-height="300" data-theme-id="0" data-slug-hash="JBChb" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/JBChb/'>table-cell-vertical-align</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Unlike the method above the content can be dynamic as the div will grow with what’s placed inside. The downside of this method is it doesn’t work in older versions of IE, though there is a fix, which is to add display: inline-block to the child element.

    #child {
        display: inline-block;
    }

__Advantages:__

- Variable height content
- Content overflows by stretching the parent element
- Works well cross-browser

__Caveats:__

- Requires extra markup

## Absolute Positioning and Negative Margin

This method works for block level elements and also works in all browsers. It does require that we set the height of the element we want to center.

In the code below I’m centering the child both vertically and horizontally using this method.

<p data-height="300" data-theme-id="0" data-slug-hash="ngzrm" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/ngzrm/'>child-absolute</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

We begin by [positioning](http://www.vanseodesign.com/css/css-positioning/) both parent and child divs. Next we set the top and left values of the child to be 50% each, which would be the center of the parent. However this sets the top left corner to be in the center so we’re not done.

We need to move the child up (by half its height) and to the left (by half its width) so its center is what sits in the center of the parent element. This is why we need to know the height (and here the width) of the child element.

To do that we give the element a negative top and left margin equal to half its height and width.

Unlike the first 2 methods this one is meant for block level elements. It does work in all browsers, however the content can outgrow its container in which case it will disappear visually. It’ll work best when you know the heights and widths of the elements.

__Advantages:__

- Works well cross-browser, including IE6-7
- Requires minimal code

__Caveats:__

- Not responsive. Doesn't work for percentage based dimensions and can't set min-/max-
- Content can overflow the container
- Have to compensate for padding or use box-sizing: border-box

## Absolute Positioning and Stretching

As with the method above this one begins by setting positioning on the parent and child elements as relative and absolute respectively. From there things differ.

In the code below I’ve once again used this method to center the child both horizontally and vertically, though you can use the method for vertical centering only.

<p data-height="300" data-theme-id="0" data-slug-hash="rnLse" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/rnLse/'>absolute-vertical-align</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


The idea with this method is to try to get the child element to stretch to all 4 edges by setting the top, bottom, right, and left vales to 0. Because our child element is smaller than our parent elements it can’t reach all 4 edges.

Setting auto as the margin on all 4 sides however causes opposite margins to be equal and displays our child div in the center of the parent div.

__Advantages:__

* Cross-browser (including IE8-10)
* No special markup, minimal styles
* Responsive with percentages and min-/max-
* Use one class to center any content
* Centered regardless of padding (without `box-sizing`!)
* Blocks can easily be resized
* Works great on images

__Caveats:__

* Height must be declared (see [Variable Height](http://www.smashingmagazine.com/2013/08/09/absolute-horizontal-vertical-centering-css/#Height))
* Recommend setting `overflow: auto` to prevent content spillover (see [Overflow](http://www.smashingmagazine.com/2013/08/09/absolute-horizontal-vertical-centering-css/#Overflow))
* Doesn’t work on Windows Phone

### Offsets

If you have a fixed header or need to add other offsets, simply add it in your content block's styles like `top: 70px;`. As long as `margin: auto;` is declared, the content block will be vertically centered within the bounds you declare with `top` `left` `bottom` and `right`.

If you have a fixed header or need to add other offsets, simply add it in your content block's styles like `top: 70px;`. As long as `margin: auto;` is declared, the content block will be vertically centered within the bounds you declare with `top` `left` `bottom` and `right`.

    .offset-right {
      left: auto; right: 20px;
    }

    .offset-left {
      right: auto; left: 20px;
    }

<p data-height="268" data-theme-id="0" data-slug-hash="aGlHr" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/aGlHr/'>absolute-vertical-align-offset</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

### Responsive

Perhaps the best benefit of Absolute Centering is percentage based width/heights work perfectly! Even min-width/max-width and `min-height`/`max-height` styles behave as expected for more responsive boxes.

Go ahead, add padding to the element; Absolute Centering doesn't mind!

    .responsive {
      min-width: 200px;
      max-width: 100px;
    }

### Overflow

Content taller than the block or container (viewport or a `position: relative` container) will overflow and may spill outside the content block and container or even be cut off. Simply adding `overflow: auto` will allow the content to scroll within the block as long as the content block itself isn't taller than its container (perhaps by adding `max-height: 100%`; if you don't have any padding on the content block itself).

### Resizing

You can resize your content block with other classes or Javascript without having to recalculate the center manually! Adding the `resize` property will even let your content block be resized by the user.

Absolute Centering keeps the block centered no matter how the block is resized. Setting min-/max- will limit the block's size to what you want and prevent it from overflowing the window/container.

If you don't use `resize: both`, you can add a `transition` to smoothly animate between sizes. Be sure to set `overflow: auto` since the block could be resized smaller than the content.

Absolute Centering is the only vertical centering technique tested that successfully supports the `resize: both` property.

    .resizable {
      min-width: 20%;
      max-width: 80%;
      min-height: 20%;
      max-height: 80%;
      resize: both;
      overflow: auto;
    }

<p data-height="268" data-theme-id="0" data-slug-hash="vysCb" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/vysCb/'>absolute-vertical-align-resizable</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

__Caveats:__

- Set your `max-width`/`max-height` to compensate for any padding on the content block itself, otherwise it will overflow its container.
- The `resize` property is not supported on mobile browsers or in IE 8-10 so make sure your users have an alternate way of resizing if that is essential to user experience.
- Combining `resize` and `transition` properties causes a delay equal to the transition time when the user attempts to resize.

### Images

Images work too! Apply the class/style to the image itself and set `height: auto`; like you would with a responsively-sized image to let it resize with the container.

Note that `height: auto;` works for images, but causes a regular content block to stretch to fill the container unless you use the [variable height technique](http://localhost:51004/view/28#Height). It's likely that because browsers have to calculate the height for the image rendered image, so `margin: auto;` ends up working as if you'd declared the height in all tested browsers.

    .img { 
      width: 100%;
      height: auto;
    }

### Browser Compatibility:

**Chrome, Firefox, Safari, Mobile Safari, IE8-10.**  
Absolute Centering was tested and works flawlessly in the latest versions of Chrome, Firefox, Safari, Mobile Safari, and even IE8-10.

## Equal Top and Bottom Padding

In the method above we allowed the browser to automatically set the margins of the child element so they would be equal. In this method we’ll do something similar and explicitly set the top and bottom padding of the parent to be equal.

In the css above I’ve set top and bottom paddings on both elements. Setting it on the child will make sure the contents in the child will be vertically centered and setting it on the parent ensures the entire child is centered within the parent.

<p data-height="300" data-theme-id="0" data-slug-hash="Ceglf" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/Ceglf/'>Ceglf</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

I’m using [relative measurements](http://www.vanseodesign.com/css/fluid-layout-code/) to allow each div to grow dynamically. If one of the elements or its content needs to be set with an absolute measurement then you’ll need to do some math to make sure things add up.

For example if the parent was 400px in height and the child 100px in height we’d need 150px of padding on both the top and bottom.

150 + 150 + 100 = 400

Using % could throw things off in this case unless our % values corresponded to exactly 150px.

This method works anywhere. The downside is that depending on the specifics of your project you may need to do a little math. However if you’re falling in line with the idea of [developing flexible layouts](http://www.vanseodesign.com/css/elastic-layout-code/) where your measurements are all relative you can avoid the math.

**Note:** This method works by setting paddings on the outer elements. You can flip things and instead set equal margins on the inner elements. I tend to use padding, but I’ve also used margins with success. Which you choose would depend on the specifics of your project.

## Floater Div

This last method requires an empty div which is [floated](http://www.vanseodesign.com/css/understanding-css-floats/) and used to control where our child element sits in the document flow. Notice the floater div comes before our child div in the html below.

<p data-height="268" data-theme-id="0" data-slug-hash="kzvqm" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/kzvqm/'>kzvqm</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

We float the empty div to the left (or right) and give it a height of 50% of the parent div. That causes it to fill up the entire upper half of the parent element.

Because this div is floated it’s removed from the normal document flow so we need to clear the child element. Here I’ve used clear: both, but you just need to clear in the same direction you floated the empty floater div.

The top edge of the child div should now be immediately below the bottom edge of the floater div. We need to bring the child element up by an amount equal to half its height and to do so we set a negative margin-bottom on the floater div.

This method also works across browsers. The downside is that it requires an empty div and that you know the height of the child element.

## Transforms

- [Vertical align anything with just 3 lines of CSS](http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/)
- [Centering Percentage Width/Height Elements](http://css-tricks.com/centering-percentage-widthheight-elements/)

With just 3 lines of CSS (excluding vendor prefixes) we can with the help of _transform: translateY_  vertically center whatever we want, even if we don’t know its height.

The CSS property _transform_ is usally used for rotating and scaling elements, but with its _translateY_ function we can now vertically align elements. Usually this must be done with absolute positioning or setting line-heights, but these require you to either know the height of the element or only works on single-line text etc.

So, to do this we write:

```
.element {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```

That’s all you need. It is a similar technique to the absolute-position method, but with the upside that we don’t have to set any height on the element or position-property on the parent. It works straight out of the box, even in [IE9](http://caniuse.com/#feat=transforms2d)!

To make it even more simple, we can write it as a mixin with its vendor prefixes:

```
@mixin vertical-align {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.element p {
  @include vertical-align;
}
```

Or you can use the Sass [placeholder selector](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_) to reduce code bloat in the output CSS:

```
%vertical-align {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.element p {
  @extend %vertical-align;
}
```

You can find a demo of it here:

<p data-height="268" data-theme-id="0" data-slug-hash="kzEhe" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/sebastianekstrom/pen/kzEhe/'>Vertical center with only 3 lines of CSS</a> by sebastianekstrom (<a href='http://codepen.io/sebastianekstrom'>@sebastianekstrom</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<p data-height="268" data-theme-id="0" data-slug-hash="dhmFv" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/dhmFv/'>dhmFv</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

__Advantages:__

* Variable height content
* Requires minimal code

__Caveats:__

* Won't work in IE8
* Need vendor prefixes
* Can interfere with other `transform` effects
* Results in blurry rendering of edges and text in some cases. Not as much of an issue in modern rendering engines, especially if you [enable `transform-style: preserve-3d`](http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/)

## Flexbox

- [Centering Vertically and Horizontally Using Flexbox](http://www.kirupa.com/html5/centering_vertically_horizontally.htm)
- [Vertical Centering — Solved By Flexbox — Cleaner, hack-free CSS](http://philipwalton.github.io/solved-by-flexbox/demos/vertical-centering/)
- [css - vertically centre items with flexbox - Stack Overflow](http://stackoverflow.com/questions/15726740/vertically-centre-items-with-flexbox)

With Flexbox, you can stop worrying. You can align anything (vertically or horizontally) quite painlessly with the `align-items`, `align-self`, and `justify-content` properties.

Unlike some of the existing vertical alignment techniques, with Flexbox the presence of sibling elements doesn't affect their ability to be vertically aligned.

<p data-height="268" data-theme-id="0" data-slug-hash="EIsCe" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/EIsCe/'>EIsCe</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Comparison

Absolute Centering isn't the only option out there. Several unique methods exist for vertical centering, and each has their advantages. Which technique you choose mainly boils down to which browsers you support and what your existing markup looks like, but this comparison table can help make the right choice to match the features you need.

Technique| Browser Support     | Responsive | Overflow| `resize:both`| Variable Height | Major Caveats
-------| -------| ----------| ------| ------| ----------| ----
[Absolute Centering](http://localhost:51004/view/28#Overview)       | Modern & IE8+       | Yes        | Scroll, can overflow container | Yes                               | Yes*            | [Variable Height](http://localhost:51004/view/28#Height) not perfect cross-browser
[Negative Margins](http://localhost:51004/view/28#Negative-Margins) | All                 | No         | Scroll                         | Resizes but doesn't stay centered | No              | Not responsive, margins must be calculated manually                               
[Transforms](http://localhost:51004/view/28#Transforms)             | Modern & IE9+       | Yes        | Scroll, can overflow container | Yes                               | Yes             | Blurry rendering                                                                  
[Table-Cell](http://localhost:51004/view/28#Table-Cell)             | Modern & IE8+       | Yes        | Expands container              | No                                | Yes             | Extra markup                                                                      
[Inline-Block](http://localhost:51004/view/28#Inline-Block)         | Modern, IE8+ & IE7* | Yes        | Expands container              | No                                | Yes             | Requires container, hacky styles                                                  
[Flexbox](http://localhost:51004/view/28#Flexbox)                   | Modern & IE10+      | Yes        | Scroll, can overflow container | Yes                               | Yes             | Requires container, vendor prefixes                                         

## Summary

None of the methods above is complicated and I’m sure if you use each once or twice it’ll be easy to use again.

The difficultly if there is one is that none of the methods above is perfect for all occasions. The trick is to understand several of the above and use each appropriately.

Some of the methods work better for inline elements and others work better for block level elements. Some might work better with your preference for developing a layout and some don’t work in older versions of a certain browser we all know well.

Rarely do I vertically center elements in a design. When I do the methods I tend to use are the line-height method and the equal padding method. One or the other has always worked for my needs.

If neither worked I would reach for either the positioning or floater methods and save the table cell method as a last resort. In time we’ll be able to use the [css3 flexible box layout module](http://www.w3.org/TR/css3-flexbox/) and forget about the methods above, but for now browser support isn’t quite there.

Do you use any of the above methods or do you use a different method I didn’t mention? Is there a vertical centering issue that none of the methods here address?

## Reference

- [6 Methods For Vertical Centering With CSS - Vanseo Design](http://www.vanseodesign.com/css/vertical-centering/)
- [Absolute Centering](http://codepen.io/shshaw/details/gEiDt)
- [Vertical Centering with CSS Tables and Vertical-Align](http://vanseodesign.com/blog/demo/vertical-centering/table-cell.php)
- [How to Center Anything With CSS](http://designshack.net/articles/css/how-to-center-anything-with-css) horizontal alignment.
- [What is Vertical Align?](http://css-tricks.com/what-is-vertical-align/)
- [三种方式实现动态元素水平居中 / Owen Chen](http://owenchen.duapp.com/index.php/there-are-three-ways-to-implement-dynamic-elements-centered-horizontally/)
- [4 CSS Tricks for Vertical Alignment — Adnane Belmadiaf's Blog - Front-end Developer](http://daker.me/2014/04/4-css-tricks-for-vertical-alignment.html)
- [大小不固定的图片和多行文字的垂直水平居中](http://www.zhangxinxu.com/study/200908/img-text-vertical-align.html)

<script async src="//codepen.io/assets/embed/ei.js"></script>
