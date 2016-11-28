layout: post
title: "Android Studio"
description: ""
category: Android
tags: [android]
---

## 探索 Android Studio

See [探索 Android Studio](https://developer.android.com/studio/intro/index.html)

Android Studio 是基于 [IntelliJ IDEA](https://www.jetbrains.com/idea/) 的官方 Android 应用开发集成开发环境 (IDE)。除了 IntelliJ 强大的代码编辑器和开发者工具，Android Studio 提供了更多可提高 Android 应用构建效率的功能，例如：

* 基于 Gradle 的灵活构建系统
* 快速且功能丰富的模拟器  
* 可针对所有 Android 设备进行开发的统一的环境
* Instant Run，可将变更推送到运行中的应用，无需构建新的 APK
* 可帮助您构建常用应用功能和导入示例代码的代码模板和 GitHub 集成
* 丰富的测试工具和框架
* 可捕捉性能、可用性、版本兼容性以及其他问题的 Lint 工具
* C++ 和 NDK 支持
* 内置对 [Google 云端平台](http://developers.google.com/cloud/devtools/android_studio_templates/)的支持，可轻松集成 Google Cloud Messaging 和 App 引擎

## 项目结构

<img style="float:right;width: 300px; margin: 10px" src="https://developer.android.com/studio/images/intro/project-android-view_2-1_2x.png" alt="Android 视图中的项目文件">

Android Studio 中的每个项目包含一个或多个含有源代码文件和资源文件的模块。
模块类型包括：

* Android 应用模块
* 库模块
* Google App 引擎模块

有构建文件在项目层次结构顶层 **Gradle Scripts** 下显示，且每个应用模块都包含以下文件夹：

* **manifests**：包含 `AndroidManifest.xml` 文件。
* **java**：包含 Java 源代码文件，包括 JUnit 测试代码。
* **res**：包含所有非代码资源，例如 XML 布局、UI 字符串和位图图像。

### Add a Module

[Add a Module for a New Device](https://developer.android.com/studio/projects/add-app-module.html#ModuleNextSteps)

## Coding Productivity

Live templates allow you to enter code snippets for fast insertion and
completion of small chunks of code. To insert a live template, type the
template abbreviation and press the **Tab** key. Android Studio inserts the
code snippet associated with the template into your code.

For example, the `newInstance` abbreviation followed by **Tab**
inserts the code for a new fragment instance with argument placeholders.
Or type `fbc` to insert the `findViewById()` method along
with cast and resource id syntax.

To see the list of supported live templates and customize them,
click **File > Settings > Editor > Live Templates**.

Learn more about
[Live Templates](https://medium.com/google-developers/writing-more-code-by-writing-less-code-with-android-studio-live-templates-244f648d17c7#.h1jn0hq31).

### Get quick fixes from Lint

Android Studio provides a code scanning tool called Lint to help you to
identify and correct problems with the structural quality of your code,
without executing the app or writing tests.

Every time you build your app, Android Studio runs Lint to check your source
files for potential bugs and looks for optimization improvements in correctness,
security, performance, usability, accessibility, and internationalization.

Learn more about [Lint](https://developer.android.com/studio/write/lint.html).

### See documentation and resource details

You can view documentation for an API by placing the caret on
the method/member/class name and pressing **F1**.

Information is also available for other resources, such as images and themes.
For example, if you place the caret on the theme name in your Android manifest
file and press **F1**, you can see the theme inheritance hierarchy and colors
or images for the various attributes.

### Quickly create new files

When you want to create a new file, click the desired directory in the
Project window, then press **Alt + Insert**  (**Command + N** on Mac).
Android Studio shows a small window with a list of suggested file types, as
appropriate for the selected directory.

Android Studio includes the following features and tools to help you
create and manage resource files.

### Create images for all screen densities

Android Studio includes a tool called Vector Asset Studio that helps you
create images that support each screen density. You can upload your own
SVG file for editing or select from one of the many Google-provided material
design icons. To get started, click **File > New > Vector Asset**.

Learn more about
[Vector Asset Studio](https://developer.android.com/studio/write/vector-asset-studio.html).

### Preview images and colors

When referencing images and icons in your code, a preview of the image
appears in the left margin to help you verify the image or icon reference.

To view the full size image, click the thumbnail in the left margin. Or, place
the caret on the inline reference to the asset and press **F1** to see the
image details, including all the alternative sizes.

### Create new layouts

Android Studio offers an advanced layout editor that allows you to drag-and-drop
widgets into your layout and preview your layout while editing the XML.

To get started, click the module where you want to add the layout, then
click **File > New > XML > Layout XML File**.

Learn more about the
[Layout Editor](https://developer.android.com/studio/write/layout-editor.html).

### Translate UI strings

The Translations Editor tool gives you a single view of all of your translated
resources, making it easy to change or add translations, and even find missing
translations without opening every version of the `strings.xml` file. You can
even upload your strings file to order translation services.

To get started, right-click on any copy of your `strings.xml` file then click
**Open Translations Editor**.

Learn more about the
[Translations Editor](https://developer.android.com/studio/write/translations-editor.html).

### Add Code from a Template

See [Add Code from a Template](https://developer.android.com/studio/projects/templates.html#SelectTemplate)

### Improve Code Inspection with Annotations

See [Improve Code Inspection with Annotations](https://developer.android.com/studio/write/annotations.html#value-constraint)

## Shortcuts

See [Keyboard Shortcuts](https://developer.android.com/studio/intro/keyboard-shortcuts.html)

## 性能

### 性能监视器

Android Studio 提供性能监视器，让您可以更加轻松地跟踪应用的内存和 CPU 使用情况、查找已解除内存分配的对象、查找内存泄漏以及优化图形性能和分析网络请求。在设备或模拟器上运行您的应用时，打开 **Android Monitor** 工具窗口，然后点击 **Monitors** 选项卡。

如需了解有关性能监视器的详细信息，请参阅 [Android Monitor](https://developer.android.com/tools/help/android-monitor.html)。

### 堆转储

在 Android Studio 中监控内存使用情况时，您可以同时启动垃圾回收并将 Java 堆转储为 Android 专有 HPROF 二进制格式的堆快照文件。HPROF 查看器显示类、每个类的实例以及引用树，可以帮助您跟踪内存使用情况，查找内存泄漏。

如需了解有关使用堆转储功能的详细信息，请参阅[转储和分析 Java 堆](https://developer.android.com/tools/help/am-memory.html#dumping)。

### 分配跟踪器

Android Studio 允许在监视内存使用情况的同时跟踪内存分配情况。
利用跟踪内存分配功能，您可以在执行某些操作时监视对象被分配到哪些位置。
了解这些分配后，您就可以相应地调整与这些操作相关的方法调用，从而优化应用的性能和内存使用。

如需了解有关跟踪和分析分配的详细信息，请参阅[分配跟踪器](https://developer.android.com/tools/help/am-allocation.html)。

### 数据文件访问

[Systrace](https://developer.android.com/tools/help/systrace.html)、[logcat](https://developer.android.com/tools/help/logcat.html) 和 [Traceview](https://developer.android.com/tools/help/traceview.html) 等 Android SDK 工具可生成性能和调试数据，用于对应用进行详细分析。

要查看已生成的数据文件，请打开“Captures”工具窗口。 在已生成的文件列表中，双击相应的文件即可查看数据。右键点击任何 `.hprof` 文件即可将其转换为标准 [`.hprof`](https://developer.android.com/tools/help/hprof-conv.html) 文件格式。

## FAQ

###  Android Studio logcat 设置 缓存大小 ，增加logcat条数

See [Android Studio logcat 设置 缓存大小 ，增加logcat条数](http://blog.csdn.net/senyangs/article/details/50067983)

logcat 经常刷新过快，冲掉之前的数据，可以改下logcat的缓存（缓冲区）大小，可以显示更多行避免被冲掉：
文件：
安装根目录/bin/idea.properties

添加一行

```
idea.cycle.buffer.size=1024000
```

## Android Studio －修改 LogCat 的颜色

[Android Studio －修改LogCat的颜色＊美爆了＊ - JavAndroid - 博客频道 - CSDN.NET](http://blog.csdn.net/yy1300326388/article/details/45825123)

### 打开 DDMS

1. Tools/Android/Enable AdbIntegration
2. Tools/Android/Android Device Monitor

## Plugins

- BorePlugin 给不想用butterknife又不想写findviewbyid的人推荐。
- Android Parcelable code generator. 在类中插入实现了Parcelable接口的代码。
- GsonFormat 将Json自动转化成类。
- Android Material Design Icon Generator 可以生成Material Design图标的插件。
- Android ButterKnife Zelezny

## Tools

- [pbreault/adb-idea](https://github.com/pbreault/adb-idea) A plugin for Android Studio and Intellij IDEA that speeds up your day to day android development.

## Shortcuts

See [Keyboard Shortcuts](https://developer.android.com/studio/intro/keyboard-shortcuts.html)


## See more

- [Write Your App](https://developer.android.com/studio/write/index.html#coding_productivity)
