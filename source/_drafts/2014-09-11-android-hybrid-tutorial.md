---
layout: post
title: "Android Hybrid Develpment Tutorial"
category: Android
tags: [mobile, android, hybrid]
--- 

See [Building Hybrid Android Apps with Java and JavaScript](http://www.salttiger.com/building-hybrid-android-apps-with-java-and-javascript/)

## 什么是混合

"混合" 应用是一种特殊的 WEB 应用，它扩展基于 WEB 的应用，并且可以使用设备平台的本地 API。混合应用的设计模式同时适用于移动和桌面环境。

<!--more-->

__相对本地应用的优点：__

- 缩短跨平台开发周期

- 丰富的人力资源

- 简化审核过程。大多数的应用商店在产品上架前都有一个审核过程。因为混合应用可以不通过应用商店更新，所以你无需提交到应用商店。一旦你审核通过，之后便可以自由更新。需要注意的一点是，一旦你对本地代码做了更改，这时候你就需要提交一个新版本到应用商店。

- 混合应用是未来。展望移动系统技术，你可以很容易认为混合应用是开发的未来。 Windows Phone 8，Google 提出合并 Chrome OS 和 Android，Tizen OS 和 Firefox，这些都证实了这一点，因此，在不久的将来，构建和发布混合应用是具有战略性的正确选择。

<!--more-->

__相对本地应用的不足：__

- 性能。因为 JavaScript 是单线程的，你可能会碰到性能问题。然而，你可以把后台任务在运行本地线程中，这样，当应用忙于处理 UI 操作时，这些任务同时可以并行。本地线程会将事件和完成失败通知到 JavaScript。

- 不同平台的差异。WebKit 并不是在所有平台都是一致的，这意味着特定平台的显示可能有些不一样，这是一个易理解的话题，你需要找到缩小这些 UI 差异的方法。

- 不允许的高级特性。可能有一些高级特性不能在混合层轻易实现，如基于 OpenGL 的渲染，然后，随着 Microsoft, Google, and Mozilla 引进一些新的标准用来弥补这些空白，这些不能实现的技术正在不断减少。

- 不一致的用户界面。特定平台的的 UI 的观感可能很难用 HTML, CSS, and JavaScript 来模拟。

## Quick Start

你可以构建一个样例工程，使用 HTML 来来实现 UI，使用 WebView 来渲染。首先，使用 Eclipse 或者使用命令行创建样例工程。

```sh
$ mkdir helloworld
$ cd helloworld
$ android create project -n HelloWorld -p ./ -t \
  android-14 -k com.helloworld --activity MainActivity
```

执行命令之后，一个空的本地 _Hello World_ 应用将被创建。修改 AndroidManifest 文件，以包含 `INTERNET` 权限：

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.helloworld" >

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:icon="@drawable/icon"
        android:label="HelloWorld" >
        <activity android:name="com.helloworld.MainActivity" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

然后，我们修改布局资源文件，让它在视图层包含一个 WebView 控件。我们会在 `MainActivity` 类中将该布局文件设置为内容视图：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <WebView
        android:id="@+id/WebView"
        android:layout_width="fill_parent"
        android:layout_height="fill_parent" />

</LinearLayout>
```

打开 `MainActivity.java`，作如下修改:

```java
package com.helloworld;

import com.helloworld.R;
import android.app.Activity;
import android.os.Bundle;
import android.WebKit.WebView;

public class MainActivity extends Activity {

        @Override
        public void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);

                // Set the content view for the activity as the 'main' layout resource.
                // Calling this API will cause the resource to be inflated and view
                // hierarchy to created and associated with the activity.
                setContentView(R.layout.main);

                // Since our modified layout resource file contains a WebView,
                // find the instance of it for us to process it further.
                WebView webView = (WebView) findViewById(R.id.WebView);

                // Enable JavaScript
                webView.getSettings().setJavaScriptEnabled(true);

                // Load the entry point page into the webView.
                webView.loadUrl("file:///android_asset/index.html");
        }
}
```

除此之外，你也可以用编程方式来为应用视图层创建和添加 WebView：

```java
WebView WebView = new WebView(this);
contentView.addView(webView);
```

以下是一个被应用显示 HTML 页面：

```html
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,
        initial-scale=1.0,
        user-scalable=0,
        minimum-scale=1.0,
        maximum-scale=1.0">
<title>Hello World</title>
<style>
* {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

html {
        height: 100%;
}

html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        -webkit-text-size-adjust: none;
        -webkit-user-select: none;
}

body {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 100%;
        width: 100%;
        height: 100%;
}

article {
        display: -webkit-box;
        width: 100%;
        height: 100%;
        -webkit-box-orient: vertical;
}

article section.view {
        display: -webkit-box;
        width: 100%;
        height: 100%;
        -webkit-box-orient: vertical;
        -webkit-box-align: center;
        -webkit-box-pack: center;
}
</style>
</head>
<body>

<article>
        <section class="view">Hello world!</section>
</article>

</body>
</html>
```

## WebView

### 加载网页

一旦你创建了 WevView 控件，通过调用 `loadURL()` API，并且传入请求的 URL 来加载页面。

* _asset_ 文件夹的根路径为 _file:///android_asset_
* _res_ 文件夹的根路径为 _file:///android_res_

请注意，路径是 _file:///android_asset_，而非 _file:///android_assets_，不是复数。

_file:///_ 表示你想访问的本地文件系统，并且指向根目录。我们接下来在 WebView 中加载的路径都是相对这个根目录的。因此，_file:///android_asset_ 表示应用包中相对 _asset_ 文件夹的路径。

```java
// load index.html from the assets folder
WebView.loadUrl("file:///android_asset/index.html");

// load logo.png from the res folder
WebView.loadUrl("file:///android_res/drawable/logo.png");

