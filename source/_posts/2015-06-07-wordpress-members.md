layout: post
title: "WordPress Users, Roles, and Capabilities"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

## Getting User Data

In this section, we’ll go over how to instantiate a WordPress user object in code and how to get basic user information, like login and email address, and user metadata out of that object.

The workhorse for managing WordPress users in code is the `WP_User` class. Just like anything else in WordPress and PHP, there are a few different ways to get a WP_User object to work with. Here are some of the most popular methods:

<!-- more -->

```
// get the WP_User object WordPress creates for the currently logged-in user
global $current_user;

// get the currently logged-in user with the wp_get_current_user() function
$user = wp_get_current_user();

// set some variables
$user_id = 1;
$username = 'jason';
$email = 'jason@strangerstudios.com';

// get a user by ID
$user = wp_getuserdata( $user_id );

// get a user by another field
$user1 = wp_get_user_by( 'login', $username );
$user2 = wp_get_user_by( 'email', $email );

// use the WP_User constructor directly
$user = new WP_User( $user_id );

//use the WP_User constructor with a username
$user = new WP_User( $username );
```

Once you have a WP_User object, you can get any piece of user data you want:

```
// get the currently logged-in user
$user = wp_get_current_user();

// echo the user's display_name
echo $user->display_name;

// use user's email address to send an email
wp_mail( $user->user_email, 'Email Subject', 'Email Body' );

// get any user meta value
echo 'Department: ' . $user->department;
```

