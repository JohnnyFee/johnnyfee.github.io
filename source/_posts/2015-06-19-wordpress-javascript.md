layout: post
title: "WordPress JavaScript"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

## jQuery and WordPress

WordPress comes installed with the latest version of jQuery, which is used in the admin dashboard for various UI and AJAX-related scripting. Because jQuery is already on your server, including it in the frontend of your WordPress app is a breeze.

The jQuery JS file is located at _/wp-includes/lib/js/jquery.js_. Typically you would add a link like this to the `<head>` tag of your website to load jQuery:

    <script lang="JavaScript" src="/wp-includes/lib/js/jquery.js" />

This will work if added to your theme’s _header.php_ or through the `wp_head` hook; however, the proper way to include a JavaScript file in your WordPress site is to use the `wp_enqueue_script()` function. You can add the line `wp_enqueue_script('jquery');` to an init function called by the inside of your main plugin file, like so:

```
function sp_enqueue_scripts()
{
    wp_enqueue_script('jquery');
}
add_action('init', 'sp_enqueue_scripts');
```

The first parameter of the `wp_enqueue_script()` function is a label for the JavaScript file to enqueue. WordPress already knows what `jquery` is and where it’s located, so that is the only parameter you need to enqueue it.

### Enqueuing Other JavaScript Libraries

To enqueue other JavaScript libraries that WordPress doesn’t already know about, pass the full list of parameters. Your main app plugin may include code like this to load jQuery and any number of required JavaScript libraries. Also, instead of building your function on the `init` hook, you should use the `wp_enqueue_scripts` and `admin_enqueue_scripts` hooks. The `wp_enqueue_scripts` hook fires on the frontend just before enqueuing scripts, while the `admin_enqueue_scripts` hook fires in the dashboard just before enqueuing scripts:

```
<?php
//frontend JS
function sp_wp_enqueue_scripts() {
    wp_enqueue_script( 'jquery' );
        wp_enqueue_script(
                'schoolpress-plugin-frontend',
                plugins_url( 'js/frontend.js', __FILE__ ),
                array( 'jquery' ),
                '1.0'
        );
}
add_action( "wp_enqueue_scripts", "sp_wp_enqueue_scripts" );

//admin JS
function sp_admin_enqueue_scripts() {
        wp_enqueue_script(
                'schoolpress-plugin-admin',
                plugins_url( 'js/admin.js', __FILE__ ),
                array( 'jquery' ),
                '1.0'
        );
}
add_action( 'admin_enqueue_scripts', 'sp_admin_enqueue_scripts' );
?>
```

Using `wp_enqueue_scripts` and `admin_enqueue_scripts` lets you load different JS files on the frontend and backend of your site. You could add other checks in here to make sure that jQuery is only loaded on certain pages, which could improve load times on those pages that don’t need jQuery loaded. Common methods include checking attributes of the global `$post` or checking `$_REQUEST` values used in the admin like `$_REQUEST['page']` or `$_REQUEST['post_type']`.

Remember, the first parameter of the `wp_enqueue_script()` function is a reference label. The second parameter of the _wp_enqueue_script()_ function tells WordPress where the script is located. The `plugins_url()` function is used to figure out the URL relative to the current file `__FILE__`. This works when this code is included in the main plugin file. You would pass `dirname(__FILE__)` as the parameter to this call if the file you are editing is in a subdirectory of the plugin.

The third parameter of the `wp_enqueue_script()` function allows you to state dependencies for your script. By passing `array('jquery')` for our _frontend.js_ and _admin.js_ scripts, we make sure that jQuery is loaded first.

### Where to Put Your Custom JavaScript

Once again we will run into situations where we need to decide where to put a certain bit of code. Should it go into the theme code or the plugin code? Here are the general rules we use when deciding where a particular bit of JavaScript code will go:

