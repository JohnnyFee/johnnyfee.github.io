layout: post
title: "WordPress Themes"
description: ""
category: WordPress
tags: [wordpress, tutorial]
---

## Themes Versus Plugins

At some level, all source files in your themes and plugins are just .php files loaded at different times by WordPress. In theory, your entire app code could reside in one theme or one plugin. In practice, you’ll want to reserve your theme for code related to the frontend (views) of your website and use plugins for your app’s backend (models and controllers).

Where you decide to put some code will depend on whether you are primarily building a full app or an individual plugin or theme.

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

