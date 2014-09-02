---
layout: post
title: "A Guide to Web Components"
category: Web
tags: [web, component]
--- 

> orgin: <http://css-tricks.com/modular-future-web-components/>

Recently I was working with a client to train their internal teams on how to build web applications. During this process it occurred to me that the way we presently architect the front-end is very strange and even a bit broken. In many instances you’re either copying huge chunks of HTML out of some doc and then pasting that into your app (Bootstrap, Foundation, etc.), or you’re sprinkling the page with jQuery plugins that have to be configured using JavaScript. It puts us in the rather unfortunate position of having to choose between bloated HTML or mysterious HTML, and often we choose **both.**

In an ideal scenario, the HTML language would be expressive enough to create complex UI widgets and also extensible so that we, the developers, could fill in any gaps with our own tags. Today, this is finally possible through a new set of standards called **Web Components.**

### Web Components?

Web Components are a collection of standards which are working their way through the W3C and landing in browsers as we speak. In a nutshell, they allow us to bundle markup and styles into custom HTML elements. What's truly amazing about these new elements is that they fully encapsulate all of their HTML and CSS. That means the styles that you write always render as you intended, and your HTML is safe from the prying eyes of external JavaScript.

If you want to play with native Web Components I'd recommend using [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html), since it has the best support. Be sure to enable the following settings in `chrome://flags`.

* Experimental JavaScript
* Experimental Web Platform Features
* HTML Imports

### A Practical Example

Think about how you currently implement an image slider, it might look something like this:

```html
<div id="slider">
  <input checked="" type="radio" name="slider" id="slide1" selected="false">
  <input type="radio" name="slider" id="slide2" selected="false">
  <input type="radio" name="slider" id="slide3" selected="false">
  <input type="radio" name="slider" id="slide4" selected="false">
  <div id="slides">
    <div id="overflow">
      <div class="inner">
        <article>
          <img src="./rock.jpg" alt="an interesting rock">
        </article>
        <article>
          <img src="./grooves.jpg" alt="some neat grooves">
        </article>
        <article>
          <img src="./arch.jpg" alt="a rock arch">
        </article>
        <article>
          <img src="./sunset.jpg" alt="a dramatic sunset">
        </article>
      </div>
    </div>
  </div>
  <label for="slide1"></label>
  <label for="slide2"></label>
  <label for="slide3"></label>
  <label for="slide4"></label>
</div>
```

<p data-height="500" data-theme-id="0" data-slug-hash="rCGvJ" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/robdodson/pen/rCGvJ/'>CSS3 Slider</a> by Rob Dodson (<a href='http://codepen.io/robdodson'>@robdodson</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<small>Image slider adapted from <a href="http://csscience.com/responsiveslidercss3/">CSScience</a>. Images courtesy of <a href="http://www.flickr.com/photos/eliya">Eliya Selhub</a></small>

That's a decent chunk of HTML, and we haven't even included the CSS yet! But imagine if we could remove all of that extra cruft and reduce it down to only the important bits. What would that look like?

```
<img-slider>
  <img src="./sunset.jpg" alt="a dramatic sunset">
  <img src="./arch.jpg" alt="a rock arch">
  <img src="./grooves.jpg" alt="some neat grooves">
  <img src="./rock.jpg" alt="an interesting rock">
</img-slider>
```

Not too shabby! We've ditched the boilerplate and the only code that's left is the stuff we care about. This is the kind of thing that Web Components will allow us to do. But before I delve into the specifics I'd like to tell you another story.

### Hidden in the shadows

For years the browser makers have had a sneaky trick hidden up their sleeves. Take a look at this `<video>` tag and really think about all the visual goodies you get with just one line of HTML.

```
<video src="./foo.webm" controls></video>
```

