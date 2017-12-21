layout: post
title: Android Design Library
tags: [android, md, design, ui]
category: Android
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/32i7ot0y78U" frameborder="0" allowfullscreen style="float: right; margin-left: 20px"></iframe>

Android 5.0 是有史以来最重要的 Android 版本之一，这其中有很大部分要归功于 Material design 的引入，这种新的设计语言让整个Android的用户体验焕然一新。

我们的详细专题是帮助你开始采用 Material Design。但是我们也知道，这种设计对于开发者，尤其是那些在意向后兼容的开发者来说是一种挑战。在Android Design Support Library的帮助下，我们为所有的开发者，所有 2.1 以上的设备，带来了一些重要的 Material design 控件。

你可以在这里面找到 Navigation Drawer View，输入控件的悬浮标签，Floating Action Button，Snackbar，Tab 以及将这些控件结合在一起的手势滚动框架。

<div style="clear: both;"></div>

## Usage

Adding the following Gradle dependency to your application's module:

```
compile 'com.android.support:design:27.0.0'
```

The Design Support library provides APIs to support additional important material design components and patterns to your applications beyond those covered by the Android framework, to all devices running Android 2.1 or later. 

All usage of the componets: [Material Components for Android](https://material.io/components/android/)

## Navigation View

<img src="https://developer.android.com/training/material/images/navigation-view.png" style="float: right; margin-left: 20px; width: 300px">

- [创建抽屉式导航栏](https://developer.android.com/training/implementing-navigation/nav-drawer.html)
- [Using the Design Support Library](https://developer.android.com/training/material/design-library.html)

```xml
<android.support.v4.widget.DrawerLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/my_drawer_layout"
    android:layout_height="match_parent"
    android:layout_width="match_parent"
    android:fitsSystemWindows="true">

    <include
        layout="@layout/my_main_content.xml"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

    <android.support.design.widget.NavigationView
        android:id="@+id/my_navigation_view"
        android:layout_height="match_parent"
        android:layout_width="wrap_content"
        android:layout_gravity="start"
        android:fitsSystemWindows="true"
        app:headerLayout="@layout/my_drawer_header"
        app:menu="@menu/my_drawer_view"/>

</android.support.v4.widget.DrawerLayout>
```

See also [DrawerLayout 和 NavigationView 使用详解 - 简书](http://www.jianshu.com/p/d2b1689a23bf)

<div style="clear: both;"></div>

## Floating Action Button

<img src="https://developer.android.com/training/material/images/fab.png" style="float: right; width: 300px;">

See [Using the Design Support Library](https://developer.android.com/training/material/design-library.html#CreateNavDraw)

A floating action button (FAB) is a circular button that is used to trigger a primary action in your application's UI. You can use the  Design Support library to add this important Material Design component to your application. You can customize a variety of aspects of the button, including its size, placement, and appearance.

The following basic code example demonstrates how to add the `FloatingActionButton` to a layout:

```xml
<android.support.design.widget.FloatingActionButton  
        android:id="@+id/fab"  
        android:layout_width="wrap_content"  
        android:layout_height="wrap_content"  
        android:layout_gravity="end|bottom"  
        android:src="@drawable/ic_my_icon"  
        android:layout_margin="16dp" />
```

You can then apply an [`View.OnClickListener`](https://developer.android.com/reference/android/view/View.OnClickListener.html) to the button in the corresponding activity for your layout. Note that as `FloatingActionButton` extends [`ImageButton`](https://developer.android.com/reference/android/widget/ImageButton.html), and in turn [`ImageView`](https://developer.android.com/reference/android/widget/ImageView.html), you can set the icon which is displayed either via `android:src` as illustrated in the example above, or using the [`setImageDrawable()`](https://developer.android.com/reference/android/widget/ImageView.html#setImageDrawable\(android.graphics.drawable.Drawable\)) method.

By default the FAB is colored using the `colorAccent` attribute in your theme as described in the earlier lesson in this class, [Using the Material Theme](https://developer.android.com/training/material/theme.html).

**Note**: As highlighted in the earlier lesson, the material theme is only available in Android 5.0 (API level 21) and above. The [v7 Support Libraries](https://developer.android.com/tools/support-library/features.html#v7) provide themes with material design styles for some widgets and support for customizing the color palette. For more information, see [Maintaining Compatibility](https://developer.android.com/training/material/compatibility.html).

You can configure a number of properties for the FAB using either the attributes defined in the v7 appcompat library or corresponding methods, including:

* The elevation of the FAB, using the `app:elevation` attribute or `setCompatElevation()` method
* The size of the FAB, using the `app:fabSize` attribute or `setSize()` method
* The size of the FAB, using the `app:rippleColor` attribute or `setRippleColor()` method

For information about maintaining material design compatibility on versions prior to Android 5.0 (API level 21) using the v7 Support Libraries, see [Maintaining Compatibility](https://developer.android.com/training/material/compatibility.html#SupportLib).

It is common to combine a variety of components from the Design Support library in a single layout. For example, you might want to display brief pop-up messages to the user using a `Snackbar`. The message automatically disappears after a short period. You can use the `CoordinatorLayout` class to move other UI elements, such as the FAB, when the `Snackbar` appears. For more information about both the `Snackbar` and `CoordinatorLayout` classes, see [Building and Displaying a Pop-Up Message](https://developer.android.com/training/snackbar/showing.html).

For more information on the capabilities of the FAB, see the API reference for
the `FloatingActionButton`.

## Floating labels for editing text

<img src="http://4.bp.blogspot.com/-BUKc5AwzS4A/VWihVlHr9cI/AAAAAAAABvI/rslBAoaHwzA/s1600/textinputlayout.png" style="height: 60px; float: left; margin-right: 20px">

即便是十分简单的 EditText，在 Material Design 中也有提升的空间。在 EditText 中，当你填入第一个字符后，hint 就消失了。现在将它换成 [TextInputLayout](http://developer.android.com/reference/android/support/design/widget/TextInputLayout.html?utm_campaign=io15&utm_source=dac&utm_medium=blog)，提示信息会变成一个显示在 EditText 之上的 floating label，这样用户就始终知道他们现在输入的是什么。

<div style="clear: both;"></div>

除此以外，还可以通过 `setError()` 设置当用户输入不合法时的 Error 提示；

```xml
<android.support.design.widget.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

  <android.support.design.widget.TextInputEditText
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:hint="@string/hint_text"/>

</android.support.design.widget.TextInputLayout>
```

Note: You can also use an `EditText` for your input text component. However, using `TextInputEditText` allows `TextInputLayout` greater control over the visual aspects of the input text - it allows `TextInputLayout` to display hint in the text field when in “extract mode” (such as landscape mode).

## Snackbar

<video width="500" controls="" style="float: right; margin-left: 20px">
  <source src="http://material-design.storage.googleapis.com/publish/material_v_3/material_ext_publish/0B6Okdz75tqQsLVVnZlF4UEtKRU0/components_snackbar_specs_fabtablet_002.webm" type="video/mp4">
</video>

如果你需要一个轻量级、可以快速作出反馈的控件，可以试试 [SnackBar](http://www.google.com/design/spec/components/snackbars-toasts.html?utm_campaign=io15&utm_source=dac&utm_medium=blog)。[Snackbar](http://www.google.com/design/spec/components/snackbars-toasts.html?utm_campaign=io15&utm_source=dac&utm_medium=blog)显示在屏幕的底部,包含了文字信息与一个可选的操作按钮。在指定时间结束之后自动消失。另外，用户还可以滑动删除它们。

Snackbar，可以通过滑动或者点击进行交互，可以看作是比Toast更强大的快速反馈机制，你会发现他们的API非常相似。

你应该注意到了 `make()` 方法中把一个View作为第一个参数，Snackbar试图找到一个合适的父亲以确保自己是被放置于底部。

<div style="clear: both;"></div>

```java
Snackbar
  .make(parentLayout, R.string.snackbar_text, Snackbar.LENGTH_LONG)
  .setAction(R.string.snackbar_action, myOnClickListener)
  .show(); // Don’t forget to show!
```

## Tabs

通过选项卡的方式切换[View](http://www.google.com/design/spec/components/tabs.html)并不是Material design中才有的新概念，它们和[顶层导航模式](http://www.google.com/design/spec/patterns/app-structure.html?utm_campaign=io15&utm_source=dac&utm_medium=blog#app-structure-top-level-navigation-strategies)或者组织app中不同分组内容（比如，不同风格的音乐）是同一个概念。

![](http://1.bp.blogspot.com/-liraQhLEn60/VWihbiaXaJI/AAAAAAAABvQ/nKi1_xcx6yk/s320/tabs.png)

Design library的[TabLayout](http://developer.android.com/reference/android/support/design/widget/TabLayout.html?utm_campaign=io15&utm_source=dac&utm_medium=blog) 既实现了固定的选项卡（View的宽度平均分配），也实现了可滚动的选项卡（View宽度不固定同时可以横向滚动）,也可以通过编写代码添加Tab。

```java
TabLayout tabLayout = ...;
tabLayout.addTab(tabLayout.newTab().setText("Tab 1"));
```

如果，你使用[ViewPager](http://developer.android.com/reference/android/support/v4/view/ViewPager.html?utm_campaign=io15&utm_source=dac&utm_medium=blog)在tab之间横向切换，你可以直接从[PagerAdapter](http://developer.android.com/reference/android/support/v4/view/PagerAdapter.html?utm_campaign=io15&utm_source=dac&utm_medium=blog)的[getPageTitle()](http://developer.android.com/reference/android/support/v4/view/PagerAdapter.html?utm_campaign=io15&utm_source=dac&utm_medium=blog#getPageTitle(int))中创建选项卡，然后使用setupWithViewPager()将两者联系在一起。它可以使tab的选中事件能更新ViewPager,同时ViewPager的页面改变能更新tab的选中状态。

## CoordinatorLayout, motion, and scrolling

独特的视觉效果只是 Material design 小小的一部分：运动也是设计好一款Material designed应用的重要组成部分。而在 Material design 中，包括 [触摸 Ripple](http://www.google.com/design/spec/animation/responsive-interaction.html?utm_campaign=io15&utm_source=dac&utm_medium=blog#responsive-interaction-surface-reaction)和[有意义的转场](http://www.google.com/design/spec/animation/meaningful-transitions.html?utm_campaign=io15&utm_source=dac&utm_medium=blog)，Design library 引入 [CoordinatorLayout](http://developer.android.com/reference/android/support/design/widget/CoordinatorLayout.html?utm_campaign=io15&utm_source=dac&utm_medium=blog0)，一个从另一层面去控制子view之间触摸事件的布局，Design library 中的很多控件都利用了它。

### CoordinatorLayout and floating action buttons

<video width="300" controls="" style="float: left; margin-right: 20px">
  <source src="http://material-design.storage.googleapis.com/publish/material_v_3/material_ext_publish/0B6Okdz75tqQsLWFucDNlYWEyeW8/components_snackbar_usage_fabdo_002.webm" type="video/mp4">
</video>

一个很好的例子就是当你将 FloatingActionButton 作为一个子 View 添加进CoordinatorLayout 并且将 CoordinatorLayout 传递给 Snackbar.make()，在3.0及其以上的设备上，Snackbar不会显示在悬浮按钮的上面，而是FloatingActionButton利用CoordinatorLayout提供的回调方法，在Snackbar以动画效果进入的时候自动向上移动让出位置，并且在Snackbar动画地消失的时候回到原来的位置，不需要额外的代码。

CoordinatorLayout 还提供了 layout_anchor和 layout_anchorGravity属性一起配合使用，可以用于放置floating view，比如FloatingActionButton与其他View的相对位置

<div style="clear: both;"></div>

## CoordinatorLayout and the app bar

另一个比较重要的场合是CoordinatorLayout结合 app bar (或者action bar)和 [滚动处理](http://www.google.com/design/spec/patterns/scrolling-techniques.html?utm_campaign=io15&utm_source=dac&utm_medium=blog). 你可能在你的布局里已经使用了[Toolbar](https://developer.android.com/reference/android/support/v7/widget/Toolbar.html?utm_campaign=io15&utm_source=dac&utm_medium=blog), 能让你自定义外观，将应用中最显眼的部分和其他部分整合到一起. Design library采用了进一步的解决方案:使用[AppBarLayout](http://developer.android.com/reference/android/support/design/widget/AppBarLayout.html?utm_campaign=io15&utm_source=dac&utm_medium=blog)可以让Toolbar和其他View（例如展示Tab的TabLayout）对滚动事件作出反应，前提是他们在一个标有ScrollingViewBehavior的View中.因此，你可以创建如下的布局：

```xml
 <android.support.design.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
     
     <! -- Your Scrollable View -->
    <android.support.v7.widget.RecyclerView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior" />

    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
    
        <android.support.v7.widget.Toolbar
            ...
            app:layout_scrollFlags="scroll|enterAlways">

        <android.support.design.widget.TabLayout
            ...
            app:layout_scrollFlags="scroll|enterAlways"/>
     </android.support.design.widget.AppBarLayout>
</android.support.design.widget.CoordinatorLayout>
```


现在，随着用户滚动RecyclerView，AppBarLayout通过子视图上的scroll flag，处理事件作出反应，控制他们如何进入，如何退出。Flag包括：

- scroll: 所有想滚动出屏幕的view都需要设置这个flag- 没有设置这个flag的view将被固定在屏幕顶部。
- enterAlways: 这个flag让任意向下的滚动都会导致该view变为可见，启用"快速返回"模式。
- enterAlwaysCollapsed: 当你的视图已经设置minHeight属性又使用此标志时，你的视图只会在最小高度处进入，只有当滚动视图到达顶部时才扩大到完整高度。
- exitUntilCollapsed: 在滚动过程中，只有当视图折叠到最小高度的时候，它才退出屏幕。

注意：那些使用Scroll flag的视图必须在其他视图之前声明。这样才能确保所有的视图从顶部撤离，剩下的元素固定在前面（译者注：剩下的元素压在其他元素的上面）。

## 折叠 Toolbars

<video width="320" controls="" style="float: left;margin-right: 20px">
  <source src="http://material-design.storage.googleapis.com/publish/material_v_3/material_ext_publish/0B0NGgBg38lWWcFhaV1hiSlB4aFU/patterns-scrollingtech-scrolling-070801_Flexible_Space_xhdpi_003.webm" type="video/mp4">
</video>

直接向AppBarLayout添加ToolBar，你需要添加enteralwayscollapsed和exituntilcollapsed两个滚动Flag，但是不能在细节上不同的元素对此的反应。为此，您可以使用 [CollapsingToolbarLayout](http://developer.android.com/reference/android/support/design/widget/CollapsingToolbarLayout.html?utm_campaign=io15&utm_source=dac&utm_medium=blog):

```
<android.support.design.widget.AppBarLayout
        android:layout_height="192dp"
        android:layout_width="match_parent">
    <android.support.design.widget.CollapsingToolbarLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layout_scrollFlags="scroll|exitUntilCollapsed">
        <android.support.v7.widget.Toolbar
                android:layout_height="?attr/actionBarSize"
                android:layout_width="match_parent"
                app:layout_collapseMode="pin"/>
        </android.support.design.widget.CollapsingToolbarLayout>
</android.support.design.widget.AppBarLayout>
```


这个设置使用collapsingtoolbarlayout的layout_collapsemode ="pin" 确保在View折叠时，Toolbar本身仍然在屏幕顶部。更好的是，当你同时使用collapsingtoolbarlayout和Toolbar，当布局完全可见时，标题看上去明显变大了；当布局折叠完成后，它恢复到其默认大小。请注意，在这些情况下，你应该调用CollapsingToolbarLayout#settitle() ，而不是调用Toolbar。
 
<div style="clear:both; margin-top: 20px"></div>

<video width="320" controls="" style="float: right; margin-left: 30px">
  <source src="http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B6Okdz75tqQscXNQY3dNdVlYeTQ/patterns-scrolling-techniques_flex_space_image_xhdpi_003.webm&#10;" type="video/mp4">
</video>

如果你希望添加压住特定的视图效果，您可以使用app：layout_collapsemode ="parallax"（和app：layout_collapseparallaxmultiplier =“0.7”（可选,用于设置视差乘数）实现视差滚动（也就是说ImageView，作为Toolbar的兄弟节点，在collapsingtoolbarlayout中）。在这种情况下，建议在CollapsingToolbarLayout中设置
app:contentScrim="?attr/colorPrimary"这一属性，这样，当视图折叠的时候，就会有蒙上纱布的渐变效果。

<div style="clear:both; margin-top: 20px"></div>

## CoordinatorLayout 与自定义控件

还有一件需要注意的事情，CoordinatorLayout跟FloatingActionButton或AppBarLayout需要一定的配置-它在[Coordinator.Behavior](http://developer.android.com/reference/android/support/design/widget/CoordinatorLayout.Behavior.html?utm_campaign=io15&utm_source=dac&utm_medium=blog)提供了一些API,子视图既可以更好地控制触摸事件也可以通过[onDependentViewChanged()](http://developer.android.com/reference/android/support/design/widget/CoordinatorLayout.Behavior.html?utm_campaign=io15&utm_source=dac&utm_medium=blog#onDependentViewChanged(android.support.design.widget.CoordinatorLayout,%20V,%20android.view.View))给别人提供一个回调方法。

Views可以用CoordinatorLayout.DefaultBehavior(YourView.Behavior.class)注解（annotation）声明默认的Behavior,或者在你的布局文件中声明app:layout_behavior="com.example.app.YourView$Behavior" 属性. 这样做，就可以将任何一个View和CoordinatorLayout整合在一起.

## Reference

- [Android Developers Blog: Android Design Support Library](https://android-developers.googleblog.com/2015/05/android-design-support-library.html)