// load a web based URL, Oreilly's homepage in this case
WebView.loadUrl("http://www.oreilly.com");
```

### 加载 HTML

你可以让 WevView 使用 `loadData()` 方法来显示任何合法的 HTML（以字符串的形式），如：

    loadData(String data, String mimeType, String encoding)

其中，`data` 为要加载的数据，这让我们可以在网页中包含内联数据，好像它们是外部资源一样。使用这个技术，我们可以在一个 HTTP 请求中加载多个通常是分离的资源，如图片和样式。

`mimeType` 表示数据类型，如 `text/html`。

`encoding` 指定编码方式。如 `base64` 表示数据使用 base64 编码，`UTF-8` 表示使用 UTF-8 编码方式。

```java
String data = "<!DOCTYPE html>";
data += "<head><title>Hello World</title></head>";
data += "<body>Welcome to the WebView</body>";
data += "</html>";
// args: data, mimeType, encoding
WebView.loadData(data, "text/html", "UTF-8");
```

如果你想在 HTML 中引用 _res/drawable_ 目录中的任意文件，你可能会使用如下代码：

```java
// Bad example
String data = "<!DOCTYPE html>";
data += "<head><title>THIS WILL NOT WORK</title></head>";
data += "<body><img src=\"file:///android_res/drawable/logo.png\" /></body>";
data += "</html>";
WebView.loadData(data, "text/html", "UTF-8");
```

这段代码不会加载 _logo.png_ 图片，因为受 _同源策略_ 的限制，网页中的所有资源都必须来自同一个站点，本例中，我们请求的是 `data:[<MIME-type>]` 而非 _file:///_。

为了避免这个限制，Google 建议使用 `loadDataWithBaseURL()`，传入一个合适的基地址，这可以同时解决相对地址和同源策略两个问题。

### 加载本地文件

Android WebView 提供一组非常灵活的 API 用来从加载多个来源的文档。然而，你在某些场合必须调整 WebView 的行为，因为同源策略会限制在 web 浏览器中加载内容的地址，如从文件系统加载本地文件。

下面，我们会使用一些技术来让浏览器从加载多个来源的内容。

从 _res/drawable_ 加载文件，需要指定基地址：

```java
String html = "<!DOCTYPE html>";
html += "<head><title>Loading files from res/drawable directory</title></head>";
html += "<body><img src=\"logo.png\" />/body>";
html += "</html>";
WebView.loadDataWithBaseURL("file:///android_res/drawable/", html, "text/html", "UTF-8", null);
```

从 SD 卡中加载文件，无需指定基地址：

```java
String base = Environment.getExternalStorageDirectory().getAbsolutePath()
        .toString();
String imagePath = "file://"+ base + "/logo.png";
String html = "<!DOCTYPE html>";
html += "<head><title>Loading files from SDCard</title></head>";
html += "<body><img src=\""+ imagePath + "\" />/body>";
html += "</html>";
WebView.loadDataWithBaseURL("", html, "text/html","UTF-8", null);
```

先在 Java 中读取文件内容，然后将数据传入 WebView：

```java
// Load an html file
String html = loadFileFromSDCard("file:///sdcard/oreilly/book/logo.png");
WebView.loadDataWithBaseURL("", html, "text/html", "UTF-8", null);
```

或者:

```java
// Load an image file
String pngData = loadFileFromAssets("file:///android_asset/images/logo.png");
WebView.loadData(pngData, "image/png", "UTF-8");
```

### 加载 Flash 文件

In order to load flash files from SDCard into the view, you can link your flash files in the embed tag using _file:///_ protocol.

```html
<!-- flash.html -->
<html>
  <head>
    <title>Playing Flash movie</title>
  </head>
  <body>
    <object width="200" height="200">
      <param name="movie" value="hybrid.swf">
      <embed src="file:///sdcard/hybrid.swf" width="200" height="200"></embed>
    </object>
  </body>
</html>
```

Then, you need to load your _flash.html_ file from _SDCard_ using the `loadUrl()` method.

```java
String base = Environment.getExternalStorageDirectory().getAbsolutePath().toString();
String html = "file://" + base + "/flash.html";
if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
        WebView.loadUrl(html);
}
```

### 从 res/raw 目录中读取文件

如果你需要从 _res/raw_ 读取文件并显示在 WebView 中，你需要传入资源 ID（如 _R.raw.home_）读取函数，以便能够作为字符串来获取。

    WebView.loadData(getRawFileFromResource(R.raw.home), "text/html", "UTF-8");

```java
private String getRawFileFromResource(int resourceId) {
    StringBuilder sb = new StringBuilder();
    Scanner s = new Scanner(getResources().openRawResource(resourceId));
    while (s.hasNextLine()) {
            sb.append(s.nextLine() + "\n");
    }
    return sb.toString();
}
```

### 以全屏模式打开  WebView

虽然你可以让 WebView 来覆盖整个 Activity，但默认请款下，Activity 没有覆盖整个屏幕，你可以看见标题栏和通知栏。你可以在 manifest 文件中设置 Activity 的标志也可以编程来让 Activity 以全屏方式显示。

通过 _AndroidManifest.xml_:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest ... >
        <activity
            android:theme="@android:style/Theme.NoTitleBar.Fullscreen" >
            ...
        </activity>
</manifest>
```

以编程方式实现:

```java
@Override
public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.main);
        ...
}
```

### 当应用是全屏模式时启用 Resize 事件

当你把 Activity 设置成全屏模式时，当软键盘在 WebView 中显示时，resize 事件不会被触发。这可能是 Android 的限制或者是 bug。

我们可以通过下面这种方式来启用 resize 事件:

1.在 _res/values/styles.xml_ 中设置主题，让你的应用全屏并且关闭窗口标题

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="Theme" parent="android:Theme.Light">
        <item name="android:textViewStyle">@style/Theme.TextView</item>
        <item name="android:windowTitleStyle">@style/WindowTitle</item>
        <item name="android:windowContentOverlay">@null</item>
        <item name="android:windowNoTitle">true</item>
    </style>

    <style name="WindowTitle" parent="@android:style/Theme">
        <item name="android:textSize">10sp</item>
        <item name="android:textColor">@android:color/white</item>
    </style>

    <style name="Theme.TextView" parent="@android:style/Widget.TextView">
        <item name="android:textSize">10sp</item>
        <item name="android:textColor">@android:color/black</item>
    </style>
</resources>
```

2.在 manifest 文件中应用这个主题：

```xml
<application
    android:icon="@drawable/icon"
    android:label="Demo"
    android:theme="@style/Theme" > ... </application>
