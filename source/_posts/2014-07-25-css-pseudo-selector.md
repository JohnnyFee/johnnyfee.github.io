layout: post
title: "CSS 伪选择器"
category: CSS
tags: [web, css, selector]
---

The pseudo-elements contain no true content and are __absolutely positioned__. This
means that they can be stretched to sit over any area of the “parent” element
without affecting its content. This can be done using any combination of values
for the `top`, `right`, `bottom`, `left`, `width`, and `height` properties and
is the key to their flexibility.

Pseudo class selectors are CSS selectors with a colon preceding them. You are probably very familiar with a few of them. Like hover:

```
a:hover {
  /* Yep, hover is a pseudo class */
}
```

They are immensely useful in a variety of situations. Some of them are CSS3, some CSS2... it depends on each particular one. Outside of IE, they have great browser support. In IE land, even IE8, support is pretty barren. However, the IE9 preview has [full support of them](http://ie.microsoft.com/testdrive/benchmarks/CSS3info/Default.html). The link-related ones work but not much else.  Let's take a brief look at each one of them. Don't worry, there isn't that many.

<!-- more -->

### Link-related pseudo class selectors

[:link](http://css-tricks.com/almanac/selectors/l/link/) - Perhaps the most confusion-causing link-related pseudo selector. 

[:visited](http://css-tricks.com/almanac/selectors/v/visited/) - Selects links that have already been visited by the current browser.

[:hover](http://css-tricks.com/almanac/selectors/h/hover/) - When the mouse cursor rolls over a link, that link is in it's hover state and this will select it.

[:active](http://css-tricks.com/almanac/selectors/a/active/) - Selects the link while it is being activated (being clicked on or otherwise activated). For example, for the "pressed" state of a button-style link or to [make all links feel more button-like](http://css-tricks.com/one-pixel-shift-buttons/).

There is a fun technique to remember all the link pseduo class selectors. Look at the first letter of each: LVHA ... [**L**O**V**E **H****A**TE](http://css-tricks.com/remember-selectors-with-love-and-hate/).

### Input & link related pseudo class selectors

[:focus](http://css-tricks.com/almanac/selectors/f/focus/) - Defining hover styles for links is great, but it doesn't help out those who used keyboard navigation to get to the link. :focus will select links that are the current focus of the keyboard. This is not limited to links, but can be used (and really should be used) on inputs and textareas as well. [Some would tell you](http://antonpeck.com/journal/article/focus_on_the_hover/) to define a :focus style for anything that has a :hover style.

![Form with a text input in focus. Yellow background is a focus style.](http://johnnyimages.qiniudn.com/formwithfocus.png)

- [:target](http://css-tricks.com/almanac/selectors/t/target/) - The target pseudo class is used in conjunction with IDs, and match when the hash tag in the current URL matches that ID. So if you are at URL www.yoursite.com/#home then the selector 
<tt>#home:target</tt> will match. That can be extremely powerful. For example, you can create a [tabbed area](http://css-tricks.com/css3-tabs/) where the tabs link to hash tags and then the panels "activate" by matching :target selectors and (for example) using z-index to move to the top.

- [:enabled](http://css-tricks.com/almanac/selectors/e/enabled/) - Selects inputs that are in the default state of enabled and ready to be used.

- [:disabled](http://css-tricks.com/almanac/selectors/d/disabled/) - Selects inputs that have the 
<tt>disabled</tt> attribute. A lot of browsers will make the input a faded out gray, you can control that with this selector.

    ![](http://css-tricks.com/wp-content/csstricks-uploads/disabledelements.png)

- [:checked](http://css-tricks.com/almanac/selectors/c/checked/) - Selects checkboxes that are, wait for it, checked.

- **:indeterminate** - Selects radio buttons that are in the purgatory state of neither chosen or unchosen (like when a page loads with radio button choices but no default is set).

    ![](http://css-tricks.com/wp-content/csstricks-uploads/radiopurgatory.png)  

    <figcaption>Set of radio buttons in purgatory. Or more accurately, in their :indeterminate status.</figcaption>

### Position/Number-based pseudo class selectors

- [:root](http://css-tricks.com/almanac/selectors/r/root/) - Selects the element that is at the root of the document. Almost certainly will select the `<html>` element, unless you are specifically working in some weird environment that somehow also allows CSS. Perhaps XML.

- [:first-child](http://css-tricks.com/almanac/selectors/f/first-child/) - Selects the first element within a parent. 

- [:last-child](http://css-tricks.com/almanac/selectors/l/last-child/) - Selects the last element within a parent.

- [:nth-child(N)](http://css-tricks.com/almanac/selectors/n/nth-child/) - Selects elements based on a simple provided algebraic expression (e.g. "2n" or "4n-1"). Has the ability to do things like select even/odd elements, "every third", "the first five", and things like that. Covered in [more detail here](http://css-tricks.com/how-nth-child-works/) with a [tester tool](http://css-tricks.com/examples/nth-child-tester/). 

- [:nth-of-type(N)](http://css-tricks.com/almanac/selectors/n/nth-of-type/) - Works like :nth-child, but used in places where the elements at the same level are of different types. Like if inside a div you had a number of paragraphs and a number of images. You wanted to select all the odd images. :nth-child won't work there, you'd use 
<tt>div img:nth-of-type(odd)</tt>. Particularly useful when working with definition lists and their alternating and elements.

- [:first-of-type](http://css-tricks.com/almanac/selectors/f/first-of-type/) - Selects the first element of this type within any parent. So if you have two divs, each had within it a paragraph, image, paragraph, image. Then 
<tt>div img:first-of-type</tt> would select the first image inside the first div and the first image inside the second div.

- [:last-of-type](http://css-tricks.com/almanac/selectors/l/last-of-type/) - Same as above, only would select the last image inside the first div and the last image inside the second div.

- **:nth-last-of-type(N)** - Works like :nth-of-type, but it counts up from the bottom instead of the top.

- **:nth-last-child(N)** - Works like :nth-child, but it counts up from the bottom instead of the top.

- [:only-of-type](http://css-tricks.com/almanac/selectors/o/only-of-type/) - Selects only if the element is the only one of its kind within the current parent. 

![](http://css-tricks.com/wp-content/csstricks-uploads/relationalpseudos2.png)

### Relational pseudo class selectors

- [:not(S)](http://css-tricks.com/almanac/selectors/n/not/) - Removes elements from an existing matched set that match the selector inside the parameter of :not(). So for example, all divs _except_ those with a class of "music" = 
<tt>div:not(.music)</tt>. The spec says that :not selectors cannot be nested, but they can be chained. Some browsers (Firefox) also support comma-separated selectors as the selector parameter, although chaining them would be a far safter bet. Also useful in conjunction with attribute selectors, e.g. 
<tt>input:not([disabled])</tt>.

- [:empty](http://css-tricks.com/almanac/selectors/e/empty/) - Selects elements which contain no text and no child elements. e.g. 
<tt>&lt;p&gt;&lt;/p&gt;</tt>

### Text-related pseudo class selectors / elements

- [::first-letter](http://css-tricks.com/almanac/selectors/f/first-letter/) - Selects the first letter of the text in the element. Typical use: dropcaps.

- [::first-line](http://css-tricks.com/almanac/selectors/f/first-line/) - Selects the first line of text in the element. Typical use: setting the first sentence in small-caps as a typographical eye-catcher / lead-in.

- [:lang](http://css-tricks.com/almanac/selectors/l/lang/) - This pseudo selector is in the CSS3 spec but only implemented in IE 8+. Will match anything that either has or is a descendant of an element with a matching lang attribute. For example, :lang(fr) will match any paragraph, even without a lang attribute, if the parent body had lang="fr" as an attribute.

#### Quick note

You can chain pseduo selectors just like you can [chain class and ID selectors](http://css-tricks.com/multiple-class-id-selectors/). This is particularly useful here while we are looking at :first-letter and :first-line. You probably wouldn't want to drop cap every single paragraph on the page, but just the first one, so, 
<tt>p:first-child:first-letter {   }</tt>

![](http://css-tricks.com/wp-content/csstricks-uploads/dropcap.png)  

Dropcap using :first-letter, which enlarges the font size and floats to the left.

### Content-related pseudo "elements"

- [::before](http://css-tricks.com/almanac/selectors/a/after-and-before/) - Is able to add content before a certain element. For example, adding an opening quote before a blockquote or perhaps an preceding image to set apart a particular paragraph.

- [::after](http://css-tricks.com/almanac/selectors/a/after-and-before/) - Is able to add content after a certain element. For example, a closing quote to a blockquote. Also used commonly for the [clearfix](http://css-tricks.com/snippets/css/clear-fix/), where an empty space is added after the element which clears the float without any need for extra HTML markup.

#### Pseudo Elements vs Pseudo Selectors

These are appropriately called pseudo "elements" (not selectors) because they don't select any "real" element that exists on the page. This goes for these two, as well as the previous sections :first-letter and :first-line. Make sense? Like the first letter that ::first-letter selects isn't an element all to itself, it's just a part of an existing element, hence, pseudo element.

The double colons (::) make this distinction.

### Tag Qualification

These selectors can be tag-qualified, meaning they will only apply if _both_ the element (tag) and selector match. For instance:

```
p:first-child {
  color: red;
}
```

That will only match if the first child of another element is a `

`. If it's not, it won't match.

### Deprecated

- **:contains()** - As far as I know, this is gone. The current CSS3 spec has removed it. I don't know the story, let me know if you do. At a glance, it looks ridiculously useful (being able to select objects based on the textual content they contain). It may be because of problems, or having content in selectors being undesirable. My preference would be to have it select by elements rather than text, like p:contains(img), but alas, no such luck.

- **::selection** - Allows the changing of style of selected text. It was drafted for CSS Selectors Level 3 but removed before it reached the Recommendation status. Despite this, it's implemented in some browsers, which will probably retain experimental support for it. For Firefox, you can use ::-moz-selection. [More information here](http://css-tricks.com/overriding-the-default-text-selection-color-with-css/).

- **:required / :optional / :read-only / :read-write** - Just use attribute selectors instead.

### jQuery Usage

jQuery can use all of these in its selectors, which is awesome. Even _awesomer_, jQuery has additional pseudo class selectors available.

- **:first** - Matches the first instance of the _already matched_ set. This is different than :nth-child(1) which will only select if the selector matches _and_ it's the first child. With :first, the selector matches, then it takes the first one it finds regardless of child position.

- **:eq(X)** - jQuery doesn't support :nth-of-type (it does support :nth-child) as a part of it's selector engine, but this is very similar. This selects the Xth element from the already-matched set. It's also zero-indexed (0 is the first element) unlike :nth-child in which the first element is 1.

The above two concepts are kinda weird. [Here's a demo.](http://jsfiddle.net/chriscoyier/PDRAG/5/)

- **:contains('text')** - This is removed from CSS, but still works in jQuery.

- **:lt(X)** - The same as :nth-child(-n+X), as in it selects the "first X elements"

- **:gt(X)** - The same as :nth-child(n+X), as in it selects everything except the "first (X-1) elements"

- **:even** - The same as :nth-child(even) or :nth-child(2n)

- **:odd** - The same as :nth-child(odd) or :nth-child(2n+1)

- **:has(S)** - Works like I wish CSS :contain did, where it tests if the element has a descendant of a certain selector before matching.

There are actually a whole bunch more, and all of them are clever and useful (or at least an improvement on readability) See the [selector documentation](http://api.jquery.com/category/selectors/) for more.

NOTE: jQuery can't really help you with pseudo _elements_ like :before and :after, but you can [access their values in some browsers](http://jsfiddle.net/chriscoyier/GTLWn/4/). E.g if a div had some :before generated content, you could get the value like:

```
var content = window
    .getComputedStyle($('div')[0], ':before')
    .getPropertyCSSValue('content')
    .cssText;
```

### Specificity

Class selectors and pseudo class selectors have the same specificity weight:

```
li            {}  /* specificity = 0,0,0,1 */
li:first-line {}  /* specificity = 0,0,1,1 */
li.red  {}        /* specificity = 0,0,1,1 */
```

Typically they are used in conjunction or listed afterwards in CSS anyway, so hopefully it won't cause too many problems...

    ul li.friend { margin: 0 0 5px 0; }  
    ul li:last-child { margin: 0; }

In that case the zeroing out of the margin would work (assuming it matched the same element), but only because the zeroing out is listed second (they have the same specificity). So... watch for that.

## ::after / ::before

`::after` 和 `::before` 插入的内容看上去在页面中，但其实它并不尊在与 DOM 中。`::after` 将内容插入元素后，`::before` 将内容插入到元素前。

```css
div::after {
  content: "hi";
}
```

```html
<div>
  <!-- Rest of stuff inside the div -->
  hi
</div>
```

`::before` is exactly the same only it inserts the `content` before any other content in the HTML instead of after. The only reasons to use one over the other are:

* You want the generated content to come before the element content, positionally.
* The `::after` content is also "after" in source-order, so it will position on top of `::before` if stacked on top of each other naturally.

`content` 的值可以为： 

* **字符串**： `content: "a string";` 特殊字符需要编码为 unicode 实体（entity），See  [glyphs page](http://css-tricks.com/snippets/html/glyphs/)。
* **图片**： `content: url(/path/to/image.jpg);` 图片以它真实的大小插入，并且不能[调整大小]((http://cdpn.io/hbgJc))。由于 [gradients](http://css-tricks.com/css3-gradients/) 实际上也是图片，所以伪元素也可是 gradient。
* **无**： `content: "";` Useful for clearfix and inserting images as background-images (set width and height, and can even resize with background-size). 在 clearfix 和插入作为背景的图片（设置宽度和高度，设置可以使用 `background-size` 调整大小）是有用。
* **计数器**： `content: counter(li);` 结合 `:marker`，对 [styling lists](http://www.456bereastreet.com/archive/201105/styling_ordered_list_numbers/) 有用。

注意你不能插入 HTML（至少，它将作为 HTML 显示），如 `content: "<h1>nope</h1>";`。

## Example

- [A whole bunch of cool stuff they can do](http://css-tricks.com/pseudo-element-roundup/)

## Reference

- [Meet the Pseudo Class Selectors](http://css-tricks.com/pseudo-class-selectors/)
- [::after / ::before](http://css-tricks.com/almanac/selectors/a/after-and-before/)

## FAQ

- [Adding HTML entities using CSS content - Stack Overflow](http://stackoverflow.com/questions/190396/adding-html-entities-using-css-content)

## Tutorial

- [CSS Content](http://css-tricks.com/css-content/) 
