layout: post
title: "WordPress Database"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

WordPress runs on top of a MySQL database and creates its own tables to store data and content. Below is the database schema created by a default install of WordPress. We have also included some basic information on built-in WordPress functions for interacting with these tables. If you can grasp the database (DB) schema and get comfortable with the list functions in this chapter, you can push and pull any data into and out of WordPress.

## wp_options

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

### add_option( $option, $value = _', $deprecated = '_, $autoload = _yes_ )

First checks if an `option_name` exists before inserting a new row:

* $option—A required string of the `option_name` you would like to add.
* $value—An optional mixed variable of the `option_value` you would like to add. If the variable passed is an array or object, the value will be serialized before storing in the database.
* $deprecated—This parameter was deprecated in version 2.3 and is not used anymore.<sup>[</sup>6]
* $autoload—An optional Boolean used to distinguish whether to load the option into cache when WordPress starts up. Set to `yes` or `no`. The default value is `no`. This can save you a DB query if you are sure you are going to need this option on every page load.

### update_option( $option, $newvalue )

Updates an existing option but will also add it if it doesn’t already exist:

* $option—A required string of the `option_name` you would like to update/add.
* $newvalue—An optional mixed variable of the `option_value` you would like to update/add.

### get_option( $option, $default = false )

Retrieves the `option_value` for a provided `option_name`:

* $option—A required string of the `option_name` you would like to get.
* $default—An optional mixed variable you would like to return if the `option_name` you provided doesn’t exist in the table. By default, this parameter is false.

### delete_option( $option )

Deletes an existing option from the database permanently:

* $option—A required string of the `option_name` you would like to delete.

## wp_users

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

### wp_insert_user( $userdata )

Inserts a new user into the database. This function can also be used to update a user if the user ID is passed in with the $user_data.  $userdata is a required array of field names and values. The accepted fields are:

* _ID_—An integer that will be used for updating an existing user.
* _user_pass_—A string that contains the plain-text password for the user.
* _user_login_—A string that contains the user’s username for logging in.
* _user_nicename_—A string that contains a URL-friendly name for the user. The default is the user’s username.
* _user_url_—A string containing the URL for the user’s website.
* _user_email_—A string containing the user’s email address.
* _display_name_—A string that will be shown on the site. Defaults to the user’s username. It is likely that you will want to change this, for appearance.
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

### wp_create_user( $username, $password, $email )

This function utilizes the prior function `wp_insert_user()` and makes it easier to add a new user based on the required columns:

* $username—A required string of the username/login of a new user.
* $password—A required string of the password of a new user.
* $email—A required string of the email address of a new user.

### wp_update_user( $userdata )

This function can be used to update any of the fields in the `wp_users` and `wp_usermeta` (covered next) tables tied to a specific user. Note that if a user’s password is updated, all of his cookies will the cleared, logging him out of WordPress:

* $userdata—A required array of field names and values. The ID and at least one other field is required. These fields are the same ones accepted in the `wp_insert_post()` function.

### get_user_by( $field, $value )

This function returns the WP_User object on success and false if it fails. The WordPress User class is found in _/wp-includes/capabilities.php_ and basically queries the `wp_user` table like so:

SELECT * FROM wp_users WHERE $field = $value;

The WP_User class also caches the results so it is not querying the database every time it is used. The class also figures out the roles and capabilities of a specific user, which we will go over in more detail in [Chapter 6](ch06.html "Chapter 6. Users, Roles, and Capabilities"):

* $field—A required string of the field you would like to query the user data by. This string can only be `id`, `slug`, `email`, or `login`.
* $value—A required integer or string of the value for a given id, slug, email or login.

### get_userdata( $userid )

This function actually utilizes the previous function `get_user_by()` and returns the same WP_User object:

* $userid—A required integer of the user ID of the user you would like to get data for.

### wp_delete_user( $id, $reassign = _novalue_ )

You guessed it: this function deletes a user and can also reassign any of their posts or links to another user:

* $id—A required integer of the ID of the user you would like to delete.
* $reassign—An optional integer of the ID you would like to reassign any post or links from the deleted user to.

## wp_usermeta

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

### get_user_meta( $user_id, $key = '', $single = false )

Gets a user’s meta value for a specified key:

* $user_id—A required integer of a user ID.
* $key—An optional string of the meta key of the value you would like to return. If blank then all metadata for the given user will be returned.
* $single—A Boolean of whether to return a single value or not. The default is false and the value will be returned as an array.

`There can be more than one meta key for the same user ID with different values. If you set `$single` to `true`, you will get the first key’s value; if you set it to `false`, you will get an array of the values of each record with the same key.`

### update_user_meta( $user_id, $meta_key, $meta_value, $prev_value = '' )

This function will update user metadata but will also insert metadata if the passed-in key doesn’t already exist:

* $user_id—A required integer of a user ID.
* $meta_key—A required string of the meta key name for the meta value you would like to store. If this meta key already exists, it will update the current row’s meta value, if not it will insert a new row.
* $meta_value—A required mixed value of an integer, string, array, or object. Arrays and objects will automatically be serialized.
* $prev_value—An optional mixed value of the current metadata value. If a match is found, it will replace the previous/current value with the new value you specified. If left blank, the new meta value will replace the first instance of the matching key.  If you have five rows of metadata with the same key and you don’t specify which row to update with this value, it will update the first row and remove the other four.

This function relies on the `update_metadata()` function located in /wp-includes/meta.php. Check it out!

### add_user_meta($user_id, $meta_key, $meta_value, $unique = false)

Yup, this function will insert brand-new user meta into the `wp_usermeta` table. We don’t use this function often anymore because we can just use `update_user_meta()` to insert new rows as well as update them. If you want to ensure that a given meta key is only ever used once per user, you should use this function and set the `$unique` parameter to `true`:

* $user_id—A required integer of a user ID.
* $meta_key—A required string of the meta key name for the meta value you would like to store.
* $meta_value—A required mixed value of an integer, string, array, or object.
* $unique—An optional Boolean, which when set to `true` will make sure the meta key can only ever be added once for a given ID.

### delete_user_meta($user_id, $meta_key, $meta_value = '')

Deletes user metadata for a provided user ID and matching key. You can also specify a matching meta value if you only want to delete that value and not other metadata rows with the same meta key:

* $user_id—A required integer of a user ID.
* $meta_key—A required string of the meta key name for the meta value you would like to delete.
* $meta_value—An optional mixed value of the meta value. If you have more than one record with the same meta key, you can specify which one to delete by matching the meta value. It defaults to nothing, which will delete all meta rows with a matching `user_id` and `meta_key`.

## wp_posts

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

The following functions are found in _/wp-includes/post.php_:

