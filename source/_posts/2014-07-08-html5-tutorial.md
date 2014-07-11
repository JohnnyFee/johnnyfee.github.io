---
layout: post
title: "Html5 Tutorial"
category: Web
tags: [web, html, tutorial]
--- 

## Quick Start

Let’s look more closely at these differences by examining hello.html, the HTML5 equivalent of a “Hello, World!” application, shown in the following listing.

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

<!--more-->

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


### CREATE THE CONTACT DETAILS FORM SECTION

- The `autofocus` attribute is self-explanatory; it allows you to define which input element should receive focus when the page loads. 
- The `required` attribute is also straightforward—it allows you to define that a field must contain input from the user in order to be valid. You’ll learn much more about HTML5 form validation later in the chapter. 
- The `placeholder` attribute allows you to define a piece of text that will appear in a field when it’s empty and inactive. As soon as the user types in the field, the placeholder text will be cleared and replaced with the user’s input.

You should add this code to the index.html file,
immediately after the line `<h1>Order Form</h1>` from the previous listing.

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
                <!-- ... -->
            </li>
        </ul>
    </fieldset>

### CREATE THE ORDER DETAILS FORM SECTION

- The number input type should display a new UI widget on supported browsers. `min` and `max` attributes define the minimum and maximum numbers that a user can enter in a number input field
- `data-*` HTML5 data-* attributes allow you to bind arbitrary key/value pair data to any element. JavaScript can then read this data to perform calculations and further client-side manipulation.

    Using `data-*` attributes is simple: prefix the key with data- to form the attribute name and assign it a value. In this example, you’re binding a price to a quantity input field:

        <input type="number" data-price="399.99" name="quantity">

- `<output>` The name of this element explains its purpose—it’s used to display output to the user. A typical use case for the `<output>` element is displaying the result of a calculation based on some data, such as that entered by a user in an `<input>` element.

Add this code directly after the code from the previous listing:

```html
<fieldset>
    <legend>Order Details</legend>
    <table>
        <thead>
            <tr>
                <th>Product Code</th><th>Description</th><th>Qty</th>
                <th>Price</th><th>Total</th>
            </tr>
        </thead>
        <tr>
            <td>
                COMP001
                <input type="hidden" name="product_code" value="COMP001">
            </td>
            <td>The Ultimate Smartphone</td>
            <td>
                <input type="number" data-price="399.99" name="quantity"
                value="0" min="0" max="99" maxlength="2">
            </td>
            <td>$399.99</td>
            <td>
                <output name="item_total" class="item_total">$0.00</output>
            </td>
        </tr>
        <tfoot>
        <tr>
            <td colspan="4">Order Total</td>
            <td>
                <output name="order_total" id="order_total">$0.00</output>
            </td>
        </tr>
        </tfoot>
    </table>
</fieldset>
```

### CREATE THE PAYMENT DETAILS FORM SECTION

HTML5 defines a number of date-related types: date, datetime, datetime-local, month, week, and time.

- The `month` type allows the user to select a month and year combination from a date-picker widget.
- The `pattern` attribute allows you to specify a regular expression pattern to test against data input in a field.

    <fieldset>
        <legend>Payment Details</legend>
        <ul>
            <li>
                <label class="required">
                    <div>Name on Card</div>
                    <input name="card_name" required>
                </label>
            </li>
            <li>
                <label class="required">
                    <div>Credit Card No.</div>
                    <!-- The regular expression in the card number field specifies that the value should be numeric and between 13 and 16 characters in length. The title attribute is used to give users more detail about the field’s requirements, should they attempt to submit an invalid value. -->
                    <input name="card_number" pattern="[0-9]{13,16}"
                    maxlength="16" required title="13-16 digits, no spaces">
                </label>
            </li>
            <li>
                <label class="required">
                    <div>Expiry Date</div>
                    <!-- The expiry date for the card uses the month input type, which displays a datepicker widget on supported browsers and should validate based on the format mask YYYY-MM. -->
                    <input type="month" name="card_expiry" maxlength="7"
                    placeholder="YYYY-MM" required value="2015-06">
                </label>
            </li>
            <li>
                <label class="required">
                    <div>CVV2 No.</div>
                    <input name="card_cvv2" class="cvv" maxlength="3"
                    pattern="[0-9]{3}" required title="exactly 3 digits">
                    <span>(Three digit code at back of card)</span>
                </label>
            </li>
        </ul>
    </fieldset>

