layout: post
title: "WordPress Custom Post Types, Post Metadata, and Taxonomies"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

Custom post types (CPTs) are what really make WordPress a content management system. With CPTs, you can quickly build out custom functionality and store data in a consistent way.

## Default Post Types and Custom Post Types

With a default installation of WordPress, you have several post types already being used. The post types you may be most familiar with are pages and posts, but there are a few more. These post type values are all stored in the database `wp_posts` table, and they all use the `post_type` field to separate them.

### Page

WordPress pages are what you use for your static content pages like home, about, contact info, bio, or any custom page you want. Pages can be indefinitely nested under each other in any hierarchical structure. Pages can also be sorted by `menu_order` value.

### Post

Your posts are your blog or news or whatever you want to call your constant barrage of content to be indexed by search engines on the Internet. You can categorize your posts, tag them with keywords, set publish dates, and more. In general, posts are shown in some kind of list view in reverse chronological order on the frontend of your website.

### Attachment

Any time you upload an image or file to a post, it stores the file not only on the server but also as a post in the `wp_posts` table with a `post_type` attachment.

### Revisions

WordPress has your back and saves your posts as revisions every time you or anyone edits a post. This feature is on by default and can be used to revert your content back to what it was if something got messed up along the way.

Sometimes the `wp_posts` table gets flooded with post revisions if your application is set up to make a lot of `post_content` changes, so you may want to limit the amount of revisions stored in the `wp_posts` table. To do this, put the following code in your _wp-config.php_ file: `define( 'WP_POST_REVISIONS', 5 );` The number 5 is the number of revision posts to store for a given post. A value of `0` will turn off post revisions. A value of `true` or `-1` will store an infinite number of revisions (it can take a lot of disk space to store infinity something).

### Nav Menu Item

Every time you build a custom menu using the WordPress core menu builder (wp-admin → appearance → menus) you are storing posts with information for your menus.

## Defining and Registering Custom Post Types

Just like the default WordPress post types, you can create your own CPTs to manage any data you need, depending on what you are building. Every CPT is really just a post used differently. You could register a custom post type for a dinner menu at a restaurant, for cars for an auto dealer, for people to track patient information and documents at a doctors office, or for pretty much anything you can think of. No, really any type of content you can think of can be stored as a post with attached files, custom metadata, and custom taxonomies.

In our SchoolPress example, we are going to be building a CPT for managing homework assignments on a teacher’s website. Our teacher wants to make a post of some kind where he can add assignments and their students can get to them on the class website. He also wants to be able to upload supporting documents and have commenting available in case any of his students has questions. A CPT sounds in order, doesn’t it?

We can store this information the same way posts are dealt with and display them to the end user in the theme using the same `wp_query` loop we would with posts.

### register_post_type( $post_type, $args );

You can register a CPT with the function `register_post_type()`, and in most cases, you are going to register your CPT in your theme’s _functions.php_ file or in a custom plugin file. This function expects two parameters: the name of the post type you are creating and an array of arguments:

* $post_type—The name of your custom post type; in our example, our custom post type name is “homework.” This string must be no longer than 20 characters and can’t have capital letters, spaces, or any special characters except a hyphen or an underscore.
* $args—This is an array of many different arguments that will dictate how your custom post type will be set up. The following is a list of all of the available arguments and what they are used for.

#### label

The display name of your post type. In our example, we use “Homework.”

#### labels

An optional array of labels to use for describing your post type throughout the user interface:

* _name_—The plural display name of your post type. This will override the label argument.
* _singular_name_—The singular name for any particular post. This defaults to the name if not specified.
* _add_new_—Defaults to the string “Add New.”
* _add_new_item_—Defaults to “Add New Post.”
* _edit_item_—Defaults to “Edit Post.”
* _new_item_—Defaults to “New Post.”
* _view_item_—Defaults to “View Post.”
* _search_items_—Defaults to “Search Posts.”
* _not_found_—Defaults to “No Posts Found.”
* _not_found_in_trash_—Defaults to “No posts found in Trash.”
* _parent_item_colon_—Defaults to “Parent Page:” and is only used on hierarchical post types.
* _all_items_—Defaults to “All Posts.”

#### menu_name

The menu name for the post type, usually the same as `label` or `labels->name`.

#### description

An optional string that describes your post type.

#### publicly_queryable

An optional Boolean that specifies if queries on your post type can be run on the frontend or theme of your application. By default, `publicly_queryable` is turned on.

#### exclude_from_search

An optional Boolean that specifies if your post type posts can be queried and displayed in the default WordPress search results. This is off by default so that your posts will be searchable.

#### capability_type

An optional string or array. If not specifically defined, `capability_type` will default to `post`. You can pass in a string of an existing post type, and the new post type you are registering will inherit that post type’s capabilities. You can also define your own capability type, which will set default capabilities for your custom post type for reading, publishing, editing, and deleting. You can also pass in an array if you want to use different singular and plural words for your capabilities. For example, you can just pass in the string “homework” since the singular and plural forms for “homework” are the same, but you would pass in an array like `array( 'submission', 'submissions' )` when the forms are different.

#### capabilities

An optional array of the capabilities of the post type you are registering. You can use this instead of `capability_type` if you want more granular control over the capabilities you are assigning to your new custom post type.

