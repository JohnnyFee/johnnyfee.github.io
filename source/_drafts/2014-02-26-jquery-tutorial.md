---
layout: post
title: "JavaScript 面向对象"
category: JavaScript
tags: [javascript]
--- 

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

This time we are selecting every list item (<li>) that:

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

##Tutorial

- [8个对程序员来说有用的jQuery小贴士和技巧 - WEB开发者](http://www.admin10000.com/document/3961.html)
- [jQuery Coding Standards and Best Practices](http://lab.abhinayrathore.com/jquery-standards/)

