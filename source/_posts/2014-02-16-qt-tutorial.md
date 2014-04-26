---
layout: post
title: "Qt Tutorial"
description: ""
category: Qt
tags: [qt, tutorial]
--- 

## QT 桌面环境搭建

如果你想在Windows上使用QtCreator开发应用，你至少需要安装以下这些东东：

- 编译器。如[MinGW](http://www.mingw.org/) 全称Minimalist GNU For Windows，是个精简的Windows平台C/C++、ADA及Fortran编译器，相比Cygwin而言，体积要小很多，使用较为方便。简而言之，这货就是用来编译和链接C/C++代码的。[了解更多MinGW](http://www.metsky.com/archives/588.html)。当然，除了MinGW，你也可以选择其他编译器，如Microsoft Visual C++ Compiler等。

- [Qt框架类库](http://qt-project.org/downloads#qt-lib)。 提供 Qt 框架。
- 开发工具。如[Qt Creator](http://qt-project.org/downloads#qt-creator) Qt平台的继承开发工具，当然也可以使用Visual Studio等。

如今，Qt官方为Qt5.2 提供了一个完整的离线安装包，[Qt 5.2.0 for Windows 32-bit (MinGW 4.8, OpenGL, 689 MB)](http://download.qt-project.org/official_releases/qt/5.2/5.2.0/qt-windows-opensource-5.2.0-mingw48_opengl-x86-offline.exe) 同时Windows平台的离线安装包，同时包括MinGW、Qt Library、QtCreator。本人在Windows8 x64上下载了这个离线包，所有都按默认配置，即可成功创建在Windows上运行的项目。

一般，一个Qt版本对应一个MinGW版本，如Qt 5.2.0使用的是MinGW 4.8，而Qt 4.8.5使用的是MinGW 4.4，而官网并不提供MinGW 4.4的下载链接。可以从以下链接下载：

- Nokia Ftp <ftp://ftp.qt.nokia.com/misc/MinGW-gcc440_1.zip>
- Csdn <http://download.csdn.net/detail/vah101/4863585>

<!--more-->

分步安装过程可参考：

 - [Qt 4.8.4 & Qt Creator 2.6.1 安装和配置（Windows）](http://blog.csdn.net/zhzhangjing/article/details/8568290)
 - [windows上安装MinGW 4.4、Qt library 4.8.4和Qt Creator](http://blog.csdn.net/vah101/article/details/8271050)

使用MinGW 4.4的调试器时，可能出现以下错误：

![MinGW 4.4调试器错误](http://johnnyimages.qiniudn.com/mingw-debug-error.png)

网上有个说法是Qt Creator 2.5以上需要使用7.2 IIRC以上的GDB，需要单独下载，总而言之，应该是MinGW的问题。Qt官网提供了编译过程和编译后的下载链接 [QtCreator_Build_Gdb](http://qt-project.org/wiki/QtCreatorBuildGdb)，或者直接从这里下载 [GDB 7.5 binaries](http://download.qt-project.org/development_releases/prebuilt/gdb/)_[download.qt-project.org]_.

下载完成之后，添加该Debugger：工具>选项>构建和运行

![add debugger](http://johnnyimages.qiniudn.com/qt-creator-debug.png)

并将构建套件的Debugger指定为刚才添加的Debugger：工具>选项>构建和运行

![set debugger](http://johnnyimages.qiniudn.com/qt-creator-debugger.png)

现在应该可以正常调试了。

目前以下构建配套可以用：

**Desktop Qt 4.8**

只能按照上述方法单步下载并安装，构建信息如下：

![qt4.8bundle.png](http://johnnyimages.qiniudn.com/qt4.8bundle.png)

**Desktop Qt 5.2.0**

该版本可通过官方的离线安装[Qt 5.2.0 for Windows 32-bit (MinGW 4.8, OpenGL, 689 MB)](http://download.qt-project.org/official_releases/qt/5.2/5.2.0/qt-windows-opensource-5.2.0-mingw48_opengl-x86-offline.exe) 包安装。

![qt5.2bundle.png](http://johnnyimages.qiniudn.com/qt5.2bundle.png)

## Tutorial

### Official

- [QtDoc 5.0: All Modules | Documentation | Qt Project](http://qt-project.org/doc/qt-5.0/qtdoc/modules.html)
- [Qt 4.8 | Documentation | Qt Project](http://qt-project.org/doc/qt-4.8/)

### Other

- [Wiki Home SimplifiedChinese | Qt Wiki | Qt Project](http://qt-project.org/wiki/Wiki_Home_SimplifiedChinese)
- [Qt开发者专区](http://qt.csdn.net/)
- [Documentation | Qt Project](https://qt-project.org/doc/)
- [Qt - Cross-platform application and UI development framework](http://qt.digia.com/)
- [Qt Chinese blog](http://blog.qt.digia.com/cn/)
- [Qt – 部落格 by Q-Kevin](http://www.qkevin.com/qt)
- [Qt - jokerjhm的专栏](http://blog.csdn.net/jokerjhm/article/category/839680/3)
- [qt4 - luck_good的专栏 - 博客频道](http://blog.csdn.net/luck_good/article/category/924891/1)

## Qt Quick

Qt Quick 是一种高级用户界面技术，使用它可轻松地创建供移动和嵌入式设备使用的动态触摸式界面和轻量级应用程序。三种全新的技术共同构成了 Qt Quick 用户界面创建工具包：一个改进的Qt Creator IDE、一种新增的简便易学的语言 (QML) 和一个新加入 Qt 库中名为 QtDeclarative 的模块，这些使得 Qt 更加便于不熟悉 C++ 的开发人员和设计人员使用。

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

### 设置编码

    QTextCodec *defaultCode = QTextCodec::codecForName("GBK");
    QTextCodec::setCodecForCStrings(defaultCode);
    QTextCodec::setCodecForLocale(defaultCode);
    QTextCodec::setCodecForTr(defaultCode);

### 路径xml

本代码来自于[apache/cordova-qt](https://github.com/apache/cordova-qt)项目的cordova.cpp的loadFinished方法。

    // 获取工程目录
    QDir m_workingDir = QApplication::applicationDirPath();

    // 基于QDir建立目录对象。
    QDir xmlDir( m_workingDir );

    // 切换到xml目录
    xmlDir.cd( "xml" );

### QVariant to `QObject*`

    // From QVariant to QObject *
    QObject * obj = qvariant_cast<QObject *>(item->data(Qt::UserRole));
    // from QObject* to myClass*
    myClass * lmyClass = qobject_cast<myClass *>(obj);

参考：[QVariant to QObject* - Stack Overflow](http://stackoverflow.com/questions/3887064/qvariant-to-qobject)

## Reference

### Example

- [QtDoc 5.0: Qt Examples And Tutorials](http://qt-project.org/doc/qt-5.0/qtdoc/qtexamplesandtutorials.html)