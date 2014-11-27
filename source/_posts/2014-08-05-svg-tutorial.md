---
layout: post
title: "SVG Tutorial"
category: Css
tags: [css, svg]
--- 
## Quick Start

Let us dive straight in with a simple example. Take a look at the following code.

```
<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" fill="red" />

  <circle cx="150" cy="100" r="80" fill="green" />

  <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>

</svg>
```

<!--more-->

Copy the code and paste it in a file demo1.svg. Then open the file in Firefox. It will render as shown in the following screenshot. (Firefox users: click [here](http://developer.mozilla.org/@api/deki/files/4571/=svgdemo1.xml "http://developer.mozilla.org/@api/deki/files/4571/=svgdemo1.xml"))

![svgdemo1.png](https://developer.mozilla.org/@api/deki/files/4928/=svgdemo1.png)

The rendering process involves the following:

1.  We start with the `svg` root element:

    * a doctype declaration as known from (X)HTML should be left off because DTD based SVG validation leads to more problems than it solves
    * to identify the version of the SVG for other types of validation the `version` and `baseProfile` attributes should always be used instead
    * as an XML dialect, SVG must always bind the namespaces correctly (in the xmlns attribute). See the [Namespaces Crash Course](https://developer.mozilla.org/en/docs/Web/SVG/Namespaces_Crash_Course "en-US/Web/SVG/Namespaces_Crash_Course") page for more info.
2.  The background is set to red by drawing a rectangle [`<rect/>`](https://developer.mozilla.org/en-US/Web/SVG/Element/rect "en-US/Web/SVG/Element/rect") that covers the complete image area
3.  A green circle [`<circle/>`](https://developer.mozilla.org/en-US/Web/SVG/Element/circle "en-US/Web/SVG/Element/circle") with a radius of 80px is drawn atop the center of the red rectangle (offset 30+120px inward, and 50+50px upward).
4.  The text "SVG" is drawn. The interior of each letter is filled in with white. The text is positioned by setting an anchor at where we want the midpoint to be: in this case, the midpoint should correspond to the center of the green circle. Fine adjustments can be made to the font size and vertical position to ensure the final result is aesthetically pleasing.

### Basic properties of SVG files

* The first important thing to notice is the order of rendering of elements. The globally valid rule for SVG files is, that _later_ elements are rendered _atop previous_ elements. The further down an element is the more will be visible.
* SVG files on the web can be displayed directly in the browser or embedded in HTML files via several methods:

    * If the HTML is XHTML and is delivered as type `application/xhtml+xml`, the SVG can be directly embedded in the XML source.
    * If the HTML is HTML5, and the browser is a conforming HTML5 browser, the SVG can be directly embedded, too. However, there may be syntax changes necessary to conform to the HTML5 specification
    * The SVG file can be referenced with an `object` element:

            <object data="image.svg" type="image/svg+xml" />

    * Likewise an `iframe` element can be used:

            <iframe src="image.svg"></iframe>

    * An `img` element can be used theoretically, too. However this technique doesn't work in Firefox before 4.0.
    * Finally SVG can be created dynamically with JavaScript and injected into the HTML DOM. This has the advantage, that replacement technologies for browsers, that can't process SVG, can be implemented.
      See [this dedicated article](https://developer.mozilla.org/en-US/Web/SVG_In_HTML_Introduction "svg in html introduction") for an in-depth dealing with the topic.

* How SVG handles sizes and units will be explained [on the next page](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Positions "en-US/Web/SVG/Tutorial/Positions").

## Basic Shapes

### Rectangles

The [rect](https://developer.mozilla.org/en-US/Web/SVG/Element/rect "en-US/Web/SVG/Element/rect") element does exactly what you would expect and draws a rectangle on the screen. There are really only 6 basic attributes that control the position and shape of the rectangle on screen here. The image shown earlier shows two rect elements, which I admit is a bit redundant. The one on the right has its rx and ry attributes set, giving it rounded corners. If they're not set, they default to 0.

```
<rect x="10" y="10" width="30" height="30"/>
<rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
```

<dl>
    <dt>  x</dt>
    <dd>  The x position of the top left corner of the rectangle.</dd>
    <dt>  y</dt>
    <dd>  The y position of the top left corner of the rectangle.</dd>
    <dt>  width</dt>
    <dd>  The width of the rectangle</dd>
    <dt>  height</dt>
    <dd>  The height of the rectangle</dd>
    <dt>  rx</dt>
    <dd>  The x radius of the corners of the rectangle</dd>
    <dt>  ry</dt>
    <dd>  The y radius of the corners of the rectangle</dd>
</dl>

### Circle

As you would have guessed, the [circle](https://developer.mozilla.org/en-US/Web/SVG/Element/circle "en-US/Web/SVG/Element/circle") element draws a circle on the screen. There are really only 3 attributes that are applicable here.

```
<circle cx="25" cy="75" r="20"/>
```

<dl>
    <dt>  r</dt>
    <dd>  The radius of the circle.</dd>
    <dt>  cx</dt>
    <dd>  The x position of the center of the circle.</dd>
    <dt>  cy</dt>
    <dd>  The y position of the center of the circle.</dd>
</dl>

### Ellipse

[Ellipse](https://developer.mozilla.org/en-US/Web/SVG/Element/ellipse "en-US/Web/SVG/Element/ellipse")s are actually just a more general form of the circle element, where you can scale the x and y radius (commonly called the semimajor and semiminor axis by math people) of the circle separately.

```
<ellipse cx="75" cy="75" rx="20" ry="5"/>
```

<dl>
    <dt>  rx</dt>
    <dd>  The x radius of the ellipse.</dd>
    <dt>  ry</dt>
    <dd>  The y radius of the ellipse.</dd>
    <dt>  cx</dt>
    <dd>  The x position of the center of the ellipse.</dd>
    <dt>  cy</dt>
    <dd>  The y position of the center of the ellipse.</dd>
</dl>

### Line

[Line](https://developer.mozilla.org/en-US/Web/SVG/Element/line "en-US/Web/SVG/Element/line")s are again, just straight lines. They take as attributes two points which specify the start and end point of the line.

```
<line x1="10" x2="50" y1="110" y2="150"/>
```

<dl>
    <dt>  x1</dt>
    <dd>  The x position of point 1.</dd>
    <dt>  y1</dt>
    <dd>  The y position of point 1.</dd>
    <dt>  x2</dt>
    <dd>  The x position of point 2.</dd>
    <dt>  y2</dt>
    <dd>  The y position of point 2.</dd>
</dl>

### Polyline

[Polyline](https://developer.mozilla.org/en-US/Web/SVG/Element/polyline "en-US/Web/SVG/Element/polyline")s are groups of connected straight lines. Since that list can get quite long, all the points are included in one attribute:

```
<polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145"/>
```

<dl>
    <dt>  points</dt>
    <dd>  A list of points, each number separated by a space, comma, 

    <abbr title="End of line">EOL</abbr>, or a line feed character. Each point must contain two numbers, an x coordinate and a y coordinate. So the list (0,0), (1,1) and (2,2) could be written: "0 0, 1 1, 2 2".</dd>
</dl>

### Polygon

[Polygon](https://developer.mozilla.org/en-US/Web/SVG/Element/polygon "en-US/Web/SVG/Element/polygon")s are a lot like polylines in that they're composed of straight line segments connecting a list a points. For polygons though, the path automatically returns to the first point for you at the end, creating a closed shape. Note that a rectangle is a type of polygon, so a polygon can be used to create a `<rect/>` element in cases where you need a little more flexibility.

```
<polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180"/>
```

<dl>
    <dt>  points</dt>
    <dd>  A list of points, each number separated by a space, comma, 

    <abbr title="End of line">EOL</abbr>, or a line feed character. Each point must contain two numbers, an x coordinate and a y coordinate. So the list (0,0), (1,1) and (2,2) could be written: "0 0, 1 1, 2 2". The drawing then closes the path, so a final straight line would be drawn from (2,2) to (0,0).</dd>
</dl>

### Path

[Path](https://developer.mozilla.org/en-US/Web/SVG/Element/path "en-US/Web/SVG/Element/path") is probably the most general shape that can be used in SVG. Using a path element you can draw rectangles (with or without rounded corners), circles, ellipses, polylines, and polygons. Basically any of the other types of shapes, bezier curves, quadratic curves, and many more. For that reason, paths alone will be [the next section](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Paths "en-US/Web/SVG/Tutorial/Paths") in this tutorial, but for now I will just point out that there is a single attribute used to control its shape.

```
<path d="M 20 230 Q 40 205, 50 230 T 90230"/>
```

<dl>
    <dt>  d</dt>
    <dd>  A list of points and other information about how to draw the path. See the [Paths](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Paths "en-US/Web/SVG/Tutorial/Paths") section for more information.</dd>
</dl>

## Toos

- [FWeinb/grunt-svgstore](https://github.com/FWeinb/grunt-svgstore)

## Tutorial

- [The ultimate SVG guide](https://psdtowp.net/svg.html)
- [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)
- [SVG教程 - SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)
- [Pocket Guide to Writing SVG](http://svgpocketguide.com/book)
- [SVG Tutorial](http://tutorials.jenkov.com/svg/index.html)
- [Using SVG](http://css-tricks.com/using-svg/)
- [Animating Inline SVG Icons](http://flippinawesome.org/2014/06/03/animating-inline-svg-icons/?-inline-svg-icons)
- [Icon System with SVG Sprites](http://css-tricks.com/svg-sprites-use-better-icon-fonts/)
- [Understanding SVG Coordinate Systems & Transformations (Part 1)– The viewport, `viewBox`, & `preserveAspectRatio`](http://sarasoueidan.com/blog/svg-coordinate-systems/)
- [Understanding SVG Coordinate Systems & Transformations (Part 2) – The `transform` Attribute](http://sarasoueidan.com/blog/svg-transformations/)
- [Understanding SVG Coordinate Systems & Transformations (Part 3) – Establishing New Viewports](http://sarasoueidan.com/blog/nesting-svgs/)
- [Inline SVG vs Icon Fonts [CAGEMATCH]](http://css-tricks.com/icon-fonts-vs-svg/)
- [Swapping Out SVG Icons](http://css-tricks.com/swapping-svg-icons)
- [Making SVGs Responsive with CSS](http://tympanus.net/codrops/2014/08/19/making-svgs-responsive-with-css)
- [A Guide to SVG Animations (SMIL)](http://css-tricks.com/guide-svg-animations-smil/)

### SVG Attribute reference

[SVG Attribute reference - SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)

### MDN Tutorial

1.  [引言](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Introduction "en-US/Web/SVG/Tutorial/Introduction")
2.  [入门](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Getting_Started "en-US/Web/SVG/Tutorial/Getting_Started")
3.  [定位](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Positions "en-US/Web/SVG/Tutorial/Positions")
4.  [基本形状](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Basic_Shapes "en-US/Web/SVG/Tutorial/Basic_Shapes")
5.  [路径](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Paths "en-US/Web/SVG/Tutorial/Paths")
6.  [填充与边框](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Fills_and_Strokes "en-US/Web/SVG/Tutorial/Fills_and_Strokes")
7.  [渐变](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Gradients "en-US/Web/SVG/Tutorial/Gradients")
8.  [模式](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Patterns "en-US/Web/SVG/Tutorial/Patterns")
9.  [文字](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Texts "en-US/Web/SVG/Tutorial/Texts")
10.  [基本变换](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Basic_Transformations "en-US/Web/SVG/Tutorial/Basic_Transformations")
11.  [裁剪和遮罩](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Clipping_and_masking "en-US/Web/SVG/Tutorial/Clipping_and_masking")
12.  [其他SVG内容](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Other_content_in_SVG "en-US/Web/SVG/Tutorial/Other content in SVG")
13.  [滤镜效果](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Filter_effects "en-US/Web/SVG/Tutorial/Filter effects")
14.  [SVG字体](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/SVG_fonts "en-US/Web/SVG/Tutorial/SVG fonts")
15.  [SVG的Image标签](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/SVG_Image_Tag "en-US/Web/SVG/Tutorial/SVG Image Tag")
16.  [SVG工具](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Tools_for_SVG "en-US/Web/SVG/Tutorial/Tools_for_SVG")
