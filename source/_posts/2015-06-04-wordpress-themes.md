layout: post
title: "WordPress Themes"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

## Themes Versus Plugins

At some level, all source files in your themes and plugins are just .php files loaded at different times by WordPress. In theory, your entire app code could reside in one theme or one plugin. In practice, you’ll want to reserve your theme for code related to the frontend (views) of your website and use plugins for your app’s backend (models and controllers).

Where you decide to put some code will depend on whether you are primarily building a full app or an individual plugin or theme.

<!-- more -->

## The Template Hierarchy

When a user visits your site and navigates to a page, WordPress uses a system called the _Template Hierarchy_ to figure out which file in the active theme should be used to render the page. For example, if the user browses to a single post page, WordPress will look for _single-post.php_. If that’s not found, it will look for _single.php_. If that’s not found it will look for _index.php_.

The _index.php_ file is the fallback for all page loads and along with _style.css_ is the only required file for your theme. More typically, you will have a list of files like:

1.  _404.php_
2.  _author.php_
3.  _archive.php_
4.  _attachment.php_
5.  _category.php_
6.  _comments.php_
7.  _date.php_
8.  _footer.php_
9.  _front-page.php_
10.  _functions.php_
11.  _header.php_
12.  _home.php_
13.  _image.php_
14.  _index.php_
15.  _page.php_
16.  _search.php_
17.  _sidebar.php_
18.  _single.php_
19.  _single-(post-type).php_
20.  _style.css_
21.  _tag.php_
22.  _taxonomy.php_

Some files in this list are loaded when you call a specific `get` function. For example, `get_header()` loads _header.php_, `get_footer()` loads _footer.php_, and `get_sidebar()` loads _sidebar.php_. Passing a `name` parameter to these functions will add it to the filename loaded; so, for example, `get_header('alternate');` will load _header-alternate.php_ from the theme folder.

The function `comments_template()` will load _comments.php_ unless you pass a different filename as the first parameter.

The function `get_search_form()` will look for the file _searchform.php_ in your theme folder or output the default WordPress search form if no file is found.

