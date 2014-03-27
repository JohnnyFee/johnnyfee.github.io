---
layout: post
title: "Qt Cordova"
description: ""
category: Qt
tags: [qt, cordova]
--- 

## 编译cordova-qt

Qt Cordova对应的开源工程为：[apache/cordova-qt](https://github.com/apache/cordova-qt)，Clone下来之后，导入到Qt Creator中。

我使用的版本为：

- Qt Creator 3.0.0
- Qt 4.8.5
- MinGW 4.4

导入工程后，如果出现以下错误：

    分析文件D:/temp/cordova-qt/cordovaqt.pro时发生错误，放弃中。

到“项目>”中手动配置一下工程：

![Configure Project](http://johnnyimages.qiniudn.com/qt-configure-project.png)

修改cordovaqt.pro文件，注释其中初src/plugins/下除console插件的其他所有插件。

构建，运行。

<!--more-->

## 源码分析



##Reference

- [PhoneGap for Qt 5](http://qt-project.org/wiki/PhoneGap-for-Qt-5)

##FAQ

###[copydeploymentfolders] Error 4

构建成功后，运行时出现以上错误很可能是因为中文路径问题，把“项目/构建目录”的“桌面”改成“desktop”即可，如：

![Error 4](http://johnnyimages.qiniudn.com/qt-error4.png)

###network error

运行时，控制台出现 “network error”，导致该错误的语句外为：

    view->setSource(QUrl(QString("%1/qml/main.qml").arg(Cordova::instance()->workingDir())));

可能是因为在QUrl的构造函数的参数中使用`%1`，而你的开发环境不是Unix类型的系统，从而导致路径不对。可以使用以下方法解决：

    view->setSource(QUrl("qml/main.qml"));

另外，On the cordova.cpp you must also put:

    m_workingDir = QApplication::applicationDirPath();
    m_workingDir.cdUp();

Otherwise cordova cannot load your 'xml' and 'www' dir.

参考 ： ["network error" while building cordova for symbian](http://developer.nokia.com/community/discussion/showthread.php/233991-quot-network-error-quot-while-building-cordova-for-symbian)


