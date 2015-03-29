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

### 类图

![qt-corova-package.png](http://johnnyimages.qiniudn.com/qt-corova-package.png)

### 插件机制

![qt-cordova-plugin.png](http://johnnyimages.qiniudn.com/qt-cordova-plugin.png)

在每个插件的构造方法中，都将为自己创建一个单实例，然后注册到 C++ 插件管理器（`PluginRegistry`）中，以`Console`为例：

`console.cpp`:

	Console::Console() : CPlugin() {
	    PluginRegistry::getRegistry()->registerPlugin( "com.cordova.Console", this );
	}

`key`值需要和`plugins.xml`中的`plugin`的`name`的值相同。

`xml/plugins.xml`:

		<plugins>
		    <plugin name="Events" value="com.cordova.Events"/>
		    <plugin name="Console" value="com.cordova.Console"/>
		</plugins>


在主函数（`main.cpp`）中，通过以下方法启动Webkit：

	QScopedPointer<QApplication> app(new QApplication(argc, argv));
	

	// without this HTMl5 localStorage is not persistent,without this HTMl5 localStorage is not persistent, 
	// and HTML5 client side database, does not work. 
	// 貌似只有在symbian有这个问题，在其他平台可酌情删除。
	QWebSettings::globalSettings()->enablePersistentStorage(Cordova::instance()->workingDir());

	QScopedPointer<QDeclarativeView> view(new QDeclarativeView());
	Cordova::instance()->setTopLevelEventsReceiver(view.data());

	view->setResizeMode(QDeclarativeView::SizeRootObjectToView);

	// 为QDeclarativeEngine上下文添加cordova属性，绑定到Cordova实例。
    view->rootContext()->setContextProperty("cordova", Cordova::instance());

    // 加载UI。
    view->setSource(QUrl("qml/main.qml"));

    // 如果要全屏显示，请使用 view->showFullScreen()
    view->show();
    app->exec();

这里边的`cordova`在`main.qml`中将使用到，如设置`cordova`对象的首页：

	url: cordova.mainUrl

将事件绑定到cordova对象的实现等：

	onLoadFinished: cordova.loadFinished(true)
	onLoadFailed: cordova.loadFinished(false)

在`cordova.cpp`的`loadFinished`方法中实现 C++ 插件的加载：

	// 读取xml/plugins.xml，并且遍历，读取其中的插件名称（name）和插件key（value）
	// 代码略...
	// 根据key在C++的插件管理其中查找
	CPlugin *currPlugin = PluginRegistry::getRegistry()->getPlugin( attribValue );
	if(currPlugin) {
		// 初始化插件，并激发pluginWantsToBeAdded信号，交给main.qml来处理。
	    currPlugin->init();
	    emit pluginWantsToBeAdded(attribValue, currPlugin, attribName);
	    execJS( "Cordova.enablePlugin( '" + attribValue + "' )" );
	}

其中 `pluginWantsToBeAdded` 对应的`main.qml`的代码为：

	Connections {
	    target: cordova
	    onJavaScriptExecNeeded: {
	        console.log("onJavaScriptExecNeeded: " + js)
	        webView.evaluateJavaScript(js)
	    }

	    onPluginWantsToBeAdded: {
	        console.log("onPluginWantsToBeAdded: " + pluginName)
	        CordovaWrapper.addPlugin(pluginName, pluginObject)
	    }
	}

在`onPluginWantsToBeAdded`的槽中，调用`CordovaWrapper.addPlugin(pluginName, pluginObject)`方法添加插件。CordovaWrapper实际上是一个JavaScript对象，在`main.qml`中通过下面的方法注入：

	import "cordova_wrapper.js" as CordovaWrapper

`cordova_wrapper.js`中对应的`addPlugin`方法代码为：

	var pluginObjects = {};
	function addPlugin(pluginName, pluginObject) {
	    pluginObjects[pluginName] = pluginObject
	}

即将所有的对象作为`pluginObjects`的属性，属性名为插件名，属性值对应为 C++ 插件。

至此插件注册已完成。

### 底层通信机制

![qt-cordova-file-communication.png](http://johnnyimages.qiniudn.com/qt-cordova-file-communication.png)

`cordova.qt.js`：

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

	    // 调用C++的qmlWrapper.callPluginFunction。C++ 如何将`qmlWrapper`注入给window的，请接着往下看。
	    window.qmlWrapper.callPluginFunction(pluginName, functionName, JSON.stringify(parameters))
	    return true;
	}

这是JavaScript和C++层通信的门面。也就是你要调用任何C++的接口，必须调用此方法。方法参数在下面的`添加插件`一节中将讲到。

`callPluginFunction` 在 `main.qml` 对应的代码为：

	javaScriptWindowObjects: [QtObject{
	    WebView.windowObjectName: "qmlWrapper"

	    function callPluginFunction(pluginName, functionName, parameters) {
	        parameters = eval("("+parameters+")")
	        CordovaWrapper.execMethodOld(pluginName, functionName, parameters)
	    }
	}]

`javaScriptWindowObjects`指的是将对象数组添加到浏览器（Web Frame）的`window`对象。在这里，我们给`window`添加名称为`qmlWrapper`的属性，该属性有`callPluginFunction`方法，该方法在`Cordova.Qt.js`的`exec`中被调用，用来执行插件的方法。

### 事件机制

Cordova的事件机制比较简单，使用的其实就是观察者模式。

#### 定义事件类 Event

参考：<http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event>

	Cordova.Event = function() {
	};

	// 事件触发的三个阶段。参考 <http://help.dottoro.com/ljjeesba.php>
	Cordova.Event.CAPTURING_PHASE = 1;
	Cordova.Event.AT_TARGET = 2;
	Cordova.Event.BUBBLING_PHASE = 3;

	...

	Cordova.Event.prototype.initEvent = function( eventTypeArg, canBubbleArg, cancelableArg ) {
	    this.type = eventTypeArg;
	    this.timeStamp = (new Date()).getMilliseconds();
	};

在Cordova中除了`initEvent`，其他属性均没用。

#### 定义事件处理器

	// 构造函数。
	Cordova.EventHandler = function( p_type ) {
		// 事件类型。
	    this.type = p_type
	    
	    // 事件监听者。
	    this.listeners = []
	};

	// 事件类型，这个用prototype合适？
	Cordova.EventHandler.prototype.type = "unknown";

	// 事件监听器。
	Cordova.EventHandler.prototype.listeners = [];

	// 绑定事件。p_listener 为字符串，表示事件名称。
	Cordova.EventHandler.prototype.addEventListener = function( p_listener, p_capture ) {
	    if( p_capture ) {
	    	// 添加到队列头部。
	        this.listeners.unshift( p_listener );
	    }
	    else {
	    	// 添加到队列尾部。
	        this.listeners.push( p_listener );
	    }
	};

	// 解绑事件。p_listener 同 addEventListener。p_capture 无作用。
	Cordova.EventHandler.prototype.removeEventListener = function( p_listener, p_capture ) {
	    // Try to find the event listener in our list
	    for( var i = 0; i < this.listeners.length; i++ ) {
	        if( this.listeners[i] === p_listener ) {
	            // Remove the listener from our queue
	            this.listeners.splice( i, 1 );
	            return;
	        }
	    }
	};

	// 激发事件。
	Cordova.EventHandler.prototype.dispatchEvent = function() {
	    var event = new Cordova.Event();
	    event.initEvent( this.type, false, false );

	    // Notify all listeners about this event
	    for( var i = 0; i < this.listeners.length; i++ ) {
	    	// 监听器的作用域为Cordova。
	        this.listeners[i].apply(Cordova, arguments);
	    }
	};

#### 定义Cordova的事件

	Cordova.events = {
	    deviceready: new Cordova.EventHandler( "deviceready" ),
	    resume: new Cordova.EventHandler( "resume" ),
	    ...
	};

属性名为事件名称，属性值为事件处理器。

#### 绑定事件

如在`basic.js`中，为`deviceready`绑定事件：

	document.addEventListener( "deviceready", function() {
	  console.log("basicjs.deviceReady")
	  get( "debug_output" ).innerHTML = "Device Ready!<br/>";
	}, false );

调用`document.addEventListener`经过了重定义：

	ventListener = function( type, listener, useCapture ) {
	    if( typeof Cordova.events[type] !== "undefined" ) {
	        Cordova.events[type].addEventListener( listener, useCapture );
	    }
	    else {
	        Cordova.doc_addEventListener.call(document, type, listener, useCapture);
	    }
	};

同理：`removeEventListener`和`dispatchEvent`也被重写，以便绑定事件时调用。

#### 定义事件触发方法

	Cordova.deviceready = function() {
	    Cordova.events.deviceready.dispatchEvent();
	}

	// ...

这类方法将在 C++ 端直接被调用，以激发指定特定事件。

## 编写插件

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

`addConstructor` 表示为Console插件添加一个构造方法，在`cordova.js`的`Cordova.enablePlugin`方法中被调用，即添加插件后自动执行的初始化方法。通常用于实例化对象，并且赋值于`window`对象。

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


