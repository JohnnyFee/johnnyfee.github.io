---
layout: "post"
title: "Android Process"
date: "2016-11-26 15:58"
categories: Android
---

## 进程

### 在 AndroidManifest中开启一个新进程

一个应用使用了多进程相当于两个不同的应用使用了SharedUID模式，能访问data目录，组件数据库之类的，但是不能共享内存里的数据（变量）。

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bigmercu.ipc">
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:process=":bigmercu"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name=".Main2Activity"
            android:process=":remote"/>
        <activity android:name=".Main3Activity"
            android:process="com.bigmercu.ipc.remote"></activity>
    </application>
</memanifest>
```

### 两个命令查看当前进程

可以在 adb shell中查看当前的进程 命令：

```
adb shell dumpsys activity|grep process keyword
```

```
shell@A0001:/ $ dumpsys activity|grep com.bigmercu.ipc
mFocusedActivity: ActivityRecord{80b19ea u0 com.bigmercu.ipc/.Main3Activity t278}
  Proc # 0: fore  F/A/T  trm: 0 15311:com.bigmercu.ipc.remote/u0a80 (top-activity)
  Proc # 1: prev  B/ /LA trm: 0 15268:com.bigmercu.ipc:remote/u0a80 (previous)
  Proc # 2: cch   B/ /CA trm: 0 15096:com.bigmercu.ipc:bigmercu/u0a80 (cch-act)
mPreviousProcess: ProcessRecord{f1eddfe 15268:com.bigmercu.ipc:remote/u0a80}
```

另外一种命令：linux的查看进程命令

```
ps|grep process keyword
```

```
shell@A0001:/ $ ps|grep com.bigmercu.ipc
u0_a80    15096 269   887276 42216 sys_epoll_ 00000000 S com.bigmercu.ipc:bigmercu
u0_a80    15268 269   890384 43520 sys_epoll_ 00000000 S com.bigmercu.ipc:remote
u0_a80    15311 269   906924 44420 sys_epoll_ 00000000 S com.bigmercu.ipc.remote
```

两组不同的命令都找出了当前程序的进程.也可以在Android Studio中看到。如图：

![a](http://bigmercu.top/2016/06/08/%E4%B8%89%E6%9E%AA%E5%B9%B2%E6%8E%89IPC%E6%9C%BA%E5%88%B6%E4%B9%8B%E4%B8%80/a.png)

### 进程直接共享静态变量问题

因为Android为每个应用分配了一个独立的虚拟机,也就是为每个进程分配一个独立的虚拟机,每个虚拟机有不同的地址空间.
我写了一个UIDmanager 如下

```
public class uidManager {
    public static int uid = 1;
}
```

总所周知，类的静态变量可以在类中共享，在`MainActivity  process[:bigmercu]=[android.bigmerci.ipc:bigmercu]`中给uid赋值2，打印观察输出结果为2，如果是一般的类，这样已经更改了类中静态变量的值，
因为静态变量在类中共享，相当于类里面的全局变量。

这时在另一个Activity `Main2Activity process[com.bigmercu.ipc:remote]`中打印uid，值为1。

![b](http://bigmercu.top/2016/06/08/%E4%B8%89%E6%9E%AA%E5%B9%B2%E6%8E%89IPC%E6%9C%BA%E5%88%B6%E4%B9%8B%E4%B8%80/b.png)

![c](http://bigmercu.top/2016/06/08/%E4%B8%89%E6%9E%AA%E5%B9%B2%E6%8E%89IPC%E6%9C%BA%E5%88%B6%E4%B9%8B%E4%B8%80/c.png)

由此得出结论，在进程之间不能共享类静态变量。

所以，使用多进程会造成以下几个方面问题：

* 静态成员和单例模式完全失效（因为地址空间不同）
* 线程同步机制完全失效（因为地址空间不同）
* SharedPreferences可靠性下降（并发读写XML自然有问题）。
* Application可能会被多次创建 （创建新进程相当于启动应用过程再次执行，和之前的进程不共享Application）
