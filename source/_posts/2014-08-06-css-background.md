layout: post
title: "Css Background"
category: Css
tags: [css]
---

## background

The `background` property of CSS allows you to control the background of any element. For instance to change the background of an entire page to a light gray, you could do:

    html {
       background: #ccc; 
    }

But hex codes aren't the only way to declare color. There are also named colors. For instance:

    #page-wrap { background: white; }
    footer { background: black; }
    button.warning { background: red; }

<!-- more -->

RGB / RGBa / HSL / HSLa are yet another way to declare colors:

    #page-wrap {
      background: rgba(0, 0, 0, 0.8); /* 80% Black */
    }
    .widget {
      background: hsla(170, 50%, 45%, 1);
    }

[Learn more about RGBa](http://css-tricks.com/2151-rgba-browser-support/) (Red, Green, Blue, Alpha)  
[Learn more about HSLa](http://css-tricks.com/6565-yay-for-hsla/) (Hue, Saturation, Lightness, Alpha)

So far we've only talked about colors, but backgrounds can be images too.

    body {
      background: url(texture.jpg);
    }

Using the `url()` value you can supply a file path to an image you want to use as the background for that element. By default, that image will repeat. To prevent it from repeating, you'd add an extra property.

    body {
      background: url(pretty-flower.jpg) no-repeat;
    }

What is actually happening there is that `background` is actually a shorthand version of many properties put together. What is happening above is really this, shortened:

    body {
      background-image: url(pretty-flower.jpg);
      background-repeat: no-repeat;
    }

But it's important to note that the short hand also resets values that you don't specify. Notice we didn't indicate any color, so the color is automatically set to `transparent`, the default value for background-color.

The complete list of background-properties that compile into background are:

    background-attachment: scroll, fixed
    background-color: transparent, hex, named, rgba(), hsla()
    background-image: none, url() or gradient
    background-position: top, left, bottom, right or specific values e.g. 20px 20px
    background-repeat: repeat, no-repeat

And there are a few more that can be used but not included in the shorthand:

    background-size: auto, contain, cover, or specific values e.g. 20px 20px
    background-origin: padding-box, border-box, content-box
    background-clip: border-box, padding-box, content-box

## background-size

`background-size` 设置背景图片大小。初始值 `auto auto`。

__Values__

- `<length>` 值，指定背景图片大小，不能为负值。
- `<percentage>` 值，指定背景图片相对背景区（background positioning area）的百分比。背景区由background-origin设置，默认为盒模型的内容区与内边距，也可设置为只有内容区，或者还包括边框。如果attachment 为fixed，背景区为浏览器可视区（即视口），不包括滚动条。不能为负值。
- `auto` 以背景图片的比例缩放背景图片。
- `cover` 缩放背景图片以完全覆盖背景区，可能背景图片部分看不见。
- `contain` 缩放背景图片以完全装入背景区，可能背景区部分空白。
位图一定有固有尺寸与固有比例，矢量图可能两者都有，也可能只有一个。渐变视为只有固有尺寸或者只有固有比例的图片。

__Syntax__

    **/* 关键字 */**
    background-size: cover
    background-size: contain

    **/* 一个值: 这个值指定图片的宽度，图片的高度隐式的为auto */**
    background-size: 50%
    background-size: 3em
    background-size: 12px
    background-size: auto

    **/* 两个值:** **第一个值指定图片的宽度，****第二个值指定图片的高度** **\*/**
    background-size: 50% auto
    background-size: 3em 25%
    background-size: auto 6px
    background-size: auto auto

    **/* 逗号分隔的多个值：设置多重背景 */**
    background-size: auto, auto     /* 不同于background-size: auto auto */
    background-size: 50%, 25%, 25%
    background-size: 6px, auto, contain

    background-size: inherit

__背景图片大小计算__

- 如果指定了 background-size 的两个值并且不是auto：背景图片按指定大小渲染。
- contain 或 cover:
    保留固有比例，最大的包含或覆盖背景区。如果图像没有固有比例，则按背景区大小。
- auto 或 auto auto:
    图像如果有两个长度，则按这个尺寸。如果没有固有尺寸与固有比例，则按背景区的大小。如果没有固有尺寸但是有固有比例， 效果同 contain。如果有一个长度与比例，则由此长度与比例计算大小。如果有一个长度但是没有比例，则使用此长度与背景区相应的长度。
- 一个为 auto 另一个不是auto:
    如果图像有固有比例，则指定的长度使用指定值，未指定的长度由指定值与固有比例计算。如果图像没有固有比例，则指定的长度使用指定值，未指定的长度使用图像相应的固有长度，若没有固有长度，则使用背景区相应的长度。

注意，对于没有固有尺寸或固有比例的矢量图不是所有的浏览器都支持。特别注意测试Firefox 7- 与Firefox 8+，以确定不同之处能否接受。

### Perfect Full Page Background Image(background-size)

The goal here is a background image on a website that covers the entire browser window at all times. Let's put some specifics on it:

* Fills entire page with image, no white space
* Scales image as needed
* Retains image proportions (aspect ratio)
* Image is centered on page
* Does not _cause_ scrollbars
* As cross-browser compatible as possible
* Isn't some fancy shenanigans like Flash

We can do this purely through CSS thanks to the `background-size` property now in CSS3. We'll use the `html` element (better than `body` as it's always at least the height of the browser window). We set a fixed and centered background on it, then adjust it's size using `background-size` set to the cover keyword. 

    html { 
      background: url(images/bg.jpg) no-repeat center center fixed; 
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    }

Works in:

* Safari 3+
* Chrome Whatever+
* IE 9+
* Opera 10+ (Opera 9.5 supported background-size but not the keywords)
* Firefox 3.6+ (Firefox 4 supports non-vendor prefixed version)

[View Demo](http://css-tricks.com/examples/FullPageBackgroundImage/progressive.php)

## background-clip

background-clip  设置元素的背景（背景图片或颜色）显示范围。初始值 `border-box`。

如果没有背景图片，那么只有在边框设置为透明或半透明时才能看到视觉效果。

__Values__

- `border-box` 背景延伸到边框外沿。
- `padding-box` 背景延伸到内边距外沿。
- `content-box` 背景裁剪到内容区外沿。

Here are the schematics:

![](http://cdn.css-tricks.com/wp-content/uploads/2010/09/background-clip.png "background-clip")

    -moz-background-clip: border;     /* Firefox 3.6 */
    -webkit-background-clip: border;  /* Safari 4? Chrome 6? */
    background-clip: border-box;      /* Firefox 4, Safari 5, Opera 10, IE 9 */
                
    -moz-background-clip: padding;     /* Firefox 3.6 */
    -webkit-background-clip: padding;  /* Safari 4? Chrome 6? */
    background-clip: padding-box;      /* Firefox 4, Safari 5, Opera 10, IE 9 */
                
    -moz-background-clip: content;     /* Firefox 3.6 */
    -webkit-background-clip: content;  /* Safari 4? Chrome 6? */
    background-clip: content-box;      /* Firefox 4, Safari 5, Opera 10, IE 9 */

Here's a simple demo showing the different values of background-clip as well:

<p data-height="268" data-theme-id="0" data-slug-hash="Cpweh" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/chriscoyier/pen/Cpweh/'>The Different Background Clips</a> by Chris Coyier (<a href='http://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## clip-path & clip-mask

See [Clipping and Masking in CSS](http://css-tricks.com/clipping-masking-css/)

## background-origin

The `background-origin` CSS property determines the background positioning area, that is the position of the origin of an image specified using the [`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) CSS property. Initial value `padding-box`.

If the background of the element is an image, it can be quite important where the origin point of the background __starts__（绘制图像的起点）.

This is related to `background-clip`, because if the `background-clip` is the padding-box but the background-origin is left at the default `border-box`, some of the `background-image` will be cut off, which may or not be desireable.

Here is the schematic:

![](http://cdn.css-tricks.com/wp-content/uploads/2010/09/backgroundorigin.png "backgroundorigin")

Here's a simple demo showing the different values of background-orgin as well:

<p data-height="268" data-theme-id="0" data-slug-hash="IgoCa" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/chriscoyier/pen/IgoCa/'>The Different Values of background-origin</a> by Chris Coyier (<a href='http://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

### Transparent Borders

<p data-height="268" data-theme-id="0" data-slug-hash="yvpBk" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/yvpBk/'>border-transparent</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Tutorial

- [CSS Background: There's More To Know Than You Think - Vanseo Design](http://www.vanseodesign.com/css/background-properties/)

## Reference

- [background](http://css-tricks.com/almanac/properties/b/background/)
- [background-position - CSS](https://developer.mozilla.org/zh-CN/docs/CSS/background-position)
- [background-size - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)
- [background-clip - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)
- [background-origin - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin)
- [background-repeat - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat)
- [Perfect Full Page Background Image](http://css-tricks.com/perfect-full-page-background-image/)
- [Transparent Borders with background-clip](http://css-tricks.com/transparent-borders-with-background-clip/)

<script async src="//codepen.io/assets/embed/ei.js"></script>