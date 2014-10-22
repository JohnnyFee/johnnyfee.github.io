---
layout: post
title: "Android Hybrid Develpment Tutorial"
category: Android
tags: [mobile, android, hybrid]
--- 

## 什么是混合

"混合" 应用是一种特殊的 WEB 应用，它扩展基于 WEB 的应用，并且可以使用设备平台的本地 API。混合应用的设计模式同时适用于移动和桌面环境。

<!--more-->

__相对本地应用的有点：__

- 缩短跨平台开发周期

- 丰富的人力资源

- 简化审核过程。大多数的应用商店在产品上架前都有一个审核过程。因为混合应用可以不通过应用商店更新，所以你无需提交到应用商店。一旦你审核通过，之后你可以自由更新。需要注意的一点事，一旦你对本地代码做了更改，这时候你就需要提交一个新版本到应用商店。

- 混合应用是未来。展望移动系统技术，你可以很容易认为混合应用是开发的未来。 Windows Phone 8，Google 提出合并 Chrome OS 和 Android，Tizen OS 和 Firefox 证实了这一点，因此，在不久的将来，构建和发布混合应用是具有战略性的正确选择。

<!--more-->

__相对本地应用的不足：__

- 性能。因为 JavaScript 是单线程的，你可能会碰到性能问题。然而，你可以把后台任务在运行本地线程中，这样，当应用忙于处理 UI 操作时，这人任务同时可以并行。本地线程会将事件和完成失败通知到 JavaScript。

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

### 在 Java 层调用 JavaScript 函数

混合应用的一个关键特点允许本地代码调用 JavaScript 的 API，比如传递数据，回调和事件，WebKit 没有直接的 API，开发者经常使用 `loadUrl()` 函数来达到这个目的。`loadURL()` 函数请求 WebView 加载和执行指定的 URL。

比如，如果我们希望在 WebView 中显示一个提示框，我们可以像这样：

```java
String js = "alert('Alert from Java');";
WebView.loadUrl("JavaScript:" + js);
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

If you set your `targetSdkVersion` to 17 (or higher) in _AndroidManifest.xml_ all the methods that are accessed by JavaScript must have `@JavaScriptInterface` annotations.]()

```java
import android.WebKit.javaScriptInterface;

// SDK version 17 or above.
@JavaScriptInterface
public void showToast(String toast)  {
        // show toast...
}
```

In Android 2.3, the `addJavaScriptInterface()` method does not work as expected. However, given _2.3_ is still the most used version of Android, you may want your application to work on 2.3 devices as well.

Developers across the Web have come up with a number of workarounds to take care of this. You can find one such implementation at [Android 2.3 WebView’s broken AddJavascriptInterface website](http://goo.gl/EICOa).

Another approach is to use an `onJsPrompt()` callback. Wherein the `message` or the `defaultValue` parameter can be used to pass the name of the method to be executed in the native environment along with params.

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

### Calling JavaScript Methods from Java

Calling JavaScript methods from Java is not as straightforward as accessing a Java method from JavaScript. JavaScript objects are not exposed in the Java layer. The way you call a JavaScript function is by creating a JavaScript URL, which is then passed onto the WebView for execution. There are a couple of technical fallouts of this approach. The first being that you have to be aware of the JavaScript runtime code structure, and second, you must ensure that the JavaScript URL has proper error handling defined as part of the JavaScript. The JavaScript URL can be passed onto the WebView, and hence the JavaScript environment, using `loadURL()` (or similar) API. Also note that the JavaScript receiver object has to be made addressable from the Java layer. You can do this by either making the scope of these variables global or by building some form of dispatcher framework that can route the response to a correct receiver object.

The reasons behind this rather complex marshaling of data back from Java to JavaScript are:

* JavaScript is single-threaded, hence, calling into JavaScript would involve marshaling the response parameters to the thread hosting the JavaScript engine.
* The JavaScript URL approach has long existed and appears to be a perfect candidate solution for this, instead of developing a completely new API.

### Routing Data to the Correct JavaScript Receiver

In the previous section, we touched upon needing a form of routing framework for delivering responses from Java to the correct JavaScript objects. There are several ways you can achieve this.

* If you use an existing hybrid application framework like PhoneGap, Cordova, or Karura, then this is already done for you.
* You can use some of the existing asynchronous function framework available in JavaScript—for example, the Deferred Object framework available in jQuery.
* Build a custom framework yourself.

### Deferred Object Pattern

The Deferred Object pattern is the key pattern used by a number of JavaScript applications for decoupling of the request from the code that handles the results of the request and allows multiple callbacks to be attached upon notification of a result. To achieve such a decoupling, the Deferred Object provides functions that allow the callback functions to be registered for handling the success, failure, or the progress of the request. Deferred Object framework is available as part of the jQuery library.
Here’s how to create a deferred object in jQuery:

```js
var deferred = $.Deferred();
// var deferred =  new Deferred();
// var deferred = jQuery.Deferred();
```

#### Register Success Callback Using deferred.done()

The `.done()` function allows a callback function to be registered with the Deferred Object. This callback function will be called once the request is successfully completed when `.resolve()` is called on the Deferred Object.

```js
deferred.done(function(data) {
    console.log("Success callback: " + data);
});
```

#### Register Failure Callback Using deferred.fail()

The `.fail()` function allows the registration of a callback that will be called if the request fails with any error when `.reject()` is called on the Deferred Object. The function can provide the appropriate error code and message that describes the error encountered.

```js
deferred.fail(function(errCode, errMsg) {
   console.log("Failure callback: " + errCode + " - " + errMsg);
});
```

#### Register Progress Callback Using deferred.progress()

The `.progress()` function provides the option to update the caller of the progress of the request. The callback function can be called multiple times during the lifetime of the request while `.notify()` is being called on the Deferred Object. In contrast, the `.done()` and `.fail()` callbacks are executed only once per lifecycle of the request.

```js
deferred.progress(function(percentage) {
    console.log("Progress callback: " + percentage);
});
```

In addition to using the Deferred Object to indicate success or failure of the request, it can be used to indicate the status of the request as well. The callback function that needs to be provided with the status update of the request can be registered using the `.progress()` or using the third parameter of the `.then()` function.

To be able to update the status by calling the progress callback registered, the Deferred Object provides the `.notify()` function that takes the progress update parameters as arguments. For example, this callback can be used to update the UI elements such as the progress bar for providing feedback to the user.

```js
function progressBar() {
    var deferred = $.Deferred();

    var i = 0;
    var intervalId = setInterval(function() {
        deferred.notify(++i);
        if (i == 99) {
                        clearInterval(intervalId);
                }
    }, 1000);

    return deferred.promise();
};

