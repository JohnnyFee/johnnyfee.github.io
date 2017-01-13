---
layout: post
title: "Android ViewStub"
description: ""
category: [Android]
tags: [android, view]
---

See [Android ViewStub的使用 - Coding - SegmentFault](https://segmentfault.com/a/1190000004707516)

## 简介

在Android开发中，布局的加载速度会影响APP的性能。如果布局实现的不好，会导致程序非常占内存并且UI运行缓慢。优化布局可以从三个方面着手:

1.  使用<include>标签重用layouts

2.  使用<merge>标签避免冗余的布局嵌套

3.  使用`ViewStub`实现按需加载

本文讲解一下`ViewStub`的使用。`ViewStub`相当于延迟加载，有的时候在布局中有一些不怎么重用的视图，可以只在需要的时候再加载，提高UI的渲染速度。

## 定义ViewStub

`ViewStub`是轻量级视图，不需要大小信息，不会在布局中绘制任何东西，每个 ViewStub 只需要设置`android:layout`属性来指定需要被 inflate 的 Layout 类型。

比如下面的布局文件：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
android:layout_width="match_parent"
android:layout_height="match_parent"
android:orientation="vertical">

    <Button
        android:id="@+id/button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="加载ViewStub" />

    <ViewStub
        android:id="@+id/view_stub"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout="@layout/extra" />

</LinearLayout>
```

布局中定义了一个`ViewStub`，`layout`属性引用了另一个布局`extra.xml`，这个布局就是被延迟加载的布局，而`ViewStub`本身不会显示任何内容。上面的`Button`是为了在代码中实现延迟加载。

`extra.xml`定义了一个`TextView`和一个`progressBar`，代码如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
android:layout_width="match_parent"
android:layout_height="match_parent"
android:orientation="vertical">

    <TextView
        android:id="@+id/text_view"
        android:layout_width="match_parent"
        android:layout_height="100dp"
        android:background="#36e7ea"
        android:gravity="center"
        android:textSize="18sp" />

    <ProgressBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center" />

</LinearLayout>
```

## 加载ViewStub布局

要加载`ViewStub`引用的布局只需要调用`inlfate()`方法，在我们的这个例子中设置为点击`Button`，代码比较简单：

```java
Button button = (Button) findViewById(R.id.button);
    button.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            View view = ((ViewStub)findViewById(R.id.view_stub)).inflate();
            TextView tv = (TextView) view.findViewById(R.id.text_view);
            tv.setText("ViewStub的使用");
    }
});
```

获取`ViewStub`之后直接调用`inflate()`即可把`extra.xml`解析为`View`，通过它可以得到`extra.xml`内部的控件，这样便实现了按需加载。

下面两幅图分别是点击`Button`前后的界面：

![](https://segmentfault.com/img/bVtUOS)![](https://segmentfault.com/img/bVtUOZ)

注意：`ViewStub`不支持使用<merge>标签的布局。