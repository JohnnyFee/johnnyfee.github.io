layout: post
title: "Android Networking"
description: ""
category: Android
tags: [android, networking, http]
---

## HTTP

- [Transmitting Network Data Using Volley](https://developer.android.com/training/volley/index.html)

### 取消支持 Apache HTTP 客户端

Android 6.0 版移除了对 Apache HTTP 客户端的支持。如果您的应用使用该客户端，并以 Android 2.3（API 级别 9）或更高版本为目标平台，请改用 `[HttpURLConnection](https://developer.android.com/reference/java/net/HttpURLConnection.html)` 类。此 API 效率更高，因为它可以通过透明压缩和响应缓存减少网络使用，并可最大限度降低耗电量。如需继续使用 Apache HTTP API，您必须先在 `build.gradle` 文件中声明以下编译时依赖项：

```
android {  
    useLibrary 'org.apache.http.legacy'  }
```

### BoringSSL 

Android 正在从使用 OpenSSL 库转向使用 [BoringSSL](https://boringssl.googlesource.com/boringssl/) 库。如果您要在应用中使用 Android NDK，请勿链接到并非 NDK API 组成部分的加密库，如 `libcrypto.so` 和 `libssl.so`。这些库并非公共 API，可能会在不同版本和设备上毫无征兆地发生变化或出现故障。此外，您还可能让自己暴露在安全漏洞的风险之下。请改为修改原生代码，以通过 JNI 调用 Java 加密 API，或静态链接到您选择的加密库。

## 硬件标识符访问权


## Library

1.  [Ion](https://github.com/koush/ion) - Good networking library for android.
2.  [OkHttp](https://github.com/square/okhttp) - An HTTP+SPDY client for Android and Java applications.
3.  [Asynchronous Http Client](https://github.com/loopj/android-async-http) - An Asynchronous HTTP Library.
4.  [RoboSpice](https://github.com/stephanenicolas/robospice) - Library that makes writing asynchronous network requests easy.
5.  [IceNet](https://github.com/anton46/IceNet) - Fast, Simple and Easy Networking for Android
6.  [Android Volley](https://developer.android.com/training/volley/index.html) - Official Android HTTP library that makes networking for easier and faster.
7.  [IceSoap](https://github.com/AlexGilleran/IceSoap) - Easy, asynchronous, annotation-based SOAP for Android.
8.  [node-android](https://github.com/InstantWebP2P/node-android) - Run Node.js on Android.
9.  [HappyDns](https://github.com/qiniu/happy-dns-android) - A Dns library, user can use custom dns server, dnspod httpdns. Only support A record.
10.  [RESTMock](https://github.com/andrzejchm/RESTMock) - HTTP Web server for mocking API responses in Android Instrumentation tests.
11.  [AndroidNetworking](https://github.com/amitshekhariitbhu/Fast-Android-Networking) - Android Networking is a powerful library for doing any type of networking in Android applications.
12.  [Packetzoom](https://packetzoom.com/blog/introducing-http-optimizer-and-analytics-service.html) - SDK for optimizing HTTP requests and free analytics service for networking.

## REST

- [Retrofit](http://square.github.io/retrofit/) - Retrofit turns your REST API into a Java interface. 支持 Rx.
