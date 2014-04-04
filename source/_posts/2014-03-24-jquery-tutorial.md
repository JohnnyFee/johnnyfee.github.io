---
layout: post
title: "jQuery Tutorial"
category: JavaScript
tags: [javascript]
--- 

> 本文为读 [Learning jQuery, 4th Edition](http://www.salttiger.com/learning-jquery-4th-edition/) 的读书笔记。

## DOM

<http://api.jquery.com/category/selectors/>

我们将对以下示例进行改造：

	<ul id="selected-plays">
		<li>Comedies
		    <ul>
		        <li><a href="/asyoulikeit/">As You Like It</a></li>
		        <li>All's Well That Ends Well</li>
		        <li>A Midsummer Night's Dream</li>
		        <li>Twelfth Night</li>
		    </ul>
		</li>
		<li>Tragedies
		    <ul>
		        <li><a href="hamlet.pdf">Hamlet</a></li>
		        <li>Macbeth</li>
		        <li>Romeo and Juliet</li>
		    </ul>
		</li>
		<li>Histories
		    <ul>
		        <li>Henry IV (<a href="mailto:henryiv@king.co.uk">email</a>)
	            <ul>
	                <li>Part I</li>
	                <li>Part II</li>
	            </ul>
	            <li><a href="http://www.shakespeare.co.uk/henryv.htm">
	            Henry V</a></li>
	            <li>Richard II</li>
	        </ul>
	    </li>
	</ul>

<!--more-->

默认的显示效果：

![jquery-example-ul.png](http://johnnyimages.qiniudn.com/jquery-example-ul.png)

### CSS selectors

The jQuery library supports nearly all the selectors included in CSS specifications 1 through 3.

Let's suppose that we want the top-level items, and only the top-level items—Comedies, Tragedies, and Histories—to be arranged horizontally. We can start by defining a `horizontal` class in the stylesheet: 

	.horizontal {
		float: left;
		list-style: none;
		margin: 10px;
	}

__The `horizontal` class floats the element to the left-hand side of the one following it__, removes the bullet from it if it's a list item, and adds a 10-pixel margin on all sides of it.

Rather than attaching the `horizontal` class directly in our HTML, we'll add it dynamically to the top-level list items only, to demonstrate jQuery's use of selectors:

	$(document).ready(function() {
		$('#selected-plays > li').addClass('horizontal');
	});

__The second line uses the child combinator (>) to add the horizontal class to all the top-level items only__. In effect, the selector inside the $()function is saying, "Find each list item (li) that is a child (>) of the element with an ID of selected-plays (#selected-plays)"

Now our nested list looks like this:

![jquery-ui-horizontal.png](http://johnnyimages.qiniudn.com/jquery-ui-horizontal.png)

Styling all the other items—those that are not in the top level—can be done in a number of ways. Since we have already applied the horizontalclass to the top-level items, one way to select __all sub-level__ items is to use a negation _pseudo-class_ to identify all list items that do not have a class of horizontal. Note the addition of the third line of code:

	$(document).ready(function() {
		$('#selected-plays > li').addClass('horizontal');
		$('#selected-plays li:not(.horizontal)').addClass('sublevel');
	});

This time we are selecting every list item (`<li>`) that:

- Is a descendant of the element with an ID of selected-plays (#selected-plays)
- Does not have a class of horizontal (:not(.horizontal))

When we add the sub-levelclass to these items, they receive the shaded background defined in the stylesheet:

	.sub-level {
		background: #ccc;
	}

### Attribute selectors

Attribute selectors are a particularly helpful subset of CSS selectors. They allow us to specify an element by one of its HTML attributes, such as a link's titleattribute or an image's altattribute. For example, to select all images that have an altattribute, we write the following:

	$('img[alt]')

### Styling links

Attribute selectors accept a wildcard syntax inspired by regular expressions for identifying the value at the beginning (^) or end ($) of a string. They can also take an asterisk (*) to indicate the value at an arbitrary position within a string or an exclamation mark (!) to indicate a negated value.

Let's say we want to have different styles for different types of links. We first define the styles in our stylesheet:

	a {
	    color: #00c;
	}
	a.mailto {
	    background: url(images/email.png) no-repeat right top;
	    padding-right: 18px;
	}
	a.pdflink {
	    background: url(images/pdf.png) no-repeat right top;
	    padding-right: 18px;
	}
	a.henrylink {
	    background-color: #fff;
	    padding: 2px;
	    border: 1px solid #000;
	}

Then, we add the three classes—mailto, pdflink, and henrylink—to the appropriate links using jQuery.

To add a class for all e-mail links, we construct a selector that looks for all anchor elements (a) with an hrefattribute ([href]) that begins with mailto: (^="mailto:"), and toher css like so, as follows:

	$(document).ready(function() {
		$('a[href^="mailto:"]').addClass('mailto');
		$('a[href$=".pdf"]').addClass('pdflink');
		$('a[href^="http"][href*="henry"]') .addClass('henrylink');
	});

});

![jquery-ui-a.png](http://johnnyimages.qiniudn.com/jquery-ui-a.png)

### Custom selectors

To the wide variety of CSS selectors, jQuery adds its own custom selectors. These custom selectors enhance the already impressive capabilities of CSS selectors to locate page elements in new ways.

When possible, jQuery uses the native DOM selector engine of the browser to find elements. This extremely fast approach is not possible when custom jQuery selectors are used. For this reason, it is recommended to avoid frequent use of custom selectors when a native option is available and performance is very important.

The custom selector syntax is the same as the CSS pseudo-class syntax, where the selector starts with a colon (:). For example, to select the second item from a set of `<div>` elements with a class of horizontal, we write this:

	$('div.horizontal:eq(1)')

Note that `:eq(1)` selects the second item in the set because JavaScript array numbering is zero-based, meaning that it starts with zero.

In contrast, CSS is one-based, so a CSS selector such as `$('div:nth-child(1)')` would select all div selectors that are the first child of their parent.

We can add a style to the stylesheet for all the table rows and use an altclass for the odd rows:

	tr {
		background-color: #fff; 
	}
	.alt {
		background-color: #ccc; 
	}

	$(document).ready(function() {
		$('tr:even').addClass('alt');
	});

We can expect our simple bit of code to produce tables that look like this:

![jquery-table-alternative.png](http://johnnyimages.qiniudn.com/jquery-table-alternative.png)

Note that for the second table, this result may not be what we intend. Since the last row in the Playstable has the alternate gray background, the first row in the Sonnets table has the plain white background. One way to avoid this type of problem is to use the `:nth-child()` selector instead, which __counts an element's position relative to its parent element rather than relative to all the elements selected so far__. This selector can take a number, odd, or evenas its argument

	$(document).ready(function() {
		$('tr:nth-child(odd)').addClass('alt');
	});

__Note that `:nth-child()` is the only jQuery selector that is one-based.__

For one final custom-selector touch, let's suppose for some reason we want to highlight any table cell that referred to one of the Henryplays. All we have to do—after adding a class to the stylesheet to make the text bold and italicized (`.highlight {font-weight:bold; font-style: italic;}`)—is add a line to our jQuery code using the `:contains()` selector:

	$(document).ready(function() {
		$('tr:nth-child(odd)').addClass('alt');
		$('td:contains(Henry)').addClass('highlight');
	});

The capabilities of custom selectors are not limited to locating elements based on their position. For example, when working with forms, jQuery's custom selectors and complementary CSS3 selectors can make short work of selecting just the elements we need. The following table describes a handful of these form selectors:

Selector 		| Match
----------------|------------
:input 			| Input, text area, select, and button elements
:button 		| Button elements and input elements with a typeattribute equal to button
:enabled 		| Form elements that are enabled
:disabled 		| Form elements that are disabled
:checked 		| Radio buttons or checkboxes that are checked
:selected 		| Option elements that are selected

As with the other selectors, form selectors can be combined forgreater specificity. We can, for example, select all checked radio buttons (but not checkboxes) with `$('input[type="radio"]:checked')` or select all password inputs and disabled text inputs with `$('input[type="password"]`, `$(input[type="text"]:disabled')`. Even with custom selectors, we can use the same basic principles of CSS to build the list of matched elements.

### DOM traversal methods

Some of the methods have a nearly identical counterpart among the selector expressions. For example, the line we first used to add the altclass, `$('tr:even').addClass('alt')`, could be rewritten with the `.filter()` method as follows:

	$('tr').filter(':even').addClass('alt');

Also, the .filter()method in particular has enormous power because it can take a function as its argument. The function allows us to create complex tests for whether elements should be kept in the matched set. Let's suppose, for example, we want to add a class to all external links:

	a.external {
		background: #fff url(images/external.png) no-repeat 100% 2px;
		padding-right: 16px;
	}

jQuery has no selector for this sort of case. Without a filter function, we'd be forced to explicitly loop through each element, testing each one separately. With the following filter function, however, we can still rely on jQuery's implicit iteration and keep our code compact:

	$('a').filter(function() {
		return this.hostname && this.hostname != location.hostname;
	}).addClass('external')

More precisely, the `.filter()` method iterates through the matched set of elements, __calling the function once for each and testing the return value__. If the function returns false, the element is removed from the matched set. If it returns true, the element is kept.

With the `.filter()` method in place, the Henry Vlink is styled to indicate it is external:

![jquery-dom-filter.png](http://johnnyimages.qiniudn.com/jquery-dom-filter.png)

__Styling specific cells__

Earlier, we added a highlight class to all cells containing the text Henry. To instead style the cell next to each cell containing Henry, we can begin with the selector that we have already written and simply call the `.next()` method on the result:

	$(document).ready(function() {
		$('td:contains(Henry)').next().addClass('highlight');
	});

The tables should now look like this:

![jquery-dom-filter.png](http://johnnyimages.qiniudn.com/jquery-dom-next.png)

The `.next()` method selects only the very next sibling element. To highlight all of the cells following the one containing Henry, we could use the `.nextAll()` method instead:

	$(document).ready(function() {
		$('td:contains(Henry)').nextAll().addClass('highlight');
	});

As we might expect, the `.next()` and `.nextAll()` methods have counterparts: `.prev()` and `.prevAll()`. Additionally, `.siblings()` selects all other elements at the same DOM level, regardless of whether they come before or after the previously selected element.

To include the original cell (the one that contains Henry) along with the cells that follow, we can add the `.addBack()` method:

	$(document).ready(function() {
		$('td:contains(Henry)').nextAll().addBack()
		.addClass('highlight');
	});

There are a multitude of selector and traversal-method combinations by which we can select the same set of elements. Here, for example, is another way to select every cell in each row where at least one of the cells contains Henry:

	$(document).ready(function() {
		$('td:contains(Henry)').parent().children().addClass('highlight');
	});

### Accessing DOM elements

Every selector expression and most jQuery methods return a jQuery object. This is almost always what we want because of the implicit iteration and chaining capabilities that it affords.

To access the first DOM element referred to by a jQuery object, for example, we would use `.get(0)`.

So, if we want to know the tag name of an element with an ID of my-element, we would write:

	varmyTag = $('#my-element').get(0).tagName;

For even greater convenience, jQuery provides a shorthand for .get(). Instead of writing the previous line, we can use square brackets immediately following the selector:

	varmyTag = $('#my-element')[0].tagName;

__It's no accident that this syntax appears to treat the jQuery object as an array of DOM elements__; using the square brackets is like peeling away the jQuery layer to get at the node list, and including the index (in this case, 0) is like plucking out the DOM element itself.

## Handling Events

### window.onload vs $(document).ready()

The `window.onload` event fires when a document is __completely downloaded__ to the browser. This means that every element on the page is ready to be manipulated by JavaScript, which is a boon for writing feature-rich code without worrying about load order.

On the other hand, a handler registered using `$(document).ready()` is invoked when the __DOM is completely ready for use__. This also means that all elements are accessible by our scripts, but does not mean that every associated file has been downloaded. As soon as the HTML file has been downloaded and parsed into a DOM tree, the code can run.

To ensure that the page has also been styled before the JavaScript code executes, it is good practice to place the `<link rel="stylesheet">` and `<style>` tags prior to any `<script>` tags within the document's `<head>` element.

Using $(document).ready() is almost always preferred over using an onload handler, but we need to keep in mind that because supporting files may not have loaded, attributes such as image height and width are not necessarily available at this time. If these are needed, we may at times also choose to implement an onload handler (or more likely, use jQuery to bind a handler to the load event); the two mechanisms can coexist peacefully.

Consider, for example, a page that presents an image gallery; such a page may have many large images on it, which we can hide, show, move, and otherwise manipulate with jQuery. If we set up our interface using the onload event, users will have to wait until each and every image is completely downloaded before they can use those features. Even worse, if behaviors are not yet attached to elements that have default behaviors (such as links), user interactions could produce unintended outcomes. However, when we use $(document).ready() for the setup, the interface is ready to be used earlier with the correct behavior.

There are two ways to call ready method:

	(document).ready(function() {
	  // Our code here...
	});

and 

	$(function() {
	  // Our code here...
	});

jQuery provides a method called `jQuery.noConflict()` to return control of the $ identifier back to other libraries. Typical usage of jQuery.noConflict() follows the following pattern:

	<script src="prototype.js"></script>
	<script src="jquery.js"></script>
	<script>
	  jQuery.noConflict();
	</script>
	<script src="myscript.js"></script>

First, the other library (Prototype in this example) is included. Then, jQuery itself is included, taking over $ for its own use. Next, a call to .noConflict() frees up $, so that control of it reverts to the first included library (Prototype). Now in our custom script we can use both libraries—but whenever we want to use a jQuery method, we need to write jQuery instead of $ as an identifier.

The .ready() method has one more trick up its sleeve to help us in this situation. The callback function we pass to it can take a single parameter—the jQuery object itself. This allows us to effectively rename it without fear of conflicts using the following syntax:

	jQuery(document).ready(function($) {
	  // In here, we can use $ like normal!
	});

Or we can use the shorter syntax we learned previously:

	jQuery(function($) {
	  // Code that uses $.
	});

### simple events

	$(document).ready(function() {
	  $('#switcher-large').on('click', function() {
	    $('body').addClass('large');
	  });
	});

When any event handler is triggered, the keyword `this` refers to the DOM element to which the behavior was attached. Earlier we noted that the `$()` function could take a DOM element as its argument; this is one of the key reasons why that facility is available. __By writing `$(this)` within the event handler, we create a jQuery object corresponding to the element, and we can act on it just as if we had located it with a CSS selector.__


With this in mind, we can write the following:

	$(document).ready(function() {
		$('#switcher-default')
		.addClass('selected')
		.on('click', function() {
			$('body').removeClass('narrow').removeClass('large');
		});

		$('#switcher-narrow').on('click', function() {
			$('body').addClass('narrow').removeClass('large');
		});
		
		$('#switcher-large').on('click', function() {
			$('body').removeClass('narrow').addClass('large');
		});

		$('#switcher button').on('click', function() {
			$('#switcher button').removeClass('selected');
			$(this).addClass('selected');
		});
	});


This optimization takes advantage of three jQuery features we have already discussed. First, __implicit iteration__ is once again useful when we bind the same click handler to each button with a single call to .on(). Second, __behavior queuing__ allows us to bind two functions to the same click event without the second overwriting the first. Lastly, we're using jQuery's __chaining__ capabilities to collapse the adding and removing of classes into a single line of code each time.

The `.removeClass()` method's parameter is optional; when omitted, it removes all classes from the element. We can streamline our code a bit by exploiting this as follows:

	$(document).ready(function() {
	  $('#switcher-default').addClass('selected');
	  
	  $('#switcher button').on('click', function() {
	    $('body').removeClass();
	    $('#switcher button').removeClass('selected');
	    $(this).addClass('selected');
	  });

	  $('#switcher-narrow').on('click', function() {
	    $('body').addClass('narrow');
	  });
	  
	  $('#switcher-large').on('click', function() {
	    $('body').addClass('large');
	  });
	});

在jQuery中，我们可以通过`on`方法来绑定所有事件，第一个参数为事件的名称。

除了`addClass()`和`removeClass()`外，还可以使用`toggleClass`来开关指定的class。

### Event propagation

	<div class="foo">
	  <span class="bar">
	    <a href="http://www.example.com/">
	      The quick brown fox jumps over the lazy dog.
	    </a>
	  </span>
	  <p>
	    How razorback-jumping frogs can level six piqued gymnasts!
	  </p>
	</div>

We then visualize the code as a set of nested elements:

![jquery-event-pro.jpg](http://johnnyimages.qiniudn.com/jquery-event-pro.jpg)

For any event, there are multiple elements that could logically be responsible for reacting. When the link on this page is clicked, for example, the `<div>`, `<span>`, and `<a>` elements should all get the opportunity to respond to the click. After all, these three elements are all under the user's mouse cursor at the time. The `<p>` element, on the other hand, is not part of this interaction at all.

One strategy for allowing multiple elements to respond to a user interaction is called __event capturing__. __With event capturing, the event is first given to the most all-encompassing element, and then to progressively more specific ones__. In our example, this means that first the `<div>` element gets passed the event, then the `<span>` element, and finally the `<a>` element, as shown in the following figure:

![jquery-event-capture.jpg](http://johnnyimages.qiniudn.com/jquery-event-capture.jpg)

The opposite strategy is called __event bubbling__. The event gets sent to the most specific element, and after this element has an opportunity to react, the event bubbles up to more general elements. In our example, the `<a>` element would be handed the event first, and then the `<span>` and `<div>` elements in that order, as shown in the following figrure:

![jquery-event-bubbling.jpg](http://johnnyimages.qiniudn.com/jquery-event-bubbling.jpg)

 The DOM standard that was eventually developed thus specified that both strategies should be used: first the event is captured from general elements to specific ones, and then the event bubbles back up to the top of the DOM tree. Event handlers can be registered for either part of the process.

Event bubbling can cause unexpected behavior, especially when the wrong element responds to a mouseover or mouseout event. Consider a mouseout event handler attached to the `<div>` element in our example. When the user's mouse cursor exits the `<div>` element, the mouseout handler is run as anticipated. Since this is at the top of the hierarchy, no other elements get the event. On the other hand, when the cursor exits the `<a>` element, a mouseout event is sent to that. This event will then bubble up to the `<span>` element and then to the `<div>` element, firing the same event handler. This bubbling sequence is likely not desired.

The mouseenter and mouseleave events, either bound individually or combined in the .hover() method, are aware of these bubbling issues, and __when we use them to attach events, we can ignore the problems caused by the wrong element getting a mouseover or mouseout event.__

必要的时候我们可以访问事件回调的event属性：

	// Unfinished code
	$(document).ready(function() {
	  $('#switcher').click(function(event) {
	    if (event.target == this) {
	      $('#switcher button').toggleClass('hidden');
	    }
	  });
	});

This code ensures that the item clicked on was `<div id="switcher">`, not one of its sub-elements. Now, clicking on buttons will not collapse the style switcher, but clicking on the switcher's background will. However, clicking on the label, `<h3>`, now does nothing, because it too is a sub-element. Instead of placing this check here, we can modify the behavior of the buttons to achieve our goals.

#### Stopping event propagation

The event object provides the .stopPropagation() method, which can halt the bubbling process completely for the event. Like .target, this method is a basic DOM feature, but cannot be safely used as such in Internet Explorer 8 or older. As long as we register all of our event handlers using jQuery, though, we can use it with impunity.

We'll remove the event.target == this check we just added, and instead add some code in our buttons' click handlers:

	$(document).ready(function() {
		$('#switcher').click(function(event) {
		    $('#switcher button').toggleClass('hidden');
		});
	});

	$(document).ready(function() {
	  $('#switcher-default').addClass('selected');
	  $('#switcher button').click(function(event) {
	    var bodyClass = this.id.split('-')[1];
	    $('body').removeClass().addClass(bodyClass);
	    $('#switcher button').removeClass('selected');
	    $(this).addClass('selected');
	    event.stopPropagation();
	  });
	});

As before, we need to add a parameter to the function we're using as the click handler so we have access to the event object. Then, we simply call event.stopPropagation() to prevent any other DOM element from responding to the event. Now our click is handled by the buttons, and only the buttons; clicks anywhere else on the style switcher will collapse or expand it.

#### Preventing default actions

If our click event handler was registered on a link element (`<a>`) rather than a generic `<button>` element outside of a form, we would face another problem. When a user clicks on a link, the browser loads a new page. This behavior is not an event handler in the same sense as the ones we have been discussing; instead, this is the default action for a click on a link element. Similarly, when the Enter key is pressed while the user is editing a form, the submit event may be triggered on the form, but then the form submission actually occurs after this.

If these default actions are undesired, calling .stopPropagation() on the event will not help. These actions occur nowhere in the normal flow of event propagation. Instead, the `.preventDefault()` method will serve to stop the event in its tracks before the default action is triggered.

Calling `.preventDefault()` is often useful after we have done some tests on the environment of the event. For example, during a form submission, we might wish to check that required fields are filled in and prevent the default action only if they are not.

Event propagation and default actions are independent mechanisms; either of them can be stopped while the other still occurs. __If we wish to halt both, we can return false at the end of our event handler, which is a shortcut for calling both .stopPropagation() and .preventDefault() on the event__.

#### Delegating events

Event bubbling isn't always a hindrance; we can often use it to great benefit. One great technique that exploits bubbling is called event delegation. With it, we can use an event handler on a single element to do the work of many.

In our example, there are just three `<button>` elements that have attached click handlers. But what if there were many? This is more common than you might think. Consider, for example, a large table of information in which each row has an interactive item requiring a click handler. Implicit iteration makes assigning all of these click handlers easy, but performance can suffer because of the looping being done internally to jQuery, and because of the memory footprint of maintaining all the handlers.

Because event delegation can be helpful in so many situations, jQuery includes a set of tools to aid developers in using this technique. The .on() method we have already discussed can perform event delegation when provided with appropriate parameters:

	$('#switcher').on('click', 'button', function() {
	  var bodyClass = event.target.id.split('-')[1];
	  $('body').removeClass().addClass(bodyClass);
	  $('#switcher button').removeClass('selected');
	  $(this).addClass('selected');
	});

When a selector expression is provided as the second argument to .on(), jQuery binds the click handler to the #switcher object, but compares event.target against the selector expression—in this case, 'button'. If it matches, jQuery maps the this keyword to the matched element. Otherwise, the event handler is not executed at all.

### Removing an event handler

	$(document).ready(function() {
	  $('#switcher').click(function(event) {
	    if (!$(event.target).is('button')) {
	      $('#switcher button').toggleClass('hidden');
	    }
	  });
	  $('#switcher-narrow, #switcher-large').click(function() {
	    $('#switcher').off('click');
	  });
	});

Now when a button such as Narrow Column is clicked, the click handler on the style switcher `<div>` is removed, and clicking on the background of the box no longer collapses it. However, the buttons don't work anymore! They are affected by the click event of the style switcher `<div>` as well, because we rewrote the button-handling code to use event delegation. This means that when we call $('#switcher').off('click'), both behaviors are removed.

#### Giving namespaces to event handlers

We need to make our .off() call more specific so that it does not remove both of the click handlers we have registered. One way of doing this is to use __event namespacing__. We can introduce additional information when an event is bound that allows us to identify that particular handler later. To use namespacing, we need to return to the non-shorthand method of binding event handlers, the .on() method itself.

The first parameter we pass to .on() is the name of the event we want to watch for. We can use a special syntax here, though, that allows us to subcategorize the event:

	$(document).ready(function() {
	  $('#switcher').on('click.collapse', function(event) {
	    if (!$(event.target).is('button')) {
	      $('#switcher button').toggleClass('hidden');
	    }
	  });
	  $('#switcher-narrow, #switcher-large').click(function() {
	    $('#switcher').off('click.collapse');
	  });
	});

The .collapse suffix is invisible to the event handling system; click events are handled by this function, just as if we wrote .on('click'). However, the addition of the namespace means that we can unbind just this handler without affecting the separate click handler we wrote for the buttons.

## Styling

This `css()` method acts as both a getter and a setter. To get the value of a single style property, we simply pass the name of the property as a string and get a string in return. To get the value of multiple style properties, we can pass the property names as an array of strings to get an object of property-value pairs in return. Multiword property names such as backgroundColor can be interpreted by jQuery when in hyphenated CSS notation (background-color) or camel-cased DOM notation (backgroundColor):

	// Get a single property's value
	.css('property')
	// returns "value"

	// Get multiple properties' values
	.css(['property1', 'property-2'])
	// returns {"property1": "value1", "property-2": "value2"}

For setting style properties, the .css() method comes in two flavors. One flavor takes a single style property and its value and the other takes an object of property-value pairs:

	// Single property and its value
	.css('property', 'value')

	// Object of property-value pairs
	.css({
	  property1: 'value1',
	  'property-2': 'value2'
	})

We use the `.css()` method the same way we've been using `.addClass()`; we apply it to a jQuery object, which in turn points to a collection of DOM elements.

### Hiding and showing elements

The basic `.hide()` and .`show()` methods, without any parameters, can be thought of as smart shorthand methods for .css('display', 'string'), where 'string' is the appropriate display value. The effect, as might be expected, is that the matched set of elements will be immediately hidden or shown with no animation.

The `.hide()` method sets the inline style attribute of the matched set of elements to display: none. The smart part here is that it remembers the value of the display property—typically block, inline, or inline-block—before it was changed to none. Conversely, the `.show()` method restores the display properties of the matched set of elements to whatever they initially were before display: none was applied.

##  Manipulating the DOM

### Non-class attributes

Much like the `.css()` method, `.attr()` can accept a pair of parameters, the first specifying the attribute name and the second being its new value. More typically, though, we supply an object of key-value pairs. The following syntax allows us to easily expand our example to modify multiple attributes at once:

	$(document).ready(function() {
	  $('div.chapter a').attr({
	    rel: 'external',
	    title: 'Learn more at Wikipedia'
	  });
	});

__Value callbacks__

The straightforward technique for passing .attr() a simple object of constants is sufficient when we want the attribute or attributes to have the same value for each matched element. Often, though, the attributes we add or change must have different values each time. One common example is that for any given document, each id value must be unique if we want our JavaScript code to behave predictably. To set a unique id value for each link, we can harness another feature of jQuery methods such as .css() and .each()—value callbacks.

A value callback is simply a function that is supplied instead of the value for an argument. This function is then invoked once per element in the matched set. Whatever data is returned from the function is used as the new value for the attribute. For example, we can use the following technique to generate a different id value for each element:

	$(document).ready(function() {
	  $('div.chapter a').attr({
	    rel: 'external',
	    title: 'Learn more at Wikipedia',
	    id: function(index, oldValue) {
	      return 'wikilink-' + index;
	    }
	  });
	});

### DOM element properties

In most cases, attributes and properties are functionally interchangeable, and jQuery takes care of the naming inconsistencies for us. However, at times we do need to be mindful of the differences between the two. Some DOM properties, such as nodeName, nodeType, selectedIndex, and childNodes, have no equivalent attribute, and therefore are not accessible via .attr(). Moreover, data types may differ: the checked attribute, for example, has a string value, while the checked property has a Boolean value. For these Boolean attributes, it is best to test and set the property rather than the attribute to ensure consistent cross-browser behavior.

We can get and set properties from jQuery using the .prop() method:

	// Get the current value of the "checked" property
	var currentlyChecked = $('.my-checkbox').prop('checked');

	// Set a new value for the "checked" property
	$('.my-checkbox').prop('checked', false);

### The value of form controls

Perhaps the most troublesome difference between attributes and properties arises when trying to get or set the value of a form control. For text inputs, the value attribute is equivalent to the defaultValue property, not the value property. For select elements, the value is usually obtained via the element's selectedIndex property or the selected property of its option elements.

Because of these discrepancies, we should avoid using `.attr()`—and, in the case of select elements, even `.prop()`—to get or set form element values. Instead, we can use the `.val()` method, which jQuery provides for these occasions:

	// Get the current value of a text input
	var inputValue = $('#my-input').val();
	// Get the current value of a select list
	var selectValue = $('#my-select').val();
	//Set the value of a single select list
	$('#my-single-select').val('value3');
	// Set the value of a multiple select list
	$('#my-multi-select').val(['value1', 'value2']);

As with .attr() and .prop(), .val() can take a function for its setter argument. With its multi-purpose .val() method, jQuery yet again makes developing for the web much easier.

### Inserting new elements

The jQuery library has a number of methods available for inserting elements into the document. Each one dictates the relationship the new content will have to the existing content. For example, we will want our back to top links to appear after each paragraph, so we'll use the appropriately-named .insertAfter() method to accomplish this:

	$(document).ready(function() {
	  $('<a href="#top">back to top</a>').insertAfter('div.chapter p');
	  $('<a id="top"></a>').prependTo('body');
	});

This additional code inserts the anchor right at the beginning of the `<body>` tag; in other words, at the top of the page. Now, with the .insertAfter() method for the links and the .prependTo() method for the anchor, we have a fully functioning set of back to top links for the page.

Once we add the corresponding .appendTo() method, we now have a complete set of options for inserting new elements before and after other elements:

- .insertBefore() adds content outside of and before existing elements
- .prependTo() adds content inside of and before existing elements
- .appendTo() adds content inside of and after existing elements
- .insertAfter() adds content outside of and after existing elements

### Moving elements

	<p>How admirable is the Law of Compensation! <span    
	   class="footnote">And how perfect a proof of the natural 
	   fitness and, I may almost say, the divine origin of the 
	   aristocratic constitution of the States of Flatland!</span>
	   By a judicious use of this Law of Nature, the Polygons and 
	   Circles are almost always able to stifle sedition in its 
	   very cradle, taking advantage of the irrepressible and 
	   boundless hopefulness of the human mind.&hellip;
	</p>

Now we need to grab the footnotes and move them to the bottom of the document. Specifically, we'll insert them in between `<div class="chapter">` and `<div id="footer">`.

	$(document).ready(function() {
	  $('span.footnote').insertBefore('#footer');
	});

### Wrapping elements

When wrapping elements in another element, we need to be clear about whether we want each element wrapped in its own container or all elements wrapped in a single container. For our footnote numbering, we need both types of wrapper:

	$(document).ready(function() {
	  $('span.footnote')
	    .insertBefore('#footer')
	    .wrapAll('<ol id="notes"></ol>')
	    .wrap('<li></li>');
	});

Once we have inserted the footnotes before the footer, we wrap the entire set inside a single `<ol>` element using `.wrapAll()`. We then proceed to wrap each individual footnote inside its own `<li>` element using .wrap(). We can see that this has created properly-numbered footnotes:

![jquery-dom-wrapper.jpg](http://johnnyimages.qiniudn.com/jquery-dom-wrapper.jpg)

Each of the insertion methods, such as `.insertBefore()` or `.appendTo()`, has a corresponding inverted method. The inverted methods perform exactly the same task as the standard ones, but the subject and target are reversed. For example:

	$('<p>Hello</p>').appendTo('#container');

is the same as:

	$('#container').append('<p>Hello</p>');

Using `.before()`, the inverted form of .insertBefore(), we can now re-factor our code to exploit chaining:

	$(document).ready(function() {
	  var $notes = $('<ol id="notes"></ol>')
	    .insertBefore('#footer');
	  $('span.footnote').each(function(index) {
	    $(this)
	      .before('<sup>' + (index + 1) + '</sup>')
	      .appendTo($notes)
	      .wrap('<li></li>');
	  });
	});

The inverted insertion methods can accept a function as an argument, much like .attr() and .css() can. This function is invoked once per target element, and should return the HTML string to be inserted.

### Copying elements

For copying elements, jQuery's .clone() method is just what we need; it takes any set of matched elements and creates a copy of them for later use. As in the case of the $() function's element-creation process we explored earlier in this chapter, the copied elements will not appear in the document until we apply one of the insertion methods.

For example, the following line creates a copy of the first paragraph inside `<div class="chapter">`:

	$('div.chapter p:eq(0)').clone();

This alone is not enough to change the content of the page. We can make the cloned paragraph appear before <div class="chapter"> with an insertion method:

	$('div.chapter p:eq(0)').clone().insertBefore('div.chapter');

This will cause the first paragraph to appear twice. So, to use a familiar analogy, .clone() is related to the insertion methods just as copy is to paste.

The .clone() method, by default, does not copy any events that are bound to the matching element or any of its descendants. However, it can take a single Boolean parameter that, when set to true (.clone(true)), clones events as well.

## Content getter and setter methods

It would be nice to be able to modify the pull quote a bit by dropping some words and replacing them with ellipses to keep the content brief. To demonstrate this, we have wrapped a few words of the example text in a <span class="drop"> tag.

The easiest way to accomplish this replacement is to directly specify the new HTML entity that is to replace the old one. The .html() method is perfect for our needs:

	$(document).ready(function() {
	  $('span.pull-quote').each(function(index) {
	    var $parentParagraph = $(this).parent('p');
	    $parentParagraph.css('position', 'relative');

	    var $clonedCopy = $(this).clone();
	    $clonedCopy
	      .addClass('pulled')
	      .find('span.drop')
	        .html('&hellip;')
	      .end()
	      .prependTo($parentParagraph);
	  });
	});

We use `.find()` to search inside the pull quote for any `<span class="drop">` elements, operate on them, and then return to the pull quote itself by calling `.end()`. In between these methods, we invoke .html() to change the content into an ellipsis (using the appropriate HTML entity).

__When called without arguments, .html() returns a string representation of the HTML entity inside the matched element. With an argument, the contents of the element are replaced by the supplied HTML entity.__ We must take care to only specify a valid HTML entity, escaping special characters properly when using this technique.

Like `.html()`, the `.text()` method can either retrieve the content of the matched element or replace its content with a new string. Unlike `.html(), however, .text()` always gets or sets a plain text string. When `.text()` retrieves content, all of the included tags are ignored, and HTML entities are translated into plain characters. When it sets content, special characters such as `<` are translated into their HTML entity equivalents:

	$(document).ready(function() {
	  $('span.pull-quote').each(function(index) {
	    var $parentParagraph = $(this).parent('p');
	    $parentParagraph.css('position', 'relative');
	    var $clonedCopy = $(this).clone();
	    $clonedCopy
	      .addClass('pulled')
	      .find('span.drop')
	        .html('&hellip;')
	      .end()
	      .text($clonedCopy.text())
	      .prependTo($parentParagraph);
	  });
	});

When this sneaky bit of code fetches the content of the pull quote with `$clonedCopy.text()`, we get a plain string containing the text without tags. Therefore, when that text is fed right back into `.text()`, the markup is removed and the bold text in our example is no longer bold.

### DOM manipulation methods

* To _create_ new elements from HTML, use the $() function
* To _insert_ new elements _inside_ every matched element, use the following functions:

	* .append()
	* .appendTo()
	* .prepend()
	* .prependTo()

* To _insert_ new elements _adjacent to_ every matched element, use the following functions:

	* .after()
	* .insertAfter()
	* .before()
	* .insertBefore()

* To _insert_ new elements _around_ every matched element, use the following functions:

	* .wrap()
	* .wrapAll()
	* .wrapInner()

* To _replace_ every matched element with new elements or text, use the following functions:

	* .html()
	* .text()
	* .replaceAll()
	* .replaceWith()

* To _remove_ elements inside every matched element, use the following function: * .empty()
* To _remove_ every matched element and descendants from the document without actually deleting them, use the following functions: * .remove() * .detach()


## Tutorial

- [8个对程序员来说有用的jQuery小贴士和技巧 - WEB开发者](http://www.admin10000.com/document/3961.html)
- [jQuery Coding Standards and Best Practices](http://lab.abhinayrathore.com/jquery-standards/)
