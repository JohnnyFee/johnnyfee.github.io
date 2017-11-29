layout: post
title: Android Coordinator Layout
tags: [android, md, design, ui]
category: Android
---

From [CoordinatorLayout 完全解析 - 简书](http://www.jianshu.com/p/4a77ae4cd82f)

## CoordinatorLayout 的作用

CoordinatorLayout 作为一个 **“super-powered FrameLayout”**，主要有以下两个作用：

1.  作为顶层布局；
2.  作为协调子 View 之间交互的容器。

使用 CoordinatorLayout 需要在 build.gradle 加入：

```
compile 'com.android.support:design:25.1.0'
```

## CoordinatorLayout 与 FloatingActionButton

<img src="http://upload-images.jianshu.io/upload_images/1787010-785705866002c28d.gif?imageMogr2/auto-orient/strip" style="float: right; margin-left: 20px;">

FloatingActionButton（以下简称 FAB） 单独使用，布局如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout     
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/contentView"
    android:orientation="vertical"     
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_alignParentRight="true"
        android:onClick="onClick"
        android:layout_marginRight="10dp"
        android:layout_marginBottom="10dp"/>
</RelativeLayout>
```

点击 FAB，弹出一个 Snackbar：

```java
public void onClick(View v) {
    switch (v.getId()) {
        case R.id.fab:
            Snackbar.make(findViewById(R.id.contentView), "Snackbar", Snackbar.LENGTH_SHORT).show();
            break;
    }
}
```

FAB 会被 Snackbar 遮挡，此时需要使用到 CoordinatorLayout。

<div style="clear: both;"></div>

与 CoordinatorLayout 一起使用，布局调整如下：

<img src="http://upload-images.jianshu.io/upload_images/1787010-e0da9757ed69e40b.gif?imageMogr2/auto-orient/strip" style="float: left; margin-right: 20px">


```
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/contentView"
    android:orientation="vertical" 
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <LinearLayout
        android:id="@+id/anchorView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"/>
    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_anchor="@id/anchorView"
        app:layout_anchorGravity="bottom|right"
        android:onClick="onClick"
        android:layout_marginRight="10dp"
        android:layout_marginBottom="10dp"/>
</android.support.design.widget.CoordinatorLayout>
```


<div style="clear: both;"></div>

CoordinatorLayout 提供了两个属性用来设置 FAB 的位置：

* layout_anchor：设置 FAB 的锚点，我们熟悉的 PopupWindow 也有类似概念。
* layout_anchorGravity：设置相对锚点的位置，如`bottom|right`表示 FAB 位于锚点的右下角。

再次运行程序，Snackbar 显示和隐藏的时候，CoordinatorLayout 会动态调整 FAB 的位置：

这里暂不介绍原理，涉及到另外一个概念：**Behavior**，后面会讲解。

CoordinatorLayout 最简单的使用例子就是和 FAB 一起使用了，我们接着往下看其它用法。

## CoordinatorLayout 与 AppBarLayout

AppBarLayout 是一个垂直布局的 LinearLayout，它主要是为了实现 **“Material Design”** 风格的标题栏的特性，比如：滚动。

上面这个效果在不少 APP 中都很常见，标题栏会随着视图的滚动：显示和隐藏。

不使用 CoordinatorLayout，实现这个效果的方案有两种：

1.  自己处理触摸事件的分发，来改变标题栏的位置。
2.  使用 support.v4 引入的 **NestedScrolling** 机制。

关于上面两种实现方式，可以参考我的另外一篇文章：[Android NestedScrolling机制](http://www.jianshu.com/p/aff5e82f0174)。

这里，**NestedScrolling** 两个重要的概念提及一下：

* NestedScrollingParent
* NestedScrollingChild

巧合的是 CoordinatorLayout 已经实现了 NestedScrollingParent 接口，所以我们配合一个实现了 NestedScrollingChild 接口的 View 就可以轻松的实现以上效果。

简单起见，我们使用 NestedScrollView 包裹 TextView 来实现上面的效果：

<img src="http://upload-images.jianshu.io/upload_images/1787010-514ebefa105c383f.gif?imageMogr2/auto-orient/strip" style="float:right; margin-left:20px">

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical"           
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="标题"
            android:textSize="20sp"
            android:gravity="center"
            android:paddingTop="10dp"
            android:paddingBottom="10dp"
            android:textColor="@android:color/white"
            android:background="@color/colorPrimary"
            app:layout_scrollFlags="scroll"/>
    </android.support.design.widget.AppBarLayout>

    <android.support.v4.widget.NestedScrollView
        android:id="@+id/scrollView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">
        <TextView
            android:id="@+id/tv"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:textSize="30sp"
            android:gravity="center_horizontal"/>
    </android.support.v4.widget.NestedScrollView>
</android.support.design.widget.CoordinatorLayout>
```

<div style="clear: both;"></div>

1. CoordinatorLayout 中可滚动的视图（如本例中的 NestedScrollView），需要设置以下属性：

        app:layout_behavior="@string/appbar_scrolling_view_behavior"

    这个固定字符串是系统提供的，表示使用`android.support.design.widget.AppBarLayout$ScrollingViewBehavior`来处理 NestedScrollView 与 AppBarLayout 的关系，这里暂不介绍，后面会讲解。

2. AppBarLayout 中的 View，如要想要滚动到屏幕外，必须设置以下属性：

        app:layout_scrollFlags="scroll"


`layout_scrollFlags` 有如下取值：

* scroll： 隐藏的时候，先整体向上滚动，直到 AppBarLayout 完全隐藏，再开始滚动 Scrolling View；显示的时候，直到 Scrolling View 顶部完全出现后，再开始滚动 AppBarLayout 到完全显示。  

    ![](http://upload-images.jianshu.io/upload_images/1787010-514ebefa105c383f.gif?imageMogr2/auto-orient/strip)  

    scroll 除了 scroll，还有下面几个取值，这些属性都必须与 scroll 一起使用 **“|”** 运算符。

* enterAlways：与 scroll 类似（`scroll|enterAlways`），只不过向下滚动先显示 AppBarLayout 到完全，再滚动 Scrolling View。

    ![](http://upload-images.jianshu.io/upload_images/1787010-3d0af6aa0093140b.gif?imageMogr2/auto-orient/strip)  

* enterAlwaysCollapsed：需要和 enterAlways 一起使用（`scroll|enterAlways|enterAlwaysCollapsed`），和 enterAlways 不一样的是，不会显示 AppBarLayout 到完全再滚动 Scrolling View，而是先滚动 AppBarLayout 到最小高度，再滚动 Scrolling View，最后再滚动 AppBarLayout 到完全显示。

    注意：需要定义 View 的最小高度（minHeight）才有效果：

        android:minHeight="10dp"
        app:layout_scrollFlags="scroll|enterAlways|enterAlwaysCollapsed"

    ![](http://upload-images.jianshu.io/upload_images/1787010-48e7ea9e488119e1.gif?imageMogr2/auto-orient/strip)  

* exitUntilCollapsed：顾名思义，定义了 AppBarLayout 消失的规则。发生向上滚动事件时，AppBarLayout 向上滚动退出直至最小高度（minHeight），然后 Scrolling View 开始滚动。也就是，AppBarLayout 不会完全退出屏幕。

        android:minHeight="10dp"
        app:layout_scrollFlags="scroll|exitUntilCollapsed"

    ![](http://upload-images.jianshu.io/upload_images/1787010-fefcea805ea09b5d.gif?imageMogr2/auto-orient/strip)  

    enterAlwaysCollapsed 与 exitUntilCollapsed 在实际的使用中，更多的是与 CollapsingToolbarLayout 一起使用，我们继续往下看。

## CoordinatorLayout 与 CollapsingToolbarLayout

CollapsingToolbarLayout 继承自 FrameLayout，它是用来实现 Toolbar 的折叠效果，一般它的直接子 View 是 Toolbar，当然也可以是其它类型的 View。

如果你不使用 Toolbar，有些效果没法直接实现，比如下图的**“My files”**文字在折叠和展开的时候，有一个过渡效果：

<img src="http://upload-images.jianshu.io/upload_images/1787010-467d6397c0450663.gif?imageMogr2/auto-orient/strip" style="width: 300px;">

也就是 CollapsingToolbarLayout 设置 title 的相关方法无效，比如：  
`setTitle、setCollapsedTitleTextColor、setExpandedTitleGravity`等，更多方法可以自行查阅 API 。

另外，exitUntilCollapsed 属性也会失效，即使你设置了 minHeight，所以官方也说明了CollapsingToolbarLayout 是为了配合 Toolbar 而设计：

> CollapsingToolbarLayout is a wrapper for {@link Toolbar} which implements a collapsing app bar.

所以，我们使用 Toolbar 来实现一些常见的效果吧~

### CollapsingToolbarLayout & enterAlwaysCollapsed

<img src="http://upload-images.jianshu.io/upload_images/1787010-c23c25414c09d0d7.gif?imageMogr2/auto-orient/strip" style="float: right;margin-left: 20px;">

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout     
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical" 
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="150dp">
        <android.support.design.widget.CollapsingToolbarLayout
            android:id="@+id/collapsingToolbarLayout"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:contentScrim="@color/colorPrimary"
            app:layout_scrollFlags="scroll|enterAlways|enterAlwaysCollapsed">
            <android.support.v7.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="50dp"
                app:layout_collapseMode="pin"
                android:minHeight="10dp"
                android:background="@color/colorPrimary"/>
        </android.support.design.widget.CollapsingToolbarLayout>
    </android.support.design.widget.AppBarLayout>

    <android.support.v4.widget.NestedScrollView
        android:id="@+id/scrollView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">
        <TextView
            android:id="@+id/tv"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:textSize="30sp"
            android:gravity="center_horizontal"/>
    </android.support.v4.widget.NestedScrollView>
</android.support.design.widget.CoordinatorLayout>
```

我们将 AppBarLayout 的高度设置大一点，`app:layout_collapseMode="pin"` 确保 CollapsingToolbarLayout 折叠完成之前，Toolbar 一直固定在顶部不动。

### CollapsingToolbarLayout & exitUntilCollapsed

<img src="http://upload-images.jianshu.io/upload_images/1787010-6f2546535c14d574.gif?imageMogr2/auto-orient/strip" style="float: right; margin-left: 20px">

修改下 CollapsingToolbarLayout 的 layout_scrollFlags：

```
app:layout_scrollFlags="scroll|exitUntilCollapsed"
```

<div style="clear: both;"></div>

### parallax（视差）

`layout_collapseMode`除了使用 pin 固定住 View，还可以使用 parallax，视差的意思就是：移动过程中两个 View 的位置产生了一定的视觉差异。

<img src="http://upload-images.jianshu.io/upload_images/1787010-254386294acb175c.gif?imageMogr2/auto-orient/strip" style="float: right; margin-left: 20px;">

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical" 
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="150dp">
        <android.support.design.widget.CollapsingToolbarLayout
            android:id="@+id/collapsingToolbarLayout"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:contentScrim="@color/colorPrimary"
            app:layout_scrollFlags="scroll|exitUntilCollapsed">
            <ImageView
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:src="@drawable/bg"
                android:scaleType="centerCrop"
                app:layout_collapseParallaxMultiplier="0.9"
                app:layout_collapseMode="parallax"/>
            <android.support.v7.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="50dp"
                app:layout_collapseMode="pin"/>
        </android.support.design.widget.CollapsingToolbarLayout>
    </android.support.design.widget.AppBarLayout>

    <android.support.v4.widget.NestedScrollView
        android:id="@+id/scrollView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">
        <TextView
            android:id="@+id/tv"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:textSize="30sp"
            android:gravity="center_horizontal"/>
    </android.support.v4.widget.NestedScrollView>
</android.support.design.widget.CoordinatorLayout>
```

<div style="clear: both;"></div>

你可以设置视差因子：

```
app:layout_collapseParallaxMultiplier="0.9"
```

下图是视差因子为0.1的效果：

<img src="http://upload-images.jianshu.io/upload_images/1787010-d5ea00f29d1e404e.gif?imageMogr2/auto-orient/strip" style="float: right;margin-left: 20px">

对比 parallax-0.9，可以看出来图片上移的位置是不同的。

这里还有几个属性需要介绍下：

* contentScrim：表示 CollapsingToolbarLayout 折叠之后的“前景色”，我们看到 Toolbar 的变色，其实是因为前景色遮挡了而已。
* statusBarScrim：表示状态栏的“前景色”，试验下来并无效果，知道的同学麻烦告诉下~

<div style="clear: both;"></div>

## 终极 Boss - Behavior

CoodinatorLayout 并不知道 FloatingActionButton 和 AppBarLayout 的工作原理，我们提到过 CoodinatorLayout 实现了 NestedScrollingParent，我们通过一个实现了 NestedScrollingChild 的 scrolling view，就可以轻松的实现：滑动事件的处理与 View 之间的交互。

这其中充当中间桥梁的就是 CoordinatorLayout.Behavior，比如 FloatingActionButton，查看源码发现它的类注解是这样的：

```
@CoordinatorLayout.DefaultBehavior(FloatingActionButton.Behavior.class)
public class FloatingActionButton extends VisibilityAwareImageButton {
    // ...
}
```

FloatingActionButton.Behavior 的主要作用就是防止被 Snackbar 盖住。

自定义 View 既可以通过注解指定 Behavior，也可以通过在布局 XML 申明：

```
app:layout_behavior="具体Behavior的类路径"
```

### 原理分析

以 **CoordinatorLayout 与 AppBarLayout** 中的效果来分析：  

<img src="http://upload-images.jianshu.io/upload_images/1787010-514ebefa105c383f.gif?imageMogr2/auto-orient/strip" style="float: right; margin-left: 20px">

1.  滑动 NestedScrollView 会触发 CoodinatorLayout 的 onNestedPreScroll 方法（不知道为什么的看这篇文章：[Android NestedScrolling机制](http://www.jianshu.com/p/aff5e82f0174)）；

2.  onNestedPreScroll 方法会查找所有定义了 Behavior 的 View，再通过 Behavior 的 onNestedPreScroll 方法去询问每个 View 需要消耗的距离（部分源码）；

        @Override
        public void onNestedPreScroll(View target, int dx, int dy, int[] consumed) {
            int xConsumed = 0;
            int yConsumed = 0;
            boolean accepted = false;

            final int childCount = getChildCount();
            for (int i = 0; i < childCount; i++) {
                final View view = getChildAt(i);

                final Behavior viewBehavior = lp.getBehavior();
                if (viewBehavior != null) {
                    mTempIntPair[0] = mTempIntPair[1] = 0;
                    viewBehavior.onNestedPreScroll(this, view, target, dx, dy, mTempIntPair);

                    xConsumed = dx > 0 ? Math.max(xConsumed, mTempIntPair[0])
                         : Math.min(xConsumed, mTempIntPair[0]);
                    yConsumed = dy > 0 ? Math.max(yConsumed, mTempIntPair[1])
                         : Math.min(yConsumed, mTempIntPair[1]);

                    accepted = true;
                }
            }

            consumed[0] = xConsumed;
            consumed[1] = yConsumed;
        }

3. NestedScrollView 的 Behavior：`AppBarLayout.ScrollingViewBehavor`，它的 onNestedPreScroll 没有做任何实现；

4. 那么剩下的就是 AppBarLayout 的 Behavior：`AppBarLayout.Behavior`

        @Override
        public void onNestedPreScroll(CoordinatorLayout coordinatorLayout, AppBarLayout child,
                 View target, int dx, int dy, int[] consumed) {
            if (dy != 0 && !mSkipNestedPreScroll) {
                int min, max;
                if (dy < 0) {
                    // We're scrolling down
                    min = -child.getTotalScrollRange();
                    max = min + child.getDownNestedPreScrollRange();
                } else {
                    // We're scrolling up
                    min = -child.getUpNestedPreScrollRange();
                    max = 0;
                }
                consumed[1] = scroll(coordinatorLayout, child, dy, min, max);
            }
        }

    很好理解，我们滑动 NestedScrollView 的时候，AppBarLayout 会向上滚动，所以就需要消耗部分滚动的距离。

这里，我们只是简单的分析了部分源码，有兴趣的可以自己去阅读。

### 自定义 Behavior

自定义 Behavior 需要继承自 CoodinatorLayout.Behavior，我们重点关注以下几组方法：

1. 事件拦截

    * onInterceptTouchEvent
    * onTouchEvent

    触摸事件总是先交给 CoodinatorLayout，它会询问所有子 View 的 Behavior 是否需要拦截事件。

    细心的话，你会注意到直接拖拽 AppBarLayout 也可以滚动，这是因为 AppBarLayout.Behavior 的父类 HeaderBehavior 实现了这两个方法。

2. 嵌套滚动

    * onNestedPreScroll
    * onNestedPreFling

    原理分析的时候已经介绍过，可以参考 AppBarLayout.Behavior 的实现。

3. child 和 dependency

    - layoutDependsOn：决定 child 依赖谁（dependency）。
    - onDependentViewChanged：dependency 的大小或位置发生了变化。
    - onDependentViewRemoved：dependency 从父布局中被移除了。

    描述了两个（或多个）View 之间的依赖关系，表现为一个或多个 child 依赖 dependency。当 dependency 的大小或位置发生了改变，child 可以做出一些你需要的响应（改变位置、大小等）。

这里，我们演示一个 child 在 Y 轴跟随 dependency 的效果：

<img src="http://upload-images.jianshu.io/upload_images/1787010-5b5ea20e77f0465a.gif?imageMogr2/auto-orient/strip" style="float: right; margin-left: 20px;">

1. 首先，定义 dependency，让它可以跟随手指移动（仅部分代码）：

        public class DependencyView extends Button {
            @Override
            public boolean onTouchEvent(MotionEvent event) {
                int x = (int) event.getRawX();
                int y = (int) event.getRawY();
                switch (event.getAction()) {
                    case MotionEvent.ACTION_MOVE: {
                        CoordinatorLayout.MarginLayoutParams layoutParams = (CoordinatorLayout.MarginLayoutParams) getLayoutParams();
                        int left = layoutParams.leftMargin + x - lastX;
                        int top = layoutParams.topMargin + y - lastY;

                        layoutParams.leftMargin = left;
                        layoutParams.topMargin = top;
                        setLayoutParams(layoutParams);
                        requestLayout();
                        break;
                    }
                }
                lastX = x;
                lastY = y;
                return true;
            }
        }

2. 自定义 Behavior，让 child 跟随 dependency：

        public class CusBehavior extends CoordinatorLayout.Behavior {
            private int width;

            public CusBehavior(Context context, AttributeSet attrs) {
                super(context, attrs);
                DisplayMetrics display = context.getResources().getDisplayMetrics();
                width = display.widthPixels;
            }

            @Override
           public boolean layoutDependsOn(CoordinatorLayout parent, View child, View dependency) {
                return dependency.getId() == R.id.dependency;
            }

            @Override
            public boolean onDependentViewChanged(CoordinatorLayout parent, View child, View dependency) {
                child.setY(dependency.getY() + child.getHeight());
                return true;
            }
        }

3. 使用 Behavior：

        <?xml version="1.0" encoding="utf-8"?>
        <android.support.design.widget.CoordinatorLayout     
            xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:tools="http://schemas.android.com/tools"
            xmlns:app="http://schemas.android.com/apk/res-auto"
            android:layout_width="match_parent"
            android:layout_height="match_parent">
            <Button
                android:id="@+id/child"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                app:layout_behavior="android.coordinatorlayoutdemo.CusBehavior"
                android:text="Child" />
            <android.coordinatorlayoutdemo.DependencyView
                android:id="@+id/dependency"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Dependency" />
        </android.support.design.widget.CoordinatorLayout>

是不是很简单？

其实 FloatingActionButton 示例中：layout_anchor 使用某个 View 作为锚点，就是用了这个原理，具体可以参考：FloatingActionButton.Behavior 。

## 写在最后

1.  本文的效果是在5.0+系统上运行的，所以低版本的系统状态栏的表现可能不一致。
2.  本文只是演示了 CoodinatorLayout 的多数基本用法，实际应用中的效果一般比这个复杂很多。

感谢大家耐心看到最后，本文的源码可以在这里找到：[CoordinatorLayoutDemo](https://github.com/hiphonezhu/Android-Demos/tree/master/CoordinatorLayoutDemo)。

