---
layout: post
title: "2 Methods For Developing Hybrid CSS Layouts"
category: Css
tags: [css, layout]
--- 

> source posts: <http://www.vanseodesign.com/css/hybrid-layout-code/>

Over the last few weeks we’ve seen how to develop both [fixed width](http://www.vanseodesign.com/css/2-column-layout-code/) and [fluid layouts](http://www.vanseodesign.com/css/fluid-layout-code/) with html and css. Each has its pros as well as its cons. Hybrid layouts are attempts to gain the pros of one type of layout while minimizing some of the cons.  
<span id="more-2969"></span>  
Today I want to present 2 hybrid layouts. The first is a modified fixed width layout that gives the appearance of being fluid and the second is a modified fluid layout that attempts to rein in the longer lines of text.

These aren’t the only 2 hybrid layouts, but hopefully they point the way toward techniques you can use to create your own hybrid layouts.

<!--more-->

As always if you simply want the code here are the demos

* [Fixed content and fluid background](http://www.vanseodesign.com/blog/demo/hybrid-css-layout/fixed-content-fluid-background.php)
* [ 2 column fluid layout with max-width](http://www.vanseodesign.com/blog/demo/hybrid-css-layout/fluid-2-max-width.php)
* [ 3 column fluid layout with max-width](http://www.vanseodesign.com/blog/demo/hybrid-css-layout/fluid-3-max-width.php)

[![Layout with fixed content and fluid background](http://www.vanseodesign.com/blog/wp-content/uploads/2011/05/fixed-content-fluid-background.png)](http://www.vanseodesign.com/blog/demo/hybrid-css-layout/fixed-content-fluid-background.php)

## Fixed Width Content, Fluid Background ##

The trick to this layout is to use container divs around each row of content within our layout.

This allows us to use the inner div for fixing the width and centering what’s within while allowing the the outer div to stretch from edge to edge in the browser.

By setting [backgrounds](http://www.vanseodesign.com/css/css-background-property/) on the outer div we give the appearance that the layout is fluid, while we maintain control over the content itself. In a sense we create a layout within the layout. This inner layout is fixed, while the outer layout is fluid.

### The HTML ###

The html below is similar to the fixed width layouts we’ve previously discussed.

```html
<div id="header-container">
    <div id="header">
        <p>Header content here</p>
    </div>
</div>
    
<div id="page">
    <div id="content">
        <p>Main content</p>
    </div>

    <div id="sidebar">
        <p>Sidebar</p>
    </div>
</div>
    
<div id="footer-container">
    <div id="footer">
        <p>Footer: </p>
    <div>
</div>
```

The difference is that in the fixed-width layouts we wrapped everything with a single container div. Here we’re wrapping each row of content with a container.

Both header and footer are wrapped with a container div and since the content and sidebar are meant to be displayed next to each other (on a single row in the layout) a single container is used around both.

You might note that while #header and #footer are inner divs, #page is apparently an outer div. We’ll actually use the body as the outer div for #page instead of adding an additional #page-container div.

These multiple container divs are the key to this layout.

### The CSS ###

If you’ve been following along with this series of posts on [css layouts](http://www.vanseodesign.com/css/css-layout-patterns-part-1/) most of this css should also be familiar, though there are some new things which we’ll talk about below.

```css
#header-container, #footer-container {background: #777;}

#page, #header, #footer {
    width:960px;
    margin:0 auto;
}

#content {
    float:left;
    width:620px;
}

#sidebar {
    float:left;
    width:340px;
}

#footer-container {
    clear:both;
}
```

\#content and #sidebar are exactly the same as in the fixed width layouts we’ve seen before. Here I’ve cleared #footer-container instead of #footer, but that’s not really new. The new stuff is the css at the top.

Previously we had a single container div that fixed the width and [centered the content](http://www.vanseodesign.com/css/centering-with-css/). Here we have three, #page, #header, and #footer. Note that we’re fixing and centering the inner divs. Remember #page is the inner div with body being its container.

By default #header-container and #footer-container have a width that’s 100% of the body, which is what we want. All we really need to do is set backgrounds on each.

Since our footer and header divs have no background applied to them the background of their containers will show through. Similarly we can set a background on the body. I didn’t set it here since I want the body and the #page row to be white, which they will be by default.

As long as we don’t set a backgrounds on the divs holding the content the background of their containers will show through giving the appearance of fluidity.

[![2 column layout showing floated elements and normal document flow elements](http://www.vanseodesign.com/blog/wp-content/uploads/2009/10/2-column-layout.png)](http://www.vanseodesign.com/css/understanding-css-floats/)

### Additional Thoughts ###

While this layout does create a more fluid feel to a fixed width layout, the downside is the extra html used for all the container divs and that the fluid feel is something of an illusion as most of the design is still fixed.

Still it’s a nice compromise between fixed and fluid layouts.

**Note:** Soh Tanaka has a slightly different method for achieving this same layout. The basic idea is the same, but Soh uses two classes, one fluid and one fixed. To control the layout you apply the appropriate class to the appropriate div.

I’d encourage you to read his post on [achieving liquid background with fixed content](http://www.sohtanaka.com/web-design/achieving-liquid-backgrounds-with-fixed-content/).

The minor downside to his method is it leaves behind [non-semantic class names](http://www.vanseodesign.com/web-design/semantic-html/) in your html, which you may or may not be comfortable doing. 

## Rearranging Columns ##

Rearranging columns is exactly the same as it was for the fixed width and fluid layouts. Depending on how many columns and how you have things set up in your html it’s simply a matter of changing float directions for most cases.

For the cases when floats alone won’t do we need to use a small bit of [relative and absolute positioning](http://www.vanseodesign.com/css/css-positioning/) to achieve the desired column order.

Since we’ve been over it before I won’t cover the details here and instead point you to the [3 column fixed width layout](http://www.vanseodesign.com/css/3-column-layout-code/) post where the details are discussed.

[![2 column fluid layout with max-width applied](http://www.vanseodesign.com/blog/wp-content/uploads/2011/05/fluid-2-max-width.png)](http://www.vanseodesign.com/blog/demo/hybrid-css-layout/fluid-2-max-width.php)

## Fluid Layout With Max Width Content ##

The second hybrid layout we’ll look at starts with a fluid layout and uses max-width values to keep the lines of text from growing too long for comfortable reading.

### The HTML ###

The html is exactly the same we used when developing fully fluid layouts.

```html
<div id="header">
    <p>Header</p>
</div>
    
<div id="content">
    <p>Content</p>
</div>
    
<div id="sidebar">
    <p>Sidebar</p>
</div>
    
<div id="footer">
    <p>Footer</p>
</div>
```

There’s really nothing new in the html.

### The CSS ###

The css should also look familiar. It’s the same we used when developing fluid layouts with one addition.

```css
#content {
    float:left;
    width:67%;
}

#sidebar {
    float:left;
    width:33%;
}

#footer {
    clear:both;
}

#content p, #sidebar p {max-width: 75%}
```

The addition is the last line above where we’ve set all paragraphs inside the content and the sidebar to have a max-width of 75% of its parent container.

The amount is somewhat arbitrary. I chose 75% since it works well with the demo and the resolution of my laptop. What you use in practice would depend on your particular layout and audience.

You aren’t limited to setting max-width on paragraphs, however, since we’re mainly setting it to [prevent lines of text from growing too long](http://www.vanseodesign.com/web-design/legible-readable-typography/), paragraphs are probably the best place.

As headers and footers usually hold different kinds of content I didn’t set max-width inside either of them here. You might depending on the specifics of your design. The key is setting a max-width wherever content can grow to wide.

![Lake in Lafayette, Colorado](http://www.vanseodesign.com/blog/wp-content/uploads/2010/05/lafayette-lake-016.jpg)

### Additional Thoughts ###

In setting max-widths on our fluid layout we’re combating one of the prime downsides of fully fluid layouts, that of text lines growing too long. I set the max-width in % here, but on larger monitors this could still lead to overly long line lengths.

For this reason it might make more sense to use px instead of %. Of course using absolute measurements moves us away from fluid design.

Another point to note is that by setting a max-width on the content we create a greater amount of internal [whitespace](http://www.vanseodesign.com/web-design/whitespace/) in the design. The larger the browser the more space will be present between blocks of content.

In the demo I gave additional padding to the content and sidebar to help balance out the additional [space in the design](http://www.vanseodesign.com/web-design/design-space/), though it’s hardly a perfect solution.

Overall using max-width is a nice way to achieve a fluid layout while still retaining a measure of control over the layout of the content.

[![3 column fluid layout with max-width applied](http://www.vanseodesign.com/blog/wp-content/uploads/2011/05/fluid-3-max-width.png)](http://www.vanseodesign.com/blog/demo/hybrid-css-layout/fluid-3-max-width.php)

## Summary ##

Both fixed width and fully fluid [css layouts have their pros and cons](http://www.vanseodesign.com/css/css-layout-patterns-part-2/). Hybrid layouts are an attempt to rein in some of the cons while keeping the pros.

A layout where the content is fixed and the background is fluid attempts to make fixed width layouts appear more fluid than they really are. They maintain control over the layout of the content, while adding fluidity to the background.

A fluid layout with max-width selectively applied attempts to rein in the possibility of longer lines of text while still allowing the overall design to be fluid and resize itself when the browser window is resized.

These aren’t the only hybrid layout solutions, but they are among the more common. Hopefully the techniques shown here will help you develop your own hybrid layouts when needed.