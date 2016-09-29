layout: post
title: "Android State Storage & Revovery"
description: ""
category: Android
tags: [android]
---

From [Android中Activity执行restart过程中涉及到的四种数据存储恢复的方法](http://blog.csdn.net/iispring/article/details/49681699)

我们知道，当Configuration Change发生的时候（比如横竖屏切换等），会导致Activity重启，即先destroy，然后会restart，一般情况下restart的时间比较短，为了保证一致的用户体验，我们应该在Activity重启前将一些数据存储下来，然后在restart的时候重新根据这些数据更新UI。当然你可能想将这些数据写到物理文件或数据库中，但是这样有缺点，因为IO操作时耗时操作，会影响restart的过程，甚至导致ANR程序无响应，本文将介绍几种将数据缓存在内存中以便restart时进行恢复的方法。

<!-- more -->

## onSaveInstanceState

`Activity` 具有onSaveInstanceState回调方法，如果onSaveInstanceState方法被调用了，那么该回调方法一定是在onStop之前被调用的，但是不能保证是在onPause之前还是之后被调用。一般在此处将UI持久化的一些信息存入到Bundle中，然后在Activity重新创建执行onCreate(Bundle)或onRestoreInstanceState(Bundle)的时候再根据Bundle恢复。Activity.onSaveInstanceState的默认实现是遍历层级结构中的所有**含有id属性**的View，然后依次调用View.onSaveInstanceState()方法。onSaveInstanceState是android.view.View的方法，所以所有继承自View的widget都有该方法。View.onSaveInstanceState()会存储View自身的一些信息，比如存储当前选择的哪个item等。

由于Activity.onSaveInstanceState方法只会遍历Activity中含有id属性的View对其UI信息进行存储，所以我们我们在编码时最好给View都添加id属性，这样可以使其在上述方法执行的时候调用View的onSaveInstanceState方法，从而存储该View的UI信息。

如果要重写onSaveInstanceState方法，首先要调用super.onSaveInstanceState(bundle)。重写的时候不应该在此处存储持久化的数据（比如要向SQLite数据中写入持久数据），应该在该方法中只存储一些与UI相关的瞬时变量，比如有时候某些成员变量也存储着一些和UI相关的信息，这时候就可以在onSaveInstanceState中存储下来。   
Bundle不是为存储大量数据（比如bitmap）而设计的，并且Bundle中的数据必须经过序列化与反序列化， 因此在onSaveInstanceState不应该存储大量数据。

onSaveInstanceState是在Activity将要被killed并且预测过段时间会重新create这样条件下才会被调用。也就是说onSaveInstanceState之所以被调用是为了Activity在销毁后进行重新生成进行restore的，如果Android Framework认为不满足需要进行onSaveInstanceState的条件，那么就不会调用该方法，具体来说：

1.  如果用户显式地通过back键退出了程序，那么不会调用onSaveInstanceState方法。

2.  如果开始打开了Activity A，然后打开了Activity B，对A进行了部分遮罩，这时候会触发A的onPause方法，但是Framework可能会避免调用A的onSaveInstanceState方法（如果在B的生命周期内A没有被kill掉）。

## 利用Fragment存储大量数据

由于onSaveInstanceState不适合存储大量的数据，所以如果在Activity销毁重建恢复数据的时候就不能使用该onSaveInstanceState毁掉函数存取大量数据了。

由于configuration change导致Activity销毁的时候，Activity中标记为保留的Fragment不会销毁，所以可以利用该特性实现存取数据，具体方法如下：

1.  扩展Fragment类，并定义好相应字段存取数据，对外暴露出设置数据和获取数据的方法，比如setData和getData

2.  在Fragment的onCreate方法中调用方法setRetainInstance(true)，标记该Fragment为保留的

3.  将该Fragment加入到Activity中

4.  在Activity的onDestroy方法中将activity的中需要保存的数据调用Fragment中上述定义的setData方法，将其保存在Fragment中

5.  在Activity销毁重新生成执行onCreate的时候，重新从Fragmet中调用getData获取之前保存的数据

6.  最后需要注意内存泄露的发生


## 考虑使用Loader缓存数据

Android中可以用Loader和LoaderManager异步获取数据，且Loader机制有个很好的特性：可以在Activity执行restart的过程中继续持有数据，也就是说，如果Loader一开始就已经加载了数据，那么在Activity进行了restart之后，Activity会从Loader中立即获取到之前缓存的数据，而无需再次用LoaderManager加载数据，这样就能实现restart之后数据恢复的功能。

如果对Loader机制不了解，可以参见以下两篇博文：   
[Android中Loader及LoaderManager的使用（附源码下载）](http://blog.csdn.net/iispring/article/details/48834767)   
[深入源码解析Android中Loader、AsyncTaskLoader、CursorLoader、LoaderManager](http://blog.csdn.net/iispring/article/details/48958117)

## 使用静态变量存储数据

我们知道Java中如果一个类的成员变量是static的，那么该static成员变量的生命周期就与该类的生命周期相同，具体来说：当Java虚拟机加载该类的时候，就会给该类的static成员变量分配内存空间；当Java虚拟机卸载该类的时候，该类的static成员变量的内存才会被回收。Android也具有该特性，假设我们的Activity中有一个static的成员变量，在Activity进行restart的过程中，Java虚拟机没有卸载掉该Activity，因为在后面的restart的过程中会用到，所以在restart过程中，该Activity的static的成员变量的内存没有被回收，这样我们就可以在restart之前往该Activity的static成员变量中写入值，在restart之后从Activity的static成员变量中读取值，这样就跨restart过程持有了数据。使用该特性也要注意，在非restart导致的destroy的时候，我们需要将Activity的static成员变量赋值为null，防止内存泄露。