---
layout: post
title: "Android Hybrid Develpment Tutorial"
category: Android
tags: [mobile, android, hybrid]
--- 

## What's Hybrid

“Hybrid” applications are a special category of web applications that extend the web-based application environment through their use of native platform APIs available on a given device. The hybrid application design pattern is equally applicable to both mobile and desktop environments. For the scope of this book, we will focus on hybrid applications targeted toward the Android platform, however, most of the design patterns are also applicable to other platforms, including iOS and Windows Phone.

__The benefits of hybrid apps compared to native include:__

- Inexpensive cross-platform development cycle
- Abundant human resources
- Approval process
    Most of the app stores do have an approval process for which each app has to qualify before it can be made available through the sales channels of that app store. Because hybrid apps can be updated outside the bounds of an app store, you can typically get away with one submission to the app store. Once you are approved, you can push subsequent updates independently through your server if you like. A key point to note however, is that a fresh submission of the application would be required every time you make changes in the native code associated with the hybrid app.
- Hybrid apps are the future

    Looking toward the future and upcoming advancements in mobile OS technologies, one can easily argue that hybrid apps are the future of development. Windows Phone 8, Google announcements to eventually merge Chromium OS and Android, Tizen OS, and Firefox all hint toward a hybrid future, not too far away, and hence, building and deploying hybrid apps is strategically a right thing to do.

<!--more-->

__The possible drawbacks of hybrid apps as compared to native apps include:__

- Performance
    You may experience potential performance issues because JavaScript is fundamentally single-threaded, which means that only one operation can be performed at a time. However, if done right, you can come up with a solution wherein you can offload background tasks to a native thread, which would execute in parallel while your app is busy performing UI operations. The native thread would then notify the JavaScript of the events and task completions/failures.
- Differences in cross-platforms
    WebKit is not equally maintained in all mobile platforms, which means that there might be indistinct differences between renderings and platform-specific features to watch out for, though one could arguably say it is a better scenario than rewriting all code from scratch. Further, this is such a well-understood topic that often you would find material describing ways to identify and mitigate these UI experience risks.
- Unavailable advanced features
    There might be advanced features that cannot always be easily implemented on the hybrid layer—for example, OpenGL-based rendering—however, the set of features is rapidly shrinking with companies like Microsoft, Google, and Mozilla introducing a bunch of new standards aimed at bridging this gap.
- Inconsistent user interfaces

    Platform-specific UIs’ look and feel might be seriously difficult to mimic using HTML, CSS, and JavaScript.

### Hybrid Application Architecture

