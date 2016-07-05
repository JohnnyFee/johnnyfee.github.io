layout: post
title: "Cordova Tutorial"
category: Cordova
tags: [phonegap, cordova]
---

## Cordova

### Setup

To install the `cordova` command-line tool, follow these steps:

1.  Download and install [Node.js](https://nodejs.org/en/download/). On
    installation you should be able to invoke `node` and `npm` on your
    command line.

2.  (Optional) Download and install a [git client](http://git-scm.com/downloads), if you don't
    already have one. Following installation, you should be able to invoke `git`
    on your command line. The CLI uses it to download assets when they are referenced using a url to a git repo.

3.  Install the `cordova` module using `npm` utility of Node.js. The `cordova`
    module will automatically be downloaded by the `npm` utility.

    - on OS X and Linux:

        ```
        $ sudo npm install -g cordova
        ```

        On OS X and Linux, prefixing the `npm` command with
        `sudo` may be necessary to install this development utility in
        otherwise restricted directories such as
        `/usr/local/share`. If you are using the optional
        nvm/nave tool or have write access to the install directory,
        you may be able to omit the `sudo` prefix. There are
        [more tips](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears)
        available on using `npm` without `sudo`, if you desire to do that.

    - on Windows:

        ```
        C:\>npm install -g cordova
        ```

### pre-requisites

[Install pre-requisites for building](https://cordova.apache.org/docs/en/latest/guide/cli/#install-pre-requisites-for-building)

To build and run apps, you need to install SDKs for each platform you wish to target. Alternatively, if you are using browser for development you can use `browser` platform which does not require any platform SDKs.

To check if you satisfy requirements for building the platform:

```
$ cordova requirements
```

See Also 

* [Android platform requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#requirements-and-support)
* [iOS platform requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#requirements-and-support)
* [Windows platform requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/win8/index.html#requirements-and-support)

### PhoneGap & Cordova

- PhoneGap是Apache Cordova的一个分支。你可以这样想，Apache Cordova是一台发动机，运行在PhoneGap上，就像WebKit这个浏览器引擎运行在Chrome浏览器和Safari浏览器上一样。
- PhoneGap是Adobe在Cordova的基础上加入了自家的各种服务而成的。例如，“PhoneGap构建服务”，可以让程序员将他的源代码上传到“云编译器”，生成应用程序每一个所支持平台的安装包。


See [Is there a difference between PhoneGap and Cordova commands? - Stack Overflow](http://stackoverflow.com/questions/18174511/is-there-a-difference-between-phonegap-and-cordova-commands)

<!-- more -->

### 开发路线

- __跨平台工作流：__  如果你想让你的应用可以跑在尽可能多的移动平台，可以使用这种开发路线。
- __以平台为中心的工作流：__ 如果你想专注于单个平台，并且向在更底层修改应用，那么你应该使用以平为中心的工作流。平台平台相关的工具包在[这里](https://www.apache.org/dist/cordova/)下载。


## Quick Start

### 创建应用

    $ cordova create hello com.example.hello HelloWorld

其中：

- `hello` 目录名称
- `com.example.hello` 保存在 `config.xml` 中，应用的唯一标识。
- `HelloWorld` 应用名称，保存在 `config.xml` 中。

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

### 添加平台

    $ cd hello

在 Windows 上，可以添加以下平台：

    $ cordova platform add wp7 --save
    $ cordova platform add wp8 --save
    $ cordova platform add windows8 --save
    $ cordova platform add amazon-fireos --save
    $ cordova platform add android --save
    $ cordova platform add blackberry10 --save
    $ cordova platform add firefoxos --save

Running commands to add or remove platforms affects the contents of
the project's _platforms_ directory, where each specified platform
appears as a subdirectory.

> Note: When using the CLI to build your application, you should
> _not_ edit any files in the `/platforms/` directory. The files
> in this directory are routinely overwritten when preparing
> applications for building, or when plugins are re-installed.

检查允许安装的平台和已经安装的平台：

    $ cordova platforms ls

删除平台：

      $ cordova platform rm android

添加或删除平台会影响 `platforms/` 下的内容。添加平台或者 `build` 时，`www/` 的内容将拷贝到所有平台下，如 `platforms/ios/www` 和 `platforms/android/assets/www`。开发时，只能修改与 `platforms/` 平行的 `www` 目录。

#### Saving platforms

See [Platforms and Plugins Version Management - Apache Cordova](https://cordova.apache.org/docs/en/latest/platform_plugin_versioning_ref/index.html)

To save a platform, you issue the following command :

```language-bash
$ cordova platform add <platform[@<version>] | directory | git_url> --save
```

After running the above command, the resulting config.xml looks like :

```language-xml
<?xml version='1.0' encoding='utf-8'?>
    ...
    <engine name="android" spec="~4.0.0" />
    ...
</xml>
```

Some examples :

* **'cordova platform add android --save'** => retrieves the pinned version of the android platform, adds it to the project and then updates config.xml.
* **'cordova platform add android@3.7.0 --save'** => retrieves the android platform, version 3.7.0 from npm, adds it to the project and then updates config.xml.
* **'cordova platform add android@https://github.com/apache/cordova-android.git​ --save'** => clones the specified cordova-android git repository, adds the android platform to the project, then updates config.xml and point its version to the specified git-url.
* **'cordova platform add C:/path/to/android/platform --save'** => retrieves the android platform from the specified directory, adds it to the project, then updates config.xml and point to the directory.

#### Mass saving platforms on an existing project

The '--save' flag described above is only useful when you remember to use it during the platform addition.
If you have a pre-existing project and you want to save all the currently added platforms in your project, you can use :

```language-bash
$ cordova platform save
```

#### Updating / Removing platforms

It is also possible to update/delete from config.xml during the commands 'cordova platform update' and 'cordova platform remove' :

```language-bash
$ cordova platform update <platform[@<version>] | directory | git_url> --save
$ cordova platform remove <platform> --save
```

Some examples :

* **'cordova platform update android --save'** => In addition to updating the android platform to the pinned version, update config.xml entry
* **'cordova platform update android@3.8.0 --save'** => In addition to updating the android platform to version 3.8.0, update config.xml entry
* **'cordova platform update /path/to/android/platform --save'** => In addition to updating the android platform to version in the folder, update config.xml entry
* **'cordova platform remove android --save'** => Removes the android platform from the project and deletes its entry from config.xml.

#### Restoring platforms

Platforms are automatically restored from config.xml when the **'cordova prepare'** command is run.

If you add a platform without specifying a version/folder/git_url, the version to install is taken from config.xml, **if found**.

Example:

Suppose your config.xml file contains the following entry:

```language-xml
<?xml version='1.0' encoding='utf-8'?>
    ...
    <engine name="android" spec="3.7.0" />
    ...
</xml>
```

If you run the command **'cordova platform add android'** (no version/folder/git_url specified), the platform 'android@3.7.0' (as retrieved from config.xml) will be installed.

### 构建

    // 编译 platforms 下的所有平台
    $ cordova build

    // 编译指定平台
    $ cordova build ios
    // 这条命令也等价于以下两个命令
    $ cordova prepare ios
    $ cordova compile ios

See more [Cordova build command reference documentation](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#cordova-build-command)

### 运行

    // 在模拟器上运行
    $ cordova emulate android

    // 在设备上运行，如果设备不存在，会选择模拟器运行。
    $ cordova run android

    // 查看可用的设备
    $ cordova run --list

See also:

* [Setting up Android emulator](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#setting-up-an-emulator)
* [Cordova run command reference documentation](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#cordova-run-command)
* [Cordova emulate command reference documentation](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#cordova-emulate-command)

### Using merges to Customize Each Platform

工程目录下的 `merges/` 用于为平台指定特殊文件，`build` 时，`merges/` 中的文件将覆盖 `www/` 下对应目录结构的文件。

如：

`www/index.html`：

    <link rel="stylesheet" type="text/css" href="css/overrides.css" />

`www/css/overrides.css`：
    
    body { font-size:12px; }

`merges/android/css/overrides.css`
    
    body { font-size:14px; }

`build` 后， Android 平台的页面 字体大小为 14px。

### 帮助

    cordova or cordova help
    cordova info

### 升级 Cordova 和工程

参考：[PhoneGap API Documentation](http://docs.phonegap.com/en/edge/plugin_ref_plugman.md.html)

升级 cordova：
    
    // 升级到最新版
    $ sudo npm update -g cordova
    // 升级到指定版本
    $ sudo npm install -g cordova@3.1.0-0.2.0

升级工程：
    
    $ cordova platform update android --save
    $ cordova platform update ios --save

## 插件

A _plugin_ exposes a Javascript API for native SDK functionality. Plugins are typically hosted on npm and you can search for them on the [plugin search page](https://cordova.apache.org/plugins/). 

Some key APIs are provided by the Apache Cordova open source project and these are referred to as [Core Plugin APIs](https://cordova.apache.org/docs/en/latest/guide/support/index.html#core-plugin-apis). You can also use the CLI to launch the search page.

See more

* [Cordova plugin command reference documentation](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#cordova-plugin-command)
* [Cordova plugin search page](https://cordova.apache.org/plugins/)
* [Core Plugin APIs](https://cordova.apache.org/docs/en/latest/guide/support/index.html#core-plugin-apis)

### 搜索插件

    $ cordova plugin search camera

### 添加插件

To add the camera plugin, we will specify the npm package name for the camera plugin:

    $ cordova plugin add 插件名

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

### 查看插件

Use `plugin ls` (or `plugin list`, or `plugin` by itself) to view
currently installed plugins. Each displays by its identifier:

    $ cordova plugin ls    # or 'plugin list'

### 移除插件

    $ cordova plugin rm org.apache.cordova.console
    $ cordova plugin remove org.apache.cordova.console    # same

### Saving plugins

See [Platforms and Plugins Version Management - Apache Cordova](https://cordova.apache.org/docs/en/latest/platform_plugin_versioning_ref/index.html)

To save a plugin, you issue the following command :

```language-bash
$ cordova plugin add <plugin[@<version>] | directory | git_url> --save
```

After running the above command, the resulting config.xml looks like :

```language-xml
<?xml version='1.0' encoding='utf-8'?>
    ...
    <plugin name="cordova-plugin-console" spec="~1.0.0" />
    ...
</xml>
```

Some examples :

* **'cordova plugin add cordova-plugin-console --save'** => retrieves the pinned version of the console plugin, adds it to the project and then updates config.xml.
* **'cordova plugin add cordova-plugin-console@0.2.13 --save'** => retrieves the android plugin, version 0.2.13 from npm, adds it to the project and then updates config.xml.
* **'cordova plugin add https://github.com/apache/cordova-plugin-console.git --save'** => clones the specified console plugin git repository, adds the console plugin to the project, then updates config.xml and point its version to the specified git-url.
* **'cordova plugin add C:/path/to/console/plugin --save'** => retrieves the console plugin from the specified directory, adds it to the project, then updates config.xml and point to the directory.

### Mass saving plugins on an existing project

The '--save' flag described above is only useful when you remember to use it during the plugin addition.
If you have a pre-existing project and you want to save all currently added plugins in the project, you can use :

```language-bash
$ cordova plugin save
```

### Updating / Removing plugins

It is also possible to update/delete from config.xml during the commands 'cordova plugin update' and 'cordova plugin remove' :

```language-bash
$ cordova plugin update <plugin[@<version>] | directory | git_url> --save
$ cordova plugin remove <plugin> --save
```

Some examples :

* **'cordova plugin update cordova-plugin-console --save'** => In addition to updating the console plugin to the pinned version, update config.xml entry
* **'cordova plugin update cordova-plugin-console@0.2.13 --save'** => In addition to updating the android plugin to version 3.8.0, update config.xml entry
* **'cordova plugin update /path/to/console/plugin --save'** => In addition to updating the console plugin to version in the folder, update config.xml entry
* **'cordova plugin remove cordova-plugin-console --save'** => Removes the console plugin from the project and deletes its entry from config.xml.

### Restoring plugins

Plugins are automatically restored from config.xml when the **'cordova prepare'** command is run.

If you add a plugin without specifying a version/folder/git_url, the version to be installed is taken from config.xml, **if found**.

Example:

Suppose your config.xml file contains the following entry:

```language-xml
<?xml version='1.0' encoding='utf-8'?>
    ...
    <plugin name="cordova-plugin-console" spec="0.2.11" />
    ...
</ xml>
```

If you run the command **'cordova plugin add cordova-plugin-console'** (no version/folder/git_url specified), the plugin 'cordova-plugin-console@0.2.11' (as retrieved from config.xml) will be installed.

### 自定义插件

- [PhoneGap API Documentation](http://docs.phonegap.com/en/edge/guide_hybrid_plugins_index.md.html#Plugin%20Development%20Guide)
- [Cordova Android Plugin](http://inching.org/2014/06/05/cordova-android-plugin/)


## Debug

- [Bringing F5 (or Command+R) to Hybrid Mobile Apps](http://developer.telerik.com/featured/bringing-f5-or-commandr-to-hybrid-mobile-apps/)

## Storage

[PhoneGap API Documentation](http://docs.phonegap.com/en/edge/cordova_storage_storage.md.html#Storage)

## 相关资料

### apache/cordova项目github库

- [apache/cordova-android](https://github.com/apache/cordova-android) Mirror of Apache Cordova Android.Cordova Android is an Android application library that allows for Cordova-based projects to be built for the Android Platform. 
- [apache/cordova-cli](https://github.com/apache/cordova-cli) Mirror of Apache Cordova CLI. The command line tool to build, deploy and manage Cordova-based applications.
- [apache/cordova-js](https://github.com/apache/cordova-js) Mirror of Apache Cordova js. A unified JavaScript layer for Apache Cordova projects.
- [apache/cordova-app-harness](https://github.com/apache/cordova-app-harness)
- [cordova-app-hello-world](http://github.com/apache/cordova-app-hello-world)

其他平台的lib和相关插件，请参考 <http://git.apache.org/>。

### 其他

- [phonegap/phonegap-start](https://github.com/phonegap/phonegap-start) A starting-point for PhoneGap apps

## FAQ

- [解决jquery mobile+phonegap页面切换闪屏问题](http://www.feeldesignstudio.com/2013/10/jquery-mobile-phonegap-flicker-when-navigating-between-page)
- [Cordova Sample: Check for a file and download if it isn't there](http://www.raymondcamden.com/index.cfm/2014/7/1/Cordova-Sample-Check-for-a-file-and-download-if-it-isnt-there)

### How to add Library Resource to Cordova Project?

See [android - How to add Library Resource to Cordova Project? - Stack Overflow](http://stackoverflow.com/questions/26121635/how-to-add-library-resource-to-cordova-project)

### Cordova + Angularjs + Device Ready

See [Cordova + Angularjs + Device Ready - Stack Overflow](http://stackoverflow.com/questions/21556090/cordova-angularjs-device-ready)

### PhoneGap: Detect if running on desktop browser

I use this code: 

```
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady(); //this is the browser
}
```

UPDATE

There are many other ways to detect if phonegap is running on a browser or not, here is another great option: 

```
var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
if ( app ) {
    // PhoneGap application
} else {
    // Web page
}
```

as seen here: [Detect between a mobile browser or a PhoneGap application](http://stackoverflow.com/questions/10347539/detect-between-a-mobile-browser-or-a-phonegap-application/12255930#12255930)

See [javascript - Detect between a mobile browser or a PhoneGap application - Stack Overflow](http://stackoverflow.com/questions/10347539/detect-between-a-mobile-browser-or-a-phonegap-application/12255930#12255930)

### Phonegap HTML app and various alerts hang browser

If you're testing your app in your desktop browser, you can simply exclude the file.
For Chrome:

```
<script type="text/javascript">
    if (!navigator.userAgent.toLowerCase().match('chrome')) {
        document.write("<script src='phonegap.js'><\/script>");
    }
</script>
```

See [cordova - Phonegap HTML app and various alerts hang browser - Stack Overflow](http://stackoverflow.com/questions/16920596/phonegap-html-app-and-various-alerts-hang-browser)

## Performance

- Appgyver:http://www.appgyver.com/
- Steroids:http://www.appgyver.com/steroids
- Composer:http://www.appgyver.com/composer

## Library

- [jxp/phonegap-desktop](https://github.com/jxp/phonegap-desktop) Desktop shim library to implement PhoneGap API and return sample data.
- [phonegap/phonegap-start](https://github.com/phonegap/phonegap-start) PhoneGap Hello World app

## Tools

- [Crosswalk - build world class hybrid apps](https://crosswalk-project.org/)

## Tutorial

- [mwbrooks/phonegap-day-workshop-beginner Wiki](https://github.com/mwbrooks/phonegap-day-workshop-beginner/wiki)
- [busterc/awesome-cordova](https://github.com/busterc/awesome-cordova)
- [Apache Cordova Tutorial](http://ccoenraets.github.io/cordova-tutorial/create-cordova-project.html)
- [phonegap - jacob的专栏](http://blog.csdn.net/wangpengch/article/category/1849949)
- [2 Quick Tips When Adding PhoneGap/Cordova Plugins : Devgirl's Weblog](http://devgirl.org/2014/07/15/2-quick-tips-when-adding-phonegapcordova-plugins/)
- [Cordova Sample: Reading a text file](http://www.raymondcamden.com/2014/7/15/Cordova-Sample-Reading-a-text-file)
- [Cordova Plugins update, and new Contacts demo](http://www.raymondcamden.com/2014/7/9/Cordova-Plugin-update-and-new-Contacts-demo)
- [PhoneGap Archives - Modern Web](http://modernweb.com/category/mobile/phonegap/)
- [PhoneGap Development Mistakes and How to Avoid Them](http://chrisgriffith.wordpress.com/2014/10/10/phonegap-development-mistakes-and-how-to-avoid-them)
- [Creating a mobile app from a simple HTML site ✩ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2014/10/creating-a-mobile-app-from-a-simple-html-site)
- [Web Speech API and Phonegap - A Smart Mouth App](http://thejackalofjavascript.com/phonegap-smart-mouth-app)

## Desktop

- [PhoneGap Desktop App 0.1.2](http://phonegap.com/blog/2015/03/02/phonegap-app-desktop-0-1-2/)

## 参考

- [PhoneGap源码分析](http://www.cnblogs.com/linjisong/tag/PhoneGap/)