![](http://cdn.css-tricks.com/wp-content/uploads/2013/11/video-player.png)  

<sub>There's a play button, a scrubber, timecodes and a volume slider. Lots of stuff that you didn't have to write any markup for, it just appeared when you asked for `<video>`.</sub>

But what you’re actually seeing is an illusion. The browser makers needed a way to guarantee that the tags they implemented would always render the same, regardless of any wacky HTML, CSS or JavaScript we might already have on the page. To do this, they created a secret passage way where they could hide their code and keep it out of our hot little hands. They called this secret place: **the Shadow DOM.**

If you happen to be running Google Chrome you can open your Developer Tools and enable the `Show Shadow DOM` flag. That'll let you inspect the `<video>` element in more detail.

![](http://cdn.css-tricks.com/wp-content/uploads/2013/11/show-shadow-dom1.jpg)  
<sub>The Show Shadow DOM option</sub>

![](http://cdn.css-tricks.com/wp-content/uploads/2013/11/video-shadow-dom_2.jpg)  

<sub>Inspecting the Shadow DOM</sub>

Inside you'll find that there's a ton of HTML all hidden away. Poke around long enough and you'll discover the aforementioned play button, volume slider, and various other elements.

Now, think back to our image slider. What if we _all_ had access to the shadow DOM and the ability to declare our own tags like `<video>`?  Then we could actually implement and use our custom `<img-slider>` tag.

Let’s take a look at how to make this happen, using the first pillar of Web Components, the template.

### Templates

Every good construction project has to start with a blueprint, and with Web Components that blueprint comes from the new `<template>` tag. The template tag allows you to store some markup on the page which you can later clone and reuse. If you've worked with libraries like mustache or handlebars before, then the `<template>` tag should feel familiar.

```
<template>
  <h1>Hello there!</h1>
  <p>This content is top secret :)</p>
</template>
```

Everything inside a template is considered inert by the browser. This means tags with external sources — `<img>`, `<audio>`, `<video>`, etc. — do not make http requests and `<script>` tags do not execute. It also means that nothing from within the template is rendered on the page until we activate it using JavaScript.

So the first step in creating our `<img-slider>` is to put all of its HTML and CSS into a `<template>`.

<p data-height="268" data-theme-id="0" data-slug-hash="EeLav" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/robdodson/pen/EeLav/'>CSS3 Slider Template</a> by Rob Dodson (<a href='http://codepen.io/robdodson'>@robdodson</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Once we've done this, we're ready to move it into the shadow DOM.

### Shadow DOM

To really make sure that our HTML and CSS doesn't adversely affect the consumer we sometimes resort to iframes. They do the trick, but you wouldn't want to build your entire application in 'em.

Shadow DOM gives us the best features of iframes, style and markup encapsulation, without nearly as much bloat.

To create shadow DOM, select an element and call its `createShadowRoot` method. This will return a document fragment which you can then fill with content.

```
<div class="container"></div>

<script>
  var host = document.querySelector('.container');
  var root = host.createShadowRoot();
  root.innerHTML = '<p>How <em>you</em> doin?</p>'
</script>
```

#### Shadow Host

In shadow DOM parlance, the element that you call `createShadowRoot` on is known as the **Shadow Host.** It's the only piece visible to the user, and it's where you would ask the user to supply your element with content.

If you think about our `<video>` tag from before, the `<video>` element itself is the shadow host, and the contents are the `<source>` tags you nest inside of it.

```
<video>
  <source src="trailer.mp4" type="video/mp4">
  <source src="trailer.webm" type="video/webm">
  <source src="trailer.ogv" type="video/ogg">
</video>
```

#### Shadow Root

The document fragment returned by `createShadowRoot` is known as the **Shadow Root.** The shadow root, and its descendants, are hidden from the user, but they're what the browser will actually render when it sees our tag.

In the `<video>` example, the play button, scrubber, timecode, etc. are all descendants of the shadow root. They show up on the screen but their markup is not visible to the user.

#### Shadow Boundary

Any HTML and CSS inside of the shadow root is protected from the parent document by an invisible barrier called the **Shadow Boundary.** The shadow boundary prevents CSS in the parent document from bleeding into the shadow DOM, and it also prevents external JavaScript from traversing into the shadow root.

Translation: Let's say you have a style tag in the shadow DOM that specifies all h3's should have a `color` of red. Meanwhile, in the parent document, you have a style that specifies h3's should have a `color` of blue. In this instance, h3's appearing within the shadow DOM will be red, and h3's outside of the shadow DOM will be blue. The two styles will happily ignore each other thanks to our friend, the shadow boundary.

And if, at some point, the parent document goes looking for h3's with `$('h3')`, the shadow boundary will prevent any exploration into the shadow root and the selection will only return h3's that are external to the shadow DOM.

This level of privacy is something that we've dreamed about and worked around for years. To say that it will change the way we build web applications is a total understatement.

### Shadowy Sliders

To get our `img-slider` into the shadow DOM we'll need to create a shadow host and populate it with the contents of our template.

```
<template>
  <!-- Full of slider awesomeness -->
</template>

<div class="img-slider"></div>

<script>
  // Add the template to the Shadow DOM
  var tmpl = document.querySelector('template');
  var host = document.querySelector('.img-slider');
  var root = host.createShadowRoot();
  root.appendChild(document.importNode(tmpl.content, true));
</script>
```

In this instance we've created a `div` and given it the class `img-slider` so it can act as our shadow host.

We select the template and do a deep copy of its internals with `document.importNode`. These internals are then appended to our newly created shadow root.

If you're using Chrome you can actually see this working in the following pen.

<p data-height="500" data-theme-id="0" data-slug-hash="GusaF" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/robdodson/pen/GusaF/'>CSS3 Slider Shadow DOM</a> by Rob Dodson (<a href='http://codepen.io/robdodson'>@robdodson</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

#### Insertion Points

At this point our `img-slider` is inside the shadow DOM but the image paths are hard coded. Just like the `<source>` tags nested inside of `<video>`, we'd like the images to come from the user, so we'll have to invite them over from the shadow host.

To pull items into the shadow DOM we use the new `<content>` tag. The `<content>` tag uses CSS selectors to cherry-pick elements from the shadow host and project them into the shadow DOM. These projections are known as **insertion points.**

We'll make it easy on ourselves and assume that the slider always has four images, that way we can create four insertion points using `nth-of-type`.

```
<template>
  ...
  <div class="inner">
    <article>
      <content select="img:nth-of-type(1)"></content>
    </article>
    <article>
      <content select="img:nth-of-type(2)"></content>
    </article>
    <article>
      <content select="img:nth-of-type(3)"></content>
    </article>
    <article>
      <content select="img:nth-of-type(4)"></content>
    </article>
  </div>
</template>
```

Now we can populate our `img-slider`.

```
<div class="img-slider">
  <img src="./rock.jpg" alt="an interesting rock">
  <img src="./grooves.jpg" alt="some neat grooves">
  <img src="./arch.jpg" alt="a rock arch">
  <img src="./sunset.jpg" alt="a dramatic sunset">
</div>
```

This is really cool! We've cut the amount of markup that the user sees way down. But why stop here? We can take things a step further and turn this `img-slider` into its own tag.

### Custom Elements

Creating your own HTML element might sound intimidating but it's actually quite easy. In Web Components speak, this new element is a **Custom Element**, and the only two requirements are that its name must contain a dash, and its prototype must extend `HTMLElement`.

Let's take a look at how that might work.

```
<template>
  <!-- Full of image slider awesomeness -->
</template>

<script>
  // Grab our template full of slider markup and styles
  var tmpl = document.querySelector('template');

  // Create a prototype for a new element that extends HTMLElement
  var ImgSliderProto = Object.create(HTMLElement.prototype);

  // Setup our Shadow DOM and clone the template
  ImgSliderProto.createdCallback = function() {
    var root = this.createShadowRoot();
    root.appendChild(document.importNode(tmpl.content, true));
  };

  // Register our new element
  var ImgSlider = document.registerElement('img-slider', {
    prototype: ImgSliderProto
  });
</script>
```

The `Object.create` method returns a new prototype which extends `HTMLElement`. When the parser finds our tag in the document it will check to see if it has a method named `createdCallback`. If it finds this method it will run it immediately. This is a good place to do setup work, so we create some Shadow DOM and clone our template into it.

We pass the tag name and prototype to a new method on the `document`, called `registerElement`, and after that we're ready to go.

Now that our element is registered there are a few different ways to use it. The first, and most straightforward, is to just use the `<img-slider>` tag somewhere in our HTML. But we can also call `document.createElement("img-slider")` or we can use the constructor that was returned by `document.registerElement` and stored in the `ImgSlider` variable. It's up to you which style you prefer.

### Support

Support for the various standards that makeup Web Components is currently spotty, though improving all the time. This table illustrates where we're presently at.

![](http://cdn.css-tricks.com/wp-content/uploads/2013/11/support_2_1.jpg)

But don't let the table discourage you from using them! The smarties at Mozilla and Google have been hard at work building polyfill libraries which sneak support for Web Components into **all modern browsers!** This means you can start playing with these technologies _today_ and give feedback to the folks writing the specs. That feedback is important so we don't end up with stinky, hard to use syntax.

Let's look at how we could rewrite our `img-slider` using Google's Web Component library, [Polymer.](http://www.polymer-project.org/)

### Polymer to the Rescue!

Polymer adds a new tag to the browser, `<polymer-element>`, which automagically turns templates into shadow DOM and registers custom elements for us. All we need to do is to tell Polymer what name to use for the tag and to make sure we include our template markup.

<p data-height="500" data-theme-id="0" data-slug-hash="blfGh" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/robdodson/pen/blfGh/'>Polymer Slider</a> by Rob Dodson (<a href='http://codepen.io/robdodson'>@robdodson</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

I find it's often easier to create elements using Polymer because of all the niceties built into the library. This includes two-way binding between elements and models, automatic node finding and support for other new standards like Web Animations and Pointer Events. Also, the developers on the [polymer-dev mailing list](https://groups.google.com/forum/#!forum/polymer-dev) are extremely active and helpful, which is great when you're first learning the ropes, and the [StackOverflow community](http://stackoverflow.com/questions/tagged/polymer) is growing.

This is just a tiny example of what Polymer can do, so be sure to [visit its project page](http://www.polymer-project.org/) and also checkout Mozilla's alternative, [X-Tag.](http://www.x-tags.org/)

### Issues

Any new standard can be controversial and in the case of Web Components it seems that they are especially polarizing. Before we wrap up, I want to open up for discussion some of the feedback I've heard over the past few months and give my take on it.

#### OMG it's XML!!!

I think the thing that probably scares most developers when they first see Custom Elements is the notion that it will turn the document into one big pile of XML, where everything on the page has some bespoke tag name and, in this fashion, we'll make the web pretty much unreadable. That's a valid argument so I decided to kick the bees' nest and [bring it up on the Polymer mailing list.](https://groups.google.com/forum/#!searchin/polymer-dev/xml/polymer-dev/lzvaDViB_Ow/VtbeIqX0Ap0J)

The back and forth discussion is pretty interesting but I think the general consensus is that we're just going to have to experiment to see what works and what doesn't. Is it better, and more semantic, to see a tag name like `<img-slider>` or is our present "div soup" the only way it should be? Alex Rusell composed [a very thoughtful post on this subject](http://infrequently.org/2013/11/long-term-web-semantics/) and I'd recommend everyone take the time to read it before making up their mind.

#### SEO

At this moment it's unclear how well crawlers support Custom Elements and Shadow DOM. [The Polymer FAQ states](http://www.polymer-project.org/faq.html#seo):

> Search engines have been dealing with heavy AJAX based applications for some time now. Moving away from JS and being more declarative is a good thing and will generally make things better.

Recent evidence suggests that search engines _are_ able to understand custom elements to some degree. A good example is the [Polymer website](http://polymer-project.org/) itself, which is built with custom elements and is easily searched in Google.

From speaking with members of the Polymer team I've learned that the general best practice is to make sure the content inside of your custom element is static, and not coming from a data binding.

```
<!-- probably good -->
<x-foo>
  Here is some interesting, and searchable content...
</x-foo>

<!-- probably bad -->
<x-foo>
  {{crazyDynamicContent}}
</x-foo>

<!-- definitely don't do this -->
<a href="{{aDynamicLink}}">Click here</a>
```

To be fair, this isn't a new problem. AJAX heavy sites [have been dealing with this issue](https://developers.google.com/webmasters/ajax-crawling/docs/html-snapshot) for a few years now and thankfully there are [solutions](http://www.yearofmoo.com/2012/11/angularjs-and-seo.html) out there.

#### Accessibility

Obviously when you're hiding markup in secret shadow DOM sandboxes the issue of accessibility becomes pretty important. Steve Faulkner took a look at accessibility in shadow DOM and seemed to be satisfied with what he found.

> Results from initial testing indicate that inclusion of ARIA roles, states and properties in content wholly inside the Shadow DOM works fine. The accessibility information is exposed correctly via the accessibility API. Screen readers can access content in the Shadow DOM without issue.

[The full post is available here.](http://blog.paciellogroup.com/2012/07/notes-on-web-components-aria/)

Marcy Sutton has also written [a post](http://substantial.com/blog/2014/02/05/accessibility-and-the-shadow-dom/) exploring this topic in which she explains:

> Web Components, including Shadow DOM, are accessible because assistive technologies encounter pages as rendered, meaning the entire document is read as “one happy tree”.

Marcy also points out that the img-slider I built in this post is not accessible because our CSS label trick makes it inaccessible from the keyboard. Keep that in mind if you're looking to reuse it in a project.

Surely there will be bumps along the way but that sounds like a pretty great start!

#### Style tags? Um, no thanks.

Unfortunately `<link>` tags do not work inside of the Shadow DOM, which means the only way to pull in external CSS is through `@import`. In other words, `<style>` tags are — for the moment — unavoidable<sup>1</sup>.

Keep in mind that the styles we're talking about are relevant only to a component, whereas we've previously been trained to favor external files because they often affect our entire application. So is it such a bad thing to put a `<style>` tag inside of an element, if all of those styles are scoped just to that one entity? Personally I think it's OK, but the option of external files would be very nice to have.

---

<sup>1</sup> 
<small>Unless you use Polymer which <a href="http://www.polymer-project.org/articles/styling-elements.html#style-shadowdom">gets around this limitation with XHR</a>.</small>

### Now it's your turn

It's up to us to figure out where these standards should go and what best practices will guide them. Give [Polymer](http://www.polymer-project.org/) a shot, and also look at Mozilla's alternative to Polymer, [X-Tag](http://www.x-tags.org/) (which has support all the way down to Internet Explorer 9).

Also, make sure you reach out to [the developers at Google](https://groups.google.com/forum/#!forum/polymer-dev) and [Mozilla](https://bugzilla.mozilla.org/show_bug.cgi?id=889230) who are driving the bus on these standards. It'll take our feedback to properly mold these tools into something we all want to use.

While there are still some rough edges, I think Web Components will eventually usher in a new style of application development, something more akin to snapping together Lego bricks and less like our current approach, which is often plagued by excess boilerplate. I'm pretty excited by where all of this is heading, and I look forward to what the future might hold.

<script async src="//codepen.io/assets/embed/ei.js"></script>
