layout: post
title: Android Material UI
tags: [android, ui, material]
category: Android
---

## 入门必看

- [面向开发者的 Material Design](https://developer.android.com/training/material/index.html) 官方教程。
* [From design to android, part 1 · Saúl Molinero](http://saulmm.github.io/from-design-to-android-part1)
* [编写您的应用](https://developer.android.com/studio/write/index.html)
* [Google Design](https://www.google.com/design/) 官方 Material Design 设计规范。

## 使用材料主题

See [使用材料主题](https://developer.android.com/training/material/theme.html)

如果要在 Android 5.0 之前的 Android 版本中使用材料主题，请参考 [保持兼容性](https://developer.android.com/training/material/compatibility.html)。

材料主题的定义为：

* `@android:style/Theme.Material`（深色版本）
* `@android:style/Theme.Material.Light`（浅色版本）
* `@android:style/Theme.Material.Light.DarkActionBar`

如果要了解您可使用的材料风格，请参阅 `[R.style](https://developer.android.com/reference/android/R.style.html)` 的 API 参考。

如果要在您的应用中使用材料主题，请指定一个从
`android:Theme.Material` 继承的风格：

```xml
<!-- res/values/styles.xml -->  
<resources>  
  <!-- your theme inherits from the material theme -->  
  <style name="AppTheme" parent="android:Theme.Material">  
    <!-- theme customizations -->  
  </style>  
</resources>
```

材料主题提供更新的系统小组件，让您能够为触摸反馈以及操作行为转换设置配色工具以及默认动画。

### 定制配色工具

<img src="https://developer.android.com/training/material/images/ThemeColors.png" width="300px" style="float: right;">

如果要定制主题的基色以符合您的品牌，您可在进行材料主题继承时使用主题属性定义您的定制颜色：

```xml
<resources>  
  <!-- inherit from the material theme -->  
  <style name="AppTheme" parent="android:Theme.Material">  
    <!-- Main theme colors -->  
    <!--   your app branding color for the app bar -->  
    <item name="android:colorPrimary">@color/primary</item>  
    <!--   darker variant for the status bar and contextual app bars -->  
    <item name="android:colorPrimaryDark">@color/primary_dark</item>  
    <!--   theme UI controls like checkboxes and text fields -->  
    <item name="android:colorAccent">@color/accent</item>  
  </style>
</resources>
```

### 定制状态栏

如果要为状态栏设置定制颜色，您可在扩展材料主题时使用 `android:statusBarColor` 属性。

默认情况下，`android:statusBarColor` 将继承 `android:colorPrimaryDark` 的值。

可以将 `android:statusBarColor` 属性设置为 `@android:color/transparent` 并根据需要调整窗口标志，以使用背景来作为状态栏的背景。

您也可以使用 [`Window.setStatusBarColor()`](https://developer.android.com/reference/android/view/Window.html#setStatusBarColor(int))方法进行动画或淡出设置。

## Material Components

- [Material Components for Android](https://material.io/components/android/)
- [afollestad/material-dialogs](https://github.com/afollestad/material-dialogs)

## Resource

- [theDazzler/droidicon](https://github.com/theDazzler/droidicon) Android icons.
- [Material Palette](http://www.materialpalette.com/purple/pink) 调色板。
