layout: post
title: "WordPress robots.txt Example"
description: ""
category: SEO
tags: [seo]
---

See [WordPress robots.txt Example • Yoast](https://yoast.com/wordpress-robots-txt-example/)

The robots.txt file is a very powerful file if you’re working on a site’s SEO, but one that also has to be used with care. It allows you to deny search engines access to certain files and folders, but that’s very often _not_ what you want to do. Over the years, especially Google changed a lot in how it crawls the web, so old best practices are no longer valid. This post explains what the new best practices are and why.

<!-- more -->

## Google fully renders your site

No longer is Google the dumb little kid that just fetches your sites HTML and ignores your styling and JavaScript. It fetches _everything_ and renders your pages completely. This means that when you deny Google access to your CSS or JavaScript files, it doesn’t like that _at all_. My [recent post about Google Panda 4](https://yoast.com/google-panda-robots-css-js/) shows an example of this.

To see whether your site can be fully rendered, you can do a Fetch & Render in [Google Webmaster Tools crawl section](https://yoast.com/google-webmaster-tools-crawl/).

This means that the old often heard best practice of having a robots.txt that blocks access to your `wp-includes` directory and our own old best practice of blocking your plugins directory are no longer valid. This is why, in WordPress 4.0, I [opened the issue and wrote the patch](https://core.trac.wordpress.org/ticket/28604) to remove `wp-includes/*` from the default WordPress robots.txt.

## Robots.txt denies links their value

Something else is very important to keep in mind. If you block a URL with your site’s robots.txt, search engines will not crawl those pages. This also means that they cannot distribute the link value pointing at those URLs. So if you have a section of your site that you’d rather not have showing in the search results, but does get a lot of links, don’t use the robots.txt file. Instead, use a robots meta tag with a value `noindex, follow`. This allows search engines to properly distribute the link value for those pages across your site.

## Our WordPress robots.txt example

So, what should be in your WordPress robots.txt? Ours is _very_ clean now. The only thing we still block is our `/out/` directory for our affiliate links, [as discussed in this post](https://yoast.com/cloak-affiliate-links/ "How to cloak your affiliate links"). We no longer block our `/wp-content/plugins/` directory, as plugins might output JavaScript or CSS that Google needs to render the page, nor do we block our `/wp-includes/` directory, as the default JavaScripts that come with WordPress, which many a theme uses, come from these directories.

## What you should do with your robots.txt

You should log into Google Webmaster Tools and under Crawl → Fetch as Google, use the Fetch and Render option:

![Fetch and Render in Google Webmaster Tools to test your WordPress robots.txt.](https://yoast-mercury.s3.amazonaws.com/uploads/2015/02/fetch-render.png)

If it doesn’t look like what you’re seeing when you browse your site, or it throws errors or notices: fix them by removing the lines that block access to those URLs from your robots.txt file.

## Update after questions

### Blocking your `/wp-admin/` folder

In the comments many people asked whether I think you should block your `/wp-admin/` folder. I think you shouldn’t. The reason is simple: if you block it, but link to it a few times, people will still be able to do a simple “inurl:wp-admin” query and find your site. This type of query is the type of query malicious hackers _love_ to do. If you don’t do anything, WordPress has ([by my doing](https://core.trac.wordpress.org/changeset/20288)) a [robots meta x-http header](https://yoast.com/x-robots-tag-play/) on the admin pages that prevents search engines from showing these pages in the search results, a much cleaner solution.

### Linking to your XML Sitemap from your `robots.txt`

I’ve always felt linking to your XML sitemap from your robots.txt is a bit nonsense. You should be adding them manually to your [Google and Bing Webmaster Tools](https://yoast.com/tag/webmaster-tools/) and make sure you look at their feedback about your XML sitemap. This is the reason our [Yoast SEO plugin](https://yoast.com/wordpress/plugins/seo/) doesn’t add it to your `robots.txt`.