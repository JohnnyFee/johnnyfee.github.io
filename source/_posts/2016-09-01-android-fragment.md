layout: post
title: "Android Fragment"
description: ""
category: Android
tags: [android, fragment]
---

## Tutorial

- [片段](https://developer.android.com/guide/components/fragments.html?hl=zh-cn#Lifecycle) <sup>official api guide</sup>
- [Building a Dynamic UI with Fragments](https://developer.android.com/training/basics/fragments/index.html) <sup>official tutorial</sup>

## No Fragment

质疑 Fragment 的理由大体如下：

* 在使用 Fragment 时，我们只能选择使用默认的构造方法，而不能自由地构造我们想要的构造方法。
* 嵌套使用 Fragment 很容易出现各种奇奇怪怪的 Bug，抑或是受到种种让人郁闷的限制。
* Fragment 自身的生命周期非常复杂。

奉行着想毁灭世界上所有 Fragment 的信条，Square 大概在一年前介绍了两个全新的库： Flow 和 Mortar。

- [square/flow](https://github.com/square/flow) Name UI states, navigate between them, remember where you've been.
- [square/mortar](https://github.com/square/mortar) A simple library that makes it easy to pair thin views with dedicated controllers, isolated from most of the vagaries of the Activity life cycle.

[Mortar](https://github.com/square/mortar)工作于Dagger之上，它具有两大优点：

* 它为被注入组件提供简单的生命周期回调。这使你可以编写在屏幕旋转时不会被销毁的presenters单例，而且可以保存状态到bundle中从而在进程死亡中存活下来。

* 它为你管理Dagger子图，并帮你把它绑定到activity的生命周期中。这让你有效的实现范围的概念：一个views生成的时候，它的presenter和依赖会作为子图创建；当views销毁的时候，你可以很容易的销毁这个范围，并让垃圾回收起作用。

More

- [Using Flow & Mortar](https://realm.io/news/using-flow-mortar/)
- [Square 开源库Flow和Mortar的介绍](https://bboyfeiyu.gitbooks.io/android-tech-frontier/content/androidweekly/Square%20%E5%BC%80%E6%BA%90%E5%BA%93Flow%E5%92%8CMortar%E7%9A%84%E4%BB%8B%E7%BB%8D/readme.html)
- [我为什么主张反对使用Android Fragment](https://asce1885.gitbooks.io/android-rd-senior-advanced/content/wo_wei_shi_yao_zhu_zhang_fan_dui_shi_yong_android_fragment.html)
