layout: post
title: "Rx Android UI Binding"
description: ""
category: Android
tags: [rx, android, ui, data binding]
---


## [RxBinding](https://github.com/JakeWharton/RxBinding)

RxJava binding APIs for Android's UI widgets.

将 UI 空间的时间绑定形式转化为 Rx 形式。如可以用 `throttleFirst()` ，用于去抖动，也就是消除手抖导致的快速连环点击。

```java
RxView.clickEvents(button)
    .throttleFirst(500, TimeUnit.MILLISECONDS)
    .subscribe(clickAction);
```

基本用法，Go [使用RxBinding响应控件的异步事件 - 简书](http://www.jianshu.com/p/c2c7c46e6b97)。

## Library

- [butterknife](https://github.com/JakeWharton/butterknife) Bind Android views and callbacks to fields and methods.
  - [android-butterknife-zelezny](https://github.com/avast/android-butterknife-zelezny)  Android Studio plug-in for generating ButterKnife injections from selected layout XML.
- [AndroidAnnotations](http://androidannotations.org/) @ViewById, @ViewById, @App, @RestService, @AnimationRes, @SystemService, @AfterViews, @Click, @Background, @UiThread, @ItemClick, @Rest.
