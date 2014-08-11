---
layout: post
title: "CSS Layout"
category: CSS
tags: [web, css, layout]
------------------------

A [CSS](https://developer.mozilla.org/en-US/docs/CSS "/en-US/docs/CSS") **layout mode**, sometimes abbreviated as _layout`,`_ is an algorithm determining the position and the size of boxes based on the way they interact with their sibling and ancestor boxes. There are several of them:

* The _block layout_, designed for laying out documents. The block layout contains document-centric features, like the ability to [_float_](https://developer.mozilla.org/en-US/docs/CSS/float "/en-US/docs/CSS/float") elements or to lay them out over [_multiple columns_](https://developer.mozilla.org/en-US/docs/CSS/Using_CSS_multi-column_layouts "/en-US/docs/CSS/Using_CSS_multi-column_layouts").
* The_inline layout_, designed for laying out texts.
* The _table layout_, designed for laying out tables.
* The _positioned layout_, designed for positioning elements without much interaction with other elements.
* The [_flexible box layout_](https://developer.mozilla.org/en-US/docs/CSS/Using_CSS_flexible_boxes "/en-US/docs/"), designed for laying out complex pages that can be resized smoothly.
* The _grid layout_, designed for layout out elements relatively to a fixed grid.

## column

- [Create Columns Easily With The CSS3 Multi-Column Layout Module - Vanseo Design](http://www.vanseodesign.com/css/multi-columns/)
- [4 Methods For Creating Equal Height Columns In CSS - Vanseo Design](http://www.vanseodesign.com/css/equal-height-columns/)

The `column-count` property in CSS controls how many vertical columns text in a particular element will be broken into. For instance:

    p.intro-text {
       column-count: 3;
    }

It is meant to be paired with column-gap, where you can specify how wide the gutter is between the text. You'll also need to prefix the properties to get the best browser support.

    p.intro-text {
      -webkit-column-count: 3;
      -webkit-column-gap:   20px;  
      -moz-column-count:    3;
      -moz-column-gap:      20px;
      column-count:         3;
      column-gap:           20px;
    }

<style type="text/css">
  p.intro-text {
      border: 1px solid red;
      -webkit-column-count: 3;
      -webkit-column-gap:   20px;  
      -moz-column-count:    3;
      -moz-column-gap:      20px;
      column-count:         3;
      column-gap:           20px;
  }
</style>

Of which you would apply to a block of text like so:

    <p class="intro-text">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.</p>

<p class="intro-text">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.</p>

### All Related Properties

    .three-col {
      column-count: 3;
      column-gap: 20px;
      column-rule-color: #ccc;
      column-rule-style:solid;
      column-rule-width: 1px;
    }

You can also set the `column-width` (with prefixes) but it generally makes more sense to let it auto calculate that.

The rule ("rule", as in, a line) will split the gap down the middle. You can use the same values as you would a `border`. 

Take care not to have your text blocks be so enormously tall that they are taller than a (fairly small) browser window, otherwise it's the same problem as text being wider than the browser window (scrolling back and forth to read = sucks). Also consider `text-align: justify;`

### Browser Support

Chrome | Safari | Firefox  |Opera  |IE  |Android | iOS 
-------|--------|----------|-------|----|--------|-------
Any    | 3+     | 1.5+     | 11.1+ |10+ |TBD     |TBD

## CSS 框架

[![blueprint](http://zh.learnlayout.com/images/blueprint.jpg)](http://www.blueprintcss.org/)[![unsemantic](http://zh.learnlayout.com/images/unsemantic.png)](http://www.unsemantic.com/)[![bluetrip](http://zh.learnlayout.com/images/bluetrip.jpg)](http://bluetrip.org/)[![elasticss](http://zh.learnlayout.com/images/elasticss.jpg)](http://elasticss.com/)[![bootstrap](http://zh.learnlayout.com/images/bootstrap.jpg)](http://twitter.github.com/bootstrap/)[![gumby](http://zh.learnlayout.com/images/gumby.jpg)](http://gumbyframework.com/)[![susy](http://zh.learnlayout.com/images/susy.jpg)](http://susy.oddbird.net/)[![foundation](http://zh.learnlayout.com/images/foundation.png)](http://foundation.zurb.com/)[![kube](http://zh.learnlayout.com/images/kube.png)](http://imperavi.com/kube/)[![groundwork](http://zh.learnlayout.com/images/groundwork.gif)](http://groundworkcss.github.com/)

## Tutorial

- [The CSS Grid Layout Module — Flexible Structures for Content - Vanseo Design](http://www.vanseodesign.com/css/grid-layout-module/)
- [The CSS Regions Module — Control Where Content Flows - Vanseo Design](http://www.vanseodesign.com/css/regions/)

## Reference

- [学习CSS布局](http://zh.learnlayout.com/)
- [column-count](http://css-tricks.com/almanac/properties/c/columns/)
- [CSS 布局:40个教程、技巧、例子和最佳实践](http://coolshell.cn/articles/6840.html)
- [Layout mode - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_mode)