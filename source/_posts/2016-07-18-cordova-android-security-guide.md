layout: post
title: "Cordova Android Security Guide"
category: Cordova
tags: [cordova, csp]
---

See [Security Guide - Apache Cordova](https://cordova.apache.org/docs/en/latest/guide/appdev/security/index.html)

## Webkit Cross Domain

默认情况下，WebView 只能访问本地资源：

```java
WebSettings.setAllowFileAccessFromFileURLs(true)
```

如果要实现跨域访问，需要：

```java
WebSettings.setAllowUniversalAccessFromFileURLs(true)
```

<!-- more -->

一旦 `setAllowUniversalAccessFromFileURLs` 设置为 true，`setAllowFileAccessFromFileURLs` 设置将被忽略。

See: 

- [WebSettings](https://developer.android.com/reference/android/webkit/WebSettings.html#setAllowFileAccess(boolean))
- [android - setAllowUniversalAccessFromFileURLs? - Stack Overflow](http://stackoverflow.com/questions/14825943/setallowuniversalaccessfromfileurls)

注：如有必要，请做实验验证。

### setAllowFileAccess

Android中默认mWebView.setAllowFileAccess(true)，在File域下，能够执行任意的JavaScript代码，同源策略跨域访问能够对私有目录文件进行访问等。APP对嵌入的WebView未对file:/// 形式的URL做限制，会导致隐私信息泄露，针对IM类软件会导致聊天信息、联系人等等重要信息泄露，针对浏览器类软件，则更多的是cookie信息泄露。

### setAllowFileAccessFromFileURLs

在JELLY_BEAN以前的版本默认是setAllowFileAccessFromFileURLs(true),允许通过file域url中的Javascript读取其他本地文件，在 `JELLY_BEAN` 及以后的版本中默认已被是禁止。

### setAllowUniversalAccessFromFileURLs

在JELLY_BEAN以前的版本默认是 `setAllowUniversalAccessFromFileURLs(true)`,允许通过file域url中的Javascript访问其他的源，包括其他的本地文件和http,https源的数据。在JELLY_BEAN及以后的版本中默认已被禁止。

### @JavascriptInterface（CVE-2012-6636）

Android API Level >= `[JELLY_BEAN_MR1](https://developer.android.com/reference/android/os/Build.VERSION_CODES.html#JELLY_BEAN_MR1)`，暴露的 API 必须用 `@JavascriptInterface` 注解。可以避免 _CVE-2012-6636_ 攻击。

[CVE - CVE-2012-6636](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2012-6636)

The Android API before 17 does not properly restrict the
WebView.addJavascriptInterface method, which allows remote attackers
to execute arbitrary methods of Java objects by using the Java
Reflection API within crafted JavaScript code that is loaded into the
WebView component in an application targeted to API level 16 or
earlier, a related issue to CVE-2013-4710.

### CVE-2014-1939

在2014年二月，安全研究员Joshua J. Drak发现并公布了一个在Android WebView中可以被利用的Javascript bridge “searchBoxJavaBridge_”[1][2]， 在 _Android4.0 ~ Android4.3.1_ 版本中，当BrowserFrame初始化的时候，会创建一个 android.webkit.SearchBoxImpl[3] 实例，并将此实例使用“searchBoxJavaBridge_”这个名字添加为JavaScript Object，而攻击者可以利用这个实例执行远程代码。而此漏洞的根源是CVE-2012-6636这个漏洞[4]。

可以调用以下接口这两个对象：

```java
removeJavascriptInterface("searchBoxJavaBridge_")
```

###  CVE-2014-7224

在2014年，研究人员Daoyuan Wu和Rocky Chang发现，当系统辅助功能服务被开启时，在 `Android4.4` 以下的系统中，由系统提供的WebView组件都默认导出"accessibility" 和"accessibilityTraversal"这两个接口，代码位于“android/webkit/AccessibilityInjector.java”，这两个接口同样存在远程任意代码执行的威胁。

[CVE - CVE-2014-7224](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-7224)

可以调用以下接口这两个对象：

```java
removeJavascriptInterface("accessibility")；
removeJavascriptInterface("accessibilityTraversal")
```

### `setSavePassword`

`WebSettings.setSavePassword(true)` This method was deprecated in API level 18.
Saving passwords in WebView will not be supported in future versions.

Sets whether the WebView should save passwords. The default is true.

WebView默认开启密码保存功能 _mWebView.setSavePassword(true)_，如果该功能未关闭，在用户输入密码时，会弹出提示框，询问用户是否保存密码，如果选择"是"，密码会被明文保到 _/data/data/com.package.name/databases/webview.db_

## Whitelist

* Read and understand the [Whitelist Guide](https://cordova.apache.org/docs/en/latest/guide/appdev/whitelist/index.html)

* Domain whitelisting does not work on Android API 10 and below, and WP8 for iframes and XMLHttpRequest. This means an attacker can load any domain in an iframe and any script on that page within the iframe can directly access Cordova JavaScript objects and the corresponding native Java objects. You should take this into consideration when building applications for these platforms. In practice this means making sure you target an Android API higher than 10, and that if possible you do not use an iframe to load external content - use the inAppBrowser plugin or other third-party plugins.

See [Whitelist Guide - Apache Cordova](https://cordova.apache.org/docs/en/latest/guide/appdev/whitelist/index.html)


See also [android - Intercept and override HTTP-requests from WebView - Stack Overflow](http://stackoverflow.com/questions/4780899/intercept-and-override-http-requests-from-webview)

注：Whitelist 通过三种方式来指定白名单。

### Navigation Whitelist

指定导航白名单，允许通过 WebView 直接打开。默认只能导航到 `file://` URLs，需要在 `<allow-navigation>` tags to your `config.xml`:

```xml
<!-- Allow links to example.com -->
<allow-navigation href="http://example.com/*" />

<!-- Wildcards are allowed for the protocol, as a prefix
     to the host, or as a suffix to the path -->
<allow-navigation href="*://*.example.com/*" />

<!-- A wildcard can be used to whitelist the entire network,
     over HTTP and HTTPS.
     *NOT RECOMMENDED* -->
<allow-navigation href="*" />

<!-- The above is equivalent to these three declarations -->
<allow-navigation href="http://*/*" />
<allow-navigation href="https://*/*" />
<allow-navigation href="data:*" />
```

如，  在 `config.xml` 修改 content 地址 `<content src="http://www.baidu.com" />`，默认情况下，会使用默认浏览器打开该链接，将改链接加入到白名单:

```xml
<allow-navigation href="http://www.baidu.com/*" />
<allow-navigation href="https://www.baidu.com/*" />
```

则可以在 WebView 中打开指定链接了。

### Intent Whitelist

Controls which URLs the app is allowed to ask the system to open.
By default, no external URLs are allowed.

On Android, this equates to sending an intent of type BROWSEABLE.

This whitelist does not apply to plugins, only hyperlinks and calls to `window.open()`.

In `config.xml`, add `<allow-intent>` tags, like this:

```xml
<!-- Allow links to web pages to open in a browser -->
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />

<!-- Allow links to example.com to open in a browser -->
<allow-intent href="http://example.com/*" />

<!-- Wildcards are allowed for the protocol, as a prefix
     to the host, or as a suffix to the path -->
<allow-intent href="*://*.example.com/*" />

<!-- Allow SMS links to open messaging app -->
<allow-intent href="sms:*" />

<!-- Allow tel: links to open the dialer -->
<allow-intent href="tel:*" />

<!-- Allow geo: links to open maps -->
<allow-intent href="geo:*" />

<!-- Allow all unrecognized URLs to open installed apps
     *NOT RECOMMENDED* -->
<allow-intent href="*" />
```

注：当某个资源不在导航白名单中，而在 Intent 白名单中，则会调用系统程序打开自定资源，如调用浏览器打开链接。如果资源出现在导航白名单中，则优先使用 WebView 打开。

### Network Request Whitelist

Controls which network requests (images, XHRs, etc) are allowed to be made (via cordova native hooks).

Note: We suggest you use a Content Security Policy (see below), which is more secure.  This whitelist is mostly historical for webviews which do not support CSP.

In `config.xml`, add `<access>` tags, like this:

```language-
<!-- Allow images, xhrs, etc. to google.com -->
<access origin="http://google.com" />
<access origin="https://google.com" />

<!-- Access to the subdomain maps.google.com -->
<access origin="http://maps.google.com" />

<!-- Access to all the subdomains on google.com -->
<access origin="http://*.google.com" />

<!-- Enable requests to content: URLs -->
<access origin="content:///*" />

<!-- Don't block any requests -->
<access origin="*" />
```

Without any `<access>` tags, only requests to `file://` URLs are allowed. However, the default Cordova application includes `<access origin="*">` by default.

Note: Whitelist cannot block network redirects from a whitelisted remote website (i.e. http or https) to a non-whitelisted website. Use CSP rules to mitigate redirects to non-whitelisted websites for webviews that support CSP.

Quirk: Android also allows requests to https://ssl.gstatic.com/accessibility/javascript/android/ by default, since this is required for TalkBack to function properly.

### Content Security Policy

Controls which network requests (images, XHRs, etc) are allowed to be made (via webview directly).

On Android and iOS, the network request whitelist (see above) is not able to filter all types of requests (e.g. `<video>` & WebSockets are not blocked). So, in addition to the whitelist, you should use a [Content Security Policy](http://content-security-policy.com/) `<meta>` tag on all of your pages.

On Android, support for CSP within the system webview starts with KitKat (but is available on all versions using Crosswalk WebView).

Here are some example CSP declarations for your `.html` pages:

```language-
<!-- Good default declaration:
    * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
    * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
    * Disables use of eval() and inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
        * Enable inline JS: add 'unsafe-inline' to default-src
        * Enable eval(): add 'unsafe-eval' to default-src
-->
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *">

<!-- Allow everything but only from the same origin and foo.com -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self' foo.com">

<!-- This policy allows everything (eg CSS, AJAX, object, frame, media, etc) except that 
    * CSS only from the same origin and inline styles,
    * scripts only from the same origin and inline styles, and eval()
-->
<meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'">

<!-- Allows XHRs only over HTTPS on the same domain. -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self' https:">

<!-- Allow iframe to https://cordova.apache.org/ -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; frame-src 'self' https://cordova.apache.org">
```

## Iframes and the Callback Id Mechanism

If content is served in an iframe from a whitelisted domain, that domain will have access to the native Cordova bridge. This means that if you whitelist a third-party advertising network and serve those ads through an iframe, it is possible that a malicious ad will be able to break out of the iframe and perform malicious actions. Because of this, you should generally not use iframes unless you control the server that hosts the iframe content.  Also note that there are third party plugins available to support advertising networks. Note that this statement is not true for iOS, which intercepts everything including iframe connections.

注：通过 CSP 禁用 iframe。

## Certificate Pinning

Cordova does not support true certificate pinning. The main barrier to this is a lack of native APIs in Android for intercepting SSL connections to perform the check of the server's certificate. (Although it is possible to do certificate pinning on Android in Java using JSSE, the webview on Android is written in C++, and server connections are handled for you by the webview, so it is not possible to use Java and JSSE there.) Since Apache Cordova is meant to offer consistent APIs across multiple platforms, not having a capability in a major platform breaks that consistency.

There are ways to approximate certificate pinning, such as checking the server's public key (fingerprint) is the expected value when your application starts or at other various times during your application's lifetime. There are third-party plugins available for Cordova that can do that. However, this is not the same as true certificate pinning which automatically verifies the expected value on every connection to the server.

There are also plugins that can do true certificate pinning for some platforms, assuming your app is able to do all of its network requests using the plugin (i.e.: no traditional XHR/AJAX requests, etc).

注：通过第三方 Cordova 插件实现 SSL，如 [wymsee/cordova-HTTP: Cordova / Phonegap plugin for communicating with HTTP servers. Allows for SSL pinning!](https://github.com/wymsee/cordova-HTTP)。

## Self-signed Certificates

Using self-signed certificates on your server is not recommended. If you desire SSL, then it is highly recommended that your server have a certificate that has been properly signed by a well-known CA (certificate authority). The inability to do true certificate pinning makes this important.

The reason is that accepting self-signed certificates bypasses the certificate chain validation, which allows any server certificate to be considered valid by the device. This opens up the communication to man-in-the-middle attacks. It becomes very easy for a hacker to not only intercept and read all communication between the device and the server, but also to modify the communication. The device will never know this is happening because it doesn't verify that the server's certificate is signed by a trusted CA. The device has no proof that the server is who it expects. Because of the ease of doing a man-in-the-middle attack, accepting self-signed certificates is only marginally better than just running http instead of https on an untrusted network. Yes, the traffic would be encrypted, but it could be encrypted with the key from a man-in-the-middle, so the man-in-the-middle can access everything, so encryption is useless except to passive observers. Users trust SSL to be secure, and this would be deliberately making it insecure, so the SSL use becomes misleading. If this will be used on a trusted network (i.e., you are entirely inside a controlled enterprise), then self-signed certs are still not recommended. The two recommendations in a trusted network are to just use http because the network itself is trusted, or to get a certificate signed by a trusted CA (not self-signed). Either the network is trusted or it is not.

The principles described here are not specific to Apache Cordova, they apply to all client-server communication.

When running Cordova on Android, using `android:debuggable="true"` in the application manifest will permit SSL errors such as certificate chain validation errors on self-signed certs. So you can use self-signed certs in this configuration, but this is not a configuration that should be used when your application is in production. It is meant to be used only during application development.

## Encrypted storage

(TBD)

## General Tips

通过 CSP 控制。

### Do not use Android Gingerbread!

* Set your min-target-sdk level higher than 10. API 10 is Gingerbread, and Gingerbread is no longer supported by Google or device manufacturers, and is therefore not recommend by the Cordova team.
* Gingerbread has been shown to be insecure and one of the most targeted mobile OSs [http://www.mobilemag.com/2012/11/06/andriod-2-3-gingerbread-security/](http://bgr.com/2012/11/06/android-security-gingerbread-malware/).
* The Whitelist on Android does not work with Gingerbread or lower. This means an attacker can load malicious code in an iframe that would then have access to all of the Cordova APIs and could use that access to steal personal data, send SMS messages to premium-rate numbers, and perform other malicious acts.

### Use InAppBrowser for outside links

* Use the InAppBrowser when opening links to any outside website. This is much safer than whitelisting a domain name and including the content directly in your application because the InAppBrowser will use the native browser's security features and will not give the website access to your Cordova environment. Even if you trust the third party website and include it directly in your application, that third party website could link to malicious web content.

### Validate all user input

* Always validate any and all input that your application accepts. This includes usernames, passwords, dates, uploaded media, etc. Because an attacker could manipulate your HTML and JS assets (either by decompiling your application or using debugging tools like chrome://inspect), this validation should also be performed on your server, especially before handing the data off to any backend service.
* Other sources where data should be validated: user documents, contacts, push notifications

### Do not cache sensitive data

* If usernames, password, geolocation information, and other sensitive data is cached, then it could potentially be retrieved later by an unauthorized user or application.

### Don't use eval() unless you know what you're doing

* The JavaScript function eval() has a long history of being abused. Using it incorrectly can open your code up for injection attacks, debugging difficulties, and slower code execution.

### Do not assume that your source code is secure

* Since a Cordova application is built from HTML and JavaScript assets that get packaged in a native container, you should not consider your code to be secure. It is possible to reverse engineer a Cordova application.