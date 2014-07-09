---
layout: post
title: "Html5 Storage"
category: Html5
tags: [html5, storage]
--- 

## Client Storage

QT 目前支持 WebStorage 和 WebSQL Databases。

While common local- or session-based databases are capable of storing complex data structures, [QtWebKit](qtwebkit.html)-based browsers can also rely upon the WebSQL standard, which brings SQLite-based structured database functionality, typically deployed on servers, to client browser applications. Based on SQLite version 3.6.19, WebSQL is appropriate for data-intensive applications requring complex queries rather than simple key/value access.

## Enable LocalStorage

在 QT 4.8 可以通过以下方式启动 LocalStorage：

    QWebSettings* settings = QWebSettings::globalSettings();
    // 支持LocalStorage
    settings->setAttribute(
            QWebSettings::LocalStorageEnabled, true);



<!--more-->