There are two types of capabilities: meta and primitive. Meta capabilities are tied to specific posts, whereas primitive capabilities are more general purpose. In practice, this means that when checking if a user has a meta capability, you must pass in a `$post_id` parameter:

```
//meta capabilities are related to specific posts
if(current_user_can("edit_post", $post_id))
{
  //the current user can edit the post with ID = $post_id
}
```

Unlike meta capabilities, primitive capabilities aren’t checked against a specific post:

```
//primitive capabilities aren't related to specific posts
if(current_user_can("edit_posts"))
{
  //the current user can edit posts in general
}
```

The capabilities that can be assigned to your custom post type are:

* _edit_post_—A meta capability for a user to edit a particular post.
* _read_post_—A meta capability for a user to read a particular post.
* _delete_post_—A meta capability for a user to delete a particular post.
* _edit_posts_—A primitive capability for a user to be able to create and edit posts.
* _edit_others_posts_—A primitive capability for a user to be able to edit others’ posts.
* _publish_posts_—A primitive capability for a user to be able to publish posts.
* _read_private_posts_—A primitive capability for a user to be able to read private posts.
* _read_—A primitive capability for a user to be able to read posts.
* _delete_posts_—A primitive capability for a user to be able to delete posts.
* _delete_private_posts_—A primitive capability for a user to be able to delete private posts.
* _delete_published_posts_—A primitive capability for a user to be able to delete posts.
* _delete_others_posts_—A primitive capability for a user to be able to delete other peoples posts.
* _edit_private_posts_—A primitive capability for a user to be able to edit private posts.
* _edit_published_posts_—A primitive capability for a user to be able to publish posts.

#### map_meta_cap

Whether to use the internal default meta capability handling (capabilities and roles are covered in [Chapter 6](ch06.html "Chapter 6. Users, Roles, and Capabilities")). Defaults to false. You can always define your own capabilities using `capabilities`; but if you don’t, setting `map_meta_cap` to `true` will make the following primitive capabilities be used by default or in addition to using `capability_type`:

* _read_
* _delete_posts_
* _delete_private_posts_
* _delete_published_posts_
* _delete_others_posts_
* _edit_private_posts_
* _edit_published_posts_

#### hierarchical

An optional Boolean that specifies if a post can be hierarchical and have a parent post or not. WordPress pages are set up like this so you can nest pages under other pages. The hierarchical argument is turned off by default.

#### public

An optional Boolean that specifies if a post type is supposed to be used publicly or not in the backend or frontend of WordPress. By default, this argument is `false`; so without including this argument and setting it to `true`, you wouldn’t be able to use this `post_type` in your theme. If you set `public` to `true`, it will automatically set `exclude_from_search`, `publicly_queryable` and `show_ui_nav_menus` to `true` unless otherwise specified.

Most CPTs will be public so they are shown on the frontend or available to manage through the WordPress dashboard. Other CPTs (like the default Revisions CPT) are updated behind the scenes based on other interactions with your app and would have `public` set to `false`.

#### rewrite

An optional Boolean or array used to create a custom permalink structure for a post type. By default, this is set to `true`, and the permalink structure for a custom post is `/post_type/post_title/`. If set to `false`, no custom permalink would be created. You can completely customize the permalink structure of a post by passing in an array with the following arguments:

<dl>
    <dt>slug</dt>
    <dd>Defaults to the `post_type` but can be any string you want. Remember not to use the same slug in more than one post type because they have to be unique.</dd>
    <dt>with_front</dt>
    <dd>Whether or not to prepend the “front base” to the front of the CPT permalink. If set to `true`, the slug of the “front page” set on the Settings → Reading page of the dashboard will be added to the permalink for posts of this post type.</dd>
    <dt>feeds</dt>
    <dd>Boolean that specifies if a post type can have an RSS feed. The default value of this argument is set to the value of the `has_archive` argument. If `feeds` is set to `false`, no feeds will be available.</dd>
    <dt>pages</dt>
    <dd>Boolean that turns on pagination for a post type. If `true`, archive pages for this post type will support pagination.</dd>
    <dt>ep_mask</dt>
    <dd>EP or endpoints can be very useful. With this argument you assign an endpoint mask for a post type. For instance, we could set up an endpoint for a post type of homework called “pop-quiz.” The permalink would look like `/homework/post-title/pop-quiz/`. In MVC terminology, a CPT is similar to a module, and endpoints can be thought of as different views for that module. Endpoints and other rewrite functions are covered in [Chapter 7](ch07.html "Chapter 7. Other WordPress APIs, Objects, and Helper Functions").</dd>
</dl>

#### has_archive

An optional Boolean or string that specifies if a post type can have an archive page or not. By default this argument is set to `false`, so you will want to set it to `true` if you would like to use it in your theme. The _archive-{post_type}.php_ file in your theme will be used to render the archive page. If that file is not available, the _archive.php_ or _index.php_ file will be used instead.

#### query_var

An optional Boolean or string that sets the `query_var` key for the post type. This is the name of your post type in the database and used when writing queries to work with this post type. The default value for this argument is set to the value of `post_type` argument. In most cases you wouldn’t need your `query_var` and your `post_type` to be different, but you can imagine a long post type name like directory_entry that you would want to use a shorter slug like “dir” for.

#### supports

