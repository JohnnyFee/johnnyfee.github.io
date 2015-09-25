layout: post
title: "SVG Viewport and View Box"
category: CSS
tags: [css, svg]
---

> orgin: <http://tutorials.jenkov.com/svg/svg-viewport-view-box.html> 

The viewport and view box of an SVG image set the dimensions of the visible part of the image.

## The Viewport

The viewport is the visible area of the SVG image. An SVG image can logically be as wide and high as you want,
but only a certain part of the image can be visible at a time. The area that is visible is called the viewport.

You specify the size of the viewport using the `width` and `height` attributes of
the `<svg>` element. Here is an example:

    <svg width="500" height="300"></svg>

This examples defines a viewport that is 500 units wide and 300 units high.

<!-- more -->

## Coordinate System Units

If you do not specify any units inside the `width` and `height`
attributes, the units are assumed to be pixels. That is, a `width` 500
means 500 pixels.

If you prefer to use different units than pixels, you can. Here is a list of the
units you can use with the `<svg>` element:

Unit | Description                                               
----| ----------------------------------------------------------
`em` | The default font size - usually the height of a character.
`ex` | The height of the character `x`                           
`px` | Pixels                                                    
`pt` | Points (1 / 72 of an inch)                                
`pc` | Picas (1 / 6 of an inch)                                  
`cm` | Centimeters                                               
`mm` | Millimeters                                               
`in` | Inches                                                    

The units you set on the `<svg>` element only affects the size of the `<svg>`
element (the viewport). The size of the SVG shapes displayed in the SVG image are determined by the
units you set on each shape. If no units are specified, the units will default to pixels.

Here is an example that shows an `<svg>` element with one set of units, containing
shapes with their own units set:

```html
<svg width="10cm" height="10cm">
    <rect x="50" y="100" width="50" height="50"
          style="stroke: #000000; fill: none;"/>
    <rect x="100" y="100" width="50mm" height="50mm"
          style="stroke: #000000; fill: none;" />
</svg>
```

The `<svg>` image has its units set in `cm`. The two `<rect>`
elements have their own units set. One uses pixels (no units explicitly set) and the other uses `mm`
for `width` and `height`.

Here is the resulting image. Notice how the right box (with `width` and `height`
units in `mm`) is bigger than the left box.

<svg width="10cm" height="10cm" style="border: 1px solid #cccccc;">
    <rect x="50" y="100" width="50" height="50" style="stroke: #000000; fill: none;"></rect>
    <rect x="100" y="100" width="50mm" height="50mm" style="stroke: #000000; fill: none;"></rect>
</svg>

## The View Box

You can redefine what the coordinates without units mean inside an `<svg>` element.
You do so using the `viewBox` attribute. Here is an example:

```
<svg width="500" height="200" **viewBox="0 0 50 20"** >
    <rect x="20" y="10" width="10" height="5"
          style="stroke: #000000; fill:none;"/>
</svg>
```

This example creates an `<svg>` element with a width of 500 pixels and a height of 200. The `viewBox` attribute of the `<svg>` contains four coordinates. These coordinates define the view box of the `<svg>` element.

In this case the view box spans from `0,0` to `50,20`. That means, that the 500 by 200 pixels `<svg>` element internally uses a coordinate system that goes from `0,0` to `50,20`. In other words, every 1 unit in the coordinates used in the shapes inside the `<svg>` corresponds to 500/50 = 10 pixels in the width, and 200/20 = 10 pixels in the height. That is why the rectangle with a x-position of 20 and an y-position of 10 is really
located at `200,100`, and its width (10) and height (5) corresponds to 100 pixels and 50 pixels.

Another way to explain it is, that the two first coordinates in the `viewBox` attribute defines the user coordinates of the upper left corner of the `<svg>` element, and the two last coordinates define the user coordinates of the lower right corner. The space inside the
`<svg>` is interpreted as spanning from the upper left coordinates to the lower
right coordinates of the view box.

Here is the resulting image:

<svg width="500" height="200" viewBox="0 0 50 20" style="border: 1px solid #cccccc;">
    <rect x="20" y="10" width="10" height="5" style="stroke: #000000; fill:none;"></rect>
</svg>

Notice how all coordinates inside the `<rect>` element are interpreted as
10 pixels for 1 unit.

## Preserving Aspect Ratio

If the viewport and the view box does not have the same aspect ratio (width-to-height ratio), you need to specify how the SVG viewer (e.g. the browser) is to display the SVG image. You do so using the `preserveAspectRatio` attribute of the `<svg<` element.