### Bypass form validation and save form data

- You can force an entire form to bypass validation using the new `novalidate` attribute on the form itself. This is useful only if you want to use the new HTML5 form widgets but don’t want to use any of the new validation features.
-  In addition, you
may want to change the `formaction` property of the form to call a different URL when saving the data rather than submitting it. 

Let’s change the order form’s Save Order button to make use of these new attributes:

Find the line in index.html that reads

    <input type="submit" id="saveOrder" value="Save Order">

Replace that line with the following:

    <input type="submit" id="saveOrder" value="Save Order" formnovalidate formaction="/save">

- Open the Order Form page in IE10 (and higher) and leave all the fields blank.
- Click the Submit Order button, and an error message will pop up on the Name field telling you that this field must be filled out.
- Click the Save Order button, and you’ll notice that the validation will no longer be performed, and the URL the form has been submitted to will be `/save` rather than `/submit`.

### Change the form action in older browsers

On older browsers, the application should also be able to change the form action. When the user submits the form, it should call a different URL than when saving the data.

Create a new file named `app.js` in the same directory as the index.html file. Add the contents of the next listing to this file.

```js
(function() {
    var init = function() {
        var orderForm = document.forms.order,
            saveBtn = document.getElementById('saveOrder'),
            saveBtnClicked = false;

        var saveForm = function() {
            // When users click the Save button, check if their browser supports the formaction attribute.
            if (!('formAction' in document.createElement('input'))) {
                var formAction = saveBtn.getAttribute('formaction');
                // If the browser doesn’t support formaction, manually set the action attribute on the form using the setAttribute method.
                orderForm.setAttribute('action', formAction);
            }
            saveBtnClicked = true;
        };
        saveBtn.addEventListener('click', saveForm, false);
    };
    window.addEventListener('load', init, false);
})();
```

### Add functions to calculate total values

- If you needed to convert the value to a floating-point number, you likely used `parseFloat`, but HTML5 has provided a new solution, the `valueAsNumber` property. When you read the `valueAsNumber` property of a number input type, the property returns the number as a floating-point number. If you assign a floating-point number to the `valueAsNumber` property of a number input type, the property will convert the floating-point number to a string-based value.

    The following statements are equivalent for reading the floating-point value of a field:

        value = field.valueAsNumber;        //HTML5 version
        value = parseFloat(field.value);    //Fallback version

    Similarly, the following statements provide the same result when modifying the floating-point value of a field:

        field.valueAsNumber = value;        //HTML5 version
        field.value = value.toString();     //Fallback version

- In the case of `date/time` fields, there is a property, `valueAsDate`, that works much like the `valueAsNumber` property. When you use it to retrieve the value of a date-oriented field, it will return a Date object. Similarly, you can use the property to set the value of the field to a Date object.

- It’s straightforward to read data-* attributes—each element has a dataset property that contains all of the data-* attributes for that element. Each of the items in the dataset property has a key name that matches the key name in the element markup, with the data- prefix dropped. To retrieve that value, you can use the following code:

        var price = element.dataset.price;

    If you hyphenate your data-* attribute names, they’ll be camelcased in the dataset property. For example, if you use the attribute name data-person-name, you’d read this using element.dataset.personName rather than element.dataset.person-name.

    To get the value of the data-price attribute using this fallback, you’d use the following code:

        var price = element.getAttribute('data-price');

