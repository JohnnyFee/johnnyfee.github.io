---
layout: post
title: "2 Column CSS Layout: Fixed Width And Centered"
category: Css
tags: [css, layout]
--- 

> source posts: <http://www.vanseodesign.com/css/2-column-layout-code/>
> 
> another posts: <http://www.vanseodesign.com/css/3-column-layout-code/>

One of the more common [css layout patterns](http://www.vanseodesign.com/css/css-layout-patterns-part-1/) you’ll come across is the fixed width 2 column layout. It’s relatively easy to code and understand, though it sometimes trips up developers new to css layouts.  

A few weeks ago I promised to offer boilerplate code for some common [css layout patterns](http://www.vanseodesign.com/css/css-layout-patterns-part-2/). This is the first of that boilerplate code and I’ll continue to offer more in the coming weeks.

If you prefer to skip the explanation and get right to the code you can view the source of the [demo](http://www.vanseodesign.com/blog/demo/2-col-css.html). Note that I’ve added some extra css just to make the demo more presentable.

<!--more-->

[![2 column css layout with sidebar on right](http://www.vanseodesign.com/blog/wp-content/uploads/2011/05/2-col-demo.png)](http://www.vanseodesign.com/blog/demo/2-col-css.html)

## The HTML ##

The html for this layout is rather simple as you can see below.

```html
<div id="container">
    <div id="header">
        header content here
    </div>
    
    <div id="content">
        main content here
    </div>
    
    <div id="sidebar">
        sidebar content here
    </div>
    
    <div id="footer">
        footer content here
    </div>
</div>
```

We have a single div for each of the 4 main areas of the layout — header, content, sidebar, and footer. All four divs are wrapped inside a container div, which we’ll use to center and set the width of the page.

One thing to note is the structure of the html above follows the structure of the page itself. The header comes first in both and the footer comes last. The content area div is before the sidebar.

Later in this post I’ll offer two ways to change the layout above so the sidebar is to the left of the content. One of those ways is as simple as changing a single word in the css.

## The CSS ##

If you’ve already viewed the source code of the demo you’ll note the css like the html is rather simple. In fact most of that css has been added solely to make the demo a little more presentable.

Here’s all the css you need for this layout minus the stuff to make the demo more presentable.

```css
#container {
    width:960px;
    margin:20px auto;
}

#content {
    float:left;
    width:620px;
}

#sidebar {
    float:left;
    width:340px;
}

#footer {
    clear:both;
}
```

If you combine this css with the html above you’ll have a 2 column layout that’s 960px wide. Let’s walk through the css one div at a time.

**\#container** — We’re using the container div so we can set the overall width of the layout (960px) and then [center the layout](http://www.vanseodesign.com/css/centering-with-css/) on the page.

The 20px top and bottom margin is arbitrary. I added it to give the demo a little room to breathe. The magic is done by setting auto on the left and right margins, which when combined with an explicit width, centers the layout on the page

Some people prefer not to use a container div and instead use the body tag as the container. I like using a separate container div, but either will work. If you’d rather not include the container div just remove it from the html above and move the css I show here from #container to body.

**\#header** —  No css is needed for the header div. By default its width will be 100% of it’s container and by default it will position itself as far to the top and left as it can.

These [defaults are exactly what we want](http://www.vanseodesign.com/css/css-resets-pros-cons/) so there’s no need to add more. A big part of understanding css layouts is realizing you often don’t need to do anything.

**\#content** — The important css is the float: left. It isn’t needed to have the [browser render](http://www.vanseodesign.com/css/cross-browser-css/) the div where we want, however floating the content is necessary to have the sidebar div sit next to it.

The width is arbitrary. You can set it to be anything you want as long as the sum of the content and sidebar widths is less than or equal to the width of the container div.

**\#sidebar** — Like the container, the sidebar is floated left, which is typically how I code this layout in practice. You could also float the sidebar to the right. Which you use is personal preference.

I’m unaware of any advantage or disadvantage to either approach. I usually float both to the left, though it’s simply because that’s how I first did it and now it’s become habit.

As with the content div the width here is arbitrary, except as noted above.

**\#footer** —  All we need to do with the footer is clear the two floated divs to ensure it sits below them. Since both content and sidebar were floated to the left we could have used clear: left instead of clear: both, but using clear: both is more flexible as we’ll see below.

Like the header the width of the footer will be 100% of the container which is what we want.

The rest of the css I’ve used in the demo is simply to make it more presentable.

![css box model](http://www.vanseodesign.com/blog/wp-content/uploads/2009/11/box.png)

### Floated Elements ###

If you don’t have experience using floats you may be wondering why the above works. It’s a little much to explain in a few short sentences so I’ll direct you to a couple of others posts I’ve written in a moment.

The gist is that every element in an html document is [defined by a rectangular box](http://www.vanseodesign.com/css/css-positioning/). There are two types of boxes, block and inline.

Divs are block level boxes, which are laid out vertically in the normal document flow. The box carves out a space forcing the next box to sit below it.

Floated elements are removed from the normal document flow and shifted as far left or right as possible. Other elements are allowed to flow around or next to them.

By floating both our content and sidebar divs above we break them out of the normal document flow and allow them to sit next to each other.

By clearing the footer div we get it to behave as though the the two floated divs are in the normal document flow and so the footer drops below them.

I realize that’s not much of an explanation. For a more in depth explanation of the [css box model](http://www.w3.org/TR/css3-box/) and floated elements you can read the 2 posts below.

* [CSS Box Model: The Foundation For Improving Your CSS](http://www.instantshift.com/2009/11/16/css-box-model-the-foundation-for-improving-your-css/)
* [Understanding CSS Floats](http://www.vanseodesign.com/css/understanding-css-floats/)

![2 column css layout with sidebar on left](http://www.vanseodesign.com/blog/wp-content/uploads/2011/05/2-col-demo-sidebar-left.png)

## Changing the Position of the Content and Sidebar ##

I mentioned above there were 2 ways to change this layout so the sidebar is on the left of the content instead of the right. Both are very simple to implement

The first is to change the order of the divs in the html. The sidebar being first will float to the left edge of the browser and the content will float as far to the left as it can go, which is against the right edge of the sidebar.

When I know in advance I want the sidebar to be on the left I generally place it first in the html.

The second way is even easier. Just float the content div to the right instead of to the left.

    #content {float: right}

This is why we cleared our footer on both sides instead of just the left.

The above css shows off the power and flexibility of css layouts. By changing a single word in a single css file we can move columns from one side of our layout to the other. We’ll see the full power of this with the code for a 3 column layout I’ll share next week.

It’s not something you’ll do often, but think about how much time and effort it would take to move columns around with a [table-based layout](http://www.vanseodesign.com/css/css-divs-vs-tables/).

## Equal Height Columns ##

I should point out that this layout doesn’t automatically create columns of equal height. The demo makes it appear like it does, but that’s only because I set the height of the content and sidebar to be the same to make the presentation nicer visually.

The height of each of the 4 main divs will will expand and contract based on what’s inside and most of the time that means they won’t have the same height.

Creating equal height columns is a bit trickier, though possible, and there are several methods for making it happen. I’ll save those for another post.

## Summary ##

I hope you can see how easy it is to set up a 2 column fixed width layout. There’s really very little html and css needed. An important part of css layouts is understanding you need less css than you think.

The key to this layout is floating the 2 divs we want to sit next to each other and then clearing the first div that comes after them, which in our case is the footer.

From here it’s all about filling up each of the 4 main divs with content, though that will be specific to your project.

One thing I would suggest is taking this code and play around with it. Reorder the divs, remove a float, change a float from left to right, and try clearing the footer to the left or right only and see what happens.

You have 4 blocks to play with and a few simple lines of html and css to move them around. The more you play, the better you’ll understand how and why this all works and the easier it will be for you to create more complex layouts like the 3 column layout I’ll offer next week.

Have fun.