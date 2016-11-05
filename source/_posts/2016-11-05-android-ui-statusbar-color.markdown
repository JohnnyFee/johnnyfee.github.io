---
layout: post
title: Android Status Color
date: '2016-11-05 21:56'
categories:
  - Android
---

From: [Android 状态栏着色实践 - 简书](http://www.jianshu.com/p/bae25b5eb867)

状态栏着色，也就是我们经常听到的沉浸式状态栏，关于沉浸式的称呼网上也有很多吐槽的，这里就不做过多讨论了，以下我们统称**状态栏着色**，这样我觉得更加容易理解。

从Android4.4开始，才可以实现状态栏着色，并且从5.0开始系统更加完善了这一功能，可直接在主题中设置`<item name="colorPrimaryDark">@color/colorPrimaryDark</item>`或者`getWindow().setStatusBarColor(color)`来实现，但毕竟4.4+的机器还有很大的占比，所以就有必要寻求其它的解决方案。

## 第一种方案：

### 1、首先将手机手机状态栏透明化：

```objectivec
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {//5.0及以上
            View decorView = getWindow().getDecorView();
            int option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
            decorView.setSystemUiVisibility(option);
            getWindow().setStatusBarColor(Color.TRANSPARENT);
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {//4.4到5.0
            WindowManager.LayoutParams localLayoutParams = getWindow().getAttributes();
            localLayoutParams.flags = (WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS | localLayoutParams.flags);
        }
```

在相应的Activity或基类执行这段代码就ok了。
可见在4.4到5.0的系统、5.0及以上系统的处理方式有所不同，除了这种代码修改额方式外，还可以通过主题来修改，需要在values、values-v19、values-v21目录下分别创建相应的主题：

```xml
//values
<style name="TranslucentTheme" parent="AppTheme">
</style>

//values-v19
<style name="TranslucentTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="android:windowTranslucentStatus">true</item>
        <item name="android:windowTranslucentNavigation">false</item>
</style>

//values-v21
<style name="TranslucentTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="android:windowTranslucentStatus">true</item>
        <item name="android:windowTranslucentNavigation">false</item>
        <item name="android:statusBarColor">@android:color/transparent</item>
</style>
```

给相应Activity或Application设置该主题就ok了。
两种方式根据需求选择就好了，到这里我们就完成了第一步，将状态栏透明化了。

## 2、给状态栏着色

完成了第一步，我们开始给状态栏加上想要的色彩吧！
将状态栏透明化后，直接运行项目会发现界面布局直接延伸到状态栏，针对这种情况首先可以在布局文件使用`android:fitsSystemWindows="true"`属性让布局不延伸到状态栏，接下来添加一个和状态栏高、宽相同的指定颜色View来覆盖被透明化的状态栏，或者使布局的背景颜色为需要的状态栏颜色。这两种方式在后边会说到，这里我们先看另外一种方式，也是个人比较喜欢的。我们分一下几种场景来讨论：

先做一些准备工作，在values、values-v19目录添加如下尺寸：

```xml
//values
<dimen name="padding_top">0dp</dimen>

//values-v19
<dimen name="padding_top">25dp</dimen>
```

关于25dp，在有些系统上可能有误差，这里不做讨论！

#### 2.1 页面顶部使用Toolbar（或自定义title）

一般情况状态栏的颜色和Toolbar的颜色相同，既然状态栏透明化后，布局页面延伸到了状态栏，何不给Toolbar加上一个状态栏高度的顶部padding呢：

```css
<android.support.v7.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/colorPrimary"
        android:paddingTop="@dimen/padding_top"
        android:theme="@style/AppTheme.AppBarOverlay" />
```

效果如下：

![](http://upload-images.jianshu.io/upload_images/1633070-cd3f9e8ce7f749a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

至于自定义title的情况经测试也ok的，图就不贴了，有兴趣可看代码。

#### 2.2 DrawerLayout + NavigationView + Toolbar
同样先给Toolbar设置顶部padding，在4.4系统上看下效果：

![](http://upload-images.jianshu.io/upload_images/1633070-63a5e0f6d8d8419b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

NavigationView竟然没延伸到状态栏，好吧，继续修改，当系统版本小于5.0时，进行如下设置：

```cs
private void navViewToTop() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
            mDrawerLayout.setFitsSystemWindows(true);
            mDrawerLayout.setClipToPadding(false);
        }
    }
```

再看效果：

![](http://upload-images.jianshu.io/upload_images/1633070-7752bfa6aeeae747.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2.3、页面顶部是一张图片
这种其实是最简单的，因为状态栏透明化后，布局已经延伸到状态，所以不需要其它额外操作：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    <ImageView
        android:layout_width="match_parent"
        android:layout_height="200dp"
        android:background="@mipmap/top_image" />
</LinearLayout>
```

效果如下：

![](http://upload-images.jianshu.io/upload_images/1633070-260bc7a350c5991a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2.4、页面底部切换Tab + fragment
某些情况下，当我们的页面采用底部切换Tab + 多个fragment时，可能每个fragment的顶部颜色不一样。如何实现状态栏颜色跟随fragment切换来变化呢？其实原理和2.1类似，这里我们每个fragment采用自定义的Title，先看FragmentOne的布局：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#ff9900"
        android:paddingTop="@dimen/padding_top">
        <TextView
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:gravity="center"
            android:text="fragment one" />
    </LinearLayout>
</LinearLayout>
```

我们设置Title的背景为橙黄色、同时设置paddingTop，FragmentTwo的布局类似，只是Title的背景为蓝色。然后将两个Fragment添加到Activity中，最后看下切换的效果：

![](http://upload-images.jianshu.io/upload_images/1633070-1df42ef120fec5bb.gif?imageMogr2/auto-orient/strip)

嗯，效果还是不错的，没有延迟的情况！可惜没早点发掘这种方式，以前的方案效果略不理想。

## 第二种方案

在方案一中，我们没有使用`android:fitsSystemWindows="true"`属性，而是将布局延伸到状态栏来处理，这次我们使用`android:fitsSystemWindows="true"`属性，不让布局延伸到状态栏，这时状态栏就是透明的，然后添加一个和状态栏高、宽相同的指定颜色View来覆盖被透明化的状态栏。我们一步步来实现。

**1、**第一步还是先将状态栏透明化，方法同上。

**2、**在布局文件中添加`android:fitsSystemWindows="true"`属性：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    android:orientation="vertical">

    <android.support.v7.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/colorPrimary"
        android:theme="@style/AppTheme.AppBarOverlay"
        app:title="第二种方案" />
</LinearLayout>
```

**3、**创建View并添加到状态栏：

```cs
private void addStatusBarView() {
        View view = new View(this);
        view.setBackgroundColor(getResources().getColor(R.color.colorPrimary));
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                getStatusBarHeight(this));
        ViewGroup decorView = (ViewGroup) findViewById(android.R.id.content);
        decorView.addView(view, params);
    }
```

原理很简单，但是要额外写这些代码。。。最后看下效果：

![](http://upload-images.jianshu.io/upload_images/1633070-bd2290d817258aa3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 第三种方案

和方案二类似，同样使用`android:fitsSystemWindows="true"`属性，再修改布局文件的根布局为需要的状态栏颜色，因根布局的颜色被修改，所以你需要在里边多嵌套一层布局，来指定界面的主背景色，比如白色等等，否则就和状态栏颜色一样了。说起来有点抽象，还是看具体的例子吧：
**1、**先将状态栏透明化，方法同上。

**2、**修改布局文件：

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#ff9900"
    android:fitsSystemWindows="true">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="#ffffff"
        android:orientation="vertical">

        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="#ff9900"
            android:theme="@style/AppTheme.AppBarOverlay"
            app:title="第三种方案" />
    </LinearLayout>
</RelativeLayout>
```

修改完了，看效果：

![](http://upload-images.jianshu.io/upload_images/1633070-dd5db3b1ee1c16b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果项目有几十个界面，这样的方式修改起来还是挺累的，你还要考虑各种嵌套问题。

后两种方案的例子相对简单，有兴趣的话你可以尝试更多的场景！

三种方式如何选择，相信到这里你应该有答案了吧，我个人更喜欢第一种！
如果你有更好的方案，欢迎指点哦！

[这里是测试代码](http://download.csdn.net/detail/shehuan320_/9612952)