1.  If the code will be only used once and is generally specific to the page it is used on, it is coded directly into that page within a `<script>` tag.
2.  If the JavaScript is used more than once (a function or module) and is related to theme functionality or UI, it is placed in a JS file within the theme (e.g., _/themes/schoolpress/js/schoolpress.js_).
3.  If the JavaScript is used more than once on admin screens of your app, it is placed in an _admin.js_ file inside of your plugin (e.g., _/plugins/schoolpress/js/admin.js_).
4.  If the JavaScript is used more than once on the frontend of your app, but not part of the theme UI, it is placed in a _frontend.js_ file inside of your plugin (e.g., _/plugins/schoolpress/js/frontend.js_).
5.  If splitting some JS code into its own file, to be loaded on specific pages, will result in a needed increase in performance, than that code will be placed in a separate JS file.<sup>[</sup>24]

These rules are specific to how we like to develop and are only a suggestion. Some developers will cringe particularly hard at the thought of adding JavaScript code inside of script tags instead of placing all JavaScript inside of _.js_ files. If you like coding this way or perhaps have a dedicated JavaScript programmer on your team, by all means put all of your JavaScript code inside of _.js_ files.

The important thing is that _you_ understand how your JavaScript files and code are organized so that working on your site is intuitive.

## AJAX Calls with WordPress and jQuery

AJAX calls in WordPress will require two components: the JavaScript code on the frontend to kick off the AJAX request and the PHP code in the backend to process the request and return HTML or JSON-encoded data.

Say you want to adjust your signup page to automatically check if the username entered has been used already. You could warn the person signing up before he hits the submit button and allow him to change the username he picked, saving a bit of grief.

The first thing we need to do is add a quick JavaScript to the head of our pages to define our `ajaxurl`. This is the URL that all AJAX queries will run through. It looks like this:

```
<script type="text/JavaScript">
var ajaxurl = '/wp-admin/admin-ajax.php';
</script>
```

In the WordPress dashboard, this script will be embedded by default. But for frontend AJAX, we’ll need to embed it ourselves. Here’s the code to define the `ajaxurl` variable for frontend AJAX:

```
function my_wp_head_ajax_url()
{
?>
<script type=”text/JavaScript”>
var ajaxurl = '<?php echo admin_url("admin-ajax.php");?>';
</script>
<?php
}
add_action('wp_head', 'my_wp_head_ajax_url');
```

Now the variable `ajaxurl` is available to the rest of the JavaScript on our frontend pages and can be used in our AJAX calls. Here is the JavaScript code to add to the bottom of the registration page to perform the username check:

```
<?php
//our JS for the page
function my_wp_footer_registration_JavaScript()
{
    //make sure we're on the registration page
    if(empty($_REQUEST['action']) || $_REQUEST['action'] != ‘register’)
        return;
?>
<script>
    //wait til DOM is loaded
    jQuery(document).ready(function() {
        //var to keep track of our timeout
        var timer_checkUsername;

        //detect when the user_login field is changed
        jQuery('#user_login').bind.('keyup change', function() {
            //use a timer so check is triggered 1 second after they stop typing
            timer_checkUsername = setTimeout(function(){checkUsername();}, 1000);
        });
        });

    function checkUsername()
    {
        //make sure we have a username
        var username = jQuery('#user_login').val();
        if(!username)
            return;

        //check the username
        jQuery.ajax({
        url: ajaxurl,type:'GET',timeout:5000,
                dataType: 'html',
                data: "action=check_username&username="+username,
                error: function(xml){
                        //timeout, but no need to scare the user
                },
                success: function(response){
                //hide any flag we may have already shown
                jQuery('#username_check').remove();

                //show if the username is good (1) or taken (0)
                if(response == 1)
                    jQuery('#user_login').after(
                        '<span id="username_check" class="okay">Okay</span>'
                    );
                else
                    jQuery('#user_login').after(
                        '<span id="username_check" class="taken">Taken</span>'
                    );
                }
        });
    }
</script>
<?php
}
add_action('wp_footer', 'my_wp_footer_registration_JavaScript');
?>
```

The preceding code is hooked into `wp_footer` so the JavaScript will be added to the end of the HTML output. We first check that `$_REQUEST['action'] == "register"` to make sure we’re on the default WP registration page.