```

3.现在可以在 HTML 中捕获 resize 事件了：

```js
$(window).bind('resize', function() {
        console.error('onResize');
});
```

### JavaScript 调用 Java 方法

WebView 允许开发者通过在 Java 中定义组件让后并使它们从 JavaScript 可访问来扩展 JavaScrip API。当你想访问的平台特性在 JavaScript 中还没有或者想消费使用 Java 写的组件的时候，这个技术就能派上用场。

`addJavaScriptInterface()` 可以用来实现这个目的：

```java
JavaScriptInterface JavaScriptInterface = new JavaScriptInterface(this);
myWebView = new MyWebView(this);
myWebView.addJavaScriptInterface(JavaScriptInterface, "HybridNote");
```

它的流程图为：

![](http://johnnyimages.qiniudn.com/android-hybird-communication.png)

这个例子中，`JavaScriptInterface` WebView 的 JavaScript 环境，并且可以通过 `HybridNote` 对象（aka _namespace_）来访问。一旦对象被添加到 WebView，这个对象在页面下次加载或者重新载入后便可使用。这可以通过 WebView 对象的 `loadData()` 函数来实现。

对象绑定框架非常灵活和强大。它会让 Java 方法返回的对象也可以从 JavaScript 环境访问。不像显式的对象，隐式绑定的对象是匿名对象，除非你用 JavaScript 变量来存储它的引用，否则它将丢失。

```java
class MyLocationProvider {
        Location getLocation();
}

WebView.addJavaScriptInterface(myLocationProvider, "nativeLocProvider");
```

上例中，`nativeLocProvider` 是全局变量，可以在 JavaScript 的任何地方访问：

    var location = nativeLocProvider.getLocation();

当我们在 JavaScript 中调用 `getLocation` 方法时，返回的对象自动绑定到了 JavaScript 环境，然而我们必须维持这个返回对象的引用，之后才能使用。

Jelly Bean MR1 (API Level - 17) 之前的 Android 版本中，暴露的 Java 对象的所有共有方法都可以在 JavaScript 层 访问。For Jelly Bean MR1 API Level and above，暴露的方法必须标注有 `@JavaScriptInterface`，以阻止不想让 JavaScript 访问的方法暴露。

JavaScript 层不能直接访问 Java 对象的域，如果需要，你可以使用显式的 getter 和setter 来实现。

__@JavaScriptInterface__

如果你在 _AndroidManifest.xml_ 中设置 `targetSdkVersion` 为 17+，所有暴露给 JavaScript 的方法必须有 `@JavaScriptInterface` 标注。

```java
import android.WebKit.javaScriptInterface;

