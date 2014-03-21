---
layout: post
title: "Android绝招一——利用weight属性居中View"
description: ""
category: Android
tags: [weight,center,hack]
--- 
##前言

从[salttiger](http://www.salttiger.com/)上看到一本书，[《[50.Android.Hacks(2013.6)].Carlos.Sessa.文字版》](http://www.salttiger.com/50-android-hacks/)，个人认为都是Android的开发中都会碰到的问题。完了本人看书从来都是要写笔记的，因为看过的书很少有耐心再看第二遍，不用就忘。这可能会是一个系列文章，如果我能坚持的话。本人不会翻译这本书，因为我现在没有这么多的时间和精力，我只是尽量提及其中最最核心的点。如果你有兴趣或者有疑虑可以直接看书中对应的点。另外，[KOST-昱东](http://blog.csdn.net/u011418185/article/category/1706265)哥哥翻译了前七篇，可能就此终止了，呵呵。所以前七篇可以直接看他的翻译。

<!--more-->

本系列的代码均在github上的https://github.com/Macarse/50AH-code，请使用

##目标

我们的目标是实现

- View（以Button为例）的居中对齐，这个不是重点。
- 这个Button的宽度占屏幕宽度的50%。

我们最终要实现的效果为：

![居中](http://johnnyimages.qiniudn.com/hack1-center.png)

##实现居中

实现居中相对简单，我们使用**android:gravity**属性，如：

	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    android:orientation="horizontal"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent"
	    android:gravity="center">

	    <Button
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:text="New Button"
	        android:id="@+id/button" />
	</LinearLayout>

##实现宽度为容器的50%

###layout_weight

官方解释为，Indicates how much of the extra space in the [ViewGroup] will be allocated to the view associated with these LayoutParams， 说了等于没说。我们来看到例子：

	<?xml version="1.0" encoding="utf-8"?>
	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    android:orientation="vertical"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent">
	    <LinearLayout
	        android:background="#0000FF"
	        android:layout_height="0dp"
	        android:layout_width="match_parent"
	        android:layout_weight="2" />
	    <LinearLayout
	        android:background="#00FF00"
	        android:layout_height="0dp"
	        android:layout_width="match_parent"
	        android:layout_weight="1" />
	</LinearLayout>

效果图为：

![layout_weight](http://www.chess-ix.com/ChessContent/uploads/2012/01/layout4-180x300.png)

所以我们把layout_weight理解为计算控件占用控件的一个参数，作用在水平方向还是作用的垂直方向由父容器的**android:orientation**决定。假如作用在水平方向，那么控件占用宽度的计算方法为：

	View's width + View's weight * 200 / sum(weight)

当把控件本身的宽度(android:width)或者高度(android:height)设置为0时，该控件的最终的宽度或者高度将由layout_weight计算得出，这其实就是子控件占用在父容器中的占用比例。

作用在垂直位置的计算公式同理。

对于这个例子，需要说明的是LinearLayout默认的layout_width和layout_height都为0dp，所以我们可以省略`android:layout_height="0dp"`，而如果是控件（如Button）就不能省略这句代码了。


###weightSum

可想而知，要实现控件占用父容器的一般控件，实现的思路为子控件的layout_weight为sum(weight)的一半，并且将该控件的宽度指定为0即可。我们可以通过**weightSum**指定sum(weight)，而无需自动计算。

最终我们的代码如下：

	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    android:orientation="horizontal"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent"
	    android:gravity="center"
	    android:weightSum="1">
	    <Button
	        android:layout_width="0"
	        android:layout_height="wrap_content"
	        android:text="New Button"
	        android:layout_weight="0.5"
	        android:id="@+id/button" />
	</LinearLayout>

##参考

- 关于layout_weight和更详细的使用方法可以参考[The use of layout_weight with Android layouts](http://www.chess-ix.com/blog/the-use-of-layout_weight-with-android-layouts/)。	
- [《[50.Android.Hacks(2013.6)].Carlos.Sessa.文字版》](http://www.salttiger.com/50-android-hacks/)