-  By writing values to the `<output>` element in browsers that support the `<output>` element, you can access it through the form, for example:

        var element = document.forms.formname.outputname;

    To update the value of an `<output>` element, you can set the value property:

        element.value = newValue;

    To access the element in browsers that don’t support `<output>`, you’ll need to give the element an ID and use document.getElementById instead:

        var element = document.getElementById('outputid');
    
    To update the value of the element, set the innerHTML property:

        element.innerHTML = newValue;

__Why use valueAsNumber instead of parseFloat?__

At this point, you may be wondering why you’d use `valueAsNumber` at all, when you can use `parseFloat` instead, and it’ll work consistently across all browsers. `valueAsNumber` offers a more concise way to convert values between string and floating-point. Also, using `valueAsNumber` over `parseFloat` could lead to a tiny increase in performance, but this is unlikely to be noticeable in most web applications. When the usefulness of `valueAsNumber` was questioned on a W3C mailing list, HTML5 editor Ian Hickson provided a use case where the `valueAsNumber` property was much more concise than parseFloat—incrementing the value of a field programmatically. Here’s an example:

    field.valueAsNumber += 1;                                //HTML5 version
    field.value = (parseFloat(field.value) + 1).toString()   //Fallback version

Open app.js and add the following code to the end of the initfunction, below the line `saveBtn.addEventListener('click', saveForm, false)`;

```js
var qtyFields = orderForm.quantity,
    totalFields = document.getElementsByClassName('item_total'),
    orderTotalField = document.getElementById('order_total');

var formatMoney = function(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var calculateTotals = function() {
    var i = 0,
        ln = qtyFields.length,
        itemQty = 0,
        itemPrice = 0.00,
        itemTotal = 0.00,
        itemTotalMoney = '$0.00',
        orderTotal = 0.00,
        orderTotalMoney = '$0.00';

    // You’ll add calculation code in this for loop later in the section.
    for (; i < ln; i++) {
         // Testing for existence of valueAsNumber property. The !! is used to cast the property valueAsNumber to a Boolean type. 
         // The first ! negates the truthness of the property and converts it to a Boolean. 
         // The second ! converts the Boolean to its original truth state.
        if(!!qtyFields[i].valueAsNumber) {
            itemQty =qtyFields[i].valueAsNumber || 0;
        } else {
            // valueAsNumber isn’t available in older browsers, so fall back to use parseFloat.
            itemQty =parseFloat(qtyFields[i].value) || 0;
        }

        // Getting the price values using data-* attributes
        if(!!qtyFields[i].dataset) {
            itemPrice =parseFloat(qtyFields[i].dataset.price);
        } else {
            // Fall back to getAttribute if the dataset property isn’t available.
            itemPrice =parseFloat(qtyFields[i].getAttribute('data-price'));
        }

        itemTotal =itemQty *itemPrice;
        itemTotalMoney = '$'+formatMoney(itemTotal.toFixed(2));
        orderTotal +=itemTotal;
        orderTotalMoney = '$'+formatMoney(orderTotal.toFixed(2)); 

        // Displaying updated totals using the <output> element
        // Test if the <output> element is supported by the user’s browser.
        if (!!totalFields[i].value) {
            totalFields[i].value = itemTotalMoney;
            orderTotalField.value = orderTotalMoney;
        } else {
            totalFields[i].innerHTML = itemTotalMoney;
            orderTotalField.innerHTML = orderTotalMoney;
        }
    }
};
calculateTotals();

var qtyListeners = function() {
    var i = 0,
        ln = qtyFields.length;
    for (; i < ln; i++) {
        qtyFields[i].addEventListener('input', calculateTotals, false);
        // The input event doesn’t detect backspace or delete keystrokes or cut actions in IE9, so bind to the keyup event as well. qtyFields[i].
        addEventListener('keyup', calculateTotals, false);
    }
};

qtyListeners();
```

### Checking form input data with the Constraint Validation API

The Constraint Validation API simplifies the implementation of custom error messages by providing a `setCustomValidity` method and a `validationMessage` property. Both constructs allow the application to assign an error message to the `<input>` element’s `validationMessage` attribute. Determining which construct to use will depend on the browser’s support for `setCustomValidity`.

