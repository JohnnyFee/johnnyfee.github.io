---
layout: post
title: "Css Margin"
category: CSS
tags: [web, css]
--- 

## Margin

`margin` 定义和模型的外边距，即元素边框之外的空白区域。Margin 可以使用长度、百分比、`auto` 和 负值定义。如：

```css
.box {
    margin: 0 3em 0 3em;
}
```

`margin` 可以接收 4 个值，如：

    .box {
        margin: <margin-top> || <margin-right> || <margin-bottom> || <margin-left>
    }

<!--more-->

`margin` 也可是接收少于 4 个值，如接收 2 个值时：

```css
.box {
    margin: 0 1.5em;
}

/*和以上等价的四个值的形式*/
.box {
    margin: 0 1.5em 0 1.5em;
}
```

如果只定义一个值，这个值为所有的 margin 值，如果定义定义三个值，那么它是 `margin: [top] [left-and-right] [bottom];`。

除了使用 margin 的简写方法，你也可以使用普通写法，一个属性定义一个值：

```css
.box {
    margin-top: 20px;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-left: 10px;
}
```

## 水平居中

`margin` 属性也接收 `auto` 值，`auto` 让浏览器定义 margin。大多数情况下，`auto` 值等于 0（每个 margin 属性的初始值）或者元素两边剩余的宽度。

你可以设置 `width` 值，让后设置左右外边距为 `auto` 来使其水平居中。这是 `margin-left` 和 `margin-right` 值均为左右剩余宽度的一半。

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

<p data-height="268" data-theme-id="0" data-slug-hash="rvJoj" data-default-tab="html" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/rvJoj/'>rvJoj</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

顺便提下， 所有的主流浏览器包括 IE7+ 在内都支持 max-width ，所以放心大胆的用吧。

## Margin 合并