var promise = progressBar();

promise.progress(function(percentage) {
        console.log(percentage + "% completed");
});
```

The progress callback function can be called multiple times during the lifetime of the request. In contrast, the `deferred.resolve()` and `deferred.reject()` functions are only executed once per the lifecycle of the request.

In the following simple example, we can see the whole picture of how the Deferred Object is used.

```js
function requestDB() {
    // 1 - create the Deferred
    var deferred = $.Deferred();

    XMLHttpRequest xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/contact", true);
    xhr.addEventListener('load', function() {
            if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status <= 300)
                            || xhr.status == 304) {
                            // 3a - triggers the .then() or
                            // .done() callbacks
                            var response = { name: "O'reilly" };
                            deferred.resolve(response);
                    } else {
                            // 3b - triggers the .fail() callback with
                            // an error code and a message
                            deferred.reject(404, "File not found.");
                    }
            }
    }, false);
    xhr.send();

    // 2 - return the promise right away
    return deferred.promise();
}

$.when(RequestDB()).then(function(response) {
    // 3a1 - access to returned parameters
    console.log(data.name);
}).fail(function(errCode, errMsg) {
    // 3b1 - access to fail messages
    console.log("Failure callback: " + errCode + " - " + errMsg);
});
```

When the `requestDB()` function is called by the `$.when()` function, there are four steps expected to happen:

1.  We create a Deferred Object that can then facilitate callbacks to be fired based on the expected results from the program.
2.  Once the Deferred Object is created, we return this object immediately so the consumer application can attach different utility functions, such as `.done()`, `.then()`, or `.fail()`, to handle its outcome.
3.  If the application returns a result successfully from the source, then we have to let the consumer application know about this outcome. In this case, we call the `.resolve()` function with or without return parameter `response`.
        1.  Once the Deferred Object resolves the result with a success outcome and passes any parameters to a handling function we can access these parameters (including the `response` parameter) from the anonymous callback functions in `.done()` or `.then()`. In our case, the `response` JSON object holds the return data, and we should be able to access the key/value pairs within the callback function.
        2.  If the outcome results in a failure, we can also let the consumer application know about it. It is good practice to pass descriptive messages to the consumer application about what went wrong while processing the request. In our case, we pass an error code and a message to the consumer application to handle the result accordingly.
        3.  if we receive a failure from our request, then the `.fail()` function is able to pass us the parameters that are dispatched from `.reject()`. In our case, we can access the error code and the message from our anonymous function in order to handle this failure with a friendlier error message to the users in the UI.

#### Simpler Callback registration with .then()

The `.then()` function provides a convenient way to specify the success, fail, and progress callback functions in one place. All of the callback parameters are optional, which allows the developer to declare the callbacks only for the functions that are of interest. The `.then()` function is fired when the `.resolve()` or `.reject()` functions are called on the Deferred Object.

The structure of the `deferred.then()` function is as follows:

    deferred.then(successCallback, failCallback, progressCallback);

Combining the example given for `.done()`, `.fail()`, and `.progress()`, to use the `.then()` function, we would be able to achieve an equivalent behavior as shown here:

```js
deferred.then(function() {
        console.log("Success callback");
}, function(errCode, errMsg) {
        console.log("Failure callback: " + errCode + " - " + errMsg);
}, function() {
        console.log("Progress callback");
});
```

#### Synchronizing Multiple Asynchronous Events with $.when()

You can also synchronize one or more events using deferred’s `$.when()` helper function, as in the following example. The `$.when()` function waits for all its tasks to be executed, and once supplied deferred events are resolved, depending on the events’ success and failure states, `.then()` or `.fail()` callbacks will be fired. If one of the tasks fails, then `.fail()` will be invoked.

```js
function doThis() {
   return $.get('this.html');
}