Add the code from this listing to the end of the init function, directly after the call to qtyListeners.

```js
var doCustomValidity = function(field, msg) {
    if ('setCustomValidity' in field) {
        field.setCustomValidity(msg);
    } else {
        field.validationMessage = msg;
    }
};

var validateForm = function() {
    doCustomValidity(orderForm.name, '');
    doCustomValidity(orderForm.password, '');
    doCustomValidity(orderForm.confirm_password, '');
    doCustomValidity(orderForm.card_name, '');
    if (orderForm.name.value.length < 4) {
        doCustomValidity(
            orderForm.name, 'Full Name must be at least 4 characters long'
        );
    };

    // ...
};

orderForm.addEventListener('input', validateForm, false);
orderForm.addEventListener('keyup', validateForm, false);
```

When the user attempts to submit a form that uses HTML5 validation features, the submit event will only fire if the entire form has passed the validation tests. If you need to detect when form validation has failed, you can listen for the new invalid event. This event is fired when one of the following occurs: 

* The user attempts to submit the form and validation fails.
* The checkValidity method has been called by the application and has returned false.

Detecting a failed form validation with the `invalid` event:

    var styleInvalidForm = function() {
        orderForm.className = 'invalid';
    }
    orderForm.addEventListener('invalid',styleInvalidForm, true);

### Styling invalid elements using CSS3 pseudo-classes

One way to style invalid elements would be to iterate over the fields, checking if each one is invalid and applying CSS classes to those that have errors. But this is a bit cumbersome, and you can do this much more elegantly using a bit of CSS3 magic.

CSS3 introduces a range of new pseudo-classes for styling form fields based on their validity. These styles will be applied only if the condition defined by the pseudo-class is true. The following self-explanatory pseudo-classes are available: 

* :valid
* :invalid
* :in-range
* :out-of-range
* :required
* :optional

Like:

```css
:invalid {
    background-color: #FFD4D4;
    border: 1px solid maroon;
}
```

But this declaration has a problem: Any field that uses validation attributes like required or pattern will be initially invalid because these order form fields are blank. As a result, those fields that apply validation attributes will display a red background and maroon border, which isn’t nice.

Fortunately, you can easily get around this by applying a class to the parent form when the invalid event has fired and adding the pseudo-class selector, `:invalid`, to the CSS rules for the input and selector elements in the form.

```css
form.invalid input:invalid, form.invalid select:invalid,
form.invalid input.invalid, form.invalid select.invalid {
    background-color: #FFD4D4;
    border: 1px solid maroon;
}
```

The order form also uses the :required pseudo-class to style required fields with a light yellow background:

```css
input:required, select:required {
    background-color: lightyellow;
}
```

## Modernizr

