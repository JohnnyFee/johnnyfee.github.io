layout: post
title: "Android Debug"
description: ""
category: Android
tags: [android, debug]
---

### [Stetho](http://facebook.github.io/stetho/) 使用 Chrome 来调试你的Android App。

- [使用Chrome来调试你的Android App - stormzhang](http://stormzhang.com/android/2015/03/05/android-debug-use-chrome/)
- [Android 调试神器-Stetho(Facebook出品)的使用](http://blog.csdn.net/sbsujjbcy/article/details/45420475)


## Android wifi无线调试App新玩法ADB WIFI

### 安装

settings->plugins->Browse repositories 搜索框输入ADB WIFI找到插件，安装，重启android Studio后可以看到 导航菜单下Tools->Android->ADB WIFI就算安装成功了。

![](http://upload-images.jianshu.io/upload_images/697635-593a25cede5f4e6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 使用

第一步：首先还是需要用数据线连接电脑，如下图：

![](http://upload-images.jianshu.io/upload_images/697635-acc449af566d7f11.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第二步：找到ADB WIFI菜单，如下图：

![](http://upload-images.jianshu.io/upload_images/697635-99889c26669b68f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第三步：运行ADB Restart(Ctrl+Alt+Shift+R）
第四步：运行ADB USB to WIFI(Ctrl+Alt+Shift+W)
第五步：最后拔掉数据线。

打开LogCat，看看有没有闪动的日志信息，如果有就是成功了。

See [Android wifi无线调试App新玩法ADB WIFI - 简书](http://www.jianshu.com/p/21d1b65d92a4?from=timeline&isappinstalled=0)
