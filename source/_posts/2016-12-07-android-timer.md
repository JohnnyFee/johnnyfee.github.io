---
layout: post
title: "Android Timer"
description: ""
category: Android
tags: [android]
---

在Android开发中，我们常常需要用到计时器，倒计时多少秒后再执行相应的功能，有以下 3 中方法实现。

## CountDownTimer

See [CountDownTimer](https://developer.android.com/reference/android/os/CountDownTimer.html)

该类是个抽象类，如果要使用这个类中的方法，就必须继承这个类实现它内部的抽象方法，该继承的类中通常是存在某个类的内部类中。该类主要功能就是可以我们自己设置倒计时的秒数和时间间隔，且只有一个构造方法，构造函数为：

```java
/** 
* @param millisInFuture 倒计时的总时间, 单位ms 
* @param countDownInterval 倒计时的间隔时间, 单位ms.
*/
public CountDownTimer(long millisInFuture, long countDownInterval);
```

下面的例子，使用 CountDownTimer 实现倒计时10秒，每隔1秒调用一次 `onTick(long millisUntilFinished)` 方法, 倒计时结束时调用 `onFinish()` 方法。

```java
new CountDownTimer(10000, 1000) {

    public void onTick(long millisUntilFinished) {
        LogUtil.i(TAG, "seconds remaining: " + millisUntilFinished / 1000);
    }

    public void onFinish() {
        LogUtil.i(TAG, "done!");
    }
}.start();
```

回调方法中可以直接更新 UI。

```java
// 取消当前的任务
public final void cancel ();

// 当前任务完成的时候回调
public abstract void onFinish ();

// 当前任务每完成一次倒计时间隔时间时回调
public abstract void onTick (long millisUntilFinished);

// 开始当前的任务
public final CountDownTimer start();
```

## Timer

See [Timer](https://developer.android.com/reference/java/util/Timer.html)

## Handler

该方法就是利用我们常说的消息处理器。该方法原理就是在主线程中创建一个Handler消息处理器，然后利用其中的一个 `postDelayed(Runnable r, long delayMillis)`方法，该方法第一个参数需要传入一个 `Runnable` 接口，并实现 `run()`方法，第二个参数就是延迟多少时间将run()方法中的代码通过一个消息发送给消息队列，然后在主线程中执行这个消息中的代码，即是run方法中的代码，从而实现在主线程中更新界面UI。

```java
new Handler().postDelayed(new Runnable() {//在当前线程（也即主线程中）开启一个消息处理器，并在3秒后在主线程中执行，从而来更新UI  
    @Override  
    public void run() {  
        //有关更新UI的代码  
    }  
}, 3000);//3秒后发送       
```

