---
layout: post
title: "CSS Layout"
category: CSS
tags: [web, css, layout]
---

A [CSS](https://developer.mozilla.org/en-US/docs/CSS "/en-US/docs/CSS") **layout mode**, sometimes abbreviated as _layout`,`_ is an algorithm determining the position and the size of boxes based on the way they interact with their sibling and ancestor boxes. There are several of them:

* The _block layout_, designed for laying out documents. The block layout contains document-centric features, like the ability to [_float_](https://developer.mozilla.org/en-US/docs/CSS/float "/en-US/docs/CSS/float") elements or to lay them out over [_multiple columns_](https://developer.mozilla.org/en-US/docs/CSS/Using_CSS_multi-column_layouts "/en-US/docs/CSS/Using_CSS_multi-column_layouts").
* The _inline layout_, designed for laying out texts.
* The _table layout_, designed for laying out tables. 只有 IE10+ 支持。
* The _[positioned layout](http://inching.org/2014/07/22/css-layout-position/)_, designed for positioning elements without much interaction with other elements.
* The [_flexible box layout_](https://developer.mozilla.org/en-US/docs/CSS/Using_CSS_flexible_boxes "/en-US/docs/"), designed for laying out complex pages that can be resized smoothly.
* The _[grid layout](http://www.w3cplus.com/css3/css3-grid-layout.html)_, designed for layout out elements relatively to a fixed grid.

<!--more-->

## column

- [Create Columns Easily With The CSS3 Multi-Column Layout Module - Vanseo Design](http://www.vanseodesign.com/css/multi-columns/)
- [4 Methods For Creating Equal Height Columns In CSS - Vanseo Design](http://www.vanseodesign.com/css/equal-height-columns/)

The `column-count` property in CSS controls how many vertical columns text in a particular element will be broken into. For instance:

    p.intro-text {
       column-count: 3;
    }

It is meant to be paired with column-gap, where you can specify how wide the gutter is between the text. You'll also need to prefix the properties to get the best browser support.

    p.intro-text {
      column-count:         3;
      column-gap:           20px;
    }

<p data-height="268" data-theme-id="0" data-slug-hash="fJjau" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/fJjau/'>layout column</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

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

## Example

- [Ratings - CodePen](http://codepen.io/WhiteWolfWizard/pen/kylpj)
- [Personal Online Resume](http://codepen.io/WhiteWolfWizard/details/mjbJB/)

### Context

- [Kontext - CodePen](http://codepen.io/hakimel/pen/FAiKv)

### Form

- [Login Form - CodePen](http://codepen.io/frytyler/pen/EGdtg)
- [Radio & Checkbox - CodePen](http://codepen.io/WhiteWolfWizard/pen/oDyhs)
- [Editable To-Do List - CodePen](http://codepen.io/WhiteWolfWizard/pen/ipsCD)
- [Social Flip Cards - CodePen](http://codepen.io/pouretrebelle/pen/GmguH)
- [CSS3 Timeline - CodePen](http://codepen.io/P233/pen/lGewF)
- [Ladda - CodePen](http://codepen.io/hakimel/pen/gkeha)
- [Text input love - CodePen](http://codepen.io/MichaelArestad/pen/ohLIa)
- [SaraSoueidan/navicon-transformicons · GitHub](https://github.com/SaraSoueidan/navicon-transformicons)
- [S Gallery: A Responsive jQuery Gallery Plugin with CSS3 Animations](http://sarasoueidan.com/blog/s-gallery/)
- [Radio & Checkbox - CodePen](http://codepen.io/WhiteWolfWizard/pen/oDyhs)
- [Readme Login Form](http://dash.readme.io/login)

### Loader

- [Loader - CodePen](http://codepen.io/WhiteWolfWizard/pen/Iihlo)

### Menu

- [Building Full Screen CSS3 Menus with Tons of Creative Demos ♥ Scotch](http://scotch.io/bar-talk/building-full-screen-css3-menus-with-tons-of-creative-demos)
- [Shifting Sidebar - CodePen](http://codepen.io/WhiteWolfWizard/pen/gpLsI)
- [Social App Menu - CodePen](http://codepen.io/matthoiland/pen/vHFCk)
- [Fixed Navigation - CodePen](http://codepen.io/WhiteWolfWizard/pen/fHEIs)
- [Side nav play - CodePen](http://codepen.io/MichaelArestad/pen/vbAxI)
- [Sliding Vertical Nav - CodePen](http://codepen.io/alassetter/pen/CndgF)
- [Responsive CSS3 Side Navigation Menu - CodePen](http://codepen.io/SaraSoueidan/pen/bogtz)
- [iOS style sliding menu - CodePen](http://codepen.io/jasonhowmans/pen/dykhL)
- [Side Menu Staggered Animation [ Coding Dribbble ]](http://codepen.io/gsimone/details/whIBC/)
- [CSS3 Testimonials Slider](http://codepen.io/SaraSoueidan/details/CyFbd/)
- [Simple Circular Menu With CSS – How-To](http://codepen.io/SaraSoueidan/pen/wpHBt)
- [Horizontal Drop-Down Menu - CodePen](http://codepen.io/WhiteWolfWizard/pen/nLhrw)

### Layout

- [CodePen - A Pen by Elena](http://codepen.io/elenanicole53/pen/rsiDj)
- [CodePen - A Pen by White Wolf Wizard](http://codepen.io/WhiteWolfWizard/pen/KhHxg)
- [Fixed image backgrounds - CodePen](http://codepen.io/dropside/pen/bxhke)
- [CSS3 Testimonials Slider](http://codepen.io/SaraSoueidan/details/CyFbd/)
- [Editable To-Do List - CodePen](http://codepen.io/WhiteWolfWizard/pen/ipsCD?editors=101)
- [Photo Hover - CodePen](http://codepen.io/WhiteWolfWizard/pen/gehdq)

### Works

- [CSS3 Working Clock - CodePen](http://codepen.io/iliadraznin/pen/JcqbE)
- [CSS 3D Solar System - CodePen](http://codepen.io/juliangarnier/pen/idhuG/?editors=010)

### Tabs

- [CSS Tabs - CodePen](http://codepen.io/WhiteWolfWizard/pen/wFkGp)

### Metro

- [CodePen - A Pen by White Wolf Wizard](http://codepen.io/WhiteWolfWizard/pen/Agnwi)
- [How to Create Windows-8-like animations with CSS3 and jQuery](http://sarasoueidan.com/blog/windows8-animations/)

## CSS 框架

[![blueprint](http://zh.learnlayout.com/images/blueprint.jpg)](http://www.blueprintcss.org/)[![unsemantic](http://zh.learnlayout.com/images/unsemantic.png)](http://www.unsemantic.com/)[![bluetrip](http://zh.learnlayout.com/images/bluetrip.jpg)](http://bluetrip.org/)[![elasticss](http://zh.learnlayout.com/images/elasticss.jpg)](http://elasticss.com/)[![bootstrap](http://zh.learnlayout.com/images/bootstrap.jpg)](http://twitter.github.com/bootstrap/)[![gumby](http://zh.learnlayout.com/images/gumby.jpg)](http://gumbyframework.com/)[![susy](http://zh.learnlayout.com/images/susy.jpg)](http://susy.oddbird.net/)[![foundation](http://zh.learnlayout.com/images/foundation.png)](http://foundation.zurb.com/)[![kube](http://zh.learnlayout.com/images/kube.png)](http://imperavi.com/kube/)[![groundwork](http://zh.learnlayout.com/images/groundwork.gif)](http://groundworkcss.github.com/)

## Tutorial

- [The CSS Grid Layout Module — Flexible Structures for Content - Vanseo Design](http://www.vanseodesign.com/css/grid-layout-module/)
- [The CSS Regions Module — Control Where Content Flows - Vanseo Design](http://www.vanseodesign.com/css/regions/)
- [The Anti-hero of CSS Layout - "display:table"](http://colintoh.com/blog/display-table-anti-hero)

## Reference

- [学习CSS布局](http://zh.learnlayout.com/)
- [column-count](http://css-tricks.com/almanac/properties/c/columns/)
- [CSS 布局:40个教程、技巧、例子和最佳实践](http://coolshell.cn/articles/6840.html)
- [Layout mode - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_mode)

<script async src="//codepen.io/assets/embed/ei.js"></script>
