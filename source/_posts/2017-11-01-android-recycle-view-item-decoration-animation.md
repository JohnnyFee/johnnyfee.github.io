---
layout: "post"
title: "Android RecyclerView – ItemDecoration and ItemAnimator"
categories: Android
tags: [android, ui]
---

From [Android RecyclerView – ItemDecoration and ItemAnimator – TheRubberDuckDev](https://therubberduckdev.wordpress.com/2017/10/12/android-recyclerview-itemdecoration-and-itemanimator/)

In the [previous post](https://therubberduckdev.wordpress.com/2017/10/09/android-recyclerview-the-basics/) of the series I covered the basics of how RecyclerView works and how to create an Adapter. In this post we will look at how to use ItemDecoration to decorate the child views and ItemAnimator to animate them.

## ItemDecorator

This class is used to decorate child views in a RecyclerView. Decorations can be anything from setting dividers between list items or offsets between them, or even setting frames for grids. You can also decorate specific child items based on their view type.

This class has three methods:

* onDraw
* onDrawOver
* getItemOffsets

### onDraw

This is where you can draw any decorations for the child views. You can draw lines, rects or bitmaps. These decorations are drawn before the child views themselves are drawn. So these decorations appear behind the child views.

This method takes three parameters: a `Canvas`, the `RecyclerView` itself and `State`. The decorations are drawn on the canvas. The RecyclerView instance can be used to get the child views and total count. The State instance is a class that stores information like scroll positions in RecyclerView and other data.

### onDrawOver

This method is also used to draw decorations for child views. The simple difference is decorations are drawn only after child views are drawn. So they appear over the child views. It takes same parameters as onDraw.

### getItemOffsets

If you want to set offset for child views, you can use this method. It helps to add inset for child view similar to setting margin or padding.

It provides four parameters: a Rect, the child view, RecyclerView and State.

The Rect can be used to set necessary offset. RecyclerView gets the offset from this method and decorates child views accordingly.

Here is an example code which draws divider between each views in RecyclerView

```
@Override
public void onDrawOver(Canvas c, RecyclerView parent, RecyclerView.State state) {
    int count = parent.getChildCount();
    int width = parent.getWidth();
    for (int i = 0; i &lt; count; i++) {
        View child = parent.getChildAt(i);
        int bottom = child.getBottom();
        c.drawRect(0, bottom, width, bottom + DIVIDER_HEIGHT, paint);
    }
}
```

In the code, based on the child count, the line is drawn at the bottom of each child view. The divider has the width equal to screen width and height of 1px. This is how it looks like:

[![](https://therubberduckdev.files.wordpress.com/2017/10/adcd5-recyclerview2bwith2bdividers.jpg?w=360&h=640 "RecyclerView with ItemDecoration")](https://therubberduckdev.files.wordpress.com/2017/10/adcd5-recyclerview2bwith2bdividers.jpg)

Next we will look at some built-in animations available in RecyclerView.

## ItemAnimator

This class provides mechanism for animating child views. It can be used to animate adding, removing, modifying and moving a child view. RecyclerView provides basic fade-in, fade-out, and translate animations. If you want custom animations you can subclass ItemAnimator.

RecyclerView comes with these basic animations out-of-the-box using the `DefaultItemAnimator` class. So no need to do any extra configuration to add it.

Let’s look at the basic animations and how to trigger them.

### 1. Addition

You can initiate an addition animation by adding new item to the data supplied to the adapter and notifying it for insertion. The default addition animation uses fade-in to add a new child view. This addition animation is based on predictive animation where adding a new item at a position causes other items to move to make way for it.

Here is the code that initiates addition animation by adding a new `User` to an `ArrayList`:

```java
User newUser = new UsersData().getNewUser();
adapter.addNewUser(position, newUser);
adapter.notifyItemInserted(position);
```

[![Android RecyclerView - ItemDecoration and ItemAnimator](https://therubberduckdev.files.wordpress.com/2017/10/recyclerview-default-add-animation.gif?w=1100)](https://therubberduckdev.files.wordpress.com/2017/10/d3698-recyclerview-default-add-animation.gif)

### 2. Removal

To remove item, remove it from the data list and call `notifyItemRemoved()` with the position of the item that is to be removed. The default animation fades-out the view to be removed. It also causes child views around it to move and fill the empty area. Checkout the code below.

```
adapter.removeUser(position);
adapter.notifyItemRemoved(position);
```

In the code, a User is removed from the ArrayList at the given position and the adapter is notified about it.

![Android RecyclerView - ItemDecoration and ItemAnimator](https://therubberduckdev.files.wordpress.com/2017/10/recyclerview-default-remove-animation.gif?w=1100)

### 3. Change

When a child view’s data changes, it gets reflected in the view. The default animation is cross-fade. The view fades-out with old values and then fades-in with the new values. To display item change call adapter’s `notifyItemChanged()` method. Below is the code.

```java
adapter.changeUser(position);
adapter.notifyItemChanged(position);
```

In the `changeUser` method I am changing the username and user image url at the particular position in the ArrayList.

![Android RecyclerView - ItemDecoration and ItemAnimator](https://therubberduckdev.files.wordpress.com/2017/10/recyclerview-default-change-animation.gif?w=1100)

### 4. Move

To move an item to another position, first change the position of the item in the data set. For example moving a `User` item from position 3 to 6. Then to reflect it in UI, use the adapter’s `notifyItemMoved()` method passing in the initial and final positions. The move animation is a translate animation.

Note that when querying an item’s position while it is being animated, the value returned may be -1. This is because until the animation’s final layout pass completes, the position returned will be -1. So check the following condition when getting a view’s position.

```java
if (position != RecyclerView.NO_POSITION) {
    //...
}
```

Checkout the DefaultItemAnimator class for more info. If you want to use custom animations subclass either DefaultItemAnimator or ItemAnimator class. Or else, use this awesome library https://github.com/wasabeef/recyclerview-animatorsCheckout the source code [here](https://github.com/sjthn/RecyclerViewDemo/tree/decorator-and-animator).

If you have any feedback use the comments section below. In the next post we’ll see some advanced RecyclerView use-cases.

## Resources

- [RecyclerView Animations – Changing Items – Styling Android](https://blog.stylingandroid.com/recyclerview-animations-changing-items)