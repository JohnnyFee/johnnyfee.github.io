---
layout: post
title: "Qt QGraphicsWebView "
description: ""
category: Qt
tags: [qt, webkit]
--- 

The QGraphicsWebView class allows Web content to be added to a [GraphicsView](http://qt-project.org/doc/qt-4.8/graphicsview.html#graphicsview).

An instance of this class renders Web content from a URL or supplied as data, using features of the [QtWebKit](qtwebkit.html) module.

If the width and height of the item are not set, they will default to 800 and 600, respectively. If the Web page contents is larger than that, scrollbars will be shown if not disabled explicitly.

Many of the functions, signals and properties provided by [QWebView](http://qt-project.org/doc/qt-4.8/qwebview.html) are also available for this item, making it simple to adapt existing code to use QGraphicsWebView instead of [QWebView](qwebview.html).

The item uses a [QWebPage](qwebpage.html) object to perform the rendering of Web content, and this can be obtained with the [page](qgraphicswebview.html#page)() function, enabling the document itself to be accessed and modified.

As with [QWebView](qwebview.html), the item records the browsing history using a [QWebHistory](qwebhistory.html) object, accessible using the [history](qgraphicswebview.html#history)() function. The [QWebSettings](qwebsettings.html) object that defines the configuration of the browser can be obtained with the [settings](qgraphicswebview.html#settings)() function, enabling features like plugin support to be customized for each item.

**See also**[QWebView](qwebview.html) and [QGraphicsTextItem](qgraphicstextitem.html).

参考：[QGraphicsWebView Class Reference | Documentation | Qt Project](http://qt-project.org/doc/qt-4.8/qgraphicswebview.html#details)

## Reference

- [WebKit is "gone"](https://qt-project.org/forums/viewthread/23506)
- [QtWebKit Goes Mobile](http://qt-project.org/doc/qt-4.8/qtwebkit-goes-mobile.html)
- [html - How to use a QGraphicsWebView? - Stack Overflow](http://stackoverflow.com/questions/3142132/how-to-use-a-qgraphicswebview)
- [Kenneth Christiansen's code posts](http://codeposts.blogspot.com/)
- [QtWebKitTiling – WebKit](http://trac.webkit.org/wiki/QtWebKitTiling)
- [QtWebKit – WebKit](http://trac.webkit.org/wiki/QtWebKit)
- [QtWebKitTiling – WebKit](http://trac.webkit.org/wiki/QtWebKitTiling)

## Demo

- [jPlayer : HTML5 Audio & Video for jQuery](http://www.jplayer.org/)