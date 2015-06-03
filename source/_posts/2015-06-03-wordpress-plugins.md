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
