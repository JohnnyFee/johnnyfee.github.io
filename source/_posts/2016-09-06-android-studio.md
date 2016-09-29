layout: post
title: "Android Studio"
description: ""
category: Android
tags: [android]
---

## Tutorial

[Android Studio 入门指南 - 简书](http://www.jianshu.com/p/36cfa1614d23)

##  Android Studio logcat 设置 缓存大小 ，增加logcat条数

See [Android Studio logcat 设置 缓存大小 ，增加logcat条数](http://blog.csdn.net/senyangs/article/details/50067983)

logcat 经常刷新过快，冲掉之前的数据，可以改下logcat的缓存（缓冲区）大小，可以显示更多行避免被冲掉：
文件：
安装根目录/bin/idea.properties

添加一行

```
idea.cycle.buffer.size=1024000  
```

## Android Studio －修改LogCat的颜色

[Android Studio －修改LogCat的颜色＊美爆了＊ - JavAndroid - 博客频道 - CSDN.NET](http://blog.csdn.net/yy1300326388/article/details/45825123)

## 打开 DDMS

1. Tools/Android/Enable AdbIntegration
2. Tools/Android/Android Device Monitor

## Tools

- [pbreault/adb-idea](https://github.com/pbreault/adb-idea) A plugin for Android Studio and Intellij IDEA that speeds up your day to day android development.
