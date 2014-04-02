---
layout: post
title: "Qt QGraphicsWebView "
description: ""
category: Qt
tags: [qt, webkit]
--- 

A lot of effort has been put into [QtWebKit](http://qt-project.org/doc/qt-4.8/qtwebkit.html) to make it attractive for use on mobile devices.

The goal of this tutorial is to help you understand the mobile features and how to make the best of them, in other words, how to create a good mobile web view that can be used on touch devices.

If you want to target mobile devices you should consider using [QGraphicsWebView](http://qt-project.org/doc/qt-4.8/qgraphicswebview.html) instead of [QWebView](http://qt-project.org/doc/qt-4.8/qwebview.html). Since [QWebView](http://qt-project.org/doc/qt-4.8/qwebview.html) is based on the [QWidget](http://qt-project.org/doc/qt-4.8/qwidget.html) system, it cannot easily support __rotation, overlays, hardware accelerated compositing and tiling__. If you need a [QWidget](http://qt-project.org/doc/qt-4.8/qwidget.html) anyway, you can always construct a [QGraphicsView](http://qt-project.org/doc/qt-4.8/qgraphicsview.html) (which is a [QWidget](http://qt-project.org/doc/qt-4.8/qwidget.html)) with a [QGraphicsWebView](http://qt-project.org/doc/qt-4.8/qgraphicswebview.html) inside.


The QGraphicsWebView class allows Web content to be added to a [GraphicsView](http://qt-project.org/doc/qt-4.8/graphicsview.html#graphicsview).

An instance of this class renders Web content from a URL or supplied as data, using features of the [QtWebKit](http://qt-project.org/doc/qt-4.8/qtwebkit.html) module.

If the width and height of the item are not set, they will default to 800 and 600, respectively. If the Web page contents is larger than that, scrollbars will be shown if not disabled explicitly.

Many of the functions, signals and properties provided by [QWebView](http://qt-project.org/doc/qt-4.8/qwebview.html) are also available for this item, making it simple to adapt existing code to use QGraphicsWebView instead of [QWebView](qwebview.html).

The item uses a [QWebPage](http://qt-project.org/doc/qt-4.8/qwebpage.html) object to perform the rendering of Web content, and this can be obtained with the [page](qgraphicswebview.html#page)() function, enabling the document itself to be accessed and modified.

As with [QWebView](http://qt-project.org/doc/qt-4.8/qwebview.html), the item records the browsing history using a [QWebHistory](http://qt-project.org/doc/qt-4.8/qwebhistory.html) object, accessible using the [history](http://qt-project.org/doc/qt-4.8/qgraphicswebview.html#history)() function. The [QWebSettings](http://qt-project.org/doc/qt-4.8/qwebsettings.html) object that defines the configuration of the browser can be obtained with the [settings](http://qt-project.org/doc/qt-4.8/qgraphicswebview.html#settings) function, enabling features like plugin support to be customized for each item.

Loading, rendering, and laying out are blocking operations. Though barely noticeable on desktop machines, these operations can block for a long time on a mobile device, letting the user believe the application has become unresponsive. Additionally, scrolling will also stall when the user uses his fingers to scroll, leading to a bad user experience.

One way to overcome this issue, is to do all loading, laying out and painting (basically all non-UI related work) in another thread or process, and just blit the result from the web process/thread to the UI. __There is research in progress to enable this for a future version of QtWebKit, using WebKit2__, but for now, freezing the backing store can help when performing a zooming operation, for instance. This will be discussed later, in the Enabling the Tiling section.

参考：

- [QGraphicsWebView Class Reference](http://qt-project.org/doc/qt-4.8/qgraphicswebview.html#details)
- [QtWebKit Goes Mobile](http://qt-project.org/doc/qt-4.8/qtwebkit-goes-mobile.html)

## Quick Start

	int main(int argc, char **argv)
	 {
	     QApplication app(argc, argv);
	     const int width = 640;
	     const int height = 480;

	     QGraphicsScene scene;

	     QGraphicsView view(&scene);
	     view.setFrameShape(QFrame::NoFrame);
	     view.setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
	     view.setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);

	     QGraphicsWebView webview;
	     webview.resize(width, height);
	     webview.load(QUrl("http://doc.qt.nokia.com/"));

	     scene.addItem(&webview);

	     view.resize(width, height);
	     view.show();

	     return app.exec();
	 }

## Reference

- [html - How to use a QGraphicsWebView? - Stack Overflow](http://stackoverflow.com/questions/3142132/how-to-use-a-qgraphicswebview)
- [Kenneth Christiansen's code posts](http://codeposts.blogspot.com/)
- [QtWebKitTiling – WebKit](http://trac.webkit.org/wiki/QtWebKitTiling)
- [QtWebKit – WebKit](http://trac.webkit.org/wiki/QtWebKit)
- [QtWebKitTiling – WebKit](http://trac.webkit.org/wiki/QtWebKitTiling)

## Demo

- [jPlayer : HTML5 Audio & Video for jQuery](http://www.jplayer.org/)