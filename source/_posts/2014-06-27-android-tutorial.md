layout: post
title: "Android Tutorial"
description: ""
category: Android
tags: [android, tutorial]
---

## Tutorial

- [Android Training](https://developer.android.com/training/index.html) <sup>official</sup>
- [Android Design Patterns](http://www.salttiger.com/android-design-patterns/)
- [Mastering the Android Touch System - YouTube](https://www.youtube.com/watch?v=EZAoJU-nUyI)
- [Supporting Multiple Screens | Android Developers](http://developer.android.com/guide/practices/screens_support.html)
- [JohnnyFee/awesome-android](https://github.com/JohnnyFee/awesome-android)
- [{ Android学习指南 }](http://android.yaohuiji.com/)
- [ashishb/android-security-awesome](https://github.com/ashishb/android-security-awesome)
- [What Should You Localize?](http://blog.danlew.net/2014/09/08/what-should-i-localize)
- [Top 10 Most Common Android Development Mistakes](http://www.toptal.com/android/top-10-most-common-android-development-mistakes)
- [DevStore官网_全球首家开发者服务商店](http://www.devstore.cn/)
- [Chinese Mobile App UI Trends](http://dangrover.com/blog/2014/12/01/chinese-mobile-app-ui-trends.html)

### 开发过程

- [Make Your First Android App: Part 1/3](http://www.raywenderlich.com/56107/make-first-android-app-part-1)
- [Make Your First Android App: Part 2/3](http://www.raywenderlich.com/56109/make-first-android-app-part-2)
- [Make Your First Android App: Part 3/3](http://www.raywenderlich.com/56111/make-first-android-app-part-3)
- [All in Together: Android Studio, Gradle and Robolectric](http://www.bignerdranch.com/blog/all-in-together-android-studio-gradle-and-robolectric)
- [Robust and readable architecture for an Android App, part 2](http://blog.joanzapata.com/robust-and-readable-part-2-introducing-async-service)

<!-- more -->

## Toos

- [A productive Android development environment - Cyril Mottier](http://cyrilmottier.com/2013/06/27/a-productive-android-development-environment/)
- [Mastering ProGuard for Building Lightweight Android Code | Crashlytics Blog](http://www.crashlytics.com/blog/mastering-proguard-for-building-lightweight-android-code/)
- [inmite/android-butterknife-zelezny](https://github.com/inmite/android-butterknife-zelezny) Android Studio plug-in for generating ButterKnife injections from selected layout XML.
- [bearstouch/android_img_resizer](https://github.com/bearstouch/android_img_resizer) <http://www.bearstouch.com>
- [Android Dev Tools ~ KP Bird](http://www.kpbird.com/p/android-dev-tools.html)

### Generator

- [foxykeep/ParcelableCodeGenerator](https://github.com/foxykeep/ParcelableCodeGenerator) A code generator to create Android Parcelable classes.
- [foxykeep/ContentProviderCodeGenerator](https://github.com/foxykeep/ContentProviderCodeGenerator) A code generator to create Android ContentProvider.

### Android Studio

- [kageiit/gradle-robojava-plugin](https://github.com/kageiit/gradle-robojava-plugin) Gradle plugin to integrate Robolectric tests into Android Studio.

## Debug

- [Android wifi无线调试App新玩法ADB WIFI - 简书](http://www.jianshu.com/p/21d1b65d92a4?from=timeline&isappinstalled=0)

### Eclipse DDMS error “Can't bind to local 8600 for debugger”

In addition to adding "127.0.0.1 localhost" to your hosts file, make the following changes in Eclipse.

Under Window -> Preferences -> Android -> DDMS:

* Set Base local debugger port to "8601"
* Check the box that says "Use ADBHOST" and the value should be "127.0.0.1"

Thanks to Ben Clayton in the comments for leading me to a solution. 

Some Google keywords: Ailment or solution for Nexus S Android debugging with the error message: Can't bind to local 8600 for debugger.

See [android - Eclipse DDMS error "Can't bind to local 8600 for debugger" - Stack Overflow](http://stackoverflow.com/questions/3318738/eclipse-ddms-error-cant-bind-to-local-8600-for-debugger)

### x86 emulation currently requires hardware acceleration

As per [this response](http://stackoverflow.com/a/27997670/1515058), the complete steps are:

1) Open SDK Manager (In Android Studio, go to Tools > Android > SDK Manager) and Download Intel x86 Emulator Accelerator (HAXM installer) if you haven't.

2) Now go to your SDK directory `C:\users\%USERNAME%\AppData\Local\Android\sdk\extras\intel\Hardware_Accelerated_Execution_Manager\` and run the file named `intelhaxm-android.exe`.

> In case you get an error like "Intel virtualization technology (vt,vt-x) is not enabled". Go to your BIOS settings and enable Hardware Virtualization.

3) Restart Android Studio and then try to start the AVD again.

It might take a minute or 2 to show the emulator window.

See [android - Emulator: ERROR: x86 emulation currently requires hardware acceleration - Stack Overflow](http://stackoverflow.com/questions/29136173/emulator-error-x86-emulation-currently-requires-hardware-acceleration)

[emulator: ERROR: x86 emulation currently requires hardware acceleration!Please ensure Intel HAXM is properly installed and usable.CPU acceleration status: HAX kernel module is not installed! - csulennon - 博客园](http://www.cnblogs.com/csulennon/p/4178404.html)

### INSTALL_FAILED_NO_MATCHING_ABIS when install apk

INSTALL_FAILED_NO_MATCHING_ABIS is when you are trying to install an app that has native libraries and it doesn't have a native library for your cpu architecture. For example if you compiled an app for armv7 and are trying to install it on an emulator that uses the Intel architecture instead it will not work.

[android - INSTALL_FAILED_NO_MATCHING_ABIS when install apk - Stack Overflow](http://stackoverflow.com/questions/24572052/install-failed-no-matching-abis-when-install-apk)

### Unsupported major.minor version 52.0

修改 JAVA_HOME 和 Path 环境变量，保证所有的版本都是 J2SE 8。

The version number shown describes the version of the JRE the class file is compatible with.

The reported major numbers are:

```
J2SE 8 = 52,
J2SE 7 = 51,
J2SE 6.0 = 50,
J2SE 5.0 = 49,
JDK 1.4 = 48,
JDK 1.3 = 47,
JDK 1.2 = 46,
JDK 1.1 = 45
```

(Source: http://en.wikipedia.org/wiki/Java_class_file)

To fix the actual problem you should try to either run the Java code with a newer version of Java JRE or specify the target parameter to the Java compiler to instruct the compiler to create code compatible with earlier Java versions. 

For example, in order to generate class files compatible with Java 1.4, use the following command line:

```
javac -target 1.4 HelloWorld.java
```

With newer versions of the Java compiler you are likely to get a warning about the bootstrap class path not being set. More information about this error is available in blog post _[New javac warning for setting an older source without bootclasspath](https://blogs.oracle.com/darcy/entry/bootclasspath_older_source)_.

See [jvm - How to fix java.lang.UnsupportedClassVersionError: Unsupported major.minor version - Stack Overflow](http://stackoverflow.com/questions/10382929/how-to-fix-java-lang-unsupportedclassversionerror-unsupported-major-minor-versi)

## Deploy

- [Continuous Delivery for Android (part 2) - stable/kernel Blog](http://stablekernel.com/blog/continuous-delivery-android-part-2)

## Test

- [stephanenicolas/boundbox](https://github.com/stephanenicolas/boundbox) BoundBox provides an easy way to test an object by accessing all its fields, constructor and methods, public or not. BoundBox breaks encapsulation. 可以用于作单元测试。
- [Code Talk » Blog Archive » Testing Asynchronous Tasks on Android](http://codetalk.de/?p=43)
- [square/fest-android](https://github.com/square/fest-android) A set of FEST assertion helpers geared toward testing Android. [http://square.github.io/fest-android/](http://square.github.io/fest-android/)
- [Spoon](http://square.github.io/spoon/) Android's ever-expanding ecosystem of devices creates a unique challenge to testing applications. 

## Log

- [MustafaFerhan/DebugLog](https://github.com/MustafaFerhan/DebugLog) Create a simple and more understandable Android logs.
- [JakeWharton/timber](https://github.com/JakeWharton/timber) A logger with a small, extensible API which provides utility on top of Android's normal Log class.

## 模拟器

- [android - Error in launching AVD with AMD processor - Stack Overflow](http://stackoverflow.com/questions/26355645/error-in-launching-avd-with-amd-processor)
- [使用 Intel HAXM 为 Android 模拟器加速，媲美真机](http://www.cnblogs.com/beginor/archive/2013/01/13/2858228.html)
- [Genymotion](http://www.genymotion.com/)
    - [Genymotion 中文官网](http://www.genymotion.cn/#theme=home)
    - [使用指南 - Genymotion 中文官网](http://www.genymotion.cn/#theme=guide)


## FAQ

### How to exit an android app using code

See [java - How to exit an android app using code? - Stack Overflow](http://stackoverflow.com/questions/17719634/how-to-exit-an-android-app-using-code)

```
submit=(Button)findViewById(R.id.submit);
submit.setOnClickListener(new OnClickListener() {

    @Override
    public void onClick(View arg0) {
		android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(1);

    }
});
```

### Android SDK下载慢的解决办法

- [Hanolex博客 » Android SDK下载慢的解决办法](http://hanolex.org/archives/300.html)
- [解决Android SDK Manager下载慢的问题](http://www.opensoce.com/3035.html)
- [解决Android SDK Manager下载慢的问题](http://www.opensoce.com/2011/09/Jie_Jue_Android_SDK_Manager_Xia_Zai_Man_De_Wen_Ti/)

## SDK 闪退

See [java - Android SDK installation doesn't find JDK - Stack Overflow](http://stackoverflow.com/questions/4382178/android-sdk-installation-doesnt-find-jdk?page=1&tab=votes#tab-top)

### “Gradle Version 2.10 is required.” Error

You need to change **File > Settings > Builds,Execution,Deployment > Build Tools > Gradle >Gradle home** path

On Mac OS, change the path in **Android Studio > Preferences > Builds,Execution,Deployment > Build Tools > Gradle >Gradle home**

Or set **Use default gradle wrapper** and edit `Project\gradle\wrapper\gradle-wrapper.properties` files field `distributionUrl`  like this

```
distributionUrl=https\://services.gradle.org/distributions/gradle-2.10-all.zip
```

See [android - "Gradle Version 2.10 is required." Error - Stack Overflow](http://stackoverflow.com/questions/34814368/gradle-version-2-10-is-required-error)

### Execution Failed for task :app:compileDebugJavaWithJavac in Android Studio

Try to upgrade your buildToolsVersion to "23.0.1",like this:

```
compileSdkVersion 23
buildToolsVersion "23.0.1"   

If you didn't install the buildTools for this version,please download it with SDKManager as hint.

See [java - Execution Failed for task :app:compileDebugJavaWithJavac in Android Studio - Stack Overflow](http://stackoverflow.com/questions/33404552/execution-failed-for-task-appcompiledebugjavawithjavac-in-android-studio)

### Changing API level Android Studio

See [Changing API level Android Studio - Stack Overflow](http://stackoverflow.com/questions/19465049/changing-api-level-android-studio)

When you want to update your minSdkVersion in an existent project...

1.  **Update build.Gradle(Module:app)** - Make sure is the one under **Gradle Script** and it is **NOT** build.Gradle(Project: yourproject)

Example of build.gradle:

```
apply plugin: 'com.android.application'

android {
    compileSdkVersion 23
    buildToolsVersion "23.0.3"

    defaultConfig {
        applicationId "com.stackoverflow.answer"
        minSdkVersion 16
        targetSdkVersion 23
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}

dependencies {
    androidTestCompile 'junit:junit:4.12'
    compile fileTree(dir: 'libs', include: ['*.jar'])
}
```

1.  **Sync gradle button**
2.  **Rebuild project**

**After** updating the _build.gradle_'s `minSdkVersion`, you have to click on the button to sync gradle file ("Sync Project with Gradle files"). That will clear the marker.

Updating _manifest.xml_, for e.g. deleting any references to SDK levels in the manifest file, is NOT necessary anymore in Android Studio.

That's all folks.

## Books

- [Android Programming: Pushing the Limits](http://www.salttiger.com/android-programming-pushing-limits/)
- [Creating Dynamic UI with Android Fragments](http://www.salttiger.com/creating-dynamic-ui-android-fragments/)
- [Efficient Android Threading](http://www.salttiger.com/efficient-android-threading/)
