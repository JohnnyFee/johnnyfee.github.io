layout: post
title: Android Card View
tags: [android, md, cardview]
category: Android
---

CardView` 小部件为 [v7 支持内容库](https://developer.android.com/tools/support-library/features.html#v7)的一部分。 如果要在您的项目中使用这些小部件，请将这些 [Gradle 依赖项](https://developer.android.com/studio/build/index.html#dependencies)添加至您的应用模块：

```
dependencies {  
    ...  
    compile 'com.android.support:cardview-v7:21.0.+'  
```

## 创建卡片

<img src="https://developer.android.com/design/material/images/card_travel.png" style="float: right; width: 300px">

`CardView` 扩展 [FrameLayout](https://developer.android.com/reference/android/widget/FrameLayout.html) 类并让您能够显示卡片内的信息，这些信息在整个平台中拥有一致的呈现方式。

`CardView` 小部件可拥有阴影和圆角。

如果要使用阴影创建卡片，请使用 `card_view:cardElevation` 属性。`CardView` 在 Android 5.0（API 级别 21）及更高版本中使用真实高度与动态阴影，而在早期的 Android 版本中则返回编程阴影实现。如需了解详细信息，请参阅[保持兼容性](https://developer.android.com/training/material/compatibility.html)

使用这些属性自定义
`CardView` 小部件的外观：

* 如果要在您的布局中设置圆角半径，请使用 `card_view:cardCornerRadius` 属性。如果要在您的代码中设置圆角半径，请使用 `CardView.setRadius` 方法。
* 如果要设置卡片的背景颜色，请使用 `card_view:cardBackgroundColor` 属性。

下列代码示例将展示如何将 `CardView` 小部件包括在您的布局中：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    ... >
    <!-- A CardView that contains a TextView -->
    <android.support.v7.widget.CardView
        xmlns:card_view="http://schemas.android.com/apk/res-auto"
        android:id="@+id/card_view"
        android:layout_gravity="center"
        android:layout_width="200dp"
        android:layout_height="200dp"
        card_view:cardCornerRadius="4dp">

        <TextView
            android:id="@+id/info_text"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
    </android.support.v7.widget.CardView>
</LinearLayout>
```

如果要了解更多信息，请参阅 `CardView` 的 API 参考。

## 属性

See [Android5.0 CardView的使用 - 简书](http://www.jianshu.com/p/ae9d654599ef)

-  圆角。 `android:cardCornerRadius` 在xml文件中设置card圆角的大小。`CardView.setRadius` 在代码中设置card圆角的大小。
-  背景颜色。`android:cardBackgroundColor` 在xml文件中设置card背景颜色。
- 阴影。
    - `card_view:cardElevation` 在xml文件中设置阴影的大小.
    - `card_view:cardMaxElevation` 在xml文件中设置阴影最大高度
- 间隔。`card_view:contentPadding` 在xml文件中设置卡片内容于边距的间隔。

    - `card_view:contentPaddingBottom` 在xml文件中设置卡片内容于下边距的间隔 
    - `card_view:contentPaddingTop` 在xml文件中设置卡片内容于上边距的间隔
    - `card_view:contentPaddingLeft` 在xml文件中设置卡片内容于左边距的间隔
    - `card_view:contentPaddingRight` 在xml文件中设置卡片内容于右边距的间隔
    - `card_view:contentPaddingStart` 在xml文件中设置卡片内容于边距的间隔起始
    - `card_view:contentPaddingEnd` 在xml文件中设置卡片内容于边距的间隔终止
    - `card_view:cardUseCompatPadding` 兼容属性。在xml文件中设置内边距，V21+的版本和之前的版本仍旧具有一样的计算方式。设置为true（默认值为false），让CardView在不同系统中使用相同的padding值。
    - `card_view:cardPreventConrerOverlap` 兼容属性。在xml文件中设置内边距，在V20和之前的版本中添加内边距，这个属性为了防止内容和边角的重叠。
    
        API <= 20 时，CardView不会裁剪内容元素以满足圆角需求，而是使用添加 padding的替代方案，从而使内容元素不会覆盖CardView的圆角。而控制这个行为的属性就是cardPreventCornerOverlap，默认值为true。

        默认值下自动添加padding的方式不可取，所以需要设置该属性值为false。需要注意的一点是，该属性的设置在Lollipop及以上版本的系统中没有任何影响，除非cardUseCompatPadding的值为true。

## 波纹点击效果

默认情况，CardView是不可点击的，并且没有任何的触摸反馈效果。 触摸反馈动画在用户点击CardView时可以给用户以视觉上的反馈。 实现这种行为，你必须设置属性 `android:clickable` 和 `android:foreground`。

```
<android.support.v7.widget.CardView
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:card_view="http://schemas.android.com/apk/res-auto"
  ...
  android:clickable="true"
  android:foreground="?android:attr/selectableItemBackground">
  ...
</android.support.v7.widget.CardView>
```

## lift-on-touch

<img src="http://ocq7gtgqu.bkt.clouddn.com/CardView-samples-04.gif" style="width: 300; float: right;">

根据官网[Material motion](https://material.google.com/motion/material-motion.html#)部分对交互动作规范的指导，Cards、Button等视图应该有一个触摸抬起（lift-on-touch）的交互效果，也就是在三维立体空间上的Z轴发生位移，从而产生一个阴影加深的效果，与Ripple效果共同使用，官网给了一个很好的示例图：

在实现这个效果也很简单，可以在`res/drawable`目录下建立一个`lift_on_touch.xml`文件，内容如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- animate the translationZ property of a view when pressed -->
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:state_enabled="true"
        android:state_pressed="true">
        <set>
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:valueTo="6dp"
                android:valueType="floatType"/>
        </set>
    </item>
    <item>
        <set>
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:valueTo="0"
                android:valueType="floatType"/>
        </set>
    </item>
</selector>
```

即通过属性动画动态改变translationZ值，沿着Z轴，从0dp到6dp变化。这里的6dp值也是有出处的，参考[Google I/O 2014 app](https://github.com/google/iosched/blob/master/android/src/main/res/values/dimens.xml#L122)和[Assign Elevation to Your Views](https://developer.android.com/training/material/shadows-clipping.html#Elevation)。然后将其赋值给`android:stateListAnimator`属性即可。由于`stateListAnimator`属性只适用于Lollipop及以上版本，为了隐藏xml中的版本警告，可以指定`tools:targetApi="lollipop"`。

关于这个功能，需要补充说明一点。这里的`lift_on_touch.xml`，严格意义上来讲，属于anim资源，同时适用于API 21及以上版本，所以按道理上来讲应该将其放置在`res/anim-v21`目录下，然后使用`@anim/lift_on_touch`赋值给`stateListAnimator`属性，而不是例子中的`@drawable/lift_on_touch`方法。但是放置在`res/anim-v21`目录下会产生一个“错误”提示：

>XML file should be in either “animator” or “drawable”,not “anim”

虽然这个“错误”不影响编译运行，但是对于追求完美主义的程序员们来说还是碍眼，所以本例中我选择将其放在了`res/drawable`目录下，大家可以自行斟酌使用。

关于对lift-on-touch效果的理解，YouToBe网站有个视频解说，感兴趣的话可以参看看，地址如下：

[DesignBytes: Paper and Ink: The Materials that Matter](https://www.youtube.com/watch?v=YaG_ljfzeUw)

CardView还有一些其他属性可供使用，比如`cardElevation`设置阴影大小，`contentPadding`代替普通`android:padding`属性等，比较基础，本文就不一一介绍了，大家可以在官网上参考学习。从上面的介绍可以看出，在使用CardView时基本上都会用到一些标准配置的属性，我们可以借助style属性，将其封装到`styles.xml`文件中，统一管理，比如：

```xml
<style name="AppCardView" parent="@style/CardView.Light">
        <item name="cardPreventCornerOverlap">false</item>
        <item name="cardUseCompatPadding">true</item>
        <item name="android:foreground">?attr/selectableItemBackground</item>
        <item name="android:stateListAnimator" tools:targetApi="lollipop">@anim/lift_up</item>
        ......
</style>
```