// SDK version 17 or above.
@JavaScriptInterface
public void showToast(String toast)  {
        // show toast...
}
```

在 Android 2.3，`addJavaScriptInterface()` 不能正常工作。然而，_2.3_ 让然是使用的比较广泛的版本，你可能想让你的应用可以运行在 2.3 的设备上。

开发者提出了很多变通方案，你可以在 [Android 2.3 WebView’s broken AddJavascriptInterface website](http://goo.gl/EICOa) 找到一个实现。

另一个方法是使用 `onJsPrompt()` 回调，在这里，可以使用 `message` 或者 `defaultValue` 参数可以用来传入在原生环境执行的方法名和参数。

```java
@Override
public boolean onJsPrompt(WebView view, String url, String message,
        String defaultValue, JsPromptResult result) {

        // Check the url to ensure that the request originated from
        // whitelisted source

        // Check to see if message or defaultValue contain JavaScript request.
        if (defaultValue.startsWith("karura:")) {
                // process the request
        } else{
                // display the confirmation dialog to the user if required
        }

        return trueOrFalse; // based on whether you handled the notification
}
```

### 在 Java 层调用 JavaScript 函数

混合应用的一个关键特点允许本地代码调用 JavaScript 的 API，比如传递数据，回调和事件，WebKit 没有直接的 API，开发者经常使用 `loadUrl()` 函数来达到这个目的。`loadURL()` 函数请求 WebView 加载和执行指定的 URL。

比如，如果我们希望在 WebView 中显示一个提示框，我们可以像这样：

```java
String js = "alert('Alert from Java');";
WebView.loadUrl("JavaScript:" + js);
```

从 Java 调用 JavaScript 不像 Java 调 JavaScript 那么直观。JavaScript 对象没有暴露给 Java 层。你调用 JavaScript 方法是通过创建 JavaScript URL，然后传到 WebView 执行。使用这个方法有两个注意点，首先你必须知道 JavaScript 运行时的代码结构，其次，你必须保证 JavaScript URL 有合适的错误处理代码。JavaScript URL 中的变量必须是可寻址的，为了做到这个，你可以通过把这些变量的作用域设置为全局的，也可以通过构建调度框架来将响应路由到正确的接收对象。

### Routing Data to the Correct JavaScript Receiver

为了实现一个路由框架将从 Java 运行的代码交付到正确的 JavaScript 对象，有以下几个方法可以做到这个：

* 如果你使用已经存在的应用框架，如 PhoneGap, Cordova, or Karura，那么他们已经帮你做了这些事情。
* 你可以使用现有的异步框架，如 JQuery 中的 Deferred 对象框架。
* 自定义一个框架。

### Domain Whitelisting

你可以使用 `shouldOverrideUrlLoading(WebView view, String url)`  方法创建一个允许的域名列表：

```java
@Override
public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if (!Uri.parse(url).getHost().equals("www.oreilly.com")) {
                return false;
        }
        view.loadUrl(url);
        return true;
}
```

However, restricting loading remote resources within the `shouldOverrideUrlLoading(WebView view, String url)` method does not intercept the requests that are made from IFRAME, XmlHttpRequests Ajax Object, and SRC attributes in HTML tags.

然而，`shouldOverrideUrlLoading(WebView view, String url)` 并不会拦截来自 IFRAME, XmlHttpRequests Ajax Object, and SRC attributes in HTML tags 的请求。

这个问题的解决办法是使用 `shouldInterceptRequest` 拦截请求，并且手动替换为不同的内容到视图中：

```java
@Override
public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
        if (url.contains(".js")) {
                String str = "alert('This is a replaced JavaScript code.')";
                InputStream is = null;
                try {
                        is = new ByteArrayInputStream(str.getBytes("UTF8"));
                } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                }
                String type = "application/JavaScript";
                return new WebResourceResponse(type, "UTF-8", is);
        }
        return super.shouldInterceptRequest(view, url);
}
```

## 线程安全

从 JavaScript 访问 Java 对象时，方法可能运行在一个和 WebView 相关的后台线程中，这个线程不同于主应用线程。这意味着应用开发者在 JavaScript 中访问 Java 对象以及这些方法中的对象域时，应该注意线程安全问题。

为了解决这个问题，我们建议使用一个主线程相关的处理器让访问 Java 方法的请求排队。这个处理器可以将这些事件发送给主线程，从而避免任何线程问题。

你可以扩展这个思路，在 非 UI 的 looper（和相关的 handler）上排队 UI 无关的事件，从而让 UI 线程具有轻量性和和可访问性。

## WebViewClient

Android 的 WebView 是可扩展的并且有很多具有代表性的类，包括 WebViewClient 和W ebChromeClient，这些类可以用来自定义 WebView 的默认行为，并且可以在请求/相应 调用流中注入数据。

WebViewClient is a class that the WebView refers to before it handles everything that, in some way, is related to the rendering of a page. Using this class, you can add callback methods that are invoked to inform you of changes in the rendering.

WebViewClient 是 WebView 引用的是一个和页面显示相关的类。这个类可以用来添加用来报告显示过程的回调方法。

这些回调包括:

* web 请求开始加载和结束加载
* 浏览区是否应该加载指定的资源
* 错误通知，登陆请求和 form 重提交

Android WebView 有一个 WebViewClint 的默认实现，可以使用 WebView 的 `setWebViewClient()` 方法覆盖这个默认实现。

```java
webView.setWebViewClient(new WebViewClient(webView) {
  // override all the methods
});
```

## WebChromeClient

WebChromeClient 负责浏览器 UI 的所有事情。WebChromeClient 可以用来处理浏览器的访问历史，创建新的窗口，关注 alerts, prompts, and console messages。一个没有综合需求的简单应用可以不用覆盖默认的 WebChromeClient。你可以使用 WebView 的 `setWebChromeClient()` 方法来指定你自己的实现。

```java
webView.setWebChromeClient(new WebChromeClient(webView){
  // override all the methods
});
```

## WebSettings

Android 的 WebView 提供了一个非常综合的配置接口 `WebSettings`，用来配置 WebView 运行时的行为。`WebSettings` 在 WebView 的声明周期内是一个合法的对象。换句话说，如果 WebView 已经销毁，你还视图访问 `WebView.getSettings()` 的任何方法，会抛出 `IllegalStateException` 异常。

你可以通过 `WebView.getSettings()` 获取 `WebSettings`。

```java
WebView WebView = new WebView(this);
WebSettings settings = WebView.getSettings();
```

### 阻止本地文件被加载

`setAllowFileAccess()` 接口用来控制本地文件是否可以被 WebView 访问。这是其中一个可以在运行时配置的设置项。默认请款下，允许访问本地文件系统。这个设置不会限制 WebView 从  _file:///android_asset_ (assets) and _file:///android_res_ (resources) 目录加载本地资源。出于安全考虑，如果你的应用没有必要访问文件系统，最好把这个设置关闭。

    settings.setAllowFileAccess(false);

### 启用 JavaScript

出于安全考虑，JavaScript 默认是被禁止的。你可以通过 `setJavaScriptEnabled()` 方法来启用/禁用 JavaScript。

    settings.setJavaScriptEnabled(true);

打开一些不需要的 WebView 设置可能导致不期望的行为。因此，最好关闭你应用中无需使用的特性。

比如，你如果不需要使用 Flash 插件，请使用 `setPluginState(PluginState.OFF)` 方法关闭，这可以阻止受到第三方插件的攻击。

```java
WebView WebView = new WebView(this);
WebSettings settings = WebView.getSettings();
settings.setPluginState(PluginState.OFF);
```

我们建议你读以下几篇 Syracuse University in New York 发表的研究论文：

- [“Attacks on WebView in the Android Systems” article](http://goo.gl/LyPev).
- [“Touchjacking Attacks on Web in Android, iOS, and Windows Phone” article](http://goo.gl/i89Sn).

### 设置默认的字号

默认情况下，WebKit 的渲染和显示的字体大小为 16sp (scale-independent pixels) 。这个单位允许 WebView 让字体大小同时适应屏幕密度和用户偏好。如果你想改变默认的字体大小，你可以使用 `setDefaultFontSize()` 方法。

### 缩放控制

设置 `setBuiltInZoomControls()` 方法为 `false` 会阻止内置的缩放机制，设置为 `true` 则允许 `setDisplayZoomControls()` 方法显示屏幕上的缩放控制。`setDefaultZoom(ZoomDensity.FAR)` 设置网页的默认缩放密度（zoom density），设置为 `FAR`，让它在 240 dpi 的屏幕上以 100% 显示。`setSupportZoom()` 设置 WebView 是否支持使用屏幕上的缩放控件和手势进行缩放。

从用户体验的角度来看，对于大多数应用来说，最好关闭缩放，除非应用要求具有缩放功能。

```java
WebView WebView = new WebView(this);
WebSettings settings = WebView.getSettings();
settings.setBuiltInZoomControls(false);
settings.setDefaultZoom(ZoomDensity.FAR);
settings.setSupportZoom(false);
```

### 硬件加速

从 Android 3.0 开始，Android 引入的全硬件加速。这在目标为 4.0 以下默认是未启用的。The web browser itself moved to a _tile-based rendering architecture_ as opposed to display list architecture, which makes it more responsive.

如果你在应用或者 acitvity 中启用硬件加速，你可以在 manifest 中设置 `android:handwareAccelerated="true"`。

```java
// enable hardware acceleration using code (>= level 11)
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
    WebView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
}
settings.setRenderPriority(WebSettings.RenderPriority.HIGH);
settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
```

如果你为你的应用启用硬件加速，要确保你测试过。启用硬件测试有些副作用，最重要的是添加了大量的内存需求（至少约 7-8M）。这会对低配置的设备产生严重影响。

考虑状况 Android 生态系统是严重分裂的，你可能需要观察硬件加速的 WebView 可能产生的问题。你可以用选择地通过 `android:handwareAccelerated="false"` 来在 manifest 文件中关闭整个应用或者寄宿 WebView 的 activity。

你可以使用以下代码达到相同的效果：

```java
// selectively disable hardware acceleration for WebView
// honeycomb (3.0) and higher
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
        WebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
}
```

## 混合应用的架构

混合应用将两个最好的世间结合到了一起。一个足够负载的混合应用一般会包含大多数组件。让我们快速复习这些组件：

![](http://johnnyimages.qiniudn.com/android-hybird-architect.png)

- __WebView：__ 一个混合应用首先是一个 web 应用，并且具有通过额外的用户自定的 API 访问平台特性的能力。这个 web 应用要求使用 WebView 来渲染内容并且 host 业务逻辑。

- __View, model, and controller：__ 由于应用主要使用 JavaScript 来编写，取决于你用的 JavaScript 库，你可能有多种实现 MVC 组件的方式。

- __JS-Java Bridge：__ 这是允许原生代码和 web 环境互相访问的粘合层。这个桥梁允许执行同步和异步执行因为包含性能，易用即安全等原因，这层是最要的层之一。

- __Java 插件：__ Java 插件是个用户定义的扩展 API，这些 API 都暴露给 JavaScript 环境。

- __原生组件:__ 这是在混合应用中想访问的原生服务和组件，如显示工具栏，原生提示框，访问地址等等。

- __应用数据:__  While HTML5 data storage gives us some capabilities to store data, you may often want to store BLOBs in custom formats; this is where application data, filesystem APIs, and native APIs come into play.

- __Assets and resources:__  Assets and resources 包含应用的静态资源。如果你愿意，可以用资源来本地化文本。

__原生业务逻辑:__ 在设计混合应用的时候，原生和 web 组件之间的业务逻辑的分离是一个重要的架构问题。你可能会经常想处于某些原因，如访问原生组件、安全问题、你想使用某个只能在原生层才能访问的组件，而感觉需要把部分业务逻辑在原生代码层实现。

## 混合应用的 HTML 架构

混合应用是一个使用 mobile 友好的 JavaScript 和 CSS 样式构建，以具有原生应用的观感。像其他应用一样，混合应用可能根据用户体验而变得相当复杂。出于简单考虑中，我们假设一个简单的应用只包含一个简单的 WebView 和一个简单的入口网页，如 index.html。一个原生应用会在应用启动器上对用户可见。一旦用户点击了启动图标，带有 WebView 的主 activity 会被创建，WebView 会加载默认的入口网页来初始化 UI。之后，web 组件的设计完全取决于你的选择，然而，单页面应用是这些应用的的事实标准设计策略。

### Web 应用的架构

一个典型的 web 应用的架构可以描述为：

![](http://johnnyimages.qiniudn.com/android-hybrid-html.png)

架构是自解释的，然而，我们想重申几个要点：

* UI events generate DOM objects based on user interactions.
* The model abstracts network connectivity and storage making the controller and views agnostic of the source and destination for data.
* 模型使用存储数据的唯一组件。

### SPA 关键的设计点

以下是设计 单页面应用的时需要记住的几件事情：

* 尽可能让你的代码模块化。
* 如果可能，让这些模块相互独立。
* 使用恰当的方式访问变量，保证部暴露不需要暴露的变量。
* Develop a mechanism wherein you can explicitly identify module dependencies and hence load them at runtime.
* Additionally, it would be beneficial if non-UI modules can be run from the command line. This will greatly facilitate unit testing.

### 混合应用中使用的库和框架
 
- Backbone.js 提供 MVC 框架
- Underscore.js 提供工具函数
- iScroll.js 提供滚动支持。 iScroll.js 是个必要的库，用来在指定宽高的元素中滚动内容，而且是跨设备的，这在原生代码中是不支持的。

    为了使用 `iScroll.js`，列表项需要添加到一个 `iScroll` 容器元素中：

        <div id="wrapper">
            <div id="scroller">
                <ul id="thelist">
                                <li>row 1</li>
                                <li>row 2</li>
                                <li>row 3</li>
                                <li>row 4</li>
                        </ul>
                </div>
        </div>
        var myScroll = new iScroll('wrapper');

    由于一个列表需要预填充，当你渲染大量的列表项的时候，你可能会碰到性能问题，比如 1000 行的花名册。当让，你可以使用分页来内容分散到多个视图，然而，难免有些场合你需要在一个视图中列出所有的类表象。

    理想情况下，`iScroll` 可以允许我们随着滚动，向 DOM 中慢慢添加列表项，这个现在还不之支持。一个可行的方法是使用 `setTimeout(func, delay)` 加载内容到滚动区域。这种方式，我们可以加载一个初始集合到视图中，就像内容很快被加载到了视图中，随后，当用户开始滚动的时候，添加其他的列表项到滚动容器中。

    这个方法对相对比较小的列表可行。理想的方法是当你滚动的时候，一项一项添加列表项到滚动视图中。这个最佳技术相比之前提到的方案可以提供一个更好的用户体验。

- jQuery.js for JavaScript application

### CSS Reset 避免浏览器不一致

不是所有的浏览器完全相等，移动浏览同样是这样。CSS Reset 通过在你自定义的 CSS 应用之前，将内置的默认样式值重置到 baseline value，让显示效果尽可能统一。

HTML5 Boilerplate 提供了两个 CSS 文件 (_main.css_ and _normalize.css_)，提供了一个很好的重置浏览器默认样式设置的方法。你可以从  [Html5boilerplate website](http://goo.gl/3JUxZ) 下载这两个文件。

```css
/*
Sample CSS Reset
*/
html, body, div, form, fieldset, legend, label {
        margin: 0;
        padding: 0;
        border: 0px;
        outline: 0px;
        font-size: 100%;
}
```

### 首页 index.html

网页通常放在 _assets_ 目录。我们定义 `viewport` meta 标签，它控制网页加载时的初始外观。`link` 标签故意留空，因为我们想使用 JavaScript 来根据 `window.devicePixelRatio` 属性加载 CSS 文件。

我们发现，在一些老版本的 Android 中，我们的示例应用在用 `link` 标签加载 CSS 时，处理 **`0.75`** Device Pixel Ratio (DPR) 时会崩溃。我们可以在一些相同版本的手机上重现这个变态的崩溃，然而，使用 `link` 比使用 JavaScript 加载 CSS 更具有响应性。由于 JavaScript 中 `onDomReady()` 的延时，你会先看到一个无样式的视图，然后才显示有样式的版本。

下面把 CSS 装载入 DOM 的方法是最理想的方式：

```html
<link rel="stylesheet"
        media="screen and (-webkit-min-device-pixel-ratio: 0.75)"
        href="ldpi.css" />
