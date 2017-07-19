layout: post
title: "WebKit Security"
category : HTML5
tags : [WebKit]
---

## WebView 安全策略

默认情况下，WebView 只能访问本地资源：

```
WebSettings.setAllowFileAccessFromFileURLs(true)
```

如果要实现跨域访问，需要：

```
WebSettings.setAllowUniversalAccessFromFileURLs(true)
```

<!-- more -->

一旦 `setAllowUniversalAccessFromFileURLs` 设置为 true，`setAllowFileAccessFromFileURLs` 设置将被忽略。

See:

* [WebSettings](https://developer.android.com/reference/android/webkit/WebSettings.html#setAllowFileAccess(boolean))
* [android - setAllowUniversalAccessFromFileURLs? - Stack Overflow](http://stackoverflow.com/questions/14825943/setallowuniversalaccessfromfileurls)

注：如有必要，请做实验验证。

### WebSettings.setAllowFileAccess

Android中默认 `mWebView.setAllowFileAccess(true)`，在 File 域下，能够执行任意的JavaScript 代码，同源策略跨域访问能够对私有目录文件进行访问等。APP对嵌入的 WebView 未对 `file:///` 形式的 URL 做限制，会导致隐私信息泄露。如针对 IM 类软件会导致聊天信息、联系人等等重要信息泄露，针对浏览器类软件，则更多的是cookie信息泄露。

### WebSettings.setAllowFileAccessFromFileURLs

在JELLY_BEAN以前的版本默认是setAllowFileAccessFromFileURLs(true),允许通过file域url中的Javascript读取其他本地文件，在 `JELLY_BEAN` 及以后的版本中默认已被是禁止。

### WebSettings.setAllowUniversalAccessFromFileURLs

在JELLY_BEAN以前的版本默认是 `setAllowUniversalAccessFromFileURLs(true)`,允许通过file域url中的Javascript访问其他的源，包括其他的本地文件和http,https源的数据。在JELLY_BEAN及以后的版本中默认已被禁止。

### @JavascriptInterface（CVE-2012-6636）

Android API Level >= [JELLY_BEAN_MR1(18)](https://developer.android.com/reference/android/os/Build.VERSION_CODES.html#JELLY_BEAN_MR1)，暴露的 API 必须用 `@JavascriptInterface` 注解。可以避免 _CVE-2012-6636_ 攻击。

[CVE - CVE-2012-6636](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2012-6636)

The Android API before 17 does not properly restrict the
WebView.addJavascriptInterface method, which allows remote attackers
to execute arbitrary methods of Java objects by using the Java
Reflection API within crafted JavaScript code that is loaded into the
WebView component in an application targeted to API level 16 or
earlier, a related issue to CVE-2013-4710.

### CVE-2014-1939

在 2014 年二月，安全研究员 Joshua J. Drak 发现并公布了一个在 Android WebView中可以被利用的Javascript bridge `searchBoxJavaBridge`， 在 __Android4.0 ~ Android4.3.1__ 版本中，当BrowserFrame初始化的时候，会创建一个 `android.webkit.SearchBoxImpl` 实例，并将此实例使用 `searchBoxJavaBridge_` 这个名字添加为 JavaScript Object，而攻击者可以利用这个实例执行远程代码。而此漏洞的根源是 CVE-2012-6636 这个漏洞。

对了避免改漏洞，可以调用以下接口删除改对象：

<pre>
removeJavascriptInterface("searchBoxJavaBridge_")
</pre>

### CVE-2014-7224

在2014年，研究人员Daoyuan Wu和Rocky Chang发现，当系统辅助功能服务被开启时，在 __`Android4.4`__ 以下的系统中，由系统提供的WebView组件都默认导出"accessibility" 和"accessibilityTraversal"这两个接口，代码位于“android/webkit/AccessibilityInjector.java”，这两个接口同样存在远程任意代码执行的威胁。

[CVE - CVE-2014-7224](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-7224)

对了避免改漏洞，可以调用以下接口这两个对象：

```
removeJavascriptInterface("accessibility")；
removeJavascriptInterface("accessibilityTraversal")
```

### WebSetting.setSavePassword

`WebSettings.setSavePassword(true)` This method was deprecated in API level 18.
Saving passwords in WebView will not be supported in future versions.

Sets whether the WebView should save passwords. The default is true.

WebView默认开启密码保存功能 _mWebView.setSavePassword(true)_，如果该功能未关闭，在用户输入密码时，会弹出提示框，询问用户是否保存密码，如果选择"是"，密码会被明文保到 _/data/data/com.package.name/databases/webview.db_

## 白名单策略

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

如，  在 `config.xml` 修改 content 地址 `<content src="http://www.baidu.com" />`，默认情况下，会使用默认浏览器打开该链接，将该链接加入到白名单:

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

```xml
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

```xml
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

## 基于内容安全策略 CSP

### 背景

万维网的安全策略植根于[同源策略](http://en.wikipedia.org/wiki/Same_origin_policy)。每个来源都与网络的其它部分分隔开，为开发人员构建了一个安全的沙箱。理论上这是完美的，但是现在攻击者已经找到了聪明的方式来破坏这个系统，这种方法称为 [XSS跨站脚本攻击](http://en.wikipedia.org/wiki/Cross-site_scripting) ，通过虚假内容和诱骗点击来绕过同源策略。这是一个很大的问题，如果攻击者成功注入代码，有相当多的用户数据会被泄漏。

2007 年，Mozilla 项目组的 Gervase Markham 和 WEB 安全界大牛 Robert Hansen 两人共同提出 _内容安全策略_（ContentSecurity Policy，CSP），这是一个全新的、有效的安全防御策略来减轻这种风险。

<!-- more -->

### 内容安全策略

内容安全策略（Content Security Policy，简称CSP）是一种以可信白名单作机制，来限制网站中是否可以包含某来源内容。目前，各大主流浏览器均已支持 CSP。

- 只能加载指定白名单的资源，如脚本、样式、图片、视频、音频、Flash以及其插件的来源，以及连接的类型（例如XHR、WebSockets和EventSource）、网络字体、frame 的来源。
- 禁止执行内联代码（`<script>`块内容，内联事件，内联样式）。
- 禁止执行 `eval()`, `newFunction()` , `setTimeout([string], ...)` 和 `setInterval([string], ...)` 。

See [浏览器安全策略说之内容安全策略 CSP-网络安全-安全频道-至顶网](http://security.zdnet.com.cn/security_zone/2014/0418/3017798.shtml)

只能加载指定白名单的资源，如脚本、样式、图片、视频、音频、网络连接（例如 XHR、WebSockets）、网络字体、frame 的来源，不允许加载白名单之外的资源。防止攻击者利用未知的文件类型进行攻击。

### 禁止执行内联代码

禁止执行内联代码（`<script>` 块内容，内联事件，内联样式）。防止攻击者在内联代码中注入脚本，避免跨站点脚本(XSS)攻击。

### 禁止 eval 等函数执行字符串类型的脚本

禁止执行 `eval()`, `new Function()` , `setTimeout([string], ...)` 和 `setInterval([string], ...)`。防止攻击者执行输入框或者地址栏中的 JavaScript 代码字符串发起的攻击。

### 禁用 Flash

防止攻击者借助 Flash 和 ActionScript 发起多种形式的跨站点脚本(Flash XSS)、跨站点请求伪造(Flash CSRF)、点击劫持(ClickJacking)等攻击。

### 禁止 JavaScript 访问 Cookie

禁用 Cookie 可以防止攻击者通过 Cookie 绕过服务器的身份验证，进行跨站点请求伪造 (CSRF) 攻击。

### 所有的在线网页和数据都是通过 SSL

目前的 POS 业务是采用本地 HTML + JavaScript 的方式。未来的 POS 业务可能放在服务器上，采用 B/S 以及 RESTful 架构。终端只允许访问 HTTPS 资源，通过预装受信任的证书，只能访问经过认证的网络资源。避免钓鱼、中间人、CSRF 攻击。

### 如何应用

CSP可以由两种方式指定：HTTP Header 和HTML。HTTP是在HTTP由增加 Header 来指定，而HTML级别则由Meta标签指定。CSP有两类：Content-Security-Policy 和 Content-Security-Policy-Report-Only。（大小写无关）

## 应用安全策略

### Javascript 不允许直接内存操作

所有应用程序均采用 JavaScript 语言开发。此 JavaScript 运行在浏览器沙箱内，不支持类似 C 语言的 \*p 内存指针操作。避免缓冲区溢出攻击。

### 动态数据只能使用 JSON 和 XML 格式

为了防止攻击这在模板等形式的数据中注入 JavaScript，约定动态数据只能使用 JSON 和 XML 格式，否则将不被受理。

### 只能访问有限的本地  API

联迪公司对 POS 的外部设备定义了一套安全的 JavaScript API。开发者只能通过这套 API 访问必要的外部设备（不可直接访问文件系统、进程等敏感对象）。

### 输入检查

应用程序通过对 JavaScript 的输入检查，过滤或者转义一些特殊字符，如 `<`、`>`、`<script>`、`javascript` 等，防止攻击者通过特殊字符发起的跨站点脚本 (XSS) 等攻击。

## 多应用隔离

每个应用程序都以独立的用户身份运行，基于 Linux 系统的多用户机制，一个应用程序无法访问其他应用程序的私有数据。

## 其他

- 代码签名
- 只允许 https，预装证书（避免钓鱼、中间人攻击）
- 只能访问有限本地 API
- Javascript 不允许直接内存操作，避免缓冲区溢出攻击

## 开发者

### 执行输入验证

See [安全要点](https://developer.android.com/training/articles/security-tips.html?hl=zh-cn#InputValidation)

无论应用是在哪种平台上运行，输入验证功能不完善都是影响应用的最常见安全问题。Android 为此提供了平台级对策，可降低应用出现输入验证问题的可能性。如果可行，请尽量使用这些功能。另请注意，选择类型安全的语言通常也有助于降低出现输入验证问题的可能性。

如果使用原生代码，那么系统从文件读取、通过网络接收或从 IPC 接收的任何数据都有可能会引发安全问题。最常见的问题包括[缓冲区溢出](http://en.wikipedia.org/wiki/Buffer_overflow)、[释放后重用](http://en.wikipedia.org/wiki/Double_free#Use_after_free)和[差一错误](http://en.wikipedia.org/wiki/Off-by-one_error)。Android 为此提供了多项技术，例如 
<acronym>ASLR</acronym> 和 
<acronym>DEP</acronym> ，可以降低这些错误被利用的可能性，但无法解决根本问题。因此，请谨慎管理指针和缓冲区，预防这些漏洞造成破坏。

使用基于字符串的动态语言（如 JavaScript 和 SQL）也可能因为转义字符和[脚本注入](http://en.wikipedia.org/wiki/Code_injection)而出现输入验证问题。

如果使用提交到 SQL 数据库或内容提供程序的查询中的数据，也可能出现 SQL 注入问题。最好的预防措施是使用参数化查询（请参阅上文[内容提供程序](https://developer.android.com/training/articles/security-tips.html?hl=zh-cn#ContentProviders)部分的相关内容）。将权限限制为只读或只写，也可以降低 SQL 注入引发破坏的可能性。

如果您无法使用上述安全功能，我们强烈建议您使用结构合理的数据格式，并验证数据是否符合预期的格式。虽然将字符列入黑名单或替换字符是一种有效的策略，但这些技术在实际操作中很容易出错，因此应尽量避免使用。

## 使用 WebView

---

由于 `[WebView](https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn)` 使用的网络内容可能包含 HTML 和 JavaScript，当的使用可能引入常见的网络安全问题，例如[跨站脚本攻击](http://en.wikipedia.org/wiki/Cross_site_scripting)（JavaScript 注入）。Android 内置了多种机制，可将 `[WebView](https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn)` 的功能限制为您应用所需的最低功能，以缩小这些潜在问题的影响范围。

如果您的应用不直接使用 `[WebView](https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn)` 中的 JavaScript，请_勿_调用 `[setJavaScriptEnabled()](https://developer.android.com/reference/android/webkit/WebSettings.html?hl=zh-cn#setJavaScriptEnabled(boolean))`。部分示例代码会使用这种方法，不过您可能需要在实际应用时根据具体情况进行调整。因此，如果不需要使用这种调用方法，请将其移除。默认情况下，`[WebView](https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn)` 不会执行 JavaScript，因此不可能出现跨站脚本攻击这样的安全问题。

`[addJavaScriptInterface()](https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn#addJavascriptInterface(java.lang.Object, java.lang.String))` 允许 JavaScript 调用正常情况下是为 Android 应用预留的操作，因此在使用时请格外小心。如果要使用，请仅将 `[addJavaScriptInterface()](https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn#addJavascriptInterface(java.lang.Object, java.lang.String))` 用于所有输入内容都可信的网页。如果您接受不受信任的输入内容，那么不受信任的 JavaScript 可能会调用您应用中的 Android 方法。一般情况下，我们建议您仅将 `[addJavaScriptInterface()](https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn#addJavascriptInterface(java.lang.Object, java.lang.String))` 用于应用 APK 内含的 JavaScript。

如果您的应用通过 `[WebView](https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn)` 访问敏感数据，您可能需要使用 `[clearCache()](https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn#clearCache(boolean))` 方法来删除本地存储的所有文件。您也可以使用服务器端标头（例如 `no-cache`）来指示应用不应缓存特定内容。

在 Android 4.4（API 级别 19）之前平台上运行的设备使用的 `[webkit](https://developer.android.com/reference/android/webkit/package-summary.html?hl=zh-cn)` 版本存在多个安全问题。如果您的应用在这些设备上运行，解决方法是确认 `[WebView](https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn)` 对象只显示值得信任的内容。还应使用可更新的安全 `[Provider](https://developer.android.com/reference/java/security/Provider.html?hl=zh-cn)` 对象确保您的应用在 SSL 中不会暴露给潜在的漏洞，如[更新您的安全提供程序以防范 SSL 攻击](https://developer.android.com/training/articles/security-gms-provider.html?hl=zh-cn)中所述。如果您的应用必须从开放网络渲染内容，请考虑提供您自己的渲染程序，以便使用最新的安全补丁程序保持其处于最新状态。

### 处理凭据

一般情况下，我们建议您尽量降低要求用户凭据的频率；这样会让钓鱼攻击显得比较可疑，从而能够降低其成功率。作为替代方法，您可以使用授权令牌并根据需要刷新。

请尽量避免将用户名和密码存储在设备上。您可以使用用户提供的用户名和密码进行初始身份验证，然后使用针对特定服务的短时效授权令牌。

可供多个应用访问的服务应使用 `[AccountManager](https://developer.android.com/reference/android/accounts/AccountManager.html?hl=zh-cn)` 进行访问。如果可行，请使用 `[AccountManager](https://developer.android.com/reference/android/accounts/AccountManager.html?hl=zh-cn)` 类来调用基于云的服务；此外，请勿将密码存储在设备上。

使用 `[AccountManager](https://developer.android.com/reference/android/accounts/AccountManager.html?hl=zh-cn)` 检索 `[Account](https://developer.android.com/reference/android/accounts/Account.html?hl=zh-cn)` 后，请先确认 `[CREATOR](https://developer.android.com/reference/android/accounts/Account.html?hl=zh-cn#CREATOR)` 再传送凭据，以免无意中将凭据传送给错误的应用。

如果凭据仅供您创建的应用使用，那么您可以使用 `[checkSignature()](https://developer.android.com/reference/android/content/pm/PackageManager.html?hl=zh-cn#checkSignatures(int, int))` 验证访问 `[AccountManager](https://developer.android.com/reference/android/accounts/AccountManager.html?hl=zh-cn)` 的应用。另外，如果只有一个应用使用该凭据，那么您可以使用 `[KeyStore](https://developer.android.com/reference/java/security/KeyStore.html?hl=zh-cn)` 存储凭据。

## More

- [Android Developers Blog: What’s new in WebView security](https://android-developers.googleblog.com/2017/06/whats-new-in-webview-security.html)