The `preserveAspectRatio` attribute takes two values separated by a space. The first value tells how the view box is aligned within the viewport. This value is itself composed of two parts. The second value tells how the aspect ratio is to be preserved (if at all).

The first value specifying the alignment consists of two parts. The first part specifies the x-alignment and the second part specifies the y-alignment. Here is a list of the values for x- and y-alignment:

Value | Description
-----| ------
xMin  | Align minimum x of view box with the left edge of the viewport.
xMid  | Align midpoint on the x-axis of view box with the center of the viewport on the x-axis.      
xMax  | Align maximum x of view box with the right edge of the viewport.
YMin  | Align minimum y of view box with the top edge of the viewport.
YMid  | Align midpoint on the y-axis of view box with the center point of the viewport on the y-axis.
YMin  | Align maximum y of view box with the bottom edge of the viewport.

You combine the x- and y-parts into a single value by appending the y-part after the x-part. Here are two examples:

    xMaxYMax
    xMidYMid

These two examples aligns the view box with the viewport differently. The first example aligns the right edge of the viewbox with the right edge of the viewport. The second example aligns the midldle of the viewbox with the middle of the viewport.

The second part of the `preserveAspectRatio` attribute value can take three different values:

Value   | Description                     
-------| ------------
`meet`  | Preserves aspect ratio and scales view box to fit within viewport.
`slice` | Preserves aspect ratio and slices off any part of the image that does not fit inside the viewport.              
`none`  | Does not preserve aspect ratio. Scales image to fit view box fully into viewport. Proportions will be distorted.

The second part of the `preserveAspectRatio` attribute value is appended to the first part, separated by a space. Here are two examples:

```
preserveAspectRatio="xMidYMid meet"
preserveAspectRatio="xMinYMin slice"
```

I haven't really discussed the effects of the various `preserveAspectRatio` settings are, so let us have a look a that.

The following examples all have the `width` set to 500, `height` to 75 and the `viewBox` attribute set to `0 0 250 75`. That means that along the x-axis every coordinate unit will correspond to 2 pixels, but along the y-axis every coordinate unit will only correspond to 1 pixel. As you can see, the aspect ratio along the x-axis is 500 / 250 = 2 and along the y-axis it is 75 / 75 = 1 . That could result in a distorted image, but we will see in the following examples how the various `preserveAspectRatio` settings handle these settings.

Here is first an example with the `preserveAspectRatio` set to `xMinYMin meet`. That will make sure that aspect ratio is kept, and the view box resized to fit within the viewport. That is, the view box is scaled according to the smaller of the two aspect ratios (the y-axis with a ratio of 1). The view box will be positioned in the upper left corner of the viewport because of the `xMinYMin` part. Here is the code and resulting image:

```html
<svg width="500" height="75" viewBox="0 0 250 75"
     **preserveAspectRatio="xMinYMin meet"**
     style="border: 1px solid #cccccc;">

    <rect x="1" y="1" width="50" height="50"
          style="stroke: #000000; fill:none;"/>

</svg>
```

<svg width="500" height="75" viewBox="0 0 250 75" preserveAspectRatio="xMinYMin meet" style="border: 1px solid #cccccc;">
    <rect x="1" y="1" width="50" height="50" style="stroke: #000000; fill:none;"></rect>
</svg>

The second example has `preserveAspectRatio` set to `xMinYMin slice`. That will preserve aspect ratio, but scale the view box according to the larger aspect ratio (the x-axis with ratio 2), resulting in an image too big to fit within the viewport. The image is said to be "sliced".

    <svg width="500" height="75" viewBox="0 0 250 75"
         **preserveAspectRatio="xMinYMin slice"**
         style="border: 1px solid #cccccc;">

        <rect x="1" y="1" width="50" height="50"
              style="stroke: #000000; fill:none;"/>

    </svg>

<svg width="500" height="75" viewBox="0 0 250 75" preserveAspectRatio="xMinYMin slice" style="border: 1px solid #cccccc;">
    <rect x="1" y="1" width="50" height="50" style="stroke: #000000; fill:none;"></rect>
</svg>

The third example has `preserveAspectRatio` set to `none`. That means that the view box will fill out the whole viewport, thus distorting the image since the aspect ratio along the x- and y-axis are not the same.

```html
<svg width="500" height="75" viewBox="0 0 250 75"
      **preserveAspectRatio="none"**
      style="border: 1px solid #cccccc;">

     <rect x="1" y="1" width="50" height="50"
           style="stroke: #000000; fill:none;"/>

</svg>
```

