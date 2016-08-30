layout: post
title: "Android Library"
description: ""
category: Android
tags: [android]
---

本篇文章针对相对比较流行的开源项目进行分类，这些项目中不涉及UI，如果查看UI方面的，请参考这篇文章的姐妹篇 [Android Views](http://johnnyfee.github.io/android/2013/12/23/android-view)。
下一步会进行初步比较。

## Thread

- [loopj / android-async-http](https://github.com/loopj/android-async-http) android的异步请求组件。
- [square / tape](https://github.com/square/tape) A lightning fast, transactional, file-based FIFO for Android and Java. <http://square.github.io/tape/>
- [CodeAndMagic/android-deferred-object](https://github.com/CodeAndMagic/android-deferred-object) Android implementation of the deferred object pattern as seen on jQuery.
    + [JDeferred](http://jdeferred.org/) JDeferred is a Java Deferred/Promise library similar to JQuery's Deferred Object.
- [beworker/tinybus](https://github.com/beworker/tinybus) A lightweight and simple event bus tailored for Android.
- [inaka/TinyTask](https://github.com/inaka/TinyTask) A Tiny Task Library.

## Http

- [OkHttp](http://square.github.io/okhttp/)

## Push

- [Redth / PushSharp](https://github.com/Redth/PushSharp) A server-side library for sending Push Notifications to iOS (iPhone/iPad APNS), Android (C2DM and GCM - Google Cloud Message), Windows Phone, Windows 8, Amazon, Blackberry, and (soon) FirefoxOS devices!

## File

- [JakeWharton / DiskLruCache](https://github.com/JakeWharton/DiskLruCache) Java implementation of a Disk-based LRU cache which specifically targets Android compatibility.
- [greenrobot/greenrobot-common](https://github.com/greenrobot/greenrobot-common) General purpose utilities and hash functions for Android and Java.

## Rest

- [foxykeep / DataDroid](https://github.com/foxykeep/DataDroid) Android的RESTful封装。
- [Square](https://github.com/square) 他们在GitHub上发布了很多优秀的函数库。我最喜欢的是RetoFit，正如他的介绍那样“一个类型安全的安卓和Java REST客户端”。
- [novoda / RESTProvider](https://github.com/novoda/RESTProvider) Automatically parse RESTful API responses into a Provider in Android <http://novoda.com>.
- [My little android warehouse: Rest interaction in Android](http://mytechaddiction.blogspot.com/2014/02/rest-interaction-in-android.html)\
- [square/retrofit](https://github.com/square/retrofit)
    + [Retrofit](http://square.github.io/retrofit/)
    + [Hands on Retrofit (A Rest Api Client) – s3xy4ngyc Dev Journey](http://s3xy4ngyc.github.io/articles/hands-on-retrofit/)
    + [Matt Swanson - Integration Testing against REST APIs in Android](http://www.mdswanson.com/blog/2014/02/24/integration-testing-rest-apis-for-android.html)

<!-- more -->

## Framework

- [Google Guice on Android, version 2.0](https://github.com/roboguice/roboguice) https://github.com/roboguice/roboguice. 基于google-guice扩展，针对Android系统的轻量级依赖注入框架（例如增加了View注入等）。
    + 国内最详细的中文博客： <http://blog.csdn.net/mapdigit/article/category/1138155/1>
- [Spring for Android](http://www.springsource.org/spring-android) 
    - [Spring RESTtemplate]() 一个非常流行的基于Java REST客户端。Spring for Android RestTemplate模块提供了一个可以在安卓环境下工作的RestTemplate版本，为你的安卓应用程序提供了一个非常灵活的REST API。
    - [验证支持](http://static.springsource.org/spring-android/docs/1.0.x/reference/html/auth.html)  OAuth是该领域快速崛起一个的协议。OAuth是一个开源协议，为用户提供第三方应用支持，提供对其他网站受限资源或服务的访问。
    - [Blender : Boosting Guice with annotation processing // Speaker Deck](https://speakerdeck.com/stephanenicolas/blender-boosting-guice-with-annotation-processing)
- [octo-online / robospice](https://github.com/octo-online/robospice) Repo of the Open Source Android library : RoboSpice. RoboSpice is a modular android library that makes writing asynchronous long running tasks easy. It is specialized in network requests, supports caching and offers REST requests out-of-the box using extension modules.
- [Simpler Android apps with Flow and Mortar](http://corner.squareup.com/2014/01/mortar-and-flow.html)
- [RoboZombie](http://sahan.me/RoboZombie/) Effortless networking for your Android application. <http://sahan.me/RoboZombie>

### DI

- [square/dagger](https://github.com/square/dagger) A fast dependency injector for Android and Java. [http://square.github.io/dagger/](http://square.github.io/dagger/).
    + [JakeWharton/u2020](https://github.com/JakeWharton/u2020)
    + [Dependency injection on Android: Dagger (Part 1)](http://antonioleiva.com/dependency-injection-android-dagger-part-1/)
    + [Dagger: dependency injection on Android (Part 2) - Antonio Leiva](http://antonioleiva.com/dagger-android-part-2/)
    + [Dagger: Scoped object graphs (Part 3) - Antonio Leiva](http://antonioleiva.com/dagger-3/?+Weekly-Android_Weekly_107-ac89b26b9e-337832837)

### Annotaion

- [excilys / androidannotations](https://github.com/excilys/androidannotations) UI和代码之间的粘合剂，通过它可以编写更少的代码并且轻松维护现存的代码。
- [Butter Knife](http://jakewharton.github.io/butterknife/) View "injection" library for Android. 
- [greenrobot / EventBus](https://github.com/greenrobot/EventBus) 简化不同组件之间的事件传递。
- [square / otto](https://github.com/square/otto) An enhanced Guava-based event bus with emphasis on Android support. <http://square.github.io/otto/>
- [RomainPiel/Michelangelo](https://github.com/RomainPiel/Michelangelo)

## Exception

- [ACRA / acra](https://github.com/ACRA/acra) Application Crash Reports for Android.

## Protocol Message

- [square/wire](https://github.com/square/wire) Clean, lightweight protocol buffers for Android.

## App

- [Otto](http://square.github.io/otto/) Otto is an event bus designed to decouple different parts of your application while still allowing them to communicate efficiently.

## Secure
- [guardianproject / NetCipher](https://github.com/guardianproject/NetCipher) Android Library Project for Multi-Layer Network Connections (Better TLS/SSL and Tor).

## JSON

- [Raizlabs/Parser](https://github.com/Raizlabs/Parser) Parser is the fastest JSON-to-Model object parser that uses annotation processing to generate the parsing for you.

## i18n

- [westlinkin/AndroidLocalizationer](https://github.com/westlinkin/AndroidLocalizationer) This is a Android Studio/ IntelliJ IDEA plugin to localize your Android app, translate your string resources automactically. <https://plugins.jetbrains.com/plugin/7629>

## Form

- [inmite/android-validation-komensky](https://github.com/inmite/android-validation-komensky) A simple library for validating user input in forms using annotations.

## Other

- [xamarin / XobotOS](https://github.com/xamarin/XobotOS) XobotOS is a Xamarin research project that explored porting Android 4.0 from Java/Dalvik to C# to explore the performance and memory footprint benefits of C#.
- [TheRealKerni / HockeyKit](https://github.com/TheRealKerni/HockeyKit) A software update kit for iOS and Android. Provided as is. For more functionality and maintained work.
- [Flowdalic / asmack](https://github.com/flowdalic/asmack) A build environment for the XMPP client library Smack on Android <http://asmack.org>.

## Storage

- [OrmLite](http://ormlite.com/sqlite_java_android_orm.shtml) 编写和维护数据库表通常是很乏味的。OrmLite是一个支持安卓和Sqlite的ORM框架。通常完成这项工作会有数不清的备选工具，但是如果你正在创建一个需要很大数据库的应用也许OrmLite会是你的最佳选择。最好的事情是——OrmLite是通过注解驱动的。
- [greenrobot / greenDAO](https://github.com/greenrobot/greenDAO) greenDAO is a light & fast ORM solution for Android that maps objects to SQLite databases. <http://greendao-orm.com/>
- [square/sqlbrite](https://github.com/square/sqlbrite) A lightweight wrapper around SQLiteOpenHelper which introduces reactive stream semantics to SQL operations.

## OpenSource Project
- [Apollo音乐播放器](https://github.com/Splitter/android_packages_apps_apolloMod) 就一个播放器，但是实现的很好
- [oschina客户端](https://github.com/Splitter/android_packages_apps_apolloMod)  oschina网站的客户端哦，wp版，iOS版都有开源
- [xabber实时聊天工具（基于xmpp协议）](http://www.eoeandroid.com/thread-272453-1-1.html) 不评价了，反正算是同类中比较好的了
- [四次元新浪微博客户端](https://github.com/qii/weiciyuan)
- [Google IO](https://code.google.com/p/iosched/)  谷歌开发者大会应用，虽然有点难懂，还是很有参考价值（比如其中的图片加载）
- [eoe客户端](https://github.com/eoecn/android-app/) 
- [photup](https://github.com/chrisbanes/photup)  一个上传图片到facebook的客户端，其中使用了很多开源项目，作者（chrisbanes）本身也非常NB~
- [dribbo](https://github.com/Issacw0ng/Dribbo)  碎星(Fuubo的作者)写的一个dribbble的客户端
- [dashclock](https://code.google.com/p/dashclock/) 4.2以上的锁屏插件，这应该是目前做的最好的锁屏插件了吧，居然是开源的，你还等什么！
- [github / android](https://github.com/github/android) GitHub Android App.
- [Anki-Android](https://github.com/nicolas-raoul/Anki-Android) 注明的单词学习卡片。
- [facebook / facebook-android-sdk](https://github.com/facebook/facebook-android-sdk/) 
- [fastestforward / gauges-android](https://github.com/fastestforward/gauges-android) Gaug.es Android App.
- [chrislacy / TweetLanes](https://github.com/chrislacy/TweetLanes) Tweet Lanes for Android.
- [yixia / VitamioBundle](https://github.com/yixia/VitamioBundle) Vitamio for Android <http://developer.vitamio.org>.
- [ahorn / android-rss](https://github.com/ahorn/android-rss)Lightweight Android library to read parts of RSS 2.0 feeds.
- [OneNoteDev/OneNoteServiceSamplesAndroid](https://github.com/OneNoteDev/OneNoteServiceSamplesAndroid)

## Tool
- [mttkay / ignition](https://github.com/mttkay/ignition) 提供一些工具库。
- [androidquery / androidquery](https://github.com/androidquery/androidquery) Android-Query (AQuery) is a light-weight library for doing asynchronous tasks and manipulating UI elements in Android. Our goal is to make Android coding simpler, easier, and more fun!
- [madeye / proxydroid](https://github.com/madeye/proxydroid) Global Proxy for Android.
- [Uncodin / bypass](https://github.com/Uncodin/bypass) Skip the HTML, Bypass takes markdown and renders it directly on Android and iOS. <http://uncodin.github.com/bypass/>
- [square/phrase](https://github.com/square/phrase/) Phrase is an Android string resource templating library
    + [Android String Formatting with Phrase](http://corner.squareup.com/2014/01/phrase.html)
- [Instagram/ig-json-parser](https://github.com/Instagram/ig-json-parser/). See also [Fast, auto-generated streaming JSON parsing for Android - Instagram Engineering](http://instagram-engineering.tumblr.com/post/97147584853/json-parsing)
- [polok/TaggerString](https://github.com/polok/TaggerString) TaggerString is very light library which allows to build dynamic string resource in much more readable way.

## Android Studio 扩展

- [jgilfelt / android-adt-templates](https://github.com/jgilfelt/android-adt-templates) A small collection of ADT templates to help quickly scaffold common Activity and UI patterns.

## Sample

- [Android : Around me Tutorial | Michenux.net](http://www.michenux.net/android-around-me-tutorial-974.html) 周边旅游景点，并显示距离。
- [GitHub 上有哪些值得关注和学习的经典 Android 项目？ - 知乎](http://www.zhihu.com/question/24689070)

## Reference

- [Android Boost](http://zouguangxian.github.io/android-boost/)
- [Android优秀开源项目](http://www.eoeandroid.com/thread-272453-1-1.html)
- [安卓开发经验分享：资源、UI、函数库、测试、构建一个都不能少](http://www.importnew.com/4868.html)
- [android-libs](http://android-libs.com/)