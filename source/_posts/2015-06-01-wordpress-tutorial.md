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

## WordPress Database Structure

WordPress runs on top of a MySQL database and creates its own tables to store data and content. Below is the database schema created by a default install of WordPress. We have also included some basic information on built-in WordPress functions for interacting with these tables. If you can grasp the database (DB) schema and get comfortable with the list functions in this chapter, you can push and pull any data into and out of WordPress.

### wp_options

The `wp_options` table stores any sitewide data for you. This table stores the name, description, and admin email that you entered when running a typical install. This table will also come prepopulated with a few records that store the various default settings within WordPress. The following table shows the database structure for the `wp_options` table.

Column       | Type        | Collation       | Null | Default | Extra         
------------ | ----------- | --------------- | ---- | ------- | --------------
option_id    | bigint(20)  |                 | No   | None    | AUTO_INCREMENT
option_name  | varchar(64) | utf8_general_ci | No   |         |               
option_value | longtext    | utf8_general_ci | No   | None    |               
autoload     | varchar(20) | utf8_general_ci | No   | Yes     |               

The following functions can all be found in _/wp-includes/option.php_:

```php
<?php
// add option
$twitters = array( '@bwawwp', '@bmess', '@jason_coleman' );
add_option( 'bwawwp_twitter_accounts', $twitters );

// get option
$bwawwp_twitter_accounts = get_option( 'bwawwp_twitter_accounts' );
echo '<pre>';
print_r( $bwawwp_twitter_accounts );
echo '</pre>';

// update option
$twitters = array_merge(
         $twitters,
         array(
                 '@webdevstudios',
                 '@strangerstudios'
         )
);
update_option( 'bwawwp_twitter_accounts', $twitters );

// get option
$bwawwp_twitter_accounts = get_option( 'bwawwp_twitter_accounts' );
echo '<pre>';
print_r( $bwawwp_twitter_accounts );
echo '</pre>';

// delete option
delete_option( 'bwawwp_twitter_accounts' );


/*
The output from the above example should look something like this:
Array
(
    [0] => @bwawwp
    [1] => @bmess
    [2] => @jason_coleman
)
Array
(
    [0] => @bwawwp
    [1] => @bmess
    [2] => @jason_coleman
    [3] => @webdevstudios
    [4] => @strangerstudios
)
*/
?>
```

#### add_option( $option, $value = _', $deprecated = '_, $autoload = _yes_ )

First checks if an `option_name` exists before inserting a new row:

* $option—A required string of the `option_name` you would like to add.
* $value—An optional mixed variable of the `option_value` you would like to add. If the variable passed is an array or object, the value will be serialized before storing in the database.
* $deprecated—This parameter was deprecated in version 2.3 and is not used anymore.<sup>[</sup>6]
* $autoload—An optional Boolean used to distinguish whether to load the option into cache when WordPress starts up. Set to `yes` or `no`. The default value is `no`. This can save you a DB query if you are sure you are going to need this option on every page load.

#### update_option( $option, $newvalue )

Updates an existing option but will also add it if it doesn’t already exist:

* $option—A required string of the `option_name` you would like to update/add.
* $newvalue—An optional mixed variable of the `option_value` you would like to update/add.

#### get_option( $option, $default = false )

Retrieves the `option_value` for a provided `option_name`:

* $option—A required string of the `option_name` you would like to get.
* $default—An optional mixed variable you would like to return if the `option_name` you provided doesn’t exist in the table. By default, this parameter is false.

#### delete_option( $option )

Deletes an existing option from the database permanently:

* $option—A required string of the `option_name` you would like to delete.

### wp_users

When you log in to WordPress with your username and password, you are referencing data stored in this table. All users and their default data are stored in the wp_users table. The following shows the database structure for the wp_users table.

Column    | Type | Collation | Null | Default | Extra         
--------- | ------------ | ------ | ---- | ------ | -------
ID        | bigint(20)   |       | No   | None      | AUTO_INCREMENT
user_login| varchar(60)  | utf8_general_ci | No   | |     
user_pass | varchar(64)  | utf8_general_ci | No   | |     
user_nicename       | varchar(50)  | utf8_general_ci | No   | |     
user_email| varchar(100) | utf8_general_ci | No   | |     
user_url  | varchar(100) | utf8_general_ci | No   | |     
user_registered     | datetime     |       | No   | 0000-00-00 00:00:00 |     
user_activation_key | varchar(60)  | utf8_general_ci | No   | |     
user_status         | int(11)      |       | No   | 0         |     
display_name        | varchar(250) | utf8_general_ci | No   | |     

