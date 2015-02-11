---
layout: post
title: "How To Develop Elastic Grid Layouts In CSS"
category: Css
tags: [css, layout]
--- 

> source posts: <http://www.vanseodesign.com/css/elastic-layout-code/>

Flexible layouts are created by using relative measurements as opposed to absolute measurements. The question is relative to what? With elastic layouts the measurements are set relative to something internal to the design, usually the [size of the type](http://www.vanseodesign.com/web-design/legible-readable-typography/).  

We previously talked about [fluid layouts](http://www.vanseodesign.com/css/fluid-layout-code/), which I defined as using measurements relative to the browser window. Moving from a fluid layout to an elastic layout is actually quite simple. In fact we only need to make one change to the css we previously used to make the layout change.

Before getting to the code let me say the definitions above aren’t necessarily used by all. When people talk about fluid layouts they sometimes mean any flexible layout. I’m defining things as:

<!--more-->

* **Flexible layout**  — any layout that uses relative measurements to allow the layout to resize under different conditions
* **Fluid layouts**  — layouts with measurements relative to the browser window
* **Elastic layouts**   — layouts with measurements relative to something internal to the design such as the size of the type

Both fluid and [elastic layouts](http://www.456bereastreet.com/archive/200504/fixed_or_fluid_width_elastic/) are flexible. Again not everyone would define these layouts this way. All three terms are often used to describe any layout that resizes itself.

As always if you prefer to skip the explanations below and jump right to the code you can view the [demo layouts here](http://vanseodesign.com/blog/demo/elastic-layout/elastic-2.php).

[![2 column elastic layout](http://johnnyimages.qiniudn.com/elastic-2-column.pngundefined)](http://vanseodesign.com/blog/demo/elastic-layout/elastic-2.php)

## The HTML ##

If you’ve been following along with this series of posts on [creating css layouts](http://www.vanseodesign.com/css/2-column-layout-code/) this html should be old hat by now.

```html
<div id="container">

    <div id="header">
        <p>Header</p>
    </div>
    
    <div id="content">
        <p>Main content</p>
    </div>
    
    <div id="sidebar">
        <p>Sidebar</p>
    </div>
    
    <div id="footer">
        <p>Footer</p>
    </div>
    
</div>
```

The only difference between what’s here and what we previously saw with the fluid layouts is the addition of the container div.

You can alternately use the body tag as the container. I’m using a dedicated container div as it’s been my practice and I’m unaware of any real advantages in using one method over the other.

[![3 column elastic layout](http://www.vanseodesign.com/blog/wp-content/uploads/2011/06/elastic-3-column.png)](http://vanseodesign.com/blog/demo/elastic-layout/elastic-3.php)

## The CSS ##

Most of this css should also be familiar by now. In fact part of the reason for this series of posts has been to let you see how similar and simple the code is for these [different types of layouts](http://www.vanseodesign.com/css/css-layout-patterns-part-1/).

In many ways this is the beauty of css. A few small changes in the code can have a significant impact on how the html structure is presented.

```css
body {font-size: 1em}

#container {max-width: 75em; margin: 0 auto;}

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
```

The only real difference here as compared to our fluid layouts is that we set the width of #container. Remember in the fluid layouts we used the  body as the container.

In the fluid layouts we allowed the width of the body to be 100% of the browser width. Here I’ve set the max-width of #container to be 75em.

We’ve given the body a font-size of 1em, which will [default to 16px in most browsers](http://www.vanseodesign.com/css/thoughts-on-building-a-typographic-stylesheet/), so 75em is equal to 16 x 75 or 1200px.

I’m using max-width as opposed to width since it’s more flexible. This allows the layout to resize when the browser is open less than 1200px wide. Had we used width instead we’d see a horizontal scroll bar when the browser is open less then 1200px.

Everything else is the same as when we developed a fluid layout however that one small change to the width of the container changes what we’re measuring against.

If we continue deeper into the [layout](http://green-beast.com/blog/?p=199) the width of the content is 67%. That 67% is measured against it’s parent, which is #container. #container is relative to the font-size and so #content is relative to the font-size too. Similar for #sidebar.

[![Elastic band](http://www.vanseodesign.com/blog/wp-content/uploads/2011/06/elastic-band.jpg)](http://kellymainphotography.deviantart.com/art/Elastic-Band-210828414)

## Elastic Grids ##

A couple of years ago Ethan Marcotte wrote an article for A List Apart on [Fluid Grids](http://www.alistapart.com/articles/fluidgrids/). What Ethan referred to as fluid I’m calling elastic. I think Ethan now uses the more generic flexible grids.

Without getting into developing [grids](http://www.vanseodesign.com/web-design/grid-anatomy/) here, the basic idea for making grids elastic is to switch from using absolute measurements to using relative measurements like we’ve done above.

When setting up [different grids](http://www.vanseodesign.com/web-design/grid-types/) it’s usually easier to think in terms of absolute measurements. Ethan offered a simple formula for then converting those measurements into relative ones to create the [flexible grid](http://www.markboulton.co.uk/journal/comments/five-simple-steps-to-designing-grid-systems-part-5).

target ÷ context = result

This is what we did above when we set the max-width on the container. Our result was 75em. Out target was 1200px. Our context was the 1em (or 16px) we set for the font-size of the body.

1200 (target) ÷ 16 (context) = 75 (result)

When we set widths on the content and sidebar divs our results are 67% and 33% respectively. While I didn’t show it here the targets were maximum widths of 800px and 400px.

800 ÷ 1200 × 100% = 67%

400 ÷ 1200 × 100% = 33%

The [context](http://www.vanseodesign.com/web-design/framing-expectation-exposure-effect/) for both was the width of the container div. When we set widths in % they’re relative to the width of the parent element.

Sounds relatively simple (no pun intended), but there’s a potential gotcha waiting.

If we specify any width in ‘em’ then the context is the font-size of that element. Above we specified #container in ‘em’ but since the font-size of the container is the same as the font-size of the body (its parent) there wasn’t a problem.

Had we changed the font-size of container to be 1.25 em (20px) then 75em would translate to a new measurement.

20 × 75 = 1500 = 16 × 75 × 1.25

You can play with the code and test this by changing the font-size on different divs to see what happens.

In the cases of #content and #sidebar where we set the width in % changing the font-size on either div won’t change anything (other than the font-size).

The context will still be the width of the parent as we’re using % for the measurement. For this reason I think it makes more sense to define your widths using %. Save ‘em’ for font-sizes, line-heights, [and anything else vertical](http://jontangerine.com/log/2007/09/the-incredible-em-and-elastic-layouts-with-css).

Again you can test this and see what happens.

As long as you remain aware of any changes in your context this shouldn’t cause any problems. However if you find your [layout](http://www.vanseodesign.com/web-design/3-design-layouts/) not looking right, this context change is probably a good place to start investigating why.

[![Ball of yellow and blue rubber bands](http://www.vanseodesign.com/blog/wp-content/uploads/2011/06/rubber-band-ball-2.jpg)](http://gr8-gatensby.deviantart.com/art/Elastic-Ball-131684532)

## Summary ##

Developing flexible layouts with relative measurements should be a goal for web design as the format in which our designs live (the browser) will always be flexible. 

Those measurements can be relative to the browser, which I’ve defined as fluid layouts or relative to something internal to the design, which I’ve defined as elastic layouts.

The names aren’t specifically important, but the concept is. It makes more sense to use measurements relative to something internal in the design.

It’s quite simple to move from a fluid layout to an elastic one. All it takes is changing the measurement of the outermost container from % to ‘em.’ Everything inside that container will then be relative to the design instead of the browser window. Inner containers can continue to be measured in %.

Taking it further and creating elastic grids we’ll use these same measurements. With some not too difficult math we can create grids that resize themselves as the text resizes.

If we also use max-widths in places instead of widths we have a layout that can resize itself as the browser resizes.

We’re almost done with this series of posts on [css layouts](http://www.vanseodesign.com/css/css-layout-patterns-part-2/). Next week we’ll consider flexible images and the following week we’ll look at media queries while we build toward a discussion of responsive layouts.