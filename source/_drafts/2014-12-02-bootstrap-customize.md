---
layout: post
title: "Bootstrap 定制"
category: JavaScript
tags: [javascript]
---

<link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/twitter-bootstrap/3.3.0/css/bootstrap.css">

## 工具

- [定制并下载 Bootstrap · Bootstrap 中文文档](http://v3.bootcss.com/customize/)

## 颜色

Easily make use of two color schemes: grayscale and semantic. Grayscale colors provide quick access to commonly used shades of black while semantic include various colors assigned to meaningful contextual values.


<div style="overflow: hidden;">
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #222;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #333;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #555;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #999;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #eee;"></div>
</div>

<!-- more -->

```scss
@gray-darker:  lighten(#000, 13.5%); // #222
@gray-dark:    lighten(#000, 20%);   // #333
@gray:         lighten(#000, 33.5%); // #555
@gray-light:   lighten(#000, 46.7%); // #777
@gray-lighter: lighten(#000, 93.5%); // #eee
```

<div style="overflow: hidden;">
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #428bca;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #5cb85c;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #5bc0de;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #f0ad4e;"></div>
    <div style="width: 100px; height: 100px; margin: 0 5px; border-radius: 3px; float: left;background-color: #d9534f;"></div>
</div>

```scss
gray-darker:  lighten(#000, 13.5%); // #222
@gray-dark:    lighten(#000, 20%);   // #333
@gray:         lighten(#000, 33.5%); // #555
@gray-light:   lighten(#000, 46.7%); // #777
@gray-lighter: lighten(#000, 93.5%); // #eee
```

Use any of these color variables as they are or reassign them to more meaningful variables for your project.

<div class="zero-clipboard"><span class="btn-clipboard">Copy</span></div>

```scss
// Use as-is
.masthead {
  background-color: @brand-primary;
}

// Reassigned variables in Less
@alert-message-background: @brand-info;
.alert {
  background-color: @alert-message-background;
}
```

## 变量

### Scaffolding

A handful of variables for quickly customizing key elements of your site's skeleton.

```scss
// Scaffolding
@body-bg:    #fff;
@text-color: @black-50;
```

### Links

Easily style your links with the right color with only one value.

```scss
// Variables
@link-color:       @brand-primary;
@link-hover-color: darken(@link-color, 15%);

// Usage
a {
  color: @link-color;
  text-decoration: none;

  &:hover {
    color: @link-hover-color;
    text-decoration: underline;
  }
}
```

Note that the `@link-hover-color` uses a function, another awesome tool from Less, to automagically create the right hover color. You can use `darken`, `lighten`, `saturate`, and `desaturate`.

### Typography

Easily set your type face, text size, leading, and more with a few quick variables. Bootstrap makes use of these as well to provide easy typographic mixins.

```css
@font-family-sans-serif:  "Helvetica Neue", Helvetica, Arial, sans-serif;
@font-family-serif:       Georgia, "Times New Roman", Times, serif;
@font-family-monospace:   Menlo, Monaco, Consolas, "Courier New", monospace;
@font-family-base:        @font-family-sans-serif;

@font-size-base:          14px;
@font-size-large:         ceil((@font-size-base * 1.25)); // ~18px
@font-size-small:         ceil((@font-size-base * 0.85)); // ~12px

@font-size-h1:            floor((@font-size-base * 2.6)); // ~36px
@font-size-h2:            floor((@font-size-base * 2.15)); // ~30px
@font-size-h3:            ceil((@font-size-base * 1.7)); // ~24px
@font-size-h4:            ceil((@font-size-base * 1.25)); // ~18px
@font-size-h5:            @font-size-base;
@font-size-h6:            ceil((@font-size-base * 0.85)); // ~12px

@line-height-base:        1.428571429; // 20/14
@line-height-computed:    floor((@font-size-base * @line-height-base)); // ~20px

@headings-font-family:    inherit;
@headings-font-weight:    500;
@headings-line-height:    1.1;
@headings-color:          inherit;
```

### Icons

Two quick variables for customizing the location and filename of your icons.


```css
@icon-font-path:          "../fonts/";
@icon-font-name:          "glyphicons-halflings-regular";
```

### Components

Components throughout Bootstrap make use of some default variables for setting common values. Here are the most commonly used.

```css
@padding-base-vertical:          6px;
@padding-base-horizontal:        12px;

@padding-large-vertical:         10px;
@padding-large-horizontal:       16px;

@padding-small-vertical:         5px;
@padding-small-horizontal:       10px;

@padding-xs-vertical:            1px;
@padding-xs-horizontal:          5px;

@line-height-large:              1.33;
@line-height-small:              1.5;

@border-radius-base:             4px;
@border-radius-large:            6px;
@border-radius-small:            3px;

@component-active-color:         #fff;
@component-active-bg:            @brand-primary;

@caret-width-base:               4px;
@caret-width-large:              5px;
```

## 针对特定厂商的 mixin

Vendor mixins are mixins to help support multiple browsers by including all relevant vendor prefixes in your compiled CSS.

### Box-sizing

Reset your components' box model with a single mixin. For context, see this [helpful article from Mozilla](https://developer.mozilla.org/en-US/docs/CSS/box-sizing).

The mixin is **deprecated** as of v3.2.0, with the introduction of autoprefixer. To preserve backwards-compatibility, Bootstrap will continue to use the mixin internally until Bootstrap v4.

```scss
.box-sizing(@box-model) {
  -webkit-box-sizing: @box-model; // Safari <= 5
     -moz-box-sizing: @box-model; // Firefox <= 19
          box-sizing: @box-model;
}
```

### Rounded corners

Today all modern browsers support the non-prefixed `border-radius` property. As such, there is no `.border-radius()` mixin, but Bootstrap does include shortcuts for quickly rounding two corners on a particular side of an object.

```scss
.border-top-radius(@radius) {
  border-top-right-radius: @radius;
   border-top-left-radius: @radius;
}
.border-right-radius(@radius) {
  border-bottom-right-radius: @radius;
     border-top-right-radius: @radius;
}
.border-bottom-radius(@radius) {
  border-bottom-right-radius: @radius;
   border-bottom-left-radius: @radius;
}
.border-left-radius(@radius) {
  border-bottom-left-radius: @radius;
     border-top-left-radius: @radius;
}
```

### Box (Drop) shadows

If your target audience is using the latest and greatest browsers and devices, be sure to just use the `box-shadow` property on its own. If you need support for older Android (pre-v4) and iOS devices (pre-iOS 5), use the **deprecated** mixin to pick up the required `-webkit` prefix.

The mixin is **deprecated** as of v3.1.0, since Bootstrap doesn't officially support the outdated platforms that don't support the standard property. To preserve backwards-compatibility, Bootstrap will continue to use the mixin internally until Bootstrap v4.

Be sure to use `rgba()` colors in your box shadows so they blend as seamlessly as possible with backgrounds.

```scss
.box-shadow(@shadow: 0 1px 3px rgba(0,0,0,.25)) {
  -webkit-box-shadow: @shadow; // iOS <4.3 & Android <4.1
          box-shadow: @shadow;
}
```

### Transitions

Multiple mixins for flexibility. Set all transition information with one, or specify a separate delay and duration as needed.

The mixins are **deprecated** as of v3.2.0, with the introduction of autoprefixer. To preserve backwards-compatibility, Bootstrap will continue to use the mixins internally until Bootstrap v4.

```scss
.transition(@transition) {
  -webkit-transition: @transition;
          transition: @transition;
}
.transition-property(@transition-property) {
  -webkit-transition-property: @transition-property;
          transition-property: @transition-property;
}
.transition-delay(@transition-delay) {
  -webkit-transition-delay: @transition-delay;
          transition-delay: @transition-delay;
}
.transition-duration(@transition-duration) {
  -webkit-transition-duration: @transition-duration;
          transition-duration: @transition-duration;
}
.transition-timing-function(@timing-function) {
  -webkit-transition-timing-function: @timing-function;
          transition-timing-function: @timing-function;
}
.transition-transform(@transition) {
  -webkit-transition: -webkit-transform @transition;
     -moz-transition: -moz-transform @transition;
       -o-transition: -o-transform @transition;
          transition: transform @transition;
}
```

### Transformations

Rotate, scale, translate (move), or skew any object.

The mixins are **deprecated** as of v3.2.0, with the introduction of autoprefixer. To preserve backwards-compatibility, Bootstrap will continue to use the mixins internally until Bootstrap v4.

```scss
.rotate(@degrees) {
  -webkit-transform: rotate(@degrees);
      -ms-transform: rotate(@degrees); // IE9 only
          transform: rotate(@degrees);
}
.scale(@ratio; @ratio-y...) {
  -webkit-transform: scale(@ratio, @ratio-y);
      -ms-transform: scale(@ratio, @ratio-y); // IE9 only
          transform: scale(@ratio, @ratio-y);
}
.translate(@x; @y) {
  -webkit-transform: translate(@x, @y);
      -ms-transform: translate(@x, @y); // IE9 only
          transform: translate(@x, @y);
}
.skew(@x; @y) {
  -webkit-transform: skew(@x, @y);
      -ms-transform: skewX(@x) skewY(@y); // See https://github.com/twbs/bootstrap/issues/4885; IE9+
          transform: skew(@x, @y);
}
.translate3d(@x; @y; @z) {
  -webkit-transform: translate3d(@x, @y, @z);
          transform: translate3d(@x, @y, @z);
}

.rotateX(@degrees) {
  -webkit-transform: rotateX(@degrees);
      -ms-transform: rotateX(@degrees); // IE9 only
          transform: rotateX(@degrees);
}
.rotateY(@degrees) {
  -webkit-transform: rotateY(@degrees);
      -ms-transform: rotateY(@degrees); // IE9 only
          transform: rotateY(@degrees);
}
.perspective(@perspective) {
  -webkit-perspective: @perspective;
     -moz-perspective: @perspective;
          perspective: @perspective;
}
.perspective-origin(@perspective) {
  -webkit-perspective-origin: @perspective;
     -moz-perspective-origin: @perspective;
          perspective-origin: @perspective;
}
.transform-origin(@origin) {
  -webkit-transform-origin: @origin;
     -moz-transform-origin: @origin;
      -ms-transform-origin: @origin; // IE9 only
          transform-origin: @origin;
}
```
### Animations

A single mixin for using all of CSS3's animation properties in one declaration and other mixins for individual properties.

The mixins are **deprecated** as of v3.2.0, with the introduction of autoprefixer. To preserve backwards-compatibility, Bootstrap will continue to use the mixins internally until Bootstrap v4.

```scss
.animation(@animation) {
  -webkit-animation: @animation;
          animation: @animation;
}
.animation-name(@name) {
  -webkit-animation-name: @name;
          animation-name: @name;
}
.animation-duration(@duration) {
  -webkit-animation-duration: @duration;
          animation-duration: @duration;
}
.animation-timing-function(@timing-function) {
  -webkit-animation-timing-function: @timing-function;
          animation-timing-function: @timing-function;
}
.animation-delay(@delay) {
  -webkit-animation-delay: @delay;
          animation-delay: @delay;
}
.animation-iteration-count(@iteration-count) {
  -webkit-animation-iteration-count: @iteration-count;
          animation-iteration-count: @iteration-count;
}
.animation-direction(@direction) {
  -webkit-animation-direction: @direction;
          animation-direction: @direction;
}
```

### Opacity

Set the opacity for all browsers and provide a `filter` fallback for IE8.

```scss
.opacity(@opacity) {
  opacity: @opacity;
  // IE8 filter
  @opacity-ie: (@opacity * 100);
  filter: ~"alpha(opacity=@{opacity-ie})";
}
```

### Placeholder text

Provide context for form controls within each field.

```scss
.placeholder(@color: @input-color-placeholder) {
  &::-moz-placeholder           { color: @color; } // Firefox
  &:-ms-input-placeholder       { color: @color; } // Internet Explorer 10+
  &::-webkit-input-placeholder  { color: @color; } // Safari and Chrome
}
```

### Columns

Generate columns via CSS within a single element.

```scss
.content-columns(@width; @count; @gap) {
  -webkit-column-width: @width;
     -moz-column-width: @width;
          column-width: @width;
  -webkit-column-count: @count;
     -moz-column-count: @count;
          column-count: @count;
  -webkit-column-gap: @gap;
     -moz-column-gap: @gap;
          column-gap: @gap;
}
```

### Gradients

Easily turn any two colors into a background gradient. Get more advanced and set a direction, use three colors, or use a radial gradient. With a single mixin you get all the prefixed syntaxes you'll need.

```scss
#gradient > .vertical(#333; #000);
#gradient > .horizontal(#333; #000);
#gradient > .radial(#333; #000);
```

You can also specify the angle of a standard two-color, linear gradient:

```scss
#gradient > .directional(#333; #000; 45deg);
```

If you need a barber-stripe style gradient, that's easy, too. Just specify a single color and we'll overlay a translucent white stripe.

```scss
#gradient > .striped(#333; 45deg);
```

Up the ante and use three colors instead. Set the first color, the second color, the second color's color stop (a percentage value like 25%), and the third color with these mixins:

```scss
#gradient > .vertical-three-colors(#777; #333; 25%; #000);
#gradient > .horizontal-three-colors(#777; #333; 25%; #000);
```

**Heads up!** Should you ever need to remove a gradient, be sure to remove any IE-specific `filter` you may have added. You can do that by using the `.reset-filter()` mixin alongside `background-image: none;`.