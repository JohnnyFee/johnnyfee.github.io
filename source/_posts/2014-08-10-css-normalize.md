layout: post
title: "CSS Normalize"
category: CSS
tags: [css, normalize]
---

## Difference between Normalize.css and Reset CSS?

1.  **Normalize.css preserves useful defaults rather than "unstyling" everything.** For example, elements like `sup` or `sub` "just work" after including normalize.css (and are actually made more robust) whereas they are visually indistinguishable from normal text after including reset.css. So, normalize.css does not impose a visual starting point (homogeny) upon you. This may not be to everyone's taste. The best thing to do is experiment with both and see which gels with your preferences.

2.  **Normalize.css corrects some common bugs that are out of scope for reset.css.** It has a wider scope than reset.css, and also provides bug fixes for common problems like: display settings for HTML5 elements, the lack of `font` inheritance by form elements, correcting `font-size` rendering for `pre`, SVG overflow in IE9, and the `button` styling bug in iOS.

3.  **Normalize.css doesn't clutter your dev tools.** A common irritation when using reset.css is the large inheritance chain that is displayed in browser CSS debugging tools. This is not such an issue with normalize.css because of the targeted stylings.

4.  **Normalize.css is more modular.** The project is broken down into relatively independent sections, making it easy for you to potentially remove sections (like the form normalizations) if you know they will never be needed by your website.

5.  **Normalize.css has better documentation.** The normalize.css code is documented inline as well as more comprehensively in the [GitHub Wiki](https://github.com/necolas/normalize.css/wiki). This means you can find out what each line of code is doing, why it was included, what the differences are between browsers, and more easily run your own tests. The project aims to help educate people on how browsers render elements by default, and make it easier for them to be involved in submitting improvements.

I've written in greater detail about this in an article [about normalize.css](http://nicolasgallagher.com/about-normalize-css/)

See [What is the difference between Normalize.css and Reset CSS? - Stack Overflow](http://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css)

## Reset

- [2014’s most popular CSS Reset scripts, all in one place](http://www.cssreset.com/)