```php
<?php
// insert post - set post status to draft
$args = array(
        'post_title'   => 'Building Web Apps with WordPress',
        'post_excerpt' => 'WordPress as an Application Framework',
        'post_content' => 'WordPress is the key to successful cost effective
        web solutions in most situations. Build almost anything on top of the
        WordPress platform. DO IT NOW!!!!',
        'post_status'  => 'draft',
        'post_type'    => 'post',
        'post_author'  => 1,
        'menu_order'   => 0
);
$post_id = wp_insert_post( $args );
echo 'post ID: ' . $post_id . '<br>';

// update post - change post status to publish
$args = array(
        'ID'          => $post_id,
        'post_status' => 'publish'
);
wp_update_post( $args );

// get post - return post data as an object
$post = get_post( $post_id );
echo 'Object Title: ' . $post->post_title . '<br>';

// get post - return post data as an array
$post = get_post( $post_id, ARRAY_A );
echo 'Array Title: ' . $post['post_title'] . '<br>';

// delete post - skip the trash and permanently delete it
wp_delete_post( $post_id, true );

// get posts - return 100 posts
$posts = get_posts( array( 'numberposts' => '100') );
// loop all posts and display the ID & title
foreach ( $posts as $post ) {
        echo $post->ID . ': ' .$post->post_title . '<br>';
}

/*
The output from the above example should look something like this:
post ID: 589
Object Title: Building Web Apps with WordPress
Array Title: Building Web Apps with WordPress
"A list of post IDs and Titles from your install"
*/
?>
```

### wp_insert_post($postarr, $wp_error = false)

Inserts a new post with provided post data:

* $postarr—An array or object of post data. Arrays are expected to be escaped; objects are not.
* $wp_error—An optional Boolean that will allow for a `WP_Error` if returned `false`.

The defaults for the parameter $postarr are:

* _post_status_—Default is _draft_.
* _post_type_—Default is _post_.
* _post_author_—Default is current user ID (`$user_ID`). The ID of the user who added the post.
* _ping_status_—Default is the value in the _default_ping_status_ option. Whether the attachment can accept pings.
* _post_parent_—Default is 0. Set this for the post it belongs to, if any.
* _menu_order_—Default is 0. The order it is displayed.
* _to_ping_—Whether to ping.
* _pinged_—Default is empty string.
* _post_password_—Default is empty string. The password to access the attachment.
* _guid_—Global unique ID for referencing the attachment.
* _post_content_filtered_—Post content filtered.
* _post_excerpt_—Post excerpt.

### wp_update_post( $postarr = array(), $wp_error = false )

Updates a post with provided post data.

* $postarr—A required array or object of post data. Arrays are expected to be escaped, objects are not.
* $wp_error—An optional Boolean that will allow for a WP_Error if returned false.

### get_post( $post = null, $output = OBJECT, $filter = _raw_ )

Get post data from a provided post ID or a post object:

* $post—An optional integer or object of the post ID or post object you want to retrieve. The default is the current post you are on inside of the post loop, which is covered later in this chapter.
* $output—An optional string of the output format. The default value is `OBJECT` (`WP_Post` object)  and the other values can be `ARRAY_A` (associative array) or `ARRAY_N` (numeric array).
* $filter—An optional string of how the context should be sanitized on output. The default value is `raw`, but  other values can be `edit`, `db`, `display`, `attribute`, or `js`. Sanitization is covered in [Chapter 8](ch08.html "Chapter 8. Secure WordPress").

### get_posts($args = null)

`Returns a list of posts from matching criteria. This function uses the `WP_Query` class, which you will see examples of throughout the book: $args is an optional array of post arguments. The defaults are:`

* _numberposts_—Default is `5`. Total number of posts to retrieve. `–1` is all.
* _offset_—Default is `0`. Number of posts to pass over.
* _category_—What category to pull the posts from.
* _orderby_—Default is _post_date_. How to order the posts.
* _order_—Default is _DESC_. The order to retrieve the posts.
* _include_—A list of post IDs to include
* _exclude_—A list of post IDs to exclude
* _meta_key_—Any metadata  key
* _meta_value_—Any metadata value. Must also use `meta_key`.
* _post_type_—Default is _post_. Can be _page_, or _attachment_, or the slug for any custom CPT. The string `any` will return posts from all post types.
* _post_parent_—The parent ID of the post.
* _post_status_—Default is _publish_. Post status to retrieve.

### wp_delete_post( $postid = 0, $force_delete = false )

`This function will trash any post or permanently delete it if $force_delete is set to `true`:`

* $postid—A required integer of the post ID you would like to trash or delete.
* $force_delete—An optional Boolean that if set to `true` will delete the post; if left blank, it will default to `false` and will move the post to a deleted status.

## wp_postmeta

Sometimes you may want to store additional data along with a post. WordPress provides an easy way to do this without having to add additional fields to the posts table. You can store as much post metadata as you need to in the `wp_postmeta` table. Each record is associated to a post through the `post_id` field. When editing any post in the backend of WordPress, you can add/update/delete metadata or Custom Fields via the UI. 

Column     | Type         | Collation       | Null | Default | Extra         
---------- | ------------ | --------------- | ---- | ------- | --------------
meta_id    | bigint(20)   |                 | No   | None    | AUTO_INCREMENT
post_id    | bigint(20)   |                 | No   | 0       |               
meta_key   | varchar(255) | utf8_general_ci | Yes  | NULL    |               
meta_value | longtext     | utf8_general_ci | Yes  | NULL    |               


The following functions are found in _/wp-includes/post.php_:

```
<?php
// get posts - return the latest post
$posts = get_posts( array( 'numberposts' => '1', 'orderby' =>
    'post_date', 'order' => 'DESC' ) );
foreach ( $posts as $post ) {
        $post_id = $post->ID;

        // update post meta - public metadata
        $content = 'You SHOULD see this custom field when editing your latest post.';
        update_post_meta( $post_id, 'bwawwp_displayed_field', $content );

        // update post meta - hidden metadata
        $content = str_replace( 'SHOULD', 'SHOULD NOT', $content );
        update_post_meta( $post_id, '_bwawwp_hidden_field', $content );

        // array of student logins
        $students[] = 'dalya';
        $students[] = 'ashleigh';
        $students[] = 'lola';
        $students[] = 'isaac';
        $students[] = 'marin';
        $students[] = 'brian';
        $students[] = 'nina';

        // add post meta - one key with array as value, array will be serialized
    // automatically
        add_post_meta( $post_id, 'bwawwp_students', $students, true );

        // loop students and add post meta record for each student
        foreach ( $students as $student ) {
                add_post_meta( $post_id, 'bwawwp_student', $student );
        }

        // get post meta - get all meta keys
        $all_meta = get_post_meta( $post_id );
        echo '<pre>';
        print_r( $all_meta );
        echo '</pre>';

        // get post meta - get 1st instance of key
        $student = get_post_meta( $post_id, 'bwawwp_student', true );
        echo 'oldest student: ' . $student;

        // delete post meta
        delete_post_meta( $post_id, 'bwawwp_student' );
}

/*
The output from the above example should look something like this:
Array
(
    [_bwawwp_hidden_field] => Array
        (
        [0] => You SHOULD NOT see this custom field when editing your latest post.
        )

    [bwawwp_displayed_field] => Array
        (
            [0] => You SHOULD see this custom field when editing your latest post.
        )

    [bwawwp_students] => Array
        (
        [0] => a:7:{i:0;s:5:"dalya";i:1;s:8:"ashleigh";i:2;s:4:"lola";i:3;s:5:
        "isaac";i:4;s:5:"marin";i:5;s:5:"brian";i:6;s:4:"nina";}
        )

    [bwawwp_student] => Array
        (
            [0] => dalya
            [1] => ashleigh
            [2] => lola
            [3] => isaac
            [4] => marin
            [5] => brian
            [6] => nina
        )
)
oldest student: dalya
*/
?>
```

