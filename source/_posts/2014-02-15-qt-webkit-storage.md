---
layout: post
title: "Html5 Storage"
category: Html5
tags: [html5, storage]
--- 

## Client Storage

QT 目前支持 WebStorage 和 WebSQL Databases。

While common local- or session-based databases are capable of storing complex data structures, [QtWebKit](qtwebkit.html)-based browsers can also rely upon the WebSQL standard, which brings SQLite-based structured database functionality, typically deployed on servers, to client browser applications. Based on SQLite version 3.6.19, WebSQL is appropriate for data-intensive applications requring complex queries rather than simple key/value access.

__Qt for android 本地存储支持情况：__

本地存储技术 | 是否支持
-------------|----
Local Storage |  支持
Web SQL | 支持
IndexedDB  | 不支持


## Enable LocalStorage

```cpp
LandiWebView::LandiWebView(QWidget * parent) : QWebView(parent)
{
    //可执行文件所在的目录
    QDir dirPath = QApplication::applicationDirPath(); 
    QWebSettings* settings  = QWebSettings::globalSettings();

    //开启 LocalStorage 功能
    settings->setAttribute(QWebSettings::LocalStorageEnabled, true);
    //设置 LocalStorage 数据存放路径
    settings->setLocalStoragePath(dirPath.absolutePath());

    //开启 WebSQL  功能
    settings->setAttribute(QWebSettings::OfflineStorageDatabaseEnabled,true);
    //设置 WebSQL 数据存放路径（必须要设置路径，否则无使用 WebSQL 功能）
    settings->setOfflineStoragePath(dirPath.absolutePath());
}
```

<!--more-->