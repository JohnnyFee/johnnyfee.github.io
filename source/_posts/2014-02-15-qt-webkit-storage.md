---
layout: post
title: "Html5 Storage"
category: Html5
tags: [html5, storage]
--- 

## Client Storage

QT 目前支持 WebStorage 和 WebSQL Databases。

## Enable LocalStorage

在 QT 4.8 可以通过以下方式启动 LocalStorage：

    QWebSettings* settings = QWebSettings::globalSettings();
    // 支持LocalStorage
    settings->setAttribute(
            QWebSettings::LocalStorageEnabled, true);



<!--more-->