function doThat() {
   return $.get('that.html');
}

$.when(doThis(), doThat()).then(function(data) {
        console.log("Both events are successful.");
}).fail(function(errCode, errMsg) {
        console.log("One or more events are failed.");
});
```

#### Resolve a Deferred Object

The potential of the Deferred Object is seen by allowing the success callback(s) to be called when the request is completed successfully.

The Deferred Object can be used to invoke the success callback(s) by calling the `.resolve()` function on the Deferred Object. The `.resolve()` function can be used to provide the callback function(s) with the arguments that communicate the artifacts of the request.

```js
var deferred =  new Deferred();

// register the success callback with two args
deferred.done(function(arg1, arg2) {
        alert("Success callback with two artifacts");
};
// Do some processing resulting in artifact1 and artifact2
        .
        .
        .
// Calling the resolve function on the Deferred Object with two artifacts as
// arguments will trigger the success callback to be called with the same.
deferred.resolve(artifact1, artifact2);
```

#### Reject a Deferred Object

Similarly, the other important usage of the Deferred Object is to notify any interested parties to the failure of an async request.

The Deferred Object can be used to invoke the failure callback(s) by calling the `.reject()` function on the Deferred Object. Similar to the success callback, the `.reject()` function can be used to provide the failure callback(s) with error codes and error messages that describe the cause of the failure.

```js
var deferred =  new Deferred();

// register the failure callback with the errorCode and errorMsg args
deferred.fail(function(errorCode, errorMsg) {
        alert("Failure callback: " +errorCode+ " & message" + errorMsg);
};
// Do some processing resulting in an error with errCode and corresponding
// error message errMsg
        .
        .
// Calling the reject function on the Deferred Object with the error code
// and err message would be passed back to the callback function(s) that
// have been registered.
deferred.reject(errCode, errMsg);
```

### Use of Promise

A typical usage of a Deferred Object pattern would be to provide the caller of a function with a handle to a Deferred Object. The caller can use the handle to set the callbacks that it is interested in.

In addition, the function that created the Deferred Object would want to restrict the ability to finalize the Deferred Object by calling `.resolve()` or `.reject()`, to only itself or its downstream functions.

Both the requirements are supported in the Deferred Object framework by the `.promise()` function. The `.promise()` function returns a Deferred Object that can be used only to set the callbacks but not call the functions that could alter the state of the object. The called function can return this to the caller, which can then set the callback functions required upon the Deferred action completion.

For example, consider an Ajax request to download a web page. The call flow showing the usage of promise is as follows:

```js
function ajaxRequest(url) {
        var deferred =  new Deferred();

        // Initiate the request to download url and pass the
        // Deferred Object to enable the downstream downloader
        // to call resolve() or reject() and progress() as necessary
        download(url, deferred);

        // Return the Deferred Promise Object to enable the
        // callbacks to be set by the caller
        return deferred.promise();
}

function caller() {
        ajaxRequest("http://oreilly.com")then(function() {
                alert("Page successfully downloaded");
        }, function(errCode, errorMsg) {
                alert("Failure Callback: " + errCode + " - " + errorMsg);
        }, function() {
                console.log("Progress update called");
        });
}
```

### Domain Whitelisting

You can create an allowed list of domains that WebView can view if your application needs to navigate to domains outside the expected domain. Just use the `shouldOverrideUrlLoading(WebView view, String url)` method:

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

A solution to the problem mentioned in the Warning would be to intercept the request and manually load different content into this view.

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

### Thread Safety

从 JavaScript 访问 Java 对象时，方法可能运行在一个和 WebView 相关的后台线程中，这个线程不同于主应用线程。这意味着应用开发者在 JavaScript 中访问 Java 对象以及这些方法中的对象域时，应该注意线程安全问题

为了解决这个问题，我们建议使用一个主线程相关的处理器让访问 Java 方法的请求排队。这个处理器可以将这些事件发送给主线程，从而避免任何线程问题。

你可以扩展这个思路，在 非 UI 的 looper（和相关的 handler）上排队 UI 无关的事件，从而让 UI 线程具有轻量性和和可访问性。

## WebViewClient

Android’s WebView is extensible and implements a number of delegatory classes including WebViewClient and WebChromeClient, which can be used by developers to customize the default behavior of WebView and inject data in the request/response call flows.

WebViewClient is a class that the WebView refers to before it handles everything that, in some way, is related to the rendering of a page. Using this class, you can add callback methods that are invoked to inform you of changes in the rendering.

These callbacks include:

* Start and stop loading of web requests
* Whether the browser should load specific resources
* Notify errors, login requests, and form resubmissions

Android WebView has a default implementation of the WebViewClient, which can be overridden by the default delegate using the `setWebViewClient()` method of the WebView.

```java
webView.setWebViewClient(new WebViewClient(webView) {
  // override all the methods
});
```

## WebChromeClient

WebChromeClient is also a delegate class, responsible for everything browser UI specific, unlike the WebViewClient, which is responsible for everything that is related to the rendering of the web content.

The WebChromeClient lets you handle the browser’s visited history, create new windows, take care of alerts, prompts, and console messages. A simple application with no requirements on the integration will be fine without overriding the default WebChromeClient delegate. You can specify your own delegate using the `setWebChromeClient()` method of the WebView.

```java
webView.setWebChromeClient(new WebChromeClient(webView){
  // override all the methods
});
```

## WebSettings

WebView in Android, provides a very comprehensive configuration interface, `WebSettings`, which can be used to customize the behavior of the WebView at runtime. The `WebSettings` object is valid only during the lifecycle of a WebView. In other words, an `IllegalStateException` will be thrown if you try to access any method from a `WebView.getSettings()` object if a WebView is already destroyed.

You can retrieve `WebSettings` with `WebView.getSettings()` API.

```java
WebView WebView = new WebView(this);
WebSettings settings = WebView.getSettings();
```

### Preventing Local Files from Being Loaded in the WebView

The `setAllowFileAccess()` API allows developers to control access to local files by the WebView. This API is one of several WebView settings you can configure at runtime. By default, this setting is enabled for accessing files in the filesystem. This setting does not restrict the WebView to load local resources from the _file:///android_asset_ (assets) and _file:///android_res_ (resources) directories. For security reasons, if your app does not require access to the filesystem, it is a good practice to turn this setting off.

    settings.setAllowFileAccess(false);

### Enabling JavaScript

For security reasons, JavaScript is _disabled_ in the WebView by default. You can enable/disable JavaScript using `setJavaScriptEnabled()` method.

    settings.setJavaScriptEnabled(true);

We suggest that you always include all the JavaScript libraries in the assets directory of your application within your hybrid app.
If you are using third-party JavaScript libraries in your application, eventually, your application will inherit all the bugs and vulnerabilities that may cause undesired situations for your application. Some developers prefer downloading third-party JavaScript from their own web servers to mitigate the risks of being hacked. This allows them to react more quickly than others in removing the malicious code from the web server.
Again, ideally, you should deliver all your JavaScript files within your application.

Turning on some of the WebView settings unnecessarily may result in unexpected behavior in your application. Hence, it is a good practice to turn off features not required by your application.

For example, if you are not using a Flash plug-in, turn it off using the `setPluginState(PluginState.OFF)` method, which may prevent attackers from compromising your app via third-party plug-ins.

```java
WebView WebView = new WebView(this);
WebSettings settings = WebView.getSettings();
settings.setPluginState(PluginState.OFF);
```

We encourage you to read the following research papers published by Syracuse University in New York:

- [“Attacks on WebView in the Android Systems” article](http://goo.gl/LyPev).
- [“Touchjacking Attacks on Web in Android, iOS, and Windows Phone” article](http://goo.gl/i89Sn).

### Setting Default Font Size

By default, the WebKit renders and displays fonts in 16 sp (scale-independent pixels) unit. This unit enables WebView to adjust the font size for both screen density and the user’s preference. If you would like to change the font size to something other than the default size, you can use the `setDefaultFontSize()` method with the preferred font size value.

### Zoom Controls

Setting the `setBuiltInZoomControls()` method to `false` will prevent the built-in zoom mechanisms. Setting this to `true` will allow the `setDisplayZoomControls()` method to show onscreen zoom controls. `setDefaultZoom(ZoomDensity.FAR)` sets the default zoom density of a web page. Setting its value to `FAR` makes it appear in 240 dpi at 100%. `setSupportZoom()` with `false` value will set whether the WebView should support zooming using its onscreen zoom controls and gestures or not.

From the user experience perspective, turning off zooming for the most of the mobile apps will be ideal for many users unless the application features require zooming.

```java
WebView WebView = new WebView(this);
WebSettings settings = WebView.getSettings();
settings.setBuiltInZoomControls(false);
settings.setDefaultZoom(ZoomDensity.FAR);
settings.setSupportZoom(false);
```

### Hardware Acceleration

Starting at version 3.0, Android introduced full hardware acceleration for applications. This is not enabled by default for applications targeted for platforms below version 4.0. The web browser itself moved to a _tile-based rendering architecture_ as opposed to display list architecture, which makes it more responsive.

If you wish to enable hardware acceleration in your application or activity, you can set `android:handwareAccelerated="true"` in your manifest.

```java
// enable hardware acceleration using code (>= level 11)
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
    WebView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
}
settings.setRenderPriority(WebSettings.RenderPriority.HIGH);
settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
```

If you enable hardware acceleration for your application, make sure you test it. Enabling hardware acceleration has side-effects, the most important one being that it adds a significant amount of memory requirements to your application (approx. 7-8M at minimum). This can have huge impact on low end devices.

Given that the Android ecosystem is so heavily fragmented, it is possible that you may observe issues with hardware-accelerated WebView. To selectively turn off hardware acceleration for your WebView, you can either set it to `android:handwareAccelerated="false"` for the entire application or the activity hosting the WebView in the application manifest file.

You can achieve the same effect programmatically using the following code:

```java
// selectively disable hardware acceleration for WebView
// honeycomb (3.0) and higher
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
        WebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
}
```

## Architecture of a Hybrid Application

Hybrid applications are special, bringing together best of both worlds to an extent. A sufficiently complex hybrid application would typically contain most of the component. Let’s quickly go over these components before we delve into more details.

![](http://johnnyimages.qiniudn.com/android-hybird-architect.png)

__WebView__

A hybrid application is a primarily a web app with access to platform capabilities through an additional set of user defined APIs. This web application requires a WebView to render content and host the business logic.

__View, model, and controller__

Since the application is primarily written in JavaScript, depending upon the JavaScript library you use, you will have some form of implementation of model, view, and controller components.

__JS-Java Bridge__

It is the glue layer that allows the native and web environments to interact with each other. The bridge should allow for execution of synchronous and asynchronous APIs. As was discussed in the previous chapters, this layer is one of the most crucial layers in a hybrid application for several reasons, including performance, ease of use, and security.

__Java plug-ins__

A Java plug-in is the user defined extension API that has been exposed to the JavaScript environment.

__Native components__

These are native services and components you wish to access as part of your hybrid applications. Some of the examples include showing actionbar, native dialogs, accessing location, and so on.

__Application data__

While HTML5 data storage gives us some capabilities to store data, you may often want to store BLOBs in custom formats; this is where application data, filesystem APIs, and native APIs come into play.

__Assets and resources__

Assets and resources contain the static artifacts that ship with your application. You can use resources to localize text if you like.

__Native business logic__

One very important architectural split while designing hybrid applications is the split for the business logic between the native and web components. Often you may feel the need to implement part of the business logic in the native layer for several reasons, including access to native components, additional security, or just that a particular component you wish to link to is only available in the native layer.

## HTML Architecture for Hybrid Applications

Your hybrid application is primarily an HTML5 web page built using mobile-optimized JavaScript and CSS-styled to look and feel native. Like any application, hybrid applications can be rather complex depending upon the user experience. For the sake of simplicity, let’s assume a simple app that contains a single WebView and a single entry point web page—for example, index.html. An hybrid application will be visible to users like any other application on the application launcher. Once users tap on the application launch icon, the main activity will be created containing a WebView with no browser chrome visible. Upon creation, the WebView will load your default entry point web page to initiate the user experience. From that point on, the design of the web component is completely your choice, however single page applications have recently emerged as a de facto design strategy for these applications. Let’s look at this design pattern in slightly more detail.

### Architecture of a Web Application

A typical web application can architecturally be represented as:

![](http://johnnyimages.qiniudn.com/android-hybrid-html.png)

The architecture is self explanatory, however, we would like to reiterate a few salient points:

* UI events generate DOM objects based on user interactions.
* The model abstracts network connectivity and storage making the controller and views agnostic of the source and destination for data.
* The model is assumed to be the only component that stores anything about the data.

### Key Design Considerations for Single Page Applications

Here are some things to keep in mind when creating single-page applications:

* Modularize your code as much as possible.
* Try to make these modules independent of each other, if possible.
* Use the proper access paradigm for variable names. Make sure you do not expose what is not required.
* Develop a mechanism wherein you can explicitly identify module dependencies and hence load them at runtime.
* Additionally, it would be beneficial if non-UI modules can be run from the command line. This will greatly facilitate unit testing.

### The Libraries and Frameworks for Your Hybrid Apps

- Backbone.js for MVC Framework
- Underscore.js for Utility Support
- iScroll.js for scrolling. iScroll.js is a must-have library that enables scrolling the view using JavaScript. This library was developed to accommodate the limitations of the mobile WebKit, which does not provide a native and cross-device way to scroll content inside a fixed width/height element.

    To use `iScroll.js`, list items need to be appended to an `iScroll` container element.

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

    Since a list needs to be prepopulated, you may experience performance issues when you render a large amount of list items, such as 1,000 rows in a roster. Of course, you can use pagination to break down the content into multiple views, however, there are cases where you want to list all of your content within the same view.

    Ideally, `iScroll` should allow us to append items to the DOM progressively as you scroll, which is currently not supported. One approach to overcome this limitation would be to progressively load the content into scrolling area using `setTimeout(func, delay)`. This way we can load an initial set of items into the view to give the illusion that the content is loaded fast enough to view, thereafter, we can append the rest of the elements to the scrolling container as the user starts scrolling.

    This method works fine for a relatively small list of items in the list view. The ideal solution would be appending the list items to the scrolling view one by one dynamically as you scroll. This optimization technique would offer a better user experience than the previous one we mentioned here.

- jQuery.js for JavaScript application

    __Preload Images Within the CSS Files__

    For our sample application, we will be using a jQuery plug-in to preload the images in our CSS documents. The `preloadCssImages.jQuery_v5.js` plug-in offers an unobtrusive way to preload all your images from different directories, which are defined in your CSS files.

    You can download this library from the [jQuery-Preload-CSS-Images plug-in website](http://goo.gl/Gj6Eh).

        $(document).ready(function(){
                $.preloadCssImages();
        });

    At the time of this writing, we have observed that the images that are defined in the CSS documents are not loaded properly in the WebView UI by Android. This could happen for several reasons. Using preloadCssImages.jQuery_v5.js, you can work around these issues by downloading images explicitly.

### CSS Reset Avoids Browser Inconsistencies

Not all browsers are created equal, the same goes for mobile browsers. CSS Reset is a way to keep the rendering results as universal as possible by resetting the built-in default style values to a baseline value before your custom CSS is applied.

HTML5 Boilerplate provides two CSS files (_main.css_ and _normalize.css_), which offers a nice way of resetting your browser’s default style settings. You can download these files from the [Html5boilerplate website](http://goo.gl/3JUxZ).

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

### Your Home index.html

The _index.html_ web page will be launched by the WebView when an activity starts. This web page is normally placed in the _assets_ directory. We defined the `viewport` meta tag, which controls the initial appearance when the web page loads. The CSS `link` tag was intentionally left blank because we like to load our CSS files using JavaScript by respecting the `window.devicePixelRatio` window property.

We discovered that in some older versions of the Android API, our sample app was crashing when processing the **`0.75`** Device Pixel Ratio (DPR) while loading the CSS using the `link` tag. We were able to re-produce this abnormal crash with a few more same-generation phones as well. However, the usage that follows is more responsive than loading these CSS files in JavaScript; you may see a nonstyled view first for a split second, then a styled version will be shown due to the `onDomReady()` delay in JavaScript.

The following way of loading your CSS into the DOM is the ideal way:

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

Other possible solutions follow, but are not recommended unless it is necessary to load your CSS this way.

Loading CSS using a JavaScript function for different DPIs:

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

`#dpr-css` is the ID of your stylesheet `<link>` tag in the HTML.

