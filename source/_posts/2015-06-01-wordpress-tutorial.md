layout: post
title: "WordPress Tutorial"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

## MVC plugins for WordPress

* [WP MVC](http://bit.ly/wp-mvc)
* [Churro](http://bit.ly/churro-plugin)
* [Tina MVC](http://bit.ly/tina-mvc)

There are a couple of ways to map an MVC process to WordPress.

### Models = plugins

In an MVC framework, the code that stores the underlying data structures and business logic are found in the models. This is where the programmers will spend the majority of their time.

In WordPress, plugins are the proper place to store new data structures, complex business logic, and custom post type definitions.

This comparison breaks down in a couple of ways. First, many plugins add view-like functionality and contain design elements. Take any plugin that adds a widget to be used in your pages. Second, forms and other design components used in the WordPress dashboard are generally handled in plugins as well.

One way to make the separation of concerns more clear when adding view-like components to your WordPress plugins is to create a “templates” or “pages” folder and put your frontend code into it. Common practice is to allow templates to override the template used by the plugin. For example, when using WordPress with the Paid Memberships Pro plugin, you can place a folder called “paid-memberships-pro/pages” into your active theme to override the default page templates.

### Views = themes

In an MVC framework, the code to display data to the user is written in the views. This is where designers will spend the majority of their time.

In WordPress, themes are the proper place to store templating code and logic.

Again, the comparison here doesn’t map one to one, but “views = themes” is a good starting point.

### Controllers = template loader

In an MVC framework, the code to process user input (in the form of URLs or `$_GET` or `$_POST` data) and decide which models and views to use to handle a request are stored in the controllers. Controller code is generally handled by a programmer and often set up once and forgotten about. The meat of the programming in an MVC application happens in the models and views.

In WordPress, all page requests (unless they are accessing a cached _.html_ file) are processed through the index.php file and processed by WordPress according to the Template Hierarchy. The template loader figures out which file in the template should be used to display the page to the end user. For example, use _search.php_ to show search results, _single.php_ to show a single post, etc.

For a better understanding of how MVC frameworks work, the PHP framework [Yii](http://bit.ly/yii-guide) has a great resource explaining how to best use their MVC architecture.

For a better understanding of how to develop web applications using WordPress as a framework, continue reading this book.

## WordPress Directory Structure

- _wp-config.php_ the only file you may need to ever alter
- _/wp-admin_

    This directory contains core directories and files for managing the WordPress admin interface. Another key file in this directory is _admin-ajax.php_, which all AJAX requests should be run through.

- _/wp-includes_

    This directory contains core directories and files for various WordPress functionality.

- _/wp-content_

    This directory contains subdirectories for the plugins and themes you have installed on your site and any media files you upload to your site. If you create a plugin that needs to store dynamic files of its own, it is a best practice to place them somewhere in the _wp-content_ folder so they are included in a content backup.

    The following directories are subdirectories of the _wp-content_ directory.

    - _/wp-content/plugins_

        Any WordPress plugin you install on your WordPress site will be located in this directory. By default, WordPress comes with the Hello Dolly and Akismet plugins.

    - _/wp-content/themes_

        Any WordPress themes you install on your WordPress site will be located in this directory. By default, WordPress comes with the Twenty Eleven, Twenty Twelve, Twenty Thirteen, and Twenty Fourteen themes.

    - _/wp-content/uploads_

        Once you start uploading any photos or files to your media library, you will start seeing this directory being populated with those uploaded files. All uploaded media is stored in the _uploads_ directory.

    - _/wp-content/mu-plugins_

        In WordPress, you can force the use of any plugin by creating a _mu-plugins_ directory inside of the _wp-content_ directory. This directory does not exist unless you create it. The “mu” stands for “must use,” and any plugin you put in the _mu-plugins_ folder will automatically run without needing to be manually activated on the admin plugins page. In fact, you won’t even see any must use plugins listed there.

        Must use plugins are especially useful on multisite installs of WordPress so you can use plugins that your individual network site admins won’t be able to deactivate.

