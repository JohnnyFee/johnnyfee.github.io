layout: post
title: "WordPress Dashboard"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

Dashboard widgets are the boxes that show up on the homepage of your WordPress admin dashboard.

By default, WordPress includes a few different dashboard widgets. By adding and removing widgets from the dashboard using the Dashboard Widgets API, you can make your WordPress app more useful by placing the information and tools most required by your app right there on the dashboard homepage. It’s a nice touch that should be done by all WordPress apps with users who will be accessing the WordPress admin.

![](http://johnnyimages.qiniudn.com/wordpress-dashboard.png)

### Removing Dashboard Widgets

The dashboard widgets are really just meta boxes assigned to the dashboard page of the admin. The WordPress Codex page on the Dashboard Widgets API has a list of the default widgets shown on the WordPress dashboard:

```
// From the Dashboard Widgets API Codex Page
// Main column:
$wp_meta_boxes['dashboard']['normal']['high']['dashboard_browser_nag']
$wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']
$wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']
$wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']
$wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']

// Side Column:
$wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']
$wp_meta_boxes['dashboard']['side']['core']['dashboard_recent_drafts']
$wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']
$wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']
```

To remove widgets from the dashboard, you can use the `remove_meta_box($id, $page, $context)` function:

* $id—The ID defined when the meta box was added. This is set as the `id` attribute of the `<div>` element created for the meta box.
* $page—The name of the admin page the meta box was added to. Use `dashboard` to remove dashboard meta boxes.
* $context—Either `normal`, `advanced`, or `side`, depending on where the meta box was added.

To remove all of the default widgets, you can hook into `wp_dashboard_setup` and make a call to `remove_meta_box()` for each widget you’d like to remove:

```
// Remove all default WordPress dashboard widgets
function sp_remove_dashboard_widgets()
{
        remove_meta_box('dashboard_browser_nag', 'dashboard', 'normal');
        remove_meta_box('dashboard_right_now', 'dashboard', 'normal');
        remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
        remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');
        remove_meta_box('dashboard_plugins', 'dashboard', 'normal');

        remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
        remove_meta_box('dashboard_recent_drafts', 'dashboard', 'side');
        remove_meta_box('dashboard_primary', 'dashboard', 'side');
        remove_meta_box('dashboard_secondary', 'dashboard', 'side');
}
add_action('wp_dashboard_setup', 'sp_remove_dashboard_widgets');
```

There are a different set of widgets added to the multisite network dashboard, and a different hook must be used to remove the network dashboard widgets. The following code hooks on `wp_network_dashboard_setup` and removes the meta boxes added to the “dashboard-network” `$page`:

```
//Remove network dashboard widgets
function sp_remove_network_dashboard_widgets()
{
  remove_meta_box('network_dashboard_right_now', 'dashboard-network', 'normal');
  remove_meta_box('dashboard_plugins', 'dashboard-network', 'normal');
  remove_meta_box('dashboard_primary', 'dashboard-network', 'side');
  remove_meta_box('dashboard_secondary', 'dashboard-network', 'side');
}
add_action('wp_network_dashboard_setup', 'sp_remove_network_dashboard_widgets');
```

You could use similar code to remove default meta boxes from other dashboard pages, like the edit page and edit post pages. The $page value to use when removing meta boxes there are page and post, respectively.

### Adding Your Own Dashboard Widget

The `wp_add_dashboard_widget()` function is a wrapper to `add_meta_box()` that will add a widget to your admin dashboard page. The `wp_add_dashboard_widget()` function takes four parameters:

* $widget_id—An ID for your widgets that is added as a CSS class name to the wrapper for the widget and also used as the array key for the dashboard widgets array.
* $widget_name—Name of the widget displayed in the widget heading.
* $callback—Callback function that renders the widget.
* $control_callback—Optional. Defaults to `NULL`. Callback function to handle the display and processing of a configuration page for the widget.

The flowing codes adds a dashboard widget to show the status of current assignments. The code includes the call to wp_add_dashboard_widget() to register the dashboard widget and also includes the callback function to display that actual widget and another callback function to handle the configuration view of that widget.

```php
<?php
/*
    Add dashboard widgets
*/
function sp_add_dashboard_widgets() {
        wp_add_dashboard_widget(
                'schoolpress_assignments',
                'Assignments',
                'sp_assignments_dashboard_widget',
                'sp_assignments_dashboard_widget_configuration'
        );
}
add_action( 'wp_dashboard_setup', 'sp_add_dashboard_widgets' );

/*
        Assignments dashboard widget
*/
//widget
function sp_assignments_dashboard_widget() {
        $options = get_option( "assignments_dashboard_widget_options", array() );

        if ( !empty( $options['course_id'] ) ) {
                $group = groups_get_group( array(
                        'group_id'=>$options['course_id']
                        ) );
        }

        if ( !empty( $group ) ) {
                echo "Showing assignments for class " .
                        $group->name . ".<br />...";
                /*
                        get assignments for this group and list their status
                */
        }
        else {
                echo "Showing all assignments.<br />...";
                /*
                        get all assignments and list their status
                */
        }
}
//configuration
function sp_assignments_dashboard_widget_configuration() {
        //get old settings or default to empty array
        $options = get_option( "assignments_dashboard_widget_options", array() );

        //saving options?
        if ( isset( $_POST['assignments_dashboard_options_save'] ) ) {
                //get course_id
                $options['course_id'] = intval(
                        $_POST['assignments_dashboard_course_id']
                        );

                //save it
                update_option( "assignments_dashboard_widget_options", $options );
        }

        //show options form
        $groups = groups_get_groups( array( 'orderby'=>'name', 'order'=>'ASC' ) );
        ?>
        <p>Choose a class/group to show assignments from.</p>
        <div class="feature_post_class_wrap">
                <label>Class</label>
                <select name="assignments_dashboard_course_id">
                <option value="" <?php selected( $options['course_id'], "" );?>>
                        All Classes
                </option>
                <?php
                $groups = groups_get_groups( array( 'orderby'=>'name',
                                                'order'=>'ASC' ) );

                if ( !empty( $groups ) && !empty( $groups['groups'] ) ) {
                        foreach ( $groups['groups'] as $group ) {
                        ?>
                        <option value="<?php echo intval( $group->id );?>"
                        <?php selected( $options['course_id'], $group->id );?>>
                        <?php echo $group->name;?>
                        </option>
                        <?php
                        }
                }
                ?>
                </select>
        </div>
        <input type="hidden" name="assignments_dashboard_options_save" value="1" />
        <?php
}
?>
```

![](http://johnnyimages.qiniudn.com/wordpress-dashboard-widget)

![](http://johnnyimages.qiniudn.com/wordpress-dashboard-configuration)

Note that we hook into `wp_dashboard_setup` for the function that adds our widget. If we wanted our widget to show up on the network dashboard, we would need to use the `wp_network_dashboard_setup` hook.

The `sp_assignments_dashboard_widget()` function draws the actual widget shown on the dashboard page. This is where we would add our code to loop through assignments and show stats on what percentage of assignments have been turned in.

The `sp_assignments_dashboard_widget_configuration()` function draws the configuration form and also includes code to process the form submission and update the option we use to store the configuration.