Data stored in the `wp_users` table (`user_login`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_status`, and `display_name`) can be accessed using the arrow operator, for example, `$user->display_name`.

Any value in the `wp_usermeta` table can also be accessed by using the arrow operator, for example, `$user->meta_key`, or by using the `get_user_meta()` function. These two lines of code produce the same result:

```
<?php
$full_name = trim( $user->first_name . ' ' . $user->last_name );
$full_name = trim( get_user_meta( $user->ID, 'first_name' ) .
    ' ' . get_user_meta( $user->ID, 'last_name' ) );
?>
```

It’s useful to understand the trick WordPress is using to allow you to access user meta on demand as if each meta field was a property of the WP_User class. The WP_User class is using overloaded properties or the `__get()` “magic method.”

With magic methods, any property of the WP_User object that you try to get that isn’t an actual property of the object will be passed to the `_get()` method of the class.

```
function __get( $key ) {
if ( isset( $this->data->$key ) ) {
        $value = $this->data->$key;
        } else {
                $value = get_user_meta( $this->ID, $key, true );
        }

        return $value;
}
```

Let’s analyze this. The method first checks if a value exists in the `$data` property of the WP_User object. If so, that value is used. If not, the method uses the `get_user_meta()` function to see if any meta value exists using the key passed in.

Because we’re loading meta values on demand this way, there is less memory overhead when instantiating a new WP_User object. On the other hand, because meta values aren’t available until you specifically ask for them, you can’t dump all metadata on a user using code like `print_r( $user )` or `print_r( $user->data )`.

To loop through all the metadata for a user, use the `get_user_meta()` function with no `$key` parameter passed in:

```
// dump all metadata for a user
$user_meta = get_user_meta( $user_id );
foreach( $user_meta as $key => $value )
    echo $key . ': ' . $value . '<br />';
```

Knowing how WordPress uses the `__get()` function is interesting, but also important so you avoid a couple of the limitations of the `__get()` magic method.

The `__get()` and `__set()` methods are not called when assignments are chained together. For example, the code `$year = $user->graduation_year = '2012'` would produce inconsistent results.

Similarly `__get()` is not called when coded within an `empty()` or `isset()` function call. So `if(empty($user->graduation_year))` will also be false, even if there exists some user meta with the key `graduation_year`.

The solution to these two issues is to get a little more verbose with your code:

```
// Split assignments into multiple lines when using magic methods.
$user->graduation_year = '2012';
$year = '2012';

//To test if a meta value is empty, set a local variable first.
$year = $user->graduation_year;
if ( empty( $year ) )
    $year = '2012';
```

## Add, Update, and Delete Users

We touched on some basic functions for adding, updating, and deleting users in [Chapter 2](ch02.html "Chapter 2. WordPress Basics"), but since working with user data is such an important part of any web application, we will do a brief overview with some additional examples and different use case scenarios here.

Occasionally, you will need to add users through code instead of using the WordPress dashboard. In our SchoolPress app, we might want to allow teachers to enter a list of email addresses and generate a user for each email entered.

Or maybe you want to customize the registration process. The built-in WordPress registration form is difficult to customize. It’s often easier to build your own form and use WordPress functions to add the user yourself on the backend.<sup>[</sup>17]

As you should already know, the function for adding a user to WordPress is `wp_insert_user()`, which takes an array of user data and inserts it into the `wp_users` and `wp_usermeta` tables:

```
// insert user from values we've gathered
$user_id = wp_insert_user( array(
        'user_login' => $username,
        'user_pass' => $password,
        'user_email' => $email,
        'first_name' => $firstname,
        'last_name' => $lastname
    )
);

// check if username or email has already been used
if ( is_wp_error( $user_id ) ){
    echo $return->get_error_message();
} else {
    // continue on with whatever you want to do with the new $user_id
}
```

The following code will automatically log someone in after adding that person’s user. The `wp_signon()` function authenticates the user and sets up the secure cookies to log the user in:

```
// okay, log them in to WP
$creds = array();
$creds['user_login'] = $username;
$creds['user_password'] = $password;
$creds['remember'] = true;
$user = wp_signon( $creds, false );
```

Updating users is as easy as adding them with the `wp_update_user()` function. You pass in an array of user data and metadata. As long as there is an ID key in the array with a valid user ID as the value, WordPress will set any specified user values:

```
// this will update a user's email and leave other values alone
$userdata = array( 'ID' => 1, 'user_email' => 'jason@strangerstudios.com' );
wp_update_user( $userdata );

// this function is also perfect for updating multiple user meta fields at once
wp_update_user( array(
    'ID' => 1,
    'company' => 'Stranger Studios',
    'title' => 'CEO',
    'personality' => 'crescent fresh'
));
```

A user’s `user_login` cannot be updated through `wp_update_user`. Also, if a user’s `user_pass` is updated, the user will be logged out. You can use the preceding auto-login code above to log the user back in using the new password.

You can also update one user meta value at a time using the `update_user_meta($user_id, $meta_key, $meta_value, $prev_value)` function.

The following code segments illustrate some more features:

```
// arrays will get serialized
$children = array( 'Isaac', 'Marin');
update_user_meta( $user_id, 'children', $children );

// you can also store array by storing multiple values with the same key
update_user_meta( $user_id, 'children', 'Isaac' );
update_user_meta( $user_id, 'children', 'Marin' );

// when storing multiple values, specify the $prev_value parameter
// to select which one changes
update_user_meta( $user_id, 'children', 'Isaac Ford', 'Isaac' );
update_user_meta( $user_id, 'children', 'Marin Josephine', 'Marin' );

//delete all user meta by key
delete_user_meta( $user_id, 'children' );

//delete just one row when there are multiple values for one key
delete_user_meta( $user_id, 'children', 'Isaac Ford' );
```

Note that in the code, I show two different ways to store arrays in user meta. This is similar to storing options via `update_option()` or post meta via `update_post_meta()`. The first method (one serialized value per key) keeps row count down on the `wp_usermeta` table, which can make queries by `meta_key` faster. The second method (multiple values per key) allows you to query by `meta_value`. For example, storing child names as separate user meta entries lets you do queries like this:

```
<?php
// get the IDs of all users with children named Isaac
$parents_of_isaac = $wpdb->get_col( "SELECT user_id
        FROM $wpdb->usermeta
        WHERE meta_key = 'children'
        AND meta_value = 'Isaac'" );
?>
```

While it’s possible to query the `wp_usermeta` and `wp_postmeta` tables by `meta_value`, be careful about query times. The `meta_value` column is not indexed, and so queries against large datasets may be slow. Many-to-one relationships like this can also be stored in custom taxonomies, which can show better performance.

Deleting a user, while dangerous, is incredibly easy to do in code:

```
//this file contains wp_delete_user and is not always loaded, so let's make sure
require_once( ABSPATH . '/wp-admin/includes/user.php' );

//delete the user
wp_delete_user( $user_id );

//or delete a user and reassign their posts to user with ID #1
wp_delete_user( $user_id, 1 );
```

For network site setups, you will need to use the `wpmu_delete_user()` function to delete the user from the entire network. Otherwise `wp_delete_user()` just deletes the user from the current blog. You can use the `is_multisite()` function to detect which function should be used:

```
// I want to make sure we really delete the user.
if ( is_multisite() )
    wp_delete_user( $user_id );
else
    wpmu_delete_user( $user_id );
```

## Hooks and Filters

Perhaps more common than adding and updating user data yourself are scenarios where you want to do some other bit code when new users are added or deleted. For example, you may want to create and link a new CPT post to a user when she registers. Or maybe you want to clean up connections and data stored in custom tables when a user is deleted. This can be done through some user-related hooks and filters.

The hook to run code after a user is registered is `user_register`. The hook passes in the user ID of the newly created user:

```
//create a new "course" CPT when a teacher registers
function sp_user_register( $user_id ){
    // check if the new user is a teacher (see chapter 15 for details)
    if ( pmpro_hasMembershipLevel( 'teacher', $user_id ) ) {
        // add a new "course" CPT with this user as author
        wp_insert_post( array(
            'post_title' => 'My First Course',
            'post_content' => 'This is a sample course...',
            'post_author' => $user_id,
            'post_status' => 'draft',
            'post_type' => 'course'

        ) );
    }
}
add_action( 'user_register', 'sp_user_register' );
```

The hook to run code just _before_ deleting a user is `delete_user`. A similar hook `deleted_user` (note the past tense) runs just _after_ a user has been deleted.

These hooks are mostly interchangeable, but there are a couple things to note:

* If you hook on `delete_user` early enough, you might be able to abort the user delete.
* If you hook on `deleted_user`, some user data and connections may already be gone and unavailable:

```
<?php
// send an email when a user is being deleted
function sp_delete_user( $user_id ){
    $user = get_userdata( $user_id );
    wp_mail( $user->user_email,
        "You've been deleted.",
        'Your account at SchoolPress has been deleted.'
    );
}
// want to be able to get user_email so hook in early
add_action( 'delete_user', 'sp_delete_user' );
?>
```

## Roles and Capabilities

Roles and capabilities are how WordPress controls what users have access to view and do on your site. Each user may have one role, and each role will have one or many capabilities. Each capability will determine if a user can or can’t view a certain type of content or perform a certain action.

There are five default roles in every WordPress install: Admin, Editor, Author, Contributor, and Subscriber. If you are running a network site, you’ll have a sixth role, Super Admin, which has admin access to all sites on the network.

A full list of capabilities and how they map to the default WordPress roles can be found on the [WordPress Codex Roles and Capabilities page](http://bit.ly/roles-caps).

In a little bit, we’ll go over how to create new roles outside of the WordPress defaults. However, for most apps it makes sense to stick to the default roles: have your app administrators use the Admin role and have all of your users/customers use the Subscriber role.

If your app users will be creating content, consider making them Authors (can create and publish posts) or Contributors (can create, but not publish posts). If your app has moderators, consider making them Editors.

Using the default roles is a good idea because certain plugins will expect your users to have one of these roles. If your admins are really users with an office manager role, you may have a bit of extra work to get a third-party plugin to work with those users. The opposite is sometimes true as well. You might have to hide functionality made available to your users based on the roles they have, especially if you are using roles outside of Admin (access to everything) and Subscribers (can just view stuff).

### Checking a User’s Role and Capabilities

Sometimes you’ll need to check if a user is able to do something before you let her do it. You do this with the `current_user_can()` function. This function takes one parameter, which is a string value for the `$capability` to check. The following code illustrates the usage of this function:

```
if ( current_user_can( 'manage_options' ) ) {
    // has the manage options capability, typically an admin
}

if ( current_user_can( 'edit_user', $user_id ) ) {
    // can edit the user with ID = $user_id.
    // typically either the user himself or an admin
}

if ( current_user_can( 'edit_post', $post_id ) ) {
    // can edit the post with ID = $post_id.
    // typically the author of the post or an admin or editor
}

if ( current_user_can( 'subscriber' ) ) {
    // one way to check if the current user is a subscriber
}
```

You can also use the function `user_can()` to check if someone other than the current user has a capability. Pass in the `$user_id` of the user you want to check, the capability, and any other arguments needed:

```
/*
    Output comments for the current post,
    highlighting anyone who has capabilities to edit it.
*/
global $post;   // current post we are looking at

$comments = get_comments( 'post_id=' . $post->ID );
foreach( $comments as $comment ){
    // default CSS classes for all comments
    $classes = 'comment';

    // add can-edit CSS class to authors
    if ( user_can( $comment->user_id, 'edit_post', $post->ID ) )
        $classes .= ' can-edit';
?>
<div id="comment-<?php echo $comment->comment_ID;?>"
    class="<?php echo $classes;?>">
    Comment by <?php echo $comment->comment_author;?>:
    <?php echo wpautop( $comment->comment_content );?>
</div>
<?php
}
```

While it is possible to check for a user’s role using `current_user_can()`, it is better practice to test a user’s capabilities instead of her role. This will allow your code to continue to work even if users are given different roles or roles are assigned different capabilities. For example, checking for `manage_options` will work how you intend whether the user is an Admin or a custom role with the `manage_options` capability added.

Testing a user’s role should be limited to cases where you really need to know her role instead of her capability. If you find yourself checking for someone’s role before performing certain actions, you should take it as a hint that you need to add a new capability.

The following is a function to upgrade any Subscriber whose ID is passed in to the Author role. To be extra sure, we check the roles array of the user object instead of using the `user_can()` function. We use the `set_role()` method of the user class to set the new role:

```
function upgradeSubscriberToAuthor( $user_id ) {
    $user = new WP_User( $user_id );
    if ( in_array( 'subscriber', $user->roles ) )
            $user->set_role( 'author' );
}
```

### Creating Custom Roles and Capabilities

As we said earlier, it’s a good idea to stick with the default WordPress roles if possible. However, if you have different classes of users and need to restrict what they are doing in new ways, adding custom roles and capabilities is the way to do it.

In our SchoolPress app, teachers are just Authors and students are just Subscribers. However, we do need a custom role for office managers who can manage users but cannot edit content, themes, options, plugins, or the general WordPress settings. We can setup the Office Manager role like so:

```
function sp_roles_and_caps() {
    // Office Manager Role
    remove_role('office');      // in case we updated the caps below
    add_role( 'office', 'Office Manager', array(
        'read' => true,
        'create_users' => true,
        'delete_users' => true,
        'edit_users' => true,
        'list_users' => true,
        'promote_users' => true,
        'remove_users' => true,
          'office_report' => true // new cap for our custom report
    ));
}
// run this function on plugin activation
register_activation_hook( __FILE__, 'sp_roles_and_caps' );
```

When the `add_role()` function is run, it updates the `wp_user_roles` option in the `wp_options` table, where WordPress looks to get information on roles and capabilities. So you only want to run this function once upon activation instead of every time at runtime. That’s why we register this function using `register_activation_hook()`.

We also run `remove_role('office')` at the start there, which is useful if you want to delete a role completely, but is also useful to clear out the “office” role before adding it again in case you edited the capabilities or other settings for the role. Without the `remove_role()` line, the `add_role()` line will not run since the role already exists.

The `add_role()` function takes three parameters: a role name, a display name, and an array of capabilities. Use the reference in the Codex to find the names of the default capabilities or look them up in the _/wp-admin/includes/schema.php_ file of your WordPress install.

Adding new capabilities is as simple as including a new capability name in the `add_role()` call or using the `add_cap()` method on an existing role. Here is an example showing how to get an instance of the role class and add a capability to it:

```
// give admins our office_report cap to let them view that report
$role = get_role( 'administrator' );
$role->add_cap( 'office_report' );
```

Again, this code only needs to run once, which will save it in the database. Put code like this inside of a function registered via `register_activation_hook()` just like the last example.

You can also use the `remove_cap()` method of the role class, which is useful if you want to remove some functionality from the default roles. For example, the following code will remove the `edit_pages` capabilities from Editors so they can edit any blog post, but no pages (post of type “page”):

```
// don't let editors edit pages
$role = get_role( 'editor' );
$role->remove_cap( 'edit_pages' );
```

You can do some powerful things by adding and editing roles and capabilities. Defining what users have access to view and do is an important part of building an app. Different roles can be built for different membership levels or upgrades associated with your product. 

## Extending the WP_User Class

We can extend the WP_User class to create useful classes that will help us organize our code related to different types of users.

```
<?php
// Student is a class that extends WP_User
$student = new Student();
foreach( $student->getAssignments() as $assignment ) {
        // assignment here is an instance of a class that extends WP_Post
    $assignment->print();
}
?>
```

And here is how that code would look in a less object-oriented way:

```
$student = wp_get_current_user(); // return WP_User object for current user
foreach( sp_getAssignmentsByUser( $student->ID ) as $assignment ) {
    sp_printAssignment( $assignment->ID );
}
```

Both blocks of code are functionally equivalent, but the first example is easier to read and work with. Perhaps more importantly, having all of your student-related functions coded as methods on the Student class will help keep things organized.

Here are the initialization and `getAssignments()` method for the Student class:

```php
<?php
class Student extends WP_User {
    // no constructor so WP_User's constructor is used

    // method to get assignments for this Student
    function getAssignments() {
        // get assignments via get_posts if we haven't yet
        if ( ! isset( $this->data->assignments ) )
            $this->data->assignments = get_posts( array(
                'post_type' => 'assignment',// assignments
                'numberposts' => -1,        // all posts
                'author' => $this->ID       // user ID for this Student
            ));

        return $this->data->assignments;
    }

    // magic method to detect $student->assignments
    function __get( $key ) {
        if ( $key == 'assignments' )
        {
            return $this->getAssignments();
        }
        else
        {
            // fallback to default WP_User magic method
            return parent::__get( $key );
        }
    }
}
?>
```

Above we define the Student class to extend the WP_User class by just adding `extends WP_User` to the class definition.

We don’t write our own constructor function because we want to use the same one as the WP_User class. Namely, we want to be able to write `$student = new Student($user_ID);` to get a Student/User by ID.

The `getAssignments()` method uses the `get_posts()` function to get all posts of type “assignment” that are authored by the user associated with this Student. We store the array of assignment posts in the `$data` property, which is defined in the WP_User class and stores all of the base user data and metadata. This allows us to use code like `$student->assignments` to get the assignments later.

Normally if `$student->assignments` is a defined property of $student, the value of that property will be returned. But if there is no “assignments” property, PHP will send “assignments” as the `$key` parameter to your `__get` method. Here we check that `$key == "assignments"` and then return the value of the `getAssignments()` method defined later. If `$key` is something other than `"assignments”` we pass it to the `__get()` method of the parent WP_User class, which checks for the value in the `$data` property of the class instance or failing that sends the key to the `get_user_meta()` function.

At first blush, all this does is allow you to type `$student->assignments` instead of `$student->getAssignments()`, which I suppose is true. However, coding things this way allows us to cache the assignments in the `$data` property of the object so we don’t have to query for it again if it’s accessed more than once. It will also make your code more consistent with other WordPress code: If you want the student’s email, it’s `$student->user_email`; if you want student’s first_name, it’s `$student->first_name`; if you want the student’s assignments, it’s `$student->assignments`. The person using the code doesn’t have to know that one of them is stored in the `wp_users` table, one is stored in `wp_usermeta`, and one is the result of a post query.

## Adding Registration and Profile Fields

It’s very common to need to add additional profile fields for users in your app. In the previous section, we discussed how to use the `wp_update_user()` and `update_user_meta()` functions to manage those values. In this section, we’ll go over how to add editable fields for our user meta to the registration and profile pages.

In our SchoolPress app, we need to capture some data about our users. For students, we want to capture their graduation year, major, minor, and advisor’s name. For teachers, we want to capture their department and office location. For both types of users, we want to capture their gender, age, and phone number.

There are a few different plugins out there that will help you do this more quickly.

```php
<?php
function ps_registration_fields(){
    // store fields in an array
    $fields = array();

    // fields for all users
    $fields[] = new PMProRH_Field(
        'gender',
        'select',
        array(
            'options' => array(
                '' => 'Choose One',
                'male' => 'Male',
                'female' => 'Female'
            ),
            'profile' => true,
            'required' => true
        )
    );
    $fields[] = new PMProRH_Field(
        'age',
        'text',
        array(
            'size' => 10,
            'profile' => true,
            'required' => true
        )
    );
    $fields[] = new PMProRH_Field(
        'phone',
        'text',
        array(
            'size' => 20,
            'label' => 'Phone Number',
            'profile' => true,
            'required' => true
        )
    );

    // fields for teachers
    $fields[] = new PMProRH_Field(
        'department',
        'text',
        array(
            'size' => 40,
            'profile' => true,
            'required' => true
        )
    );
    $fields[] = new PMProRH_Field(
        'office',
        'text',
        array(
            'size' => 40,
            'profile' => true,
            'required' => true
        )
    );

    // fields for students
    $fields[] = new PMProRH_Field(
        'graduation_year',
        'text',
        array(
            'label' => 'Expected Graduation year',
            'size' => 10,
            'profile' => true,
            'required' => true
        )
    );
    $fields[] = new PMProRH_Field(
        'major',
        'text',
        array( 'size' => 40, 'profile' => true, 'required' => true )
    );
    $fields[] = new PMProRH_Field(
        'minor',
        'text',
        array( 'size' => 40, 'profile' => true )
    );

    // add fields to the registration page
    foreach( $fields as $field )
        pmprorh_add_registration_field( 'after_password', $field );
}
add_action( 'init', 'ps_registration_fields' );
?>
```

Full instructions on how to use PMPro Register Helper and the syntax for defining fields can be found in the plugin’s readme file. Instead of covering that here, let’s go through adding one field to the register and profile pages by hand using the same hooks and filters PMPro Register Helper uses.

### Add our field to the registration page

```php
<?php
function sp_register_form(){
    // get the age value passed into the form
    if ( ! empty( $_REQUEST['age'] ) )
        $age = intval( $_REQUEST['age'] );
    else
        $age = '';

    // show input
    $age = esc_attr( $age );?>
    <p>
    <label for="age">Age<br />
    <input type="text" name="age" id="age" class="input"
        value="<?php echo $age ?>" />
    </label>
    </p>
    <?php
}
add_action( 'register_form', 'sp_register_form');
?>
```

We check `if ( ! empty( $_REQUEST['age'] ) )` to avoid a PHP warning when users first visit the registration page and there isn’t any form data in $_REQUEST yet.

### Update our user’s age after registering

```
function sp_register_user( $user_id ){
    // get the age value passed into the form
    $age = intval( $_REQUEST['age'] );

    // update user meta
    update_user_meta( $user_id, 'age', $age );
}
add_action( 'register_user', 'sp_register_user' );
```

### Add the age field to the user profile page. 

We need to hook into both show_user_profile and edit_user_profile to show our custom field both when users are viewing their own profile and when admins are editing other users’ profiles:

```
<?php
function sp_user_profile( $user ){
    // show input
    $age = esc_attr( $user->age );?>
    <table class="form-table">
    <tbody>
    <tr>
                <th><label for="age">Age</label></th>
                <td>
                <input type="text" name="age" id="age" class="input"
            value="<?php echo $age; ?>"/>
                </td>
        </tr>
    </tbody>
    </table>
    <?php
}
//user's own profile
add_action( 'show_user_profile', 'sp_user_profile' );
//admins editing user profiles
add_action( 'edit_user_profile', 'sp_user_profile' );
?>
```

Note how the default WordPress registration page HTML uses `<p>` tags to separate fields, while the default profile HTML in the dashboard uses table rows.

### Update our field when updating a profile:

```php
<?php
function sp_profile_update( $user_id ){
    //make sure the current user can edit this user
    if ( ! current_user_can( 'edit_user', $user_id ) )
        return false;

    // check if value has been posted
    if ( isset( $_POST['age'] ) ){
        // update user meta
        update_user_meta( $user_id, 'age', intval( $_POST['age'] ) );
    }
}
// user's own profile
add_action( 'personal_options_update', 'sp_profile_update' );
// admins editing
add_action( 'edit_user_profile_update', 'sp_profile_update' );
?>
```

Again, we’re hooking into two separate hooks. One for when users are viewing their own profile, and one for when admins are editing other users’ profiles.

So that’s how you add a field to the registration and profile pages. Just iterate through that for each field you want to add (or piggyback on plugins like PMPro Register Helper to do it for you), and you’re good to go.

## Customizing the Users Table in the Dashboard

With all of this extra metadata for our users, it is sometimes necessary to extend the basic users list table in the WordPress dashboard.

You can create your own admin page, with custom queries, and a report that mimics the style of the dashboard list tables (that’s what we did for the “Members List” in Paid Memberships Pro). Or you can use hooks and filters provided by WordPress to add columns and filters to the standard user list, which is what we will cover here.

To do this, we use the `manage_users_columns` and `manage_users_custom_column` filters. Let’s add our age field to the user’s list:

```php
// add our column to the table
function sp_manage_users_columns( $columns ){
    $columns['age'] = 'Age';
    return $columns;
}
add_filter( 'manage_users_columns', 'sp_manage_users_columns' );

// tell WordPress how to populate the column
function sp_manage_users_custom_column( $value, $column_name, $user_id ){
    $user = get_userdata( $user_id );
    if ( $column_name == 'age' )
        $value = $user->age;

    return $value;
}
add_filter( 'manage_users_custom_column',
    'sp_manage_users_custom_column', 10, 3);
```

The `manage_users_columns` filter passes in an array containing all of the default WordPress columns (and any added by other plugins). You can add columns, remove them (using `unset( $columns['column_name' ])`), and reorder them. The keys in the `$columns` array are unique strings to identify them. The values in the `$columns` array are the headings for each column.

The `manage_users_custom_column` filter is applied to each column in the `manage_users_columns` array that isn’t a default WordPress column (i.e., any custom column you add). In the `sp_manage_users_custom_column()` callback, you can do any calculations needed to get the values for each custom column. Typically the function contains a large if/then/else block or a switch statement checking the value of `$column_name` and returning the correct value for each column.

If you use the preceding code, you will get an `Age` column added to your users page, but by default you won’t be able to click on it to sort the users list by age like you can with some of the default users list columns. Here’s the code for that:

```
<?php
// make the column sortable
function sp_manage_users_sortable_columns( $columns ){
    $columns['age'] = 'Age';
        return $columns;
}
add_filter( 'manage_users_sortable_columns',
    'sp_manage_users_sortable_columns' );

// update user_query if sorting by Age
function sp_pre_user_query( $user_query ){
    global $wpdb, $current_screen;

    // make sure we are viewing the users list in the dashboard
    if ( $current_screen->id != 'users' )
        return;

    // order by age
    if ( $user_query->query_vars['orderby'] == 'Age' ){
        $user_search->query_from .= " INNER JOIN $wpdb->usermeta m1
            ON $wpdb->users u1
            AND (u1.ID = m1.user_id)
            AND (m1.meta_key = 'age')";
        $user_search->query_orderby = " ORDER BY m1.meta_value
            " . $user_query->query_vars['order'];
    }
}
add_action( 'pre_user_query', 'sp_pre_user_query' );
?>
```

Above we define `Age` as a sortable column with the `manage_users_sortable_columns` filter. We use the `pre_user_query` filter to detect the `&sortby=Age` parameter on the users list page and update the `$user_query` object to join on the `wp_usermeta` table and order by age. Notice how we use the `$current_screen` global, which is set in the admin, to make sure we are on the users list page before editing the query.

## Plugins

Now that you’ve seen how to customize various aspects of the WordPress user management system, let’s go over a few user-related plugins that will make your life building web apps a little easier.

### Theme My Login

Your members don’t have to know that your site is built on WordPress. Part of that is using a login form that is integrated seamlessly with your site design rather than the default WordPress login. The [Theme My Login](http://bit.ly/theme-login) plugin does this perfectly. Traffic to _wp-login.php_ is redirected to a login page that looks like the rest of your site instead of the WordPress backend.

Theme My Login also has useful modules for theming user profiles, hiding the dashboard from non-admins, and controlling where users are redirected on login and logout.

### Hide Admin Bar from Non-Admins

[This plugin](http://bit.ly/hide-bar) does exactly what the title states. Only administrators will see the WordPress admin bar when browsing the frontend of your site. The plugin is just a few lines of code and can be edited to your needs, for example, to let editors and authors view the admin bar.

### Paid Memberships Pro

[Paid Memberships Pro](http://bit.ly/paid-pro) is brought to you by Stanger Studios and allows you to monetize the content on your site by creating a membership community. This is ideal for any business or blogger looking to lock down some or all of the content or collect fees for services provided. This plugin easily integrates with payment gateways such as Stripe, Paypal, and Authorize.net. Settings for recurring or one-time payments are included. Paid Memberships Pro allows for the creation of different membership levels within your site.

### PMPro Register Helper

The [Register Helper plugin](http://bit.ly/pmp-reg-help) was initially programmed to work with Paid Memberships Pro, but can be used without it as well. This plugin simplifies the process of adding extra fields to the registration and profile fields. Instead of a set of three hooks and functions for each field, fields can be added in a couple lines of code like:

```
<?php
$text = new PMProRH_Field(
        'company',
        'text',
        array(
                'size' => 40,
                'class' => 'company',
                'profile' => true,
                'required' => true
        )
);
pmprorh_add_registration_field( 'after_billing_fields', $text );
?>
```

The Register Helper plugin also has shortcodes to insert signup forms into your pages and sidebars and modules to act as starting points for your own registration, profile, and members directory pages.

### Members

The [Members plugin](http://bit.ly/members-wp) extends the control that you have over user roles and capabilities in your site. It enables you to edit as well as create and delete user roles and capabilities.  This plugin also allows you to set permissions for different user roles to determine which roles have the ability to add, edit, and/or delete various pieces of content.

You could always write your own code to add roles and capabilities, but Members adds a nice GUI on top of that functionality that is often useful.
