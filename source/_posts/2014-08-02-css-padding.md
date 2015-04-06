layout: post
title: "Css Padding"
category: CSS
tags: [web, css]
---

The `padding` property in CSS defines the innermost portion of the [box model](http://css-tricks.com/the-css-box-model/), creating space around an element's content, inside of any defined margins and/or borders.

Padding values are set using [lengths](http://css-tricks.com/the-lengths-of-css/) or percentages, and cannot accept negative values. The initial, or default, value for all padding properties is `0`.

<!-- more -->

Here's a simple example:

    .box {
      padding: 0 1.5em 0 1.5em;
    }

The example above is using the `padding` shorthand property, which accepts up to four values, shown here:

    .box {
      padding: <padding-top> || <padding-right> || <padding-bottom> || <padding-left>
    }

If fewer than four values are set, the missing values are assumed based on the ones that are defined. For example, the following two rule sets would get identical results:

    .box {
      padding: 0 1.5em;
    }
    
    .box {
      padding: 0 1.5em 0 1.5em;
    }

Thus, if only one value is defined, this sets all four padding properties to the same value:

    .box {
      padding: 20px;
    }

If three values are declared, it is `padding: [top] [left-and-right] [bottom];`.

Any of the individual padding properties can be declared using longhand, in which case you would define only one value per property. So the previous example could be rewritten as follows:

    .box {
      padding-top: 20px;
      padding-right: 20px;
      padding-bottom: 20px;
      padding-left: 20px;
    }

## Padding and Element Width Calculations

If an element has a specified width, any padding added to that element will add to the total width of the element. This is often an undesirable result, as it requires that an element's width be recalculated each time the padding is adjusted. (Note that this also happens with height, but in most cases it is preferred not to give an element a set height.)

For example:

    .box {
        padding: 20px;
        width: 400px;
    }

In this example, although the `.box` element is given an explicit width of 400px, the actual rendered width of the element on the page will be 440px. This takes into account not only the 400px width, but also the 20px of left padding and the 20px of right padding (defined with padding shorthand in the previous example).

This happens in order to maintain 400px of content space, rather than 400px of total element width. Here's a Pen demonstrating this:

<p data-height="268" data-theme-id="0" data-slug-hash="rpLhA" data-default-tab="html" class='codepen'>See the Pen <a href='http://codepen.io/impressivewebs/pen/rpLhA/'>rpLhA</a> by Louis Lazaris (<a href='http://codepen.io/impressivewebs'>@impressivewebs</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

This occurs in all in-use browsers, in standards mode, but will not occur in IE6 and IE7 in quirks mode (that is, on pages displayed in IE6 or IE7 where there is no doctype declared or where something else is happening to trigger quirks mode).

To resolve this issue, thus keeping the width at 400px no matter the amount of padding, you can use the [box-sizing](http://css-tricks.com/almanac/properties/b/box-sizing/) property:

    .box {
     padding: 20px;
     width: 400px;
      box-sizing: border-box;
    }

This causes the element to maintain its [width](http://css-tricks.com/almanac/properties/w/width/) while increasing the padding, thus decreasing the available content spac

<p data-height="268" data-theme-id="0" data-slug-hash="fgqIj" data-default-tab="css" class='codepen'>See the Pen <a href='http://codepen.io/impressivewebs/pen/fgqIj/'>fgqIj</a> by Louis Lazaris (<a href='http://codepen.io/impressivewebs'>@impressivewebs</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Reference

- [padding](http://css-tricks.com/almanac/properties/p/padding/)
- [box-sizing](http://css-tricks.com/almanac/properties/b/box-sizing/)