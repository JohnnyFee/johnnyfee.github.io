layout: post
title: "WordPress Plugins"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

There are over 26,000 plugins available that can be accessed through the official [WordPress plugin repository](http://wordpress.org/extend/plugins/). 

There are a couple of plugins that come standard with any new WordPress install: Hello Dolly and Akismet. 

- The Hello Dolly plugin adds a random lyric from the song “Hello Dolly” by Louis Armstrong to the top of your dashboard on each page load. It’s not useful, but is a good way to see how to structure your own plugins. 
- The Akismet plugin integrates with Akismet.com to auotmatically filter out spam comments from your blog. While Hello Dolly is useless outside of its educational value, Akismet is downright necessary on any site with commenting turned on. You always have the ability to deactivate these plugins or delete them altogether if you do not see any use for them on your site.

## Installing WordPress Plugins

To install a WordPress plugin, simply log in to the WordPress admin dashboard of your site, also know as the backend. Once the plugin is installed, you will then have the option to activate it. If you do not activate the plugin, it will remain deactivated in the “Plugins → Installed Plugins” page of your site. Also, please keep in mind that many plugins will need to be configured once activated, and you will usually see a message appear in the dashboard telling you to do so.

If you downloaded a plugin from a source other than the official Wordpress plugin repository, you should have a ZIP file of the plugin files. To upload the plugin to your site, you will need to click on Upload in the Plugins section of the dashboard and then choose that ZIP file from wherever you have it saved on your computer.

## Building Your Own Plugin

See [SchoolPress](http://schoolpress.me/) and it's source [bwawwp/schoolpress](https://github.com/bwawwp/schoolpress).

To create a plugin, first create a new folder in _wp-content/plugins_ called _my-plugin_ and make a PHP file in that folder called _my-plugin.php_. In _my-plugin.php_, write the following code, and feel free to replace any of the values:

```php
<?php
/*
* Plugin Name: My Plugin
* Plugin URI: http://webdevstudios.com/
* Description: This is my plugin description.
* Author: messenlehner, webdevstudios, strangerstudios
* Version: 1.0.0
* Author URI: http://bwawwp.com
* License: GPLv2 or later
*/
?>
```

Congratulations, you are a WordPress plugin author! Even though your plugin doesn’t do anything yet, you should be able to see it in _/wp-admin/plugins.php_ and activate it. Go ahead and activate it.

Copy and save the following code after the plugin information:

```php
<?php
function my_plugin_wp_footer() {
    echo 'I read Building Web Apps with WordPress
      and now I am a WordPress Genius!';
}
add_action( 'wp_footer', 'my_plugin_wp_footer' );
?>
```

If you go out to the frontend of your website (make sure you refresh), you should notice a new message in the footer.

## File Structure for an App Plugin

Some plugins only do one or two things, and one _.php_ file is all you need to get things done. Your main app plugin is probably going to be much more complicated, with asset files (CSS, images, and templates), included libraries, class files, and potentially thousands of lines of code you will want to organize into more than one file.

Here is our proposed file structure for an app’s main plugin, using the SchoolPress plugin as an example. Not all of these folders and files may be necessary. We add them to a plugin as needed:

* _/plugins/schoolpress/adminpages/_
* _/plugins/schoolpress/classes/_
* _/plugins/schoolpress/css/_
    * _/plugins/schoolpress/css/admin.css_
    * _/plugins/schoolpress/css/frontend.css_
* _/plugins/schoolpress/js/_
* _/plugins/schoolpress/images/_
* _/plugins/schoolpress/includes/_
    * _/plugins/schoolpress/includes/lib/_
    * _/plugins/schoolpress/includes/functions.php_
* _/plugins/schoolpress/pages/_
* _/plugins/schoolpress/services/_
* _/plugins/schoolpress/scheduled/_
* _/plugins/schoolpress/schoolpress.php_

### /adminpages/

Place the _.php_ files for any dashboard page you add through your plugin in the _/adminpages/_ directory. For example, here is how you would add a dashboard page and load it out of your _/adminpages/_ directory:

```php
<?php
// add a SchoolPress menu with reports page
function sp_admin_menu() {
    add_menu_page(
                'SchoolPress',
                'SchoolPress',
                'manage_options',
                'sp_reports',
                'sp_reports_page'
        );
}
add_action( 'admin_menu', 'sp_admin_menu' );

// function to load admin page
function sp_reports_page() {
        require_once dirname( __FILE__ ) . "/adminpages/reports.php";
}
?>
```

### /classes/

Place any PHP class definitions in the _/classes/_ directory. In general, each file in this directory should include just one class definition. The class files should have names like _class.ClassName.php_, where ClassName is the name given to the class.

### /css/

Place any CSS files used specifically for your plugin in the _/css/_ directory. Split your CSS into _admin.css_ and _frontend.css_ files depending on whether the CSS affects the WordPress dashboard or something on the frontend.

Any CSS libraries needed, for example, to support an included JavaScript library, can also be placed in this folder.

Here is some code to enqueue the _admin.css_ and _frontend.css_ styles from the plugin’s CSS folder:

```php
<?php
function sp_load_styles() {
        if ( is_admin() ) {
                wp_enqueue_style(
                        'schoolpress-plugin-admin',
                        plugins_url( 'css/admin.css', __FILE__ ),
                        array(),
                        SCHOOLPRESS_VERSION,
                        'screen'
                );
        } else {
                wp_enqueue_style(
                        'schoolpress-plugin-frontend',
                        plugins_url( 'css/frontend.css', __FILE__ ),
                        array(),
                        SCHOOLPRESS_VERSION,
                        'screen'
                );
        }
}
add_action( 'init', 'sp_load_styles' );
?>
```

Any CSS that affects components of the WordPress dashboard should go into the _admin.css_ file. Any CSS that affects the frontend of the site should go into _frontend.css_, but be careful when adding CSS rules to the _frontend.css_ file. When adding frontend styles to your plugin files, ask yourself first if the CSS rules you are writing should go into the app’s theme instead, since the majority of your frontend-style code should be handed by your theme.

The kind of CSS that would go into the plugin’s CSS file are generally layout styles that would be appropriate no matter what theme was loaded. Imagine that your site had no theme or CSS loaded at all. What would be the bare minimum CSS needed to have the HTML generated by your plugin make sense? Expect the theme to build on and override that.

For example, your plugin’s _frontend.css_ should never include styles for coloring. However, a style saying an avatar is 64 px wide and floated left could be appropriate.

### /js/

Place any JavaScript files needed by your plugin in this folder. Again, you can split things into an _admin.js_ and _frontend.js_ file depending on where the JS is needed.

Any third-party JavaScript libraries used may also be placed in this folder. Generally, they should be added to a subfolder of the _/js/_ directory.

Here is some code to load _admin.js_ and _frontend.js_ files from your plugin’s _/js/_ directory:

```php
<?php
function sp_load_scripts() {
        if ( is_admin() ) {
                wp_enqueue_script(
                        'schoolpress-plugin-admin',
                        plugins_url( 'js/admin.js', __FILE__ ),
                        array( 'jquery' ),
                        SCHOOLPRESS_VERSION
                );
        } else {
                wp_enqueue_script(
                        'schoolpress-plugin-frontend',
                        plugins_url( 'js/frontend.js', __FILE__ ),
                        array( 'jquery' ),
                        SCHOOLPRESS_VERSION
                );
        }
}
add_action( 'init', 'sp_load_scripts' );
?>
```

Just like with stylesheets, it can be difficult to determine if some bit of JavaScript should be included in the plugin’s JavaScript file or the theme’s JavaScript file. In general, JS files that support the theme (e.g., slider effects and menu effects) should go in the theme, and JS files that support the plugin (e.g., AJAX code) should go in the plugin. In practice, however, you will find your plugin using JS defined in your theme and vice versa.

### /images/

Place any images needed by your plugin in the _/images/_ directory.

### /includes/

The _/includes/_ directory is a kind of catchall for any _.php_ files your plugin needs. The only _.php_ file in your plugin’s root folder should be the main plugin file _schoolpress.php_. All other _.php_ files should go in one of the other folders; and if none are more appropriate, you either need to make another folder or place it in the _/includes/_ folder.

It is standard procedure to add a _functions.php_ or _helpers.php_ file to include any helper PHP code used by your plugin. This file should include any small scripts that don’t have a central role in the logic or functionality of your plugin but are needed to support it. Examples include functions to trim text, generate random strings, or other framework-like functions that aren’t already available through a core WordPress function.

### /includes/lib/

Place any third-party libraries that you need for your app into the _/includes/lib/_ directory.

### /pages/

Place any _.php_ code related to frontend pages added by your plugin in the _/pages/_ directory. Frontend pages are typically added through shortcodes that you would embed into a standard WordPress page to show the content you want.

The following code snippet illustrates how to create a shortcode that can be placed on a WordPress page to generate a page from your plugin. The `preheader` here is a chunk of code to run before the `wp_head()` function loads, and thus before any HTML headers or code are sent to the browser. The shortcode function further down outputs HTML to the actual page at the place of the shortcode.

Place this code in _/plugins/{your plugin folder}/pages/stub.php_, then include it (typically using the `require_once()` function) from your main plugin file. Then add the shortcode `[sp_stub]` to a page of your WordPress site.

```php
<?php
// preheader
function sp_stub_preheader() {
        if ( !is_admin() ) {
                global $post, $current_user;
                if ( !empty( $post->post_content ) && strpos
                   ( $post->post_content, "[sp_stub]" ) !== false ) {
                        /*
                                Put your preheader code here.
                        */
                }
        }
}
add_action( 'wp', 'sp_stub_preheader', 1 );

// shortcode [sp_stub]
function sp_stub_shortcode() {
        ob_start();
        ?>
        Place your HTML/etc code here.
        <?php
        $temp_content = ob_get_contents();
        ob_end_clean();
        return $temp_content;
}
add_shortcode( 'sp_stub', 'sp_stub_shortcode' );
?>
```

For the preheader code, we first check that the page is being loaded from outside the admin using `!is_admin()`; otherwise this code might run when editing the post in the dashboard. Then we look for the string `[sp_stub]` in the content of the `$post` global. This function is hooked to the `wp` hook, which runs after WordPress sets up the `$post` global for the current page, but before any headers or HTML is output.

The preheader code can be used to check permissions, process form submissions, or prep any code needed for the page. In an MVC model, this would be your model and/or controller code. Because this code is run before any headers are output, you can still safely redirect users to another page. For example, you can `wp_redirect()` them to the login or signup page if they don’t have access to view the page.

In the shortcode function, we use `ob_start()`, `ob_get_contents()`, and `ob_end_clean()`, which are PHP functions used to buffer output to a variable. Using this code means that the code between the preceding `?>` and `<?php` tags is placed into the `$temp_content` variable instead of output at the time of processing (which would have it echoed out above the `<html>` tag of your site). This isn’t necessary; you could just define a `$temp_content` function and use PHP to add to that string. Using output buffering allows us to code in a more template-like way, mixing HTML and PHP, which is easier to read.

### /services/

Place any _.php_ code for AJAX calls in the _/services/_ directory.

### /scheduled/

Place any _.php_ code that is related to cron jobs or code that is meant to be run at scheduled intervals here.

### /schoolpress.php

This is the main plugin file. For small plugins, this may be the only file needed. For large plugins, the main plugin file will only contain include statements, constant definitions, and some comments about which other files contain the code you might be looking for.

## Use Cases

### The WordPress Loop

The great and powerful WordPress Loop is what makes WordPress display its posts.Depending on what theme template file is being called on when navigating your website, WordPress queries the database and retrieves the posts that need to be returned to the end user and then loops through them.

Most correctly built WordPress themes usually have the following files that contain the WordPress loop:

1.  _index.php_
2.  _archive.php_
3.  _category.php_
4.  _tag.php_
5.  _single.php_
6.  _page.php_

If you open up any of these files, will contain code that may look something like this:

```php
<?php
if ( have_posts() ) {
        while ( have_posts() ) {
                the_post();
                // show each post title, excerpt/content , featured image and more
                the_title( '<h2>', '</h2>' );
                the_content();
        }
} else {
        // show a message like sorry no posts!
}
?>
```

### WordPress Global Variables

Global variables are variables that can be defined and then used anywhere after in the rest of your code. WordPress has a few built-in global variables that can really help you save a lot of time and resources when writing code.

If you wanted to see a full list of every global variable available to you, you can run the following code:

```
<?php
echo '<pre>';
print_r( $GLOBALS );
echo '</pre>';
?>
```

To access a global variable in any custom code you are writing, use code like this:

```
<?php
global $global_variable_name;
?>
```

Some global variables are only made available to you depending on where you are in WordPress. Below is a short list of some of the more popular global variables:

* $post—An object that contains all of the post data from the `wp_posts` table for the current post that you are on within the WordPress loop.
* $authordata—An object with all of the author data of the current post that you are on within the WordPress loop.

### Action Hooks

WordPress developers hook for a living! Hooks are great and they make adding functionality into WordPress plugins and themes simple and easy. Any place an action hook, or technically a `do_action()` function, exists in code running on WordPress, you can insert your own code by calling the `add_action()` function and passing in the action hook name and your custom function with the code you want to run: `do_action( $tag, $arg );`

+ $tag—The name of the action hook being executed.
+ `$arg—One or more additional arguments that will get passed through to the function called from the `add_action()` function referencing this `do_action()` function. Say what? Keep reading…`

```
<?php
add_action( 'init', 'my_user_check' );

function my_user_check() {
        if ( is_user_logged_in() ) {
                // do something because a user is logged in
        }
}
?>
```

So what just happened? In the core of WordPress, there is an action hook, ``do_action(_`init`_)``, and we are calling a function called “my_user_check” from the `add_action()` function. At whatever point in time the code is being executed, when it gets to the `init` action hook, it will then run our custom `my_user_check` function to do whatever we want before continuing on.

Check out ``[WordPress’s reference page](http://bit.ly/plugin-api) for a list of the most used WordPress hooks.

## Filters

Filters are kind of like action hooks in the sense that you can tap into them wherever they exist in WordPress. However, instead of inserting your own code where the hook or `do_action()` exists, you are filtering the returned value of existing functions that are using the `apply_filters()` function in WordPress core, plugins, and/or themes. In other words, by utilizing filters, you can hijack content before it is inserted into the database or before it is displayed to the browser as HTML:`apply_filters( $tag, $value, $var );`

+ $tag—The name of the filter hook.
+ $value—The value that the filter can be applied on.
+ $var—Any additional variables, such as a string or an array, passed into the filter function.

If you search the core WordPress files for `apply_filters` you will find that the `apply_filters()` function is called all over the place, and like action hooks, the `apply_filters()` function can also be added to and called from any theme or plugin. Anywhere in code running on your WordPress site that you see the `apply_filters()` function being called, you can filter the value being returned by that function. For our example, we are going to filter the title of all posts before they are displayed to the browser. We can hook into any existing filters using the `add_filter()` function:

* `add_filter( $tag, $function, $priority, $accepted_args );`

    * $tag—The name of the filter hook you want to filter. This should match the `$tag` parameter of the `apply_filters()` function call you want to filter the results for.
    * $function—The name of the custom function used to actually filter the results.
    * $priority—This number sets the priority in which your `add_filter` will run compared to other places in the code that might be referencing the same filter hook tag. By default, this value is 10.
    * $accepted_args—You can set the number of parameters that your custom function that handles the filtering can except. The default is 1, which is the `$value` parameter of the `apply_filters` function.

OK, so how would real code for this look? Let’s start by adding a filter to alter the title of any post returned to the browser. We know of a filter hook for `the_title` that looks like this:

`apply_filters( 'the_title', $title, $id );`

`$title` is the title of the post and `$id` is the ID of the post:

```
<?php
add_filter( 'the_title', 'my_filtered_title', 10, 2 );

function my_filtered_title( $value, $id ) {
        $value = '[' . $value . ']';
        return $value;
}
?>
```

The preceding code should wrap any post titles in brackets.  If your post title was “hello world,” it would now read “[hello world].” Note that we didn’t use the `$id` in our custom function.  If we wanted to, we could have only applied the brackets to specific post IDs.

`While `add_action()` is meant to be used with `do_action()` hooks and `add_filter()` is meant to be used with `apply_filters()` hooks, ```the functions work the same way and are interchangeable. For readability, it is still a good idea to use the proper function depending on whether you intend to return a filtered result or just perform some code at a specific time.

## Free Plugins

### All in One SEO Pack

This is [a great plugin](http://bit.ly/1-seo-pack) to use if you are concerned about SEO (search engine optimization).  This plugin was created by Semper Fi Web Design and once installed, it automatically optimizes your site for search engines. It also adds custom meta fields to each page and post that then allow you to add in custom titles as well as descriptions and keywords. There are pro or premium versions of the plugin that extend the functionality to allow for customization of search engine settings for each individual post or page as well as the option to set sitewide defaults in WordPress.

### BadgeOS

[This plugin](http://bit.ly/badgeOS) can transform any website into a platform for rewarding members achievements based on their activities. It allows the site admin to create different achievement types and award the members sharable badges once they complete all the requirements to earn that particular achievement or achievements. Badges are Mozilla OBI compatible and sharable via Credly.com.

### Custom Post Type UI

This is [a very powerful plugin](http://bit.ly/custom-ui) for building a web application. Custom Post Type UI allows you to create your own custom post types and taxonomies without touching any lines of code.

### Posts 2 Posts

This is [another very powerful plugin](http://bit.ly/posts2posts) for building a web application. This plugin allows you to create many-to-many relationships between posts, pages, and custom post types as well as many-to-many relationships between posts and users.

For an example, you could use P2P to make connections between custom post types for schools, teachers, and subjects. A school could have multiple teachers, and each teacher could be tied to one or more subjects.

P2P provides intuitive settings, feature-rich widgets, and an easy-to-use meta box attached to any post add/edit page for making new connections.

Most of the time, custom plugin developers should avoid creating additional database tables unless it absolutely makes sense. If we wanted to connect posts to other posts, we could store an array of post IDs in a custom field of another post, but this can become inefficient in a large scale application. P2P creates its own database tables for storing the relationships between posts more efficiently.

_DB schema for wp_p2p table_

Column   | Type        | Collation       | Null | Default | Extra         
-------- | ----------- | --------------- | ---- | ------- | --------------
p2p_id   | bigint(20)  |                 | No   | None    | AUTO_INCREMENT
p2p_from | bigint(20)  |                 | No   | None    |               
p2p_to   | bigint(20)  |                 | No   | None    |               
p2p_type | varchar(44) | utf8_general_ci | No   |         |      

_DB schema for wp_p2pmeta table_         

Column     | Type         | Collation       | Null | Default | Extra         
---------- | ------------ | --------------- | ---- | ------- | --------------
meta_id    | bigint(20)   |                 | No   | None    | AUTO_INCREMENT
p2p_id     | bigint(20)   |                 | No   | 0       |               
meta_key   | varchar(255) | utf8_general_ci | Yes  | NULL    |               
meta_value | longtext     | utf8_general_ci | Yes  | NULL    |               

For more information on this plugin, make sure to check out the [wiki on GitHub](http://bit.ly/p2p-wiki).

### Members

[Members](http://bit.ly/members-wp) extends the control that you have over user roles and capabilities in your site. It enables you to edit as well as create and delete user roles and capabilities.  This plugin also allows you to set permissions for different user roles to determine which roles have the ability to add, edit, and/or delete various pieces of content. This is another must-have plugin for building an extensible web application because you can completely customize each user’s experience by defining and managing the roles and capabilities he will have access to.

### W3 Total Cache

Caching your content is a great idea for optimizing the performance of your website. You can save a lot of processing time by displaying cached pages to the end user instead of querying the database every time someone requests data. W3 Total Cache has a lot of built-in features for managing what content gets cached and when the cache should be cleared.

## Premium Plugins

### Gravity Forms

[This plugin](http://www.gravityforms.com/) is an absolute must because it enables you to easily create custom contact forms for your site.  It is extremely easy to create a form using the visual form editor, which allows you to drag and drop the fields you need into the form and reposition them as needed.  Standard fields are included as well as the option to create your own custom fields.  The forms are very flexible and can be set up as multiple page forms with progress bars.  Conditional fields allow you to show or hide fields based on the user’s selections in previous fields. Another great feature of this plugin is the ability for the forms, once completed, to be forwarded anywhere as chosen by the site admin in the form settings.  All in all, this plugin is extremely useful and flexible for anyone needing to create a form on their site and easy to use for someone without coding knowledge.

### Backup Buddy

The [Backup Buddy plugin](http://bit.ly/backup-b) provides you with the opportunity to back up your entire WordPress install for safekeeping, restoring, or moving your site.  Backups can be scheduled on a recurring basis, and the file can then be downloaded to your computer, emailed to you, or sent off to the storage location of your choice, such as Dropbox or an FTP server.  This plugin also features a restore option that will easily restore your themes, widgets, and plugins.  The plugin also allows you to easily move your site to a new server or domain right from the WordPress dashboard, which comes in handy if you work on a dev server and then move the sites over to a production environment upon launch.

### WP All Import

[This plugin](http://www.wpallimport.com/) comes in handy if you are looking to import data into WordPress from another source that is in either an XML or CSV file, which are two formats not routinely accepted by WordPress.  There is also a pro or premium version of the plugin available for purchase that extends the functionality to allow you to import data into custom post types as well as custom fields.  The pro version also allows you to import images from a URL and have them saved in the media library.  Another helpful feature is the ability to set up recurring imports that will periodically check a file for changes or updates and then modify the corresponding post as needed.


## Community Plugins

You can build a full-blown social network with WordPress and a few free plugins. Social networks are great to bring a niche community together. If you have an active social network, you will have lots of organic content being indexed by search engines. If you think you get a lot of comments and interaction on your existing WordPress website, try turning it into a social network to really get the conversions flowing.

### BuddyPress

[BuddyPress](http://buddypress.org) is social networking in a box. You can start up a social network with most of the same features as Facebook in a matter of minutes.

Since version 1.7, BuddyPress has been theme agnostic, meaning you can turn it on and it will work with any theme—well, most themes—if coded properly. Prior to version 1.7 , you needed to use a BuddyPress theme in order to properly use the plugin. This was good for people wanting to build a social network from scratch because they could use the default theme that comes with BuddyPress, purchase a nice premium BuddyPress child theme, or plan to build their own BuddyPress child theme. It was kind of limiting to people that already had a WordPress website because they couldn’t just turn on BuddyPress and have it work with their existing theme. In most cases, people with existing websites that wanted to turn on BuddyPress needed to do some customization, which is OK for someone who knows CSS, PHP, and how WordPress works. But noncoders would have to hire someone to turn their existing theme (which they may have already paid for) into a BuddyPress child or compatible theme. With newer version of BuddyPress, it just works!