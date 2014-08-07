---
layout: post
title: "Css Overflow"
category: Css
tags: [css]
--- 
## overflow

```
div {
  overflow:  visible | hidden | scroll | auto | inherit
}
```

[View Demo](http://css-tricks.com/examples/OverflowExample/)

The overflow property controls what happens to content that breaks outside of its bounds. The default value is `visible`. So imagine a div in which you've explicitly set to be 200px wide, but contains an image that is 300px wide. That image will stick out of the div and be visible. Where if you set the overflow value to `hidden`, the image will cut off at 200px.

Remember that text will naturally wrap at the end of an element (unless [white-space](http://css-tricks.com/almanac/properties/w/whitespace/) is changed) so text will rarely be the cause of overflow. Unless a [height](http://css-tricks.com/almanac/properties/h/height/) is set, text will just push an element taller as well. Overflow comes into play more commonly when explicit widths and heights are set and it would be undesirable for any content to spill out, or when scrolling is explicitly being avoided.

## text-overflow

The `text-overflow` property in CSS deals with situations where text is clipped when it overflows the element's box. It can be clipped (i.e. cut off, hidden), display an ellipsis ('…', Unicode Range Value U+2026) or display an author-defined string (no current browser support for author-defined strings).

```
.ellipsis {
  text-overflow: ellipsis;

  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;
}
```

Note that `text-overflow` only occurs when the container's [`overflow`](http://css-tricks.com/almanac/properties/o/overflow) property has the value `hidden`, `scroll` or `auto` and `white-space: nowrap;`.

Text overflow can only happen on block or inline-block level elements, because the element needs to have a width in order to be overflow-ed. The overflow happens in the direction as determined by the [direction](http://css-tricks.com/almanac/properties/d/direction/) property or related attributes. 

The following demo displays the behavior of the `text-overflow` property including all the possible values. Browser support varies!

<p data-height="268" data-theme-id="0" data-slug-hash="gvFGI" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/chriscoyier/pen/gvFGI/'>Text-Overflow</a> by Chris Coyier (<a href='http://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Setting overflow to scroll or auto will display scrollbars to reveal the additional text, while hidden will not. The hidden text can be selected by selecting the ellipses.

## reference

- 1.  * [overflow](http://css-tricks.com/almanac/properties/o/overflow/)
- 

<script async src="//codepen.io/assets/embed/ei.js"></script>