### get_post_meta($post_id, $key = '', $single = false)

Get post metadata for a given post:

* $post_id—A required integer of the post ID, for which you would like to retrieve post meta.
* $key—Optional string of the meta key name for which you would like to retrieve post meta. The default is to return metadata for all of the meta keys for a particular post.
* $single—A Boolean of whether to return a single value or not. The default is `false`, and the value will be returned as an array.

`There can be more than one meta key for the same post ID with different values. If you set `$single` to `true`, you will get the first key’s value; if it is set to `false`, you will get an array of the values of each record with the same key.`

### update_post_meta($post_id, $meta_key, $meta_value, $prev_value = '')

This function will update post metadata but will also insert metadata if the passed-in key doesn’t already exist:

* $post_id—A required integer of a post ID.
* $meta_key—A required string of the meta key name for the meta value you would like to store. If this meta key already exists, it will update the current row’s meta value; if not, it will insert a new row.
* $meta_value—A required mixed value of an integer, string, array, or object. Arrays and objects will automatically be serialized.
* $prev_value—An optional mixed value of the current metadata value. If a match is found, it will replace the previous/current value with the new value you specified. If left blank, the new meta value will replace the first instance of the matching key.  If you have five rows of metadata with the same key and you don’t specify which row to update with this value, it will update the first row and remove the other four.

This function relies on the `update_metadata()` function located in _/wp-includes/meta.php_. Check it out!

### add_post_meta($post_id, $meta_key, $meta_value, $unique = false)

This function will insert brand-new post meta into the `wp_postmeta` table. We don’t use this function so often anymore because we can just use the previous function we talked about, `update_post_meta()`, to insert new rows as well as update them. If you want to insure that a given meta key is only ever used once per post, you should use this function and set the `$unique` parameter to `true`:

* $user_id—A required integer of a post ID.
* $meta_key—A required string of the meta key name for the meta value you would like to store.
* $meta_value—A required mixed value of an integer, string, array, or an object.
* $unique—An optional Boolean that when set to `true` will make sure the meta key can only ever be added once for a given ID.

### delete_post_meta($post_id, $meta_key, $meta_value = '')

Deletes post metadata for a provided post ID and matching key. You can also specify a matching meta value if you only want to delete that value and not other metadata rows with the same meta key:

* $post_id - A required integer of a post ID.
* $meta_key - A required string of the
* $meta_value - An optional mixed value of the meta value. If you have more than one record with the same meta key, you can specify which one to delete by matching this value. It defaults to nothing, which will delete all meta rows with a matching `post_id` and `meta_key`.

## wp_comments

Comments can be left against any post. The `wp_comments` table stores individual comments for any post and default associated data. 

Column    | Type         | Collation       | Null | Default  | Extra   
---------- | ------------ | --------------- | ---- | ---------- | -----
comment_ID| bigint(20)   |      | No   | None     | AUTO_INCREMENT     
comment_post_ID      | bigint(20)   |      | No   | 0        |         
comment_author       | tinytext     | utf8_general_ci | No   |          |
comment_author_email | varchar(100) | utf8_general_ci | No   |          |
comment_author_url   | varchar(200) | utf8_general_ci | No   |          |
comment_author_IP    | varchar(100) | utf8_general_ci | No   |          |
comment_date         | datetime     |      | No   |          | 0000-00-00 00:00:00
comment_date_gmt     | datetime     |      | No   | 0000-00-00 00:00:00 |
comment_content      | text         | utf8_general_ci | No   | None     |
comment_karma        | int(11)      |      | No   | 0        |         
comment_approved     | varchar(20)  | utf8_general_ci | No   | 1        |
comment_agent        | varchar(20)  | utf8_general_ci | No   |          |
comment_type         | varchar(20)  | utf8_general_ci | No   |          |
comment_parent       | bigint(20)   |      | No   | 0        |         
user_id   | bigint(20)   |      | No   | 0        |       

The following functions are found in _/wp-includes/comment.php_:

```php
<?php
// insert post
$args = array(
 'post_title'   => '5 year anniversary on 9/10/16',
 'post_content' => 'Think of somthing cool to do and make a comment about it!',
 'post_status'  => 'publish'
);
$post_id = wp_insert_post( $args );
echo 'post ID: ' . $post_id . ' - ' . $args['post_title'] . '<br>';

// make comments array
$comments[] = 'Take a trip to South Jersey';
$comments[] = 'Dinner at Taco Bell';
$comments[] = 'Make a baby';

//loop comments array
foreach ( $comments as $key => $comment ) {
        // insert comments
        $commentdata = array(
                'comment_post_ID' => $post_id,
                'comment_content' => $comments[$key],
        );
        $comment_ids[] = wp_insert_comment( $commentdata );
}
echo 'comments:<pre>';
print_r( $comments );
echo '</pre>';

// update comment
$commentarr['comment_ID'] = $comment_ids[0];
$commentarr['comment_content'] = 'Take a trip to Paris, France';
wp_update_comment( $commentarr );

// insert comment - sub comment from parent id
$commentdata = array(
        'comment_post_ID' => $post_id,
        'comment_parent' => $comment_ids[0],
        'comment_content' => 'That is a pretty good idea...',
);
wp_insert_comment( $commentdata );

// get comments - search taco bell
$comments = get_comments( 'search=Taco Bell&number=1' );
foreach ( $comments as $comment ) {
        // insert comment - sub comment of taco bell comment id
        $commentdata = array(
                'comment_post_ID' => $post_id,
                'comment_parent' => $comment->comment_ID,
                'comment_content' => 'Do you want to get smacked up?',
        );
        wp_insert_comment( $commentdata );
}

// get comment - count of comments for this post
$comment_count = get_comments( 'post_id= ' . $post_id . '&count=true' );
echo 'comment count: ' . $comment_count . '<br>';

// get comments - get all comments for this post
$comments = get_comments( 'post_id=' .$post_id );
foreach ( $comments as $comment ) {
        // update 1st comment
        if ( $comment_ids[0] == $comment->comment_ID ) {
         $commentarr = array(
          'comment_ID' => $comment->comment_ID,
          'comment_content' => $comment->comment_content . ' & make a baby!',
        );
                wp_update_comment( $commentarr );
                // delete all other comments
        }else {
                // delete comment
                wp_delete_comment( $comment->comment_ID, true );
        }
}

// get comment - new comment count
$comment_count = get_comments( 'post_id= ' . $post_id . '&count=true' );
echo 'new comment count: ' . $comment_count . '<br>';

// get comment - get best comment
$comment = get_comment( $comment_ids[0] );
echo 'best comment: ' . $comment->comment_content;

/*
The output from the above example should look something like this:
post ID: 91011 - 5 year anniversary on 9/10/16
comments:
Array
(
    [0] => Take a trip to South Jersey
    [1] => Dinner at Taco Bell
    [2] => Make a baby
)
comment count: 5
new comment count: 1
best comment: Take a trip to Paris, France & make a baby!
*/
?>
```