If you’re using a plugin like Paid Memberships Pro that has its own registration page, you’ll want to use a check like `if(!is_page("membership-checkout"))` to check which page you are on. You’ll also need to make sure that the `#user_login` check in your JavaScript code is updated to use the ID used for the username field on the registration page.

In the code, we use `jQuery(document).ready()` to detect that the DOM is loaded and then use `jQuery('#user_login').bind('keyup change', ...)` to detect when a user has either typed inside the field or otherwise changed it. When this happens, we use `setTimeout()` to queue up a username check in one second. If the user types again before the timer runs, it is reset to wait one second again. The effect is that one second after the user stops typing or changing the field, the `checkUsername()` function is kicked off.

In the `checkUsername()` function, we have the `jQuery.ajax()` call. Before we do that though, we check the value from the username field to see if it’s empty or not.

In the `jQuery.ajax()` call, we set the URL to `ajaxurl`, which should have been set via `wp_head` earlier.

We set the type of call to GET. You can also use the POST method. The DELETE and PUT methods are also available, but may not be supported by all browsers. Use the same logic you would when deciding which type to use on a `<form>` you are submitting to decide which method to use in an AJAX call. If you are “getting” data like we are in this example, GET makes sense. If you are submitting data to be saved, you can use the POST method.

We set a timeout of 5,000 (or 5 seconds) here. After this time, the request will be cancelled and the defined error action will be kicked off. You should set the timeout value based on the reasonable amount of time it might take your server to process this particular request. If you set it too low, you will prematurely cancel requests. If you set it too high, people will be waiting really long for requests that may have hung up on the server side.

We set the datatype to `html` here. This tells jQuery to take the output and place it into a string. A datatype of `json` will evaluate the output and place it into a JavaScript object variable. There are a few other datatypes including `xml`, `jsonp`, `script`, and `text`. The jQuery documentation addresses when you would use these and how jQuery processes each datatype.

We set the data to `"action=check_username&username="+username`, which will pass our defined action and the username as parameters to the _wp-admin-ajax.php_ script and our service-side code.

Then we set a handler in case of errors and in case of success. In case of error, you could alert the user, but since this isn’t a critical function, we just go about our business. In case of success, we remove the old `#username_check` element and append an “OK” or “Taken” message after the username field.

Now let’s see the backend code. Here is the code you would put into _functions.php_, your custom plugin, or a _.php_ in your plugin’s _/services/_ directory to listen for the AJAX request and send back a `1` or `0` if a username if available or not:

```
<?php
//detect AJAX request for check_username
function wp_ajax_check_username() {
    global $wpdb;
        $username = $_REQUEST['username'];

        $taken = $wpdb->get_var( "
                SELECT user_login
                FROM $wpdb->users
                WHERE user_login = '" . $wpdb->escape( $username ) . "' LIMIT 1"
                );

        if ( $taken )
                echo "0";   //taken
        else
                echo "1";   //available
}
add_action( 'wp_ajax_check_username', 'wp_ajax_check_username' );
add_action( 'wp_ajax_nopriv_check_username', 'wp_ajax_check_username' );
?>
```

* `wp_ajax_{action}`—Runs for logged-in users
* `wp_ajax_nopriv_{action}`—Runs for nonusers

On the registration page, users are by definition not logged in, so we need to use the `wp_ajax_nopriv_` hook. But we may also want to use this check on the add new user screen in the admin, so we’ll hook into `wp_ajax_` as well to handle that case.

If you have an AJAX service that will only be used by users, just use the `wp_ajax_ hook`. If you need your service available for users and nonusers, you’ll need to use both hooks.

Also, notice how the `action` parameter we’re looking for (“check_username”) is added to the hook in the action definition. This hook will only fire if `$_REQUEST['action'] == "check_username"`.

## Managing Multiple AJAX Requests

When working with AJAX requests, it’s important to keep track of them. If not, you can put undue stress on your server and the client’s browser, leading to a lockup of their session or the entire site.

