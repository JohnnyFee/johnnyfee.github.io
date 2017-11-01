---
layout: "post"
title: "Android RecyclerView – Drag and Drop and Swipe to Dismiss"
categories: Android
tags: [android, ui]
---

In the [last post](https://therubberduckdev.wordpress.com/2017/10/17/android-recyclerview-expandable-headers/) I explained how you can implement an expandable recyclerview. In this post we will see how to implement swipe-to-remove and drag-and-drop gestures.

RecyclerView provides a built-in mechanism to enable drag and drop and swipe to dismiss gestures. This is a great advantage for Recyclerview compared to ListView where we had to write all the boilerplate for animating items for dragging and swiping. So if you are still using ListView this is a great feature for you to switch to RecyclerView.

This can be accomplished using the [ItemTouchHelper](https://developer.android.com/reference/android/support/v7/widget/helper/ItemTouchHelper.html) class provided with RecyclerView. This class does all the heavy lifting needed for handling swiping and dragging and animating the view accordingly.

You can specify in which directions and in which ViewHolders the gestures should work. Also you need to be notified when a swipe or drag and drop gesture is completed. This can be addressed using the [ItemTouchHelper.Callback](https://developer.android.com/reference/android/support/v7/widget/helper/ItemTouchHelper.Callback.html) class.

To quickly setup these gestures, we can subclass the `Callback` class and override three methods: `getMovementFlags()`, `onMove()` and `onSwiped()`.

* In `getMovementFlags()` you have to return a `int` value. This value denotes a composite flag that defines the movement directions for each movement states namely IDLE, DRAG and SWIPE. This method takes two parameters: a RecyclerView instance and the ViewHolder of the view. You can return the flag using the method `makeFlag()` or the convenience method `makeMovementFlags()`. In the below code, drag supports both up and down directions, and swipe supports left and right directions.

<pre>
@Override
public int getMovementFlags(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder) {
    int dragFlags = ItemTouchHelper.UP | ItemTouchHelper.DOWN;
    int swipeFlags = ItemTouchHelper.LEFT | ItemTouchHelper.RIGHT;
    return makeMovementFlags(dragFlags, swipeFlags);
}
</pre>

* `onMove()` gets called when a view is dragged from its position to other positions. You have to return true if the item has been moved from its old position to a new position. Here you can notify the adapter about the position change. By default an item can be moved only after long pressing it.
* Similarly, `onSwipe()` gets called when a view is completely swiped out. Here you can notify the adapter about the removal.

To correctly handle drag-and-drop and swipe, we can create a interface.

<pre>
public interface ActionCompletionContract {
    void onViewMoved(int oldPosition, int newPosition);
    void onViewSwiped(int position);
}
</pre>

And let’s make our Adapter implement this. In the `onViewMoved()` callback, we will remove the data at the `oldPosition` and add it to the `newPosition`, and notify the adapter:

<pre>
@Override
public void onViewMoved(int oldPosition, int newPosition) {
    User targetUser = usersList.get(oldPosition);
    User user = new User(targetUser);
    usersList.remove(oldPosition);
    usersList.add(newPosition, user);
    notifyItemMoved(oldPosition, newPosition);
}
</pre>

For swipe to dismiss action, we call `onViewSwiped()` interface callback and remove the item:

<pre>
@Override
public void onViewSwiped(int position) {
    usersList.remove(position);
    notifyItemRemoved(position);
}
</pre>

Now to call these appropriate callbacks from the ItemTouchHelper.Callback class, we will pass the adapter to the class:

<pre>
SwipeAndDragHelper swipeAndDragHelper = new SwipeAndDragHelper(adapter);
ItemTouchHelper touchHelper = new ItemTouchHelper(swipeAndDragHelper);
</pre>

Here I have created a subclass of the ItemTouchHelper.Callback called `SwipeAndDragHelper`.

And finally to integrate this ItemTouchHelper with our RecyclerView, we call `attachToRecyclerView()` method:

<pre>
touchHelper.attachToRecyclerView(userRecyclerView);
</pre>

That’s it. We have implemented the drag-and-drop and swipe-to-dismiss gestures. This is how it looks:

![recyclerview-itemtouchhelper](https://therubberduckdev.files.wordpress.com/2017/10/recyclerview-itemtouchhelper1.gif?w=1100)

Now what if we want to move the items only by touching a handle something like below:

<figure data-shortcode="caption" id="attachment_331" style="width: 1520px" class="wp-caption alignnone">![components-listcontrols-reorder](https://therubberduckdev.files.wordpress.com/2017/10/components-listcontrols-reorder.png?w=1100)
<figcaption class="wp-caption-text">Source: [Material Design Guidelines](https://material.io/guidelines/components/lists-controls.html#lists-controls-types-of-list-controls)</figcaption></figure>

For that, the ItemTouchHelper provides `startDrag()` and `startSwipe()` methods to manually start drag and swipe actions respectively. Let’s implement this.

First to manually drag, we must disable the default dragging. Since default dragging is started when a view is long pressed, we must disable it. This can be done by returning false in `isLongPressEnabled()` of the Callback class.

Then pass the instance of ItemTouchHelper to the adapter. Then implement `onTouchListener` for the reorder handle ImageView. Inside `onTouch` call the `startDrag` method passing the ViewHolder as parameter like below:

In onBindViewHolder:

<pre>
((UserViewHolder) holder).reorderView.setOnTouchListener(new View.OnTouchListener() {
    @Override
    public boolean onTouch(View v, MotionEvent event) {
        if (event.getActionMasked() == MotionEvent.ACTION_DOWN) {
            touchHelper.startDrag(holder);
        }
        return false;
    }
});
</pre>

Result:

![recyclerview-item-touch-helper-reorder](https://therubberduckdev.files.wordpress.com/2017/10/recyclerview-manual-drag-drop.gif?w=1100)

Next we will add some fade effect to the swipe action. Right now when the view gets swiped there is no effect except the view gets transitioned in x direction.

The Callback class provides `onChildDraw()` method to draw anything over the area of the child view being swiped or dragged. It provides a canvas, viewholder, x and y displacement caused by the gesture, and action state as parameters among others. So we will check the action state and if it is equal to `ACTION_STATE_SWIPE` we will reduce the alpha of the view as it moves away from its original position.

<pre>
@Override
public void onChildDraw(Canvas c,
                        RecyclerView recyclerView,
                        RecyclerView.ViewHolder viewHolder,
                        float dX,
                        float dY,
                        int actionState,
                        boolean isCurrentlyActive) {
    if (actionState == ItemTouchHelper.ACTION_STATE_SWIPE) {
        float alpha = 1 - (Math.abs(dX) / recyclerView.getWidth());
        viewHolder.itemView.setAlpha(alpha);
    }
    super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive);
}
</pre>

Now you will get a nice fade as below when swiping:

![recyclerview-swipe-dismiss-item-fade-out](https://therubberduckdev.files.wordpress.com/2017/10/recyclerview-swipe-fade-out.gif?w=1100)

Checkout the full source code [here](https://github.com/sjthn/RecyclerViewDemo/tree/advanced-usecases).

If you have feedback, comment below.