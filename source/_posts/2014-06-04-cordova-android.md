---
layout: post
title: "Cordova For Android"
category: Cordova
tags: [phonegap, cordova, android]
--- 

## Setup

如果你想让 Cordova 的以 Android 为中心的 shell 工具和 SDK 协作，从 [cordova.apache.org](http://cordova.apache.org/) 下载 Cordova。否则，如果你计划使用跨平台的 CLI 工具，请忽略这部分内容。

- 安装 Android SDK [developer.android.com/sdk](http://developer.android.com/sdk/) 安装方法参考[这里](http://developer.android.com/sdk/installing/bundle.html)。
- 添加 `tools/` 和 `platform-tools/` 到环境变量。
- 可能还需要 将 Java 和 Ant 添加到环境变量。`;%JAVA_HOME%\bin;%ANT_HOME%\bin`

<!--more-->

## App

- [Getting Started with Creating a Cordova Application](https://netbeans.org/kb/docs/webclient/cordova-gettingstarted.html)

## Config

以下属性为 Android 平台的特殊属性。

- KeepRunning (boolean, defaults to true) 当应用产生 `pause` 事件后，应用程序是否继续运行。`false` 表示 cordova webview 中的代码停止运行，而不是杀死应用。
    
        <preference name="KeepRunning" value="false"/>

- LoadUrlTimeoutValue (number in milliseconds, default to 20000, 20 seconds) 加载页面的超时时间。

        <preference name="LoadUrlTimeoutValue" value="10000"/>

- SplashScreen (string, defaults to splash) 启动动画的文件（不包含扩展名）。

    <preference name="SplashScreen" value="mySplash"/>

- SplashScreenDelay (number in milliseconds, defaults to 3000) 启动动画的延续时间。
    
        <preference name="SplashScreenDelay" value="10000"/>

- InAppBrowserStorageEnabled (boolean, defaults to true) 启用 localStorage and WebSQL storage。

        <preference name="InAppBrowserStorageEnabled" value="true"/>

- LoadingDialog (string, defaults to null) 应用加载第一个页面时显示的加载提示框。标题和消息用逗号分隔。

        <preference name="LoadingDialog" value="My Title,My Message"/>

- ErrorUrl (URL, defaults to null) 错误页面地址。

        <preference name="ErrorUrl" value="myErrorPage.html"/>

- ShowTitle (boolean, defaults to false) 是否在屏幕底部显示标题。

        <preference name="ShowTitle" value="true"/>

- LogLevel (string, defaults to ERROR) 错误级别。可选值为ERROR, WARN, INFO, DEBUG, and VERBOSE。

        <preference name="LogLevel" value="VERBOSE"/>


## Plugins

- [The Battery Status API](http://www.kirupa.com/html5/the_battery_status_api_js.htm)