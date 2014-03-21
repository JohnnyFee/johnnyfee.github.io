---
layout: post
title: "Qt Tutorial"
description: ""
category: Qt
tags: [qt, tutorial]
---
### 
## Tutorial

- [Qt开发者专区](http://qt.csdn.net/)
- [Documentation | Qt Project](https://qt-project.org/doc/)
- [Qt - Cross-platform application and UI development framework](http://qt.digia.com/)
- [Qt Chinese blog](http://blog.qt.digia.com/cn/)
- [Qt – 部落格 by Q-Kevin](http://www.qkevin.com/qt)
- [Qt - jokerjhm的专栏](http://blog.csdn.net/jokerjhm/article/category/839680/3)
- [qt4 - luck_good的专栏 - 博客频道](http://blog.csdn.net/luck_good/article/category/924891/1)

## Qt Quick

Qt Quick 是一种高级用户界面技术，使用它可轻松地创建供移动和嵌入式设备使用的动态触摸式界面和轻量级应用程序。三种全新的技术共同构成了 Qt Quick 用户界面创建工具包：一个改进的Qt Creator IDE、一种新增的简便易学的语言 (QML) 和一个新加入 Qt 库中名为 QtDeclarative 的模块，这些使得 Qt 更加便于不熟悉 C++ 的开发人员和设计人员使用。

__教程:__[Qt Quick](http://qt.csdn.net/qtquick/index_4.aspx)

<!--more-->

## Qt Qml

“近9个月来，我们对QML引擎底层做了大量的工作，这在Qt 5.2中已有了一定成效。Qt Qml现在使用我们自己内建的Javascript引擎，而不再依赖V8，因此QtJSBackend动态库已经被移除。新的引擎执行纯Javascript要略慢于V8。”——[Qt 5.2 Alpha可用了 | Qt Chinese blog](http://blog.qt.digia.com/cn/2013/10/04/qt-5-2-alpha-available/)

__控制台调试__：[调试Qt Quick 2 – 控制台API | Qt Chinese blog](http://blog.qt.digia.com/cn/2012/03/08/debugging-qt-quick-2-console-api/)

### UI

- [Qt Quick布局介绍 | Qt Chinese blog](http://blog.qt.digia.com/cn/2013/05/18/introducing-qt-quick-layouts/)
- [Qt Quick新特性概览 | Qt Chinese blog](http://blog.qt.digia.com/cn/2013/06/24/overview-of-the-new-features-in-qt-quick/)

## 调试

- [Enabling Web Inspector in QtWebKit - Palomino Labs Blog](http://blog.palominolabs.com/2012/09/19/enabling-web-inspector-in-qtwebkit/)

## 动画
- [qt4 qml Flipable、Flickable和状态与动画](http://blog.csdn.net/luck_good/article/details/6992795)

## 虚拟键盘

- [New Virtual Keyboard for Qt Enterprise | Qt Blog](http://blog.qt.digia.com/blog/2014/02/04/new-virtual-keyboard-for-qt-enterprise/)

## FAQ

### Qt输出中文的解决办法

在main()中，设置QApplication的到缺省编码方式：

    QApplication app(argc,argv);
    app.setDefaultCodec(QTextCodec::codecForName("GBK"));

或者：

    QTextCodec::setCodecForLocale(    QTextCodec::codecForName("GBK"));
    // 设置tr的编码方式.
    QTextCodec::setCodecForTr(QTextCodec::codecForName("GBK"));

具体的使用：

    const char* pcszStr = "中文化";
    QString s = trUtf8(pcszStr);                              //1
    或则 
    QString s = QString::fromLocal8Bit(pcszStr);   //2

参考：[QT输出中文的解决办法 - 岑西哲的狗窝](http://blog.csdn.net/tony_hrwk/article/details/4906707)

### 获取Qt版本

    qDebug() << QT_VERSION_STR;

###　Q_OBJECT

Q_OBJECT是一个宏，只有加入了Q_OBJECT，你才能使用QT中的signal和slot机制。