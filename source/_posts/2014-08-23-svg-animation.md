layout: post
title: "SVG Animation"
category: SVG
tags: [animation, svg]
---

> orgin: <http://tutorials.jenkov.com/svg/svg-animation.html> 

It is possible to animate the shapes in an SVG image. There are several different ways
to animate SVG shapes. In this text I will go through the various possibilities.

## SVG Animation Example

Here is a simple SVG animation example:

<p data-height="268" data-theme-id="0" data-slug-hash="CEjcr" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/JohnnyFee/pen/CEjcr/'>CEjcr</a> by Johnny Fee (<a href='http://codepen.io/JohnnyFee'>@JohnnyFee</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Notice how the `<rect>` element has a `<animateTransform>` element nested inside it. It is this element that animates the rectangle.

<!--more-->

## Overview of Animation Options

Animation is done by manipulating the attributes of shapes over time. This is done using one or more of the 5 SVG animation elements:

1.  `<set>`
2.  `<animate>`
3.  ` <animateColor>`
4.  `<animateTransform>`
5.  `<animateMotion>`

Each of these SVG animation elements sets or animates different aspects of SVG shapes. These animation elements are explained throughout the rest of this text.

## set

The `set` element is the simplest of the SVG animation elements. It simply sets an attribute to a certain value after a specific time interval has passed. As such, the shape is not continuously animating, but just changes attribute value once.

Here is a `<set>` element example:

    <circle cx="30" cy="30" r="25" style="stroke: none; fill: #0000ff;">
        <set attributeName="r" attributeType="XML"
             to="100"
             begin="0s"  />

    </circle>

Notice the `<set>` element nested inside the `circle` element. This is how the `<set>` element is applied to a shape - by nesting it inside the SVG element of the shape you want to apply it to.

The `<set>` element sets the value of an attribute at a certain time. The name of the attribute to set is specified inside the `attributeName` attribute. The value to set it to is specified inside the `to` attribute. The time to set the attribute value is specified inside the `begin` attribute.

The example above sets the attribute `r` to 100 after 5 seconds. Here is the resulting image:

<svg width="500" height="100">
    <circle cx="30" cy="30" r="100" style="stroke: none; fill: #0000ff;">
        <set attributeName="r" attributeType="XML" to="100" begin="5s"></set>
    </circle>
</svg>

### attributeType

The previous example also had an `attributeType` attribute inside the `<set>` element. The value was set to `XML`. That is because the attribute to set a value for in the example (the `r` attribute) is an attribute of the SVG circle element. Since SVG elements are XML elements, SVG attributes are XML attributes.

You can also animate CSS properties of a shape. If you do so, you will need to set the `attributeType` to `CSS`. If you do not provide an `attributeType` attribute, then the browser will try to guess if the attribute to animate is an XML attribute or CSS property.

## animate

The `animate` element is used to animate an attribute of an SVG shape. You nest the `animate` element inside the shape you want it applied to. Here is an example:

    <circle cx="30" cy="30" r="25" style="stroke: none; fill: #0000ff;">
        <animate attributeName="cx" attributeType="XML"
                 from="30"  to="470"
                 begin="0s" dur="5s"
                 fill="remove" repeatCount="indefinite"/>

    </circle>

This example animates the `cx` attribute of the `<circle>` element from a value of 30 (the `from` attribute) to a value of 479 (the `to` attribute). The animation starts at 0 seconds (the `begin` attribute) and has a duration of 5 seconds (the `dur` attribute).

When the animation is finished the animated attribute is set back to its original value (the `fill="remove"` attribute setting). If you wanted the animated attribute to keep the to-value of the animation, set the `fill` attribute to `freeze`. The animation repeats indefinitely (the `repeatCount` attribute).

Here is the resulting animation:

<svg width="500" height="75">
    <circle cx="349.968" cy="30" r="25" style="stroke: none; fill: #0000ff;">
        <animate attributeName="cx" attributeType="XML" from="30" to="470" begin="0s" dur="5s" fill="remove" repeatCount="indefinite"></animate>
    </circle>
</svg>

## animateTransform

The `<animateTransform` element can animate the `transform` attribute of a shape. The `<animate>` element cannot do that.

Here is an example:

    <rect x="20" y="20" width="100" height="40"
        style="stroke: #ff00ff; fill:none;" >
      <animateTransform attributeName="transform"
                        type="rotate"
                        from="0 100 100" to="360 100 100"
                        begin="0s" dur="10s"
                        repeatCount="indefinite"
              />
    </rect>    

This `<animateTransform>` example animates the `transform` attribute of the `<rect>` element it is nested inside. The `type` attribute is set to `rotate` (the rotate transform function) meaning the animated transformation will be a rotation. The `from` and `to` attributes set the parameters to be animated and passed to the `rotate` function. This example rotates from a degree of 0 to a degree of 360 around the point 100,100 .

