layout: post
title: "SVG Stroke"
category: CSS
tags: [css, svg]
---

> origin: <http://tutorials.jenkov.com/svg/stroke.html>

The stroke of an SVG shape defines the outline of the shape. The stroke is one of the basic [SVG CSS properties](http://tutorials.jenkov.com/svg/svg-and-css.html) you can set for any SVG shape.

## The style Attribute

The `stroke` and `fill` CSS properties are specified inside the `style` attribute of an SVG shape. Here is an example:

```html
<circle cx="50" cy="50" r="50"
        style="stroke: #000066; fill: 3333ff;" />
```

<!-- more -->

This example defines a circle with a darker blue stroke color, and a lighter blue fill color.

## Stroke Example

The stroke of an SVG shape is the outline of the shape. Here is an SVG stroke example:

```
<circle cx="50" cy="50" r="25"
      style="stroke: #000000; fill:none;" />
```

This example defines a circle with a black (`#000000`) stroke color, and no fill. Here is the resulting image:

<svg width="500" height="100">
    <circle cx="50" cy="50" r="25" style="stroke: #000000; fill:none;"></circle>
</svg>

## Stroke and Fill Example

You can combine SVG stroke and fill colors for SVG shapes. Here is an SVG stroke and fill example:

    <circle cx="50" cy="50" r="25"
        style="stroke: #000066; fill: #3333ff;" />

This example defines a circle with a darker blue (`#000066`) stroke color, and a lighter blue (`#3333ff`) fill color. Here is the resulting image:

<svg width="500" height="100">
    <circle cx="50" cy="50" r="25" style="stroke: #000066; fill: #3333ff;"></circle>
</svg>

## stroke-width

SVG has a `stroke-width` CSS property that defines the width of the stroke. Here is an SVG `stroke-width` example:

    stroke-width: 3px;

This example set a stroke width of 3 pixels. You can use different units than pixels. See all available units in [SVG Coordinate System Units](http://tutorials.jenkov.com/svg/svg-coordinate-system.html#coordinate-system-units).

Here are four examples with different `stroke-width`:

    <circle cx="50" cy="50" r="25"
            style="stroke: #000066; fill: none;
                   stroke-width: 1px;" />

    <circle cx="150" cy="50" r="25"
            style="stroke: #000066; fill: none;
                   stroke-width: 3px;" />

    <circle cx="250" cy="50" r="25"
            style="stroke: #000066; fill: none;
                   stroke-width: 6px;" />

    <circle cx="350" cy="50" r="25"
            style="stroke: #000066; fill: none;
                   stroke-width: 12px;" />

Here is the resulting image:

<svg width="500" height="100">
    <circle cx="50" cy="50" r="25" style="stroke: #000066;
                   stroke-width: 1px;
                   fill: none;"></circle>
    <circle cx="150" cy="50" r="25" style="stroke: #000066;
                   stroke-width: 3px;
                   fill: none;"></circle>
    <circle cx="250" cy="50" r="25" style="stroke: #000066;
                   stroke-width: 6px;
                   fill: none;"></circle>
    <circle cx="350" cy="50" r="25" style="stroke: #000066;
                   stroke-width: 12px;
                   fill: none;"></circle>
</svg>

## stroke-linecap

The SVG `stroke-linecap` CSS property defines how the ends of an SVG line is rendered. There are three possible values for the `stroke-linecap` CSS property. These are:

    butt
    square
    round

The value `butt` results in a linecap that is cut off exactly where the line ends. The value `square` results in a linecap that looks like `butt` (cut off), but which extends a bit beyond where the line ends. The value `round` results in a round linecap.

Here are three SVG `stroke-linecap` examples which illustrate these three
`stroke-linecap` values (sequence = `butt`, `square`, `round`):

<svg width="500" height="100">
    <line x1="50" y1="20" x2="150" y2="20" style="stroke: #00cc00; fill:none;                  stroke-width: 10px;                  stroke-linecap: butt"></line>
    <line x1="50" y1="20" x2="150" y2="20" style="stroke: #000000; fill:none;
                 stroke-width: 1px;"></line>
    <line x1="50" y1="50" x2="150" y2="50" style="stroke: #00cc00; fill:none;
          stroke-width: 16px;
          stroke-linecap: square"></line>
    <line x1="50" y1="50" x2="150" y2="50" style="stroke: #000000; fill:none;
                 stroke-width: 1px;"></line>
    <line x1="50" y1="80" x2="150" y2="80" style="stroke: #00cc00; fill:none;
          stroke-width: 16px;
          stroke-linecap: round"></line>
    <line x1="50" y1="80" x2="150" y2="80" style="stroke: #000000; fill:none;
                 stroke-width: 1px;"></line>
</svg>

This example defines three green lines with a `stroke-width` of 10 to better illustrate the effect of the `stroke-linecap` CSS property. Inside each green line is drawn a black line with a `stroke-width` of 1. This line has the same `x1, y1` and `x2, y2` coordinates as the green line, but has no `stroke-linecap` set. That way you can see the difference between the different `stroke-linecap` values.

## stroke-linejoin

The `stroke-linejoin` CSS property defines how the join between two lines in a shape is rendered. The `stroke-linejoin` CSS property can take one of three values. These values are:

    miter
    round
    bevel

Here are three SVG `stroke-linejoin` examples which illustrate these different values:

```
<path d="M20,100 l20,-50 l20,50"
      style="stroke: #000000;    fill:none;
             stroke-width:16px;
             stroke-linejoin: miter;" />
<text x="22" y="20">miter</text>

<path d="M120,100 l20,-50 l20,50"
      style="stroke: #000000;    fill:none;
             stroke-width:16px;
             stroke-linejoin: round;" />
<text x="122" y="20">round</text>

<path d="M220,100 l20,-50 l20,50"
      style="stroke: #000000;    fill:none;
             stroke-width:16px;
             stroke-linejoin: bevel;" />
<text x="222" y="20">bevel</text>    
```

<svg width="500" height="120">
    <path d="M20,100 l20,-50 l20,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;"></path>
    <text x="22" y="20">miter</text>
    <path d="M120,100 l20,-50 l20,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: round;"></path>
    <text x="122" y="20">round</text>
    <path d="M220,100 l20,-50 l20,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: bevel;"></path>
    <text x="222" y="20">bevel</text>
</svg>

## stroke-miterlimit

The `stroke-miterlimit` CSS propety is used together with the `stroke-linejoin` CSS property. If `stroke-linejoin` is set to <coode>miter</coode>, then the `stroke-miterlimit` can be used to limit how far between the point where the two lines meet, that the line join (corner) extends.

Here is an SVG `stroke-miterlimit` example:

    <path d="M20,100 l20,-50 l20,50"
          style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 stroke-miterlimit: 1.0;
                 " />
    <text x="29" y="20">1.0</text>
    <path d="M120,100 l20,-50 l20,50"
          style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 stroke-miterlimit: 2.0;
                 " />
    <text x="129" y="20">2.0</text>
    <path d="M220,100 l20,-50 l20,50"
          style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 stroke-miterlimit: 4.0;
                 " />
    <text x="229" y="20">4.0</text>    

Notice how three different `stroke-miterlimit` values are used for the three paths which otherwise look pretty much the same. Here is the resulting image:

<svg width="500" height="120">
    <path d="M20,100 l20,-50 l20,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 stroke-miterlimit: 1.0;
                 "></path>
    <text x="29" y="20">1.0</text>
    <path d="M120,100 l20,-50 l20,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 stroke-miterlimit: 2.0;
                 "></path>
    <text x="129" y="20">2.0</text>
    <path d="M220,100 l20,-50 l20,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 stroke-miterlimit: 4.0;
                 "></path>
    <text x="229" y="20">4.0</text>
</svg>

The length of the line join is called miter length. The miter length is measured from the inner corner of the line join to the tip of the line join. In this image the miter length is drawn in red ontop of the joined lines, and repeated again to the right of the joined lines:

<svg width="500" height="120">
    <path d="M20,100 l20,-50 l20,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 "></path>
    <line x1="40" y1="29" x2="40" y2="73" style="stroke: #ff0000; stroke-width: 3px;"></line>
    <line x1="60" y1="29" x2="60" y2="73" style="stroke: #ff0000; stroke-width: 3px;"></line>
    <path d="M120,100 l40,-50 l40,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 "></path>
    <line x1="160" y1="35" x2="160" y2="63" style="stroke: #ff0000; stroke-width: 3px;"></line>
    <line x1="180" y1="35" x2="180" y2="63" style="stroke: #ff0000; stroke-width: 3px;"></line>
</svg>

As you can imagine, the wider the stroke is, and the sharper the angle between the joining lines, the longer the miter becomes.

The `stroke-miterlimit` actually sets the limit for the ratio between the miter length and stroke width. Thus, a `stroke-miterlimit` of 1.0 means that the miter length can be maximally 1 x stroke width. The miter is cut off beyond that. 1.0 is the smallest possible value for `stroke-miterlimit`.

Here are some examples using `1.0` as `stroke-miterlimit` value, but with different angles of the joining lines:

<svg width="500" height="120">
    <path d="M20,100 l20,-50 l20,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 stroke-miterlimit: 1.0;
                 "></path>
    <path d="M140,100 l50,-50 l50,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 stroke-miterlimit: 1.0;
                 "></path>
    <path d="M320,100 l80,-50 l80,50" style="stroke: #000000;    fill:none;
                 stroke-width:16px;
                 stroke-linejoin: miter;
                 stroke-miterlimit: 1.0;
                 "></path>
</svg>

Notice how the part of the miter which is cut off is larger when the angle is larger. That is because the sharper angle naturally produces a longer miter.

## stroke-dasharray + stroke-dashoffset

The SVG `stroke-dasharray` CSS property is used to make the stroke of an SVG shape rendered with dashed lines. The reason it is called a "dash array" is that you provide an array of numbers as value. The values define the length of dashes and spaces. Therefore you should provide an even number of numbers.

Here is an SVG `stroke-dasharray` example:

    <line x1="20" y1="20" x2="120" y2="20"
          style="stroke: #000000; fill:none;
          stroke-width: 6px;
          stroke-dasharray: 10 5"  />

This example defines a stroke that is dashed with the dashed parts being 10 pixels wide, and the space between the dashes being 5 pixels. Here is the resulting image:

<svg width="500" height="100">
    <line x1="20" y1="20" x2="120" y2="20" style="stroke: #000000; fill:none;
          stroke-width: 6px;
          stroke-dasharray: 10 5"></line>
</svg>

Here are a few more examples with different dash and space width:

    <line x1="20" y1="20" x2="120" y2="20"
          style="stroke: #000000; fill:none;
          stroke-width: 6px;
          stroke-dasharray: 10 5 5 5"  />

    <line x1="20" y1="40" x2="120" y2="40"
          style="stroke: #000000; fill:none;
          stroke-width: 6px;
          stroke-dasharray: 10 5 5 10"  />    

The first line starts with a dash width of 10, followed by a space of 5 pixels, then with a dash of 5 pixels, and then another space of 5 pixels. And then the pattern is repeated.

The second line starts with a dash width of 10, followed by a space of 5 pixels, then a dash of 5 pixels, and finally a space of 10 pixels.

Here is the resulting image:

<svg width="500" height="100">
    <line x1="20" y1="20" x2="120" y2="20" style="stroke: #000000; fill:none;
          stroke-width: 6px;
          stroke-dasharray: 10 5 5 5"></line>
    <line x1="20" y1="40" x2="120" y2="40" style="stroke: #000000; fill:none;
          stroke-width: 6px;
          stroke-dasharray: 10 5 5 10"></line>
</svg>

The `stroke-dashoffset` is used to set how far into dash pattern to start the pattern. That way you can start the dashing from e.g. halfway into the pattern, and then repeat the pattern from there. Here is an SVG `stroke-dashoffset` example:

    <line x1="20" y1="20" x2="170" y2="20"
          style="stroke: #000000; fill:none;
          stroke-width: 6px;
          stroke-dasharray: 10 5;
          stroke-dashoffset: 5;
          "  />    

This example sets `dash-offset` to 5 pixels, meaning the rendering of the dashed line will start 5 pixels into the dash pattern (not all browsers fully support this yet). Here is the resulting image:

<svg width="500" height="100">
    <line x1="20" y1="20" x2="170" y2="20" style="stroke: #000000; fill:none;
          stroke-width: 6px;
          stroke-dasharray: 10 5;
          stroke-dashoffset: 5;
          "></line>
</svg>

## stroke-opacity

The SVG `stroke-opacity` CSS property is used to define the opacity of the outline of an SVG shape. The `stroke-opacity` takes a decimal number between 0 and 1. The closer to 0 the value is, the more transparent the stroke is. The closer to 1 the value is, the more opaque the stroke is. The default `stroke-opacity` is 1, meaning the stroke is fully opaque.

Here is an SVG `stroke-opacity` example which shows three lines with different `stroke-opacity` ontop of a text:

```
<text x="22" y="40">Text Behind Shape</text>

<path d="M20,40 l50,0"
      style="stroke: #00ff00;    fill:none;
             stroke-width:16px;
             stroke-opacity: 0.3;
             " />

<path d="M80,40 l50,0"
      style="stroke: #00ff00;    fill:none;
             stroke-width:16px;
             stroke-opacity: 0.7;
             " />

<path d="M140,40 l50,0"
      style="stroke: #00ff00;    fill:none;
             stroke-width:16px;
             stroke-opacity: 1;
             " />
```

Here is the resulting image. Notice how the text is less and less visible through the different lines.

<svg width="500" height="120">
    <text x="22" y="40">Text Behind Shape</text>
    <path d="M20,40 l50,0" style="stroke: #00ff00;    fill:none;
                 stroke-width:16px;
                 stroke-opacity: 0.3;
                 "></path>
    <path d="M80,40 l50,0" style="stroke: #00ff00;    fill:none;
                 stroke-width:16px;
                 stroke-opacity: 0.7;
                 "></path>
    <path d="M140,40 l50,0" style="stroke: #00ff00;    fill:none;
                 stroke-width:16px;
                 stroke-opacity: 1;
                 "></path>

</svg>  