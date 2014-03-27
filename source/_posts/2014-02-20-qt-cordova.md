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

### 通信

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

### 编写 Plugin

如 console.js：

	function Console() {
	}

	Console.prototype.log = function( p_message ) {
	    Cordova.exec( null, null, "com.cordova.Console", "log", [p_message] );
	}

	Cordova.addConstructor("com.cordova.Console", function() {
		window.console = new Console();
	}
        

##Reference

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


