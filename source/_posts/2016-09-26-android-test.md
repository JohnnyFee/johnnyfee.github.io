layout: post
title: "Android Unit Test"
description: ""
category: Android
tags: [android, test]
---

See [测试支持库](https://developer.android.com/topic/libraries/testing-support-library/index.html)

## Android Testing Support Library

The [Android
Testing Support Library](https://developer.android.com/topic/libraries/testing-support-library/index.html) provides a set of APIs that allow you
to quickly build and run test code for your apps, including JUnit 4 and
functional UI tests. The library includes the following instrumentation-based
APIs that are useful when you want to automate your tests:
<dt>[AndroidJUnitRunner](https://developer.android.com/topic/libraries/testing-support-library/index.html#AndroidJUnitRunner)</dt>
<dd>A JUnit 4-compatible test runner for Android.</dd>
<dt>[Espresso](https://developer.android.com/topic/libraries/testing-support-library/index.html#Espresso)</dt>
<dd>A UI testing framework; suitable for functional UI testing within an
app.</dd>
<dt>[UI Automator](https://developer.android.com/topic/libraries/testing-support-library/index.html#UIAutomator)</dt>
<dd>A UI testing framework suitable for cross-app functional UI testing between
both system and installed apps.</dd>

## UI Test

1.  [Robotium](https://github.com/robotiumtech/robotium) - Test automation framework for black-box UI tests.
2.  [Roboletric](http://robolectric.org/) - Unit test framework to run tests inside the JVM on your workstation, not in the emulator.
4.  [Green Coffee](https://github.com/mauriciotogneri/green-coffee) - Run your Cucumber tests in your Android instrumentation tests.
5. [square/spoon](https://github.com/square/spoon) 同时在多个设备运行测试用例，并生成测试报告。

## AssertJ

2. [AssertJ](http://joel-costigliola.github.io/assertj/index.html) Fluent assertions for java.
1. [AssertJ Android](https://github.com/square/assertj-android) - AssertJ assertions geared towards Android.

## Tutorial

- [世界级的Android测试开发流程（一）](http://blog.zhaiyifan.cn/2016/02/23/world-class-testing-development-pipeline-for-android-part-1/)
- [世界级的Android测试开发流程（二）](http://blog.zhaiyifan.cn/2016/02/23/world-class-testing-development-pipeline-for-android-part-2/)
- [在Android Studio中进行单元测试和UI测试 - 简书](http://www.jianshu.com/p/03118c11c199)
