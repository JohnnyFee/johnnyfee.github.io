layout: post
title: "APK 反编译"
category: Android
tags: [android, decompile]
---

## 反编译资源文件

## Install

See [Install - android-apktool - Install Guide - A tool for reverse engineering Android apk files - Google Project Hosting](https://code.google.com/p/android-apktool/wiki/Install)


Windows:

1. Download Windows [wrapper script](https://raw.githubusercontent.com/iBotPeaches/Apktool/master/scripts/windows/apktool.bat) (Right click, Save Link As `apktool.bat`)
2. Download apktool-2 ([find newest here](https://bitbucket.org/iBotPeaches/apktool/downloads)) See also [android-apktool - A tool for reverse engineering Android apk files](https://code.google.com/p/android-apktool/)
3. Rename downloaded jar to apktool.jar
4. Move both files (apktool.jar & apktool.bat) to your Windows directory (Usually `C://Windows`)
5. If you do not have access to C://Windows, you may place the two files anywhere then add that directory to your Environment Variables System PATH variable.
6. Try running apktool via command prompt

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