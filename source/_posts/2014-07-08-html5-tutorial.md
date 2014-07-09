---
layout: post
title: "Html5 Tutorial"
category: Web
tags: [web, html, tutorial]
--- 
## Tutorial

- [The JavaScript Tutorial](http://javascript.info/)

## Quick Start

Let’s look more closely at these differences by examining hello.html, the HTML5 equivalent of a “Hello, World!” application, shown in the following listing.

```html
<!-- The DOCTYPE declaration in HTML5 is short and sweet—no ridiculously 
long DTDs and URLs to remember. This DOCTYPE will force standards 
mode in all modern browsers, so you can start using it in your 
applications immediately, without negative consequence. -->
<!DOCTYPE html>
<!-- The DOCTYPE declaration in HTML5 is short and sweet—no ridiculously 
long DTDs and URLs to remember. This DOCTYPE will force standards 
mode in all modern browsers, so you can start using it in your 
applications immediately, without negative consequence. -->
<html lang="en">
    <head>
        <!-- The <meta> element now supports a charset attribute, 
        allowing for a more memorable syntax than the older 
        combination of http-equiv and content attributes for defining 
        the page’s character set (in this case we’re using 8-bit 
        Unicode). Note that in the XML serialization of HTML5 this tag 
        is required to be self-closing (e.g., <meta charset="utf-8"/>). 
        See the sidebar “HTML and XML” for further details. -->
        <meta charset="utf-8">
        <title>Hello, HTML5!</title>
        <!-- All modern browsers will assume that a stylesheet’s <link> element will have a type of text/css by default, so you can safely omit that attribute in your HTML5 documents. -->
        <link rel="stylesheet" href="style.css">

        <!-- Browsers assume that <script> elements have a type of text/javascript, so you don’t need to specify the attribute unless you’re using it for something other than JavaScript. -->
        <script src="app.js"></script>
    </head>
    <body>
        <h1>Hello, HTML5!</h1>
    </body>
</html>
```

![html-order-demo.jpg](http://johnnyimages.qiniudn.com/html-order-demo.jpg)

### Defining a form’s basic HTML document structure

```html5
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Order Form</title>
        <link rel="stylesheet" href="style.css">
        <script src="modernizr.js"></script>
        <script src="app.js"></script>
    </head>
    <body>
        <form name="order" method="post" action="/submit">
            <h1>Order Form</h1>
            <div class="buttons">
                <input type="submit" value="Submit Order">
                <input type="submit" id="saveOrder" value="Save Order">
            </div>
        </form>
    </body>
</html>
```


### CREATE THECONTACTDETAILS FORM SECTION

- The `autofocus` attribute is self-explanatory; it allows you to define which input element should receive focus when the page loads. 
- The `required` attribute is also straightforward—it allows you to define that a field must contain input from the user in order to be valid. You’ll learn much more about HTML5 form validation later in the chapter. 
- The `placeholder` attribute allows you to define a piece of text that will appear in a field when it’s empty and inactive. As soon as the user types in the field, the placeholder text will be cleared and replaced with the user’s input.

You should add this code to the index.html file,
immediately after the line `<h1>Order Form</h1>` from the previous listing.

```html
<fieldset>
    <legend>Contact Details</legend>
    <ul>
        <li>
            <label class="required">
                <div>Full Name</div>
                <!-- The name field is the first in the form, so it makes sense to autofocus it. It’s also a required field. -->
                <input name="name" required autofocus>
            </label>
            <label>
                <div>Postal Address</div>
                <!-- The address field uses the placeholder attribute to indicate what type of information is relevant for each of the fields. -->
                <input name="address1" placeholder="Address Line 1">
            </label>
            <li>
                <label>
                    <div>Home Phone No.</div>
                    <!-- The homephone and cellphone fields both use the tel input type. Although this will make no apparent difference on a regular browser, visitors using mobile browsers will benefit from a virtual keyboard that’s designed specifically for entering telephone numbers. -->
                    <input type="tel" name="homephone">
                </label>
            </li>
        </li>
    </ul>
</fieldset>
```

## Form

- [HTML5 Forms: JavaScript and the Constraint Validation API](http://www.sitepoint.com/html5-forms-javascript-constraint-validation-api)

## File

- [Exploring the FileSystem APIs - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/file/filesystem/)
- [阅读以 JavaScript 编写的本地文件 - HTML5 Rocks](http://www.html5rocks.com/zh/tutorials/file/dndfiles/)

## DOM


## Argument

- [HTML5 Vs. Native Apps for Mobile - Business Insider](http://www.businessinsider.com/html5-vs-native-apps-for-mobile-2013-6?op=1)

## Books

- [HTML5 in Action](http://www.salttiger.com/html5-action/)