---
layout: post
title: 配置 Gradle 构建
date: '2016-11-14 17:40'
categories: Gradle
---

See [Configure Your Build](https://developer.android.com/studio/build/index.html#build-config)

### 构建变体

构建系统可帮助您从一个项目创建同一应用的不同版本。
如果您同时拥有免费版本和付费版本的应用，或想要在 Google Play 上为不同设备配置分发多个 APK，则可以使用此功能。

如需了解有关配置构建变体的详细信息，请参阅[配置 Gradle 构建](https://developer.android.com/tools/building/configuring-gradle.html#workBuildVariants)。

### APK 拆分

通过 APK 拆分，您可以高效地基于屏幕密度或 ABI 创建多个 APK。
例如，您可以利用 APK 拆分创建单独的 hdpi 和 mdpi 版本应用，同时仍将它们视为一个变体，并允许其共享测试应用、javac、dx 和 ProGuard 设置。

如需了解有关使用 APK 拆分的详细信息，请参阅 [APK 拆分](http://tools.android.com/tech-docs/new-build-system/user-guide/apk-splits)。

### 资源压缩

Android Studio 中的资源压缩功能可自动从您打包的应用和库依赖关系中删除不使用的资源。
例如，如果您的应用正在使用 [Google Play 服务](https://developer.android.com/google/play-services/index.html)，以访问 Google 云端硬盘功能，且您当前未使用 [Google Sign-In](https://developer.android.com/google/play-services/plus.html)，则资源压缩功能可删除 `SignInButton` 按钮的各种可绘制资产。

**注：** 资源压缩与代码压缩工具（例如 ProGuard）协同工作。

如需了解有关压缩代码和资源的详细信息，请参阅[压缩代码和资源](https://developer.android.com/tools/help/proguard.html)。