[W3C specification](http://www.w3.org/TR/CSS21/box.html#collapsing-margins) 如下定义 margin 合并：

> “In this specification, the expression collapsing margins means that adjoining margins (no non-empty content, padding, or border areas, or clearance separate them) of two or more boxes (which may be next to one another or nested) combine to form a single margin.”

相邻的元素之间如果没有内容、padding、边框来分离它们，那么它们的垂直 margin 会合并为相邻 margin 中间的较大值。Margin 只发生在垂直方向，不会发生在水平方向。这个定义适用于相邻元素和嵌套元素。

如果其中一个元素的 margin 值是负数，那么最终的 margin 值为正负 margin 值相加。如果两个都是负数，更大的负数被使用。

以下几种情况不会发生 margin 合并：

* 浮动元素
* 绝对定位的元素
* inline-block 元素
* overflow 值不为 `visible` 的元素（不会和子元素发生 margin 合并）。
* cleared elements（子元素的 top margin 不会和父块的 bottom margin 合并）。
* 根元素。

### 相邻元素之间的  Margin 塌陷

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

![css-box-model_collapsing-margins](http://johnnyimages.qiniudn.com/1398314844css-box-model_collapsing-margins.pngundefined)

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

### 父子元素之间的  Margin 塌陷

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

## 负 margin

See 

- [负margin用法权威指南](http://www.w3cplus.com/css/the-definitive-guide-to-using-negative-margins.html)
- [我知道你不知道的负Margin](http://www.hicss.net/i-know-you-do-not-know-the-negative-margin/)

早在1998年CSS2的建议中，table就渐渐淡出了舞台，逐渐被载入史册。也因为如此，CSS布局也变成了编码优雅的代名词。

在设计者用过的所有CSS概念中，负margin应当是最少被谈及的定位方法，这就像一种禁忌，每个人都使用它，但没人去讨论它。

### 为负margin“平反”

我们在CSS中都会使用margin，但将margin设置成负数，那可能就不大好处理了。在网页设计中，人们对负margin用法的态度大相径庭，有的人非常喜欢，而有的人则认为这是魔鬼的工作。

一个负margin应该是这样设置的：

    #content {margin-left:-100px;}  

通常人们很少使用负margin但随后你会了解到，它能做的其实有很多。以下是几条有关负margin需要注意的地方：

1. 负margin是绝对标准的CSS
这不是开玩笑。W3C甚至标注过：对于margin属性来说，负值是被允许的。这是Nuff说的，查看这篇文章会有更多详细内容。
2. 负maring不是一种hack方法
千真万确，不能因为缺乏对负marign的理解，或者因为它长得像hack，就认为它是一种hack方法。除非你是用来修复自己在其他地方造成的错误。
3. 不脱离文档流
不使用float的话，负margin元素是不会破坏页面的文档流。所以如果你使用负margin上移一个元素，所有跟随的元素都会被上移。
4. 完全兼容
所有现代浏览器都完全支持负margin（IE6在大多数情况下也支持）。
5. 浮动会影响负margin的使用
负margin不是你每天都用的CSS属性，应用时应小心谨慎。
6. Dreamweaver不解析负margin
DW的设计视图不会解析负margin。但问题是你为什么要在设计视图中检查你的网站呢？

### 使用负margin

如果使用得当，负margin是非常强大的属性，以下是2种（负margin占主导位置）的场景。

**作用于static元素上的负margin属性**

![deodesign](http://cdn1.w3cplus.com/cdn/farfuture/gRFHdzkl6BnwENTnQ6wsHLbf2P5UYnCaJJ7QcREy-jw/mtime:1362110442/sites/default/files/styles/print_image/public/blogs/2013/negative-margin-1.jpg)

Static元素是没有设定成浮动的元素，下图说明了负margin对static元素的作用

当static元素的margin-top/margin-left被赋予负值时，元素将被拉进指定的方向。例如：

```css
/* 元素向上移10px*/
#mydiv1 {margin-top:-10px;} 
```

但如果你设置margin-bottom/right为负数，元素并不会如你所想的那样向下/右移动，而是将后续的元素拖拉进来，覆盖本来的元素。

```css
/* 
* #mydiv1后续元素向上移10px, #mydiv1 本身不移动
*/
#mydiv1 {margin-bottom:-10px;}  
```

如果没有设定width属性，设定负margin-left/right会将元素拖向对应的方向，并增加宽度，此时的margin的作用就像padding一样。

### 浮动元素上的负margin

考虑下以下这种情况

```html
<div id="mydiv1">First</div>
<div id="mydiv2">Second</div>
```

如果给一个浮动元素加上相反方向的负margin，则会使行间距为0且内容重叠。这对于创建1列是100%宽度而其他列是固定宽度（比如100px）的自适应布局来说是非常有用的方法。

```css
/* 应用在与浮动相反方向的负margin */
#mydiv1 {float:left; margin-right:-100px;}  
```

若两个元素都为浮动，且#mydiv1的元素设定margin-right为20px。这样#mydiv2会认为#mydiv1的宽度比原来宽度缩短了20px（因此会导致重叠）。但有意思的是，#mydiv1的内容不受影响，保持原有的宽度。

如果负margin等于实际宽度，则元素会被完全覆盖。这是因为元素的完全宽度等于margin，padding，border，width相加而成，所以如果负margin等于余下三者的和，那元素的实际宽度也就变成了0px。

### 实用技巧

自从知道使用负margin是符合CSS2标准的代码后，我们利用这个特性创建了一些有趣的CSS技术。

制作包含3列的单个 `<ul>`

![deodesign](http://cdn.w3cplus.com/cdn/farfuture/AjbyyIUsgEiXut9VajmR5SLf3c8eDLAikuAP3s0-J5k/mtime:1362110442/sites/default/files/styles/print_image/public/blogs/2013/negative-margin-2.jpg)

如果你有一列项目太长而无法垂直显示时，为什么不试试用分列的方式来代替它？负margin可以让你在不添加任何浮动元素或标签的情况下达到这种效果。如下，如此简单的操作就可以把集合分成三列，真是太令人惊叹了！

HTML

```html
<ul> 
  <li class="col1">Eggs</li> 
  <li class="col1">Ham</li> 
  <li class="col2 top">Bread</li> 
  <li class="col2">Butter</li> 
  <li class="col3 top">Flour</li> 
  <li class="col3">Cream</li> 
</ul> 
```

CSS

```css
ul {list-style:none;}
li {line-height:1.3em;}
.col2 {margin-left:100px;}
.col3 {margin-left:200px;}
.top {margin-top:-2.6em;} /* the clincher */ 
```

通过在类top中设置margin-top:-2.6em(<li>标签的2倍行高)，所有元素都完美的对齐了。你只需要将负margin应用到每列的第一个标签上，而不是设置每个<li>的相对位置，这样用起来会合适很多，很酷吧？

**使用重叠产生强调**

![deodesign](http://cdn.w3cplus.com/cdn/farfuture/asNxjwK2vC0a0K-f0cJAnWviCcE9G8WsncGjGDx-0N8/mtime:1362110442/sites/default/files/styles/print_image/public/blogs/2013/negative-margin-3.jpg)

刻意重叠元素也是一种很好的设计比喻，这样能产生一种深度错觉，从而突出特定的元素。[Phlashers.com](http://phlashers.com/blog/?p=180)的评论模块就是一个很好的例子，使用了重叠技术突出了评论数目。利用负margin和z-index 属性，外加一点点创意，你也可以做到。

这是一种创建类似于Safari字体的巧妙方法：使用2种颜色创建两版相同，略微倾斜的文字，然后使用负margin将一版文字覆盖到另一版上，并留出1-2像素的差异。这样你就获得了具有可选性，而且对机器人爬虫友好的文字！从此再也不需要那臃肿又消耗带宽的jpeg和gif了。

**简单2列布局**

负margin也是一种创建简单2列自适应布局的好方法。2列自适应布局是一种拥有一个自适应宽度（liquid width）为100%的内容列和一个固定宽度侧边栏的布局。

**HTML**

```html
<div id="content"> <p>Main content in here</p> </div> 
<div id="sidebar"> <p>I’m the Sidebar! </p> </div>  
```

__CSS__

```css
#content {width:100%; float:left; margin-right:-200px;}
#sidebar {width:200px; float:left;} 
```

这样你就拥有了一个简单的两列布局，即使在IE6下也能无错的运行。现在，为了避免#sidebar被#content中的文字覆盖，加上

```css
/* 防止文本被重叠 */
#content p {margin-right:210px;}

/* 它是 200px + 10px, 10px是他们的间距*/    
```

如果运用得当，负margin也可以完全代替table标签，来构成灵活文档结构。这种结构是一种具有可访问性的SEO技术，可以完全按照你的意愿按几乎任何顺序来排列标记。Tom写了一篇[文章](http://www.severnsolutions.co.uk/twblog/archive/2004/07/01/cssnegativemarginsalgebra)，专门讨论用负margin来实现多列布局。

**微调元素位置**

这是负margin最常用，也是最简单的方法。如果你在9个div中插入第十个div，有时候可能因为某些原因无法对齐，使用负margin可以仅对第十个进行微调，而不用必须去修改其他9个元素。

### Bug修复

**文字和链接的问题**

当浮动元素使用负margin时，在一些旧的浏览器中可能会出现问题，问题现象包括：

1. 链接无法点击;
2. 文字难以选中；
3. 失去焦点后，tab任何链接都会消失；

**解决方法：**给元素添加position:relative，便能正常运行！

**图片被截断**

如果你不幸在办公室使用IE6的话，有时候会发现重叠和浮动的元素中内容会被突然截断。

**解决方法：**同样，给浮动元素加上position:relative，一切将会恢复正常。

### 总结

负margin因其自身不添加额外标记就能定位元素的能力在现代网页设计中占有一席之地。随着更多的用户升级浏览器（包括IE8）， 这项技术的前途看起来会非常光明，更多的网站也会依赖于它。

如果你对负margin有任何独到的经历，欢迎留言告诉我。

## Browser Support

IE6 is prone to the [doubled float-margin bug](http://www.positioniseverything.net/explorer/doubled-margin.html), which can be resolved in most cases by adding `display: inline` to the floated element.

## Reference

- [margin](http://css-tricks.com/almanac/properties/m/margin/)
- [Collapsing Margins - SitePoint](http://www.sitepoint.com/web-foundations/collapsing-margins/)
- [负值之美：负margin在页面布局中的应用 / Owen Chen](http://owenchen.duapp.com/index.php/beauty-of-negative-values-negative-margin-in-page-layout-application/)