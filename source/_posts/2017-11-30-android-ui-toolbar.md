layout: post
title: Android Toolbar AppBar
tags: [android, ui, toobar]
category: Android
---

## 应用栏

<img src="https://developer.android.com/images/training/appbar/appbar_sheets.png" style="float: right; margin-left: 20px">

最基本的操作栏会在一侧显示 Activity 的标题，在另一侧显示一个 _溢出菜单_。

从 Android 3.0（API 级别 11）开始，所有使用默认主题的 Activity 均使用 [ActionBar](https://developer.android.google.cn/reference/android/app/ActionBar.html?hl=zh-cn) 作为应用栏。现已被 [Toolbar](https://developer.android.google.cn/reference/android/support/v7/widget/Toolbar.html?hl=zh-cn) 取代，以确保您的应用在最大范围的设备上保持一致的行为。

Toolbar 小部件能够在运行 Android 2.1（API 级别 7）或更高版本的设备上提供 Material Design 体验，但除非设备运行的是 Android 5.0（API 级别 21）或更高版本，否则原生操作栏不会支持 Material Design。

本篇所使用到的程序请到 [Github](https://github.com/mosil/Android-Mosil-Sample-Toolbar "Android-Mosil-Sample-Toolbar") 取得。

<div style="clear: both;"></div>

## 向 Activity 添加工具栏

1. 按照[支持库设置](https://developer.android.google.cn/tools/support-library/setup.html?hl=zh-cn)中所述向您的项目添加 [v7 appcompat](https://developer.android.google.cn/tools/support-library/features.html?hl=zh-cn#v7-appcompat) 支持库。

        implementation com.android.support:appcompat-v7:24.2.0

1.  确保 Activity 可以扩展 `AppCompatActivity`： 

    
        public class MyActivity extends AppCompatActivity {  
          // ...  
        }
    

    **注**：请为您应用中每个使用 Toolbar 作为应用栏的 Activity 进行此更改。

2.  在应用清单中，将 `<application>` 元素设置为使用 appcompat 的其中一个 `NoActionBar` 主题。使用这些主题中的一个可以防止应用使用原生 `ActionBar` 类提供应用栏。例如： 

    
        <application  android:theme="@style/Theme.AppCompat.Light.NoActionBar"  />

3.  向 Activity 的布局添加一个 Toolbar。例如，以下布局代码可以添加一个 Toolbar 并赋予其浮动在 Activity 之上的外观： 

        <android.support.v7.widget.Toolbar  
           android:id="@+id/my_toolbar"  
           android:layout_width="match_parent"  
           android:layout_height="?attr/actionBarSize"  
           android:background="?attr/colorPrimary"  
           android:elevation="4dp"  
           android:theme="@style/ThemeOverlay.AppCompat.ActionBar"  
           app:popupTheme="@style/ThemeOverlay.AppCompat.Light"/>

    [Material Design 规范](https://www.google.com/design/spec/what-is-material/elevation-shadows.html?hl=zh-cn#elevation-shadows-shadows) 建议应用栏具有 4 dp 的仰角。

    将工具栏定位在 Activity [布局](https://developer.android.google.cn/guide/topics/ui/declaring-layout.html?hl=zh-cn)的顶部，因为您要使用它作为应用栏。

4.  在 Activity 的 `onCreate()` 方法中，调用 Activity 的 `setSupportActionBar()` 方法，然后传递 Activity 的工具栏。该方法会将工具栏设置为 Activity 的应用栏。例如：

        @Override
        protected void onCreate(Bundle savedInstanceState) {  
            super.onCreate(savedInstanceState);  
            setContentView(R.layout.activity_my);  
            Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);  
            setSupportActionBar(myToolbar);
        }


您的应用现在具有一个基本操作栏。默认情况下，操作栏只包含应用的名称和一个溢出菜单。选项菜单最初只包含 **Settings** 菜单项。您可以按照 [添加和处理操作](https://developer.android.google.cn/training/appbar/actions.html?hl=zh-cn) 中所述向操作栏和溢出菜单添加更多操作。

## 风格(style)

风格要调整的地方有二

- res/values/styles.xml
- /res/values-v21/styles.xml

为了之后设定方便，我们先在 res/values/styles.xml 里增加一个名为 AppTheme.Base 的风格

```xml
<style name="AppTheme.Base" parent="Theme.AppCompat">
  <item name="windowActionBar">false</item>
  <item name="android:windowNoTitle">true</item>
</style>
```

因为此范例只使用 Toolbar，所以我们要将让原本的 ActionBar 隐藏起来，然后将原本 AppTheme 的 parent 属性 改为上面的AppTheme.Base，代码如下：

```xml
<resources>
 
  <!-- Base application theme. -->
  <style name="AppTheme" parent="AppTheme.Base">
  </style>
  
  <style name="AppTheme.Base" parent="Theme.AppCompat">
    <item name="windowActionBar">false</item>
    <del><item name="android:windowNoTitle">true</item></del>
    <!-- 使用 API Level 22 編譯的話，要拿掉前綴字 -->
    <item name="windowNoTitle">true</item>
  </style>
 
</resources>
```

再来调整Android 5.0的style：  /res/values-v21/styles.xml，也将其 parent 属性改为  AppTheme.Base：

```xnl
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="AppTheme.Base">
    </style>
</resources>
```

### 界面(Layout)

在 activity_main.xml 里面添加 Toolbar 控件：

```xml
<android.support.v7.widget.Toolbar
  android:id="@+id/toolbar"
  android:layout_height="?attr/actionBarSize"
  android:layout_width="match_parent" >
 
</android.support.v7.widget.Toolbar>
```

请记得用 support v7 里的 toolbar，不然然只有 API Level 21 也就是 Android 5.0 以上的版本才能使用。

这里需注意，要将 RelatvieLayout 里的四个方向的padding 属性去掉，并记得将原本的 Hello World 设为 layout_below="@+id/toolbar" ，否则会看到像下面这样的错误画面。

![](http://www.jcodecraeer.com/uploads/20141118/14162844682218.png "Screenshot_2014-10-24-17-19-45-300x103.png")

### 程序 (Java)

<img src="http://www.jcodecraeer.com/uploads/20141118/14162846136933.png "Screenshot_2014-10-24-17-43-08-168x300.png" style="float: right; margin-left: 20px">

在 MainActivity.java 中加入 Toolbar 的声明：

```java
Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
setSupportActionBar(toolbar);
```

声明后，再将之用 setSupportActionBar 设定，Toolbar即能取代原本的 actionbar 了，此阶段完成画面如下：


完整代码见：[toolbar_demo_checkpoint1](https://github.com/mosil/Android-Mosil-Sample-Toolbar/tree/master/toolbar_demo_checkpoint1 "checok point 1")

<div style="clear: both;"></div>

## 自定义颜色(Customization color)

<img src="http://www.jcodecraeer.com/uploads/20141118/14162849281137.png" style="float: right;margin-left: 20px; width: 250px;">

这个阶段将从 [toolbar_demo_checkpoint1](https://github.com/mosil/Android-Mosil-Sample-Toolbar/tree/master/toolbar_demo_checkpoint1 "checok point 1") 接着往下进行：

上图是将本阶段要完成的结果画面做了标示，结合下面的描述希望大家能明白。  

1. `colorPrimaryDark`（状态栏底色）：在风格 (styles) 或是主题 (themes) 里进行设定。

2. App bar 底色。

    若你的 android app 仍是使用 actionbar ，则直接在风格 (styles) 或是主题 (themes) 里进行设定 colorPrimary 参数即可。可若是采用 toolbar 的话，则要在界面 (layout) 里面设定 toolbar 控件的 background 属性。

3.  `navigationBarColor`（导航栏底色）

    仅能在 API v21 也就是 Android 5 以后的版本中使用， 因此要将之设定在 _res/values-v21/styles.xml_ 里面。

4.  主视窗底色：windowBackground

<div style="clear: both;"></div>

也因此在这个阶段，我们需要设定的地方有三，一是 style中(res/values/styles.xml)

```xml
<style name="AppTheme.Base" parent="Theme.AppCompat">
  <item name="windowActionBar">false</item>
  <item name="android:windowNoTitle">true</item>
  <!-- Actionbar color -->
  <item name="colorPrimary">@color/accent_material_dark</item>
  <!--Status bar color-->
  <item name="colorPrimaryDark">@color/accent_material_light</item>
  <!--Window color-->
  <item name="android:windowBackground">@color/dim_foreground_material_dark</item>
</style>
```

再来是 v21 的style中 (res/values-v21/styles.xml)

```xml
<style name="AppTheme" parent="AppTheme.Base">
  <!--Navigation bar color-->
  <item name="android:navigationBarColor">@color/accent_material_light</item>
</style>
```

最后，就是为了本篇的主角 – Toolbar 的 background 进行设定。

```xml
<android.support.v7.widget.Toolbar
  android:id="@+id/toolbar"
  android:layout_height="?attr/actionBarSize"
  android:layout_width="match_parent"
  android:background="?attr/colorPrimary" >
 
</android.support.v7.widget.Toolbar>
```

<img src="http://www.jcodecraeer.com/uploads/20141118/14162856831120.png" style="float: right; margin-left: 20px">

在本范例中，toolbar 是设定来在 activity_main.xml，对其设定 background 属性： android:background="?attr/colorPrimary" ，这样就可以使之延用 Actionbar 的颜色设定喽。  
最后，再来看一下结果画面。

完整代码见： [toolbar_demo_checkpoint2](https://github.com/mosil/Android-Mosil-Sample-Toolbar/tree/master/toolbar_demo_checkpoint2 "checok point 2")

<div style="clear: both;"></div>

## 控件 (component)

本阶段将从 [toolbar_demo_checkpoint2](https://github.com/mosil/Android-Mosil-Sample-Toolbar/tree/master/toolbar_demo_checkpoint2 "checok point 2") 接续，在还未于 <android.support.v7.widget.Toolbar/>  标签中，自行添加元件的 toolbar 有几个大家常用的元素可以使用，请先见下图：

![](http://www.jcodecraeer.com/uploads/20141118/1416285884351.png "Toolbar-Component-300x160.png")

大抵来说，预设常用的几个元素就如图中所示，接着就依序来说明之：  

1. `setNavigationIcon` 即设定 up button 的图标，因为 Material 的介面，在 Toolbar这里的 up button样式也就有別于过去的 ActionBar 哦。
1. `setLogo` APP 的图标。
2.  `setTitle` 主标题。
3.  `setSubtitle` 副标题。
4.  `setOnMenuItemClickListener` 设定菜单各按鈕的动作。

先来看看菜单外的代码，在 MainActivity.java 中：

<img src="http://www.jcodecraeer.com/uploads/20141118/14162860447819.png" style="float: left; margin-right: 20px">

```java
Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
 
// App Logo
toolbar.setLogo(R.drawable.ic_launcher);
// Title
toolbar.setTitle("My Title");
// Sub Title
toolbar.setSubtitle("Sub title");
 
setSupportActionBar(toolbar);
 
// Navigation Icon 要設定在 setSupoortActionBar 才有作用
// 否則會出現 back button
toolbar.setNavigationIcon(R.drawable.ab_android);
```

这边要留意的是setNavigationIcon需要放在 setSupportActionBar之后才会生效。

菜单部分，需要先在res/menu/menu_main.xml左定义：

```xml
<menu xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      tools:context=".MainActivity">
 
  <item android:id="@+id/action_edit"
        android:title="@string/action_edit"
        android:orderInCategory="80"
        android:icon="@drawable/ab_edit"
        app:showAsAction="ifRoom" />
 
  <item android:id="@+id/action_share"
        android:title="@string/action_edit"
        android:orderInCategory="90"
        android:icon="@drawable/ab_share"
        app:showAsAction="ifRoom" />
 
  <item android:id="@+id/action_settings"
        android:title="@string/action_settings"
        android:orderInCategory="100"
        app:showAsAction="never"/>
</menu>
```

再回到MainActivity.java 中加入OnMenuItemClickListener 的监听者：  

```java
private Toolbar.OnMenuItemClickListener onMenuItemClick = new Toolbar.OnMenuItemClickListener() {
  @Override
  public boolean onMenuItemClick(MenuItem menuItem) {
    String msg = "";
    switch (menuItem.getItemId()) {
      case R.id.action_edit:
        msg += "Click edit";
        break;
      case R.id.action_share:
        msg += "Click share";
        break;
      case R.id.action_settings:
        msg += "Click setting";
        break;
    }
 
    if(!msg.equals("")) {
      Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
    }
    return true;
  }
};
```

将onMenuItemClick监听者设置给toolbar

```java
setSupportActionBar(toolbar);
 
...
 
// Menu item click 的監聽事件一樣要設定在 setSupportActionBar 才有作用
toolbar.setOnMenuItemClickListener(onMenuItemClick);
```

和 setNavigationIcon 一样，需要將之设定在 setSupportActionBar 之后才有作用。执行上面的代码便会得到下面的界面。

完完整程序见：[toolbar_demo_checkpoint3  ](https://github.com/mosil/Android-Mosil-Sample-Toolbar/tree/master/toolbar_demo_checkpoint3 "checok point 3")

## 总结

在这样的架构设计下，ToolBar直接成了Layout中可以控制的东西，相对于过去的actionbar来说，设计与可操控性大幅提升。

本文上面的解释中用到的完成代码：toolbar demo check point 0 ~ 4，请到[Github](https://github.com/mosil/Android-Mosil-Sample-Toolbar "Android-Mosil-Sample-Toolbar") 取得。

最后再附上一个界面上常用的属性说明图：  

<img src="http://www.jcodecraeer.com/uploads/20141118/14162861629057.png" style="float: left; margin-right: 20px">

这里按照图中从上到下的顺序做个简单的说明：

* `colorPrimaryDark` 状态栏背景色。在 style 的属性中设置。
* `textColorPrimary` App bar 上的标题与更多菜单中的文字颜色。在 style 的属性中设置。
* App bar 的背景色。Actionbar 的背景色设定在 style 中的 colorPrimary。Toolbar 的背景色在layout文件中设置background属性。
* `colorAccent` 各控制元件(如：check box、switch 或是 radoi) 被勾选 (checked) 或是选定 (selected) 的颜色。 在 style 的属性中设置。
* `colorControlNormal` 各控制元件的预设颜色。在 style 的属性中设置
* `windowBackground` App 的背景色。 在 style 的属性中设置
* `navigationBarColor` 导航栏的背景色，但只能用在 API Level 21 (Android 5) 以上的版本 在 style 的属性中设置

## Reference

- [Android的 - 工具栏一步步来](http://blog.mosil.biz/2014/10/android-toolbar/)
