layout: post
title: Drawing multiline text to Canvas on Android
tags: [android, canvas]
category: Android
---

From [Drawing multiline text to Canvas on Android – Over Engineering – Medium](https://medium.com/over-engineering/drawing-multiline-text-to-canvas-on-android-9b98f0bfa16a)

Leveraging the Android framework and Kotlin to make Canvas text drawing more powerful
</section>


The Android `Canvas` offers a variety of drawing functions for implementing custom graphics in your app. A common use of `Canvas` is to draw text to a given region of a custom `View`, `Drawable`, `Bitmap`, etc.

`Canvas` has existing functions that allow you to draw text, the simplest of which can be seen below:

<pre name="e0c4" id="e0c4" class="graf graf--pre graf-after--p">
canvas.drawText(**text**, x, y, **paint**)
</pre>

A single line of text is drawn at a given (x, y) origin, taking into account the properties of the `Paint` (to describe the colors and styles for the drawing eg. `color`, `textSize`, etc.). Other variants of this function exist that allow for specification of start and end positions within the text, drawing along a `Path`, etc.

### The limitations of Canvas text drawing 🤨

The existing Canvas text drawing functions are simple and powerful but aren’t without their limitations. The major drawback (as mentioned above) is that the text is drawn on a _single line_. If the width of the text exceeds the width of the `Canvas`, the text will be clipped. Long text will usually need to be drawn on multiple lines, and you may have wanted “paragraph” style text in the first place. From here on, we’ll refer to this as multiline text.

### How do we draw multiline text? 🤔

So how should we go about implementing this? Unfortunately you can’t just include `\n` characters in your text, as all whitespace characters are interpreted and drawn as spaces within the single line. `Paint` includes handy [`measureText`](https://developer.android.com/reference/android/graphics/Paint.html#measureText%28java.lang.String,%20int,%20int%29) and [`breakText`](https://developer.android.com/reference/android/graphics/Paint.html#breakText%28java.lang.String,%20boolean,%20float,%20float[]%29) functions for splitting up text which you could use. You may even consider an existing algorithm such as the [Knuth-Plass Line Wrapping Algorithm](https://www.ugrad.cs.ubc.ca/~cs490/2015W2/lectures/Knuth.pdf). This quickly becomes a complex problem.

### Android framework to the rescue 🚀

Thankfully, the Android framework provides us with a class that handles all of the complexity for us: [`Layout`](https://developer.android.com/reference/android/text/Layout.html) (in the `android.text` package), described as _“a base class that manages text layout in visual elements on the screen”_. It forms the basis of how classes like `TextView` fit text within given layout parameters.

The documentation stipulates:

> For text that will be edited, use a [`DynamicLayout`](https://developer.android.com/reference/android/text/DynamicLayout.html), which will be updated as the text changes. For text that will not change, use a [`StaticLayout`](https://developer.android.com/reference/android/text/StaticLayout.html).

Considering that we are trying to draw some static (multiline) text to Canvas, `StaticLayout` is just what we need!

### Using StaticLayout 👨‍💻

Using `StaticLayout` is quite simple. Firstly, instantiate one by obtaining and using a `StaticLayout.Builder`:

```
val staticLayout = StaticLayout.Builder
        .obtain(text, start, end, textPaint, width)
        .build()
```

A few parameters are required when obtaining the builder:

* `text`: The text `CharSequence` to be laid out, optionally with spans
* `start`: The index of the start of the text
* `end`: The index + 1 of the end of the text
* `textPaint`: The `TextPaint` used for layout
* `width`: The bounding width (in pixels)

These parameters allow `StaticLayout` to layout the text appropriately within the bounding `width`. A resultant `height` property becomes available once the `StaticLayout` has been instantiated. Many other parameters can be appended to the builder to adjust the end appearance, but we’ll get to those later.

_Note:_ `_StaticLayout.Builder_` _was added in API Level 23. Prior to this, you need to use the_ `_StaticLayout_` _constructors. To add to this, the constructors have been deprecated in API Level 28. Be sure to handle backwards compatibility appropriately._

Then draw!

```
staticLayout.draw(canvas)
```

_Note: If you happen to be utilising this in the_ `_onDraw_` _function of a custom_ `_View_`_, be sure to instantiate the_ `_StaticLayout_` _separately to avoid object allocation during drawing (in a constructor or Kotlin_ `_init_` _block, for example)._

### A word on TextPaint ☝️

Before we progress, there’s one thing that needs to be discussed… What is [`TextPaint`](https://developer.android.com/reference/android/text/TextPaint.html)? While almost all `Canvas` functions require a `Paint` parameter, `StaticLayout` requires a `TextPaint`. From the documentation, it is described as _“an extension of Paint that leaves room for some extra data used during text measuring and drawing”_. A great explanation can be found [here](https://stackoverflow.com/a/41775822/9283528). In short, you use it exactly as you would `Paint` and don’t have to worry about the extra data it includes (for the purpose of what we are doing).

### Exploring the StaticLayout properties 🔍

Phew! We now know the basics of what `StaticLayout` is and how we can use it to draw multiline text to `Canvas`. However, there are _a lot_ of parameters that you can provide to change the appearance of the end result.

Consider a basic text editor: you usually have options to change the alignment, margins, line spacing, text size and more. The same is true for `StaticLayout`; additional parameters can be appended to the `StaticLayout.Builder`.

It is important to note that some parameters (like `color`) do not belong directly to `StaticLayout`, but rather belong to the`TextPaint`. Let’s take a look at the some of the options we have:

#### alignment

The alignment of the text, similar to gravity.

![](https://cdn-images-1.medium.com/max/800/1*4ziBwpKQZrS94VrNSFNLHQ.png)
</figure>

#### textDirection

The horizontal direction that the text follows.

![](https://cdn-images-1.medium.com/max/800/1*c3T8PJvb0ve726Yd2XJz-w.png)
</figure>

#### lineSpacing

The spacing between lines of text (includes `spacingMult` and `spacingAdd`).

![](https://cdn-images-1.medium.com/max/800/1*UNAk_C5cmdLt-U8gVjsKJw.png)
</figure>

#### justificationMode (minSdk 26)

Options to justify the text (stretch spaces so that the lines appear “square”).

![](https://cdn-images-1.medium.com/freeze/max/30/1*JtU7B-i7fqMLRUOcZZpQFA.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*JtU7B-i7fqMLRUOcZZpQFA.png)

Other properties include `ellipsize`, `maxLines`, `indents` and more. Check the [`StaticLayout`](https://developer.android.com/reference/android/text/StaticLayout.html) and [`StaticLayout.Builder`](https://developer.android.com/reference/android/text/StaticLayout.Builder.html) documentation for what’s available.

### Positioning multiline text 📍

By default, calling `staticLayout.draw(canvas)` will draw the entire block of text (from its top left corner) at position (0, 0) on the `Canvas`. This is fine for simple use cases, but we may want to position the text elsewhere (as we are able to do with the default `Canvas` text drawing methods).

We know that we define the bounding `width` of this block, and that we get a resultant `height` once we’ve instantiated the `StaticLayout`. We can use these properties along with a basic `Canvas` translation to position the text.

To do this, we declare a `StaticLayout` extension function. It makes use of the handy `Canvas.withTranslation` function found in the [Android KTX library](https://github.com/android/android-ktx):

```
fun StaticLayout.draw(canvas: Canvas, x: Float, y: Float) {
    canvas.withTranslation(x, y) {
        draw(this)
    }
}
```

### Using Kotlin to make it feel familiar 🤓

There may be multiple places in an app in which we need to implement multiline text drawing. Instantiating a `StaticLayout` in every place would lead to unnecessary bloat. So let’s make an extension function for `Canvas`!

```
fun Canvas.drawMultilineText(
        text: CharSequence,
        textPaint: TextPaint,
        width: Int,
        x: Float,
        y: Float,
        start: Int = 0,
        end: Int = text.length,
        alignment: Layout.Alignment = Layout.Alignment.ALIGN_NORMAL,
        textDir: TextDirectionHeuristic = TextDirectionHeuristics.LTR,
        spacingMult: Float = 1f,
        spacingAdd: Float = 0f,
        hyphenationFrequency: Int = Layout.HYPHENATION_FREQUENCY_NONE,
        justificationMode: Int = Layout.JUSTIFICATION_MODE_NONE) {

    val staticLayout = StaticLayout.Builder
            .obtain(text, start, end, textPaint, width)
            .setAlignment(alignment)
            .setTextDirection(textDir)
            .setLineSpacing(spacingAdd, spacingMult)
            .setBreakStrategy(breakStrategy)
            .setJustificationMode(justificationMode)
            .build()

    staticLayout.draw(this, x, y)
}
```

This extension function includes most (not all) of the `StaticLayout` properties, and provides default values for those that may not be used as commonly. It also makes use of our previously defined extension function to position the block of text.

We can now draw multiline text to `Canvas` in a way that feels very familiar to the existing text drawing functions:

```
canvas.drawMultilineText(text, textPaint, width, x, y)
```

### But there’s one issue… 😬

Our new `drawMultilineText` extension function is great to use, but it’s doing something it shouldn’t: it instantiates a new `StaticLayout` every time it is called. This violates our goal to avoid object allocation during drawing.

### Implementing a StaticLayout cache 💾

There’s most likely a variety of ways to solve the aforementioned issue. One approach is to implement a basic `LruCache` to store/retrieve `StaticLayout`s for drawing (again making use of the Android KTX library for the `lruCache` extension function):

```
object StaticLayoutCache {
    
    private const val MAX_SIZE = 50 // Max number of cached items
    private val cache = lruCache<String, StaticLayout>(MAX_SIZE)

    operator fun set(key: String, staticLayout: StaticLayout) {
        cache.put(key, staticLayout)
    }

    operator fun get(key: String): StaticLayout? {
        return cache[key]
    }
}
```

Now, we only instantiate a `StaticLayout` on first use of the `drawMultilineText` function (and put it in the cache), otherwise we get one from the cache:

```
val staticLayout = StaticLayoutCache[cacheKey] ?:
    StaticLayout.Builder.obtain(text, start, end, textPaint, width)
        ... // Add other properties
        .build().apply { StaticLayoutCache[cacheKey] = this }
```

The final piece of the puzzle is deciding what to use as the `cacheKey`. Using `StaticLayout.toString()` comes to mind, but this means we would need to instantiate it first, which we don’t want to do if there’s a cached version. Given that the parameters of the `drawMultilineText` function essentially describe the uniqueness of a `StaticLayout` for our purposes, we can create our own key like so:

```
val cacheKey = "$text-$start-$end-$textPaint-$width-$alignment-$textDir-$spacingMult-$spacingAdd-$breakStrategy-$justificationMode"
```

### Wrapping it up 🎁

The final implementation provides us with an idiomatic (and, hopefully, performant) way of drawing multiline text to `Canvas`, which feels at home amongst other `Canvas` functions. It also includes full backwards compatibility and all of the available `StaticLayout` properties. Using Kotlin extension functions, named parameters and operator overloading has greatly reduced the amount of code and made the end result easier to use.

<script src="https://gist.github.com/nicholasrout/d03862acd3b626e508ef5a432ae42fae.js"></script>

I hope this post has provided some insight into `StaticLayout` and how it can be used for multiline text drawing on `Canvas`. If you have any questions, thoughts or suggestions then I’d love to hear from you!