<link rel="stylesheet"
        media="screen and (-webkit-min-device-pixel-ratio: 1.0)"
        href="mdpi.css" />
<link rel="stylesheet"
        media="screen and (-webkit-min-device-pixel-ratio: 1.5)"
        href="hdpi.css" />
<link rel="stylesheet"
        media="screen and (-webkit-min-device-pixel-ratio: 2.0)"
        href="xhdpi.css" />
```

下面是另外一种解决方法，但是我们不推荐使用：

```js
function loadCSS() {
    switch(window.devicePixelRatio) {
        case 2.0:
                $('#dpr-css').attr('href', 'css/xhdpi.css'); 1
                break;
        case 1.5:
                $('#dpr-css').attr('href', 'css/hdpi.css');
                break;
        case 0.75:
                $('#dpr-css').attr('href', 'css/ldpi.css');
                break;
        default: // 1
                $('#dpr-css').attr('href', 'css/mdpi.css');
    }
}
```

`#dpr-css` 是 `<link>` 标签的 ID：

```html
<link id="dpr-css" rel="stylesheet"
      href="css/default.css"
      type="text/css"
      media="screen" />
```

你也可以使用下面的代码为不同的密度将样式添加到 DOM 中，我们也不推荐这样做：

```js
$('HEAD').append($('<link rel="stylesheet" href="xhdpi.css" type="text/css"
        media="screen and (-webkit-min-device-pixel-ratio: 2.0)" />'));
```

