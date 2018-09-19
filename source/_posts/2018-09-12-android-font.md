layout: post
title: Android Add Fonts Globally
tags: [image]
category: Android
---

Original: [Fonts in XML](https://developer.android.com/guide/topics/ui/look-and-feel/fonts-in-xml)

Android O推出了一项新的功能「**Fonts in XML**」，借助这项功能，我们能够像使用其他资源文件一样使用字体，比较方便地实现App全局字体的替换。

为了能够在API 14或者以上的设备上使用Fonts in XML特性，我们需要使用到Support Library 26。更多的内容可以参考「使用Support Library」小节。

在Android Studio中按照如下步骤将字体作为资源文件添加至工程：

1.  右键单击项目的 `app / res` 文件夹，然后选择 `New > Android resource directory`。
2.  打开下拉菜单并选择 `font`，输入 `font` 作为File name，点击`OK`。

    > 注意名称字体资源文件夹的名称必须为font

    ![](http://www.jcodecraeer.com/uploads/userup/9998/1F60Q01635-42C-0.jpeg)

1.  将字体文件拖放到新的 `res / font` 文件夹中。Android O支持 `.otf（OpenType）` 和 `.ttf（TrueType）` 两种格式的字体文件。

    ![](http://www.jcodecraeer.com/uploads/userup/9998/1F60Q01635-F91-1.jpeg)

2.  双击字体文件可以在编辑器中对字体进行预览。

    ![](http://www.jcodecraeer.com/uploads/userup/9998/1F60Q01635-D38-2.jpeg)

## 创建Font family

在Android Studio中创建Font family的步骤如下：

1.  右键单击项目的 `res / font` 文件夹，然后选择 `New > Font resource file` 。

2.  输入文件名，然后点击 `OK` .

3.  打开此XML文件并定义该字体的所有不同版本，以及其样式和权重属性，例如：

    <pre class="prettyprint linenums prettyprinted" style="overflow: auto;">
    1.  `<?xml version="1.0" encoding="utf-8"?>`
    2.  `<font-family xmlns:android="http://schemas.android.com/apk/res/android">`
    3.  ` <font`
    4.  `     android:fontStyle="normal"`
    5.  `     android:fontWeight="400"`
    6.  `     android:font="@font/lobster_regular" />`
    7.  ` <font`
    8.  `     android:fontStyle="italic"`
    9.  `     android:fontWeight="400"`
    10.  `     android:font="@font/lobster_italic" />`
    11.  `</font-family>`
    </pre>

## 在XML布局中使用字体资源

**给TextView添加字体**

* 在XML布局文件中，将fontFamily设置为你想要的访问的字体文件：

    <pre class="prettyprint linenums prettyprinted" style="overflow: auto;">
    1.  `<TextView`
    2.  `     android:layout_width="wrap_content"`
    3.  `     android:layout_height="wrap_content"`
    4.  `     android:fontFamily="@font/lobster"/>`
    </pre>

* 打开 `Properties` 窗口，设置TextView的字体：

    1.  选择一种视图打开 `Properties` 窗口
    2.  展开 `textAppearance` ，选择fontFamily表中的一种字体类型。

        ![](http://www.jcodecraeer.com/uploads/userup/9998/1F60Q01635-22I-3.jpeg)

        ![](http://www.jcodecraeer.com/uploads/userup/9998/1F60Q01635-5304-4.jpeg)

**添加字体至style**

打开 `style.xml` 文件，将fontFamily属性设置为你想要访问的字体文件。

<pre class="prettyprint linenums prettyprinted" style="overflow: auto;">
1.  `<style name="customfontstyle" parent="@android:style/TextAppearance.Small">`
2.  `   <item name="android:fontFamily">@font/lobster</item>`
3.  `</style>`
</pre>

在你的App的Theme中配置此属性即可实现整个App的字体替换。

## 使用代码控制字体

<pre class="prettyprint linenums prettyprinted" style="overflow: auto;">
1.  `Typeface typeface = getResources().getFont(R.font.myfont);`
2.  `textView.setTypeface(typeface);`
</pre>

## 使用Support Library

当我们通过 `Support Library` 实现 `Fonts in XML` 特性时，需要使用 **`app`** 命名空间。Support Library目前支持API 14及以上。

> 在Android Support Library 26.0-beta1中，必须同时使用android和app命名空间进行声明，以确保在Android O版本及以下设备上字体能够被正确加载。

<pre class="prettyprint linenums prettyprinted" style="overflow: auto;">
1.  `<?xml version="1.0" encoding="utf-8"?>`
2.  `<font-family xmlns:android="http://schemas.android.com/apk/res/android"`
3.  `            xmlns:app="http://schemas.android.com/apk/res-auto">`
4.  `   <font android:fontStyle="normal" android:fontWeight="400" android:font="@font/myfont-Regular"`
5.  `         app:fontStyle="normal" app:fontWeight="400" app:font="@font/myfont-Regular"/>`
6.  `   <font android:fontStyle="italic" android:fontWeight="400" android:font="@font/myfont-Italic"`
7.  `         app:fontStyle="italic" app:fontWeight="400" app:font="@font/myfont-Italic" />`
8.  `</font-family>`
</pre>

通过代码控制：

<pre class="prettyprint linenums prettyprinted" style="overflow: auto;">
1.  `Typeface typeface = ResourcesCompat.getFont(context, R.font.myfont);`
</pre>

内容均来自Android Developer官网，做了简单的翻译，水平有限，还请见谅，原地址： https://developer.android.com/preview/features/fonts-in-xml.html

参考: https://developer.android.com/preview/features/working-with-fonts.html

更多内容:

1.  YouTube - [What's New in Android Support Library (Google I/O '17)](https://www.youtube.com/watch?v=V6-roIeNUY0)

2.  Google Developers Blog - [Android O Developer Preview 终于推出啦！](http://developers.googleblog.cn/2017/03/android-o-developer-preview.html)

3.  知乎 - [Android如何高效率的替换整个APP的字体?](https://www.zhihu.com/question/38615247/answer/179928113)

另外，我在我的开源项目 [TonnyL/PaperPlane](https://github.com/TonnyL/PaperPlane) 中使用 `Fonts in XML` 实现了App的字体的整体替换。效果如下：

![](http://www.jcodecraeer.com/uploads/userup/9998/1F60Q01635-3644-5.jpeg)