An optional Boolean or array that specifies what meta box features will be made available on the new post or edit post page. By default, an array with the arguments of `title` and `editor` are passed in. The following is a list of all of the available arguments:

* title
* editor
* comments
* revisions
* trackbacks
* author
* excerpt
* page-attributes
* thumbnail
* custom-fields
* post-formats

If you plan to use one of these features with your CPT, make sure it is included in the `supports` array.

#### register_meta_box_cb

An optional string that allows you to provide a custom callback function for integrating your own custom meta boxes.

#### permalink_epmask

An optional string for specifying which endpoint types you would like to associate with a custom post type. The default rewrite endpoint bitmask is EP_PERMALINK. For more information on endpoints.

#### taxonomies

An optional array that specifies any built-in (categories and tags) or custom registered taxonomies you would like to associate with a post type. By default, no taxonomies are referenced. For more information on taxonomies.

#### show_ui

An optional Boolean that specifies if the basic post UI will be made available for a post type in the backend. The default value is set to the value of the `public` argument. If `show_ui` is `false`, you will have no way of populating your posts from the backend admin area.

It’s a good idea to set show_ui to true, even for CPTs that won’t generally be added or edited through the admin dashboard. For example, the bbPress plugin adds Topics and Replies as CPTs that are added and edited through the forum UI on the frontend. However, show_ui is set to true, providing another interface for admins to search, view, and manage topics and replies from.

#### menu_position

An optional integer used to set the menu order of a post type menu item in the backend, left-side navigation.

