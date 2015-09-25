layout: post
title: "WordPress Widgets"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

Widgets allow you to place contained pieces of code and content in various widget areas throughout your WordPress site. The most typical use cases are to add widgets to a sidebar or footer area. You could always hardcode these sections on a website, but using widgets allows your nondevelopers to drag and drop widgets from one area to another or to tweak their settings through the widgets page in the admin dashboard.

<!-- more -->

![](http://johnnyimages.qiniudn.com/wordpress-widget.png)

Plenty of plugins also include widgets for showing various content. We won’t go into the use and styling of widgets here, since their use is covered well in the [WordPress Codex page on widgets](http://bit.ly/widgets-codex), but we will cover how to add widgets and widget areas to your plugins and themes.

### Before You Add Your Own Widget

Before you go about developing a new widget, it’s worth spending some time to see if an existing widget will work for you. If you get creative, you can sometimes avoid building a new widget.

Search the repository for plugins that may already have the widget you need. If so, double-check the code there and see if it will work.

Text widgets can be used to add arbitrary text into a widget space. You can also embed JavaScript code this way or add a shortcode to the text area and use a shortcode to output the functionality you want (you may have created the shortcode already for other use) instead of creating a new widget.

If your widget is displaying a list of links, it might make sense to build a menu of those links and use the Custom Menu widget that is built into WordPress. Other widgets that display recent posts from a category will often work with CPTs and custom taxonomies either out of the box or with a little bit of effort.

If you do need to add a brand-new widget, the following section will cover the steps required.

### Adding Widgets

To add a new widget to WordPress, you must create a new PHP class for the widget that extends the WP_Widget class of WordPress. The WP_Widget class can be found in _wp-includes/widgets.php_ and is a good read. The comments in the code explain how the class works and which methods you must override to build your own widget class. There are four main methods that you must override, shown clearly in the following code by the sample widget class from the [WordPress Codex page for the Widgets API](http://codex.wordpress.org/Widgets_API):

```
/*
  Taken from the Widgets API Codex Page at:
  http://codex.wordpress.org/Widgets_API
*/
class My_Widget extends WP_Widget {

        public function __construct() {
                // widget actual processes
        }

        public function widget( $args, $instance ) {
                // outputs the content of the widget
        }

        public function form( $instance ) {
                // outputs the options form on admin
        }

        public function update( $new_instance, $old_instance ) {
                // processes widget options to be saved
        }
}
add_action( 'widgets_init', function(){
     register_widget( 'My_Widget' );
});
```

The `add_action()` call passes an anonymous function as the second parameter, which is only supported in PHP versions 5.3 and higher. Technically, WordPress only requires PHP version 5.2.4 or higher. The alternative is to use the `create_function()` function of PHP, which is slower and potentially less secure than using an anonymous function. However, if you plan to release your code to a wide audience, you might want to use the alternative method shown in the following code:

```
/*
  Taken from the Widgets API Codex Page at:
  http://codex.wordpress.org/Widgets_API
*/
add_action('widgets_init',
     create_function('', 'return register_widget("My_Widget");')
);
```

This widget will show either a globally defined note set in the widget settings or a note specific to the current BuddyPress group set by the group admins.

```php
<?php
/*
  Widget to show the current class note.
  Teachers (Group Admins) can change note for each group.
  Shows the global note set in the widget settings if non-empty.
*/
class SchoolPress_Note_Widget extends WP_Widget
{
  public function __construct() {
    parent::__construct(
    'schoolpress_note',
        'SchoolPress Note',
        array( 'description' => 'Note to Show on Group Pages' );
  }

  public function widget( $args, $instance ) {
        global $current_user;

        //saving a note edit?
        if ( !empty( $_POST['schoolpress_note_text'] )
                && !empty( $_POST['class_id'] ) ) {
          //make sure this is an admin
          if(groups_is_user_admin($current_user->ID,intval($_POST['class_id']))){
                //should escape the text and possibly use a nonce
                update_option(
                        'schoolpress_note_' . intval( $_POST['class_id'] ),
                        $_POST['schoolpress_note_text']
                );
          }
        }

        //look for a global note
        $note = $instance['note'];

        //get class id for this group
        $class_id = bp_get_current_group_id();

        //look for a class note
        if ( empty( $note ) && !empty( $class_id ) ) {
                $note = get_option( "schoolpress_note_" . $class_id );
        }

        //display note
        if ( !empty( $note ) ) {
                ?>
                <div id="schoolpress_note">
                        <?php echo wpautop( $note );?>
                </div>
                <?php

                //show edit for group admins
                if ( groups_is_user_admin( $current_user->ID, $class_id ) ) {
                ?>
                <a id="schoolpress_note_edit_trigger">Edit</a>
                <div id="schoolpress_note_edit" style="display: none;">
                <form action="" method="post">
                <input type="hidden"
                        name="class_id"
                        value="<?php echo intval($class_id);?>" />
                <textarea name="schoolpress_note_text" cols="30" rows="5">
                <?php echo esc_textarea(get_option('schoolpress_note_'.$class_id))
                ;?>
                </textarea>
                <input type="submit" value="Save" />
                <a id="schoolpress_note_edit_cancel" href="javascript:void(0);">
                        Cancel
                </a>
                </form>
                </div>
                <script>
                jQuery(document).ready(function() {
                        jQuery('#schoolpress_note_edit_trigger').click(function(){
                                jQuery('#schoolpress_note').hide();
                                jQuery('#schoolpress_note_edit').show();
                        });
                        jQuery('#schoolpress_note_edit_cancel').click(function(){
                                jQuery('#schoolpress_note').show();
                                jQuery('#schoolpress_note_edit').hide();
                        });
                });
                </script>
                <?php
                }
        }
  }

  public function form( $instance ) {
        if ( isset( $instance['note'] ) )
                $note = $instance['note'];
        else
                $note = "";
        ?>
        <p>
                <label for="<?php echo $this->get_field_id( 'note' ); ?>">
                        <?php _e( 'Note:' ); ?>
                </label>
                <textarea id="<?php echo $this->get_field_id( 'note' ); ?>"
                        name="<?php echo $this->get_field_name( 'note' ); ?>">
                        <?php echo esc_textarea( $note );?>
                </textarea>
        </p>
        <?php
  }

  public function update( $new_instance, $old_instance ) {
        $instance = array();
        $instance['note'] = $new_instance['note'];

        return $instance;
  }
}
add_action( 'widgets_init', function() {
                register_widget( 'SchoolPress_Note_Widget' );
        } );
?>
```

### Defining a Widget Area

In order to add widget areas or sidebar to your theme, you need to do two things. First, you need to register the widget area with WordPress. Then you need to add code to your theme at the point where you want your widget area to appear.

`Registering a widget area is fairly straightforward using the `register_sidebar()` function, which takes an array of arguments as its only parameter. The available arguments are as follows, taken from the [WordPress Codex page on the `register_sidebar()` function](http://bit.ly/reg-sidebar):`

<dl>
    <dt>
        name
    </dt>
    <dd>
        `Sidebar name (defaults to _`\Sidebar#`_, where `#` is the ID of the sidebar)`
    </dd>
    <dt>
        id
    </dt>
    <dd>
        Sidebar ID—must be all in lowercase, with no spaces (default is a numeric auto-incremented ID)
    </dd>
    <dt>
        description
    </dt>
    <dd>
        Text description of what/where the sidebar is. Shown on widget management screen since 2.9 (default: empty)
    </dd>
    <dt>
        class
    </dt>
    <dd>
        CSS class name to assign to the widget HTML (default: empty)
    </dd>
    <dt>
        before_widget
    </dt>
    <dd>
        `HTML to place before every widget (default: `<li id="%1$s" class="widget %2$s">`); uses sprintf for variable substitution`
    </dd>
    <dt>
        after_widget
    </dt>
    <dd>
        `HTML to place after every widget (default: `</li>\n`)`
    </dd>
    <dt>
        before_title
    </dt>
    <dd>
        `HTML to place before every title (default: `<h2 class="widgettitle">`)`
    </dd>
    <dt>
        after_title
    </dt>
    <dd>
        `HTML to place after every title (default: `</h2>\n`)`
    </dd>
</dl>

To register a bare-bones sidebar for the assignment pages of our SchoolPress theme, we would add the following code to our theme’s _functions.php_ or _includes/sidebars.php_ file:

```
register_sidebar(array(
  'name' => 'Assignment Pages Sidebar',
  'id' => 'schoolpress_assignment_pages',
  'description' => 'Sidebar used on assignment pages.',
  'before_widget' => '',
  'after_widget' => '',
  'before_title' => '',
  'after_title' => ''
));
```

The values for `before/after_widget` and `before/after_title` would be set based on how our theme styles widgets and titles. Some expect `<li>` elements; others use `<div>` elements. But if all of the styling is handled by our widget’s code, we can just set everything to empty strings.Next we need to actually embed the widget area into our theme. This is done using the `dynamic_sidebar()` function, which takes the ID of a registered sidebar as its only parameter:

```
if(!dynamic_sidebar('schoolpress_student_status'))
{
  //fallback code in case my_widget_area sidebar was not found
}
```

The code will load the `schoolpress_student_status` sidebar if found. If it is not found, `dynamic_sidebar()` will return `false` and the code inside of the curly braces there will be executed instead. This can be used to show default content in a sidebar area if the sidebar area doesn’t have any widgets inside of it or doesn’t exist at all.

Historically, WordPress themes were developed with a sidebar area, and themes would hardcode certain features into them. Widgets were first introduced primarily to replace these static sidebars with dynamic sidebars that could be controlled through the Widgets page of the dashboard. This is why the term _sidebar_ is used to define widget areas, even though widgets are used in places other than just sidebars.

If you need to know whether a sidebar is registered and in use (has widgets) without actually embedding the widgets, you can use the `is_active_sidebar()` function. Just pass in the ID of the sidebar, and the function will return `true` if the sidebar is registered or `false` if it is not. The Twenty Thirteen theme uses this function to check that a sidebar has widgets before rendering the wrapping HTML for the sidebar:

```php
<?php
//from twenty-thirteen/sidebar.php
if ( is_active_sidebar( 'sidebar-2' ) ) : ?>
        <div id="tertiary" class="sidebar-container" role="complementary">
                <div class="sidebar-inner">
                        <div class="widget-area">
                                <?php dynamic_sidebar( 'sidebar-2' ); ?>
                        </div><!-- .widget-area -->
                </div><!-- .sidebar-inner -->
        </div><!-- #tertiary -->
<?php endif; ?>
```

### Embedding a Widget Outside of a Dynamic Sidebar

The normal process to add widgets to your pages is described in the previous section, where you define a dynamic sidebar and then add your widget to the sidebar through the Widgets page in the admin dashboard.

Alternatively, if you know exactly which widget you want to include somewhere and don’t want the placement of the widget left up to the admins controlling the Widgets settings in the dashboard, you can embed a widget using the `the_widget($widget, $instance, $args)` function:

* $widget—The PHP class name for your widget
* $instance—An array containing the settings for your widget
* $args—An array containing the arguments normally passed to `register_sidebar()

Besides hardcoding the placement of the widget, using the `the_widget()` function also allows you to set the settings of the widget programmatically. In the following code, we embed the StudentPress Note widget directly into a theme page. We set the instance array to include an empty string for the `$note` value, ensuring that the group note is shown if available:

```
//show note widget, overriding global note
the_widget('SchoolPress_Note_Widget',  //classname
                  array('note'=>''),            //instance vars
                  array(                        //widget vars
                        'before_widget' => '',
                        'after_widget' => '',
                        'before_title' => '',
                        'after_title' => ''
                  )
);
```