For example, in the preceding code, we wait one second after the username field is updated before kicking off the AJAX request to check if the username is available. But once the request goes out, the user might keep on typing, kicking off another AJAX request. If your server isn’t able to get back within one second, those requests might start to build up on each other.

Now, our username checker might not have too much potential to get out of hand, but it’s possible in a lot of situations. A simple example would be one where an AJAX request is kicked off when a user clicks a button. If the user clicks the button 20 times, that could be 20 hits on your server. So keep track of them.

Generally, you want to do one of two things when managing your AJAX requests:

1.  Keep a user from submitting a request if another request of the same type is still processing.
2.  Cancel any existing request of the same type if a new request is submitted.

Which option you use depends on what the AJAX request is doing. Generally if you are “getting” data, you’ll want to cancel earlier requests and submit the fresher one. If you are “posting” data, you’ll want to ignore the new request until the old one is completed.

Depending on your app and the request at hand, there will be many ways to disable or cancel requests. Since the “complete” callback in jQuery’s `ajax` method is called whether the request is successful or errors out, you can use it to re-enable a button or other element that’s being used to kick off a specific AJAX request:

```
//Option #1: Disabling a button while an AJAX request is processing
jQuery('#button').click(function() {
    //disable the button
    jQuery(this).attr('disabled', 'disabled');

    //do the ajax request
    jQuery.ajax({
        url: ajaxurl,type:'GET',timeout:5000,
        dataType: 'html',
        error: function(xml){
                //error stuff
        },
        success: function(response){
            //success stuff
        }
        complete: function() {
            //enable the button again
            jQuery('#button').removeAttr('disabled');
        }
    });
});
```

Similarly, here is some code that will cancel an old request when a new one comes in:

```
//Option #2: Cancel an older request when a new one comes in
var ajax_request;
jQuery('#button').click(function() {
    //cancel any existing requests
    if(typeof ajax_request !== 'undefined')
        ajax_request.abort();

    //do the ajax request
    ajax_request = jQuery.ajax({
        url: ajaxurl,type:'GET',timeout:5000,
        dataType: 'html',
        error: function(xml){
                //error stuff
        },
        success: function(response){
            //success stuff
        }
    });
});
```

## Heartbeat API

Earlier in this chapter, we built an AJAX call that was triggered by a form field being updated. Sometimes you will want certain updates to happen on their own periodically as your web app is running. For example, you may want to check for new comments on a discussion forum and automatically pull in fresh comments as they are posted. With JavaScript, this is typically done by polling the backend every few seconds using an AJAX call kicked off by the `setInterval` function. Alternatively, you can use the WordPress Heartbeat API.

The Heartbeat API is new to WordPress 3.6 and can be used to facilitate quasi-realtime updates in your app. Every 15 seconds (or less if you change the settings), your app will send a heartbeat request from the client to the server and back. During this round trip, you can do things like autosave app states or load fresh content. In WordPress 3.6, the Heartbeat API is being used for autosaving posts, locking posts, and giving login expiration warnings. In this section, we’ll cover how you can use the Heartbeat API for your app.

Like anything else, the Heartbeat API can seem complicated, but at its heart, it’s simply a bunch of data passed back and forth from the client to the server through periodic AJAX calls. Using hooks, you can tap into the data being sent or received to get the information you need to and from the server.

Here is a minimal example demonstrating the Heartbeat API. The only thing this code does is send a message `marco` to the server. If the server sees that message, it sends `polo` back to the client. Both messages are logged to the JavaScript console, so every 15 seconds, you should see the following in your console:

```
Client: marco
Server: polo
```

Using the Heartbeat API can be broken down into three sections: initialization, client-side JavaScript, and server-side PHP:

### Initialization

```
//enqueue heartbeat.js and our JavaScript
function hbdemo_init()
{
    /*
        //Add your conditionals here so this runs on the pages you want, e.g.
                if(is_admin())
                        return;                 //don't run this in the admin
        */

    //enqueue the Heartbeat API
    wp_enqueue_script('heartbeat');

    //load our JavaScript in the footer
    add_action("wp_footer", "hbdemo_wp_footer");
}
add_action('init', 'hbdemo_init');
```

