---
layout: post
title: "Qt Cordova"
description: ""
category: Qt
tags: [qt, cordova]
--- 
##QT 桌面环境搭建

如果你想在Windows上使用QtCreator开发应用，你至少需要安装以下这些东东：

- 编译器。如[MinGW](http://www.mingw.org/) 全称Minimalist GNU For Windows，是个精简的Windows平台C/C++、ADA及Fortran编译器，相比Cygwin而言，体积要小很多，使用较为方便。简而言之，这货就是用来编译和链接C/C++代码的。[了解更多MinGW](http://www.metsky.com/archives/588.html)。当然，除了MinGW，你也可以选择其他编译器，如Microsoft Visual C++ Compiler等。

<!--more-->

- [Qt框架类库](http://qt-project.org/downloads#qt-lib)。 提供 Qt 框架。
- 开发工具。如[Qt Creator](http://qt-project.org/downloads#qt-creator) Qt平台的继承开发工具，当然也可以使用Visual Studio等。

如今，Qt官方为Qt5.2 提供了一个完整的离线安装包，[Qt 5.2.0 for Windows 32-bit (MinGW 4.8, OpenGL, 689 MB)](http://download.qt-project.org/official_releases/qt/5.2/5.2.0/qt-windows-opensource-5.2.0-mingw48_opengl-x86-offline.exe) 同时Windows平台的离线安装包，同时包括MinGW、Qt Library、QtCreator。本人在Windows8 x64上下载了这个离线包，所有都按默认配置，即可成功创建在Windows上运行的项目。

一般，一个Qt版本对应一个MinGW版本，如Qt 5.2.0使用的是MinGW 4.8，而Qt 4.8.5使用的是MinGW 4.4，而官网并不提供MinGW 4.4的下载链接。可以从以下链接下载：

- Nokia Ftp <ftp://ftp.qt.nokia.com/misc/MinGW-gcc440_1.zip>
- Csdn <http://download.csdn.net/detail/vah101/4863585>

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

##Qt Cordova

### 编译cordova-qt

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

###Reference

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


