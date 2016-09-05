layout: post
title: "Android 架构解决方案"
description: ""
category: Android
tags: [android]
---

## Architecture

- [googlesamples/android-architecture: A collection of samples to discuss and showcase different architectural tools and patterns for Android apps.](https://github.com/googlesamples/android-architecture)

### MVP

See

- [Android MVP 详解（上） - 简书](http://www.jianshu.com/p/9a6845b26856) <sup> introduction</sup>
- [Android MVP 详解（下） - 简书](http://www.jianshu.com/p/0590f530c617) <sup>best practice</sup>

除了 Google 官方的实现，还有以下实现:

- [konmik/nucleus: Nucleus is a simple Android library, which utilizes the Model-View-Presenter pattern to properly connect background tasks with visual parts of an application.](https://github.com/konmik/nucleus)
    + [介绍ModelViewPresenter在Android中的应用](http://www.it165.net/pro/html/201505/41758.html) <sup>translation</sup>
- [sockeqwe/mosby: A Model-View-Presenter library for modern Android apps](https://github.com/sockeqwe/mosby)
    + [MVP框架 – Ted Mosby的软件架构](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0528/2945.html) <sup>tranlation</sup>

### Samples

- [chrisbanes/philm: Movie collection and information app for Android.](https://github.com/chrisbanes/philm)
- [wenhuaijun/SearchPictureTool: 图片搜索APP源码，Material Design，Rxjava](https://github.com/wenhuaijun/SearchPictureTool)
- [Jude95/Fishing: 空钩 APP](https://github.com/Jude95/Fishing)
- [drakeet/Meizhi: gank.io unofficial client, RxJava & Retrofit](https://github.com/drakeet/Meizhi)
- [oxoooo/mr-mantou-android: On the importance of taste](https://github.com/oxoooo/mr-mantou-android) 
- [GankApp](https://github.com/oxoooo/mr-mantou-android)  
- [GanK](https://github.com/dongjunkun/GanK)  
- [Gank4Android](https://github.com/zzhoujay/Gank4Android)  
- [GankDaily](https://github.com/maoruibin/GankDaily)

## Loader

- [benoitletondor/Android-Studio-MVP-template: Android MVP template for Android Studio](https://github.com/benoitletondor/Android-Studio-MVP-template)
    - [Presenter surviving orientation changes with Loaders](https://medium.com/@czyrux/presenter-surviving-orientation-changes-with-loaders-6da6d86ffbbf#.3t97rb4t2)
    - [通过Loader延长Presenter生命周期](http://blog.chengdazhi.com/index.php/131) <sup>translation</sup>

## i18n

See [Supporting Different Languages](https://developer.android.com/training/basics/supporting-devices/languages.html)

To add support for more languages, create additional `values` directories inside
`res/` that include a hyphen and the ISO language code at the end of the
directory name. For example, `values-es/` is the directory containing simple
resources for the Locales with the language code "es".  Android loads the appropriate resources
according to the locale settings of the device at run time. For more information, see
[Providing Alternative Resources](https://developer.android.com/guide/topics/resources/providing-resources.html#AlternativeResources).

Once you’ve decided on the languages you will support, create the resource subdirectories and
string resource files. For example:

<pre class="classic no-pretty-print">
MyProject/
    res/
       values/
           strings.xml
       values-es/
           strings.xml
       values-fr/
           strings.xml
</pre>

## Test

示例项目在可测试方面做的非常好，由于对视图逻辑(view层)和业务逻辑(presenter层)进行了拆分，所以我们就可以对UI、业务代码分别进行测试。为了进行UI测试引入了Espresso，为了对业务层进行单元测试引入了junit，为了生成测试mock对象引入了mockito，为了支撑mockito又引入了 dexmaker，hamcrest的引入使得测试代码的匹配更接近自然语言，可读性更高，更加灵活。

### UI Test

Using Espresso

- [Testing Support Library](https://developer.android.com/topic/libraries/testing-support-library/index.html)
- [Testing UI for a Single App](https://developer.android.com/training/testing/ui-testing/espresso-testing.html#setup)

### [Mockito](http://mockito.org/)

Tasty mocking framework for unit tests in Java

- [crittercism/dexmaker](https://github.com/crittercism/dexmaker) A Java-language API for doing compile time or runtime code generation targeting the Dalvik VM. 
- [hamcrest/JavaHamcrest: Java (and original) version of Hamcrest](https://github.com/hamcrest/JavaHamcrest) Hamcrest is a library of matchers, which can be combined in to create flexible expressions of intent in tests. They've also been used for other purposes.
- [hamcrest/hamcrest-junit: Integration between Hamcrest and JUnit](https://github.com/hamcrest/hamcrest-junit) Integration between Hamcrest and JUnit

## Library

- [google/guava](https://github.com/google/guava) The Guava project contains several of Google's core libraries that we rely on in our Java-based projects: collections, caching, primitives support, concurrency libraries, common annotations, string processing, I/O, and so forth.