以下是混合 Android 应用的模板文件：

```html
<script type="text/x-tmpl" id="tmpl_contacts_item">
<div class="contact item" data-id="<%= id %>">
    <div class="edit">Edit</div>
    <div class="profile">
        <img data-id="<%= id %>" class="avatar" src="<%= avatar %>" />
        <div class="full_name"><%= name.givenName %> <%= name.familyName %></div>
    </div>
    <% if (emails.length > 0) { %>
    <div class="details">
        <div class="caption emails">Emails</div>
        <% _.each(emails, function(email) { %>
                <div class="comm"><span><%= email.type %></span> :
                <a href="mailto:<%= email.value %>"><%= email.value %></a></div>
                <% }); %>
    </div>
    <% } %>
    <% if (phoneNumbers.length > 0) { %>
    <div class="details">
        <div class="caption phones">Phones</div>
                <% _.each(phoneNumbers, function(phone) { %>
                <div class="comm"><span><%= phone.type %></span> :
                <a href="tel:<%= phone.value %>"><%= phone.value %></a></div>
                <% }); %>
    </div>
    <% } %>
    <% if (note != '') { %>
    <div class="details">
        <div class="caption notes">Notes</div>
        <div class="note"><%= note %></div>
    </div>
    <% } %>
</div>
</script>
```

### Viewport Meta Tag

`viewport` 元标签定义了一组属性用来描述当网页基于设备屏幕尺寸第一次显式时，网页的行为和初始外观。

#### Viewport Width

viewport 的 `width` 属性告诉浏览器如何最好地横向显式网页。比如，我们在目标为 320px 宽度的屏幕上显式网页内容。

    <meta name="viewport" content="width=320">

这不会为不同尺寸的屏幕进行缩放。

把 `width` 属性社这为 `device-width` 会让内容缩放带适合屏幕的宽度。

    <meta name="viewport" content="width=device-width">

不管你的屏幕宽度是竖屏模式下的 480px 还是横屏模式下的 800px，`device-width` 值让 `width` 不受屏幕宽度的约束。

#### Viewport Scaling with the Content Attribute

以下是一些 `content` 属性允许的选型：

- __initial-scale__： 网页第一显示后的缩放倍数。值在 0 到 10.0 之间。1.0 表示不放大，1.0 以上表示放大，1.0 以下表示缩小。

- __minimum-scale__：网页最小的缩小倍数。1.0 表示不允许缩放，缩放比例为 0 to 10.0 之间。

- __maximum-scale__：网页最大的放大倍数。1.0 表示不允许缩放，缩放比例为 0 to 10.0 之间。

- __user-scalable__：是否允许用户控制网页的缩放，默认值是允许。