The following functions are found in _/wp-includes/pluggable.php_ and _/wp-includes/user.php_:

```
<?php
// insert user
$userdata = array(
    'user_login'    => 'brian',
        'user_pass'     => 'KO03gT7@n*',
        'user_nicename' => 'Brian',
        'user_url'      => 'http://webdevstudios.com/',
        'user_email'    => 'brian@schoolpress.me',
        'display_name'  => 'Brian',
        'nickname'      => 'Brian',
        'first_name'    => 'Brian',
        'last_name'     => 'Messenlehner',
        'description'   => 'This is a SchoolPress Administrator account.',
        'role'          => 'administrator'
);
wp_insert_user( $userdata );

// create users
wp_create_user( 'jason', 'YR529G%*v@', 'jason@schoolpress.me' );

// get user by login
$user = get_user_by( 'login', 'brian' );
echo 'email: ' . $user->user_email  . ' / ID: ' . $user->ID . '<br>';
echo 'Hi: ' . $user->first_name . ' ' . $user->last_name . '<br>';

// get user by email
$user = get_user_by( 'email', 'jason@schoolpress.me' );
echo 'username: ' . $user->user_login . ' / ID: ' . $user->ID . '<br>';

// update user - add first and last name to brian and change role to admin
$userdata = array(
        'ID'         => $user->ID,
        'first_name' => 'Jason',
        'last_name'  => 'Coleman',
        'user_url'   => 'http://strangerstudios.com/',
        'role'       => 'administrator'
);
wp_update_user( $userdata );

// get userdata for brian
$user = get_userdata( $user->ID );
echo 'Hi: ' . $user->first_name . ' ' . $user->last_name . '<br>';

// delete user - delete the original admin and set their posts to our new admin
// wp_delete_user( 1, $user->ID );

/*
The output from the above example should look something like this:
email: brian@schoolpress.me / ID: 2
Hi: Brian Messenlehner
username: jason / ID: 3
Hi: Jason Coleman
*/
?>
```

#### wp_insert_user( $userdata )

Inserts a new user into the database. This function can also be used to update a user if the user ID is passed in with the $user_data.  $userdata is a required array of field names and values. The accepted fields are:

* _ID_—An integer that will be used for updating an existing user.
* _user_pass_—A string that contains the plain-text password for the user.
* _user_login_—A string that contains the user’s username for logging in.
* _user_nicename_—A string that contains a URL-friendly name for the user. The default is the user’s username.
* _user_url_—A string containing the URL for the user’s website.
* _user_email_—A string containing the user’s email address.
* `_display_name_—A string that will be shown on the site. Defaults to the user’s
    username. It is likely that you will want to change this, for appearance.`
* _nickname_—The user’s nickname. Defaults to the user’s username.
* _first_name_—The user’s first name.
* _last_name_—The user’s last name.
* _description_—A string containing content about the user.
* _rich_editing_—A string for whether to enable the rich editor. `False` if not empty.
* _user_registered_—The date the user registered. Format is Y-m-d H:i:s.
* _role_—A string used to set the user’s role.
* _jabber_—User’s Jabber account.
* _aim_—User’s AOL IM account.
* _yim_—User’s Yahoo IM account.

#### wp_create_user( $username, $password, $email )

This function utilizes the prior function `wp_insert_user()` and makes it easier to add a new user based on the required columns:

* $username—A required string of the username/login of a new user.
* $password—A required string of the password of a new user.
* $email—A required string of the email address of a new user.

#### wp_update_user( $userdata )

This function can be used to update any of the fields in the `wp_users` and `wp_usermeta` (covered next) tables tied to a specific user. Note that if a user’s password is updated, all of his cookies will the cleared, logging him out of WordPress:

* $userdata—A required array of field names and values. The ID and at least one other field is required. These fields are the same ones accepted in the `wp_insert_post()` function.

#### get_user_by( $field, $value )

This function returns the WP_User object on success and false if it fails. The WordPress User class is found in _/wp-includes/capabilities.php_ and basically queries the `wp_user` table like so:

SELECT * FROM wp_users WHERE $field = $value;

The WP_User class also caches the results so it is not querying the database every time it is used. The class also figures out the roles and capabilities of a specific user, which we will go over in more detail in [Chapter 6](ch06.html "Chapter 6. Users, Roles, and Capabilities"):