![](http://johnnyimages.qiniudn.com/android-hybrid-architect.png)

Key highlights of the architecture include：

* Application UI and business logic reside within a context of a headless web browser that is fully contained within your application.
* For features that are available within the web browser, the user interacts with the browser and the browser interacts with the native platform environment.
* Resources and assets are available locally or can be downloaded from the Web.
* For the platform features that are not natively available to apps through the standard JavaScript environment; custom extensions and plug-ins can be developed. These plug-ins act as a bridge, if you will, diminishing the gaps between the native and web environments.

## Quick Start

We will build a sample application wherein the UI is implemented in HTML and rendered using a WebView. To get started, create a sample project using Eclipse or on the command line.

```sh
$ mkdir helloworld
$ cd helloworld
$ android create project -n HelloWorld -p ./ -t \
  android-14 -k com.helloworld --activity MainActivity
```

Once you execute the commands, an empty native _Hello World_ application will be created for you. Change the AndroidManifest XML to include the `INTERNET` permission:

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

Next, we will modify the layout resource file to specify a WebView in the view hierarchy. This layout resource will be set as a content view in the `MainActivity` class of the application.

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

Open the MainActivity.java file, and change the code as follows:

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

Alternatively, you can create an and add a WebView to the application view hierarchy programmatically, as follows:

```java
WebView WebView = new WebView(this);
contentView.addView(webView);
```

Now let’s look at the sample HTML page that will be rendered by the application.

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

### Loading a Web Page

Once you have a created a WebView control, you can request it to load a web page by using the `loadURL()` API passing the requested URL in the function argument. WebView supports loading resources from the Web or locally from the assets or resource folder.

* Root path to the _asset_ folder in Android is _file:///android_asset_
* Root path to the _res_ folder in Android is _file:///android_res_

Please note, that the url is _file:///android_asset_ and not _file:///android_assets_. This is one of the most common mistakes made by developers during development.

_file:///_ simply denotes that you wish to access the local filesystem, and points to the root directory. Anything mentioned after this is the relative path to the resource we would like to load in the WebView. Hence, when the URL is of the form _file:///android_asset_, we are specifying the base URL for the path to the _asset_ folder for the application package.

```java
// load index.html from the assets folder
WebView.loadUrl("file:///android_asset/index.html");

// load logo.png from the res folder
WebView.loadUrl("file:///android_res/drawable/logo.png");

// load a web based URL, Oreilly's homepage in this case
WebView.loadUrl("http://www.oreilly.com");
```

### Loading HTML into WebView

You can request the WebView to render any valid HTML as a string using the `loadData()` method.

Let’s look at the `loadData()` API in a bit more detail:

    loadData(String data, String mimeType, String encoding)

`data` specifies the data to be loaded, HTML markup in our case, into the WebView using the data URL scheme. The data URL scheme allows us to include data inline in web pages as if they were external resources. Using this technique, we can load normally separate elements such as images and stylesheets in a single HTTP request rather than multiple HTTP requests.

`mimeType` will denote the data type, which will be `text/html`.

The `encoding` parameter specifies whether the data is base64 or URL encoded. If the data is base64 encoded, the value of the encoding parameter must be `base64`. For all other values of the parameter, including null, it is assumed that the data uses ASCII encoding for octets inside the range of safe URL characters.

```java
String data = "<!DOCTYPE html>";
data += "<head><title>Hello World</title></head>";
data += "<body>Welcome to the WebView</body>";
data += "</html>";
// args: data, mimeType, encoding
WebView.loadData(data, "text/html", "UTF-8");
```

the above API will be used to create a data URL of the form `data:[<MIME-type>][;charset=<encoding>][;base64],<data>` before it is loaded inside the WebView.

If you would like to reference a file from an arbitrary source like the _res/drawable_ directory within your HTML documents, using something like:

```java
// Bad example
String data = "<!DOCTYPE html>";
data += "<head><title>THIS WILL NOT WORK</title></head>";
data += "<body><img src=\"file:///android_res/drawable/logo.png\" /></body>";
data += "</html>";
WebView.loadData(data, "text/html", "UTF-8");
```

This code will not load the _logo.png_ image, as JavaScript’s _same origin policy_ restricts all the resources on the web page to originate from the same site—in this case, `data:[<MIME-type>]` and not _file:///_, as we have requested.

To avoid this restriction, Google recommends using `loadDataWithBaseURL()` with an appropriate base URL, which is used both to resolve relative URLs and when applying JavaScript’s same origin policy.

### Loading Local Files into the WebView

Android WebView provides a very flexible set of APIs to load documents from multiple sources. However, you may have to tweak the behavior of the WebView in certain cases, as the same origin policy would restrict the locations from which the content can be loaded within the web browser—for example, loading a local file on the filesystem.

In the following sections, we will look at some of the techniques you can use to allow the web browser to load content from multiple sources.

Load local files from _res/drawable_ into the WebView with a given base URL:

```java
String html = "<!DOCTYPE html>";
html += "<head><title>Loading files from res/drawable directory</title></head>";
html += "<body><img src=\"logo.png\" />/body>";
html += "</html>";
WebView.loadDataWithBaseURL("file:///android_res/drawable/", html, "text/html", "UTF-8", null);
```

Load local files from an SD card into the WebView without a given base URL:

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

Load local files into the WebView by reading the contents of the file in Java and then passing the data to the WebView:

```java
// Load an html file
String html = loadFileFromSDCard("file:///sdcard/oreilly/book/logo.png");
WebView.loadDataWithBaseURL("", html, "text/html", "UTF-8", null);
```

or:

```java
// Load an image file
String pngData = loadFileFromAssets("file:///android_asset/images/logo.png");
WebView.loadData(pngData, "image/png", "UTF-8");
```

### Load Flash Files into the WebView

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

### Reading Files from the res/raw Directory

If you need to read a file (e.g., _home.html_) from the _res/raw_ directory and display it in the WebView, you need to pass the resource ID (e.g., _R.raw.home_) to your reader function in order to get it as string.

```java
WebView.loadData(getRawFileFromResource(R.raw.home), "text/html", "UTF-8");
    private String getRawFileFromResource(int resourceId) {
        StringBuilder sb = new StringBuilder();
        Scanner s = new Scanner(getResources().openRawResource(resourceId));
        while (s.hasNextLine()) {
                sb.append(s.nextLine() + "\n");
        }
        return sb.toString();
}
```

### Triggering JavaScript Functions from the Java Layer

A key aspect of an hybrid application would be its ability to allow native code to call JavaScript APIs, for delivering data, callbacks, and events. Since, there is no direct API for this in WebKit, developers often use the loadUrl() function for this purpose. The loadURL() function requests the WebView to load and execute the specified URL.

For example, if we wish to display an alert dialog in the WebView, as a result of some Java code execution, we would write something like:

```java
String js = "alert('Alert from Java');";
WebView.loadUrl("JavaScript:" + js);
```

### Opening a WebView in Fullscreen Mode

At times, you may want to display a fullscreen WebView to the user. Although you can request the WebView to cover the entire activity, by default, the activity does not cover the full screen, and you will observe a title bar and a notification bar. You can make an activity a fullscreen activity by either specifying activity flags in the manifest file or by doing it programatically.

Make an activity full screen through _AndroidManifest.xml_:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest ... >
        <activity
            android:theme="@android:style/Theme.NoTitleBar.Fullscreen" >
            ...
        </activity>
</manifest>
```

Or make an activity fullscreen programmatically:

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

### Enabling a Resize Event in JavaScript While Your Application Is Fullscreen

When you set your activity to fullscreen mode, the resize event is not fired when the soft keyboard comes out in the WebView. We have done numerous experiments to capture the resize event from JavaScript, but with no luck. This could be Android limitation or a bus. This issue has been raised to Android developers at Google. The alternative solution of how to mitigate this issue is addressed in the next section.

To enable a resize event while your application is fullscreen, do the following:

1.Use the _res/values/styles.xml_ file to make your application fullscreen and turn off the window title.

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

2.Apply this theme to your application using the following XML attribute in your manifest.

```xml
<application
    android:icon="@drawable/icon"
    android:label="Demo"
    android:theme="@style/Theme" > ... </application>
```

3.You can now capture the resize event in your HTML.

```js
$(window).bind('resize', function() {
        console.error('onResize');
});
```

### Binding Java Objects to WebView Using the addJavaScriptInterface() Method

The WebView allows developers to extend the JavaScript API namespace by defining their own components in Java and then making them available in the JavaScript environment. This technique comes in handy when you wish to access a platform feature not already available in JavaScript or wish to consume a component written in Java through JavaScript.

The `addJavaScriptInterface()` method of the WebView can be used for this purpose.

```java
JavaScriptInterface JavaScriptInterface = new JavaScriptInterface(this);
myWebView = new MyWebView(this);
myWebView.addJavaScriptInterface(JavaScriptInterface, "HybridNote");
```

In this example, `JavaScriptInterface` is bound to the JavaScript environment of WebView and is accessible using the `HybridNote` object (aka <span class="emphasis">_namespace_</span>). Depending upon the Android version, either all public or some special methods of the bound objects will be accessible inside the JavaScript code. Once the object is added to the WebView using the function specified earlier, the object will be available to JavaScript only after the page in the WebView is loaded next or the existing page is reloaded. This can be achieved by calling the `loadData()` function of the WebView object.

From the JavaScript layer, all the public methods of the exposed Java objects can be accessed in Android versions below Jelly Bean MR1 (API Level - 17). For Jelly Bean MR1 API Level and above, exposed functions should specifically be annotated with `@JavaScriptInterface` to prevent any unwanted methods from being exposed.

The JavaScript layer does not have direct access to the exposed Java object’s fields. If needed, explicit getters and setters must be provided for accessing the fields.

__@JavaScriptInterface Annotations__

If you set your `targetSdkVersion` to 17 (or higher) in <span class="emphasis">_AndroidManifest.xml_</span> all the methods that are accessed by JavaScript must have `@JavaScriptInterface` annotations.]()

```java
import android.WebKit.javaScriptInterface;

// SDK version 17 or above.
@JavaScriptInterface
public void showToast(String toast)  {
        // show toast...
}
```

In Android 2.3, the `addJavaScriptInterface()` method does not work as expected. However, given <span class="emphasis">_2.3_</span> is still the most used version of Android, you may want your application to work on 2.3 devices as well.

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

The `setAllowFileAccess()` API allows developers to control access to local files by the WebView. This API is one of several WebView settings you can configure at runtime. By default, this setting is enabled for accessing files in the filesystem. This setting does not restrict the WebView to load local resources from the <span class="emphasis">_file:///android_asset_</span> (assets) and <span class="emphasis">_file:///android_res_</span> (resources) directories. For security reasons, if your app does not require access to the filesystem, it is a good practice to turn this setting off.

    settings.setAllowFileAccess(false);

### Enabling JavaScript

For security reasons, JavaScript is <span class="emphasis">_disabled_</span> in the WebView by default. You can enable/disable JavaScript using `setJavaScriptEnabled()` method.

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

Starting at version 3.0, Android introduced full hardware acceleration for applications. This is not enabled by default for applications targeted for platforms below version 4.0. The web browser itself moved to a <span class="emphasis">_tile-based rendering architecture_</span> as opposed to display list architecture, which makes it more responsive.

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

## Tutorial

- [Android WebKit Development](http://goo.gl/j6m2q)

### Framework

- [Telerik Mobile Application Development Platform](http://www.telerik.com/platform)    
    + [使用Telerik平台构建Web、混合与原生应用 - 推酷](http://www.tuicool.com/articles/2qiI7f)
- [Hybrid App开发实战](http://www.infoq.com/cn/articles/hybrid-app-development-combat)

### FAQ

- [Android Hybrid App四大坑](http://blog.meathill.com/tech/app/web/traps-in-developing-android-hybrid-app.html)