```html
<link id="dpr-css" rel="stylesheet"
      href="css/default.css"
      type="text/css"
      media="screen" />
```

Alternatively, you can append your stylesheets to the DOM for different densities using the following code. However, we do not recommend this technique.

```js
$('HEAD').append($('<link rel="stylesheet" href="xhdpi.css" type="text/css"
        media="screen and (-webkit-min-device-pixel-ratio: 2.0)" />'));
```

Here’s a sample source of a template file for a hybrid Android application:

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

The `viewport` meta tag defines a set of properties that describes the behavior and initial appearance of the web page when it is rendered for the first time based on the device screen size. The _viewport_ is the section of the web page that is shown in the view. This `viewport` meta tag is supported by many mobile browsers.

#### Viewport Width

The `width` of the viewport in pixels tells the browser how best to render the web page width-wise. In this example, we are targeting 320 px wide screens to display our content.

    <meta name="viewport" content="width=320">

This does not scale the view for different screen sizes. In particular, Android device fragmentation makes this more of a concern than on other platforms. So using the `device-width` value for the `width` property in the viewport tag would allow the content to be scaled to the available width on the screen.

    <meta name="viewport" content="width=device-width">

In this case, whether your screen width is 480 px in portrait mode or 800 px in landscape mode, the `device-width` value makes the available `width` independent of how wide your screen is.