* $field—A required string of the field you would like to query the user data by. This string can only be `id`, `slug`, `email`, or `login`.
* $value—A required integer or string of the value for a given id, slug, email or login.

#### get_userdata( $userid )

This function actually utilizes the previous function `get_user_by()` and returns the same WP_User object:

* $userid—A required integer of the user ID of the user you would like to get data for.

#### wp_delete_user( $id, $reassign = _novalue_ )

You guessed it: this function deletes a user and can also reassign any of their posts or links to another user:

* $id—A required integer of the ID of the user you would like to delete.
* $reassign—An optional integer of the ID you would like to reassign any post or links from the deleted user to.

### wp_usermeta

Sometimes you may want to store additional data along with a user. WordPress provides an easy way to do this without having to add additional columns to the users table. You can store as much user metadata as you need to in the `wp_usermeta` table. Each record is associated to a user ID in the `wp_user` table by the user_id field. 

Column     | Type         | Collation       | Null | Default | Extra         
---------- | ------------ | --------------- | ---- | ------- | --------------
umeta_id   | bigint(20)   |                 | No   | None    | AUTO_INCREMENT
user_id    | bigint(20)   |                 | No   | 0       |               
meta_key   | varchar(255) | utf8_general_ci | Yes  | NULL    |               
meta_value | longtext     | utf8_general_ci | Yes  | NULL    | 

```php
<?php
// get brian's id
$brian_id = get_user_by( 'login', 'brian' )->ID;

// add user meta - unique is set to true. no polygamy! only
   one wife at a time.
add_user_meta( $brian_id, 'bwawwp_wife', 'Robin Jade Morales Messenlehner', true);

// get user meta - returning a single value
$brians_wife = get_user_meta( $brian_id, 'bwawwp_wife', true);
echo "Brian's wife: " . $brians_wife . "<br>";

// add user meta - no 3rd parameter/unique. can have as many kids
   as wife will let me.
add_user_meta( $brian_id, 'bwawwp_kid', 'Dalya' );
add_user_meta( $brian_id, 'bwawwp_kid', 'Brian' );
add_user_meta( $brian_id, 'bwawwp_kid', 'Nina' );

// update user meta - this will update brian to brian jr.
update_user_meta( $brian_id, 'bwawwp_kid', 'Brian Jr', 'Brian' );

// get user meta - returning an array
$brians_kids = get_user_meta( $brian_id, 'bwawwp_kid' );
echo "Brian's kids:";
echo '<pre>';
print_r($brians_kids);
echo '</pre>';

// delete brian's user meta
delete_user_meta( $brian_id, 'bwawwp_wife' );
delete_user_meta( $brian_id, 'bwawwp_kid' );

// get jason's id
$jason_id = get_user_by( 'login', 'jason' )->ID;

// update user meta - this will create meta if the key doesn't exist for the user.
update_user_meta( $jason_id, 'bwawwp_wife', 'Kimberly Ann Coleman' );

// get user meta - returning an array
$jasons_wife = get_user_meta( $jason_id, 'bwawwp_wife' );
echo "Jason's wife:";
echo '<pre>';
print_r($jasons_wife);
echo '</pre>';

// add user meta - storing as an array
add_user_meta( $jason_id, 'bwawwp_kid', array( 'Isaac', 'Marin' ) );

// get user meta - returning a single value which happens to be an array.
$jasons_kids = get_user_meta( $jason_id, 'bwawwp_kid', true );
echo "Jason's kids:";
echo '<pre>';
print_r($jasons_kids);
echo '</pre>';

// delete jason's user meta
delete_user_meta( $jason_id, 'bwawwp_wife' );
delete_user_meta( $jason_id, 'bwawwp_kid' );

/*
The output from the above example should look something like this:
Brian's wife: Robin Jade Morales Messenlehner
Brian's kids:
Array
(
    [0] => Dalya
    [1] => Brian Jr
    [2] => Nina
)
Jason's wife:
Array
(
    [0] => Kimberly Ann Coleman
)
Jason's kids:
Array
(
    [0] => Isaac
    [1] => Marin
)
*/
?>
```

#### get_user_meta( $user_id, $key = '', $single = false )

Gets a user’s meta value for a specified key:

* $user_id—A required integer of a user ID.
* $key—An optional string of the meta key of the value you would like to return. If blank then all metadata for the given user will be returned.
* $single—A Boolean of whether to return a single value or not. The default is false and the value will be returned as an array.

