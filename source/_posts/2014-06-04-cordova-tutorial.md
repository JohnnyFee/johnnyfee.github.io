---
layout: post
title: "Cordova Tutorial"
category: Cordova
tags: [phonegap, cordova]
--- 

## 概述

Cordova开发的相关源码可以从官网下载 http://cordova.apache.org/，内容为一个压缩包，包括cordova的各个模块。

![Cordova源码](http://johnnyimages.qiniudn.com/cordova-zip.png)

### PhoneGap & Cordova

- PhoneGap是Apache Cordova的一个分支。你可以这样想，Apache Cordova是一台发动机，运行在PhoneGap上，就像WebKit这个浏览器引擎运行在Chrome浏览器和Safari浏览器上一样。
- PhoneGap是Adobe在Cordova的基础上加入了自家的各种服务而成的。例如，“PhoneGap构建服务”，可以让程序员将他的源代码上传到“云编译器”，生成应用程序每一个所支持平台的安装包。
- [Is there a difference between PhoneGap and Cordova commands? - Stack Overflow](http://stackoverflow.com/questions/18174511/is-there-a-difference-between-phonegap-and-cordova-commands)
- [PhoneGap](http://phonegap.com/2012/03/19/phonegap-cordova-and-what%E2%80%99s-in-a-name/)

<!--more-->

### PhoneGap 3.0 的变化

将cordova原先的官方核心插件剥离出来与自定义插件处于同一层次。新插件架构所带来的好处是可以让应用更小更快，只需要加载所需要的API。

![phonegap2.x&3.x.png](http://johnnyimages.qiniudn.com/phonegap2.x&3.x.png)

### Development Paths

- Cross-platform workflow  Use this workflow if you want your app to run on as many different mobile operating systems as possible, with little need for platform-specific development. 一般采用这种方式开发。
- Platform-centered workflow Use this workflow if you want to focus on building an app for a single platform and need to be able to modify it at a lower level. 平台相关的工具包在[这里](https://www.apache.org/dist/cordova/)下载。

## Setup

1. 下载和安装 [Node.js](http://nodejs.org/)
2. 下载安装 [git client](http://git-scm.com/)
3. 安装 cordova

        $ sudo npm install -g cordova

## Quick Start

### Create the App

    $ cordova create hello com.example.hello HelloWorld

其中：
- hello 目录名称
- com.example.hello 保存在 `config.xml` 中，应用的唯一标识。
- HelloWorld 应用名称，保存在 `config.xml` 中。

生成的目录结构如下：

    |   config.xml: contains important metadata needed to generate and distribute the application.
    |
    +---hooks
    +---merges
    +---platforms 平台，无默认平台。
    +---plugins 插件。
    \---www   
        |   index.html
        |
        +---css
        |       index.css
        |
        +---img
        |       logo.png
        |
        \---js
                index.js

生成的工程是一个包含不然任何插件的目录，也不属于任何平台。

### Add Platforms

    $ cd hello

在 Windows 上，可以添加以下平台：

    $ cordova platform add wp7
    $ cordova platform add wp8
    $ cordova platform add windows8
    $ cordova platform add amazon-fireos
    $ cordova platform add android
    $ cordova platform add blackberry10
    $ cordova platform add firefoxos

检查允许安装的平台和已经安装的平台：

    $ cordova platforms ls

删除平台：

      $ cordova platform rm android

添加或删除平台会影响 `platforms/` 下的内容。添加平台或者 `build` 时，`www/` 的内容将拷贝到所有平台下，如 `platforms/ios/www` 和 `platforms/android/assets/www`。开发时，只能修改与 `platforms/` 平行的 `www` 目录。

### Build the App

    // 编译 platforms 下的所有平台
    $ cordova build

    // 编译指定平台
    $ cordova build ios
    // 这条命令也等价于以下两个命令
    $ cordova prepare ios
    $ cordova compile ios

### Run

    // 在模拟器上运行
    $ cordova emulate android

    // 在设备上运行，如果设备不存在，会选择模拟器运行。
    $ cordova run android

### Add Plugin Features

插件官网：[plugins.cordova.io](http://plugins.cordova.io/)

- 搜索插件：

        $ cordova plugin search bar code
        -> com.phonegap.plugins.barcodescanner - Scans Barcodes

- 添加插件：

        $ cordova plugin add 插件名

    同时添加多个插件：

        $ cordova plugin add org.apache.cordova.console org.apache.cordova.device

    为插件指定版本：

        $ cordova plugin add org.apache.cordova.console@latest
        $ cordova plugin add org.apache.cordova.console@0.2.1

    插件的默认下载地址为 `registry.phonegap.com`，我们可以指定插件的下载地址：

        $ cordova plugin add https://github.com/apache/cordova-plugin-console.git
    
    默认从指定地址的 `master` 分支下载插件，我们可以指定 `git-ref` 如分支或者 `tag`：

        $ cordova plugin add https://github.com/apache/cordova-plugin-console.git#r0.2.0

    如果插件存在 git repo 的子目录中，我们可以通过 `:` 来指定：

        $ cordova plugin add https://github.com/someone/aplugin.git#:/my/sub/dir

    同时指定 `git-ref`：

        $ cordova plugin add https://github.com/someone/aplugin.git#r0.0.1:/my/sub/dir

    添加本地路径的插件，该插件目录中需要包含 `plugin.xml` 文件：

        $ cordova plugin add ../my_plugin_dir

- 查看插件：

        $ cordova plugin ls    # or 'plugin list'
        -> [ 'org.apache.cordova.console' ]

- 移除插件：
    
        $ cordova plugin rm org.apache.cordova.console
        $ cordova plugin remove org.apache.cordova.console    # same

__常用插件：__

- Basic device information (Device API)
    
        $ cordova plugin add org.apache.cordova.device

- Network Connection and Battery [Events](http://docs.phonegap.com/en/edge/cordova_events_events.md.html#Events):

        $ cordova plugin add org.apache.cordova.network-information  
        $ cordova plugin add org.apache.cordova.battery-status  

- Accelerometer, Compass, and Geolocation:

        $ cordova plugin add org.apache.cordova.device-motion  
        $ cordova plugin add org.apache.cordova.device-orientation  
        $ cordova plugin add org.apache.cordova.geolocation  

- Camera, Media playback and Capture:

        $ cordova plugin add org.apache.cordova.camera  
        $ cordova plugin add org.apache.cordova.media-capture  
        $ cordova plugin add org.apache.cordova.media  

- Access files on device or network (File API):

        $ cordova plugin add org.apache.cordova.file  
        $ cordova plugin add org.apache.cordova.file-transfer  

- Notification via dialog box or vibration:

        $ cordova plugin add org.apache.cordova.dialogs  
        $ cordova plugin add org.apache.cordova.vibration  

- Contacts:

        $ cordova plugin add org.apache.cordova.contacts  

- Globalization:

        $ cordova plugin add org.apache.cordova.globalization  

- Splashscreen:

        $ cordova plugin add org.apache.cordova.splashscreen  

- Open new browser windows (InAppBrowser):

        $ cordova plugin add org.apache.cordova.inappbrowser  

- Debug console:

        $ cordova plugin add org.apache.cordova.console

参考：[Which Core PhoneGap/Cordova Plugins Do I Need?](http://developer.telerik.com/featured/which-core-phonegapcordova-plugins-do-i-need/)

### Using merges to Customize Each Platform

工程目录下的 `merges/` 用于为平台指定特殊文件，`build` 时，`merges/` 中的文件将覆盖 `www/` 下对应目录结构的文件。

如：

www/index.html：

    <link rel="stylesheet" type="text/css" href="css/overrides.css" />

www/css/overrides.css：
    
    body { font-size:12px; }

merges/android/css/overrides.css
    
    body { font-size:14px; }

`build` 后， Android 平台的页面 字体大小为 14px。

### Help

    cordova help
    cordova #same

    cordova info

### Updating Cordova and Your Project

参考：[PhoneGap API Documentation](http://docs.phonegap.com/en/edge/plugin_ref_plugman.md.html)

升级到 cordova：
    
    // 升级到最新版
    $ sudo npm update -g cordova
    // 升级到指定版本
    $ sudo npm install -g cordova@3.1.0-0.2.0

升级工程：
    
    $ cordova platform update android
    $ cordova platform update ios

## Plugman

如果你使用的是以平台为中心(Platform-centered)的方法开发插件，你需要使用更底层的 [Plugman](https://github.com/apache/cordova-plugman/) 来管理插件。

### 安装

    $ npm install -g plugman

### 添加插件

    $ plugman --platform <ios|amazon-fireos|android|blackberry10|wp7|wp8> 
    --project <directory> 
    --plugin <name|url|path> [--plugins_dir <directory>] 
    [--www <directory>] [--variable <name>=<value> [--variable <name>=<value> ...]]

- `--platform` 指定平台。
- `--project` cordova 项目的平台位置。
- `--plugin` 指定插件。允许的值有以下几种：
    + name: 插件所在的目录名。该目录必须是 `--plugins_dir` 目录下存在的目录或者是 Cordova registry 中的插件。
    + url: 以 `https://` or `git://` 开头 git repo 地址，该库中必须包含 `plugin.xml` 文件。git 库中的内容将拷贝到 `--plugins_dir` 下。
    + path: 包含 `plugin.xml` 文件的插件路径。内容也会被拷贝到 `--plugins_dir` 下。
- `--plugins_dir` defaults to `<project>/cordova/plugins`。 插件路径。
- `--www` defaults to the `<project>/www`。 `www` 路径。
- `--variable` 安装插件时需要指定的变量。

如：

       $ plugman install --platform ios --project /path/to/my/project --plugin /path/to/my/plugin

### 移除插件

    $ plugman --uninstall --platform <ios|amazon-fireos|android|blackberry10|wp7|wp8> 
    --project <directory> --plugin <id> [--www <directory>] [--plugins_dir <directory>]

### Registry Actions

    // 查找
    plugman search <plugin keywords>

    // 获取和设置插件镜像
    plugman config set registry <url-to-registry>
    plugman config get registry

    // 获取插件信息
    plugman info <id>

## config.xml

参考：

- [PhoneGap API Documentation](http://docs.phonegap.com/en/edge/config_ref_index.md.html#The%20config.xml%20File)
- [PhoneGap 10 全局配置文件config.xml - jacob的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/jacob_wang520/article/details/18321239)

该文件位于 `app/config.xml`，当调用 `build` 时，该文件将会被拷贝到不同的地方：

    app/platforms/ios/AppName/config.xml
    app/platforms/blackberry10/www/config.xml
    app/platforms/android/res/xml/config.xml

使用 CLI 生成的 `config.xml` 默认内容为：

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
    </widget>

- `widget.id` 为应用的标识，`widget.version`  为用用版本，命名格式为 `major/minor/patch`。
- `name` 应用名称。
- `description` 和 `author` 分别为应用描述和作者。
- `content` 为应用的启用页，默认为 `index.html`，相对 `www/`下的文件路径。
- `access` 可以访问的网络的白名单，参考 [Whitelist Guide](http://docs.phonegap.com/en/edge/guide_appdev_whitelist_index.md.html#Whitelist%20Guide)。
- `preference` 为对应到平台的特性，如 `全屏` 等。


### Global Preferences

所有平台都支持的特性：

- Fullscreen 全屏，默认为false。

    <preference name="Fullscreen" value="true" />

- Orientation 横屏、竖屏设置，可选值为 `default`, `landscape`, or `portrait`。默认为 default。
    
    <preference name="Orientation" value="landscape" />

### Multi-Platform Preferences

- DisallowOverscroll(boolean,false)：在用户滚动过程中，当你不想要显示任何反馈，可以将该值设置为true。适用于Android和IOS。

    <preference name="DisallowOverscroll" value="true"/> 

- BackgroundColor：设置背景颜色，支持32位色彩，首字节代表alpha通道，其他代表RGB通道。

    可用于Android和BlackBerry，通过重写CSS可以用于所有平台，如：body{background-color:blue;}

        <preference name="BackgroundColor" value="0xff0000ff"/>

- HideKeyboardFormAccessoryBar（boolean，false）：在下面键盘出现是，需要隐藏工具栏，从而帮助用户从一个form转到另一个form的时候，可以将该值设置为true。应用于IOS和BlackBerry

    <preference name="HideKeyboardFormAccessoryBar" value="true"/>  

### The feature Element

TODO

### The platform Element

TODO

## Icons and Splash Screens

为所有平台或者为特殊平台指定图标和启动画面，参考 [PhoneGap API Documentation](http://docs.phonegap.com/en/edge/config_ref_images.md.html)。

## Debug

- [Bringing F5 (or Command+R) to Hybrid Mobile Apps](http://developer.telerik.com/featured/bringing-f5-or-commandr-to-hybrid-mobile-apps/)

## Storage

[PhoneGap API Documentation](http://docs.phonegap.com/en/edge/cordova_storage_storage.md.html#Storage)

## Tutorial

- [Create Your First Mobile App with PhoneGap Build – Using PhoneGap Build](http://flippinawesome.org/2013/03/29/phonegap-build-part2/)
- [Create Your First Mobile App with PhoneGap Build – Setup](http://flippinawesome.org/2013/03/29/phonegap-build-part1/)
- [Create Your First Mobile App with PhoneGap Build – Connecting to an API](http://flippinawesome.org/2013/03/29/create-your-first-mobile-app-part3/)
- [Create Your First Mobile App with PhoneGap Build – Adding jQuery Mobile](http://flippinawesome.org/2013/04/08/phonegap-build-part4/)
- [phonegap - jacob的专栏](http://blog.csdn.net/wangpengch/article/category/1849949)

## 相关资料

### apache/cordova项目github库

- [apache/cordova-android](https://github.com/apache/cordova-android) Mirror of Apache Cordova Android.Cordova Android is an Android application library that allows for Cordova-based projects to be built for the Android Platform. 
- [apache/cordova-cli](https://github.com/apache/cordova-cli) Mirror of Apache Cordova CLI. The command line tool to build, deploy and manage Cordova-based applications.
- [apache/cordova-js](https://github.com/apache/cordova-js) Mirror of Apache Cordova js. A unified JavaScript layer for Apache Cordova projects.
- [apache/cordova-app-harness](https://github.com/apache/cordova-app-harness)
- [cordova-app-hello-world](http://github.com/apache/cordova-app-hello-world)

其他平台的lib和相关插件，请参考 <http://git.apache.org/>。

<!--more-->

### 其他

- [phonegap/phonegap-start](https://github.com/phonegap/phonegap-start) A starting-point for PhoneGap apps

## FAQ

- [解决jquery mobile+phonegap页面切换闪屏问题](http://www.feeldesignstudio.com/2013/10/jquery-mobile-phonegap-flicker-when-navigating-between-page)

## 参考
- [PhoneGap源码分析](http://www.cnblogs.com/linjisong/tag/PhoneGap/)