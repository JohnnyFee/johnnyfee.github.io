layout: post
title: "Android Cordova Config.xml"
description: ""
category: Cordova
tags: [android, cordova, config]
---

## config.xml

参考：

- [PhoneGap API Documentation](http://docs.phonegap.com/en/edge/config_ref_index.md.html#The%20config.xml%20File)
- [PhoneGap 10 全局配置文件config.xml - jacob的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/jacob_wang520/article/details/18321239)

该文件位于 `app/config.xml`，当调用 `build` 时，该文件将会被拷贝到不同的地方：

    app/platforms/ios/AppName/config.xml
    app/platforms/blackberry10/www/config.xml
    app/platforms/android/res/xml/config.xml

<!-- more -->

使用 CLI 生成的 `config.xml` 默认内容为：

```xml
<widget id="com.example.hello" version="0.0.1">
    <name>HelloWorld</name>
    <description>
        A sample Apache Cordova application that responds to the deviceready event.
    </description>
    <author email="dev@callback.apache.org" href="http://phonegap.com">
        Apache Cordova Team
    </author>
    <content src="index.html" />
    <access origin="*" />
    <preference name="disable-cursor" value="false" />
</widget>
```

- `widget.id` 为应用的标识，`widget.version`  为应用版本，命名格式为 `major/minor/patch`。
- `name` 应用名称。
- `description` 和 `author` 分别为应用描述和作者。
- `content` 为应用的启用页，默认为 `index.html`，相对 `www/`下的文件路径。
- `access` 可以访问的网络的白名单，参考 [Whitelist Guide](http://docs.phonegap.com/en/edge/guide_appdev_whitelist_index.md.html#Whitelist%20Guide)。
- `preference` 为对应到平台的特性，如 `全屏` 等。


### 全局偏好设置

所有平台都支持的特性：

- Fullscreen 全屏，默认为false。

        <preference name="Fullscreen" value="true" />

- Orientation 横屏、竖屏设置，可选值为 `default`, `landscape`, or `portrait`。默认为 default。
    
        <preference name="Orientation" value="landscape" />

### 多平台偏好设置

- DisallowOverscroll(boolean,false)：在用户滚动过程中，当你不想要显示任何反馈，可以将该值设置为true。适用于 Android 和 IOS。

        <preference name="DisallowOverscroll" value="true"/> 

- BackgroundColor：设置背景颜色，支持32位色彩，首字节代表 alpha 通道，其他代表 RGB 通道。

    可用于 Android 和 BlackBerry，通过重写CSS可以用于所有平台，如：body{background-color:blue;}

        <preference name="BackgroundColor" value="0xff0000ff"/>

- HideKeyboardFormAccessoryBar（boolean，false）：在下面键盘出现是，需要隐藏工具栏，从而帮助用户从一个 form 转到另一个 form 的时候，可以将该值设置为 true。应用于 IOS 和 BlackBerry

        <preference name="HideKeyboardFormAccessoryBar" value="true"/>  

### 特征元素

如果你使用 CLI 去编译项目，你可以使用 plugin 命令启用设备 API，它不会修改顶级的 config.xml 文件，所以 `<feature>` 不会应用到工作流中。如果你直接工作在一个 SDK 下，并且使用特定平台的 `config.xml`，你可以使用 `<feature>` 来启用设备级别的 API 和外部插件。以下为 Android 项目指定设备 API

```xml
<feature name="Device">
    <param name="android-package" value="org.apache.cordova.device.Device" />
</feature>
```

他们通常以自定义值出现在平台特定的config.xml文件中。比如，这儿有一个为android项目指明设备API的例子：

```xml
<feature name="Device">  
    <param name="android-package" value="org.apache.cordova.device.Device" />  
</feature> 
```

这个元素如何出现在 iOS 项目中：

```xml
<feature name="Device">  
    <param name="ios-package" value="CDVDevice" />  
</feature>  
```

### 平台元素

使用 CLI 编译应用时，有时需要制定需要制定偏好这只或者其他特殊平台的元素规格。使用 `<platform>` 来指定只出现在一个指定平台的 `config.xml` 文件中的特殊配置。比如，以下是如何指定只有 Android 使用 Fullscreen 偏好：

```xml
<platform name="android">
    <preference name="Fullscreen" value="true" />
</platform>
```

## Customize Icons

See [Customize app icons - Apache Cordova](https://cordova.apache.org/docs/en/latest/config_ref/images.html)

When working in the CLI you can define application icon(s) via the `<icon>` element (`config.xml`).
If you do not specify an icon, the Apache Cordova logo is used.

```language-xml
<icon src="res/ios/icon.png" platform="ios" width="57" height="57" density="mdpi" />
```

The following configuration can be used to define a single default icon
which will be used for all platforms.

```language-xml
<icon src="res/icon.png" />
```

For each platform, you can also define a pixel-perfect icon set to fit
different screen resolutions.

__Android:__

```xml
<platform name="android">
        <!--
            ldpi    : 36x36 px
            mdpi    : 48x48 px
            hdpi    : 72x72 px
            xhdpi   : 96x96 px
            xxhdpi  : 144x144 px
            xxxhdpi : 192x192 px
        -->
        <icon src="res/android/ldpi.png" density="ldpi" />
        <icon src="res/android/mdpi.png" density="mdpi" />
        <icon src="res/android/hdpi.png" density="hdpi" />
        <icon src="res/android/xhdpi.png" density="xhdpi" />
        <icon src="res/android/xxhdpi.png" density="xxhdpi" />
        <icon src="res/android/xxxhdpi.png" density="xxxhdpi" />
    </platform>
```

### See Also[__](https://cordova.apache.org/docs/en/latest/config_ref/images.html#see-also)

* [Android icon guide](https://www.google.com/design/spec/style/icons.html)
* [Android - Supporting multiple screens](http://developer.android.com/guide/practices/screens_support.html)

## Icons and Splash Screens

为所有平台或者为特殊平台指定图标和启动画面，参考 [PhoneGap API Documentation](http://docs.phonegap.com/en/edge/config_ref_images.md.html)。