<svg width="500" height="75" viewBox="0 0 250 75" preserveAspectRatio="none" style="border: 1px solid #cccccc;">
    <rect x="1" y="1" width="50" height="50" style="stroke: #000000; fill:none;"></rect>
</svg>

### View Box Alignment

All of the example shown so far have used the `xMinYMin` setting. Depending on how you want to align the view box within the viewport, you may use different settings. I will get a bit deeper into how these settings work, but let us first look at an example:

    <svg width="500" height="100" viewBox="0 0 50 50"
         preserveAspectRatio="xMinYMin meet"
         style="border: 1px solid #cccccc;">

        <circle cx="25" cy="25" r="25"
                style="stroke: #000000; fill:none;"/>

    </svg>

This example shows an `<svg>` element with `width` set to 500 and `height` set to 100. The `viewBox` is set to `0 0 50 50`. That results in an x-axis aspect ratio of 500 / 50 = 10, and an y-axis aspect ratio of 100 / 50 = 2. The circle in the image has a radius of 25, making it 50 untis wide and 50 units high. Thus, it fills out the entire view box (not viewport).

When using the `meet` specifier, the view box will be scaled according to the y-axis, since it has the smaller aspect ratio. That means, that the view box will fill out the whole viewport along the y-axis (vertically), but only fill 2 * 50 pixels = 100 pixels (aspect ratio * view box X-dimension) along the x-axis (horizontally). Since the viewport is 500 pixels wide, you will have to specify how to align the view box horizontally inside the viewport. You do so using the `xMin`, `xMid` and `xMax` subparts of the first part of the `preserveAspectRatio` attribute value.

Here are three images showing the above example using `xMinYMin meet`, `xMidYmin meet` and `xMaxYmin meet` in the `preserveAspectRatio` attribute. Notice how the viewbox is aligned to the left, center and right depending on the setting.

<svg width="500" height="100" viewBox="0 0 50 50" preserveAspectRatio="xMinYMin meet" style="border: 1px solid #cccccc;">
    <circle cx="25" cy="25" r="25" style="stroke: #000000; fill:none;"></circle>
</svg>

<svg width="500" height="100" viewBox="0 0 50 50" preserveAspectRatio="xMidYMin meet" style="border: 1px solid #cccccc;">
    <circle cx="25" cy="25" r="25" style="stroke: #000000; fill:none;"></circle>
</svg>

<svg width="500" height="100" viewBox="0 0 50 50" preserveAspectRatio="xMaxYMin meet" style="border: 1px solid #cccccc;">
    <circle cx="25" cy="25" r="25" style="stroke: #000000; fill:none;"></circle>
</svg>

Similarly, if an image had a smaller aspect ratio along the x-axis than the y-axis, you would have to specify its y-alignment.

Here is the example from before, but now with a `width` of 100 and a `height` of 200:

The view box is the same size, thus making the aspect ratio along the y-axis (200 / 50 = 4) larger than along the x-axis (100 / 50 = 2). Therfore the view box will fill out the viewport in the x-axis direction, but not in the y-axis direction. That makes it necessary to specify the y-alignment for the view box.

    <svg width="100" height="200" viewBox="0 0 50 50"
         preserveAspectRatio="xMinYMin meet"
         style="border: 1px solid #cccccc;">

        <circle cx="25" cy="25" r="25"
                style="stroke: #000000; fill:none;"/>

    </svg>

Here are three images each showing one possible y-alignment using the subpart values `YMin`, `YMid` and `YMax`:

<svg width="100" height="200" viewBox="0 0 50 50" preserveAspectRatio="xMinYMin meet" style="border: 1px solid #cccccc;float:left;">
    <circle cx="25" cy="25" r="25" style="stroke: #000000; fill:none;"></circle>
</svg>

<svg width="100" height="200" viewBox="0 0 50 50" preserveAspectRatio="xMinYMid meet" style="border: 1px solid #cccccc;float:left;">
    <circle cx="25" cy="25" r="25" style="stroke: #000000; fill:none;"></circle>
</svg>

<svg width="100" height="200" viewBox="0 0 50 50" preserveAspectRatio="xMinYMax meet" style="border: 1px solid #cccccc;float:left;">
    <circle cx="25" cy="25" r="25" style="stroke: #000000; fill:none;"></circle>
</svg>

## Tutorial

- [理解SVG的viewport,viewBox,preserveAspectRatio « 张鑫旭-鑫空间-鑫生活](http://www.zhangxinxu.com/wordpress/2014/08/svg-viewport-viewbox-preserveaspectratio/)

<script async src="//codepen.io/assets/embed/ei.js"></script>