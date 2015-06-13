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

## Settings

WordPress offers an API that can be used to generate options and settings forms for your plugins in the admin dashboard.

The Settings API is very thoroughly documented in [the WordPress Codex](http://bit.ly/settings-api). There is also a great tutorial by Tom Mcfarlin at Tutsplus called [The Complete Guide to the WordPress Settings API](http://bit.ly/guide-wp). These resources cover the details of adding menu pages and settings within them for use in your plugins and themes. Below are some tips specific to app developers.

### Do You Really Need a Settings Page?

Before spending the time to create a settings page and adding to the technical debt of your app, consider using a global variable to store an array of the options used by your plugin or app:

```
global $schoolpress_settings;
$schoolpress_settings = array(
  'info_email' => 'info@schoolpress.me',
  'info_email_name' => 'SchoolPress'
);
```

For apps that won’t be managed by nondevelopers and/or won’t be distributed, using a global of settings may be enough. Just store a global variable like the one in the preceding code at the top of your plugin file or inside of a _includes/settings.php_ file. Why build the UI if you aren’t going to use it?

Even if your plugin or theme will eventually be distributed, we like to start with a global variable like this anyway. The settings that you think you need in the beginning may not be the ones you need at the end of your project. Settings may be added or removed throughout development. Settings you think need a dropdown may need a free text field instead. The Settings API makes it easy to add settings and update them later, but it is still much easier to change one element in a global array than it is to add or modify a handful of function calls and definitions.

If most of the statements below apply to you, consider using a global variable for your settings instead of building a settings UI:

* This plugin is not going to be distributed outside my team.
* The only people changing these settings are developers.
* These settings do not need to be different across our different environments.
* These settings are likely to change before release.

### Could You Use a Hook or Filter Instead?

Another alternative to adding a setting to your plugin through the Settings API is to use a hook or filter instead. If a setting you are imagining would only be used by a minority of your users, consider adding a hook or filter to facilitate the setting.

For example, someone using our WP-Doc plugin may request the ability to restrict _.doc_ generation to admins only or a specific subset of WordPress roles. We could add a settings page with a list of roles with checkboxes to enable or disable _.doc_ downloads for that role. Maybe it should just be one checkbox to enable downloads for all roles or just admins. Maybe it should be a free text field to enter a capability name to check for before allowing the download.

A filter might be a better way to do this. We can add a capability check before the _.doc_ is served and use a filter to let developers override the default array of capabilities checked. This code should be added to the `wpdoc_template_redirect()` function of the WP-Doc plugin, before the _.doc_ page is rendered:

```
//don't require any caps by default, but allow developers to add checks
$caps = apply_filters('wpdoc_caps', array());

if(!empty($caps))
{
  //guilty until proven innocent
  $hascap = false;

  //must be logged in to have any caps at all
  if(is_user_logged_in())
  {
    //make sure the current user has one of the caps
    foreach($caps as $cap)
    {
      if(current_user_can($cap))
      {
        $hascap = true;
        break;  //stop checking
      }
    }
  }

  if(!$hascap)
  {
    //don't show them the file
    header('HTTP/1.1 503 Service Unavailable', true, 503);
    echo "HTTP/1.1 503 Service Unavailable";
    exit;
  }
}
```

You could then override the wpdoc_caps array by adding actions like these:

```
//require any user account
add_filter('wpdoc_caps', function($caps) { return array('read'); });

//require admin account
add_filter('wpdoc_caps', function($caps) { return array('manage_options'); });

//authors only or users with a custom capability (doc)
add_filter('wpdoc_caps', function($caps) { return array('edit_post', 'doc'); });
```

The preceding example uses anonymous functions, also known as closures, so the add_filter() call can be written on one line without using a separate callback function. This syntax requires PHP version 5.3 or higher.

To recap, the more the following statements are true, the more it makes sense to use a hook or filter instead of a settings UI:

* Only a small number of people will want to change this setting.
* The people changing this setting are likely to be developers.
* The people changing this setting are likely to have custom needs.
* This setting would require a large number of individual settings or more complicated UI.

### Use Standards When Adding Settings

If and when you do need to add settings to your plugin or theme, be sure to use the tutorials listed earlier in this chapter to make sure you are using the Settings API correctly to add your settings.

Using the Settings API takes a little bit of up-front work, but does let you add and edit settings more easily later on. Also, since you are doing things the WordPress way, other developers will understand how your code works and will be able to hook into it. If a developer wants to make an add-on for your plugin, she will be able to hook into your existing menus and settings sections to add additional settings for her plugins.

Using the Settings API will also ensure that your settings look similar to the other settings through a user’s WordPress dashboard. You don’t want developers to have to learn a new UI just to use your plugin.

### Ignore Standards When Adding Settings

While you typically want to use the Settings API and the WordPress standards when adding settings for your plugin, sometimes it make sense to ignore those standards.

The main case here is if you have a large number of settings that deserve a very custom UI. If you only have one or two settings, users won’t be spending a lot of time inside the settings screens. They will just want to change those two settings as fast as possible.

However, if your plugin requires dozens of settings, possibly across multiple tabs or screens, possibly related to one another, it makes sense to treat the settings for your app as an app itself. You should devote some attention to make sure that the UI and UX for your settings screen is as optimized as possible.

The WordPress Settings API is pretty flexible in terms of how things are displayed. You can control how each section is rendered and how each individual setting field is rendered. But in the end, it really is focused on one or more tabs with sections with fields on them. For applications with a large number of settings that interact with one another, you may want to use a different organization for your settings.

Don’t be scared to ignore the standards here. Add a menu to the dashboard, have the callback function for it include a set of organized _.php_ files to generate the settings form and process it, and follow these tips if possible:

* Add your menu sections and items per the standards, even if your settings pages themselves use a custom layout.
* Remember to sanitize your inputs and use nonces when appropriate.
* Use hooks and filters to whenever possible, if you’d like to allow others to extend your settings.
* Use the same HTML elements and CSS classes whenever possible so the general style stays consistent with the rest of WordPress now and through future updates.

Due to the complexity of ecommerce software, it makes sense that ecommerce plugins often have complicated settings screens. Here are two examples of plugins doing custom settings pages well:

* [Paid Memberships Pro](http://bit.ly/paid-pro) (whose code is [posted on GitHub](http://bit.ly/pmp-github))
* [WooCommerce](http://bit.ly/wcomm-plugin) (whose code is [posted on GitHub](http://bit.ly/wc-github))

## Rewrite

Apache comes with a handy module called `mod_rewrite` that allows you to route incoming URLs to different URLs or file locations using rules that are typically added to an _.htaccess_ file in your site root folder. Other Web servers have similar URL rewriting systems; here are the standard rules for WordPress:

```
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

David Walsh does an excellent [line-by-line explanation of the WordPress .htaccess file on his blog](http://bit.ly/dw-htaccess) if you’d like to understand more about Apache’s `mod_rewrite` module and how the WordPress rules work. Generally, these rules reroute all incoming traffic to _any_ nondirectory or nonfile URL to the _index.php_ file of your WordPress install.

WordPress then parses the actual URL to figure out which post, page, or other content to show. For example, under most permalink settings, the URL _/about/_ will route to the page or post with the slug “about.”

For the most part, you can let WordPress do its thing and handle permalink redirects on its own. However, if you need to add your own rules to handle certain URLs in particular ways, that can be done through the Rewrite API.

### Adding Rewrite Rules

The basic function to add a rewrite rule is `add_rewrite_rule($rule, $rewrite, $position)`:

* $rule—A regular expression to match against the URL, just like you would use in an Apache rewrite rule.
* $rewrite—The URL to rewrite to if the rule is matched. Matched groups from the rule regular expressions are contained in an array called `$matches`.
* $position—Specifies whether to place the rules above the default WordPress rules (top) or below them (bottom).

Say we want to pass a subject line to our contact form through the URL. We could have URLs like _/contact/special-offer/_, which would load the contact page and prepopulate the subject to “special-offer.” We could add a rewrite rule like this:

```
add_rewrite_rule(
          '/contact/([^/]+)/?',
          'index.php?name=contact&subject=' . $matches[1],
          'top'
        );
add_rewrite_rule(
flush_rewrite_rules();
```

With this rule added to the rewrite rules, a visit to _/contact/special-offer/_ would redirect to the _/contact/_ page and populate the global `$wp_query->query_vars[‘subject’]` with the value “special-offer,” or whatever text was added after _/contact/_. Your contact form could use this value to prepopulate the subject value of the email sent.

### Flushing Rewrite Rules

WordPress caches the rewrite rules. So when you add a rule like this, you need to flush the rewrite rules so they take effect. Flushing the rewrite rules can take some time, so it’s important that you don’t do it on every page load. To keep the rewrite rules in order, every plugin that affects the rewrite rules should do these three things:

1.  Add the rule during plugin activation and immediately flush the rewrite rules using the `flush_rewrite_rules()` function.
2.  Add the rule during the `init` hook in case the rules are flushed manually through the Permalinks Settings page of the dashboard or by another plugin.
3.  Add a call to `flush_rewrite_rules()` during deactivation so the rule is removed on deactivation.

The following code shows how our contact subject rule should be added according to the three previous steps:

```
//Add rule and flush on activation.
function sp_activation()
{
        add_rewrite_rule(
          '/contact/([^/]+)/?',
          'index.php?name=contact&subject=' . $matches[1],
          'top'
        );
        flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'sp_activation');

/*
  Add rule on init in case another plugin flushes,
  but don't flush cause it's expensive
*/
function sp_init()
{
        add_rewrite_rule(
          '/contact/([^/]+)/?',
          'index.php?name=contact&subject=' . $matches[1],
          'top'
        );
}
add_action('init', 'sp_init');

//Flush rewrite rules on deactivation to remove our rule.
function sp_deactivation()
{
        flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'sp_deactivation');
```

### Other Rewrite Functions

WordPress offers some other functions to insert special kinds of rewrite rules. These include:

<dl>
    <dt>
        [`add_rewrite_tag()`](http://bit.ly/rewrite-api)
    </dt>
    <dd>
        Another way to add custom querystring variables.
    </dd>
    <dt>
        [`add_feed()`](http://bit.ly/rewrite-add)
    </dt>
    <dd>
        Add a new kind of feed to function like the RSS and ATOM feeds.
    </dd>
    <dt>
        [`add_rewrite_endpoint`](http://bit.ly/rewrite-end)
    </dt>
    <dd>
        Add querystring variables to the end of a URL.
    </dd>
</dl>

The Codex pages for each function explains things well. Some functions will make more sense for certain uses versus others. [Example 7-3](ch07.html#ex7-3code "Example 7-3. The WP DOC plugin") shows how to use the `add_rewrite_endpoint()` function to detect when _/doc/_ is added to the end of a URL and to force the download of a _.doc_ file. This code makes use of the fact that any HTML document with a _.doc_ extension will be read by Microsoft Word as a _.doc_ file.

The `add_rewrite_endpoint()` function takes two parameters:

* $name*—Name of the endpoint, for example, `'doc'`.
* $places*—Specifies which pages to add the endpoint rule to. Uses the `EP_*` constants defined in _wp-includes/rewrite.php_.

```php
<?php
/*
Plugin Name: WP DOC
Plugin URI: http://bwawwp.com/wp-docx/
Description: Add /doc/ to the end of a page or post to download a .docx version.
Version: .1
Author: Stranger Studios
*/

/*
        Register Rewrite Endpoint
*/
//Add /doc/ endpoint on activation.
function wpdoc_activation()
{
        add_rewrite_endpoint('doc', EP_PERMALINK | EP_PAGES);
        flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'wpdoc_activation');

//and init in case another plugin flushes, but don't flush cause it's expensive
function wpdoc_init()
{
        add_rewrite_endpoint('doc', EP_PERMALINK | EP_PAGES);
}
add_action('init', 'wpdoc_init');

//flush rewrite rules on deactivation to remove our endpoint
function wpdoc_deactivation()
{
        flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'wpdoc_deactivation');

/*
        Detect /doc/ use and return a .doc file.
*/
function wpdoc_template_redirect()
{
        global $wp_query;
        if(isset($wp_query->query_vars['doc']))
        {
                global $post;

                //double check this is a post
                if(empty($post->ID))
                        return;

                //headers for MS Word
                header("Content-type: application/vnd.ms-word");
                header('Content-Disposition: attachment;Filename='.
            $post->post_name.'.doc');

                //html
                ?>
                <html>
                <body>
                <h1><?php echo $post->post_title; ?></h1>
                <?php
                        echo apply_filters('the_content', $post->post_content);
                ?>
                </body>
                </html>
                <?php

                exit;
        }
}
add_action('template_redirect', 'wpdoc_template_redirect');
?>
```

Note in the preceding example that we follow the three steps we used in the `add_rewrite_rule()` example to define our rule on activation and init and flush all rules on activation and deactivation.

We used `EP_PERMALINK | EP_PAGES` when defining our endpoint, which will add the endpoint to single post pages and page pages. The full list of endpoint mask constants is shown below:

```
EP_NONE
EP_PERMALINK
EP_ATTACHMENT
EP_DATE
EP_YEAR
EP_MONTH
EP_DAY
EP_ROOT
EP_COMMENTS
EP_SEARCH
EP_CATEGORIES
EP_TAGS
EP_AUTHORS
EP_PAGES
EP_ALL
```

For more information on the Rewrite API, both the [Codex page on the Rewrite API](http://bit.ly/rewrite-codex) and the Codex page on the [WP_Rewrite class](http://bit.ly/class-ref-wp) are good sources of information. There is a lot more that can be done with the WP_Rewrite class that we didn’t get into here.

## WP-Cron

A cron job is a script that is run on a server at set intervals. The WP-Cron functions in WordPress extend that functionality to your WordPress site. Cron jobs, sometimes called events, can be set up to run every few minutes, every few hours, every day, or on specific days of the week or month. Some typical uses of cron jobs include queueing up digest emails, syncing data with third-party APIs, and preprocessing CPU-intensive computations used in reports and comparative analysis.

There are three basic parts to adding a cron job to your app:

1.  Schedule the cron event. This will fire a specific hook/action at the defined interval.
2.  Hook a function to that action.
3.  Place the code you actually want to run within the callback function.

This code can be added to a custom plugin file to schedule some cron jobs:

```
//schedule crons on plugin activation
function sp_activation()
{
        //do_action('sp_daily_cron'); will fire daily
        wp_schedule_event(time(), 'daily', 'sp_daily_cron');
}
register_activation_hook(__FILE__, 'sp_activation');

//clear our crons on plugin deactivation
function sp_deactivation()
{
        wp_clear_scheduled_hook('sp_daily_cron');
}
register_deactivation_hook(__FILE__, 'sp_deactivation');

//function to run daily
function sp_daily_cron()
{
        //do this daily
}
add_action("sp_daily_cron", "sp_daily_cron");
```

The function `wp_schedule_event($timestamp, $recurrence, $hook, $args)` has the following attributes:

* $timestamp—Timestamp for first time to run the hook. You can typically set it to `time()`.
* $recurrence—How often the event should run. You can pass `hourly`, `daily`, or `twicedaily`, or use the `cron_schedules` hook to add other intervals.
* $hook—The name of the action to fire on each recurrence.
* $args—Any arguments you’d like to pass along to the hook fired can be added to the end of the `wp_schedule_event()` call.

We like to give our cron events generic names based on the interval. This way, if we wanted to run another function daily, we could just add `add_action(‘sp_daily_cron’, ‘new_function_name’);` to our codebase.

### Adding Custom Intervals

By default, the wp_schedule_event() function will only accept intervals of hourly, daily, or twicedaily. To add other intervals, you need to use the cron_schedules hook:

```
//add a monthly interval to use in cron jobs
function sp_cron_schedules($schedules)
{
        $schedules['monthly'] = array(
                'interval' => 60*60*24*30, //really 30 days
                'display' => 'Once a Month'
        );
}
add_filter( 'cron_schedules', 'sp_cron_schedules' );
```

Unlike Unix-based cron jobs, WP-Cron doesn’t support intervals based on day of the week. To do this, you can use a daily cron job and have the function called check the day of the week:

```
//run on Mondays
function sp_monday_cron()
{
        //get day of the week, 0-6, starting with Sunday
        $weekday = date("w");

        //is it Monday?
        if($weekday == "1")
        {
                //execute this code on Mondays
        }
}
add_action("sp_daily_cron", "sp_monday_cron");
```

Unlike Unix-based cron jobs, WP-Cron doesn’t support intervals based on day of the week. To do this, you can use a daily cron job and have the function called check the day of the week:

```
//run on Mondays
function sp_monday_cron()
{
        //get day of the week, 0-6, starting with Sunday
        $weekday = date("w");

        //is it Monday?
        if($weekday == "1")
        {
                //execute this code on Mondays
        }
}
add_action("sp_daily_cron", "sp_monday_cron");
```

You could write similar code to check for a specific day of the month (`date("j")`) or even specific months (`date("m")`)

### Scheduling Single Events

The preceding examples show how to execute code at some interval. You may also have times when you want to fire an event once at some point in the future. For example, you may want to schedule email delivery of new blog posts one hour after they are posted. This will give authors one hour to fix any issues with the blog posts before it gets pushed around the world. The `wp_schedule_single_event()` function can be used in these cases where we want schedule an event to fire just once.

### Kicking Off Cron Jobs from the Server

In all of the previous examples, we assumed that events scheduled with `wp_schedule_event()` would actually run when they are scheduled. That’s almost true.

On Unix systems, the cron service runs every minute (generally) to check if there is a script to run. In WordPress, that check is done on every page load. So if no one loads your website in a given day, or only pages from a static cache are loaded, your cron jobs may not fire off that day. They will fire off with the next page load.

This setup is fine for casual WordPress sites, but our apps need reliability. Luckily, it is easy to disable the internal cron timer and set one up on your web server to fire when you need it to.

To disable the WordPress cron timer, simply add the following to your _wp-config.php_ file:

    define('DISABLE_WP_CRON', true);

`````This constant just enables or disables the _check_ for events that are ready to fire. You still add and manage events as we did up above. We just need to manually hit the _wp-cron.php_ file in our WordPress install often enough to fire our scripts when needed.`````

``````If all you have are daily scripts, you can add a cron job like this via the `crontab -e` command:``````

    0 0 * * * wget -O - -q -t 1 http://yoursite.com/wp-cron.php?doing_wp_cron=1

``````Information on how to use cron can be found at [its Wikipedia entry](http://bit.ly/cronwiki). Information on how to use `wget` can be found at [the `wget` manual](http://bit.ly/gnu-manual).``````

``````The `0 0 * * *` part of the preceding entry tells cron to execute this script at 0 minutes on the 0th hour (midnight) every day of the week.``````

``````The `wget -O - -q -t 1 http://yoursite.com/wp-cron.php?doing_wp_cron=1` part uses the `wget` command to load up the _wp-cron.php_ page in your WordPress install. The `-O -` tells `wget` to send output to devnull, and the `-q` enables quiet mode. This will keep cron from adding files to your server or emailing you the outputs of each cron run. The `-t 1` tells cron to try once. This will keep `wget` from hitting your server multiple times if the first try fails. If the call to _wp-cron.php_ is failing, the rest of your website is probably failing too; hopefully you’ve already been notified.``````

``````Be sure to change `yoursite.com` to your actual site URL. And finally, the `?doing_wp_cron=1` on the end of the URL is needed since _wp-cron.php_ will check for that `$_GET` parameter before running.``````

Make sure that the URL to _wp-cron.php_ is excluded from any caching mechanisms you may have installed on your site.

`````This one cron job will fire every day, and any daily cron jobs you scheduled inside of WordPress will fire daily. If you need your crons to run more often, you can change the cron entry to run every hour or every few minutes. Note that a call to _wp-cron.php_ is basically a hit to your website. A check every minute is effectively the same as an additional 1,440 users hitting your site. So schedule your cron jobs conservatively.`````

### `````Using Server Crons Only`````

`````If you aren’t distributing your code or don’t mind telling your users that they have to set up server-side cron jobs, you don’t need to schedule your cron events in WordPress at all. You can just schedule a server-side cron job that calls a special URL to kick off your callback function. This is especially useful if you need to have more control over what times of day your crons run or otherwise just feel more comfortable managing your cron jobs in Unix instead of WordPress.`````

The information on scheduling server-side cron jobs in this section can be used to replace WP-Cron for recurring events. Single events set using `wp_schedule_single_event()` will need to be handled using WP-Cron still or some other mechanism.

If we were running our Monday cron job from earlier, we would update the code in WordPress:

```
//run on Mondays
function sp_monday_cron()
{
        //check that cron param was passed in
        if(empty($_REQUEST['sp_cron_monday']))
                return false;

        //execute this code on Mondays
}
add_action("init", "sp_monday_cron");
```

And your cron job entry would look like this:

    0 0 * * 1 wget -O - -q -t 1 http://yoursite.com/?sp_cron_monday=1

Again, make sure that the URL to `?sp_cron_monday=1` is excluded from any caching mechanisms you may have installed on your site.

## WP Mail

``````The `wp_mail()` function is a replacement for PHP’s built-in `mail()` function. It looks like this:``````

```````wp_mail($to, $subject, $message, $headers, $attachments)```````

`````and its attributes are:`````

* `````$to—A single email address, comma-separated list of email addresses, or array of email addresses the email will be sent to (using the “To:” field).`````
* `````$subject—The subject of the email.`````
* `````$message—The body of the email. By default, the email is sent as a plain-text message and should not include HTML. However, if you change the content type (see the following example), you should include HTML in your message.`````
* `````$headers—Optional array of mail headers to send with the message. This can be used to add CCs, BCCs, and other advanced mail headers.`````
* `````$attachments—A single filename or array of filenames to be attached to the outgoing email.`````

``````There are two major improvements `wp_mail()` makes over `mail()`.``````

1.  ``````The `wp_mail()` function is hookable. The `wp_mail` filter will pass an array of all of the parameters passed into the `wp_mail()` function for you to filter. You can also filter the sending address using the `wp_mail_from` and `wp_mail_from_name` filters.``````
2.  ``````The `wp_mail()` function can be passed a single filename or array of filenames in the `$attachments` parameters, which will be attached to the outgoing email. Attaching files to emails is very complicated, but `wp_mail()` makes it easy by wrapping around the PHPMailer class, which itself wraps around the default PHP `mail()` function.``````

### `````Sending Nicer Emails with WordPress`````

``````By default, emails sent through the `wp_mail()` function are sent from the admin email address set on the General Settings page of the admin dashboard, with “WordPress” used as the name. This is not ideal. You can change these values using the `wp_mail_from` and `wp_mail_from_name` filters.``````

``````Also by default, emails are sent using plain text. You can use the `wp_mail_content_type` filter to send your emails using HTML.``````

``````Finally, it is nice to add a styled header and footer to all of your outgoing emails. This can be done by filtering the email message using the `wp_email` filter.``````

`````The following code combines these techniques to pretty up the emails being sent by your WordPress app:`````

```
//Update from email and name
function sp_wp_mail_from($from_email)
{
  return 'info@schoolpress.me';
}
function sp_wp_mail_from_name($from_name)
{
  return 'SchoolPress';
}
add_filter('wp_mail_from', 'sp_wp_mail_from');
add_filter('wp_mail_from_name', 'sp_wp_mail_from_name');

//send HTML emails instead of plain text
function sp_wp_mail_content_type( $content_type )
{
  if( $content_type == 'text/plain')
  {
    $content_type = 'text/html';
  }
  return $content_type;
}
add_filter('wp_mail_content_type', 'sp_wp_mail_content_type');

//add a header and footer from files in the active theme
function sp_wp_mail_header_footer($email)
{
  //get header
  $headerfile = get_stylesheet_directory() . "email_header.html";
  if(file_exists($headerfile))
    $header = file_get_contents($headerfile);
  else
    $header = "";

  //get footer
  $footerfile = get_stylesheet_directory() . "email_footer.html";
  if(file_exists($footerfile))
    $footer = file_get_contents($footerfile);
  else
    $footer = "";

  //update message
  $email['message'] = $header . $email['message'] . $footer;

  return $email;
}
add_filter('wp_mail', 'sp_wp_mail_header_footer');
```

Sending emails from your server can present interesting network problems. Running a local SMTP server for sending emails can be time-consuming on top of the work of running a web server. Deliverability of your emails can be affected by spam filters that haven’t whitelisted your apps IP range. The [Configure SMTP](http://bit.ly/config-smtp) plugin can be used to send your outgoing email through an external SMTP server like a Google Apps account. Services like Mandril and Sendgrid, each with their own WordPress plugin, also offer ways to send email from their trusted servers with additional tracking of open and bounce rates.

## File Header API

``````The comment block at the top of the main theme and plugin files are often referred to as headers. The File Header API consists of three functions, `get_plugin_data()`, `wp_get_theme()`, and `get_file_data()`, which allow you to parse these comment blocks.``````

`````As a reminder, here is what a plugin’s file header may look like:`````

```
/*
Plugin Name: Paid Memberships Pro
Plugin URI: http://www.paidmembershipspro.com
Description: Plugin to Handle Memberships
Version: 1.7.3.2
Author: Stranger Studios
Author URI: http://www.strangerstudios.com
*/
```

``````You can pull this data into an array by calling the `get_plugin_data()` function:``````

```````get_plugin_data($plugin_file, $markup = true, $translate = true)```````

`````Its attributes are:`````

* `````$plugin_file—The absolute path to the main plugin file where the header will be parsed.`````
* ``````$markup—A flag, which if set to `true`, will apply HTML markup to some of the header values. For example, the plugin URI will be turned into a link.``````
* ``````$translate—A flag, which if set to `true`, will translate the header values using the current locale and text domain.``````

``````The following code loops through the plugins directory and will show data for _most_ of the plugins there. It actually takes quite a bit of logic to find all plugins in all formats. For that you can use the `get_plugins()` function, which will return an array of all plugins or take a look at the code for that function found in _wp-admin/includes/plugin.php_. More information on `get_plugins()` can be found in the [WordPress Codex](http://bit.ly/funct-ref):``````

```
//must include this file
require_once(ABSPATH . "wp-admin/includes/plugin.php");

//remember current directory
$cwd = getcwd();

//switch to themes directory
$plugins_dir = ABSPATH . "wp-content/plugins";
chdir($plugins_dir);

echo "<pre>";

//loop through theme directories and print theme info
foreach(glob("*", GLOB_ONLYDIR) as $dir)
{
        $plugin = get_plugin_data($plugins_dir .
        "/" . $dir . "/" . $dir . ".php", false, false);
        print_r($plugin);
}

echo "</pre>";

//switch back to current directory just in case
chdir($cwd);
```

``````Similarly, you can use `wp_get_theme()` to get information out of a theme’s file header:``````

```````wp_get_theme($stylesheet, $theme_root)```````

`````Its attributes are:`````

* `````$stylesheet—The name of the directory for the theme. If not set, this parameter will be the current theme’s directory.`````
* ``````$theme_root—The absolute path to the theme’s root folder. If not set, the value returned by `get_raw_theme_root()` is used.``````

``````The following code loops through the themes directory and will show data for _most_ of the themes there. It actually takes quite a bit of logic to find all themes. For that you can use the `wp_get_themes()` function, which will return an array of all `WP_Theme` objects or take a look at the code for that function found in _wp-includes/theme.php_. More information on `wp_get_themes()` can be found in the [WordPress Codex](http://bit.ly/wp-get-theme):``````

```
//remember current directory
$cwd = getcwd();

//switch to themes directory
$themes_dir = dirname(get_template_directory());
chdir($themes_dir);

echo "<pre>";

//loop through theme directories and print theme info
foreach(glob("*", GLOB_ONLYDIR) as $dir)
{
        $theme = wp_get_theme($dir);
        print_r($theme);
}

echo "</pre>";

//switch back to current directory just in case
chdir($cwd);
```

### `````Adding File Headers to Your Own Files`````

``````Both the `get_plugin_info()` and `wp_get_theme()` functions make use of the `get_file_data()` function. You can access the `get_file_data()` function directly to pull file headers out any file. This can help you to create your own drop-ins or sub-plugins (often referred to as modules or add-ons) for your plugins.``````

```````get_file_data($file, $default_headers, $context = "")` has the following attributes:``````

* `````$file—The full path and filename of the file to pull data from.`````
* `````$default_headers—An array of the header fields to look for. The keys of the array should be the header names, and the values of the array should be regex expressions for parsing the label that comes before the “:” in the comment. You can usually just enter the header name as the regex as well.`````
* ``````$context—A label to differentiate between different kinds of headers. This parameter determines which `extra_{context}_headers` filter is applied to the default headers passed in:``````

```
//set headers for our files
$default_headers = array(
        "Title" => "Title",
        "Slug" => "Slug",
        "Version" => "Version"
);

//remember current directory
$cwd = getcwd();

//change to reports directory
$reports_dir = dirname(__FILE__) . "/reports";
chdir($reports_dir);

echo "<pre>";

//loop through .php files in reports directory
foreach (glob("*.php") as $filename)
{
        $data = get_file_data($filename, $default_headers, "report");
        print_r($data);
}

echo "</pre>";

//change back to the current directory in case someone expects the default
chdir($cwd);
```

### Adding New Headers to Plugins and Themes

```
<?php
/*
Plugin Name: Stop Plugin Updates
Plugin URI: http://bwawwp.com/plugins/stop-plugin-updates/
Description: "Allow Updates: No" i a plugin's header keeps it from updating.
Version: .1
Author: Stranger Studios
Author URI: http://www.strangerstudios.com
*/

//add AllowUpdates header to plugin
function spu_extra_plugin_headers( $headers ) {
    $headers['AllowUpdates'] = "Allow Updates";
        return $headers;
}
add_filter( "extra_plugin_headers", "spu_extra_plugin_headers" );

/*
        loop through plugins
        check if updates are disallowed and if so remove it from list
*/
function spu_pre_set_site_transient_update_plugins( $update_plugins ) {
  //see if there are any plugins needing updates
  if ( !empty( $update_plugins ) && !empty( $update_plugins->response ) ) {
    //loop through plugins
    $new_plugins = array();
    foreach ( $update_plugins->response as $pluginpath => $plugin ) {
        //check if the plugin is allowed or not
        $plugin_data = ABSPATH . '/wp-content/plugins/' . $pluginpath;
        $plugin_data = get_plugin_data( $plugin_data );
        if ( strtolower( $plugin_data['Allow Updates'] ) == "no" ||
          strtolower( $plugin_data['Allow Updates'] ) == "false" ) {
          //change checked version and don't add to the new response
          $update_plugins->checked[$pluginpath] = $plugin_data['Version'];
        }
        else {
                //not blocked. add plugin to new response
                $new_plugins[$pluginpath] = $plugin;
        }
    }
    $update_plugins->response = $new_plugins;
  }

return $update_plugins;
}
add_action(
        'pre_set_site_transient_update_plugins',
        'spu_pre_set_site_transient_update_plugins'
);
?>
```

It adds an `Allow Updates` header to plugins. If this header is found and the value is `no` or `false`, then that plugin will not be flagged to update.
## Tutorial

- [Smashing Magazine – For Professional Web Designers and Developers](http://www.smashingmagazine.com/)