layout: post
title: Android 视图高度和阴影的那点事儿
tags: [android, ui, layout]
category: Android
---


## Android 视图高度和阴影的那点事儿

Material Design 规范针对 UI 元素提出了“高度”这一概念，使过去流行于拟物化设计中的阴影效果，在扁平化设计中消失了很久之后，再次显现。不过，虽然视图高度更多的是以阴影的形式直观地表现在界面中，但更多地是强调一个元素相对重要性的问题。在三维空间中，拥有更高高度的 UI 元素，显然对于用户来讲，相比于其他元素，更加凸显其重要性，更加希望被用户注意到，甚至被频繁操作，这也是设计人员最想表达的初衷。

## Android 中的视图高度： Z 属性

了解三维空间中的 Z 属性，引用[官网](https://developer.android.com/training/material/shadows-clipping.html?hl=zh-cn#Elevation)的一段介绍：

> 由 Z 属性所表示的视图高度将决定其阴影的视觉外观：拥有较高 Z 值的视图将投射更大且更柔和的阴影。 拥有较高 Z 值的视图将挡住拥有较低 Z 值的视图；不过视图的 Z 值并不影响视图的大小。
>
> 阴影是由提升的视图的父项所绘制，因此将受到标准视图裁剪的影响，而在默认情况下裁剪将由父项执行。

具体体现在 API 上，请看这一表达式：

**Z = elevation + translationZ**

也就是说，视图高度由 elevation 和 translationZ 属性决定：

* **elevation**：高度，静态组件，用于提升 UI 元素高度的属性；
* **translationZ**：Z 值转换，动态组件，常用于操作 UI 元素时交互动画的属性。

不同视图高度呈现出的阴影效果如图所示：

![不同视图高度的阴影](http://ocq7gtgqu.bkt.clouddn.com/1488119646.png)

## elevation 属性

UI 控件的 elevation 属性可以设置其高度，呈现在界面中的直观效果就是阴影效果，在 xml 布局文件中，通过 `android:elevation`  属性设置，在 java 代码中通过 View 类提供的 `setElevation()` 方法设置。但是这个属性存在版本兼容问题，是 Android 5.0 引进的 API。所以，当 `minSdkVersion` 值小于21时，系统会在 xml 的对应使用地方给出一个 lint 提示：

> Attribute elevation is only used in API level 21 and higher

当然你也可以选择忽略这个提示，或者使用 `tools:targetApi` 属性消除这个提示，这样做的话，在低于 5.0 版本的系统中将不会出现阴影效果。然而，有一个更好的办法做到兼容，那就是借助 `ViewCompat` 这个万能的兼容类，使 View 的 elevation 属性兼容至低版本中：

**ViewCompat.setElevation(View view, float elevation)**

> 注意：尤其要注意，视图的阴影一定是由有轮廓的视图投射出来的。简单来说，就是需要设置控件的背景，即 `android:background` 属性。我们可以选择图片作为背景，也可以使用 `<shape>` 标签定义一个 drawable 形状，事实上，后者更为常用。

## translationZ 属性

前面提到，elevation 偏向于一个高度上的静态提升属性，而 translationZ 偏向于一个高度上的动态转换属性，可用于设置动画，比如元素触摸状态的转换效果，如果你了解 CardView 的设计规范的话，一定了解这个概念，之前我也写过相关的文章，呈现效果不妨参考：[Android 使用CardView轻松实现卡片式设计](http://yifeng.studio/2016/10/18/android-cardview/)。

我们可以通过属性动画动态改变 translationZ 属性值，为视图添加高度动画，也可以在 drawable 目录下定义一个资源文件，然后通过 `android:stateListAnimator＝"@drawable/selector_elevation"` 属性显式地设置给相应的 View 控件。其中，`selector_elevation` 文件可以这样定义（名字可以自由编写）：

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_enabled="true" android:state_pressed="true">
        <objectAnimator
            android:duration="@android:integer/config_shortAnimTime"
            android:propertyName="translationZ"
            android:valueTo="@dimen/dp_4"
            android:valueType="floatType" />
    </item>
    <item>
        <objectAnimator
            android:duration="@android:integer/config_shortAnimTime"
            android:propertyName="translationZ"
            android:valueTo="0dp"
            android:valueType="floatType" />
    </item>
</selector>
```

## 实现阴影的其他方式


可以看出，通过设置视图高度可以实现阴影效果。这里需要提及一点，不要与 `TextView` 控件的 shadow 相关属性混为一谈，后者实现的是内容文字的投影效果，具体由 shadowColor、shadowRadius、shadowDx、shadowDy 四个属性控制，与本文中介绍的视图阴影概念大相径庭。

像 support:design 包中的 FloatingActionBar、CardView 控件默认都实现了高度上的阴影效果。需要注意的是，前面我们提到的阴影效果都是由于视图 Z 属性提升带来的结果，形状由视图的轮廓所决定的，比如圆形、方形等，至于阴影颜色，所有 UI 元素都是一致的，是无法改变的。

那么还有没有其他方式实现呢，如果我想改变阴影颜色呢，或者只是局部投影呢？答案是肯定的，那就是使用带阴影的背景图，常见如 `.9` 图。比如，系统就给我们提供了一个带阴影效果的 `.9` 背景图，你可以这样使用：

```
android:background="@android:drawable/dialog_holo_light_frame"
```

或者你也可以通过 `<layer-list>` 标签去一层一层定义形状和颜色，不过比较繁琐，不如直接使用 `.9` 背景图片。这里给大家推荐一个在线工具，通过 GUI 方式制作 `.9` 阴影背景图，[Android 9-patch shadow generator](http://inloop.github.io/shadow4android/)，如图：

![Android 9-patch shadow generator](http://ocq7gtgqu.bkt.clouddn.com/1488120191.png)

再或者，你可以尝试一下 GitHub 上的这个开源库，借鉴一下作者的思路，更灵活地实现 Android App 中的 UI 阴影效果：

https://github.com/dmytrodanylyk/shadow-layout

---
本文由 **亦枫** 创作并首发于 **[亦枫的个人博客](http://yifeng.studio/index.html "亦枫")** ，同步推送微信公众号：安卓笔记侠（NiaoTech）。

## FAQ

- [How to bring ImageView in front of Button in android 5? - Stack Overflow](https://stackoverflow.com/questions/27216080/how-to-bring-imageview-in-front-of-button-in-android-5/27216368#27216368)
- [Android 5.0 android:elevation Works for View, but not Button? - Stack Overflow](https://stackoverflow.com/questions/27080338/android-5-0-androidelevation-works-for-view-but-not-button/27112143#27112143)