The WordPress Codex provides [a nice list of common menu position values](http://bit.ly/reg-post-type) to help you figure out where to place the menu item for your CPT:

* 5—below Posts
* 10—below Media
* 15—below Links
* 20—below Pages
* 25—below comments
* 60—below first separator
* 65—below Plugins
* 70—below Users
* 75—below Tools
* 80—below Settings
* 100—below second separator

#### menu_icon

An optional string of a URL to a custom icon that can be used to represent a post type.

#### can_export

An optional Boolean that specifies if a post type can be exported via the WordPress exporter in Tools → Export. This argument is set to `true` by default, allowing the admin to export.

#### show_in_nav_menus

An optional Boolean that specifies if posts from a post type can be added to a custom navigation menu in Apperance → Menus. The default value of this argument is set to the value of the public argument.

#### show_in_menu

An optional Boolean or string that specifies whether to show the post type in the backend admin menu and possibly where to show it. If set to `true`, the post type is displayed as its own item on the menu. If set to `false`, no menu item for the post type is shown. You can also pass in a string of the name of any other menu item. Doing this will place the post type in the submenu of the passed-in menu item. The default value of this argument is set to the value of the `show_ui` argument.

#### show_in_admin_bar

An optional Boolean that specifies if a post type is available in the WordPress admin bar. The default value of this argument is set to the value of the `show_in_menu` argument.

#### delete_with_user

An optional Boolean that specifies whether to delete all of the posts for a post type created by any given user. If set to `true`, posts the user created will be moved to the trash when the user is deleted. If set to `false`, posts will not be moved to the trash when the user is deleted. By default, posts are moved to the trash if the argument `post_type_supports` has `author` within it. If not, posts are not moved to the trash.

#### _builtin

You shouldn’t ever need to use this argument. Default WordPress post types use this to differentiate themselves from custom post types.

#### _edit_link

The URL of the edit link on the post. This is also for internal use, and you shouldn’t need to use it. If you’d like to change the page linked to when clicking to edit a post, use the `get_edit_post_link` filter, which passes the default edit link along with the ID of the post.

```
<?php
// custom function to register a "homework" post type
function schoolpress_register_post_type_homework() {
    register_post_type( 'homework',
        array(
            'labels' => array(
                        'name' => __( 'Homework' ),
                                'singular_name' => __( 'Homework' )
                        ),
                'public' => true,
                'has_archive' => true,
                )
        );
}
// call our custom function with the init hook
add_action( 'init', 'schoolpress_register_post_type_homework' );

// custom function to register a "submissions" post type
function schoolpress_register_post_type_submission() {
    register_post_type( 'submissions',
        array(
            'labels' => array(
                                'name' => __( 'Submissions' ),
                                'singular_name' => __( 'Submission' )
                        ),
                'public' => true,
                'has_archive' => true,
                )
        );
}
// call our custom function with the init hook
add_action( 'init', 'schoolpress_register_post_type_submission' );
?>
```

You can find the code for the `register_post_type()` function in _wp-includes/post.php_. Notice that in our example we are only using a few of the many available arguments.

If you dropped the preceding code in your ``active theme’s _functions.php_ file or an active plugin, you should notice two new menu items on the WordPress admin called “Homework” and “Submissions” under the “Comments” menu item.

If you get tired of writing your own functions to register the various custom post types that you want to use, you can use this cool plugin called Custom Post Types UI.

## Taxonomy

Taxonomies group posts by terms. Think post categories and post tags; these are just built-in taxonomies attached to the default “post” post type. You can define as many custom taxonomies or categories as you want and span them across multiple post types. For example, we can create a custom taxonomy called “Subject” that has all school-related subjects as its terms and is tied to our “Homework” custom post type.

meta_id | post_id | meta_key | meta_value
------- | ------- | -------- | ----------
1       | 1       | due_date | 2014-09-07
2       | 2       | due_date | 2014-09-14

The `meta_id`, `post_id`, and `meta_key` columns are indexed, but the `meta_value` column is not. This means that queries like “get the due date for this assignment” will run quickly, but queries like “get all assignments due on 2014-09-07” will run slower, especially if you have a large site with lots of data piled into the `wp_postmeta` table. The reason the `meta_value` key is the lone column in `wp_postmeta` without an index is that adding an index here would greatly increase both the storage required for this table and also the insert times. In practice, a site is going to have many different meta values, whereas there will be a smaller set of post IDs and meta keys to build indexes for.

If you stored assignment due dates in a custom taxonomy, the “get all assignments due on this date” query will run much faster. Each specific due date would be a term in the `wp_terms` table with a corresponding entry in the `wp_terms_taxonomy` table. The `wp_terms_relationships` table that attaches terms to posts has both the `object_id` (posts are objects here) and `term_taxonomy_id` fields indexed. So “get all posts with this term_taxonomy_id” is a speedy query.

If you just want to show the due date on the assignment page, you should store it in the post meta fields. If you want to offer a report of all assignments due on a certain date, you should consider adding a taxonomy to track due dates.

On the other hand, due to the nature of due dates (you potentially have 365 new terms each year), using a taxonomy for them might be overkill. You would end up with a lot of useless terms in your database keeping track of which assignments were due two years ago.

Also, in this specific case, the speed increases might be negligible because the due date report is for a subset of assignments within a specific class group. In practice, we won’t be querying for assignments by due date across the entire `wp_postmeta` table. We’ll filter the query to only run on assignment posts for a specific class. While there may be millions and millions of rows in the `wp_postmeta` table for a SchoolPress site at scale (hundreds of schools, thousands of teachers and classes), there are only going be a few assignments for a specific class or group of classes one student is in.

Another consideration when choosing between meta fields and taxonomies is how that data is going to be managed by users.

If a field is only going to be used in the backend code, and you don’t have query speed issues, storing it in post meta is as simple as one call to `update_post_meta()`.

`If you’d like admins to be able to create new terms, write descriptions for them, build hierarchies, and use dropdowns or checkboxes to assign them to posts, well then I’ve just described exactly what you get for free when you register a taxonomy. When using post meta fields, you need to build your own UI into a meta box.

Finally, I did mention earlier that there are times when you want to use both a meta field _and_ a taxonomy to track one piece of data. An example of this in the context of the SchoolPress app could be tracking a textbook and chapter for an assignment. Imagine you want a report for a student with all of her assignments organized by textbook and ordered by chapter within those books.

Because you want to allow teachers to manage textbooks as terms in the admin, and you will want to do queries like “get all assignments for this textbook,” it makes sense to store textbooks in a custom taxonomy.

On the other hand, chapters can be stored in post meta fields. Chapters are common across books and assignments, but it doesn’t make sense to query for “all chapter 1 assignments” across many different textbooks. Since we’ll be able to pre-filter to get all assignments by textbook or by student, we can use a chapter meta field, or possibly a textbook_chapter meta field with data like “PrinciplesOfMath.Ch1” to order the assignments for the report.

Phew… now that we’ve figured out when we’ll want to use taxonomies, let’s find out how to create them.

### Creating Custom Taxonomies

You can register your own taxonomies with the function `register_taxonomy()`, which is found in _wp-includes/taxonomy.php_.

### register_taxonomy( $taxonomy, $object_type, $args )

The `register_taxonomy()` function accepts the following three parameters:

* $taxonomy—A required string of the name of your taxonomy. In our example, our taxonomy name is “subject.”
* $object_type—A required array or string of the custom post type(s) you are attaching this taxonomy to. In our example, we are using a string and attaching the subject taxonomy to the homework post type. We could set it to more that one post type by passing in an array of post type names.
* $args—This is an optional array of many different arguments that dictate how your custom taxonomy will be set up. Notice that in our example we are only using a few of the many available arguments that could be passed into the `register_taxonomy()` function. Below is a list of all of the available arguments:

#### label

Optional string of the display name of your taxonomy.

#### labels

Optional array of labels to use for describing your taxonomy throughout the user interface:

- name
    
    The plural display name of your taxonomy. This will override the label argument.

- singular_name

    The name for one object of this taxonomy. Defaults to “Category.”

- search_items

    Defaults to “Search Categories”.

- popular_items

    This string isn’t used on hierarchical taxonomies. Defaults to “Popular Tags.”

- all_items

    Defaults to “All Categories”.

- parent_item

    This string is only used on hierarchical taxonomies. Defaults to “Parent Category.”

- parent_item_colon

    The same as the parent_item argument but with a colon at the end.

- edit_item

    Defaults to “Edit Category.”

- view_item

    Defaults to “View Category.”

- update_item

    Defaults to “Update Category.”

- add_new_item

    Defaults to “Add New Category.”

- new_item_name

    Defaults to “New Category Name.”

- separate_items_with_commas

    This string is used on nonhierarchical taxonomies. Defaults to “Separate tags with commas.”

- add_or_remove_items

    This string is used on nonhierarchical taxonomies. Defaults to “Add or remove tags.”

- choose_from_most_used

    This string is used on nonhierarchical taxonomies. Defaults to “Choose from the most used tags.”

#### hierarchical

Optional Boolean that specifies if a taxonomy is hierarchical or that a taxonomy term may have parent terms or subterms. This is just like the default categories taxonomy. Nonhierarchical taxonomies are like the default tags taxonomy. The default value for this argument is set to `false`.

#### update_count_callback

Optional string that works like a hook. It’s called when the count of the associated post type is updated.

#### rewrite

Optional Boolean or array that is used to customize the permalink structure of a taxonomy. The default rewrite value is set to the taxonomy slug.

#### query_var

Optional Boolean or string that can be used to customize the query var, `?$query_var=$term`. By default, the taxonomy name is used as the query var.

#### public

Optional Boolean that specifies if the taxonomy should be publicly queryable on the frontend. The default is set to `true`.

#### show_ui

Optional Boolean that specifies if the taxonomy will have a backend admin UI, similar to the categories or tags interface. The default value of this argument is set to the value of the `public` argument.

#### show_in_nav_menus

Optional Boolean that specifies if a taxonomy will be available in navigation menus. The default value of this argument is set to the value of the `public` argument.

#### show_tagcloud

Optional Boolean that specifies if the taxonomy can be included in the Tag Cloud Widget. The default value of this argument is set to the value of the `show_ui` argument.

#### show_admin_column

Optional Boolean that specifies if a new column will be created for your taxonomy on the post type it is attached to on the post type’s edit/list page in the backend. This is `false` by default.

#### capabilities

Optional array of capabilities for this taxonomy with a default of `none`. You can pass in the following arguments and/or any custom-created capabilities:

* manage_terms
* edit_terms
* delete_terms
* assign_terms

In our homework post type example, we are going to make a taxonomy called “Subject” so we can create a term for each subject like math, science, language arts, and social studies:

```
<?php
// custom function to register the "subject" taxonomy
function schoolpress_register_taxonomy_subject() {
   register_taxonomy(
      'subject',
      'homework',
      array(
         'label' => __( 'Subjects' ),
         'rewrite' => array( 'slug' => 'subject' ),
         'hierarchical' => true
      )
   );
}
// call our custom function with the init hook
add_action( 'init', 'schoolpress_register_taxonomy_subject' );
?>
```

Notice in the preceding code the subject taxonomy is set up like categories on a post because it’s hierarchical argument is set to `true`. You can create as many subjects as you would like and nest them under each other.

Under Homework → Subjects in the backend, you can add your terms the same way you would add new categories to a post.

### register_taxonomy_for_object_type( $taxonomy, $object_type )

What if you wanted to use a default taxonomy on a custom post type? Say you want to use the same tags taxonomy attached to the posts post type on our homework post type. You can use the `register_taxonomy_for_object_type()` function to attach any taxonomies to any post types. The `register_taxonomy_for_object_type()` function is also located in _wp-includes/taxonomy.php_.

The `register_taxonomy_for_object_type()` function accepts two parameters:

* $taxonomy—Required string of the name of the taxonomy.
* $object_type—Required string of the name of the post type to which you want to attach your taxonomy.

In this example, we are attaching the default tags taxonomy to our custom homework post type:

```php
<?php
function schoolpress_register_taxonomy_for_object_type_homework(){
        register_taxonomy_for_object_type( 'post_tag', 'homework' );
}
add_action( 'init', 'schoolpress_register_taxonomy_for_object_type_homework' );
?>
```

If you run the example, you should notice that the “tags” taxonomy is now available under the Homework menu item. The Custom Post Types UI plugin also has a UI for creating and managing custom taxonomies.

## Using Custom Post Types and Taxonomies in Your Themes and Plugins

Most of the time when building a web application with WordPress, you will want to display your custom post type posts in the frontend within your theme.

### The Theme Archive and Single Template Files

Most WordPress themes will have an _archive.php_ file that renders your posts on a archive/listing page and a _single.php_ file that is responsible for rendering information about a single post. You can create dedicated archive and single files for your registered CPTs very easily.

Make a copy of _archive.php_ and name it _archive-homework.php_. You should now automatically have a listing archive page of all of your homework assignment posts in the same format of your regular posts archive page (at _domain.com/homework/_).

This same method can be applied to the _single.php_ file. Make a copy if it and call it _single-homework.php_. You should now have a single page for each of your homework assignments (at _domain.com/homework/science-worksheet/_). Now you can change the markup of the CPT archive or single file to display your data differently from how your blog posts are displayed.

In order to use a custom archive file, you must set the `has_archive` argument when registering your custom post type to `true`. The `has_archive` argument is part of the `register_post_type()` function.

### Good Old WP_Query and get_posts()

In some instances, creating an archive and single .php file for your custom post type may not be enough for the custom functionality you require. What if you wanted to loop through all of the posts for a specific post type in a sidebar widget or in a shortcode on a page? With WP_Query or get_posts(), you can set the post_type parameter to query and loop through your CPT posts the same way you would with regular posts.

```php
<?php
function schoolpress_the_content_homework_submission($content){

  global $post;

   // Don't do this for any other post type than homework
   // and if a user is not logged in
   $current_user = wp_get_current_user();
   if ( ! is_single() || $post->post_type != 'homework' || ! $current_user )
                  return $content;

        // check if the current user has already made a submission to this
    // homework assignment
        $submissions = get_posts( array(
                'post_author'    => $current_user->ID,
                'posts_per_page' => '1',
                'post_type'      => 'submissions',
                'meta_key'       => '_submission_homework_id',
                'meta_value'     => $post->ID
        ) );
        foreach ( $submissions as $submission ) {
                $submission_id = $submission->ID;
        }

        // Process the form submission if the user hasn't already
        if ( !$submission_id &&
                        isset( $_POST['submit-homework-submission'] ) &&
                        isset( $_POST['homework-submission'] ) ) {

                $submission = $_POST['homework-submission'];
                $post_title = $post->post_title;
                $post_title .= ' - Submission by ' . $current_user->display_name;
                // Insert the current users submission as a post into our
        // submissions CPT.
                $args = array(
                        'post_title'   => $post_title,
                        'post_content' => $submission,
                        'post_type'    => 'submissions',
                        'post_status'  => 'publish',
                        'post_author'  => $current_user->ID
                );
                $submission_id = wp_insert_post( $args );
                // add post meta to tie this submission post to the
        // homework post
                add_post_meta( $submission_id, '_submission_homework_id',
        $post->ID );
                // create a custom message
                $message = __(
                        'Your homework has been submitted and is
             awaiting review.',
                        'schoolpress'
                );
                $message = '<div class="homework-submission-message">' . $message .
          '</div>';
                // drop message before the filtered $content variable
                $content = $message . $content;
        }

        // Add a link to the user's submission if a submssion was already made
        if( $submission_id ) {

                $message = sprintf( __(
                        'Click %s here %s to view your submission to this homework
              assignment.',
                        'schoolpress' ),
                        '<a href="' . get_permalink( $submission_id ) . '">',
                        '</a>' );
                $message = '<div class="homework-submission-link">' . $message .
           '</div>';
                $content .= $message;

        // Add a basic submission form after the $content variable being filtered.
        } else {

         ob_start();
         ?>
         <h3><?php _e( 'Submit your Homework below!', 'schoolpress' );?></h3>
         <form method="post">
         <?php
         wp_editor( '', 'homework-submission', array( 'media_buttons' => false ) );
         ?>
         <input type="submit" name="submit-homework-submission" value="Submit" />
         </form>
         <?php
         $form = ob_get_contents();
         ob_end_clean();
         $content .= $form;
        }

        return $content;

}
// add a filter on 'the_content' so we can run our custom code to deal with
// homework submissions
add_filter( 'the_content', 'schoolpress_the_content_homework_submission', 999 );
?>
```

You probably noticed the following functions that we haven’t discussed yet:

* ob_start()`—This PHP function is used to turn output buffering on. While output buffering is active, no output is sent to the browser; instead the output is stored in an internal buffer.
* wp_editor()`—This WordPress function outputs the same WYSIWYG editor that you get while adding or editing a post. You can call this function anywhere you would like to stick an editor. We thought the homework submission form would be a perfect place. 
* ob_get_contents()`—We set a variable called `$form` to this PHP function. This makes all content between calling the `ob_start()` function and this function into a variable called `$form`.
* ob_end_clean()`—This PHP function clears the output buffer and turns off output buffering.

We used these functions in the previous sequence because the `wp_editor()` function does not currently have an argument to return the editor as a variable and outputs it to the browser when it’s called. If we didn’t use these functions, we wouldn’t be able to put our editor after the `$content` variable passed into the `the_content` filter.

In the following code, we are going to make sure that only administrators have access to all homework submissions and that all other users only have access to homework submissions that they made:

```
<?php
function schoolpress_submissions_template_redirect(){
    global $post, $user_ID;

    // only run this function for the submissions post type
    if ( $post->post_type != 'submissions' )
        return;

    // check if post_author is the current user_ID
    if ( $post->post_author == $user_ID )
        $no_redirect = true;

    // check if current user is an administrator
    if ( current_user_can( 'manage_options' ) )
        $no_redirect = true;

    // if $no_redirect is false redirect to the home page
    if ( ! $no_redirect ) {
        wp_redirect( home_url() );
        exit();
    }
}
// use the template_redirect hook to call a function that decides if the
// current user can access the current homework submission
add_action( 'template_redirect', 'schoolpress_submissions_template_redirect' );
?>
```

## Metadata with CPTs

You can utilize the same post meta functions we went over in detail in [Chapter 2](ch02.html "Chapter 2. WordPress Basics") with any CPT you create. Getting, adding, updating, and deleting post metadata is consistent across all posts types.

If you registered a CPT and added custom-fields in the supports argument, then by default, when adding a new post or editing a post of that post type, you will see a meta box called “Custom Fields.” You may already be familiar with the Custom Fields meta box; it’s a very basic form used to maintain metadata attached to a post. What if you require a more slick UI for adding metadata on the backend? Well, building a custom meta box would be the solution for you.

### add_meta_box( $id, $title, $callback, $screen, $context, $priority, $callback_args )

* $id—A required string of a unique identifier for the meta box you are creating.
* $title—A required string of the title or visible name of the meta box you are creating.
* $callback—A required string of a function name that gets called to output the HTML inside of the meta box you are creating.
* $screen—An optional string or object of post types and/or screen names (_dashboard_, _links_) that your meta box will show up on.
* $context—An optional string of the context within the page where your meta box should show (_normal_, _advanced_, _side_). The default is advanced.
* $priority—An optional string of the priority within the context where the boxes should show (_high_, _low_).
* $callback_args—An optional array of arguments that will be passed in the callback function you referenced with the `$callback` parameter. Your callback function will automatically receive the `$post` object and any other arguments you set here.

We are going to build a custom meta box for all posts of our homework post type. This meta box will contain a checkbox for if a homework submission is required and a date selector for the due date of the homework assignment.

```php
<?php
// function for adding a custom meta box
function schoolpress_homework_add_meta_boxes(){

    add_meta_box(
        'homework_meta',
        'Additonal Homework Info',
        'schoolpress_homework_meta_box',
        'homework',
        'side'
    );

}
// use the add_meta_boxes hook to call a custom function to add a new meta box
add_action( 'add_meta_boxes', 'schoolpress_homework_add_meta_boxes' );

// this is the callback function called from add_meta_box
function schoolpress_homework_meta_box( $post ){
    // doing this so the url will fit in the book ;)
    $jquery_url = 'http://ajax.googleapis.com/ajax/libs/';
    $jquery_url.= 'jqueryui/1.8.2/themes/smoothness/jquery-ui.css';

    // enqueue jquery date picker
    wp_enqueue_script( 'jquery-ui-datepicker' );
    wp_enqueue_style( 'jquery-style', $jquery_url );

    // set meta data if already exists
    $is_required = get_post_meta( $post->ID,
        '_schoolpress_homework_is_required', 1 );

    $due_date = get_post_meta( $post->ID,
        '_schoolpress_homework_due_date', 1 );
    // output meta data fields
    ?>
    <p>
    <input type="checkbox"
    name="is_required" value="1" <?php checked( $is_required, '1' ); ?>>
    This assignment is required.
    </p>
    <p>
    Due Date:
    <input type="text"
    name="due_date" id="due_date" value="<?php echo $due_date;?>">
    </p>
    <?php // attach jquery date picker to our due_date field?>
    <script>
    jQuery(document).ready(function() {
        jQuery('#due_date').datepicker({
            dateFormat : 'mm/dd/yy'
        });
    });
    </script>
    <?php
}

// function for saving custom meta data to the database
function schoolpress_homework_save_post( $post_id ){

  // don't save anything if WP is auto saving
  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
      return $post_id;

  // check if correct post type and that the user has correct permissions
  if ( 'homework' == $_POST['post_type'] ) {

    if ( ! current_user_can( 'edit_page', $post_id ) )
        return $post_id;

  } else {

    if ( ! current_user_can( 'edit_post', $post_id ) )
        return $post_id;
  }

  // update homework meta data
  update_post_meta( $post_id,
    '_schoolpress_homework_is_required',
    $_POST['is_required']
  );
  update_post_meta( $post_id,
    '_schoolpress_homework_due_date',
    $_POST['due_date']
  );

}
// call a custom function to handle saving our meta data
add_action( 'save_post', 'schoolpress_homework_save_post' );
?>
```

## Custom Wrapper Classes for CPTs

CPTs are just posts. So you can use a call like `get_post($post_id)` to get an object of the WP_Post class to work with. For complex CPTs, it helps to create a wrapper class so you can interact with your CPT in a more object-oriented way.

The basic idea is to create a custom-defined PHP class that includes as a property a post object generated from the ID of the CPT post. In addition to storing that post object, the wrapper class also houses methods for all of the functionality related to that CPT.

```
<?php
/*
    Class Wrapper for Homework CPT
    /wp-content/plugins/schoolpress/classes/class.homework.php
*/
class Homework {
    //constructor can take a $post_id
    function __construct( $post_id = NULL ) {
        if ( !empty( $post_id ) )
            $this->getPost( $post_id );
    }

    //get the associated post and prepopulate some properties
    function getPost( $post_id ) {
        //get post
        $this->post = get_post( $post_id );

        //set some properties for easy access
        if ( !empty( $this->post ) ) {
        $this->id = $this->post->ID;
        $this->post_id = $this->post->ID;
        $this->title = $this->post->post_title;
        $this->teacher_id = $this->post->post_author;
        $this->content = $this->post->post_content;
        $this->required = $this->post->_schoolpress_homework_is_required;
        $this->due_date = $this->post->due_date;
        }

        //return post id if found or false if not
        if ( !empty( $this->id ) )
            return $this->id;
        else
            return false;
    }
}
?>
```

The constructor of this class can take a $post_id as a parameter and will pass that to the getPost() method, which attaches a $post object to the class instance and also prepopulates a few properties for easy access. Example 5-5 shows how to instantiate an object for a specific Homework assignment and print out the contents.

```
$assignment_id = 1;
$assignment = new Homework($assignment_id);
echo '<pre>';
print_r($assignment);
echo '</pre>';
//Outputs:
/*
Homework Object
(
    [post] => WP_Post Object
        (
            [ID] => 1
            [post_author] => 1
            [post_date] => 2013-03-28 14:53:56
            [post_date_gmt] => 2013-03-28 14:53:56
            [post_content] => This is the assignment...
            [post_title] => Assignment #1
            [post_excerpt] =>
            [post_status] => publish
            [comment_status] => open
            [ping_status] => open
            [post_password] =>
            [post_name] => assignment-1
            [to_ping] =>
            [pinged] =>
            [post_modified] => 2013-03-28 14:53:56
            [post_modified_gmt] => 2013-03-28 14:53:56
            [post_content_filtered] =>
            [post_parent] => 0
            [guid] => http://schoolpress.me/?p=1
            [menu_order] => 0
            [post_type] => homework
            [post_mime_type] =>
            [comment_count] => 3
            [filter] => raw
            [format_content] =>
        )

    [id] => 1
    [post_id] => 1
    [title] => Assignment 1
    [teacher_id] => 1
    [content] => This is the assignment...
    [required] => 1
    [due_date] => 2013-11-05
)
*/
```

### Keep Your CPTs and Taxonomies Together

Put all of your code to register the CPT and taxonomies in one place. Instead of having one block of code to register a CPT and define the taxonomies and a separate class wrapper to handle working with the CPT, you can simply place your CPT and taxonomy definitions into the class wrapper itself:

```
/*
    Class Wrapper for Homework CPT with Init Function
    /wp-content/plugins/schoolpress/classes/class.homework.php
*/
class Homework
{
        //constructor can take a $post_id
        function __construct($post_id = NULL)
        {
                if(!empty($post_id))
                        $this->getPost($post_id);
        }

        //get the associated post and prepopulate some properties
        function getPost($post_id)
        {
                /* snipped */
        }

        //register CPT and Taxonomies on init
        function init()
        {
                //homework CPT
                register_post_type(
                        'homework',
                        array(
                                'labels' => array(
                                        'name' => __( 'Homework' ),
                                        'singular_name' => __( 'Homework' )
                                ),
                                'public' => true,
                                'has_archive' => true,
                        )
                );

                //subject taxonomy
                register_taxonomy(
                         'subject',
                         'homework',
                         array(
                                'label' => __( 'Subjects' ),
                                'rewrite' => array( 'slug' => 'subject' ),
                                'hierarchical' => true
                         )
                );
        }
}

//run the Homework init on init
add_action('init', array('Homework', 'init'));
```

The code is snipped but shows how you would add an `init()` method to your class that is hooked into the `init`  action. The `init()` method then runs all the code required to define the CPT. You could also define other hooks and filters here, with the callbacks linked to other methods in the Homework class.

There are other ways to organize things, but we find that having all of your CPT-related code in one place helps a lot.

### Keep It in the Wrapper Class

Build all of your CPT-related functionality as methods on the wrapper class. When we registered our “Homework” CPT, a page was added to the dashboard allowing us to “Edit Homework.” Teachers can create homework like any other post, with a title and body content. Teachers can publish the homework when it’s ready to be pushed out to students. All of this post-related functionality is available for free when you create a CPT.

On the other hand, there is a lot of functionality around many CPTs, including our Homework CPT, that needs to be coded up. With a wrapper class in place, this functionality can be added as methods of our Homework class.

For example, one thing we want to do with our homework posts is gather up all the submissions for a particular assignment. Once we have submissions gathered, we can render them in a list or process them in some way. [Example 5-6](ch05.html#methodstohomework "Example 5-6. Adding methods to the Homework class") shows a couple of methods we can add to our Homework class to gather related submissions and to calculate a flat scale grading curve.

```
<?php
class Homework
{
        /* Snipped constructor and other methods from earlier examples */

        /*
                Get related submissions.
                Set $force to true to force the method to get children again.
        */
        function getSubmissions($force = false)
        {
                //need a post ID to do this
                if(empty($this->id))
                        return array();

                //did we get them already?
                if(!empty($this->submissions) && !$force)
                        return $this->submissions;

                //okay get submissions
                $this->submissions = get_children(array(
                        'post_parent' => $this->id,
                        'post_type' => 'submissions',
                        'post_status' => 'published'
                ));

                //make sure submissions is an array at least
                if(empty($this->submissions))
                        $this->submissions = array();

                return $this->submissions;
        }

        /*
                Calculate a grade curve
        */
        function doFlatCurve($maxscore = 100)
        {
                $this->getSubmissions();

                //figure out the highest score
                $highscore = 0;
                foreach($this->submissions as $submission)
                {
                        $highscore = max($submission->score, $highscore);
                }

                //figure out the curve
                $curve = $maxscore - $highscore;

                //fix lower scores
                foreach($this->submissions as $submission)
                {
                        update_post_meta(
                                $submission->ID,
                                "score",
                                min( $maxscore, $submission->score + $curve )
                        );
                }
        }
}
?>
```

### Wrapper Classes Read Better

In addition to organizing your code to make things easier to find, working with wrapper classes also makes your code easier to read and understand.

```
<?php
//static function of Student class to check if the current user is a student
if ( Student::is_student() ) {
    //student defaults to current user
    $student = new Student();

    //let's figure out when their next assignment is due
    $assignment = $student->getNextAssignment();

    //display info and links
    if ( !empty( $assignment ) ) {
    ?>
    <p>Your next assignment
    <a href="<?php echo get_permalink( $assignment->id );?>">
    <?php echo $assignment->title;?></a>
    for the
    <a href="<?php echo get_permalink( $assignment->class_id );?>">
    <?php echo $assignment->class->title;?></a>
    class is due on <?php echo $assignment->getDueDate();?>.</p>
    <?php
    }
}
?>
```

The code would be much more complicated if all of the `get_post()` calls and loops through arrays of child posts were out in the open. Using an object-oriented approach makes this code more approachable to other developers working with your code.