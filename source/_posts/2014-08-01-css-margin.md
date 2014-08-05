---
layout: post
title: "Css Margin"
category: CSS
tags: [web, css]
--- 

The `margin` property defines the outermost portion of the box model, creating space around an element, outside of any defined borders.

Margins are set using lengths, percentages, or the keyword `auto` and can have negative values. Here's an example:

    .box {
        margin: 0 3em 0 3em;
    }

`margin` is a shorthand property and accepts up to four values, shown here:

    .box {
        margin: <margin-top> || <margin-right> || <margin-bottom> || <margin-left>
    }

<!--more-->

If fewer than four values are set, the missing values are assumed based on the ones that are defined. For example, the following two rule sets would get identical results:

    .box {
        margin: 0 1.5em;
    }
    
    .box {
        margin: 0 1.5em 0 1.5em;
    }

Thus, if only one value is defined, this sets all four margins to the same value. If three values are declared, it is `margin: [top] [left-and-right] [bottom];`.

Any of the individual margins can be declared using longhand, in which case you would define only one value per property:

    .box {
        margin-top: 20px;
        margin-right: 10px;
        margin-bottom: 20px;
        margin-left: 10px;
    }

## 水平居中

设置块级元素的 `width` 可以阻止它从左到右撑满容器，然后你就可以设置左右外边距为 `auto` 来使其水平居中。元素会占据你所指定的宽度，然后剩余的宽度会一分为二成为左右外边距。

Each of the margin properties can also accept a value of `auto`. A value of `auto` basically tells the browser to define the margin for you. In most cases, a value of `auto` will be equivalent to a value of `0` (which is the initial value for each margin property) or else whatever space is available on that side of the element.

```css
#main {
  width: 600px;
  margin: 0 auto; 
}
```

In this example, two things are done to center this element horizontally within the available space:

* The element is given a specified width
* The left and right margins are set to `auto`

Without the specified width, the `auto` values would essentially have no effect, setting the left and right margins to `0` or else to whatever is the available space inside the parent element.

唯一的问题是，当浏览器窗口比元素的宽度还要窄时，浏览器会显示一个水平滚动条来容纳页面。让我们再来改进下这个方案：

```css
#main {
  max-width: 600px;
  margin: 0 auto; 
}
```

在这种情况下使用 `max-width` 替代 `width` 可以使浏览器更好地处理小窗口的情况。这点在移动设备上显得尤为重要。

<p data-height="268" data-theme-id="0" data-slug-hash="rvJoj" data-default-tab="html" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/rvJoj/'>rvJoj</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

顺便提下， 所有的主流浏览器包括IE7+在内都支持 max-width ，所以放心大胆的用吧。

## Collapsing margins