### get_comment( $comment, $output = OBJECT )

Returns comment data from a comment ID or comment object. If the comment is empty, then the global comment variable will be used if set:

* $comment—An optional integer, string, or object of a comment ID or object.
* $output—An optional string that defines what format the output should be in. Possible values are `OBJECT`, `ARRAY_A`, and `ARRAY_N`.

### get_comments( $args = '' )

This function retrieves a list of comments for specific posts or a single post. It calls the `WP_Comment_Query` class, which we will cover in the next chapter. $args are an optional array or string of arguments to query comments. The default arguments are:

* _author_email_—A string of a comment author’s email address.
* _ID_—An integer of the ID of a comment.
* _karma_—An integer of a comment’s karma, which can be used by plugins for rating.
* _number_—An integer of the number of comments to return. Default is all comments.
* _offset_—An integer of the number of comments to pass over. Default is 0.
* _orderby_—A string of the field to order the comment by. Allowed values are: `comment_agent`, `comment_approved`, `comment_author`, `comment_author_email`, `comment_author_IP`, `comment_author_url`, `comment_content`, `comment_date`, `comment_date_gmt`, `comment_ID`, `comment_karma`, `comment_parent`, `comment_post_ID`, `comment_type`, `user_id`.
* _order_—A string of how to order the selected order by argument. Defaults to  `DESC` and also accepts `ASC`.
* _parent_—An integer of a comment’s parent comment ID.
* _post_id_—An integer of the post ID a comment is attached to.
* _post_author_—An integer of the post author ID a comment is attached to.
* _post_name_—A string of the post name a comment is attached to.
* _post_parent_—An integer of the  post parent ID a comment is attached to.
* _post_status_—A string of the post status  a comment is attached to.
* _post_type_—A string of the post type a comment is attached to.
* _status_—A string of the status of a comment. Optional values are _`hold`_, _`approve`_, _`spam`_, or _`trash`_.
* _type_—A string of the type of a comment. Optional values are `''`, _`pingback`_, or _`trackback`_.
* _user_id_—An integer of the user ID of a comment.
* _search_—A string of search terms to search a comment on. Searches the `comment_author`, `comment_author_email`, `comment_author_url`, `comment_author_IP`, and `comment_content` fields.
* _count_—A Boolean that will make the query return a count or results. The default value is `false`.
* _meta_key_—The comment meta key of comment meta  to search on.
* _meta_value_—The comment meta value of comment meta to search on; `meta_key` is required.

### wp_insert_comment( $commentdata )

Inserts a comment into the database:

* $commentdata—A required array of comment fields and values to be inserted. Available fields to be inserted are `comment_post_ID`, `comment_author`, `comment_author_email`, `comment_author_url`, `comment_author_IP`, `comment_date`, `comment_date_gmt`, `comment_content`, `comment_karma`, `comment_approved`, `comment_agent`, `comment_type`, `comment_parent`, and `user_id`.

### wp_update_comment( $commentarr )

Updates comment data and filters to make sure all required fields are valid before updating in the database:

* $commentarr - An optional array of arguments containing comment fields and values to be updated. These are the same field arguments just listed for the `wp_insert_comment()` function.

### wp_delete_comment( $comment_id, $force_delete = false )

Deletes a comment. By default, it will trash the comment unless specified to permanently delete:

