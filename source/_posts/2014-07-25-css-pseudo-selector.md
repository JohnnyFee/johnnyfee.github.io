---
layout: post
title: "CSS Selector"
category: CSS
tags: [web, css, selector]
--- 

## ::after / ::before

`::after` is a pseudo element which allows you to insert content onto a page from CSS (without it needing to be in the HTML). While the end result is not actually in the DOM, it appears on the page as if it is, and would essentially be like this:

```
div::after {
  content: "hi";
}
```

```
<div>
  <!-- Rest of stuff inside the div -->
  hi
</div>
```

`::before` is exactly the same only it inserts the `content` before any other content in the HTML instead of after. The only reasons to use one over the other are:

* You want the generated content to come before the element content, positionally.
* The `::after` content is also "after" in source-order, so it will position on top of ::before if stacked on top of each other naturally.

The value for content can be:

* **A string:** `content: "a string";` - special characters need to be specially encoded as a unicode entity. See the [glyphs page](http://css-tricks.com/snippets/html/glyphs/).
* **An image:** content: url(/path/to/image.jpg); - The image is inserted at it's exact dimensions and [cannot be resized.](http://cdpn.io/hbgJc) Since things like [gradients](http://css-tricks.com/css3-gradients/) are actually images, a pseudo element can be a gradient. 
* **Nothing:** content: ""; - Useful for clearfix and inserting images as background-images (set width and height, and can even resize with background-size).
* **A counter:** `content: counter(li);` - Really useful for [styling lists](http://www.456bereastreet.com/archive/201105/styling_ordered_list_numbers/) until :marker comes along.

Note that you cannot insert HTML (at least, that will be rendered as HTML). `content: "<h1>nope</h1>";`

## tutorial

- [Meet the Pseudo Class Selectors](http://css-tricks.com/pseudo-class-selectors/)

## reference

- [::after / ::before](http://css-tricks.com/almanac/selectors/a/after-and-before/)
- [A whole bunch of cool stuff they can do](http://css-tricks.com/pseudo-element-roundup/)