<svg width="500" height="200">
    <rect x="20" y="20" width="100" height="40" style="stroke: #ff00ff; fill: none;" transform="rotate(310.896 100 100)">
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" begin="0s" dur="10s" repeatCount="indefinite"></animateTransform>
    </rect>
    <circle cx="100" cy="100" r="2" style="stroke: none; fill: #0000ff;"></circle>
</svg>

Here is an example that animates the scale of a square:

    <rect x="20" y="20" width="40" height="40"
          style="stroke: #ff00ff; fill: none;" >
        <animateTransform attributeName="transform"
                          type="scale"
                          from="1 1" to="2 3"
                          begin="0s" dur="10s"
                          repeatCount="indefinite"
                />
    </rect>

Notice again that the `from` and `to`  attributes contain the values you would normally pass as parameters to the `scale()` transform function.

Here is the resulting animation:

<svg width="500" height="200">
    <rect x="20" y="20" width="40" height="40" style="stroke: #ff00ff; fill: none;" transform="scale(1.8636 2.7272)">
        <animateTransform attributeName="transform" type="scale" from="1 1" to="2 3" begin="0s" dur="10s" repeatCount="indefinite"></animateTransform>
    </rect>
</svg>

## animateMotion

The `<animateMotion>` element can animate the movement of a shape along a path. It can also rotate the shape to match the slope of the path, like a car driving up and down hill. Here is an example:

    <rect x="0" y="0" width="30" height="15"
        style="stroke: #ff0000; fill: none;">
      <animateMotion
              path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s" dur="10s" repeatCount="indefinite"
              />
    </rect>    

