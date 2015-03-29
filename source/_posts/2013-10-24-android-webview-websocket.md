layout: post
title: "Android WebView WebSocket"
description: ""
category: Android
tags: [android,webview,websocket]
---
### WebSocket

WebSocket是HTML5开始提供的一种浏览器与服务器间进行全双工通讯的网络技术。在推送的性能上相对较早的轮训技术和[Comet](http://zh.wikipedia.org/wiki/Comet_(web%E6%8A%80%E6%9C%AF))技术性能得到很大的提升。

目前，WebSocket已得到各大主流浏览器的支持，`Chrome 4+`，`Safari 5+`，`Firefox 4+`，`IE 10+`，`Opera 10+`均实现了WebSocket功能。

如果你亲手试试JavaScript调用WebSocket客户端，可以参考[WebSocket.org](http://www.websocket.org/echo.html)。

同样，WebSocket也得到很多服务器厂商的支持：

- php - <http://code.google.com/p/phpwebsocket/>
- jetty - <http://jetty.codehaus.org/jetty/> (版本7开始支持websocket)
- netty - <http://www.jboss.org/netty>
- ruby - <http://github.com/gimite/web-socket-ruby>
- Kaazing - <http://www.kaazing.org/confluence/display/KAAZING/Home>
- Tomcat - <http://tomcat.apache.org/> (7.0.26支持websocket)
- WebLogic - <http://www.oracle.com/us/products/middleware/cloud-app-foundation/weblogic/overview/index.html> (12.1.2 开始支持)
- node.js - <https://github.com/Worlize/WebSocket-Node>

<!--more-->
### Android Webview与WebSocket

众所周知，Android的WebView控件目前为止并不支持WebSocket。github上已经提供Java实现的WebSocket，包括服务端和客户端。

- [TooTallNate/Java-WebSocket](https://github.com/TooTallNate/Java-WebSocket) 同时提供客户端和服务端的纯Java实现，在Android平台可以直接使用。
- [anismiles/websocket-android-phonegap](https://github.com/anismiles/websocket-android-phonegap) 提供了WebSocket的客户端实现，并且提供了WebView的WebSocket接口。
- [mkuklis/phonegap-websocket](https://github.com/mkuklis/phonegap-websocket) 基于[TooTallNate/Java-WebSocket](https://github.com/TooTallNate/Java-WebSocket)提供PhoneGap的WebSocket插件。**建议使用**。
- [koush/AndroidAsync](https://github.com/koush/AndroidAsync) 实现Android平台的异同通信，支持socket, http (client+server), websocket, and socket.io。
- [codebutler/android-websockets](https://github.com/codebutler/android-websockets) 未研究。
- <http://jwebsocket.org/> 未研究。

如果您需要在WebView上使用WebSocket，则可以选择`mkuklis/phonegap-websocket`和`[anismiles/websocket-android-phonegap]`。后者作者说会合并到phonegap中，但当前并未提供PhoneGap插件。而前者已经做成了PhoneGap插件，并且支持最新的Cordova框架。