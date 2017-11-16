layout: post
title: "Gradle Android"
description: ""
category: Java
tags: [android, build, gradle]
---
## Beginner

- [Beginner’s Guide to Gradle for Android Developers – Apptivity Lab](https://journals.apptivitylab.com/beginners-guide-to-gradle-for-android-developers-7972bfdf0668)


## Gradle 构建系统

Android Studio 基于 Gradle 构建系统，并通过 [Android Gradle 插件](https://developer.android.com/tools/revisions/gradle-plugin.html)提供更多面向 Android 的功能。该构建系统可以作为集成工具从 Android Studio 菜单运行，也可从命令行独立运行。

Android Studio 构建文件以 `build.gradle` 命名。这些文件是纯文本文件，使用 Android Gradle 插件提供的元素以 [Groovy](http://groovy.codehaus.org/) 语法配置构建。每个项目有一个用于整个项目的顶级构建文件，以及用于各模块的单独的模块层级构建文件。

您的项目的每个模块都有相应的 `build.gradle`
文件，整个项目也有相应的 `build.gradle` 文件。
通常您只关心模块（在本例中，为 `app` 或称应用模块）的 `build.gradle`
文件。如需了解有关此文件的详细信息，请参阅[使用
Gradle 构建您的项目](https://developer.android.com/studio/build/index.html)。

## 配置 manifest

Android Gradle插件提供了大量的DSL来自定义构建过程。

DSL提供了配置以下Manifest条目的功能:

- `minSdkVersion`
- `targetSdkVersion`
- `versionCode`
- `versionName`
- `applicationId` (更加方便有效的包名 — [Set the Application ID](https://developer.android.com/studio/build/application-id.html))

例如：

```gradle
android {
    compileSdkVersion 19
    buildToolsVersion "19.0.0"

    defaultConfig {
        versionCode 12
        versionName "2.0"
        minSdkVersion 16
        targetSdkVersion 16
    }
}
```

在`android.defaultConfig`元素中定义所有配置。

`applicationId`: 之前的Android Plugin版本使用 `packageName` 来配置 manifest文件中的packageName属性。从0.11.0版本开始，你需要在build.gradle文件中使用 `applicationId` 来配置 manifest 文件中的 `packageName` 属性。
这是为了消除应用程序的 packageName（也是程序的ID）和java包名所引起的混乱。

在构建文件中定义的强大之处在于它是动态的。例如，可以从一个文件中或者其它自定义的逻辑代码中读取版本信息：

```
def computeVersionName() {
    ...
}

android {
    compileSdkVersion 19
    buildToolsVersion "19.0.0"

    defaultConfig {
        versionCode 12
        versionName computeVersionName()
        minSdkVersion 16
        targetSdkVersion 16
    }
}
```

注意：不要使用与在给定范围内的 `getter` 方法可能引起冲突的方法名。例如，在 `defaultConfig{...}` 中调用 `getVersionName()`将会自动调用 `defaultConfig.getVersionName()` 方法，你自定义的 `getVersionName()`方法就被取代掉了。

如果一个属性没有使用DSL进行设置，一些默认的属性值将会被使用。以下表格是可能使用到的值：

Property Name               | Default value in DSL object |      Default value
--------------------------- |:---------------------:| --------------------:
`versionCode`               |             -1              |         value from manifest if present
`versionName`               |            null             |         value from manifest if present
`minSdkVersion`             |             -1              |         value from manifest if present
`targetSdkVersion`          |             -1              |         value from manifest if present
`applicationId`             |            null             |         value from manifest if present
`testApplicationId`         |            null   | applicationId + “.test”
`testInstrumentationRunner` |  null   | android.test.InstrumentationTestRunner
`signingConfig`             |    null  | null
`proguardFile`              |       N/A (set only)|  N/A (set only)
`proguardFiles`             |       N/A (set only)   |N/A (set only)

如果你在构建脚本中使用自定义代码逻辑请求这些属性，那么第二列的值将非常重要。例如，你可能会写：

```
if (android.defaultConfig.testInstrumentationRunner == null) {
    // assign a better default...
}
```

如果这个值一直保持null，那么在构建执行期间将会实际替换成第三列的默认值。但是在DSL元素中并没有包含这个默认值，所以，你无法查询到这个值。
除非是真的需要，这是为了预防解析应用的manifest文件。

## Implementation vs API dependency

- [Implementation vs API dependency - Jeroen Mols](https://jeroenmols.com/blog/2017/06/14/androidstudio3/)
- [Experimenting with Gradle dependencies](http://alexfu.github.io/android/2017/11/07/experimenting-with-gradle-dependencies.html)

## Build Configurations

See [Configure Your Build](https://developer.android.com/studio/build/index.html#build-config)

## FAQ

- [Android Studio集成 crashlytics 后无法编译的问题](http://blog.csdn.net/zhuobattle/article/details/50555393)

## Tutorial

- [深入理解Android（一）：Gradle详解](http://www.infoq.com/cn/articles/android-in-depth-gradle) <sup>中文教程</sup>
- [Gradle for Android 第一篇( 从 Gradle 和 AS 开始 ) - neu - SegmentFault](https://segmentfault.com/a/1190000004229002) <sup>book</sup>
- [Gradle for Android](https://www.safaribooksonline.com/library/view/gradle-for-android/9781491941102/) <sup>video</sup>
- [Gradle Recipes for Android](https://www.safaribooksonline.com/library/view/gradle-recipes-for/9781491947272/) <sup>book</sup>
- [Bruce Lee's Blog](http://blog.jinkuyinku.com/) <sup>大头鬼</sup>

## Plugins

- [Gradle - Plugins](https://plugins.gradle.org/)

## UserGuide

- [Gradle User Guide Version 3.0](https://docs.gradle.org/current/userguide/userguide.html)
- [翻译](http://avatarqing.github.io/Gradle-Plugin-User-Guide-Chinese-Verision/)