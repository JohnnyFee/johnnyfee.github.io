---
layout: post
title: "Android WebView"
description: ""
category: Android
tags: [android, webview]
--- 

## WebView

[pwnall / chromeview](https://github.com/pwnall/chromeview) Android WebView implementation that uses the latest Chromium code.

### 添加权限

要用Webview，确认你在**AndroidManifest.xml** 中添加了使用许可 "android.permission.INTERNET" ,否则会出Web page not available错误。

    <uses-permission android:name="android.permission.INTERNET" />

<!--more-->

### 加载页面

加载页面的API有loadUrl和loadData，前者传入的字符串表示页面路径，后者传入的是页面内容。

设置loadUrl的页面路径有以下情况：

- 互联网用：webView.loadUrl("http://www.eoe.cn");
- 本地文件用：webView.loadUrl(file:///android_asset/eoe.html);固定格式，本地文件存放在：assets文件中。

<!--more-->

使用loadData的示例如下：

    String data = "";
    try {
        // 读取assets目录下的文件需要用到AssetManager对象的Open方法打开文件
        InputStream is = getAssets().open("html/test2.html");
        // loadData()方法需要的是一个字符串数据所以我们需要把文件转成字符串
        ByteArrayBuffer baf = new ByteArrayBuffer(500);
        int count = 0;
        while ((count = is.read()) != -1) {
            baf.append(count);
        }
        data = EncodingUtils.getString(baf.toByteArray(), "utf-8");
    } catch (IOException e) {
        e.printStackTrace();
    }
    // 下面两种方法都可以加载成功
    wv.loadData(data, "text/html", "utf-8");
    // wv.loadDataWithBaseURL("", data, "text/html", "utf-8", "");
    }

__注：__如果在主线程中执行webView.loadUrl("javascript:xxx") N次，则待所有Java代码执行完成之后，JavaScript代码则开始执行（JavaScript代码在WebViewCore线程中执行），连续执行N次。

如果在子线程中执行N次，则执行一次Java代码，接着执行一次JavaScript代码，连续N次。

参考：

- [[Android]用WebView访问证书有问题的SSL网页](http://blog.charlee.li/android-load-cert-err-ssl-in-webview/)

### 处理返回键为返回上一页

如果用webview点链接看了很多页以后，如果不做任何处理，点击系统“Back”键，整个浏览器会调用finish()而结束自身，如果希望浏览的网页回退而不是退出浏览器，需要在当前Activity中处理并消费掉该Back事件，覆盖Activity类的onKeyDown(int keyCoder,KeyEvent event)方法，代码如下：

```java
// To handle the back button key press
public boolean onKeyDown(int keyCode, KeyEvent event) {
    LogUtil.i(this, "keyCode="   keyCode);
    if ((keyCode == KeyEvent.KEYCODE_BACK) && mWebView.canGoBack()) {
        mWebView.goBack();
        return true;
    }
    return super.onKeyDown(keyCode, event);
}
```

### 设置android WebView 不显示滚动条

可以直接在layout中添加 android:scrollbars="none" 来设置不显示滚动条，如下：

```xml
<WebView
    android:id="@ id/wv"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:background="@drawable/bg"
    android:scrollbars="none" />
```

### android:scrollbarStyle控制滚动条位置

WebView有一个设置滚动条位置的属性：android:scrollbarStyle 可以是insideOverlay可以是outsideOverlay，两个的区别是SCROLLBARS_INSIDE_OVERLAY的样式是滚动条在整个page里，类似css中的padding，看代码下的这个图吧，很清晰.

    //mWebView.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY);
    mWebView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

## WebSettings

### 启用JavaScript

    this.webView.getSettings().setJavaScriptEnabled(true); 

### 设置可以自动加载图片

    mWebView.getSettings().setLoadsImagesAutomatically(true);

### 获得UA信息

    String ua = webview.getSettings().getUserAgentString();

Nexus One手机中测试结果UA如下:

Mozilla/5.0 (Linux; U; Android 2.2; zh-cn; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1

__参考：__

- [Android获得UA信息的方法 - iceskysl@eoe - eoe移动开发者社区](http://my.eoe.cn/iceskysl/archive/843.html)
- [Chrome for Android User-Agent - Google Chrome Mobile — Google Developers](https://developers.google.com/chrome/mobile/docs/user-agent)

### 其他

    //设置默认缩放方式尺寸是far
    mWebView.getSettings().setDefaultZoom(WebSettings.ZoomDensity.FAR);

    //设置出现缩放工具
    mWebView.getSettings().setBuiltInZoomControls(true);

## WebChromeClient

###  使用console对象

如果想在Logcat中显示console.log输出来的信息，需要为webview设置WebChromeClient实例。

    this.webView.setWebChromeClient(new WebChromeClient());

###  使用alert等弹出类API

在不设置WebChromeClient实例时，调用alert、prompt等接口时无效果。必须像使用console对象的方法一样，设置WebChromeClient实例，alert和prompt才起作用。

参考：[java - Alert is not appear from web view in android? - Stack Overflow](http://stackoverflow.com/questions/6463151/alert-is-not-appear-from-web-view-in-android)

this.webView.setWebChromeClient(new WebChromeClient());

我们可以覆盖WebChromeClient的[onJsAlert](http://developer.android.com/reference/android/webkit/WebChromeClient.html#onJsAlert)、[onJsConfirm](http://developer.android.com/reference/android/webkit/WebChromeClient.html#onJsConfirm)、[onJsPrompt](http://developer.android.com/reference/android/webkit/WebChromeClient.html#onJsPrompt)、onReceivedTitle等接口来使用Android原生的界面来显示，如：

    new WebChromeClient() {
        @Override
          public void onReceivedTitle(WebView view, String title) {
            MainWebView3.this.setTitle(modifiedTitle);
            super.onReceivedTitle(view, title);
          }

        @Override
        public boolean onJsAlert(WebView view, String url, String message,
                final JsResult result) {
            new AlertDialog.Builder(context)
                    .setTitle("alert")
                    .setMessage(message)
                    .setPositiveButton("YES",
                            new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog,
                                        int which) {
                                    // 处理结果为确定状态 同时唤醒WebCore线程
                                    result.confirm();
                                }
                            }).create().show();
            return true; // 已处理
        }

        @Override
        public boolean onJsConfirm(WebView view, String url,
                String message, final JsResult result) {
            new AlertDialog.Builder(context)
                    .setTitle("confirm")
                    .setMessage(message)
                    .setPositiveButton("YES",
                            new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog,
                                        int which) {
                                    Toast.makeText(context,
                                            "you clicked yes", Toast.LENGTH_SHORT).show();
                                    result.confirm();
                                }
                            })
                    .setNegativeButton("NO",
                            new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog,
                                        int which) {
                                    // 处理结果为取消状态 同时唤醒WebCore线程
                                    result.cancel();
                                }
                            }).create().show();
            return true;
        }

## WebViewClient

###  处理页面内的url

防止页面内的url使用browser来打开

<http://stackoverflow.com/questions/4066438/android-webview-how-to-handle-redirects-in-app-instead-of-opening-a-browser>

```java
webview.setWebViewClient(new WebViewClient() {
    public boolean shouldOverrideUrlLoading(WebView view, String url){
        // do your handling codes here, which url is the requested url
        // probably you need to open that url rather than redirect:
        view.loadUrl(url);
        return false; // then it is not handled by default action
   }
});
```

以下Demo指定只有url里包含eoe.cn的时候才在webview里打开，否则还是启动浏览器打开.

```java
@Override
public boolean shouldOverrideUrlLoading(WebView view, String url) {
    LogUtil.i(this, "url="   url);
    if ( url.contains("eoe.cn") == true){
        view.loadUrl(url);
        return true;
    }else{
        Intent in = new Intent (Intent.ACTION_VIEW , Uri.parse(url));
        startActivity(in);
        return true;
    }
}
```

## Database

### localStorage

__启用localStorage__

    settings.setDomStorageEnabled(true);

__防止应用重启之后数据丢失__

    webView.getSettings().setDatabasePath("/data/data/" + webView.getContext().getPackageName() + "/databases/");

<http://stackoverflow.com/questions/5899087/android-webview-localstorage>

__多个webview共享数据__

- [didimoo/AndroidLocalStorage](https://github.com/didimoo/AndroidLocalStorage)


### 打开本地缓存提供JS调用

```java   
mWebView.getSettings().setDomStorageEnabled(true); 
// Set cache size to 8 mb by default. should be more than enough 
mWebView.getSettings().setAppCacheMaxSize(1024*1024*8); 
// This next one is crazy. It's the DEFAULT location for your app's cache 
// But it didn't work for me without this line. 
// UPDATE: no hardcoded path. Thanks to Kevin Hawkins 
String appCachePath = getApplicationContext().getCacheDir().getAbsolutePath(); 
mWebView.getSettings().setAppCachePath(appCachePath); 
mWebView.getSettings().setAllowFileAccess(true); 
mWebView.getSettings().setAppCacheEnabled(true);  
```

## Http Server

- [NanoHttpd/nanohttpd](https://github.com/NanoHttpd/nanohttpd)

## 和Java的通信

TODO

## 其他

- [WebView Explorations - Octodroid](http://stefanodacchille.github.io/blog/2014/02/23/webview-explorations/)

## 内核

- [Android 4.4 WebView实现分析 - 放飞梦想](http://mogoweb.github.io/blog/2014/01/16/analysis-of-android-4-4-webview-implementation/)
- [Webkit for Android分析](http://mogoweb.net/archives/182)
- [[译]Android WebView - 放飞梦想](http://mogoweb.github.io/blog/2013/10/24/translated-android-webview/)
- [Chromium网络加载速度研究(1) - 放飞梦想](http://mogoweb.github.io/blog/2014/03/18/chromium-loading-speed-research-0/)
- [Chromium网络加载速度研究(2) - 放飞梦想](http://mogoweb.github.io/blog/2014/04/03/chromium-loading-spped-research-1/)
- [关于chromium_webview项目 - 放飞梦想](http://mogoweb.github.io/blog/2014/06/10/about-chromium-webview-project/)

## Webkit

- [What WebKit version is in what Android version?](http://jimbergman.net/webkit-version-in-android-version/)

## Chromium

- [pwnall/chromeview](https://github.com/pwnall/chromeview)
- [mogoweb/chromium_webview](https://github.com/mogoweb/chromium_webview)

## 参考

- [Android中Webview使用经验总结（持续更新）](http://my.eoe.cn/iceskysl/archive/1028.html)
- [Android WebView使用](http://trinea.iteye.com/blog/1152557)
- [第二十九讲：WebView学习指南 « { Android学习指南 }](http://android.yaohuiji.com/archives/734#comments)

## Book

- [Building Hybrid Android Apps with Java and JavaScript](http://www.salttiger.com/building-hybrid-android-apps-with-java-and-javascript/)