This first function enqueues the _heartbeat.js_ file and sets up an action to put our JavaScript code in the the footer via the `wp_footer` hook. If you only wanted this heartbeat code to run on certain pages (very likely), you would put your checks here.

### Client-side JavaScript

```
<?php
//our JavaScript to send/process from the client side
function hbdemo_wp_footer()
{
?>
<script>
  jQuery(document).ready(function() {
        //hook into heartbeat-send: client will send the message
        //'marco' in the 'client' var inside the data array
        jQuery(document).on('heartbeat-send', function(e, data) {
                console.log('Client: marco');

                //need some data to kick off AJAX call
                data['client'] = 'marco';
        });

        //hook into heartbeat-tick: client looks for a 'server'
        //var in the data array and logs it to console
        jQuery(document).on('heartbeat-tick', function(e, data) {
                if(data['server'])
                        console.log('Server: ' + data['server']);
        });

        //hook into heartbeat-error to log errors
        jQuery(document).on('heartbeat-error',
                function(e, jqXHR, textStatus, error) {
                        console.log('BEGIN ERROR');
                        console.log(textStatus);
                        console.log(error);
                        console.log('END ERROR');
                });
  });
</script>
<?php
}
?>
```

This second function dumps our JavaScript into the footer. In the JavaScript code, we use `jQuery(document).ready()` to run our code after the DOM has loaded. Then we hook into three JavaScript events triggered by the Heartbeat API:

1.  The `heartbeat-send` event is fired right before the heartbeat sends data back to the server. To send your data, add a value to the “data” array passed through the event.
2.  The `heartbeat-tick` event is fired when the server replies. To see what data the server has sent, look for it in the “data” array that is passed through the event.
3.  The `heartbeat-error` event is fired if there is an error in the `jQuery.ajax()` call used to send the data to the server. You can include code here for debugging or degrade nicely if AJAX doesn’t seem to be working in your production environment.

### Server-side PHP

```
//processing the message on the server
function hbdemo_heartbeat_received($response, $data)
{
    if($data['client'] == 'marco')
                $response['server'] = 'polo';

        return $response;
}
add_filter('heartbeat_received', 'hbdemo_heartbeat_received', 10, 2);
```

This third PHP function in the previous example runs on the `heartbeat_received` hook and processes the data from the client. We can add data to go back to the client by updating the `response` variable.

Now let’s try a more realistic example. SchoolPress has a section of the assignments page showing how many assignments have been submitted and how many are left. Let’s use the Heartbeat API to update this number if new assignments have been posted.

In our template, the assignment count will be displayed something like this:

```
?>
<div>
    Submitted:
    <span id="assignment_count">
        <?php echo count($assignment->submissions);?>
    </span>
    /
    <?php echo count($course->students);?>
</div>
<?php
```

## WordPress Limitations with Asynchronous Processing

Most WordPress applications execute PHP scripts through an Apache or Nginx server. When optimized, you can serve a lot of small, simultaneous connections on these setups, which is perfect for asynchronous JavaScript applications. However, the servers themselves, and perhaps more importantly, the general overhead of loading WordPress on server-side calls, means that a WordPress service running on Apache or Nginx will never be as fast as a smaller JavaScript service running on something like _node.js_, which was built specifically to handle asynchronous JavaScript calls.

That said, you can still get a lot done with WordPress and the architecture behind it. Our suggestion is always to build it the obvious way first and selectively pull out parts of your application for scaling later when performance becomes an issue.

Does your app have a user base consisting solely of the 30 people inside your company? Then you are probably going to be fine using WordPress for your realtime JavaScript coding.

Do you plan to have thousands of users, with dozens of simultaneous connections? You’ll need some beefy hardware, but you’ll also probably be fine keeping everything in WordPress.

