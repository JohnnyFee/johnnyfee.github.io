layout: post
title: "Rx Bus"
description: ""
category: Android
tags: [rx, android, bus]
---

## Event Bus

用于简化 Activity、Fragment、Service 等组件之间的交互，很大程度上降低了它们之间的耦合。

目前实现 Android Event Bus 的库有:

- [greenrobot/EventBus](https://github.com/greenrobot/EventBus) Android optimized event bus that simplifies communication between Activities, Fragments, Threads, Services, etc. Less code, better quality.
- [square/otto](https://github.com/square/otto) An enhanced Guava-based event bus with emphasis on Android support.

其中 otto 官方已宣布被废弃，可以使用 rx 取代。

## Soluttion

- [RxBus](http://wuxiaolong.me/2016/04/07/rxbus/)
- [RxBus—通过RxJava来替换EventBus](http://hanhailong.com/2015/10/09/RxBus%E2%80%94%E9%80%9A%E8%BF%87RxJava%E6%9D%A5%E6%9B%BF%E6%8D%A2EventBus/)
- [用RxJava实现事件总线(Event Bus)](http://www.jianshu.com/p/ca090f6e2fe2/)
- [用RxJava实现事件总线RxBus并实现同类型事件的区分](http://www.loongwind.com/archives/264.html)
- [Android事件驱动编程（二）](https://asce1885.gitbooks.io/android-rd-senior-advanced/content/androidshi_jian_qu_dong_bian_cheng_ff08_er_ff09.html)
- [事件总线 —— otto的bus和eventbus对比分析](http://frodoking.github.io/2015/03/30/android-eventbus-otto-analysis/)
