---
layout: post
title: "Android UI Tips"
category: android
tags: [android]
--- 
##The power of TextView: Drawables

当你需要在TextView（包括所有TextView的子类，如Buttons, EditTexts, RadioButtons ）的中放置一个图标时，我们可以借助这些属性：rawableLeft, drawableRight, drawableTop and drawableBottom. 我们还可以借助drawablePadding来调节text and the images之间的padding。

在XML使用实例：

    <TextView xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              android:layout_marginTop="16dp"             
              android:gravity="center"
              android:layout_gravity="center_horizontal"
              android:text="@string/my_contacts"
              android:drawableRight="@drawable/ic_action_add_group"
              android:drawablePadding="8dp"
    />

在Java中设置如：

    textView.setCompoundDrawablesWithIntrinsicBounds(0, 0, R.drawable.ic_action_add_group, 0);
    textView.setCompoundDrawablePadding(...);

完整代码参考: [The power of TextView (Part 1): Drawables | Antonio Leiva](http://antonioleiva.com/textview_power_drawables/)

效果如：

[![Simple form](http://antonioleiva.com/wp-content/uploads/2014/01/simple_form.jpg)](http://antonioleiva.com/wp-content/uploads/2014/01/simple_form.jpg)

具体代码参考

参考：

- [The power of TextView (Part 1): Drawables | Antonio Leiva](http://antonioleiva.com/textview_power_drawables/)

##Spans, a Powerful Concept

在android中，有时候需要对文本进行各种特别的设置，比如颜色、大小、首行缩进，或者是在一段文本中加入图片，甚至是书写一些特殊的公式。如果通过布局文件使用多个控件来实现，一方面会使的使用起来特别的复杂，增加了布局文件维护的难度，另一方面，如果加入了太多的控件，在页面加载时也要耗费更多的资源。如果在HTML中，则可以使用各种标签来实现这些特殊效果，而在android中有类似的机制，只不过不是使用标签来实现，而是使用Spannable对象来实现。

使用方法，如以下代码用于设置前景色：

  SpannableString spanText = new SpannableString("萝卜白菜的博客 -- http://orgcent.com");
  spanText.setSpan(new BackgroundColorSpan(Color.GREEN), 0, spanText.length(), Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
  mTVText.append("\n");
  mTVText.append(spanText);

另外，使用QuoteSpan实现如下效果：

![QuoteSpan](http://johnnyimages.qiniudn.com/textview-span.png)

对应的span为：

    //align center a paragraph
    span = new AlignmentSpan.Standard(Layout.Alignment.ALIGN_CENTER);

参考：

- [Spans, a Powerful Concept](http://flavienlaurent.com/blog/2014/01/31/spans/) ——介绍各种Span的常用和比较复杂的用法。
- [TextView使用SpannableString设置复合文本 | 萝卜白菜的小站](http://orgcent.com/android-textview-spannablestring-span/) ——主要介绍各种Span。
- [Android实战技巧：用TextView实现Rich Text](http://blog.csdn.net/hitlion2008/article/details/6856780) ——一个比较完整的实例。
- [Android中的各类Span全面系统研究 -- AppAdventure -- 传送门](http://chuansong.me/n/20867) ——一些常用API的翻译。

##ActionBar

###FadingActionBar

如果想要实现的ActionBar的效果：

[![Example Image](https://raw.github.com/ManuelPeinado/FadingActionBar/master/art/readme_pic.png)](https://raw.github.com/ManuelPeinado/FadingActionBar/master/art/readme_pic.png)

原理提出：[ActionBar on the Move - Cyril Mottier](http://cyrilmottier.com/2012/11/27/actionbar-on-the-move/)

行程的开源项目：[ManuelPeinado/FadingActionBar](https://github.com/ManuelPeinado/FadingActionBar)

###NotBoringActionBar

如果想要实现类似这样的效果：

[![Example Image](https://raw.github.com/flavienlaurent/NotBoringActionBar/master/graphics/notboringab.gif)](https://raw.github.com/flavienlaurent/NotBoringActionBar/master/graphics/notboringab.gif)

请参考：[flavienlaurent/NotBoringActionBar](https://github.com/flavienlaurent/NotBoringActionBar)

###DateTimePicker

源码：[flavienlaurent/datetimepicker](https://github.com/flavienlaurent/datetimepicker)

[![Example Image](https://raw.github.com/biboune/datetimepicker/master/graphics/img1.png)](https://raw.github.com/biboune/datetimepicker/master/graphics/img1.png)

##Scroll

###discrollview

源码：[flavienlaurent/discrollview](https://github.com/flavienlaurent/discrollview)

[![Animated gif](https://raw2.github.com/flavienlaurent/discrollview/master/discrollview.gif)](https://raw2.github.com/flavienlaurent/discrollview/master/discrollview.gif) ([on youtub](http://youtu.be/FGYaweSP3sA)

###poppyview

源码：[![Example Image](https://raw.github.com/biboune/poppyview/master/graphics/img2.png)](https://raw.github.com/biboune/poppyview/master/graphics/img2.png)

[![Example Image](https://raw.github.com/biboune/poppyview/master/graphics/img2.png)](https://raw.github.com/biboune/poppyview/master/graphics/img2.png)

###GridView
An Android GridView that can be configured to scroll horizontally or vertically.

源码：[flavienlaurent/two-way-gridview](https://github.com/flavienlaurent/two-way-gridview)

##Fragment
- [The Curious Techizen: Nested Fragment and the BackStack - Part 2](http://curioustechizen.blogspot.com/2014/02/nested-fragment-and-backstack-part-2.html)