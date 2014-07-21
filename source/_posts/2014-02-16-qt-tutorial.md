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

### Visual Studio 安装

- [Setting Up Visual Studio 2012, Qt, and OpenGL - YouTube](http://www.youtube.com/watch?v=cLvxLkgHqQs)
- [详解Visual Studio 2010中的Qt配置使用 - 51CTO.COM](http://developer.51cto.com/art/201012/238726.htm)
- [在Visual Studio中集成使用 Qt Opensource 版本](http://blog.csdn.net/lonelyforest/article/details/4559954)

## Quick Start

参考：[Qt开发基础 - hai200501019的专栏](http://blog.csdn.net/hai200501019/article/details/17613411)

Qt主程序主要有两种，一是Qt控制台程序，而是Qt  GUI应用程序。

### Qt控制台程序

Qt控制台程序很少用到，这里仅仅简单了解。

    int main( int argc, char *argv[]){
        QCoreApplication a(argc, argv);
        cout<< "helloworld" <<endl;
        return a.exec();
    }

以上代码就是简单的Qt控制台程序，创建了一个QCoreApplication 对象a，并输出hello world，最后a调用.exec()。QCoreApplication为非GUI的Qt程序提供主事件循环，负责处理和派发操作系统和其他事件，调用exec()才能启动事件循环。如果去掉第一和第三行代码，其实就是一个普通的C++程序，一样可以运行。

    int main(int argc, char *argv[])
    {
           //QCoreApplicationa(argc, argv);
           cout<<"helloworld"<<endl;
           //returna.exec();
    }

### Qt GUI应用程序

    int main( int argc, char *argv[])
    {
        QApplication a(argc, argv);
        QLabel label( "helloworld" );
        label.show();
        return a.exec();
    }

和Qt控制台程序类似，需要创建一个QApplication对象，并调用exec()。QApplication继承QCoreApplication，用于管理GUI程序的控制流和主要的设置。每个GUI程序都只能有一个QApplication对象，而且必须最先被创建。

## Tutorial

- [Qt学习笔记 - hai200501019的专栏](http://blog.csdn.net/hai200501019/article/category/1316645/1)
- [Qt – 部落格 by Q-Kevin](http://www.qkevin.com/qt)

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

## i18n

- [Qt Weekly #2: Localizing Qt Quick Apps](http://blog.qt.digia.com/blog/2014/03/19/qt-weekly-2-localizing-qt-quick-apps/?-weekly-2-localizing-qt-quick-apps)

## Logging

- [Qt Weekly #1: Categorized Logging](http://blog.qt.digia.com/blog/2014/03/11/qt-weekly-1-categorized-logging/?-weekly-1-categorized-logging)

## 调试

- [Enabling Web Inspector in QtWebKit - Palomino Labs Blog](http://blog.palominolabs.com/2012/09/19/enabling-web-inspector-in-qtwebkit/)

## Android

- [Qt Weekly #3: Qt for Android – Tips and Tricks](http://blog.qt.digia.com/blog/2014/03/26/qt-weekly-3-qt-for-android-tips-and-tricks/?-weekly-3-qt-for-android-tips-and-tricks)

## Data Structure

- [Qt容器类 - hai200501019的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/hai200501019/article/details/9247673)

## Settings

- [QSettings保存程序设置](http://blog.csdn.net/hai200501019/article/details/11179967)

## Web Service

- [QtSoap调用Web Service](http://blog.csdn.net/hai200501019/article/details/19755987)

## State Machine

- [Qt状态机框架](http://blog.csdn.net/hai200501019/article/details/9316415)

## Other

- [Qt属性系统 - hai200501019的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/hai200501019/article/details/9204215)
- [Qt国际化相关类 - hai200501019的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/hai200501019/article/details/9202807)

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

### 读取xml

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

### Storing pointer in QVariant

- [Storing pointer in QVariant](http://blog.bigpixel.ro/2010/04/storing-pointer-in-qvariant/)

### Undefined reference to 'vtable for xxx'

删除编译的所有东西，重新编译。

### QTCreator copy files to output directory with INSTALLS

[qt - QTCreator copy files to output directory with INSTALLS - Stack Overflow](http://stackoverflow.com/questions/11593165/qtcreator-copy-files-to-output-directory-with-installs)

### QVariant保存指针数据

参考 [QVariant保存指针数据](http://windrocblog.sinaapp.com/?p=1166)

QVariant默认无法保存指针数据，因为以`void *`为参数的QVariant构造函数是私有的。

但通过QT提供的Meta Type机制，可以将任意指针存放到QVariant中。

需要使用 `Q_DECLARE_METATYPE` 宏注册类型。

    Q_DECLARE_METATYPE(QStandardItemModel*)

之后，就可以使用QVariant::fromValue存放数据，使用QVariant::value获取数据了。

    return QVariant::fromValue(model_);
    //....
    QStandardItemModel* model = some_value.value();

使用QVariant和标识项目中数据类型的Qt::ItemDataRole，可以方便地将任意数据存放进QT提供的预定义模型中。

比如，在同一个QStandardItem中使用不同的Role，存放多个数据。

自定义的数据角色

    enum CustomItemRole
    {
        LevelModelRole =  Qt::UserRole + 1000,
        TimeModelRole = Qt::UserRole + 1010,
        FileModelRole = Qt::UserRole + 1020
    };

存放特定角色的数据

    type_of_level_item->setData(QVariant::fromValue(level_list_model),LevelModelRole);

获取特定角色的数据

    QVariant data = item->data(Qt::LevelModelRole);

因为QStandardItemModel以行为单位建立树形结构，所以要实现更复杂的树形结构，可以使用自定义的DataRole来存储数据。

## Reference

### Example

- [QtDoc 5.0: Qt Examples And Tutorials](http://qt-project.org/doc/qt-5.0/qtdoc/qtexamplesandtutorials.html)