Do you plan to have millions of users, with tens of thousands of simultaneous connections? If so, you need some top-notch engineers, so hopefully you have the money for them. In any case, you’ll either be pushing WordPress to its limits or using other platforms to serve your realtime interactions.

## Backbone.js

When people say that you can’t build apps with WordPress, we point out that WordPress itself is an application built on the WordPress framework. That WordPress application is currently about 86% PHP and 14% JavaScript. Some people in the WordPress community expect that ratio to get closer to 50/50 over the next few years.

Why the big move to JavaScript? On the frontend side of things, rendering a website with JavaScript can be much lighter than rendering it with PHP. As you navigate around the typical website, loading all of the HTML DOM is pretty wasteful. The header, footer, menu, and other pieces of the site may not change at all. With JavaScript, you can simply load the new part of the website, change the class on the items in your menu, and voila: new page. This is a much more app-like experience and perfect for using web apps over mobile networks where bandwidth is more scarce.

Using AJAX to update pages instead of loading new pages is sometimes referred to as building a single page application, or SPA.

One thing limiting a move to JavaScript is that all of our handy functions and data structures are native to PHP. As more development is done on the JavaScript side of the WordPress platform, there is a greater need for some kind of framework to help organize the JavaScript development.

Backbone.js is a framework for JavaScript consisting of models, views, and collections of models. This setup is very similar to the MVC frameworks used for server-side PHP development. In traditional MVC frameworks, the C stands for “controller.” With Backbone.js, the controlling of an app is handled within the views and honestly outside of the JavaScript framework itself.

Backbone.js has already been used extensively in the Media Library and Theme Customizer updated and added in recent versions of WordPress. The JavaScript developers working on the WordPress core will likely transition more of the platform code to use Backbone.js as they build out new features and rework old ones. For this reason, it is becoming more common to see developers building their themes and apps using Backbone.js as well.

The best practices for Backbone.js development, let alone Backbone+WordPress development, are still being worked out. In general, if you are simply adding some dynamic AJAX-based UI to an existing PHP-based page, the more traditional AJAX technique laid out here will be faster and easier to implement and maintain. However, if a fairly large portion of your app will live inside of JavaScript, a Backbone.js implementation will help you organize things and will make things easier for you. Backbone.js is not the kind of tool to use piecemeal. It works best when you go all in with it.

If you are using Backbone.js to render the frontend of your app, the main intersection point with WordPress will be when your collections and models are saved to the database through the backend.

Imagine an interface on the SchoolPress site for adding student groups to an assignment. There may be an input box for naming the group and a button labeled Add Group to add the group. Using the traditional AJAX technique outlined in this chapter, the turn of events would look like this:

1.  User enters a new group name.
2.  User clicks the Add Group button.
3.  The group name is sent to the server via AJAX.
4.  The server (WordPress) processes the name, adds the new group, and returns some data.
5.  The client uses JavaScript to parse the response and update the list of groups on the frontend.

With a Backbone.js app, you mirror the list of groups more thoroughly in the model and collection you would set up in JavaScript. You could use a similar workflow as the typical AJAX app, but a more appropriate workflow for a Backbone.js app would be:

1.  User enters a new group name.
2.  User clicks the Add Group button.
3.  The group name is used to create a new instance of the group model and added to the group collection in Backbone.js.
4.  The collection will be coded to update the server (WordPress) through AJAX whenever the collection changes.
5.  A representation of the current collection of groups is sent to the server.
6.  WordPress updates the internal representation of the collection in the database to match what was sent.

So instead of first updating things in the backend and the backend telling the frontend what to look like, with Backbone.js things are first updated on the frontend, and the frontend tells the backend how to save the data.

An example of some SchoolPress functionality coded both with the traditional AJAX technique and then using Backbone.js can be found at _http://bwawwp.com/backbonejs-example/_.

Here are some resources to learn more about Backbone.js and how to use it with WordPress:

* [Official Backbone.js site](http://backbonejs.org/)
* [“Backbone.js and WordPress Resources”](http://bit.ly/bb-wp-knight) by Peter R. Knight




