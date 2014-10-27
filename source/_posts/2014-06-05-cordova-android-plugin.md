---
layout: post
title: "Cordova Android Plugin"
category: Cordova
tags: [phonegap, cordova]
--- 

## 插件开发指南

_插件_ 是应用中用来显示的 Cordova WebView 和原生平台通信的植入代码包。插件提供了访问设备和平台功能，这些功能在基于网页的应用不存在。所有主要的 Cordova API 功能都被实现为插件，其他特性如条形码扫描、NFC 通讯或者定制日历也是可用的。请参考插件中心 [registry](http://plugins.cordova.io/)。

插件包含每一个支持的平台的一个单独的 JavaScript 接口和一个相应的原生代码库。这部分通过一个简单的 _echo_ 插件逐步讲解，这个例子可以作为编译更复杂的功能的模板。还会讨论基本的插件结构和对外的 JavaScript 接口。

除了这些说明，当你准备些一个插件时，最好先浏览 [已经存在的插件](http://cordova.apache.org/#contribute)，作为指导。

### 编译插件

应用开发者使用 CLI 的 `plugin add` 命令来添加一个插件到工程中。命令的茶树一个 包含插件代码的 git 库的 URL。这个例子实现了 Cordova 的 Device API：

```
$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
```

插件代码库的顶层目录中必须包含 `plugin.xml` 文件，有多种方式配置这个文件。以下是 `Device` 插件的简化版本，设备插件这个简单例子的版本提供了一个模型：

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

可以使用plugman工具去检查插件在每一个平台是是否安装成功。

你需要一个有效的app源文件目录，确保index.html home页面引用了插件的javascript接口名称，如果是在同一目录下面：

```html
<script src="myplugin.js"></script>
```

运行下面的代码去测试IOS中的依赖插件是否正确载入：

```shell
$ plugman install --platform ios --project /path/to/my/project/www --plugin /path/to/my/plugin
```

### JavaScript 接口

javascript提供了一个前置接口，它是插件最重要的组成部分。你可以按你喜欢的方式去组织你的插件，但是你需要调用cordova.call()去与本地平台通信，使用下面打代码形式：

```js
cordova.exec(function(winParam) {},  
    function(error) {},  
    "service",  
    "action",  
    ["firstArgument", "secondArgument", 42, false]);  
```

这些参数是怎么工作的，如下解释：

* function(winParam){}: 成功的回调函数；假定exec（）函数调用成功的完成了，该函数会被调用，同时可以传递需要的参数到这个函数；
* function(error){}：像上面一样，不过是失败的时候的回调函数；
* service：调用本地平台的服务名称；
* action：调用本地平台的行为，一般代表的就是插件的函数名称；
* [/* arguments */]: 传递给本地环境的参数数组。

### Sample JavaScript

本例子展示了实现javascript接口的一种方式：

```js
window.echo = function(str, callback) {  
    cordova.exec(callback, function(err) {  
        callback('Nothing to echo.');  
    }, "Echo", "echo", [str]);  
};  
```

看传递给 cordova.exec 函数的最后三个参数，第一个代表调用 Echo 服务，是一个类名，第二个请求一个 echo 行为，对应 Echo 类的 echo 方法，第三个参数参数数组，包含要 echo 的字符串。

在这个例子中，插件关联到 `window` 对象上，可以这样调用：

```js
window.echo("echome", function(echoValue) {  
    alert(echoValue == "echome"); // should alert true.  
});  
```

传入 exec 的成功的回调函数是 `window.echo` 携带的回调函数的引用，如果原生平台触发错误回调，只是简单地调用成功回调并且传入一个默认字符串。

### 本地接口

一旦你定义了你的javascript接口，你必须至少需要一个本地实现。详细信息可以参考：

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

一旦开发完成你的插件，你可能想要将其发布到社区与别人进行分享。你可以发布你的插件到 cordova [注册中心]](http://plugins.cordova.io/) 或者发布到任何基于 npmjs 的其他注册中心。其他的开发者可以使用 自动安装这个插件，通过 Cordova CLI 或者 `plugman` 自动管理。

你需要使用 `plugman` 工具按照下面的步骤安装插件：

```
$ plugman adduser # that is if you don't have an account yet$ plugman publish /path/to/your/plugin
```

## Plugin Specification

See [PhoneGap 13 插件配置标准 - jacob的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/jacob_wang520/article/details/18350355)

plugin.xml文件是在plugins命名空间（http://apache.org/cordova/ns/plugins/1.0）下面的xml文档。它包含一个定义插件的顶层 plugin 元素及定义插件结构的子元素。

A sample plugin element:

```xml
<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"  
    xmlns:android="http://schemas.android.com/apk/res/android"  
    id="com.alunny.foo"  
    version="1.0.2"> 
```

### plugin 元素

The `plugin` element is the plugin manifest's top-level element. It
features the following attributes:

`plugin` 元素是插件 manifest 的底层元素，它有下面的特性：

* `xmlns` (required): 插件命名空间，`http://apache.org/cordova/ns/plugins/1.0`。 If
    the document contains XML from other namespaces, such as tags to be
    added to the `AndroidManifest.xml` file, those namespaces should
    also be included in the top-level element.

* `id` (required):
    A reverse-domain style identifier for the plugin, such as
    `com.alunny.foo`

* `version` (required):
    A version number for the plugin, that matches the following
    major-minor-patch style regular expression:

    ```
    ^\d+[.]\d+[.]\d+$
    ```

### engines and engine Elements

The child elements of the `<engines>` element specify versions of
Apache Cordova-based frameworks that this plugin supports. An example:

```
<engines>    <engine name="cordova" version="1.7.0" />    <engine name="cordova" version="1.8.1" />    <engine name="worklight" version="1.0.0" platform="android" scriptSrc="worklight_version"/></engines>
```

Similar to the `<plugin>` element's `version` attribute, the specified
version string should match a major-minor-patch string conforming to
the regular expression:

```
^\d+[.]\d+[.]\d+$
```

Engine elements may also specify fuzzy matches to avoid repetition,
and to reduce maintenance when the underlying platform is updated.
Tools should support a minimum of `>`, `>=`, `<` and `<=`, for
example:

```
<engines>    <engine name="cordova" version=">=1.7.0" />    <engine name="cordova" version="<1.8.1" /></engines>
```

The `<engine>` tags also has default support for all of the main platforms Cordova exists on. 
Specifying the `cordova` engine tag means that all versions of Cordova on any platform must
satisfy the engine version attribute. You may also list specific platforms and their versions
in order to override the catch-all `cordova` engine:

```
<engines>    <engine name="cordova" version=">=1.7.0" />    <engine name="cordova-android" version=">=1.8.0" />    <engine name="cordova-ios" version=">=1.7.1" /></engines>
```

Here's a list of the default engines that the '
<engine>' tag supports:
* 'cordova' 
* 'cordova-plugman' 
* 'cordova-amazon-fireos'
* 'cordova-android'
* 'cordova-ios'
* 'cordova-blackberry10' 
* 'cordova-wp7'
* 'cordova-wp8'
* 'cordova-windows8' <br>
* 'android-sdk' // returns the highest Android api level installed
* 'apple-xcode' // returns the xcode version 
* 'apple-ios' // returns the highest iOS version installed
* 'apple-osx' // returns the OSX version
* 'blackberry-ndk' // returns the native blackberry SDK version</engine>

Specifying custom Apache Cordova-based frameworks should be listed under the engine tag like so:

```
<engines>    <engine name="my_custom_framework" version="1.0.0" platform="android" scriptSrc="path_to_my_custom_framework_version"/>    <engine name="another_framework" version=">0.2.0" platform="ios|android" scriptSrc="path_to_another_framework_version"/>    <engine name="even_more_framework" version=">=2.2.0" platform="*" scriptSrc="path_to_even_more_framework_version"/></engines>
```

A custom Apache Cordova-based framework requires that an engine element includes the following attributes: 
`name`, `version`, `scriptSrc`, and `platform`. 

* `name` (required): A human-readable name for your custom framework. 

* `version` (required): The version that your framework must have in order to install.

* `scriptSrc` (required): The script file that tells plugman what version of the custom framework is. 
    Ideally, this file should be within the top level directory of your plugin directory.

* `platform` (required): Which platforms that your framework supports. You may use the wildcard `*`
    to say supported for all platforms, specify multiple with a pipe character like `android|ios|blackberry10` 
    or just a single platform like `android`.

plugman aborts with a non-zero code for any plugin whose target
project does not meet the engine's constraints.

If no `<engine>` tags are specified, plugman attempts to install into
the specified cordova project directory blindly.

### name Element

A human-readable name for the plugin, whose text content contains the
name of the plugin. For example:

```
<name>Foo</name>
```

This element does not (yet) handle localization.

### description Element

A human-readable description for the plugin. The text content of the element contains
the description of the plugin. An example:

```
<description>Foo plugin description</description>
```

This element does not (yet) handle localization.

### author Element

Plugin author name. The text content of the element contains
the name of the plugin author. An example:

```
<author>Foo plugin description</author>
```

### keywords Element

Plugin keywords. The text content of the element contains comma separated keywords to describe the plugin. An example:

```
<keywords>foo,bar</keywords>
```

### license Element

Plugin license. The text content of the element contains the plugin license. An example:

```
<license>Apache 2.0 License</license>
```

### asset Element

One or more elements listing the files or directories to be copied
into a Cordova app's `www` directory. Examples:

```
<!-- a single file, to be copied in the root directory --><asset src="www/foo.js" target="foo.js" /><!-- a directory, also to be copied in the root directory --><asset src="www/foo" target="foo" />
```

All `<asset>` tags require both `src` and `target` attributes.
Web-only plugins contains mostly `<asset>` elements. Any `<asset>`
elements that are nested within `<platform>` elements specify
platform-specific web assets, as described below. Attributes include:

* `src` (required): 
    Where the file or directory is located in the plugin package,
    relative to the `plugin.xml` document.  If a file does not exist at
    the specified `src` location, plugman stops and reverses the
    installation process, issues a notification about the conflict, and
    exits with a non-zero code.

* `target` (required):

    Where the file or directory should be located in the Cordova app,
    relative to the `www` directory.
    Assets can be targeted to subdirectories, for example:

    ```
    <asset src="www/new-foo.js" target="js/experimental/foo.js" />
    ```

    creates the `js/experimental` directory within the `www` directory,
    unless already present, then copies the `new-foo.js` file and
    renames it `foo.js`.  If a file already exists at the target
    location, plugman stops and reverses the installation process,
    issues a notification about the conflict, and exits with a non-zero
    code.

### js-module Element

Most plugins include one or more JavaScript files.  Each `<js-module>`
tag corresponds to a JavaScript file, and prevents the plugin's users
from having to add a `<script>` tag for each file.  While `<asset>`
tags simply copy a file from the plugin subdirectory into `www`,
`<js-module>` tags are much more sophisticated. They look like this:

```
<js-module src="socket.js" name="Socket">    <clobbers target="chrome.socket" /></js-module>
```

When installing a plugin with the example above, `socket.js` is copied
to `www/plugins/my.plugin.id/socket.js`, and added as an entry to
`www/cordova_plugins.js`. At load time, code in `cordova.js` uses XHR
to read each file and inject a `<script>` tag into HTML. It adds a
mapping to clobber or merge as appropriate, as described below.

_Do not_ wrap the file with `cordova.define`, as it is added
automatically. The module is wrapped in a closure, with `module`,
`exports`, and `require` in scope, as is normal for AMD modules.

Details for the `<js-module>` tag:

* The `src` references a file in the plugin directory relative to the
    `plugin.xml` file.

* The `name` provides the last part of the module name. It can
    generally be whatever you like, and it only matters if you want to
    use `cordova.require` to import other parts of your plugins in your
    JavaScript code. The module name for a `<js-module>` is your
    plugin's `id` followed by the value of `name`. For the example
    above, with an `id` of `chrome.socket`, the module name is
    `chrome.socket.Socket`.

* Three tags are allowed within `<js-module>`:
    * `<clobbers target="some.value"/>` indicates that the
        `module.exports` is inserted into the `window` object as
        `window.some.value`. You can have as many `<clobbers>` as you
        like. Any object not available on `window` is created.

    * `<merges target="some.value"/>` indicates that the module
        should be merged with any existing value at `window.some.value`.
        If any key already exists, the module's version overrides the
        original. You can have as many `<merges>` as you like. Any
        object not available on `window` is created.

    * `<runs/>` means that your code should be specified with
        `cordova.require`, but not installed on the `window`
        object. This is useful when initializing the module, attaching
        event handlers or otherwise. You can only have up to one
        `<runs/>` tag. Note that including a `<runs/>` with
        `<clobbers/>` or `<merges/>` is redundant, since they also
        `cordova.require` your module.

    * An empty `<js-module>` still loads and can be accessed in other
        modules via `cordova.require`.

If `src` does not resolve to an existing file, plugman stops and
reverses the installation, issues a notification of the problem, and
exits with a non-zero code.

Nesting `<js-module>` elements within `<platform>` declares
platform-specific JavaScript module bindings.

### dependency Element

The `<dependency>` tag allows you to specify other plugins on which the
current plugin depends. While future versions will access them from
plugin repositories, in the short term plugins are directly referenced
as URLs by `<dependency>` tags. They are formatted as follows:

```
<dependency id="com.plugin.id" url="https://github.com/myuser/someplugin" commit="428931ada3891801" subdir="some/path/here" />
```

* `id`: provides the ID of the plugin. It should be globally unique,
    and expressed in reverse-domain style. While neither of these
    restrictions is currently enforced, they may be in the future.

* `url`: A URL for the plugin. This should reference a git repository,
    which plugman attempts to clone.

* `commit`: This is any git reference understood by `git checkout`: a
    branch or tag name (e.g., `master`, `0.3.1`), or a commit hash (e.g.,
    `975ddb228af811dd8bb37ed1dfd092a3d05295f9`).

* `subdir`: Specifies that the targeted plugin dependency exists as a
    subdirectory of the git repository. This is helpful because it
    allows the repository to contain several related plugins, each
    specified individually.

In the future, version constraints will be introduced, and a plugin
repository will exist to support fetching by name instead of explicit
URLs.

#### Relative Dependency Paths

If you set the `url` of a `<dependency>` tag to `"."` and provide a
`subdir`, the dependent plugin is installed from the same local or
remote git repository as the parent plugin that specifies the
`<dependency>` tag.

Note that the `subdir` always specifies a path relative to the _root_
of the git repository, not the parent plugin. This is true even if you
installed the plugin with a local path directly to it. Plugman finds
the root of the git repository and then finds the other plugin from
there.

### platform Element

The `<platform>` tag identifies platforms that have associated native
code or require modifications to their configuration files. Tools
using this specification can identify supported platforms and install
the code into Cordova projects.

Plugins without `<platform>` tags are assumed to be JavaScript-only,
and therefore installable on any and all platforms.

A sample platform tag:

```
<platform name="android">    <!-- android-specific elements --></platform><platform name="ios">    <!-- ios-specific elements --></platform>
```

The required `name` attribute identifies a platform as supported,
associating the element's children with that platform.

Platform names should be lowercase. Platform names, as arbitrarily
chosen, are listed:

* amazon-fireos
* android
* blackberry10
* ios
* wp7
* wp8
* windows8

### source-file Element

The `<source-file>` element identifies executable source code that
should be installed into a project. Examples:

```
<!-- android --><source-file src="src/android/Foo.java"                target-dir="src/com/alunny/foo" /><!-- ios --><source-file src="src/ios/CDVFoo.m" /><source-file src="src/ios/someLib.a" framework="true" /><source-file src="src/ios/someLib.a" compiler-flags="-fno-objc-arc" />
```

It supports the following attributes:

* `src` (required):
    Location of the file relative to `plugin.xml`.  If the `src` file
    can't be found, plugman stops and reverses the installation, issues
    a notification about the problem, and exits with a non-zero code.

* `target-dir`:
    A directory into which the files should be copied, relative to the
    root of the Cordova project.  In practice, this is most important
    for Java-based platforms, where a file in the `com.alunny.foo`
    package must be located within the `com/alunny/foo` directory. For
    platforms where the source directory is not important, this
    attribute should be omitted.

    As with assets, if the `target` of a `source-file` would overwrite
    an existing file, plugman stops and reverses the installation,
    issues a notification about the problem, and exits with a non-zero
    code.

* `framework` (iOS only):
    If set to `true`, also adds the specified file as a framework to the
    project.

* `compiler-flags` (iOS only):
    If set, assigns the specified compiler flags for the particular
    source file.

### config-file Element

Identifies an XML-based configuration file to be modified, where in
that document the modification should take place, and what should be
modified.

Two file types that have been tested for modification with this
element are `xml` and `plist` files.

The `config-file` element only allows you to append new children to an
XML document tree. The children are XML literals to be inserted in the
target document.

Example for XML:

```
<config-file target="AndroidManifest.xml" parent="/manifest/application">    <activity android:name="com.foo.Foo" android:label="@string/app_name">        <intent-filter>        </intent-filter>    </activity></config-file>
```

Example for `plist`:

```
<config-file target="*-Info.plist" parent="CFBundleURLTypes">    <array>        <dict>            <key>PackageName</key>            <string>$PACKAGE_NAME</string>        </dict>    </array></config-file>
```

It supports the following attributes:

* `target`:

    The file to be modified, and the path relative to the root of the
    Cordova project.

    The target can include wildcard (`*`) elements. In this case,
    plugman recursively searches through the project directory structure
    and uses the first match.

    On iOS, the location of configuration files relative to the project
    directory root is not known, so specifying a target of `config.xml`
    resolves to `cordova-ios-project/MyAppName/config.xml`.

    If the specified file does not exist, the tool ignores the
    configuration change and continues installation.

* `parent`: An XPath selector referencing the parent of the elements
    to be added to the config file. If you use absolute selectors, you
    can use a wildcard (`*`) to specify the root element,
    e.g., `/*/plugins`.

    For `plist` files, the `parent` determines under what parent key the
    specified XML should be inserted.

    If the selector does not resolve to a child of the specified
    document, the tool stops and reverses the installation process,
    issues a warning, and exits with a non-zero code.

### plugins-plist Element

This is _outdated_ as it only applies to cordova-ios 2.2.0 and
below. Use the `<config-file>` tag for newer versions of Cordova.

Example:

```
<config-file target="config.xml" parent="/widget/plugins">    <feature name="ChildBrowser">        <param name="ios-package" value="ChildBrowserCommand"/>    </feature></config-file>
```

Specifies a key and value to append to the correct `AppInfo.plist`
file in an iOS Cordova project. For example:

```
<plugins-plist key="Foo" string="CDVFoo" />
```

### resource-file and header-file Elements

Like source files, but specifically for platforms such as iOS that
distinguish between source files, headers, and resources. iOS Examples:

```
<resource-file src="CDVFoo.bundle" /><resource-file src="CDVFooViewController.xib" /><header-file src="CDVFoo.h" />
```

Android example:

```
<resource-file src="FooPluginStrings.xml" target="res/values/FooPluginStrings.xml" />
```

### lib-file Element

Like source, resource, and header files, but specifically for
platforms such as BlackBerry 10 that use user-generated libraries.
Examples:

```
<lib-file src="src/BlackBerry10/native/device/libfoo.so" arch="device" /><lib-file src="src/BlackBerry10/native/simulator/libfoo.so" arch="simulator" />
```

Supported attributes:

* `src` (required):
    The location of the file relative to `plugin.xml`.
    If `src` can't be found, plugman stops and reverses the
    installation, issues a warning about the problem, and exits with a
    non-zero code.

* `arch`: The architecture for which the `.so` file has been built,
    either `device` or `simulator`.

### framework Element

Identifies a framework (usually part of the OS/platform) on which the plugin depends.

Examples:

```
<framework src="libsqlite3.dylib" /><framework src="social.framework" weak="true" /><framework src="relative/path/to/my.framework" custom="true" /><framework src="path/to/project/LibProj.csproj" custom="true" type="projectReference"/>
```

The `src` attribute identifies the framework, which plugman attempts
to add to the Cordova project, in the correct fashion for a given
platform.

The optional `weak` attribute is a boolean indicating whether the
framework should be weakly linked. The default is `false`.

The optional `custom` attribute is a boolean indicating whether the framework is one that is included as part of your plugin files (thus it is not a system framework). The default is `false`.

The optional `type` attribute is a string indicating the type of framework to add. Currently only `projectReference` is supported and only on Windows 8.  Using `custom='true'` and `type='projectReference'` will add a reference to the project which will be added to the compile+link steps of the cordova project.  This essentially is the only way currently that a 'custom' framework can target multiple architectures as they are explicitly built as a dependency by the referencing cordova application.

### info Element

Additional information provided to users. This is useful when you
require extra steps that can't be easily automated or are beyond
plugman's scope.  Examples:

```
<info>You need to install __Google Play Services__ from the `Android Extras` section using the Android SDK manager (run `android`).You need to add the following line to the `local.properties`:android.library.reference.1=PATH_TO_ANDROID_SDK/sdk/extras/google/google_play_services/libproject/google-play-services_lib</info>
```

### Variables

In certain cases, a plugin may need to make configuration changes
dependent on the target application. For example, to register for C2DM
on Android, an app whose package id is `com.alunny.message` would
require a permission such as:

```
<uses-permissionandroid:name="com.alunny.message.permission.C2D_MESSAGE"/>
```

In such cases where the content inserted from the `plugin.xml` file is
not known ahead of time, variables can be indicated by a dollar-sign
followed by a series of capital letters, digits, or underscores. For
the above example, the `plugin.xml` file would include this tag:

```
<uses-permissionandroid:name="$PACKAGE_NAME.permission.C2D_MESSAGE"/>
```

plugman replaces variable references with the specified value, or the
empty string if not found. The value of the variable reference may be
detected (in this case, from the `AndroidManifest.xml` file) or
specified by the user of the tool; the exact process is dependent on
the particular tool.

plugman can request users to specify a plugin's required
variables. For example, API keys for C2M and Google Maps can be
specified as a command-line argument:

```
plugman --platform android --project /path/to/project --plugin name|git-url|path --variable API_KEY=!@CFATGWE%^WGSFDGSDFW$%^#$%YTHGsdfhsfhyer56734
```

To make the variable mandatory, the `<platform>` tag needs to contain
a `<preference>` tag. For example:

```
<preference name="API_KEY" />
```

plugman checks that these required preferences are passed in.  If not,
it should warn the user how to pass the variable in and exit with a
non-zero code.

Certain variable names should be reserved, as listed below.

### $PACKAGE_NAME

The reverse-domain style unique identifier for the package,
corresponding to the `CFBundleIdentifier` on iOS or the `package`
attribute of the top-level `manifest` element in an
`AndroidManifest.xml` file.

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

<!--more-->

### plugin.xml

`plugin.xml` 的内容如下：

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

其中：

- id: 插件的标识，即发布到 [plugins.cordova.io](http://plugins.cordova.io/) 的 ID。
- name：插件的名称
- description：插件描述信息
- js-module 插件的 JavaScript 模块申明。

        <js-module src="www/device.js" name="device">
            <clobbers target="device" />
        </js-module>

    插件对应的 javascript 模块，src 属性指向 JavaScript 文件，如这里的 `www/device.js`。对于 Android 平台，插件安装后，该文件会被拷贝到 `assets/www/plugins/org.apache.cordova.device/www/` 下。该 JavaScript 文件被在 `index.html` 被加载。`clobbers` 为映射的变量，默认为全局变量，本例中将 device 模块映射为全局变量 `windows.device`。如果没有使用 `clobbers` 来映射，我们可以使用 `require` 方法来加载模块：

        var device = cordova.require('org.apache.cordova.device');

- platform：插件的平台配置，以 Android 为例。

        <config-file target="res/xml/config.xml" parent="/*">
            <feature name="Device" >
                <param name="android-package" value="org.apache.cordova.device.Device"/>
            </feature>
        </config-file>

    The service `name` matches the one used in the JavaScript exec call. The `value` is the Java class's fully qualified namespace identifier.

    安装插件后 `feature` 标签会被添加到 res/xml/config.xml 文件中。

        <source-file src="src/android/Device.java" target-dir="src/org/apache/cordova/device" />

    安装插件后，`src/android/Device.java` 复制到 android 的 package 包(`src/`)中。

### www/device.js

模块的写法采用 CommonJS Module 规范。

#### The JavaScript Interface

    cordova.exec(function(winParam) {},
        function(error) {},
        "service",
        "action",
        ["firstArgument", "secondArgument", 42, false]);

Here is how each parameter works:

* `function(winParam) {}`: A success callback function. Assuming your exec call completes successfully, this function executes along with any parameters you pass to it.
* `function(error) {}`: An error callback function. If the operation does not complete successfully, this function executes with an optional error parameter.
* `"service"`: The service name to call on the native side. This corresponds to a native class, for which more information is available in the native guides listed below.
* `"action"`: The action name to call on the native side. This generally corresponds to the native class method. See the native guides listed below.
* [/* arguments */]: An array of arguments to pass into the native environment.

This example shows one way to implement the plugin's JavaScript interface:

    window.echo = function(str, callback) {  
        cordova.exec(callback, function(err) {  
            callback('Nothing to echo.');  
        }, "Echo", "echo", [str]);  
    };  

In this example, the plugin attaches itself to the window object as the echo function, which plugin users would call as follows:

    window.echo("echome", function(echoValue) {  
        alert(echoValue == "echome"); // should alert true.  
    });

### src/android/Device.java

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

其中：

- 插件必须继承插件父类 `CordovaPlugin`。
- `initialize` 重写父类的初始化方法，当插件被实例化后，该方法自动被调用。
- `execute` 重写父类的执行请求方法。
    
    execute 的方法签名为：

        public boolean execute(String action, JSONArray args, CallbackContext callbackContext)

    + action 用于标识插件的行为。
    + args 参数。
    + callbackContext 和 JavaScript 交互时的上下文。成功的话调用 `callbackContext.success(message)`，失败调用 `callbackContext.error(message)` 方法，分别对应 javascript 文件中的 success 和 error 回调函数。

### Android Plugin (Native Interfaces)

Android plugins are based on Cordova-Android, which consists of an Android WebView with hooks attached to it. Plugins are represented as class mappings in the `config.xml` file. A plugin consists of at least one Java class that extends the CordovaPlugin class, overriding one of its execute methods. As best practice, the plugin should also handle `pause` and `resume` events, along with any message passing between plugins. Plugins with long-running requests, background activity such as media playback, listeners, or internal state should implement the `onReset()` method as well. It executes when the WebView navigates to a new page or refreshes, which reloads the JavaScript.

Whether you distribute a plugin as Java file or as a jar file of its own, the plugin must be specified in your Cordova-Android application's `res/xml/config.xml` file. See Application Plugins for more information on how to use the `plugin.xml` file to inject this feature element:

    <feature name="<service_name>">
        <param name="android-package" value="<full_name_including_namespace>" />
    </feature>

The service `name` matches the one used in the JavaScript exec call. The value is the Java class's fully qualified namespace identifier. Otherwise, the plugin may compile but still be unavailable to Cordova.

### Plugin Initialization and Lifetime

One instance of a plugin object is created for the life of each WebView. Plugins are not instantiated until they are first referenced by a call from JavaScript, unless `<param>` with an onloadname attribute is set to "true" in `config.xml`. E.g.:

    <feature name="Echo">  
        <param name="android-package" value="<full_name_including_namespace>" />  
        <param name="onload" value="true" />  
    </feature>  

Plugins should use the initialize method for their start-up logic.

    @override  
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {  
        super.initialize(cordova, webView);
        // your init code here
    }

### Android Integration

Android features an Intent system that allows processes to communicate with each other. Plugins have access to a CordovaInterface object, which can access the Android Activity that runs the application. This is the Context required to launch a new Android Intent. The CordovaInterface allows plugins to start an Activity for a result, and to set the callback plugin for when the Intent returns to the application.

As of Cordova 2.0, Plugins can no longer directly access the Context, and the legacy ctx member is deprecated. All ctx methods exist on the Context, so both getContext() and getActivity() can return the required object.

### Upgrading Android

- [PhoneGap API Documentation](http://docs.phonegap.com/en/edge/guide_platforms_android_upgrade.md.html#Upgrading%20Android)

## Reference

- [Plugin Development Guide](http://docs.phonegap.com/en/edge/guide_hybrid_plugins_index.md.html)
- [PhoneGap 12 插件开发指南](http://blog.csdn.net/jacob_wang520/article/details/18349625)