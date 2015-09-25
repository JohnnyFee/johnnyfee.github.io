layout: post
title: "CSS vs Tables: The Debate That Won’t Die"
category: CSS
tags: [css]
---

> source post: [CSS vs Tables: The Debate That Won't Die - Vanseo Design](http://www.vanseodesign.com/css/css-divs-vs-tables/)

One of the debates that never seems to go away in the web development community is that of css vs tables and which is better to use for the layout of your site. I’m surprised this debate continues, though admittedly I’m continuing it right now after the question was raised on my [small business forum](http://www.small-business-forum.net/design-development/1936-css-vs-tables.html). I think much of the reason css vs tables is still debated is the misinformation people on both sides put out there. Hopefully I can clear up a few things in this post and let you make your own decision.  
<span id="more-918"></span>  
Let me start by letting you know I fall on the css side of things. Having developed and worked on sites both ways I’m 100% certain structuring your layout with tables is not the way to go. However, you can build a great site using tables and a poor site using css. To compare we really need to look at sites that are well developed on both sites.

<!-- more -->

Let me also say that if you prefer to develop sites with a table-based layout, good for you. I’m not going to tell you that you’re doing anything wrong or evil or that the world is going to come to an end. I do think [css is the better option](http://www.adobe.com/devnet/dreamweaver/articles/why_css.html), but feel free to develop sites any way you want.

## What This Debate is Really About ##

Calling this debate css vs tables is actually inaccurate. You can use css with a table-based layout. One argument the css side always uses is that having your [presentation in a separate file](http://meiert.com/en/blog/20090908/advantage-of-css/) makes the site easy to maintain. That is true, but you can have all your presentation in a separate css file while having a table-based structure to your html.

If you originally decide all your h1 tags should be blue and later want them to be red it’s certainly easier to have your h1 style sitting in a single css file. You can do that regardless of how you structure your layout. That would be a debate between using css or html attributes for presentation. I don’t think anyone is arguing in favor of html attributes.

What the css vs tables debate is really about is whether or not to structure a web page with tables or divs. In its [simplest form](http://www.pixelclever.com/table-free-pure-css-layouts) we’re comparing:

    <table>
      <tr>
        <td>Some content here</td>
      </tr>
    </table>

and

    <div>Some content here</div>

## The Problems with Tables ##

Even in the simplest case above you can see tables are already a more complex structure than divs. We needed three sets of tags to present some content as opposed to the one set of div tags. As we add more to the page’s design the table complexity continues to increase compared to divs.

In the best case scenario you’d be adding at least another table cell to get another block of information compared to adding another div for another block of information, which would grow our code equally. Most of the time though, that relationship won’t be 1:1. It will usually involve adding more tags on the table side as compared to the div side.

More code leads to more potential for errors. Software developers have known that for years and it’s equally true of the code used to develop a web page or site.

That brings us to the second problem with tables. They impose a more rigid structure than divs. Every table cell is dependent on the other table cells in its row to maintain the structure. Divs can work independently from each other. You can’t pluck a single cell out of a table and move it somewhere else in the layout. You can’t break out of the rigid grid easily. You can with a div. 

Suppose you have a typical [two column layout](http://www.vanseodesign.com/css/2-column-css-layout/) (content and sidebar) and you wanted to reverse the order. Maybe you want to move the sidebar from the left to the right of the content. With a table-based layout the only way this would be possible would be to go into every page of your site and change the underlying structure. With a div-based layout you could make this change in your stylesheet alone. Granted it’s not the kind of change you’re likely to make, but as an example it shows the greater flexibility and control you have in developing with divs.

The third problem with tables is in how browsers render them. In order for a browser to render a page built with tables it needs to read the code on the page twice. Once to understand the structure and another time to present it. That extra pass at the code makes table-based layouts take longer to display. With a simple table structure the extra time might not be noticeable, but as the structure becomes more complex with more and more tables nested inside each other it is noticeable.

If you ever visited a page that showed nothing for a few seconds before everything suddenly appeared, that time was likely your browser making it’s first pass over the table structure behind the page.

## The Advantages of Divs ##

The advantages with using divs are essentially counter to the problems with tables described above. A div-based layout is:

* easier to maintain – less code and less complexity to the structure makes things easier to find and change.
* more flexible – since one div is not dependent on the other divs on the page it allows for more freedom in your design
* quicker to load – blocks of code can be presented right away instead of the browser requiring an extra pass

That might not seem like a lot, but just those three things are enough to make a div based approach better to a table based approach. Now let’s get to some of the myths on both sides that keep this debate going.

## Myths About Divs and Tables ##

I mentioned at the start of this post that [misinformation spreads on both sides of this debate](http://www.isolani.co.uk/blog/standards/TheShallownessOfCssEvangelism). As people combat these myths the debate goes on and on combating misinformation while dancing around the central issue. Let’s see if we can dispel a few myths from each side

1.  CSS (divs) are better for SEO – Search engines don’t care one bit if the code behind your page uses tables or divs. Search engines are interested in your content, not your code. It’s true that less code means less potential for show stopping errors, but those show stoppers can exist regardless of your site’s structure.

    Some might argue that the content search engines see on the page is more important and through divs it’s easier to present a different order of content to visitors and search engine spiders. It is easier with divs, but it can also be done with tables.

2.  CSS (divs) are more accessible – Both tables and divs can be coded to be accessible or inaccessible. You’ll have more control over how your page displays with divs that can aid in how a screenreader sees your content, but again you can create equally accessible pages using either approach.

3.  CSS (divs) is hard to learn – Simply not true. [CSS is not hard to learn](http://www.vanseodesign.com/css/my-development-with-css/).The argument is made by people comparing learning something new to learning something they already know well. That’s not an apples to apples comparison. Laying out a site with divs has a learning curve. So does laying out a site with tables. The problem most people have when learning to use divs is trying to force them to act like tables instead of allowing them to be what they are.

    Even if we accept the argument that learning to use divs is difficult that doesn’t make tables a better approach. The best things in life are not necessarily easy or easy to learn. Not doing something because it takes time to learn is laziness.

4.  CSS (divs) requires too many hacks to work cross browser – Entirely false. Perhaps it’s a matter of experience, but if you know what you’re doing you never need to use any kind of hack. It’s been years since I wrote more than a few lines of code specifically for any one browser and none of that code is a hack.

    If you develop to standards at most you’ll need to tweak a few things for Internet Explorer and usually only older versions of IE. If you find yourself needing hacks then most likely you haven’t thought out your structure all that well.

5.  It’s quicker to develop with tables – Nope. I guarantee I can develop a page with divs quicker than you can develop it with tables. This argument usually includes the time taken to learn to use divs, which isn’t a fair comparison. Take two developers, one who is fluent with tables and one who is fluent with divs, hand them a layered PSD file and ask them to code a web page to see who finishes first. My money will be on the person using divs.

## Conclusion ##

This is one of those debates that never seems to go away and I guess I’m not exactly doing my part to make it go away with this post. I find it hard to believe that anyone who honestly knows how to develop a site well with both tables and divs would ever choose to use tables. Having used both it’s very obvious to me that the div based approach is the much better way to go.

There are a lot of myths propagated by both sides in this debate, but once you cut through most of them the argument really boils down to a few things.

Divs require less code and are less dependent on each other than tables. That leads to easier maintenance, more freedom in design, and quicker load times. Those arguments alone should be enough to tip the scales in the argument. Everything else is really irrelevant.

## Reference

- [Are CSS Tables Better Than HTML Tables? - Vanseo Design](http://www.vanseodesign.com/css/tables/)