WordPress has good documentation for the [Template Hierarchy](http://bit.ly/temp-hier), which lays out all the various files WordPress will look for in a theme folder when they are loaded. You can also take a look at the [Twenty Twelve Theme](http://bit.ly/2012-theme) or some other well-coded theme to see what filenames are going to be detected by WordPress. Read the comments in those themes to see when each page is loaded.

When developing apps with custom post types, it’s common to want to use a different template when viewing your post types on the frontend. You can override the single post and archive view for your post types by adding files with the names _single-(post_type).php_ and _archive-(post_type).php_, where _(post_type)_ is set to the value used when the post type was registered.

## Page Templates

One of the easiest ways to get arbitrary PHP code running on a WordPress website is to build a page template into your theme and then use that template on one of your pages.

Some common templates found in WordPress themes include contact forms and landing page forms.

### Sample Page Template

Below is a pared-down version of a contact form template:

```php
<?php
/*
Template Name: Page - Contact Form
*/

//get values possibly submitted by form
$email = sanitize_email( $_POST['email'] );
$cname = sanitize_text_field( $_POST['cname'] );
$phone = sanitize_text_field( $_POST['phone'] );
$message = sanitize_text_field( $_POST['message'] );
$sendemail = !empty( $_POST['sendemail'] );

// form submitted?
if ( !empty( $sendemail )
    && !empty( $cname )
        && !empty( $email )
        && empty( $lname ) ) {

        $mailto = get_bloginfo( 'admin_email' );
        $mailsubj = "Contact Form Submission from " . get_bloginfo( 'name' );
        $mailhead = "From: " . $cname . " <" . $email . ">\n";
        $mailbody = "Name: " . $cname . "\n\n";
        $mailbody .= "Email: $email\n\n";
        $mailbody .= "Phone: $phone\n\n";
        $mailbody .= "Message:\n" . $message;

        // send email to us
        wp_mail( $mailto, $mailsubj, $mailbody, $mailhead );

        // set message for this page and clear vars
        $msg = "Your message has been sent.";

        $email = "";
        $cname = "";
        $phone = "";
        $message = "";
}
elseif ( !empty( $sendemail ) && !is_email( $email ) )
        $msg = "Please enter a valid email address.";
elseif ( !empty( $lname ) )
        $msg = "Are you a spammer?";
elseif ( !empty( $sendemail ) && empty( $cname ) )
        $msg = "Please enter your name.";
elseif ( !empty( $sendemail ) && !empty( $cname ) && empty( $email ) )
        $msg = "Please enter your email address.";

// get the header
get_header();
?>
<div id="wrapper">
 <div id="content">
 <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
  <h1><?php the_title(); ?></h1>
  <?php if ( !empty( $msg ) ) { ?>
   <div class="message"><?php echo $msg?></div>
  <?php } ?>
  <form class="general" action="<?php the_permalink(); ?>" method="post">
   <div class="form-row">
        <label for="cname">Name</label>
        <input type="text" name="cname" value="<?php echo esc_attr($cname);?>"/>
        <small class="red">* Required</small>
   </div>
   <div class="hidden">
        <label for="lname">Last Name</label>
        <input type="text" name="lname" value="<?php echo esc_attr($lname);?>"/>
        <small class="red">LEAVE THIS FIELD BLANK</small>
   </div>
   <div class="form-row">
        <label for="email">Email</label>
        <input type="text" name="email" value="<?php echo esc_attr($email);?>"/>
        <small class="red">* Required</small>
   </div>
   <div class="form-row">
        <label for="phone">Phone</label>
        <input type="text" name="phone" value="<?php echo esc_attr($phone);?>"/>
   </div>
   <div class="form-row">
        <label for="message">Question or Comment</label>
        <textarea class="textarea" id="message" name="message" rows="4" cols="55">
                <?php echo esc_textarea( $message )?>
        </textarea>
   </div>

   <div class="form-row">
        <label for="sendemail">&nbsp;</label>
        <input type="submit" id="sendemail" name="sendemail" value="Submit"/>
   </div>
  </form>
 <?php endwhile; endif; ?>
 </div>
</div>
<?php
// get the footer
get_footer();
?>
```

WordPress will scan all _.php_ files in your active theme’s folder and subfolders (and the parent theme’s folder and subfolders) for templates. Any file with a comment including the phrase `Template Name:` in it will be made available as a template.

The template is loaded after the WordPress `init` and `wp` actions have already fired. The theme header and the `wp_head` action will not load until you call `get_header()` in your template. So you can use the top of your template file to process form input and potentially redirect before any headers are sent to the page.

Your template file will need to include the same HTML markup as your theme’s _page.php_ or single post template. In the preceding example, I include a wrapper div and content div around the content of the contact form.

The preceding code has a few other notable features. It uses the `sanitize_text_field()` and `sanitize_email()` functions to clean up values submitted by the form. Similarly, it uses the `esc_attr()` and `esc_textarea()` functions to prevent cross-site scripting attacks. 

The preceding contact form also incorporates a “honey pot.” A field called “lname” would be hidden using CSS. So normal users would not see this field and thus leave it blank when submitting the form. Bots looking to take advantage of your contact form to send you spam will see the lname field and will put some value into it. The code processing the form checks to make sure that the lname field is blank before sending out the email. Like a honey pot drawing bees to it, the hidden lname field draws spammers into it so you don’t end up sending email on their behalf.

### Using Hooks to Copy Templates

If you’d rather not change multiple template files when you update the ID or class names of your wrapper divs, you can create a template that uses the `the_content` filter or another action specific to your theme to place content into the main content area of your page. Then you can load another template file, like the core _page.php_ template, which will include calls to load your site’s frame and default layout. Below eample shows how to create a page template that loads the _page.php_ template and adds additional content below it on certain pages.

```
<?php
/*
    Template Name: Hooking Template Example
*/

//what's the main post_id for this page?
global $post, $main_post_id;
$main_post_id = $post->ID;

//use the default page template
require_once(dirname(__FILE__) . "/page.php");

//now add content using a function called during the the_content hook
function template_content($content)
{
    global $post, $main_post_id;

    //we don't want to filter posts that aren't the main post
    if($post->ID != $main_post_id)
        return $content;

    //capture output
    ob_start();
    ?>
    <p>This content will show up under the page content.</p>
    <?php
    $temp_content = ob_get_contents();
    ob_end_clean();

    //append and return template content
    return $content . $temp_content;
}
add_action("the_content", "template_content");
```

In the previous example, we do a little trick to store the main post ID in a global variable. Typically the global $post will be the main post of the page you have navigated to. However, other loops on your page will temporarily set the global $post to whatever post they are dealing with at the time. For example, if your template uses a WordPress menu, that is really a loop through posts of type “menu.” Many sidebars and footer sections will loop through other sets of posts.

So at any given moment (like when trying to filter the `the_content` hook) you can’t be sure which post is set in the global $post. At the start of the template file, we know we are not in a loop, and the global $post will be the same as the page you are currently viewing. So we can copy the ID into another global variable to remember. Later on in the `template_content` function, we check if the $post we are filtering has the same ID as the main post. If not, we just return the content. If we are filtering the main post, we add our template section to the end of it.

You can also insert your own hook into your _page.php_ and other core templates to do something similar. Just add something like `do_action('my_template_hook');` at the point in your page template where you’d like to add in extra content.

### When to Use a Theme Template

So if you are distributing a plugin and need that page template to go along with it, you should use the shortcode method to generate your page.

Similarly, if you are distributing a theme by itself, any templates needed for the theme will need to be included within the theme folder. You could include code for shortcode-based templates within your theme, but templates are a more standard way of templating a page.

And finally, if your template needs to alter the HTML of your default page layouts, you will want to use a template file inside of your theme.

## Theme-Related WP Functions

Next we’ll discuss `get_template_part($slug,$name = null)`; the `get_template_part()` function can be used to load other _.php_ files (template parts) into a file in your theme.

According to the Codex, `$slug` refers to “the slug name for the generic template,” and `$name` refers to “the name of the specialized template.” In reality, both parameters are simply concatenated with a dash to form the filename looked for: _slug-name.php_.

The Twenty Twelve theme uses `get_template_part()` to load a specific post format “content” part into the WordPress loop:

```
<?php /* Start the Loop */ ?>
<?php while ( have_posts() ) : the_post(); ?>
        <?php get_template_part( 'content', get_post_format() ); ?>
<?php endwhile; ?>
```

If your template part is in a subfolder of your theme, add the folder name to the front of the slug:

    get_template_part(‘templates/content’, ‘page’);

The `get_template_part()` function uses the `locate_template()` function of WordPress to find the template part specified, which then loads the file using the `load_template()` function. `locate_template()` first searches within the child theme. If no matching file is found in the child theme, the parent theme is searched.

Besides searching both the child and parent themes for a file, the other benefit to using `get_template_part()` over a standard PHP include or require call is that a set of WordPress global variables are set up before the file is included. Here is the source for the `load_template()` function from WordPress 3.6, showing the global variables that are set. Notice that the `query_vars` array is also extracted into the local scope:

```php
<?php
function load_template( $_template_file, $require_once = true ) {
        global $posts, $post, $wp_did_header, $wp_query, $wp_rewrite;
        global $wpdb, $wp_version, $wp, $id, $comment, $user_ID;

        if ( is_array( $wp_query->query_vars ) )
                extract( $wp_query->query_vars, EXTR_SKIP );

        if ( $require_once )
                require_once( $_template_file );
        else
                require( $_template_file );
}
?>
```

### Using locate_template in Your Plugins

A common design pattern used in plugins is to include templates in your plugin folder and allow users to override those templates by adding their own versions to the active theme.`` For example, in SchoolPress, teachers can invite students to their class. The invite form is stored in a template within the plugin:

```
//schoolpress/templates/invite-students.php
?>
<p>Enter</p>
<form action=”” method=”post”>
        <label for=”email”>Email:</label>
<input type=”text” id=”email” name=”email” value=”” />
        <input type=”submit” name=”invite” value=”Invite Student” />
</form>
```

SchoolPress is envisioned as a software as a service application, but we also plan to release a plugin version for others to use on their own sites. Users of the plugin may want to override the default template without editing the core plugin since any edits to the core plugin, would be overwritten when the plugin was upgraded.

To enable users of our plugin to override the invite template, we’ll use code like the following when including the template file:

```
//schoolpress/shortcodes/invite-students.php
function sp_invite_students_shortcode($atts, $content=null, $code="")
{
        //start output buffering
ob_start();

        //look for an invite-students template part in the active theme
        $template = locate_template(“schoolpress/templates/invite-students.php”);

        //if not found, use the default
        if(empty($template))
                $template = dirname(__FILE__) .
            “/../templates/invite-students.php”;

        //load the template
        load_template($template);

        //get content from buffer and output it
        $temp_content = ob_get_contents();
        ob_end_clean();
        return $temp_content;
}
add_shortcode("invite-students", "sp_invite_students_shortcode");
```

Instead of embedding the HTML directly into the shortcode function, we load it from a template file. We first use locate_template() to search for the template in the active child and parent themes. Then if no file is found, we set $template to the path of the default template bundled with the plugin. The template is loaded using load_template().

## Style.css

The style.css file of your theme must contain a comment used by WordPress to track the theme’s version and other information to show in the WordPress dashboard. Here is the comment from the top of style.css in the Twenty Thirteen theme:

```css
/*
Theme Name: Twenty Thirteen
Theme URI: http://wordpress.org/themes/twentythirteen
Author: the WordPress team
Author URI: http://wordpress.org/
Description: The 2013 theme for WordPress takes us back to the blog,
featuring a full range of post formats, each displayed beautifully in their
own unique way. Design details abound, starting with a gorgeous color scheme and
matching header images, optional display fonts for beautiful typography, and a
wide layout that looks great on large screens yet remains device-agnostic
and is readable on any device.
Version: 0.1
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: black, brown, orange, tan, white, yellow, light, one-column, two-columns,
right-sidebar, flexible-width, custom-header, custom-menu, editor-style,
featured-images, microformats, post-formats, rtl-language-support,
sticky-post, translation-ready
Text Domain: twentythirteen

This theme, like WordPress, is licensed under the GPL.
Use it to make something cool, have fun, and share what you've learned
with others.
*/
```

The _style.css_ file of the active theme (and parent theme if applicable) is automatically enqueued by WordPress.

### Versioning Your Theme’s CSS Files

It’s good practice to set a version for your CSS files when loading them through `wp_enqueue_style()`. This way, if you update your CSS, you can update the version as well and avoid having your site’s users see a seemingly broken site using a version of the stylesheet cached by the browser.

When WordPress enqueues your theme’s _style.css_ file for you, it uses the overall WordPress version when loading the stylesheet. The line output in your site’s head tag will look like this:

```
<link rel='stylesheet'
        id='twentytwelve-style-css'
        href='.../wp-content/themes/twentytwelve/style.css?ver=3.5.2'
        type='text/css'
        media='all' />
```

Updates to the stylesheet, your app’s version number, or even the version number set in the _style.css_ comment won’t update the version added to the stylesheet when enqueued. It will always match the WordPress version number.

One solution is to remove all CSS from your _style.css_ file into other CSS files in your theme and load _those_ CSS files through `wp_enqueue_style()` calls in the theme’s _functions.php_ file. It would look like this for _style.css_:

```css
/*
   Theme Name: SchoolPress
   Version: 1.0

   That's it! All CSS can be found in the "css" folder of the theme.
*/
```

and like this for _functions.php_:

```php
<?php
define( 'SCHOOLPRESS_VERSION', '1.0' );
function sp_enqueue_theme_styles() {
        if ( !is_admin() ) {
                wp_enqueue_style( 'schoolpress-theme',
                        get_stylesheet_directory_uri() . '/css/main.css',
                        NULL,
                        SCHOOLPRESS_VERSION
                );
        }
}
add_action( 'init', 'sp_enqueue_theme_styles' );
?>
```

A constant like SCHOOLPRESS_VERSION would typically be defined in our main plugin file, but it’s included here for clarity. The preceding code will load our new _/css/main.css file_ with the main app version appended so new versions of the app won’t conflict with browser-cached stylesheets.

There is another way to change the version of the main _style.css_ file without moving it to another file entirely. We use the `wp_default_styles` filter. This filter passes an object containing the default values used when a stylesheet is enqeued. One of those values is the `default_version`, which can be changed like so:

```
define('SCHOOLPRESS_VERSION', '1.0');
function sp_wp_default_styles($styles)
{
    //use release version for stylesheets
        $styles->default_version = SCHOOLPRESS_VERSION;
}
add_action("wp_default_styles", "sp_wp_default_styles");
```

Now our main stylesheet will be loaded using the SchoolPress app version instead of the main WordPress version. We can keep our CSS in style.css if we want to, though it’s often a good idea to move at least some parts of the CSS into separate files in a “css” folder of your theme:

```css
<link rel='stylesheet'
        id='twentytwelve-style-css'
        href='.../wp-content/themes/twentytwelve/style.css?ver=1.0'
        type='text/css'
        media='all' />
```

## Functions.php

The _functions.php_ file of your active theme (and parent theme if applicable) is loaded every time WordPress loads. For this reason, the _functions.php_ file is a popular place to add little hacks and other random bits of code. On a typical WordPress site, the _functions.php_ file can quickly become a mess.

However, we’re developing a well-planned WordPress app, and _our_ _function.php_ files don’t have to be a mess. Just like we break up the core functions of our main app plugin into smaller includes, you should do the same with your theme’s _functions.php_. You could add files similar to the following to your theme’s folder:

* _/includes/functions.php_—Where you really place helper functions.
* _/includes/settings.php_—For code related to theme settings and options.
* _/includes/sidebars.php_—To define sidebars/widget areas.

Additionally, make sure that code you are adding to your theme’s _functions.php_ is related to the frontend display of your site. Code that applies to the WordPress dashboard, backend processing for your app, or your entire app in general should most likely be added somewhere within the main app plugin.

## Themes and Custom Post Types

Custom post types are just posts, so by default, your CPTs will be rendered using the _single.php_ template or _index.php_ if no _single.php_ template were available.

## WP Theme Frameworks

WordPress theme frameworks are themes that are meant to be used as parent themes or starter themes to jumpstart your frontend development. Theme frameworks will typically include basic styles and layouts for blog posts, archives, pages, sidebars, and menus. Some are heavier or lighter weight than others. Some include CSS classes, shortcodes, and other handy bits of code to help you create new layouts and add UI elements to your pages. All frameworks are likely to save you a lot of time.

There are two reasons to choose one theme framework over another. You either choose a child theme that visually looks very close to your vision for your app or you choose a framework that is coded in a way that feels right when working with it.

### _s (Underscores)

_s (pronounced “underscores”) is a starter theme published by Automattic that has all the common components you  need in a WordPress theme. Unlike most other frameworks, _s is not meant to be used as a parent theme. It’s meant to be used as a starting point for your own parent theme. All of the themes developed by Automattic for WordPress.com are based on the _s theme.

To use _s, you should download the code and change the directory name and all references to _s with the name of your theme. There are good instructions for doing this in [the project’s readme file](http://bit.ly/s-readme) or, even better, a tool to do it for you automatically on the [underscores website](http://www.underscores.me).

The stylesheet in _s is very minimal with no real styling, just a bit of code for layout and some common readability and usability settings.

_s is best for designers who are able to and want to build their own theme from scratch. It’s basically code you would have to write somehow for your theme yourself. The _s code is not abstracted as heavily as some of the other theme frameworks, and so using the framework should be easier to pick up for designers more familiar with HTML and CSS than PHP.

### StartBox

StartBox is a theme framework written by Brian Richards and maintained by Brian Messenlehner’s company WebDevStudios that is focused on providing “valid markup and dynamically generated classes and IDs throughout the entire layout” that makes it easier to control the look and feel of the theme through CSS. Or stated another way, customizing a StartBox theme will require less tweaking of the underlying HTML markup than needed when customizing other themes.

StartBox is meant to be used as a parent theme. You can write your own child theme that inherits it or you can use one of the child themes provided by StartBox. As stated before, the theme dynamically generates useful CSS classes on elements in the theme to help you style certain sections and pages. The theme also provides many shortcodes, widgets, hooks, and filters that can be used to build out your pages and customize the default functionality of the parent theme.

StartBox is best for designer-developers and really our choice for starting themes based on its balance of framework support on the design and coding side of theme development.

### Genesis

Genesis is a theme framework developed by StudioPress and used in over 40 child themes published by StudioPress and in many more themes published by third-party designers.

Like StartBox, the Genesis theme is meant to be used as a parent theme. StudioPress has child themes that are appropriate across a number of business and website types. Or you can create your own child theme that inherits from Genesis.

The Genesis framework abstracts the underlying HTML and CSS more than the other frameworks listed here. We find this makes it a little harder to work with when doing larger customizations. However, Genesis would be a good choice if you find one of their child themes is 80% of the way toward the look you want or if you find their framework easier to work with than other options.

### Non-WP Theme Frameworks

In addition to WordPress theme frameworks, there are also application UI frameworks that provide markup, stylesheets, and images for common UI patterns and elements. Some popular UI frameworks include Twitter [Bootstrap](http://getbootstrap.com/), Zurb’s [Foundation](http://foundation.zurb.com/), and [Gumby](http://gumbyframework.com).

Incorporating a UI framework into your theme can be as easy as copying a few files into the theme folder and enqueueing the stylesheets and JavaScript, and will give you easy access to styled UI elements like buttons, tabs, pagination, breadcrumbs, labels, alerts, and progress bars.

Below we’ll cover how to add Bootstrap assets into a StartBox child theme, but the same process should work for other combinations of WordPress themes and UI frameworks.

## Creating a Child Theme for StartBox

To create your theme, you’ll need to follow these steps:

1.  Create a new folder in your _wp-content/themes_ folder, for example, _startbox-child_.
2.  Create a _style.css_ file in the _startbox-child_ folder.
3.  Paste the following into your _style.css_ file:

        /*
        THEME NAME: StartBox Child
        THEME URI: http://bwawwp.com/wp-content/themes/startbox-child/
        DESCRIPTION: StartBox Child Theme
        VERSION: 0.1
        AUTHOR: Jason Coleman
        AUTHOR Uri: http://bwawwp.com
        TAGS: startbox, child, tag
        TEMPLATE: startbox
        */
        @import url("../startbox/style.css");

    The key field in the comment is the TEMPLATE field, which needs to match the folder of the parent theme, in this case _startbox_. The only required file for a child theme is _style.css_. So at this point, you’ve created a child theme.

    You can either copy all of the CSS from the parent theme’s _style.css_ into the child theme’s _style.css_ and edit what you want to or you can use `@import_url` like we do above to import the rules from the parent theme’s stylesheet and add more rules below to override the parent theme’s styles.

    In order to enqueue the bootstrap files, you will also need a _functions.php_ file.

4. Create an empty _functions.php_ file in the _startbox-child_ folder for now.

### Including Bootstrap in Your App’s Theme

In general, importing Bootstrap into the StartBox theme is kind of silly compared to finding a theme based on Bootstrap or just copying in the CSS rules you need. However, importing frameworks and libraries into your theme is something you might run into. The following will give you an idea of how to go about importing other libraries and frameworks into your theme.

[Download the Bootstrap ZIP file](http://getbootstrap.com) into your _startbox-child_ folder. After unzipping it, you will have a _dist_ folder containing the CSS and JS files for bootstrap. You can rename this folder to _bootstrap_ and delete the Bootstrap ZIP file. Your child theme folder should look like this now:

* _startbox-child_

    * _bootstrap_

        * _css_
        * _js_

    * _functions.php_
    * _style.css_


Now we will enqueue the Bootstrap CSS and JS by adding this code into the _functions.php_ file inside your child theme:

```php
<?php
function startbox_child_init() {
        wp_enqueue_style(
                'bootstrap',
                get_stylesheet_directory_uri() .
            '/bootstrap/css/bootstrap.min.css',
                'style',
                '3.0'
        );
        wp_enqueue_script(
                'bootstrap',
                get_stylesheet_directory_uri() .
            '/bootstrap/js/bootstrap.min.js',
                'jquery',
                '3.0'
        );
}
add_action( 'init', 'startbox_child_init' );
?>
```

Note that we set the dependencies for the Bootstrap CSS to style, which will make sure that the Bootstrap stylesheet loads after the StartBox stylesheet. We also set the Bootstrap JS to depend on jquery and set the version of both files to 3.0 to match the version of Bootstrap used.

At this point you could use any of your favorite Bootstrap styles or JavaScript in your WordPress theme. Many of the Bootstrap styles for columns and layout aren’t being used in the StartBox markup (StartBox has its own layout system), and so they won’t be applicable to your theme. But the styles for form elements and buttons would be useful for app developers.

## Menus

### Nav Menus

Since WordPress version 3.0, there has been a standard method for adding navigation menus to themes. This involved registering the menu in the theme’s code, designating where in the theme the menu is going to appear, and then managing the menu through the WordPress dashboard.

The main benefit to using the built-in menu functionality in WordPress is that end users can control the content of their menus using the GUI in the dashboard. Even if you are a developer with full control over your app, it is still a good idea to use the built-in menus in WordPress since you may have stakeholders who would want to manage menus or you may want to distribute you theme to others in the future. The WordPress navigation menus are also very easy to reposition and can take advantage of other code using menu-related hooks or CSS styles.

To register a new navigational menu, use the `register_nav_menu($location, $description)` function. The `$location` parameter is a unique slug used to identify the menu. The `$description` parameter is a longer title for the menu shown in the dropdown in my menu tool in the dashboard:

register_nav_menu(“main”, “Main Menu”);

You can also register many menus at once using the `register_nav_menus()` (with an s) variant. This function accepts an array of locations where the keys are the `$location` slugs and the values are the `$description` titles:

```
register_nav_menus(array(
        “main” => “Main Menu”,
        “logged-in” => “Logged-In Menu”
));
```

To place a navigational menu into your theme, use the `wp_nav_menu()` function:

    wp_nav_menu( array(‘theme_location’ => 'main' ));

The `theme_location` parameter should be set to the `$location` set with `register_nav_menu()`. The `wp_nav_menu()` function can take many other parameters to change the behavior and markup of the menu. [The WordPress Codex page on Navigation Menus](http://bit.ly/nav-codex) is a good resource on the various parameters to the `wp_nav_menu()` function and other ways to customize menus. We cover some of our favorite recipes in the following sections.

### Dynamic Menus

There are two main methods to make your WordPress menus dynamic so that different menu items show up on different pages or different circumstances. The first is to set up two menus and load a different menu in different cases. Here is a code example from the Codex showing how to show a different menu to logged-in users and logged-out users:

```
if ( is_user_logged_in() ) {
     wp_nav_menu( array( 'theme_location' => 'logged-in-menu' ) );
} else {
     wp_nav_menu( array( 'theme_location' => 'logged-out-menu' ) );
}
```

The other way to make your menu dynamic is to use the `nav_menu_css_class` filter to add extra CSS classes to specific menu items. Then you can use CSS to hide/show certain menu items based on their CSS class.

Say you want to remove a login link from a menu when you are on the login page. You could use code like this:

```
function remove_login_link($classes, $item)
{
        f(is_page(‘login’) && $item->title == "Login")
                $classes[] = "hide";    //hide this item

        return $classes;
}
add_filter(“nav_menu_css_class”, “sp_nav_menu_css_class”, 10, 2);
```

Another way to customize the markup of your menus is to use a Custom Walker class.

## Responsive Design

A common use of media queries is to hide certain elements and adjust font and element sizes when someone is printing. Here is how you would specify that media query in a `<link>` tag, inside of a stylesheet, and through a `wp_enqueue_style` call:

```html
<link rel="stylesheet" media="print" href="example.css" />
```

```html
<style>
@media print
{
        .hide-from-print {display: none;}
        .show-when-printing {display: auto;}
}
</style>
```

```php
<?php
        wp_enqueue_style(‘example’, ‘example.css’, NULL, ‘1.0’, ‘print’);
?>
```

### Device Detection in PHP

Device detection in PHP is based on the `$_SERVER[‘HTTP_USER_AGENT’]` global created by PHP. This value is set by the browser itself and so is definitely not standardized, often misleading, and potentially spoofed by web crawlers and other bots. It’s best to avoid PHP-based browser detection if you can by making your code as standards based as possible and using the CSS and JavaScript methods described for feature detection.

If you want a general idea of the kind of browser accessing your app, the user agent string is the best we have.

Here is a simple test script echoing the user agent string and an example of what one will look like:

```php
<?php
echo $_SERVER['HTTP_USER_AGENT'];

/*
        Outputs something like:
        Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4)
        AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36
*/
?>
```

This user agent string includes some useful information, but perhaps too much. There are no fewer than five different browser names in that string. So which browser is it? Mozilla, KHTML, Gecko, Chrome, or Safari? In this case, I was running Chrome on a MacBook Air running OS X.

Did I already mention that there is no standard for the user agent string browsers will send? Historically, browsers include the names of older browsers to basically say, “I can do everything this browser does, too.”

A funny summary of the history of various user agent strings can be found at ``[WebAIM](http://bit.ly/webaim-history), including this bit explaining the pedigree of the Chrome browser.

> And then Google built Chrome, and Chrome used Webkit, and it was like Safari, and wanted pages built for Safari, and so pretended to be Safari. And thus Chrome used WebKit, and pretended to be Safari, and WebKit pretended to be KHTML, and KHTML pretended to be Gecko, and all browsers pretended to be Mozilla, and Chrome called itself Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13, and the user agent string was a complete mess, and near useless, and everyone pretended to be everyone else, and confusion abounded.
>
> —Aaron Anderson

### Browser detection in WordPress core

Luckily, WordPress has done a bit of the work behind parsing the user agent string and exposes some global variables and a couple of methods that cover the most common browser detection–related questions.

The following globals are set by WordPress in _wp-includes/vars.php_:

* $is_lynx
* $is_gecko
* $is_winIE
* $is_macIE
* $is_opera
* $is_NS4
* $is_safari
* $is_chrome
* $is_iphone
* $is_IE

And for detecting certain servers, we have the following:

* $is_apache
* $is_IIS
* $is_iis7

Finally, you can use the `wp_is_mobile()` function, which checks for the word “mobile” in the user agent string as well as a few common mobile browsers.

Here is a quick example showing how you might use these globals to load different scripts and CSS:

```php
<?php
function sp_init_browser_hacks() {
        global $is_IE;
        if ( $is_IE ) {
                //check version and load CSS
                $user_agent = strtolower( $_SERVER['HTTP_USER_AGENT'] );
                if ( strpos( 'msie 6.', $user_agent ) !== false &&
                        strpos( 'opera', $user_agent ) === false ) {
                        wp_enqueue_style(
                                'ie6-hacks',
                                get_stylesheet_directory_uri() . '/css/ie6.css'
                        );
                }
        }

        if ( wp_is_mobile() ) {
                //load our mobile CSS and JS
                wp_enqueue_style(
                        'sp-mobile',
                        get_stylesheet_directory_uri() . '/css/mobile.css'
                );
                wp_enqueue_script(
                        'sp-mobile',
                        get_stylesheet_directory_uri() . '/js/mobile.js'
                );
        }
}
add_action( 'init', 'sp_init_browser_hacks' );
?>
```

### Browser detection with PHP’s get_browser()

PHP actually has a great function for browser detection built in: `get_browser()`. Here is a simple example calling `get_browser()` and displaying some typical results:

```
<?php
$browser = get_browser();
print_r($browser);

/*
        Would produce output like:

        stdClass Object (
[browser_name_regex] => §^mozilla/5\.0 \(.*intel mac os x.*\)
applewebkit/.* \(khtml, like gecko\).*chrome/28\..*safari/.*$§
[browser_name_pattern] => Mozilla/5.0 (*Intel Mac OS X*)
AppleWebKit/* (KHTML, like Gecko)*Chrome/28.*Safari/*
[parent] => Chrome 28.0
[platform] => MacOSX
[win32] =>
[comment] => Chrome 28.0
[browser] => Chrome
[version] => 28.0
[majorver] => 28
[minorver] => 0
[frames] => 1
[iframes] => 1
[tables] => 1
[cookies] => 1
[javascript] => 1
[javaapplets] => 1
[cssversion] => 3
[platform_version] => unknown
[alpha] =>
[beta] =>
[win16] =>
[win64] =>
[backgroundsounds] =>
[vbscript] =>
[activexcontrols] =>
[ismobiledevice] =>
[issyndicationreader] =>
[crawler] =>
[aolversion] => 0
)
*/
```

This is pretty amazing stuff! So why is this function last in the section on detecting a browser with PHP? The answer is that the `get_browser()` function is unavailable or out of date on most servers. To get the function to give you useful information, or in most cases work at all, you need to download an up-to-date _browscap.ini_ file and configure PHP to find it. If you are distributing your app, you’ll want to use a different method to detect browser capabilities. However, if you are running your own app on your own servers, `get_browser()` is fair game.

An up-to-date _browscap.ini_ file can be found at the [Browser Capabilities Project website](http://bit.ly/browsercap). Make sure you get one of the files formatted for PHP. We recommend the _lite_php_browscap.ini_ file, which is half the size but contains info on the most popular browsers.

Once you have the _.ini_ file on your server, you’ll need to update your _php.ini_ file to point to it. Your _php.ini_ file probably has a line for browscap commented out. Uncomment it and make sure it’s pointing to the location of the _.ini_ file you downloaded. It should look something like this:

```
[browscap]
browscap = /etc/lite_php_browscap.ini
```

Now restart your web server (apache, Nginx, etc.) and get_browser() should be working.

### Final Note on Browser Detection

We spent a lot of space here on browser detection, but in practice it should be used as a last resort. When a certain browser is giving you pain with a piece of design or functionality, it is tempting to try to detect it and code around it. However, if it’s possible to find another workaround that gets a similar result without singling out specific browsers, it’s usually better to go with that solution.

For one, as we’ve seen here, the user agent string has no standards, and your code to parse it may have to be updated regularly to account for new browsers and browser versions.

Second, in some cases, a browser-specific issue is a symptom of a bigger problem in your code. There may be a way to simplify your design or functionality to work better across multiple browsers, devices, and screen sizes.

The goal with responsive design and programming is to build something that will be flexible enough to account for all of the various browsers and clients accessing your app, whether you know about them or not.

## Versioning CSS and JS Files

When you call `wp_enqueue_script()` or `wp_enqueue_style()`, you can pass a version number. This version number is tacked on to the end of the filename and prevents the browser or web client from using a cached version of the script or stylesheet when the version is updated. For example, here is the `wp_enqueue_style()` call from our preceding Bootstrap example and the HTML generated by it:

```
<?php
// load our stylesheet
wp_enqueue_style(
        'bootstrap',
        get_stylesheet_directory_uri() . '/bootstrap/css/bootstrap.min.css',
        'style',
        '3.0'
);

// and this shows up in the head section of the site (note the 3.0)
/*
<link rel='stylesheet'
id='bootstrap-css'
href='/wp-content/themes/startbox-child/bootstrap/css/bootstrap.min.css?ver=3.0'
type='text/css'
media='all' />
*/
```

A good idea is to define a constant to store the version of your plugin, theme, or app and use that as the version parameter to your enqueue calls. That way you only have to update your version in one place if you’ve done a lot of work.

There is, however, one stylesheet that you won’t be able to version this way and that is the _style.css_ found in your theme or child theme. This stylesheet is automatically enqueued by WordPress, and the version attached to it is the version of WordPress you are running.

You don’t want to update the WordPress version every time you update your theme, but you do want to update the version of _style.css_ if you change that file. There are two ways to get around this issue:

1.  You can empty out your _style.css_ and load all of your stylesheets through `wp_enqueue_stylesheet` calls. This way you can specify your own version.
2.  You can use the `wp_default_styles` action to change the default version used when enqueueing a stylesheet without a set version. The `$styles` object is passed by reference to this action, and so you only need to edit the object itself and don’t need to (and really shouldn’t) return the `$styles` object like you would in a typical filter:

```
function sp_wp_default_styles($styles)
{
        //use our app version constant
        $styles->default_version = SCHOOLPRESS_VERSION;
}
add_action("wp_default_styles", "sp_wp_default_styles");
```

