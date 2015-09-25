layout: post
title: "Pros And Cons Of 6 CSS Layout Patterns"
category: CSS
tags: [css, layout]
---

> source posts: 
> 
> - <http://www.vanseodesign.com/css/css-layout-patterns-part-1/>
> - <http://www.vanseodesign.com/css/css-layout-patterns-part-2/>

There are a number of [css layout patterns](http://www.vanseodesign.com/css/2-column-css-layout/) you can use when developing a website. Your design could be of fixed-width or it could be fluid or elastic. It might even be a hybrid layout or be responsive to different devices.

What are the pros and cons of some of the common [css layouts](http://sixrevisions.com/web_design/a-guide-on-layout-types-in-web-design/) available to us? Are some layouts preferred over others?  
<span id="more-2849"></span>  
**Note:** While you can’t always tell from the screenshots throughout this post I’ve tried to match the screenshot with the layout described below it. You can click through on any of the images to see the site in question and then resize your browser of font size to see how the layouts react.

<!-- more -->

[![Coda code editor](http://johnnyimages.qiniudn.com/code-editor.png)](http://www.panic.com/coda/)

## 6 CSS Layouts ##

You’re likely familiar with all of the [css layouts](http://www.vanseodesign.com/css/css-divs-vs-tables/) below, but to make sure we’re on the same page, let’s quickly define each.

* **[Fixed-Width](/2014/08/10/css-layout-fixed-width/)** — Overall width is fixed with absolute measurements (px). They’re a solution to the lack of control designing for the web.
* **[Fluid/Liquid](http://johnnyfee.github.io/2014/08/09/css-layout-comparision/)** — Overall width is set in proportion to the browser window (%). They’re a solution to multiple resolutions.
* **[Elastic](http://johnnyfee.github.io/2014/08/10/css-layout-elastic-grid/)** — Overall width is set in proportion to some design element, usually font-size (em).  They’re a solution to the control issues with fluid designs
* **[Hybrid](/2014/08/10/css-layout-hybrid/)** — Using a combination of fixed and either fluid or elastic design elements.  They’re a solution to the cons of all 3 layouts above.
* **Responsive** — Using different stylesheets based on possible ranges of widths of the audience.  They’re a solution to the multiple devices and resolutions of our audience.
* **Fluid/Elastic Grids** — A type of elastic layout that makes use of a grid.  They’re a solution to maintaining order inside a dynamic container.

Pay attention to the difference between fluid/liquid layouts and elastic layouts. In both widths are measured relatively.

The difference is that fluid layouts are measured relative to something external to the design (browser window), while elastic layouts are measured relative to something internal to the design (font-size).

[![Screenshot of 'A List Apart' home page](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/a-list-apart.png)](http://www.alistapart.com/)

## Fixed-Width Layouts ##

Fixed-width layouts are static. Based on some data about your audience’s resolution you design for an optimum width.

Typically you [center the design](http://www.vanseodesign.com/css/centering-with-css/) to split the external whitespace for large resolution browsers. The overall width might be based on either internal or external things. 

Fixed-width layouts are probably the most common [layouts](http://www.vanseodesign.com/css/3-column-css-layout/) you see online today.

Pros:

*  Greater control over the placement and display of elements
*  More predictable as the layout doesn’t change when the browser is resized
* Simplest, quickest and least expensive to develop due to their static nature
* Everything can be pre-designed to pixel perfection
* Exact sizes are always maintained

Cons:

* Doesn’t take advantage of space in browser window
* Doesn’t take advantage of the flexible nature of the web
* Can lead to excessive external [whitespace](http://www.vanseodesign.com/web-design/whitespace/) at large resolutions
* Designed for an average visitor and not ideal for all visitors
* Removes some freedom from users
* Horizontal scrollbars may appear at lower resolution

Control and cost are the main reasons fixed-width layouts are so popular.

They would also naturally appeal to anyone moving to the web after experience with print design as a fixed-width is a given condition in print.

[![Screenshot of 'HTML Dog' home page](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/html-dog.jpg)](http://htmldog.com/)

## Fluid or Liquid Layouts ##

Fluid layouts are usually created by setting the body to be 100% of the width of the available window and then have all other measurements expressed in some % of the body width.

The width of the design is then adjustable by adjusting the width of your browser.

All dimensions in a liquid or fluid layout are relative to the browser window. Proportion is retained with respect to browser size.

Pros:

* Resizable for visitors
* [Takes advantage of edge space](http://www.vanseodesign.com/web-design/design-space/) in browser window
* Gives back some resizing freedom to usrs.
* Horizontal scrollbars don’t appear

Cons:

* Loss of control over placement and display of some design elements
* Less predictable how design will be seen
* More difficult to develop well
* Less control over internal whitespace within and between elements
* Sometimes uses min and max widths, which are not understood by some browsers

Fluid layouts solve some of the problems of fixed layouts creating new problems as they do.

The loss of control can be designed for to a point. For example the [measure of a line of text](http://www.vanseodesign.com/web-design/legible-readable-typography/) in fluid designs often grow too wide to be comfortably read.

The solution is to give those areas a max-width or to somehow constrain widths in the design, which takes us back toward a fixed width-layout to some degree.

[![Screenshot of 'Simple Bits' home page](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/simple-bits.jpg)](http://simplebits.com/)

## Elastic Layouts ##

Elastic layouts are similar to fluid layouts with one important difference. The measurements in elastic layouts are relative to some internal part of the design, usually the [font-size](http://www.vanseodesign.com/css/thoughts-on-building-a-typographic-stylesheet/) of the main copy.

The ‘em’ is typically the unit of measurement in elastic designs, though % are mixed in where appropriate.

Pros:

* Generally keeps pros of both fluid and fixed designs
* Greater control than fluid designs
* Dimensions are based on internal design elements

Cons:

* More complicated to develop as more math needed
* Images and media may not be optimized for their resulting size
* May be superfluous with browser full-page zoom
* May not take advatnage of complete browser window

[Elastic layouts](http://www.htmldog.com/articles/elasticdesign/demo/) tend to look like fixed-width layouts with the ability to change dimensions based usually on the size of the font. This makes a lot of sense from a design standpoint as it offers control where necessary and flexibility where it makes sense.

Proportions are always maintained to something internal and so the design can better maintain [unity](http://www.vanseodesign.com/web-design/design-unity/). At the same time visitors can make adjustments to help them interact with the design.

[![Fixed-width layout with fluid background](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/fixed-width-fluid-backgrounds.png)](http://www.sohtanaka.com/web-design/examples/liquid-backgrounds/)

## Hybrid Layouts ##

As the name implies hybrid layouts are a mix of fixed, fluid, and elastic design elements.

By selectively deciding which areas of your design should be static and which should be flexible you can reign in some of the problems of all three types of layouts.

### Fixed-Width with Fluid Background ###

These layouts are mainly fixed, but allow their [backgrounds](http://www.vanseodesign.com/css/css-background-property/) to stretch to the edges of the browser window. This gives the design an initial impression of being fluid, while still maintaining control over the design.

Another common approach with this layout is to allow header, footer, or both to be fluid while keeping main content and sidebars fixed.

Pros:

* Maintains control and other benefits of fixed-width layouts
* Gives the appearance of being fluid, creating interest over the enitre browser window

Cons:

* Fluidity is mostly illusion
* Keeps many of the cons of fixed-width layouts

[Fixed-width, fluid background](http://www.sohtanaka.com/web-design/achieving-liquid-backgrounds-with-fixed-content/) designs maintain control over most of the design, while allowing some parts of the design to be fluid in order to make the complete design seem more flexible.

[![Screenshot of 'We Are Sofa' home page](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/madebysofa.png)](http://www.madebysofa.com/)

### Fluid/Elastic ###

Fluid/elastic layouts make use of min and max widths in order to allow flexibility while still having some final control over the design.

You allow your design to [scale up or down](http://www.vanseodesign.com/web-design/size-scale-proportion/), but only within set ranges of values that you define with min and max widths.

Pros:

* Allows fluidity to a point
* Gives greater control than fully fluid designs
* Can keep content areas and font sizes from becoming too large or small
* Prevents problems at end points, by removing those endpoints

Cons:

* Requires assumptions about audience screen resolutions
* Requires min and max properties not available on some older browsers
* Requires some kind of browser detection and multiple stylesheets

Overall hybrid layouts seek to keep the benefits of fluid or elastic layouts while minimizing some of their downsides such as a complete loss of control over design elements.

Hybrid designs give up control where it’s less important to maintain in order to have greater control where it’s more important to maintain.

[![YouTube Layouts Group](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/youtube-layouts.jpg)](http://demeters.deviantart.com/art/YouTube-Layouts-Group-169099917)

## Responsive Layouts ##

The idea behind [responsive layouts](http://www.alistapart.com/articles/responsive-web-design/) is to have the design respond to various conditions that your visitor controls. Different devices, different browsers, different resolutions, are all potentially something the design might respond to.

In order to develop a responsive layout you need to use either browser detection or media queries [to serve different stylesheets](http://stuffandnonsense.co.uk/projects/320andup/) to different device, browser, or screen resolution.

Pros:

* Greater control over a variety of dynamic conditions
* Design for key points and allow fluidity between key points
* Can serve device specific, browser specific, resolution specific, etc stylesheets

Cons:

* Requires some kind of browser detection (javascript or mediaqueries) and multiple stylesheets
* Might be serving unoptimized images for smaller screens
* More work developing different layouts for different devices, etc.

Responsive design really goes further than layout alone.

It allows us to not include certain functionality for a device that can’t support that functionality or even include different content based on the device or browser.

[![Webpage using an elastic grid](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/fluid-grid.png)](http://www.alistapart.com/d/fluidgrids/examples/grid/final.html)

## Fluid/Elastic Grids ##

Grids can be used with any of the css layouts we’ve been talking about. Where the width of the layout is fixed, the grid can be developed with pixel perfection.

We often think of grids as rigid and static structures we build upon so it’s no surprise to see them used with fixed-width layouts.

In truth, a grid can be based on proportions and as long as relative proportions are maintained our grid both functions and allows for changes in absolute dimensions.

When a proportional grids is tied to something internal we can apply that gird to an elastic layout. When the proportion is tied to something external we can [apply the grid to a fluid or liquid layout](http://www.smashingmagazine.com/2009/06/09/smart-fixes-for-fluid-layouts/). The former will likely lead to the better design.

Pros:

* Greater control of design elements
* Proportions easily maintained
* Design is always relative to itself with elastic grid

Cons:

* Hard to develop
* Lots of math
* Design is relative to something external with fluid grid

A couple of years ago Ethan Marcotte put forth the idea of creating [fluid grids](http://www.alistapart.com/articles/fluidgrids/). Ethan’s fluid grids are essentially elastic layouts as they use relative measurements based on something internal to the design.

Grids can also work with hybrid layouts through mixed measurements. For example columns set in a relative measurement like %, while the gutters between columns are set in an absolute measurement like px. You might set one part of a grid to be rigid and static while allowing other areas of the grid to scale.

[![Screenshot of 'Amazee Labs' home page](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/amazeelabs.jpg)](http://www.amazeelabs.com/)

## Thoughts About Which Layout To Use ##

Which layout should you use? It’s really up to you. No single layout is automatically the best. Each can be the right solution depending on the problem. It’s up to you to know the strengths and weaknesses of each [design layout](http://www.vanseodesign.com/web-design/3-design-layouts/) and choose appropriately.

### Fixed Width ###

When time or budget are in short supply you may want to stick with a fixed-width layout. It’s the easiest to develop well, gives you the most control over the design, and is the safest option.

It’s still a very workable solution to the range of devices and resolutions we use.  It struggles at the end points of different ranges of widths. As long as your audience veers toward the middle (like most do) a fixed-width site can work well.

Fixed width layouts can be developed equally well using measurements based on something either internal or external to the design.

Fixed layouts works best for more advanced [visual layouts](http://www.vanseodesign.com/web-design/visual-grammar/) (heavier graphics, more complex). Use them when precision in positioning is needed or you require a design more predictable across browsers and devices.

[![Screenshot of 'Stephen Davies' home page](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/stedavies.png)](http://stedavies.com/)

### Flexible Width ###

What makes flexible layouts flexible is the use of relative measurements. When relative to something external like the browser window the design is fluid or liquid. When the relative to something internal like font size, the design is elastic.

Measuring to something internal makes more sense to me as the better approach. The design stays in harmony with its intention. It’s proportions remain true to the design.

Designing relative to the browsers is the most flexible, but it can be too flexible as it becomes difficult to maintain control over the [position of elements](http://www.vanseodesign.com/css/css-positioning/) in the layout. While the site will work regardless of the available window space, it’s unlikely to look ideal to more than a few people.

In general flexible layouts are more in tune with nature of digital design.

Part of the challenge of designing for the web is the inability to predict or guarantee how someone will view your site. Flexibility is a key component of the medium and it suggests that flexible design will ultimately prove to [dominate](http://www.vanseodesign.com/web-design/dominance/) over fixed design.

I’d suggest elastic layouts are preferable to fluid layouts.

**Fluid layouts** are more time consuming and less predictable, but offer the most freedom to visitors. They’ll work best if you allow that your site doesn’t need to look exactly the same to everyone on every device under every condition.

**Elastic layouts** are more predictable than fluid layouts and more flexible than fixed layouts. They bring some of the best of both sides, but are the hardest to develop in terms of time, cost, and skill. You have control over proportions while allowing absolute dimensions to be flexible.

### Hybrid ###

Hybrid layouts are custom solutions for custom designs. They allow you to decide where control is necessary and where flexibility is preferred. Hybrids can bring different combinations of the best of both fixed and flexible layouts. 

Part of the layout can be fixed or flexible depending on how much control is desired. The more distinct parts you need to control, the more time you’ll need to spend planning how your layout will function.

I’ve always found a fluid background a nice complement to a fixed width design. While they don’t truly make a design flexible, they do create the [perception](http://www.vanseodesign.com/web-design/visual-perception-memory/) of a fluid design. They seem fluid even when they aren’t.

[![Screenshot of 'Simon Collison' home page with browser window made smaller](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/simon-collison-2.jpg)](http://www.vanseodesign.com/css/css-layout-patterns-part-2/)

### Responsive ###

The idea of developing sites that respond to the medium makes a lot of sense in the multi-device world we live in. You can’t control how your audience comes to your site or make them use a browser or your choosing.

Still there aren’t an endless variety of ways someone will visit your site. The reality is there are a handful of different ranges most people will fall into.

You create several designs, each to work well with one range of device, browser, resolution, etc. and then respond by serving the correct one for each device.

[Responsive design](http://designreviver.com/articles/designing-for-a-responsive-web-with-heuristic-methods/) isn’t limited to layout. They can be used to serve different content, functionality, or experience to different people on different devices.

It’s the flavor of the moment and with good reason. However in the end it’s browser and object detection. If history is a teacher developers will push toward standards over detection and device makers will become more consistent in how they render websites.

Then a whole new generation of devices will become popular and we’ll go back to detection methods to serve each, before everything gets back to being consistent and standards are once again pushed to the forefront.

[![Generic web layouts](http://www.vanseodesign.com/blog/wp-content/uploads/2011/04/generic-web-layouts.jpg)](http://sassin.deviantart.com/art/Generic-Web-Layouts-152979706)

## Summary ##

[Fixed-width, fluid/liquid, elastic](http://www.smashingmagazine.com/2009/06/02/fixed-vs-fluid-vs-elastic-layout-whats-the-right-one-for-you/), and hybrid layouts each offer a solution to different problems designing for the web.

Multiple devices, browsers, and resolutions make control over a design more difficult. Too much control takes away flexibility from your audience.

Of the four fixed-width is probably the most common due to its predicability and ease of development. It’s how I’ve built most sites over the years and perhaps how you have as well. Personally I’ve never cared for fluid layouts as they seem to cause more problems than they solve.

Fixed and fluid will probably give way to elastic and hybrid layouts as the latter two are able to keep most of the pros of the former, while minimizing some of their cons. Though more complicated than their counterparts they each is worth the effort when time and budget allow.

Next time we’ll look at the other 2 layouts, responsive, and [fluid/elastic grids](http://www.alistapart.com/articles/fluidgrids/). The later is less of an overall layout and more something you would add to fluid or elastic layouts to remove some of the cons of each.

I’ll also add some additional thoughts on when you might decide to use each layout.

Each layout has its strengths and weaknesses and it makes sense to learn how to code for each type.

* **Fixed Width** — least expensive, simplest to develop, most control over visual design
* **Fluid/Liquid** — Most flexible, everything relative to browser window (external to design)
* **Elastic** — Flexible, everything relative to part of the design, usually font size (internal to design)
* **Hybrid** — Can be both flexible and static. Different hybrid layouts can lean toward either.
* **Responsive** — Best when site needs to work well across a range of known devices, browsers, etc.
* **Fliud/Elastic Grids** — Offers a way to maintain order inside a flexible container.