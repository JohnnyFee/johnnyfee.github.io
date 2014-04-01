---
layout: post
title: "Qt Cordova"
description: ""
category: Qt
tags: [qt, cordova]
--- 

## 编译cordova-qt

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

<!--more-->

## 源码分析

![qt-corova-package.png](http://johnnyimages.qiniudn.com/qt-corova-package.png)

### 插件机制

![qt-cordova-plugin.png](http://johnnyimages.qiniudn.com/qt-cordova-plugin.png)

cordova.qt.js：

	Cordova.Qt.exec = function( successCallback, errorCallback, pluginName, functionName, parameters ) {
	    // Check if plugin is enabled
	    if( Cordova.plugins[pluginName] !== true ) {
	        return false;
	    }

	    // Store a reference to the callback functions
	    var scId = Cordova.callbacks.length;
	    var ecId = scId + 1;
	    Cordova.callbacks[scId] = successCallback;
	    Cordova.callbacks[ecId] = errorCallback;

	    // 将成功回调和失败回调分别再到parameters数组的最前面。
	    parameters.unshift( ecId );
	    parameters.unshift( scId );

	    // 调用C++的qmlWrapper.callPluginFunction
	    window.qmlWrapper.callPluginFunction(pluginName, functionName, JSON.stringify(parameters))
	    return true;
	}

`callPluginFunction` 在 `main.xml` 对应的代码为：

	javaScriptWindowObjects: [QtObject{
	    WebView.windowObjectName: "qmlWrapper"

	    function callPluginFunction(pluginName, functionName, parameters) {
	        parameters = eval("("+parameters+")")
	        CordovaWrapper.execMethodOld(pluginName, functionName, parameters)
	    }
	}]


main.c:

	QScopedPointer<QDeclarativeView> view(new QDeclarativeView());
	view->rootContext()->setContextProperty("cordova", Cordova::instance());
	view->setSource(QUrl("qml/main.qml"));

xml/plugins.xml:

	<plugins>
	    <plugin name="Events" value="com.cordova.Events"/>
	    <plugin name="Console" value="com.cordova.Console"/>
	</plugins>

### 底层通信机制

![qt-cordova-file-communication.png](http://johnnyimages.qiniudn.com/qt-cordova-file-communication.png)

## 编写 Plugin

我们以 Console 为例，提供的功能为在控制台输出一个指定字符串。

### 添加 C++ 类

#### console.h

	#ifndef CONSOLE_H
	#define CONSOLE_H

	#include "../cplugin.h"

	#include <QString>

	class Console : public CPlugin
	{
	    Q_OBJECT
	public:
	    explicit Console();

	signals:

	public slots:
	    void log( int scId, int ecId, QString p_message );

	private:
	    static Console *m_console;
	};
	        
每个Plugin均为单实例，`m_console`为单实例对象。对于方法：

	void log( int scId, int ecId, QString p_message );

`scId`为成功的回调标志，`ecId`为失败的回调标志。作用是，在执行完 C++ 端的代码之后，用来执行`scId`或者`ecId`指定的回调。如：

	this->callback( scId, "null,12345633");

上述代码表示执行成功回调，如果执行失败回调，则把第一个参数修改为`ecId`，不能同时传入两个。第二参数为传入给回调的参数，以`,`分隔。

所有插件需要继承`CPlugin`。需要暴露都给JS的方法需要置于`public slots:`下。

注意：`Q_OBJECT` 按照如上例子加上。

#### console.cpp

	#include "console.h"
	#include "../pluginregistry.h"
	#include <QDebug>

	// Create static instance of ourself
	Console *Console::m_console = new Console();

	/**
	 * Constructor - NOTE: Never do anything except registering the plugin
	 */
	Console::Console() : CPlugin() {
	    PluginRegistry::getRegistry()->registerPlugin( "com.cordova.Console", this);
	}

	void Console::log( int scId, int ecId, QString p_message ) {
	    Q_UNUSED(scId)
	    Q_UNUSED(ecId)

	    qDebug() << "[LOG]" << p_message;
	}

以下代码用于初始化我们在`console.h`中申明的单实例成员变量。

	Console *Console::m_console = new Console();

在构造函数中，使用一下代码向 C++ 端的插件管理器注册该插件。

	Console::Console() : CPlugin() {
	    PluginRegistry::getRegistry()->registerPlugin( "com.cordova.Console", this);
	}

在`Console::log`中，我们并不需要执行JavaScript的回调，所以并未调用`this.callback`方法，该方法是由插件的父类`CPlugin`提供的。如果需要执行回调，则按在`console.h`一节中介绍的方法调用。

### 修改`plugins.xml`

修改`xml/plugins.xml`文件，添加渐增的插件：

	<plugin name="Console" value="com.cordova.Console"/>

其中`value`必须和在`Console`的构造函数中注册的`key`值相同。

### 添加`console.js`

	function Console() {
	}

	Console.prototype.log = function( p_message ) {
	    Cordova.exec( null, null, "com.cordova.Console", "log", [p_message] );
	}

	Cordova.addConstructor( "com.cordova.Console", function() {
	    window.console = new Console();
	});

本例添加了一个`Console`构造函数，并且添加的`log`方法，方法的实现为调用 C++ 层对应的方法。

	Cordova.exec( null, null, "com.cordova.Console", "log", [p_message] );

`Cordova.exec`为JavaScript调用 C++ 层的统一入口。`Cordova.exec`的函数定义为：

	Cordova.Qt.exec = function( successCallback, errorCallback, pluginName, functionName, parameters)

参数说明：

- successCallback 成功回调。
- errorCallback 失败回调。
- pluginName 插件的名称。`plugins.xml` 和 C++ 注册插件时使用的`key`相同。对于`Console`插件对应的是`com.cordova.Console`。
- functionName 插件中的方法。
- parameters 传给方法的参数。类型为数组，如果没有参数，传入空数组`[]`。

## Reference

- [PhoneGap for Qt 5](http://qt-project.org/wiki/PhoneGap-for-Qt-5)

## FAQ

### [copydeploymentfolders] Error 4

构建成功后，运行时出现以上错误很可能是因为中文路径问题，把“项目/构建目录”的“桌面”改成“desktop”即可，如：

![Error 4](http://johnnyimages.qiniudn.com/qt-error4.png)

### network error

运行时，控制台出现 “network error”，导致该错误的语句外为：

    view->setSource(QUrl(QString("%1/qml/main.qml").arg(Cordova::instance()->workingDir())));

可能是因为在QUrl的构造函数的参数中使用`%1`，而你的开发环境不是Unix类型的系统，从而导致路径不对。可以使用以下方法解决：

    view->setSource(QUrl("qml/main.qml"));

另外，On the cordova.cpp you must also put:

    m_workingDir = QApplication::applicationDirPath();
    m_workingDir.cdUp();

Otherwise cordova cannot load your 'xml' and 'www' dir.

参考 ： ["network error" while building cordova for symbian](http://developer.nokia.com/community/discussion/showthread.php/233991-quot-network-error-quot-while-building-cordova-for-symbian)


