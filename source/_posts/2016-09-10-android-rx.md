layout: post
title: "Android ReactiveX"
description: ""
category: Android
tags: [android, rx]
---

## 函数响应式编程

[什么是函数响应式编程（Java和Android版本）](https://asce1885.gitbooks.io/android-rd-senior-advanced/content/#)

## Rx 文档

- [Introduction · ReactiveX文档中文翻译](https://mcxiaoke.gitbooks.io/rxdocs/content/) <sup>中文翻译</sup>

## RxJava

- [lzyzsd/Awesome-RxJava: RxJava resources](https://github.com/lzyzsd/Awesome-RxJava) <sup>awesome</sup>
- [给 Android 开发者的 RxJava 详解](http://gank.io/post/560e15be2dca930e00da1083) <sup>入门，推荐</sup>
- [RxJava](http://www.devtf.cn/?s=RxJava) <sup>中文开发精要</sup>
- [有什么使用了RxJava或RxAndroid的开源项目？](http://www.zhihu.com/question/35511144) <sup>一些零碎资料</sup>

## Example

- [kaushikgopal/RxJava-Android-Samples: Learning RxJava for Android by example](https://github.com/kaushikgopal/RxJava-Android-Samples)

## RxBinding

[JakeWharton/RxBinding: RxJava binding APIs for Android's UI widgets.](https://github.com/JakeWharton/RxBinding) 将 UI 空间的时间绑定形式转化为 Rx 形式。如可以用 `throttleFirst()` ，用于去抖动，也就是消除手抖导致的快速连环点击。

```java
RxView.clickEvents(button)
    .throttleFirst(500, TimeUnit.MILLISECONDS)
    .subscribe(clickAction);
```

基本用法，Go [使用RxBinding响应控件的异步事件 - 简书](http://www.jianshu.com/p/c2c7c46e6b97)。

## RxBus

简化 Activity、Fragment、Service 等组件之间的交互，很大程度上降低了它们之间的耦合。

- [RxBus](http://wuxiaolong.me/2016/04/07/rxbus/)
- [RxBus—通过RxJava来替换EventBus](http://hanhailong.com/2015/10/09/RxBus%E2%80%94%E9%80%9A%E8%BF%87RxJava%E6%9D%A5%E6%9B%BF%E6%8D%A2EventBus/)
- [用RxJava实现事件总线(Event Bus)](http://www.jianshu.com/p/ca090f6e2fe2/)
- [用RxJava实现事件总线RxBus并实现同类型事件的区分](http://www.loongwind.com/archives/264.html)
- [Android事件驱动编程（二）](https://asce1885.gitbooks.io/android-rd-senior-advanced/content/androidshi_jian_qu_dong_bian_cheng_ff08_er_ff09.html)
- [事件总线 —— otto的bus和eventbus对比分析](http://frodoking.github.io/2015/03/30/android-eventbus-otto-analysis/)


## Library

* [rx-preferences](https://github.com/f2prateek/rx-preferences) -使SharedPreferences支持RxJava

* [RxAndroid](https://github.com/ReactiveX/RxAndroid) -RxJava的Android拓展

* [RxLifecycle](https://github.com/trello/RxLifecycle) -帮助使用了RxJava的安卓应用控制生命周期

* [RxBinding](https://github.com/JakeWharton/RxBinding) -安卓UI控件的RxJava绑定API

* [storio](https://github.com/pushtorefresh/storio) -支持RxJava的数据库

* [retrofit](https://github.com/square/retrofit) -支持RxJava的网络请求库

* [sqlbrite](https://github.com/square/sqlbrite) -支持RxJava的sqlite数据库

* [RxPermissions](https://github.com/tbruyelle/RxPermissions) -RxJava实现的Android运行时权限控制

* [reark](https://github.com/reark/reark) -RxJava architecture library for Android

* [frodo](https://github.com/android10/frodo) -Android Library for Logging RxJava Observables and Subscribers.
