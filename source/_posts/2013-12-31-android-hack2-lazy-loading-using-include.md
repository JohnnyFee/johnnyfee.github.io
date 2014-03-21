---
layout: post
title: "Android绝招二——延迟加载与避免重复"
category: Android
tags: [android,hack]
---
### 
##目标

- 在xml布局文件中使用`include`标签来避免重复代码。
- 使用ViewStub来实现View的延迟加载。

<!--more-->

##include

跟其他语言一样，我们通常会将在多个地方重复出现的代码提取到一个单独的文件中，然后再其他需要使用到的地方通过include引用该文件。如：

	<RelativeLayout
	    xmlns:android="http://schemas.android.com/apk/res/android"
	    android:layout_width="fill_parent"
	    android:layout_height="fill_parent">
	    <TextView
	        android:layout_width="fill_parent"
	        android:layout_height="wrap_content"
	        android:layout_centerInParent="true"
	        android:gravity="center_horizontal"
	        android:text="Hello"/>
	    <include layout="@layout/footer"/>
	</RelativeLayout>

其中的footer.xml可能为：

	<TextView xmlns:android="http://schemas.android.com/apk/res/android"
	    android:layout_width="fill_parent"
	    android:layout_height="wrap_content"
	    android:layout_alignParentBottom="true"
	    android:layout_marginBottom="30dp"
	    android:gravity="center_horizontal"
	    android:text="页脚"/>

注意，在footer.xml中我们使用到了RelativeLayout特有的属性layout_alignParentBottomh和layout_marginBottom，这将使得这个通用的布局文件不再通用，因为当父容器不是RelativeLayout时，layout_alignParentBottom明显无效，而且不知道会导致什么不可预知的效果。

如何解决这个问题？我们通常将跟特定布局有关的设置放在include标签中，如改进后的布局文件为：

	<RelativeLayout
	    xmlns:android="http://schemas.android.com/apk/res/android"
	    android:layout_width="fill_parent"
	    android:layout_height="fill_parent">
	    <TextView
	        android:layout_width="fill_parent"
	        android:layout_height="wrap_content"
	        android:layout_centerInParent="true"
	        android:gravity="center_horizontal"
	        android:text="Hello"/>
	    <include
	        layout="@layout/footer"
	        android:layout_width="fill_parent"
	        android:layout_height="wrap_content"
	        android:layout_alignParentBottom="true"
	        android:layout_marginBottom="30dp"/>
	</RelativeLayout>


footer为：

	<TextView xmlns:android="http://schemas.android.com/apk/res/android"
	    android:layout_width="0dp"
	    android:layout_height="0dp"
	    android:gravity="center"
	    android:text="页脚"/>

其中layout_width和layout_height设置为0是为了提醒用户覆盖这两个值，如果用户忽略也不会导致错误，只是footer不显示。    

另外需要注意的是：

The `<include>` tag must specify BOTH layout_width and layout_height if you want to override any layout_* attributes. If you miss one of those, the LayoutInflater class silently catches a RuntimeException and proceeds to ignore your overridden attributes.

引用于<https://code.google.com/p/android/issues/detail?id=2863>，很多人认为这是一个bug。

##ViewStub使用方法

ViewStub是个神马控件？官方解释为：A ViewStubis an invisible, zero-sized Viewthat can be  used  to lazily inflate layout  resources  at  runtime.  When  a ViewStub is  made  visible,  or  when inflate() is  invoked,  the  layout  resource  is  inflated.  The  ViewStub then replaces itself in its parent with the inflated Viewor Views. 

我们可以理解为以下几点：

- ViewStub在正常情况下不被渲染，这样某种程度上可以提升性能。
- 在需要ViewStub渲染时，可以调用inflate()或者setVisibility()方法。

我们来看个例子：

	<RelativeLayout
	    xmlns:android="http://schemas.android.com/apk/res/android"
	    android:layout_width="fill_parent"
	    android:layout_height="fill_parent">
	    <Button
	        android:layout_width="fill_parent"
	        android:layout_height="wrap_content"
	        android:text="显示地图"
	        android:onClick="onShowMap"/>
	    <ViewStub
	        android:id="@+id/map_stub"
	        android:layout_width="fill_parent"
	        android:layout_height="fill_parent"
	        android:layout="@layout/map"
	        android:inflatedId="@+id/map_view"/>
	</RelativeLayout>

其中map.xml为:

	<com.google.android.maps.MapView
	    xmlns:android="http://schemas.android.com/apk/res/android"
	    android:layout_width="fill_parent"
	    android:layout_height="fill_parent"
	    android:clickable="true"
	    android:apiKey="my_api_key"/>

ViewStub的特殊属性有且只有两个：

- android:inflateId：The inflatedIdis the IDthat the inflated view will have after we call inflate()or setVisibility()in the ViewStub class。
- android:layout：ViewStub对应的真实的View布局文件。

我们可以通过以下两种方法来加载ViewStub：

**使用setVisibility**

	mViewStub = findViewById(R.id.map_stub);
	mViewStub.setVisibility(View.VISIBLE);

**使用inflate()方法**

	mViewStub = findViewById(R.id.map_stub);
	MapView mapVIew = (MapView)mViewStub.inflate(inflate);

两种方法的区别通过inflate可以返回被渲染后的组件的引用，而通过setVisibility渲染之后，想再次引用被渲染后的控件，则需要通过findViewById(inflateId)获取。


对于ViewStub而言，它需要监听的事件就只有一个，被加载的时候触发的事件VIewStub.OnInflateListener，在这个事件中，需要实现一个onInflate()方法，以下是这个方法的签名：

	onInflate(ViewStub stub, View inflated);

在VIewStub.OnInflateListener事件的onInflate()方法中，stub为当前待Inflate的ViewStub控件，inflated参数为当前被Inflate的View视图，可以在其中对其进行一些额外的操作。

一旦可见或者解析(visible/inflated)后， 这个ViewStub就不在界面层级结构中了，被所引用的布局替代了，新的ID是 ViewStub的属性 android:inflatedId中设置的值。

##include和ViewStub

从功能上说，这两个控件差不多。区别在与include实时渲染，而ViewStub为延时渲染，我们可以把ViewStub理解为懒惰的include。


##参考

- [Android--UI之ViewStub](http://www.cnblogs.com/plokmju/p/android_viewstub.html)
- [Android Layout Tricks #3: Optimize with stubs](http://android-developers.blogspot.com.ar/2009/03/android-layout-tricks-3-optimize-with.html)
- [Hack 2-延迟加载(Lazy Loading)与避免重复的布局代码](http://blog.csdn.net/kost_/article/details/13170219)
- [《[50.Android.Hacks(2013.6)].Carlos.Sessa.文字版》](http://www.salttiger.com/50-android-hacks/)