`There can be more than one meta key for the same user ID with different values. If you set `$single` to `true`, you will get the first key’s value; if you set it to `false`, you will get an array of the values of each record with the same key.`

#### update_user_meta( $user_id, $meta_key, $meta_value, $prev_value = '' )

This function will update user metadata but will also insert metadata if the passed-in key doesn’t already exist:

* $user_id—A required integer of a user ID.
* $meta_key—A required string of the meta key name for the meta value you would like to store. If this meta key already exists, it will update the current row’s meta value, if not it will insert a new row.
* $meta_value—A required mixed value of an integer, string, array, or object. Arrays and objects will automatically be serialized.
* $prev_value—An optional mixed value of the current metadata value. If a match is found, it will replace the previous/current value with the new value you specified. If left blank, the new meta value will replace the first instance of the matching key.  If you have five rows of metadata with the same key and you don’t specify which row to update with this value, it will update the first row and remove the other four.

This function relies on the `update_metadata()` function located in /wp-includes/meta.php. Check it out!

#### add_user_meta($user_id, $meta_key, $meta_value, $unique = false)

Yup, this function will insert brand-new user meta into the `wp_usermeta` table. We don’t use this function often anymore because we can just use `update_user_meta()` to insert new rows as well as update them. If you want to ensure that a given meta key is only ever used once per user, you should use this function and set the `$unique` parameter to `true`:

* $user_id—A required integer of a user ID.
* $meta_key—A required string of the meta key name for the meta value you would like to store.
* $meta_value—A required mixed value of an integer, string, array, or object.
* $unique—An optional Boolean, which when set to `true` will make sure the meta key can only ever be added once for a given ID.

#### delete_user_meta($user_id, $meta_key, $meta_value = '')

Deletes user metadata for a provided user ID and matching key. You can also specify a matching meta value if you only want to delete that value and not other metadata rows with the same meta key:

* $user_id—A required integer of a user ID.
* $meta_key—A required string of the meta key name for the meta value you would like to delete.
* $meta_value—An optional mixed value of the meta value. If you have more than one record with the same meta key, you can specify which one to delete by matching the meta value. It defaults to nothing, which will delete all meta rows with a matching `user_id` and `meta_key`.

### wp_posts

Ah, the meat of WordPress. The `wp_posts` table is where most of your post data is stored. By default, WordPress comes with posts and pages. Both of these are technically posts and are stored in this table. The `post_type` field is what distinguishes what type of post a post is, whether it is a post, a page, a menu item, a revision, or any custom post type that you may later create.

Column     | Type         | Collation       | Null | Default  | Extra         
-----------| ------------ | -------- | ---- | -------- | -----
ID         | bigint(20)   |      | No   | None     | AUTO_INCREMENT
post_author| bigint(20)   |      | No   | 0        |    
post_date  | datetime     |      | No   | 0000-00-00 00:00:00 |    
post_date_gmt         | datetime     |      | No   | 0000-00-00 00:00:00 |    
post_content          | longtext     | utf8_general_ci | No   | None     |    
post_title | text         | utf8_general_ci | No   | None     |    
post_excerpt          | text         | utf8_general_ci | No   | None     |    
post_status| varchar(20)  | utf8_general_ci | No   | Publish  |    
comment_status        | varchar(20)  | utf8_general_ci | No   | Open     |    
ping_status| varchar(20)  | utf8_general_ci | No   | Open     |    
post_password         | varchar(20)  | utf8_general_ci | No   |          |    
post_name  | varchar(200) | utf8_general_ci | No   |          |    
to_ping    | text         | utf8_general_ci | No   | None     |    
pinged     | text         | utf8_general_ci | No   | None     |    
post_modified         | datetime     |      | No   | 0000-00-00 00:00:00 |    
post_modified_gmt     | datetime     |      | No   | 0000-00-00 00:00:00 |    
post_content_filtered | longtext     | utf8_general_ci | No   | None     |    
post_parent| bigint(20)   |      | No   | 0        |    
guid       | varchar(255) | utf8_general_ci | No   |          |    
menu_order | int(11)      |      | No   | 0        |    
post_type  | varchar(20)  | utf8_general_ci | No   | Post     |    
post_mime_type        | varchar(100) | utf8_general_ci | No   |          |    
comment_count         | bigint(20)   |      | No   | 0       