#### Viewport Scaling with the Content Attribute

Here are a few of the available options for the `content` attribute:

__initial-scale__

The initial zoom of a web page. Its scale is a multiplier from 0 to 10.0 that sets the scale of a web page after its first display. The larger value zooms in, but 1.0 means no zoom.

__minimum-scale__

The minimum multiplier the user is able to zoom out of a web page. 1.0 does not allow any zooms. Its scale is from 0 to 10.0.

__maximum-scale__

The maximum multiplier the user is able to zoom in to a web page. 1.0 does not allow any zooms. Its scale is from 0 to 10.0.

__user-scalable__

The permission (yes/no) as to whether the user is able to control the scale (zoom in/out) of the web page or not. The default value is yes.

Support for the `target-densitydpi=device-dpi` property has been dropped from WebKit in favor of responsive images and CSS device units. This property was not supported by iOS anyway. The issue can be followed at the [WebKit bug website](http://goo.gl/URmQd).

```html
<meta name="viewport" content="width=device-width,
        minimum-scale=1,
        initial-scale=1,
        maximum-scale=1,
        user-scalable=no" />
```

This meta tag has an important role when optimizing the web page for mobile devices. It basically prevents the mobile browsers from altering the zoom level of that web page unilaterally.

### Responsive Design and Media Queries

In the mobile app paradigm, responsive design should be carefully considered when it comes to content adaptation and presentation because the available screen area is limited.

Media queries in CSS3 help the application adapt to different sets of properties and rules for your CSS styling. Media queries allow us to target not only certain generations of devices but also to scrutinize some of the characteristics of a device to target certain styling attributes such as `orientation`, `device-aspect-ratio`, `color`, or `resolution`.

Responsive design is fulfilled by using the media queries in the CSS files to improve the _device-specific_ response while the `media` attribute controls which styles to apply.

There are three ways to define CSS media queries in your HTML documents. We will be using the first technique in our sample application.

In the `<style>` element as media rules:

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

As an external include:

```html
<link rel="stylesheet"
        type="text/css" href="small_screen.css"
        media="only screen and (max-width: 320px)" />
```

by importing the stylesheet:

    @import "small_screen.css" only screen and (max-width: 320px);

[Android provides WebKit as a rendering engine, which supports a proprietary property called `-webkit-min-device-pixel-ratio` that returns the pixel density of that device. There are currently at least four possible values for the Device Pixel Ratio (DPR): `0.75`, `1.0`, `1.5`, and `2.0`. These values can accessed from JavaScript using the `window.devicePixelRatio` window property.

* If the `DPR` is 0.75, the device is considered low density and the web page is scaled down by default.
* If the `DPR` is 1, the device is considered medium density and the web page is not scaled at all.
* If the `DPR` is 1.5, the device is considered high density and the web page is scaled up by this ratio.
* If the `DPR` is 2, the device is considered extra high density and the web page is scaled up by this ratio.

To understand a little bit more about pixel density, see this in-depth article by Peter-Paul Koch, visit the [Quirksmode website](http://goo.gl/hKYlS) for pixel density.

### EM or Percent (%) unit for scalable interface

There are several kinds of units available for scaling an HTML element in the browser: EMs (em), Root Ems (rem), Pixels (px), Picas (pc), Exes (ex), Percents (%), and Points (pt). However, some of them are not largely supported for the `font-size` property to scale the text size in the CSS document.

We focus on two of these for mobile applications: `em` and `%`. If you would like to display the correct size of text in all screen resolutions, `em` or `%` is the ideal solution because they are the most commonly used ones for the font sizes on the Web, but which one is more preferable and why? Designers and developers are often confused with which to choose for font size in the CSS properties.

Normally, the WebKit renders the font sizes as 16 px (16 sp in Android) unless you change the default font size in the WebKit settings explicitly using the `setDefaultFontSize()` method. In other words, most web browser render the font sizes as the `16px`, which is equal to `1em` or `100%`. However, we do not recommend you use the `px` unit for the font sizes in your CSS documents.

The W3C also recommends using `em` or `%` for the font sizes for more scalable and robust stylesheets. We actually found out that using percent (`%`) for the font size allows designers to preserve readability for maximum consistency and accessibility in visual designs.

Sometimes setting a `font-size` value to an inner HTML tag may not give you the result that you expect. This is because the inner element inherits the `font-size` from its parent and applies its own `font-size` relative to its parent’s `font-size`. As a result, you may end up seeing a smaller font.

Font size inheritance in nested HTML tags looks like the following:

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

Therefore, the first `<header>` tag has a font size as `2em`, which is twice the base font size, then the inner `<span>` tag in the second `<header>` tag will inherit its parent tag as `2em`, then it will multiple with `0.5`. It will result in `1em`, but if you look at the second `<span>` tag, its font size is actually the correct `0.5em`. Both `em` and `%` units get bigger as the base font size increases. The font experiment can be seen at the [Jsfiddle website](http://goo.gl/AVRxh).

It is also possible that you may need to convert `px` to `em` or vice versa. You may programmatically do the conversions using this handy jQuery plug-in in your application. Visit the [jQuery-Pixel-Em-Converter plug-in website](http://goo.gl/BwjJZ) or use the tool at the [Pxtoem website](http://goo.gl/iTYJE).

__CSS3 Introduces rem Unit:__

The `rem` unit is relative to the root (`<html>`) element. You can define a root font size, and then you can use that font size as a baseline within your CSS document. As we mentioned earlier, `em` causes a compounding issue for nested elements, which inherit the `font-size` from their parents, whereas the `rem` unit prevents this undesired behavior and gives designers and developers control of the font size by taking the percentage of the root (`<html>`) element’s font size for each element independently, even if they are nested.

### Opacity or RGBA: What Is the Difference?

The `opacity` property in CSS specifies the amount of transparency for an element. Its value can be anywhere from `0.0` to `1`. A lower opacity value means the element can be more transparent. A higher value means the element is fully opaque. The main difference between `opacity` and `RGBA` is that `opacity` affects an element’s children with the same opacity level while `RGBA` has an effect on the transparency of a single element only for independent opacity.

    -webkit-opacity: 0.5;

RGBA stands for _Red, Green, Blue, and Alpha_. CSS3 introduced the RGBA support to set the alpha transparency, which sets the opacity via the alpha channel and controls how much of what is behind the color shows through.

    background: rgba(255, 0, 0, 0.5);

WebKit supports RGBA in CSS properties; however, there is a performance issue with RGBA in scrolling views. We will talk about these performance tips and tricks in later chapters.

We will use the RGBA conversion tool at [Devoth’s HEX 2 RGBA Color Calculator website](http://goo.gl/R7X82) to convert `HEX` colors to `RGBA` format for our example application.

### Event Pooling

As your application gets complex, managing events can be burdensome. Organizing the events into an event pooling mechanism, which is a variation of observer pattern, mechanism might be one alternative solution to manage dependencies. jQuery offers the `bind` and the `trigger` APIs to handle event pooling in a easy way. Event pooling can be really useful when the events are dispatched from the Java layer using Android WebView.

Here is an example of event pooling using jQuery’s `bind` and the `trigger` APIs.

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

The following code allows us to bind an event to the document, which can be then called from various sources, such as HTML, a URL location, or JavaScript code itself using the `trigger` API in jQuery. You may notice that multiple event names can be registered using the `bind` API.

```js
function subscribeEvents(eventName, callback) {
        $(document).bind(eventName, callback);
}

subscribeEvents('NAME_UPDATE PHONE_UPDATE', function(e, data) {
        updateContact.apply(null, [e, data]);
});
```

Using the following code, we can easily encapsulate a common functionality into the `triggerEvent()` method in which triggering an event would be very easy using the `eventName`, `args`, and `delay` parameters.

```js
function triggerEvent(eventName, args, delay) {
        setTimeout(function() {
                $(document).trigger(eventName, args);
        }, delay || 0);
}
```

Once you subscribe to your events using `subscribeEvents()` function, you can trigger these events from HTML, using the URL location from the Android WebView or you call them from the JavaScript code itself.

```
// from HTML
<input type="text" name="full_name"
  onKeyUp="triggerEvent('NAME_UPDATE', { name : $(this).val().trim() }, 100);" />

// from URL location (Android WebView can trigger this)
JavaScript: triggerEvent('NAME_UPDATE', { name : 'Karura' }, 100)

// or from JavaScript code
triggerEvent('NAME_UPDATE', { name : 'Karura' }, 100);
```

For some reason, when Android WebView executes the JavaScript: func(); code in the URL location, the WebView gains the focus and dismisses the soft keyboard while typing in a form field. This behavior can cause very unpleasant experiences for users if they are chatting in your app. One ideal solution could be that when a user focuses into a form field, you either detect the focus in the Java layer or notify the Java layer from JavaScript, then pull the content and events using JavaScript from the Java layer. By doing so, you can prevent the Android WebView from gaining focus while dispatching the events to the UI layer.

## CSS, DOM, and JavaScript: Optimization Tips and Useful Snippets

In this chapter, we will explore how to build snappy mobile applications by taking advantage of high-performance optimization techniques while avoiding memory leaks. Performance is a big focus for mobile applications, as smartphones have limited resources.

### Image garbage collection

The images in the view may not be immediately garbage collected when you remove the DOM container element. In order to release the previous image reference, you can assign a `1x1` pixel transparent data image `src` attribute before safely removing the image object. You can encode this image as `base64` to avoid a network request.

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

Use of `base64` encoded data images is very popular in mobile apps. It involves inlining your image data straight into the HTML or CSS page. It allows images to load instantly with your web app’s HTML page—something very important if you want your app to function like a native app. An additional benefit is that you can easily retrieve relatively small images like the avatars within the JSON strings from the Java layer. If you want to create data URI images manually, you can use the following command in your terminal window:

    openssl base64 -in image.png

### Preloading images

Perhaps some of your web data needs to come from a dynamic remote resource or is too large to use base64. You can also preload images to cache in your app browser’s memory. This solution is perfect for login pages or other “doorways” where you have the opportunity to load data in the background.

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

### Avoid using text-shadow, box-shadow, border-radius, gradient, opacity, CSS RGBA, and image transparency

These styling effects can slow down the scrolling in the WebKit. The issues with `text-shadow` and `box-shadow` are already resolved in the current WebKit, but the Android version of WebKit hasn’t been fixed yet. So, use them on scrolling areas sparingly; visit the [WebKit bug website](http://goo.gl/SJf87) for additional information. Also, using the `opacity` and CSS `RGBA` properties in CSS may interfere with hardware accelerated rendering in the scroll view. If these effects are needed, use lightweight _.png_ graphics that combine many of these effects into one static image or experiment with how much you can do in CSS3 and how much you will need to statically create. This is especially required for scrolling or animating areas of your application.

### Use CSS3 Transitions instead of JavaScript animations

CSS3 Transitions are hardware accelerated, harnessing not just the CPU but the GPU of the video card. They offer much smoother user experiences than their counterpart.

    -webkit-transition: width 1s;

### Image sprites

An image sprite is a collection of images placed into a single image while assigning a unique position for each one. Using image sprites will reduce the number of HTTP requests to the web server and save bandwidth. It is also an ideal technique for game applications in order to load images faster. For example, you could put all the world countries’ flags in a single CSS sprite. This concept can be easily used in the Android Java layer as well. You can find more about this example at the [Flag-sprites website](http://goo.gl/NWStf).

### Object caching

Caching the JavaScript and DOM variables allows you to access them faster in the iterations or later in the code.

## Tutorial

- [Android WebKit Development](http://goo.gl/j6m2q)

### Framework

- [Telerik Mobile Application Development Platform](http://www.telerik.com/platform)    
    + [使用Telerik平台构建Web、混合与原生应用 - 推酷](http://www.tuicool.com/articles/2qiI7f)
- [Hybrid App开发实战](http://www.infoq.com/cn/articles/hybrid-app-development-combat)

### FAQ

- [Android Hybrid App四大坑](http://blog.meathill.com/tech/app/web/traps-in-developing-android-hybrid-app.html)
