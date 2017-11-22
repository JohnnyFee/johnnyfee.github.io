layout: post
title: "WordPress Security"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

## Security Basics

These are the simplest but most important security tips to consider. Pay attention here because it could save you a lot of time, money, and upset visitors/members.

### Update Frequently

The first and most important security tip is to always make sure you upgrade to the most recent version of WordPress as soon as a new version becomes available and also always update any plugins/themes that you have installed on your site. Many of the updates that are pushed out involve security updates; therefore, it is always important to upgrade your software in order to stay up to date and safe.

<!-- more -->

### Don’t Use the Username “admin”

Another important item to take care of is making sure not to use “admin” as one of your user accounts. Many bots will automatically try to login to your site with the username “admin.” Knowing that most people don’t change this account is half the battle; all they really need to focus on is guessing the password. When installing WordPress, the default username will be “admin” unless you specifically change it, and you SHOULD specifically change it! If you are already using WordPress and are using the username “admin,” you should create a new user account with an administrator role, login with that new user, and delete the default admin account. _Make sure to change any posts or pages created by your admin account to this new account._

### Use a Strong Password

Choosing a secure password is also very important, especially for your administrator accounts. Don’t use one word or one name. Jumble your password up and make it not connected to you personally.

Make sure your password is a combination of upper- and lowercase letters as well as numbers and special characters. A good password should also be at least 10 characters long; the more characters you use, the stronger your password will be. If you are having trouble coming up with one yourself, just mash on your keyboard a bit or use a service like [Random.org](http://www.random.org/passwords/). Make sure you memorize it or copy it somewhere and secure it properly. WordPress will tell you if you are using a strong password; please take this into consideration.

### Examples of Bad Passwords

* password
* password123
* pa55w0rd
* 123456789
* qwerty
* batman
* mustang
* letmein

Using any variation of password or single words, numbers, or names is a bad idea:

* usmarine (I was in the Marines)
* brianmessenlehner (my first and last name)
* brian&robin91011 (my name, my wife’s name, and our anniversary)
* Dalya-Brian (my daughter’s name and my son’s name)
* ThaiShortiMaxx (my pets)
* IAMAWESOME! (everybody knows this, so it could be easy to guess)

Anybody that knows anything about me and my family could potentially guess passwords like these.

### Examples of Good Passwords

* U$s(#8H27@!
* !lik32EaTF1$h&CHIp5
* \#Uk@nN0tBr3akTh1s$h1t!!!
* _[0mG-LoL-R0Fl-T0T3$CraY]_!

It can be a pain in the neck and take an extra second or two entering in a good password but it’s well worth it if it can prevent your website/application from getting hacked.

## Hardening Your WordPress Install

Let’s go over a few techniques for making it harder for your application to hacked.

### Don’t Allow Admins to Edit Plugins or Themes

By default, WordPress allows administrators to edit the source code of any plugin or theme directly in the web browser. You should disable this functionality so just in case a hacker is able to login to one of your admin accounts, he can’t add any malicious code via the admin user interface for editing code. To disable this functionality, add this code to your _wp-config.php_ file:

```
<?php
define( 'DISALLOW_FILE_EDIT', true );
?>
```

### Change Default Database Tables Prefix

The standard WordPress install uses `wp_` as a prefix for all tables in the database. By simply changing this prefix to something else, you will make your site a lot less vulnerable to hackers who attempt SQL injections and assume that you are using the generic `wp_` prefix. On a brand new WordPress install, you will have the option to use any table prefix you want; you should change the default `wp_` prefix to something custom.

If you would like to do this on a WordPress site that is already up and running, you can follow these steps:

1.  Make a database backup just in case you mess this up!
2.  Open _wp-config.php_ and change

    `$table_prefix = 'wp_';`

    to

    `$table_prefix = 'anyprefix_';`

3.  Update the existing table names in your database to include your new prefix with the following SQL commands using phpMyAdmin or any SQL client such as MySQL Workbench:

        rename table wp_commentmeta to anyprefix_commentmeta;
        rename table wp_comments to anyprefix_comments;
        rename table wp_links to anyprefix_links;
        rename table wp_options to anyprefix_options;
        rename table wp_postmeta to anyprefix_postmeta;
        rename table wp_posts to anyprefix_posts;
        rename table wp_terms to anyprefix_terms;
        rename table wp_term_relationships to anyprefix_term_relationships;
        rename table wp_term_taxonomy to anyprefix_term_taxonomy;
        rename table wp_usermeta to anyprefix_usermeta;
        rename table wp_users to anyprefix_users;


    You will have to run a similar rename SQL query for any custom tables added by your app or plugins you are using.

Using SQL commands or a SQL client update any instance of `wp_` in the `prefix_options` and `anyprefix_usermeta` tables and change any values like `wp_` to `prefix_`:

```
update anyprefix_options set option_name = replace(
option_name,'wp_','anyprefix_');
update anyprefix_usermeta set meta_key = replace(
meta_key,'wp_','anyprefix_');
```

Test out your site and make sure everything is working as it should.

If you don’t feel comfortable manually making these changes, there are some plugins that can change your table prefix for you:

* [Change Table Prefix](http://bit.ly/change-tp)
* [Change DB Prefix](http://bit.ly/change-db)

### Move wp-config.php

The WordPress _wp-config.php_ file stores valuable information like your database location, username, and password and your WordPress authentication keys. Since these values are stored in PHP variables and they are not displayed to the browser, it is not likely that anybody could gain access to this data, but it could happen. You can move _wp-config.php_ to one level above your WordPress install, which in most cases should be a nonpublic directory. WordPress will automatically look one level up for _wp-config.php_ if it doesn’t find it in your root directory. For example, move _/username/public_html/wp-config.php_ to _/username/wp-config.php_.

You can also store _wp-config.php_ as any filename in any directory location. To do this, make a copy of _wp-config.php_, name the copy whatever you want, and move it to any directory above your root install of WordPress. In your original _wp-config.php_ file, remove all of the code and add an include to the relative path and filename of the copy you made. For example, copy _/username/public_html/wp-config.php_ to _/username/someotherfolder/stuff.php_. Change the code in _wp-config.php_ to `include(‘/username/someotherfolder/stuff.php’);`

### Hide Login Error Messages

Normally when trying to login in to your site, WordPress will display a message if you have put in the wrong username or password. Unfortunately this lets hackers know exactly what they are doing wrong or right when attempting to access your site.

Luckily there is a simple fix for this, which is to add a line of code into your theme _functions.php_ file or in a custom plugin which will hide or alter those messages:

```
<?php
add_filter( 'login_errors',
create_function(
 '$a', '"Invalid username or
password.";'
) );
?>
```

### Hide Your WordPress Version

A lot of bots will scour the Internet in search of WordPress sites to target specifically by the version of WordPress they are running. They are looking for sites with known vulnerabilities they can exploit. By default, WordPress displays the following code within the `<head></head>` of every page:

    <meta name="generator" content="WordPress 3.8.1" />

You can easily hide the version of WordPress you are using by implementing the following code:

```
<?php
add_filter( 'the_generator', '__return_null' );
?>
```

### Don’t Allow Logins via wp-login.php

Some bots are smarter than others.`` We just talked about hiding your WordPress version from some bots, but sometimes just knowing that you are using WordPress is all a bot may be looking for, and this is pretty easy if it sends a POST request to _wp-login.php_. Once a bot realizes _wp-login.php_ exists, it can then begin to try to login to your site.

We like to redirect _wp-login.php_ to the homepage, which prevents bots from specifically trying to login via _wp-login.php_. Follow these steps to make an alternative login page and hide the default _wp-login.php_ login page:

1.  Add the following rewrite rule to your _.htaccess_ file:

    RewriteRule ^new-login$ wp-login.php

    Note that `new-login` will be the URL you can use to actually log in to _wp-admin_; you can change this to whatever you want.

2.  In your theme _functions.php_ file or in a custom plugin, add this code:

        <?php
        function schoolpress_wp_login_filter( $url, $path, $orig_scheme ) {
            $old = array( "/(wp-login\.php)/" );
            $new = array( "new-login" );
                return preg_replace( $old, $new, $url, 1 );
        }
        add_filter( 'site_url', 'schoolpress_wp_login_filter', 10, 3 );

        function schoolpress_wp_login_redirect() {
                if ( strpos( $_SERVER["REQUEST_URI"], 'new-login' ) === false ) {
                        wp_redirect( site_url() );
                        exit();
                }
        }
        add_action( 'login_init', 'schoolpress_wp_login_redirect' );
        ?>
If you don’t want to write any custom code, you can use ``the following plugins to achieve similar results:

* [iThemes security](http://bit.ly/ithemes-sec)
* [WP Admin](http://bit.ly/lockdown-wp)

### Add Custom .htaccess Rules for Locking Down wp-admin

If you are the only user that needs to log in to the backend of your application, or if you only have a handful of backend users, you can restrict access to the backend by certain IP addresses. Create a new _.htaccess_ file in the _wp-admin_ directory of your WordPress install and add the following code, replacing `127.0.0.1` with your actual external IP address. Go to _http://ipchicken.com/_ if you are not sure of your external IP address:

    order deny,allow
    allow from 127.0.0.1 #(repeat this line for multiple IP addresses)
    deny from all

If you suspect that certain IP addresses hitting your application are bots or malicious users, you can block them by their IP addresses with the following code:

    order allow,deny
    deny from 127.0.0.1 #(repeat this line for multiple IP addresses)
    allow from all

If people really want to get around their banned IP address, they will use a proxy server.

If you think your IP address of you or your backend users may change often or you have way too many backend users to manage all of their IP addresses, you can add a separate username and password to access the _wp-admin_ directory. This adds a nice second layer of authentication because all of your backend users will be required to enter an htaccess username and password and their standard WordPress username and password:

    AuthType Basic
    AuthName "restricted area"
    AuthUserFile /path/to/protected/dir/.htpasswd
    require valid-user

Notice the `AuthUserFile` line; you will need to create a _.htpasswd_ file somewhere in a directory above or outside of your WordPress install. In this file, you will need to add a username and password. The password can’t just be plain text; use a tool like [Best Random Password Generator 2017](https://www.vpnmentor.com/tools/secure-password-generator/) to create an encrypted password.

So the password for is like  `KxXpQNhgQ4`

Add the entire encrypted string `letmein:E5Dj7cUaQVcN.` to your _.htpasswd_ file; and when users try to go to _/wp-admin_, they will be prompted for a username and password. Make sure to let your backend users know what this username and password is and tell them not to share it with anybody.

## Backup Everything!

It is important to make regularly scheduled backups of your site’s content (your database) as well as the _wp-content_ folder. This makes it much easier to restore your site in the event that it does fall victim to a hacker. We recommend scheduling a backup at the very least once a week; but depending upon how much new content you are adding, you may feel that you need to increase or decrease the frequency. Of course a daily backup is always the best choice.

## Scan Scan Scan!

Scanning or monitoring your application is essential to know if you have been attacked. If your application ever gets hacked, it is important to know right away so you can immediately address the issue.

Be proactive about protecting your web application against malware. There are several services that will scan your web applications for you so you can take a more hands-off approach. We recommend using [Sucuri](http://sucuri.net/). Not only will Sucuri find malware and alert you if your application has been infected, but it will also clean it up for you. Tony Perez, the COO of Sucuri, is also a former US Marine and a martial arts master, so why wouldn’t you want Sucuri to have your back? Sucuri also has a great [security plugin](http://bit.ly/sucuri-plugin) for WordPress.

## Useful Security Plugins

Below are some very useful and powerful WordPress plugins that will help you increase security for your application and also help you to recover quickly if you to fall victim to a malicious attack.

### Spam-Blocking Plugins

#### Akismet

This plugin is used to block comment spam from getting through to your site. It was developed by Automattic, also the creators of WordPress, and therefore comes standard with any new WordPress install. Although the plugin will be installed on your site, you will need to activate it by registering for an API key at [Akismit.com](https://akismet.com/). An API key is free if your site is for personal use; however, there is a small charge for business websites. The way Akismet works is each time a comment is posted to your site, Akismet will run it through a series of tests to ensure it is a real comment, and if it is identified as spam, it is automatically moved to the spam folder in your dashboard. This saves you tons of time from having to sort through all of your comments and determine which ones are spam or legitimate comments.

#### Bad Behavior

[This plugin](http://bit.ly/bad-behavior) works to block link spam from your site and functions best when run in conjunction with another spam service. It works to not only look at the content of the spam, but also looks at the method through which the spam is being delivered by the spammer and the software being used, and blocks that as well.

### Backup Plugins

Backups are very helpful to have in the event that your site is compromised. Here are a few popular backup plugins.

#### Backup Buddy

[This plugin](http://bit.ly/backup-b) works to make backups of all of the content on your WordPress site for safekeeping, restoring, or moving your site. Backups can be scheduled on a recurring basis and the file can then be downloaded to your computer, emailed to you, or sent off to the storage location of your choice such as Dropbox or an FTP server. This plugin also features a restore option that will easily restore your themes, widgets, and plugins. Backup Buddy also allows you to easily move your site to a new server or domain right from the WordPress dashboard, which comes in handy if you work on a dev server and then move the sites over to a production environment upon launch.

#### VaultPress

[VaultPress](http://vaultpress.com/) is another plugin created by the team at Automattic and offers users the opportunity to have all of their site content backed up in real time on cloud servers. Once installed, this plugin will automatically detect any changes to the content on your site as well as site settings and then update the backup copy with those changes. The plugin also features a one-click database restore in the event that your site ever becomes compromised. This is a premium plugin, meaning there is a fee for service, and different levels are offered. The premium version of the plugin also includes a daily security scan of your site to detect any issues as well as fixes for those issues.

### Scanner Plugins

#### WP Security Scan

This is a [free plugin](http://bit.ly/acunetix-wp) that will perform a scan of your site and detect any areas of vulnerability in your site’s security. It will then suggest fixes for any of the issues it finds. One of the important security issues this plugin helps with is changing your database table prefix, which can be tricky if you are not that familiar with the standard WordPress database structure. It also helps you to hide which version of WordPress you are using, which is information that hackers look for to use against you when attacking your site. This plugin was developed by WebsiteDefender.com, which also offers a [service to monitor your website for potential security threats, including malware and hacker activity](http://bit.ly/acunetix-sec).

#### Exploit Scanner

[This plugin](http://bit.ly/exploit-scan) will scan through all the files on your site and then alert you if it comes across anything that looks like it could be a potential threat.

#### BBQ

[Block Bad Queries](http://bit.ly/bbq-wp) works as a type of firewall for your site by scanning all incoming traffic and then blocking all kinds of different malicious requests.

#### Antivirus-Once

Once [this plugin](http://bit.ly/antivirus-wp) is installed and activated, it will run a daily scan on your theme template files and database tables and alert you of any potential problems with email notifications. It will also add a message into the WordPress admin bar to alert you of any viruses.

### Login and Password-Protection Plugins

#### Limit Login Attempts

This is a [great plugin](http://bit.ly/limit-login) to fight against brute-force attacks like someone running an automated script that will try to login to WordPress using random combinations of words. By default, WordPress will allow an unlimited amount of login attempts. This plugin limits the number of login attempts. If someone tries _x_ times to log in and fails each time, she will be blocked from attempting to log in again for a set amount of time.

#### Ask Apache Password Protect

[This plugin](http://bit.ly/ask-apache) is different from other WordPress security plugins in that it works at the network level to prevent attacks rather than at the site level. You choose a unique username and password that then protect your login page and entire _wp-admin_ folder. This plugin does require the use of an Apache web server and web host support for _.htaccess_ files.

## Writing Secure Code

You want to make sure any custom code you write is secure and isn’t hackable. If you take notice and apply the following methods, you should be in pretty good shape against attacks.

### Check User Capabilities

Each of your users has unique standard or custom roles and capabilities. If you are writing some code that provides custom functionality for your application’s administrators, then make sure to give administrators and only administrators access to it. There are a few built-in WordPress functions for telling you if a user has certain roles or capabilities. All of these functions are located in _wp-includes/capabilities.php_ and return a boolean of whether the user has the passed-in role name or capability. You can pass in any default or custom-made roles or capabilities.

#### user_can( $user, $capability )

Whether a particular user has a particular role or capability.

* $user—A required integer of a user ID or an object of the user.
* $capability—A required string of the capability or role name.

#### current_user_can( $capability )

Whether the current user has a particular role or capability.

* $capability—A required string of the capability or role name.

#### current_user_can_for_blog( $blog_id, $capability )

Whether the current user has a particular role or capability for a particular site on a multisite network.

* $user—A required integer of a blog ID.
* $capability—A required string of the capability or role name.

In the following code, we don’t want to let ordinary users into the backend of our application. We want them to only interact with the custom UI we created within the theme on the frontend so we will redirect anybody that is not an administrator and may wander to _/wp-admin_ back to the frontend:

```
<?php
function schoolpress_admin_check() {
        global $user_ID;
        if ( !user_can( $user_ID, 'administrator' ) )
                wp_redirect( site_url() );
}
add_action( 'admin_init', 'schoolpress_admin_check' );
?>
```

### Custom SQL Statements

Sometimes the built-in WordPress functions that interact with the database may not be enough for your needs, and depending on what you are building, you may want to write custom SQL statements. When writing your own SQL statements, you need to make sure they are written in a way that will not allow for any potential SQL injections. First of all, always use the `$wpdb` object and make sure to escape and prepare all custom SQL statements.

As we talked about in [Chapter 3](ch03.html "Chapter 3. Leveraging WordPress Plugins"), the `$wpdb` object can be used to access any standard or custom tables in your WordPress database and provides easy-to-use methods for doing so. One very important thing to remember is that when writing custom queries with any dynamic values being passed in, you need to use the `esc_sql()` function or the `prepare()` method to sanitize and escape those dynamic values. By sanitizing and escaping dynamic values, you are making sure those values are not made up of invalid characters and are not any malicious SQL code that can hijack your query (SQL injections).

The `esc_sql()` and `$wpdb->prepare()` functions are covered in detail in [Chapter 3](ch03.html "Chapter 3. Leveraging WordPress Plugins").

### Data Validation, Sanitization, and Escaping

DO NOT TRUST YOUR USERS! Again, DO NOT TRUST YOUR USERS! Don’t be that web application, website, or blog that spreads malware.

Validate, sanitize, and escape every piece of data going into and coming out of your database. You want to make sure that the data your users are submitting to your database is in the format it should be in; the database doesn’t care what the data is as long as the data being submitted is of the same datatype.

For example, let’s say you have a custom form used to collect user data with a textbox for date of birth. You plan on storing the DOB as user meta in the `meta_value` column of the `wp_usermeta` table. The `meta_value` column has a datatype of `longtext`, meaning the value can be super duper long<sup>[</sup>22] and the database isn’t going to care what value you store there. It’s up to you as the developer to make sure the data being stored as DOB is a date and nothing else.

So what exactly is the difference between validation, sanitization, and escaping?

* _Validating_ is the process of making sure the data received from the end user is in the correct format you expect it to be in. You want to validate data before saving it into the database.
* _Sanitizing_ is the process of cleaning data received from the end user before saving it to the database.
* _Escaping_ is the process of cleaning data you may already have before displaying it to the end user.

Now you know!

You want to validate and sanitize data before putting it into your database. When pulling data out of your database, you want to sanitize it just to be safe in case somehow you are storing unsanitized data.

PHP has validation and sanitization functions, but WordPress has a bunch of helper functions built-in; and this is a book about WordPress, so let’s talk about some of those functions.

Most validation and sanitization helper functions are located in _wp-includes/formatting_.

#### esc_url( $url, $protocols = null, $_context = _display_ )

Checks and cleans a URL by checking if it has the proper protocol, stripping invalid characters and encoding special characters. Use this if displaying a URL to an end user:

* $url—A required string of the URL that needs to be cleaned.
* $protocols—An optional array of whitelisted protocols. Defaults to `array( http, https, ftp, ftps, mailto, news, irc, gopher, nntp, feed, telnet, mms, rtsp, svn )` if not specifically set.
* $context—An optional string of how the URL is being used. Defaults to `display`, which sends the URL through `wp_kses_normalize_entities()` and replaces `&amp` with `&#038;` and `‘` with `&#039;`.

#### esc_url_raw( $url, $protocols = null )

This function calls the `esc_url()` function but passes `db` as the value for the `$_context` parameter. Do not use this function for displaying URLs to the end user; only use it in database queries.

#### esc_html( $text )

Escape HTML blocks in any content. This function is a nice little wrapper for the `_wp_specialchars()` function which, basically converts a number of special characters into their HTML entities:

* $text—A required string of the text you want to escape HTML tags on.

#### esc_js( $text )

Escapes strings in inline JavaScript. Escaped strings need to be wrapped in single quotes for this to work:

* $text—A required string of the text you want to escape single quotes, HTML special characters ( " < > & ), and fix line endings on.

#### esc_attr( $text )

Escapes HTML attributes and encodes such characters as <, >, &,”, and ‘. This is important to use when including values in form input elements such as ID, name, alt, title, and value:

* $text—A required string of the text you want to escape HTML attributes on.

#### esc_textarea( $text )

Escaping for `textarea` values. Encodes text for use inside a `<textarea>` element:

* $text—A required string of the text you want to escape HTML on.

#### sanitize_option( $option, $value )

This function can be used to sanitize the value of any predefined WordPress option. Depending on what option is being used, the value will be sanitized via various functions:

* $option—A required string of the name of the option.
* $value—A required string of the unsanitized option value you wish to sanitize.

#### sanitize_text_field($str)

Sanitizes any string input by a user or pulled from the database. Checks for invalid UTF-8; converts single < characters to entity; strips all tags; removes line breaks, tabs, and extra white space; and strips octets:

* $str—The required string you want to sanitize.

#### sanitize_user( $username, $strict = false )

This function cleans a username of any illegal characters:

* $username—A required string of the username to be sanitized.
* $strict—An optional boolean that if set to `true` will limit the username to specific characters.

#### sanitize_title( $title, $fallback_title = '' )

Sanitizes a title stripping out any HTML or PHP tags, or returns a fallback title for a provided string:

* $title—A required string of the title to be sanitized.
* $fallback_title—An optional string to use if the title is empty.

#### sanitize_email( $email )

Sanitizes an email address by stripping out any characters not allowed in an email address:

* $email—The email address to be sanitized.

#### sanitize_file_name( $filename )

Sanitizes a filename, replacing whitespace with dashes. Removes special characters that are illegal in filenames on certain operating systems and special characters requiring special escaping to manipulate at the command line. Replaces spaces and consecutive dashes with a single dash. Trims period, dash, and underscore from beginning and end of filename:

* $filename—Required string of the file name to be sanitized.

#### wp_kses( $string, $allowed_html, $allowed_protocols = array () )

This function makes sure that only the allowed HTML element names, attribute names, and attribute values plus only sane HTML entities will occur in the string you provide. You have to remove any slashes from PHP’s magic quotes before you call this function:

* $string—A required string that you want filtered through kses.
* $allowed_html—A required array of allowed HTML elements.
* $allowed_protocols—An optional array of allowed protocols in any URLs in the string being filtered. The default allowed protocols are `http`, `https`, `ftp`, `mailto`, `news`, `irc`, `gopher`, `nntp`, `feed`, `telnet`, `mms`, `rtsp`, and `svn`. This covers all common link protocols, except for `javascript`, which should not be allowed for untrusted users.

The following code validates and sanitizes an email address:

```
<?php
// let's pretend that a user added an email address "brian @ webdevstudios.com"
$user_email = 'brian @ webdev$tudios.com';

// we can check if this is a valid email
$user_email = is_email( $user_email );

// we know it's not because it's set to nothing from is_email()
if ( ! $user_email )
        echo 'invalid email<br>';

// let's try again with sanitizing the email
$user_email = 'brian @ webdev$tudios.com';

// use sanitize_email() to try to fix any invalid email
$user_email = sanitize_email( $user_email );

$user_email = is_email( $user_email );

if ( ! $user_email )
        echo 'invalid email<br>';
else
        echo 'valid email: ' . $user_email;
?>
```

### Nonces

Nonce stands for “number used once,”`` and using nonces is critical to protecting your application from CSRF (cross-site request forgery) attacks.

Normally your server-side scripts for form processing are processing forms from your own site. People visit your site, log in, and submit a form to perform some action on your site. However, if your server-side code were simply looking for `$_POST` values to determine what to do, those values could be submitted from _any_ form, even forms on other websites.

The first line of defense is to check that a user is really logged in and has the capabilities to do the requested action. However, this isn’t enough to stop CSRF attacks because you might be logged in on your WordPress site (e.g., in a background tab) while some malicious code on another site/tab kicks off the form request with the correct `$_POST` variable to send a spammy message to your friends or initiate account deletion or something else you don’t want to do.

What’s needed is a way to make sure that the request comes from the WordPress site and not another site. This is what a nonce does. The basic outline of using a nonce is as follows:

1.  Generate a nonce string every time a page is loaded.
2.  Add the nonce string as a hidden element on the form.
3.  When processing a submitted form, generate the nonce the same way and check that it matches the one submitted from the form.

Because the nonce is generated using a combination of the secret salt keys in your _wp-config.php_ and the server time, it is very hard for attackers to guess the nonce string for their own forms.

Nonces are useful for nonform links and AJAX calls as well. The process is basically the same:

1.  Generate a nonce string every time a page is loaded.
2.  Add the nonce string as a parameter to the URL.
3.  When processing the request, generate the nonce the same way and check that it matches the one submitted through the URL.

Whether protecting your forms, links, or AJAX requests, WordPress has a few helper functions to make this process very easy to implement.

#### wp_create_nonce( $action = -1 )

This function creates a random token that can only be used once and is located in _wp-includes/pluggable.php_:

$action`—An optional string or int that describes what action is being taken for the nonce created. You should always set an action to be more secure:

```
<?php
function schoolpress_footer_create_nonce(){
        $nonce = wp_create_nonce('random_nonce_action');
        $url = add_query_arg( array( 'sp_nonce' => $nonce ) );
        echo '<p><a href="' . $url . '">Verify this Nonce</a></p>';
}
add_action( 'wp_footer', 'schoolpress_footer_create_nonce' );
?>
```

#### wp_verify_nonce($nonce, $action = -1)

This function is used to verify that the correct nonce was used within the allocated time limit. If the correct nonce is passed into this function and everything checks out OK, then the function will return a value that evaluates to `true`. If not, it will return `false`. This function is located in _wp-includes/pluggable.php_:

* $nonce—A required string of the nonce value being used to verify.
* $action—An optional string or int that should be descriptive to what is taking place and should match the action from when the nonce was created.

```
<?php
function schoolpress_init_verify_nonce(){
  if ( isset( $_GET['sp_nonce'] )
    && wp_verify_nonce( $_GET['sp_nonce'], 'random_nonce_action' ) ) {
     echo 'You have a valid nonce!';
    } else {
     echo 'You have an invalid nonce!';
        }
}
add_action( 'init', 'schoolpress_init_verify_nonce' );
?>
```

#### check_admin_referer($action = -1, $query_arg = __wpnonce_)

This function calls the `wp_verify_nonce` function, so it verifies nonces but also checks to see that the referrer or the page that got you to the current page you are on is from the same website. This function is located in _wp-includes/pluggable.php_:

* $action—An optional string, but you should specify a nonce action to be verified.
* $query_arg—An optional string of the query argument that has the nonce as its value.

```
<?php
// checking the same nonce "sp_nonce" that was created earlier
function schoolpress_init_check_admin_referer(){
        if ( isset( $_GET['sp_nonce'] )
                && check_admin_referer( 'random_nonce_action', 'sp_nonce' ) ) {
                echo '<p>You have a valid nonce!</p>';
        } else {
                echo '<p>You have an invalid nonce!</p>';
        }
}
add_action( 'init', 'schoolpress_init_check_admin_referer' );
?>
```

#### wp_nonce_url( $actionurl, $action = -1 )

This function also utilizes the `wp_create_nonce()` function and adds a nonce to any URL. If you create any actions based off of a query string, you should always tie a nonce to your URL with this function:

* $actionurl—A required string of the URL to add a nonce action to.
* $action—An optional string for the action name. You should always set this.

This function is located in _wp-includes/functions.php_:

```
<?php
// simple url with querystring example
function schoolpress_footer_nonce_url(){
        $url = wp_nonce_url(
                add_query_arg( array( 'action' => 'get_users' ) ),
                'get_users_nonce'
        );
        echo '<p><a href="' . $url . '">Get Users</a></p>';
}
add_action( 'wp_footer', 'schoolpress_footer_nonce_url' );

// querystring action
function schoolpress_footer_nonce_url_action(){
        // check if querystring action is get_users and for the nonce
        if ( isset( $_GET['action'] )
                && 'get_users' == $_GET['action']
                && check_admin_referer( 'get_users_nonce' ) ) {
                echo 'Your action: ' . $_GET['action'];
                // or get your users and display them here...
        }
}
add_action( 'init', 'schoolpress_footer_nonce_url_action' );
?>
```

#### wp_nonce_field( $action = -1, $name = “_wpnonce”, $referer = true , $echo = true )

This function retrieves or displays a hidden nonce field in a form. It has the `wp_create_nonce()` function baked into it, so you should always use this nice helper function when dealing with forms.

The nonce field is used to validate that the contents of the form came from the location on the current site and not somewhere else. The nonce does not offer absolute protection, but should protect against most cases. It is very important to use a nonce field in forms.

The `$action` and `$name` parameters are optional, but if you want to have better security, it is strongly suggested to set those two parameters. It is easier to just call the function without any parameters, because validation of the nonce doesn’t require any parameters, but since crackers know what the default is, it won’t be difficult for them to find a way around your nonce and cause damage.

The input name will be whatever `$name` value you gave. The input value will be the nonce creation value. This function is located in _wp-includes/functions.php_:

* $action—An optional string for the action name. You should always set this.
* $name—An optional string for the nonce name. You should always set this.
* $referer—An optional boolean of whether to set the referer field for validation. The default value is `true`.
* $echo—An optional boolean of whether to display or return a hidden form field. The default value is `true`.

```
<?php
// simple submission form example
function schoolpress_footer_form(){
        ?>
        <form method="post">
                <?php // create our nonce
                wp_nonce_field( 'email_list_form', 'email_list_form_nonce' );
                ?>
                <h3>Join our email list</h3>
                Email Address: <input type="text" name="email_address">
                <input type="submit" name="submit_email" value="Submit">
        </form>
        <?php
}
add_action( 'wp_footer', 'schoolpress_footer_form' );

// form action
function schoolpress_footer_form_action(){
        if ( isset( $_POST['submit_email'] )
                && isset( $_POST['email_address'] )
                && check_admin_referer( 'email_list_form',
                 'email_list_form_nonce' ) ) {
                echo 'You submitted: ' . $_POST['email_address'];
                // or process your form here...
        }
}
add_action( 'init', 'schoolpress_footer_form_action' );
?>
```

#### check_ajax_referer( $action = -1, $query_arg = false, $die = true )

When using AJAX, you should still be using nonces. This function allows you to do a nonce and referer check while processing an AJAX request. This function is located in _wp-includes/pluggable.php_:

* $action—An optional string of the nonce action being referenced.
* $query_arg—An optional string of where to look for nonce in `$_REQUEST`.
* $die—An optional boolean of whether you want to AJAX script to die if an invalid nonce is found.

Throughout the book, you may have noticed code snippets that didn’t use nonces or sanitize data. We did this to try to keep the code examples short and sweet, but you should _always_ use nonces and sanitize your data. Any custom form submission or URL with custom query strings should utilize nonces, and every time you write `$_POST['anything']` or `$_GET['anything']`, they should be wrapped in a sanitization or escaping function.

