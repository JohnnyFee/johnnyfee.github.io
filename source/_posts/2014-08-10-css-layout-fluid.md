---
layout: post
title: "2 And 3 Column Fluid CSS Layouts"
category: Css
tags: [css, layout]
--- 

> source posts: <http://www.vanseodesign.com/css/fluid-layout-code/>

Over the last couple of weeks I’ve offered some boilerplate code and construction details for [2 column](http://www.vanseodesign.com/css/2-column-layout-code/) and [3 column fixed width layouts](http://www.vanseodesign.com/css/3-column-layout-code/). Let’s continue today with fluid or liquid layouts.  
The concepts for creating fluid layouts are mostly the same we used in creating the fixed width layouts with a few key differences.

Since much of what we’ll do here simply builds on what we’ve done before I won’t go into every detail for developing fully fluid layouts. Instead I’ll direct you to the previous posts and focus here on what’s new and different.

* [2 column fixed with layout](http://www.vanseodesign.com/css/2-column-layout-code/)
* [3 column fixed width layout](http://www.vanseodesign.com/css/3-column-layout-code/)

<!--more-->

On the bright side since we’ll skip some of the previously covered details we’ll develop both 2 and 3 column fluid layouts in one post. If you’d prefer to jump directly to the code here’s a link to the [demos](http://www.vanseodesign.com/blog/demo/fluid-css-layout/fluid-2.php).

Let’s start with the 2 column liquid layout.

[![2 column fluid layout: content on left, sidebar on right](http://johnnyimages.qiniudn.com/content-sidebar.pngundefined)](http://www.vanseodesign.com/blog/demo/fluid-css-layout/fluid-2.php)

## The HTML ##

If you’ve been following along with this series the html below should look very familiar. It’s the same html we used to create a 2 column fixed width layout with one exception.

```html
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
```

I’ve removed the container div that wrapped the header, content, sidebar, and footer divs. If you remember the purpose of the container div was to fix the width and then [center everything](http://www.vanseodesign.com/css/centering-with-css/) in the browser.

Since we don’t need to do either here, we no longer need that container div. Things are already simpler. Nice.

## The CSS ##

Again this should be very familiar if you’ve been following along. There are only a few differences from what we’ve already seen.

```css
body {
    margin:0
}

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

Naturally since we removed the container div from the html there’s no container  in the css.

The first new css is to set the margin to 0 on the body. By default the body will have some margin pushing it away from the browser edge. We want our layout to be right up against the edge so we [reset](http://www.vanseodesign.com/css/css-resets-pros-cons/) the margin to 0.

The next difference is we’re specifying widths in % as opposed to px. Since we want our layout to adapt to the size of the browser we have to use a relative measurement instead of a fixed measurement.

If you remember the post on the [pros and cons of various css layouts](http://www.vanseodesign.com/css/css-layout-patterns-part-1/) I said that fluid/liquid layouts are relative to the browser. That’s why we’re using %. Units like ‘em’ are also relative, but they’re relative to the size of the font, which is internal to the design.

There’s really nothing else new here. Just as we did with the fixed width layouts, we’ve floated both columns to the left (we could also float the sidebar to the right) and cleared the footer in both directions.

As with the fixed width layouts we can change the location of columns by changing the direction of the floats.


    #content {float: right}
    #sidebar {float: left}


![2 column fluid layout: content on right, sidebar on left](http://www.vanseodesign.com/blog/wp-content/uploads/2011/05/sidebar-content.png)

### Gotchas ###

The potential gotcha is in using % as a measurement. Odds are you’ll want to set some padding or margins on different divs within the layout, and you’ll likely reach first for px. You might try to do the same with other measurements in your design as well.

However as soon as you start adding absolute units like px you’re moving away from a fluid layout. The idea with fluid/liquid layouts is to have all measurements be relative to the browser window so they can resize in proportion as the window is resized.

You also need to watch that % add up to 100%. It’s natural to want 3 columns to have the same width, which would be 33%, but then you’re missing 1%. Better to have two 33% columns and one 34% column. Not a big deal, but something to remember.

I should also note that like the fixed width layouts what’s presented here won’t create columns of equal height. The columns in the demo have equal heights, because I’ve explicitly set them to be equal. In practice the column height will change based on what’s inside each.

I’ll have a post on creating layouts with columns of equal height in a couple of weeks.

[![3 column fluid css layout: primary sidebar, main content, secondary sidebar](http://www.vanseodesign.com/blog/wp-content/uploads/2011/05/primary-content-secondary.png)](http://www.vanseodesign.com/blog/demo/fluid-css-layout/fluid-3.php)

## 3 Column Liquid Layout ##

If you’ve understood how we set up fixed width layouts and also understood what changed above to make the 2 column fixed layout a 2 column fluid layout, you should already understand how to create a 3 column fluid layout.

I’ll spare you further explanation and simply present the code.

### The HTML ###

```html
<div id="header">
    <p>Header</p>
</div>

<div id="primary">
    <p>Primary Sidebar</p>
</div>
    
<div id="content">
    <p>Main content</p>
</div>
    
<div id="secondary">
    <p>Seconday Sidebar</p>
</div>
    
<div id="footer">
    <p>Footer</p>
</div>
```

### The CSS ###

```css
#primary {
    float: left:;
    width:25%;
}

#content {
    float:left;
    width:50%;
}

#secondary {
    float:left;
    width:25%;
}

#footer {
    clear:both;
}
```

Nothing here should be new. If the above isn’t making sense please refer back to the fixed width layout posts and the little bit of explanation for the 2 column layout above.

When it comes to moving columns around you might remember that we needed to use [positioning](http://www.vanseodesign.com/css/css-positioning/) on one of the 3 columns.

The same applies here, though we have to remember to set the value of left as a % instead of px. We’ll also set the body to position relative since we’re no longer using a container div.

Otherwise the explanation for moving columns is exactly the same as it was for the 3 column fixed width layout.

As a reminder for rearranging the columns.

* When divs are [floated](http://www.vanseodesign.com/css/understanding-css-floats/) in the same direction they’ll display in the same order as they appear in the html. The first div will either be the leftmost or rightmost column depending on whether things are floated left or right.
* When two divs are floated in one direction and the third is floated in the opposite direction, the lone div will appear either leftmost or rightmost (depending on the float direction) and the other two divs will be displayed (in their floated direction) in the order they appear in the html.
* When neither of the above works you order the columns by floating the two outside columns left and right and then using positioning on the column in the middle and giving it a left value equal to the width of the left column.

Feel free to ask questions in the comments below if you need further explanation or even better look for the detailed explanation in the [3 column fixed width layout](http://www.vanseodesign.com/css/3-column-layout-code/) post.

![river.jpg](http://www.vanseodesign.com/blog/wp-content/uploads/2010/05/river.jpg)

## A Word of Caution About Fluid/Liquid Layouts ##

When I first talked about the pros and cons of different css layouts I mentioned a few about liquid layouts that I’d like to bring up again.

With fluid layouts you give up a lot of control over your design. In some respects that’s how the web should work. We should be giving more control to our audience. However there are times when maintaing control over certain aspects of a design is important.

A major drawback to fluid layouts is that in allowing everything to resize you allow the measure or length of a line of text to resize without any minimum or maximum. That can and does leads to lines of text either too long or too short, which can be uncomfortable to read.

It also means other design elements start reflowing around the text in sometimes unpredictable ways. One way to counter this is by setting some min and max widths.

Unfortunately that kind of goes against the point of having the layout be fully liquid and it can also lead to too much or too little whitespace within your design.

While I think creating designs that are more fluid and adaptable to the different ways our sites and pages will be be viewed is a goal we should strive for, I don’t care much for _fully fluid_ layouts and can’t remember the last time I used one.

I also think that our fluid designs should be relative to something internal to the design and not external to the browser and we’ll get to those designs when we talk about elastic layouts.

## Summary ##

Once again here’s a link to the [demos](http://www.vanseodesign.com/blog/demo/fluid-css-layout/fluid-2.php).

As with the fixed width layouts, the html and css here are rather simple. If you understood how to build the former you shouldn’t have any problems with the liquid layouts here. The concepts are pretty much the same.

All we’ve done differently with the fluid layouts is remove the container div (which we used to fixed the width and center the layouts) and to use relative units of measurement (%) instead of absolute units of measurement (px).

It should also be relatively simple for you to add a 4th or 5th column to your fluid layout. Again it’s the same concepts we’ve already seen.

As I’ve done in the previous posts I’ll encourage you to play around with the code here and see what you can do with it. You need to practice making this code do your bidding before you can truly understand how it works

We’ll continue this series with hybrid layouts, which we’ll find are also surprisingly familiar to what we’ve already seen.