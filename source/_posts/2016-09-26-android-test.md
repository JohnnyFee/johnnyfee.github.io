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

## FAQ

### Get context of test project in Android junit test case

See [Get context of test project in Android junit test case - Stack Overflow](http://stackoverflow.com/questions/8605611/get-context-of-test-project-in-android-junit-test-case)

`InstrumentationRegistry` is an exposed registry
instance that holds a reference to the instrumentation running in the
process and it's arguments and allows injection of the following
instances:

* `InstrumentationRegistry.getInstrumentation()`, returns the
      Instrumentation currently running.
* `InstrumentationRegistry.getContext()`, returns the Context of this
      Instrumentation’s package. 
* `InstrumentationRegistry.getTargetContext()`,
      returns the application Context of the target application.
* `InstrumentationRegistry.getArguments()`, returns a copy of arguments
      Bundle that was passed to this Instrumentation. This is useful when
      you want to access the command line arguments passed to
      Instrumentation for your test.

### getApplication() vs. getApplicationContext()

See [android - getApplication() vs. getApplicationContext() - Stack Overflow](http://stackoverflow.com/questions/5018545/getapplication-vs-getapplicationcontext)

## Tutorial

- [Getting Started with Testing](https://developer.android.google.cn/training/testing/start/index.html?hl=zh-cn)
- [测试应用](https://developer.android.google.cn/studio/test/index.html?hl=zh-cn#_2)
- [Best Practices for Testing](https://developer.android.com/training/testing/index.html)