The [W3C specification](http://www.w3.org/TR/CSS21/box.html#collapsing-margins) defines collapsing margins as follows:

> “In this specification, the expression collapsing margins means that adjoining margins (no non-empty content, padding, or border areas, or clearance separate them) of two or more boxes (which may be next to one another or nested) combine to form a single margin.”

Vertical margins on different elements that touch each other (thus have no content, padding, or borders separating them) will collapse, forming a single margin that is equal to the greater of the adjoining margins. This does not happen on horizontal margins (left and right), only vertical (top and bottom).

In the case where one element has a negative margin, the margin values are added together to determine the final value. If both are negative, the greater negative value is used. This definition applies to adjacent elements and nested elements.

There are other situations where elements do not have their margins collapsed:

* floated elements
* absolutely positioned elements
* inline-block elements
* elements with overflow set to anything other than visible (They do not collapse margins with their children.)
* cleared elements (They do not collapse their top margins with their parent block’s bottom margin.)
* the root element

This is a difficult concept to grasp, so let’s dive into some examples.

### Collapsing Margins Between Adjacent Elements

Margins collapse between adjacent elements. In simple terms, this means that for adjacent vertical block-level elements in the normal document flow, only the margin of the element with the largest margin value will be honored, while the margin of the element with the smaller margin value will be collapsed to zero. If, for example, one element has a `25px` bottom margin and the element immediately underneath it has a `20px` top margin, only the `25px` bottom margin will be enforced, and the elements will remain at a distance of `25px` from each other. They will not be `45px` (25+20) apart, as might be expected.

This behavior is best demonstrated with a short example. Consider the following code:

    h1 {
      margin: 0 0 25px 0;
      background: #cfc;
    }
    p {
      margin: 20px 0 0 0;
      background: #cf9;
    }

![css-box-model_collapsing-margins](http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/04/1398314844css-box-model_collapsing-margins.png)

As you’ll see from Figure 1, the gap between the elements is only `25px`, and the smaller margin has collapsed to zero. If in the above example the elements had equal margins (say, 20 pixels each), the distance between them would be only `20px`.

There is one situation that will cause a slight deviation from the behavior of collapsing margins: should one of the elements have a negative top or bottom margin, the positive and negative margins will be added together to reach the final, true margin. Here’s an example style sheet that demonstrates the concept:

    h1 {
      margin: 0 0 25px 0;
      background: #cfc;
    }
    p {
      margin: -20px 0 0 0;
      background: #cf9;
    }

The bottom margin of the h1 element is a positive number (`25px`), and the top margin of the p element is a negative number (-20px). In this situation, the two numbers are added together to calculate the final margin: `25px` + (-`20px`) = `5px`.

If the result of this calculation is a negative number, this value will have the effect of one element overlapping the other. You could say that the negative margin pulls the element in the opposite direction to that of a positive margin. See margin for more details about negative margins.

### Collapsing Margins Between Parent and Child Elements

So far, we’ve only addressed the collapsing effect on adjacent elements, but the same process holds true for parents and children whose margins touch. By “touch,” we mean the places at which no padding, borders, or content exist between the adjacent margins. In the following example, a parent element has a child element on which a top margin is set:

    h1 {
      margin: 0;
      background: #cff;
    }
    div {
      margin: 40px 0 25px 0;
      background: #cfc;
    }
    p {
      margin: 20px 0 0 0;
      background: #cf9;
    }

In the style sheet above, you can see that a top margin value is declared for the `p` element, and in the code excerpt below, you can see that the `p` element is a child of the div element:

    <h1>Heading Content</h1>
    <div>
      <p>Paragraph content</p>
    </div>

The result of this code is illustrated in Figure 2.

![css-box-model_collapsing-margins2](http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/04/1398314904css-box-model_collapsing-margins2.png)

You may have expected that the paragraph would be located `60px` from the heading, since the div element has a `margin-top` of `40px` and there is a further `20px``margin-top` on the `p` element. You may also have expected that `20px` of the background color of the div element would show above the paragraph. This does not happen because, as you can see in Figure 2, the margins collapse together to form one margin. Only the largest margin applies (as in the case of adjoining blocks), as we’ve already seen.

In fact we would get the same result if our div element had no top margin and the p element had a `40px``margin-top`. The `40px``margin-top` on the p element effectively becomes the top margin of the div element, and pushes the div down the page by `40px`, leaving the `p` element nesting snugly at the top. No background would be visible on the div element above the paragraph.

In order for the top margins of both elements to be displayed, and for the background of the div element to be revealed above the `p` element, there would need to be a border or padding that would stop the margins collapsing. If we simply add a top border to the div element, we can achieve the effect we were originally looking for:

    h1 {
      margin: 0;
      background: #cff;
    }
    div {
      margin: 40px 0 25px 0;
      background: #cfc;
      border-top: 1px solid #000;
    }
    p {
      margin: 20px 0 0 0;
      background: #cf9;
    }

In Figure 3, we can see that the div element is still `40px` away from the heading, but the paragraph has been pushed a further `20px` down the page, thus revealing `20px` of the background of the div element (through the presence of the border).

![css-box-model_collapsing-margins3](http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/04/1398314949css-box-model_collapsing-margins3.png)

If we didn’t want a visible top border showing in the design, a `1px` top padding on the div element would have achieved the same effect. Note that the border or padding should be applied to the parent div because a border on the paragraph would not stop the margins from collapsing, since the paragraph’s margin is outside of the border.

The example above deals with a single parent and single child that have touching margins, but the same approach would apply if there were several children (that is, nested elements) that all had adjacent vertical margins: it would still mean that all the margins would collapse into one single margin. Although the examples above mentioned top margins, the same effect is true for bottom margins, as can be seen below.

In the following contrived example, we’ve nested four div elements, all of which have a `10px` margin applied. Each div has a different background color, so the effects of the margin collapse will be clearly visible:

    .box {
      margin: 10px;
    }
    .a {
      background: #777;
    }
    .b {
      background: #999;
    }
    .c {
      background: #bbb;
    }
    .d {
      background: #ddd;
    }
    .e {
      background: #fff;
    }

The result of the above CSS is shown in Figure 4.

![css-box-model_collapsing-margins4](http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/04/1398314988css-box-model_collapsing-margins4.png)

As you can see in this example, the effect of our CSS is quite dramatic: all the vertical margins have collapsed to form a single, `10px` margin. Unlike the horizontal margin example, where all the margins were visible, the vertical margins show no such colors at all, thanks to the background-color that has been applied to each element. The whole block will be positioned `10px` from other in-flow elements on the page, but each nested block will collapse its margins into a single margin.

As discussed earlier, the simplest way to stop the margin collapse from occurring is to add padding or borders to each element. If we wanted `10px` margins on each element we could simply use a `9px` margin and `1px` of padding to get the result we wanted:

    .box {
      margin: 9px;
      padding: 1px;
    }

The result of that small change will “un-collapse” the vertical margins, as you can see in Figure 5.

![css-box-model_collapsing-margins5](http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/04/1398315046css-box-model_collapsing-margins5.png)

Again, it’s important to consider the effects that layout in Internet Explorer would have in the above demonstrations. Should the elements in the first example (Figure 4) have a layout in IE, the result would be exactly as shown in Figure 5. It’s also worth noting that in browsers other than IE, the same effect would occur if the overflow property was added with a value other than visible.

### Wrapping It Up

Although the margin collapse behavior is at first a little unintuitive, it does make life easier in the case of multiple nested elements, where the behavior is often desirable. As shown above, easy methods are available to help you stop the collapse if required.

## Browser Support

IE6 is prone to the [doubled float-margin bug](http://www.positioniseverything.net/explorer/doubled-margin.html), which can be resolved in most cases by adding `display: inline` to the floated element.

## Reference

- [margin](http://css-tricks.com/almanac/properties/m/margin/)
- [Collapsing Margins - SitePoint](http://www.sitepoint.com/web-foundations/collapsing-margins/)