- [Modernizr/Modernizr](https://github.com/Modernizr/Modernizr)
- [HTML5 Cross Browser Polyfills · Modernizr/Modernizr Wiki](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)

One of the main drawbacks to using HTML5’s new features is that browser support isn’t uniform. Thus, you need to find ways to allow those with the latest and greatest browsers to make use of HTML5 features while ensuring that those using slightly older versions aren’t left behind.

Enter Modernizr, a purpose-built JavaScript library for performing bulletproof feature detection and dynamic loading. When you include Modernizr in a web page, you can detect support for a feature using a much easier syntax. For example, to check to see if the user’s browser supports the Canvas element, you’d use the following:

```js
if(Modernizr.canvas) {
    //Canvas is supported, fire one up!
} else {
    //Canvas is not supported, use a fallback
}
```

To detect Canvas support without Modernizr, you’d need to use the following:

```js
if(!!document.createElement('canvas').getContext) {
    //Canvas is supported, fire one up!
} else {
    //Canvas is not supported, use a fallback
}
```

It’s also simple to use Modernizr to dynamically load resources (either .js or .css files) based on a feature test. Consider this example, in which Modernizr will determine if the browser supports the localStorage API. If supported, it will load the localstorage.js file, which would likely contain code that interacts with this API. Otherwise, it will load the localstorage-polyfill.js file, which contains a fallback.

```js
Modernizr.load({
    test: Modernizr.localstorage,
    yep: 'localstorage.js',
    nope: 'localstorage-polyfill.js'
});
```

### Using polyfills and Modernizr to plug the gaps

The term polyfill was coined by Remy Sharp and refers to a piece of code (or shim) that aims to implement missing parts of an API specification. The origin of the term is from a product named Polyfilla, which builders use to fill gaps or cracks in walls. Likewise, we developers can use polyfills to fill the gaps or cracks in various web browsers’ support for HTML5.

aul Irish, one of the key contributors to the Modernizr library, edits and maintains a comprehensive list of polyfills, shims, and fallbacks for a wide variety of HTML5 features. This list is available on Modernizr’s GitHub wiki at: [http://mng.bz/cJhc](http://mng.bz/cJhc).

Let’s look at how to use Modernizr to load a month-picker polyfill into those browsers without a built-in month-picker. 

```js
Modernizr.load({
    test:Modernizr.inputtypes.month,
    nope: 'monthpicker.js' 
});
```

You can apply the same technique to most of the HTML5 form’s functionality. In fact, several projects are in the works that aim to polyfill the entire set of forms features in HTML5. These projects include 

* Webshims Lib by Alexander Farkas ([http://afarkas.github.com/webshim/demos/](http://afarkas.github.com/webshim/demos/))
* H5F by Ryan Seddon ([https://github.com/ryanseddon/H5F](https://github.com/ryanseddon/H5F))
* Webforms2 by Weston Ruter ([https://github.com/westonruter/webforms2](https://github.com/westonruter/webforms2))
* html5Widgets by Zoltan “Du Lac” Hawryluk ([https://github.com/zoltan-dulac/html5Forms.js](https://github.com/zoltan-dulac/html5Forms.js))

## File editing and management

The File System API (also known as the File Directories and System API) is a relatively late addition to the HTML5 specification and thus hasn’t yet been implemented by most browser vendors. Although most have provided partial support for the accompanying File API, which you can use to read the contents of local files that the user selects or drops into the application, only Google Chrome currently supports the File System and File Writer APIs that are used to actually create and store files on the client side. The sample application has been written to include vendor prefixes that will probably be used when the other browsers start to include support for these features, but we can’t guarantee that their actual implementation will follow this path.

Also, if you’re using Chrome and plan to test this application in your local directory instead of on a server, you’ll need to start Chrome with the following option: `--Allow-File-Access-From-Files`

If you don’t, your application’s client-side filesystem will be inaccessible and the Geolocation API won’t be able to access your location.

In this section, you’ll build the HTML document for the application and implement basic navigation and state management functionality using JavaScript. 

### CREATE INDEX.HTML

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Super HTML5 Editor</title>
        <link rel="stylesheet" href="style.css">
        <script src="app.js"></script>
    </head>
    <body class="browser-view">
    <header><h1>Super HTML5 Editor</h1></header>
    <section id="list">
    </section>
    <section id="editor">
    </section>
</body>
</html>
```

## Form

- [HTML5 Forms: JavaScript and the Constraint Validation API](http://www.sitepoint.com/html5-forms-javascript-constraint-validation-api)

## File

- [Exploring the FileSystem APIs - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/file/filesystem/)
- [阅读以 JavaScript 编写的本地文件 - HTML5 Rocks](http://www.html5rocks.com/zh/tutorials/file/dndfiles/)

## Argument

- [HTML5 Vs. Native Apps for Mobile - Business Insider](http://www.businessinsider.com/html5-vs-native-apps-for-mobile-2013-6?op=1)

## Tutorial

- [The JavaScript Tutorial](http://javascript.info/)

## Books

- [HTML5 in Action](http://www.salttiger.com/html5-action/)