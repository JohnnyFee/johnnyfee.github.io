---
layout: post
title: "Qt WebView"
description: ""
category: Qt
tags: [qt, webview]
---
### 
“我们将在Chromium基础之上建立未来的Web引擎——Qt WebEngine。Qt 5.2发布之后，我们将会集中精力开发新的Qt Web Engine。如果您需要让您的应用或设备支持所有最新最好的HTML5特性，在我们发布了您所需要的API特性时，您就应该考虑移植到Qt WebEngine。第一个完整支持的版本有可能同明年春季的Qt 5.3一起发布。第一个版本我们计划使新的Qt WebEngine模块支持Windows、Mac OS X、Linux和嵌入式Linux。”——[Qt将引入Qt WebEngine | Qt Chinese blog](http://blog.qt.digia.com/cn/2013/09/25/introducing-the-qt-webengine/)

<!--more-->

更新的发展趋势请参考：[QtWebEngine | Qt Wiki | Qt Project](http://qt-project.org/wiki/QtWebEngine)

- [pwnall / chromeview](https://github.com/pwnall/chromeview) Android WebView implementation that uses the latest Chromium code.


QtWebKit主要用于显示网页的本地应用（Web Content in Native Applications）和浏览器插件（Thin Clients）。对于后者，使用

## 通信

- [Qt QWEBview JavaScript callback - Stack Overflow](http://stackoverflow.com/questions/4975658/qt-qwebview-javascript-callback)

## QtScript

QtScript脚本语言基于ECMA Script 3标准(ECMA-262)，可用于C++和JavaScript相互通信。

### Get Started
Qt应用程序中使用Qt脚本时，要在工程文件(.pro)中添加:

    QT += script

使用Qt Script API之前，C++代码中还要包含头文件QtScript：

    #include <QtScript>

QScriptEngine类为程序提供一个嵌入式脚本环境。一个应用程序中可以添加多个脚本引擎；每一个引擎都是一个轻量级自包含的虚拟机。通过调用脚本引擎的evaluate()函数可以执行脚本，下面是一个简单例子：

    QScriptEngine engine;
    QScriptValue result = engine.evaluate("(1+2)*3");
    qDebug() << "Result as float:" << result.toNumber();

参考：[顺利应用脚本QtScript - Qt进阶](http://www.thisisqt.com/forum/viewthread.php?tid=317)

## JavaScript 

- [Qt化的JavaScript | Qt Chinese blog](http://blog.qt.digia.com/cn/2013/05/17/qt%e5%8c%96%e7%9a%84javascript/)
- [Category:Developing_with_Qt -> QtWebKit](http://qt-project.org/wiki/Category:Developing_with_Qt::QtWebKit)

### Reference

- [Qt之QtScript（一） - liuhongwei123888的专栏](http://blog.csdn.net/liuhongwei123888/article/details/6162159)
- [Qt之QtWebKit(二) - liuhongwei123888的专栏](http://blog.csdn.net/liuhongwei123888/article/details/6137094)

## FAQ

### 添加 QT 对象到Windows

If you want to ensure that your QObjects remain accessible after loading a new URL, you should add them in a slot connected to the `javaScriptWindowObjectCleared()` signal.

    QWebFrame *mainFrame = webview->page()->mainFrame();
    if(mainFrame == NULL)
    {
        return false;
    }

    connect(mainFrame, SIGNAL(javaScriptWindowObjectCleared()),
            this, SLOT(sltReBind()));
    mainFrame->addToJavaScriptWindowObject("landi", this, QScriptEngine::QtOwnership);

### 隐藏滚动条

要隐藏一个QWebView的滚动条，就这样做：

    view->page()->mainFrame()->setScrollBarPolicy(Qt::Horizontal, Qt::ScrollBarAlwaysOff);

垂直方向的滚动条也是同理。

参考：[How to disable the scrollbar of QWebView](http://developer.nokia.com/community/discussion/showthread.php/212357-How-to-disable-the-scrollbar-of-QWebView)

### scroll to bottom
How Can I auto scroll to bottom of page using QWebView?

    webView->page()->mainFrame()->setScrollBarValue(Qt::Vertical, webView->page()->mainFrame()->scrollBarMaximum(Qt::Vertical));

或者：

    mainFrame()->scroll(size.width(), size.height());

参考： [QWebView autoscroll to bottom](http://www.qtcentre.org/threads/30047-QWebView-autoscroll-to-bottom)

或者：

    QPoint currentPosition = webView->page()->mainFrame()->scrollPosition();
    if (currentPosition.y() == webView->page()->mainFrame()->scrollBarMinimum(Qt::Vertical))
    {
      qDebug() << "Start Scroll Position";
    }
    if (currentPosition.y() == webView->page()->mainFrame()->scrollBarMaximum(Qt::Vertical))
    {
      qDebug() << "End Scroll Position";
    }

参考：[QWebView - Scrolling / PageDown](http://qt-project.org/forums/viewthread/21250)

## Reference

- [WebKit in Qt](https://qt-project.org/doc/qt-4.8/qtwebkit.html)
- [Category:Developing_with_Qt -> QtWebKit](http://qt-project.org/wiki/Category:Developing_with_Qt::QtWebKit)
- [QTWebkit解构](http://www.cnblogs.com/lotushy/archive/2012/03/05/qtwebkit-qt-api.html)
- [thoughtbot/capybara-webkit](https://github.com/thoughtbot/capybara-webkit) 这是个什么玩意儿？看里边的代码比较亲切。

## TODO

- [Models and Views: Alert WebView Example](http://qt-project.org/doc/qt-4.8/declarative-modelviews-webview-alerts.html)
- [qt browser 加载一个webview过程-debianlm-ChinaUnix博客](http://blog.chinaunix.net/uid-10225517-id-2968421.html)
- [Qt WebKit - how to suppress JavaScript confirm method execution till reply from other process](http://qt-project.org/forums/viewthread/19023)
