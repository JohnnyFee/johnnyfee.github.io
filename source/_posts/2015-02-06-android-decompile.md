layout: post
title: "APK 反编译"
category: Android
tags: [android, decompile]
---

You need Three Tools to _`decompile an APK`_ file.

> 1.  [Dex2jar](http://code.google.com/p/dex2jar/) - Tools to work with android .dex and java .class files
>
> 2.  [ApkTool](http://ibotpeaches.github.io/Apktool/) - A tool for reverse engineering Android apk files
>
> 3.  [JD-GUI](http://jd.benow.ca/) - Java Decompiler is a tools to decompile and analyze Java 5 “byte code” and the later versions.
>

for more [how-to-use-dextojar](http://stackoverflow.com/questions/5257830/how-to-use-dextojar/19954951#19954951). Hope this will help You and all! :)

## 反编译 APK

## Install

Install [Apktool - A tool for reverse engineering 3rd party, closed, binary Android apps.](https://ibotpeaches.github.io/Apktool/)

<!-- more -->

### Usage

```
usage: apktool d[ecode] [options] <file_apk>
 -f,--force              Force delete destination directory.
 -o,--output <dir>       The name of folder that gets written. Default is apk.out
 -p,--frame-path <dir>   Uses framework files located in <dir>.
 -r,--no-res             Do not decode resources.
 -s,--no-src             Do not decode sources.
 -t,--frame-tag <tag>    Uses framework files tagged by <tag>.
```

如：

    apktool d CMBMobileBank.apk

默认生成到和 apk 同名的文件夹下。

## 反编译 Java 文件

### Install

1. 下载 dex2jar，并添加到环境变量。 [Downloads - dex2jar - Tools to work with android .dex and java .class files - Google Project Hosting](https://code.google.com/p/dex2jar/downloads/list)
2. 下载 JD-GUI。[Java Decompiler](http://jd.benow.ca/)

### Usage

解压缩 apk，在 class.dex 所在目录下运行：

    dex2jar.bat classes.dex

在当前目录生成 classes_dex2jar.jar 文件。

运行 JD-GUI，打开 classes_dex2jar.jar，可以预览反编译结果，可以 File -> Save All Sources 将所有源码保存到资源文件所在的目录，即 _CMBMobileBank/_。

## 重新打包

将反编译完的文件重新打包成apk文件out.apk 

    apktool b ./CMBMobileBank CMBMobileBank_RAW.apk

## 对生成的apk签名

## 准备签名文件

```
"C:\Program Files\Java\jdk1.6.0_24\bin\keytool" -genkey -alias wendy.keystore -keyalg RSA -validity 20000 -keystore wendy.keystore
```

注意密码为6位数，如123456。

### 签名

```
"C:\Program Files\Java\jdk1.6.0_24\bin\jarsigner" -verbose -keystore wendy.keystore -signedjar out.apk out_raw.apk wendy.keystore
```

此处需输入第2步的密码123456，执行完即可生成签名后的apk文件out.apk。

See also [apk破解实战](http://blog.csdn.net/cloudwu007/article/details/6851800)

## Tutorial

[Android Reverse Engineering 101 – Part 4 – Daniele Altomare](http://www.fasteque.com/android-reverse-engineering-101-part-4/)

## Tools

- [Android APK Decompiler](http://www.decompileandroid.com/) <sup>online decompile android apk</sup>
- [APKIDE改之理3.3.5少月增强版发布【20170130】 - 『逆向资源区』 - 吾爱破解 - LCG - LSG](http://www.52pojie.cn/thread-399571-1-1.html)