- `target-densitydpi=device-dpi` 这个属性已经从 WebKit 中删除。这个属性不再被 iOS 支持，这个问题可以参考 [WebKit bug website](http://goo.gl/URmQd)。


```html
<meta name="viewport" content="width=device-width,
    minimum-scale=1,
    initial-scale=1,
    maximum-scale=1,
    user-scalable=no" />
```

这个元标签在为移动设备优化网页时非常重要。它主要阻止移动浏览器修改网页的缩放级别。

### 响应式设计和媒体查询

在移动应用范例中，由于可用的屏幕区域是有限的，响应式设计应被考虑。

CSS3 中的媒体查询可以帮助应用适应不同的 CSS 属性和规则。媒体查询忘让我们适应不同的设备，而且可以使用设备的不同特性，如 `orientation`, `device-aspect-ratio`, `color`, or `resolution`。

响应设计可以通过 CSS 中的媒体查询来实现。有几种在 HTML 文档中定义 CSS 媒体查询的方式。我们将使在下面的例子中使用第一种方式：

在 `<style>` 元素中使用媒体规则：

```html
<style type="text/css">
    @media only screen and (-webkit-min-device-pixel-ratio: 1.0) {
            /* some CSS definitions here */
    }
    @media only screen and (orientation: portrait){
            /* some CSS definitions here */
    }
    @media only screen and (orientation: landscape){
            /* some CSS definitions here */
    }
</style>
```

外部引用：

```html
<link rel="stylesheet"
        type="text/css" href="small_screen.css"
        media="only screen and (max-width: 320px)" />
```

通过导入样式：

    @import "small_screen.css" only screen and (max-width: 320px);

Android 为 WebKit 提供了一个渲染引擎，支持返回设备的像素密度的 `-webkit-min-device-pixel-ratio` 属性。当前有至少冲个可能的 Device Pixel Ratio (DPR，设备像素比) ：`0.75`, `1.0`, `1.5`, and `2.0`。这些值可以使用 JavaScript 的 `window.devicePixelRatio` 属性访问。

* 如果 `DPR` 是 0.75，则该设备为低密度的，网页默认按比例缩小。
* 如果 `DPR` is 1，设备为中等密度，网页不会缩放。
* 如果 `DPR` is 1.5，设备为高密度的，网页会按这个比例放大。
* 如果 `DPR` is 2，设备为超高密度，网页按这个比例放大。

如果想深入了解像素密度，可以参考 Peter-Paul Koch 这篇文章 [Quirksmode website](http://goo.gl/hKYlS)。

### EM or Percent (%) unit for scalable interface

浏览器中有几种缩放 HTML 元素的单位：EMs (em), Root Ems (rem), Pixels (px), Picas (pc), Exes (ex), Percents (%), and Points (pt)。然而，其中一些没有被完全支持用来在 CSS 文档中缩放字体大小的 `font-size` 属性。

对于移动应用，我们主要关注其他的两个：`em` and `%`。如果你想在所有的屏幕分辨率中显示文本的正确尺寸，`em` or `%` 是最好的解决方案，因为他们在 web 中是被普遍使用在字体大小上。当时，两者哪个更好呢？

通常，WebKit 使用 16px（在 Android 中为 16 sp） 显示字体大小，除非你使用 WebKit settings 的 `setDefaultFontSize()` 方法改变 Webkit 默认的字体大小。换句话说，大多数浏览器显示字体大小为 `16px`，这个值等于 `1em` or `100%`。但是，我们不建议你在 CSS 文档中使用使用 `px` 作为字体大小的单位。

为了更好的收缩性和健壮性，W3C 也建议使用 `em` or `%` 作为字体大小的单位。我们实际上发现使用 percent (`%`) 让设计者 to preserve readability for maximum consistency and accessibility in visual designs。

有时候，在 HTML 标签内设置 `font-size` 的值可能不会有预期的结果。这是因为内元素从父元素中继承了 `font-size` ，并相对父元素的 `font-size` 应用自己的 `font-size`。所以，你可能看到更小的字体。

在嵌套的 HTML 标签中的字体大小的示例：

```html
header {
    font-size: 2em;
        /*font-size: 200%;*/
}
span {
    font-size: 0.5em;
        /*font-size: 50%;*/
}
<header>This is a large header without any nested tag</header>
<header>This is a large header with <span>a span tag</span></header>
<span>This is a span tag</span>
```

示例的效果可参考 [Jsfiddle website](http://goo.gl/AVRxh)。

`<header>` 的字体大小为 `2em`，这是基础字体大小的两倍，第二个 `<header>` 内部的 `<span>` 标签继承父标签的字体大小 `2em`，然后乘以 `0.5`，结果为 `1em`，而和 `<header>` 平行的 `<span>`，它的字体大小是 `0.5em`。`em` and `%` 两个单位都会随着基础字体大小的变大而变大。。

你可能需要 `px` 和 `em` 的互相转换。你可以使用 jQuery 插件来 [jQuery-Pixel-Em-Converter plug-in website](http://goo.gl/BwjJZ) 来实现，也可以直接使用工具 [Pxtoem website](http://goo.gl/iTYJE)。

__CSS3 引入 rem 单位：__

`rem` 单位是相对根元素 (`<html>`)而言的。你可以定义根元素的字体大小，让后将这个字体大小作为 CSS 文档中的基准。就像前面提到的，`em` 会在内嵌元素上会有混合的问题，`rem` 则通过使用 root 元素的字体大小的百分比避免了这个问题。

### Opacity or RGBA: 区别是什么?

CSS 中 `opacity` 属性指定了一个元素的透明度，它的取值范围是 `0.0` to `1`。值越小表示元素越透明。`opacity` and `RGBA`  之间的主要区别为：`opacity` 影响元素的子元素，让子元素具有相同的透明度，然而 `RGBA` 之后影响单个元素的透明度。

    -webkit-opacity: 0.5;

RGBA 代表 _Red, Green, Blue, and Alpha_。CSS3 introduced the RGBA support to set the alpha transparency, which sets the opacity via the alpha channel and controls how much of what is behind the color shows through.

    background: rgba(255, 0, 0, 0.5);

我们可以使用 RGBA 转换工具 [Devoth’s HEX 2 RGBA Color Calculator website](http://goo.gl/R7X82) 来将 `HEX` 颜色转化为 `RGBA` 格式。

### Event Pooling

随着你的应用变得更加复杂，事件管理可能会很繁杂。可以把事件阻止到一个事件池机制中，该机制是观察者模式的变化，可能是管理依赖的另一个解决方案。jQuery 提供了 `bind` 和 `trigger` 以一个简单的方式来处理事件池。当事件从 Java 层派发的时候，事件池非常有用。

这是一个使用 jQuery’s `bind` and the `trigger` 的事件池的一个例子：

```js
function updateContact(e, data) {
        switch(e.type) {
                case 'NAME_UPDATE':
                        // update the name
                        // data.name
                        break;
                case 'PHONE_UPDATE':
                        // update the phone number
                        // data.phone_number
                        break;
                default:
                        // default action
        }
}
```

下面的代码让我们绑定一个事件到文档，这个事件可以在 HTML、URL 地址 或者 JavaScript 代码中通过 `trigger` 来触发。

```js
function subscribeEvents(eventName, callback) {
        $(document).bind(eventName, callback);
}

subscribeEvents('NAME_UPDATE PHONE_UPDATE', function(e, data) {
        updateContact.apply(null, [e, data]);
});
```

使用下面的代码，我们可以轻易地将一个常用功能创想到 `triggerEvent()` 方法中，在这个方法中，你可以使用 `eventName`, `args`, and `delay` 参数触发一个事件：

```js
function triggerEvent(eventName, args, delay) {
        setTimeout(function() {
                $(document).trigger(eventName, args);
        }, delay || 0);
}
```

一旦你使用 `subscribeEvents()` 函数订阅了事件，你便可以从 HTML、Android WebView 的 URL 地址 或者直接从 JavaScript 中触发这些事件：

```
// from HTML
<input type="text" name="full_name"
  onKeyUp="triggerEvent('NAME_UPDATE', { name : $(this).val().trim() }, 100);" />

// from URL location (Android WebView can trigger this)
JavaScript: triggerEvent('NAME_UPDATE', { name : 'Karura' }, 100)

// or from JavaScript code
triggerEvent('NAME_UPDATE', { name : 'Karura' }, 100);
```

处于某些原因，在 form 中输入的时候，当 Android WebView 在 URL 地址中执行 JavaScript: func(); 时，软键盘隐藏 WebView 会消失。这可能会导致很不好的用户体验。一个理想的解决方案是，当用户的焦点在表单项的时候，你要么在 Java 层检测焦点，要么从 JavaScript 通知 Java 层，然后使用 JavaScript 从 Java 层拉取内容和事件。这样，在派发事件到 UI 层时可以防止 Android WebView 获取焦点。

## CSS, DOM, and JavaScript: Optimization Tips and Useful Snippets 

我们接下来会介绍如何通过利用高性能的优化技术来避免内存泄露构建一个移动应用。性能在移动应用中是一个大焦点，因为手机的资源是有限的。

### 图片垃圾回收

当你移除 DOM 容器元素时，视图中的图片可能不会被立即被垃圾收集。为了释放前一个图片的引用，你可能需要在安全移除图片对象前，将 `1x1` 像素的透明图片的数据赋值给 `src` 属性。你可以将这个图片编码为 `base64`，以避免一个网络请求。

```js
function removeImage(image) {
        image.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
        setTimeout(function () {
                delete image.src;
                image = null;
        }, 0);
}
```

### Data URI images

在移动应用中使用 `base64` 编码的数据图片是很流行的。这让你的图面能够立即显示在网页中，这能让你的应用更像本地应用。一个额外的好处是你可以从 Java 层轻易取得JSON 字符串中相对小的图片（如头像）。

你可以使用下面的指令手动创建 URI 图片：

    openssl base64 -in image.png

### 预加载图片

也许有些网页数据需要从远程加载或者太大而不适合使用 base64 编码。你可以预加载图面缓存到浏览器内存中。这个解决本法适合在登陆页或者其他有在后台加载数据的机会的 “正门”。

```js
function loadImage(src) {
        var image = new Image();
        image.src = src;
        image.onerror = function() {
                debug.error('Missing image source: ' + this.src);
        };
        return image;
}

var image = loadImage('path/to/image');
image.onload = function() {
        // do something
};
```

对于我们的实例应用，我们可以使用 jQuery plug-in 来加载 CSS 文档中图片。`preloadCssImages.jQuery_v5.js` 插件提过一个从不同目录中预加载图片的方法。

你可以从 [jQuery-Preload-CSS-Images plug-in website](http://goo.gl/Gj6Eh) 加载这个库。

    $(document).ready(function(){
            $.preloadCssImages();
    });

### 避免使用 text-shadow, box-shadow, border-radius, gradient, opacity, CSS RGBA, and image transparency

这些样式效果会减缓 WebKit 中的滚动。`text-shadow` and `box-shadow`  问题在当前的 WebKit 中已经解决了，但是 WebKit 的 Android 版本还没有修复。所以，尽量不要再在滚动区使用，访问 [WebKit bug website](http://goo.gl/SJf87) 查看更多信息。使用 `opacity` and CSS `RGBA` 属性可能在滚动视图妨碍硬件加速渲染。如果这些需要效果，使用 轻量级的 _.png_ 图片，组合多个想过图到一个静态图片中。

### 使用 CSS3 Transitions 而不是 JavaScript animations

CSS3 变换是硬件加速的，不仅使用 CPU 同时也使用显卡的 GPU。他们提供了更平滑的用户体验。

    -webkit-transition: width 1s;

### 雪碧图

一个雪碧图是将一组图片放在单个图片中，并且为每个图片提供一个唯一的位置。使用雪碧图会节省很多 HTTP 请求并节省带宽。比如，你可以把世界上所有国家的标志放在一个单独的 CSS 雪碧图中。这个概念同样可以用在 Android Java 层。你可以在 [Flag-sprites website](http://goo.gl/NWStf) 查看这个例子。

### 对象缓存

缓存的 JavaScript 和 DOM 变量可以让你在迭代和以后的代码中更快地访问。

## Tutorial

- [Android WebKit Development](http://goo.gl/j6m2q)
- [Hybrid Mobile Apps: Providing A Native Experience With Web Technologies](http://www.smashingmagazine.com/2014/10/21/providing-a-native-experience-with-web-technologies)
- [Meteor, Cordova, and Famo.us: The Chill Way to Build Apps - Discover Meteor](https://www.discovermeteor.com/blog/meteor-cordova-famous-the-chill-way-to-build-apps)

### Framework

- [Telerik Mobile Application Development Platform](http://www.telerik.com/platform)    
    + [使用Telerik平台构建Web、混合与原生应用 - 推酷](http://www.tuicool.com/articles/2qiI7f)
- [Hybrid App开发实战](http://www.infoq.com/cn/articles/hybrid-app-development-combat)

### FAQ

- [Android Hybrid App四大坑](http://blog.meathill.com/tech/app/web/traps-in-developing-android-hybrid-app.html)
