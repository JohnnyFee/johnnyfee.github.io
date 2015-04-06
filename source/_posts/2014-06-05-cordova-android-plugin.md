layout: post
title: "Cordova Android Plugin"
category: Cordova
tags: [phonegap, cordova]
---

## 插件开发指南

See [Apache Cordova API Documentation](http://cordova.apache.org/docs/en/4.0.0/guide_hybrid_plugins_index.md.html#Plugin%20Development%20Guide)

_插件_ 是应用中用来显示的 Cordova WebView 和原生平台通信的植入代码包。插件提供了访问设备和平台的功能，这些功能在基于网页的应用本不存在。请参考插件中心 [registry](http://plugins.cordova.io/)。

插件包含每一个支持的平台的一个单独的 JavaScript 接口和一个相应的原生代码。我们通过一个简单的 _echo_ 插件逐步讲解，这个例子可以作为编写插件模板。

### 编译插件

应用开发者使用 CLI 的 `plugin add` 命令来添加一个插件到工程中，命令参数为插件代码的 GIT 库的 URL。这个例子实现了 Cordova 的 Device API：

```
$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
```

插件代码库的顶层目录中必须包含 `plugin.xml` 文件。以下是 `Device` 插件的简化版本：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"
        id="org.apache.cordova.device" version="0.2.3">
    <name>Device</name>
    <description>Cordova Device Plugin</description>
    <license>Apache 2.0</license>
    <keywords>cordova,device</keywords>
    <js-module src="www/device.js" name="device">
        <clobbers target="device" />
    </js-module>
    <platform name="ios">
        <config-file target="config.xml" parent="/*">
            <feature name="Device">
                <param name="ios-package" value="CDVDevice"/>
            </feature>
        </config-file>
        <header-file src="src/ios/CDVDevice.h" />
        <source-file src="src/ios/CDVDevice.m" />
    </platform>
</plugin>
```

### 验证插件

可以使用 plugman 工具去检查插件在每一个平台是是否安装成功。

你需要一个有效的 app 源文件目录，如 `www` 目录，确保 `index.html` 页面引用了插件的 JavaScript 接口：

```html
<script src="myplugin.js"></script>
```

然后，运行下面的代码去测试插件是否正确载入：

```shell
$ plugman install --platform ios --project /path/to/my/project/www --plugin /path/to/my/plugin
```

### JavaScript 接口

JavaScript 提供了一个前端接口，它是插件最重要的组成部分。你可以按你喜欢的方式去组织你的插件，但是你需要调用 `cordova.exec()`去与本地平台通信：

```js
cordova.exec(function(winParam) {},  
    function(error) {},  
    "service",  
    "action",  
    ["firstArgument", "secondArgument", 42, false]);  
```

参数说明为：

* `function(winParam){}`: 成功的回调函数。
* `function(error){ }`：失败回调。
* `service`：调用原生接口的服务名称。
* `action`：调用原生接口的行为，一般为插件的函数名称。
* `[/* arguments */]`: 传递给原生接口的参数数组。

如：

```js
window.echo = function(str, callback) {  
    cordova.exec(callback, function(err) {  
        callback('Nothing to echo.');  
    }, "Echo", "echo", [str]);  
};  
```

在这个例子中，插件被关联到 `window` 对象上，可以这样调用：

```js
window.echo("echome", function(echoValue) {  
    alert(echoValue == "echome"); // should alert true.  
});  
```

### 原生接口

一旦你定义了你的 JavaScript 接口，你至少需要一个本地实现。详细信息可以参考：

* [Amazon Fire OS Plugins](http://docs.phonegap.com/en/3.3.0/guide_platforms_amazonfireos_plugin.md.html#Amazon%20Fire%20OS%20Plugins)
* [](http://docs.phonegap.com/en/3.3.0/guide_platforms_android_plugin.md.html#Android%20Plugins)[PhoneGap
     08 Android 插件介绍](http://blog.csdn.net/jacob_wang520/article/details/18306383)
* [iOS Plugins](http://docs.phonegap.com/en/3.3.0/guide_platforms_ios_plugin.md.html#iOS%20Plugins)
* [BlackBerry 10 Plugins](http://docs.phonegap.com/en/3.3.0/guide_platforms_blackberry10_plugin.md.html#BlackBerry%2010%20Plugins)
* [Windows Phone Plugins](http://docs.phonegap.com/en/3.3.0/guide_platforms_wp8_plugin.md.html#Windows%20Phone%20Plugins)
* [Amazon Fire OS Plugins](http://docs.phonegap.com/en/edge/guide_platforms_amazonfireos_plugin.md.html#Amazon%20Fire%20OS%20Plugins)
* [Android Plugins](http://docs.phonegap.com/en/edge/guide_platforms_android_plugin.md.html#Android%20Plugins)
* [iOS Plugins](http://docs.phonegap.com/en/edge/guide_platforms_ios_plugin.md.html#iOS%20Plugins)
* [BlackBerry 10 Plugins](http://docs.phonegap.com/en/edge/guide_platforms_blackberry10_plugin.md.html#BlackBerry%2010%20Plugins)
* [Windows Phone Plugins](http://docs.phonegap.com/en/edge/guide_platforms_wp8_plugin.md.html#Windows%20Phone%20Plugins)

Tizen平台暂时不支持插件。

### 发布插件

一旦开发完成你的插件，你可能想要将其发布到社区与别人进行分享。你可以发布你的插件到 cordova [注册中心](http://plugins.cordova.io/) 或者发布到任何其他基于 npm 的注册中心。

你需要使用 `plugman` 工具按照下面的步骤发布插件：

```shell
$ plugman adduser # that is if you don't have an account yet
$ plugman publish /path/to/your/plugin
```

## 插件规范

See： 

- [Apache Cordova API Documentation](http://cordova.apache.org/docs/en/4.0.0/plugin_ref_spec.md.html#Plugin%20Specification)
- [PhoneGap 13 插件配置标准 - jacob的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/jacob_wang520/article/details/18350355)

`plugin.xml` 文件是在 plugins 命名空间（http://apache.org/cordova/ns/plugins/1.0) 下面的 XML 文档。

如：

```xml
<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"  
    xmlns:android="http://schemas.android.com/apk/res/android"
    id="com.alunny.foo"  
    version="1.0.2"> 
```

### plugin

`plugin` 元素是插件 manifest 的底层元素，它有下面的特性：

* `xmlns` (必须): 插件命名空间，`http://apache.org/cordova/ns/plugins/1.0`。如果文档中包含其他命名空间的 XML，如 `AndroidManifest.xml` 文件中的命名空间，这些命名空间应该添加到顶级元素，如 `xmlns:android="http://schemas.android.com/apk/res/android"`。
* `id` (必须): 插件的全路径，如：`com.alunny.foo`
* `version` (必须): 插件的版本，使用 major.minor.patch 模式，正则表达式为： `^\d+[.]\d+[.]\d+$`

### engines 和 engine

`<engines>` 指定插件支持的基于 Cordova 的框架的版本，如：

```xml
<engines>  
    <engine name="cordova" version="1.7.0" />  
    <engine name="cordova" version="1.8.1" />  
    <engine name="worklight" version="1.0.0" platform="android" scriptSrc="worklight_version"/>  
</engines>  
```

跟 `<plugin>` 的 `version` 属性相似，`engine` 的 `version` 也符合 major.minor.patch 格式。`<engine>` 元素也可以使用模糊匹配来避免重复，减少由于平台升级带来的维护。可以使用的模糊操作符为：`>`, `>=`, `<` and `<=`，如：

```xml
<engines>
    <engine name="cordova" version=">=1.7.0" />  
    <engine name="cordova" version="<1.8.1" />  
</engines>  
```

`<engine>` 默认支持 Cordova 支持的所有主要平台，`version` 属性指的是支持 Cordova 的版本号。你可以列出指定的平台和他们的版本，以覆盖 `cordova` 引擎的默认配置：

```xml
<engines>  
    <engine name="cordova" version=">=1.7.0" />  
    <engine name="cordova-android" version=">=1.8.0" />  
    <engine name="cordova-ios" version=">=1.7.1" />  
</engines> 
```

下面是 `<engine>` 标签默认支持的引擎列表：

* 'cordova' 
* 'cordova-plugman' 
* 'cordova-amazon-fireos'
* 'cordova-android'
* 'cordova-ios'
* 'cordova-blackberry10' 
* 'cordova-wp7'
* 'cordova-wp8'
* 'cordova-windows8'
* 'android-sdk' // returns the highest Android api level installed
* 'apple-xcode' // returns the xcode version 
* 'apple-ios' // returns the highest iOS version installed
* 'apple-osx' // returns the OSX version
* 'blackberry-ndk' // returns the native blackberry SDK version</engine>

如果要指明一个基于 Cordova 的自定义框架，应该使用下面的 `engine` 标签列出：

```xml
<engines>  
    <engine name="my_custom_framework" version="1.0.0" platform="android" scriptSrc="path_to_my_custom_framework_version"/>  
    <engine name="another_framework" version=">0.2.0" platform="ios|android" scriptSrc="path_to_another_framework_version"/>  
    <engine name="even_more_framework" version=">=2.2.0" platform="*" scriptSrc="path_to_even_more_framework_version"/>  
</engines> 
```

一个基于 Cordova 的自定义框架要求 engine 元素必须包含以下属性：

* `name`（必须）：框架名称。
* `version`（必须）：框架版本。
* `scriptSrc`（必须）：告诉 plugman 框架版本的脚本文件，理想情况下，这个文件应该在插件目录的顶级目录。
* `platform`（必须）：框架支持的平台。你可以使用通配符 `*` 来代表所有平台，也可以指定多个平台，如 `android|ios|blackberry10`，还可以只指定一个平台 `android`。


如果没指定 `<engine>` 标签，plugman 会盲目地将插件安装到 Cordova 过程目录下。

### name

指定插件的名称，如：

```
<name>Foo</name>
```

这个元素没有处理本地化。

### description

指定插件描述，如：

```xml
<description>Foo plugin description</description>
```

该元素也没有处理本地化

### author

指定插件的作者，如：

```xml
<author>Foo plugin description</author>
```

### keywords

指定插件关键字，使用逗号分隔，如：

```xml
<keywords>foo,bar</keywords>
```

### license

指定插件许可，如：

```xml
<license>Apache 2.0 License</license>
```

### asset

指定需要复制到 www 目录的文件或者目录，如：

```xml
<!-- a single file, to be copied in the root directory -->  
<asset src="www/foo.js" target="foo.js" />  
<!-- a directory, also to be copied in the root directory -->  
<asset src="www/foo" target="foo" />  
```

所有的 asset 元素都必须包含 `src` 和 `target` 属性，基于 web 插件多半包含 `<asset>` 元素。嵌套在 `<platform>` 元素下 `<asset>` 元素指定平台相关的 Web 资源。属性包含：

* `src` (required): 插件包下相对 `plugin.xml` 文档的文件或者目录。如果文件不存在于指定的 `src` 下，plugman 会停止并报错。
* `target` (required):相对 `www` 的文件或目录。如：
    
        <asset src="www/new-foo.js" target="js/experimental/foo.js" />

    这会在 `www` 目录下创建 `js/experimental` 目录（如果不存在），然后拷贝 `new-foo.js` 文件，并且重命名为 `foo.js`。如果文件在目标位置已经存在，plugman 会停止并报错。

### js-module

大多数插件包含一个或者多个 JavaScript 文件。每一个 `<js-module>` 标签对应一个 JavaScript 文件。`<asset>` 标签只是简单地从插件子目录将文件拷贝到 `www` 下，`<js-module>` 更加复杂，如下：

```xml
<js-module src="socket.js" name="Socket">  
    <clobbers target="chrome.socket" />  
</js-module>  
```

当安装一个上面的插件时，`socket.js` 被复制到 `www/plugins/my.plugin.id/socket.js`，并且在 `www/cordova_plugins.js` 中增加了一个入口。加载时，`cordova.js` 中的代码使用 XHR 去读取每一个文件并使用 `<script>` 将它们注入到 HTML 页面中。

不要使用 `cordova.define` 去包装文件，它会被自动包装。模块封装在一个闭包中， `module`，
`exports`, and `require` 都在作用域中，因为这对 AMD 模块来说是正常的。

`<js-module>` 标签的详情：

* `src` 引用插件目录下一个相对于 `plugin.xml` 文件的文件。

* `name` 模块名称的最后一部分。这在你使用 `cordova.require` 来导入插件的其他模块时有用。`<js-module>` 的模块名称是插件的 `id` + `name`。前面的例子中，`id` 是 `chrome.socket`，`name` 是 `Socket`，模块名称为 `chrome.socket.Socket`。

* `<js-module>` 中可以有以下三个标签:
    
    * `<clobbers target="some.value"/>` 指明 `module.exports` 将 `window.some.value` 插入到 `window` 对象中。只要你喜欢，你可以有很多 `<clobber>`。Any object not available on `window` is created.

    * `<merges target="some.value"/>` 表示模块应该和已经存在的 `window.some.value` 合并，如果 key 已经存在，使用模块的版本覆盖原来的。可以有多个 `<merges>` 标签。Any object not available on `window` is created.

    * `<runs/>` 表示你的代码应该使用 `cordova.require` 指定，但不安装到 `window` 对象上。这在初始化模块时很有用，如绑定事件处理器。你最多只能有一个 `<runs/>` 标签。注意在 `<clobbers/>` or `<merges/>` 中包含 `<runs/>` 是多余的，因为它们也会 `cordova.require` 你的模块。

    * 空的 `<js-module>` 仍会加载并且可以被其他模块通过 `cordova.require` 访问。

如果 `src` 不能解析为一个文件地址，plugman 会停止加载并回滚安装，发出问题的通知并以非 0 代码退出。

嵌套在 `<platform>` 下的 `<js-module>` 元素申明了指定平台的 JavaScript 的模块绑定。

### dependency

`<dependency>` 标签让你指定当前插件的依赖插件。未来的版本会从插件库中访问，就眼前来说，插件通过 `<dependency>` 标签的 URL 来引用。如：

```xml
<dependency id="com.plugin.id" url="https://github.com/myuser/someplugin" commit="428931ada3891801" subdir="some/path/here" />  
```

* `id`: 插件ID，它需要全局唯一的，使用反向域名来表达。
* `url`: 插件库地址。
* `commit`: 它是 `git checkout` 用的 git 引用：一个分支或者一个标签名称（(e.g., `master`, `0.3.1`)，或者一个提交的hash码(e.g.,
    `975ddb228af811dd8bb37ed1dfd092a3d05295f9`)。
* `subdir`: 指定代码库中的子目录作为插件依赖。这让库可以包含几个相关的插件，这有时比较好用。

未来会引入版本约束，可以通过 name 获取而非显式的 URL。

#### 相对依赖路径

如果你设置了 `<dependency>` 标签的 `url` 为 `"."`，并且提供了 `subdir`，依赖插件将会从定义 `<dependency>` 的父插件的本地或者远程 git 库中安装。

`subdir` 总是指定相对 git 库的根的目录，而不是父插件的目录。即使插件是使用本地路径来安装的，也还是如此。plugman 在 git 库的根目录寻找并发现其他的插件。

### platform

`<platform>` 指明了本地代码相关的或者需要修改配置文件的平台。工具可以根据它识别支持的平台并把代码安装到 Cordova 工程中。

没有指定 `<platform>` 插件只支持 JavaScript，因此可以在平台上安装。

```xml
<platform name="android">
    <source-file src="src/android/Device.java" target-dir="src/org/apache/cordova/device" />
</platform>
<platform name="ios">
    <!-- ios-specific elements -->
</platform>
```

`name` 表示支持的平台，子元素指定平台相关的特性。

平台名称应该使用小写，平台列表为：

* amazon-fireos
* android
* blackberry10
* ios
* wp7
* wp8
* windows8

### source-file

`<source-file>` 元素指定安装到项目中的可执行代码，如：

```xml
<!-- android -->
<source-file src="src/android/Foo.java"
                target-dir="src/com/alunny/foo" />
<!-- ios -->
<source-file src="src/ios/CDVFoo.m" />
<source-file src="src/ios/someLib.a" framework="true" />
<source-file src="src/ios/someLib.a" compiler-flags="-fno-objc-arc" />
```

它支持以下属性:

* `src` (required): 相对 `plugin.xml` 文件路径。
* `target-dir`: 文件拷贝的目标路径，相对 Cordova 项目的跟路径。实际中，这在 Java 平台很重要，在 `com.alunny.foo` 包下的文件必须在 `com/alunny/foo` 目录下。在源目录不重要的平台，这个属性应该被忽略。如果 `source-file` 会覆盖已经存在的文件，则 plugman 会报错。
* `framework` (iOS only): If set to `true`, also adds the specified file as a framework to the project.
* `compiler-flags` (iOS only): If set, assigns the specified compiler flags for the particular source file.

### config-file

标志一个基于 XML 的配置文件，这个配置文件可以修改两种文件类型，分别为 `xml` 和 `plist` 文件。`config-file` 元素只允许添加新的子元素到 XML 文档树中。子元素会插入到目标文档中。

修改类型为 xml 的文件，如：

```xml
<config-file target="AndroidManifest.xml" parent="/manifest/application">
    <activity android:name="com.foo.Foo" android:label="@string/app_name">
        <intent-filter>
        </intent-filter>
    </activity>
</config-file>
```

`plist` 的例子:

```xml
<config-file target="*-Info.plist" parent="CFBundleURLTypes">
    <array>
        <dict>
            <key>PackageName</key>
            <string>$PACKAGE_NAME</string>
        </dict>
    </array>
</config-file>
```

支持的属性如下:

* `target`: 修改的目标文件，相对于 Cordova 项目的根目录。target 可以包含通配符（*），这种情况下，plugman 递归搜索工程目录，并使用第一个匹配的结果。IOS 中，相对于项目根目录的配置文件路径是不可知的，所以标明一个相对 `cordova-ios-project/MyAppName/config.xml` 的目标文件 `config.xml`。

* `parent`: 一个 XPath 选择器，指定配置文件将要添加到的目标文件。如果使用绝对选择器，你可以使用通配符（*）去指定根元素。对于 `plist` 文件，`parent` 元素指定了 XML 被插入的父文件的 key。

### plugins-plist

This is _outdated_ as it only applies to cordova-ios 2.2.0 and
below. Use the `<config-file>` tag for newer versions of Cordova.

Example:

```xml
<config-file target="config.xml" parent="/widget/plugins">
    <feature name="ChildBrowser">
        <param name="ios-package" value="ChildBrowserCommand"/>
    </feature>
</config-file>
```

Specifies a key and value to append to the correct `AppInfo.plist`
file in an iOS Cordova project. For example:

```xml
<plugins-plist key="Foo" string="CDVFoo" />
```

### resource-file and header-file Elements

像 source file 一样，指定 header 和资源文件。如 iOS：

```xml
<resource-file src="CDVFoo.bundle" />
<resource-file src="CDVFooViewController.xib" />
<header-file src="CDVFoo.h" />
```

Android 示例:

```xml
<resource-file src="FooPluginStrings.xml" target="res/values/FooPluginStrings.xml" />
```

### lib-file

像 source, resource, and header files，指定用户自定义的库：

如:

```xml
<lib-file src="src/BlackBerry10/native/device/libfoo.so" arch="device" />
<lib-file src="src/BlackBerry10/native/simulator/libfoo.so" arch="simulator" />
```

支持的属性:

* `src` (required): 相对 `plugin.xml` 的文件路径。
* `arch`: `.so` 文件编译的架构，如 `device` or `simulator`。

### framework

指定插件依赖的平台（通常是 OS/平台）。

如:

```xml
<framework src="libsqlite3.dylib" />
<framework src="social.framework" weak="true" />
<framework src="relative/path/to/my.framework" custom="true" />
<framework src="path/to/project/LibProj.csproj" custom="true" type="projectReference"/>
```

`src` 属性指定一个添加到 Cordova 工程的框架。

- `src` 属性指定框架，plugman 会视图添加到 Cordova 工程。
- `weak` 指定跨家是否应该被软连接，默认为 `false`。
- `custom` 默认为  `false`。指定 framework 是否作文插件文件的一部分（因此，它不是系统框架）。在 Android 平台，它指定如何处理 **src**，如果为  `true` **src** 乡镇应用的工程目录，否则，相对 Android SDK 目录。
- `custom` The optional `custom` attribute is a boolean indicating whether the framework is one that is included as part of your plugin files (thus it is not a system framework). The default is `false`.  **_On Android_** it specifies how to treat **src**. If `true` **src** is a relative path from the application project's directory, otherwise -- from the Android SDK directory.
- `type` The optional `type` attribute is a string indicating the type of framework to add. Currently only `projectReference` is supported and only on Windows 8.  Using `custom='true'` and `type='projectReference'` will add a reference to the project which will be added to the compile+link steps of the cordova project.  This essentially is the only way currently that a 'custom' framework can target multiple architectures as they are explicitly built as a dependency by the referencing cordova application.
- `parent` The optional `parent` attribute is currently supported only on Android. It sets the relative path to the directory containing the sub-project to which to add the reference. The default is `.`, i.e. the application project. It allows to add references between sub projects like in this example:

```xml
<framework src="FeedbackLib" custom="true" />
<framework src="extras/android/support/v7/appcompat" custom="false" parent="FeedbackLib" />
```

### info

提供给用户的额外信息。

```xml
<info>
You need to install __Google Play Services__ from the `Android Extras` section using the Android SDK manager (run `android`).

You need to add the following line to the `local.properties`:

android.library.reference.1=PATH_TO_ANDROID_SDK/sdk/extras/google/google_play_services/libproject/google-play-services_lib
</info>
```

### 变量

在某些情况下，一个插件需要根据目标平台对配置文件进行更改。比如，为了在 Android 上面注册 C2DM（一个 package id 为 `com.alunny.message` 的应用），需要如下面的权限：

```xml
<uses-permission android:name="com.alunny.message.permission.C2D_MESSAGE"/>
```

在这种情况下面，事先并不知道插入 `plugin.xml` 文件的内容。这个时候就需要使用到变量的概念，变量是以美元符号（$)开头的，后接一系列大写字母、数字及下划线。对于上面的例子，`plugin.xml` 中会包含下面的标签：

```xml
<uses-permission android:name="$PACKAGE_NAME.permission.C2D_MESSAGE"/>
```

plugman 会使用特定的值代替变量，如果没有找到则使用一个空的字符串代替。变量的值可以被自动检测（如从 `AndroidManifest.xml` 文件中），也可以由工具指定，该过程依赖于特定的工具；

plugman 可以要求用户指定插件需要的变量值，如：C2M 和 Google 地图的 API_KEY 可以使用下面的命令参数指定：

```shell
plugman --platform android --project /path/to/project --plugin name|git-url|path --variable API_KEY=!@CFATGWE%^WGSFDGSDFW$%^#$%YTHGsdfhsfhyer56734
```

为了强制使用标量，在 `<platform>` 标签下需要包含一个 `<preference>` 标签，如：

```xml
<preference name="API_KEY" />
```

plugman 会检查必须的 preferences 传入，如果没有，报错退出。

### $PACKAGE_NAME

包的反向域风格的唯一标识符，对应 iOS 的 `CFBundleIdentifier` 或 Android 中的 `AndroidManifest.xml` 文件的顶级 `manifest` 元素的 `package` 属性。

## Android 插件

### 插件的目录结构

我们以 `org.apache.cordova.device` 插件为例：

    org.apache.cordova.device
    |   LICENSE
    |   package.json 插件的模块描述文件，模仿 Node。
    |   plugin.xml 插件的配置文件。
    |   README.md
    |
    +---doc
    |       index.md 插件的 API 文档。
    |
    +---src Native 层代码。
    |   +---android
    |   |       Device.java
    |   |
    |   +---ios
    |   |       CDVDevice.h
    |   |       CDVDevice.m
    |   |
    |   \...other platforms
    |
    \---www
            device.js JavaScript 层代码的实现。

<!-- more -->

### plugin.xml

`plugin.xml` 的内容如下：

```xml
<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"
    xmlns:rim="http://www.blackberry.com/ns/widgets"
    xmlns:android="http://schemas.android.com/apk/res/android"
    id="org.apache.cordova.device"
    version="0.2.9">
    <name>Device</name>
    <description>Cordova Device Plugin</description>
    <license>Apache 2.0</license>
    <keywords>cordova,device</keywords>
    <repo>https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git</repo>
    <issue>https://issues.apache.org/jira/browse/CB/component/12320648</issue>

    <js-module src="www/device.js" name="device">
        <clobbers target="device" />
    </js-module>

     <!-- android -->
    <platform name="android">
        <config-file target="res/xml/config.xml" parent="/*">
            <feature name="Device" >
                <param name="android-package" value="org.apache.cordova.device.Device"/>
            </feature>
        </config-file>

        <source-file src="src/android/Device.java" target-dir="src/org/apache/cordova/device" />
    </platform>

     <!-- ios -->
    <platform name="ios">
        <config-file target="config.xml" parent="/*">
            <feature name="Device">
                <param name="ios-package" value="CDVDevice"/>
            </feature>
        </config-file>

        <header-file src="src/ios/CDVDevice.h" />
        <source-file src="src/ios/CDVDevice.m" />
    </platform>

    <!--other platforms-->
</plugin>
```

其中：

- id: 插件的标识，即发布到 [plugins.cordova.io](http://plugins.cordova.io/) 的 ID。
- name：插件的名称
- description：插件描述信息
- js-module 插件的 JavaScript 模块申明。

        <js-module src="www/device.js" name="device">
            <clobbers target="device" />
        </js-module>

    插件对应的 javascript 模块，src 属性指向 JavaScript 文件，如这里的 `www/device.js`。对于 Android 平台，插件安装后，该文件会被拷贝到 `assets/www/plugins/org.apache.cordova.device/www/` 下。该 JavaScript 文件在 `index.html` 被加载。`clobbers` 为映射的变量，默认为全局变量，本例中将 device 模块映射为全局变量 `windows.device`。如果没有使用 `clobbers` 来映射，我们可以使用 `require` 方法来加载模块：

        var device = cordova.require('org.apache.cordova.device');

- config-file：插件的平台配置，以 Android 为例。

        <config-file target="res/xml/config.xml" parent="/*">
            <feature name="Device" >
                <param name="android-package" value="org.apache.cordova.device.Device"/>
            </feature>
        </config-file>

    The service `name` matches the one used in the JavaScript exec call. The `value` is the Java class's fully qualified namespace identifier.

    安装插件后 `feature` 标签会被添加到 `res/xml/config.xml` 文件中。

        <source-file src="src/android/Device.java" target-dir="src/org/apache/cordova/device" />

    安装插件后，`src/android/Device.java` 复制到 android 的 package 包(`src/`)中。

### www/device.js

模块的写法采用 CommonJS Module 规范。

#### The JavaScript Interface

```js
var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

channel.createSticky('onCordovaInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onCordovaInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function Device() {
    this.available = false;
    this.platform = null;
    this.version = null;
    this.uuid = null;
    this.cordova = null;
    this.model = null;

    var me = this;

    channel.onCordovaReady.subscribe(function() {
        me.getInfo(function(info) {
            //ignoring info.cordova returning from native, we should use value from cordova.version defined in cordova.js
            //TODO: CB-5105 native implementations should not return info.cordova
            var buildLabel = cordova.version;
            me.available = true;
            me.platform = info.platform;
            me.version = info.version;
            me.uuid = info.uuid;
            me.cordova = buildLabel;
            me.model = info.model;
            channel.onCordovaInfoReady.fire();
        },function(e) {
            me.available = false;
            utils.alert("[ERROR] Error initializing Cordova: " + e);
        });
    });
}

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
Device.prototype.getInfo = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'Device.getInfo', arguments);
    exec(successCallback, errorCallback, "Device", "getDeviceInfo", []);
};

module.exports = new Device();
```

### src/android/Device.java

```java
public class Device extends CordovaPlugin {
    public static String uuid;                                // Device UUID

    // ... other fileds

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Device.uuid = getUuid();
    }

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArry of arguments for the plugin.
     * @param callbackContext   The callback id used when calling back into JavaScript.
     * @return                  True if the action was valid, false if not.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("getDeviceInfo")) {
            JSONObject r = new JSONObject();
            r.put("uuid", Device.uuid);
            r.put("version", this.getOSVersion());
            r.put("platform", this.getPlatform());
            r.put("model", this.getModel());
            callbackContext.success(r);
        }
        else {
            return false;
        }
        return true;
    }

    /**
     * Get the device's Universally Unique Identifier (UUID).
     *
     * @return
     */
    public String getUuid() {
        String uuid = Settings.Secure.getString(this.cordova.getActivity().getContentResolver(), android.provider.Settings.Secure.ANDROID_ID);
        return uuid;
    }

    // ... other method
}
```

其中：

- 插件必须继承插件父类 `CordovaPlugin`。
- `initialize` 重写父类的初始化方法，当插件被实例化后，该方法自动被调用。
- `execute` 重写父类的执行请求方法。方法签名为：

        public boolean execute(String action, JSONArray args, CallbackContext callbackContext)

    + action 用于标识插件的行为。
    + args 参数。
    + callbackContext 和 JavaScript 的交互上下文。成功调用 `callbackContext.success(message)`，失败调用 `callbackContext.error(message)` 方法，分别对应 JavaScript 文件中的 `success` 和 `error` 回调函数。

### Android Plugin (Native Interfaces)

插件描述为 `config.xml` 文件中的类映射。一个插件至少包含一个继承于 `CordovaPlugin` 的 Java 类，并且覆盖其中的 `execute` 方法。作为最佳实践，插件应该处理 `pause` and `resume` 事件，以及插件之间传递的任何信息。长时间运行的插件，如媒体播放，监听器，或者内部内部状态，其后台的 Activity 还应该实现 `onReset()` 方法。它在 WebView 导航到新的页面或者刷新的时候执行，这会重新加载 JavaScript。

不管你把插件发布为 Java 文件还是 jar 文件，插件都必须在 Cordova-Android 应用的 `res/xml/config.xml` 文件中指定。如何在 `plugin.xml` 文件中注入 feature 元素：

```xml
<feature name="<service_name>">
    <param name="android-package" value="<full_name_including_namespace>" />
</feature>
```

`service_name` 必须和 JavaScript 中 `exec` 匹配，`value` 为 Java 类的全限定名。否则，插件虽然可以编译，但在 Cordova 中还是不能用。

### 插件初始化和声明周期

插件实例和 WebView 的生命周期一致。插件直到第一次在 JavaScript 被调用时才被引用，除非 `config.xml` 文件中 `onloadname` 参数被设置为 `true`，如

```xml
<feature name="Echo">  
    <param name="android-package" value="<full_name_including_namespace>" />  
    <param name="onload" value="true" />  
</feature>  
```

插件应该使用初始化方法来实现启动逻辑：

```java
@override  
public void initialize(CordovaInterface cordova, CordovaWebView webView) {  
    super.initialize(cordova, webView);
    // your init code here
}
```

### Android 集成

Android 的 Intent 系统可以实现进程间通信。插件可以访问 CordovaInterface 对象，CordovaInterface 对象可以访问运行应用 Android Activity，这个 Activity 启动一个 Android Itent 的上下文。CordovaInterface 可以让插件为了结果启动一个 Activity，让后当 Intent 结果返回时设置回调件。 

Cordova 2.0 开始，插件不再能直接访问 Context，`ctx` 成员已被废弃。所有的 `ctx` 的方法在 Context 中都可以找到，所以 `getContext()` and `getActivity()` 都可以放回需要的对象。

### Upgrading Android

- [PhoneGap API Documentation](http://docs.phonegap.com/en/edge/guide_platforms_android_upgrade.md.html#Upgrading%20Android)

## Reference

- [Plugin Development Guide](http://docs.phonegap.com/en/edge/guide_hybrid_plugins_index.md.html)
- [PhoneGap 12 插件开发指南](http://blog.csdn.net/jacob_wang520/article/details/18349625)