The path to animate the rectangle along is specified in the `path` attribute of the `<animateMotion>` element. The `path` attribute uses the same syntax as the [path element](http://tutorials.jenkov.com/svg/path-element.html).

Here is the resulting animation with the path shown too, so you can better follow the motion.

<svg width="500" height="150">
    <path d="M10,50 q60,50 100,0 q60,-50 100,0" style="stroke: #000000; fill: none;"></path>
    <rect x="0" y="0" width="30" height="15" style="stroke: #ff0000; fill: none;">
        <animateMotion path="M10,50 q60,50 100,0 q60,-50 100,0" begin="0s" dur="10s" repeatCount="indefinite"></animateMotion>
    </rect>
</svg>

In order to rotate the square to align with the slope of the path, you set the `rotate` attribute of the `<animateMotion>` element to `auto`. Here is an example:

    <rect x="0" y="0" width="30" height="15"
        style="stroke: #ff0000; fill: none;">
      <animateMotion
              path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s" dur="10s" repeatCount="indefinite"
              **rotate="auto"**
              />
    </rect>

Here is the resulting animation. Notice how the rotation of the square changes to fit the path.

<svg width="500" height="150">
    <path d="M10,50 q60,50 100,0 q60,-50 100,0" style="stroke: #000000; fill: none;"></path>
    <rect x="0" y="0" width="30" height="15" style="stroke: #ff0000; fill: none;">
        <animateMotion path="M10,50 q60,50 100,0 q60,-50 100,0" begin="0s" dur="10s" repeatCount="indefinite" rotate="auto"></animateMotion>
    </rect>
</svg>

You can also set the `rotate` attribute to a specific value, like 20 or 30 etc. That will keep the shape rotated that number of degrees throughout the animation.

## Time Units

When you define an SVG animation you specify when the animation start time and duration. When specifying that, you have the choice between different time units.  The time units are typically specified inside the `begin`, `dur` and `end` attributes of the various animation elements.

Inside these attributes you can specify a number followed by a time unit, as done in the examples in this text. For instance `5s` means 5 seconds. Here is a list of the time units you can use:

Time Unit | Description 
---------| ------------
`h`       | Hours       
`min`     | Minutes     
`s`       | Seconds     
`ms`      | Milliseconds

You can also specify time in a time format which contain both hours, minutes and seconds. Here is how the format looks like:

    hh:mm:ss

Here is an example:

    1:30:45

This example specifies a time of 1 hour, 30 minutes and 45 seconds (which is of course very long time for an animation).

## Coordinating Animations

You can synchronize the beginning of one animation to the end of another. You do so like this:


    <rect x="0" y="0" width="30" height="15"
          style="stroke: #ff0000; fill: none;">
        <animate id="one"
                 attributeName="x" attributeType="XML"
                 from="0" to="400"
                 begin="0s" dur="10s" fill="freeze"
                />
        <animate
                attributeName="y" attributeType="XML"
                from="0" to="50"
                begin="one.end" dur="10s" fill="freeze"
                />
    </rect>

Here is the resulting animation:

<svg width="500" height="100">
    <rect x="400" y="80" width="30" height="15" style="stroke: #ff0000; fill: none;">
        <animate id="one" attributeName="x" attributeType="XML" from="0" to="400" begin="0s" dur="10s" fill="freeze"></animate>
        <animate attributeName="y" attributeType="XML" from="0" to="80" begin="one.end" dur="10s" fill="freeze"></animate>
    </rect>
</svg>

The first animation has its `id` attribute set to `one`.

The second animation references the first animation via its `begin` attribute. The `begin` attribute value is set to `one.end` which means that this animation should start when the animation with the id `one` ends.

You can use the `id.begin` or `id.end` to start an animation when another animation starts or ends. Instead of `id` use the ID of the animation element to synchronize to.

You can also specify offsets to the start or end time of another animation, like this:

    one.begin+10s
    one.end+5s

Additionally you can specify an explicit end time in an animations `end` attribute. This does not replace the `dur` attribute. All it does is to add another possible end to an animation, so whichever occurs first. Here is an example:

    <animate
            attributeName="y" attributeType="XML"
            from="0" to="50"
            begin="one.begin+3s" dur="10s" end="one.end"
            fill="freeze"
            />

This animation will have a duration of 10 seconds, or stop when the animation with the ID `one` ends, whichever occurs first.

## Repeating Animations

There are two attributes you can use inside an animation element which are used to repeat the animation.

The first attribute is the `repeatCount` attribute. Inside this attribute you can set a number, which will be repeat the animation that number of times, or the value `indefinite` which will keep the animation running without ever stopping.

The second attribute is the `repeatDur` which specifies a duration for which the animation is to be repeated. You can also use the value `indefinite` inside the `repeatDur` attribute, and the effect is the same as using it inside the `repeatCount` attribute.

Here are two examples:

    <animate
            attributeName="y" attributeType="XML"
            from="0" to="50"
            begin="one.begin+3s" dur="10s"
            repeatCount="3"
            fill="freeze"
            />

    <animate
            attributeName="y" attributeType="XML"
            from="0" to="50"
            begin="one.begin+3s" dur="10s"
            repeatDur="30s"
            fill="freeze"
            />

## Combining Animations

You can combine animations by listing more than one `<animation>` inside the element to animate.
You have already seen that, but here is another example:

    <rect x="10" y="10" width="40" height="20"
         style="stroke: #000000; fill: none;">
       <animate attributeName="x"
                attributeType="XML"
                from="10" to="400"
                begin="0s" dur="10s"
                repeatCount="indefinite"
               />
       <animate attributeName="y"
                attributeType="XML"
                from="10" to="100"
                begin="0s" dur="10s"
                fill="freeze"
                repeatCount="indefinite"
               />
    </rect>

This example has two animations, each animating the `x` and `y` attributes
of the rectangle. Here is the resulting animation:

<svg width="500" height="100">
    <rect x="346.804" y="87.724" width="40" height="20" style="stroke: #000000; fill: none;">
        <animate attributeName="x" attributeType="XML" from="10" to="400" begin="0s" dur="10s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" from="10" to="100" begin="0s" dur="10s" fill="freeze" repeatCount="indefinite"></animate>
    </rect>
</svg>

When combining `<animateTransform>` elements, the default behaviour is for
the second animation to cancel out the first. However, you can combine the transformation animations
by adding the attribute `additive` with a value of `sum` to both
`<animateTransform>` elements. Here is an example:

    <rect x="10" y="10" width="40" height="20"
          style="stroke: #000000; fill: none;">
        <animateTransform attributeName="transform" attributeType="XML"
                          type="scale"
                          from="1" to="3"
                          begin="0s" dur="10s"
                          repeatCount="indefinite"
                          **additive="sum"**
                />
        <animateTransform attributeName="transform" attributeType="XML"
                          type="rotate"
                          from="0 30 20" to="360 30 20"
                          begin="0s" dur="10s"
                          fill="freeze"
                          repeatCount="indefinite"
                          **additive="sum"**
                />

Here is the resulting animation which both scales and rotates a rectangle:

<svg width="500" height="100">
    <rect x="10" y="10" width="40" height="20" style="stroke: #000000; fill: none;" transform="scale(2.7272 2.7272) rotate(310.896 30 20)">
        <animateTransform attributeName="transform" attributeType="XML" type="scale" from="1" to="3" begin="0s" dur="10s" repeatCount="indefinite" additive="sum"></animateTransform>
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 30 20" to="360 30 20" begin="0s" dur="10s" fill="freeze" repeatCount="indefinite" additive="sum"></animateTransform>
    </rect>
</svg>  

## Tutorial

- [Animating Inline SVG Icons - Modern Web](http://modernweb.com/2014/06/03/animating-inline-svg-icons/)
- [超级强大的SVG SMIL animation动画详解 « 张鑫旭-鑫空间-鑫生活](http://www.zhangxinxu.com/wordpress/2014/08/so-powerful-svg-smil-animation/)

<script async src="//codepen.io/assets/embed/ei.js"></script>