* $comment_id - A required integer of the comment ID to trash/delete.
* $force_delete -  An optional Boolean that if set to `true` will permanently delete a comment. [Example 2-6](ch02.html#workingwpcomments "Example 2-6. Working with the wp_comments table") demonstrates some of the basic functions for interacting with the `wp_comments` table.

## wp_commentsmeta

Just like the `wp_usermeta` and `wp_postmeta` table, this table stores any custom, additional data tied to a comment by the `comment_id` fields.

Column     | Type         | Collation       | Null | Default | Extra         
---------- | ------------ | --------------- | ---- | ------- | --------------
meta_id    | bigint(20)   |                 | No   | None    | AUTO_INCREMENT
comment_id | bigint(20)   |                 | No   | 0       |               
meta_key   | varchar(255) | utf8_general_ci | Yes  | NULL    |               
meta_value | longtext     | utf8_general_ci | Yes  | NULL    |               

The following functions are found in _/wp-includes/comment.php_.

```
<?php
// get comments - last comment ID
$comments = get_comments( 'number=1' );
foreach ( $comments as $comment ) {
        $comment_id = $comment->comment_ID;

        // add comment meta - meta for view date & IP address
        $viewed = array( date( "m.d.y" ), $_SERVER["REMOTE_ADDR"] );
        $comment_meta_id = add_comment_meta( $comment_id, 'bwawwp_view_date',
        $viewed, true );
        echo 'comment meta id: ' . $comment_meta_id;

        // update comment meta - change date format to format like
        // October 23, 2020, 12:00 am instead of 10.23.20
        $viewed = array( date( "F j, Y, g:i a" ), $_SERVER["REMOTE_ADDR"] );
        update_comment_meta( $comment_id, 'bwawwp_view_date', $viewed );

        // get comment meta - all keys
        $comment_meta = get_comment_meta( $comment_id );
        echo '<pre>';
        print_r( $comment_meta );
        echo '</pre>';

        // delete comment meta
        delete_comment_meta( $comment_id, 'bwawwp_view_date' );
}

/*
The output from the above example should look something like this:
comment meta id: 16
Array
(
    [bwawwp_view_date] => Array
        (
            [0] => a:2:{i:0;s:24:"August 11, 2013, 4:16 pm";i:1;s:9:"127.0.0.1";}
        )

)
*/
?>
```

### get_comment_meta($comment_id, $key = '', $single = false)

Get comment meta for a given comment ID:

* $comment_id—A required integer of the comment ID for which you would like to retrieve comment meta.
* $key—Optional string of the meta key name for which you would like to retrieve comment meta. The default is to return metadata for all of the meta keys for a particular post.
* $single—A Boolean of whether to return a single value or not. The default is `false`, and the value will be returned as an array.

### add_comment_meta($comment_id, $meta_key, $meta_value, $unique = false)

Add comment meta for given comment ID:

* $comment_id—A required integer of a comment ID.
* $meta_key—A required string of the meta key name for the meta value you would like to store.
* $meta_value—A required mixed value of an integer, string, array, or object.
* $unique—An optional Boolean that when set to `true` will make sure the meta key can only ever be added once for a given ID.

### update_comment_meta($comment_id, $meta_key, $meta_value, $prev_value = '')

* $comment_id—A required integer of a comment ID.
* $meta_key—A required string of the meta key name for the meta value you would like to store. If this meta key already exists, it will update the current row’s meta value; if not, it will insert a new row.
* $meta_value—A required mixed value of an integer, string, array, or object. Arrays and objects will automatically be serialized.
* $prev_value—An optional mixed value of the current metadata value. If a match is found, it will replace the previous/current value with the new value you specified. If left blank, the new meta value will replace the first instance of the matching key.  If you have five rows of metadata with the same key and you don’t specify which row to update with this value, it will update the first row and remove the other four.

### delete_comment_meta($comment_id, $meta_key, $meta_value = '')

Deletes comment metadata for a provided comment ID and matching key. You can also specify a matching meta value if you only want to delete that value and not other metadata rows with the same meta key:

* $comment_id—A required integer of a comment ID.
* $meta_key—A required string of the meta key name for the meta value you would like to delete.
* $meta_value—An optional mixed value of the meta value. If you have more than one record with the same meta key, you can specify which one to delete by matching this value. It defaults to nothing, which will delete all meta rows with a matching `post_id` and `meta_key`.

## wp_links

This table stores any links, URLs, or bookmarks you create.`` Since WordPress version 3.5, the links/blogroll manager UI has been hidden, so if you do a fresh install and don’t see it, don’t freak out.  You can still use the links/blogroll manager if you choose by installing [Andrew Nacin’s](https://twitter.com/nacin) [link manager plugin](http://bit.ly/link-manager). If you are upgrading WordPress from a version prior to 3.5, you will still be able to access the UI. Why was this removed, you might ask? If Andrew pulled it out of core, you can bet he had a good reason for it. 

Column  | Type| Collation       | Null | Default    | Extra
----- | ------------ | -------- | ---- | ------- | --------------
link_id | bigint(20)   |        | No   | None       | AUTO_INCREMENT
link_url| varchar(255) | utf8_general_ci | No   |   |      
link_name        | varchar(255) | utf8_general_ci | No   |   |      
link_image       | varchar(255) | utf8_general_ci | No   |   |      
link_target      | varchar(25)  | utf8_general_ci | No   |   |      
link_description | varchar(255) | utf8_general_ci | No   |   |      
link_visible     | varchar(20)  | utf8_general_ci | No   | Yes        |      
link_owner       | bigint(20)   |        | No   | 1 |      
link_rating      | int(11)      |        | No   | 0 |      
link_updated     | datetime     |        | No   | 0000-00-00 00:00:00 |      
link_rel| varchar(255) | utf8_general_ci | No   |   |      
link_notes       | mediumtext   | utf8_general_ci | No   | None       |      
link_rss| varchar(255) | utf8_general_ci | No   |   |               

Bookmark functions can be found in _/wp-includes/bookmark.php_.

## wp_terms

The `wp_terms` table stores each category name or term name that you create. Each record is tied to its taxonomy in the `wp_term_taxonomy` table by the `term_id`. So you’re familiar with post categories and tags? Well, each category or tag is stored in this table, and technically they are both taxonomies. Every term that is stored in the name column is a taxonomy term. 

Column     | Type         | Collation       | Null | Default | Extra         
---------- | ------------ | --------------- | ---- | ------- | --------------
term_id    | bigint(20)   |                 | No   | None    | AUTO_INCREMENT
name       | varchar(200) |                 | No   |         |               
slug       | varchar(200) | utf8_general_ci | No   |         |               
term_group | bigint(10)   |                 | No   | 0       |               

The following functions are found in _/wp-includes/taxonomy.php_.

### get_terms( $taxonomies, $args = '' )

Gets the terms of a specific taxonomy or an array of taxonomies:

* $taxonomies—A required string or array of a taxonomy or list of taxonomies.
* $args—An optional string or array of arguments. Available arguments are:

    1.  `_orderby_—Default is `name`. Can be `name`, `count`, `term_group`, `slug`, or nothing, which will use `term_id`. Passing a custom value other than these will cause the terms to be ordered on that custom value.`
    2.  `_order_—`ASC` or `DESC`. The default is `ASC`.`
    3.  `_hide_empty_—The default value is `true`, which will only return terms that are attached to a post. If set to `false`, you can return all terms regardless, if they are being used by a post or not.`
    4.  _exclude_—An array or comma-separated or space-delimited string of term IDs to exclude from the query results. If include is being used, exclude will be ignored.
    5.  _exclude_tree_—An array or comma-separated or space-delimited
          string of term IDs to exclude from the query results, including any child terms. If include is being used, _exclude_tree_ will be ignored.
    6.  _include_—An array or comma-separated or space-delimited string of term IDs to include in the query results.
    7.  `_number_—The number of terms for the query to return. The default is `all`.`
    8.  _offset_—The number by which to offset the terms query.
    9.  `_fields_—You can specify if you want to return term IDs or names. The default is `all`, which returns an array of term objects.`
    10.  _slug_—A string that will return any terms that have a matching slug.
    11.  `_hierarchical_—Includes all child terms if they are attached to posts. The default is `true`, so to not return terms hierarchically, set this to `false`.`
    12.  _search_—A string that will return any terms whose names match the value provided. The search is case-insensitive.
    13.  _name_like_—A string that will return any terms whose names begin with the value provided. Like the search, this is case-insensitive.
    14.  `_pad_counts_—If set to `true`, the query results will include the count of each term’s children.`
    15.  `_get_—If set to `all`, returns terms regardless of ancestry or whether the terms are empty.`
    16.  _child_of_—When set to a term ID, the query results will contain all descendants of the provided term ID. The default is 0, which returns everything.
    17.  _parent_—When set to a term ID, the query results will contain the direct children of the provided term ID. The default is an empty string.
    18.  _cache_domain_—Enables a unique cache key to be produced when this query is stored in object cache.

### get_term( $term, $taxonomy, $output = OBJECT, $filter = _raw_ )

Get all term data for any given term:

* $term—A required integer or object of the term to return.
* $taxonomy—A required string of the taxonomy of the term to return.
* $output—An optional string of the output format. The default value is `OBJECT`, and the other values can be `ARRAY_A` (associative array) or `ARRAY_N` (numeric array).
* $filter—An optional string of how the context should be sanitized on output. The default value is `raw`.

### wp_insert_term( $term, $taxonomy, $args = array() )

Adds a new term to the database:

* $term—A required string of the term to add or update.
* $taxonomy—A required string of the taxonomy the term will be added to.
* $args—An optional array or string of term arguments to be inserted/updated. Available arguments are:

    1.  _alias_of_—An optional string of the slug that the term will be an alias of.
    2.  _description_—An optional string that describes the term.
    3.  _parent_—An optional integer of the parent term ID that this term will be a child of.
    4.  _slug_—An optional string of the slug of the term.

### wp_update_term( $term_id, $taxonomy, $args = array() )

Updates an existing term in the database:

* $term_id—A required integer of the term ID of the term you want to update.
* $taxonomy—A required string of the taxonomy the term is associated with.
* $args—An optional array or string of term arguments to be updated. These are the same arguments used in `wp_insert_term()`.

### wp_delete_term( $term, $taxonomy, $args = array() )

Deletes a term from the database. If the term is a parent of other terms, then the children will be updated to that term’s parent:

* $term—A required integer of the term ID of the term you want to delete.
* $taxonomy—A required string of the taxonomy the term is associated with.
* $args—An optional array to overwrite term field values.

## wp_term_taxonomy

The `wp_term_taxonomy` table stores each taxonomy type you are using. WordPress has two taxonomy types built in, category and post_tag, but you can also register your own taxonomies. When a new term gets added in the `wp_terms` table, it is associated with its taxonomy in this table, along with that taxonomy term ID, description, parent, and count.

Column           | Type        | Collation       | Null | Default | Extra
---------- | ----------- | --------------- | ---- | ------- | ------
term_taxonomy_id | bigint(20)  |  | No   | None    | AUTO_INCREMENT
term_id          | bigint(20)  |  | No   | 0       |
taxonomy         | varchar(32) | utf8_general_ci | No   |         |
description      | longtext    | utf8_general_ci | No   | None    |
parent           | bigint(20)  |  | No   | 0       |
count            | bigint(20)  |  | No   | 0       |

## /wp-includes/taxonomy.php

The following functions are found in _/wp-includes/taxonomy.php_.

### get_taxonomies( $args = array(), $output = _names_, $operator = _and_ )

This function returns a list of registered taxonomy objects or a list of taxonomy names:

* $args—An optional array of arguments to query what taxonomy objects get returned. There are a lot, and we will cover all of them in [Chapter 5](ch05.html "Chapter 5. Custom Post Types, Post Metadata, and Taxonomies").
* $output—An optional string of either `names` or `objects`. The default is `names`, which will return a list of taxonomy names.
* $operator—An optional string of either `and` or `or`. The default is `and`, which means that all of the arguments passed in must match. If set to `or`, any of the arguments passed in can match.

### get_taxonomy( $taxonomy )

This function will first check that the parameter string given is a taxonomy object; and if it is, it will return it:

* $taxonomy—A required string of the name of the taxonomy object to return.

### register_taxonomy( $taxonomy, $object_type, $args = array() )

This function creates or updates a taxonomy object. Registering custom taxonomies can really extend WordPress because you can categorize your posts anyway you see fit. We are going to go over registering taxonomies in much more detail in [Chapter 5](ch05.html "Chapter 5. Custom Post Types, Post Metadata, and Taxonomies"):

* $taxonomy - A required string of the name of the taxonomy.
* $object_type - A required array or string of the object types (post types like post and page) that this taxonomy will be tied to.
* $args - An optional array or string of arguments.

## wp_term_relationships

The `wp_term_relationships` table relates a taxonomy term to a post. Every time you assign a category or tag to a post, it’s being linked to that post in this table.

Column           | Type       | Collation | Null | Default | Extra
---------------- | ---------- | --------- | ---- | ------- | -----
object_id        | bigint(20) |           | No   | 0       |      
term_taxonomy_id | bigint(20) |           | No   | 0       |      
term_order       | int(11)    |           | No   | 0       |      

### get_object_taxonomies( $object, $output = _names_ )

This function returns all taxonomies associated with a post type or post object:

* $object—A required array, string, or object of the name(s) of the post type(s) or post object(s).
* $output—An optional string of either `names` or `objects`. The default is `names`, which will return a list of taxonomy names.

### wp_get_object_terms( $object_ids, $taxonomies, $args = array() )

This function returns terms associated with a supplied post object ID or IDs and a supplied taxonomy.

* $object_ids—A required string or array of object IDs for the object terms you would like to return. Passing in a post ID would return terms associated with that post ID.
* $taxonomies—A required string or array of the taxonomy names from which you want to return terms. Passing in the taxonomy `post_tag` would return terms of the `post_tag` taxonomy.
* $args—An optional array or string of arguments that change how the data is returned. The arguments that can be changed are:

    1.  _orderby_—Defaults to `name`; also accepts `count`, `slug`, `term_group`, `term_order`, and `none`.
    2.  _order_—Defaults to  `ASC`; also accepts `DESC`.
    3.  _fields_—Defaults to `all`; also accepts `ids`, `names`, `slugs`, and `all_with_object_id`. This argument will dictate what values will be returned.

### wp_set_object_terms( $object_id, $terms, $taxonomy, $append = false )

This function adds taxonomy terms to a provided object ID and taxonomy. It has the ability to overwrite all terms or to append new terms to existing terms. If a term passed into this function doesn’t already exist, it will be created and then related to the provided object ID and taxonomy:

* $object_id—A required integer of the object ID (post ID) to relate your terms to.
* $terms—A required array, integer, or string of the terms you would like to add to an object (post).
* $taxonomy—A required array or string of the taxonomy or taxonomies you want to relate your terms to.
* $append—An optional Boolean that defaults to `false` that will replace any existing terms related to an object ID with the new terms you provided. If set to `true`, your new terms will be appended to the existing terms.

Discussion is underway to remove the `wp_terms` table from WordPress in a future release. The `name` and `slug` columns of `wp_terms` will be moved into the `wp_terms_taxonomy` table, and a MySQL view will be created called `wp_terms` that can be queried against, preserving backward compatibility for your custom queries.

## $wpdb

The `$wpdb` class is used to interact with the database directly. Once globalized, you can use `$wpdb` in custom functionality to select, update, insert, and delete database records. If you are new to WordPress and aren’t familiar with all of the functions to push and pull from the database, `$wpdb` is going to be your best friend.

Queries using `$wpdb` are also useful when you need to manage custom tables required by your app or perform a complicated query (perhaps joining many tables) faster than the core WordPress functions would run on their own. Please don’t assume that the built-in WordPress functions for querying the database are slow. Unless you know exactly what you are doing, you’ll want to use the built-in functions for getting posts, users, and metadata. The WordPress core is smart about optimizing queries and caching the results from these calls, which will work well across all of the plugins you are running. However, in certain situations, you can shave a bit of time by rolling your own query.

### Using custom DB tables

To add our table to the database, we need to write up the SQL for the CREATE TABLE command and query it against the WordPress database. You can use either the `$wpdb->query()` method or the `dbDelta()` function in the WordPress core.

There are a few things we need to do to keep track of our custom tables. We want to store a `db_version` for our app plugin so we know what version of the database schema we are working with in case it updates between versions. We can also check the version so we only run the setup SQL once for each version. Another common practice is to store your custom table name as a property of `$wpdb` to make querying it a bit easier later.

```php
<?php
// setup the database for the SchoolPress app
function sp_setupDB() {
        global $wpdb;

        // shortcuts for SchoolPress DB tables
        $wpdb->schoolpress_assignment_submissions = $wpdb->prefix .
                'schoolpress_assignment_submissions';

        $db_version = get_option( 'sp_db_version', 0 );

        // create tables on new installs
        if ( empty( $db_version ) ) {
                global $wpdb;

                $sqlQuery = "
                CREATE TABLE '" . $wpdb->schoolpress_assignment_submissions . "' (
                  `assignment_id` bigint(11) unsigned NOT NULL,
                  `submission_id` bigint(11) unsigned NOT NULL,
                UNIQUE KEY `assignment_submission` (`assignment_id`,`submission_id`),
                UNIQUE KEY `submission_assignment` (`submission_id`,`assignment_id`)
                )
                ";

                require_once ABSPATH . 'wp-admin/includes/upgrade.php';
                dbDelta( $sqlQuery );

                $db_version = '1.0';
                update_option( 'sp_db_version', '1.0' );
        }
}
add_action( 'init', 'sp_dbSetup', 0 );
?>
```

The `sp_dbSetup()` function is run early in init (priority 0) so the table shortcuts are available to any other code you have running. You can’t always assume a `wp_` prefix, so the `$wpdb->prefix` property is used to get the database prefix for the WordPress install.``

A DB version for the SchoolPress app is stored in the WordPress options table. We get the value out of options, and if it is empty, we run code to create our custom tables. The CREATE TABLE SQL statement here is pretty standard. You should always try to run these commands directly on the MySQL database before pasting them into your plugin code to make sure they work.

We use the `dbDelta()` function to create the database table. This function will create a new table if it doesn’t exist. Or if a table with the same name already exists, it will figure out the correct ALTER TABLE query to get the old table to match the new schema.

To use `dbDelta()`, you must be sure to include the _wp-admin/includes/upgrade.php_ file since that file is only loaded when needed. Then pass `dbDelta()` the SQL for a CREATE TABLE query. Your SQL must be in a specific format a little more strict than the general MySQL format.

Using `dbDelta()` is preferred when creating tables because it will automatically update older versions of your tables, but you can also run the CREATE TABLE query using `$wpdb->query($sqlQuery);`.

You can run any valid SQL statement using the `$wpdb->query()` method. The `query()` method sets a lot of properties on the `$wpdb` object that are useful for debugging or just keeping track of your queries:

* `$wpdb->result` will contain the raw result from your SQL query.
* `$wpdb->num_queries` is incremented each time a query is run.
* `$wpdb->last_query` will contain the last SQL query run.
* `$wpdb->last_error` will contain a string with the last SQL error generated if there was one.
* `$wpdb->insert_id` will contain the ID created from the last successful INSERT query.
* `$wpdb->rows_affected` is set to the number of affected rows.
* `$wpdb->num_rows` is set to the number of rows in a result for a SELECT query.
* `$wpdb->last_result` will contain an array of row objects generated through the `mysql_fetch_object()` PHP function.

The return value of the `$wpdb->query()` method is based on the top of query run and if the query was successful or not:

* `False` is returned if the query failed. You can test for this using code like `if($wpdb->query($query) === false) { wp_die(“it failed!”); }`.
* The raw MySQL result is returned on CREATE, ALTER, TRUNCATE, and DROP queries.
* The number of rows affected is returned for INSERT, UPDATE, DELETE, and REPLACE queries.
* The number of rows returned is returned for SELECT queries.

### Escaping in DB queries

It should be noted that values passed into the `query()` method are not escaped automatically. Therefore, you will always need to escape untrusted input when using the `query()` method directly.

There are two main ways of escaping values used in your SQL queries: you can wrap your variables in the `esc_sql()` function or you can use the `$wpdb->prepare()` method to build your query.

```
global $wpdb;
$user_query = $_REQUEST[‘uq’];

$sqlQuery = “SELECT user_login FROM $wpdb->users WHERE
user_login LIKE ‘%” . esc_sql($user_query) . “%’ OR
user_email LIKE ‘%” . esc_sql($user_query) . “%’ OR
display_name LIKE ‘%” . esc_sql($user_query) . “%’
”;
$user_logins = $wpdb->get_col($sqlQuery);

if(!empty($user_logins))
{
        echo “<ul>”;
foreach($user_logins as $user_login)
        {
                echo “<li>$user_login</li>”;
}
echo “</ul>”;
}
```

Alternatively, you could create the query using the `prepare()` method, which functions similarly to the `sprintf()` and `printf()` functions in PHP. This method of the $wpdb class located in _wp-includes/wp-db.php_ accepts two or more parameters:

* $query—A string of your custom SQL statement with placeholders for each dynamic value.
* $args—One or more additional parameters to be used to replace the placeholders in your SQL statement.

The following directives can be used in the SQL statement string:

* %d (integer)
* %f (float)
* %s (string)
* %% (literal percentage sign–-no argument needed)

The directives %d, %f, and %s should be left unquoted in the SQL statement, and each placeholder used needs to have a corresponding argument passed in for it. Literals (%) as part of the query must be properly written as %%:

```
$sqlQuery = $wpdb->prepare(“SELECT user_login FROM $wpdb->users WHERE
user_login LIKE %%%s%% OR
user_email LIKE %%%s%% OR
display_name LIKE %%%s%%”, $user_query, $user_query, $user_query);
$user_logins = $wpdb->get_col($sqlQuery);
```

If you use `$wpdb->prepare()` without including the `$args` parameter, you will get a PHP warning message: “Missing argument 2 for `wpdb::prepare()`“. If your SQL doesn’t use any placeholder values, you don’t need to use `prepare()`.

Holy percent sign, Batman! The `%` is used in SQL as a wildcard in SELECT statements when using the LIKE keyword. So if you searched for `user_login LIKE %coleman%`, it would return users with user logins like “jcoleman” and “jasoncoleman” and “coleman1982.” To keep these _literal_ % signs in place with the `prepare()` method, we need to double them up to `%%`, which is translated into just one % in the final query.

The other % in there is used with `%s`, which is the placeholder where our `$user_query` parameter is going to be swapped in after being escaped.

You may have noticed we used the `$wpdb->get_col()` method in the previous code segment. WordPress offers many useful methods on the `$wpdb` object to SELECTs, INSERTs, and other common queries in MySQL.

### SELECT queries with $wpdb

The WordPress `$wpdb` object has a few useful methods for selecting arrays, objects, rows, columns, or even single values out of the MySQL database using SQL queries.

`$wpdb→get_results($query, $output_type)` will run your query and return the `last_results` array, including all of the rows from your SQL query in the output type specified. By default, the result will be a “numerically indexed array of row objects.” Here’s the full list of output types from the WordPress Codex:

- OBJECT 

    Result will be output as a numerically indexed array of row objects.

- OBJECT_K

    Result will be output as an associative array of row objects, using the first column’s values as keys (duplicates will be discarded).

- ARRAY_A

    Result will be output as an numerically indexed array of associative arrays, using column names as keys.

- ARRAY_N

    Result will be output as a numerically indexed array of numerically indexed arrays.

The following code helps show how to use the array returned by `$wpdb->get_results()` when using the `OBJECT` output type:

```php
<?php
global $wpdb;
$sqlQuery = "SELECT * FROM $wpdb->posts
        WHERE post_type = 'assignment'
        AND post_status = 'publish' LIMIT 10";
$assignments = $wpdb->get_results( $sqlQuery );

// rows are stored in an array, use foreach to loop through them
foreach ( $assignments as $assignment ) {
// each item is an object with property names equal to the SQL column names?>
<h3><?php echo $assignment->post_title;?></h3>
<?php echo apply_filters( "the_content", $assignment->post_content );?>
<?php
}
?>
```

`$wpdb→get_col($query, $collumn_offset = 0)` will return an array of the values in the first column of the MySQL results. The `$collumn_offset` parameter can be used to grab other columns from the results (0 is the first, 1 is the second, and so on).

This function is most commonly used to grab IDs from a database table to be used in another function call or DB query:

```
<?php
global $wpdb;
$sqlQuery = "SELECT ID FROM $wpdb->posts
        WHERE post_type = 'assignment'
        AND post_status = 'publish'
        LIMIT 10";
// getting IDs
$assignment_ids = $wpdb->get_col( $sqlQuery );

// result is an array, loop through them
foreach ( $assignment_ids as $assignment_id ) {
        // we have the id, we can use get_post to get more data
        $assignment = get_post( $assignment_id );
        ?>
        <h3><?php echo $assignment->post_title;?></h3>
        <?php echo apply_filters( "the_content", $assignment->post_content );?>
        <?php
}
?>
```

Note that we’re putting that `global $wpdb;` line in most of our examples here to reinforce the point that you need to make sure that `$wpdb` is in scope before calling one of its methods. In practice, this line is usually at the top of the function or file you are working within.

`$wpdb→get_row($query,  $output_type, $row_offset)` is used to get just one row from a result. Instead of getting an array of results, you will just get the first object (or array if the `$output_type` is specified) from the result set.

You can use the `$row_offset` parameter to grab a different row from the results (0 is the first, 1 is the second, and so on).

### Insert, replace, and update

`$wpdb→insert($table, $data, $format)` can be used to insert data into the database. Rather than building your own INSERT query, you simply pass the table name and an associative array containing the row data and WordPress will build the query and escape it for you. The keys of your `$data` array must map to column names in the table. The values in the array are the values to insert into the table row:

```
<?php
// processing new submissions for assignments
global $wpdb, $current_user;

// create submission
$assignment_id = intval( $_REQUEST['assignment_id'] );
$submission_id = wp_insert_post(
        array(
                'post_type'    => 'submission',
                'post_author'  => $current_user->ID,
                'post_title'   => sanitize_title( $_REQUEST['title'] ),
                'post_content' => sanitize_text_field( $_POST['submission'] )
        )
);

// connect the submission to the assignment
$wpdb->insert(
  $wpdb->schoolpress_assignment_submissions,
  array( "assignment_id"=>$assignment_id, "submission_id"=>$submission_id ),
  array( '%d', '%d' )
);

/*
        This insert call will generate a SQL query like:
        INSERT INTO
        'wp_schoolpress_assignment_submissions'

        ('assignment_id','submission_id' VALUES (101,10)
*/
?>
```

In the previous code, we use `wp_insert_post()` to create the submission then use `$wpdb->insert()` to insert a row into our custom table connecting assignments with submissions.

We pass an array of formats to the third parameter to tell the method to format the data as integers when constructing the SQL query. The available formats are %s for strings, %d for integers, and %f for floats. If no format is specified, all data will be formatted as a string. In most cases, MySQL will properly cast your string into the format needed to store it in the actual table.

To relate two posts like this, we could also simply put the `assignment_id` into the `post_parent` column of the `wp_posts` table. This is adequate to create a parent/child relationship. However, if you want to do a many-to-many relationship (e.g., if you can post the same submission to multiple assignments), you need a separate table or some other way to connect a post to many other posts.

`$wpdb→replace($table, $data, $format)` is similar to the `$wpdb->insert()` method. The `$wpdb->replace()` method will literally generate the same exact SQL query as `$wpdb->insert()` but uses the MySQL REPLACE command instead of INSERT, which will override any row with the same keys as the `$data` passed in.

`$wpdb→update($table, $data, $where, $format = null, $where_format = null )` can be used to update rows in a database table. Rather than building your own UPDATE query, you simply pass the table and an associative array containing the updated columns and new data along with an associative array `$where` containing the fields to check against in the WHERE clause and WordPress will build the query and escape the UPDATE query for you.

The `$where` and `$where_format` parameters work the same as the `$data` and `$format` arrays, respectively.

The WHERE clause generated by the `update()` method will check that the columns are equal to the values passed and those checks are combined together by AND conditions.

The `update()` method is particularly useful in that you can update any number of fields in an table row using the same function. Here is some code that could be used to update orders in an ecommerce plugin:

```php
<?php
global $wpdb;
// just update the status
$wpdb->update(
        'ecommerce_orders',   //table name
        array( 'status' => 'paid' ),  //data fields
        array( 'id' => $order_id )  //where fields
);

// update more data about the order
$wpdb->update(
        'ecommerce_orders',   //table name
        array( 'status' => 'pending',  //data fields
                'subtotal' => '100.00',
                'tax' => '6.00',
                'total' => '106.00'
        ),
        array( 'id' => $order_id )  //where fields
);
?>
```

1.  $wp_query—An object of the `WP_Query` class that can show you all of the post content returned by WordPress for any given page that you are on.``` We will talk more about the WP_Query class and its methods in the next chapter.`````````
2.  $current_user—An object of all of the data associated with the currently logged-in user. Not only does this object return all of the data for the current user from the `wp_users` table, but it will also tell you the roles and capabilities of the current user:

```
<?php
//welcome the logged-in user
global $current_user;
if ( !empty( $current_user->ID ) ) {
        echo 'Howdy, ' . $current_user->display_name;
}
?>
```

When writing your own code to run on WordPress, you can define and use your own global variables if it makes sense. Global variables can save you the hassle of rewriting code and recalling functions because once they are defined, you can use them over and over again.