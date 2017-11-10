layout: post
title: "AppCompatActivity"
description: ""
category: Android
tags: [android]
---

## Android Support Library

> The Android Support Library package is a set of code libraries that provide backward-compatible versions of Android framework APIs as well as features that are only available through the library APIs. 

See [支持库功能](https://developer.android.com/topic/libraries/support-library/features.html)

Android的SDK版本很多，新的SDK版本包含了很多新的特性，为此Google官方提供Android Support Library package来保证高版本SDK的向下兼容。通过使用此包，可以让拥有最新SDK特性的应用运行在API lever 4(即Android 1.6) 及更高版本的设备之上。

* v4 Support Library  
    此包用在API lever 4(即Android 1.6)及更高版本之上。它包含了较多的内容，使用非常广泛，例如：Fragment，NotificationCompat，LoadBroadcastManager，ViewPager，PageTabStrip，Loader，FileProvider 等。
* v7 Support Libraries  
    此包是针对API level 7(即Android 2.1)及以上版本而设计的，但是v7是要依赖v4这个包的，v7支持了Action Bar以及一些Theme的兼容。

    > **Note:** v7 appcompat library  
    > v7 appcompat library 是包含在 v7 Support Libraries里面的一个包，正是此包增加了[Action Bar](http://developer.android.com/guide/topics/ui/actionbar.html) 用户界面的设计模式，并加入了对[material design](http://developer.android.com/design/material/) 的支持，是我们使用最多的一个兼容包。
    
    [v7 支持库](https://developer.android.com/topic/libraries/support-library/features.html#v7)

* v13 Support Library  
    此包是针对API level 13(即Android 3.2)及更高版本设计的，一般我们都不常用，平板开发中能用到，这里就不过多介绍了。

* v17 Preference Support Library for TV  
    看名字就知道了，此包主要是为了TV设备而设计。


## Android Theme

* Hoho Theme

    在4.0之前Android可以说是没有设计可言的，在4.0之后推出了Android Design，从此Android在设计上有了很大的改善，而在程序实现上相应的就是Holo风格，所以你看到有类似 `Theme.Holo.Light`、 `Theme.Holo.Light.DarkActionBar` 就是4.0的设计风格，但是为了让4.0之前的版本也能有这种风格怎么办呢？这个时候就不得不引用v7包了，所以对应的就有 `Theme.AppCompat.Light`、`Theme.AppCompat.Light.DarkActionBar`，如果你的程序最小支持的版本是API14（即Android 4.0），那么可以不用考虑v7的兼容。

* Material Design Theme

    Android在5.0版本推出了Material Design的概念，这是Android设计上又一大突破。对应的程序实现上就有`Theme.Material.Light`、 `Theme.Material.Light.DarkActionBar`等，但是这种风格只能应用在在5.0版本的手机，如果在5.0之前应用Material Design该怎么办呢？同样的引用appcompat-v7包，这个时候的`Theme.AppCompat.Light`、`Theme.AppCompat.Light.DarkActionBar`就是相对应兼容的Material Design的Theme。

## AppCompatActivity

### 初探AppCompatActivity  

按照androidStudio默认顺序创建项目，默认Activity继承自AppCompatActivity.代码如下：

```scala
public class MainActivity extends AppCompatActivity { 
    @Override 
    protected void onCreate(Bundle savedInstanceState) { 
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main); 
    }
}
```

运行。下面我们来一步一步扩展其标题栏，让它的内容更加丰富多彩。

### AppCompatActivity 与 Toolbar 结合

其实我们并不是要使用AppCompatActivity自带的标题栏，那样扩展会很麻烦，在14年的Android5.0的时候就用Toolbar替代了ActionBar，而ActionBarActivity又被AppCompatActivity替代，那么使用方法就是引入Toolbar设置到Activity中。

首先我们必须在配置文件中，写入Toolbar，代码如下：

```xml
<android.support.v7.widget.Toolbar 
    android:id="@+id/activity_main_toolbar"     
    android:layout_height="wrap_content" 
    android:layout_width="match_parent" 
    android:minHeight="?attr/actionBarSize" 
    android:background="?attr/colorPrimary"> 
</android.support.v7.widget.Toolbar>
```

> 解释(1)android:minHeight = "?attr/actionBarSize":设置标题栏最小高度为ActionBar的高度。  
> 解释(2)android:background = "?attr/colorPrimary":该主题下的主色。也就是默认的灰色

我们知道在AndroidManifest.xml清单文件下application中设置了android:theme = "@style/AppTheme"而查看APPTheme看到如下样式

```xml
<resources> 
<!-- Base application theme. --> 
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar"> 
<!-- Customize your theme here. --> 
</style>
</resources>
```

从名字我们就可以看出来，默认的标题栏为黑色。我们使用了Toolbar就必须修改样式文件，将原来的标题栏去掉，修改后的样式文件如下：

```xml
<resources> 
<!-- Base application theme. --> 
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar"> 
<!-- Customize your theme here. --> 
</style>
</resources>
```

如下这个时候运行，那么你将看到界面也是没有标题栏的，因为你并没有设置到AppCompatActivity中去。

我们创建一个方法名为initActionBar(),首先当然是获取Toolbar控件，然后将Toolbar设置到Activity中去。代码如下：

```java
public void initActionBar() { 
    Toolbar toolbar = (Toolbar) findViewById(R.id.activity_main_toolbar); 
    setSupportActionBar(toolbar);
}
```

现在我们运行，我们将得到如下界面：

依然不是你期待的效果，下面我们将介绍AppCompatActivity的细节。

### 设置title

我们可以看到，标题栏始终显示我们的项目名，这样显然给用户看是不理想的。那么怎么设置标题栏的字符串。我们可以在setSupportActionBar(toolbar)之前加入如下代码：

```java
setTitle("liyuanjinglyi");
```

此setTitle("liyuanjinglyj")是AppCompatActivity的方法，并不是Toolbar的方法，那么我们运行一下程序得到如下界面：

那么我们将刚才的AppCompatActivity的setTitle换成Toolbar的setTitle看看效果会怎么样，其实结果如上图一样，没有任何变化。

可能你希望title显示在中间，很遗憾，toolbar与AppCompatActivity并没有提供相关的方法，不过可以在toolbar中加入一个TextView，配置其属性，让其显示在最中间。

### 设置回退按钮

假如我们这个界面并不是主界面，而是一个子界面，这个时候我有一个需求，需要回退到上一个界面，那么怎么设置左边的图标并实现其方法。其实很简单，在setSupportActionBar(toolbar);后面加入如下代码：

```java
toolbar.setNavigationIcon(R.drawable.back);
toolbar.setNavigationOnClickListener(new View.OnClickListener() { 

@Override 
public void onClick(View v) { 
finish(); 
}
});
```

为什么在setSupportActionBar(toolbar);后面假如而不在前面，你可以加入到前面试试，虽然可以显示回退的图片，但是点击并没有调用该按钮的点击事件，而在setSupportActionBar(toolbar);后面设置点击才有反应。一定要记住，不然回退是不会起作用的。

### 设置logo

设置logo在标题栏并不少见，比如网易APP首页，其实代码很简单，也仅仅需要一条代码即可，在setSupportActionBar(toolbar)前加入如下代码：

```java
toolbar.setLogo(R.id.app_logo);
```

### 设置副标题  
在setSupportActionBar(toolbar)前加入如下代码：

```java
toolbar.setSubtitile("liyuanjing");
```

运行界面后，如下：

### 设置菜单

我们知道onCreateOptionMenu是上下文菜单，同理可以直接在该方法中设置菜单，代码如下：

```java
@Override
public boolean onCreateOptionsMenu(Menu menu) { 
getMenuInflater().inflate(R.menu.menu_main, menu); 
return true;
}
```

此方法为Activity方法。因为你在上面已经将Toolbar设置到了Activity中，所以默认也会显示到标题栏中，如果你觉得这样不习惯，那么你可以添加一条语句，不过这条语句添加与否都没关系。

```java
toolbar.setOnCreateContextMenuListener(this);
```

### Toolbar的Style

标题下的Toolbar是蓝色，且有很好的Style，那么这是怎么设置呢？虽然我们这里重点是剖析Activity但是遇到有关Activity标题栏样式的还是要提到。

我们粗略的讲解上面的标题栏用到了哪些Style:

`<item name = "colorPrimary">#4876FF<item>`:如第一步直接在Toolbar控件下面设置的属性一样，就是Toolbar的颜色

`<item name="colorPrimaryDark">#3A5FCD</item>`：状态栏颜色也就是标题栏上面的那个颜色，而我用的是小米1S测试的，其固件并没有很好的实现其功能。

`<item name = "android:windowBackground">@android:color/white</item>`:窗口背景色，也就是Activity标题栏下面所有地方的颜色。

完整代码如下：

```xml
<!-- Base application theme. -->
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar"> 
<!-- toolbar（actionbar）颜色 --> 
<item name="colorPrimary">#4876FF</item> 
<!-- 状态栏颜色 --> 
<item name="colorPrimaryDark">#3A5FCD</item> 
<!-- 窗口的背景颜色 --> 
<item name="android:windowBackground">@android:color/white</item>     
</style>
```

### Toolbar菜单样式

我们来看看如果直接使用上面的点击后边的菜单会有什么效果：

需要完成的任务是将该菜单的样式和其他App一样，在标题栏下面弹出。

首先要说明一下，toolbar菜单默认样式的父类为Widget.AppCompat.Light.PopupMenu.Overflow，那么要更改toobar中菜单的弹出的样式，就必须继承这个父类的样式。

其代码如下：

```xml
<!-- Base application theme. -->
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar"> 
<!-- toolbar（actionbar）颜色 --> 
<item name="colorPrimary">#4876FF</item> 
<!-- 状态栏颜色 --> 
<item name="colorPrimaryDark">#3A5FCD</item> 
<!-- 窗口的背景颜色 --> 
<item name="android:windowBackground">@android:color/white</item>     
<item name="actionOverflowMenuStyle">@style/LYJMenuStyle</item>    
</style>

<style name="LYJMenuStyle" parent="@style/Widget.AppCompat.Light.PopupMenu.Overflow">     
<item name="overlapAnchor">false</item>
</style>
```

设置这一个属性那么其弹出的样式就与其他APP一样不会覆盖标题栏。

还有其他属性这里简要说明一下：

`<item name="android:popupBackground">?attr/colorPrimary</item>`：弹出菜单背景色为标题栏的背景色

`<item name="android:dropDownVerticalOffset">0dip</item>`：弹出菜单与标题栏的垂直间距

将这两条加入LYJMenuStyle中就可以了实现如下图所示的弹出菜单：

最后介绍一下菜单里面重要的几个属性：

`app:showAsAction` 有三个值：  
always：总是显示在界面上never：不显示在界面上，只让出现在右边的三个点中 ifRoom：如果有位置才显示，不然就出现在右边的三个点中

可以用 | 同时使用两个上面的值。

系统也为菜单提供了默认的分享菜单与查询菜单，代码如下：

```
app:actionViewClass="android.support.v7.widget.SearchView"  
app:actionProviderClass="android.support.v7.widget.ShareActionProvider"
```

从名字想必不需要过多解释，最后一个就是显示的[优先级](http://www.07net01.com/tags-%E4%BC%98%E5%85%88%E7%BA%A7-0.html)，也就是显示的顺序，谁在最前面，谁在后面：

`android:orderInCategory` 数值越小，显示靠前，且优先级最大。

Previously, to open a dialog may have used the following code:

[Android Tips:Hello AppCompatActivity,Goodbye ActionBarActivity](https://blog.xamarin.com/android-tips-hello-appcompatactivity-goodbye-actionbaractivity/)

```java
var builder = new AlertDialog.Builder (this);

builder.SetTitle ("Hello Dialog")  
.SetMessage ("Is this material design?")  
.SetPositiveButton ("Yes", delegate { Console.WriteLine("Yes"); })  
.SetNegativeButton ("No", delegate { Console.WriteLine("No"); }); 

builder.Create().Show ();
```

## FAQ

先来看这样一个错误：

`No resource found that matches the given name '@style/Theme.AppCompat.Light'`

对于这个错误，相信大部分Android开发者都遇到过，可能很多朋友通过百度或者Google已经解决了这个问题，但是网上大部分都只给出了解决方法。

正所谓知其然，知其所以然，本文将从此问题出发，深入分析探讨导致此问题的原因、由其衍生出来的一系列问题及其解决方案。

### 问题分析

由此可以得出以下情形会导致本文一开始提出的问题。

* 项目使用的是Theme.AppCompat主题，具体表现为  
    项目values目录styles.xml文件里面style为

    ```xml
    <resources>
      <style name="AppBaseTheme" parent="Theme.AppCompat.Light"></style>
      <style name="AppTheme" parent="AppBaseTheme"></style>
    </resources>
    ```

    AndroidManifest.xml文件里面

    ```xml
    android:theme="@style/AppTheme"
    ```

* 项目支持的最小SDK小于API 14（即Android4.0），具体表现为  
    AndroidManifest.xml文件里面，`minSdkVersion`<14，比如

    ```xml
    <uses-sdk
          android:minSdkVersion="8"
          android:targetSdkVersion="23" />
    ```

* 项目没有导入android-support-v7-appcompat兼容包。

### 解决方案

此时的解决方法有如下几种：

1.  既然没有找到`Theme.AppCompat.Light`主题，那么我就不使用此主题。此时将项目values，values-v11，values-v14目录下的styles.xml文件里面的style都改为

    ```xml
    <resources>
     <style name="AppBaseTheme" parent="android:Theme.Light"></style>
     <style name="AppTheme" parent="AppBaseTheme"></style>
    </resources>
    ```

2.  那如果没有找到`Theme.AppCompat.Light`主题，而我们又想要使用最新的主题效果呢，还有种方法就是将AndroidManifest.xml文件里面，`minSdkVersion`改成14，比如

    ```xml
    <uses-sdk
         android:minSdkVersion="14"
         android:targetSdkVersion="23" />
    ```

    此时再将项目values，values-v11，values-v14目录下的styles.xml文件里面style都改为

    ```xml
    <resources>
     <style name="AppBaseTheme" parent="android:Theme.Holo.Light"></style>
     <style name="AppTheme" parent="AppBaseTheme"></style>
    </resources>
    ```

3.  当然以上都不是最好的方法，只是提供一种思路。最好的方法就是导入android-support-v7-appcompat库。下面具体介绍。

### For Android Studio



### For Eclipse

1. 通过Android SDK Manager下载最新的Android Support Library。  

    ![](http://upload-images.jianshu.io/upload_images/518096-920ce2a7f42473bf.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

    下载完成之后，可以在以下目录找到AppCompat library

    ```
    android-sdk/extras/android/support/v7/appcompat
    ```

2. 将此目录下的项目导入到Eclipse中  

    ![](http://upload-images.jianshu.io/upload_images/518096-62251e22e4fe0cba.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

3. 右键点击我们的Android项目，选择Properties，左侧选择Android，在下方Library框里点击Add，最后选择appcompat_v7，确定。  
    此时问题就解决了。  

    ![](http://upload-images.jianshu.io/upload_images/518096-d8c9085ffd4fb572.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

    > 但在以上3.2导入appcompat_v7到Eclipse之后，有可能还会出现错误提示，比如  
    > `appcompat_v7\res\values-v23\styles_base.xml:20: error: Error retrieving parent for item: No resource found that matches the given name 'android:Widget.Material.Button.Colored'.`

出现此问题的原因是appcompat_v7已经更新到了最新版本并且高于编译环境的SDK版本，此时在Android SDK Manager将SDK及编译工具更新到最高版本  

![](http://upload-images.jianshu.io/upload_images/518096-14dcd734a51ea407.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

升级完成之后右键点击appcompat_v7项目，选择Properties，选择Project Build Target 为最新版本，这样就OK了。

![](http://upload-images.jianshu.io/upload_images/518096-45f3b63b1be53751.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

通过以上的分析，相信朋友们以后再遇到AppCompat相关的问题应该不再是问题了。欢迎大家留言讨论。

See:

- [Android关于Theme.AppCompat相关问题的深入分析 - 简书](http://www.jianshu.com/p/6ad7864e005e)
- [AppCompatActivity - 简书](http://www.jianshu.com/p/59a1ad466ccc)