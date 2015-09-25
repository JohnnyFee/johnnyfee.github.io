layout: post
title: "WordPress Theme - The7"
category: WordPress
tags: [wordpress, the7]
---

## FAQ

### Change portfolio archive link in breadcrumb

See [Change portfolio archive link in breadcrumb](http://support.dream-theme.com/knowledgebase/change-portfolio-archive-link-in-breadcrumb/)

To change the default portfolio archive link in breadcrumb with your custom portfolio page, add this code snippet in child theme’s functions.php

```
add_filter( 'post_type_archive_link', 'my_portfolio_archive_link' ,10,3 );

function my_portfolio_archive_link( $archivelink ) {
    if( get_post_type() == 'dt_portfolio') {
        return get_permalink( 382 ); //replace 382 with id of your portfolio page
    }
    else {
        return $archivelink;
    }
}
```

Get the code from github

Get the code from [github](https://gist.github.com/thecodepoetry/69c2133b4ee671edea1f)

**For The7.2**

This work around will not work in The7.2, but you can enable a dedicated back button in Post navigation area. This can enable and configure from **Theme options > Blog, Portfolio, Gallery** menu. Please refer to theme [guide ](http://guide.dream-theme.com/the7-2/user-guide/theme-options/blog-portfolio/)for details.

